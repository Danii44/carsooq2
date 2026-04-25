import React from 'react';
import Link from 'next/link';
import { Globe2, ArrowRight, CheckCircle2 } from 'lucide-react';

const exportMarkets = [
  { key: 'em-nigeria', label: 'Nigeria' },
  { key: 'em-kenya', label: 'Kenya' },
  { key: 'em-jordan', label: 'Jordan' },
  { key: 'em-russia', label: 'Russia' },
  { key: 'em-ghana', label: 'Ghana' },
  { key: 'em-uganda', label: 'Uganda' },
];

const exportFeatures = [
  { key: 'ef-gcc', label: 'GCC-spec vehicles' },
  { key: 'ef-docs', label: 'Export documentation support' },
  { key: 'ef-tax', label: 'Tax-free UAE pricing' },
  { key: 'ef-verified', label: 'Verified showrooms only' },
];

export default function ExportBanner() {
  return (
    <section className="py-8 lg:py-12 bg-muted/50">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16">
        <div className="bg-gradient-to-br from-[hsl(210,80%,18%)] to-[hsl(215,70%,28%)] rounded-2xl p-8 lg:p-12 overflow-hidden relative">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute right-16 bottom-0 w-32 h-32 bg-accent/10 rounded-full translate-y-1/2" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe2 size={22} className="text-accent" />
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">Export-Ready Vehicles</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-3 leading-tight">
                Buy GCC-Spec Cars<br />for International Export
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                CarSooq connects international buyers with UAE showrooms offering export-ready, low-mileage, tax-free vehicles with full documentation support.
              </p>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {exportFeatures?.map(f => (
                  <div key={f?.key} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span className="text-white/80 text-sm">{f?.label}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/search?export=true"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold text-sm px-6 py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all duration-150"
              >
                Browse Export Cars <ArrowRight size={16} />
              </Link>
            </div>

            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">Popular export destinations</p>
              <div className="flex flex-wrap gap-2">
                {exportMarkets?.map(market => (
                  <Link
                    key={market?.key}
                    href={`/search?export=true&market=${market?.label?.toLowerCase()}`}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition-colors"
                  >
                    {market?.label}
                  </Link>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-bold text-white tabular-nums">2,400+</p>
                  <p className="text-white/60 text-xs mt-1">Export-ready listings</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-bold text-white tabular-nums">50+</p>
                  <p className="text-white/60 text-xs mt-1">Countries exported to</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}