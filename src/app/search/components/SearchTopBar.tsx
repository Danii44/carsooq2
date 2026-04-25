'use client';
import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { SortOption } from './SearchPage';

interface SearchTopBarProps {
  resultCount: number;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'latest', label: 'Latest First' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'mileage-asc', label: 'Lowest Mileage' },
];

export default function SearchTopBar({ resultCount, sort, onSortChange }: SearchTopBarProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <div className="hidden lg:block">
        <h1 className="text-lg font-bold text-foreground">
          {resultCount.toLocaleString('en-AE')}{' '}
          <span className="text-muted-foreground font-normal">cars found</span>
        </h1>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <span className="text-sm text-muted-foreground hidden sm:block">Sort by:</span>
        <div className="relative">
          <select
            value={sort}
            onChange={e => onSortChange(e.target.value as SortOption)}
            className="appearance-none bg-card border border-border rounded-lg pl-3 pr-8 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:border-primary cursor-pointer"
            style={{ '--tw-ring-color': 'hsl(var(--ring) / 0.3)' } as React.CSSProperties}
          >
            {SORT_OPTIONS.map(opt => (
              <option key={`sort-${opt.value}`} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>
    </div>
  );
}