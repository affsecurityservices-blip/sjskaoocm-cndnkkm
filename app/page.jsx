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

      {/* DIRECTOR LEADERSHIP & CONTACT CARD BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500/10 via-slate-100 to-amber-500/10 dark:from-amber-500/10 dark:via-[#16161F] dark:to-amber-500/10 border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Director Information */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-black uppercase tracking-wider">
                <UserCheck className="w-4 h-4" /> {t("director.tag")}
              </div>
              
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
                {t("director.title")}
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-gray-300 leading-relaxed">
                {t("director.desc")}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-2 bg-white dark:bg-[#0A0A0F] px-4 py-2 rounded-xl border border-slate-200 dark:border-[#262636] font-mono font-bold text-amber-600 dark:text-amber-400">
                  <PhoneCall className="w-4 h-4 text-amber-500" />
                  <span>9730218260 • 9465857462 • 7004951129</span>
                </div>

                <a
                  href={`https://api.whatsapp.com/send?phone=${COMPANY_WHATSAPP_NUMBER}&text=Hi%20Sonu%20Singh%20Sir,%20I%20want%20to%20enquire%20about%20AAF%20Security%20Services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold px-4 py-2 rounded-xl transition-all shadow-md"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-black" />
                  {t("director.whatsappBtn")}
                </a>
              </div>
            </div>

            {/* Address & Office Box */}
            <div className="lg:col-span-5 bg-white dark:bg-[#0A0A0F] p-6 rounded-2xl border border-slate-200 dark:border-[#262636] space-y-4 shadow-xl">
              <h3 className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-amber-500 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {t("director.officeTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-gray-200 leading-relaxed font-semibold">
                {t("director.companyAddress")}
              </p>
              <div className="pt-2 border-t border-slate-200 dark:border-[#262636] flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-gray-400">{t("director.emailLabel")}</span>
                <a href={`mailto:${COMPANY_EMAIL}`} className="font-bold text-amber-600 dark:text-amber-400 hover:underline">
                  {COMPANY_EMAIL}
                </a>
              </div>
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
