import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  topic: z.string().trim().min(1).max(40),
  budget: z.string().trim().min(1).max(40),
  message: z.string().trim().min(10).max(1000),
});

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("contact_messages")
      .insert({
        name: data.name,
        email: data.email,
        topic: data.topic,
        budget: data.budget,
        message: data.message,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Failed to store contact message:", error.message);
      throw new Error("Could not save your message. Please try WhatsApp instead.");
    }

    const requestId = row.id as string;
    const log = (level: "info" | "warn" | "error", msg: string, extra?: unknown) => {
      const line = `[contact:${requestId}] ${msg}`;
      if (level === "error") console.error(line, extra ?? "");
      else if (level === "warn") console.warn(line, extra ?? "");
      else console.info(line, extra ?? "");
    };

    let emailed = false;
    let emailError: string | null = null;
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const resendKey = process.env["RESEND_API_KEY"];
    const notify = process.env["CONTACT_NOTIFY_EMAIL"];
    const from = process.env["CONTACT_FROM_EMAIL"] ?? "Portfolio <onboarding@resend.dev>";

    const missing = [
      !lovableKey && "LOVABLE_API_KEY",
      !resendKey && "RESEND_API_KEY",
      !notify && "CONTACT_NOTIFY_EMAIL",
    ].filter(Boolean) as string[];

    if (missing.length > 0) {
      emailError = `email delivery skipped: missing env ${missing.join(", ")}`;
      log("warn", emailError);
    } else {
      const html = `
        <h2>New portfolio enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Topic:</strong> ${escapeHtml(data.topic)} &middot; <strong>Budget:</strong> ${escapeHtml(data.budget)}</p>
        <hr />
        <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
      `;

      const payload = JSON.stringify({
        from,
        to: [notify],
        reply_to: data.email,
        subject: `Portfolio enquiry — ${data.name} (${data.topic})`,
        html,
      });

      const maxAttempts = 3;
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        const startedAt = Date.now();
        try {
          const response = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${lovableKey}`,
              "X-Connection-Api-Key": resendKey!,
            },
            body: payload,
          });

          const durationMs = Date.now() - startedAt;

          if (response.ok) {
            emailed = true;
            emailError = null;
            log("info", `email delivered on attempt ${attempt} in ${durationMs}ms`);
            break;
          }

          const body = await response.text();
          emailError = `Resend request failed [${response.status}] on attempt ${attempt}/${maxAttempts}: ${body}`;
          log("error", emailError);

          // 4xx (other than rate limiting) will not succeed on retry.
          if (response.status < 500 && response.status !== 429) break;
        } catch (err) {
          emailError = `Resend request threw on attempt ${attempt}/${maxAttempts}: ${
            err instanceof Error ? err.message : String(err)
          }`;
          log("error", emailError);
        }

        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 400 * attempt));
        }
      }
    }

    const { error: updateError } = await supabaseAdmin
      .from("contact_messages")
      .update({ delivered_email: emailed, delivery_error: emailError })
      .eq("id", requestId);

    if (updateError) {
      log("error", `failed to record delivery status: ${updateError.message}`);
    }

    if (!emailed) {
      log("warn", "message stored but not emailed; follow up manually");
    }

    return { id: requestId, emailed };
  });

