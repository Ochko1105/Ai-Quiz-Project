import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/connectDB";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
export async function GET() {
  const history = await query("SELECT articletitle FROM articles");
  return Response.json({ data: history });
}

export async function POST(req: NextRequest) {
  try {
    const { articleSummary, articleTitle } = await req.json();
    console.log({ articleTitle });

    const prompt = `Generate 5 multiple choice questions based on this article: ${articleSummary}. Return the response in this exact JSON format:
      [
        {
          "question": "Question text here",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "0"
        }
      ]
      Make sure the response is valid JSON and the answer is the index (0-3) of the correct option.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.log({ response });
    // **Энд**: параметр ашиглаж өгөгдлийг аюулгүйгээр тавина (SQL injection-ээс сэргийлнэ)
    await query(
      `INSERT INTO articles (articletitle, articlecontent ,articlesummary) VALUES ($1, $2,$3)`,
      [articleTitle, articleSummary, articleSummary]
    );
    // await query(
    //   `INSERT INTO quiz (question, options, answer ,article_id) VALUES ($1, $2 ,$3,$4)`,
    //   [response.text, articlecontent]
    // );

    return NextResponse.json({
      data: (response as any).text ?? response,
    });
  } catch (err: any) {
    console.error("POST /api/generate error:", err);
    return NextResponse.json(
      { error: err.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
