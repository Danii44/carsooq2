import React from 'react';
import Link from 'next/link';
import { Camera, DollarSign, Users, ArrowRight } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const steps = [
  { key: 'step-1', icon: Camera, step: '01', title: 'Upload your car', desc: 'Add photos and full specs in minutes' },
  { key: 'step-2', icon: DollarSign, step: '02', title: 'Set your price', desc: 'Price competitively with market insights' },
  { key: 'step-3', icon: Users, step: '03', title: 'Connect with buyers', desc: 'Receive WhatsApp inquiries directly' },
];

export default function SellerCTABanner() {
  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground mb-3">
            Ready to Sell Your Car?
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            List your car on CarSooq and reach thousands of serious buyers across the UAE and beyond. Free listing, direct buyer contact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {steps?.map(step => {
            const Icon = step?.icon;
            return (
              <div key={step?.key} className="bg-card border border-border rounded-xl p-6 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  {step?.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{step?.title}</h3>
                <p className="text-sm text-muted-foreground">{step?.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold text-sm px-8 py-4 rounded-xl hover:opacity-90 active:scale-95 transition-all duration-150"
          >
            List Your Car for Free <ArrowRight size={16} />
          </Link>
          <p className="text-xs text-muted-foreground mt-3">No listing fees. Direct buyer contact. No intermediaries.</p>
        </div>
      </div>
    </section>
  );
}