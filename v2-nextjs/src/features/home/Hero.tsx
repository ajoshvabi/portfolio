import Link from "next/link";
import { SceneWrapper } from "@/components/3d/SceneWrapper";

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center px-6 lg:px-24 pt-28 md:pt-16 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <div className="space-y-8">
          <div className="inline-block px-4 py-2 rounded-full border border-outline/20 dark:border-white/10 bg-surface-variant/30 dark:bg-white/5 text-[10px] font-mono text-outline tracking-widest uppercase">
            Available for Freelance
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight relative z-10 text-on-surface dark:text-white">
            Hello, I'm <br />
            <span className="text-primary dark:text-[#e0ffff] dark:drop-shadow-[0_0_12px_rgba(0,219,233,0.6)]">Ajosh V Abi</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-on-surface-variant dark:text-slate-300 font-display font-semibold tracking-wide">
            Flutter Developer | Full-Stack Developer
          </h2>
          <p className="text-base md:text-lg text-outline dark:text-slate-400 max-w-lg relative z-10 leading-relaxed">
            Building Fast, Beautiful & Scalable Digital Experiences across mobile and web ecosystems with architectural precision.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-6 relative z-10">
            <Link href="/projects" className="bg-primary dark:bg-[#e0ffff] text-on-primary dark:text-[#0a0f1a] px-8 py-3 rounded-xl text-xs font-bold uppercase shadow-[0_0_15px_rgba(0,105,112,0.2)] dark:shadow-[0_0_15px_rgba(0,219,233,0.2)] hover:shadow-[0_0_25px_rgba(0,105,112,0.4)] dark:hover:shadow-[0_0_25px_rgba(0,219,233,0.5)] flex items-center gap-3 transition-all active:scale-95 group">
              View Projects <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>

        <div className="relative h-[400px] md:h-[600px] w-full pointer-events-none md:pointer-events-auto flex items-center justify-center">
          {/* Background Glow Orb behind the 3D element */}
          <div className="absolute w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] -z-10"></div>
          <div className="absolute w-[200px] h-[200px] bg-secondary/20 rounded-full blur-[80px] -z-10 translate-x-20 translate-y-20"></div>

          {/* SceneWrapper loads the actual Scene (FuturisticSphere) inside Canvas */}
          <SceneWrapper />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] uppercase font-bold text-outline tracking-wider">SCROLL TO EXPLORE</span>
        <span className="material-symbols-outlined text-primary">keyboard_double_arrow_down</span>
      </div>
    </section>
  );
}
