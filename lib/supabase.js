// Supabase REST API Client Helper (Dependency-Free)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const headers = {
  "apikey": SUPABASE_ANON_KEY,
  "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

/**
 * Save a new guard booking/request to Supabase
 */
export async function saveBookingToSupabase(booking) {
  try {
    const payload = {
      booking_id: booking.bookingId,
      guard_id: String(booking.guardId || ""),
      guard_name: booking.guardName || "General Guard",
      guard_image: booking.guardImage || "",
      guard_type: booking.guardType || "Security Guard",
      client_name: booking.name || booking.clientName || "",
      client_phone: booking.phone || booking.clientPhone || "",
      event_type: booking.eventType || "General Protection",
      address: booking.address || "",
      event_date: booking.date || booking.eventDate || null,
      start_time: booking.startTime || null,
      hours: Number(booking.hours || 0),
      total_price: Number(booking.totalPrice || 0),
      is_night_slot: Boolean(booking.isNightSlot),
      status: booking.status || "pending"
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn("Supabase insert warning:", errText);
      return { success: false, error: errText };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    console.error("Failed to save booking to Supabase:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Fetch all guard bookings from Supabase
 */
export async function fetchBookingsFromSupabase() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/bookings?select=*&order=created_at.desc`, {
      method: "GET",
      headers,
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error(`Supabase error ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();
    // Map database snake_case fields back to frontend camelCase
    return data.map((b) => ({
      bookingId: b.booking_id,
      guardId: b.guard_id,
      guardName: b.guard_name,
      guardImage: b.guard_image,
      guardType: b.guard_type,
      name: b.client_name,
      phone: b.client_phone,
      eventType: b.event_type,
      address: b.address,
      date: b.event_date,
      startTime: b.start_time,
      hours: b.hours,
      totalPrice: Number(b.total_price),
      isNightSlot: b.is_night_slot,
      status: b.status,
      createdAt: b.created_at
    }));
  } catch (err) {
    console.error("Failed to fetch bookings from Supabase:", err);
    return null;
  }
}

/**
 * Update booking status (e.g. cancel booking) in Supabase
 */
export async function updateBookingStatusInSupabase(bookingId, status) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/bookings?booking_id=eq.${encodeURIComponent(bookingId)}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status })
    });

    if (!res.ok) {
      throw new Error(`Supabase error ${res.status}`);
    }

    return true;
  } catch (err) {
    console.error("Failed to update booking status in Supabase:", err);
    return false;
  }
}
