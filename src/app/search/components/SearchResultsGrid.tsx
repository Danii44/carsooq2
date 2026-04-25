'use client';
import React from 'react';
import CarCard from '@/components/ui/CarCard';

import type { CarListing } from '@/lib/mockData';
import { Car, ChevronLeft, ChevronRight } from 'lucide-react';

interface SearchResultsGridProps {
  cars: CarListing[];
  totalCount: number;
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

export default function SearchResultsGrid({
  cars,
  totalCount,
  page,
  totalPages,
  onPageChange,
}: SearchResultsGridProps) {
  if (totalCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Car size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">No cars match your filters</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Try adjusting your price range, location, or removing some filters to see more results.
        </p>
      </div>
    );
  }

  const pageNumbers: (number | 'ellipsis')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1);
    if (page > 3) pageNumbers.push('ellipsis');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pageNumbers.push(i);
    }
    if (page < totalPages - 2) pageNumbers.push('ellipsis');
    pageNumbers.push(totalPages);
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-5 mb-8">
        {cars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing{' '}
            <span className="font-semibold text-foreground tabular-nums">
              {((page - 1) * 12) + 1}–{Math.min(page * 12, totalCount)}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-foreground tabular-nums">
              {totalCount.toLocaleString('en-AE')}
            </span>{' '}
            cars
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            {pageNumbers.map((num, idx) =>
              num === 'ellipsis' ? (
                <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground text-sm">
                  …
                </span>
              ) : (
                <button
                  key={`page-${num}`}
                  onClick={() => onPageChange(num as number)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                    page === num
                      ? 'bg-primary text-white' :'border border-border hover:bg-muted text-foreground'
                  }`}
                >
                  {num}
                </button>
              )
            )}

            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}