import { NextResponse } from "next/server";
import { STATE_CITIES_MAP, CITIES, STATES, GUARD_TYPES } from "../../../data/cities";

export async function GET() {
  return NextResponse.json({
    success: true,
    totalStates: STATE_CITIES_MAP.length,
    totalCities: CITIES.length - 1, // Exclude 'All Cities'
    stateCitiesMap: STATE_CITIES_MAP,
    cities: CITIES,
    states: STATES,
    guardTypes: GUARD_TYPES
  });
}
