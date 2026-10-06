"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AgentConfig } from "@/types/Agent";

type AgentContextValue = {
  agent: AgentConfig;
  saveAgent: (changes: Pick<AgentConfig, "name" | "description">) => Promise<AgentConfig>;
};

const AgentContext = createContext<AgentContextValue | null>(null);

export function useAgent() {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error("useAgent must be used within an AgentProvider.");
  }
  return context;
}

export function AgentProvider({ children }: { children: ReactNode }) {
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

  async function saveAgent(changes: Pick<AgentConfig, "name" | "description">) {
    const { data } = await axios.patch<{ agent: AgentConfig }>("/api/agent", {
      agentId,
      name: changes.name,
      description: changes.description,
    });

    setResult((current) => {
      if (!current?.agent || current.agentId !== agentId) return current;
      return { ...current, agent: data.agent };
    });
    window.dispatchEvent(new CustomEvent<AgentConfig>("agent-saved", { detail: data.agent }));
    return data.agent;
  }

  if (!result || result.agentId !== agentId) {
    return <div data-agent-space role="status" className="p-8 text-sm text-muted-foreground">Loading agent…</div>;
  }

  if (!result.agent) {
    return <div data-agent-space role="alert" className="p-8 text-sm text-destructive">{result.error}</div>;
  }

  return (
    <AgentContext.Provider key={result.agent.agentId} value={{ agent: result.agent, saveAgent }}>
      {children}
    </AgentContext.Provider>
  );
}
