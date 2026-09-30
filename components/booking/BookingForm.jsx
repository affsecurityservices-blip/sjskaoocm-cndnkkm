"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "../../context/BookingContext";
import { calculatePrice } from "../../utils/calculatePrice";
import { createWhatsAppBookingUrl } from "../../utils/whatsapp";
import PriceSummary from "./PriceSummary";
import { Calendar, Clock, MapPin, User, Phone, ShieldCheck, ArrowRight } from "lucide-react";
import WhatsAppIcon from "../common/WhatsAppIcon";

export default function BookingForm({ guard }) {
  const router = useRouter();
  const { addBooking } = useBooking();

  const todayStr = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "VIP Private Party",
    address: "",
    date: todayStr,
    startTime: "20:00",
    hours: 4,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Real-time calculated price
  const priceBreakdown = useMemo(() => {
    return calculatePrice({
      pricePerHour: guard.pricePerHour,
      pricePerDay: guard.pricePerDay,
      hours: formData.hours,
      startTime: formData.startTime,
    });
  }, [guard.pricePerHour, guard.pricePerDay, formData.hours, formData.startTime]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in all mandatory fields (Name, Phone, and Venue Address).");
      return;
    }

    setIsSubmitting(true);

    const bookingPayload = {
      guardId: guard.id,
      guardName: guard.name,
      guardImage: guard.image,
      guardType: guard.type,
      name: formData.name,
      phone: formData.phone,
      eventType: formData.eventType,
      address: formData.address,
      date: formData.date,
      startTime: formData.startTime,
      hours: formData.hours,
      totalPrice: priceBreakdown.totalPrice,
      isNightSlot: priceBreakdown.isNightSlot,
    };

    const newBooking = addBooking(bookingPayload);

    // Generate WhatsApp Enquiry URL
    const whatsappUrl = createWhatsAppBookingUrl(newBooking);

    // Open WhatsApp in new tab for direct company messaging
    try {
      window.open(whatsappUrl, "_blank");
    } catch (err) {
      console.error(err);
    }

    setTimeout(() => {
      router.push(`/booking-success?bookingId=${newBooking.bookingId}`);
    }, 400);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-[#262636]">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            Guard Deployment Enquiry Form
          </h2>
          <span className="text-xs text-emerald-500 font-mono flex items-center gap-1">
            <WhatsAppIcon className="w-3.5 h-3.5 fill-current" /> Direct WhatsApp Enquiry
          </span>
        </div>

        {/* Customer Information */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-amber-500">
            Client Contact Info
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Customer Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 dark:text-gray-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-500" />
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vikram Malhotra"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-[#262636] focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 dark:text-gray-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-[#262636] focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none transition-colors"
              />
            </div>

          </div>
        </div>

        {/* Event & Location details */}
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#262636]">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-amber-500">
            Event & Deployment Venue
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Event Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 dark:text-gray-300">
                Type of Event / Security Request *
              </label>
              <select
                value={formData.eventType}
                onChange={(e) => handleChange("eventType", e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-[#262636] focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none cursor-pointer transition-colors"
              >
                <option value="VIP Private Party" className="bg-white dark:bg-[#16161F] text-slate-900 dark:text-white">VIP Private Party</option>
                <option value="Nightclub & Pub Bouncer" className="bg-white dark:bg-[#16161F] text-slate-900 dark:text-white">Nightclub & Pub Bouncer</option>
                <option value="Wedding Security" className="bg-white dark:bg-[#16161F] text-slate-900 dark:text-white">Wedding & Celebration</option>
                <option value="Corporate Event" className="bg-white dark:bg-[#16161F] text-slate-900 dark:text-white">Corporate Event</option>
                <option value="Personal Bodyguard Escort" className="bg-white dark:bg-[#16161F] text-slate-900 dark:text-white">Personal Bodyguard Escort</option>
                <option value="Property Premises Protection" className="bg-white dark:bg-[#16161F] text-slate-900 dark:text-white">Property / Premises Protection</option>
              </select>
            </div>

            {/* Venue Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 dark:text-gray-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                Venue Full Address *
              </label>
              <input
                type="text"
                required
                placeholder="Building, Street, Landmark, City"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-[#262636] focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none transition-colors"
              />
            </div>

          </div>
        </div>

        {/* Date, Time & Duration */}
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#262636]">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-amber-500">
            Shift Schedule & Duration
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Deployment Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 dark:text-gray-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                Deployment Date *
              </label>
              <input
                type="date"
                required
                min={todayStr}
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-[#262636] focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none transition-colors"
              />
            </div>

            {/* Start Time */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 dark:text-gray-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                Start Time *
              </label>
              <select
                value={formData.startTime}
                onChange={(e) => handleChange("startTime", e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-[#262636] focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none cursor-pointer transition-colors"
              >
                <option value="08:00" className="bg-white dark:bg-[#16161F] text-slate-900 dark:text-white">08:00 AM (Day Shift)</option>
                <option value="12:00" className="bg-white dark:bg-[#16161F] text-slate-900 dark:text-white">12:00 PM (Afternoon Shift)</option>
                <option value="16:00" className="bg-white dark:bg-[#16161F] text-slate-900 dark:text-white">04:00 PM (Evening Shift)</option>
                <option value="20:00" className="bg-white dark:bg-[#16161F] text-slate-900 dark:text-white">08:00 PM (Night Shift)</option>
                <option value="22:00" className="bg-white dark:bg-[#16161F] text-slate-900 dark:text-white">10:00 PM (Late Night - +20% Night Slot)</option>
                <option value="00:00" className="bg-white dark:bg-[#16161F] text-slate-900 dark:text-white">12:00 AM Midnight (+20% Night Slot)</option>
              </select>
            </div>

          </div>

          {/* Duration Slider / Counter */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-700 dark:text-gray-300">Duration (Hours)</span>
              <span className="text-amber-500 font-bold text-sm">
                {formData.hours} {formData.hours === 1 ? "Hour" : "Hours"}
                {formData.hours >= 8 && " (Daily Shift)"}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              step="1"
              value={formData.hours}
              onChange={(e) => handleChange("hours", Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2.5 bg-slate-200 dark:bg-[#0A0A0F] rounded-lg border border-slate-300 dark:border-[#262636]"
            />
            <div className="flex justify-between text-[10px] text-slate-500 dark:text-gray-400 font-mono">
              <span>1 hr</span>
              <span>8 hrs (Full Day Base)</span>
              <span>24 hrs</span>
            </div>
          </div>

        </div>

      </div>

      {/* Real-time Price Widget */}
      <PriceSummary priceBreakdown={priceBreakdown} guard={guard} />

      {/* Submit Enquiry Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-extrabold text-base flex items-center justify-center gap-3 transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? (
          <span>Opening WhatsApp Enquiry...</span>
        ) : (
          <>
            <WhatsAppIcon className="w-5 h-5 fill-black" />
            <span>Send Enquiry on WhatsApp</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}
