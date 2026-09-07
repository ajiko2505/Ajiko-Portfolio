// Central profile content: identity, skills, experience, education, certifications.
// Edit this file to update site copy — routes read from here.

export const profile = {
  name: "Ajiko Fidelis",
  title: "IT Specialist • Software Developer • Digital Marketer",
  headline: "Building Digital Solutions That Work.",
  intro:
    "I'm Ajiko Fidelis, an IT Specialist and Software Developer focused on building practical digital experiences, business systems, websites, e-commerce solutions, and technology-driven solutions that solve real problems.",
  current: "Currently working as an IT Specialist at Stephenson Brothers Ltd.",
  location: "Nigeria — working with teams worldwide",
  cvPath: "/Ajiko-Fidelis-CV.pdf",
};

export const email = "ajikofidelis.3@gmail.com";

export const social = {
  github: "https://github.com/ajiko2505",
  linkedin: "https://www.linkedin.com/in/ajiko001",
  instagram: "https://instagram.com/fidelisajiko",
  whatsapp: "https://wa.me/2348155866150",
  email: `mailto:${email}`,
} as const;

export type SkillGroup = { title: string; note: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Development",
    note: "Writing and maintaining software for the web.",
    items: ["PHP", "SQL", "Python", "JavaScript", "React", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    title: "Web & E-Commerce",
    note: "Building and running online storefronts and business sites.",
    items: [
      "WordPress",
      "WooCommerce",
      "Elementor",
      "Shopify",
      "Website Development",
      "E-commerce Management",
      "Website Optimization",
    ],
  },
  {
    title: "IT & Technology",
    note: "Keeping people, devices, and systems working.",
    items: [
      "IT Support",
      "Networking",
      "Cybersecurity Fundamentals",
      "System Troubleshooting",
      "Technical Support",
      "Digital Systems",
    ],
  },
  {
    title: "Digital",
    note: "Getting the work in front of the right people.",
    items: [
      "Digital Marketing",
      "SEO",
      "Content Creation",
      "Social Media Marketing",
      "Analytics",
      "E-commerce Marketing",
    ],
  },
  {
    title: "Data & AI",
    note: "Turning data into decisions.",
    items: [
      "Python",
      "Machine Learning",
      "Data Analysis",
      "Data Visualization",
      "AI-assisted workflows",
    ],
  },
];

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  summary: string;
  points: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "IT Specialist",
    company: "Stephenson Brothers Ltd",
    period: "December 2025 – Present",
    summary:
      "Supporting day-to-day technology operations while maintaining and improving the company's digital and e-commerce presence.",
    points: [
      "Provide IT support across devices, accounts, and internal systems.",
      "Manage and maintain the company website, including updates and routine fixes.",
      "Support e-commerce technology — product listings, catalogue structure, and store configuration.",
      "Troubleshoot technical issues and coordinate resolutions with vendors where required.",
      "Support digital marketing activity with technical setup, tracking, and content publishing.",
      "Implement practical technology improvements to reduce manual work.",
    ],
  },
];

export type EducationEntry = {
  qualification: string;
  institution: string;
  period: string;
  detail?: string;
};

export const education: EducationEntry[] = [
  {
    qualification: "B.Sc. Computer Science",
    institution: "Kaduna State University",
    period: "Graduated 2024",
    detail:
      "Coursework across software development, databases, networks, and computing fundamentals.",
  },
];

export const learningAreas = [
  "Cybersecurity fundamentals",
  "Networking",
  "Machine Learning",
  "Software Development",
];

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
};

// Add certifications here as they are earned. Include credentialUrl only when a
// real verification link exists.
export const certifications: Certification[] = [];
