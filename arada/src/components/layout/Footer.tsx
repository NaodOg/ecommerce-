import Link from "next/link";
import { ArrowUpRight, Send, Phone } from "lucide-react";

const shopLinks = [
  { href: "/drops", label: "All Products" },
  { href: "/plain", label: "Plain Goods" },
  { href: "/studio", label: "Design Yours" },
  { href: "/drops", label: "Latest Drop" },
];

const infoLinks = [
  { href: "/about", label: "About" },
  { href: "/mockup-test", label: "Mockup" },
];

const callLink = { href: "tel:+251920233085", label: "Call the shop" };

const socials = [
  { label: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/aradatshirts/" },
  { label: "TikTok", icon: TiktokIcon, href: "#" },
  { label: "Telegram", icon: Send, href: "https://t.me/aradatshirts" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant bg-surface-container-low mt-auto">
      {/* Top ticker */}
      <div className="w-full overflow-hidden border-b border-outline-variant py-3">
        <div className="marquee flex items-center gap-8 font-mono text-sm text-on-surface-variant uppercase tracking-widest whitespace-nowrap">
          <span>Make to order</span>
          <span>48h turnaround</span>
          <span>Numbered runs only</span>
          <span>No minimums</span>
          <span>Built to last</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <Link href="/" className="flex items-center" aria-label="ARADA home">
            <img
              src="/aradalogo.png"
              alt="ARADA"
              className="h-14 md:h-20 w-auto object-contain"
            />
          </Link>
            <p className="font-mono text-sm text-on-surface-variant uppercase tracking-widest max-w-xs leading-relaxed">
              Built to last. Made to order.
              <br />
              Numbered runs only.
            </p>
            <Link
              href="/drops"
              className="inline-flex items-center gap-2 w-fit bg-primary-container text-white font-display text-base px-6 py-3 uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,0,255,0.5)] transition-all"
            >
              See the drop <ArrowUpRight size={16} strokeWidth={2} />
            </Link>
          </div>

          {/* Columns */}
          <div className="md:col-span-3 flex flex-col gap-2">
            <span className="font-mono text-sm text-secondary-container uppercase tracking-widest mb-3">
              Shop
            </span>
            {shopLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body text-base text-on-surface-variant hover:text-secondary transition-colors w-fit"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            <span className="font-mono text-sm text-secondary-container uppercase tracking-widest mb-3">
              Info
            </span>
            {infoLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body text-base text-on-surface-variant hover:text-secondary transition-colors w-fit"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={callLink.href}
              className="flex items-center gap-2 font-body text-base text-on-surface-variant hover:text-secondary transition-colors w-fit"
            >
              <Phone size={15} strokeWidth={1.75} />
              {callLink.label}
            </a>
          </div>

          {/* Socials */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <span className="font-mono text-sm text-secondary-container uppercase tracking-widest">
              Follow
            </span>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={social.label}
                  className="p-2 border border-outline-variant text-on-surface-variant hover:text-secondary hover:border-secondary transition-colors"
                >
                  <social.icon size={18} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 md:mt-16 pt-6 border-t border-outline-variant flex flex-col md:flex-row justify-between gap-3">
          <span className="font-mono text-sm text-outline uppercase tracking-widest">
            &copy; 2026 ARADA. Built to last.
          </span>
          <span className="font-mono text-sm text-outline uppercase tracking-widest">
            Made to order &middot; Numbered runs only
          </span>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon({ size = 18, strokeWidth = 1.75 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TiktokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}