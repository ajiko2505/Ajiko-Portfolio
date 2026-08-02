import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getProject, projects } from "@/lib/projects";

const SITE_URL = "https://ajiko.lovable.app";

export default defineTool({
  name: "get_project",
  title: "Get project case study",
  description:
    "Get the full case study for one portfolio project by slug: role, timeline, overview, challenge, approach and outcome.",
  inputSchema: {
    slug: z
      .string()
      .min(1)
      .describe(`Project slug. One of: ${projects.map((p) => p.slug).join(", ")}`),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const project = getProject(slug);
    if (!project) {
      throw new ToolError(
        `No project with slug "${slug}". Available slugs: ${projects.map((p) => p.slug).join(", ")}`,
      );
    }

    const detail = {
      slug: project.slug,
      title: project.title,
      category: project.tag,
      year: project.year,
      stack: project.stack,
      blurb: project.blurb,
      hero: project.hero,
      role: project.role,
      timeline: project.timeline,
      overview: project.overview,
      challenge: project.challenge,
      approach: project.approach,
      outcome: project.outcome,
      caseStudyUrl: `${SITE_URL}/work/${project.slug}`,
      externalUrl: project.href,
    };

    return {
      content: [{ type: "text", text: JSON.stringify(detail, null, 2) }],
      structuredContent: detail,
    };
  },
});
