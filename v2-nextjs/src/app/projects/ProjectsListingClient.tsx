"use client";

import { useEffect, useState } from "react";
import { projectsData, Project } from "@/data/projects";
import Link from "next/link";
import { collection, getDocs, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProjectsListingClient() {
  const [activeTab, setActiveTab] = useState<"mobile" | "web">("mobile");
  const [projects, setProjects] = useState<{ mobile: Project[]; web: Project[] }>({
    mobile: [],
    web: [],
  });
  const [loading, setLoading] = useState(true);
  const [isTestMode, setIsTestMode] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const list = [...currentProjects];
    const [removed] = list.splice(draggedIndex, 1);
    list.splice(targetIndex, 0, removed);

    // Optimistic UI update
    setProjects((prev) => ({
      ...prev,
      [activeTab]: list,
    }));
    setDraggedIndex(null);

    // Save changes to Firestore
    try {
      await Promise.all(
        list.map((proj, idx) => {
          if (proj.id) {
            const docRef = doc(db, "projects", proj.id);
            return updateDoc(docRef, { order: idx });
          }
          return Promise.resolve();
        })
      );
    } catch (err) {
      console.error("Error updating project order in Firestore:", err);
      alert("Failed to save new project order.");
    }
  };

  useEffect(() => {
    import("@/lib/adminAuth").then(({ checkAdminAuth }) => {
      setIsTestMode(checkAdminAuth());
    });
  }, []);

  useEffect(() => {
    async function fetchAllProjects() {
      try {
        const q = query(collection(db, "projects"), orderBy("order", "asc"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const mobileList: Project[] = [];
          const webList: Project[] = [];
          querySnapshot.docs.forEach((doc) => {
            const data = doc.data();
            const project = { id: doc.id, ...data } as Project;
            if (data.type === "mobile") {
              mobileList.push(project);
            } else if (data.type === "web") {
              webList.push(project);
            }
          });
          setProjects({
            mobile: mobileList,
            web: webList,
          });
        }
      } catch (err) {
        console.error("Firestore fetch error (ProjectsPage):", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAllProjects();
  }, []);

  const currentProjects = projects[activeTab];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-24 bg-surface-container-lowest relative overflow-hidden">
      
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        
        {/* Compact Header Row */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-xs font-bold uppercase text-outline hover:text-primary hover:border-primary/30 transition-all duration-300 group shrink-0 self-start">
            <span className="material-symbols-outlined text-[14px] transform group-hover:-translate-x-1 transition-transform duration-300">arrow_back</span>
            Back to Home
          </Link>

          <div className="h-8 w-px bg-white/10 hidden sm:block shrink-0"></div>

          <div className="min-w-0 flex-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
              All <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Repositories</span>
            </h1>
            <p className="text-outline text-sm mt-1 leading-relaxed truncate">
              A complete archive of my architectural work, mobile applications, and full-stack web platforms.
            </p>
          </div>

          {/* New Project Button */}
          {isTestMode && (
            <Link
              href="/projects/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 group shrink-0 self-start sm:self-center"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              New Project
            </Link>
          )}
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-6 mb-12 border-b border-white/5 pb-4">
          <button 
            onClick={() => setActiveTab("mobile")}
            className={`text-sm font-bold uppercase tracking-widest pb-4 relative transition-colors ${activeTab === "mobile" ? "text-primary" : "text-outline hover:text-on-surface"}`}
          >
            Mobile Apps
            {activeTab === "mobile" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full shadow-[0_0_10px_rgba(0,219,233,0.5)]"></div>
            )}
          </button>
          <button 
            onClick={() => setActiveTab("web")}
            className={`text-sm font-bold uppercase tracking-widest pb-4 relative transition-colors ${activeTab === "web" ? "text-secondary" : "text-outline hover:text-on-surface"}`}
          >
            Web Applications
            {activeTab === "web" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary rounded-t-full shadow-[0_0_10px_rgba(236,178,255,0.5)]"></div>
            )}
          </button>
        </div>
        
        {/* Card Grid / Shimmer Loader */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
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
                  </div>
                </div>
              </div>
            ))
          ) : currentProjects && currentProjects.length > 0 ? (
            currentProjects.map((project, i) => (
              <div
                key={i}
                draggable={isTestMode}
                onDragStart={(e) => handleDragStart(e, i)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, i)}
                className={`glass-card rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300 flex flex-col h-full bg-surface/50 border border-white/5 ${
                  isTestMode ? "cursor-grab active:cursor-grabbing select-none" : ""
                }`}
              >
                <div className="h-48 sm:h-64 relative overflow-hidden bg-surface-container shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={project.image} alt={project.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-80"></div>
                  
                  {isTestMode && (
                    <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-outline">
                      <span className="material-symbols-outlined text-base">drag_indicator</span>
                    </div>
                  )}
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
                  {isTestMode && project.id && (
                    <Link
                      href={`/projects/edit/${project.id}`}
                      className="inline-flex items-center gap-1.5 mt-4 text-xs text-outline/50 hover:text-primary transition-colors self-start"
                    >
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                      Edit Project
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-outline">
              No projects found in this category.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
