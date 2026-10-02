"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Plus, Shuffle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CreateAgent() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [submitMessage, setSubmitMessage] = useState<string>("");
  // Keep the initial image identical on the server and during hydration.
  const [avatarSeed, setAvatarSeed] = useState<string>("default-agent");
  
  const router = useRouter();
  const avatarImageUrl: string = `https://api.dicebear.com/10.x/gaze/svg?seed=${avatarSeed}`;

  function shuffleAvatar() {
    setAvatarSeed(crypto.randomUUID());

  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    console.log(avatarImageUrl, name, description, submitMessage);
    
    try {
      const agentId = crypto.randomUUID();
      const response = await axios.post('/api/agent', {
        agentId,
        agentImage: avatarImageUrl,
        name,
        description,
      });
      console.log(response);
      router.push("/workspace/" + agentId);
    } catch(e) {
      console.error(`Creating agent threw an error ${e}`);
    }
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
              className={'flex size-28 items-center justify-center rounded-3xl'}
            >
              <img src={avatarImageUrl} alt="" />
            </div>
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
