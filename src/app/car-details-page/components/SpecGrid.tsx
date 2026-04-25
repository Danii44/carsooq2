import React from 'react';
import type { CarListing } from '@/lib/mockData';
import { formatMileage } from '@/lib/mockData';
import {
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  Palette,
  DoorOpen,
  Zap,
  MapPin,
  ShieldCheck,
  Globe2,
  Car,
  Hash,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface SpecGridProps {
  car: CarListing;
}

export default function SpecGrid({ car }: SpecGridProps) {
  const specs = [
    { key: 'spec-brand', icon: Car, label: 'Brand', value: car.brand },
    { key: 'spec-model', icon: Hash, label: 'Model', value: car.model },
    { key: 'spec-year', icon: Calendar, label: 'Year', value: car.year.toString() },
    { key: 'spec-mileage', icon: Gauge, label: 'Mileage', value: car.mileage === 0 ? '0 km — Brand New' : formatMileage(car.mileage) },
    { key: 'spec-fuel', icon: Fuel, label: 'Fuel Type', value: car.fuelType },
    { key: 'spec-trans', icon: Settings2, label: 'Transmission', value: car.transmission },
    { key: 'spec-color', icon: Palette, label: 'Color', value: car.color },
    { key: 'spec-doors', icon: DoorOpen, label: 'Doors', value: `${car.doors} Doors` },
    { key: 'spec-cylinders', icon: Zap, label: 'Cylinders', value: `${car.cylinders} Cylinders` },
    { key: 'spec-location', icon: MapPin, label: 'Location', value: `${car.location}, UAE` },
    { key: 'spec-gcc', icon: ShieldCheck, label: 'GCC Spec', value: car.gccSpec ? 'Yes — GCC' : 'No — Non-GCC' },
    { key: 'spec-export', icon: Globe2, label: 'Export Ready', value: car.exportReady ? 'Yes — Docs Available' : 'Not Listed for Export' },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-5 lg:p-6">
      <h2 className="text-base font-bold text-foreground mb-5">Vehicle Specifications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y divide-border sm:divide-y-0">
        {specs.map((spec, idx) => {
          const Icon = spec.icon;
          const isEven = idx % 2 === 0;
          return (
            <div
              key={spec.key}
              className={`flex items-center gap-3 py-3 px-2 rounded-lg ${
                Math.floor(idx / 2) % 2 === 0 ? 'sm:bg-muted/30' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon size={15} className="text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground font-medium">{spec.label}</p>
                <p className="text-sm font-semibold text-foreground truncate">{spec.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}