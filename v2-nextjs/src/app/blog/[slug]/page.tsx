"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BlogPost, ContentBlock, estimateReadingTime } from "@/data/blog";

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "text":
      return (
        <p className="text-on-surface/85 text-base md:text-lg leading-relaxed mb-6 whitespace-pre-line">
          {block.value}
        </p>
      );

    case "heading":
      if (block.level === 2) {
        return (
          <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4 pl-4 border-l-4 border-primary/50">
            {block.value}
          </h2>
        );
      }
      return (
        <h3 className="text-xl md:text-2xl font-bold mt-10 mb-3 text-on-surface/90">
          {block.value}
        </h3>
      );

    case "image": {
      const alignClasses: Record<string, string> = {
        left: "float-left mr-6 mb-4 w-full sm:w-1/2",
        right: "float-right ml-6 mb-4 w-full sm:w-1/2",
        center: "mx-auto mb-6 max-w-2xl w-full",
        full: "w-full mb-6 -mx-4 md:-mx-8 lg:-mx-16 max-w-none",
      };
      const wrapClass = alignClasses[block.align] || alignClasses.center;

      return (
        <figure className={`${wrapClass}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.url}
            alt={block.caption || "Blog image"}
            className="w-full rounded-2xl object-cover border border-white/5"
          />
          {block.caption && (
            <figcaption className="text-center text-xs text-outline mt-2 italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "code":
      return (
        <div className="my-6 rounded-2xl overflow-hidden border border-white/10 bg-surface-container">
          <div className="px-5 py-3 bg-white/[0.03] border-b border-white/5 flex items-center justify-between">
            {/* Left side: Mac window controls */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></span>
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></span>
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></span>
            </div>
            {/* Right side: Code language */}
            {block.language && (
              <div className="text-[10px] font-bold uppercase tracking-widest text-outline">
                {block.language}
              </div>
            )}
          </div>
          <pre className="p-5 overflow-x-auto text-sm leading-relaxed">
            <code className="font-mono text-primary/90">{block.value}</code>
          </pre>
        </div>
      );

    case "quote":
      return (
        <blockquote className="my-8 py-6 px-8 rounded-2xl glass-card border-l-4 border-secondary/50 italic text-on-surface/75 text-lg leading-relaxed">
          &ldquo;{block.value}&rdquo;
        </blockquote>
      );

    default:
      return null;
  }
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTestMode, setIsTestMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTestMode(window.location.port === "3001");
    }
  }, []);

  useEffect(() => {
    async function fetchPost() {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const allPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as BlogPost[];

        const found = allPosts.find((p) => p.slug === slug && p.published);
        setPost(found || null);

        if (found) {
          // Find related posts with overlapping tags
          const related = allPosts
            .filter(
              (p) =>
                p.id !== found.id &&
                p.published &&
                p.tags?.some((t) => found.tags?.includes(t))
            )
            .slice(0, 2);
          setRelatedPosts(related);
        }
      } catch (err) {
        console.error("Firestore fetch error (BlogDetail):", err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchPost();
  }, [slug]);

  function formatDate(timestamp: { seconds: number } | undefined) {
    if (!timestamp) return "";
    return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 lg:px-24 bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto animate-pulse space-y-8">
          <div className="h-6 w-32 bg-white/[0.06] rounded-full"></div>
          <div className="h-12 w-3/4 bg-white/[0.08] rounded-xl"></div>
          <div className="flex gap-3">
            <div className="h-5 w-20 bg-white/[0.04] rounded-full"></div>
            <div className="h-5 w-16 bg-white/[0.04] rounded-full"></div>
          </div>
          <div className="h-80 bg-white/[0.04] rounded-3xl"></div>
          <div className="space-y-4">
            <div className="h-5 bg-white/[0.04] rounded-lg w-full"></div>
            <div className="h-5 bg-white/[0.04] rounded-lg w-11/12"></div>
            <div className="h-5 bg-white/[0.04] rounded-lg w-4/5"></div>
            <div className="h-5 bg-white/[0.04] rounded-lg w-full"></div>
            <div className="h-5 bg-white/[0.04] rounded-lg w-9/12"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 lg:px-24 bg-surface-container-lowest flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-outline/30 mb-4 block">
            search_off
          </span>
          <h1 className="text-3xl font-bold mb-2">Post Not Found</h1>
          <p className="text-outline mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold hover:bg-primary/20 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">
              arrow_back
            </span>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Cover Image Hero */}
      {post.coverImage && (
        <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-container-lowest/30 via-transparent to-surface-container-lowest"></div>
        </div>
      )}

      <div
        className={`max-w-4xl mx-auto px-6 lg:px-8 ${post.coverImage ? "-mt-24 relative z-10" : "pt-32"} pb-24`}
      >
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-xl text-xs font-bold uppercase text-outline hover:text-primary hover:border-primary/30 transition-all duration-300 group mb-8"
        >
          <span className="material-symbols-outlined text-[14px] transform group-hover:-translate-x-1 transition-transform duration-300">
            arrow_back
          </span>
          Back to Blog
        </Link>

        {/* Post Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-outline">
            <span className="font-medium text-on-surface/70">
              {post.author || "Aj.Dev"}
            </span>
            <span className="w-1 h-1 rounded-full bg-outline/40"></span>
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

          {/* Edit Link */}
          {isTestMode && (
            <Link
              href={`/blog/edit/${post.id}`}
              className="inline-flex items-center gap-1.5 mt-4 text-xs text-outline/50 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">edit</span>
              Edit post
            </Link>
          )}
        </header>

        {/* Content Blocks */}
        <article className="blog-content">
          {post.content?.map((block, i) => (
            <ContentBlockRenderer key={i} block={block} />
          ))}
          <div className="clear-both"></div>
        </article>

        {/* Divider */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300 flex flex-col"
                >
                  <div className="h-40 relative overflow-hidden bg-surface-container shrink-0">
                    {related.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        src={related.coverImage}
                        alt={related.title}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-outline/30">
                          article
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-80"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-outline text-sm mt-2 line-clamp-2">
                      {related.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
