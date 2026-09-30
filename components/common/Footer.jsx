import Link from "next/link";
import { Shield, PhoneCall, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { COMPANY_PHONE } from "../../utils/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#07070B] border-t border-slate-200 dark:border-[#262636] text-slate-600 dark:text-gray-400 text-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">
                AEGIS<span className="text-amber-500">GUARD</span>
              </span>
            </Link>
            <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
              India's premier on-demand tactical security, personal bodyguard & elite bouncer booking platform. Instant deployment for events, VIP escort, and venue protection.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-500 font-mono">
              <CheckCircle2 className="w-4 h-4 text-amber-500" /> 100% Background Verified Personnel
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-4 text-xs uppercase tracking-widest text-amber-600 dark:text-amber-500">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-amber-500 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/guards" className="hover:text-amber-500 transition-colors">
                  Find & Filter Guards
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="hover:text-amber-500 transition-colors">
                  Enquiry History
                </Link>
              </li>
            </ul>
          </div>

          {/* Guard Services */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-4 text-xs uppercase tracking-widest text-amber-600 dark:text-amber-500">
              Security Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/guards?type=Personal+Bodyguard" className="hover:text-amber-500 transition-colors">
                  VIP Personal Bodyguards
                </Link>
              </li>
              <li>
                <Link href="/guards?type=Bouncer" className="hover:text-amber-500 transition-colors">
                  Nightclub & Event Bouncers
                </Link>
              </li>
              <li>
                <Link href="/guards?type=Premise+Guard" className="hover:text-amber-500 transition-colors">
                  Residential & Premise Guards
                </Link>
              </li>
              <li>
                <Link href="/guards" className="hover:text-amber-500 transition-colors">
                  Tactical Convoy Escorts
                </Link>
              </li>
            </ul>
          </div>

          {/* Support / Contact */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-4 text-xs uppercase tracking-widest text-amber-600 dark:text-amber-500">
              24/7 Command Center
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-slate-700 dark:text-gray-300 font-medium">{COMPANY_PHONE} (24/7 Dispatch)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-slate-700 dark:text-gray-300 font-medium">dispatch@aegisguard.in</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-slate-600 dark:text-gray-400">Patna • Mumbai • Delhi NCR • Bengaluru • Goa</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-[#1C1C28] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} AegisGuard Security Operations. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-amber-500 transition-colors">Terms of Service</Link>
            <Link href="/verification-protocol" className="hover:text-amber-500 transition-colors">Verification Protocol</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
