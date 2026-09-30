import Link from "next/link";
import { ShieldCheck, MapPin, Award, ArrowRight, Ruler, Scale } from "lucide-react";
import Badge from "../common/Badge";
import RatingStars from "../common/RatingStars";
import { formatCurrency } from "../../utils/calculatePrice";

export default function GuardCard({ guard }) {
  const getBadgeVariant = (type) => {
    if (type === "Personal Bodyguard") return "bodyguard";
    if (type === "Bouncer") return "bouncer";
    return "security";
  };

  return (
    <div className="group bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] rounded-2xl overflow-hidden hover:border-amber-500/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] transition-all duration-300 flex flex-col justify-between shadow-sm">
      
      <div>
        {/* Card Header Image */}
        <div className="relative h-64 w-full overflow-hidden bg-black/40">
          <img
            src={guard.image}
            alt={guard.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          
          {/* Type Badge Top Left */}
          <div className="absolute top-3 left-3">
            <Badge variant={getBadgeVariant(guard.type)}>
              {guard.type}
            </Badge>
          </div>

          {/* Availability Badge Top Right */}
          <div className="absolute top-3 right-3">
            {guard.available ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available Now
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-800/80 border border-gray-700 text-gray-400 backdrop-blur-md">
                Booked
              </span>
            )}
          </div>

          {/* City & State Badge Bottom Left */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-gray-200 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 font-medium">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>{guard.city}{guard.state ? `, ${guard.state}` : ""}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          
          {/* Name & Rating */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors flex items-center gap-2">
                {guard.name}
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-500/80" />
                {guard.experience} Years Tactical Exp.
              </p>
            </div>
            <RatingStars rating={guard.rating} reviewsCount={guard.reviewsCount} />
          </div>

          {/* Physical Stats Row */}
          <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-[#0A0A0F]/60 p-2.5 rounded-xl border border-slate-200 dark:border-[#262636] text-xs">
            <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
              <Ruler className="w-3.5 h-3.5 text-amber-500" />
              <span>Height: <strong className="text-slate-900 dark:text-white">{guard.height}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
              <Scale className="w-3.5 h-3.5 text-amber-500" />
              <span>Weight: <strong className="text-slate-900 dark:text-white">{guard.weight}</strong></span>
            </div>
          </div>

          {/* Key Skills Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {guard.skills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-slate-100 dark:bg-[#262636]/60 text-slate-700 dark:text-gray-300 px-2 py-0.5 rounded border border-slate-200 dark:border-[#333346]"
              >
                {skill}
              </span>
            ))}
            {guard.skills.length > 3 && (
              <span className="text-[11px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30">
                +{guard.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Pricing & CTA */}
      <div className="p-5 pt-0 mt-2">
        <div className="pt-4 border-t border-slate-200 dark:border-[#262636] flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 dark:text-gray-400">Starting from</div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-amber-500">
                {formatCurrency(guard.pricePerHour)}
              </span>
              <span className="text-xs text-slate-500 dark:text-gray-400">/ hr</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-gray-400">
              {formatCurrency(guard.pricePerDay)} / day (8+ hrs)
            </div>
          </div>

          <Link
            href={`/guards/${guard.id}`}
            className="inline-flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500 text-amber-600 dark:text-amber-400 hover:text-black font-semibold text-xs px-4 py-2.5 rounded-xl border border-amber-500/30 hover:border-amber-500 transition-all duration-300 shadow-sm"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
