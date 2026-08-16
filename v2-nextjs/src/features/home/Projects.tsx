"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { projectsData, Project } from "@/data/projects";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCuratedProjects() {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        if (!querySnapshot.empty) {
          const allProjects = querySnapshot.docs.map(doc => doc.data() as Project);
          
          // Filter strictly: must be featured and have a valid order number
          const curated = allProjects.filter(
            p => p.featured === true && typeof p.order === "number"
          );

          // Sort by order ascending and take top 3
          const sorted = curated
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .slice(0, 3);
            
          setProjects(sorted);
        }
      } catch (err) {
        console.error("Firestore fetch error (Home Projects):", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCuratedProjects();
  }, []);

  return (
    <section className="py-24 px-6 lg:px-24" id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4">Curated Projects</h2>
            <p className="text-outline">A selection of my best architectural work.</p>
          </div>
          <div className="hidden md:block">
            <Link href="/projects" className="text-primary text-xs font-bold uppercase flex items-center gap-2 hover:gap-4 transition-all">
              VIEW ALL REPOSITORIES <span className="material-symbols-outlined">trending_flat</span>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-card rounded-3xl overflow-hidden animate-pulse flex flex-col h-full border border-white/5 bg-white/[0.02]">
                <div className="h-48 sm:h-64 bg-white/[0.04] shrink-0"></div>
                <div className="p-8 flex flex-col flex-1 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <div className="h-6 w-16 bg-white/[0.08] rounded-full"></div>
                    <div className="h-6 w-12 bg-white/[0.04] rounded-full"></div>
                    <div className="h-6 w-14 bg-white/[0.04] rounded-full"></div>
                  </div>
                  <div className="h-8 w-2/3 bg-white/[0.08] rounded-lg"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-white/[0.04] rounded-lg w-full"></div>
                    <div className="h-4 bg-white/[0.04] rounded-lg w-5/6"></div>
                    <div className="h-4 bg-white/[0.04] rounded-lg w-4/5"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            projects.map((project, i) => (
              <div key={i} className="glass-card rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300 flex flex-col h-full">
                <div className="h-48 sm:h-64 relative overflow-hidden bg-surface-container shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={project.image} alt={project.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-80"></div>
                </div>
                <div className="p-5 sm:p-8 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 bg-${project.theme}/10 text-${project.theme} rounded-full text-[10px] font-bold uppercase`}>
                      {project.category}
                    </span>
                    {project.stack.map((tech, j) => (
                      <span key={j} className="px-3 py-1 bg-outline/10 text-outline rounded-full text-[10px] font-bold uppercase">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 transition-colors group-hover:text-${project.theme}`}>
                    {project.title}
                  </h3>
                  <p className="text-outline text-sm flex-1">
                    {project.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="md:hidden mt-12 flex justify-center">
          <Link href="/projects" className="text-primary text-xs font-bold uppercase flex items-center gap-2 hover:gap-4 transition-all border border-primary/30 px-6 py-3 rounded-full hover:bg-primary/5">
            VIEW ALL REPOSITORIES <span className="material-symbols-outlined">trending_flat</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
