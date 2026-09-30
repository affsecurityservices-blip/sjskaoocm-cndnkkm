"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GUARDS } from "../../data/guards";
import { useFilters } from "../../hooks/useFilters";
import FilterBar from "../../components/guards/FilterBar";
import GuardGrid from "../../components/guards/GuardGrid";
import { Shield } from "lucide-react";

function GuardsContent() {
  const searchParams = useSearchParams();
  const { filters, setFilters, resetFilters, filteredGuards } = useFilters(GUARDS);

  useEffect(() => {
    const cityParam = searchParams.get("city");
    const typeParam = searchParams.get("type");
    if (cityParam || typeParam) {
      setFilters((prev) => ({
        ...prev,
        city: cityParam || prev.city,
        type: typeParam || prev.type,
      }));
    }
  }, [searchParams, setFilters]);

  return (
    <div>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
        totalResults={filteredGuards.length}
      />
      <GuardGrid guards={filteredGuards} />
    </div>
  );
}

export default function GuardsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0F] text-slate-900 dark:text-[#E5E5E5] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header Banner - Centered Alignment */}
        <div className="mb-10 text-center flex flex-col items-center justify-center space-y-3">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold border border-amber-500/30">
            <Shield className="w-3.5 h-3.5 text-amber-500" />
            <span>Active Roster Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white text-center tracking-tight">
            Security Operatives & Bodyguards
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 text-center max-w-xl mx-auto leading-relaxed">
            Filter personnel by state, city, tactical type, budget rate, or physical credentials.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-12 text-amber-500">Loading Guard Roster...</div>}>
          <GuardsContent />
        </Suspense>

      </div>
    </div>
  );
}
