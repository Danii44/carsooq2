'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

const POPULAR_SEARCHES = [
{ label: 'Toyota Land Cruiser', key: 'ps-lc' },
{ label: 'BMW X5', key: 'ps-x5' },
{ label: 'Nissan Patrol', key: 'ps-patrol' },
{ label: 'Lexus LX 570', key: 'ps-lx' },
{ label: 'Export Cars', key: 'ps-export' }];


const LOCATIONS = [
'All UAE',
'Dubai',
'Abu Dhabi',
'Sharjah',
'Ajman',
'Ras Al Khaimah',
'Fujairah',
'Umm Al Quwain'];


export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('All UAE');
  const [condition, setCondition] = useState('All');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location !== 'All UAE') params.set('location', location);
    if (condition !== 'All') params.set('condition', condition.toLowerCase());
    router.push(`/search?${params.toString()}`);
  };

  const handleQuickSearch = (term: string) => {
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(210,80%,18%)] via-[hsl(210,75%,24%)] to-[hsl(215,70%,30%)] py-16 lg:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
            'radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 50%, white 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />

      </div>

      {/* Background car image */}
      <div className="absolute inset-0 opacity-10">
        <AppImage
          src="https://images.unsplash.com/photo-1622068385133-4fc156e3751a"
          alt="Luxury cars on UAE highway background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw" />

      </div>

      <div className="relative max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/90 text-sm font-medium">10,847 cars available right now</span>
          </div>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tight">
            UAE&apos;s Trusted
            <br />
            <span className="text-accent">Car Marketplace</span>
          </h1>
          <p className="text-white/75 text-lg mb-8 font-medium">
            Browse new, used, and export-ready GCC-spec vehicles. Connect directly with verified showrooms — no middlemen.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="bg-card rounded-2xl shadow-card-xl p-2 flex flex-col sm:flex-row gap-2">

            {/* Condition select */}
            <div className="relative sm:w-36 shrink-0">
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full h-full bg-muted border border-border rounded-xl px-3 py-3 text-sm font-medium text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 pr-8">

                {['All', 'New', 'Used', 'Accident'].map((c) =>
                <option key={`cond-${c}`} value={c}>{c}</option>
                )}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>

            {/* Keyword input */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search brand, model, keyword…"
                className="w-full pl-10 pr-4 py-3 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />

            </div>

            {/* Location select */}
            <div className="relative sm:w-40 shrink-0">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-full bg-muted border border-border rounded-xl px-3 py-3 text-sm font-medium text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 pr-8">

                {LOCATIONS.map((loc) =>
                <option key={`loc-${loc.replace(/\s+/g, '-')}`} value={loc}>{loc}</option>
                )}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>

            {/* Search button */}
            <button
              type="submit"
              className="bg-primary text-white font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all duration-150 whitespace-nowrap">

              Search Cars
            </button>
          </form>

          {/* Popular searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <span className="text-white/50 text-sm">Popular:</span>
            {POPULAR_SEARCHES.map((item) =>
            <button
              key={item.key}
              onClick={() => handleQuickSearch(item.label)}
              className="text-sm text-white/75 hover:text-white border border-white/20 hover:border-white/40 rounded-full px-3 py-1 transition-colors duration-150">

                {item.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>);

}