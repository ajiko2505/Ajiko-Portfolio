import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_URL, SITE_OG_IMAGE } from "@/lib/seo";
import { certifications, education, experience, learningAreas } from "@/lib/profile";

const TITLE = "Experience & Education — Ajiko Fidelis";
const DESC =
  "Professional experience, education and training of Ajiko Fidelis — IT Specialist at Stephenson Brothers Ltd and B.Sc. Computer Science graduate.";

export const Route = createFileRoute("/_site/experience")({
  component: ExperiencePage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: `${SITE_URL}/experience` },
      { property: "og:image", content: SITE_OG_IMAGE },
      { property: "og:image:alt", content: "Experience and education of Ajiko Fidelis" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: SITE_OG_IMAGE },
      { name: "twitter:image:alt", content: "Experience and education of Ajiko Fidelis" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/experience` }],
  }),
});

function ExperiencePage() {
  return (
    <>
      <section className="px-6 pt-32 pb-14 bg-aurora noise">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-mono text-mint mb-4">◆ Experience</p>
          <h1 className="text-display text-4xl sm:text-5xl md:text-7xl max-w-4xl">
            Where the work happens<span className="text-mint">.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-2xl">
            Roles, education and ongoing training — the foundation behind the
            projects.
          </p>
        </div>
      </section>

      {/* EXPERIENCE TIMELINE */}
      <section className="px-6 py-16" aria-labelledby="roles-heading">
        <div className="mx-auto max-w-[1400px]">
          <h2 id="roles-heading" className="text-display text-2xl md:text-4xl mb-10">
            Professional experience
          </h2>

          <ol className="relative border-l border-border pl-6 sm:pl-10 space-y-10">
            {experience.map((e) => (
              <li key={`${e.company}-${e.role}`} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[31px] sm:-left-[47px] top-2 w-3.5 h-3.5 rounded-full bg-mint ring-4 ring-background"
                />
                <div className="rounded-3xl border border-border bg-card/60 p-6 sm:p-8 transition hover:border-mint/50 hover:shadow-soft">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="text-display text-xl sm:text-2xl">{e.role}</h3>
                    <span className="text-mono text-muted-foreground">{e.period}</span>
                  </div>
                  <p className="text-mint text-mono mt-2">{e.company}</p>
                  <p className="mt-4 text-foreground/85 leading-relaxed max-w-3xl">{e.summary}</p>
                  <ul className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-2.5 text-sm text-foreground/80">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="text-mint shrink-0" aria-hidden>—</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="px-6 py-16 bg-surface/40" aria-labelledby="education-heading">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <h2 id="education-heading" className="text-display text-2xl md:text-4xl">
              Education
            </h2>
            <p className="mt-4 text-foreground/80 max-w-md">
              Formal grounding in computer science, extended by continuous
              self-directed learning.
            </p>
          </div>
          <div className="lg:col-span-7 space-y-5">
            {education.map((ed) => (
              <div key={ed.qualification} className="rounded-3xl border border-border bg-card/60 p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-display text-xl sm:text-2xl">{ed.qualification}</h3>
                  <span className="text-mono text-muted-foreground">{ed.period}</span>
                </div>
                <p className="text-mint text-mono mt-2">{ed.institution}</p>
                {ed.detail && <p className="mt-4 text-foreground/80">{ed.detail}</p>}
              </div>
            ))}

            <div className="rounded-3xl border border-border p-6 sm:p-8">
              <h3 className="text-mono text-muted-foreground mb-4 normal-case tracking-[0.15em]">
                Ongoing training areas
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {learningAreas.map((a) => (
                  <li
                    key={a}
                    className="text-mono px-3.5 py-2 rounded-full border border-border bg-background/60"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="px-6 py-16" aria-labelledby="certs-heading">
        <div className="mx-auto max-w-[1400px]">
          <h2 id="certs-heading" className="text-display text-2xl md:text-4xl mb-8">
            Certifications &amp; training
          </h2>
          {certifications.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-8 text-foreground/70 max-w-2xl">
              Certifications are listed here as they are completed. Each entry
              includes the issuing organisation, year, and a verification link
              where one is available.
            </div>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {certifications.map((c) => (
                <li key={c.name} className="rounded-3xl border border-border bg-card/60 p-6">
                  <h3 className="text-lg font-semibold">{c.name}</h3>
                  <p className="text-mono text-muted-foreground mt-2">
                    {c.issuer} · {c.year}
                  </p>
                  {c.credentialUrl && (
                    <a
                      href={c.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block text-mono text-mint hover:underline"
                    >
                      View credential ↗
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              to="/work"
              className="text-mono px-6 py-3 rounded-full bg-mint text-accent-foreground hover:shadow-mint transition min-h-11 inline-flex items-center"
            >
              View My Work →
            </Link>
            <Link
              to="/contact"
              className="text-mono px-6 py-3 rounded-full border border-border hover:border-mint hover:text-mint transition min-h-11 inline-flex items-center"
            >
              Let's Work Together ↗
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
