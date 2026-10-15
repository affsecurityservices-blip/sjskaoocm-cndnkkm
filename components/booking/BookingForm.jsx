"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "../../context/BookingContext";
import { useLanguage } from "../../context/LanguageContext";
import { calculatePrice } from "../../utils/calculatePrice";
import { createWhatsAppBookingUrl } from "../../utils/whatsapp";
import PriceSummary from "./PriceSummary";
import { Calendar, Clock, MapPin, User, Phone, ShieldCheck, ArrowRight, Sun, Moon, RotateCw, SlidersHorizontal, CheckCircle2 } from "lucide-react";
import WhatsAppIcon from "../common/WhatsAppIcon";

// Helper to format 24-hr time to 12-hr format (e.g. "08:00" -> "08:00 AM")
function format12Hour(time24) {
  if (!time24) return "";
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const m = mStr || "00";
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  h = h ? h : 12;
  return `${h.toString().padStart(2, "0")}:${m} ${ampm}`;
}

// Helper to add hours to 24-hr time string
function addHoursToTime(timeStr, hoursToAdd) {
  if (!timeStr) return "16:00";
  const [hStr, mStr] = timeStr.split(":");
  let totalM = parseInt(hStr, 10) * 60 + parseInt(mStr || "0", 10) + Math.round(hoursToAdd * 60);
  let finalH = Math.floor(totalM / 60) % 24;
  let finalM = totalM % 60;
  return `${String(finalH).padStart(2, "0")}:${String(finalM).padStart(2, "0")}`;
}

// Calculate hours difference between start and end
function calculateHoursDiff(startTime, endTime, isFullDay) {
  if (isFullDay) return 24;
  if (!startTime || !endTime) return 8;
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  let startM = sh * 60 + (sm || 0);
  let endM = eh * 60 + (em || 0);
  let diffM = endM - startM;
  if (diffM <= 0) {
    diffM += 24 * 60;
  }
  let hrs = Math.round((diffM / 60) * 10) / 10;
  return hrs === 0 ? 24 : hrs;
}

export default function BookingForm({ guard }) {
  const router = useRouter();
  const { addBooking } = useBooking();
  const { language, t } = useLanguage();

  const todayStr = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "VIP Private Party",
    address: "",
    date: todayStr,
    shiftMode: "day",
    startTime: "08:00",
    endTime: "16:00",
    hours: 8,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-detect shift based on time From & To
  const detectedShift = useMemo(() => {
    if (formData.shiftMode === "fullday" || formData.hours >= 24) {
      return {
        type: "fullday",
        label: "Full Day (24 Hours)",
        labelHi: "फुल डे (24 घंटे)",
        isNight: true,
        spansNextDay: true
      };
    }

    const [sh] = (formData.startTime || "08:00").split(":").map(Number);
    const [eh] = (formData.endTime || "16:00").split(":").map(Number);

    const isNight = sh >= 19 || sh < 5 || (sh >= 17 && formData.hours >= 6);
    const spansNextDay = eh <= sh && formData.hours < 24 && formData.hours > 0;

    if (isNight) {
      return {
        type: "night",
        label: "Night Shift",
        labelHi: "रात की शिफ्ट (Night Shift)",
        isNight: true,
        spansNextDay
      };
    }

    return {
      type: "day",
      label: "Day Shift",
      labelHi: "दिन की शिफ्ट (Day Shift)",
      isNight: false,
      spansNextDay
    };
  }, [formData.startTime, formData.endTime, formData.hours, formData.shiftMode]);

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

  const handleShiftPreset = (mode) => {
    if (mode === "day") {
      setFormData((prev) => ({
        ...prev,
        shiftMode: "day",
        startTime: "08:00",
        endTime: "16:00",
        hours: 8
      }));
    } else if (mode === "night") {
      setFormData((prev) => ({
        ...prev,
        shiftMode: "night",
        startTime: "20:00",
        endTime: "04:00",
        hours: 8
      }));
    } else if (mode === "fullday") {
      setFormData((prev) => ({
        ...prev,
        shiftMode: "fullday",
        startTime: "08:00",
        endTime: "08:00",
        hours: 24
      }));
    } else if (mode === "custom") {
      setFormData((prev) => ({
        ...prev,
        shiftMode: "custom"
      }));
    }
  };

  const handleStartTimeChange = (newStartTime) => {
    setFormData((prev) => {
      if (prev.shiftMode === "fullday" || prev.hours >= 24) {
        return {
          ...prev,
          startTime: newStartTime,
          endTime: newStartTime
        };
      }
      const newEndTime = addHoursToTime(newStartTime, prev.hours);
      return {
        ...prev,
        startTime: newStartTime,
        endTime: newEndTime
      };
    });
  };

  const handleEndTimeChange = (newEndTime) => {
    setFormData((prev) => {
      const calculatedHrs = calculateHoursDiff(prev.startTime, newEndTime, false);
      return {
        ...prev,
        endTime: newEndTime,
        hours: calculatedHrs,
        shiftMode: "custom"
      };
    });
  };

  const handleDurationChange = (newHours) => {
    setFormData((prev) => {
      if (newHours === 24) {
        return {
          ...prev,
          hours: 24,
          shiftMode: "fullday",
          endTime: prev.startTime
        };
      }
      const newEndTime = addHoursToTime(prev.startTime, newHours);
      return {
        ...prev,
        hours: newHours,
        endTime: newEndTime,
        shiftMode: prev.shiftMode === "fullday" ? "custom" : prev.shiftMode
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in all mandatory fields (Name, Phone, and Venue Address).");
      return;
    }

    setIsSubmitting(true);

    const shiftLabel = language === "hi" ? "कॉल बैक पर तय होगा" : "To be finalized on callback";

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
      shiftMode: "callback",
      shiftType: shiftLabel,
      startTime: "",
      endTime: "",
      hours: 8,
      totalPrice: 0,
      isNightSlot: false,
    };

    const newBooking = addBooking(bookingPayload);

    // Generate WhatsApp Enquiry URL
    const whatsappUrl = createWhatsAppBookingUrl({
      ...newBooking,
      shiftType: shiftLabel,
      startTime: format12Hour(formData.startTime),
      endTime: format12Hour(formData.endTime),
    });

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
            {t("bookingForm.header")}
          </h2>
          <span className="text-xs text-emerald-500 font-mono flex items-center gap-1">
            <WhatsAppIcon className="w-3.5 h-3.5 fill-current" /> {t("bookingForm.whatsappSub")}
          </span>
        </div>

        {/* Customer Information */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-amber-500">
            {t("bookingForm.clientSection")}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Customer Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 dark:text-gray-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-500" />
                {t("bookingForm.nameLabel")}
              </label>
              <input
                type="text"
                required
                placeholder={t("bookingForm.namePlaceholder")}
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-[#262636] focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 dark:text-gray-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                {t("bookingForm.phoneLabel")}
              </label>
              <input
                type="tel"
                required
                placeholder={t("bookingForm.phonePlaceholder")}
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
            {t("bookingForm.venueSection")}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Event Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 dark:text-gray-300">
                {t("bookingForm.eventTypeLabel")}
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
                {t("bookingForm.addressLabel")}
              </label>
              <input
                type="text"
                required
                placeholder={t("bookingForm.addressPlaceholder")}
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-[#262636] focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none transition-colors"
              />
            </div>

          </div>
        </div>

        {/* Deployment Date & Callback Notice */}
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#262636]">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-amber-500">
              {t("bookingForm.scheduleSection")}
            </h3>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5" />
              {language === "hi" ? "कॉल पर समय तय होगा" : "Shift Finalized on Call"}
            </span>
          </div>

          {/* Deployment Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-gray-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              {t("bookingForm.dateLabel")}
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

          {/* Direct Callback Notice */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 flex items-start gap-3">
            <PhoneCall className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
              <strong className="text-slate-900 dark:text-white block mb-0.5">
                {language === "hi" ? "शिफ्ट का समय और घंटे कंपनी कॉल पर तय करेगी" : "Shift Timings & Duration Finalized on Call"}
              </strong>
              {language === "hi"
                ? "इन्क्वायरी भेजने के बाद कंपनी प्रतिनिधि आपको सीधे कॉल करके ड्यूटी समय, शिफ्ट (दिन/रात) और अन्य विवरण फाइनल करेंगे।"
                : "After enquiry submission, our operations command will call you directly to discuss duty hours, day/night shift, and deployment specifics."}
            </div>
          </div>
        </div>

      </div>

      {/* Custom Quote on Call Notice */}
      <PriceSummary />

      {/* Submit Enquiry Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-extrabold text-base flex items-center justify-center gap-3 transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? (
          <span>{t("bookingForm.submitting")}</span>
        ) : (
          <>
            <WhatsAppIcon className="w-5 h-5 fill-black" />
            <span>{t("bookingForm.submitBtn")}</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}
