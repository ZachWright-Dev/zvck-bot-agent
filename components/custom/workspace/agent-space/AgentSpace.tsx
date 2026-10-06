import { TooltipProvider } from "@/components/ui/tooltip";
import AgentChat from "./AgentChat";
import AgentConfiguration from "./AgentConfiguration";

export default function AgentSpace() {
  return (
    <TooltipProvider delay={200}>
      <div data-agent-space className="flex min-w-0 flex-col bg-background lg:h-[calc(100dvh-4rem)] lg:flex-row lg:overflow-hidden">
        <AgentChat />
        <AgentConfiguration />
      </div>
    </TooltipProvider>
  );
}
