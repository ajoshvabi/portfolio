import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-outline/10 bg-surface/10 py-12 relative overflow-hidden">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="font-display text-2xl tracking-tighter text-primary font-bold">
            Aj.Dev
          </Link>
          <p className="text-xs text-outline">
            Building premium mobile and web architectures.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2">
            <a 
              href="mailto:ajoshvabi17@gmail.com" 
              className="text-xs font-bold uppercase tracking-widest text-outline hover:text-primary transition-colors"
            >
              Email
            </a>
            <a 
              href="https://wa.me/918089033549" 
              target="_blank" 
              className="text-xs font-bold uppercase tracking-widest text-outline hover:text-[#25D366] transition-colors"
            >
              WhatsApp
            </a>
            <a 
              href="https://github.com/ajoshvabi" 
              target="_blank" 
              className="text-xs font-bold uppercase tracking-widest text-outline hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/ajoshvabi/" 
              target="_blank" 
              className="text-xs font-bold uppercase tracking-widest text-outline hover:text-secondary transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://x.com/ajoshvabi" 
              target="_blank" 
              className="text-xs font-bold uppercase tracking-widest text-outline hover:text-primary transition-colors"
            >
              X
            </a>
            <a 
              href="https://instagram.com/ajoshvabi" 
              target="_blank" 
              className="text-xs font-bold uppercase tracking-widest text-outline hover:text-secondary transition-colors"
            >
              Instagram
            </a>
            <a 
              href="https://facebook.com/ajoshvabi" 
              target="_blank" 
              className="text-xs font-bold uppercase tracking-widest text-outline hover:text-primary transition-colors"
            >
              Facebook
            </a>
            <a 
              href="https://youtube.com/" 
              target="_blank" 
              className="text-xs font-bold uppercase tracking-widest text-outline hover:text-secondary transition-colors"
            >
              YouTube
            </a>
          </div>
          <p className="text-[10px] text-outline/50 uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Ajosh V Abi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
