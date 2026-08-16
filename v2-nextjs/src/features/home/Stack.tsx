"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type TechItem = {
  name: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  hoverBg: string;
};

const defaultStack: TechItem[] = [
  { name: "HTML", icon: "html", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20" },
  { name: "CSS", icon: "css", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20" },
  { name: "JavaScript", icon: "javascript", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20" },
  { name: "Flutter", icon: "flutter", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20" },
  { name: "Dart", icon: "code", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20" },
  { name: "React.js", icon: "html", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20" },
  { name: "Node.js", icon: "javascript", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20" },
  { name: "Express.js", icon: "api", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20" },
  { name: "MongoDB", icon: "database", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20" },
  { name: "Redux", icon: "grid_view", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20" },
  { name: "Firebase", icon: "local_fire_department", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20" },
  { name: "Git", icon: "code", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20" },
  { name: "GitHub", icon: "code", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20" },
  { name: "Bootstrap", icon: "grid_view", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20" },
  { name: "JWT", icon: "lock", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20" },
  { name: "Socket.IO", icon: "chat", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20" },
  { name: "PHP", icon: "code", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20" },
  { name: "MySQL", icon: "database", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20" },
  { name: "Codeigniter", icon: "code", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20" },
  { name: "npm", icon: "settings", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20" },
  { name: "Postman", icon: "api", color: "text-primary", bg: "bg-primary/5", border: "hover:border-primary", hoverBg: "group-hover:bg-primary/20" },
  { name: "API", icon: "api", color: "text-secondary", bg: "bg-secondary/5", border: "hover:border-secondary", hoverBg: "group-hover:bg-secondary/20" },
];

export function Stack() {
  const [items, setItems] = useState<TechItem[]>(defaultStack);

  useEffect(() => {
    async function loadStack() {
      try {
        const q = query(collection(db, "tech_stack"), orderBy("order", "asc"));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const list = snapshot.docs.map((d) => d.data() as TechItem);
          setItems(list);
        } else {
          // If Firestore is empty, seed defaults to Firestore automatically so they are available
          const batchAdd = defaultStack.map((item) => addDoc(collection(db, "tech_stack"), item));
          await Promise.all(batchAdd);
          // Reload from Firestore
          const newSnapshot = await getDocs(q);
          const list = newSnapshot.docs.map((d) => d.data() as TechItem);
          setItems(list);
        }
      } catch (err) {
        console.error("Firestore read error (Stack marquee):", err);
      }
    }
    loadStack();
  }, []);

  // Duplicate the array to ensure seamless infinite looping transition
  const doubledStack = [...items, ...items];

  return (
    <section className="py-24 bg-surface-container-lowest/50 overflow-hidden" id="stack">
      <div className="max-w-7xl mx-auto px-6 lg:px-24 mb-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Tech Stack</h2>
          <p className="text-outline max-w-2xl mx-auto">
            My technical arsenal for building high-fidelity digital products.
          </p>
        </div>
      </div>

      {/* Marquee Wrapper */}
      <div className="w-full relative flex overflow-x-hidden">
        {/* Left and Right blur covers to blend marquee smoothly at screen edges */}
        <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling Inner Container */}
        <div className="flex gap-6 animate-marquee py-4 shrink-0 min-w-full">
          {doubledStack.map((item, i) => {
            // Map color styles dynamically to prevent Tailwind purging dynamic class issues
            const isSecondary = item.color?.includes("secondary") || item.hoverBg?.includes("secondary");
            const borderClass = isSecondary ? "hover:border-secondary" : "hover:border-primary";
            const bgClass = isSecondary ? "bg-secondary/5" : "bg-primary/5";
            const hoverBgClass = isSecondary ? "group-hover:bg-secondary/20" : "group-hover:bg-primary/20";
            const colorClass = isSecondary ? "text-secondary" : "text-primary";

            return (
              <div
                key={i}
                className={`glass-card p-6 md:p-8 rounded-2xl flex flex-col items-center gap-4 hover:-translate-y-2 transition-all duration-300 group border-b-2 border-transparent ${borderClass} shrink-0 w-36 md:w-44`}
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-colors ${bgClass} ${hoverBgClass}`}>
                  <span className={`material-symbols-outlined text-3xl md:text-4xl ${colorClass}`}>
                    {item.icon}
                  </span>
                </div>
                <span className="text-[10px] md:text-xs font-bold uppercase text-on-surface whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
