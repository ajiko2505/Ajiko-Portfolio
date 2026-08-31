import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_URL, SITE_OG_IMAGE } from "@/lib/seo";
import { skillGroups } from "@/lib/profile";

const TITLE = "Skills & Services — Ajiko Fidelis";
const DESC =
  "Skills and services of Ajiko Fidelis: software development, web and e-commerce builds, IT support, digital marketing, and data & AI work.";

export const Route = createFileRoute("/_site/services")({
  component: SkillsPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/services` },
      { property: "og:image", content: SITE_OG_IMAGE },
      { property: "og:image:alt", content: "Skills and services of Ajiko Fidelis" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: SITE_OG_IMAGE },
      { name: "twitter:image:alt", content: "Skills and services of Ajiko Fidelis" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services` }],
  }),
});

const SERVICES = [
  ["Website development", "Business sites and web apps built to load fast and stay maintainable."],
  ["E-commerce solutions", "WooCommerce and Shopify stores — structure, products, configuration."],
  ["IT support", "Practical technical support for devices, accounts, networks and systems."],
  ["Digital marketing", "SEO, content and analytics set up on solid technical foundations."],
] as const;

function SkillsPage() {
  return (
    <>
      <section className="px-6 pt-32 pb-14 bg-aurora noise">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-mono text-mint mb-4">◆ Skills</p>
          <h1 className="text-display text-4xl sm:text-5xl md:text-7xl max-w-4xl">
            What I work with<span className="text-mint">.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-2xl">
            A working toolkit across development, web and e-commerce, IT, digital
            marketing, and data — chosen for what actually ships.
          </p>
        </div>
      </section>

      <section className="px-6 py-16" aria-labelledby="skill-groups-heading">
        <div className="mx-auto max-w-[1400px]">
          <h2 id="skill-groups-heading" className="sr-only">Skill categories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillGroups.map((g, i) => (
              <article
                key={g.title}
                className="rounded-3xl border border-border bg-card/60 p-7 transition hover:-translate-y-1 hover:border-mint/50 hover:shadow-soft"
              >
                <p className="text-mono text-mint mb-3">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-display text-2xl mb-2">{g.title}</h3>
                <p className="text-sm text-muted-foreground mb-5">{g.note}</p>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="text-mono px-3 py-1.5 rounded-full border border-border bg-background/60"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-surface/40" aria-labelledby="services-heading">
        <div className="mx-auto max-w-[1400px]">
          <h2 id="services-heading" className="text-display text-3xl md:text-5xl mb-10">
            How I can help
          </h2>
          <ul className="grid sm:grid-cols-2 gap-5">
            {SERVICES.map(([title, desc]) => (
              <li key={title} className="rounded-3xl border border-border bg-card/60 p-7">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-foreground/80 leading-relaxed">{desc}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="text-mono px-7 py-3.5 rounded-full bg-mint text-accent-foreground hover:shadow-mint transition min-h-11 inline-flex items-center"
            >
              Let's Work Together →
            </Link>
            <Link
              to="/work"
              className="text-mono px-7 py-3.5 rounded-full border border-border hover:border-mint hover:text-mint transition min-h-11 inline-flex items-center"
            >
              View My Work ↗
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
