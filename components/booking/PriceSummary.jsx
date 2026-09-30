import { Moon, Clock, Sparkles, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "../../utils/calculatePrice";

export default function PriceSummary({ priceBreakdown, guard }) {
  if (!priceBreakdown) return null;

  const {
    hours,
    basePrice,
    appliedRate,
    isNightSlot,
    nightSurchargePercent,
    nightSurchargeAmount,
    totalPrice
  } = priceBreakdown;

  return (
    <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] rounded-2xl p-6 shadow-xl space-y-4 relative overflow-hidden transition-colors">
      
      {/* Decorative ambient background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#262636]">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Price Calculation
        </h3>
        <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-semibold">
          {appliedRate === "daily" ? "Daily Rate Applied (8+ Hrs)" : "Hourly Rate Applied"}
        </span>
      </div>

      <div className="space-y-3 text-sm text-slate-700 dark:text-gray-300">
        
        {/* Base Rate breakdown */}
        <div className="flex justify-between items-center">
          <span className="text-slate-500 dark:text-gray-400 flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-slate-400 dark:text-gray-500" />
            Duration ({hours} {hours === 1 ? "hour" : "hours"})
          </span>
          <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(basePrice)}</span>
        </div>

        {/* Rate description hint */}
        <div className="text-[11px] text-slate-600 dark:text-gray-400 bg-slate-50 dark:bg-[#0A0A0F] p-2.5 rounded-lg border border-slate-200 dark:border-[#262636] flex items-center justify-between">
          <span>
            {appliedRate === "daily"
              ? `Daily block base (${formatCurrency(guard.pricePerDay)}) + extra hours`
              : `Hourly rate @ ${formatCurrency(guard.pricePerHour)}/hr`}
          </span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
        </div>

        {/* Night Slot Surcharge */}
        {isNightSlot ? (
          <div className="flex justify-between items-center text-amber-600 dark:text-amber-400 bg-amber-500/10 p-3 rounded-xl border border-amber-500/30">
            <span className="flex items-center gap-2 text-xs font-medium">
              <Moon className="w-4 h-4 text-amber-500 shrink-0" />
              Night Slot Surcharge (+{nightSurchargePercent}%)
            </span>
            <span className="font-bold text-sm">+{formatCurrency(nightSurchargeAmount)}</span>
          </div>
        ) : (
          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-slate-400 dark:text-gray-600" />
              Night Shift Surcharge (10PM - 6AM)
            </span>
            <span>Standard Day Rate</span>
          </div>
        )}

      </div>

      {/* Final Total Price */}
      <div className="pt-4 border-t border-slate-200 dark:border-[#262636] flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">Total Deployment Cost</div>
          <div className="text-xs text-amber-600 dark:text-amber-500/80 font-medium">Inclusive of all tactical fees</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-amber-500 tracking-tight">
            {formatCurrency(totalPrice)}
          </div>
        </div>
      </div>

    </div>
  );
}
