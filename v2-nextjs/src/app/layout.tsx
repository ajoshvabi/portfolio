import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ajoshvabi.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Ajosh V Abi | Freelance Flutter & MERN Developer in Kerala",
    template: "%s | Ajosh V Abi",
  },
  description:
    "Freelance Flutter & MERN developer in Kerala, India. Building custom mobile apps, web solutions, and scalable API architecture.",
  keywords: [
    "Ajosh",
    "Ajosh V Abi",
    "Flutter developer Kerala",
    "Flutter developer India",
    "freelance Flutter developer",
    "web developer Kerala",
    "mobile app developer",
    "MERN stack developer",
    "Node.js developer",
    "Express.js developer",
    "API integration expert",
    "React developer",
    "full stack developer India",
    "mobile app development Kerala",
    "web application development Kerala",
    "Flutter freelancer Cochin",
    "app developers in Kochi",
    "best Flutter developer Kerala",
    "software development services Kerala",
    "full stack developer Kochi",
    "MERN stack developers Kochi",
    "cross platform app developers Kerala",
    "freelance web developer Kerala",
    "multiplatform mobile development",
    "cross platform app dev",
    "hire full stack developer",
    "custom mobile app development",
    "mern full stack developer",
    "flutter mobile app development",
    "custom mobile development",
    "mobile app custom development",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Ajosh V Abi — Flutter & MERN Developer",
    title: "Ajosh V Abi | Freelance Flutter & MERN Developer in Kerala",
    description:
      "Freelance Flutter & MERN developer in Kerala, India. Building custom mobile apps, web solutions, and scalable API architecture.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Ajosh V Abi — Flutter & MERN Developer in Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajosh V Abi | Freelance Flutter & MERN Developer in Kerala",
    description:
      "Freelance Flutter & MERN developer in Kerala, India. Building custom mobile apps, web solutions, and scalable API architecture.",
    creator: "@ajoshvabi",
    images: [`${siteUrl}/og-image.png`],
  },
  verification: {
    google: [
      "LCKntYHX4XPjjKu-NH1YvhQ6CROStL-7vI8nl-Q9P7g",
      "G9zEV20LfAUd9Pex_1ZfohVm1a2yH1x9e9l9mupXn_E",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ajosh V Abi",
  url: siteUrl,
  jobTitle: "Flutter and MERN Stack Developer",
  description:
    "Freelance Flutter & MERN developer based in Kerala, India specialising in cross-platform mobile apps and full-stack web platforms.",
  knowsAbout: [
    "Flutter",
    "Dart",
    "MERN Stack",
    "Node.js",
    "React",
    "Mobile Development",
    "Firebase",
    "MongoDB",
  ],
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
    "https://instagram.com/ajoshvabi",
    "https://facebook.com/ajoshvabi",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col relative overflow-x-hidden transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
