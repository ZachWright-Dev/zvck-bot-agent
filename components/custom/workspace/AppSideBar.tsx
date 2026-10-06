"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Bot, Code2, Compass, Plus, Search, Store, UserRound } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { AgentConfig } from "@/types/Agent";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

// Replace these samples with the signed-in user's agents when that API is ready.

export default function AppSideBar() {
  const [agents, setAgents] = useState<AgentConfig[]>([]);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { setOpenMobile } = useSidebar();
  const user = session?.user;
  const username = user?.name?.trim() || user?.email?.split("@")[0] || "Your account";
  const initials = username.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const closeMobileSidebar = () => setOpenMobile(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);


  const fetchAgents = async() => {
    const response = await axios.get('/api/agent');
    const fetchedAgents: AgentConfig[] = response.data.agents;
    setAgents(fetchedAgents);
  }

  useEffect(() => {
    fetchAgents();  
  }, [pathname])

  useEffect(() => {
    function handleAgentSaved(event: Event) {
      const savedAgent = (event as CustomEvent<AgentConfig>).detail;
      setAgents((current) => current.map((agent) => agent.agentId === savedAgent.agentId ? savedAgent : agent));
    }

    window.addEventListener("agent-saved", handleAgentSaved);
    return () => window.removeEventListener("agent-saved", handleAgentSaved);
  }, []);

  return (
    <Sidebar className="border-sidebar-border/70">
      <SidebarHeader className="gap-7 px-5 pt-7 pb-6">
        <Link
          href="/workspace"
          onClick={closeMobileSidebar}
          className="flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {/* Frame the robot mark from the supplied square logo artwork. */}
          <span className="relative size-11 shrink-0 overflow-hidden rounded-xl bg-white" aria-hidden="true">
            <Image
              src="/logo.png"
              alt=""
              width={1254}
              height={1254}
              sizes="168px"
              priority
              className="absolute -top-[133%] -left-[17%] h-auto w-[380%] max-w-none"
            />
          </span>
          <span className="text-xl font-semibold tracking-tight">Zvck Agent</span>
        </Link>

        <Button
          render={<Link href="/workspace/create-agent" onClick={closeMobileSidebar} />}
          nativeButton={false}
          className="h-11 w-full gap-2 rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/15 hover:bg-blue-700 focus-visible:ring-blue-500/40"
        >
          <Plus className="size-4" aria-hidden="true" />
          Create New Agent
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel id="your-agents-label" className="mb-2 px-3 text-xs font-medium tracking-wide text-muted-foreground">
            Your Agents
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <nav aria-labelledby="your-agents-label">
              <SidebarMenu className="gap-1">
                {agents.map((agent) => {
                  const href = `/workspace/${agent.agentId}`;
                  return (
                    <SidebarMenuItem key={agent.agentId}>
                      <SidebarMenuButton
                        render={<Link href={href} onClick={closeMobileSidebar} />}
                        isActive={isActive(href)}
                        aria-current={isActive(href) ? "page" : undefined}
                        className="h-14 gap-3 rounded-xl px-3 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-active:bg-blue-50 data-active:text-blue-700 dark:data-active:bg-blue-950/50 dark:data-active:text-blue-300"
                      >
                        <Avatar className="size-9 rounded-xl after:rounded-xl">
                          {agent.agentImage && (
                            <AvatarImage className="rounded-xl" src={agent.agentImage} alt="" />
                          )}
                          <AvatarFallback className="rounded-xl">
                            <Bot className="size-4" aria-hidden="true" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate font-medium">{agent.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-4 px-3 pt-4 pb-5">
        <nav aria-label="Marketplace">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/workspace/marketplace" onClick={closeMobileSidebar} />}
                isActive={isActive("/workspace/marketplace")}
                aria-current={isActive("/workspace/marketplace") ? "page" : undefined}
                className="h-11 gap-3 rounded-xl px-3 text-muted-foreground transition-colors data-active:bg-blue-50 data-active:text-blue-700 dark:data-active:bg-blue-950/50 dark:data-active:text-blue-300"
              >
                <Store className="size-4" aria-hidden="true" />
                <span>Marketplace</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </nav>

        <div className="flex min-w-0 items-center gap-3 border-t border-sidebar-border px-3 pt-5" aria-busy={status === "loading"}>
          <Avatar size="lg" className="shrink-0">
            {user?.image && <AvatarImage src={user.image} alt={username} referrerPolicy="no-referrer" />}
            <AvatarFallback className="bg-slate-200 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {user ? initials : <UserRound className="size-4" aria-hidden="true" />}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            {status === "loading" ? (
              <span className="text-sm text-muted-foreground" role="status">Loading profile…</span>
            ) : (
              <>
                <p className="truncate text-sm font-semibold" title={username}>{username}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">Personal workspace</p>
              </>
            )}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
