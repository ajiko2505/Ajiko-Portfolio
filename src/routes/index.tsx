import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

const projects = [
  {
    title: "Works",
    year: "2024",
    role: "Design · Code",
    stack: "PHP · Web",
    description: "An evolving collection of small experiments, static sites, and code sketches. Deployed via GitHub Pages.",
    href: "https://ajiko2505.github.io/Works/",
    repo: "https://github.com/ajiko2505/Works",
  },
  {
    title: "Profile Config",
    year: "2024",
    role: "Identity",
    stack: "Markdown",
    description: "The README behind ajiko2505 — a quiet home base on GitHub. Three words: design, code, build.",
    href: "https://github.com/ajiko2505/ajiko2505",
    repo: "https://github.com/ajiko2505/ajiko2505",
  },
];

const services = [
  { n: "01", title: "Design", body: "Interfaces, identity, and layout systems that feel considered rather than decorated." },
  { n: "02", title: "Code", body: "Front-end engineering with modern React, TypeScript, and a taste for tiny, resilient details." },
  { n: "03", title: "Build", body: "Turning ideas into shipped things — from static pages to full product surfaces." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <a href="#top" className="text-mono">AF — ajiko2505</a>
          <nav className="hidden md:flex items-center gap-8 text-mono">
            <a href="#work" className="hover:text-accent transition-colors">Work</a>
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#services" className="hover:text-accent transition-colors">Services</a>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
          </nav>
          <a
            href="https://github.com/ajiko2505"
            target="_blank"
            rel="noreferrer"
            className="text-mono px-3 py-1.5 border border-border rounded-full hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 text-mono text-muted-foreground animate-rise">
            <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
            Available for select projects · 2026
          </div>

          <h1 className="text-display mt-8 text-[clamp(3.5rem,12vw,11rem)] animate-rise">
            Ajiko <span className="italic text-accent">Fidelis</span>
          </h1>

          <div className="mt-10 grid md:grid-cols-12 gap-6 items-end animate-rise">
            <p className="md:col-span-7 text-2xl md:text-3xl text-display leading-[1.15] text-foreground/90">
              I design. I code. I build. A designer &amp; developer making interfaces
              and small, useful software with intent.
            </p>
            <div className="md:col-span-5 md:pl-8 md:border-l border-border">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Independent practice working across product design, front-end
                engineering, and the strange middle where the two meet. Currently
                exploring craft-driven web work.
              </p>
              <div className="mt-6 flex gap-3">
                <a href="#work" className="text-mono px-4 py-2.5 rounded-full bg-accent text-accent-foreground hover:opacity-90 transition">
                  See the work →
                </a>
                <a href="#contact" className="text-mono px-4 py-2.5 rounded-full border border-border hover:border-foreground transition">
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-24 border-y border-border py-6 overflow-hidden">
          <div className="flex gap-16 animate-marquee whitespace-nowrap text-display text-[clamp(2rem,6vw,4.5rem)] text-foreground/40">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-16 shrink-0">
                <span>Design</span><span className="text-accent">✳</span>
                <span>Code</span><span className="text-accent">✳</span>
                <span>Build</span><span className="text-accent">✳</span>
                <span>Ship</span><span className="text-accent">✳</span>
                <span className="italic">Repeat</span><span className="text-accent">✳</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-baseline justify-between mb-16">
            <div>
              <div className="text-mono text-muted-foreground mb-3">§ 01 — Selected Work</div>
              <h2 className="text-display text-5xl md:text-7xl">Things I've made</h2>
            </div>
            <a href="https://github.com/ajiko2505?tab=repositories" target="_blank" rel="noreferrer" className="hidden md:inline text-mono text-muted-foreground hover:text-accent">
              All repos ↗
            </a>
          </div>

          <div className="border-t border-border">
            {projects.map((p) => (
              <a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-12 gap-4 py-8 border-b border-border items-center hover:bg-muted/40 transition-colors px-2 -mx-2"
              >
                <div className="col-span-1 text-mono text-muted-foreground">{p.year}</div>
                <div className="col-span-11 md:col-span-4">
                  <div className="text-display text-3xl md:text-5xl group-hover:text-accent transition-colors">
                    {p.title}
                  </div>
                </div>
                <div className="col-span-6 md:col-span-2 text-mono text-muted-foreground">{p.role}</div>
                <div className="col-span-6 md:col-span-3 text-sm text-foreground/80">{p.description}</div>
                <div className="col-span-12 md:col-span-2 text-mono text-right text-muted-foreground group-hover:text-accent transition">
                  Visit ↗
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-6 py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="text-mono text-muted-foreground mb-3">§ 02 — About</div>
            <div className="sticky top-24">
              <div className="aspect-square rounded-2xl overflow-hidden border border-border bg-surface">
                <img
                  src="https://avatars.githubusercontent.com/u/100570007?v=4"
                  alt="Ajiko Fidelis"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
                />
              </div>
              <div className="mt-4 text-mono text-muted-foreground">Ajiko Fidelis · Independent</div>
            </div>
          </div>

          <div className="md:col-span-8 space-y-8">
            <h2 className="text-display text-4xl md:text-6xl leading-[1.05]">
              A quiet practice built on three verbs — <span className="italic text-accent">design</span>,{" "}
              <span className="italic text-accent">code</span>,{" "}
              <span className="italic text-accent">build</span>.
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed max-w-2xl">
              I care about the shape of software: how it reads, how it responds,
              how much it asks of the person using it. My work sits between
              interface design and front-end engineering — sketching, prototyping,
              and shipping in the same afternoon whenever possible.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed max-w-2xl">
              Outside of client work I keep a small workshop of experiments on
              GitHub — most of it small, some of it useful, all of it made by
              hand.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border">
              {[
                ["Focus", "Product · Web"],
                ["Tools", "Figma · React · TS"],
                ["Base", "Remote"],
                ["Status", "Open to work"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-mono text-muted-foreground">{k}</div>
                  <div className="mt-1 text-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-mono text-muted-foreground mb-3">§ 03 — What I do</div>
          <h2 className="text-display text-5xl md:text-7xl mb-16">Services</h2>

          <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {services.map((s) => (
              <div key={s.n} className="bg-background p-10 hover:bg-muted/40 transition-colors group">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-mono text-muted-foreground">{s.n}</span>
                  <span className="w-10 h-10 rounded-full border border-border grid place-items-center group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition">↗</span>
                </div>
                <h3 className="text-display text-4xl mb-4">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-mono text-muted-foreground mb-3">§ 04 — Contact</div>
          <h2 className="text-display text-6xl md:text-9xl leading-[0.95]">
            Let's build <br />
            <span className="italic text-accent">something good.</span>
          </h2>

          <div className="mt-16 grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <a
                href="https://github.com/ajiko2505"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-4 text-display text-3xl md:text-5xl hover:text-accent transition-colors"
              >
                github.com/ajiko2505
                <span className="text-2xl">↗</span>
              </a>
            </div>
            <div className="md:col-span-5 grid grid-cols-2 gap-4">
              <a href="https://github.com/ajiko2505" target="_blank" rel="noreferrer" className="p-6 rounded-xl border border-border hover:border-accent hover:bg-background transition-colors">
                <div className="text-mono text-muted-foreground mb-2">Code</div>
                <div className="text-lg">GitHub</div>
              </a>
              <a href="https://github.com/ajiko2505?tab=followers" target="_blank" rel="noreferrer" className="p-6 rounded-xl border border-border hover:border-accent hover:bg-background transition-colors">
                <div className="text-mono text-muted-foreground mb-2">Follow</div>
                <div className="text-lg">@ajiko2505</div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-mono text-muted-foreground">
          <div>© 2026 Ajiko Fidelis</div>
          <div>Design · Code · Build</div>
          <div>Made by hand</div>
        </div>
      </footer>
    </div>
  );
}
