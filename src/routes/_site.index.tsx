import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { trackEvent } from "@/lib/analytics";
import { SITE_URL, SITE_OG_IMAGE, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/seo";
import { profile, skillGroups, social, experience } from "@/lib/profile";

export const Route = createFileRoute("/_site/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: SITE_OG_IMAGE },
      { property: "og:image:alt", content: "Ajiko Fidelis — IT Specialist, Software Developer & Digital Marketer" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: SITE_OG_IMAGE },
      { name: "twitter:image:alt", content: "Ajiko Fidelis — IT Specialist, Software Developer & Digital Marketer" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Selected projects — Ajiko Fidelis",
          description:
            "Selected work by Ajiko Fidelis across software development, web, e-commerce, IT and digital marketing.",
          numberOfItems: projects.length,
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
              genre: p.category,
              dateCreated: p.year,
              keywords: p.stack.join(", "),
              author: { "@type": "Person", name: "Ajiko Fidelis", url: SITE_URL },
            },
          })),
        }),
      },
    ],
  }),
});

const DISCIPLINES = [
  ["01", "Software", "Web apps, scripts and business tools built to be maintained."],
  ["02", "E-Commerce", "WooCommerce and Shopify stores structured for real catalogues."],
  ["03", "IT Support", "Systems, networks and devices kept dependable day to day."],
  ["04", "Digital Growth", "SEO, content and analytics wired into the build."],
] as const;

function SectionHead({
  eyebrow,
  title,
  action,
  id,
}: {
  eyebrow: string;
  title: string;
  id: string;
  action?: { to: string; label: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
      <div>
        <p className="text-mono text-mint mb-3">◆ {eyebrow}</p>
        <h2 id={id} className="text-display text-3xl md:text-5xl leading-[1.05]">
          {title}
        </h2>
      </div>
      {action && (
        <Link
          to={action.to}
          className="text-mono px-6 py-3 rounded-full border border-border hover:border-mint hover:text-mint transition min-h-11 inline-flex items-center"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

function HomePage() {
  const featured = projects.filter((p) => p.featured).slice(0, 2);
  const rest = projects.filter((p) => !p.featured).slice(0, 3);
  const current = experience[0];

  return (
    <>
      {/* 01 — HERO */}
      <section className="relative pt-32 pb-24 px-6 bg-aurora noise" aria-labelledby="hero-heading">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-12 lg:gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-mono text-muted-foreground animate-rise">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                {profile.name}
              </span>
              <span className="opacity-40" aria-hidden>/</span>
              <span className="text-mint">{profile.title}</span>
            </p>

            <h1
              id="hero-heading"
              className="mt-7 text-display text-[clamp(2.4rem,7vw,6rem)] leading-[0.94] animate-rise"
            >
              Building Digital<br className="hidden sm:block" /> Solutions That Work
              <span className="text-mint">.</span>
            </h1>

            <p className="mt-7 text-lg md:text-xl leading-[1.5] max-w-2xl text-foreground/85 font-light animate-rise">
              {profile.intro}
            </p>

            <div className="mt-9 flex flex-wrap gap-3 animate-rise">
              <Link
                to="/work"
                onClick={() => trackEvent("cta_work", { from: "hero" })}
                className="text-mono px-7 py-3.5 rounded-full bg-mint text-accent-foreground hover:shadow-mint transition min-h-11 inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
              >
                View My Work →
              </Link>
              <Link
                to="/contact"
                onClick={() => trackEvent("cta_contact", { from: "hero" })}
                className="text-mono px-7 py-3.5 rounded-full border border-border hover:border-mint hover:text-mint transition min-h-11 inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
              >
                Let's Work Together ↗
              </Link>
            </div>
          </div>

          {/* Identity card keeps CV, links and status out of the headline flow */}
          <aside className="lg:col-span-4 rounded-3xl border border-border bg-card/60 backdrop-blur p-7 animate-rise">
            <p className="text-mono text-mint">◆ Currently</p>
            <p className="mt-3 text-display text-xl leading-snug">
              {current.role} · {current.company}
            </p>
            <p className="mt-2 text-mono text-muted-foreground">{current.period}</p>
            <p className="mt-4 text-sm text-foreground/75 leading-relaxed">{profile.location}</p>

            <a
              href={profile.cvPath}
              download
              onClick={() => trackEvent("cv_download", { from: "hero" })}
              className="mt-6 w-full text-mono px-6 py-3.5 rounded-full border border-border hover:border-mint hover:text-mint transition min-h-11 inline-flex items-center justify-center"
            >
              Download CV ↓
            </a>

            <ul className="mt-6 pt-6 border-t border-border grid grid-cols-2 gap-y-3 text-mono">
              <li><Link to="/linkedin" className="hover:text-mint transition">LinkedIn →</Link></li>
              <li><a href={social.github} target="_blank" rel="noreferrer" className="hover:text-mint transition">GitHub ↗</a></li>
              <li><a href={social.instagram} target="_blank" rel="noreferrer" className="hover:text-mint transition">Instagram ↗</a></li>
              <li><a href={social.whatsapp} target="_blank" rel="noreferrer" className="hover:text-mint transition">WhatsApp ↗</a></li>
            </ul>
          </aside>
        </div>
      </section>

      {/* 02 — WHAT I DO */}
      <section className="px-6 py-20 border-t border-border" aria-labelledby="disciplines-heading">
        <div className="mx-auto max-w-[1400px]">
          <SectionHead
            id="disciplines-heading"
            eyebrow="What I do"
            title="Four disciplines, one workflow"
            action={{ to: "/services", label: "Full skill set →" }}
          />
          <dl className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-border">
            {DISCIPLINES.map(([n, k, v]) => (
              <div
                key={k}
                className="group border-b border-border sm:border-r last:border-r-0 p-7 transition hover:bg-surface/50"
              >
                <span className="text-mono text-muted-foreground">{n}</span>
                <dt className="mt-4 text-display text-xl group-hover:text-mint transition">{k}</dt>
                <dd className="mt-2 text-sm text-foreground/75 leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 03 — SELECTED WORK */}
      <section className="px-6 py-20 bg-surface/40 border-t border-border" aria-labelledby="featured-heading">
        <div className="mx-auto max-w-[1400px]">
          <SectionHead
            id="featured-heading"
            eyebrow="Selected work"
            title="Projects with a purpose"
            action={{ to: "/work", label: "All projects →" }}
          />

          <div className="grid md:grid-cols-2 gap-5">
            {featured.map((p) => (
              <Link
                key={p.slug}
                to="/work/$slug"
                params={{ slug: p.slug }}
                onClick={() => trackEvent("project_open", { slug: p.slug, from: "home_featured" })}
                className="group rounded-3xl border border-border bg-card/60 p-8 flex flex-col justify-between min-h-[300px] transition hover:-translate-y-1 hover:border-mint/60 hover:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-mono text-mint">{p.category} · {p.year}</span>
                  <span aria-hidden className="opacity-60 group-hover:translate-x-1 group-hover:-translate-y-1 transition">↗</span>
                </div>
                <div className="mt-12">
                  <h3 className="text-display text-2xl md:text-3xl group-hover:text-mint transition">{p.title}</h3>
                  <p className="mt-3 text-foreground/80 leading-relaxed max-w-md">{p.blurb}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.stack.slice(0, 4).map((s) => (
                      <li key={s} className="text-mono px-2.5 py-1 rounded-full border border-border opacity-80">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>

          <ul className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  onClick={() => trackEvent("project_open", { slug: p.slug, from: "home_grid" })}
                  className="group h-full rounded-3xl border border-border bg-background/40 p-6 flex flex-col gap-3 transition hover:-translate-y-1 hover:border-mint/60 hover:shadow-soft"
                >
                  <span className="text-mono text-muted-foreground">{p.category} · {p.year}</span>
                  <span className="text-display text-xl group-hover:text-mint transition">{p.title}</span>
                  <span className="text-sm text-foreground/75 leading-relaxed">{p.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 — CAPABILITY */}
      <section className="px-6 py-20 border-t border-border" aria-labelledby="skills-heading">
        <div className="mx-auto max-w-[1400px]">
          <SectionHead
            id="skills-heading"
            eyebrow="Capability"
            title="Technology I work with"
            action={{ to: "/experience", label: "Experience →" }}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillGroups.slice(0, 3).map((g) => (
              <div key={g.title} className="rounded-3xl border border-border bg-card/60 p-6">
                <h3 className="text-display text-xl mb-2">{g.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{g.note}</p>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <li key={i} className="text-mono px-3 py-1.5 rounded-full border border-border bg-background/60">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — CTA */}
      <section className="px-6 py-20 border-t border-border" aria-labelledby="home-cta-heading">
        <div className="mx-auto max-w-[1400px] rounded-3xl bg-mint-gradient text-accent-foreground p-10 md:p-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <h2 id="home-cta-heading" className="text-display text-3xl md:text-5xl max-w-2xl">
              Have a project in mind?
            </h2>
            <p className="mt-4 max-w-xl opacity-90">
              Whether you need a website, e-commerce solution, technical support,
              digital strategy, or a custom software solution, let's talk.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="text-mono px-7 py-3.5 rounded-full bg-foreground text-background hover:opacity-90 transition min-h-11 inline-flex items-center"
            >
              Let's Work Together →
            </Link>
            <Link
              to="/linkedin"
              className="text-mono px-7 py-3.5 rounded-full border border-current/40 hover:border-current transition min-h-11 inline-flex items-center"
            >
              LinkedIn Profile →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
