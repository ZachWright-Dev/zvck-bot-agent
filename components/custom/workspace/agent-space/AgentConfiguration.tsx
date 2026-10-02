import {
  CalendarDays, Check, ChevronRight, Clock3, Copy, FileText,
  Github, Hash, Mail, Pause, Plug, RotateCcw, Save, Settings2,
  Shuffle, SlidersHorizontal, Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AgentAvatar, previewAgent } from "./AgentPreview";

const configurationTabs = [
  { value: "settings", label: "Settings", icon: SlidersHorizontal },
  { value: "tools", label: "Tools", icon: Plug },
  { value: "schedule", label: "Schedule", icon: CalendarDays },
  { value: "agent-settings", label: "Agent settings", icon: Settings2 },
];

const tools = [
  { name: "Gmail", description: "Email and inbox", icon: Mail, color: "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400" },
  { name: "Slack", description: "Team conversations", icon: Hash, color: "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400" },
  { name: "Google Calendar", description: "Events and availability", icon: CalendarDays, color: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400" },
  { name: "Notion", description: "Notes and documents", icon: FileText, color: "bg-muted text-foreground" },
  { name: "GitHub", description: "Repositories and issues", icon: Github, color: "bg-muted text-foreground" },
];

function SettingsPanel() {
  return (
    <TabsContent value="settings" className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold">Make it your own</h3>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">Give your agent a purpose and a little direction.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="agent-description" className="text-xs">Agent Description</Label>
        <Textarea id="agent-description" defaultValue={previewAgent.description} rows={3} className="min-h-24 resize-y bg-background text-sm leading-6" />
        <p className="text-[11px] leading-5 text-muted-foreground">A short summary of what your agent does.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="agent-instructions" className="text-xs">Agent Instructions</Label>
        <Textarea id="agent-instructions" defaultValue={previewAgent.instructions} rows={10} className="min-h-56 resize-y bg-background text-sm leading-6" />
        <p className="text-[11px] leading-5 text-muted-foreground">Describe its role, tone, and how you’d like it to respond.</p>
      </div>
    </TabsContent>
  );
}

function ToolsPanel() {
  return (
    <TabsContent value="tools">
      <h3 className="text-sm font-semibold">Connect your apps</h3>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">Bring your agent closer to the tools you use every day.</p>
      <div className="mt-5 divide-y">
        {tools.map(({ name, description, icon: Icon, color }) => (
          <div key={name} className="flex items-center gap-3 py-4">
            <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${color}`}><Icon className="size-5" aria-hidden="true" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{name}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{description}</p>
            </div>
            <Button type="button" variant="outline" size="sm" aria-label={`Connect ${name}`}>Connect</Button>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[11px] leading-5 text-muted-foreground">App connections are shown as placeholders in this preview.</p>
    </TabsContent>
  );
}

function SchedulePanel() {
  return (
    <TabsContent value="schedule" className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold">Set a routine</h3>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">Choose when your agent should get to work.</p>
      </div>
      <fieldset className="space-y-2">
        <legend className="mb-2 text-xs font-medium">Run agent</legend>
        {[
          { label: "Manual", description: "Only when you start a conversation", selected: false },
          { label: "Recurring", description: "On a regular schedule", selected: true },
          { label: "Specific time", description: "Once, at a date and time you choose", selected: false },
        ].map(({ label, description, selected }) => (
          <label key={label} className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 ${selected ? "border-blue-200 bg-blue-50/60 dark:border-blue-900 dark:bg-blue-950/20" : "bg-background"}`}>
            <input type="radio" name="schedule-mode" checked={selected} readOnly aria-readonly="true" className="size-3.5 shrink-0 accent-blue-600" />
            <span><span className="block text-xs font-medium">{label}</span><span className="mt-0.5 block text-[11px] text-muted-foreground">{description}</span></span>
          </label>
        ))}
      </fieldset>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="schedule-frequency" className="text-xs">Frequency</Label>
          <NativeSelect id="schedule-frequency" defaultValue="daily" className="w-full bg-background [&_select]:h-10">
            <NativeSelectOption value="daily">Every day</NativeSelectOption>
            <NativeSelectOption value="weekly">Every week</NativeSelectOption>
          </NativeSelect>
        </div>
        <div className="space-y-2">
          <Label htmlFor="schedule-time" className="text-xs">Time</Label>
          <Input id="schedule-time" type="time" defaultValue="08:00" className="h-10 min-w-0 bg-background" />
        </div>
      </div>
      <fieldset>
        <legend className="mb-2 text-xs font-medium">Days</legend>
        <div className="grid grid-cols-7 gap-1.5">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
            <Button key={day} type="button" variant="outline" aria-label={day} aria-pressed="true" className="h-9 min-w-0 rounded-lg border-blue-200 bg-blue-50 p-0 text-xs text-blue-700 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-300">{day.slice(0, 1)}</Button>
          ))}
        </div>
      </fieldset>
      <div className="flex items-start gap-3 rounded-xl border bg-background p-4">
        <Clock3 className="mt-0.5 size-4 shrink-0 text-blue-600" aria-hidden="true" />
        <div><p className="text-xs font-medium">Every day at 8:00 AM</p><p className="mt-1 text-[11px] text-muted-foreground">Example schedule · Your local time</p></div>
      </div>
    </TabsContent>
  );
}

function AgentSettingsPanel() {
  return (
    <TabsContent value="agent-settings" className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold">Manage your agent</h3>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">A few options to keep your workspace organized.</p>
      </div>
      <div className="divide-y rounded-xl border bg-background px-4">
        {[
          { label: "Duplicate Agent", description: "Start with a copy of this agent", icon: Copy },
          { label: "Pause Agent", description: "Take a break from agent activity", icon: Pause },
          { label: "Reset Agent", description: "Return to the default configuration", icon: RotateCcw },
        ].map(({ label, description, icon: Icon }) => (
          <Button key={label} type="button" variant="ghost" className="h-auto w-full justify-start gap-3 rounded-none px-0 py-4 text-left whitespace-normal hover:bg-transparent hover:text-blue-600">
            <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <span className="min-w-0 flex-1"><span className="block text-xs font-medium">{label}</span><span className="mt-1 block text-[11px] font-normal text-muted-foreground">{description}</span></span>
            <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
          </Button>
        ))}
      </div>
      <div className="border-t pt-6">
        <h4 className="text-xs font-semibold text-destructive">Danger Zone</h4>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">Permanently remove this agent from your workspace.</p>
        <Button type="button" variant="destructive" className="mt-4 h-9 gap-2"><Trash2 className="size-4" aria-hidden="true" />Delete Agent</Button>
      </div>
    </TabsContent>
  );
}

export default function AgentConfiguration() {
  return (
    <aside aria-labelledby="agent-configuration-title" className="flex min-w-0 shrink-0 flex-col border-t bg-muted/20 lg:w-[360px] lg:border-t-0 lg:border-l xl:w-[400px] 2xl:w-[420px]">
      <header className="flex min-h-22 shrink-0 items-center justify-between gap-3 border-b px-5 py-4 xl:px-6">
        <div>
          <h2 id="agent-configuration-title" className="text-sm font-semibold">Agent Configuration</h2>
          <p className="mt-1 text-[11px] text-muted-foreground">Tailor your agent to you</p>
        </div>
        <Button type="button" className="h-9 gap-2 bg-blue-600 px-3 text-white hover:bg-blue-700"><Save className="size-3.5" aria-hidden="true" />Save</Button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="space-y-5 px-5 py-6 xl:px-6">
          <div className="flex items-center gap-4">
            <AgentAvatar className="size-16" />
            <div>
              <p className="mb-2 text-xs font-medium">Agent avatar</p>
              <Button type="button" variant="outline" size="sm" className="gap-2 text-xs"><Shuffle className="size-3.5" aria-hidden="true" />Shuffle Avatar</Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="agent-name" className="text-xs">Agent Name</Label>
            <Input id="agent-name" defaultValue={previewAgent.name} className="h-10 bg-background text-sm" />
          </div>
        </div>

        <Tabs defaultValue="settings" className="gap-0">
          <div className="sticky top-0 z-10 border-y bg-background px-5 py-2 xl:px-6">
            <TabsList aria-label="Agent configuration sections" className="grid w-full grid-cols-4 gap-1 bg-transparent p-0 group-data-horizontal/tabs:h-10">
              {configurationTabs.map(({ value, label, icon: Icon }) => (
                <Tooltip key={value}>
                  <TooltipTrigger render={<TabsTrigger value={value} aria-label={label} className="h-10 rounded-lg data-active:bg-blue-50 data-active:text-blue-600 data-active:shadow-none dark:data-active:bg-blue-950/40 dark:data-active:text-blue-300" />}>
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">{label}</TooltipContent>
                </Tooltip>
              ))}
            </TabsList>
          </div>
          <div className="p-5 xl:p-6">
            <SettingsPanel />
            <ToolsPanel />
            <SchedulePanel />
            <AgentSettingsPanel />
          </div>
        </Tabs>
      </div>

      <footer className="flex shrink-0 items-center gap-2 border-t px-5 py-3 text-[11px] text-muted-foreground xl:px-6">
        <Check className="size-3.5" aria-hidden="true" />UI preview · Changes are not saved
      </footer>
    </aside>
  );
}
