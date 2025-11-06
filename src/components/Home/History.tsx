import React from "react";
import { LuBookOpen } from "react-icons/lu";
import { Button } from "../ui/button";
import { GetHistory } from "@/utilis/get-data";

const History = async ({ ID }: { ID: string }) => {
  const HistoryData: any = await GetHistory(ID);

  console.log({ HistoryData });

  return (
    <div>
      <div className="w-[628px] h-fit ml-34  border-2 bg-white">
        <div className="mx-7 mb-7">
          <div className="flex gap-2">
            <img src="/Vector.svg" />
            <div className="font-bold text-[32px]">Article Quiz Generator</div>
          </div>

          <div className="mt-5 text-[#71717A] flex gap-2 items-center">
            <LuBookOpen />
            Summarized content
          </div>
          <div className="text-[24px] font-bold">Genghis Khan</div>
          <div>
            Genghis Khan, born Temüjin around 1162, was the founder of the
            Mongol Empire. After his father's death, Temüjin's family was left
            in poverty, and he later killed his half-brother to secure his
            position. He built alliances with leaders like Jamukha and Toghrul,
            and despite being defeated in battle and briefly under the Jin
            dynasty, he rose to power by defeating rivals. By 1206, after
            overcoming the Naiman tribe and executing Jamukha, Temüjin became
            the undisputed ruler of the Mongol steppe, eventually leading a
            series of successful military campaigns that expanded his empire
            across China and Central Asia.
          </div>
          <div className="mt-5 text-[#71717A] flex gap-2">
            <img src="/Shape.svg" />
            Article Content
          </div>
          <div className="h-[60px] flex flex-wrap w-[572px] text-ellipsis ">
            <div className=" w-[572px] h-60px] truncate  ">
              Genghis Khan[a] (born Temüjin; c. 1162 – August 1227), also known
              as Chinggis Khan,[b] was the founder and first khan of the Mongol
              Empire. After spending most of his life uniting the Mongol tribes,
              he launched a series of military campaigns, conquering large parts
              of China and Central Asia. Born between 1155 and 1167 and given
              the name Temüjin, he was the eldest child of Yesugei, a Mongol
              chieftain of the Borjigin clan, and his wife Hö'elün. When Temüjin
              was eight, his father died and his family was abandoned by its
              tribe. Reduced to near-poverty, Temüjin killed his older
              half-brother to secure his familial position. His charismatic
              personality helped to attract his first followers and to form
              alliances with two prominent steppe leaders named Jamukha and
              Toghrul; they worked together to retrieve Temüjin's newlywed wife
              Börte, who had been kidnapped by raiders. As his reputation grew,
              his relationship with Jamukha deteriorated into open warfare.
              Temüjin was badly defeated in c. 1187, and may have spent the
              following years as a subject of the Jin dynasty; upon reemerging
              in 1196, he swiftly began gaining power. Toghrul came to view
              Temüjin as a threat and launched a surprise attack on him in 1203.
              Temüjin retreated, then regrouped and overpowered Toghrul; after
              defeating the Naiman tribe and executing Jamukha, he was left as
              the sole ruler on the Mongolian steppe.
            </div>
            <Button className="ml-115 mt-3 bg-white text-black ">
              See more
            </Button>
          </div>

          <div className="flex justify-start">
            <Button className="mt-5 ">Take quiz</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
