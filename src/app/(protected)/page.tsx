"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

export default function Home() {
  const [page, setPage] = useState<"page" | "summary" | "test" | "last">(
    "page"
  );
  const [articlecontent, setArticlecontent] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleSummary, setArticleSummary] = useState("");
  const [takeID, setTakeID] = useState("");
  const [generatedtext, setGeneratedtext] = useState<Question[]>([]);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const HandleOnContent = async () => {
    const response = await fetch("/api/generate/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articlecontent, articleTitle }),
    });

    const rawData = await response.json();
    const cleanedText = extractJsonArray(rawData.data || rawData);
    try {
      const parsedArray = JSON.parse(cleanedText);
      setArticleSummary(parsedArray);
      if (parsedArray.length > 0) setPage("test");
    } catch (e) {
      console.error("JSON parse error:", e);
    }
    if (rawData.data) {
      setTakeID(rawData.id.rows[0].id);
      setPage("summary");
    }
  };

  const HandleOnPost = async () => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleSummary, takeID }),
    });

    const rawData = await response.json();
    const cleanedText = extractJsonArray(rawData.data || rawData);

    try {
      const parsedArray = JSON.parse(cleanedText);
      setGeneratedtext(parsedArray);
      if (parsedArray.length > 0) setPage("test");
    } catch (e) {
      console.error("JSON parse error:", e);
    }
  };

  const extractJsonArray = (text: string) => {
    const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    return match ? match[1].trim() : text.trim();
  };

  const HandleOnAnswer = (selectedIndex: number) => {
    const current = generatedtext[step];
    const correctIndex = parseInt(current.answer);
    const isCorrect = selectedIndex === correctIndex;

    if (isCorrect) setScore((prev) => prev + 1);

    if (step + 1 >= generatedtext.length) {
      setPage("last");
    } else {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-accent w-screen h-screen p-10 ">
      {page === "page" && (
        <div className="w-[856px] ml-50 bg-white border-2 rounded-md p-6 mt-50">
          <div className="flex gap-2 mb-2">
            <img src="/Vector.svg" />
            <Link href="/turshih?search=my-project">
              <h1 className="font-bold text-3xl">Article Quiz Generator</h1>
            </Link>
          </div>
          <p className="text-gray-600 mb-4">
            Paste your article below to generate a summary and quiz questions.
          </p>

          <label className="text-gray-700 flex gap-2 mb-2">
            <img src="/Shape.svg" />
            Article title
          </label>
          <Input
            placeholder="Enter a title..."
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
          />

          <label className="text-gray-700 flex gap-2 mt-5 mb-2">
            <img src="/Shape.svg" />
            Article content
          </label>
          <Textarea
            placeholder="Paste your article content here..."
            value={articlecontent}
            onChange={(e) => setArticlecontent(e.target.value)}
          />

          <div className="flex justify-end">
            <Button onClick={HandleOnContent} className="mt-5">
              Generate summary
            </Button>
          </div>
        </div>
      )}

      {page === "summary" && (
        <div className="w-[856px] mx-auto bg-white border-2 rounded-md p-6">
          <div className="flex gap-2 mb-2">
            <img src="/Vector.svg" />
            <h1 className="font-bold text-3xl">Article Quiz Generator</h1>
          </div>

          <p className="text-gray-700 flex gap-2 mb-2 mt-5">
            <img src="/Shape.svg" />
            Summarized Content
          </p>
          <h2 className="font-bold mt-4">{articleTitle}</h2>
          <p className="mt-4">{articleSummary}</p>

          <div className="flex justify-between mt-5">
            <Button variant="outline" onClick={() => setPage("page")}>
              Back
            </Button>
            <Button onClick={HandleOnPost}>Take a quiz</Button>
          </div>
        </div>
      )}

      {page === "test" && generatedtext[step] && (
        <div className="w-[700px] mx-auto bg-white border-2 rounded-md p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Quick Test</h1>
            <Button variant="outline" onClick={() => setPage("page")}>
              X
            </Button>
          </div>

          <p className="text-gray-600 mt-2">
            Question {step + 1} / {generatedtext.length}
          </p>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-6">
              {generatedtext[step].question}
            </h2>

            <div className="flex flex-col gap-3">
              {generatedtext[step].options.map((opt, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  onClick={() => HandleOnAnswer(idx)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {page === "last" && (
        <div className="w-[700px] mx-auto bg-white border-2 rounded-md p-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Quiz Completed 🎉</h1>
          <p className="text-lg">
            Your score: <span className="font-semibold">{score}</span> /
            {generatedtext.length}
          </p>
          <Button
            className="mt-6"
            onClick={() => (setPage("page"), setStep(0), setScore(0))}
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
