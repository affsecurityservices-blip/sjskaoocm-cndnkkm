"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Shield, Menu, X, Search, PhoneCall, Sun, Moon } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { useBooking } from "../../context/BookingContext";
import { useTheme } from "../../context/ThemeContext";
import { COMPANY_PHONE, COMPANY_WHATSAPP_NUMBER } from "../../utils/whatsapp";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { bookings } = useBooking();
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/guards", label: "Find Personnel" },
    { href: "/my-bookings", label: "Enquiry History", count: mounted && bookings ? bookings.length : 0 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#0A0A0F]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#262636] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 group-hover:border-amber-500 group-hover:bg-amber-500/20 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-wider text-slate-900 dark:text-white flex items-center gap-1">
                AEGIS<span className="text-amber-500">GUARD</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-500 dark:text-gray-400 block -mt-1 font-mono uppercase">
                Tactical Security V1
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors flex items-center gap-2 relative py-2 ${
                    isActive
                      ? "text-amber-500 font-bold"
                      : "text-slate-700 dark:text-gray-300 hover:text-amber-500"
                  }`}
                >
                  {link.label}
                  {link.count > 0 && (
                    <span className="bg-amber-500 text-black text-xs font-extrabold px-2 py-0.5 rounded-full">
                      {link.count}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full shadow-[0_0_8px_#F59E0B]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Direct WhatsApp & Call Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme Mode"
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#16161F] border border-slate-300 dark:border-[#262636] text-amber-500 flex items-center justify-center hover:scale-105 transition-all cursor-pointer shadow-sm"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-slate-700" />}
              </button>
            )}

            {/* Direct Phone Call Button */}
            <a
              href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`}
              className="inline-flex items-center justify-center gap-2 bg-slate-100 dark:bg-[#16161F] border border-slate-300 dark:border-[#262636] hover:border-amber-500/40 text-xs font-bold text-amber-500 px-3.5 py-2.5 rounded-xl transition-all shadow-sm"
            >
              <PhoneCall className="w-4 h-4 text-amber-500" />
              <span>Call Dispatch</span>
            </a>

            {/* Direct WhatsApp Button */}
            <a
              href={`https://api.whatsapp.com/send?phone=${COMPANY_WHATSAPP_NUMBER}&text=Hi%20AegisGuard%20Team,%20I%20want%20to%20enquire%20about%20booking%20a%20security%20guard.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/40 hover:bg-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-black font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-sm group"
            >
              <WhatsAppIcon className="w-4 h-4 fill-emerald-600 dark:fill-emerald-400 group-hover:fill-black" />
              <span>WhatsApp Chat</span>
            </a>

            <Link
              href="/guards"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-xs px-4 py-2.5 rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              Book Guard
            </Link>
          </div>

          {/* Mobile menu & Theme toggle */}
          <div className="md:hidden flex items-center gap-2">
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme Mode"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#16161F] border border-slate-300 dark:border-[#262636] text-amber-500 focus:outline-none"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-slate-800" />}
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#16161F] border border-slate-300 dark:border-[#262636] text-slate-800 dark:text-gray-300 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#16161F] border-b border-slate-200 dark:border-[#262636] px-4 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                    : "text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-[#262636]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{link.label}</span>
                  {link.count > 0 && (
                    <span className="bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                      {link.count}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}

          <div className="pt-2 border-t border-slate-200 dark:border-[#262636] space-y-2">
            <a
              href={`https://api.whatsapp.com/send?phone=${COMPANY_WHATSAPP_NUMBER}&text=Hi%20AegisGuard%20Team,%20I%20want%20to%20enquire%20about%20booking%20a%20security%20guard.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-center py-3 rounded-xl border border-emerald-500/40 text-xs"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" /> WhatsApp Direct Enquiry
            </a>

            <a
              href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-slate-100 dark:bg-[#0A0A0F] text-amber-500 font-bold text-center py-3 rounded-xl border border-slate-300 dark:border-amber-500/30 text-xs"
            >
              <PhoneCall className="w-4 h-4" /> Call Dispatch Center
            </a>

            <Link
              href="/guards"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-amber-500 text-black font-bold text-center py-3 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.4)] text-xs"
            >
              <Search className="w-4 h-4" />
              Browse Guard Roster
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
