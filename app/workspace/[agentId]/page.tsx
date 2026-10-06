import AgentSpace from "@/components/custom/workspace/agent-space/AgentSpace";
import { AgentProvider } from "@/components/custom/workspace/agent-space/AgentProvider";

export default function AgentPage() {
  return (
    <AgentProvider>
      <AgentSpace />
    </AgentProvider>
  );
}
