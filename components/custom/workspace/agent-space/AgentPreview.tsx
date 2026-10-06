"use client";

import { Bot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAgent } from "./AgentProvider";

export function AgentAvatar({ className = "size-10" }: { className?: string }) {
  const { agent } = useAgent();

  return (
    <Avatar className={`${className} shrink-0 rounded-xl bg-blue-50 after:rounded-xl dark:bg-blue-950/40`}>
      <AvatarImage src={agent.agentImage ?? undefined} alt="" className="rounded-xl" />
      <AvatarFallback className="rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">
        <Bot className="size-5" aria-hidden="true" />
      </AvatarFallback>
    </Avatar>
  );
}
