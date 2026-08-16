import type { Metadata } from "next";
import { Hero } from "@/features/home/Hero";
import { AboutMe } from "@/features/home/AboutMe";
import { About } from "@/features/home/About";
import { Services } from "@/features/home/Services";
import { Stack } from "@/features/home/Stack";
import { Projects } from "@/features/home/Projects";
import { Blog } from "@/features/home/Blog";
import { Contact } from "@/features/home/Contact";

export const metadata: Metadata = {
  title: "Freelance Flutter Developer in Kochi, Kerala | Ajosh V Abi",
  description: "Looking for an experienced freelance Flutter developer in Kochi, Cochin, or Kerala? Ajosh V Abi builds premium cross-platform mobile apps with native-level animations and scalable architectures.",
  keywords: [
    "freelance Flutter developer Kochi",
    "Flutter developer in Kochi",
    "freelance app developer Kochi",
    "best Flutter developer Cochin",
    "hire Flutter developer Kochi",
    "Kochi Flutter freelancers",
    "mobile app development Kochi",
    "cross platform app developer Kerala",
    "multiplatform mobile development",
    "cross platform app dev",
    "hire full stack developer",
    "mern stack developer",
    "flutter app development",
    "Ajosh",
    "Ajosh V Abi"
  ],
};

export default function KochiFreelancePage() {
  return (
    <div className="space-y-16">
      <Hero />
      <AboutMe />
      <About />
      <Services />
      <Stack />
      <Projects />
      <Blog />
      <Contact />
    </div>
  );
}
