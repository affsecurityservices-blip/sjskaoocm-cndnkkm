"use client";

import Link from "next/link";
import { Shield, Lock, Eye, FileText, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function PrivacyPage() {
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
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
            <p className="text-xs text-slate-500 dark:text-gray-400">Effective Date: January 1, 2026 | AegisGuard Security Operations</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] rounded-2xl p-6 sm:p-10 space-y-8 shadow-xl text-sm leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-amber-500" />
            1. Information Collection & Client Confidentiality
          </h2>
          <p className="text-slate-600 dark:text-gray-300 text-xs sm:text-sm">
            At AegisGuard, we understand the utmost necessity for privacy and discretion in security deployments. We collect personal information (Name, Contact Number, Deployment Venue, and Event Details) strictly for authenticating client identities and assigning designated security personnel.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#262636]">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-500" />
            2. Tactical Data Encryption & Protection
          </h2>
          <p className="text-slate-600 dark:text-gray-300 text-xs sm:text-sm">
            All client location coordinates, event details, and booking logs are encrypted using enterprise 256-bit SSL protocols. Access to deployment records is restricted strictly to assigned field team leaders and emergency command center personnel.
          </p>
          <ul className="space-y-2 text-xs text-slate-500 dark:text-gray-400 pl-4 list-disc">
            <li>No client data is ever sold, rented, or shared with third-party advertisers.</li>
            <li>GPS tracking logs during active security escort are automatically purged 30 days post-deployment.</li>
            <li>Emergency contact details are archived securely as mandated by local civil protection regulations.</li>
          </ul>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#262636]">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" />
            3. Client Rights & Profile Control
          </h2>
          <p className="text-slate-600 dark:text-gray-300 text-xs sm:text-sm">
            Clients have full control to request complete deletion of their account records, past booking history, and venue addresses by contacting our 24/7 Command Dispatch Center.
          </p>
        </section>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-amber-500" />
          <span>For privacy inquiries or compliance data requests, reach out directly to <strong className="text-slate-900 dark:text-white">privacy@aegisguard.in</strong></span>
        </div>

      </div>

    </div>
  );
}
