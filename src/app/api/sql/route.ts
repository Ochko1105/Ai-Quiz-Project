import { query } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const response = await query("SELECT * FROM students");

  return NextResponse.json({
    data: response,
  });
}
