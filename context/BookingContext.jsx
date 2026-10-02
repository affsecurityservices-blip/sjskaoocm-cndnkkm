"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { saveBookingToSupabase, fetchBookingsFromSupabase, updateBookingStatusInSupabase } from "../lib/supabase";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useLocalStorage("aegis_guard_bookings", []);

  // Fetch latest bookings from Supabase on mount
  useEffect(() => {
    async function syncFromSupabase() {
      const remoteBookings = await fetchBookingsFromSupabase();
      if (remoteBookings && Array.isArray(remoteBookings) && remoteBookings.length > 0) {
        setBookings((prev) => {
          // Merge local and remote bookings by bookingId
          const map = new Map();
          remoteBookings.forEach((b) => map.set(b.bookingId, b));
          prev.forEach((b) => {
            if (!map.has(b.bookingId)) {
              map.set(b.bookingId, b);
            }
          });
          return Array.from(map.values()).sort(
            (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
          );
        });
      }
    }
    syncFromSupabase();
  }, []);

  const addBooking = (newBookingData) => {
    const bookingId = `AGD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking = {
      bookingId,
      ...newBookingData,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    // Update local state immediately for snappy UX
    setBookings((prev) => [newBooking, ...prev]);

    // Save to Supabase database asynchronously
    saveBookingToSupabase(newBooking).then((res) => {
      if (res.success) {
        console.log("Successfully persisted booking to Supabase:", bookingId);
      } else {
        console.warn("Supabase save deferred or errored:", res.error);
      }
    });

    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.bookingId === bookingId ? { ...b, status: "cancelled" } : b
      )
    );

    // Update status in Supabase database
    updateBookingStatusInSupabase(bookingId, "cancelled");
  };

  const getBookingById = (bookingId) => {
    return bookings.find((b) => b.bookingId === bookingId);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        cancelBooking,
        getBookingById
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
