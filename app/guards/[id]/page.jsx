"use client";

import { use } from "react";
import Link from "next/link";
import { GUARDS } from "../../../data/guards";
import Badge from "../../../components/common/Badge";
import RatingStars from "../../../components/common/RatingStars";
import BookingForm from "../../../components/booking/BookingForm";
import { formatCurrency } from "../../../utils/calculatePrice";
import {
  ShieldCheck,
  MapPin,
  Award,
  Ruler,
  Scale,
  Languages,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";

export default function GuardDetailPage({ params }) {
  const resolvedParams = use(params);
  const guardId = resolvedParams.id;

  const guard = GUARDS.find((g) => g.id === guardId);

  if (!guard) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0F] text-slate-900 dark:text-[#E5E5E5] flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Guard Profile Not Found</h1>
          <p className="text-sm text-slate-600 dark:text-gray-400">
            The requested security operative ID standard could not be located in our active directory.
          </p>
          <Link
            href="/guards"
            className="inline-flex items-center gap-2 text-xs bg-amber-500 text-black font-bold px-4 py-2.5 rounded-xl shadow-md"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Guard Directory
          </Link>
        </div>
      </div>
    );
  }

  const getBadgeVariant = (type) => {
    if (type === "Personal Bodyguard") return "bodyguard";
    if (type === "Bouncer") return "bouncer";
    return "security";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0F] text-slate-900 dark:text-[#E5E5E5] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Back button */}
        <Link
          href="/guards"
          className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-gray-300 hover:text-amber-500 bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] px-3.5 py-2 rounded-xl transition-colors shadow-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Personnel Listing
        </Link>

        {/* Main Grid: Detail + Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Guard Profile Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] rounded-2xl overflow-hidden shadow-xl space-y-6">
              
              {/* Header Image */}
              <div className="relative h-80 w-full bg-black">
                <img
                  src={guard.image}
                  alt={guard.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant={getBadgeVariant(guard.type)}>{guard.type}</Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <div className="flex items-center gap-1.5 text-gray-200 font-medium">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span>Stationed in <strong className="text-white">{guard.city}</strong></span>
                  </div>
                  <RatingStars rating={guard.rating} reviewsCount={guard.reviewsCount} />
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-6 pt-0 space-y-6">
                
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    {guard.name}
                    <ShieldCheck className="w-6 h-6 text-amber-500" />
                  </h1>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1 font-mono font-semibold">
                    <Award className="w-4 h-4" />
                    {guard.experience} Years Certified Tactical Experience
                  </p>
                </div>

                {/* Physical Credentials Grid */}
                <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-[#0A0A0F] p-4 rounded-xl border border-slate-200 dark:border-[#262636] text-xs">
                  <div className="space-y-1">
                    <div className="text-slate-500 dark:text-gray-400 flex items-center gap-1">
                      <Ruler className="w-3.5 h-3.5 text-amber-500" /> Height
                    </div>
                    <div className="text-base font-bold text-slate-900 dark:text-white font-mono">{guard.height}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-slate-500 dark:text-gray-400 flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5 text-amber-500" /> Weight
                    </div>
                    <div className="text-base font-bold text-slate-900 dark:text-white font-mono">{guard.weight}</div>
                  </div>

                  <div className="space-y-1 col-span-2 pt-2 border-t border-slate-200 dark:border-[#262636]">
                    <div className="text-slate-500 dark:text-gray-400 flex items-center gap-1">
                      <Languages className="w-3.5 h-3.5 text-amber-500" /> Languages Spoken
                    </div>
                    <div className="text-xs text-slate-900 dark:text-white font-medium">
                      {guard.languages.join(" • ")}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-500">
                    Background Briefing
                  </h3>
                  <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed bg-slate-50 dark:bg-[#0A0A0F]/60 p-3.5 rounded-xl border border-slate-200 dark:border-[#262636]">
                    {guard.bio}
                  </p>
                </div>

                {/* Tactical Skills */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-500">
                    Specialized Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {guard.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-lg border border-amber-500/30 font-medium flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-amber-500" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing Callout */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-gray-400 block font-medium">Base Rate</span>
                    <span className="text-lg font-black text-amber-500">
                      {formatCurrency(guard.pricePerHour)} <span className="text-xs font-normal text-slate-500 dark:text-gray-400">/ hour</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 dark:text-gray-400 block font-medium">Daily Shift (8+ hrs)</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white">
                      {formatCurrency(guard.pricePerDay)} <span className="text-xs font-normal text-slate-500 dark:text-gray-400">/ day</span>
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Booking Form Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <BookingForm guard={guard} />
          </div>

        </div>

      </div>
    </div>
  );
}
