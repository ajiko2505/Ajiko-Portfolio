import { auth, defineMcp } from "@lovable.dev/mcp-js";

import getContactInfoTool from "./tools/get-contact-info";
import getProjectTool from "./tools/get-project";
import listProjectsTool from "./tools/list-projects";

// Issuer must be the direct Supabase auth host (the proxy form fails RFC 8414 checks).
const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "ajiko-s-portfolio",
  title: "Ajiko's Portfolio",
  version: "0.1.0",
  instructions:
    "Tools for Ajiko Fidelis's portfolio, available to signed-in users. Use `list_projects` to browse the work, `get_project` for a full case study by slug, and `get_contact_info` for the studio profile and contact channels.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listProjectsTool, getProjectTool, getContactInfoTool],
});

