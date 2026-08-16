"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BlogPost, estimateReadingTime } from "@/data/blog";

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTags, setExpandedTags] = useState<Record<string, boolean>>({});

  const toggleExpandTags = (e: React.MouseEvent, postId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedTags((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  useEffect(() => {
    async function fetchLatestPosts() {
      try {
        // Fetch all blogs, filter/sort client-side to avoid composite index requirement
        const querySnapshot = await getDocs(collection(db, "blogs"));
        if (!querySnapshot.empty) {
          const allPosts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as BlogPost[];

          const published = allPosts
            .filter((p) => p.published === true)
            .sort((a, b) => {
              const aTime = a.createdAt?.seconds || 0;
              const bTime = b.createdAt?.seconds || 0;
              return bTime - aTime;
            })
            .slice(0, 3);

          setPosts(published);
        }
      } catch (err) {
        console.error("Firestore fetch error (Blog):", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestPosts();
  }, []);

  function formatDate(timestamp: { seconds: number } | undefined) {
    if (!timestamp) return "";
    return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <section className="py-24 px-6 lg:px-24" id="blog">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4">Latest Posts</h2>
            <p className="text-outline">Thoughts on architecture, development, and design.</p>
          </div>
          <div className="hidden md:block">
            <Link
              href="/blog"
              className="text-primary text-xs font-bold uppercase flex items-center gap-2 hover:gap-4 transition-all"
            >
              VIEW ALL POSTS{" "}
              <span className="material-symbols-outlined">trending_flat</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="glass-card rounded-3xl overflow-hidden animate-pulse flex flex-col h-full border border-white/5 bg-white/[0.02]"
                >
                  <div className="h-40 sm:h-52 bg-white/[0.04] shrink-0"></div>
                  <div className="p-8 flex flex-col flex-1 space-y-4">
                    <div className="flex gap-2">
                      <div className="h-5 w-14 bg-white/[0.08] rounded-full"></div>
                      <div className="h-5 w-10 bg-white/[0.04] rounded-full"></div>
                    </div>
                    <div className="h-7 w-3/4 bg-white/[0.08] rounded-lg"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-white/[0.04] rounded-lg w-full"></div>
                      <div className="h-4 bg-white/[0.04] rounded-lg w-5/6"></div>
                    </div>
                    <div className="h-4 w-24 bg-white/[0.04] rounded-lg"></div>
                  </div>
                </div>
              ))
            : posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="glass-card rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300 flex flex-col h-full"
                >
                  <div className="h-40 sm:h-52 relative overflow-hidden bg-surface-container shrink-0">
                    {post.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        src={post.coverImage}
                        alt={post.title}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-5xl text-outline/30">article</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-80"></div>
                  </div>
                  <div className="p-5 sm:p-8 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags && (
                        <>
                          {(expandedTags[post.id] || post.tags.length <= 2
                            ? post.tags
                            : post.tags.slice(0, 2)
                          ).map((tag, j) => (
                            <span
                              key={j}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase"
                            >
                              {tag}
                            </span>
                          ))}
                          {!expandedTags[post.id] && post.tags.length > 2 && (
                            <button
                              onClick={(e) => toggleExpandTags(e, post.id)}
                              className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 rounded-full text-[10px] font-bold uppercase transition-colors"
                            >
                              +{post.tags.length - 2}
                            </button>
                          )}
                        </>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-outline text-sm flex-1 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center gap-3 mt-4 text-xs text-outline">
                      <span>{formatDate(post.createdAt as unknown as { seconds: number })}</span>
                      <span className="w-1 h-1 rounded-full bg-outline/40"></span>
                      <span>{estimateReadingTime(post.content)} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
        </div>

        {!loading && posts.length === 0 && (
          <div className="text-center py-20 text-outline">
            <span className="material-symbols-outlined text-5xl mb-4 block opacity-30">edit_note</span>
            <p>No blog posts yet. Check back soon!</p>
          </div>
        )}

        <div className="md:hidden mt-12 flex justify-center">
          <Link
            href="/blog"
            className="text-primary text-xs font-bold uppercase flex items-center gap-2 hover:gap-4 transition-all border border-primary/30 px-6 py-3 rounded-full hover:bg-primary/5"
          >
            VIEW ALL POSTS{" "}
            <span className="material-symbols-outlined">trending_flat</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
