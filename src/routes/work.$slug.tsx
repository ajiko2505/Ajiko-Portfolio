import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { getProject, projects } from "@/lib/projects";
import { ThemeToggle } from "@/components/ThemeToggle";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { slug: project.slug };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData ? getProject(loaderData.slug) : undefined;
    const url = `https://ajiko.lovable.app/work/${params.slug}`;
    if (!p) return { meta: [{ title: "Case study — Ajiko Fidelis" }] };
    const title = `${p.title} — Ajiko Fidelis`;
    return {
      meta: [
        { title },
        { name: "description", content: p.blurb },
        { property: "og:title", content: title },
        { property: "og:description", content: p.blurb },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: p.blurb },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: p.title,
            description: p.blurb,
            url,
            dateCreated: p.year,
            author: { "@type": "Person", name: "Ajiko Fidelis" },
          }),
        },
      ],
    };
  },
  component: CaseStudy,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center p-8 text-center">
      <div>
        <div className="text-mono text-mint mb-3">◆ Not found</div>
        <h1 className="text-display text-5xl mb-4">No case study here</h1>
        <Link to="/" className="text-mono px-5 py-3 rounded-full border border-border hover:border-mint hover:text-mint transition inline-block">
          Back home ↗
        </Link>
      </div>
    </div>
  ),
});

function CaseStudy() {
  const { slug } = Route.useLoaderData();
  const project = getProject(slug)!;
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  useEffect(() => {
    trackEvent("case_study_view", { slug });
  }, [slug]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-mint animate-glow-pulse shrink-0" />
            <span className="text-mono truncate">Ajiko&nbsp;Fidelis</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/work" className="text-mono px-4 py-2 rounded-full hover:bg-surface transition hidden sm:inline">
              ← All work
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-32 pb-16 px-6 bg-aurora noise">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-center gap-3 text-mono text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-mint">Index</Link>
            <span className="opacity-40">/</span>
            <span>Work</span>
            <span className="opacity-40">/</span>
            <span className="text-mint">{project.tag}</span>
          </div>

          <h1 className="text-display text-[clamp(3rem,11vw,10rem)] mt-8 leading-[0.85]">
            {project.title}
          </h1>

          <p className="mt-8 text-xl md:text-2xl max-w-3xl leading-[1.3] text-foreground/85">
            {project.hero}
          </p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border">
            {[
              ["Role", project.role],
              ["Timeline", project.timeline],
              ["Year", project.year],
              ["Stack", project.stack.join(" · ")],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="text-mono text-muted-foreground mb-1">{k}</div>
                <div className="font-medium">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COVER */}
      <section className="px-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative aspect-[16/8] rounded-3xl bg-mint-gradient noise overflow-hidden grid place-items-center">
            <span className="text-display text-[clamp(4rem,20vw,20rem)] text-accent-foreground/90 leading-none">
              {project.title.charAt(0)}
            </span>
            <div className="absolute bottom-6 left-6 text-mono text-accent-foreground/80">
              {project.tag} · {project.year}
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-10">
          <aside className="md:col-span-3">
            <div className="sticky top-24 space-y-1 text-mono">
              {[
                ["Overview", "#overview"],
                ["Challenge", "#challenge"],
                ["Approach", "#approach"],
                ["Outcome", "#outcome"],
              ].map(([label, href]) => (
                <a key={href} href={href} className="block px-3 py-2 rounded-lg hover:bg-surface hover:text-mint transition text-muted-foreground">
                  {label}
                </a>
              ))}
            </div>
          </aside>

          <div className="md:col-span-9 space-y-16">
            <Block id="overview" n="01" title="Overview">
              <p>{project.overview}</p>
            </Block>

            <Block id="challenge" n="02" title="Challenge">
              <p>{project.challenge}</p>
            </Block>

            <Block id="approach" n="03" title="Approach">
              <ul className="space-y-4">
                {project.approach.map((a, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="text-mint text-mono shrink-0 pt-1">0{i + 1}</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="outcome" n="04" title="Outcome">
              <ul className="space-y-4">
                {project.outcome.map((o, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="text-mint text-mono shrink-0 pt-1">✽</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <div className="pt-8">
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-mono px-6 py-3 rounded-full bg-mint text-accent-foreground hover:shadow-mint transition"
                onClick={() => trackEvent("case_study_visit", { slug })}
              >
                Visit live project →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NEXT */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1400px]">
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="group block rounded-3xl border border-border bg-surface/40 hover:bg-surface p-8 md:p-12 transition"
          >
            <div className="text-mono text-mint mb-4">Next case study →</div>
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <div className="text-display text-4xl md:text-6xl group-hover:text-mint transition">
                {next.title}
              </div>
              <div className="text-mono text-muted-foreground">{next.tag} · {next.year}</div>
            </div>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto max-w-[1400px] text-mono text-muted-foreground text-center">
          © 2026 Ajiko Fidelis · Design · Code · Build
        </div>
      </footer>
    </div>
  );
}

function Block({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="text-mono text-mint">{n}</span>
        <h2 className="text-display text-3xl md:text-5xl">{title}</h2>
      </div>
      <div className="text-lg leading-[1.65] text-foreground/85 max-w-3xl space-y-4">
        {children}
      </div>
    </section>
  );
}
