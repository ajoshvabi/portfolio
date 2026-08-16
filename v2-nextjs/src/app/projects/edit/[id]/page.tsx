"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.id as string;

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [projectType, setProjectType] = useState<"mobile" | "web">("mobile");
  const [image, setImage] = useState("");
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");
  const [stackInput, setStackInput] = useState("");
  const [theme, setTheme] = useState<"primary" | "secondary">("primary");
  const [order, setOrder] = useState("0");
  const [featured, setFeatured] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("@/lib/adminAuth").then(({ checkAdminAuth }) => {
      const authorized = checkAdminAuth();
      setIsAuthorized(authorized);
      setCheckingAuth(false);
      if (!authorized) {
        router.replace("/projects");
      }
    });
  }, [router]);

  useEffect(() => {
    async function fetchProject() {
      if (!projectId) return;
      try {
        const docRef = doc(db, "projects", projectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setDescription(data.description || "");
          setCategory(data.category || "");
          setProjectType(data.type || "mobile");
          setImage(data.image || "");
          setGithub(data.github || "");
          setDemo(data.demo || "");
          setStackInput((data.stack || []).join(", "));
          setTheme(data.theme || "primary");
          setOrder(String(data.order ?? 0));
          setFeatured(data.featured || false);
        } else {
          alert("Project not found.");
          router.push("/projects");
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    }
    if (isAuthorized) {
      fetchProject();
    }
  }, [projectId, isAuthorized, router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !category.trim() || !image.trim()) {
      alert("Please fill in all required fields (Title, Description, Category, Image URL).");
      return;
    }

    setSaving(true);
    try {
      const stack = stackInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const projectData = {
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        type: projectType,
        image: image.trim(),
        github: github.trim() || null,
        demo: demo.trim() || null,
        stack,
        theme,
        order: parseInt(order, 10) || 0,
        featured,
      };

      const docRef = doc(db, "projects", projectId);
      await updateDoc(docRef, projectData);
      router.push("/projects");
    } catch (err) {
      console.error("Error updating project:", err);
      alert("Failed to update project. Check console for details.");
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-24 bg-surface-container-lowest relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-xs font-bold uppercase text-outline hover:text-primary hover:border-primary/30 transition-all duration-300 group shrink-0 self-start"
          >
            <span className="material-symbols-outlined text-[14px] transform group-hover:-translate-x-1 transition-transform duration-300">
              arrow_back
            </span>
            Back to Repositories
          </Link>
          <div className="h-8 w-px bg-white/10 hidden sm:block shrink-0"></div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
              Edit{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Project
              </span>
            </h1>
          </div>
        </div>

        {/* Editor Form */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* Title */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-outline block mb-2">
              Project Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Smart Wallet App"
              className="w-full bg-white/[0.02] border border-white/10 rounded-full px-5 py-3 text-sm text-on-surface placeholder:text-outline/30 outline-none focus:border-primary/40 transition-colors"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-outline block mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the project..."
              rows={4}
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-sm text-on-surface placeholder:text-outline/30 outline-none focus:border-primary/40 transition-colors resize-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-outline block mb-2">
              Category *
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Android Development, Next.js, Flutter UI"
              className="w-full bg-white/[0.02] border border-white/10 rounded-full px-5 py-3 text-sm text-on-surface placeholder:text-outline/30 outline-none focus:border-primary/40 transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Type */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-outline block mb-2">
                Project Type
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value as "mobile" | "web")}
                className="w-full bg-surface-container border border-white/10 rounded-full px-5 py-3 text-sm text-on-surface outline-none focus:border-primary/40 transition-colors"
              >
                <option value="mobile">Mobile (Android/iOS)</option>
                <option value="web">Web Application</option>
              </select>
            </div>

            {/* Theme */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-outline block mb-2">
                Card Theme Color
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as "primary" | "secondary")}
                className="w-full bg-surface-container border border-white/10 rounded-full px-5 py-3 text-sm text-on-surface outline-none focus:border-primary/40 transition-colors"
              >
                <option value="primary">Primary (Teal/Cyan)</option>
                <option value="secondary">Secondary (Purple/Pink)</option>
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-outline block">
              Image URL *
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/project-preview.jpg"
              className="w-full bg-white/[0.02] border border-white/10 rounded-full px-5 py-3 text-sm text-on-surface placeholder:text-outline/30 outline-none focus:border-primary/40 transition-colors"
              required
            />
            {image && (
              <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10 bg-surface-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt="Project preview"
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).style.display = "none")
                  }
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Github Link */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-outline block mb-2">
                Github Repository Link
              </label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full bg-white/[0.02] border border-white/10 rounded-full px-5 py-3 text-sm text-on-surface placeholder:text-outline/30 outline-none focus:border-primary/40 transition-colors"
              />
            </div>

            {/* Demo Link */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-outline block mb-2">
                Live Demo / Store Link
              </label>
              <input
                type="url"
                value={demo}
                onChange={(e) => setDemo(e.target.value)}
                placeholder="https://..."
                className="w-full bg-white/[0.02] border border-white/10 rounded-full px-5 py-3 text-sm text-on-surface placeholder:text-outline/30 outline-none focus:border-primary/40 transition-colors"
              />
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-outline block mb-2">
              Tech Stack (comma-separated)
            </label>
            <input
              type="text"
              value={stackInput}
              onChange={(e) => setStackInput(e.target.value)}
              placeholder="e.g. Flutter, Kotlin, Firebase, Next.js"
              className="w-full bg-white/[0.02] border border-white/10 rounded-full px-5 py-3 text-sm text-on-surface placeholder:text-outline/30 outline-none focus:border-primary/40 transition-colors"
            />
            {stackInput && (
              <div className="flex flex-wrap gap-2 mt-3">
                {stackInput
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-outline/10 text-outline rounded-full text-[10px] font-bold uppercase"
                    >
                      {tech}
                    </span>
                  ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Display Order */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-outline block mb-2">
                Display Order (integer)
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                placeholder="0"
                className="w-full bg-white/[0.02] border border-white/10 rounded-full px-5 py-3 text-sm text-on-surface placeholder:text-outline/30 outline-none focus:border-primary/40 transition-colors"
              />
            </div>

            {/* Featured Switch */}
            <div className="flex items-center gap-3 pt-6 sm:pt-4">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-white/10 bg-white/[0.02] text-primary focus:ring-primary focus:ring-offset-0"
              />
              <label
                htmlFor="featured"
                className="text-xs font-bold uppercase tracking-widest text-outline cursor-pointer select-none"
              >
                Featured Project
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pt-6"></div>

          <div className="flex justify-end gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] text-on-surface text-sm font-bold hover:border-white/20 hover:bg-white/[0.05] transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary/15 border border-primary/30 text-primary text-sm font-bold hover:bg-primary/25 hover:border-primary/50 transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {saving ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin">
                    progress_activity
                  </span>
                  Updating...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  Update Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
