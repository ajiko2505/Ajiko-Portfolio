import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/ThemeToggle";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
});

const NAV = [
  { to: "/", label: "Index", exact: true },
  { to: "/work", label: "Work" },
  { to: "/about", label: "Studio" },
  { to: "/services", label: "Craft" },
  { to: "/contact", label: "Contact" },
] as const;

function SiteLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-full focus:bg-mint focus:text-accent-foreground focus:text-mono focus:shadow-mint"
      >
        Skip to content
      </a>

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 h-16 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2.5 min-w-0" aria-label="Ajiko Fidelis — home">
            <span className="w-2.5 h-2.5 rounded-full bg-mint animate-glow-pulse shrink-0" />
            <span className="text-mono truncate">Ajiko&nbsp;Fidelis</span>
          </Link>
          <nav aria-label="Primary" className="hidden md:flex items-center gap-1 text-mono">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: "exact" in item ? item.exact : false }}
                activeProps={{ "aria-current": "page", className: "text-mint bg-surface" }}
                className="px-4 py-2 rounded-full hover:bg-surface transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/contact"
              className="text-mono px-4 py-2 rounded-full bg-mint text-accent-foreground hover:shadow-mint transition min-h-11 grid place-items-center"
              onClick={() => trackEvent("nav_hire_click")}
            >
              Hire me →
            </Link>
          </div>
        </div>
      </header>

      <main id="main">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 py-12">
        <div className="mx-auto max-w-[1400px] grid gap-8 md:grid-cols-4 items-start">
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
            <div className="text-mono text-muted-foreground mb-3">Sitemap</div>
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
            <div className="text-mono text-muted-foreground mb-3">Elsewhere</div>
            <ul className="space-y-2 text-sm">
              <li><a href="https://wa.me/2348155866150" target="_blank" rel="noreferrer" className="hover:text-mint transition">WhatsApp</a></li>
              <li><a href="https://linkedin.com/in/ajiko001" target="_blank" rel="noreferrer" className="hover:text-mint transition">LinkedIn</a></li>
              <li><a href="https://instagram.com/fidelis.ajiko" target="_blank" rel="noreferrer" className="hover:text-mint transition">Instagram</a></li>
              <li><a href="https://github.com/ajiko2505" target="_blank" rel="noreferrer" className="hover:text-mint transition">GitHub</a></li>
            </ul>
          </div>
          <div className="md:text-right">
            <div className="text-mono text-muted-foreground mb-3">Colophon</div>
            <p className="text-sm text-muted-foreground">
              Set in Archivo Black &amp; Hind. Built with React, TanStack, and Tailwind. Designed &amp; coded by hand.
            </p>
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
