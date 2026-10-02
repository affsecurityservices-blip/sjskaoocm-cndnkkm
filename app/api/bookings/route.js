import { NextResponse } from "next/server";
import { saveBookingToSupabase, fetchBookingsFromSupabase, updateBookingStatusInSupabase } from "../../../lib/supabase";

export async function GET() {
  const bookings = await fetchBookingsFromSupabase();
  if (bookings === null) {
    return NextResponse.json({ success: false, message: "Failed to fetch from Supabase" }, { status: 500 });
  }
  return NextResponse.json({ success: true, bookings });
}

export async function POST(request) {
  try {
    const bookingPayload = await request.json();
    const result = await saveBookingToSupabase(bookingPayload);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: result.data });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { bookingId, status } = await request.json();
    const success = await updateBookingStatusInSupabase(bookingId, status);
    return NextResponse.json({ success });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
