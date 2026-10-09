"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
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
  Sparkles,
  Camera,
  Radio,
  Sun,
  Moon,
  RotateCw,
  SlidersHorizontal
} from "lucide-react";

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

function BookingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, t } = useLanguage();
  const { addBooking } = useBooking();

  const initialCity = searchParams.get("city") || "";
  const initialType = searchParams.get("type") || "";

  const todayStr = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: initialCity === "All Cities/Districts" ? "" : initialCity,
    guardType: initialType && initialType !== "All Types" ? initialType : "Manned Guarding",
    guardCount: 1,
    address: "",
    date: todayStr,
    shiftMode: "day",
    startTime: "08:00",
    endTime: "16:00",
    hours: 8,
    specialNotes: ""
  });

  // Pre-fill state whenever searchParams changes
  useEffect(() => {
    const cityParam = searchParams.get("city");
    const typeParam = searchParams.get("type");
    if (cityParam !== null || typeParam !== null) {
      setFormData((prev) => ({
        ...prev,
        city: cityParam && cityParam !== "All Cities/Districts" ? cityParam : prev.city,
        guardType: typeParam && typeParam !== "All Types" ? typeParam : prev.guardType
      }));
    }
  }, [searchParams]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Quantity & Unit Config based on selected Service
  const quantityConfig = useMemo(() => {
    switch (formData.guardType) {
      case "CCTV Surveillance":
        return {
          label: language === "hi" ? "सीसीटीवी कैमरा / सेटअप *" : "CCTV Setup & Cameras *",
          icon: Camera,
          options: [
            { value: 1, label: language === "hi" ? "1 लोकेशन / कैमरा सेटअप" : "1 Location / Camera Setup" },
            { value: 2, label: language === "hi" ? "2-4 कैमरा मॉनिटरिंग सेटअप" : "2-4 Cameras Setup" },
            { value: 4, label: language === "hi" ? "4-8 कैमरा लाइव मॉनिटरिंग" : "4-8 Cameras & Live Setup" },
            { value: 8, label: language === "hi" ? "फुल परिसर (8+ कैमरा सिस्टम)" : "Full Premises (8+ Cameras System)" }
          ]
        };
      case "Mobile Patrolling":
        return {
          label: language === "hi" ? "गश्त वाहन / यूनिट्स *" : "Patrol Vans / Units *",
          icon: Radio,
          options: [
            { value: 1, label: language === "hi" ? "1 गश्त वाहन / पेट्रोल वैन" : "1 Patrol Van / Mobile Unit" },
            { value: 2, label: language === "hi" ? "2 गश्त वाहन / यूनिट्स" : "2 Patrol Vans / Units" },
            { value: 3, label: language === "hi" ? "3 पेट्रोल वैन फ्लीट" : "3 Patrol Fleet Units" },
            { value: 5, label: language === "hi" ? "फुल एरिया मोबाइल फ्लीट (5+)" : "Full Area Fleet (5+ Units)" }
          ]
        };
      case "Risk Management":
        return {
          label: language === "hi" ? "ऑडिट दायरा / साइट्स *" : "Audit Scope & Sites *",
          icon: ShieldCheck,
          options: [
            { value: 1, label: language === "hi" ? "1 परिसर सुरक्षा ऑडिट" : "1 Facility Security Audit" },
            { value: 2, label: language === "hi" ? "मल्टी-साइट रिस्क ऑडिट" : "Multi-Site Risk Audit" },
            { value: 3, label: language === "hi" ? "वीआईपी थ्रेट असेसमेंट" : "VIP Threat Assessment" },
            { value: 5, label: language === "hi" ? "कॉर्पोरेट सम्पूर्ण रिस्क ऑडिट" : "Corporate Comprehensive Audit" }
          ]
        };
      case "Armed Security":
        return {
          label: language === "hi" ? "सशस्त्र गनमैन संख्या *" : "Armed Gunners Count *",
          icon: Shield,
          options: [
            { value: 1, label: language === "hi" ? "1 सशस्त्र गनमैन (Gunman)" : "1 Armed Gunman" },
            { value: 2, label: language === "hi" ? "2 सशस्त्र गनमैन" : "2 Armed Gunners" },
            { value: 3, label: language === "hi" ? "3 सशस्त्र गनमैन" : "3 Armed Gunners" },
            { value: 5, label: language === "hi" ? "सशस्त्र सुरक्षा दस्ता (5+)" : "Armed Security Squad (5+)" }
          ]
        };
      case "Bouncer":
        return {
          label: language === "hi" ? "बाउंसरों की संख्या *" : "Number of Bouncers *",
          icon: Users,
          options: [
            { value: 1, label: language === "hi" ? "1 बाउंसर (Bouncer)" : "1 Bouncer" },
            { value: 2, label: language === "hi" ? "2 बाउंसर" : "2 Bouncers" },
            { value: 4, label: language === "hi" ? "4 बाउंसर स्क्वाड" : "4 Bouncers (Squad)" },
            { value: 6, label: language === "hi" ? "6+ बाउंसर (इवेंट / क्लब)" : "6+ Bouncers (Event / Club)" }
          ]
        };
      case "Personal Bodyguard":
        return {
          label: language === "hi" ? "बॉडीगार्ड संख्या *" : "Number of Bodyguards *",
          icon: Users,
          options: [
            { value: 1, label: language === "hi" ? "1 वीआईपी बॉडीगार्ड" : "1 VIP Bodyguard" },
            { value: 2, label: language === "hi" ? "2 वीआईपी बॉडीगार्ड" : "2 VIP Bodyguards" },
            { value: 4, label: language === "hi" ? "क्लोज़ प्रोटेक्शन टीम (4+)" : "Close Protection Team (4+)" }
          ]
        };
      case "Event Security":
        return {
          label: language === "hi" ? "इवेंट सुरक्षा दल संख्या *" : "Event Security Personnel *",
          icon: Users,
          options: [
            { value: 2, label: language === "hi" ? "2 सुरक्षा कर्मी" : "2 Security Personnel" },
            { value: 4, label: language === "hi" ? "4 सुरक्षा गार्ड्स" : "4 Security Guards" },
            { value: 6, label: language === "hi" ? "6 इवेंट बाउंसर / गार्ड्स" : "6 Event Bouncers / Guards" },
            { value: 10, label: language === "hi" ? "10+ क्राउड कंट्रोल दस्ता" : "10+ Crowd Control Contingent" }
          ]
        };
      default:
        return {
          label: language === "hi" ? "गार्ड्स की संख्या *" : "Number of Guards *",
          icon: Users,
          options: [
            { value: 1, label: language === "hi" ? "1 गार्ड (Guard)" : "1 Guard / Operative" },
            { value: 2, label: language === "hi" ? "2 गार्ड्स" : "2 Guards" },
            { value: 3, label: language === "hi" ? "3 गार्ड्स" : "3 Guards" },
            { value: 5, label: language === "hi" ? "5 गार्ड्स (टीम)" : "5 Guards (Team)" },
            { value: 10, label: language === "hi" ? "10+ गार्ड्स (बड़ा दस्ता)" : "10+ Guards (Large Contingent)" }
          ]
        };
    }
  }, [formData.guardType, language]);

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

  // Auto-detect shift based on time From & To
  const detectedShift = useMemo(() => {
    if (formData.shiftMode === "fullday" || formData.hours >= 24) {
      return {
        type: "fullday",
        label: "Full Day (24 Hours)",
        labelHi: "फुल डे (24 घंटे ड्यूटी)",
        isNight: true,
        spansNextDay: true
      };
    }

    const [sh] = (formData.startTime || "08:00").split(":").map(Number);
    const [eh] = (formData.endTime || "16:00").split(":").map(Number);

    // Night shift if starts 7 PM onwards (>= 19) or before 5 AM (< 5), or starts in evening and crosses late night
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

  // Dynamic price estimation
  const priceEstimate = useMemo(() => {
    const selectedSvc = serviceOptions.find((s) => s.value === formData.guardType);
    const baseRate = selectedSvc ? selectedSvc.baseRate : 600;
    
    // Check night slot
    const isNight = detectedShift.isNight;
    const nightMultiplier = isNight ? 1.2 : 1.0;

    const singleGuardTotal = Math.round(baseRate * (formData.hours / 8) * nightMultiplier);
    const grandTotal = singleGuardTotal * formData.guardCount;

    return {
      baseRate,
      isNight,
      singleGuardTotal,
      grandTotal
    };
  }, [formData.guardType, formData.hours, detectedShift.isNight, formData.guardCount]);

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
      if (prev.shiftMode === "fullday" || prev.hours === 24) {
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
      alert(
        language === "hi"
          ? "कृपया सभी आवश्यक फ़ील्ड (नाम, फ़ोन नंबर, और पूरा पता) भरें।"
          : "Please fill in all required fields (Name, Phone Number, and Full Address)."
      );
      return;
    }

    setIsSubmitting(true);

    const shiftLabel = language === "hi" ? detectedShift.labelHi : detectedShift.label;

    const bookingPayload = {
      guardId: `SRV-${Date.now()}`,
      guardName: `${formData.guardCount}x ${formData.guardType}`,
      guardType: formData.guardType,
      name: formData.name,
      phone: formData.phone,
      eventType: `${formData.guardType} (${formData.city !== "All Cities/Districts" ? formData.city : "Aurangabad / Bihar"})`,
      address: `${formData.address}${formData.city !== "All Cities/Districts" ? `, ${formData.city}` : ""}`,
      date: formData.date,
      shiftMode: formData.shiftMode,
      shiftType: shiftLabel,
      startTime: formData.startTime,
      endTime: formData.endTime,
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
        shiftType: shiftLabel,
        startTime: format12Hour(formData.startTime),
        endTime: format12Hour(formData.endTime),
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
      shiftType: shiftLabel,
      startTime: format12Hour(formData.startTime),
      endTime: format12Hour(formData.endTime),
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
          <div className="space-y-5">
            <h2 className="text-sm sm:text-base uppercase tracking-wider font-black text-amber-600 dark:text-amber-400 flex items-center gap-2.5 border-b-2 border-slate-200 dark:border-[#262636] pb-3">
              <User className="w-5 h-5 text-amber-500" />
              {language === "hi" ? "1. क्लाइंट संपर्क जानकारी" : "1. CLIENT INFORMATION"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <User className="w-4 h-4 text-amber-500" />
                  {language === "hi" ? "आपका पूरा नाम *" : "Full Name *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === "hi" ? "जैसे: भूपेंद्र कुमार" : "e.g. Rahul Sharma"}
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0A0A0F] border-2 border-slate-300 dark:border-[#38384E] focus:border-amber-500 rounded-xl px-4 py-3.5 text-base sm:text-lg font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 focus:outline-none transition-colors shadow-sm"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-amber-500" />
                  {language === "hi" ? "मोबाइल नंबर *" : "Phone Number *"}
                </label>
                <input
                  type="tel"
                  required
                  placeholder={language === "hi" ? "10 अंकों का मोबाइल नंबर" : "+91 98765 43210"}
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0A0A0F] border-2 border-slate-300 dark:border-[#38384E] focus:border-amber-500 rounded-xl px-4 py-3.5 text-base sm:text-lg font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 focus:outline-none transition-colors shadow-sm"
                />
              </div>

            </div>
          </div>

          {/* SECTION 2: SERVICE & REQUIREMENTS */}
          <div className="space-y-5 pt-3">
            <h2 className="text-sm sm:text-base uppercase tracking-wider font-black text-amber-600 dark:text-amber-400 flex items-center gap-2.5 border-b-2 border-slate-200 dark:border-[#262636] pb-3">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              {language === "hi" ? "2. सुरक्षा आवश्यकता एवं स्थान" : "2. SECURITY & LOCATION REQUIREMENTS"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              {/* City / District */}
              <div className="space-y-2 sm:col-span-1">
                <label className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  {language === "hi" ? "शहर / जिला *" : "City / District *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    language === "hi"
                      ? "जैसे: औरंगाबाद, पटना, गया..."
                      : "e.g. Aurangabad, Patna, Gaya..."
                  }
                  value={formData.city === "All Cities/Districts" ? "" : formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0A0A0F] border-2 border-slate-300 dark:border-[#38384E] focus:border-amber-500 rounded-xl px-4 py-3.5 text-base sm:text-lg font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 focus:outline-none transition-colors shadow-sm"
                />
              </div>

              {/* Service Type */}
              <div className="space-y-2 sm:col-span-1">
                <label className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-amber-500" />
                  {language === "hi" ? "सुरक्षा प्रकार *" : "Security Type *"}
                </label>
                <CustomSelect
                  options={serviceOptions}
                  value={formData.guardType}
                  onChange={(val) => handleChange("guardType", val)}
                  size="lg"
                  icon={Shield}
                  placeholder="Select Security Type"
                />
              </div>

              {/* Dynamic Quantity / Units / Guards Selector */}
              <div className="space-y-2 sm:col-span-1">
                <label className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <quantityConfig.icon className="w-4 h-4 text-amber-500" />
                  {quantityConfig.label}
                </label>
                <CustomSelect
                  options={quantityConfig.options}
                  value={formData.guardCount}
                  onChange={(val) => handleChange("guardCount", Number(val))}
                  size="lg"
                  icon={quantityConfig.icon}
                  placeholder="Select Quantity / Units"
                />
              </div>

            </div>

            {/* Venue Address */}
            <div className="space-y-2 pt-2">
              <label className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-500" />
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
                className="w-full bg-slate-50 dark:bg-[#0A0A0F] border-2 border-slate-300 dark:border-[#38384E] focus:border-amber-500 rounded-xl px-4 py-3.5 text-base font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 focus:outline-none transition-colors shadow-sm"
              />
            </div>
          </div>

          {/* SECTION 3: DATE, SHIFT & TIMING */}
          <div className="space-y-6 pt-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-200 dark:border-[#262636] pb-3 gap-2">
              <h2 className="text-sm sm:text-base uppercase tracking-wider font-black text-amber-600 dark:text-amber-400 flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-amber-500" />
                {language === "hi" ? "3. शिफ्ट एवं समय शेड्यूल (Deployment Schedule)" : "3. DEPLOYMENT SCHEDULE"}
              </h2>
              <span className="text-xs font-bold text-slate-500 dark:text-gray-400">
                {language === "hi" ? "समय के अनुसार ऑटो-शिफ्ट सिंक" : "Time & Shift Auto-Synced"}
              </span>
            </div>

            {/* 1. Deployment Date */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-500" />
                {language === "hi" ? "तारीख (Deployment Date) *" : "Deployment Date *"}
              </label>
              <input
                type="date"
                required
                min={todayStr}
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A0A0F] border-2 border-slate-300 dark:border-[#38384E] focus:border-amber-500 rounded-xl px-4 py-3 text-sm sm:text-base font-bold text-slate-900 dark:text-white focus:outline-none transition-colors shadow-sm"
              />
            </div>

            {/* 2. Shift Type Presets (Day / Night / Full Day / Custom) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  {language === "hi" ? "शिफ्ट का प्रकार (Shift Type) *" : "Shift Type *"}
                </label>
                <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                  {language === "hi" ? detectedShift.labelHi : detectedShift.label}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    id: "day",
                    title: language === "hi" ? "दिन की शिफ्ट" : "Day Shift",
                    sub: "08:00 AM - 04:00 PM",
                    icon: Sun,
                    active: formData.shiftMode === "day" || (formData.shiftMode !== "custom" && detectedShift.type === "day")
                  },
                  {
                    id: "night",
                    title: language === "hi" ? "रात की शिफ्ट" : "Night Shift",
                    sub: "08:00 PM - 04:00 AM",
                    icon: Moon,
                    active: formData.shiftMode === "night" || (formData.shiftMode !== "custom" && detectedShift.type === "night")
                  },
                  {
                    id: "fullday",
                    title: language === "hi" ? "फुल डे (24 घंटे)" : "Full Day (24 Hrs)",
                    sub: language === "hi" ? "24/7 सुरक्षा" : "Round the Clock",
                    icon: RotateCw,
                    active: formData.shiftMode === "fullday" || formData.hours === 24
                  },
                  {
                    id: "custom",
                    title: language === "hi" ? "कस्टम समय" : "Custom Time",
                    sub: language === "hi" ? "From - To सेट करें" : "Set From / To",
                    icon: SlidersHorizontal,
                    active: formData.shiftMode === "custom"
                  }
                ].map((item) => {
                  const IconCmp = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleShiftPreset(item.id)}
                      className={`relative p-3 sm:p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                        item.active
                          ? "bg-amber-500/15 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                          : "bg-slate-50 dark:bg-[#0A0A0F] border-slate-300 dark:border-[#262636] hover:border-amber-500/50"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <IconCmp className={`w-4 h-4 ${item.active ? "text-amber-500" : "text-slate-500 dark:text-gray-400"}`} />
                        {item.active && <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                      </div>
                      <span className={`text-xs sm:text-sm font-black ${item.active ? "text-amber-600 dark:text-amber-400" : "text-slate-900 dark:text-white"}`}>
                        {item.title}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 dark:text-gray-400 mt-0.5 truncate">
                        {item.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Time From & To Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/80 dark:bg-[#0E0E14] border-2 border-slate-200 dark:border-[#262636] p-4 sm:p-5 rounded-2xl">
              
              {/* From Time (Start Time) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-500" />
                    {language === "hi" ? "समय से (From Time / Start) *" : "Start Time (From) *"}
                  </label>
                  <span className="text-xs font-mono font-black text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                    {format12Hour(formData.startTime)}
                  </span>
                </div>
                <input
                  type="time"
                  required
                  value={formData.startTime}
                  onChange={(e) => handleStartTimeChange(e.target.value)}
                  className="w-full bg-white dark:bg-[#0A0A0F] border-2 border-slate-300 dark:border-[#38384E] focus:border-amber-500 rounded-xl px-4 py-2.5 text-sm sm:text-base font-bold text-slate-900 dark:text-white focus:outline-none transition-colors shadow-sm cursor-pointer"
                />
              </div>

              {/* To Time (End Time) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-500" />
                    {language === "hi" ? "समय तक (To Time / End) *" : "End Time (To) *"}
                  </label>
                  <div className="flex items-center gap-1.5">
                    {detectedShift.spansNextDay && (
                      <span className="text-[10px] font-bold bg-indigo-500/10 border border-indigo-500/30 text-indigo-500 px-1.5 py-0.5 rounded">
                        {language === "hi" ? "अगले दिन" : "Next Day"}
                      </span>
                    )}
                    <span className="text-xs font-mono font-black text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                      {format12Hour(formData.endTime)}
                    </span>
                  </div>
                </div>
                <input
                  type="time"
                  required
                  value={formData.endTime}
                  onChange={(e) => handleEndTimeChange(e.target.value)}
                  className="w-full bg-white dark:bg-[#0A0A0F] border-2 border-slate-300 dark:border-[#38384E] focus:border-amber-500 rounded-xl px-4 py-2.5 text-sm sm:text-base font-bold text-slate-900 dark:text-white focus:outline-none transition-colors shadow-sm cursor-pointer"
                />
              </div>

            </div>

            {/* 4. Duration Quick Selectors */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500" />
                  {language === "hi" ? "ड्यूटी अवधि (Total Shift Duration) *" : "Shift Duration *"}
                </label>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono">
                  {formData.hours} {formData.hours === 1 ? "Hour" : "Hours"}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { hours: 4, title: "4 Hours", subtitle: language === "hi" ? "हाफ डे शिफ्ट" : "Half Day Shift" },
                  { hours: 8, title: "8 Hours", subtitle: language === "hi" ? "स्टैंडर्ड शिफ्ट" : "Standard Shift", recommended: true },
                  { hours: 12, title: "12 Hours", subtitle: language === "hi" ? "लंबी शिफ्ट" : "Extended Shift" },
                  { hours: 24, title: "24 Hours", subtitle: language === "hi" ? "24/7 फुल डे" : "Round the Clock" }
                ].map((slot) => {
                  const isSelected = formData.hours === slot.hours;
                  return (
                    <button
                      key={slot.hours}
                      type="button"
                      onClick={() => handleDurationChange(slot.hours)}
                      className={`relative p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-amber-500/15 border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                          : "bg-slate-50 dark:bg-[#0A0A0F] border-slate-300 dark:border-[#262636] hover:border-amber-500/50"
                      }`}
                    >
                      {slot.recommended && (
                        <span className="absolute -top-2.5 right-2 bg-amber-500 text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                          {language === "hi" ? "मानक" : "Standard"}
                        </span>
                      )}
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-sm font-extrabold ${isSelected ? "text-amber-600 dark:text-amber-400" : "text-slate-900 dark:text-white"}`}>
                          {slot.title}
                        </span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 dark:text-gray-400 mt-0.5">
                        {slot.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Live Schedule Summary Banner */}
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center font-black shrink-0 shadow-md">
                  {detectedShift.type === "night" ? <Moon className="w-5 h-5" /> : detectedShift.type === "fullday" ? <RotateCw className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{language === "hi" ? detectedShift.labelHi : detectedShift.label}</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400">
                      {formData.hours} hrs
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-600 dark:text-gray-300 mt-0.5">
                    {format12Hour(formData.startTime)} &rarr; {format12Hour(formData.endTime)}
                    {detectedShift.spansNextDay ? ` (${language === "hi" ? "अगले दिन तक" : "Next Day"})` : ""}
                  </div>
                </div>
              </div>
              <div className="text-right sm:border-l border-amber-500/20 sm:pl-4">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-amber-600 dark:text-amber-400 block">
                  {language === "hi" ? "ड्यूटी स्थिति" : "Shift Status"}
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {detectedShift.isNight ? (language === "hi" ? "रात्रि ड्यूटी लागू" : "Night Duty Active") : (language === "hi" ? "दिन की ड्यूटी" : "Day Duty Active")}
                </span>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-2 pt-2">
              <label className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-500" />
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
                className="w-full bg-slate-50 dark:bg-[#0A0A0F] border-2 border-slate-300 dark:border-[#38384E] focus:border-amber-500 rounded-xl px-4 py-3.5 text-base font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 focus:outline-none transition-colors shadow-sm"
              />
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
