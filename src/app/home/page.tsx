import React from 'react';
import AppLayout from '@/components/AppLayout';
import HeroSection from './components/HeroSection';
import StatsStrip from './components/StatsStrip';
import BrandQuickFilter from './components/BrandQuickFilter';
import FeaturedListings from './components/FeaturedListings';
import NewTodaySection from './components/NewTodaySection';
import SellerCTABanner from './components/SellerCTABanner';
import ExportBanner from './components/ExportBanner';

export default function HomePage() {
  return (
    <AppLayout>
      <HeroSection />
      <StatsStrip />
      <BrandQuickFilter />
      <FeaturedListings />
      <ExportBanner />
      <NewTodaySection />
      <SellerCTABanner />
    </AppLayout>
  );
}