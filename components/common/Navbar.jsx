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
    { href: "/guards", label: t("nav.findPersonnel") },
    { href: "/my-bookings", label: t("nav.enquiryHistory"), count: mounted && bookings ? bookings.length : 0 },
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
              <span className="text-xl font-black tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="text-amber-500 font-extrabold">AAF</span> SECURITY
              </span>
              <span className="text-[11px] sm:text-xs tracking-wide text-slate-500 dark:text-gray-300 block -mt-0.5 font-bold">
                {language === "hi" ? "विश्वसनीय सुरक्षा • स्थापना 2026" : "Trusted Security • Estd 2026"}
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

          {/* Direct WhatsApp & Call Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Language Switcher Button */}
            {mounted && (
              <button
                onClick={toggleLanguage}
                aria-label="Toggle Language"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-black transition-all text-xs sm:text-sm font-extrabold cursor-pointer shadow-sm"
                title="Switch Language / भाषा बदलें"
              >
                <Globe className="w-4 h-4" />
                <span>{language === "hi" ? "EN" : "हिंदी"}</span>
              </button>
            )}

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
              className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-[#16161F] text-amber-400 border border-slate-800 dark:border-[#262636] hover:bg-amber-500 hover:text-black hover:border-amber-500 text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-md group"
            >
              <PhoneCall className="w-4 h-4 text-amber-400 group-hover:text-black transition-colors" />
              <span>{t("nav.callNow")}</span>
            </a>

            {/* Direct High Contrast Official Deep WhatsApp Button */}
            <a
              href={`https://api.whatsapp.com/send?phone=${COMPANY_WHATSAPP_NUMBER}&text=Hi%20AAF%20Security%20Team,%20I%20want%20to%20enquire%20about%20booking%20a%20security%20guard.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#075E54] hover:bg-[#128C7E] text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-md border border-[#128C7E]/50 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>{t("nav.whatsAppChat")}</span>
            </a>

            <Link
              href="/guards"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-[0_0_15px_rgba(245,158,11,0.35)] cursor-pointer"
            >
              <Search className="w-4 h-4" />
              {t("nav.bookGuard")}
            </Link>
          </div>

          {/* Mobile menu & Theme toggle */}
          <div className="md:hidden flex items-center gap-2">
            {mounted && (
              <button
                onClick={toggleLanguage}
                aria-label="Toggle Language"
                className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold"
              >
                {language === "hi" ? "EN" : "हिंदी"}
              </button>
            )}

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
              className="py-3 bg-slate-900 dark:bg-[#0A0A0F] text-amber-400 border border-slate-800 dark:border-[#262636] rounded-xl font-extrabold text-sm flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>{t("nav.callNow")}</span>
            </a>

            <a
              href={`https://api.whatsapp.com/send?phone=${COMPANY_WHATSAPP_NUMBER}&text=Hi%20AAF%20Security%20Team,%20I%20want%20to%20enquire%20about%20booking%20a%20security%20guard.`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 bg-[#075E54] text-white rounded-xl font-extrabold text-sm flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>{t("nav.whatsAppChat")}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
