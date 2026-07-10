import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_URL, SITE_OG_IMAGE } from "@/lib/seo";

const TITLE = "About — Ajiko Fidelis";
const DESC =
  "A studio of one. Ajiko Fidelis is an independent designer and developer building web software with conviction — from Nigeria, for the world.";

export const Route = createFileRoute("/_site/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: `${SITE_URL}/about` },
      { property: "og:image", content: SITE_OG_IMAGE },
      { property: "og:image:alt", content: "About Ajiko Fidelis" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: SITE_OG_IMAGE },
      { name: "twitter:image:alt", content: "About Ajiko Fidelis" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
  }),
});

const clients = ["Independent", "Studio", "Startup", "Personal", "Freelance", "Collab"];

function AboutPage() {
  return (
    <section className="px-6 pt-32 pb-28 bg-surface/40 noise">
      <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="text-mono text-mint mb-4">◆ Studio</div>
          <div className="sticky top-24 space-y-6">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border">
              <img
                src="https://avatars.githubusercontent.com/u/100570007?v=4"
                alt="Portrait of Ajiko Fidelis"
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" aria-hidden />
              <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                <div>
                  <div className="text-mono text-mint">Studio of one</div>
                  <div className="text-display text-2xl">Ajiko Fidelis</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-mint text-accent-foreground grid place-items-center animate-glow-pulse" aria-hidden>✽</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                ["03", "Years"],
                ["12+", "Projects"],
                ["∞", "Iterations"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-2xl border border-border p-4 text-center">
                  <div className="text-display text-3xl text-mint">{n}</div>
                  <div className="text-mono text-muted-foreground mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-7 space-y-8">
          <h1 className="text-display text-4xl sm:text-5xl md:text-7xl leading-[0.95]">
            A practice built on <span className="text-mint">three verbs</span> —
            design, code, build.
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-2xl">
            I design and engineer web software for people who care how it feels
            to use their thing. My work sits at the seam where interface
            decisions meet code decisions — where a well-placed border and a
            well-shaped state reducer are the same act.
          </p>
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl">
            I work small: mostly alone, sometimes with a tight collaborator,
            always shipping something real by the end of the week.
          </p>

          <div className="pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ["Focus", "Product · Web · Brand"],
              ["Toolkit", "React · TS · Figma"],
              ["Base", "Remote — Worldwide"],
              ["Availability", "Q3 2026"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="text-mono text-muted-foreground mb-1">{k}</div>
                <div className="text-foreground font-medium">{v}</div>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <div className="text-mono text-muted-foreground mb-4">Worked with</div>
            <div className="flex flex-wrap gap-2">
              {clients.map((c) => (
                <span key={c} className="text-mono px-4 py-2 rounded-full border border-border">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-8 flex flex-wrap gap-3">
            <Link
              to="/work"
              className="text-mono px-6 py-3 rounded-full border border-border hover:border-mint hover:text-mint transition min-h-11 inline-flex items-center"
            >
              See the work →
            </Link>
            <Link
              to="/contact"
              className="text-mono px-6 py-3 rounded-full bg-mint text-accent-foreground hover:shadow-mint transition min-h-11 inline-flex items-center"
            >
              Get in touch ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
