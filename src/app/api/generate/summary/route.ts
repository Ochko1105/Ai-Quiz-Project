import { query } from "@/lib/connectDB";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { articlecontent } = await req.json();

    const prompt = `Please provide a concise summary of the following article: ${articlecontent}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.log(response.text);
    await query(`INSERT INTO articles (articlesummary) VALUES ($1)`, [
      articlecontent,
    ]);

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
