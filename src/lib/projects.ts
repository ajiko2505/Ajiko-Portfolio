export type Project = {
  slug: string;
  title: string;
  tag: string;
  year: string;
  stack: string[];
  blurb: string;
  href: string;
  tone: "mint" | "mint-soft" | "forest" | "dark";
  size: "tall" | "short" | "wide";
  hero: string;
  role: string;
  timeline: string;
  overview: string;
  challenge: string;
  approach: string[];
  outcome: string[];
};

export const projects: Project[] = [
  {
    slug: "works",
    title: "Works",
    tag: "Open Source",
    year: "2024",
    stack: ["PHP", "Web", "GitHub Pages"],
    blurb: "A living gallery of web experiments, deployed via GitHub Pages.",
    href: "https://ajiko2505.github.io/Works/",
    tone: "mint",
    size: "tall",
    hero: "A rotating showcase of small builds — deliberate, hand-typed, deployed.",
    role: "Design · Engineering · Everything",
    timeline: "Ongoing · 2024–now",
    overview: "Works is my public sketchbook. Each entry is a small, self-contained page or micro-tool — an excuse to try one idea end-to-end without the ceremony of a full product.",
    challenge: "Keep a personal project alive long enough to matter. Most portfolios go stale in a season; this one had to survive the pace of client work.",
    approach: [
      "Adopted a friction-free publishing loop: a single repo, static output, one push to ship.",
      "Standardized on a light typography system so every entry feels part of the same voice.",
      "Automated the boring bits — indexing, previews, links — so writing stays the only real work.",
    ],
    outcome: [
      "A collection that compounds. Every entry is discoverable, indexable, and permanent.",
      "A weekly rhythm that survived two client sprints and one full year.",
    ],
  },
  {
    slug: "profile-os",
    title: "Profile OS",
    tag: "Identity",
    year: "2024",
    stack: ["Markdown", "GitHub"],
    blurb: "The README behind @ajiko2505 — three verbs, one signal.",
    href: "https://github.com/ajiko2505/ajiko2505",
    tone: "forest",
    size: "short",
    hero: "An identity system built from three words — design, code, build.",
    role: "Identity · Copy · Layout",
    timeline: "2024 · 2 weeks",
    overview: "A minimalist personal profile designed to say the least amount possible while still being unmistakable.",
    challenge: "Communicate a whole practice in the six seconds someone spends on a GitHub profile.",
    approach: [
      "Cut the copy down to three verbs and one statement.",
      "Used typography and rhythm — not emoji — to create signal.",
      "Anchored the whole thing to a single, quiet color accent.",
    ],
    outcome: [
      "A profile that reads at a glance and stays honest.",
      "A template I now reuse across other social surfaces.",
    ],
  },
  {
    slug: "interface-sketches",
    title: "Interface Sketches",
    tag: "Ongoing",
    year: "2025",
    stack: ["Figma", "React", "Motion"],
    blurb: "Weekly UI studies exploring type systems, density, and motion.",
    href: "https://github.com/ajiko2505",
    tone: "dark",
    size: "wide",
    hero: "Fifty-two weeks. Fifty-two interfaces. One sharpened instinct.",
    role: "Design Research",
    timeline: "2025 · Weekly cadence",
    overview: "A public discipline: one interface sketch every week, no exceptions. The goal is not portfolio pieces but sharpened pattern recognition.",
    challenge: "Keep the practice honest when nobody is watching, and useful when they are.",
    approach: [
      "Fixed a repeating format — 90 minutes, one interface, no polish beyond the idea.",
      "Rotated through domains weekly — settings, empty states, forms, feeds — to build coverage.",
      "Documented what worked and what didn't in a public log.",
    ],
    outcome: [
      "A visible archive of decisions and dead-ends.",
      "Faster first sketches on client work — the muscle now runs before I think.",
    ],
  },
  {
    slug: "field-notes",
    title: "Field Notes",
    tag: "Writing",
    year: "2025",
    stack: ["Essays"],
    blurb: "Short notes on craft, tools, and the shape of good software.",
    href: "https://github.com/ajiko2505",
    tone: "mint-soft",
    size: "short",
    hero: "Short essays on the craft of building software.",
    role: "Writing · Editorial",
    timeline: "2025 · Monthly",
    overview: "Small essays — 400 to 800 words — on the details that make software feel considered.",
    challenge: "Say something useful about craft without falling into abstract vibes or hot takes.",
    approach: [
      "Wrote from concrete moments in real client work.",
      "Kept every essay under a thousand words.",
      "Refused to publish anything I couldn't defend a year later.",
    ],
    outcome: [
      "A steady stream of readers who forward the pieces to their teams.",
      "Client conversations that start further along, because the reader already knows how I think.",
    ],
  },
  {
    slug: "component-lab",
    title: "Component Lab",
    tag: "System",
    year: "2026",
    stack: ["TS", "Tailwind", "Storybook"],
    blurb: "A private library of considered primitives — buttons that behave.",
    href: "https://github.com/ajiko2505",
    tone: "dark",
    size: "tall",
    hero: "A private component library — every primitive earned its place.",
    role: "Systems · Engineering",
    timeline: "2026 · Ongoing",
    overview: "A hand-built set of primitives I reach for on every project. Small, well-behaved, boringly reliable.",
    challenge: "Build a system that stays useful across wildly different brands without becoming generic.",
    approach: [
      "Every component ships with strict token contracts — no ad-hoc colors, no ad-hoc spacing.",
      "Accessibility baked in at the primitive level, not sprinkled on later.",
      "Motion, states, and edge cases specified before the visual design is done.",
    ],
    outcome: [
      "Project setup time cut from days to hours.",
      "Consistent behavior across projects without visual sameness.",
    ],
  },
  {
    slug: "studio-prints",
    title: "Studio Prints",
    tag: "Print",
    year: "2025",
    stack: ["Poster", "Type"],
    blurb: "Typographic posters — because pixels alone are not enough.",
    href: "https://github.com/ajiko2505",
    tone: "forest",
    size: "short",
    hero: "Typographic posters — a physical counterweight to a screen-based practice.",
    role: "Typography · Print",
    timeline: "2025",
    overview: "A small run of screen-printed posters exploring type at scale — an antidote to always shipping at 16 pixels.",
    challenge: "Design for a medium with no undo button.",
    approach: [
      "Sketched everything on paper before touching software.",
      "Constrained the palette to two inks per poster.",
      "Worked directly with a local printer to learn the medium's limits.",
    ],
    outcome: [
      "Posters that hang in studios I admire.",
      "A sharper eye for weight, spacing, and hierarchy on screen.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
