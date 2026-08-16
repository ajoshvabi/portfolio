import type { Metadata } from "next";
import { AboutMe } from "@/features/home/AboutMe";
import { About } from "@/features/home/About";
import { Stack } from "@/features/home/Stack";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ajoshvabi.netlify.app";

export const metadata: Metadata = {
  title: "About Me — Flutter & MERN Developer from Kerala",
  description:
    "Learn about Ajosh V Abi — a freelance Flutter and MERN stack developer from Kochi, Kerala. 2+ years building cross-platform mobile apps and full-stack web platforms for startups and businesses.",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "About Ajosh V Abi — Flutter & MERN Developer Kerala",
    description:
      "Learn about Ajosh V Abi — a freelance Flutter and MERN stack developer from Kochi, Kerala. 2+ years building cross-platform mobile apps and full-stack web platforms.",
    url: `${siteUrl}/about`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ajosh V Abi — Flutter & MERN Developer Kerala",
    description:
      "Learn about Ajosh V Abi — a freelance Flutter and MERN stack developer from Kochi, Kerala.",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ajosh V Abi",
  url: siteUrl,
  jobTitle: "Flutter and MERN Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "Reon Technology",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kochi",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/ajoshvabi",
    "https://www.linkedin.com/in/ajoshvabi/",
    "https://x.com/ajoshvabi",
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Full About sections reused from home */}
      <AboutMe />

      {/* Extended bio prose — unique to /about, not on homepage */}
      <section className="py-16 px-6 lg:px-24 bg-surface-container-lowest/40">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-secondary/50"></span>
            <span className="text-secondary text-xs font-bold uppercase tracking-widest">
              My Story
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
            From curiosity to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              crafted code
            </span>
          </h2>
          <div className="space-y-6 text-on-surface-variant dark:text-slate-300 text-lg leading-relaxed">
            <p>
              My journey into software development started with a simple
              question: why do some apps feel effortless while others feel
              clunky? That curiosity led me down a deep rabbit hole of mobile
              architecture, rendering pipelines, and state management — and I
              never looked back. Today, I build digital products that answer
              that question with every pixel and every API call.
            </p>
            <p>
              I specialise in <strong className="text-on-surface">Flutter</strong> —
              Google&apos;s UI toolkit for building natively compiled applications
              across mobile, web, and desktop from a single codebase. Flutter
              lets me write code once and deliver a premium, native-feeling
              experience on both iOS and Android, which is a genuine competitive
              advantage for startups and SMEs that want to launch fast without
              sacrificing quality. I use patterns like Bloc and Riverpod for
              scalable state management, and I have a deep appreciation for
              clean, layered architecture that makes codebases maintainable two
              years after the first commit.
            </p>
            <p>
              On the web side, my stack of choice is the{" "}
              <strong className="text-on-surface">MERN stack</strong> — MongoDB,
              Express.js, React, and Node.js. I&apos;ve built everything from
              RESTful APIs with JWT authentication to real-time dashboards using
              Socket.io. I care about security, performance, and writing backend
              code that other developers can understand without a map.
            </p>
            <p>
              Beyond the technical side, I genuinely enjoy the product and
              design conversation. Great software doesn&apos;t start with code — it
              starts with understanding what problem you&apos;re solving and for
              whom. Whether I&apos;m working with a funded startup that has a
              detailed spec, or a small business owner who has a rough idea and
              a tight budget, I engage as a collaborator, not just an order
              taker.
            </p>
            <p>
              Based in Kerala, I work with clients across India and
              internationally. Most of my engagements are fully remote, which
              means I deliver the same standard of communication and code quality
              whether you&apos;re in Kochi or California. I&apos;m open to onsite
              engagements in Kochi and the broader Ernakulam district for
              clients who prefer in-person collaboration — especially for
              discovery workshops and design sprints.
            </p>
            <p>
              When I&apos;m not writing code, I&apos;m usually reading about systems
              design, experimenting with new rendering techniques, or mentoring
              junior developers. I believe in giving back to the community that
              taught me everything I know through open-source contributions and
              technical writing.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <About />

      {/* Tech Stack */}
      <Stack />
    </>
  );
}
