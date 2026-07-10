import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { trackEvent } from "@/lib/analytics";

const SITE_URL = "https://ajiko.lovable.app";
const TITLE = "Ajiko Fidelis — Independent Designer & Developer";
const DESC =
  "Portfolio of Ajiko Fidelis — independent designer and front-end developer building considered interfaces, design systems, and shipped web software.";

export const Route = createFileRoute("/_site/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Ajiko Fidelis",
          url: SITE_URL,
          jobTitle: "Designer & Developer",
          image: "https://avatars.githubusercontent.com/u/100570007?v=4",
          sameAs: [
            "https://github.com/ajiko2505",
            "https://linkedin.com/in/ajiko001",
            "https://instagram.com/fidelis.ajiko",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Projects index — Ajiko Fidelis",
          description:
            "Selected projects by Ajiko Fidelis, spanning design systems, interface studies, open-source work, and writing.",
          numberOfItems: projects.length,
          itemListOrder: "https://schema.org/ItemListOrderDescending",
          itemListElement: projects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/work/${p.slug}`,
            item: {
              "@type": "CreativeWork",
              name: p.title,
              headline: p.title,
              description: p.blurb,
              url: `${SITE_URL}/work/${p.slug}`,
              genre: p.tag,
              dateCreated: p.year,
              keywords: p.stack.join(", "),
              author: {
                "@type": "Person",
                name: "Ajiko Fidelis",
                url: SITE_URL,
              },
            },
          })),
        }),
      },
    ],
  }),
});


function toneClass(tone: string) {
  switch (tone) {
    case "mint": return "bg-mint-gradient text-accent-foreground";
    case "mint-soft": return "bg-forest text-mint-glow";
    case "forest": return "bg-[oklch(0.28_0.05_160)] text-mint-glow";
    default: return "bg-surface text-foreground";
  }
}

type SortKey = "year" | "tag" | "title";

function ProjectsIndexSection() {
  const [sort, setSort] = useState<SortKey>("year");

  const sorted = useMemo(() => {
    const base = [...projects];
    switch (sort) {
      case "year":
        return base.sort((a, b) => Number(b.year) - Number(a.year));
      case "tag":
        return base.sort((a, b) => a.tag.localeCompare(b.tag) || a.title.localeCompare(b.title));
      case "title":
        return base.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return base;
    }
  }, [sort]);

  const tags = useMemo(
    () => Array.from(new Set(projects.map((p) => p.tag))).sort(),
    []
  );

  return (
    <section className="px-6 py-24" aria-labelledby="projects-index-heading">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="text-mono text-mint mb-4">◆ Index</div>
            <h2 id="projects-index-heading" className="text-display text-4xl sm:text-5xl md:text-7xl max-w-3xl">
              Projects index<span className="text-mint">.</span>
            </h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-xl">
              Every project, sorted for clarity. Browse by year, category, or title, then dive into the full case studies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 bg-aurora/50 border border-border rounded-full p-1">
              {(["year", "tag", "title"] as SortKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setSort(key)}
                  aria-pressed={sort === key}
                  className={`px-4 py-2 rounded-full text-mono text-sm transition min-h-9 ${
                    sort === key
                      ? "bg-mint text-accent-foreground"
                      : "text-foreground/70 hover:text-mint"
                  }`}
                >
                  {key === "year" ? "Year" : key === "tag" ? "Category" : "Title"}
                </button>
              ))}
            </div>
            <span className="text-mono text-sm text-muted-foreground">
              {sorted.length} entries
            </span>
          </div>
        </div>

        <div className="border border-border rounded-3xl overflow-hidden bg-aurora/20">
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 text-mono text-sm text-muted-foreground border-b border-border bg-aurora/40">
            <div className="md:col-span-1">#</div>
            <div className="md:col-span-4">Project</div>
            <div className="md:col-span-2">Category</div>
            <div className="md:col-span-2">Year</div>
            <div className="md:col-span-3">Stack</div>
          </div>

          <ul className="divide-y divide-border">
            {sorted.map((p, i) => (
              <li key={p.slug}>
                <Link
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  onClick={() => trackEvent("project_open", { slug: p.slug, from: "projects_index" })}
                  className="group grid md:grid-cols-12 gap-4 px-6 py-5 items-center transition hover:bg-aurora/40"
                >
                  <span className="md:col-span-1 text-mono text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="md:col-span-4 flex flex-col">
                    <span className="text-display text-xl md:text-2xl group-hover:text-mint transition">
                      {p.title}
                    </span>
                    <span className="md:hidden text-mono text-sm text-muted-foreground mt-1">
                      {p.tag} · {p.year}
                    </span>
                  </span>
                  <span className="md:col-span-2 text-mono text-sm">
                    <span className="inline-flex px-3 py-1 rounded-full border border-border bg-aurora/30">
                      {p.tag}
                    </span>
                  </span>
                  <span className="md:col-span-2 text-mono text-muted-foreground">{p.year}</span>
                  <span className="md:col-span-3 flex flex-wrap gap-2">
                    {p.stack.slice(0, 3).map((s) => (
                      <span key={s} className="text-mono text-xs px-2.5 py-1 rounded-full border border-border opacity-80">
                        {s}
                      </span>
                    ))}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-3xl bg-mint-gradient text-accent-foreground">
          <div>
            <div className="text-mono opacity-80 mb-2">{tags.length} categories · {projects.length} projects</div>
            <h3 className="text-display text-2xl md:text-3xl">
              Want the full picture?
            </h3>
          </div>
          <Link
            to="/work"
            onClick={() => trackEvent("cta_work", { from: "projects_index" })}
            className="inline-flex items-center gap-2 text-mono px-8 py-4 rounded-full bg-foreground text-background hover:shadow-soft transition min-h-11"
          >
            Explore all work →
          </Link>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const featured = projects.slice(0, 3);
  return (
    <>
      {/* HERO */}
      <section className="relative pt-28 pb-16 px-6 bg-aurora noise">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-mono text-muted-foreground animate-rise">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
              Portfolio · MMXXVI
            </span>
            <span className="opacity-40">/</span>
            <span>Designer &amp; Developer</span>
            <span className="opacity-40 hidden sm:inline">/</span>
            <span className="hidden sm:inline">Remote — Worldwide</span>
          </div>

          <div className="mt-10 animate-rise">
            <h1 className="text-display text-[clamp(3.5rem,17vw,17rem)]">AJIKO</h1>
            <div className="flex items-baseline flex-wrap gap-x-6 gap-y-2 -mt-2 md:-mt-6">
              <span
                className="text-display text-[clamp(3.5rem,17vw,17rem)]"
                style={{ WebkitTextStroke: "1px currentColor", color: "transparent" }}
              >
                FIDELIS
              </span>
              <span className="text-mint text-display text-[clamp(2rem,5vw,4rem)] animate-floaty">✽</span>
            </div>
          </div>

          <div className="mt-14 grid md:grid-cols-12 gap-8 items-end animate-rise">
            <p className="md:col-span-6 text-xl sm:text-2xl md:text-3xl leading-[1.25] max-w-2xl font-light">
              Independent designer &amp; developer building interfaces with
              <span className="text-mint font-medium"> conviction</span>,
              type with <span className="text-mint font-medium">weight</span>,
              and software with <span className="text-mint font-medium">edges</span>.
            </p>
            <div className="md:col-span-3">
              <div className="text-mono text-muted-foreground mb-2">Currently</div>
              <div className="text-lg">Open for select projects · Q3 2026</div>
            </div>
            <div className="md:col-span-3 flex md:justify-end">
              <div className="flex -space-x-3">
                <div className="w-14 h-14 rounded-full bg-mint text-accent-foreground grid place-items-center text-mono border-2 border-background">03</div>
                <div className="w-14 h-14 rounded-full bg-forest text-mint-glow grid place-items-center text-mono border-2 border-background">YR</div>
                <div className="w-14 h-14 rounded-full bg-surface text-foreground grid place-items-center text-mono border-2 border-background">EXP</div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              to="/work"
              className="text-mono px-6 py-3 rounded-full bg-mint text-accent-foreground hover:shadow-mint transition min-h-11 inline-flex items-center"
            >
              See the work →
            </Link>
            <Link
              to="/contact"
              className="text-mono px-6 py-3 rounded-full border border-border hover:border-mint hover:text-mint transition min-h-11 inline-flex items-center"
            >
              Start a project ↗
            </Link>
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-24 border-y border-border py-6 overflow-hidden">
          <div className="flex gap-14 animate-marquee whitespace-nowrap text-display text-[clamp(2.5rem,7vw,6rem)]">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-14 shrink-0 items-center">
                <span>DESIGN</span>
                <span className="text-mint">✽</span>
                <span style={{ WebkitTextStroke: "1px currentColor", color: "transparent" }}>CODE</span>
                <span className="text-mint">✽</span>
                <span>BUILD</span>
                <span className="text-mint">✽</span>
                <span style={{ WebkitTextStroke: "1px oklch(0.82 0.17 170)", color: "transparent" }}>SHIP</span>
                <span className="text-mint">✽</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK PREVIEW */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <div className="text-mono text-mint mb-4">◆ Recent</div>
              <h2 className="text-display text-4xl sm:text-5xl md:text-7xl max-w-3xl">
                Three from the shelf<span className="text-mint">.</span>
              </h2>
            </div>
            <Link
              to="/work"
              className="text-mono px-5 py-3 rounded-full border border-border hover:border-mint hover:text-mint transition min-h-11 inline-flex items-center"
            >
              All work →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {featured.map((p, i) => (
              <Link
                key={p.slug}
                to="/work/$slug"
                params={{ slug: p.slug }}
                onClick={() => trackEvent("project_open", { slug: p.slug, from: "home" })}
                className={`group relative rounded-3xl p-7 md:p-8 border border-border overflow-hidden noise transition-all duration-500 hover:-translate-y-1 hover:shadow-soft flex flex-col justify-between min-h-[300px] ${toneClass(p.tone)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="text-mono opacity-70">{String(i + 1).padStart(2, "0")} · {p.tag}</div>
                  <div className="w-10 h-10 rounded-full border border-current/30 grid place-items-center opacity-70 group-hover:opacity-100 group-hover:rotate-45 transition">↗</div>
                </div>
                <div>
                  <h3 className="text-display text-3xl md:text-4xl mb-3">{p.title}</h3>
                  <p className="text-sm leading-relaxed opacity-80 mb-5 max-w-sm">{p.blurb}</p>
                  <div className="text-mono opacity-70">{p.year}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ProjectsIndexSection />

      {/* CTA STRIP */}
      <section className="px-6 py-20 border-y border-border bg-aurora relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-8 items-end">
          <h2 className="md:col-span-8 text-display text-4xl sm:text-5xl md:text-7xl leading-[0.95]">
            Have a thing worth building?{" "}
            <span className="text-mint">Let's talk.</span>
          </h2>
          <div className="md:col-span-4 md:text-right">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-mono px-6 py-4 rounded-full bg-foreground text-background hover:bg-mint hover:text-accent-foreground transition min-h-11"
            >
              Start a project →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
