import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userID } = await req.json();

    if (!userID) {
      return NextResponse.json(
        { error: "User ID заавал хэрэгтэй" },
        { status: 400 }
      );
    }

    const userArticles = await prisma.article.findMany({
      where: { userid: Number(userID) },
      include: {
        quiz: {
          include: {
            quizattempt: {
              where: { userid: Number(userID) }, // тухайн хэрэглэгчийн оруулсан quizattempt
            },
            userscore: {
              where: { userid: Number(userID) }, // тухайн хэрэглэгчийн авсан userscore
            },
          },
        },
      },
      orderBy: { id: "desc" },
    });

    if (userArticles.length === 0) {
      return NextResponse.json({
        message: "Энэ хэрэглэгч ямар ч нийтлэл үүсгээгүй байна.",
        data: [],
      });
    }

    return NextResponse.json({
      message:
        "User-ийн нийтлэл, quiz, quizattempt, userscore мэдээлэл амжилттай татагдлаа",
      data: userArticles,
    });
  } catch (error: any) {
    console.error("Error fetching user history:", error);
    return NextResponse.json(
      { error: error.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
