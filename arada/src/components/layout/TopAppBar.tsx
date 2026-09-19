"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/drops", label: "SHOP" },
  { href: "/plain", label: "PLAIN" },
  { href: "/studio", label: "STUDIO" },
  { href: "/about", label: "ABOUT" },
];

export function TopAppBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 md:px-12 py-4 bg-background/80 backdrop-blur-md border-b border-outline-variant">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center" aria-label="ARADA home">
            <img
              src="/aradalogo.png"
              alt="ARADA"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </Link>
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "font-mono text-sm font-medium tracking-widest transition-colors duration-200",
                  pathname === link.href
                    ? "text-secondary-container border-b-2 border-secondary-container pb-1"
                    : "text-on-surface-variant hover:text-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/studio"
            className="hidden md:block bg-primary-container text-white font-display text-base px-6 py-2 uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,0,255,0.5)] transition-all"
          >
            DESIGN YOURS
          </Link>
          <button className="p-2 text-on-surface hover:text-secondary transition-colors">
            <ShoppingBag size={20} />
          </button>
          <button className="p-2 text-on-surface hover:text-secondary transition-colors hidden md:block">
            <User size={20} />
          </button>
          <button
            className="p-2 text-on-surface hover:text-secondary transition-colors md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile slide-in nav */}
      <div className={cn("fixed inset-0 z-40 md:hidden pointer-events-none", mobileOpen && "pointer-events-auto")}>
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />
        {/* Slide-in panel from the right */}
        <nav
          className={cn(
            "absolute top-0 right-0 h-full w-[280px] flex flex-col gap-6 px-6 py-8 bg-surface-container border-l border-outline-variant shadow-2xl transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-base uppercase tracking-tighter text-outline">
              ARADA
            </span>
            <button
              className="p-1 text-on-surface-variant hover:text-secondary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          <div className="h-px bg-outline-variant" />
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "font-mono text-sm tracking-widest py-2 transition-colors",
                  pathname === link.href
                    ? "text-secondary-container"
                    : "text-on-surface-variant hover:text-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link
                href="/studio"
                onClick={() => setMobileOpen(false)}
                className="block bg-primary-container text-white font-display text-base px-6 py-3 uppercase tracking-wider text-center"
              >
                DESIGN YOURS
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
