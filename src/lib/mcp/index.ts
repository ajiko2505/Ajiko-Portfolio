import { defineMcp } from "@lovable.dev/mcp-js";

import getContactInfoTool from "./tools/get-contact-info";
import getProjectTool from "./tools/get-project";
import listProjectsTool from "./tools/list-projects";

export default defineMcp({
  name: "ajiko-s-portfolio",
  title: "Ajiko's Portfolio",
  version: "0.1.0",
  instructions:
    "Public tools for Ajiko Fidelis's portfolio. Use `list_projects` to browse the work, `get_project` for a full case study by slug, and `get_contact_info` for the studio profile and contact channels.",
  tools: [listProjectsTool, getProjectTool, getContactInfoTool],
});
