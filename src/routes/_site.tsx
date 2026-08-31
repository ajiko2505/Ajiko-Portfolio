import { useState } from "react";
import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/ThemeToggle";
import { trackEvent } from "@/lib/analytics";
import { SITE_URL } from "@/lib/seo";
import { profile, social } from "@/lib/profile";

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(structuredData),
      },
    ],
  }),
});

const NAV = [
  { to: "/", label: "Home", exact: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Skills" },
  { to: "/experience", label: "Experience" },
  { to: "/work", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Ajiko Fidelis",
      url: SITE_URL,
      jobTitle: "IT Specialist, Software Developer & Digital Marketer",
      description: profile.intro,
      worksFor: {
        "@type": "Organization",
        name: "Stephenson Brothers Ltd",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Kaduna State University",
      },
      knowsAbout: [
        "Software Development",
        "Web Development",
        "WordPress",
        "WooCommerce",
        "E-commerce",
        "IT Support",
        "Digital Marketing",
        "SEO",
        "Machine Learning",
      ],
      sameAs: [social.github, social.linkedin, social.instagram],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: "Ajiko Fidelis",
      url: SITE_URL,
      description: profile.intro,
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
      copyrightHolder: { "@id": PERSON_ID },
    },
  ],
};

function SiteLayout() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:px-4 focus:py-2 focus:rounded-full focus:bg-mint focus:text-accent-foreground focus:text-mono focus:shadow-mint"
      >
        Skip to content
      </a>

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6 h-16 flex items-center justify-between gap-3">
          <Link
            to="/"
            className="flex items-center gap-2.5 min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint rounded-full"
            aria-label="Ajiko Fidelis — home"
            onClick={() => setOpen(false)}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-mint shrink-0" />
            <span className="text-mono truncate">Ajiko&nbsp;Fidelis</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-1 text-mono">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: "exact" in item ? item.exact : false }}
                activeProps={{ "aria-current": "page", className: "text-mint bg-surface" }}
                className="px-3.5 py-2 rounded-full hover:bg-surface transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/contact"
              className="hidden sm:inline-grid text-mono px-4 py-2 rounded-full bg-mint text-accent-foreground hover:shadow-mint transition min-h-11 place-items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
              onClick={() => trackEvent("nav_hire_click")}
            >
              Let's Talk →
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="lg:hidden min-h-11 min-w-11 grid place-items-center rounded-full border border-border hover:border-mint transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
            >
              <span aria-hidden className="text-lg leading-none">{open ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {open && (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl px-5 py-4"
          >
            <ul className="flex flex-col gap-1 text-mono">
              {NAV.map((item) => {
                const active =
                  item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={`block px-4 py-3 rounded-2xl transition min-h-11 ${
                        active ? "bg-surface text-mint" : "hover:bg-surface"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 block px-4 py-3 rounded-2xl bg-mint text-accent-foreground text-center min-h-11"
                >
                  Let's Talk →
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <main id="main">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 py-14">
        <div className="mx-auto max-w-[1400px] grid gap-10 md:grid-cols-4 items-start">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-mint" />
              <span className="text-mono">Ajiko Fidelis</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              IT Specialist • Software Developer • Digital Marketer. Building
              practical digital solutions for real business problems.
            </p>
            <a
              href={profile.cvPath}
              download
              onClick={() => trackEvent("cv_download", { from: "footer" })}
              className="mt-5 inline-flex items-center gap-2 text-mono px-5 py-3 rounded-full border border-border hover:border-mint hover:text-mint transition min-h-11"
            >
              Download CV ↓
            </a>
          </div>
          <div>
            <h2 className="text-mono text-muted-foreground mb-3 normal-case tracking-[0.15em]">Pages</h2>
            <ul className="space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-mint transition">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-mono text-muted-foreground mb-3 normal-case tracking-[0.15em]">Elsewhere</h2>
            <ul className="space-y-2 text-sm">
              <li><a href={social.github} target="_blank" rel="noreferrer" className="hover:text-mint transition">GitHub</a></li>
              <li><a href={social.linkedin} target="_blank" rel="noreferrer" className="hover:text-mint transition">LinkedIn</a></li>
              <li><a href={social.instagram} target="_blank" rel="noreferrer" className="hover:text-mint transition">Instagram</a></li>
              <li><a href={social.whatsapp} target="_blank" rel="noreferrer" className="hover:text-mint transition">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-[1400px] mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-mono text-muted-foreground">
          <div>© 2026 Ajiko Fidelis. All rights reserved.</div>
          <div>IT · Software · Digital</div>
        </div>
      </footer>
    </div>
  );
}
