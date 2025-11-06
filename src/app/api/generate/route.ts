import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/connectDB";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
export async function GET() {
  const history = await query("SELECT articletitle , id FROM articles");
  return Response.json({ data: history });
}

export async function POST(req: NextRequest) {
  try {
    const { articleSummary, takeID } = await req.json();
    console.log({ takeID });

    // 1. Шалгах: articleSummary байхгүй бол бидэнд ажиллах юм алга
    if (!articleSummary || !takeID) {
      return NextResponse.json(
        { error: "articleSummary болон takeID заавал хэрэгтэй" },
        { status: 400 }
      );
    }

    // 2. Асуулт үүсгэх AI Prompt
    const prompt = `Generate 5 multiple choice questions based on this article: ${articleSummary}. Return the response in this exact JSON format:
      [
        {
          "question": "Question text here",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "0"
        }
      ]
      Make sure the response is valid JSON and the answer is the index (0-3) of the correct option.`;

    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const generatedText = (aiResponse as any).text ?? aiResponse; // Generated content (JSON string)

    const quizList = JSON.parse(generatedText); // JSON болгон хөрвүүлж байна

    // 3. Article summary-г article хүснэгтэд хадгалах
    await query(
      `INSERT INTO articles (articlesummary, id) 
         VALUES ($1, $2) 
         ON CONFLICT (id) 
         DO UPDATE SET articlesummary = $1`,
      [articleSummary, takeID]
    );

    // 4. Бүх асуултыг quiz хүснэгтэд хадгалах
    const insertQuizPromises = quizList.map((quiz: any) =>
      query(
        `
        INSERT INTO quiz (question, options, answer, article_id)
        VALUES ($1, $2, $3, $4)
        `,
        [
          quiz.question,
          JSON.stringify(quiz.options), // JSON болгож дамжуулж байна
          parseInt(quiz.answer), // Хэрэв хариулт нь index бол 숫 болгох
          takeID,
        ]
      )
    );

    await Promise.all(insertQuizPromises); // Зэрэг гүйцэтгэнэ

    return NextResponse.json({
      message: "Асуулт ба тойм амжилттай хадгалагдлаа",
    });
  } catch (err: any) {
    console.error("POST /api/generate error:", err);
    return NextResponse.json(
      { error: err.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
