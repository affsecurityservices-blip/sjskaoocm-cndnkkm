"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  ArrowRight,
  Camera,
  Radio,
  Lock,
  Users,
  UserCheck
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function HeroServiceSlider() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const slides = [
    {
      id: "manned-guarding",
      guardType: "Manned Guarding",
      titleEn: "Manned Security Guarding",
      titleHi: "सुरक्षा गार्ड (Manned Guarding)",
      descEn: "24/7 Verified Premises Defense & High-Vigilance Physical Security",
      descHi: "24/7 सत्यापित सुरक्षा गार्ड एवं सक्रिय परिसर रक्षा",
      badgeEn: "24/7 Active Protection",
      badgeHi: "24/7 सक्रिय सुरक्षा",
      image: "/images/services/manned-guarding.jpg",
      icon: Shield
    },
    {
      id: "cctv-surveillance",
      guardType: "CCTV Surveillance",
      titleEn: "Smart CCTV Surveillance",
      titleHi: "सीसीटीवी निगरानी (CCTV Monitoring)",
      descEn: "AI Command Center Monitoring, Optical Detection & Rapid Alerts",
      descHi: "AI कमांड सेंटर निगरानी एवं त्वरित अलार्म सिस्टम",
      badgeEn: "Smart Surveillance",
      badgeHi: "स्मार्ट निगरानी",
      image: "/images/services/cctv-surveillance.jpg",
      icon: Camera
    },
    {
      id: "armed-security",
      guardType: "Armed Security",
      titleEn: "Armed Tactical Security",
      titleHi: "सशस्त्र गनमैन सुरक्षा (Armed Security)",
      descEn: "Licensed Armed Gunners for Cash-in-Transit, Banks & High-Risk Sites",
      descHi: "लाइसेंस प्राप्त गनमैन, बैंक एवं उच्च जोखिम सुरक्षा",
      badgeEn: "Elite Armed Gunners",
      badgeHi: "सशस्त्र सुरक्षा दस्ता",
      image: "/images/services/armed-security.jpg",
      icon: Lock
    },
    {
      id: "vip-bodyguard",
      guardType: "Personal Bodyguard",
      titleEn: "VIP Executive Bodyguard",
      titleHi: "पर्सनल बॉडीगार्ड (VIP Protection)",
      descEn: "Close Protection Officers & Executive Motorcade Security Escorts",
      descHi: "वीआईपी क्लोज़ प्रोटेक्शन एवं पर्सनल सुरक्षा दस्ता",
      badgeEn: "Executive Escort",
      badgeHi: "वीआईपी एस्कॉर्ट",
      image: "/images/services/vip-bodyguard.jpg",
      icon: UserCheck
    },
    {
      id: "mobile-patrol",
      guardType: "Mobile Patrolling",
      titleEn: "Mobile Patrolling Fleet",
      titleHi: "मोबाइल गश्त (Mobile Patrol)",
      descEn: "High-Speed Patrol Vans, Scheduled Night Checks & Rapid Response",
      descHi: "त्वरित रिस्पांस पेट्रोल वैन एवं शेड्यूल रात्रि गश्त",
      badgeEn: "Rapid Response",
      badgeHi: "त्वरित रिस्पांस",
      image: "/images/services/mobile-patrol.jpg",
      icon: Radio
    },
    {
      id: "event-security",
      guardType: "Event Security",
      titleEn: "Event & Crowd Security",
      titleHi: "इवेंट एवं भीड़ सुरक्षा (Event Security)",
      descEn: "Crowd Control Contingents, Stage Perimeter & Bouncer Squads",
      descHi: "भीड़ नियंत्रण, स्टेज सुरक्षा एवं ट्रेंड बाउंसर स्क्वाड",
      badgeEn: "Crowd Management",
      badgeHi: "भीड़ नियंत्रण",
      image: "/images/services/event-security.jpg",
      icon: Users
    }
  ];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-play interval
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4200);
    return () => clearInterval(interval);
  }, [handleNext, isHovered]);

  // Touch Swipe Support for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="relative w-full max-w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-[#262636] bg-slate-900 shadow-2xl group transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Aspect Ratio Container */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] overflow-hidden bg-slate-950">
        
        {/* Slides rendering with smooth crossfade */}
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${
                isActive
                  ? "opacity-100 scale-100 pointer-events-auto z-10"
                  : "opacity-0 scale-105 pointer-events-none z-0"
              }`}
            >
              {/* Background Service Image */}
              <img
                src={slide.image}
                alt={slide.titleEn}
                className="w-full h-full object-cover object-center select-none"
                loading={idx === 0 ? "eager" : "lazy"}
              />

              {/* Multi-layer Gradient Overlays for High Contrast & Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent" />
              
              {/* Top Status Bar: Badge on left */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20">
                <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-amber-400 text-[10px] sm:text-xs font-black shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{language === "hi" ? slide.badgeHi : slide.badgeEn}</span>
                </div>
              </div>

              {/* Bottom Content Area */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 space-y-2 sm:space-y-3 z-20 text-left">
                
                {/* Title & Category */}
                <div>
                  <h3 className="text-base sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 drop-shadow-md">
                    <slide.icon className="w-4 h-4 sm:w-6 sm:h-6 text-amber-400 shrink-0" />
                    <span>{language === "hi" ? slide.titleHi : slide.titleEn}</span>
                  </h3>
                  <p className="text-[11px] sm:text-sm text-slate-300 font-medium line-clamp-2 max-w-lg mt-0.5 sm:mt-1 drop-shadow">
                    {language === "hi" ? slide.descHi : slide.descEn}
                  </p>
                </div>

                {/* Direct Action Row */}
                <div className="pt-1">
                  <Link
                    href={`/book?type=${encodeURIComponent(slide.guardType)}`}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-xs sm:text-sm shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>{language === "hi" ? "यह सेवा बुक करें" : "Book This Service"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>
          );
        })}

        {/* Top-Right Navigation Pill (Never overlaps text) */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-30 flex items-center gap-1 px-1.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-amber-400 shadow-xl">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-black transition-colors cursor-pointer active:scale-90"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <span className="font-mono font-bold px-1.5 text-[11px] sm:text-xs select-none">
            {String(currentIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-black transition-colors cursor-pointer active:scale-90"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

      </div>

      {/* Bottom Navigation & Indicator Bar (Clean, spacious, zero text collision) */}
      <div className="bg-slate-950/95 border-t border-slate-800/80 px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous service slide"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-900 border border-slate-800/90 text-[11px] sm:text-xs font-bold transition-all cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{language === "hi" ? "पिछला" : "Prev"}</span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {slides.map((s, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}: ${s.titleEn}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "w-7 sm:w-9 bg-amber-500 shadow-[0_0_8px_#F59E0B]"
                    : "w-2 sm:w-2.5 bg-slate-700 hover:bg-slate-500"
                }`}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next service slide"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-900 border border-slate-800/90 text-[11px] sm:text-xs font-bold transition-all cursor-pointer active:scale-95"
        >
          <span className="hidden sm:inline">{language === "hi" ? "अगला" : "Next"}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
