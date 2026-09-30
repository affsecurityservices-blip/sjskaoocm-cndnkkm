"use client";

import { useState, useMemo } from "react";

const initialFilterState = {
  state: "All States",
  city: "All Cities",
  type: "All Types",
  searchQuery: "",
  maxPrice: 2000,
  sortBy: "recommended"
};

export function useFilters(initialGuards = []) {
  const [filters, setFilters] = useState(initialFilterState);

  const resetFilters = () => {
    setFilters(initialFilterState);
  };

  const filteredGuards = useMemo(() => {
    return initialGuards.filter((guard) => {
      // State filter
      if (filters.state !== "All States" && guard.state !== filters.state) {
        return false;
      }
      // City filter
      if (filters.city !== "All Cities" && guard.city !== filters.city) {
        return false;
      }
      // Type filter
      if (filters.type !== "All Types" && guard.type !== filters.type) {
        return false;
      }
      // Price filter
      if (guard.pricePerHour > filters.maxPrice) {
        return false;
      }
      // Search query filter (name, skills, bio, city, state)
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = guard.name.toLowerCase().includes(q);
        const matchesSkill = guard.skills.some((s) => s.toLowerCase().includes(q));
        const matchesBio = guard.bio.toLowerCase().includes(q);
        const matchesCity = guard.city.toLowerCase().includes(q);
        const matchesState = (guard.state || "").toLowerCase().includes(q);
        if (!matchesName && !matchesSkill && !matchesBio && !matchesCity && !matchesState) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "price-asc") return a.pricePerHour - b.pricePerHour;
      if (filters.sortBy === "price-desc") return b.pricePerHour - a.pricePerHour;
      if (filters.sortBy === "rating-desc") return b.rating - a.rating;
      if (filters.sortBy === "exp-desc") return b.experience - a.experience;
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating;
    });
  }, [initialGuards, filters]);

  return {
    filters,
    setFilters,
    resetFilters,
    filteredGuards
  };
}
