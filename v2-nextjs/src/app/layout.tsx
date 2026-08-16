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

export const metadata: Metadata = {
  metadataBase: new URL("https://ajoshvabi.netlify.app"),
  alternates: {
    canonical: "/",
  },
  title: "Ajosh V Abi | Freelance Flutter & MERN Developer in Kerala",
  description: "Freelance Flutter & MERN developer in Kerala, India. Building custom mobile apps, web solutions, and scalable API architecture.",
  keywords: [
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
    "mobile app custom development"
  ],
  verification: {
    google: [
      "LCKntYHX4XPjjKu-NH1YvhQ6CROStL-7vI8nl-Q9P7g",
      "G9zEV20LfAUd9Pex_1ZfohVm1a2yH1x9e9l9mupXn_E"
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col relative overflow-x-hidden transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Ajosh V Abi",
                "url": "https://ajoshvabi.netlify.app",
                "jobTitle": "Flutter and MERN Stack Developer",
                "knowsAbout": ["Flutter", "Dart", "MERN Stack", "Node.js", "React", "Mobile Development"],
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Kochi",
                  "addressRegion": "Kerala",
                  "addressCountry": "India"
                }
              })
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

