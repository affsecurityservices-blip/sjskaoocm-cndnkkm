"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CITIES, GUARD_TYPES } from "../data/cities";
import CustomSelect from "../components/common/CustomSelect";
import WhatsAppIcon from "../components/common/WhatsAppIcon";
import HeroServiceSlider from "../components/home/HeroServiceSlider";
import { useLanguage } from "../context/LanguageContext";
import {
  COMPANY_NAME,
  DIRECTOR_NAME,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  COMPANY_WHATSAPP_NUMBER
} from "../utils/whatsapp";
import {
  ShieldCheck,
  Search,
  ArrowRight,
  CheckCircle2,
  Lock,
  MapPin,
  Shield,
  PhoneCall,
  Camera,
  Radio,
  Users,
  AlertTriangle,
  Award,
  Clock,
  UserCheck,
  FileCheck
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");

  const localizedGuardTypes = useMemo(() => {
    return GUARD_TYPES.map((type) => {
      if (type === "All Types") {
        return {
          value: type,
          label: language === "hi" ? "सभी गार्ड प्रकार (All Types)" : type
        };
      }
      if (language === "hi") {
        const hindiMap = {
          "Manned Guarding": "सुरक्षा गार्ड (Manned Guarding)",
          "CCTV Surveillance": "सीसीटीवी निगरानी (CCTV)",
          "Mobile Patrolling": "मोबाइल गश्त (Mobile Patrol)",
          "Event Security": "इवेंट एवं भीड़ सुरक्षा (Event Security)",
          "Risk Management": "रिस्क मैनेजमेंट (Risk Management)",
          "Armed Security": "सशस्त्र गनमैन (Armed Security)",
          "Bouncer": "बाउंसर (Bouncers)",
          "Personal Bodyguard": "पर्सनल बॉडीगार्ड (Personal Bodyguard)"
        };
        return {
          value: type,
          label: hindiMap[type] || type
        };
      }
      return type;
    });
  }, [language]);

  const submitButtonText = useMemo(() => {
    if (selectedType === "All Types" || !selectedType) {
      return language === "hi" ? "गार्ड बुक करें" : "Book Guard Now";
    }
    const typeLabelMap = {
      "Manned Guarding": language === "hi" ? "सुरक्षा गार्ड बुक करें" : "Book Manned Guard",
      "CCTV Surveillance": language === "hi" ? "सीसीटीवी बुक करें" : "Book CCTV Security",
      "Mobile Patrolling": language === "hi" ? "मोबाइल गश्त बुक करें" : "Book Mobile Patrol",
      "Event Security": language === "hi" ? "इवेंट सुरक्षा बुक करें" : "Book Event Security",
      "Risk Management": language === "hi" ? "रिस्क मैनेजमेंट बुक करें" : "Book Risk Audit",
      "Armed Security": language === "hi" ? "सशस्त्र गनमैन बुक करें" : "Book Armed Gunner",
      "Bouncer": language === "hi" ? "बाउंसर बुक करें" : "Book Bouncer",
      "Personal Bodyguard": language === "hi" ? "वीआईपी बॉडीगार्ड बुक करें" : "Book VIP Bodyguard"
    };
    return typeLabelMap[selectedType] || (language === "hi" ? `${selectedType} बुक करें` : `Book ${selectedType}`);
  }, [selectedType, language]);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (selectedCity.trim()) queryParams.set("city", selectedCity.trim());
    if (selectedType !== "All Types") queryParams.set("type", selectedType);
    router.push(`/book?${queryParams.toString()}`);
  };

  const coreServices = [
    {
      id: "manned-guarding",
      title: t("services.s1Title"),
      desc: t("services.s1Desc"),
      icon: Shield,
      badge: t("services.s1Badge")
    },
    {
      id: "cctv-surveillance",
      title: t("services.s2Title"),
      desc: t("services.s2Desc"),
      icon: Camera,
      badge: t("services.s2Badge")
    },
    {
      id: "mobile-patrolling",
      title: t("services.s3Title"),
      desc: t("services.s3Desc"),
      icon: Radio,
      badge: t("services.s3Badge")
    },
    {
      id: "event-security",
      title: t("services.s4Title"),
      desc: t("services.s4Desc"),
      icon: Users,
      badge: t("services.s4Badge")
    },
    {
      id: "risk-management",
      title: t("services.s5Title"),
      desc: t("services.s5Desc"),
      icon: AlertTriangle,
      badge: t("services.s5Badge")
    },
    {
      id: "armed-security",
      title: t("services.s6Title"),
      desc: t("services.s6Desc"),
      icon: Lock,
      badge: t("services.s6Badge")
    },
    {
      id: "bouncers-security",
      title: t("services.s7Title"),
      desc: t("services.s7Desc"),
      icon: Award,
      badge: t("services.s7Badge")
    },
    {
      id: "vip-bodyguards",
      title: t("services.s8Title"),
      desc: t("services.s8Desc"),
      icon: UserCheck,
      badge: t("services.s8Badge")
    }
  ];

  const keyFeatures = [
    {
      title: t("whyChoose.f1Title"),
      desc: t("whyChoose.f1Desc"),
      icon: FileCheck
    },
    {
      title: t("whyChoose.f2Title"),
      desc: t("whyChoose.f2Desc"),
      icon: Clock
    },
    {
      title: t("whyChoose.f3Title"),
      desc: t("whyChoose.f3Desc"),
      icon: CheckCircle2
    },
    {
      title: t("whyChoose.f4Title"),
      desc: t("whyChoose.f4Desc"),
      icon: ShieldCheck
    }
  ];

  return (
    <div className="space-y-20 pb-16 bg-slate-50 dark:bg-[#0A0A0F] text-slate-900 dark:text-[#E5E5E5] transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 border-b border-slate-200 dark:border-[#262636] bg-slate-100/70 dark:bg-[#0A0A0F] transition-colors duration-300">
        
        {/* Background ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-amber-500/10 rounded-full blur-[130px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Headline, Subtitle, Mobile Slider & Quick Search Card */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
              
              {/* ESTD 2026 & Tagline Badge */}
              <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[11px] sm:text-xs font-bold font-mono tracking-wider shadow-sm max-w-full">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
                <span>{t("hero.badge")}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                {t("hero.title1")} <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 dark:from-amber-400 dark:via-amber-500 dark:to-amber-600">
                  {t("hero.title2")}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                {t("hero.subtitle")}
              </p>

              {/* Mobile Hero Slider (Sliding seamlessly between headline and search) */}
              <div className="lg:hidden my-4 sm:my-6">
                <HeroServiceSlider />
              </div>

              {/* Quick Search Card */}
              <div className="relative z-40 bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] p-4 sm:p-6 rounded-2xl shadow-xl hover:border-amber-500/40 transition-all text-left max-w-2xl mx-auto lg:mx-0">
                <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                  
                  {/* Location / District Input */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider block">
                      {t("hero.locationLabel")}
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-amber-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        placeholder={language === "hi" ? "शहर / जिला दर्ज करें..." : "Enter City / District..."}
                        className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-[#262636] focus:border-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none transition-colors font-medium"
                      />
                    </div>
                  </div>

                  {/* Guard Type Picker */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider block">
                      {t("hero.guardTypeLabel")}
                    </label>
                    <CustomSelect
                      options={localizedGuardTypes}
                      value={selectedType}
                      onChange={setSelectedType}
                      icon={Shield}
                      placeholder="Select Guard Type"
                    />
                  </div>

                  {/* Dynamic Submit / Booking Button */}
                  <div>
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(245,158,11,0.35)] cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{submitButtonText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </form>
              </div>

            </div>

            {/* Right Column: Desktop Hero Service Slider */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent rounded-3xl blur-2xl opacity-75" />
                <HeroServiceSlider />
              </div>
            </div>

          </div>

          {/* Metrics Badges */}
          <div className="pt-8 sm:pt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
            <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] p-4 rounded-2xl shadow-md hover:border-amber-500/40 transition-all flex flex-col items-center justify-center">
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">{t("hero.stat1Val")}</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-gray-300 mt-1">{t("hero.stat1Desc")}</div>
            </div>

            <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] p-4 rounded-2xl shadow-md hover:border-amber-500/40 transition-all flex flex-col items-center justify-center">
              <div className="text-xl sm:text-2xl font-black text-amber-500 font-mono">{t("hero.stat2Val")}</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-gray-300 mt-1">{t("hero.stat2Desc")}</div>
            </div>

            <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] p-4 rounded-2xl shadow-md hover:border-amber-500/40 transition-all flex flex-col items-center justify-center">
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">{t("hero.stat3Val")}</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-gray-300 mt-1">{t("hero.stat3Desc")}</div>
            </div>

            <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] p-4 rounded-2xl shadow-md hover:border-amber-500/40 transition-all flex flex-col items-center justify-center">
              <div className="text-xl sm:text-2xl font-black text-amber-500 font-mono">{t("hero.stat4Val")}</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-gray-300 mt-1">{t("hero.stat4Desc")}</div>
            </div>
          </div>

        </div>
      </section>

      {/* DIRECTORS & EXECUTIVE LEADERSHIP SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-50/80 via-white to-amber-100/40 dark:from-slate-900 dark:via-slate-950 dark:to-black border-2 border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-2xl relative overflow-hidden text-slate-900 dark:text-white space-y-8 transition-colors">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="text-center sm:text-left space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500 text-black text-xs font-black uppercase tracking-wider shadow-sm">
              <Award className="w-4 h-4" />
              <span>{language === "hi" ? "कंपनी नेतृत्व एवं कमान" : "Company Command & Leadership"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {language === "hi" 
                ? "भारतीय सेना के अनुशासन व सुरक्षा निष्ठा से संचालित" 
                : "Guided by Indian Army Discipline & Elite Protection Standards"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {language === "hi"
                ? "AAF सिक्योरिटी सर्विसेज अनुभवी नेतृत्व व सैन्य कमान के तहत संचालित है, जो पूरे बिहार और भारत में अनुशासित सुरक्षा गार्ड, 24/7 सतर्कता और त्वरित तैनाती सुनिश्चित करती है।"
                : "AAF Security Services is spearheaded by veteran defense leadership, ensuring military-grade vigilance, rigorously vetted personnel, and round-the-clock rapid dispatch."}
            </p>
          </div>

          {/* Dual Director Executive Cards (Stacked Vertically: 50% Photo / 50% Bio Split) */}
          <div className="flex flex-col gap-8 relative z-10">
            
            {/* Card 1: Bhupendra Kumar Singh - Ex-Army Managing Director (50% Photo Left, 50% Bio Right) */}
            <div className="w-full bg-white/95 dark:bg-slate-900/90 border-2 border-amber-500/30 dark:border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-md dark:shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center transition-all hover:border-amber-500 hover:shadow-xl">
              
              {/* 50% Photo on Left */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border-2 border-amber-500 shadow-md">
                <img
                  src="/images/directors/bhupendra-kumar-singh.png"
                  alt="Bhupendra Kumar Singh - Ex-Army Managing Director"
                  className="w-full h-full object-cover object-top"
                />
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black font-black text-xs tracking-wider uppercase px-4 py-1 rounded-full whitespace-nowrap shadow-lg">
                  {language === "hi" ? "पूर्व सैनिक (Ex-Army)" : "Ex-Army Veteran"}
                </span>
              </div>

              {/* 50% Bio & Details on Right */}
              <div className="space-y-4 text-center md:text-left flex flex-col justify-center">
                <div>
                  {/* Indian Army on TOP */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-xs font-bold shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{language === "hi" ? "पूर्व सैनिक (Ex-Indian Army Veteran) • सैन्य कमान" : "Ex-Indian Army Veteran • Combat Leadership"}</span>
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2.5 tracking-tight">
                    {language === "hi" ? "भूपेंद्र कुमार सिंह" : "Bhupendra Kumar Singh"}
                  </h3>

                  {/* Managing Director BELOW */}
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold shadow-sm">
                    <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>{language === "hi" ? "संस्थापक एवं प्रबंध निदेशक" : "Managing Director & Founder"}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {language === "hi"
                    ? "भारतीय सेना के वर्षों के जमीनी अनुभव, शस्त्र कौशल और उच्च सुरक्षा अनुशासन के साथ AAF सिक्योरिटी सर्विसेज की ट्रेनिंग, भर्ती और वीआईपी सुरक्षा प्रोटोकॉल का नेतृत्व करते हैं।"
                    : "Bringing frontline Indian Army battlefield discipline, weapons expertise, and high-threat tactical protocols to executive security, recruitment, and premises defense."}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <a
                    href={`https://api.whatsapp.com/send?phone=${COMPANY_WHATSAPP_NUMBER}&text=Hi%20Bhupendra%20Sir,%20I%20want%20to%20enquire%20about%20AAF%20Security%20Services.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-black" />
                    <span>{language === "hi" ? "व्हाट्सएप चैट" : "WhatsApp"}</span>
                  </a>
                  <a
                    href="tel:9465857462"
                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 transition-all active:scale-95"
                  >
                    <PhoneCall className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>9465857462</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2: Manjeet Singh - Director (Operations & Field Deployment) (50% Bio Left, 50% Image Right) */}
            <div className="w-full bg-white/95 dark:bg-slate-900/90 border-2 border-amber-500/30 dark:border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-md dark:shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center transition-all hover:border-amber-500 hover:shadow-xl">
              
              {/* 50% Bio & Details on Left (on mobile: order-2, on md: order-1) */}
              <div className="space-y-4 text-center md:text-left flex flex-col justify-center order-2 md:order-1">
                <div>
                  {/* Field Operations on TOP */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-xs font-bold shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{language === "hi" ? "फील्ड डिप्लॉयमेंट एवं सुरक्षा प्रबंधन" : "Field Operations & Security Logistics"}</span>
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2.5 tracking-tight">
                    {language === "hi" ? "मंजीत सिंह" : "Manjeet Singh"}
                  </h3>

                  {/* Director Operations BELOW */}
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>{language === "hi" ? "निदेशक - ऑपरेशन्स" : "Director (Operations & Deployment)"}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {language === "hi"
                    ? "जिला स्तर पर जवानों की मुस्तैदी, 24/7 पेट्रोलिंग गश्त, क्लाइंट समन्वय और आपातकालीन बैकअप रिस्पांस की कमान संभालते हैं।"
                    : "Spearheading regional guard mobilization, corporate client security coordination, 24/7 mobile patrolling squads, and rapid incident response."}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <a
                    href={`https://api.whatsapp.com/send?phone=${COMPANY_WHATSAPP_NUMBER}&text=Hi%20Manjeet%20Singh%20Sir,%20I%20want%20to%20enquire%20about%20AAF%20Security%20Services.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-black" />
                    <span>{language === "hi" ? "व्हाट्सएप चैट" : "WhatsApp"}</span>
                  </a>
                  <a
                    href="tel:9465857462"
                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 transition-all active:scale-95"
                  >
                    <PhoneCall className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>9465857462</span>
                  </a>
                </div>
              </div>

              {/* 50% Photo / Avatar on Right (on mobile: order-1, on md: order-2) */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl border-2 border-amber-500/40 dark:border-amber-500/60 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-slate-100 dark:from-slate-800 dark:via-slate-850 dark:to-slate-950 flex flex-col items-center justify-center p-6 text-center shadow-md dark:shadow-xl order-1 md:order-2">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-amber-500/15 border-2 border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-inner mb-3">
                  <UserCheck className="w-12 h-12 sm:w-16 sm:h-16" />
                </div>
                <span className="text-xs uppercase text-slate-500 dark:text-slate-400 font-bold tracking-widest">Director</span>
                <span className="text-base font-black text-amber-600 dark:text-amber-400 tracking-wide mt-0.5">Operations & Deployment</span>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black font-black text-xs tracking-wider uppercase px-4 py-1 rounded-full whitespace-nowrap shadow-lg">
                  {language === "hi" ? "फील्ड कमान" : "Field Command"}
                </span>
              </div>

            </div>

          </div>

          {/* Bottom Registered Office Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-slate-900/80 border border-amber-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs transition-colors">
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-500 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-bold">
                  {language === "hi" ? "रजिस्टर्ड हेड ऑफिस" : "Registered Headquarters"}
                </span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold leading-tight block">
                  {COMPANY_ADDRESS}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-bold text-amber-700 dark:text-amber-400 text-xs shrink-0">
              <a href="tel:9465857462" className="hover:underline flex items-center gap-1 bg-white hover:bg-amber-50/50 dark:bg-black/40 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-slate-800 shadow-sm transition-colors">
                <PhoneCall className="w-3 h-3 text-amber-600 dark:text-amber-500" /> 9465857462
              </a>
              <a href="tel:9730218260" className="hover:underline bg-white hover:bg-amber-50/50 dark:bg-black/40 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-slate-800 shadow-sm transition-colors">
                9730218260
              </a>
              <a href="tel:7004951129" className="hover:underline bg-white hover:bg-amber-50/50 dark:bg-black/40 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-slate-800 shadow-sm transition-colors">
                7004951129
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* OUR 8 CORE SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/30">
            {t("services.tag")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            {t("services.title")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreServices.map((service) => {
            const IconComp = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] p-6 rounded-2xl space-y-4 hover:border-amber-500/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] transition-all duration-300 group shadow-md flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#0A0A0F] text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-[#262636]">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-[#262636]/60">
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    <span>{t("services.requestService")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* KEY FEATURES BANNER */}
      <section className="bg-slate-100 dark:bg-[#0F0F17] border-y border-slate-200 dark:border-[#262636] py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest">
              {t("whyChoose.tag")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t("whyChoose.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] p-6 rounded-2xl space-y-3 shadow-md text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{feat.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-2xl text-black space-y-2 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide">
              {t("whyChoose.ctaTitle")}
            </h3>
            <p className="text-xs font-bold opacity-90">
              {t("whyChoose.ctaDesc")}
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
