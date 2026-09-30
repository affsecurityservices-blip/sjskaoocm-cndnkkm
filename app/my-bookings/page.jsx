"use client";

import { useState } from "react";
import Link from "next/link";
import { useBooking } from "../../context/BookingContext";
import BookingCard from "../../components/booking/BookingCard";
import { CalendarCheck, Shield, Search, Inbox, AlertTriangle } from "lucide-react";

export default function MyBookingsPage() {
  const { bookings, cancelBooking } = useBooking();
  const [activeTab, setActiveTab] = useState("all");

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "all") return true;
    return b.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0F] text-slate-900 dark:text-[#E5E5E5] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Page Header - Centered */}
        <div className="flex flex-col items-center justify-center text-center space-y-3 pb-6 border-b border-slate-200 dark:border-[#262636]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold border border-amber-500/30">
            <CalendarCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>Local Storage Client History</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white text-center">My Active Enquiries</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 text-center max-w-md mx-auto">
            Manage your requested guard deployments and check real-time dispatch status.
          </p>
          <div className="pt-2">
            <Link
              href="/guards"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)]"
            >
              <Search className="w-4 h-4" />
              Book Another Guard
            </Link>
          </div>
        </div>

        {/* Filter Tabs - Centered */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {["all", "pending", "confirmed", "completed", "cancelled"].map((tab) => {
            const count =
              tab === "all"
                ? bookings.length
                : bookings.filter((b) => b.status === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === tab
                    ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)] font-bold"
                    : "bg-white dark:bg-[#16161F] text-slate-700 dark:text-gray-400 hover:text-amber-500 border border-slate-200 dark:border-[#262636]"
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] ${
                    activeTab === tab
                      ? "bg-black text-amber-400"
                      : "bg-slate-100 dark:bg-[#262636] text-slate-700 dark:text-gray-300"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.bookingId}
                booking={booking}
                onCancel={cancelBooking}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] rounded-2xl p-12 text-center max-w-md mx-auto space-y-4 my-8 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Enquiries Found</h3>
            <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
              {activeTab === "all"
                ? "You haven't requested any guard deployments yet. Browse our active personnel directory to submit your first enquiry."
                : `No enquiries currently categorized under "${activeTab}".`}
            </p>
            <Link
              href="/guards"
              className="inline-flex items-center gap-2 bg-amber-500 text-black font-bold text-xs px-5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)]"
            >
              <Search className="w-4 h-4" />
              Explore Guard Roster
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
