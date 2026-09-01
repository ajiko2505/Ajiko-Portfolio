import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, projects } from "@/lib/projects";
import { trackEvent } from "@/lib/analytics";
import { SITE_URL, SITE_OG_IMAGE } from "@/lib/seo";

const TITLE = "Projects — Ajiko Fidelis";
const DESC =
  "Selected projects by Ajiko Fidelis across software development, web, e-commerce, IT support, digital marketing and data & AI.";

export const Route = createFileRoute("/_site/work")({
  component: WorkIndex,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/work` },
      { property: "og:image", content: SITE_OG_IMAGE },
      { property: "og:image:alt", content: "Selected projects by Ajiko Fidelis" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: SITE_OG_IMAGE },
      { name: "twitter:image:alt", content: "Selected projects by Ajiko Fidelis" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/work` }],
  }),
});

function WorkIndex() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <>
      <section className="pt-32 pb-12 px-6 bg-aurora noise">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-mono text-mint mb-4">◆ Projects</p>
          <h1 className="text-display text-4xl sm:text-5xl md:text-7xl max-w-4xl leading-[0.92]">
            Work that solves something<span className="text-mint">.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-2xl">
            Business technology, software builds, e-commerce work and studies —
            each entry links to a full case study.
          </p>
        </div>
      </section>

      <section className="px-6 py-12" aria-labelledby="projects-heading">
        <div className="mx-auto max-w-[1400px]">
          <h2 id="projects-heading" className="sr-only">All projects</h2>

          <div className="flex flex-wrap items-center gap-2 mb-10" role="group" aria-label="Filter projects by category">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setFilter(c);
                  trackEvent("project_filter", { category: c });
                }}
                aria-pressed={filter === c}
                className={`text-mono px-4 py-2.5 rounded-full border transition min-h-11 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint ${
                  filter === c
                    ? "bg-mint text-accent-foreground border-mint"
                    : "border-border hover:border-mint hover:text-mint"
                }`}
              >
                {c}
              </button>
            ))}
            <span className="text-mono text-muted-foreground ml-auto">
              {visible.length} {visible.length === 1 ? "project" : "projects"}
            </span>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((p, i) => (
              <li key={p.slug} className="h-full">
                <article className="group h-full rounded-3xl border border-border bg-card/50 p-7 flex flex-col justify-between transition hover:-translate-y-1 hover:border-mint/60 hover:shadow-soft">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-mono text-muted-foreground">
                      {String(i + 1).padStart(2, "0")} · {p.category}
                    </span>
                    <span className="text-mono text-muted-foreground">{p.year}</span>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-display text-2xl md:text-3xl">
                      <Link
                        to="/work/$slug"
                        params={{ slug: p.slug }}
                        onClick={() => trackEvent("project_open", { slug: p.slug, from: "work_index" })}
                        className="after:absolute after:inset-0 group-hover:text-mint transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
                      >
                        {p.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/80">{p.blurb}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {p.stack.slice(0, 4).map((s) => (
                        <li key={s} className="text-mono px-2.5 py-1 rounded-full border border-border opacity-80">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative z-10 mt-6 flex flex-wrap gap-2">
                    <Link
                      to="/work/$slug"
                      params={{ slug: p.slug }}
                      className="text-mono px-4 py-2.5 rounded-full bg-mint text-accent-foreground hover:shadow-mint transition min-h-11 inline-flex items-center"
                    >
                      View project →
                    </Link>
                    {p.links?.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-mono px-4 py-2.5 rounded-full border border-border hover:border-mint hover:text-mint transition min-h-11 inline-flex items-center"
                      >
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
