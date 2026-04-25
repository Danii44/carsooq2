'use client';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import AppImage from '@/components/ui/AppImage';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BRANDS } from '@/lib/mockData';

export default function BrandQuickFilter() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  return (
    <section className="py-8 lg:py-10">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-foreground">Browse by Brand</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} className="text-foreground" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} className="text-foreground" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-1"
        >
          {BRANDS.map(brand => (
            <button
              key={brand.id}
              onClick={() => router.push(`/search?brand=${encodeURIComponent(brand.name)}`)}
              className="flex flex-col items-center gap-2 bg-card border border-border rounded-xl px-4 py-3 min-w-[88px] hover:border-primary hover:shadow-card-hover active:scale-95 transition-all duration-150 group shrink-0"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                <AppImage
                  src={brand.logo}
                  alt={`${brand.name} car brand logo`}
                  width={32}
                  height={32}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                {brand.name}
              </span>
              <span className="text-[10px] text-muted-foreground tabular-nums">
                {brand.count.toLocaleString('en-AE')}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}