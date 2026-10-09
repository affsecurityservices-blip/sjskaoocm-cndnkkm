"use client";

import Link from "next/link";
import { Shield, PhoneCall, Mail, MapPin, CheckCircle2, UserCheck, ShieldCheck } from "lucide-react";
import { COMPANY_NAME, COMPANY_EMAIL, DIRECTOR_NAME } from "../../utils/whatsapp";
import { useLanguage } from "../../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white dark:bg-[#07070B] border-t border-slate-200 dark:border-[#262636] text-slate-600 dark:text-gray-400 text-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg font-black tracking-wide text-slate-900 dark:text-white block">
                  <span className="text-amber-500">AAF</span> SECURITY
                </span>
                <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-gray-400 block -mt-1">
                  Estd 2026 • Registered
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
              {t("footer.motto")}
            </p>

            {/* Director Badge */}
            <div className="p-3 bg-slate-50 dark:bg-[#16161F] rounded-xl border border-slate-200 dark:border-[#262636] space-y-1 text-xs">
              <div className="text-[10px] uppercase font-mono font-bold text-amber-600 dark:text-amber-500 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-amber-500" /> {t("footer.directorBadge")}
              </div>
              <div className="font-extrabold text-slate-900 dark:text-white">
                {DIRECTOR_NAME}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-500 font-mono font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t("footer.verifiedBadge")}
            </div>
          </div>

          {/* Core 8 Security Services */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4 text-xs uppercase tracking-widest text-amber-600 dark:text-amber-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> {t("footer.servicesHeader")}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/book?type=Manned+Guarding" className="hover:text-amber-500 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {t("services.s1Title")}
                </Link>
              </li>
              <li>
                <Link href="/book?type=CCTV+Surveillance" className="hover:text-amber-500 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {t("services.s2Title")}
                </Link>
              </li>
              <li>
                <Link href="/book?type=Mobile+Patrolling" className="hover:text-amber-500 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {t("services.s3Title")}
                </Link>
              </li>
              <li>
                <Link href="/book?type=Event+Security" className="hover:text-amber-500 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {t("services.s4Title")}
                </Link>
              </li>
              <li>
                <Link href="/book?type=Risk+Management" className="hover:text-amber-500 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {t("services.s5Title")}
                </Link>
              </li>
              <li>
                <Link href="/book?type=Armed+Security" className="hover:text-amber-500 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {t("services.s6Title")}
                </Link>
              </li>
              <li>
                <Link href="/book?type=Bouncer" className="hover:text-amber-500 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {t("services.s7Title")}
                </Link>
              </li>
              <li>
                <Link href="/book?type=Personal+Bodyguard" className="hover:text-amber-500 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {t("services.s8Title")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4 text-xs uppercase tracking-widest text-amber-600 dark:text-amber-500">
              {t("footer.navHeader")}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-amber-500 transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-amber-500 transition-colors">
                  {t("nav.bookGuard")}
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="hover:text-amber-500 transition-colors">
                  {t("nav.enquiryHistory")}
                </Link>
              </li>
              <li>
                <Link href="/verification-protocol" className="hover:text-amber-500 transition-colors">
                  {t("footer.protocol")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-500 transition-colors">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-500 transition-colors">
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support / Contact & Address */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4 text-xs uppercase tracking-widest text-amber-600 dark:text-amber-500">
              {t("footer.officeHeader")}
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="space-y-1">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
                  <PhoneCall className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{t("footer.helplineLabel")}</span>
                </div>
                <div className="pl-6 space-y-1 font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                  <div><a href="tel:9730218260" className="hover:underline">9730218260</a></div>
                  <div><a href="tel:9465857462" className="hover:underline">9465857462</a></div>
                  <div><a href="tel:7004951129" className="hover:underline">7004951129</a></div>
                </div>
              </li>

              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${COMPANY_EMAIL}`} className="text-slate-700 dark:text-gray-300 font-medium hover:underline">
                  {COMPANY_EMAIL}
                </a>
              </li>

              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-slate-600 dark:text-gray-400 leading-snug">
                  {t("footer.companyAddress")}
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-[#1C1C28] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} {COMPANY_NAME}. {t("footer.rights")}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-amber-500 transition-colors">{t("footer.privacy")}</Link>
            <Link href="/terms" className="hover:text-amber-500 transition-colors">{t("footer.terms")}</Link>
            <Link href="/verification-protocol" className="hover:text-amber-500 transition-colors">{t("footer.protocol")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
