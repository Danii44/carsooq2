'use client';
import React, { useState, useMemo } from 'react';
import { CAR_LISTINGS, type CarListing, type CarCondition, type FuelType, type Transmission } from '@/lib/mockData';
import FilterSidebar from './FilterSidebar';
import SearchResultsGrid from './SearchResultsGrid';
import SearchTopBar from './SearchTopBar';
import ActiveFilterChips from './ActiveFilterChips';
import { SlidersHorizontal, X } from 'lucide-react';

export interface FilterState {
  query: string;
  brands: string[];
  conditions: CarCondition[];
  fuelTypes: FuelType[];
  transmissions: Transmission[];
  locations: string[];
  priceMin: number;
  priceMax: number;
  yearMin: number;
  yearMax: number;
  mileageMax: number;
  gccOnly: boolean;
  exportOnly: boolean;
}

export type SortOption = 'latest' | 'price-asc' | 'price-desc' | 'mileage-asc';

const DEFAULT_FILTERS: FilterState = {
  query: '',
  brands: [],
  conditions: [],
  fuelTypes: [],
  transmissions: [],
  locations: [],
  priceMin: 0,
  priceMax: 2000000,
  yearMin: 2010,
  yearMax: 2026,
  mileageMax: 300000,
  gccOnly: false,
  exportOnly: false,
};

const ITEMS_PER_PAGE = 12;

export default function SearchPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>('latest');
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Backend: replace with useSWR or React Query → GET /api/cars?...filters
  const filtered = useMemo<CarListing[]>(() => {
    let results = [...CAR_LISTINGS];

    if (filters.query) {
      const q = filters.query.toLowerCase();
      results = results.filter(
        c =>
          c.title.toLowerCase().includes(q) ||
          c.brand.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q)
      );
    }
    if (filters.brands.length > 0) {
      results = results.filter(c => filters.brands.includes(c.brand));
    }
    if (filters.conditions.length > 0) {
      results = results.filter(c => filters.conditions.includes(c.condition));
    }
    if (filters.fuelTypes.length > 0) {
      results = results.filter(c => filters.fuelTypes.includes(c.fuelType));
    }
    if (filters.transmissions.length > 0) {
      results = results.filter(c => filters.transmissions.includes(c.transmission));
    }
    if (filters.locations.length > 0) {
      results = results.filter(c => filters.locations.includes(c.location));
    }
    results = results.filter(
      c => c.price >= filters.priceMin && c.price <= filters.priceMax
    );
    results = results.filter(
      c => c.year >= filters.yearMin && c.year <= filters.yearMax
    );
    results = results.filter(c => c.mileage <= filters.mileageMax);
    if (filters.gccOnly) results = results.filter(c => c.gccSpec);
    if (filters.exportOnly) results = results.filter(c => c.exportReady);

    switch (sort) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'mileage-asc':
        results.sort((a, b) => a.mileage - b.mileage);
        break;
      default:
        results.sort((a, b) => b.postedAt.localeCompare(a.postedAt));
    }

    return results;
  }, [filters, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const clearAllFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  const hasActiveFilters =
    filters.query !== '' ||
    filters.brands.length > 0 ||
    filters.conditions.length > 0 ||
    filters.fuelTypes.length > 0 ||
    filters.transmissions.length > 0 ||
    filters.locations.length > 0 ||
    filters.priceMin > 0 ||
    filters.priceMax < 2000000 ||
    filters.yearMin > 2010 ||
    filters.yearMax < 2026 ||
    filters.mileageMax < 300000 ||
    filters.gccOnly ||
    filters.exportOnly;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 py-6 lg:py-8">
      {/* Mobile filter toggle */}
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <h1 className="text-lg font-bold text-foreground">
          {filtered.length.toLocaleString('en-AE')} Cars Found
        </h1>
        <button
          onClick={() => setSidebarOpen(v => !v)}
          className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <SlidersHorizontal size={16} />
          Filters
          {hasActiveFilters && (
            <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
              !
            </span>
          )}
        </button>
      </div>

      <div className="flex gap-6 lg:gap-8">
        {/* Sidebar */}
        <div className={`
          lg:block lg:w-72 xl:w-80 shrink-0
          ${sidebarOpen
            ? 'fixed inset-0 z-50 flex lg:relative lg:inset-auto lg:z-auto' :'hidden lg:block'
          }
        `}>
          {sidebarOpen && (
            <div
              className="absolute inset-0 bg-black/40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <div className={`
            relative bg-card h-full lg:h-auto overflow-y-auto
            lg:sticky lg:top-24 lg:max-h-[calc(100vh-120px)]
            w-80 lg:w-full
            ${sidebarOpen ? 'shadow-xl' : ''}
          `}>
            {sidebarOpen && (
              <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
                <span className="font-bold text-foreground">Filters</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1.5 hover:bg-muted rounded-lg">
                  <X size={18} />
                </button>
              </div>
            )}
            <FilterSidebar
              filters={filters}
              onUpdate={updateFilter}
              onClear={clearAllFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <SearchTopBar
            resultCount={filtered.length}
            sort={sort}
            onSortChange={s => { setSort(s); setPage(1); }}
          />

          {hasActiveFilters && (
            <ActiveFilterChips
              filters={filters}
              onUpdate={updateFilter}
              onClear={clearAllFilters}
            />
          )}

          <SearchResultsGrid
            cars={paginated}
            totalCount={filtered.length}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}