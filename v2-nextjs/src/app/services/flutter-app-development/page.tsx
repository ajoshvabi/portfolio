import type { Metadata } from "next";
import Link from "next/link";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ajoshvabi.netlify.app";

export const metadata: Metadata = {
  title: "Flutter App Development Services in Kerala | Cross-Platform Mobile Apps",
  description:
    "Professional Flutter app development for iOS & Android from Kerala. Ajosh V Abi builds high-performance, natively compiled cross-platform mobile apps with beautiful UI and scalable architecture.",
  alternates: { canonical: `${siteUrl}/services/flutter-app-development` },
  keywords: [
    "Flutter app development Kerala",
    "Flutter developer India",
    "cross-platform app development",
    "iOS Android app development Kerala",
    "Flutter app developer Kochi",
    "hire Flutter developer",
    "Flutter development services",
  ],
  openGraph: {
    title: "Flutter App Development Services — Kerala | Ajosh V Abi",
    description:
      "Professional Flutter app development for iOS & Android from Kerala. High-performance, natively compiled cross-platform mobile apps.",
    url: `${siteUrl}/services/flutter-app-development`,
  },
};

const faqs = [
  {
    q: "What is Flutter and why should I choose it for my mobile app?",
    a: "Flutter is Google's open-source UI toolkit that lets you build natively compiled apps for iOS, Android, web, and desktop from a single codebase using the Dart language. This means you get one team, one codebase, and two high-quality apps — significantly reducing development cost and time-to-market without sacrificing performance or visual fidelity.",
  },
  {
    q: "How long does it take to build a Flutter app?",
    a: "A well-scoped MVP typically takes 6–12 weeks from kickoff to App Store submission, depending on the complexity of features, integrations, and design requirements. I'll provide a detailed timeline after an initial discovery call where we map out your feature set and technical requirements.",
  },
  {
    q: "Can Flutter apps access native device features like camera, GPS, and Bluetooth?",
    a: "Yes — Flutter has a rich ecosystem of platform plugins (both official and community) that expose virtually every native device feature: camera, GPS, biometrics, Bluetooth, NFC, push notifications, and more. For niche requirements, I write custom platform channels to bridge Flutter and native iOS/Android code.",
  },
  {
    q: "What happens after the app is built — do you offer maintenance?",
    a: "Yes. I offer post-launch support packages covering bug fixes, OS compatibility updates (new iOS/Android versions), minor feature additions, and performance monitoring. Most clients retain me on a monthly retainer for ongoing maintenance and feature development.",
  },
  {
    q: "I have an existing native iOS/Android app — can you migrate it to Flutter?",
    a: "Absolutely. I've helped teams migrate native apps to Flutter using incremental approaches (Add-to-App) and full rewrites, depending on the codebase size and risk tolerance. We can discuss a migration strategy that minimises disruption to your existing user base.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function FlutterServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <div className="pt-32 pb-20 px-6 lg:px-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
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
            Flutter App{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Development
            </span>
          </h1>
          <p className="text-on-surface-variant dark:text-slate-300 text-xl leading-relaxed max-w-2xl">
            Cross-platform iOS & Android apps with native-level performance,
            pixel-perfect animations, and architectures built to scale — all
            from a single Dart codebase.
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

      {/* Body Content */}
      <section className="pb-16 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto space-y-8 text-on-surface-variant dark:text-slate-300 text-lg leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface">
            Why Flutter for your next mobile app?
          </h2>
          <p>
            Building separate iOS and Android apps used to mean two codebases,
            two teams, and twice the maintenance overhead. Flutter changes that
            equation entirely. With a single Dart codebase, I deliver two
            production-quality apps that feel and perform like they were written
            natively — because Flutter&apos;s rendering engine draws every pixel
            directly on the GPU, bypassing the platform&apos;s UI components
            entirely.
          </p>
          <p>
            This isn&apos;t the hybrid web-wrapper approach of Cordova or Ionic.
            Flutter&apos;s own rendering pipeline means smooth 60/120fps animations,
            pixel-perfect custom UI, and consistent behaviour across Android
            versions and iOS device families. The result: your users get an app
            that feels premium, regardless of which platform they use.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-on-surface pt-4">
            What&apos;s included in my Flutter development service
          </h2>
          <ul className="space-y-4">
            {[
              "Requirements gathering & technical architecture planning",
              "Custom UI design implementation from Figma or direct design brief",
              "State management using Bloc or Riverpod (your choice, my expertise)",
              "Firebase or custom REST/GraphQL backend integration",
              "Third-party API integrations (payment gateways, maps, analytics)",
              "Unit, widget, and integration testing",
              "App Store (iOS) and Play Store (Android) submission",
              "Post-launch maintenance and feature additions",
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
            Architecture & quality standards
          </h2>
          <p>
            I follow clean architecture principles across all Flutter projects —
            separating presentation, domain, and data layers. This makes your
            app easier to test, extend, and hand off to another developer if
            needed. Every project gets a structured folder layout, documented
            business logic, and meaningful commit history.
          </p>
          <p>
            State management is a first-class concern, not an afterthought. I
            use Bloc for complex, event-driven applications where explicit state
            transitions matter, and Riverpod for simpler reactive data flows.
            Both approaches scale well as your feature set grows.
          </p>
          <p>
            Before delivery, every project goes through a QA cycle covering
            edge-case UI behaviour, API error handling, offline modes where
            applicable, and performance profiling using Flutter DevTools. I also
            write automated tests for critical business logic so you have
            confidence when shipping future updates.
          </p>
        </div>
      </section>

      {/* Tech Badges */}
      <section className="py-12 px-6 lg:px-24 bg-surface-container-lowest/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Technologies I use</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Flutter",
              "Dart",
              "Bloc",
              "Riverpod",
              "Firebase",
              "REST APIs",
              "GraphQL",
              "SQLite",
              "Hive",
              "GetX",
              "Provider",
              "Dio",
              "Isar",
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
          <h2 className="text-3xl font-bold mb-12">
            Frequently Asked Questions
          </h2>
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
            <div className="absolute w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[80px] -bottom-20 -left-20" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Ready to build your Flutter app?
          </h2>
          <p className="text-outline mb-8 max-w-xl mx-auto">
            Drop me a message with your idea or brief and I&apos;ll come back with
            a scoping estimate within 24 hours.
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
