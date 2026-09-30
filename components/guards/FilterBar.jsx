"use client";

import { STATES, GROUPED_CITIES, GUARD_TYPES } from "../../data/cities";
import CustomSelect from "../common/CustomSelect";
import { Search, Filter, RotateCcw, MapPin, Shield, DollarSign, Globe } from "lucide-react";

export default function FilterBar({ filters, setFilters, resetFilters, totalResults = 0 }) {
  const sortOptions = [
    { label: "Featured Personnel", value: "recommended" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Top Rated", value: "rating-desc" },
    { label: "Most Experienced", value: "exp-desc" }
  ];

  const currentSortLabel = sortOptions.find(o => o.value === filters.sortBy)?.label || "Featured Personnel";

  return (
    <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] rounded-2xl p-5 mb-8 shadow-xl space-y-5 transition-colors">
      
      {/* Search Input + Header */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search guard name, state, city, tactical skill (e.g. Armed, VIP, Convoy)..."
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-[#262636] focus:border-amber-500 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Results Counter & Reset Button */}
        <div className="flex items-center justify-between md:justify-end gap-4">
          <div className="text-xs text-slate-600 dark:text-gray-400 font-mono">
            Personnel Deployed: <span className="text-amber-500 font-bold text-sm">{totalResults}</span>
          </div>

          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-gray-300 hover:text-amber-500 bg-slate-100 dark:bg-[#0A0A0F] hover:bg-slate-200 dark:hover:bg-[#262636] border border-slate-200 dark:border-[#262636] px-3 py-2 rounded-lg transition-colors cursor-pointer font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        </div>

      </div>

      {/* Custom Select Dropdowns Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-slate-200 dark:border-[#262636]">
        
        {/* State Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 block">
            Select State
          </label>
          <CustomSelect
            options={STATES}
            value={filters.state}
            onChange={(val) => setFilters((prev) => ({ ...prev, state: val, city: "All Cities/Districts" }))}
            icon={Globe}
            placeholder="Select State"
          />
        </div>

        {/* City Filter (State Grouped) */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 block">
            Select City / District
          </label>
          <CustomSelect
            options={GROUPED_CITIES}
            value={filters.city}
            onChange={(val) => setFilters((prev) => ({ ...prev, city: val }))}
            icon={MapPin}
            placeholder="Select City"
          />
        </div>

        {/* Guard Type Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 block">
            Guard Type
          </label>
          <CustomSelect
            options={GUARD_TYPES}
            value={filters.type}
            onChange={(val) => setFilters((prev) => ({ ...prev, type: val }))}
            icon={Shield}
            placeholder="Select Guard Type"
          />
        </div>

        {/* Max Hourly Rate Filter */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-gray-300">
            <span className="flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-amber-500" />
              Max Rate
            </span>
            <span className="text-amber-500 font-bold">₹{filters.maxPrice}/hr</span>
          </div>
          <div className="pt-2">
            <input
              type="range"
              min="250"
              max="2000"
              step="50"
              value={filters.maxPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-[#0A0A0F] rounded-lg border border-slate-300 dark:border-[#262636]"
            />
          </div>
        </div>

        {/* Sort By */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 block">
            Sort Personnel
          </label>
          <CustomSelect
            options={sortOptions}
            value={currentSortLabel}
            onChange={(selectedLabel) => {
              const matched = sortOptions.find(o => o.label === selectedLabel || o.value === selectedLabel);
              if (matched) setFilters((prev) => ({ ...prev, sortBy: matched.value }));
            }}
            icon={Filter}
            placeholder="Sort Personnel"
          />
        </div>

      </div>

    </div>
  );
}
