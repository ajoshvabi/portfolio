export function Services() {
  return (
    <section className="py-24 px-6 lg:px-24 bg-surface-dim">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Service Matrix</h2>
          <p className="text-outline">Specialized solutions for modern digital challenges.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          
          <div className="glass-card p-10 rounded-[2rem] border-b-4 border-primary group hover:bg-surface-variant/30 dark:hover:bg-white/5 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl">devices</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">App Development</h3>
            <p className="text-outline mb-8">
              Building cross-platform mobile apps using Flutter with native-level performance and stunning animations.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-xs font-bold uppercase text-on-surface">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span> iOS & Android
              </li>
              <li className="flex items-center gap-2 text-xs font-bold uppercase text-on-surface">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span> Custom UI Engines
              </li>
            </ul>
          </div>
          
          <div className="glass-card p-10 rounded-[2rem] border-b-4 border-secondary group hover:bg-surface-variant/30 dark:hover:bg-white/5 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl">cloud</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Full Stack</h3>
            <p className="text-outline mb-8">
              End-to-end development of web platforms using the MERN stack with highly secure and scalable backends.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-xs font-bold uppercase text-on-surface">
                <span className="material-symbols-outlined text-secondary text-sm">check_circle</span> Node.js APIs
              </li>
              <li className="flex items-center gap-2 text-xs font-bold uppercase text-on-surface">
                <span className="material-symbols-outlined text-secondary text-sm">check_circle</span> React Interfaces
              </li>
            </ul>
          </div>
          
          <div className="glass-card p-10 rounded-[2rem] border-b-4 border-primary group hover:bg-white/5 transition-all">
            <div className="text-primary mb-6 scale-150 origin-left">
              <span className="material-symbols-outlined text-4xl">architecture</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Architecture Design</h3>
            <p className="text-outline mb-8">
              Consulting on app architecture, state management, and cloud infrastructure for long-term scalability.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-xs font-bold uppercase text-on-surface">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span> Bloc / Riverpod
              </li>
              <li className="flex items-center gap-2 text-xs font-bold uppercase text-on-surface">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span> System Design
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
