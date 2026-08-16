import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cities, getCityBySlug, citySlugs } from "@/data/locations";
import { Stack } from "@/features/home/Stack";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ajoshvabi.netlify.app";

export function generateStaticParams() {
  return citySlugs.map((slug) => ({ city: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    return {
      title: "Location Not Found",
    };
  }

  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: {
      canonical: `${siteUrl}/locations/${city.slug}`,
    },
    keywords: [
      `Flutter developer ${city.name}`,
      `web developer ${city.name}`,
      `app developer ${city.name}`,
      `MERN stack developer ${city.name}`,
      `freelance developer ${city.name}`,
      `mobile app development ${city.name}`,
      `Flutter developer Kerala`,
      `freelance web developer Kerala`,
    ],
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `${siteUrl}/locations/${city.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: city.metaTitle,
      description: city.metaDescription,
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) notFound();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `Ajosh V Abi — Flutter & Web Developer in ${city.name}`,
    description: city.metaDescription,
    url: `${siteUrl}/locations/${city.slug}`,
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "State",
        name: "Kerala",
        containedInPlace: {
          "@type": "Country",
          name: "India",
        },
      },
    },
    provider: {
      "@type": "Person",
      name: "Ajosh V Abi",
      url: siteUrl,
    },
    serviceType: [
      "Flutter App Development",
      "MERN Stack Development",
      "Web Development",
    ],
    ...(city.coordinates && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: city.coordinates.lat,
        longitude: city.coordinates.lng,
      },
    }),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const otherCities = cities.filter((c) => c.slug !== city.slug).slice(0, 5);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <div className="pt-32 pb-20 px-6 lg:px-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-outline mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span>Locations</span>
            <span>/</span>
            <span className="text-primary">{city.name}</span>
          </nav>

          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-primary/50" />
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              Kerala
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {city.headline.split(city.name)[0]}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {city.name}
            </span>
            {city.headline.split(city.name)[1]}
          </h1>

          <p className="text-on-surface-variant dark:text-slate-300 text-xl leading-relaxed max-w-2xl">
            {city.metaDescription}
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
            <a
              href="https://wa.me/918089033549"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-xl text-xs font-bold uppercase border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="pb-12 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto space-y-8 text-on-surface-variant dark:text-slate-300 text-lg leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface">
            About working in {city.name}
          </h2>
          <p>{city.intro}</p>

          <h2 className="text-2xl md:text-3xl font-bold text-on-surface pt-4">
            How I can help your {city.name} business
          </h2>
          <p>{city.servicesBlurb}</p>

          <h2 className="text-2xl md:text-3xl font-bold text-on-surface pt-4">
            Remote & onsite availability
          </h2>
          <p>{city.availability}</p>
        </div>
      </section>

      {/* Services Overview Cards */}
      <section className="py-12 px-6 lg:px-24 bg-surface-container-lowest/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Services available in {city.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                href: "/services/flutter-app-development",
                label: "Flutter Apps",
                icon: "phone_iphone",
                color: "primary",
              },
              {
                href: "/services/mern-stack-development",
                label: "MERN Stack",
                icon: "cloud",
                color: "secondary",
              },
              {
                href: "/services/web-development",
                label: "Web Development",
                icon: "language",
                color: "primary",
              },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className={`glass-card p-6 rounded-2xl flex items-center gap-4 hover:-translate-y-1 transition-all duration-300 group border border-${s.color}/10 hover:border-${s.color}/30`}
              >
                <span className={`material-symbols-outlined text-3xl text-${s.color}`}>
                  {s.icon}
                </span>
                <span className={`font-bold group-hover:text-${s.color} transition-colors`}>
                  {s.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <Stack />

      {/* FAQ */}
      <section className="py-24 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">
            Frequently Asked Questions — {city.name}
          </h2>
          <div className="space-y-6">
            {city.faqs.map((faq, i) => (
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

      {/* Other Cities */}
      <section className="pb-16 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-6 text-outline">
            Also serving other cities in Kerala
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/locations/${c.slug}`}
                className="px-4 py-2 rounded-full text-xs font-bold uppercase border border-outline/20 dark:border-white/10 text-outline hover:text-primary hover:border-primary/30 transition-all"
              >
                {c.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-4 py-2 rounded-full text-xs font-bold uppercase border border-primary/30 text-primary hover:bg-primary/10 transition-all"
            >
              All India →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-12 text-center border border-outline/10 dark:border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-20">
            <div className="absolute w-[300px] h-[300px] bg-primary/30 rounded-full blur-[80px] -top-20 -right-20" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Ready to work with a developer in {city.name}?
          </h2>
          <p className="text-outline mb-8 max-w-xl mx-auto">
            Share your project details and I&apos;ll respond with an initial
            assessment within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-primary dark:bg-[#e0ffff] text-on-primary dark:text-[#0a0f1a] px-8 py-3 rounded-xl text-xs font-bold uppercase shadow-lg hover:shadow-[0_0_25px_rgba(0,105,112,0.4)] transition-all active:scale-95 group"
          >
            Get in Touch{" "}
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
