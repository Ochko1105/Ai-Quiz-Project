import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CreateArticleHomepage = ({
  articleTitle,
  articleContent,
  setArticleContent,
  setArticleTitle,
  handleGenerateSummary,
  loading,
}: {
  articleTitle: string;
  articleContent: string;
  setArticleContent: Function;
  setArticleTitle: Function;
  handleGenerateSummary: Function;
  loading: boolean;
}) => {
  return (
    <div className="bg-white border rounded-md p-6">
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-4">
        <img src="/Vector.svg" /> Article Quiz Generator
      </h1>
      <p className="text-gray-600 mb-4">
        Paste your article below to generate a summary and quiz questions.
      </p>
      <label className="text-gray-700 mb-2 flex gap-2">Article Title</label>
      <Input
        value={articleTitle}
        onChange={(e) => setArticleTitle(e.target.value)}
      />
      <label className="text-gray-700 mt-4 mb-2 flex gap-2">
        Article Content
      </label>
      <Textarea
        value={articleContent}
        onChange={(e) => setArticleContent(e.target.value)}
      />
      <div className="flex justify-end mt-4">
        <Button
          onClick={() => handleGenerateSummary()}
          disabled={!articleContent}
        >
          {loading ? "Generating..." : "Generate Summary"}
        </Button>
      </div>
    </div>
  );
};

export default CreateArticleHomepage;
