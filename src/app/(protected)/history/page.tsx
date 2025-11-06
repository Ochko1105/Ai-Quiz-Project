import History from "@/components/Home/History";

import { LuBookOpen } from "react-icons/lu";

// import { useSearchParams } from "next/navigation";

type HistoryPageProps = {
  searchParams: Promise<{ id: string }>;
};
const HistoryPage = async ({ searchParams }: HistoryPageProps) => {
  const params = await searchParams;
  const ID = params.id;
  console.log({ ID });

  return (
    <div>
      <div className="mt-10">
        <div className="h-72 mt-50">
          <History ID={ID}></History>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
