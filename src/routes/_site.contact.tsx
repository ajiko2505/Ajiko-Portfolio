import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/ContactForm";
import { trackEvent } from "@/lib/analytics";
import { SITE_URL, SITE_OG_IMAGE } from "@/lib/seo";

const TITLE = "Contact — Ajiko Fidelis";
const DESC =
  "Have a project in mind? Contact Ajiko Fidelis about websites, e-commerce, technical support, digital strategy or custom software — WhatsApp, LinkedIn or the contact form.";

export const Route = createFileRoute("/_site/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/contact` },
      { property: "og:image", content: SITE_OG_IMAGE },
      { property: "og:image:alt", content: "Contact Ajiko Fidelis" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: SITE_OG_IMAGE },
      { name: "twitter:image:alt", content: "Contact Ajiko Fidelis" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
});

const channels = [
  ["Email", "Gmail", "ajikofidelis.3@gmail.com", "mailto:ajikofidelis.3@gmail.com"],
  ["Chat", "WhatsApp", "+234 815 586 6150", "https://wa.me/2348155866150"],
  ["Network", "LinkedIn", "in/ajiko001", "https://www.linkedin.com/in/ajiko001"],
  ["Follow", "Instagram", "@fidelisajiko", "https://instagram.com/fidelisajiko"],
  ["Code", "GitHub", "@ajiko2505", "https://github.com/ajiko2505"],
] as const;

function ContactPage() {
  return (
    <section className="px-6 pt-32 pb-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-aurora opacity-70 pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="text-mono text-mint mb-4">◆ Contact</div>
        <h1 className="text-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] max-w-4xl">
          Have a project in mind<span className="text-mint">?</span>
        </h1>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <p className="text-lg text-foreground/80 max-w-md">
              Whether you need a website, e-commerce solution, technical
              support, digital strategy, or a custom software solution, let's
              talk. I read every message and usually reply within a working day.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {channels.map(([k, v, sub, h]) => (
                <a
                  key={v}
                  href={h}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${v} — ${sub}`}
                  onClick={() => trackEvent("social_click", { channel: v })}
                  className="p-5 rounded-2xl border border-border bg-background/50 backdrop-blur hover:bg-mint hover:text-accent-foreground hover:border-mint transition group flex flex-col gap-3 min-h-[130px] justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
                >
                  <div className="flex items-start justify-between">
                    <div className="text-mono opacity-70">{k}</div>
                    <span className="opacity-60 group-hover:translate-x-1 group-hover:-translate-y-1 transition" aria-hidden>↗</span>
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
  );
}
