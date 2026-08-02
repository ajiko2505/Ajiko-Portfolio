import { defineTool } from "@lovable.dev/mcp-js";

const SITE_URL = "https://ajiko.lovable.app";

const profile = {
  name: "Ajiko Fidelis",
  role: "Designer & Developer",
  studio: "Ajiko Fidelis Studio",
  summary:
    "Independent design & engineering practice. Building on the web, from Nigeria — for the world. I design, I code, I build.",
  siteUrl: SITE_URL,
  contactPageUrl: `${SITE_URL}/contact`,
  channels: {
    whatsapp: "https://wa.me/2348155866150",
    linkedin: "https://linkedin.com/in/ajiko001",
    instagram: "https://instagram.com/fidelis.ajiko",
    github: "https://github.com/ajiko2505",
  },
};

export default defineTool({
  name: "get_contact_info",
  title: "Get contact info",
  description:
    "Get Ajiko Fidelis's public profile summary and published contact channels (WhatsApp, LinkedIn, Instagram, GitHub) for hiring or collaboration enquiries.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(profile, null, 2) }],
    structuredContent: profile,
  }),
});
