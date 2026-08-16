import { Hero } from "@/features/home/Hero";
import { AboutMe } from "@/features/home/AboutMe";
import { About } from "@/features/home/About";
import { Projects } from "@/features/home/Projects";
import { Services } from "@/features/home/Services";
import { Stack } from "@/features/home/Stack";
import { Blog } from "@/features/home/Blog";
import { BottomCTA } from "@/features/home/BottomCTA";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Hero />
      <AboutMe />
      <About />
      <Stack />
      <Projects />
      <Services />
      <Blog />
      {/* <Testimonials /> */}
      <BottomCTA />
    </div>
  );
}
