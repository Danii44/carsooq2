'use client';
import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { ChevronLeft, ChevronRight, X, ZoomIn, Images } from 'lucide-react';

interface ImageGalleryProps {
  images: Array<{ src: string; alt: string }>;
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const prev = () => setActiveIndex(i => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex(i => (i + 1) % images.length);

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const lbPrev = () => setLightboxIndex(i => (i - 1 + images.length) % images.length);
  const lbNext = () => setLightboxIndex(i => (i + 1) % images.length);

  return (
    <>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {/* Main image */}
        <div className="relative aspect-[16/10] bg-muted cursor-zoom-in group" onClick={() => openLightbox(activeIndex)}>
          <AppImage
            src={images[activeIndex]?.src || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80'}
            alt={images[activeIndex]?.alt || `${title} photo ${activeIndex + 1}`}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 66vw"
            className="object-cover"
          />

          {/* Zoom hint */}
          <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={16} className="text-white" />
          </div>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); prev(); }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={18} className="text-white" />
              </button>
              <button
                onClick={e => { e.stopPropagation(); next(); }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
              >
                <ChevronRight size={18} className="text-white" />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
            <Images size={12} />
            {activeIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">
            {images.map((img, idx) => (
              <button
                key={`thumb-${idx}`}
                onClick={() => setActiveIndex(idx)}
                className={`relative shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-150 ${
                  idx === activeIndex
                    ? 'border-primary shadow-sm'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <AppImage
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close lightbox"
          >
            <X size={20} className="text-white" />
          </button>

          <button
            onClick={e => { e.stopPropagation(); lbPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={22} className="text-white" />
          </button>

          <div
            className="relative w-full max-w-4xl max-h-[85vh] mx-16"
            onClick={e => e.stopPropagation()}
          >
            <AppImage
              src={images[lightboxIndex]?.src || ''}
              alt={images[lightboxIndex]?.alt || `${title} photo ${lightboxIndex + 1}`}
              width={1200}
              height={750}
              className="object-contain w-full h-full max-h-[85vh] rounded-lg"
            />
          </div>

          <button
            onClick={e => { e.stopPropagation(); lbNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={22} className="text-white" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}