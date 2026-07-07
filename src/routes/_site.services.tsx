import { createFileRoute, Link } from "@tanstack/react-router";

const SITE_URL = "https://ajiko.lovable.app";
const TITLE = "Services — Ajiko Fidelis";
const DESC =
  "Product design, front-end engineering, design systems, and brand identity. What lands on the invoice.";

export const Route = createFileRoute("/_site/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/services` },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services` }],
  }),
});

const capabilities = [
  { n: "01", t: "Product Design", d: "End-to-end interface work — from raw wireframe to shipped, considered surface." },
  { n: "02", t: "Front-End Engineering", d: "React, TypeScript, Tailwind. Fast, resilient, accessible by default." },
  { n: "03", t: "Design Systems", d: "Token-first systems that scale from a single landing page to a full product." },
  { n: "04", t: "Brand & Identity", d: "Type, mark, and voice — the personality layer that ties everything together." },
];

const process = [
  ["Listen", "Understand the problem behind the ask."],
  ["Sketch", "Cheap, fast, ugly — until it isn't."],
  ["Build", "Ship in code, not in mockups."],
  ["Refine", "Iterate on the real thing, with real users."],
] as const;

function ServicesPage() {
  return (
    <>
      <section className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-mono text-mint mb-4">◆ Craft</div>
          <h1 className="text-display text-5xl sm:text-6xl md:text-8xl mb-16 max-w-4xl leading-[0.9]">
            What lands on the invoice<span className="text-mint">.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {capabilities.map((c) => (
              <div
                key={c.n}
                className="group relative rounded-3xl p-8 md:p-10 border border-border bg-surface/50 hover:bg-surface transition overflow-hidden noise"
              >
                <div className="flex items-start justify-between mb-10">
                  <span className="text-mono text-mint">/ {c.n}</span>
                  <span className="w-12 h-12 rounded-full border border-border grid place-items-center group-hover:bg-mint group-hover:text-accent-foreground group-hover:border-mint group-hover:rotate-45 transition-all duration-500" aria-hidden>↗</span>
                </div>
                <h2 className="text-display text-3xl sm:text-4xl md:text-5xl mb-4">{c.t}</h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-y border-border bg-aurora">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-mono text-mint mb-8">◆ Process</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {process.map(([t, d], i) => (
              <div key={t} className="flex flex-col gap-3">
                <div className="text-mono text-mint">Step 0{i + 1}</div>
                <div className="text-display text-2xl sm:text-3xl">{t}</div>
                <div className="text-sm text-muted-foreground">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-[1400px] flex flex-wrap gap-4 items-center justify-between">
          <p className="text-lg md:text-xl max-w-xl">
            Have a project that fits one of these? Send me the shape of it and I'll tell you honestly.
          </p>
          <Link
            to="/contact"
            className="text-mono px-6 py-3 rounded-full bg-mint text-accent-foreground hover:shadow-mint transition min-h-11 inline-flex items-center"
          >
            Start the conversation →
          </Link>
        </div>
      </section>
    </>
  );
}
