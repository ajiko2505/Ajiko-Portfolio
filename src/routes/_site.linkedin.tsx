import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_URL, SITE_OG_IMAGE } from "@/lib/seo";
import {
  profile,
  social,
  email,
  skillGroups,
  experience,
  education,
  learningAreas,
  certifications,
} from "@/lib/profile";
import { trackEvent } from "@/lib/analytics";

const TITLE = "LinkedIn Profile | Ajiko Fidelis";
const DESCRIPTION =
  "The professional profile of Ajiko Fidelis — IT Specialist, Software Developer and Digital Marketer. Experience, education and skills, with links to the live LinkedIn profile and portfolio repository.";

const REPO_URL = "https://github.com/ajiko2505/Ajiko-Portfolio";

export const Route = createFileRoute("/_site/linkedin")({
  component: LinkedInPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: `${SITE_URL}/linkedin` },
      { property: "og:image", content: SITE_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: SITE_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/linkedin` }],
  }),
});

function LinkedInPage() {
  return (
    <>
      {/* PROFILE HEADER */}
      <section className="pt-32 pb-16 px-6 bg-aurora noise" aria-labelledby="li-heading">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-mono text-mint mb-4">◆ Professional profile</p>
          <h1 id="li-heading" className="text-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.98] max-w-4xl">
            {profile.name}
            <span className="text-mint">.</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-foreground/85 max-w-3xl leading-relaxed font-light">
            {profile.title} — {profile.current}
          </p>
          <p className="mt-3 text-mono text-muted-foreground">{profile.location}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={social.email}
              onClick={() => trackEvent("email_click", { from: "profile_page" })}
              className="text-mono px-7 py-3.5 rounded-full bg-mint text-accent-foreground hover:shadow-mint transition min-h-11 inline-flex items-center"
            >
              Email me ↗
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("linkedin_open", { from: "profile_page" })}
              className="text-mono px-7 py-3.5 rounded-full border border-border hover:border-mint hover:text-mint transition min-h-11 inline-flex items-center"
            >
              Connect on LinkedIn ↗
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="text-mono px-7 py-3.5 rounded-full border border-border hover:border-mint hover:text-mint transition min-h-11 inline-flex items-center"
            >
              Ajiko-Portfolio repo ↗
            </a>
            <a
              href={profile.cvPath}
              download
              onClick={() => trackEvent("cv_download", { from: "linkedin_page" })}
              className="text-mono px-7 py-3.5 rounded-full border border-border hover:border-mint hover:text-mint transition min-h-11 inline-flex items-center"
            >
              Download CV ↓
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 py-16 border-t border-border" aria-labelledby="li-about">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 id="li-about" className="text-display text-2xl md:text-3xl">About</h2>
          </div>
          <p className="lg:col-span-8 text-lg text-foreground/85 leading-relaxed">{profile.intro}</p>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="px-6 py-16 border-t border-border bg-surface/40" aria-labelledby="li-exp">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 id="li-exp" className="text-display text-2xl md:text-3xl">Experience</h2>
          </div>
          <div className="lg:col-span-8 space-y-5">
            {experience.map((e) => (
              <article key={`${e.role}-${e.company}`} className="rounded-3xl border border-border bg-card/60 p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-display text-xl">{e.role} · {e.company}</h3>
                  <span className="text-mono text-muted-foreground">{e.period}</span>
                </div>
                <p className="mt-3 text-foreground/80 leading-relaxed">{e.summary}</p>
                <ul className="mt-4 space-y-2">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-foreground/75 leading-relaxed">
                      <span aria-hidden className="text-mint">—</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="px-6 py-16 border-t border-border" aria-labelledby="li-edu">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 id="li-edu" className="text-display text-2xl md:text-3xl">Education & learning</h2>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
            {education.map((e) => (
              <div key={e.qualification} className="rounded-3xl border border-border p-6">
                <h3 className="text-display text-lg">{e.qualification}</h3>
                <p className="mt-1 text-mono text-muted-foreground">{e.institution} · {e.period}</p>
                {e.detail && <p className="mt-3 text-sm text-foreground/75 leading-relaxed">{e.detail}</p>}
              </div>
            ))}
            <div className="rounded-3xl border border-border p-6">
              <h3 className="text-display text-lg">Currently studying</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {learningAreas.map((l) => (
                  <li key={l} className="text-mono px-3 py-1.5 rounded-full border border-border">{l}</li>
                ))}
              </ul>
            </div>
            {certifications.length > 0 && (
              <div className="rounded-3xl border border-border p-6 sm:col-span-2">
                <h3 className="text-display text-lg">Certifications</h3>
                <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                  {certifications.map((c) => (
                    <li key={c.name}>{c.name} — {c.issuer} ({c.year})</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="px-6 py-16 border-t border-border bg-surface/40" aria-labelledby="li-skills">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 id="li-skills" className="text-display text-2xl md:text-3xl">Skills</h2>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
            {skillGroups.map((g) => (
              <div key={g.title} className="rounded-3xl border border-border bg-card/60 p-6">
                <h3 className="text-display text-lg mb-1">{g.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{g.note}</p>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <li key={i} className="text-mono px-3 py-1.5 rounded-full border border-border bg-background/60">{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 border-t border-border" aria-labelledby="li-cta">
        <div className="mx-auto max-w-[1400px] rounded-3xl bg-mint-gradient text-accent-foreground p-10 md:p-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <h2 id="li-cta" className="text-display text-3xl md:text-4xl max-w-2xl">
            Let's connect professionally.
          </h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-mono px-7 py-3.5 rounded-full bg-foreground text-background hover:opacity-90 transition min-h-11 inline-flex items-center"
            >
              View LinkedIn ↗
            </a>
            <Link
              to="/contact"
              className="text-mono px-7 py-3.5 rounded-full border border-current/40 hover:border-current transition min-h-11 inline-flex items-center"
            >
              Send an enquiry →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
