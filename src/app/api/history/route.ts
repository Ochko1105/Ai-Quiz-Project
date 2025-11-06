// Backend: /api/history/route.ts
import { query } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ID } = await req.json();
    console.log({ ID });

    const historyArticles = await query(
      `
      SELECT 
        a.id, 
        a.articletitle, 
         a.articlecontent, 
        a.articlesummary, 
        q.question, 
        q.options, 
        q.answer
      FROM articles a
      LEFT JOIN quiz q ON a.id = q.article_id
      WHERE a.id = $1
      `,
      [ID] // Always use parameterized query to prevent SQL injection
    );

    console.log({ historyArticles });
    return NextResponse.json({ data: historyArticles.rows ?? [] });
  } catch (error: any) {
    console.error("Error fetching history:", error);
    return NextResponse.json(
      { error: error.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
