"use client";

import Link from "next/link";
import { Shield, FileText, AlertTriangle, CheckCircle2, ArrowLeft, Scale } from "lucide-react";
import { COMPANY_NAME, DIRECTOR_NAME } from "../../utils/whatsapp";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-4 text-center sm:text-left border-b border-slate-200 dark:border-[#262636] pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-amber-500 font-semibold hover:underline mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Terms of Service</h1>
            <p className="text-xs text-slate-500 dark:text-gray-400">Client Deployment Agreement & Service Terms | {COMPANY_NAME} (Director: {DIRECTOR_NAME})</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] rounded-2xl p-6 sm:p-10 space-y-8 shadow-xl text-sm leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" />
            1. Scope of Security Deployment & Services
          </h2>
          <p className="text-slate-600 dark:text-gray-300 text-xs sm:text-sm">
            {COMPANY_NAME} provides verified security personnel, bouncers, armed guards, manned guarding, CCTV surveillance, mobile patrolling, and personal bodyguards for private protection, nightclub security, corporate events, and escort duties across registered Indian districts. All operative assignments are strictly bound by Indian Penal Code (IPC) self-defense protocols and civil protection laws.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#262636]">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-500" />
            2. Client Responsibilities & Venue Conduct
          </h2>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-gray-300 pl-4 list-disc">
            <li>Clients must ensure venue safety and provide accurate deployment addresses.</li>
            <li>Security personnel shall not be ordered to perform illegal activities, unlawful physical violence, or non-security personal chores.</li>
            <li>Overtime requests beyond booked shift hours are subject to standard hourly rate surcharges (+20% for late night slots).</li>
          </ul>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#262636]">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            3. Cancellation & Refund Policy
          </h2>
          <p className="text-slate-600 dark:text-gray-300 text-xs sm:text-sm">
            Bookings cancelled 12+ hours prior to operative dispatch receive a 100% full refund. Cancellations made within 4 hours of operative deployment are subject to a 1-hour base rate dispatch fee.
          </p>
        </section>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-amber-500" />
          <span>By submitting a booking request on {COMPANY_NAME}, you agree to comply with all terms stated in this agreement.</span>
        </div>

      </div>

    </div>
  );
}
