"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Bot, BotMessageSquare, Plus, Shuffle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const avatars = [
  { name: "Blue robot", icon: Bot, color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300" },
  { name: "Violet chat robot", icon: BotMessageSquare, color: "bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300" },
  { name: "Emerald robot", icon: Bot, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300" },
  { name: "Amber chat robot", icon: BotMessageSquare, color: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300" },
  { name: "Rose robot", icon: Bot, color: "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-300" },
  { name: "Sky chat robot", icon: BotMessageSquare, color: "bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-300" },
];

export default function CreateAgent() {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const avatar = avatars[avatarIndex];
  const AvatarIcon = avatar.icon;

  function shuffleAvatar() {
    // A nonzero offset always selects a different avatar.
    setAvatarIndex((current) => (current + 1 + Math.floor(Math.random() * (avatars.length - 1))) % avatars.length);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Connect agent persistence here when the creation API is available.
    setSubmitMessage("Agent creation is not available yet. Your details have been kept in this form.");
  }

  return (
    <main className="mx-auto w-full max-w-xl py-4 sm:py-8">
      <header className="mb-8 sm:mb-10">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Create New Agent</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
          Set up your AI agent by choosing an avatar, name, and description. You can configure its tools and behavior later.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm">
        <div className="space-y-8 p-5 sm:p-8">
          <div className="flex flex-col items-center gap-4 pb-2">
            <div
              role="img"
              aria-label={avatar.name}
              className={`flex size-28 items-center justify-center rounded-3xl ring-8 ring-muted/50 transition-colors ${avatar.color}`}
            >
              <AvatarIcon className="size-14" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <span className="sr-only" role="status">Selected avatar: {avatar.name}</span>
            <Button type="button" variant="outline" onClick={shuffleAvatar} className="mt-2 h-9 gap-2 px-3 text-muted-foreground">
              <Shuffle className="size-4" aria-hidden="true" />
              Shuffle Image
            </Button>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="agent-name">Agent name</Label>
            <Input
              id="agent-name"
              name="name"
              placeholder="e.g. Research assistant"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              pattern=".*\S.*"
              title="Enter a name with at least one non-space character."
              className="h-11 px-3 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="agent-description">
              Agent Description
              <span className="text-xs font-normal text-muted-foreground">Optional</span>
            </Label>
            <Textarea
              id="agent-description"
              name="description"
              placeholder="Describe what this agent will help you with..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              className="min-h-32 resize-y px-3 py-3 leading-6 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
            />
          </div>

          {submitMessage && (
            <p role="status" className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
              {submitMessage}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t bg-muted/20 p-5 sm:flex-row-reverse sm:px-8 sm:py-5">
          <Button type="submit" disabled={!name.trim()} className="h-11 gap-2 rounded-xl bg-blue-600 px-5 text-white shadow-sm shadow-blue-600/15 hover:bg-blue-700 focus-visible:ring-blue-500/40">
            <Plus className="size-4" aria-hidden="true" />
            Create Agent
          </Button>
          <Button variant="outline" render={<Link href="/workspace" />} nativeButton={false} className="h-11 rounded-xl px-5">
            Cancel
          </Button>
        </div>
      </form>
    </main>
  );
}
