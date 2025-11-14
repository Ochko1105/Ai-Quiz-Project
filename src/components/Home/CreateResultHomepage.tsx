import React from "react";
import { Button } from "../ui/button";
import { Question, UserAnswer } from "@/lib/types";

const CreateResultHomepage = ({
  resetAll,
  questions,
  correctAnswers,
  userAnswers,
  setStep,
  setCorrectAnswers,
  setUserAnswers,
  setPage,
}: {
  resetAll: Function;
  questions: Question[];
  correctAnswers: number;
  userAnswers: UserAnswer[];
  setStep: Function;
  setCorrectAnswers: Function;
  setUserAnswers: Function;
  setPage: Function;
}) => {
  return (
    <div className="bg-white border rounded-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <img src="/Vector.svg" /> Quiz Completed
        </h1>
        <Button variant="outline" onClick={() => resetAll()}>
          X
        </Button>
      </div>
      <p className="text-gray-600 mb-4">Here’s your score</p>
      <div className="border-2 rounded-md p-6 mb-4">
        <div className="text-3xl font-bold mb-4">
          Your score: {correctAnswers} / {questions.length}
        </div>
        <div className="space-y-4 mb-4">
          {userAnswers.map((ans, i) => (
            <div key={i} className="flex gap-3 items-start border-b pb-3">
              <img
                src={ans.isCorrect ? "/rigth.svg" : "/wrong.svg"}
                className="w-6 h-6 mt-1"
              />
              <div>
                <div className="text-gray-700 font-medium">
                  {i + 1}. {ans.question}
                </div>
                <div className="text-gray-800">Your answer: {ans.selected}</div>
                <div
                  className={ans.isCorrect ? "text-green-600" : "text-red-600"}
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
              setCorrectAnswers(0);
              setUserAnswers([]);
              setPage("quiz");
            }}
          >
            Restart Quiz
          </Button>
          <Button onClick={() => resetAll()}>Save and Leave</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateResultHomepage;
