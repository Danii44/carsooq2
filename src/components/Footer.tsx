import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { MapPin, Phone, Mail } from 'lucide-react';

// Inline social icons to avoid deprecated lucide-react brand icons
function FacebookIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function InstagramIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function TwitterIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <AppLogo size={36} />
              <span className="font-bold text-xl text-primary">CarSooq</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              UAE&apos;s trusted car marketplace. Connecting buyers with verified showrooms and export-ready vehicles since 2020.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="p-2 rounded-lg hover:bg-muted transition-colors">
                <FacebookIcon size={18} className="text-muted-foreground" />
              </a>
              <a href="#" aria-label="Instagram" className="p-2 rounded-lg hover:bg-muted transition-colors">
                <InstagramIcon size={18} className="text-muted-foreground" />
              </a>
              <a href="#" aria-label="Twitter" className="p-2 rounded-lg hover:bg-muted transition-colors">
                <TwitterIcon size={18} className="text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Browse */}
          <div>
            <h4 className="text-sm font-600 text-foreground mb-4 uppercase tracking-wider">Browse</h4>
            <ul className="space-y-2">
              {[
                { label: 'New Cars', href: '/search?condition=new', key: 'footer-new' },
                { label: 'Used Cars', href: '/search?condition=used', key: 'footer-used' },
                { label: 'Export-Ready Cars', href: '/search?export=true', key: 'footer-export' },
                { label: 'Toyota', href: '/search?brand=Toyota', key: 'footer-toyota' },
                { label: 'BMW', href: '/search?brand=BMW', key: 'footer-bmw' },
                { label: 'Mercedes-Benz', href: '/search?brand=Mercedes', key: 'footer-merc' },
              ]?.map(item => (
                <li key={item?.key}>
                  <Link href={item?.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-600 text-foreground mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              {[
                { label: 'About CarSooq', href: '/home', key: 'footer-about' },
                { label: 'How It Works', href: '/home', key: 'footer-how' },
                { label: 'For Showrooms', href: '/home', key: 'footer-showrooms' },
                { label: 'Export Guide', href: '/home', key: 'footer-export-guide' },
                { label: 'Privacy Policy', href: '/home', key: 'footer-privacy' },
                { label: 'Terms of Service', href: '/home', key: 'footer-terms' },
              ]?.map(item => (
                <li key={item?.key}>
                  <Link href={item?.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-600 text-foreground mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">Dubai, United Arab Emirates</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">+971 4 XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">support@carsooq.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 CarSooq. All rights reserved. UAE Car Marketplace.
          </p>
          <p className="text-xs text-muted-foreground">
            سوق السيارات الإمارات — Trusted by 50,000+ buyers
          </p>
        </div>
      </div>
    </footer>
  );
}