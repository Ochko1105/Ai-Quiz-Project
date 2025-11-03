import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar className="mt-16">
      <div className="flex items-center mx-4 justify-between  gap-20 mt-4 ">
        <div className="font-extrabold h-7">History</div>
        <SidebarTrigger className="h-6 w-6 " />
      </div>

      <SidebarHeader />
      <SidebarContent>
        <div className="mx-4">
          <div className="h-6 font-semibold ">Figma ашиглах заавар</div>
        </div>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
