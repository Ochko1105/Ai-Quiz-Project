import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="w-[72px] border-r-2 border-[#E4E4E7]">
      <AppSidebar />
      <SidebarTrigger className="h-6 w-6 ml-[26px] mt-[26px] absolute" />
      <main>{children}</main>
    </SidebarProvider>
  );
}
