import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <SidebarProvider className="w-[72px] h-screen border-r-2 border-[#E4E4E7]">
        <AppSidebar />

        <SidebarTrigger className="h-6 w-6 ml-[26px] mt-[22px] fixed" />

        <main>{children}</main>
      </SidebarProvider>
    </div>
  );
}
