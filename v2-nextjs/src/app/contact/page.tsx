import type { Metadata } from "next";
import { Contact } from "@/features/home/Contact";
import { ContactForm } from "./ContactForm";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ajoshvabi.netlify.app";

export const metadata: Metadata = {
  title: "Contact — Hire a Flutter & MERN Developer in Kerala",
  description:
    "Get in touch with Ajosh V Abi for Flutter app development, MERN stack projects, or web development in Kerala. Available for freelance projects across India and internationally.",
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: "Contact Ajosh V Abi — Flutter & MERN Developer Kerala",
    description:
      "Hire Ajosh V Abi for your next mobile app or web platform project. Based in Kerala, working with clients across India and internationally.",
    url: `${siteUrl}/contact`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Ajosh V Abi — Flutter & MERN Developer Kerala",
    description:
      "Hire Ajosh V Abi for your next mobile app or web platform project. Based in Kerala, working with clients across India and internationally.",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Page header — gives h1 and intro text for SEO */}
      <div className="pt-32 pb-0 px-6 lg:px-24 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-primary/50" />
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              Get In Touch
            </span>
            <span className="w-8 h-px bg-primary/50" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Let&apos;s build something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              great together
            </span>
          </h1>
          <p className="text-on-surface-variant dark:text-slate-300 text-lg leading-relaxed mb-2">
            Whether you have a fully-formed spec or just a rough idea, reach
            out and I&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </div>

      {/* Existing Contact section — email, WhatsApp, "Book a Call" details unchanged */}
      <Contact />

      {/* Enhanced contact form — sends directly to Firestore via /api/contact */}
      <section className="pb-24 px-6 lg:px-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Or send me a detailed message
            </h2>
            <p className="text-outline text-sm">
              Fill in the form below and I&apos;ll respond within 24 hours on
              weekdays.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
