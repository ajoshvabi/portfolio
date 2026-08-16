export function Stack() {
  const stack = [
    { name: "Flutter", icon: "flutter", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20" },
    { name: "Dart", icon: "code", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20" },
    { name: "Firebase", icon: "local_fire_department", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20" },
    { name: "Node.js", icon: "javascript", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20" },
    { name: "MongoDB", icon: "database", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20" },
    { name: "React.js", icon: "html", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20" },
    { name: "Express.js", icon: "api", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20" },
    { name: "MySQL", icon: "database", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20" },
    { name: "SQLite", icon: "storage", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20" },
    { name: "PHP", icon: "code", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20" },
    { name: "JavaScript", icon: "javascript", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20" },
    { name: "Bootstrap", icon: "grid_view", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20" },
  ];

  return (
    <section className="py-24 bg-surface-container-lowest/50 px-6 lg:px-24 overflow-hidden" id="stack">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Tech Stack</h2>
          <p className="text-outline max-w-2xl mx-auto">
            My technical arsenal for building high-fidelity digital products.
          </p>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-8 pt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth snap-x snap-mandatory">
          {stack.map((item, i) => (
            <div key={i} className={`glass-card p-8 rounded-2xl flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-500 group border-b-2 border-transparent ${item.border} shrink-0 w-44 snap-center`}>
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-colors ${item.bg} ${item.hoverBg}`}>
                <span className={`material-symbols-outlined text-4xl ${item.color}`}>
                  {item.icon}
                </span>
              </div>
              <span className="text-xs font-bold uppercase text-on-surface">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
