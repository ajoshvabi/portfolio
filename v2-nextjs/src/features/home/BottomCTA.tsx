import Link from "next/link";

export function BottomCTA() {
  return (
    <section className="py-20 px-6 lg:px-24 bg-surface-container-lowest/30 relative overflow-hidden border-t border-outline/5">
      {/* Decorative radial gradients matching main design */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Not sure which service fits?
        </h2>
        <p className="text-outline max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          Tell me about your project and I&apos;ll recommend the right stack and approach for your needs.
        </p>
        <div className="pt-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary dark:bg-[#e0ffff] text-on-primary dark:text-[#0a0f1a] px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,219,233,0.4)] transition-all group"
          >
            Let&apos;s Talk
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
