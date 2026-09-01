import { defineTool } from "@lovable.dev/mcp-js";

const SITE_URL = "https://ajiko-portfolio.vercel.app";

const profile = {
  name: "Ajiko Fidelis",
  role: "IT Specialist, Software Developer & Digital Marketer",
  studio: "Independent practice",
  summary:
    "IT Specialist and Software Developer building websites, e-commerce solutions, digital systems and technology-driven business solutions.",
  siteUrl: SITE_URL,
  contactPageUrl: `${SITE_URL}/contact`,
  channels: {
    whatsapp: "https://wa.me/2348155866150",
    linkedin: "https://www.linkedin.com/in/ajiko001",
    instagram: "https://instagram.com/fidelisajiko",
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
