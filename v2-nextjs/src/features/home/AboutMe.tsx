"use client";

import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const fallbackAbout = {
  bio: "Loading bio from Firestore...",
  image: "",
  stats: {
    techStacks: "...",
    commitment: "...",
  }
};

export function AboutMe() {
  const [data, setData] = useState(fallbackAbout);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAndFetch() {
      try {
        const docSnap = await getDoc(doc(db, "about", "profile"));
        if (docSnap.exists()) {
          const fetchedData = docSnap.data();
          setData({
            bio: fetchedData.bio || fallbackAbout.bio,
            image: fetchedData.image || fallbackAbout.image,
            stats: {
              techStacks: fetchedData.stats?.techStacks || fallbackAbout.stats.techStacks,
              commitment: fetchedData.stats?.commitment || fallbackAbout.stats.commitment,
            }
          });
        }
      } catch (err) {
        console.error("Firestore fetch error (AboutMe):", err);
      } finally {
        setLoading(false);
      }
    }
    initAndFetch();
  }, []);

  const bioParagraphs = data.bio ? data.bio.split('\n\n') : [];

  return (
    <section className="py-24 px-6 lg:px-24 relative overflow-hidden" id="about">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        {/* Left: Text Content */}
        <div className="md:col-span-7 space-y-8 relative z-10">
          <div className="flex flex-col gap-6 mb-6">
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl overflow-hidden border-2 border-primary/30 p-1 shrink-0 relative group shadow-[0_0_20px_rgba(0,219,233,0.15)] ${loading ? 'animate-pulse bg-white/[0.04]' : ''}`}>
              {/* Outer glow and placeholder background */}
              <div className="absolute inset-0 bg-primary/20 animate-pulse rounded-[1.4rem]"></div>
              {/* Image */}
              {!loading && data.image ? (
                <img 
                  src={data.image} 
                  alt="Ajosh V Abi" 
                  className="w-full h-full object-cover rounded-[1.3rem] relative z-10 group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                />
              ) : null}
            </div>
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-px bg-primary/50"></span>
                <span className="text-primary text-xs font-bold uppercase tracking-widest">About Me</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                I build digital products that <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  solve real problems.
                </span>
              </h2>
            </div>
          </div>
          
          <div className="space-y-6 text-on-surface-variant dark:text-slate-300 text-lg leading-relaxed">
            {loading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-white/[0.04] rounded-lg w-full"></div>
                <div className="h-4 bg-white/[0.04] rounded-lg w-full"></div>
                <div className="h-4 bg-white/[0.04] rounded-lg w-11/12"></div>
                <div className="h-4 bg-white/[0.04] rounded-lg w-5/6"></div>
              </div>
            ) : (
              bioParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))
            )}
          </div>
          
          <div className="flex items-center gap-8 pt-4">
            <div className="flex flex-col">
              {loading ? (
                <div className="h-10 w-16 bg-white/[0.08] rounded-md animate-pulse mb-1"></div>
              ) : (
                <span className="text-4xl font-display font-bold text-on-surface dark:text-white mb-1">{data.stats.techStacks}</span>
              )}
              <span className="text-xs text-outline uppercase tracking-wider font-bold">Tech Stacks</span>
            </div>
            <div className="w-px h-12 bg-outline/20 dark:bg-white/10"></div>
            <div className="flex flex-col">
              {loading ? (
                <div className="h-10 w-24 bg-white/[0.08] rounded-md animate-pulse mb-1"></div>
              ) : (
                <span className="text-4xl font-display font-bold text-on-surface dark:text-white mb-1">{data.stats.commitment}</span>
              )}
              <span className="text-xs text-outline uppercase tracking-wider font-bold">Commitment</span>
            </div>
          </div>
        </div>

        {/* Right: Visual Element / Philosophy Grid */}
        <div className="md:col-span-5 grid grid-cols-1 gap-6 relative z-10 pt-8 md:pt-0">
          <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,219,233,0.15)] transition-all duration-300">
            <span className="material-symbols-outlined text-4xl text-primary mb-4 block">phone_iphone</span>
            <h3 className="text-xl font-bold mb-2">Mobile First</h3>
            <p className="text-sm text-outline">Native-level performance and fluid animations using Flutter's powerful rendering engine.</p>
          </div>
          <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,219,233,0.15)] transition-all duration-300 md:translate-x-4">
            <span className="material-symbols-outlined text-4xl text-secondary mb-4 block">architecture</span>
            <h3 className="text-xl font-bold mb-2">Clean Architecture</h3>
            <p className="text-sm text-outline">Scalable state management and modular design patterns for highly maintainable codebases.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
