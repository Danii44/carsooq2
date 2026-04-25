'use client';
import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import type { CarListing } from '@/lib/mockData';
import { buildWhatsAppLink } from '@/lib/mockData';
import { CheckCircle2, Phone, Store, Star, ExternalLink,  } from 'lucide-react';
import { toast } from 'sonner';

interface SellerCardProps {
  car: CarListing;
}

const SELLER_AVATARS: Record<string, string> = {
  'seller-001': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
  'seller-002': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
  'seller-003': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&q=80',
  'seller-004': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
};

export default function SellerCard({ car }: SellerCardProps) {
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const whatsappUrl = buildWhatsAppLink(car.sellerWhatsApp, car.title);
  const avatarSrc = SELLER_AVATARS[car.sellerId] || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80';

  const handleRevealPhone = () => {
    setPhoneRevealed(true);
    // Backend: POST /api/analytics/lead { carId, action: 'phone_reveal' }
    toast.success('Phone number revealed');
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Price prominent */}
      <div className="bg-primary px-5 py-4">
        <p className="text-white/70 text-xs font-medium mb-1">Asking Price</p>
        <p className="text-white text-3xl font-extrabold tabular-nums">
          {new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', minimumFractionDigits: 0 }).format(car.price)}
        </p>
        {car.negotiable && (
          <p className="text-white/70 text-xs mt-1">✓ Negotiable</p>
        )}
      </div>

      {/* Seller info */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
              <AppImage
                src={avatarSrc}
                alt={`${car.sellerName} seller profile photo`}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
            {car.sellerVerified && (
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-card flex items-center justify-center">
                <CheckCircle2 size={14} className="text-emerald-500 fill-emerald-500" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-bold text-foreground truncate">{car.sellerName}</p>
              {car.sellerVerified && (
                <span className="shrink-0 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.5 rounded-full">
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              {car.sellerListings > 10 ? (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Store size={11} />
                  Showroom · {car.sellerListings} listings
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  Private seller · {car.sellerListings} listing{car.sellerListings > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">Member since {car.sellerMemberSince}</p>
          </div>
        </div>

        {/* Rating row */}
        <div className="flex items-center gap-1.5 mb-4 pb-4 border-b border-border">
          {[1, 2, 3, 4, 5].map(s => (
            <Star
              key={`star-${s}`}
              size={14}
              className={s <= 4 ? 'fill-accent text-accent' : 'text-muted-foreground'}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">4.8 · 127 reviews</span>
        </div>

        {/* CTA buttons */}
        <div className="space-y-3">
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] text-white font-bold text-sm py-3.5 rounded-xl hover:opacity-90 active:scale-95 transition-all duration-150"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>

          {/* Phone */}
          {phoneRevealed ? (
            <a
              href={`tel:${car.sellerPhone}`}
              className="flex items-center justify-center gap-2.5 w-full border border-border text-foreground font-semibold text-sm py-3.5 rounded-xl hover:bg-muted active:scale-95 transition-all duration-150"
            >
              <Phone size={17} />
              {car.sellerPhone}
            </a>
          ) : (
            <button
              onClick={handleRevealPhone}
              className="flex items-center justify-center gap-2.5 w-full border border-border text-foreground font-semibold text-sm py-3.5 rounded-xl hover:bg-muted active:scale-95 transition-all duration-150"
            >
              <Phone size={17} />
              Show Phone Number
            </button>
          )}

          {/* View all seller listings */}
          <a
            href={`/search?seller=${car.sellerId}`}
            className="flex items-center justify-center gap-1.5 w-full text-primary text-sm font-medium hover:underline py-1"
          >
            <ExternalLink size={14} />
            View all {car.sellerListings} listings from this seller
          </a>
        </div>
      </div>

      {/* Reference ID */}
      <div className="px-5 pb-4">
        <p className="text-xs text-muted-foreground text-center">
          Listing ID: <span className="font-mono font-semibold">{car.id.toUpperCase()}</span>
        </p>
      </div>
    </div>
  );
}