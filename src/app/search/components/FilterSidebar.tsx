'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw, SlidersHorizontal } from 'lucide-react';
import type { FilterState } from './SearchPage';
import type { CarCondition, FuelType, Transmission } from '@/lib/mockData';
import { BRANDS } from '@/lib/mockData';

interface FilterSidebarProps {
  filters: FilterState;
  onUpdate: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

const LOCATIONS = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah'];
const CONDITIONS: { value: CarCondition; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
  { value: 'accident', label: 'Accident' },
];
const FUEL_TYPES: { value: FuelType; label: string }[] = [
  { value: 'Petrol', label: 'Petrol' },
  { value: 'Diesel', label: 'Diesel' },
  { value: 'Hybrid', label: 'Hybrid' },
  { value: 'Electric', label: 'Electric' },
];
const TRANSMISSIONS: { value: Transmission; label: string }[] = [
  { value: 'Automatic', label: 'Automatic' },
  { value: 'Manual', label: 'Manual' },
];

function FilterSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center justify-between w-full px-4 py-3.5 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
      >
        {title}
        {open ? <ChevronUp size={15} className="text-muted-foreground" /> : <ChevronDown size={15} className="text-muted-foreground" />}
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter(v => v !== value)
        : [...selected, value]
    );
  };
  return (
    <div className="space-y-2">
      {options.map(opt => (
        <label
          key={`chk-${opt.value}`}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div
            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
              selected.includes(opt.value)
                ? 'bg-primary border-primary' :'border-border group-hover:border-primary'
            }`}
          >
            {selected.includes(opt.value) && (
              <svg viewBox="0 0 10 8" className="w-2.5 h-2 fill-white">
                <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            )}
          </div>
          <span className="text-sm text-foreground group-hover:text-primary transition-colors">
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
}

export default function FilterSidebar({ filters, onUpdate, onClear, hasActiveFilters }: FilterSidebarProps) {
  const brandOptions = BRANDS.map(b => ({ value: b.name, label: `${b.name} (${b.count.toLocaleString('en-AE')})` }));

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-primary" />
          <span className="text-sm font-bold text-foreground">Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 text-xs text-destructive hover:underline font-medium"
          >
            <RotateCcw size={12} />
            Clear all
          </button>
        )}
      </div>

      {/* Keyword */}
      <FilterSection title="Keyword Search">
        <input
          type="text"
          value={filters.query}
          onChange={e => onUpdate('query', e.target.value)}
          placeholder="Brand, model, keyword…"
          className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-primary transition-colors"
          style={{ '--tw-ring-color': 'hsl(var(--ring) / 0.3)' } as React.CSSProperties}
        />
      </FilterSection>

      {/* Condition */}
      <FilterSection title="Condition">
        <CheckboxGroup
          options={CONDITIONS}
          selected={filters.conditions}
          onChange={v => onUpdate('conditions', v as typeof filters.conditions)}
        />
      </FilterSection>

      {/* Brand */}
      <FilterSection title="Brand" defaultOpen={false}>
        <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
          <CheckboxGroup
            options={brandOptions}
            selected={filters.brands}
            onChange={v => onUpdate('brands', v)}
          />
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range (AED)">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.priceMin}
              onChange={e => onUpdate('priceMin', Number(e.target.value))}
              placeholder="Min"
              className="w-full bg-muted border border-border rounded-lg px-2.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-primary tabular-nums"
              style={{ '--tw-ring-color': 'hsl(var(--ring) / 0.3)' } as React.CSSProperties}
            />
            <span className="text-muted-foreground text-sm shrink-0">–</span>
            <input
              type="number"
              value={filters.priceMax}
              onChange={e => onUpdate('priceMax', Number(e.target.value))}
              placeholder="Max"
              className="w-full bg-muted border border-border rounded-lg px-2.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-primary tabular-nums"
              style={{ '--tw-ring-color': 'hsl(var(--ring) / 0.3)' } as React.CSSProperties}
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { key: 'pr-50k', label: 'Under 50K', min: 0, max: 50000 },
              { key: 'pr-100k', label: '50K–100K', min: 50000, max: 100000 },
              { key: 'pr-200k', label: '100K–200K', min: 100000, max: 200000 },
              { key: 'pr-200k+', label: '200K+', min: 200000, max: 2000000 },
            ].map(preset => (
              <button
                key={preset.key}
                onClick={() => { onUpdate('priceMin', preset.min); onUpdate('priceMax', preset.max); }}
                className="text-xs px-2.5 py-1 rounded-full border border-border hover:border-primary hover:text-primary transition-colors text-muted-foreground"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </FilterSection>

      {/* Year Range */}
      <FilterSection title="Year" defaultOpen={false}>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={filters.yearMin}
            onChange={e => onUpdate('yearMin', Number(e.target.value))}
            min={2000}
            max={2026}
            className="w-full bg-muted border border-border rounded-lg px-2.5 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:border-primary tabular-nums"
            style={{ '--tw-ring-color': 'hsl(var(--ring) / 0.3)' } as React.CSSProperties}
          />
          <span className="text-muted-foreground text-sm shrink-0">–</span>
          <input
            type="number"
            value={filters.yearMax}
            onChange={e => onUpdate('yearMax', Number(e.target.value))}
            min={2000}
            max={2026}
            className="w-full bg-muted border border-border rounded-lg px-2.5 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:border-primary tabular-nums"
            style={{ '--tw-ring-color': 'hsl(var(--ring) / 0.3)' } as React.CSSProperties}
          />
        </div>
      </FilterSection>

      {/* Mileage */}
      <FilterSection title="Max Mileage (km)" defaultOpen={false}>
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={300000}
            step={10000}
            value={filters.mileageMax}
            onChange={e => onUpdate('mileageMax', Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
            <span>0 km</span>
            <span className="font-semibold text-foreground">
              {filters.mileageMax === 300000 ? 'Any' : `${filters.mileageMax.toLocaleString('en-AE')} km`}
            </span>
            <span>300,000 km</span>
          </div>
        </div>
      </FilterSection>

      {/* Fuel Type */}
      <FilterSection title="Fuel Type" defaultOpen={false}>
        <CheckboxGroup
          options={FUEL_TYPES}
          selected={filters.fuelTypes}
          onChange={v => onUpdate('fuelTypes', v as typeof filters.fuelTypes)}
        />
      </FilterSection>

      {/* Transmission */}
      <FilterSection title="Transmission" defaultOpen={false}>
        <CheckboxGroup
          options={TRANSMISSIONS}
          selected={filters.transmissions}
          onChange={v => onUpdate('transmissions', v as typeof filters.transmissions)}
        />
      </FilterSection>

      {/* Location */}
      <FilterSection title="Location" defaultOpen={false}>
        <CheckboxGroup
          options={LOCATIONS.map(l => ({ value: l, label: l }))}
          selected={filters.locations}
          onChange={v => onUpdate('locations', v)}
        />
      </FilterSection>

      {/* Toggles */}
      <FilterSection title="Special Filters" defaultOpen={false}>
        <div className="space-y-3">
          {[
            { key: 'gcc-toggle', field: 'gccOnly' as keyof FilterState, label: 'GCC Spec Only', desc: 'Vehicles built for GCC market' },
            { key: 'export-toggle', field: 'exportOnly' as keyof FilterState, label: 'Export Ready', desc: 'Includes documentation support' },
          ].map(item => (
            <label key={item.key} className="flex items-center justify-between gap-3 cursor-pointer">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <button
                role="switch"
                aria-checked={filters[item.field] as boolean}
                onClick={() => onUpdate(item.field, !(filters[item.field] as boolean))}
                className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 transition-colors duration-200 focus:outline-none ${
                  (filters[item.field] as boolean)
                    ? 'bg-primary border-primary' :'bg-muted border-border'
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 mt-0.5 ${
                    (filters[item.field] as boolean) ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}