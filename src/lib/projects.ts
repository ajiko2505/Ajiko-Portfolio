export const CATEGORIES = [
  "All",
  "Development",
  "Web",
  "E-Commerce",
  "Marketing",
  "IT",
  "AI / Data",
] as const;

export type Category = Exclude<(typeof CATEGORIES)[number], "All">;

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  tag: string;
  category: Category;
  year: string;
  stack: string[];
  blurb: string;
  /** Optional live project URL. Omitted when no public URL exists. */
  href?: string;
  /** Extra buttons (GitHub, live demo, etc). Only real URLs. */
  links?: ProjectLink[];
  tone: "mint" | "mint-soft" | "forest" | "dark";
  size: "tall" | "short" | "wide";
  featured?: boolean;
  hero: string;
  role: string;
  timeline: string;
  overview: string;
  challenge: string;
  approach: string[];
  outcome: string[];
};

export const projects: Project[] = [
  {
    slug: "stephenson-brothers",
    title: "Stephenson Brothers Ltd",
    tag: "Digital Transformation & E-Commerce",
    category: "E-Commerce",
    year: "2026",
    stack: ["WordPress", "WooCommerce", "SEO", "Analytics"],
    blurb:
      "Applying web, e-commerce and digital marketing technology inside a working business environment.",
    tone: "mint",
    size: "wide",
    featured: true,
    hero:
      "Digital transformation and e-commerce work inside a real business — website, storefront, and digital marketing under one technology function.",
    role: "IT Specialist — website, e-commerce and digital systems support",
    timeline: "December 2025 – Present",
    overview:
      "Stephenson Brothers Ltd is where my technical work meets commercial reality. As IT Specialist I support the technology the business runs on: the website, the online storefront, the digital marketing stack, and the everyday systems the team depends on. The work spans WordPress and WooCommerce, product presentation, SEO, social channels, and general technical support.",
    challenge:
      "A business needs its digital presence to be consistent, current, and easy to operate — while day-to-day IT keeps running. The challenge was to keep the website and store accurate and performant, make product information straightforward to manage, and give marketing the technical footing it needed, without disrupting operations.",
    approach: [
      "Maintained and updated the company website, keeping content, structure and performance in good order.",
      "Worked on the WooCommerce store — product presentation, catalogue structure, and store configuration.",
      "Applied on-page SEO practices so products and pages are easier to find.",
      "Supported digital marketing and social activity with technical setup, publishing, and analytics tracking.",
      "Handled technical troubleshooting and IT support across the systems the team uses daily.",
    ],
    outcome: [
      "Improved digital presence, with the site and store kept consistent and current.",
      "Streamlined online product presentation that is simpler to maintain.",
      "Expanded digital marketing capabilities backed by proper tracking and technical setup.",
      "A clearer e-commerce structure and steadier day-to-day digital infrastructure.",
    ],
  },
  {
    slug: "works",
    title: "Works",
    tag: "Open Source",
    category: "Development",
    year: "2024",
    stack: ["PHP", "HTML", "CSS", "GitHub Pages"],
    blurb: "A public gallery of web builds and experiments, deployed on GitHub Pages.",
    href: "https://ajiko2505.github.io/Works/",
    links: [
      { label: "Live site", href: "https://ajiko2505.github.io/Works/" },
      { label: "GitHub", href: "https://github.com/ajiko2505/Works" },
    ],
    tone: "forest",
    size: "tall",
    featured: true,
    hero: "A public shelf of small builds — written by hand, shipped continuously.",
    role: "Design · Development · Deployment",
    timeline: "Ongoing · 2024–now",
    overview:
      "Works is my public build log. Each entry is a small, self-contained page or utility — an excuse to take one idea end to end, from markup to deployment.",
    challenge:
      "Keep a personal project alive alongside full-time work. Most side galleries go stale within a season.",
    approach: [
      "Kept the publishing loop frictionless: one repository, static output, a single push to ship.",
      "Standardised layout and typography so entries read as one body of work.",
      "Used GitHub Pages so hosting never becomes a reason not to publish.",
    ],
    outcome: [
      "A permanent, indexable collection that grows rather than resets.",
      "A practical reference I reuse when starting client work.",
    ],
  },
  {
    slug: "business-web-builds",
    title: "Business Website Builds",
    tag: "Web Development",
    category: "Web",
    year: "2025",
    stack: ["WordPress", "Elementor", "PHP", "CSS"],
    blurb:
      "Websites for small businesses — built to be edited by the people who own them.",
    tone: "dark",
    size: "short",
    hero: "Business websites that stay maintainable after handover.",
    role: "Development · Setup · Handover",
    timeline: "2025 – present",
    overview:
      "Website work for small businesses: structure, build, performance and handover. The brief is usually the same — a site that looks credible, loads fast, and can be updated without a developer on call.",
    challenge:
      "Small businesses inherit sites they cannot maintain. Plugins pile up, pages slow down, and edits stall.",
    approach: [
      "Kept the stack deliberately small — fewer plugins, fewer moving parts.",
      "Structured content and page templates so non-technical owners can edit safely.",
      "Applied performance basics: image optimisation, caching, and lean markup.",
      "Documented the setup at handover so nothing depends on memory.",
    ],
    outcome: [
      "Sites that owners actually keep updated.",
      "Fewer support requests after launch.",
    ],
  },
  {
    slug: "ecommerce-operations",
    title: "E-Commerce Operations",
    tag: "E-Commerce",
    category: "E-Commerce",
    year: "2026",
    stack: ["WooCommerce", "Shopify", "Product Data", "Analytics"],
    blurb:
      "Catalogue structure, product presentation and store configuration that hold up at scale.",
    tone: "mint-soft",
    size: "short",
    hero: "The unglamorous side of online retail — done properly.",
    role: "E-commerce management",
    timeline: "Ongoing",
    overview:
      "Store work: categories, attributes, product copy, images, shipping and payment configuration, and the reporting that tells you whether any of it is working.",
    challenge:
      "Catalogues drift. Duplicate categories, inconsistent product data and half-configured settings quietly cost sales.",
    approach: [
      "Set a consistent product data model — naming, attributes, categories — before adding volume.",
      "Standardised product imagery and copy so listings read as one store.",
      "Configured analytics so decisions come from data rather than guesswork.",
    ],
    outcome: [
      "A catalogue that is easier to browse and easier to maintain.",
      "Clearer reporting on what customers actually look at.",
    ],
  },
  {
    slug: "digital-marketing-practice",
    title: "Digital Marketing & SEO",
    tag: "Marketing",
    category: "Marketing",
    year: "2026",
    stack: ["SEO", "Content", "Social", "Analytics"],
    blurb:
      "Technical SEO, content and social work that connects a business to the people looking for it.",
    tone: "forest",
    size: "short",
    hero: "Marketing work grounded in technical execution, not vibes.",
    role: "Digital marketing · SEO",
    timeline: "Ongoing",
    overview:
      "The marketing side of my practice: on-page SEO, metadata, structured content, social publishing and analytics — the parts where technical understanding makes the difference.",
    challenge:
      "Marketing effort is wasted when the technical foundation is weak: missing metadata, unindexed pages, no tracking.",
    approach: [
      "Fixed the technical foundation first — titles, descriptions, structure, sitemaps, indexing.",
      "Built a content rhythm the business can sustain.",
      "Instrumented analytics so activity can be measured rather than assumed.",
    ],
    outcome: [
      "Improved discoverability of key pages.",
      "Marketing decisions backed by measurable signals.",
    ],
  },
  {
    slug: "it-support-systems",
    title: "IT Support & Systems",
    tag: "IT",
    category: "IT",
    year: "2026",
    stack: ["Networking", "Security Basics", "Troubleshooting"],
    blurb:
      "Keeping devices, accounts, networks and people working — quietly and reliably.",
    tone: "dark",
    size: "short",
    hero: "The work that only gets noticed when it stops.",
    role: "IT support · Systems",
    timeline: "Ongoing",
    overview:
      "Day-to-day IT: hardware and software support, account and access management, network troubleshooting, and applying cybersecurity fundamentals to everyday practice.",
    challenge:
      "Small teams rarely have documented systems. Problems recur because nobody wrote down the fix.",
    approach: [
      "Diagnosed issues methodically instead of applying quick patches.",
      "Documented recurring fixes so they stop being emergencies.",
      "Applied security basics — updates, access hygiene, backups — as routine rather than reaction.",
    ],
    outcome: [
      "Less downtime and fewer repeat incidents.",
      "A team that trusts the systems it works on.",
    ],
  },
  {
    slug: "ml-data-studies",
    title: "Machine Learning & Data Studies",
    tag: "AI / Data",
    category: "AI / Data",
    year: "2025",
    stack: ["Python", "Pandas", "Scikit-learn", "Visualization"],
    blurb:
      "Applied Python studies in data analysis, visualization and machine learning fundamentals.",
    links: [{ label: "GitHub", href: "https://github.com/ajiko2505" }],
    tone: "mint",
    size: "short",
    hero: "Learning the data side properly — one dataset at a time.",
    role: "Self-directed study",
    timeline: "2025 – present",
    overview:
      "Ongoing practical study of data analysis and machine learning with Python: cleaning data, exploring it visually, and training baseline models to understand where they help and where they mislead.",
    challenge:
      "Machine learning is easy to imitate and hard to apply honestly. The goal was understanding, not demos.",
    approach: [
      "Worked from raw datasets rather than pre-cleaned tutorials.",
      "Prioritised exploratory analysis and visualization before modelling.",
      "Compared simple baselines against complex models to keep expectations grounded.",
    ],
    outcome: [
      "A working understanding of the data pipeline end to end.",
      "Better judgement about when a problem genuinely needs machine learning.",
    ],
  },
  {
    slug: "profile-os",
    title: "Profile OS",
    tag: "Identity",
    category: "Development",
    year: "2024",
    stack: ["Markdown", "GitHub"],
    blurb: "The README behind @ajiko2505 — a compact professional identity.",
    href: "https://github.com/ajiko2505/ajiko2505",
    links: [{ label: "GitHub", href: "https://github.com/ajiko2505/ajiko2505" }],
    tone: "mint-soft",
    size: "short",
    hero: "A profile designed to say the least possible while staying unmistakable.",
    role: "Identity · Copy · Layout",
    timeline: "2024",
    overview:
      "A minimal GitHub profile built to communicate a whole practice in the few seconds someone spends reading it.",
    challenge: "Say who you are and what you do without a wall of badges.",
    approach: [
      "Cut the copy to the essentials.",
      "Used structure and rhythm instead of decoration.",
      "Kept it maintainable as a single markdown file.",
    ],
    outcome: [
      "A profile that reads at a glance.",
      "A pattern reused across other professional surfaces.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
