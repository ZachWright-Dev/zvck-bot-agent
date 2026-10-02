import { Bot } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Static content for the AgentSpace UI preview. No agent data is fetched or saved.
export const previewAgent = {
  name: "Personal Assistant",
  image: "https://api.dicebear.com/10.x/gaze/svg?seed=default-agent",
  description: "Your everyday assistant for a more organized, productive day.",
  instructions:
    "You are a thoughtful personal assistant. Help me organize my day, clarify ideas, and turn plans into practical next steps.\n\nKeep your answers clear and concise. Ask a question when you need more context, and use a friendly, professional tone.",
};

export function AgentAvatar({ className = "size-10" }: { className?: string }) {
  return (
    <Avatar className={`${className} shrink-0 rounded-xl bg-blue-50 after:rounded-xl dark:bg-blue-950/40`}>
      <AvatarImage src={previewAgent.image} alt="" className="rounded-xl" />
      <AvatarFallback className="rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">
        <Bot className="size-5" aria-hidden="true" />
      </AvatarFallback>
    </Avatar>
  );
}
