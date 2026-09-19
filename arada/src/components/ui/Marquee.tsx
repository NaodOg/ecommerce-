"use client";

export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="w-full bg-primary-container border-b border-primary-container py-2 overflow-hidden flex whitespace-nowrap">
      <div className="marquee flex items-center gap-8 font-mono text-sm text-white">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span>{item}</span>
            {i < items.length * 3 - 1 && <span>{"//"}</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
