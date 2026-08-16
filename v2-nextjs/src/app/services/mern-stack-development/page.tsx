import type { Metadata } from "next";
import Link from "next/link";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ajoshvabi.netlify.app";

export const metadata: Metadata = {
  title: "MERN Stack Development Services in Kerala | Full-Stack Web Platforms",
  description:
    "Expert MERN stack development (MongoDB, Express.js, React, Node.js) from Kerala. Ajosh V Abi builds secure, scalable, production-ready full-stack web applications for startups and businesses.",
  alternates: { canonical: `${siteUrl}/services/mern-stack-development` },
  keywords: [
    "MERN stack developer Kerala",
    "MERN stack development India",
    "full stack web developer Kerala",
    "Node.js developer India",
    "React developer Kerala",
    "MongoDB developer",
    "Express.js API development",
    "hire MERN developer",
  ],
  openGraph: {
    title: "MERN Stack Development Services — Kerala | Ajosh V Abi",
    description:
      "Expert MERN stack development from Kerala — MongoDB, Express.js, React, Node.js. Secure, scalable, production-ready web platforms.",
    url: `${siteUrl}/services/mern-stack-development`,
  },
};

const faqs = [
  {
    q: "What exactly is the MERN stack and is it right for my project?",
    a: "MERN stands for MongoDB (database), Express.js (backend framework), React (frontend library), and Node.js (JavaScript runtime). It's a fully JavaScript/TypeScript stack, which means one language across the entire application, faster development cycles, and easier developer hiring. It excels for data-driven web apps, SaaS platforms, admin dashboards, e-commerce platforms, and real-time applications.",
  },
  {
    q: "How do you handle authentication and security in MERN applications?",
    a: "I implement authentication using JSON Web Tokens (JWT) with short-lived access tokens and secure, HTTP-only refresh tokens. For applications requiring social login, I integrate OAuth2 providers via Passport.js. On the database layer, all passwords are hashed with bcrypt, and I apply input validation and rate limiting at the API level to protect against common vulnerabilities like SQL injection, XSS, and brute-force attacks.",
  },
  {
    q: "Can you integrate third-party services like payment gateways and SMS APIs?",
    a: "Yes — I've integrated Razorpay and Stripe for payments, Twilio for SMS/WhatsApp notifications, SendGrid and Nodemailer for email, AWS S3 and Cloudinary for file storage, and various analytics and CRM APIs. If your project requires a specific integration, let me know and I can assess its complexity upfront.",
  },
  {
    q: "How do you ensure my MERN app performs well at scale?",
    a: "Performance engineering starts at the database level with proper MongoDB indexing, lean projections, and aggregation pipeline optimisation. At the API layer, I implement pagination, caching with Redis where appropriate, and connection pooling. For the React frontend, I use code splitting, lazy loading, and Lighthouse-driven Core Web Vitals optimisation. I also set up monitoring and alerting so performance regressions are caught early.",
  },
  {
    q: "Do you provide the backend API only, or the full frontend too?",
    a: "Both — I can build the complete full-stack application (frontend + backend + database), or provide the REST API only if you have a separate frontend team or are building a mobile app. I can also work with existing backends and build or improve the React frontend, depending on your needs.",
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

export default function MERNServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <div className="pt-32 pb-20 px-6 lg:px-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
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
            <span className="w-8 h-px bg-secondary/50" />
            <span className="text-secondary text-xs font-bold uppercase tracking-widest">
              Service
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            MERN Stack{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
              Development
            </span>
          </h1>
          <p className="text-on-surface-variant dark:text-slate-300 text-xl leading-relaxed max-w-2xl">
            End-to-end web platforms using MongoDB, Express.js, React, and
            Node.js — secure backends, clean APIs, and responsive frontends
            delivered as one cohesive system.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/contact"
              className="bg-secondary text-on-secondary px-8 py-3 rounded-xl text-xs font-bold uppercase shadow-lg hover:shadow-[0_0_25px_rgba(126,78,144,0.4)] flex items-center gap-3 transition-all active:scale-95 group"
            >
              Start a Project{" "}
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
            <Link
              href="/projects"
              className="px-8 py-3 rounded-xl text-xs font-bold uppercase border border-outline/20 dark:border-white/10 text-on-surface hover:border-secondary/40 hover:text-secondary transition-all"
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
            Full-stack web development, front to back
          </h2>
          <p>
            The MERN stack is my primary full-stack toolkit for building
            production web applications. Its all-JavaScript architecture means
            I can move fluidly between frontend and backend without context
            switching — writing the data model on the server in the same
            language as the component consuming it on the client. This tight
            coupling results in fewer integration bugs, faster development, and
            a more coherent codebase.
          </p>
          <p>
            On the backend, I structure Node.js and Express applications around
            clean domain layers — controllers handle HTTP, services contain
            business logic, and repositories handle data access. This separation
            means your business logic stays testable and independent of the
            database or HTTP framework. MongoDB is my default data store for
            its flexibility in handling varied document shapes, but I&apos;m equally
            comfortable with MySQL or PostgreSQL when your data model demands
            relational integrity.
          </p>
          <p>
            The React frontend is built with performance in mind from day one.
            I use Next.js for server-side rendering and static generation where
            SEO matters, and Vite for pure SPA dashboards and admin tools. All
            React code is typed with TypeScript, state is managed with Zustand
            or React Query depending on complexity, and components are designed
            for reuse and composition.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-on-surface pt-4">
            What&apos;s included
          </h2>
          <ul className="space-y-4">
            {[
              "System design and database schema planning",
              "RESTful or GraphQL API development with full documentation",
              "JWT/OAuth2 authentication and role-based access control",
              "React frontend with SSR/SSG (Next.js) or SPA (Vite)",
              "File uploads, cloud storage integration (S3/Cloudinary)",
              "Payment gateway integration (Razorpay, Stripe)",
              "Real-time features with WebSockets / Socket.io",
              "Deployment setup on Vercel, Railway, or AWS EC2",
              "CI/CD pipeline with automated testing",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-xl mt-0.5 shrink-0">
                  check_circle
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-on-surface pt-4">
            Security and reliability as a baseline
          </h2>
          <p>
            Security is not an add-on — I build it into every layer from the
            start. Input validation with Joi or Zod, parameterised queries,
            rate limiting on sensitive endpoints, CORS configuration, and
            HTTPS-only cookies are baseline requirements, not optional extras.
            For applications handling sensitive data, I conduct a security
            review pass before deployment and provide recommendations for
            ongoing monitoring.
          </p>
        </div>
      </section>

      {/* Tech Badges */}
      <section className="py-12 px-6 lg:px-24 bg-surface-container-lowest/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Technologies I use</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "MongoDB",
              "Express.js",
              "React",
              "Node.js",
              "Next.js",
              "TypeScript",
              "Mongoose",
              "JWT",
              "Socket.io",
              "Redis",
              "AWS S3",
              "Razorpay",
              "Stripe",
              "Zod",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 glass-card rounded-full text-xs font-bold uppercase text-secondary border border-secondary/20"
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
            <div className="absolute w-[300px] h-[300px] bg-secondary/30 rounded-full blur-[80px] -top-20 -right-20" />
            <div className="absolute w-[300px] h-[300px] bg-primary/20 rounded-full blur-[80px] -bottom-20 -left-20" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready to build your web platform?</h2>
          <p className="text-outline mb-8 max-w-xl mx-auto">
            Share your requirements and I&apos;ll come back with a detailed proposal
            and timeline estimate.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-secondary text-on-secondary px-8 py-3 rounded-xl text-xs font-bold uppercase shadow-lg hover:shadow-[0_0_25px_rgba(126,78,144,0.4)] transition-all active:scale-95 group"
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
