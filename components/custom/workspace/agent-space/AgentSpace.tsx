"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { AgentConfig } from "@/types/Agent";
import AgentChat from "./AgentChat";
import AgentConfiguration from "./AgentConfiguration";

export default function AgentSpace() {
  const { agentId } = useParams<{ agentId: string }>();
  const [result, setResult] = useState<{
    agentId: string;
    agent: AgentConfig | null;
    error: string | null;
  } | null>(null);

  useEffect(() => {
    async function getAgent() {
      try {
        const { data } = await axios.get<{ agent?: AgentConfig }>("/api/agent", {
          params: { agentId },
        });

        setResult({
          agentId,
          agent: data.agent ?? null,
          error: data.agent ? null : "Agent not found.",
        });
      } catch (error) {
        const status = axios.isAxiosError(error) ? error.response?.status : undefined;
        setResult({
          agentId,
          agent: null,
          error: status === 404
            ? "Agent not found."
            : "Unable to load this agent. Please try refreshing the page.",
        });
      }
    }

    void getAgent();
  }, [agentId]);

  function updateAgent(changes: Partial<Pick<AgentConfig, "name" | "description">>) {
    setResult((current) => {
      if (!current?.agent || current.agentId !== agentId) return current;
      return { ...current, agent: { ...current.agent, ...changes } };
    });
  }

  if (!result || result.agentId !== agentId) {
    return <div data-agent-space role="status" className="p-8 text-sm text-muted-foreground">Loading agent…</div>;
  }

  if (!result.agent) {
    return <div data-agent-space role="alert" className="p-8 text-sm text-destructive">{result.error}</div>;
  }

  return (
    <TooltipProvider delay={200}>
      <div data-agent-space className="flex min-w-0 flex-col bg-background lg:h-[calc(100dvh-4rem)] lg:flex-row lg:overflow-hidden">
        <AgentChat agent={result.agent} />
        <AgentConfiguration agent={result.agent} onAgentChange={updateAgent} />
      </div>
    </TooltipProvider>
  );
}
