import { TopAppBar } from "@/components/layout/TopAppBar";
import { Marquee } from "@/components/ui/Marquee";
import Link from "next/link";
import { FeaturedProducts } from "@/components/product/FeaturedProducts";

export default function Home() {
  return (
    <>
      <TopAppBar />
      <main className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto px-4 md:px-12 py-8 md:py-16 gap-16 md:gap-32">
        {/* Hero Section */}
        <section className="flex flex-col gap-8 md:gap-12 relative">
          <div className="relative w-full aspect-[4/5] md:aspect-[21/9] bg-surface-dim overflow-hidden border border-outline-variant">
            <img
              alt="ARADA collection"
              className="object-cover w-full h-full opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 ease-in-out"
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600&q=80"
            />
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-background/50 backdrop-blur-sm border border-secondary px-3 py-1">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
              <span className="font-mono text-sm text-secondary tracking-widest">LIVE</span>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:w-2/3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="font-mono text-sm text-on-surface-variant tracking-[0.2em] uppercase">
                ARADA &middot; AFTER DARK
              </span>
            </div>
            <h1 className="font-display text-[64px] md:text-[80px] leading-[0.9] text-on-surface tracking-tighter uppercase">
              BUILT TO
              <br />
              LAST.
            </h1>
            <p className="font-body text-lg text-on-surface-variant max-w-xl">
              Custom heavyweight apparel, made to order and printed in-house.
              No minimums. Numbered runs only.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                href="/studio"
                className="bg-primary-container text-white font-display text-lg px-8 py-4 uppercase glow-hover transition-all duration-300 w-full sm:w-auto text-center border border-primary-container tracking-wider"
              >
                DESIGN YOURS
              </Link>
              <Link
                href="/drops"
                className="bg-transparent text-secondary border border-secondary font-display text-lg px-8 py-4 uppercase hover:bg-secondary/10 transition-all duration-300 w-full sm:w-auto text-center tracking-wider"
              >
                SEE THE DROP
              </Link>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <Marquee items={["NEW DROP 01", "48h TURNAROUND", "MADE TO ORDER", "NUMBERED RUNS"]} />

        {/* Stats Banner */}
        <section className="grid grid-cols-3 gap-0 border border-outline-variant py-8">
          <div className="flex flex-col border-r border-outline-variant px-4">
            <span className="font-display text-3xl md:text-[48px] text-white mb-2">
              240<span className="text-secondary">+</span>
            </span>
            <span className="font-mono text-sm md:text-xs text-on-surface-variant uppercase max-w-[120px]">
              PIECES THIS DROP
            </span>
          </div>
          <div className="flex flex-col border-r border-outline-variant px-4">
            <span className="font-display text-3xl md:text-[48px] text-white mb-2">48h</span>
            <span className="font-mono text-sm md:text-xs text-on-surface-variant uppercase max-w-[120px]">
              TURNAROUND
            </span>
          </div>
          <div className="flex flex-col pl-4">
            <span className="font-display text-3xl md:text-[48px] text-white mb-2">1/1</span>
            <span className="font-mono text-sm md:text-xs text-on-surface-variant uppercase max-w-[120px]">
              MADE TO ORDER
            </span>
          </div>
        </section>

        {/* Featured Products */}
        <section className="flex flex-col gap-8">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-4">
              <div className="h-1 w-6 bg-secondary-container"></div>
              <span className="font-mono text-sm text-secondary-container tracking-widest uppercase">
                FEATURED
              </span>
            </div>
            <Link
              href="/drops"
              className="font-mono text-sm text-on-surface-variant hover:text-secondary uppercase flex items-center gap-1 transition-colors"
            >
              VIEW ALL &rarr;
            </Link>
          </div>
          <FeaturedProducts />
        </section>
      </main>
    </>
  );
}
