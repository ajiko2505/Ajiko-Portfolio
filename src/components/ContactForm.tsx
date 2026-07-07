import { useState, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trackEvent } from "@/lib/analytics";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80, "Keep it under 80 characters"),
  email: z.string().trim().email("Enter a valid email").max(160),
  topic: z.enum(["project", "collab", "advice", "other"]),
  budget: z.enum(["<2k", "2-5k", "5-15k", "15k+", "unsure"]),
  message: z.string().trim().min(10, "Tell me a bit more").max(1000, "Keep it under 1000 characters"),
});

type FormValues = z.infer<typeof schema>;

const WHATSAPP = "2348155866150";
const EMAIL_FALLBACK = "hello@ajiko.dev";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const statusId = useId();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid, submitCount },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { topic: "project", budget: "unsure" },
  });

  const messageLen = (watch("message") ?? "").length;
  const errorCount = Object.keys(errors).length;

  const onSubmit = handleSubmit(async (values) => {
    const body = [
      `New enquiry from ${values.name} (${values.email})`,
      `Topic: ${values.topic}  ·  Budget: ${values.budget}`,
      "",
      values.message,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(body)}`;
    trackEvent("contact_submit", { topic: values.topic, budget: values.budget });
    if (typeof window !== "undefined") window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    reset({ ...values, message: "" });
  });

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL_FALLBACK);
      setCopied(true);
      trackEvent("email_copy");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be blocked; ignore */
    }
  }

  if (sent) {
    return (
      <div
        className="rounded-3xl border border-border bg-surface/60 p-8 md:p-12 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="text-mono text-mint mb-4">◆ Message queued</div>
        <h3 className="text-display text-4xl mb-3">Talk soon.</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          I opened a WhatsApp window with your note — hit send there and I'll reply within one working day.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setSent(false)}
            className="text-mono px-5 py-3 rounded-full border border-border hover:border-mint hover:text-mint transition min-h-11"
          >
            Send another →
          </button>
          <button
            type="button"
            onClick={copyEmail}
            className="text-mono px-5 py-3 rounded-full border border-border hover:border-mint hover:text-mint transition min-h-11"
          >
            {copied ? "Email copied ✓" : `Or email · ${EMAIL_FALLBACK}`}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Contact form"
      className="rounded-3xl border border-border bg-surface/60 p-6 md:p-10 space-y-6"
    >
      {/* Live region announces validation summary for screen readers */}
      <div id={statusId} className="sr-only" aria-live="polite" role="status">
        {submitCount > 0 && errorCount > 0
          ? `${errorCount} field${errorCount === 1 ? "" : "s"} need attention.`
          : ""}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Your name" error={errors.name?.message} name="name">
          <input
            {...register("name")}
            id="name"
            placeholder="Ada Lovelace"
            className="input"
            autoComplete="name"
            maxLength={80}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </Field>
        <Field label="Email" error={errors.email?.message} name="email">
          <input
            {...register("email")}
            id="email"
            placeholder="you@studio.com"
            type="email"
            inputMode="email"
            className="input"
            autoComplete="email"
            maxLength={160}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="What's this about?" error={errors.topic?.message} name="topic">
          <select {...register("topic")} id="topic" className="input">
            <option value="project">A new project</option>
            <option value="collab">Collaboration</option>
            <option value="advice">Design review / advice</option>
            <option value="other">Something else</option>
          </select>
        </Field>
        <Field label="Rough budget" error={errors.budget?.message} name="budget">
          <select {...register("budget")} id="budget" className="input">
            <option value="unsure">Not sure yet</option>
            <option value="<2k">Under $2k</option>
            <option value="2-5k">$2k — $5k</option>
            <option value="5-15k">$5k — $15k</option>
            <option value="15k+">$15k+</option>
          </select>
        </Field>
      </div>

      <Field label="The details" error={errors.message?.message} name="message">
        <textarea
          {...register("message")}
          id="message"
          rows={5}
          maxLength={1000}
          placeholder="Tell me about the thing you're building, when you need it, and how you found me."
          className="input resize-y min-h-32"
          aria-invalid={!!errors.message}
          aria-describedby={`message-count ${errors.message ? "message-error" : ""}`.trim()}
        />
        <div id="message-count" className="text-mono text-muted-foreground mt-1 text-right" aria-live="polite">
          {messageLen}/1000
        </div>
      </Field>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-mono text-muted-foreground">
          Sends via WhatsApp · No data stored ·{" "}
          <button
            type="button"
            onClick={copyEmail}
            className="underline underline-offset-4 hover:text-mint transition"
          >
            {copied ? "email copied ✓" : "copy email"}
          </button>
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          aria-describedby={statusId}
          className="text-mono px-6 py-3 rounded-full bg-mint text-accent-foreground hover:shadow-mint transition disabled:opacity-50 min-h-11 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
        >
          {isSubmitting ? "Sending…" : submitCount > 0 && !isValid ? "Fix errors & retry →" : "Send message →"}
        </button>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: var(--input);
          color: var(--foreground);
          border: 1px solid var(--border);
          border-radius: 0.9rem;
          padding: 0.85rem 1rem;
          font-size: 1rem;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
          min-height: 2.75rem;
        }
        .input:focus, .input:focus-visible {
          border-color: var(--mint);
          box-shadow: 0 0 0 3px oklch(from var(--mint) l c h / 0.35);
        }
        .input[aria-invalid="true"] {
          border-color: var(--destructive);
        }
        .input::placeholder { color: var(--muted-foreground); opacity: 0.7; }
      `}</style>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={name} className="block">
      <div className="text-mono text-muted-foreground mb-2">{label}</div>
      {children}
      {error && (
        <div id={`${name}-error`} className="text-mono text-destructive mt-1.5" role="alert">
          {error}
        </div>
      )}
    </label>
  );
}
