"use client";

import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useLocalStorage("aegis_guard_bookings", []);

  const addBooking = (newBookingData) => {
    const bookingId = `AGD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking = {
      bookingId,
      ...newBookingData,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.bookingId === bookingId ? { ...b, status: "cancelled" } : b
      )
    );
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
