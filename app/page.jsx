"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GUARDS } from "../data/guards";
import { CITIES, GUARD_TYPES } from "../data/cities";
import GuardCard from "../components/guards/GuardCard";
import CustomSelect from "../components/common/CustomSelect";
import { ShieldCheck, Search, ArrowRight, CheckCircle2, Lock, MapPin, Shield } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState("All Cities/Districts");
  const [selectedType, setSelectedType] = useState("All Types");

  const featuredGuards = GUARDS.filter((g) => g.featured).slice(0, 3);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (selectedCity !== "All Cities/Districts") queryParams.set("city", selectedCity);
    if (selectedType !== "All Types") queryParams.set("type", selectedType);
    router.push(`/guards?${queryParams.toString()}`);
  };

  return (
    <div className="space-y-20 pb-16 bg-slate-50 dark:bg-[#0A0A0F] text-slate-900 dark:text-[#E5E5E5] transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-200 dark:border-[#262636] bg-slate-100/70 dark:bg-[#0A0A0F] transition-colors duration-300">
        
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              ELITE PRIVATE PROTECTION. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 dark:from-amber-400 dark:via-amber-500 dark:to-amber-600">
                INSTANT DISPATCH.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-gray-300 leading-relaxed font-normal">
              Book verified Bouncers, Personal Bodyguards, and Event Security Operatives across major metro cities & districts in minutes. No contracts. Transparent pricing.
            </p>

            {/* Quick Search Card */}
            <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] p-4 sm:p-6 rounded-2xl shadow-xl hover:border-amber-500/40 transition-all text-left max-w-2xl mx-auto mt-8">
              <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                
                {/* Custom City/District Picker */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider block">
                    Location / District
                  </label>
                  <CustomSelect
                    options={CITIES}
                    value={selectedCity}
                    onChange={setSelectedCity}
                    icon={MapPin}
                    placeholder="Select City / District"
                  />
                </div>

                {/* Custom Guard Type Picker */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider block">
                    Guard Type
                  </label>
                  <CustomSelect
                    options={GUARD_TYPES}
                    value={selectedType}
                    onChange={setSelectedType}
                    icon={Shield}
                    placeholder="Select Guard Type"
                  />
                </div>

                {/* Search Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    Find Available Guards
                  </button>
                </div>

              </form>
            </div>

            {/* Metrics Badges */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] p-4 rounded-2xl shadow-md">
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">100%</div>
                <div className="text-xs font-semibold text-slate-600 dark:text-gray-300 mt-1">Background Checked</div>
              </div>
              <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] p-4 rounded-2xl shadow-md">
                <div className="text-2xl font-black text-amber-500 font-mono">25+</div>
                <div className="text-xs font-semibold text-slate-600 dark:text-gray-300 mt-1">Top Rated Personnel</div>
              </div>
              <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] p-4 rounded-2xl shadow-md">
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">15 States</div>
                <div className="text-xs font-semibold text-slate-600 dark:text-gray-300 mt-1">Districts Covered</div>
              </div>
              <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] p-4 rounded-2xl shadow-md">
                <div className="text-2xl font-black text-amber-500 font-mono">24/7</div>
                <div className="text-xs font-semibold text-slate-600 dark:text-gray-300 mt-1">Command Center</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FEATURED GUARDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-amber-500 uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4" /> Top Tier Roster
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Featured Tactical Personnel
            </h2>
          </div>
          <Link
            href="/guards"
            className="inline-flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 hover:underline font-semibold group"
          >
            <span>View All Personnel ({GUARDS.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGuards.map((guard) => (
            <GuardCard key={guard.id} guard={guard} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-slate-100 dark:bg-[#0F0F17] border-y border-slate-200 dark:border-[#262636] py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest">
              Seamless Deployment
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              How AegisGuard Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300">
              Three simple steps to secure your venue, VIP convoy, or private party.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] p-6 rounded-2xl relative space-y-4 hover:border-amber-500/40 transition-all shadow-md">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono font-bold text-xl flex items-center justify-center">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Select Your Guard</h3>
              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
                Filter by location, bodyguard height/weight, tactical skills, or specific guard role (Bouncer, Bodyguard, Premise Guard).
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] p-6 rounded-2xl relative space-y-4 hover:border-amber-500/40 transition-all shadow-md">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono font-bold text-xl flex items-center justify-center">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Set Schedule & Time</h3>
              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
                Choose hours and start time. Automatic calculation applies daily shift savings for 8+ hours and night slot +20% rates.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] p-6 rounded-2xl relative space-y-4 hover:border-amber-500/40 transition-all shadow-md">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono font-bold text-xl flex items-center justify-center">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Security Deployed</h3>
              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
                Receive instant booking confirmation ID. Guard arrives fully briefed and prepared at your specified venue address.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US / TRUST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest">
              Uncompromising Standards
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Why High-Profile Clients Trust AegisGuard
            </h2>
            
            <ul className="space-y-4 text-sm text-slate-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Strict Background Vetting:</strong> All guards undergo criminal background checks, identity verification, and physical fitness certification.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Ex-Commando & Tactical Expertise:</strong> Senior bodyguards are former military/police tactical unit veterans trained in close-quarters defense.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Transparent Hourly & Daily Rates:</strong> No hidden surcharges. Clear pricing breakdown provided prior to booking confirmation.
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] p-8 rounded-3xl space-y-6 shadow-xl relative">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-500 flex items-center justify-center">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Need Event Security?</h3>
                <p className="text-xs text-slate-500 dark:text-gray-300">Nightclubs • Weddings • VIP Escort</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
              Whether you need a single bodyguard for a VIP evening or a team of 10 bouncers for a stadium concert, our personnel are ready for rapid deployment.
            </p>
            <Link
              href="/guards"
              className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            >
              <Search className="w-4 h-4" />
              Browse Guard Roster
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
