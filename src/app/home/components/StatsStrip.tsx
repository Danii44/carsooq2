import React from 'react';
import { Car, TrendingUp, Building2, ShieldCheck } from 'lucide-react';
import { PLATFORM_STATS } from '@/lib/mockData';
import Icon from '@/components/ui/AppIcon';


const stats = [
  {
    key: 'stat-listings',
    icon: Car,
    value: PLATFORM_STATS?.totalListings?.toLocaleString('en-AE') + '+',
    label: 'Active Listings',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    key: 'stat-sold',
    icon: TrendingUp,
    value: PLATFORM_STATS?.carsSold?.toLocaleString('en-AE') + '+',
    label: 'Cars Sold',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950',
  },
  {
    key: 'stat-brands',
    icon: Building2,
    value: PLATFORM_STATS?.activeBrands + '+',
    label: 'Active Brands',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    key: 'stat-verified',
    icon: ShieldCheck,
    value: PLATFORM_STATS?.verifiedSellers + '+',
    label: 'Verified Sellers',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-950',
  },
];

export default function StatsStrip() {
  return (
    <section className="bg-card border-b border-border">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats?.map(stat => {
            const Icon = stat?.icon;
            return (
              <div key={stat?.key} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${stat?.bg} flex items-center justify-center shrink-0`}>
                  <Icon size={20} className={stat?.color} />
                </div>
                <div>
                  <p className={`text-xl font-bold tabular-nums ${stat?.color}`}>{stat?.value}</p>
                  <p className="text-xs text-muted-foreground font-medium">{stat?.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}