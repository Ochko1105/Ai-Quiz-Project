"use client";
import { useEffect, useState } from "react";

type QuizAnswer = {
  id: number;
  question: string;
  selected: string;
  correct: string;
  iscorrect: boolean;
};

type Quiz = {
  id: number;
  question: string;
  article?: {
    id: number;
    title: string;
    summary: string;
  };
};

type QuizAttempt = {
  id: number;
  score: number;
  timespent: number;
  createdat: string;
  quiz: Quiz;
  quizanswer: QuizAnswer[];
};

export default function QuizHistory({ userId }: { userId: number | string }) {
  const [history, setHistory] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    if (!userId) return;
    setLoading(true);
    const res = await fetch(`/api/history/user?userId=${userId}`);
    const data = await res.json();
    setHistory(data.data?.attempts || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, [userId]);

  if (loading)
    return <p className="text-center mt-10">⏳ Түүх ачааллаж байна...</p>;

  if (!history.length)
    return <p className="text-center mt-10 text-gray-500">Түүх олдсонгүй 🕳️</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        🧾 Таны Quiz түүх
      </h2>

      {history.map((attempt) => (
        <div
          key={attempt.id}
          className="border rounded-2xl p-5 shadow-md bg-white hover:shadow-lg transition"
        >
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="font-bold text-lg">
                {/* {attempt.quiz.article?.title || "Тодорхойгүй Quiz"} */}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(attempt.createdat).toLocaleString("mn-MN")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-green-600 font-semibold">
                Оноо: {attempt.score}
              </p>
              <p className="text-gray-500 text-sm">
                ⏱ {attempt.timespent}s зарцуулсан
              </p>
            </div>
          </div>

          {/* {attempt.quiz.article?.summary && (
            <p className="text-gray-700 mb-3 text-sm line-clamp-2">
              {attempt.quiz.article.summary}
            </p>
          )} */}

          <div className="mt-3 border-t pt-3">
            <h4 className="font-medium text-gray-700 mb-2">Хариултууд:</h4>
            <ul className="space-y-2">
              {attempt.quizanswer.map((ans) => (
                <li
                  key={ans.id}
                  className={`p-2 rounded-lg ${
                    ans.iscorrect
                      ? "bg-green-50 border border-green-300"
                      : "bg-red-50 border border-red-300"
                  }`}
                >
                  <p className="font-medium">{ans.question}</p>
                  <p>
                    🧠 <b>Таны хариулт:</b> {ans.selected}
                  </p>
                  <p>
                    ✅ <b>Зөв хариулт:</b> {ans.correct}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
