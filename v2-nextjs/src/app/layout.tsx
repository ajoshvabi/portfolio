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
  title: "Ajosh V Abi | Experienced Flutter, MERN, Web Developer in Kerala, India",
  description: "Ajosh V Abi – professional Flutter developer and freelancer based in Kerala, India. Specializing in Flutter, MERN stack, Node.js, web development, API integration, custom mobile apps, and complex UI solutions.",
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
    "freelance web developer Kerala"
  ],
  verification: {
    google: "G9zEV20LfAUd9Pex_1ZfohVm1a2yH1x9e9l9mupXn_E",
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
        </ThemeProvider>
      </body>
    </html>
  );
}

