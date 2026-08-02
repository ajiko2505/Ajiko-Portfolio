import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects } from "@/lib/projects";

const SITE_URL = "https://ajiko.lovable.app";

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description:
    "List every project in Ajiko Fidelis's portfolio with its slug, title, category, year, stack and short blurb. Optionally filter by category or year.",
  inputSchema: {
    category: z.string().optional().describe("Filter by category tag, e.g. 'Writing' or 'System'."),
    year: z.string().optional().describe("Filter by year, e.g. '2025'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, year }) => {
    const items = projects
      .filter((p) => (category ? p.tag.toLowerCase() === category.toLowerCase() : true))
      .filter((p) => (year ? p.year === year : true))
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.tag,
        year: p.year,
        stack: p.stack,
        blurb: p.blurb,
        caseStudyUrl: `${SITE_URL}/work/${p.slug}`,
        externalUrl: p.href,
      }));

    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { count: items.length, projects: items },
    };
  },
});
