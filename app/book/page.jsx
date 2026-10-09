"use client";

import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CITIES } from "../../data/cities";
import CustomSelect from "../../components/common/CustomSelect";
import WhatsAppIcon from "../../components/common/WhatsAppIcon";
import { useLanguage } from "../../context/LanguageContext";
import { useBooking } from "../../context/BookingContext";
import { createWhatsAppBookingUrl, DIRECTOR_NAME, COMPANY_PHONE } from "../../utils/whatsapp";
import {
  ShieldCheck,
  User,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Shield,
  Users,
  FileText,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Sparkles
} from "lucide-react";

function BookingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, t } = useLanguage();
  const { addBooking } = useBooking();

  const initialCity = searchParams.get("city") || "All Cities/Districts";
  const initialType = searchParams.get("type") || "All Types";
  const initialService = searchParams.get("service") || "";

  const todayStr = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: initialCity,
    guardType: initialType !== "All Types" ? initialType : "Manned Guarding",
    guardCount: 1,
    address: "",
    date: todayStr,
    startTime: "20:00",
    hours: 8,
    specialNotes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Localization for dropdowns
  const localizedCities = useMemo(() => {
    return CITIES.map((city) => {
      if (city === "All Cities/Districts") {
        return {
          value: city,
          label: language === "hi" ? "सभी शहर / जिला (All Cities)" : city
        };
      }
      return city;
    });
  }, [language]);

  const serviceOptions = [
    { value: "Manned Guarding", label: language === "hi" ? "सुरक्षा गार्ड (Manned Guarding)" : "Manned Guarding (Premises Security)", baseRate: 600 },
    { value: "CCTV Surveillance", label: language === "hi" ? "सीसीटीवी निगरानी (CCTV Surveillance)" : "CCTV Surveillance & Monitoring", baseRate: 800 },
    { value: "Mobile Patrolling", label: language === "hi" ? "मोबाइल गश्त (Mobile Patrolling)" : "Mobile Patrolling & Patrol Van", baseRate: 1000 },
    { value: "Event Security", label: language === "hi" ? "इवेंट एवं भीड़ सुरक्षा (Event Security)" : "Event Security & Crowd Control", baseRate: 900 },
    { value: "Risk Management", label: language === "hi" ? "रिस्क मैनेजमेंट (Risk Management)" : "Risk Management & Security Audit", baseRate: 1200 },
    { value: "Armed Security", label: language === "hi" ? "सशस्त्र गनमैन (Armed Security)" : "Armed Security Gunners", baseRate: 1500 },
    { value: "Bouncer", label: language === "hi" ? "बाउंसर (Bouncers & Club Protection)" : "Bouncers & Club Protection", baseRate: 1200 },
    { value: "Personal Bodyguard", label: language === "hi" ? "पर्सनल बॉडीगार्ड (VIP Bodyguard)" : "VIP Personal Bodyguard Escort", baseRate: 1800 }
  ];

  // Dynamic price estimation
  const priceEstimate = useMemo(() => {
    const selectedSvc = serviceOptions.find((s) => s.value === formData.guardType);
    const baseRate = selectedSvc ? selectedSvc.baseRate : 600;
    
    // Check night slot
    const hourNum = parseInt(formData.startTime.split(":")[0], 10);
    const isNight = hourNum >= 22 || hourNum < 6;
    const nightMultiplier = isNight ? 1.2 : 1.0;

    const singleGuardTotal = Math.round(baseRate * (formData.hours / 8) * nightMultiplier);
    const grandTotal = singleGuardTotal * formData.guardCount;

    return {
      baseRate,
      isNight,
      singleGuardTotal,
      grandTotal
    };
  }, [formData.guardType, formData.hours, formData.startTime, formData.guardCount]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      alert(
        language === "hi"
          ? "कृपया सभी आवश्यक फ़ील्ड (नाम, फ़ोन नंबर, और पूरा पता) भरें।"
          : "Please fill in all required fields (Name, Phone Number, and Full Address)."
      );
      return;
    }

    setIsSubmitting(true);

    const bookingPayload = {
      guardId: `SRV-${Date.now()}`,
      guardName: `${formData.guardCount}x ${formData.guardType}`,
      guardType: formData.guardType,
      name: formData.name,
      phone: formData.phone,
      eventType: `${formData.guardType} (${formData.city !== "All Cities/Districts" ? formData.city : "Aurangabad / Bihar"})`,
      address: `${formData.address}${formData.city !== "All Cities/Districts" ? `, ${formData.city}` : ""}`,
      date: formData.date,
      startTime: formData.startTime,
      hours: formData.hours,
      totalPrice: priceEstimate.grandTotal,
      isNightSlot: priceEstimate.isNight,
      specialNotes: formData.specialNotes
    };

    const newBooking = addBooking(bookingPayload);

    // Call server notification API in background (Option B - toggled via ENABLE_SERVER_WHATSAPP_NOTIFY)
    fetch("/api/notify-whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId: newBooking.bookingId,
        name: formData.name,
        phone: formData.phone,
        guardType: formData.guardType,
        city: formData.city,
        address: bookingPayload.address,
        date: formData.date,
        startTime: formData.startTime,
        hours: formData.hours,
        totalPrice: priceEstimate.grandTotal,
        specialNotes: formData.specialNotes
      })
    }).catch((err) => console.error("Background WhatsApp notify trigger error:", err));

    // Create WhatsApp URL for direct client redirect (Option A - ALWAYS ACTIVE)
    const whatsappUrl = createWhatsAppBookingUrl({
      bookingId: newBooking.bookingId,
      guardName: `${formData.guardCount}x ${formData.guardType}`,
      guardType: formData.guardType,
      name: formData.name,
      phone: formData.phone,
      eventType: formData.guardType,
      address: bookingPayload.address,
      date: formData.date,
      startTime: formData.startTime,
      hours: formData.hours,
      totalPrice: priceEstimate.grandTotal
    });

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* HEADER BANNER */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold font-mono uppercase tracking-wider">
          <Shield className="w-4 h-4 text-amber-500" />
          <span>{language === "hi" ? "गार्ड बुकिंग एवं सुरक्षा इन्क्वायरी" : "Official Guard Booking Portal"}</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {language === "hi" ? "सुरक्षा गार्ड बुकिंग फॉर्म" : "Book Security Services"}
        </h1>
        
        <p className="text-sm sm:text-base text-slate-600 dark:text-gray-300 max-w-xl mx-auto">
          {language === "hi"
            ? "नीचे अपनी आवश्यकता दर्ज करें। आपकी इन्क्वायरी सीधे हमारे डायरेक्टर भूपेंद्र कुमार (सोनू सिंह) को प्राप्त होगी।"
            : "Fill in your security deployment details below. Your request will be directly dispatched to Director Sonu Singh."}
        </p>
      </div>

      {/* MAIN FORM */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
          
          {/* SECTION 1: CLIENT DETAILS */}
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-amber-500 flex items-center gap-2 border-b border-slate-200 dark:border-[#262636] pb-3">
              <User className="w-4 h-4" />
              {language === "hi" ? "1. क्लाइंट संपर्क जानकारी" : "1. Client Information"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-gray-200 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-500" />
                  {language === "hi" ? "आपका पूरा नाम *" : "Full Name *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === "hi" ? "जैसे: भूपेंद्र कुमार" : "e.g. Rahul Sharma"}
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-[#262636] focus:border-amber-500 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-gray-200 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  {language === "hi" ? "मोबाइल नंबर *" : "Phone Number *"}
                </label>
                <input
                  type="tel"
                  required
                  placeholder={language === "hi" ? "10 अंकों का मोबाइल नंबर" : "+91 98765 43210"}
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-[#262636] focus:border-amber-500 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none transition-colors"
                />
              </div>

            </div>
          </div>

          {/* SECTION 2: SERVICE & REQUIREMENTS */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-amber-500 flex items-center gap-2 border-b border-slate-200 dark:border-[#262636] pb-3">
              <ShieldCheck className="w-4 h-4" />
              {language === "hi" ? "2. सुरक्षा आवश्यकता एवं स्थान" : "2. Security & Location Requirements"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              {/* City / District */}
              <div className="space-y-1.5 sm:col-span-1">
                <label className="text-xs font-bold text-slate-700 dark:text-gray-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  {language === "hi" ? "शहर / जिला *" : "City / District *"}
                </label>
                <CustomSelect
                  options={localizedCities}
                  value={formData.city}
                  onChange={(val) => handleChange("city", val)}
                  icon={MapPin}
                  placeholder="Select City"
                />
              </div>

              {/* Service Type */}
              <div className="space-y-1.5 sm:col-span-1">
                <label className="text-xs font-bold text-slate-700 dark:text-gray-200 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-500" />
                  {language === "hi" ? "सुरक्षा प्रकार *" : "Security Type *"}
                </label>
                <select
                  value={formData.guardType}
                  onChange={(e) => handleChange("guardType", e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-[#262636] focus:border-amber-500 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none cursor-pointer transition-colors"
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-white dark:bg-[#16161F] text-slate-900 dark:text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Number of Guards */}
              <div className="space-y-1.5 sm:col-span-1">
                <label className="text-xs font-bold text-slate-700 dark:text-gray-200 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-500" />
                  {language === "hi" ? "गार्ड्स की संख्या *" : "Number of Guards *"}
                </label>
                <select
                  value={formData.guardCount}
                  onChange={(e) => handleChange("guardCount", Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-[#262636] focus:border-amber-500 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none cursor-pointer transition-colors"
                >
                  <option value={1}>1 Guard / Operative</option>
                  <option value={2}>2 Guards</option>
                  <option value={3}>3 Guards</option>
                  <option value={5}>5 Guards (Team)</option>
                  <option value={10}>10+ Guards (Large Contingent)</option>
                </select>
              </div>

            </div>

            {/* Venue Address */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-slate-700 dark:text-gray-200 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                {language === "hi" ? "स्थान / पूरा पता (Deployment Venue) *" : "Full Venue Address *"}
              </label>
              <textarea
                rows={2}
                required
                placeholder={
                  language === "hi"
                    ? "जैसे: नर्बदेश्वर नगर, भरथौली रोड, जसोइया, औरंगाबाद (बिहार)"
                    : "Complete venue details, landmark, street, building name"
                }
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-[#262636] focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* SECTION 3: DATE & TIME */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-amber-500 flex items-center gap-2 border-b border-slate-200 dark:border-[#262636] pb-3">
              <Calendar className="w-4 h-4" />
              {language === "hi" ? "3. समय एवं शेड्यूल" : "3. Deployment Schedule"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-gray-200 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  {language === "hi" ? "तारीख (Deployment Date) *" : "Deployment Date *"}
                </label>
                <input
                  type="date"
                  required
                  min={todayStr}
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-[#262636] focus:border-amber-500 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none transition-colors"
                />
              </div>

              {/* Start Time */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-gray-200 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  {language === "hi" ? "शुरुआती समय *" : "Shift Start Time *"}
                </label>
                <select
                  value={formData.startTime}
                  onChange={(e) => handleChange("startTime", e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-[#262636] focus:border-amber-500 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none cursor-pointer transition-colors"
                >
                  <option value="08:00" className="bg-white dark:bg-[#16161F]">08:00 AM (Day Shift)</option>
                  <option value="12:00" className="bg-white dark:bg-[#16161F]">12:00 PM (Afternoon Shift)</option>
                  <option value="16:00" className="bg-white dark:bg-[#16161F]">04:00 PM (Evening Shift)</option>
                  <option value="20:00" className="bg-white dark:bg-[#16161F]">08:00 PM (Night Shift)</option>
                  <option value="22:00" className="bg-white dark:bg-[#16161F]">10:00 PM (Late Night - Night Slot)</option>
                  <option value="00:00" className="bg-white dark:bg-[#16161F]">12:00 AM Midnight (Night Slot)</option>
                </select>
              </div>

            </div>

            {/* Hours Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-gray-200">
                  {language === "hi" ? "ड्यूटी अवधि (Hours):" : "Shift Duration:"}
                </span>
                <span className="text-amber-500 font-mono text-sm">
                  {formData.hours} {formData.hours === 1 ? "Hour" : "Hours"}
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="24"
                step="4"
                value={formData.hours}
                onChange={(e) => handleChange("hours", Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2.5 bg-slate-200 dark:bg-[#0A0A0F] rounded-lg border border-slate-300 dark:border-[#262636]"
              />
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-gray-400 font-mono">
                <span>4 hrs (Half Day)</span>
                <span>8 hrs (Full Day Base)</span>
                <span>12 hrs</span>
                <span>24 hrs (Full 24/7)</span>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-slate-700 dark:text-gray-200 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                {language === "hi" ? "अतिरिक्त जानकारी / टिप्पणी (Optional)" : "Special Instructions / Notes (Optional)"}
              </label>
              <input
                type="text"
                placeholder={
                  language === "hi"
                    ? "जैसे: गनमैन या विशेष वर्दी की आवश्यकता"
                    : "e.g. Uniform type, armed requirement, VIP security escort"
                }
                value={formData.specialNotes}
                onChange={(e) => handleChange("specialNotes", e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A0A0F] border border-slate-200 dark:border-[#262636] focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none transition-colors"
              />
            </div>

          </div>

          {/* ESTIMATED PRICING SUMMARY BOX */}
          <div className="bg-slate-50 dark:bg-[#0F0F17] border border-slate-200 dark:border-[#262636] p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#262636] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {language === "hi" ? "अनुमानित लागत (Estimated Total)" : "Estimated Pricing Summary"}
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-500 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {language === "hi" ? "पारदर्शी बिलिंग" : "Transparent Billing"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500 dark:text-gray-400 block">{language === "hi" ? "सेवा प्रकार:" : "Service:"}</span>
                <span className="font-bold text-slate-900 dark:text-white">{formData.guardType}</span>
              </div>

              <div>
                <span className="text-slate-500 dark:text-gray-400 block">{language === "hi" ? "गार्ड्स संख्या:" : "Personnel:"}</span>
                <span className="font-bold text-slate-900 dark:text-white">{formData.guardCount} Guard(s)</span>
              </div>

              <div>
                <span className="text-slate-500 dark:text-gray-400 block">{language === "hi" ? "अवधि:" : "Duration:"}</span>
                <span className="font-bold text-slate-900 dark:text-white">{formData.hours} Hours</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-[#262636] flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-gray-400 block">
                  {language === "hi" ? "अनुमानित शुल्क (Estimated Total):" : "Grand Total Rate:"}
                </span>
                <span className="text-2xl font-black text-amber-500 font-mono">
                  ₹{priceEstimate.grandTotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="text-right text-[11px] text-slate-500 dark:text-gray-400">
                <span>{language === "hi" ? "डायरेक्टर:" : "Director:"} </span>
                <span className="font-bold text-slate-900 dark:text-white block">{DIRECTOR_NAME}</span>
              </div>
            </div>
          </div>

        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-black text-base sm:text-lg flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <span>{language === "hi" ? "इन्क्वायरी भेजी जा रही है..." : "Opening WhatsApp Dispatch..."}</span>
          ) : (
            <>
              <WhatsAppIcon className="w-6 h-6 fill-black" />
              <span>
                {language === "hi"
                  ? "व्हाट्सएप पर डायरेक्ट इन्क्वायरी भेजें"
                  : "Send Guard Enquiry on WhatsApp"}
              </span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        {/* DIRECT CALL HELP */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-500 dark:text-gray-400">
            {language === "hi" ? "या सीधे कॉल पर बात करें:" : "Or call direct command hotline:"}{" "}
            <a
              href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`}
              className="font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              9730218260 • 9465857462
            </a>
          </p>
        </div>

      </form>

    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-600 dark:text-gray-400">
        Loading booking form...
      </div>
    }>
      <BookingPageContent />
    </Suspense>
  );
}
