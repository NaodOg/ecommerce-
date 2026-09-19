import { TopAppBar } from "@/components/layout/TopAppBar";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <TopAppBar />
      <main className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto px-4 md:px-12 py-8 md:py-16 gap-16 md:gap-24">
        {/* Hero */}
        <section className="flex flex-col gap-6 md:w-2/3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <span className="font-mono text-sm text-on-surface-variant tracking-[0.2em] uppercase">
              ARADA &middot; GARMENT HOUSE &amp; PRINT STUDIO
            </span>
          </div>
          <h1 className="font-display text-[48px] md:text-[80px] leading-[0.9] text-on-surface tracking-tighter uppercase">
            WE SEW.
            <br />
            <span className="text-secondary-container">THEN WE PRINT.</span>
          </h1>
          <p className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed">
            Arada is a full garment operation, not just a printery. We run our
            own cut-and-sew line for plain, finished garments — and on top of
            that, we print custom, numbered designs. Two shops under one roof.
          </p>
        </section>

        {/* Garment Shop */}
        <section className="grid lg:grid-cols-2 border border-outline-variant bg-surface-dim overflow-hidden">
          <div className="relative min-h-[320px] lg:min-h-[520px]">
            <img
              alt="Garment sewing workshop"
              className="absolute inset-0 w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1000&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:hidden"></div>
            <div className="absolute top-4 left-4 font-mono text-sm text-secondary tracking-widest opacity-70">
              SHOP.01 / GARMENT LINE
            </div>
          </div>

          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center gap-6 relative">
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm text-primary-container tracking-widest font-bold">01</span>
              <span className="font-display text-lg text-on-surface-variant tracking-[0.2em] uppercase">THE GARMENT SHOP</span>
            </div>
            <h2 className="font-display text-3xl md:text-[44px] text-on-surface uppercase leading-none tracking-tighter">
              PLAIN GARMENTS,
              <br />
              SEWN IN-HOUSE.
            </h2>
            <p className="font-body text-lg md:text-lg text-on-surface-variant leading-relaxed">
              We cut and sew plain garments — tees, hoodies, tote bags and
              more — and sell them clean, with no printing. Whether you need
              blanks for another brand, stock for your shop, or just a
              no-graphics tee done right, it all comes off our own machines.
            </p>
            <p className="font-mono text-sm text-on-surface-variant uppercase tracking-widest">
              Made to order &middot; No minimums &middot; Local production
            </p>
            <div className="pt-2">
              <Link
                href="/plain"
                className="glow-hover bg-primary-container text-white font-display text-base md:text-base px-8 py-4 uppercase tracking-wider brutal-border-accent inline-flex items-center gap-3 hover:bg-[#0000e6] active:scale-95 transition-all duration-200"
              >
                SHOP PLAIN GOODS
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Print Studio */}
        <section className="grid lg:grid-cols-2 border border-outline-variant bg-surface-dim overflow-hidden">
          <div className="order-2 lg:order-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center gap-6 relative">
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm text-primary-container tracking-widest font-bold">02</span>
              <span className="font-display text-lg text-on-surface-variant tracking-[0.2em] uppercase">THE PRINT STUDIO</span>
            </div>
            <h2 className="font-display text-3xl md:text-[44px] text-on-surface uppercase leading-none tracking-tighter">
              YOUR DESIGN.
              <br />
              <span className="text-primary-container">OUR PRESS.</span>
            </h2>
            <p className="font-body text-lg md:text-lg text-on-surface-variant leading-relaxed">
              Drop your artwork in the studio, build it live on a heavy blank,
              then send it to print. Every run is numbered and made to order —
              what you make is the only one like it.
            </p>
            <p className="font-mono text-sm text-on-surface-variant uppercase tracking-widest">
              Numbered runs &middot; 48h turnaround &middot; No minimums
            </p>
            <div className="pt-2">
              <Link
                href="/studio"
                className="glow-hover bg-primary-container text-white font-display text-base md:text-base px-8 py-4 uppercase tracking-wider brutal-border-accent inline-flex items-center gap-3 hover:bg-[#0000e6] active:scale-95 transition-all duration-200"
              >
                OPEN THE STUDIO
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative min-h-[320px] lg:min-h-[520px]">
            <img
              alt="Screen printing press"
              className="absolute inset-0 w-full h-full object-cover"
              src="/studio-press.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent lg:hidden"></div>
            <div className="absolute top-4 right-4 font-mono text-sm text-secondary tracking-widest opacity-70">
              SHOP.02 / PRINT LINE
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="grid grid-cols-3 gap-0 border border-outline-variant py-8">
          <div className="flex flex-col border-r border-outline-variant px-4">
            <span className="font-display text-3xl md:text-[48px] text-white mb-2">
              2<span className="text-secondary">+</span>
            </span>
            <span className="font-mono text-sm md:text-xs text-on-surface-variant uppercase max-w-[120px]">
              SHOPS, ONE ROOF
            </span>
          </div>
          <div className="flex flex-col border-r border-outline-variant px-4">
            <span className="font-display text-3xl md:text-[48px] text-white mb-2">0</span>
            <span className="font-mono text-sm md:text-xs text-on-surface-variant uppercase max-w-[120px]">
              MINIMUMS, EVER
            </span>
          </div>
          <div className="flex flex-col pl-4">
            <span className="font-display text-3xl md:text-[48px] text-white mb-2">1/1</span>
            <span className="font-mono text-sm md:text-xs text-on-surface-variant uppercase max-w-[120px]">
              NUMBERED RUNS
            </span>
          </div>
        </section>
      </main>
    </>
  );
}