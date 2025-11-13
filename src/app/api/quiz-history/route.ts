import { query } from "@/lib/connectDB";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const userId = Number(req.nextUrl.searchParams.get("userId"));
  if (!userId)
    return NextResponse.json({ error: "userId required" }, { status: 400 });

  const history = await prisma.quizattempt.findMany({
    where: { userid: userId },
    include: {
      quizanswer: true, // оролдлогын бүх хариулт
    },
    orderBy: { createdat: "desc" },
  });

  return NextResponse.json({ data: history });
}
