'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import CarCard from '@/components/ui/CarCard';
import CarCardSkeleton from '@/components/ui/CarCardSkeleton';
import { CAR_LISTINGS } from '@/lib/mockData';
import { Clock, ArrowRight } from 'lucide-react';

// Simulating "new today" — cars posted on 2026-04-24
const NEW_TODAY = CAR_LISTINGS?.filter(c => c?.postedAt === '2026-04-24')?.slice(0, 6);
const RECENT = CAR_LISTINGS?.filter(c => c?.postedAt !== '2026-04-24')?.slice(0, 6);
const DISPLAY = [...NEW_TODAY, ...RECENT]?.slice(0, 6);

export default function NewTodaySection() {
  const [loading] = useState(false);
  // Backend: useEffect → fetch('/api/cars?sort=latest&limit=6')

  return (
    <section className="py-8 lg:py-12">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center">
              <Clock size={18} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                New Today
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800">
                  Live
                </span>
              </h2>
              <p className="text-xs text-muted-foreground">Latest listings added in the past 24 hours</p>
            </div>
          </div>
          <Link
            href="/search?sort=latest"
            className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            View all <ArrowRight size={15} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5">
            {Array.from({ length: 6 })?.map((_, i) => (
              <CarCardSkeleton key={`skel-new-${i + 1}`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5">
            {DISPLAY?.map(car => (
              <CarCard key={car?.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}