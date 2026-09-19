"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAdminAuthed, clearAdminSession } from "@/lib/adminSession";
import { LogOut, LayoutGrid, Package, Settings, Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutGrid, match: (p: string) => p === "/admin" },
  { href: "/admin/products", label: "Products", icon: Package, match: (p: string) => p.startsWith("/admin/products") },
  { href: "/admin/settings", label: "Settings", icon: Settings, match: (p: string) => p.startsWith("/admin/settings") },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isAdminAuthed() && !isLogin) {
      router.replace("/admin/login");
    }
  }, [isLogin, router]);

  const NavContent = (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 font-mono text-sm uppercase tracking-widest transition-colors border-l-2",
              item.match(pathname)
                ? "text-secondary border-secondary"
                : "text-on-surface-variant border-transparent hover:text-secondary hover:border-outline-variant"
            )}
          >
            <Icon size={16} />
            {item.label}
          </Link>
        );
      })}
    </>
  );

  if (isLogin) {
    return <main className="min-h-screen bg-background">{children}</main>;
  }

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Top bar (mobile) */}
      <header className="md:hidden flex items-center justify-between px-4 py-4 border-b border-outline-variant bg-surface-container">
        <Link href="/admin" className="font-display text-xl uppercase tracking-tighter text-on-surface">
          Arada <span className="text-secondary-container">Admin</span>
        </Link>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="text-on-surface-variant hover:text-secondary transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>
      </header>

      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-outline-variant bg-surface-container min-h-screen sticky top-0">
        <Link href="/admin" className="font-display text-xl uppercase tracking-tighter text-on-surface px-5 py-5 border-b border-outline-variant">
          Arada <span className="text-secondary-container">Admin</span>
        </Link>
        <nav className="flex flex-col gap-1 p-3">{NavContent}</nav>
        <div className="mt-auto p-3 border-t border-outline-variant flex flex-col gap-2">
          <Link
            href="/"
            className="px-4 py-2 font-mono text-sm text-on-surface-variant uppercase tracking-widest hover:text-secondary transition-colors"
          >
            Back to site
          </Link>
          <button
            onClick={() => {
              clearAdminSession();
              router.push("/admin/login");
            }}
            className="flex items-center gap-2 px-4 py-2 font-mono text-sm text-error uppercase tracking-widest hover:text-error/80 transition-colors"
          >
            <LogOut size={14} />
            Log out
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/60" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute top-0 right-0 h-full w-64 bg-surface-container border-l border-outline-variant flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-1 p-3 pt-12">{NavContent}</nav>
            <div className="mt-auto p-3 border-t border-outline-variant flex flex-col gap-2">
              <Link href="/" onClick={() => setMobileOpen(false)} className="px-4 py-2 font-mono text-sm text-on-surface-variant uppercase tracking-widest hover:text-secondary">
                Back to site
              </Link>
              <button
                onClick={() => {
                  clearAdminSession();
                  router.push("/admin/login");
                }}
                className="flex items-center gap-2 px-4 py-2 font-mono text-sm text-error uppercase tracking-widest"
              >
                <LogOut size={14} />
                Log out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1">{children}</div>
    </main>
  );
}