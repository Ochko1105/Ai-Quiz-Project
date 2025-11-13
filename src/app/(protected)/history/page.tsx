"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LuBookOpen } from "react-icons/lu";

type HistoryDataType = {
  data: {
    Quiz: { question: string; answer: string; options: string[] }[];
    title: string;
    summary: string;
    content: string;
  };
};

type UserAnswer = {
  question: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
};

export default function SearchBar() {
  const [result, setResult] = useState<HistoryDataType | null>(null);
  const [page, setPage] = useState<"page" | "test" | "last">("page");
  const [step, setStep] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const ID = searchParams.get("search");

  // =================== Backend data татах ===================
  const GetHistory = async (ID: string | null) => {
    if (!ID) return;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    try {
      const response = await fetch(`${baseUrl}/api/history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ID }),
        cache: "no-store",
      });
      const responseData = await response.json();
      setResult(responseData);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  useEffect(() => {
    GetHistory(ID);
  }, [ID]);

  // =================== Timer ===================
  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  // =================== Quiz хариулт ===================
  const HandleOnAnswer = (optionIndex: number) => {
    if (!result) return;
    const current = result.data.Quiz[step];
    const correctIndex = parseInt(current.answer);
    const isCorrect = optionIndex === correctIndex;
    const selected = current.options[optionIndex];
    const correct = current.options[correctIndex];

    if (isCorrect) setCorrectAnswers((prev) => prev + 1);

    const updatedAnswers = [
      ...userAnswers,
      { question: current.question, selected, correct, isCorrect },
    ];
    setUserAnswers(updatedAnswers);

    const next = step + 1;
    if (next >= result.data.Quiz.length) {
      setPage("last");
      setTimerRunning(false); // timer зогсоох

      // Backend руу хадгалах
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      fetch(`${baseUrl}/api/save-quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ID,
          userAnswers: updatedAnswers,
          correctAnswers: isCorrect ? correctAnswers + 1 : correctAnswers,
          timeSpent: seconds,
        }),
      }).catch(console.error);
    } else setStep(next);
  };

  if (!result)
    return (
      <div className="text-center ml-50 mt-50 text-gray-500">Loading...</div>
    );

  // ======================== Render ========================
  return (
    <div className="mt-50 ml-50 flex justify-center  ">
      <div className="w-[600px] border-2 bg-white rounded-xl p-6 ">
        {/* ======================== PAGE 1 ======================== */}
        {page === "page" && (
          <>
            <Link href="/">
              <div className="w-12 h-10 border-2 flex items-center justify-center mb-5 cursor-pointer">
                <MdOutlineKeyboardArrowLeft />
              </div>
            </Link>

            <h1 className="font-bold text-3xl flex items-center gap-2 mb-4">
              Article Quiz Generator
            </h1>

            <div className="text-gray-500 mb-2 flex items-center gap-2">
              <LuBookOpen /> Summary
            </div>
            <div className="text-lg font-semibold mb-2">
              {result.data.title}
            </div>
            <div className="mb-4">{result.data.summary}</div>

            <div className="text-gray-500 mb-2">Content:</div>

            <div className="h-10 truncate mb-4">{result.data.content}</div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-[100px] ml-110 mb-4 bg-white text-black border-2">
                  See More
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[600px] p-6 border-2 rounded-xl bg-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold mb-2">
                    {result.data.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="text-gray-700">{result.data.content}</div>

                <div className="flex justify-end mt-4">
                  <DialogClose asChild>
                    <Button>Close</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              className="mt-2 w-[124px]"
              onClick={() => {
                setPage("test");
                setStep(0);
                setUserAnswers([]);
                setCorrectAnswers(0);
                setSeconds(0);
                setTimerRunning(true);
              }}
            >
              Take Quiz
            </Button>
          </>
        )}

        {/* ======================== PAGE 2 ======================== */}
        {page === "test" && (
          <>
            <div className="flex  gap-4 items-center mb-4">
              <h1 className="font-bold text-2xl">Quick Test</h1>
              <div className="text-gray-500 text-lg">
                Time: {Math.floor(seconds / 60)}:
                {(seconds % 60).toString().padStart(2, "0")}
              </div>

              <div className="ml-67">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">X</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="p-6 border-2 rounded-xl w-[500px]">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-2xl font-bold mb-2">
                        Are you sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-red-600 mb-4">
                        If you press 'Cancel', this quiz will restart from the
                        beginning.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex justify-between ">
                      <AlertDialogCancel className="bg-black text-white w-44 h-10 rounded-md">
                        Go Back
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-white text-black border-2 w-44 h-10 rounded-md"
                        onClick={() => {
                          setPage("page");
                          setStep(0);
                          setUserAnswers([]);
                          setCorrectAnswers(0);
                          setTimerRunning(false);
                        }}
                      >
                        Cancel Quiz
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <div className="text-[#71717A]">
              Take a quick test about your knowledge from your content{" "}
            </div>
            <div className="flex items-center justify-between mt-5">
              <div className="mb-6 font-semibold text-lg ">
                {result.data.Quiz[step].question}
              </div>
              <div className="mb-4 text-gray-500 ">
                {step + 1} / {result.data.Quiz.length}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {result.data.Quiz[step].options.map((opt, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  onClick={() => HandleOnAnswer(idx)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </>
        )}

        {/* ======================== PAGE 3 ======================== */}
        {page === "last" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-bold text-2xl">Quiz Completed</h1>
              <Button
                variant="outline"
                onClick={() => {
                  setPage("page");
                  setStep(0);
                  setUserAnswers([]);
                  setCorrectAnswers(0);
                }}
              >
                X
              </Button>
            </div>

            <div className="text-gray-500 mb-2">Your score:</div>
            <div className="font-bold text-xl mb-2">
              {correctAnswers} / {result.data.Quiz.length}
            </div>
            <div className="text-gray-500 mb-4">
              Time spent: {Math.floor(seconds / 60)}:
              {(seconds % 60).toString().padStart(2, "0")}
            </div>

            <div className="space-y-3 mb-4">
              {userAnswers.map((ans, idx) => (
                <div key={idx} className="flex gap-2 items-start border-b pb-2">
                  <img
                    src={ans.isCorrect ? "/rigth.svg" : "/wrong.svg"}
                    className="w-5 h-5 mt-1"
                  />
                  <div>
                    <div className="text-gray-700">
                      {idx + 1}. {ans.question}
                    </div>
                    <div className="text-gray-800">
                      Your answer: {ans.selected}
                    </div>
                    <div
                      className={
                        ans.isCorrect ? "text-green-600" : "text-red-600"
                      }
                    >
                      Correct: {ans.correct}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setStep(0);
                  setUserAnswers([]);
                  setCorrectAnswers(0);
                  setPage("test");
                  setSeconds(0);
                  setTimerRunning(true);
                }}
              >
                Restart Quiz
              </Button>
              <Button onClick={() => router.push(`/`)}>Save and Leave</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
