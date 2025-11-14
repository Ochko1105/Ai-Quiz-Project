import React from "react";
import { Button } from "../ui/button";
import { Question } from "@/lib/types";

const CreateQuizHomepage = ({
  resetAll,
  questions,
  step,
  handleAnswer,
}: {
  handleAnswer: Function;
  resetAll: Function;
  questions: Question[];
  step: number;
}) => {
  return (
    <div className="bg-white border rounded-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <img src="/Vector.svg" /> Quick Test
        </h1>
        <Button variant="outline" onClick={() => resetAll()}>
          X
        </Button>
      </div>
      <p className="text-gray-600 mb-4">
        Question {step + 1} / {questions.length}
      </p>
      <h2 className="text-2xl font-semibold mb-4">
        {questions[step].question}
      </h2>
      <div className="flex flex-col gap-3">
        {questions[step].options.map((opt, idx) => (
          <Button key={idx} variant="outline" onClick={() => handleAnswer(idx)}>
            {opt}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CreateQuizHomepage;
