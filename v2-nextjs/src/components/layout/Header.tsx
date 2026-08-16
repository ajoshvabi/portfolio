"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

// Hash-anchored links shown when on the homepage; routed links shown elsewhere
const homeScrollLinks = [
  { name: "Home", hash: "home" },
  { name: "About", hash: "about" },
  { name: "Experience", hash: "experience" },
  { name: "Stack", hash: "stack" },
  { name: "Projects", hash: "projects" },
  { name: "Contact", hash: "contact", isRoute: true, href: "/contact" },
];

// Real page links for all routes — used when NOT on the homepage
const pageLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      if (window.scrollY < 80) setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (window.scrollY < 80) {
              setActiveSection("home");
            } else {
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      { rootMargin: "-120px 0px -50% 0px" }
    );

    homeScrollLinks.forEach((link) => {
      const element = document.getElementById(link.hash);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    if (!isHome) return; // Let the link navigate naturally (will go to /#hash)
    e.preventDefault();
    if (hash === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(hash);
      if (element) {
        const offsetPosition =
          element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
    setMobileOpen(false);
  };

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    import("@/lib/adminAuth").then(({ checkAdminAuth }) => {
      setIsAdmin(checkAdminAuth());
    });
  }, [pathname]); // Check auth when route changes

  return (
    <>
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl rounded-full border border-outline/20 backdrop-blur-xl bg-surface/30 z-50 flex justify-between items-center px-4 sm:px-8 py-2.5 sm:py-3 shadow-lg"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-2xl sm:text-3xl tracking-tighter text-primary font-bold"
          aria-label="Ajosh V Abi — Home"
        >
          Aj.Dev
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-8">
          {[
            ...pageLinks,
            ...(isAdmin
              ? [
                  { name: "Manage Stack", href: "/admin/stack" },
                  { name: "Inquiries", href: "/admin/inquiries" },
                ]
              : []),
          ].map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            const isAdminRoute = link.href.startsWith("/admin");
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs font-bold uppercase tracking-widest transition-all pb-1 border-b-2 ${
                  isActive
                    ? (isAdminRoute ? "text-secondary border-secondary-container" : "text-primary border-primary-container")
                    : "text-on-surface-variant hover:text-primary border-transparent"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>


        {/* Right side: Theme + WhatsApp + Mobile Menu */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/918089033549"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="group relative px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-surface-variant/30 dark:bg-white/5 border border-outline/20 dark:border-white/10 overflow-hidden flex items-center gap-2 transition-all hover:border-[#25D366]/50 hover:bg-[#25D366]/10 active:scale-95 shadow-lg"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#25D366]/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            <svg
              className="w-4 h-4 text-[#25D366] relative z-10 drop-shadow-[0_0_8px_rgba(37,211,102,0.5)]"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            <span className="text-on-surface-variant dark:text-white/80 text-[10px] font-bold uppercase tracking-widest group-hover:text-on-surface dark:group-hover:text-white transition-colors relative z-10 hidden sm:inline">
              Let&apos;s Chat
            </span>
          </a>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-on-surface transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-on-surface transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-on-surface transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-sm glass-card rounded-3xl border border-outline/20 dark:border-white/10 p-6 space-y-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {(isHome
              ? [
                  ...homeScrollLinks.map((l) => ({
                    name: l.name,
                    href: "href" in l ? (l.href as string) : `#${l.hash}`,
                    hash: "isRoute" in l ? "" : l.hash,
                  })),
                  ...(isAdmin
                    ? [
                        {
                          name: "Manage Stack",
                          href: "/admin/stack",
                          hash: "",
                        },
                        {
                          name: "Inquiries",
                          href: "/admin/inquiries",
                          hash: "",
                        },
                      ]
                    : []),
                ]
              : [
                  ...pageLinks.map((l) => ({
                    name: l.name,
                    href: l.href,
                    hash: "",
                  })),
                  ...(isAdmin
                    ? [
                        {
                          name: "Manage Stack",
                          href: "/admin/stack",
                          hash: "",
                        },
                        {
                          name: "Inquiries",
                          href: "/admin/inquiries",
                          hash: "",
                        },
                      ]
                    : []),
                ]
            ).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (isHome && link.hash) {
                    handleHashClick(
                      e as React.MouseEvent<HTMLAnchorElement>,
                      link.hash
                    );
                  } else {
                    setMobileOpen(false);
                  }
                }}
                className="block py-3 px-4 rounded-xl text-sm font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-2 border-t border-outline/10">
              <a
                href="mailto:ajoshvabi17@gmail.com"
                className="block py-3 px-4 rounded-xl text-sm font-bold uppercase tracking-wider text-primary hover:bg-primary/5 transition-all"
              >
                📧 Email Me
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
