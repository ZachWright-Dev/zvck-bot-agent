import type { CSSProperties, ReactNode } from "react";
import AppSideBar from "@/components/custom/workspace/AppSideBar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider style={{ "--sidebar-width": "17.5rem" } as CSSProperties}>
      <AppSideBar />
      <SidebarInset className="min-w-0">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b px-5">
          <SidebarTrigger />
          <span className="text-sm font-medium text-muted-foreground">Workspace</span>
        </header>
        <div className="flex-1 p-5 sm:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
