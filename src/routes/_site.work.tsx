import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { trackEvent } from "@/lib/analytics";
import { SITE_URL, SITE_OG_IMAGE } from "@/lib/seo";

const TITLE = "Work — Ajiko Fidelis";
const DESC =
  "Selected case studies by Ajiko Fidelis — product design, front-end engineering, systems and identity work.";

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
      { property: "og:image:alt", content: "Selected work by Ajiko Fidelis" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: SITE_OG_IMAGE },
      { name: "twitter:image:alt", content: "Selected work by Ajiko Fidelis" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/work` }],
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
function sizeClass(size: string) {
  switch (size) {
    case "tall": return "md:row-span-2";
    case "wide": return "sm:col-span-2 md:col-span-2";
    default: return "";
  }
}

function WorkIndex() {
  return (
    <>
      <section className="pt-32 pb-12 px-6 bg-aurora noise">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-mono text-mint mb-4">◆ Index — Selected work</div>
          <h1 className="text-display text-5xl sm:text-6xl md:text-8xl max-w-4xl leading-[0.9]">
            Things I've made<span className="text-mint">.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-2xl">
            A rotating shelf of client work, personal experiments, and public discipline.
            Each entry links to a full case study.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:auto-rows-[240px]">
            {projects.map((p, i) => (
              <Link
                key={p.slug}
                to="/work/$slug"
                params={{ slug: p.slug }}
                onClick={() => trackEvent("project_open", { slug: p.slug, from: "work_index" })}
                className={`group relative rounded-3xl p-7 md:p-8 border border-border overflow-hidden noise transition-all duration-500 hover:-translate-y-1 hover:shadow-soft flex flex-col justify-between min-h-[280px] ${toneClass(p.tone)} ${sizeClass(p.size)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="text-mono opacity-70">{String(i + 1).padStart(2, "0")} · {p.tag}</div>
                  <div className="w-10 h-10 rounded-full border border-current/30 grid place-items-center opacity-70 group-hover:opacity-100 group-hover:rotate-45 transition">↗</div>
                </div>

                {p.size === "tall" && (
                  <div className="my-6 text-display text-[6rem] leading-none opacity-90">
                    {p.title.charAt(0)}
                  </div>
                )}
                {p.size === "wide" && (
                  <div className="my-2 text-display text-6xl md:text-7xl leading-none opacity-90">◐ ◑ ◒</div>
                )}

                <div>
                  <h2 className="text-display text-3xl md:text-4xl mb-3">{p.title}</h2>
                  <p className="text-sm leading-relaxed opacity-80 mb-5 max-w-sm">{p.blurb}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {p.stack.slice(0, 3).map((s) => (
                      <span key={s} className="text-mono px-2.5 py-1 rounded-full border border-current/30 opacity-80">
                        {s}
                      </span>
                    ))}
                    <span className="text-mono ml-auto opacity-70">{p.year}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
