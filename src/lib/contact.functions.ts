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

    let emailed = false;
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const resendKey = process.env["RESEND_API_KEY"];
    const notify = process.env["CONTACT_NOTIFY_EMAIL"];
    const from = process.env["CONTACT_FROM_EMAIL"] ?? "Portfolio <onboarding@resend.dev>";

    if (lovableKey && resendKey && notify) {
      const html = `
        <h2>New portfolio enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Topic:</strong> ${escapeHtml(data.topic)} &middot; <strong>Budget:</strong> ${escapeHtml(data.budget)}</p>
        <hr />
        <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
      `;

      const response = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": resendKey,
        },
        body: JSON.stringify({
          from,
          to: [notify],
          reply_to: data.email,
          subject: `Portfolio enquiry — ${data.name} (${data.topic})`,
          html,
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        console.error(`Resend request failed [${response.status}]: ${body}`);
      } else {
        emailed = true;
        await supabaseAdmin
          .from("contact_messages")
          .update({ delivered_email: true })
          .eq("id", row.id);
      }
    }

    return { id: row.id, emailed };
  });
