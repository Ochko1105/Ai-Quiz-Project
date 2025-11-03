"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const Home = () => {
  const [page, setPage] = useState<string>("test");
  const data = [
    {
      answer: "They were abandoned and became poor",
    },
    {
      answer: "They were abandoned and became poor",
    },
    {
      answer: "They were abandoned and became poor",
    },

    {
      answer: "They were abandoned and became poor",
    },
  ];
  return (
    <div className="bg-accent w-screen h-screen ">
      {page === "page" && (
        <div>
          <div className="h-12"></div>
          <div className="w-[856px] h-fit ml-64  border-2 bg-white">
            <div className="mx-7 mb-7">
              <div className="flex gap-2">
                <img src="/Vector.svg" />
                <div className="font-bold text-[32px]">
                  Article Quiz Generator
                </div>
              </div>
              <div className="mt-2 text-[#71717A]">
                Paste your article below to generate a summarize and quiz
                question. Your articles will saved in the sidebar for future
                reference.
              </div>
              <div className="mt-5 text-[#71717A] flex gap-2">
                <img src="/Shape.svg" />
                Article title
              </div>
              <Input
                placeholder="Enter a title for your article.."
                type="text"
              />
              <div className="mt-5 text-[#71717A] flex gap-2">
                <img src="/Shape.svg" />
                Article Content
              </div>
              <Textarea placeholder="Paste your article content here..." />
              <div className="flex justify-end">
                <Button className="mt-5 ">Generate summary</Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {page === "test" && (
        <div className="w-[680px] h-fit ml-64">
          <div className="h-30"></div>
          <div className="mx-7 ">
            <div className="flex justify-between w-[680px]">
              <div className="flex gap-2">
                <img src="/Vector.svg" />
                <div className="font-bold text-[32px]">Quick test</div>
              </div>

              <div>
                <Button
                  className="bg-white text-black border-2"
                  onClick={() => setPage("page")}
                >
                  X
                </Button>
              </div>
            </div>
            <div className="mt-2 text-[#71717A]">
              Take a quick test about your knowledge from your content
            </div>
            <div className="mt-6 border-2 bg-white rounded-md w-[680px]">
              <div className="mx-7">
                <div className="flex justify-between items-center ">
                  <div className="mt-7 text-[28px] font-semibold">
                    What was Genghis Khan’s birth name?
                  </div>
                  <div className="text-[28px] mt-7">
                    3<span className="text-[#737373] text-[20px]"> / 5</span>
                  </div>
                </div>
                <div className="flex flex-wrap w-[680px] gap-4 h-fit mt-10 mb-10">
                  {data.map((dat) => (
                    <Button className="w-[304px] bg-white text-black border-2 h-10">
                      {dat.answer}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
