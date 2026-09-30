import { NextResponse } from "next/server";
import { GUARDS } from "../../../data/guards";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "All Cities";
  const state = searchParams.get("state") || "All States";
  const type = searchParams.get("type") || "All Types";
  const search = searchParams.get("search") || "";
  const maxPrice = Number(searchParams.get("maxPrice")) || 2000;

  const filtered = GUARDS.filter((guard) => {
    if (city !== "All Cities" && guard.city !== city) return false;
    if (state !== "All States" && guard.state !== state) return false;
    if (type !== "All Types" && guard.type !== type) return false;
    if (guard.pricePerHour > maxPrice) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = guard.name.toLowerCase().includes(q);
      const matchCity = guard.city.toLowerCase().includes(q);
      const matchState = (guard.state || "").toLowerCase().includes(q);
      const matchSkill = guard.skills.some((s) => s.toLowerCase().includes(q));
      if (!matchName && !matchCity && !matchState && !matchSkill) return false;
    }

    return true;
  });

  return NextResponse.json({
    success: true,
    count: filtered.length,
    totalPersonnel: GUARDS.length,
    guards: filtered
  });
}
