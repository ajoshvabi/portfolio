import type { Metadata } from "next";
import Link from "next/link";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ajoshvabi.netlify.app";

export const metadata: Metadata = {
  title: "Web Development Services Kerala | Next.js & React Websites",
  description:
    "Professional web development services in Kerala — fast, SEO-optimised websites and web applications built with Next.js, React, and modern web standards. Performance-first approach.",
  alternates: { canonical: `${siteUrl}/services/web-development` },
  keywords: [
    "web development Kerala",
    "Next.js developer Kerala",
    "React website development India",
    "freelance web developer Kochi",
    "SEO-optimised website Kerala",
    "website development services India",
    "landing page development Kerala",
  ],
  openGraph: {
    title: "Web Development Services — Kerala | Ajosh V Abi",
    description:
      "Fast, SEO-optimised websites and web applications built with Next.js and React from Kerala.",
    url: `${siteUrl}/services/web-development`,
  },
};

const faqs = [
  {
    q: "Which technology do you use to build websites — WordPress or custom code?",
    a: "I build custom-coded websites using Next.js (React) and vanilla CSS/Tailwind. This gives you maximum performance, full control over the codebase, and no dependency on plugin ecosystems or licensing fees. That said, if you specifically need a WordPress or headless CMS setup, I can discuss a hybrid approach.",
  },
  {
    q: "How do you ensure my website ranks well in search engines?",
    a: "Technical SEO is built into every project: proper semantic HTML with one H1 per page, unique title and meta description tags, canonical URLs, Open Graph tags for social sharing, JSON-LD structured data, a dynamically generated sitemap.xml, and a robots.txt. I also optimise Core Web Vitals — LCP, INP, and CLS — which Google uses as ranking signals. I can also assist with on-page content strategy if needed.",
  },
  {
    q: "How long does it take to build a website?",
    a: "A standard marketing or portfolio website takes 2–4 weeks. A complex web application with custom features, authentication, and a backend typically takes 6–12 weeks. Timeline depends heavily on how quickly you can provide content (copy, images, brand guidelines) and give feedback on design iterations.",
  },
  {
    q: "Will my website work well on mobile devices?",
    a: "Yes — mobile-first responsive design is a non-negotiable baseline for every project. I design and test across a range of viewport sizes and real devices, not just browser resize tools. All interactions, touch targets, and font sizes are optimised for mobile use before I even check desktop.",
  },
  {
    q: "Can you take over and maintain an existing website?",
    a: "Yes. I can audit your existing codebase, identify performance and security issues, and take over ongoing maintenance. If the codebase is too outdated to maintain efficiently, I'll give you an honest assessment and a rebuild cost estimate so you can make an informed decision.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function WebDevServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <div className="pt-32 pb-20 px-6 lg:px-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-outline/20 dark:border-white/10 bg-surface-variant/30 dark:bg-white/5 text-xs font-bold uppercase text-outline hover:text-primary hover:border-primary/30 transition-all mb-10 group"
          >
            <span className="material-symbols-outlined text-[14px] group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            All Services
          </Link>
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-primary/50" />
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              Service
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Web{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Development
            </span>
          </h1>
          <p className="text-on-surface-variant dark:text-slate-300 text-xl leading-relaxed max-w-2xl">
            Fast, accessible, SEO-optimised websites and web applications — built
            with Next.js and modern web standards, designed to convert visitors
            and rank in search engines.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/contact"
              className="bg-primary dark:bg-[#e0ffff] text-on-primary dark:text-[#0a0f1a] px-8 py-3 rounded-xl text-xs font-bold uppercase shadow-lg hover:shadow-[0_0_25px_rgba(0,105,112,0.4)] dark:hover:shadow-[0_0_25px_rgba(0,219,233,0.5)] flex items-center gap-3 transition-all active:scale-95 group"
            >
              Start a Project{" "}
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
            <Link
              href="/projects"
              className="px-8 py-3 rounded-xl text-xs font-bold uppercase border border-outline/20 dark:border-white/10 text-on-surface hover:border-primary/40 hover:text-primary transition-all"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Body */}
      <section className="pb-16 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto space-y-8 text-on-surface-variant dark:text-slate-300 text-lg leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface">
            Websites that perform, rank, and convert
          </h2>
          <p>
            A website is often the first impression a business makes on a
            potential customer. I build websites that don&apos;t just look good — they
            load fast, rank well in Google, and guide visitors toward taking
            action. Every project starts with a clear understanding of your
            goals, audience, and competition before a single line of code is
            written.
          </p>
          <p>
            My go-to framework is <strong className="text-on-surface">Next.js</strong>,
            which gives me fine-grained control over rendering strategy — static
            generation for content pages that need to be indexed, server-side
            rendering for personalised or real-time data, and client-side
            rendering for interactive dashboards. This flexibility means I can
            build a simple five-page marketing site and a complex SaaS
            application with equal confidence, without sacrificing performance
            in either case.
          </p>
          <p>
            Performance is a product decision, not just a technical one. A
            website that takes four seconds to load loses a significant
            percentage of users before they&apos;ve read a single word. I optimise
            every project for Google&apos;s Core Web Vitals — Largest Contentful
            Paint, Interaction to Next Paint, and Cumulative Layout Shift — so
            you get both a better user experience and a ranking advantage over
            slower competitors.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-on-surface pt-4">
            What I build
          </h2>
          <ul className="space-y-4">
            {[
              "Marketing websites and landing pages",
              "Portfolio and personal branding sites",
              "SaaS product frontends and dashboards",
              "E-commerce storefronts (custom or headless)",
              "Blog and content platforms with CMS integration",
              "Progressive Web Apps (PWAs)",
              "API-driven dynamic web applications",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5 shrink-0">
                  check_circle
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-on-surface pt-4">
            Accessibility and standards compliance
          </h2>
          <p>
            Accessible websites reach more people and perform better in search
            engines. I follow WCAG 2.1 guidelines as a baseline: proper heading
            hierarchy, descriptive alt text on all images, keyboard navigable
            interfaces, sufficient colour contrast ratios, and ARIA labels where
            semantic HTML alone isn&apos;t enough. Accessibility is not an add-on
            pass at the end — it&apos;s designed in from the start.
          </p>
        </div>
      </section>

      {/* Tech Badges */}
      <section className="py-12 px-6 lg:px-24 bg-surface-container-lowest/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Technologies I use</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Tailwind CSS",
              "Framer Motion",
              "Vercel",
              "Netlify",
              "Firebase",
              "Sanity CMS",
              "Prisma",
              "tRPC",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 glass-card rounded-full text-xs font-bold uppercase text-primary border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-8 border border-outline/10 dark:border-white/5"
              >
                <h3 className="text-lg font-bold mb-3">{faq.q}</h3>
                <p className="text-outline leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-12 text-center border border-outline/10 dark:border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-20">
            <div className="absolute w-[300px] h-[300px] bg-primary/30 rounded-full blur-[80px] -top-20 -right-20" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready for a faster, better website?</h2>
          <p className="text-outline mb-8 max-w-xl mx-auto">
            Whether you need a single landing page or a full web platform,
            let&apos;s talk about what you&apos;re trying to achieve.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-primary dark:bg-[#e0ffff] text-on-primary dark:text-[#0a0f1a] px-8 py-3 rounded-xl text-xs font-bold uppercase shadow-lg hover:shadow-[0_0_25px_rgba(0,105,112,0.4)] transition-all active:scale-95 group"
          >
            Get a Free Quote{" "}
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
