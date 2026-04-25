'use client';
import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import type { FilterState } from './SearchPage';
import { formatPrice } from '@/lib/mockData';

interface ActiveFilterChipsProps {
  filters: FilterState;
  onUpdate: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onClear: () => void;
}

export default function ActiveFilterChips({ filters, onUpdate, onClear }: ActiveFilterChipsProps) {
  const chips: { key: string; label: string; onRemove: () => void }[] = [];

  if (filters.query) {
    chips.push({
      key: 'chip-query',
      label: `"${filters.query}"`,
      onRemove: () => onUpdate('query', ''),
    });
  }
  filters.brands.forEach(b =>
    chips.push({
      key: `chip-brand-${b}`,
      label: b,
      onRemove: () => onUpdate('brands', filters.brands.filter(x => x !== b)),
    })
  );
  filters.conditions.forEach(c =>
    chips.push({
      key: `chip-cond-${c}`,
      label: c.charAt(0).toUpperCase() + c.slice(1),
      onRemove: () => onUpdate('conditions', filters.conditions.filter(x => x !== c)),
    })
  );
  filters.fuelTypes.forEach(f =>
    chips.push({
      key: `chip-fuel-${f}`,
      label: f,
      onRemove: () => onUpdate('fuelTypes', filters.fuelTypes.filter(x => x !== f)),
    })
  );
  filters.transmissions.forEach(t =>
    chips.push({
      key: `chip-trans-${t}`,
      label: t,
      onRemove: () => onUpdate('transmissions', filters.transmissions.filter(x => x !== t)),
    })
  );
  filters.locations.forEach(l =>
    chips.push({
      key: `chip-loc-${l}`,
      label: l,
      onRemove: () => onUpdate('locations', filters.locations.filter(x => x !== l)),
    })
  );
  if (filters.priceMin > 0 || filters.priceMax < 2000000) {
    chips.push({
      key: 'chip-price',
      label: `${formatPrice(filters.priceMin)} – ${formatPrice(filters.priceMax)}`,
      onRemove: () => { onUpdate('priceMin', 0); onUpdate('priceMax', 2000000); },
    });
  }
  if (filters.yearMin > 2010 || filters.yearMax < 2026) {
    chips.push({
      key: 'chip-year',
      label: `${filters.yearMin} – ${filters.yearMax}`,
      onRemove: () => { onUpdate('yearMin', 2010); onUpdate('yearMax', 2026); },
    });
  }
  if (filters.mileageMax < 300000) {
    chips.push({
      key: 'chip-mileage',
      label: `Max ${filters.mileageMax.toLocaleString('en-AE')} km`,
      onRemove: () => onUpdate('mileageMax', 300000),
    });
  }
  if (filters.gccOnly) {
    chips.push({ key: 'chip-gcc', label: 'GCC Spec', onRemove: () => onUpdate('gccOnly', false) });
  }
  if (filters.exportOnly) {
    chips.push({ key: 'chip-export', label: 'Export Ready', onRemove: () => onUpdate('exportOnly', false) });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-xs text-muted-foreground font-medium shrink-0">Active filters:</span>
      {chips.map(chip => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
        >
          {chip.label}
          <button
            onClick={chip.onRemove}
            aria-label={`Remove ${chip.label} filter`}
            className="hover:text-destructive transition-colors"
          >
            <X size={11} />
          </button>
        </span>
      ))}
      <button
        onClick={onClear}
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors ml-1"
      >
        <RotateCcw size={11} />
        Clear all
      </button>
    </div>
  );
}