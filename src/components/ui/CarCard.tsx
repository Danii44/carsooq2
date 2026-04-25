'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { Heart, MapPin, Fuel, Gauge, Calendar, CheckCircle2, ExternalLink } from 'lucide-react';
import { formatPrice, formatMileage, getConditionLabel, type CarListing } from '@/lib/mockData';
import { toast } from 'sonner';

interface CarCardProps {
  car: CarListing;
  variant?: 'default' | 'compact';
}

export default function CarCard({ car, variant = 'default' }: CarCardProps) {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(v => !v);
    // Backend: POST /favorites { carId: car.id } or DELETE /favorites/:id
    toast.success(saved ? 'Removed from saved cars' : 'Saved to your favorites', {
      duration: 2500,
    });
  };

  const conditionStyles: Record<string, string> = {
    new: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800',
    used: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800',
    accident: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800',
  };

  return (
    <Link href="/car-details-page" className="group block">
      <article className="bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <AppImage
            src={car.images[0]?.src || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80'}
            alt={car.images[0]?.alt || `${car.year} ${car.brand} ${car.model} listing photo`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${conditionStyles[car.condition]}`}>
              {getConditionLabel(car.condition)}
            </span>
            {car.gccSpec && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800">
                GCC
              </span>
            )}
            {car.exportReady && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200 dark:bg-violet-950 dark:text-violet-400 dark:border-violet-800">
                Export
              </span>
            )}
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            aria-label={saved ? 'Remove from saved' : 'Save car'}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 dark:bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-transform duration-150"
          >
            <Heart
              size={16}
              className={saved ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}
            />
          </button>

          {/* Image count */}
          {car.images.length > 1 && (
            <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
              <ExternalLink size={10} />
              {car.images.length} photos
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="text-xl font-bold text-primary tabular-nums leading-tight">
              {formatPrice(car.price)}
            </p>
            {car.negotiable && (
              <span className="shrink-0 text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5 mt-0.5">
                Negotiable
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 mb-3 group-hover:text-primary transition-colors">
            {car.title}
          </h3>

          {/* Specs row */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {car.year}
            </span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1 tabular-nums">
              <Gauge size={12} />
              {formatMileage(car.mileage)}
            </span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1">
              <Fuel size={12} />
              {car.fuelType}
            </span>
          </div>

          {/* Location + seller */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin size={12} />
              {car.location}
            </span>
            {car.sellerVerified && (
              <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 size={12} />
                Verified
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}