import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/connectDB";
import { prisma } from "@/lib/prisma";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
export async function GET() {
  const PrismaHistory = await prisma.articles.findMany();
  // const deletetitle = await prisma.articles.delete({
  //   where: {
  //     id: 35,
  //   },
  // });

  return Response.json({ data: PrismaHistory });
}

export async function POST(req: NextRequest) {
  try {
    const { articleSummary, takeID } = await req.json();

    if (!articleSummary || !takeID) {
      return NextResponse.json(
        { error: "articleSummary болон takeID заавал хэрэгтэй" },
        { status: 400 }
      );
    }

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

    const extractJsonArray = (text: string) => {
      const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      return match ? match[1].trim() : text.trim();
    };
    const cleanedText = extractJsonArray(generatedText.text || generatedText);

    const quizList = JSON.parse(cleanedText);

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
          JSON.stringify(quiz.options),
          parseInt(quiz.answer),
          takeID,
        ]
      )
    );

    await Promise.all(insertQuizPromises); // Зэрэг гүйцэтгэнэ

    return NextResponse.json({
      message: "Асуулт ба тойм амжилттай хадгалагдлаа",
      data: generatedText,
    });
  } catch (err: any) {
    console.error("POST /api/generate error:", err);
    return NextResponse.json(
      { error: err.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
