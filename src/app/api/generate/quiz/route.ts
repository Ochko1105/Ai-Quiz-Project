import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/connectDB";

export async function POST(req: NextRequest) {
  try {
    const { generatedtext } = await req.json();
    console.log({ generatedtext });

    await query(
      `INSERT INTO quiz (question, options, answer ,article_id) VALUES ($1, $2 ,$3,1)`,
      [
        generatedtext[0].question,
        generatedtext[0].options,
        generatedtext[0].answer,
      ]
    );

    return NextResponse.json({
      message: "Yes",
    });
  } catch (err: any) {
    console.error("POST /api/generate error:", err);
    return NextResponse.json(
      { error: err.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
