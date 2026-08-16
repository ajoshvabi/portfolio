"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot check (done server-side too, but quick client-side guard)
    if (data.get("website")) {
      setState("idle");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          website: data.get("website"), // honeypot
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }

      setState("success");
      form.reset();
    } catch (err: unknown) {
      setState("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (state === "success") {
    return (
      <div className="glass-card rounded-3xl p-10 flex flex-col items-center justify-center text-center gap-6 border border-outline/10 dark:border-white/5 min-h-[400px]">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-5xl">check_circle</span>
        </div>
        <h3 className="text-2xl font-bold">Message sent!</h3>
        <p className="text-outline max-w-sm">
          Thanks for reaching out. I&apos;ll review your message and get back to you
          within 24 hours.
        </p>
        <button
          onClick={() => setState("idle")}
          className="text-xs font-bold uppercase text-primary border border-primary/30 px-6 py-2.5 rounded-full hover:bg-primary/10 transition-all"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card rounded-3xl p-8 md:p-10 border border-outline/10 dark:border-white/5 space-y-6"
    >
      {/* Honeypot field — hidden from real users, bots fill it */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
        autoComplete="off"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="contact-name"
            className="text-xs font-bold uppercase tracking-wider text-outline"
          >
            Your Name <span className="text-primary">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="John Doe"
            className="w-full bg-surface-variant/20 dark:bg-white/5 border border-outline/20 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-outline/50 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="contact-email"
            className="text-xs font-bold uppercase tracking-wider text-outline"
          >
            Email Address <span className="text-primary">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            className="w-full bg-surface-variant/20 dark:bg-white/5 border border-outline/20 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-outline/50 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="contact-subject"
          className="text-xs font-bold uppercase tracking-wider text-outline"
        >
          Subject <span className="text-primary">*</span>
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          className="w-full bg-surface-variant/20 dark:bg-white/5 border border-outline/20 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all"
        >
          <option value="">Select a topic…</option>
          <option value="Flutter App Development">Flutter App Development</option>
          <option value="MERN Stack Development">MERN Stack Development</option>
          <option value="Web Development">Web Development</option>
          <option value="Architecture Consulting">Architecture Consulting</option>
          <option value="General Inquiry">General Inquiry</option>
        </select>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="contact-message"
          className="text-xs font-bold uppercase tracking-wider text-outline"
        >
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          minLength={20}
          placeholder="Tell me about your project — what you're building, your timeline, and any specific requirements…"
          className="w-full bg-surface-variant/20 dark:bg-white/5 border border-outline/20 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-outline/50 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all resize-none"
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full bg-primary dark:bg-[#e0ffff] text-on-primary dark:text-[#0a0f1a] py-4 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-3 hover:shadow-[0_0_25px_rgba(0,105,112,0.4)] dark:hover:shadow-[0_0_25px_rgba(0,219,233,0.5)] transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "submitting" ? (
          <>
            <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <span className="material-symbols-outlined text-[16px]">send</span>
          </>
        )}
      </button>
    </form>
  );
}
