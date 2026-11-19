"use client";

import { useState } from "react";
import { Button, ButtonRow } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const field =
  "border-border bg-surface text-text focus-visible:outline-accent mt-1 block min-h-11 w-full rounded-md border px-3 py-2 text-base";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json()) as { ok: boolean; error?: string; errors?: Errors };
      if (body.ok) {
        form.reset();
        setStatus("sent");
        setMessage("Thank you. Your message has been sent.");
      } else {
        setErrors(body.errors ?? {});
        setMessage(body.error ?? "Message could not be sent.");
        setStatus("error");
      }
    } catch {
      setMessage("Message could not be sent. Please check your connection.");
      setStatus("error");
    }
  }

  return (
    <Section id="contact" title="Contact">
      <p className="text-muted mb-8 max-w-prose">
        For trials, academy pathways or match footage, send a message below.
      </p>
      <form onSubmit={onSubmit} noValidate className="max-w-xl space-y-5">
        <div>
          <label htmlFor="c-name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="c-name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "c-name-err" : undefined}
            className={field}
          />
          {errors.name && (
            <p id="c-name-err" className="text-sm text-red-700 dark:text-red-400">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="c-email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "c-email-err" : undefined}
            className={field}
          />
          {errors.email && (
            <p id="c-email-err" className="text-sm text-red-700 dark:text-red-400">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="c-message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="c-message"
            name="message"
            rows={5}
            required
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "c-message-err" : undefined}
            className={field}
          />
          {errors.message && (
            <p id="c-message-err" className="text-sm text-red-700 dark:text-red-400">
              {errors.message}
            </p>
          )}
        </div>
        <div aria-hidden="true" className="absolute -left-[9999px]">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <p role="status" aria-live="polite" className="min-h-6 text-sm">
          {status === "sent" || status === "error" ? message : ""}
        </p>
        <ButtonRow>
          <Button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending" : "Send message"}
          </Button>
        </ButtonRow>
      </form>
    </Section>
  );
}
