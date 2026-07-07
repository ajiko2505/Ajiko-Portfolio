import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { ContactForm } from "@/components/ContactForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { trackEvent } from "@/lib/analytics";

const SITE_URL = "https://ajiko.lovable.app";
const SITE_TITLE = "Ajiko Fidelis — Independent Designer & Developer";
const SITE_DESC =
  "Portfolio of Ajiko Fidelis — independent designer and front-end developer building considered interfaces, design systems, and shipped web software.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESC },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/" }],
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
    ],
  }),
});

const capabilities = [
  { n: "01", t: "Product Design", d: "End-to-end interface work — from raw wireframe to shipped, considered surface." },
  { n: "02", t: "Front-End Engineering", d: "React, TypeScript, Tailwind. Fast, resilient, accessible by default." },
  { n: "03", t: "Design Systems", d: "Token-first systems that scale from a single landing page to a full product." },
  { n: "04", t: "Brand & Identity", d: "Type, mark, and voice — the personality layer that ties everything together." },
];

const clients = ["Independent", "Studio", "Startup", "Personal", "Freelance", "Collab"];

function toneClass(tone: string) {
  switch (tone) {
    case "mint":
      return "bg-mint-gradient text-accent-foreground";
    case "mint-soft":
      return "bg-forest text-mint-glow";
    case "forest":
      return "bg-[oklch(0.28_0.05_160)] text-mint-glow";
    default:
      return "bg-surface text-foreground";
  }
}
function sizeClass(size: string) {
  switch (size) {
    case "tall": return "md:row-span-2";
    case "wide": return "sm:col-span-2 md:col-span-2";
    default: return "";
  }
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 h-16 flex items-center justify-between gap-3">
          <a href="#top" className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-mint animate-glow-pulse shrink-0" />
            <span className="text-mono truncate">Ajiko&nbsp;Fidelis</span>
          </a>
          <nav className="hidden md:flex items-center gap-1 text-mono">
            {[
              ["Index", "#work"],
              ["Studio", "#about"],
              ["Craft", "#services"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="px-4 py-2 rounded-full hover:bg-surface transition">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#contact"
              className="text-mono px-4 py-2 rounded-full bg-mint text-accent-foreground hover:shadow-mint transition"
              onClick={() => trackEvent("nav_hire_click")}
            >
              Hire me →
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative pt-28 pb-16 px-6 bg-aurora noise">
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

          {/* Enormous type block */}
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

      {/* WORK — RESPONSIVE MASONRY */}
      <section id="work" className="px-6 py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <div>
              <div className="text-mono text-mint mb-4">◆ Index 01 — Selected work</div>
              <h2 className="text-display text-5xl sm:text-6xl md:text-8xl max-w-3xl">
                Things I've made<span className="text-mint">.</span>
              </h2>
            </div>
            <a
              href="https://github.com/ajiko2505?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="text-mono px-5 py-3 rounded-full border border-border hover:border-mint hover:text-mint transition"
            >
              Full archive ↗
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:auto-rows-[240px]">
            {projects.map((p, i) => (
              <Link
                key={p.slug}
                to="/work/$slug"
                params={{ slug: p.slug }}
                onClick={() => trackEvent("project_open", { slug: p.slug })}
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
                  <h3 className="text-display text-3xl md:text-4xl mb-3">{p.title}</h3>
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

      {/* ABOUT */}
      <section id="about" className="px-6 py-28 bg-surface/40 noise">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="text-mono text-mint mb-4">◆ Index 02 — Studio</div>
            <div className="sticky top-24 space-y-6">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border">
                <img
                  src="https://avatars.githubusercontent.com/u/100570007?v=4"
                  alt="Ajiko Fidelis"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                  <div>
                    <div className="text-mono text-mint">Studio of one</div>
                    <div className="text-display text-2xl">Ajiko Fidelis</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-mint text-accent-foreground grid place-items-center animate-glow-pulse">✽</div>
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
            <h2 className="text-display text-4xl sm:text-5xl md:text-7xl leading-[0.95]">
              A practice built on <span className="text-mint">three verbs</span> —
              design, code, build.
            </h2>
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
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-mono text-mint mb-4">◆ Index 03 — Craft</div>
          <h2 className="text-display text-5xl sm:text-6xl md:text-8xl mb-16 max-w-4xl">
            What lands on the invoice<span className="text-mint">.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {capabilities.map((c) => (
              <div
                key={c.n}
                className="group relative rounded-3xl p-8 md:p-10 border border-border bg-surface/50 hover:bg-surface transition overflow-hidden noise"
              >
                <div className="flex items-start justify-between mb-10">
                  <span className="text-mono text-mint">/ {c.n}</span>
                  <span className="w-12 h-12 rounded-full border border-border grid place-items-center group-hover:bg-mint group-hover:text-accent-foreground group-hover:border-mint group-hover:rotate-45 transition-all duration-500">↗</span>
                </div>
                <h3 className="text-display text-3xl sm:text-4xl md:text-5xl mb-4">{c.t}</h3>
                <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 py-20 border-y border-border bg-aurora">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["Listen", "Understand the problem behind the ask."],
            ["Sketch", "Cheap, fast, ugly — until it isn't."],
            ["Build", "Ship in code, not in mockups."],
            ["Refine", "Iterate on the real thing, with real users."],
          ].map(([t, d], i) => (
            <div key={t as string} className="flex flex-col gap-3">
              <div className="text-mono text-mint">Step 0{i + 1}</div>
              <div className="text-display text-2xl sm:text-3xl">{t}</div>
              <div className="text-sm text-muted-foreground">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-70 pointer-events-none" />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="text-mono text-mint mb-4">◆ Index 04 — Contact</div>
          <h2 className="text-display text-[clamp(3rem,12vw,12rem)] leading-[0.85]">
            LET'S
            <br />
            <span style={{ WebkitTextStroke: "1.5px oklch(0.82 0.17 170)", color: "transparent" }}>
              BUILD
            </span>{" "}
            <span className="text-mint">✽</span>
          </h2>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-lg text-foreground/80 max-w-md">
                Tell me about the thing you're building. I read every message and
                usually reply within a working day.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  ["Chat", "WhatsApp", "+234 815 586 6150", "https://wa.me/2348155866150"],
                  ["Network", "LinkedIn", "in/ajiko001", "https://linkedin.com/in/ajiko001"],
                  ["Follow", "Instagram", "@fidelis.ajiko", "https://instagram.com/fidelis.ajiko"],
                  ["Code", "GitHub", "@ajiko2505", "https://github.com/ajiko2505"],
                ].map(([k, v, sub, h]) => (
                  <a
                    key={v}
                    href={h}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent("social_click", { channel: v })}
                    className="p-5 rounded-2xl border border-border bg-background/50 backdrop-blur hover:bg-mint hover:text-accent-foreground hover:border-mint transition group flex flex-col gap-3 min-h-[130px] justify-between"
                  >
                    <div className="flex items-start justify-between">
                      <div className="text-mono opacity-70">{k}</div>
                      <span className="opacity-60 group-hover:translate-x-1 group-hover:-translate-y-1 transition">↗</span>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{v}</div>
                      <div className="text-mono opacity-70 mt-1">{sub}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 py-12">
        <div className="mx-auto max-w-[1400px] grid gap-8 md:grid-cols-3 items-start">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-mint animate-glow-pulse" />
              <span className="text-mono">Ajiko Fidelis · Studio</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Independent design &amp; engineering practice. Building on the web, from Nigeria — for the world.
            </p>
          </div>
          <div>
            <div className="text-mono text-muted-foreground mb-3">Elsewhere</div>
            <ul className="space-y-2 text-sm">
              <li><a href="https://wa.me/2348155866150" target="_blank" rel="noreferrer" className="hover:text-mint transition">WhatsApp — +234 815 586 6150</a></li>
              <li><a href="https://linkedin.com/in/ajiko001" target="_blank" rel="noreferrer" className="hover:text-mint transition">LinkedIn — in/ajiko001</a></li>
              <li><a href="https://instagram.com/fidelis.ajiko" target="_blank" rel="noreferrer" className="hover:text-mint transition">Instagram — @fidelis.ajiko</a></li>
              <li><a href="https://github.com/ajiko2505" target="_blank" rel="noreferrer" className="hover:text-mint transition">GitHub — @ajiko2505</a></li>
            </ul>
          </div>
          <div className="md:text-right">
            <div className="text-mono text-muted-foreground mb-3">Colophon</div>
            <p className="text-sm text-muted-foreground">
              Set in Archivo Black &amp; Hind. Built with React, TanStack, and Tailwind. Designed &amp; coded by hand.
            </p>
            <a href="#top" className="inline-flex mt-4 text-mono hover:text-mint transition">Back to top ↑</a>
          </div>
        </div>
        <div className="mx-auto max-w-[1400px] mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-mono text-muted-foreground">
          <div>© 2026 Ajiko Fidelis — All rights, plus a few wrongs</div>
          <div>Design · Code · Build</div>
        </div>
      </footer>
    </div>
  );
}
