"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { name: "Home", hash: "home" },
  { name: "About", hash: "about" },
  { name: "Experience", hash: "experience" },
  { name: "Stack", hash: "stack" },
  { name: "Projects", hash: "projects" },
  { name: "Contact", hash: "contact" }
];

export function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    // Only track scroll on the homepage where sections exist
    if (pathname !== "/") return;

    const handleScroll = () => {
      if (window.scrollY < 80) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Update active section when it comes into view (with a threshold)
          if (entry.isIntersecting) {
            if (window.scrollY < 80) {
              setActiveSection("home");
            } else {
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      { rootMargin: "-120px 0px -50% 0px" } // Adjust margins so it triggers when section is near top
    );

    navLinks.forEach((link) => {
      const element = document.getElementById(link.hash);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (pathname === "/") {
      e.preventDefault();
      if (hash === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(hash);
        if (element) {
          const offset = 80; // offset to account for fixed header
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl rounded-full border border-outline/20 backdrop-blur-xl bg-surface/30 z-50 flex justify-between items-center px-4 sm:px-8 py-2.5 sm:py-3 shadow-lg">
      <Link href="/" className="font-display text-2xl sm:text-3xl tracking-tighter text-primary font-bold">
        Aj.Dev
      </Link>
      <div className="hidden lg:flex items-center gap-4 xl:gap-8">
        {navLinks.map((link) => {
          const isActive = activeSection === link.hash && pathname === "/";
          // If on homepage, use just hash for smooth scroll. If elsewhere, use absolute path to go to homepage section.
          const targetHref = pathname === "/" ? `#${link.hash}` : `/#${link.hash}`;
          
          return (
            <Link 
              key={link.name} 
              href={targetHref}
              onClick={(e) => handleClick(e, link.hash)}
              className={`text-xs font-bold uppercase tracking-widest transition-all ${
                isActive 
                  ? "text-primary border-b-2 border-primary-container pb-1" 
                  : "text-on-surface-variant hover:text-primary pb-1 border-b-2 border-transparent"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <a 
          href="https://wa.me/918089033549" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group relative px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-surface-variant/30 dark:bg-white/5 border border-outline/20 dark:border-white/10 overflow-hidden flex items-center gap-2 transition-all hover:border-[#25D366]/50 hover:bg-[#25D366]/10 active:scale-95 shadow-lg"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#25D366]/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
          
          <svg className="w-4 h-4 text-[#25D366] relative z-10 drop-shadow-[0_0_8px_rgba(37,211,102,0.5)]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          <span className="text-on-surface-variant dark:text-white/80 text-[10px] font-bold uppercase tracking-widest group-hover:text-on-surface dark:group-hover:text-white transition-colors relative z-10">
            Let's Chat
          </span>
        </a>
      </div>
    </nav>
  );
}
