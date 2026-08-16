import type { Metadata } from "next";
import Link from "next/link";
import { Services } from "@/features/home/Services";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ajoshvabi.netlify.app";

export const metadata: Metadata = {
  title: "Services — Flutter App, MERN Stack & Web Development",
  description:
    "Explore the services offered by Ajosh V Abi: Flutter mobile app development, MERN stack web platforms, and custom web development. Available for freelance projects across Kerala and India.",
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title: "Services — Flutter App, MERN Stack & Web Development | Ajosh V Abi",
    description:
      "Explore the services offered by Ajosh V Abi: Flutter mobile app development, MERN stack web platforms, and custom web development.",
    url: `${siteUrl}/services`,
  },
};

const serviceLinks = [
  {
    href: "/services/flutter-app-development",
    label: "Flutter App Development",
    icon: "phone_iphone",
    color: "primary",
    desc: "Cross-platform iOS & Android apps with native-level performance.",
  },
  {
    href: "/services/mern-stack-development",
    label: "MERN Stack Development",
    icon: "cloud",
    color: "secondary",
    desc: "Full-stack web platforms using MongoDB, Express, React and Node.js.",
  },
  {
    href: "/services/web-development",
    label: "Web Development",
    icon: "language",
    color: "primary",
    desc: "Fast, SEO-optimised websites and landing pages built with Next.js.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-16 px-6 lg:px-24 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-primary/50" />
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              What I Do
            </span>
            <span className="w-8 h-px bg-primary/50" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Service{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Matrix
            </span>
          </h1>
          <p className="text-on-surface-variant dark:text-slate-300 text-lg leading-relaxed">
            I offer specialised development services across mobile and web — each
            crafted with architectural precision and a focus on long-term
            maintainability. Choose a service below to learn more.
          </p>
        </div>
      </div>

      {/* Service Detail Links */}
      <section className="pb-16 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {serviceLinks.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="glass-card p-8 rounded-3xl group hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,219,233,0.15)] transition-all duration-300 flex flex-col gap-4"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-${s.color}/10 flex items-center justify-center group-hover:bg-${s.color}/20 transition-colors`}
              >
                <span
                  className={`material-symbols-outlined text-3xl text-${s.color}`}
                >
                  {s.icon}
                </span>
              </div>
              <h2 className={`text-xl font-bold group-hover:text-${s.color} transition-colors`}>
                {s.label}
              </h2>
              <p className="text-sm text-outline flex-1">{s.desc}</p>
              <span
                className={`text-xs font-bold uppercase tracking-wider text-${s.color} flex items-center gap-2 group-hover:gap-4 transition-all`}
              >
                Learn More{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Reuse Services overview from home */}
      <Services />

      {/* CTA */}
      <section className="py-24 px-6 lg:px-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Not sure which service fits?</h2>
          <p className="text-outline mb-8">
            Tell me about your project and I&apos;ll recommend the right stack and
            approach for your needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-primary dark:bg-[#e0ffff] text-on-primary dark:text-[#0a0f1a] px-8 py-3 rounded-xl text-xs font-bold uppercase shadow-lg hover:shadow-[0_0_25px_rgba(0,105,112,0.4)] dark:hover:shadow-[0_0_25px_rgba(0,219,233,0.5)] transition-all active:scale-95 group"
          >
            Let&apos;s Talk{" "}
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
