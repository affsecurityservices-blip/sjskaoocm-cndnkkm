"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useBooking } from "../../context/BookingContext";
import { formatCurrency } from "../../utils/calculatePrice";
import { formatDate, formatTime12h } from "../../utils/formatDate";
import { createWhatsAppBookingUrl, COMPANY_PHONE } from "../../utils/whatsapp";
import WhatsAppIcon from "../../components/common/WhatsAppIcon";
import { CheckCircle2, ShieldCheck, Calendar, Clock, MapPin, Phone, User, ArrowRight, PhoneCall } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const { getBookingById } = useBooking();

  const booking = getBookingById(bookingId);

  const whatsappUrl = booking ? createWhatsAppBookingUrl(booking) : "#";

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      
      {/* Top Success Badge */}
      <div className="space-y-4">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Guard Deployment Enquiry Registered!
        </h1>
        
        <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
          Your guard deployment request has been logged in our system. You can connect with our command team on WhatsApp or call us directly.
        </p>
      </div>

      {/* Booking Receipt Box */}
      {booking ? (
        <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] rounded-2xl p-6 sm:p-8 text-left space-y-6 shadow-2xl relative overflow-hidden transition-colors">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-[#262636]">
            <div>
              <span className="text-xs text-slate-500 dark:text-gray-400 font-mono">ENQUIRY REF</span>
              <div className="text-lg font-extrabold text-amber-500 font-mono">
                {booking.bookingId}
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-md text-xs font-semibold">
              Enquiry Submitted
            </span>
          </div>

          {/* Assigned Guard info */}
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-[#0A0A0F] p-4 rounded-xl border border-slate-200 dark:border-[#262636]">
            <img
              src={booking.guardImage}
              alt={booking.guardName}
              className="w-16 h-16 rounded-xl object-cover border border-amber-500/30"
            />
            <div>
              <div className="text-xs text-amber-500 font-semibold">{booking.guardType}</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                {booking.guardName}
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </h3>
            </div>
          </div>

          {/* Details list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 dark:text-gray-300">
            <div className="space-y-1">
              <span className="text-slate-500 dark:text-gray-400 flex items-center gap-1.5 font-medium">
                <User className="w-3.5 h-3.5 text-amber-500" /> Client Name
              </span>
              <span className="font-semibold text-slate-900 dark:text-white block">{booking.name}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 dark:text-gray-400 flex items-center gap-1.5 font-medium">
                <Phone className="w-3.5 h-3.5 text-amber-500" /> Contact Phone
              </span>
              <span className="font-semibold text-slate-900 dark:text-white block">{booking.phone}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 dark:text-gray-400 flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-amber-500" /> Deployment Date
              </span>
              <span className="font-semibold text-slate-900 dark:text-white block">{formatDate(booking.date)}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 dark:text-gray-400 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-500" /> Time & Duration
              </span>
              <span className="font-semibold text-slate-900 dark:text-white block">
                {formatTime12h(booking.startTime)} ({booking.hours} hours)
              </span>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <span className="text-slate-500 dark:text-gray-400 flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-500" /> Deployment Address
              </span>
              <span className="font-semibold text-slate-900 dark:text-white block">{booking.address}</span>
            </div>
          </div>

          {/* Pricing summary */}
          <div className="pt-4 border-t border-slate-200 dark:border-[#262636] flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-gray-400 font-medium">Estimated Total Amount</span>
            <span className="text-2xl font-black text-amber-500">
              {formatCurrency(booking.totalPrice)}
            </span>
          </div>

        </div>
      ) : (
        <div className="bg-white dark:bg-[#16161F] p-6 rounded-xl text-xs text-slate-500 dark:text-gray-400 border border-slate-200 dark:border-[#262636]">
          Enquiry details loaded.
        </div>
      )}

      {/* Direct Contact Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Send WhatsApp Enquiry Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.35)] cursor-pointer"
        >
          <WhatsAppIcon className="w-4 h-4 fill-white" />
          Send Enquiry on WhatsApp
        </a>

        {/* Call Now Button */}
        <a
          href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`}
          className="w-full inline-flex items-center justify-center gap-2 bg-white dark:bg-[#16161F] border border-amber-500/40 hover:bg-amber-500 hover:text-black text-amber-700 dark:text-amber-400 font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all shadow-sm cursor-pointer group"
        >
          <PhoneCall className="w-4 h-4 text-amber-500 group-hover:text-black" />
          Call Now ({COMPANY_PHONE})
        </a>

      </div>

      <div className="pt-2">
        <Link
          href="/book"
          className="inline-flex items-center gap-2 text-xs text-slate-600 dark:text-gray-400 hover:text-amber-500 font-medium transition-colors"
        >
          <span>Enquire About Another Guard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0F] text-slate-900 dark:text-[#E5E5E5] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Suspense fallback={<div className="text-center py-12 text-amber-500">Loading enquiry details...</div>}>
          <SuccessContent />
        </Suspense>
      </div>
    </div>
  );
}
