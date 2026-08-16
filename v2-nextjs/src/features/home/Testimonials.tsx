export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO, FluxTech",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtSzBuLLusUJO_znImRQIsPldS5JkxdoAMOJ8MDKzRY84b0CMpOYFawHAGqn6pGElBGLZVRyd3VmhiP9mURA6vmRPZuDHhhyDnGysbTiM7biT9qCgHsUy83J7DwMyDNB2Jg3WCWc5LbLuuNi4M-htoQhrF4MI9J0LzJhY4W5kcYjmfNAO2UFVxxrmIBQjdrwOMx5IuRL3Lcd1TLSLg_tRE3TJ12lu2jm5xPmkoPkksApwuWtdJ7ga1",
      quote: `"Ajosh transformed our vision into a stunning mobile reality. His eye for detail and technical mastery is unparalleled in the Flutter space."`,
      theme: "primary"
    },
    {
      name: "Marcus Vane",
      role: "CTO, Softzane",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAopgSoHIVbRGTm5pzymbKy3F8S4N22EwWi5RR02s7k5Z_E0xpHqJ1jl3_S9c9Eq7tDi8BMNWkBAL1kff9SryVkTruA72_WE0lDwrWf5pOnLT4G9mCbjy0orUcqMQlc8kdQ7ukm7tlBgfTu3vb_VazhSUKhR4IovjXLFcE3HsJHIruZaxOB_uy2vFxViKnbEt6VjnGim2f_U4U7m-HPeuZwz2iNEOO_NZxMtDcTZMWHgQg4QhVN0BXF",
      quote: `"One of the best full-stack developers I've worked with. He understands both the business logic and the pixel-perfect design requirements."`,
      theme: "secondary"
    },
    {
      name: "Elena Rodriguez",
      role: "Founder, Arta",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDiy16SDfAF1e_Pknre07DFkV5tLc_HSX8_5KMolTF71f-3ToKGkr6h2UIrIt0YRL9FaZcqYej1fnjX1OBkF3tHoNSlxEqWqlgP8KtLb2RCq0ARpscHLJIiuDs9lApmOsT1y-TiZ_2VpL0DVPp4HefOxiAJ6nJbMcHxeznWpjGJ8asvmcK7QOhFlIfYf7anhu2nyd35hdS0vq3fRTRt0IYQGcjqegb4yLI_cy71iv25jqrkOuTurKl",
      quote: `"Working with Ajosh was seamless. He delivers clean code that's easy to maintain and beautiful to look at."`,
      theme: "primary"
    },
    {
      name: "David Kim",
      role: "Product Lead, Nexa",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgjFB0qP7o4IwzG9CSCEoesuD4uJJ-bSkXWhdkL9Nhpfv9oEYvMiIhB54n1i2JsuTyURyXAfF_QAyOyi_WpDAC1NXuraLOewBMXK-2Wk-rjOX6O0FInxqqBezQhZAlZErFteFxk1_LTbAbHj2NNspqlZPxqzhIU23Sr5oqKhgvyNpre7yuqSd6byjl0oFHcdOFfRO6IMstYcvCGH5Mh-H65iANWDfZpJtHVI0YlSGck-GJLO7YtQDC",
      quote: `"Exceptional work on our authentication system. Secure, fast, and exactly what we needed."`,
      theme: "primary"
    }
  ];

  return (
    <section className="py-24 overflow-hidden border-y border-outline/10 dark:border-white/5 bg-surface-container-lowest">
      {/* For simplicity without extra CSS animations, we will use a simple flex wrap for now. 
          A custom marquee can be implemented later using Framer Motion */}
      <div className="flex overflow-x-auto gap-8 px-6 lg:px-24 pb-8 scrollbar-hide">
        {testimonials.map((t, i) => (
          <div key={i} className="glass-card p-8 rounded-2xl w-[400px] flex-shrink-0">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-full bg-${t.theme}/20 overflow-hidden border border-${t.theme}/40`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-full object-cover" src={t.image} alt={t.name} />
              </div>
              <div>
                <div className="text-base font-bold">{t.name}</div>
                <div className={`text-xs font-bold uppercase text-${t.theme}`}>{t.role}</div>
              </div>
            </div>
            <p className="text-outline italic">{t.quote}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
