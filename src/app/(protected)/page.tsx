"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Question, UserAnswer } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import CreateArticleHomepage from "@/components/Home/CreateArticleHomepage";
import CreateSummaryHomepage from "@/components/Home/CreateSummaryHomepage";
import CreateQuizHomepage from "@/components/Home/CreateQuizHomepage";
import CreateResultHomepage from "@/components/Home/CreateResultHomepage";

export default function ArticleQuiz() {
  const [page, setPage] = useState<"start" | "summary" | "quiz" | "result">(
    "start"
  );
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleSummary, setArticleSummary] = useState("");
  const [takeID, setTakeID] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [step, setStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  // 🧠 Summary үүсгэх
  const handleGenerateSummary = async () => {
    if (!user) {
      alert("Ta ehleed newterj ornuu");
    }
    if (!articleContent || !articleTitle) return;
    try {
      setLoading(true);
      const res = await fetch("/api/generate/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articlecontent: articleContent,
          articleTitle,
          user,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setArticleSummary(data.data.summary);
      setTakeID(data.data.id);
      setPage("summary");
    } catch (err: any) {
      alert("Summary үүсгэхэд алдаа гарлаа: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🤖 Quiz үүсгэх
  const handleGenerateQuiz = async () => {
    if (!articleSummary || !takeID) {
      alert("Summary болон ID дутуу байна!");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/generate/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleSummary, takeID }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setQuestions(data.data);
      setStep(0);
      setUserAnswers([]);
      setCorrectAnswers(0);
      setPage("quiz");
    } catch (err: any) {
      alert("Quiz үүсгэхэд алдаа гарлаа: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Хариулт шалгах
  const handleAnswer = (idx: number) => {
    const current = questions[step];
    const correctIndex = parseInt(current.answer);
    const isCorrect = idx === correctIndex;

    setUserAnswers((prev) => [
      ...prev,
      {
        question: current.question,
        selected: current.options[idx],
        correct: current.options[correctIndex],
        isCorrect,
      },
    ]);

    if (isCorrect) setCorrectAnswers((prev) => prev + 1);

    if (step + 1 >= questions.length) setPage("result");
    else setStep(step + 1);
  };

  const resetAll = () => {
    setArticleContent("");
    setArticleTitle("");
    setArticleSummary("");
    setTakeID(null);
    setQuestions([]);
    setStep(0);
    setUserAnswers([]);
    setCorrectAnswers(0);
    setPage("start");
  };

  return (
    <div className="bg-gray-100 w-screen min-h-screen p-10 flex justify-center">
      <div className="w-full max-w-[700px] mt-50 ml-10">
        {/* ================= START PAGE ================= */}
        {page === "start" && (
          <CreateArticleHomepage
            articleContent={articleContent}
            articleTitle={articleTitle}
            handleGenerateSummary={handleGenerateSummary}
            setArticleContent={setArticleContent}
            setArticleTitle={setArticleTitle}
            loading={loading}
          />
        )}

        {/* ================= SUMMARY PAGE ================= */}
        {page === "summary" && (
          <CreateSummaryHomepage
            setPage={setPage}
            articleSummary={articleSummary}
            articleTitle={articleTitle}
            handleGenerateQuiz={handleGenerateQuiz}
            loading={loading}
          />
        )}

        {/* ================= QUIZ PAGE ================= */}
        {page === "quiz" && questions[step] && (
          <CreateQuizHomepage
            resetAll={resetAll}
            handleAnswer={handleAnswer}
            questions={questions}
            step={step}
          />
        )}

        {/* ================= RESULT PAGE ================= */}
        {page === "result" && (
          <CreateResultHomepage
            resetAll={resetAll}
            questions={questions}
            correctAnswers={correctAnswers}
            userAnswers={userAnswers}
            setStep={setStep}
            setCorrectAnswers={setCorrectAnswers}
            setUserAnswers={setUserAnswers}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
}
