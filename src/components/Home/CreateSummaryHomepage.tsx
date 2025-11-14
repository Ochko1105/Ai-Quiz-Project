import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Button } from "../ui/button";

const CreateSummaryHomepage = ({
  setPage,
  articleTitle,
  articleSummary,
  handleGenerateQuiz,
  loading,
}: {
  setPage: Function;
  articleTitle: string;
  articleSummary: string;
  handleGenerateQuiz: Function;
  loading: boolean;
}) => {
  return (
    <div className="bg-white border rounded-md p-6">
      <div
        className="flex items-center gap-2 mb-4 cursor-pointer"
        onClick={() => setPage("start")}
      >
        <MdOutlineKeyboardArrowLeft /> Back
      </div>
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-4">
        <img src="/Vector.svg" /> Article Summary
      </h1>
      <h2 className="font-bold text-lg">{articleTitle}</h2>
      <p className="mt-2 text-gray-700 whitespace-pre-wrap">{articleSummary}</p>
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => setPage("start")}>
          Back
        </Button>
        <Button onClick={() => handleGenerateQuiz()} disabled={loading}>
          {loading ? "Generating Quiz..." : "Take a Quiz"}
        </Button>
      </div>
    </div>
  );
};

export default CreateSummaryHomepage;
