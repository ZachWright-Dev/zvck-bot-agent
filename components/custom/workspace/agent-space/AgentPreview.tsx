import { Bot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AgentAvatar({ agentImage, className = "size-10" }: { agentImage: string; className?: string }) {
  return (
    <Avatar className={`${className} shrink-0 rounded-xl bg-blue-50 after:rounded-xl dark:bg-blue-950/40`}>
      <AvatarImage src={agentImage ?? undefined} alt="" className="rounded-xl" />
      <AvatarFallback className="rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">
        <Bot className="size-5" aria-hidden="true" />
      </AvatarFallback>
    </Avatar>
  );
}
