import { PhoneCall, CheckCircle2, ShieldCheck } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function PriceSummary() {
  const { language } = useLanguage();

  return (
    <div className="bg-white dark:bg-[#16161F] border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-3 relative overflow-hidden transition-colors">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#262636]">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-amber-500" />
          <span>{language === "hi" ? "कस्टम दरें एवं कोटेशन" : "Custom Quote & Pricing"}</span>
        </h3>
        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-bold">
          {language === "hi" ? "कॉल पर तय होगी" : "Direct On Call"}
        </span>
      </div>

      <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
        {language === "hi"
          ? "सुरक्षा गार्डों की संख्या, शिफ्ट का समय और तैनाती स्थल के आधार पर हमारी टीम आपसे सीधे कॉल पर बात करके सबसे उचित (Best & Transparent) दरें कोट करेगी।"
          : "Based on guard count, shift duration, and deployment venue, our command team will directly connect with you to provide transparent, competitive custom quotation."}
      </p>

      <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
        <span>{language === "hi" ? "कोई अग्रिम छिपा हुआ शुल्क नहीं • सीधा संपर्क" : "Zero Hidden Charges • Direct Company Discussion"}</span>
      </div>
    </div>
  );
}
