"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ContentBlock, generateSlug } from "@/data/blog";

type BlockType = ContentBlock["type"];

const BLOCK_OPTIONS: { type: BlockType; label: string; icon: string }[] = [
  { type: "text", label: "Text", icon: "notes" },
  { type: "heading", label: "Heading", icon: "title" },
  { type: "image", label: "Image", icon: "image" },
  { type: "code", label: "Code", icon: "code" },
  { type: "quote", label: "Quote", icon: "format_quote" },
];

function createEmptyBlock(type: BlockType): ContentBlock {
  switch (type) {
    case "text":
      return { type: "text", value: "" };
    case "heading":
      return { type: "heading", value: "", level: 2 };
    case "image":
      return { type: "image", url: "", caption: "", align: "center" };
    case "code":
      return { type: "code", value: "", language: "" };
    case "quote":
      return { type: "quote", value: "" };
  }
}

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params?.id as string;

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    import("@/lib/adminAuth").then(({ checkAdminAuth }) => {
      const authorized = checkAdminAuth();
      setIsAuthorized(authorized);
      setCheckingAuth(false);
      if (!authorized) {
        router.replace("/blog");
      }
    });
  }, [router]);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [published, setPublished] = useState(false);
  const [showBlockMenu, setShowBlockMenu] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const blockMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const docRef = doc(db, "blogs", postId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setExcerpt(data.excerpt || "");
          setCoverImage(data.coverImage || "");
          setTagsInput((data.tags || []).join(", "));
          setBlocks(data.content || [{ type: "text", value: "" }]);
          setPublished(data.published || false);
        }
      } catch (err) {
        console.error("Error fetching blog for edit:", err);
      } finally {
        setLoading(false);
      }
    }
    if (postId) fetchPost();
  }, [postId]);

  const updateBlock = useCallback(
    (index: number, updates: Partial<ContentBlock>) => {
      setBlocks((prev) =>
        prev.map((b, i) => (i === index ? { ...b, ...updates } as ContentBlock : b))
      );
    },
    []
  );

  const insertBlock = useCallback(
    (afterIndex: number, type: BlockType) => {
      const newBlock = createEmptyBlock(type);
      setBlocks((prev) => {
        const copy = [...prev];
        copy.splice(afterIndex + 1, 0, newBlock);
        return copy;
      });
      setShowBlockMenu(null);
    },
    []
  );

  const removeBlock = useCallback((index: number) => {
    setBlocks((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const moveBlock = useCallback((from: number, to: number) => {
    setBlocks((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(from, 1);
      copy.splice(to, 0, moved);
      return copy;
    });
  }, []);

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex !== null && dragIndex !== index) {
      moveBlock(dragIndex, index);
      setDragIndex(index);
    }
  };

  async function handleSave(publish: boolean) {
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    const nonEmptyBlocks = blocks.filter((b) => {
      if (b.type === "image") return b.url.trim() !== "";
      return "value" in b && b.value.trim() !== "";
    });

    setSaving(true);
    try {
      const slug = generateSlug(title);
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const updateData = {
        title: title.trim(),
        slug,
        excerpt: excerpt.trim(),
        coverImage: coverImage.trim(),
        content: nonEmptyBlocks,
        tags,
        updatedAt: Timestamp.now(),
        published: publish,
      };

      const docRef = doc(db, "blogs", postId);
      await updateDoc(docRef, updateData);
      router.push(`/blog/${slug}`);
    } catch (err) {
      console.error("Error updating blog:", err);
      alert("Failed to update post. Check console for details.");
    } finally {
      setSaving(false);
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 lg:px-24 bg-surface-container-lowest flex items-center justify-center">
        <div className="text-center text-outline">Checking authorization...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 lg:px-24 bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto animate-pulse space-y-8">
          <div className="h-6 w-32 bg-white/[0.06] rounded-full"></div>
          <div className="h-12 w-3/4 bg-white/[0.08] rounded-xl"></div>
          <div className="h-20 w-full bg-white/[0.04] rounded-2xl"></div>
          <div className="h-48 w-full bg-white/[0.04] rounded-2xl"></div>
          <div className="h-48 w-full bg-white/[0.04] rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-24 bg-surface-container-lowest relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-xs font-bold uppercase text-outline hover:text-primary hover:border-primary/30 transition-all duration-300 group shrink-0 self-start"
          >
            <span className="material-symbols-outlined text-[14px] transform group-hover:-translate-x-1 transition-transform duration-300">
              arrow_back
            </span>
            Back to Blog
          </Link>
          <div className="h-8 w-px bg-white/10 hidden sm:block shrink-0"></div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
              Edit{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Post
              </span>
            </h1>
          </div>
        </div>

        {/* Editor Form — identical structure to new/page.tsx */}
        <div className="space-y-8">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title..."
              className="w-full bg-transparent text-3xl md:text-4xl font-bold placeholder:text-outline/30 outline-none border-none caret-primary"
            />
            {title && (
              <p className="text-xs text-outline mt-2 font-mono">
                slug: /{generateSlug(title)}
              </p>
            )}
          </div>

          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Write a short excerpt / summary..."
            rows={2}
            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-sm text-on-surface placeholder:text-outline/30 outline-none focus:border-primary/40 transition-colors resize-none"
          />

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-outline">
              Cover Image URL
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-white/[0.02] border border-white/10 rounded-full px-5 py-3 text-sm text-on-surface placeholder:text-outline/30 outline-none focus:border-primary/40 transition-colors"
            />
            {coverImage && (
              <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).style.display = "none")
                  }
                />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-outline">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Flutter, Architecture, Web Dev"
              className="w-full bg-white/[0.02] border border-white/10 rounded-full px-5 py-3 text-sm text-on-surface placeholder:text-outline/30 outline-none focus:border-primary/40 transition-colors"
            />
            {tagsInput && (
              <div className="flex flex-wrap gap-2">
                {tagsInput
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            )}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          {/* Content Blocks */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-widest text-outline mb-4 block">
              Content Blocks
            </label>

            {blocks.map((block, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => setDragIndex(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={() => setDragIndex(null)}
                className={`group relative rounded-2xl border transition-all duration-200 ${
                  dragIndex === index
                    ? "border-primary/40 bg-primary/5 scale-[0.98]"
                    : "border-white/5 hover:border-white/15 bg-white/[0.01]"
                }`}
              >
                <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
                  <span className="material-symbols-outlined text-[16px] text-outline/30 cursor-grab active:cursor-grabbing hover:text-outline">
                    drag_indicator
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-outline/50">
                    {block.type}
                  </span>

                  {block.type === "heading" && (
                    <select
                      value={block.level}
                      onChange={(e) =>
                        updateBlock(index, {
                          level: Number(e.target.value) as 2 | 3,
                        })
                      }
                      className="ml-2 bg-white/[0.05] border border-white/10 rounded-lg px-2 py-0.5 text-[10px] text-outline outline-none"
                    >
                      <option value={2}>H2</option>
                      <option value={3}>H3</option>
                    </select>
                  )}

                  {block.type === "image" && (
                    <select
                      value={block.align}
                      onChange={(e) =>
                        updateBlock(index, {
                          align: e.target.value as
                            | "left"
                            | "center"
                            | "right"
                            | "full",
                        })
                      }
                      className="ml-2 bg-white/[0.05] border border-white/10 rounded-lg px-2 py-0.5 text-[10px] text-outline outline-none"
                    >
                      <option value="left">Align Left</option>
                      <option value="center">Align Center</option>
                      <option value="right">Align Right</option>
                      <option value="full">Full Width</option>
                    </select>
                  )}

                  {block.type === "code" && (
                    <input
                      type="text"
                      value={block.language || ""}
                      onChange={(e) =>
                        updateBlock(index, { language: e.target.value })
                      }
                      placeholder="Language..."
                      className="ml-2 bg-white/[0.05] border border-white/10 rounded-lg px-2 py-0.5 text-[10px] text-outline outline-none w-24 placeholder:text-outline/30"
                    />
                  )}

                  <div className="flex-1"></div>

                  <button
                    onClick={() => removeBlock(index)}
                    className="text-outline/30 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove block"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      close
                    </span>
                  </button>
                </div>

                <div className="p-4">
                  {block.type === "text" && (
                    <textarea
                      value={block.value}
                      onChange={(e) =>
                        updateBlock(index, { value: e.target.value })
                      }
                      placeholder="Write your paragraph..."
                      rows={4}
                      className="w-full bg-transparent outline-none text-on-surface/85 text-base leading-relaxed placeholder:text-outline/20 resize-y min-h-[80px]"
                    />
                  )}

                  {block.type === "heading" && (
                    <input
                      type="text"
                      value={block.value}
                      onChange={(e) =>
                        updateBlock(index, { value: e.target.value })
                      }
                      placeholder="Heading text..."
                      className={`w-full bg-transparent outline-none placeholder:text-outline/20 font-bold ${
                        block.level === 2 ? "text-2xl" : "text-xl"
                      }`}
                    />
                  )}

                  {block.type === "image" && (
                    <div className="space-y-3">
                      <input
                        type="url"
                        value={block.url}
                        onChange={(e) =>
                          updateBlock(index, { url: e.target.value })
                        }
                        placeholder="Image URL (https://...)"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-outline/20 outline-none focus:border-primary/40 transition-colors"
                      />
                      <input
                        type="text"
                        value={block.caption || ""}
                        onChange={(e) =>
                          updateBlock(index, { caption: e.target.value })
                        }
                        placeholder="Caption (optional)"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-outline/20 outline-none focus:border-primary/40 transition-colors"
                      />
                      {block.url && (
                        <div className="relative h-40 rounded-xl overflow-hidden border border-white/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={block.url}
                            alt={block.caption || "Preview"}
                            className="w-full h-full object-cover"
                            onError={(e) =>
                              ((e.target as HTMLImageElement).style.display =
                                "none")
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {block.type === "code" && (
                    <textarea
                      value={block.value}
                      onChange={(e) =>
                        updateBlock(index, { value: e.target.value })
                      }
                      placeholder="// Paste your code here..."
                      rows={6}
                      className="w-full bg-surface-container border border-white/5 rounded-xl px-4 py-3 font-mono text-sm text-primary/90 placeholder:text-outline/20 outline-none resize-y min-h-[100px]"
                    />
                  )}

                  {block.type === "quote" && (
                    <textarea
                      value={block.value}
                      onChange={(e) =>
                        updateBlock(index, { value: e.target.value })
                      }
                      placeholder="Write a quote..."
                      rows={3}
                      className="w-full bg-transparent outline-none italic text-on-surface/75 text-lg leading-relaxed placeholder:text-outline/20 resize-y min-h-[60px]"
                    />
                  )}
                </div>

                <div className="relative h-0">
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 z-10">
                    <button
                      onClick={() =>
                        setShowBlockMenu(
                          showBlockMenu === index ? null : index
                        )
                      }
                      className="w-10 h-10 rounded-full bg-surface-container border border-white/10 flex items-center justify-center text-outline hover:text-primary hover:border-primary/30 transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100 hover:!opacity-100"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        add
                      </span>
                    </button>

                    {showBlockMenu === index && (
                      <div
                        ref={blockMenuRef}
                        className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-surface-container border border-white/10 rounded-2xl p-2 shadow-2xl flex gap-1 min-w-max"
                      >
                        {BLOCK_OPTIONS.map((opt) => (
                          <button
                            key={opt.type}
                            onClick={() => insertBlock(index, opt.type)}
                            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl hover:bg-white/[0.05] transition-colors"
                          >
                            <span className="material-symbols-outlined text-[20px] text-outline">
                              {opt.icon}
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-outline/50">
                              {opt.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center pt-6">
              <div className="relative">
                <button
                  onClick={() =>
                    setShowBlockMenu(showBlockMenu === -1 ? null : -1)
                  }
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-dashed border-white/15 text-outline text-xs font-bold uppercase tracking-wider hover:border-primary/40 hover:text-primary transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    add
                  </span>
                  Add Block
                </button>

                {showBlockMenu === -1 && (
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-surface-container border border-white/10 rounded-2xl p-2 shadow-2xl flex gap-1 min-w-max">
                    {BLOCK_OPTIONS.map((opt) => (
                      <button
                        key={opt.type}
                        onClick={() =>
                          insertBlock(blocks.length - 1, opt.type)
                        }
                        className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl hover:bg-white/[0.05] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px] text-outline">
                          {opt.icon}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-outline/50">
                          {opt.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] text-on-surface text-sm font-bold hover:border-white/20 hover:bg-white/[0.05] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {saving ? (
                <span className="material-symbols-outlined text-[16px] animate-spin">
                  progress_activity
                </span>
              ) : (
                <span className="material-symbols-outlined text-[16px]">
                  save
                </span>
              )}
              Save as Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary/15 border border-primary/30 text-primary text-sm font-bold hover:bg-primary/25 hover:border-primary/50 transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {saving ? (
                <span className="material-symbols-outlined text-[16px] animate-spin">
                  progress_activity
                </span>
              ) : (
                <span className="material-symbols-outlined text-[16px]">
                  publish
                </span>
              )}
              {published ? "Update & Publish" : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
