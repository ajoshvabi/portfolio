"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

type TechItem = {
  id?: string;
  name: string;
  icon: string;
  color: "text-primary" | "text-secondary";
  bg: "bg-primary/5" | "bg-secondary/5";
  border: "hover:border-primary" | "hover:border-secondary";
  hoverBg: "group-hover:bg-primary/20" | "group-hover:bg-secondary/20";
  order: number;
};

const defaultStack = [
  { name: "Flutter", icon: "flutter", color: "text-primary" as const, bg: "bg-primary/5" as const, border: "hover:border-primary" as const, hoverBg: "group-hover:bg-primary/20" as const, order: 1 },
  { name: "Dart", icon: "code", color: "text-secondary" as const, bg: "bg-secondary/5" as const, border: "hover:border-secondary" as const, hoverBg: "group-hover:bg-secondary/20" as const, order: 2 },
  { name: "Firebase", icon: "local_fire_department", color: "text-primary" as const, bg: "bg-primary/5" as const, border: "hover:border-primary" as const, hoverBg: "group-hover:bg-primary/20" as const, order: 3 },
  { name: "Node.js", icon: "javascript", color: "text-secondary" as const, bg: "bg-secondary/5" as const, border: "hover:border-secondary" as const, hoverBg: "group-hover:bg-secondary/20" as const, order: 4 },
  { name: "MongoDB", icon: "database", color: "text-primary" as const, bg: "bg-primary/5" as const, border: "hover:border-primary" as const, hoverBg: "group-hover:bg-primary/20" as const, order: 5 },
  { name: "React.js", icon: "html", color: "text-secondary" as const, bg: "bg-secondary/5" as const, border: "hover:border-secondary" as const, hoverBg: "group-hover:bg-secondary/20" as const, order: 6 },
  { name: "Express.js", icon: "api", color: "text-primary" as const, bg: "bg-primary/5" as const, border: "hover:border-primary" as const, hoverBg: "group-hover:bg-primary/20" as const, order: 7 },
  { name: "MySQL", icon: "database", color: "text-secondary" as const, bg: "bg-secondary/5" as const, border: "hover:border-secondary" as const, hoverBg: "group-hover:bg-secondary/20" as const, order: 8 },
  { name: "SQLite", icon: "storage", color: "text-primary" as const, bg: "bg-primary/5" as const, border: "hover:border-primary" as const, hoverBg: "group-hover:bg-primary/20" as const, order: 9 },
  { name: "PHP", icon: "code", color: "text-secondary" as const, bg: "bg-secondary/5" as const, border: "hover:border-secondary" as const, hoverBg: "group-hover:bg-secondary/20" as const, order: 10 },
  { name: "JavaScript", icon: "javascript", color: "text-primary" as const, bg: "bg-primary/5" as const, border: "hover:border-primary" as const, hoverBg: "group-hover:bg-primary/20" as const, order: 11 },
  { name: "Bootstrap", icon: "grid_view", color: "text-secondary" as const, bg: "bg-secondary/5" as const, border: "hover:border-secondary" as const, hoverBg: "group-hover:bg-secondary/20" as const, order: 12 },
];

export default function AdminStackPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Listing state
  const [techItems, setTechItems] = useState<TechItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [theme, setTheme] = useState<"primary" | "secondary">("primary");
  const [saving, setSaving] = useState(false);

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    import("@/lib/adminAuth").then(({ checkAdminAuth }) => {
      const authorized = checkAdminAuth();
      setIsAuthorized(authorized);
      setCheckingAuth(false);
      if (!authorized) {
        router.replace("/");
      } else {
        fetchTechItems();
      }
    });
  }, [router]);

  async function fetchTechItems() {
    try {
      const q = query(collection(db, "tech_stack"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      
      let items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as TechItem));
      
      // If collection is empty, backfill with defaultStack
      if (items.length === 0) {
        setLoadingItems(true);
        const batchAdd = defaultStack.map((item) => addDoc(collection(db, "tech_stack"), item));
        await Promise.all(batchAdd);
        const newSnapshot = await getDocs(q);
        items = newSnapshot.docs.map((d) => ({ id: d.id, ...d.data() } as TechItem));
      }

      setTechItems(items);
    } catch (err) {
      console.error("Error fetching tech stack:", err);
    } finally {
      setLoadingItems(false);
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !icon.trim()) {
      alert("Name and Material Icon code are required.");
      return;
    }

    setSaving(true);
    try {
      // New added item always goes to the end
      const nextOrder = techItems.length > 0 ? Math.max(...techItems.map(t => t.order)) + 1 : 1;

      const newItem: Omit<TechItem, "id"> = {
        name: name.trim(),
        icon: icon.trim(),
        color: theme === "primary" ? "text-primary" : "text-secondary",
        bg: theme === "primary" ? "bg-primary/5" : "bg-secondary/5",
        border: theme === "primary" ? "hover:border-primary" : "hover:border-secondary",
        hoverBg: theme === "primary" ? "group-hover:bg-primary/20" : "group-hover:bg-secondary/20",
        order: nextOrder,
      };

      await addDoc(collection(db, "tech_stack"), newItem);
      setName("");
      setIcon("");
      fetchTechItems();
    } catch (err) {
      console.error("Error adding tech item:", err);
      alert("Failed to save tech item.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this tech stack item?")) return;
    try {
      await deleteDoc(doc(db, "tech_stack", id));
      fetchTechItems();
    } catch (err) {
      console.error("Error deleting tech item:", err);
      alert("Failed to delete item.");
    }
  }

  // Drag and drop functions
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const list = [...techItems];
    const [removed] = list.splice(draggedIndex, 1);
    list.splice(targetIndex, 0, removed);

    // Optimistic local state update
    setTechItems(list);
    setDraggedIndex(null);

    // Save rearranged orders to Firestore
    try {
      await Promise.all(
        list.map((item, idx) => {
          if (item.id) {
            const docRef = doc(db, "tech_stack", item.id);
            return updateDoc(docRef, { order: idx + 1 });
          }
          return Promise.resolve();
        })
      );
    } catch (err) {
      console.error("Error updating tech stack order:", err);
      alert("Failed to save new order.");
    }
  };

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

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-24 bg-surface-container-lowest relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Form: Add Tech */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Manage Tech Stack</h1>
            <p className="text-outline text-sm mt-1">Drag and drop items on the right to rearrange their scrolling order.</p>
          </div>

          <form onSubmit={handleAdd} className="glass-card p-8 rounded-3xl border border-outline/10 dark:border-white/5 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-outline">Tech Name *</label>
              <input
                type="text"
                placeholder="e.g. Next.js"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-surface-variant/20 dark:bg-white/5 border border-outline/20 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-outline">Material Icon Name *</label>
              <input
                type="text"
                placeholder="e.g. code, database, html"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                required
                className="w-full bg-surface-variant/20 dark:bg-white/5 border border-outline/20 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50"
              />
              <p className="text-[10px] text-outline">
                Use Google Material Symbol names. E.g. <code className="text-primary">database</code>, <code className="text-primary">language</code>, <code className="text-primary">code</code>.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-outline">Color Accent</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as "primary" | "secondary")}
                className="w-full bg-surface-variant/20 dark:bg-white/5 border border-outline/20 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none"
              >
                <option value="primary">Cyan (Primary)</option>
                <option value="secondary">Purple (Secondary)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-primary dark:bg-[#e0ffff] text-on-primary dark:text-[#0a0f1a] py-3 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2"
            >
              {saving ? "Saving..." : "Add Tech"}
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </form>
        </div>

        {/* Right List: Display Current Tech Items */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xl font-bold">Current Items (Drag to Rearrange)</h2>
          {loadingItems ? (
            <div className="text-outline">Loading items...</div>
          ) : (
            <div className="flex flex-col gap-3">
              {techItems.map((item, index) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className="glass-card p-4 rounded-2xl flex items-center justify-between border border-outline/10 hover:border-primary/50 hover:bg-white/[0.02] cursor-grab active:cursor-grabbing transition-all select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline text-lg select-none">drag_indicator</span>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.bg}`}>
                      <span className={`material-symbols-outlined text-xl ${item.color}`}>{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{item.name}</h3>
                      <p className="text-[10px] text-outline">Position Order: {index + 1}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => item.id && handleDelete(item.id)}
                    className="text-red-400 hover:text-red-300 p-2 relative z-10"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
