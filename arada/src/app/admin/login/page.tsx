"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { setAdminSession } from "@/lib/adminSession";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const verify = useAction(api.auth.verifyAdminPassword);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError(null);
    try {
      const ok = await verify({ password });
      if (ok) {
        setAdminSession();
        router.replace("/admin");
      } else {
        setError("Incorrect password.");
      }
    } catch (err) {
      setError("Could not reach the admin server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm border border-outline-variant bg-surface-container p-8">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-secondary">
            <Lock size={18} />
            <span className="font-mono text-sm uppercase tracking-widest">Restricted</span>
          </div>
          <h1 className="font-display text-3xl uppercase tracking-tighter text-on-surface text-center">
            Arada Admin
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter passcode"
            autoFocus
            className="w-full px-4 py-3 bg-surface-dim border border-outline-variant text-on-surface font-body focus:outline-none focus:border-secondary"
          />
          {error && (
            <p className="font-mono text-sm text-error uppercase tracking-widest">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-primary-container text-white font-display text-base px-6 py-3 uppercase tracking-wider transition-all hover:shadow-[0_0_15px_rgba(0,0,255,0.5)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Checking..." : "Enter"}
          </button>
        </form>
      </div>
    </main>
  );
}