import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_URL, SITE_OG_IMAGE } from "@/lib/seo";
import { profile, social, skillGroups } from "@/lib/profile";

const TITLE = "About — Ajiko Fidelis, IT Specialist & Software Developer";
const DESC =
  "Ajiko Fidelis is an IT Specialist and Software Developer working across web development, e-commerce, IT support, digital marketing and data — currently at Stephenson Brothers Ltd.";

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

function AboutPage() {
  return (
    <>
      <section className="px-6 pt-32 pb-16 bg-aurora noise">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden border border-border max-w-sm">
              <img
                src="https://avatars.githubusercontent.com/u/100570007?v=4"
                alt="Portrait of Ajiko Fidelis, IT Specialist and Software Developer"
                loading="lazy"
                decoding="async"
                width={640}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-mono text-mint mb-4">◆ About</p>
            <h1 className="text-display text-4xl sm:text-5xl md:text-6xl">
              Technology, applied to real problems<span className="text-mint">.</span>
            </h1>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/85 max-w-2xl">
              <p>
                I'm Ajiko Fidelis — an IT Specialist and Software Developer. My
                work sits where technology meets the day-to-day running of a
                business: the website that has to stay online, the store that has
                to sell, the systems people rely on without thinking about them.
              </p>
              <p>
                I studied Computer Science at Kaduna State University, and most of
                what I do now grew out of following problems rather than job
                titles. A site that needed building led to PHP, WordPress and
                WooCommerce. A store that needed customers led to SEO, content and
                analytics. A team that needed things to just work led to IT
                support, networking and cybersecurity fundamentals. Alongside that
                I keep studying Python, data analysis and machine learning,
                because understanding data changes the decisions you make.
              </p>
              <p>
                What connects it all is a preference for solutions that hold up
                after handover — small stacks, clear structure, documented setups,
                and honest expectations. I'd rather ship something maintainable
                than something impressive that breaks in a month.
              </p>
            </div>

            <div className="mt-8 rounded-3xl border border-border bg-card/60 p-6">
              <p className="text-mono text-mint mb-2">Currently</p>
              <p className="text-lg">{profile.current}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/experience"
                className="text-mono px-6 py-3 rounded-full bg-mint text-accent-foreground hover:shadow-mint transition min-h-11 inline-flex items-center"
              >
                Experience &amp; education →
              </Link>
              <a
                href={profile.cvPath}
                download
                className="text-mono px-6 py-3 rounded-full border border-border hover:border-mint hover:text-mint transition min-h-11 inline-flex items-center"
              >
                Download CV ↓
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-mono px-6 py-3 rounded-full border border-border hover:border-mint hover:text-mint transition min-h-11 inline-flex items-center"
              >
                Connect on LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-surface/40" aria-labelledby="about-skills-heading">
        <div className="mx-auto max-w-[1400px]">
          <h2 id="about-skills-heading" className="text-display text-3xl md:text-5xl mb-10">
            Where I work
          </h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillGroups.map((g) => (
              <li key={g.title} className="rounded-3xl border border-border bg-card/60 p-6">
                <h3 className="text-display text-xl mb-2">{g.title}</h3>
                <p className="text-sm text-muted-foreground">{g.note}</p>
              </li>
            ))}
          </ul>
          <Link
            to="/services"
            className="mt-10 inline-flex items-center text-mono px-6 py-3 rounded-full border border-border hover:border-mint hover:text-mint transition min-h-11"
          >
            Full skill set →
          </Link>
        </div>
      </section>
    </>
  );
}
