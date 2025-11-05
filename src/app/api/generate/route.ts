import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
export async function GET(req: NextRequest) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });

  return NextResponse.json({
    text: response.text,
  });
}
export async function POST(req: NextRequest) {
  const { article } = await req.json();
  const prompt = `Generate 5 multiple choice questions based on this article: ${article}. Return the response in this exact JSON format:
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

  return NextResponse.json({
    data: response.text,
  });
}
