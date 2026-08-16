"use client";

import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const fallbackExperience: any[] = [];

const fallbackStats = {
  experienceYears: "...",
  projectsCompleted: "...",
};

export function About() {
  const [experience, setExperience] = useState(fallbackExperience);
  const [stats, setStats] = useState(fallbackStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch stats
        const aboutSnap = await getDoc(doc(db, "about", "profile"));
        if (aboutSnap.exists()) {
          const aboutData = aboutSnap.data();
          if (aboutData.stats) {
            setStats({
              experienceYears: aboutData.stats.experienceYears || fallbackStats.experienceYears,
              projectsCompleted: aboutData.stats.projectsCompleted || fallbackStats.projectsCompleted,
            });
          }
        }

        // Fetch experience timeline
        const expCol = collection(db, "experience");
        const expQuery = query(expCol, orderBy("order", "asc"));
        const expSnap = await getDocs(expQuery);
        if (!expSnap.empty) {
          const fetchedExp = expSnap.docs.map(doc => doc.data() as typeof fallbackExperience[0]);
          setExperience(fetchedExp);
        }
      } catch (err) {
        console.error("Firestore fetch error (About/Experience):", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="py-24 px-6 lg:px-24" id="experience">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <div className="w-full md:w-1/3 md:sticky md:top-32">
            <h2 className="text-4xl font-bold mb-6">The Journey</h2>
            <p className="text-outline mb-12">
              I specialize in crafting high-performance applications that bridge the gap between complex backend logic and pixel-perfect interfaces.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-2xl text-center">
                {loading ? (
                  <div className="h-12 w-16 bg-white/[0.08] rounded-lg mx-auto animate-pulse"></div>
                ) : (
                  <div className="text-primary text-5xl font-bold">{stats.experienceYears}</div>
                )}
                <div className="text-xs uppercase font-bold text-outline mt-2">Years Exp.</div>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center">
                {loading ? (
                  <div className="h-12 w-16 bg-white/[0.08] rounded-lg mx-auto animate-pulse"></div>
                ) : (
                  <div className="text-primary text-5xl font-bold">{stats.projectsCompleted}</div>
                )}
                <div className="text-xs uppercase font-bold text-outline mt-2">Projects</div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/3 space-y-12">
            <div className="relative pl-8 border-l border-primary/20 space-y-16">
              {loading ? (
                Array.from({ length: 2 }).map((_, idx) => (
                  <div className="relative animate-pulse" key={idx}>
                    <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-white/[0.08]"></div>
                    <div className="glass-card p-8 rounded-3xl space-y-4 border border-white/5 bg-white/[0.02]">
                      <div className="h-4 w-24 bg-white/[0.08] rounded-md"></div>
                      <div className="h-8 w-48 bg-white/[0.08] rounded-lg"></div>
                      <div className="h-4 w-36 bg-white/[0.08] rounded-md"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-white/[0.04] rounded-lg w-full"></div>
                        <div className="h-4 bg-white/[0.04] rounded-lg w-5/6"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                experience.map((item, idx) => (
                  <div className="relative" key={idx}>
                    <div className={`absolute -left-[41px] top-0 w-4 h-4 rounded-full ${idx === 0 ? "bg-primary shadow-[0_0_15px_rgba(0,219,233,1)]" : "bg-outline-variant"}`}></div>
                    <div className="glass-card p-8 rounded-3xl">
                      <span className="text-xs font-bold uppercase text-primary mb-2 block">{item.duration}</span>
                      <h3 className="text-3xl font-bold mb-2">{item.company}</h3>
                      <p className="text-primary font-medium mb-4">{item.role}</p>
                      <p className="text-outline">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
