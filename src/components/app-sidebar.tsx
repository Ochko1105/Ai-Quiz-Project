"use client";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

export function AppSidebar() {
  const router = useRouter();
  type History = {
    articletitle: string;
    id: string;
  };
  const [history, SetHistory] = useState<History[]>([]);
  const getHistory = async () => {
    const result = await fetch("/api/generate");

    const responseData = await result.json();
    console.log({ responseData });
    const { data } = responseData;
    SetHistory(data.rows);
  };
  useEffect(() => {
    getHistory();
  }, []);
  console.log({ history });
  const HistoryOnclick = async (data: { id: string }) => {
    const ID = data.id;
    router.push(`/history?id=${ID}`);
  };

  return (
    <Sidebar className="mt-16">
      <div className="flex items-center mx-4 justify-between  gap-20 mt-4 ">
        <div className="font-extrabold h-7">History</div>
        <SidebarTrigger className="h-6 w-6 " />
      </div>

      <SidebarHeader />
      <SidebarContent>
        <div className="mx-4">
          {history.map((data, index) => (
            <div
              key={index}
              onClick={() => HistoryOnclick(data)}
              className="h-6 font-semibold my-2 "
            >
              {data.articletitle}
            </div>
          ))}
        </div>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
