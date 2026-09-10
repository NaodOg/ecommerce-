"use client";

import { TopAppBar } from "@/components/layout/TopAppBar";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <TopAppBar />
      <main className="flex-grow flex flex-col items-center justify-center pt-8 pb-24 md:pb-8 px-4 md:px-12 w-full max-w-[1440px] mx-auto">
        <section className="w-full flex flex-col lg:flex-row brutal-border bg-surface-dim overflow-hidden my-8">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-[600px] relative">
            <img
              alt="Screen printing press"
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity"
              src="https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&q=80"
            />
            <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 lg:hidden"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-surface-dim opacity-90 hidden lg:block"></div>
            <div className="absolute top-4 left-4 font-mono text-[10px] text-secondary tracking-widest opacity-60">
              SYS.CAM.02_ACTIVE<br />LOC: WAREHOUSE_4B
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-secondary tracking-widest opacity-60 flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              REC
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative glass-panel">
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(#00BFFF 1px, transparent 1px), linear-gradient(90deg, #00BFFF 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            ></div>
            <div className="relative z-10 space-y-6 max-w-lg">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-primary-container tracking-widest font-bold">02</span>
                <span className="font-display text-lg text-on-surface-variant tracking-[0.2em] uppercase">THE IDEA</span>
              </div>
              <h2 className="font-display text-3xl md:text-[48px] text-on-surface uppercase leading-none tracking-tighter">
                YOUR DESIGN.
                <br />
                <span className="text-primary-container">OUR PRESS.</span>
              </h2>
              <p className="font-body text-base md:text-lg text-on-surface-variant mt-6 leading-relaxed max-w-md">
                Drop your artwork onto a heavyweight blank in the 3D studio, spin
                it, feel the weight, then send it to print. What you make is the
                only one like it.
              </p>
              <div className="pt-8">
                <Link
                  href="/studio"
                  className="glow-hover bg-primary-container text-white font-display text-sm md:text-base px-8 py-4 uppercase tracking-wider brutal-border-accent inline-flex items-center justify-center gap-3 hover:bg-[#0000e6] active:scale-95 transition-all duration-200"
                >
                  OPEN THE STUDIO
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-secondary/30 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-secondary/30 pointer-events-none"></div>
          </div>
        </section>
      </main>
    </>
  );
}
