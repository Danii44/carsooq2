'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import CarCard from '@/components/ui/CarCard';
import CarCardSkeleton from '@/components/ui/CarCardSkeleton';
import { CAR_LISTINGS } from '@/lib/mockData';
import { Sparkles, ArrowRight } from 'lucide-react';

const FEATURED = CAR_LISTINGS?.filter(c => c?.featured)?.slice(0, 8);

export default function FeaturedListings() {
  const [loading] = useState(false);
  // Backend: useEffect → fetch('/api/cars?featured=true&limit=8')

  return (
    <section className="py-8 lg:py-12">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Sparkles size={18} className="text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Featured Cars</h2>
              <p className="text-xs text-muted-foreground">Hand-picked premium listings</p>
            </div>
          </div>
          <Link
            href="/search?featured=true"
            className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            View all <ArrowRight size={15} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 })?.map((_, i) => (
              <CarCardSkeleton key={`skel-feat-${i + 1}`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
            {FEATURED?.map(car => (
              <CarCard key={car?.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}