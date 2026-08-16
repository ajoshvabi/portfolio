"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BlogPost, estimateReadingTime } from "@/data/blog";

export default function BlogListingClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const [isTestMode, setIsTestMode] = useState(false);

  useEffect(() => {
    import("@/lib/adminAuth").then(({ checkAdminAuth }) => {
      setIsTestMode(checkAdminAuth());
    });
  }, []);

  useEffect(() => {
    async function fetchBlogs() {
      try {
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
            });

          setPosts(published);

          // Extract unique tags
          const tags = new Set<string>();
          published.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
          setAllTags(Array.from(tags).sort());
        }
      } catch (err) {
        console.error("Firestore fetch error (BlogListing):", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const filteredPosts =
    activeTag === "all"
      ? posts
      : posts.filter((p) => p.tags?.includes(activeTag));

  function formatDate(timestamp: { seconds: number } | undefined) {
    if (!timestamp) return "";
    return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-24 bg-surface-container-lowest relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Compact Header Row */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-xs font-bold uppercase text-outline hover:text-primary hover:border-primary/30 transition-all duration-300 group shrink-0 self-start"
          >
            <span className="material-symbols-outlined text-[14px] transform group-hover:-translate-x-1 transition-transform duration-300">
              arrow_back
            </span>
            Back to Home
          </Link>

          <div className="h-8 w-px bg-white/10 hidden sm:block shrink-0"></div>

          <div className="min-w-0 flex-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
              Blog{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Archive
              </span>
            </h1>
            <p className="text-outline text-sm mt-1 leading-relaxed">
              Thoughts, tutorials, and insights on development &amp; design.
            </p>
          </div>

          {/* New Post Button */}
          {isTestMode && (
            <Link
              href="/blog/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 group shrink-0 self-start sm:self-center"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              New Post
            </Link>
          )}
        </div>

        {/* Tag Filter Tabs */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveTag("all")}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 shrink-0 ${
              activeTag === "all"
                ? "bg-primary/15 border-primary/40 text-primary"
                : "bg-white/[0.02] border-white/10 text-outline hover:text-on-surface hover:border-white/20"
            }`}
          >
            All Posts
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 shrink-0 ${
                activeTag === tag
                  ? "bg-primary/15 border-primary/40 text-primary"
                  : "bg-white/[0.02] border-white/10 text-outline hover:text-on-surface hover:border-white/20"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Card Grid / Shimmer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
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
            : filteredPosts.map((post) => (
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
                        <span className="material-symbols-outlined text-5xl text-outline/30">
                          article
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-80"></div>
                  </div>
                  <div className="p-5 sm:p-8 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags?.map((tag, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-outline text-sm flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 mt-4 text-xs text-outline">
                      <span>
                        {formatDate(
                          post.createdAt as unknown as { seconds: number }
                        )}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-outline/40"></span>
                      <span>
                        {estimateReadingTime(post.content || [])} min read
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
        </div>

        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-20 text-outline">
            <span className="material-symbols-outlined text-5xl mb-4 block opacity-30">
              edit_note
            </span>
            <p>No blog posts found{activeTag !== "all" ? ` for "${activeTag}"` : ""}.</p>
          </div>
        )}
      </div>
    </div>
  );
}
