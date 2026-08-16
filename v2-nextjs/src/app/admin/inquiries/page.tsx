"use client";

import { useState } from "react";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export default function AdminInquiriesPage() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useState(() => {
    // Basic verification on client side using utility
    import("@/lib/adminAuth").then(({ checkAdminAuth }) => {
      if (checkAdminAuth()) {
        // Automatically fetch inquiries if cookie matches by verifying empty password logic
        // or just let them trigger fetch when they key in the password once.
        // For security, we'll run a quick empty fetch with dummy token if cookie exists.
        fetch("/api/admin/inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: "SESSION_COOKIE" }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.inquiries) {
              setInquiries(data.inquiries);
              setIsAuthorized(true);
            }
          })
          .catch(() => {});
      }
    });
  });


  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        throw new Error("Unauthorized access. Invalid password.");
      }

      // Set cookie to remember admin session
      document.cookie = `admin_session=true; path=/; max-age=86400; SameSite=Strict`;

      const data = await res.json();
      setInquiries(data.inquiries || []);
      setIsAuthorized(true);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center bg-surface-container-lowest">
        <div className="max-w-md w-full glass-card p-8 rounded-3xl border border-outline/20 dark:border-white/10 text-center">
          <span className="material-symbols-outlined text-5xl text-primary mb-4">lock</span>
          <h1 className="text-2xl font-bold mb-6">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-surface-variant/20 dark:bg-white/5 border border-outline/20 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50"
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary dark:bg-[#e0ffff] text-on-primary dark:text-[#0a0f1a] py-3 rounded-xl font-bold uppercase text-xs tracking-wider"
            >
              {loading ? "Verifying..." : "View Inquiries"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-24 bg-surface-container-lowest">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Contact Inquiries</h1>
            <p className="text-outline text-sm mt-1">List of all submitted contact form messages</p>
          </div>
          <button
            onClick={() => {
              document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
              setIsAuthorized(false);
              setPassword("");
            }}
            className="text-xs font-bold uppercase tracking-wider text-secondary border border-secondary/20 hover:bg-secondary/10 px-4 py-2 rounded-xl transition-all"
          >
            Lock Dashboard
          </button>
        </div>

        {inquiries.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-3xl border border-outline/10">
            <span className="material-symbols-outlined text-4xl text-outline mb-3">inbox</span>
            <p className="text-outline">No inquiries found yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="glass-card p-6 md:p-8 rounded-3xl border border-outline/10 dark:border-white/5 space-y-4 hover:border-primary/30 transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-on-surface">{inquiry.name}</h2>
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {inquiry.email}
                    </a>
                  </div>
                  <div className="text-xs text-outline font-medium">
                    {new Date(inquiry.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="pt-2 border-t border-outline/10">
                  <div className="text-xs font-bold uppercase text-secondary mb-1">Subject</div>
                  <div className="text-sm font-semibold mb-3">{inquiry.subject}</div>
                  <div className="text-xs font-bold uppercase text-secondary mb-1">Message</div>
                  <p className="text-sm text-on-surface-variant dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {inquiry.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
