import { Send, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { AgentConfig } from "@/types/Agent";
import { AgentAvatar } from "./AgentPreview";

export default function AgentChat({ agent }: { agent: AgentConfig }) {
  return (
    <section aria-label="Agent chat" className="flex h-[44rem] max-h-[calc(100dvh-4rem)] min-h-[32rem] min-w-0 flex-1 flex-col lg:h-auto lg:max-h-none lg:min-h-0">
      <header className="flex min-h-22 shrink-0 flex-wrap items-center justify-between gap-3 border-b px-5 py-4 xl:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <AgentAvatar agentImage={agent.agentImage} />
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold tracking-tight">{agent.name}</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">Your everyday copilot</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span id="agent-active-label" className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Active</span>
          <Switch checked readOnly aria-labelledby="agent-active-label" aria-label="Agent active status (preview)" className="data-checked:bg-emerald-500" />
        </div>
      </header>

      <div role="region" aria-label="Sample conversation" tabIndex={0} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-7 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 xl:px-7">
        <div className="mx-auto max-w-2xl space-y-7">
          <div className="flex items-center gap-4" aria-hidden="true">
            <div className="h-px flex-1 bg-border/70" />
            <span className="text-[11px] font-medium text-muted-foreground">Today</span>
            <div className="h-px flex-1 bg-border/70" />
          </div>

          <div className="flex items-start gap-3">
            <AgentAvatar agentImage={agent.agentImage} className="size-8" />
            <div className="min-w-0 max-w-[90%] space-y-2">
              <p className="text-xs font-medium">{agent.name} <span className="ml-2 font-normal text-muted-foreground">9:00 AM</span></p>
              <div className="rounded-2xl rounded-tl-sm bg-muted/60 px-4 py-3 text-sm leading-7">
                Hi there! I’m your personal assistant. I can help you plan your day, explore ideas, or make a little more room for what matters. What’s on your mind?
              </div>
            </div>
          </div>

          <div className="ml-auto max-w-[85%] space-y-2">
            <p className="text-right text-xs font-medium">You <span className="ml-2 font-normal text-muted-foreground">9:01 AM</span></p>
            <div className="rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-3 text-sm leading-7 text-white">
              Help me plan a productive morning. I have a project to finish and a team meeting at 11.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <AgentAvatar agentImage={agent.agentImage} className="size-8" />
            <div className="min-w-0 max-w-[90%] space-y-2">
              <p className="text-xs font-medium">{agent.name} <span className="ml-2 font-normal text-muted-foreground">9:01 AM</span></p>
              <div className="space-y-3 rounded-2xl rounded-tl-sm bg-muted/60 px-4 py-3 text-sm leading-7">
                <p>Let’s keep it simple. Here’s a little structure for your morning:</p>
                <ul className="space-y-2">
                  <li><span className="font-medium">9:00 – 10:15</span><br />Focus on the most important part of your project.</li>
                  <li><span className="font-medium">10:15 – 10:30</span><br />Take a short break and recharge.</li>
                  <li><span className="font-medium">10:30 – 11:00</span><br />Wrap up loose ends and prepare your meeting notes.</li>
                </ul>
                <p>Want to break the project into a few smaller steps?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 px-5 pt-3 pb-5 xl:px-7">
        <div className="mx-auto max-w-2xl rounded-2xl border bg-background p-3 shadow-xs focus-within:border-blue-300 dark:focus-within:border-blue-700">
          <label htmlFor="agent-prompt" className="sr-only">Message your agent</label>
          <Textarea id="agent-prompt" placeholder="Ask your agent anything..." rows={2} className="min-h-16 resize-none rounded-none border-0 bg-transparent px-1 py-1 text-sm shadow-none focus-visible:ring-0 dark:bg-transparent" />
          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 px-1 text-[11px] text-muted-foreground"><Sparkles className="size-3.5" aria-hidden="true" />Preview conversation</span>
            <Button type="button" className="h-9 gap-2 rounded-xl bg-blue-600 px-3.5 text-white hover:bg-blue-700">
              Send <Send className="size-3.5" aria-hidden="true" />
            </Button>
          </div>
        </div>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">Sample messages · For layout preview only</p>
      </div>
    </section>
  );
}
