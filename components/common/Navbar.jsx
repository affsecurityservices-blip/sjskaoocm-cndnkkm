"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Shield, Menu, X, Search, PhoneCall, Sun, Moon, Globe } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { useBooking } from "../../context/BookingContext";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { COMPANY_PHONE, COMPANY_WHATSAPP_NUMBER } from "../../utils/whatsapp";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { bookings } = useBooking();
  const { toggleTheme, isDark } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/book", label: t("nav.bookGuard") },
    { href: "/my-bookings", label: t("nav.enquiryHistory"), count: mounted && bookings ? bookings.length : 0 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#0A0A0F]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#262636] transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0 shrink">
            <img
              src="/images/logo.png"
              alt="AAF Security"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-[0_2px_12px_rgba(245,158,11,0.35)] shrink-0 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="min-w-0">
              <span className="text-base sm:text-xl font-black tracking-wider text-slate-900 dark:text-white flex items-center gap-1 sm:gap-1.5 truncate">
                <span className="text-amber-500 font-extrabold">AAF</span> SECURITY
              </span>
              <span className="text-[10px] sm:text-xs tracking-wide text-slate-500 dark:text-gray-300 block -mt-0.5 font-bold truncate">
                {language === "hi" ? "विश्वसनीय सुरक्षा • 2026" : "Trusted Security • Estd 2026"}
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
                  className={`text-base sm:text-[17px] font-semibold transition-colors flex items-center gap-2 relative py-2 ${
                    isActive
                      ? "text-amber-500 font-extrabold"
                      : "text-slate-800 dark:text-gray-200 hover:text-amber-500"
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

          {/* Direct Actions & Options Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            
            {/* Language Switcher Option */}
            {mounted && (
              <button
                onClick={toggleLanguage}
                aria-label="Toggle Language"
                className="h-10 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 shrink-0"
                title="Switch Language / भाषा बदलें"
              >
                <Globe className="w-4 h-4 text-amber-500" />
                <span>{language === "hi" ? "EN" : "हिंदी"}</span>
              </button>
            )}

            {/* Theme Toggle Option */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme Mode"
                className="h-10 w-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>
            )}

            {/* Direct Phone Call Button */}
            <a
              href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`}
              className="h-10 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 hover:border-amber-500/50 font-bold text-xs inline-flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 shrink-0"
            >
              <PhoneCall className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{t("nav.callNow")}</span>
            </a>

            {/* Direct WhatsApp Button */}
            <a
              href={`https://api.whatsapp.com/send?phone=${COMPANY_WHATSAPP_NUMBER}&text=Hi%20AAF%20Security%20Team,%20I%20want%20to%20enquire%20about%20booking%20a%20security%20guard.`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/50 font-bold text-xs inline-flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 shrink-0"
            >
              <WhatsAppIcon className="w-4 h-4 fill-emerald-500 shrink-0" />
              <span>{t("nav.whatsAppChat")}</span>
            </a>

            {/* Primary Action CTA: Book Guard */}
            <Link
              href="/book"
              className="h-10 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs inline-flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] active:scale-95 shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>{t("nav.bookGuard")}</span>
            </Link>
          </div>

          {/* Mobile menu & Theme toggle */}
          <div className="md:hidden flex items-center gap-2 shrink-0">
            {mounted && (
              <button
                onClick={toggleLanguage}
                aria-label="Toggle Language"
                className="h-9 px-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-bold inline-flex items-center gap-1 shrink-0"
              >
                <Globe className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === "hi" ? "EN" : "हिंदी"}</span>
              </button>
            )}

            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme Mode"
                className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-amber-500 flex items-center justify-center shrink-0"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-gray-200 flex items-center justify-center shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                className={`block py-2 text-lg font-semibold transition-colors ${
                  isActive
                    ? "text-amber-500 font-extrabold"
                    : "text-slate-800 dark:text-gray-200 hover:text-amber-500"
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

          <div className="pt-4 border-t border-slate-200 dark:border-[#262636] grid grid-cols-2 gap-3">
            <a
              href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`}
              className="h-11 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-[#262636] rounded-xl font-bold text-xs flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-amber-500" />
              <span>{t("nav.callNow")}</span>
            </a>

            <a
              href={`https://api.whatsapp.com/send?phone=${COMPANY_WHATSAPP_NUMBER}&text=Hi%20AAF%20Security%20Team,%20I%20want%20to%20enquire%20about%20booking%20a%20security%20guard.`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-[#262636] rounded-xl font-bold text-xs flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 fill-emerald-500" />
              <span>{t("nav.whatsAppChat")}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
