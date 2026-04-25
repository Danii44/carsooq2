'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import AppLogo from '@/components/ui/AppLogo';
import { Sun, Moon, Search, Heart, User, Menu, X, Plus, Bell, LogIn,  } from 'lucide-react';

const navLinks = [
  { label: 'Buy a Car', href: '/search', key: 'nav-buy' },
  { label: 'New Cars', href: '/search?condition=new', key: 'nav-new' },
  { label: 'Used Cars', href: '/search?condition=used', key: 'nav-used' },
  { label: 'Export Cars', href: '/search?export=true', key: 'nav-export' },
];

export default function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/home" className="flex items-center gap-2 shrink-0">
              <AppLogo size={36} />
              <span className="font-bold text-xl text-primary tracking-tight hidden sm:block">
                CarSooq
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks?.map(link => (
                <Link
                  key={link?.key}
                  href={link?.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:text-primary hover:bg-muted transition-colors duration-150"
                >
                  {link?.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search icon (mobile) */}
              <Link
                href="/search"
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Search"
              >
                <Search size={20} className="text-foreground" />
              </Link>

              {/* Sell CTA */}
              <Link
                href="/home"
                className="hidden sm:flex items-center gap-1.5 bg-accent text-accent-foreground font-semibold text-sm px-4 py-2 rounded-lg hover:opacity-90 active:scale-95 transition-all duration-150"
              >
                <Plus size={16} />
                Sell a Car
              </Link>

              {/* Favorites */}
              <button
                className="hidden sm:flex p-2 rounded-lg hover:bg-muted transition-colors relative"
                aria-label="Saved cars"
              >
                <Heart size={20} className="text-foreground" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-destructive text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Notifications */}
              <button
                className="hidden sm:flex p-2 rounded-lg hover:bg-muted transition-colors relative"
                aria-label="Notifications"
              >
                <Bell size={20} className="text-foreground" />
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon size={20} className="text-foreground" />
                ) : (
                  <Sun size={20} className="text-foreground" />
                )}
              </button>

              {/* Sign In */}
              <Link
                href="/home"
                className="hidden sm:flex items-center gap-1.5 border border-border text-foreground text-sm font-medium px-3 py-2 rounded-lg hover:bg-muted active:scale-95 transition-all duration-150"
              >
                <LogIn size={16} />
                Sign In
              </Link>

              {/* Mobile menu */}
              <button
                onClick={() => setMobileOpen(v => !v)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? (
                  <X size={22} className="text-foreground" />
                ) : (
                  <Menu size={22} className="text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-200 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-card shadow-xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-bold text-lg text-primary">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-lg hover:bg-muted"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="p-4 flex flex-col gap-1">
            {navLinks?.map(link => (
              <Link
                key={`mobile-${link?.key}`}
                href={link?.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-3 rounded-lg text-sm font-medium text-foreground hover:text-primary hover:bg-muted transition-colors"
              >
                {link?.label}
              </Link>
            ))}
            <div className="my-3 border-t border-border" />
            <Link
              href="/home"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Heart size={18} />
              Saved Cars (3)
            </Link>
            <Link
              href="/home"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <User size={18} />
              My Profile
            </Link>
            <div className="mt-4">
              <Link
                href="/home"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-accent text-accent-foreground font-semibold text-sm px-4 py-3 rounded-lg"
              >
                <Plus size={16} />
                Sell a Car
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}