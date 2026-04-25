'use client';
import React, { useState } from 'react';
import { CAR_LISTINGS } from '@/lib/mockData';
import ImageGallery from './ImageGallery';
import SpecGrid from './SpecGrid';
import SellerCard from './SellerCard';
import SimilarCars from './SimilarCars';
import { formatPrice, buildWhatsAppLink, getConditionLabel } from '@/lib/mockData';
import {
  MapPin,
  Eye,
  Heart,
  Share2,
  Flag,
  Calendar,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';

// Using car-001 as the detail page subject
const CAR = CAR_LISTINGS[0];
const SIMILAR = CAR_LISTINGS.filter(c => c.id !== CAR.id && c.brand === CAR.brand).slice(0, 4);
const SIMILAR_FALLBACK = CAR_LISTINGS.filter(c => c.id !== CAR.id).slice(0, 4);

export default function CarDetailsContent() {
  const [saved, setSaved] = useState(false);

  const conditionStyles: Record<string, string> = {
    new: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800',
    used: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800',
    accident: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800',
  };

  const handleSave = () => {
    setSaved(v => !v);
    // Backend: POST /favorites { carId: CAR.id } or DELETE /favorites/:id
    toast.success(saved ? 'Removed from saved cars' : 'Saved to your favorites');
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: CAR.title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const handleReport = () => {
    toast.info('Report submitted. Our team will review this listing.');
  };

  const similarDisplay = SIMILAR.length >= 2 ? SIMILAR : SIMILAR_FALLBACK;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 py-6 lg:py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
        <a href="/home" className="hover:text-primary transition-colors">Home</a>
        <span>/</span>
        <a href="/search" className="hover:text-primary transition-colors">Search</a>
        <span>/</span>
        <a href={`/search?brand=${CAR.brand}`} className="hover:text-primary transition-colors">{CAR.brand}</a>
        <span>/</span>
        <span className="text-foreground font-medium truncate max-w-[200px]">{CAR.model} {CAR.year}</span>
      </nav>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Left: gallery + specs */}
        <div className="xl:col-span-2 space-y-6">
          {/* Gallery */}
          <ImageGallery images={CAR.images} title={CAR.title} />

          {/* Title + meta row */}
          <div className="bg-card border border-border rounded-xl p-5 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${conditionStyles[CAR.condition]}`}>
                    {getConditionLabel(CAR.condition)}
                  </span>
                  {CAR.gccSpec && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800">
                      ✦ GCC Spec
                    </span>
                  )}
                  {CAR.exportReady && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200 dark:bg-violet-950 dark:text-violet-400 dark:border-violet-800">
                      Export Ready
                    </span>
                  )}
                  {CAR.featured && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                      Featured
                    </span>
                  )}
                </div>

                <h1 className="text-xl lg:text-2xl font-extrabold text-foreground leading-tight mb-2">
                  {CAR.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-primary" />
                    {CAR.location}, UAE
                  </span>
                  <span className="text-border">·</span>
                  <span className="flex items-center gap-1.5">
                    <Eye size={14} />
                    {CAR.views.toLocaleString('en-AE')} views
                  </span>
                  <span className="text-border">·</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    Posted {new Date(CAR.postedAt).toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleSave}
                  aria-label={saved ? 'Remove from saved' : 'Save listing'}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-150 active:scale-95 ${
                    saved
                      ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-950 dark:border-red-800 dark:text-red-400' :'border-border hover:bg-muted text-foreground'
                  }`}
                >
                  <Heart size={16} className={saved ? 'fill-red-500' : ''} />
                  <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
                </button>
                <button
                  onClick={handleShare}
                  aria-label="Share listing"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border hover:bg-muted text-sm font-medium text-foreground transition-all duration-150 active:scale-95"
                >
                  <Share2 size={16} />
                  <span className="hidden sm:inline">Share</span>
                </button>
                <button
                  onClick={handleReport}
                  aria-label="Report listing"
                  className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground transition-colors"
                >
                  <Flag size={16} />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="mt-5 pt-5 border-t border-border flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <p className="text-3xl lg:text-4xl font-extrabold text-primary tabular-nums">
                  {formatPrice(CAR.price)}
                </p>
                {CAR.negotiable && (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    Price is negotiable
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Saved by</p>
                <p className="text-sm font-bold text-foreground tabular-nums">{CAR.savedCount} people</p>
              </div>
            </div>
          </div>

          {/* Spec Grid */}
          <SpecGrid car={CAR} />

          {/* Description */}
          <div className="bg-card border border-border rounded-xl p-5 lg:p-6">
            <h2 className="text-base font-bold text-foreground mb-4">Seller Description</h2>
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
              {CAR.description}
            </p>
          </div>

          {/* Safety notice */}
          <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <AlertTriangle size={18} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">Safety Tips</p>
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                Always meet sellers in a public place. Inspect the car before payment. Request the full vehicle history report. Never transfer money before seeing the car in person.
              </p>
            </div>
          </div>
        </div>

        {/* Right: seller card + sticky CTA */}
        <div className="xl:col-span-1">
          <div className="xl:sticky xl:top-24 space-y-4">
            <SellerCard car={CAR} />
          </div>
        </div>
      </div>

      {/* Similar Cars */}
      <SimilarCars cars={similarDisplay} currentCarId={CAR.id} />

      {/* Mobile sticky CTA */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border px-4 py-3 flex gap-3">
        <a
          href={buildWhatsAppLink(CAR.sellerWhatsApp, CAR.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold text-sm py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all duration-150"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp Seller
        </a>
        <a
          href={`tel:${CAR.sellerPhone}`}
          className="flex items-center justify-center gap-2 border border-border bg-card text-foreground font-semibold text-sm px-5 py-3 rounded-xl hover:bg-muted active:scale-95 transition-all duration-150"
        >
          Call
        </a>
      </div>
      <div className="xl:hidden h-20" />
    </div>
  );
}