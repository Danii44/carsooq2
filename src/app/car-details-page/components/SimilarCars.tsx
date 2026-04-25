'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import CarCard from '@/components/ui/CarCard';
import type { CarListing } from '@/lib/mockData';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface SimilarCarsProps {
  cars: CarListing[];
  currentCarId: string;
}

export default function SimilarCars({ cars, currentCarId }: SimilarCarsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  if (cars.length === 0) return null;

  return (
    <section className="mt-10 pt-8 border-t border-border">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-foreground">Similar Cars</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
          <Link
            href="/search"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:underline ml-2"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Scrollable row on mobile, grid on desktop */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide lg:grid lg:grid-cols-4 lg:overflow-visible pb-2 lg:pb-0"
      >
        {cars.map(car => (
          <div key={car.id} className="min-w-[280px] lg:min-w-0">
            <CarCard car={car} />
          </div>
        ))}
      </div>
    </section>
  );
}