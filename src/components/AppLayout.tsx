import React from 'react';
import Topbar from './Topbar';
import Footer from './Footer';
import { ThemeProvider } from './ThemeProvider';
import { Toaster } from 'sonner';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Topbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '14px',
          },
        }}
      />
    </ThemeProvider>
  );
}