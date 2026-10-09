"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  Scale,
  Printer,
  Ban,
  Clock,
  Lock,
  PhoneCall,
  Mail,
  MapPin,
  Building2,
  ShieldCheck,
  AlertOctagon,
  Languages,
  UserCheck
} from "lucide-react";
import {
  COMPANY_NAME,
  DIRECTOR_NAME,
  COMPANY_PHONES,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  COMPANY_ESTD
} from "../../utils/whatsapp";
import { useLanguage } from "../../context/LanguageContext";

export default function TermsPage() {
  const { language: globalLang } = useLanguage();
  const [activeLang, setActiveLang] = useState(globalLang || "hi");

  const isHi = activeLang === "hi";

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const sections = [
    { id: "sec-1", titleEn: "1. Statutory Preamble & Agreement", titleHi: "1. वैधानिक प्रस्तावना एवं अनुबंध" },
    { id: "sec-2", titleEn: "2. Definitions & Interpretations", titleHi: "2. परिभाषाएं एवं शब्दार्थ" },
    { id: "sec-3", titleEn: "3. Scope of Security Deployment", titleHi: "3. सुरक्षा तैनाती का दायरा" },
    { id: "sec-4", titleEn: "4. Armed Security & Arms Act Compliance", titleHi: "4. सशस्त्र सुरक्षा एवं आर्म्स एक्ट अनुपालन" },
    { id: "sec-5", titleEn: "5. Client Warranties & Venue Ownership", titleHi: "5. ग्राहक की जिम्मेदारियां एवं स्थल स्वामित्व" },
    { id: "sec-6", titleEn: "6. Shift Timings, Rest & Overtime", titleHi: "6. शिफ्ट समय, विश्राम एवं ओवरटाइम" },
    { id: "sec-7", titleEn: "7. Commercials, Invoicing & GST", titleHi: "7. व्यावसायिक दरें, बिलिंग एवं GST" },
    { id: "sec-8", titleEn: "8. Cancellation, Rescheduling & Refunds", titleHi: "8. रद्दीकरण, री-शेड्यूल एवं रिफंड नीति" },
    { id: "sec-9", titleEn: "9. Operative Conduct & Uniform Code", titleHi: "9. आचरण संहिता एवं वर्दी प्रोटोकॉल" },
    { id: "sec-10", titleEn: "10. Right of Private Defense & Non-Violence", titleHi: "10. आत्मरक्षा का अधिकार (BNS/IPC)" },
    { id: "sec-11", titleEn: "11. Limitation of Liability & Risk Disclaimer", titleHi: "11. दायित्व की कानूनी सीमा एवं अस्वीकरण" },
    { id: "sec-12", titleEn: "12. Client Indemnification Obligations", titleHi: "12. ग्राहक की क्षतिपूर्ति बाध्यता" },
    { id: "sec-13", titleEn: "13. Confidentiality & Non-Disclosure", titleHi: "13. गोपनीयता एवं गैर-प्रकटीकरण" },
    { id: "sec-14", titleEn: "14. Non-Solicitation / Anti-Poaching (12M)", titleHi: "14. नो-पोचिंग खंड (12 महीने)" },
    { id: "sec-15", titleEn: "15. Force Majeure & Emergencies", titleHi: "15. अपरिहार्य परिस्थितियां (Force Majeure)" },
    { id: "sec-16", titleEn: "16. Governing Law & Jurisdiction", titleHi: "16. लागू कानून एवं न्यायिक क्षेत्र (औरंगाबाद, बिहार)" },
    { id: "sec-17", titleEn: "17. Grievance Officer & Director Seal", titleHi: "17. शिकायत निवारण एवं डायरेक्टर सील" }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 print:py-2 print:px-2">
      
      {/* Top Breadcrumb & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-[#262636] pb-6 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isHi ? "मुख्य पृष्ठ पर वापस जाएं" : "Back to Home"}</span>
        </Link>

        {/* Controls: Language Switcher + Print Button */}
        <div className="flex items-center gap-3">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-[#16161F] border border-slate-200 dark:border-[#262636]">
            <button
              type="button"
              onClick={() => setActiveLang("hi")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isHi
                  ? "bg-amber-500 text-black shadow-md"
                  : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>हिंदी (Hindi)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveLang("en")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                !isHi
                  ? "bg-amber-500 text-black shadow-md"
                  : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>English</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            aria-label="Print or Save Terms as PDF"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-[#16161F] border border-slate-300 dark:border-[#262636] hover:border-amber-500 text-slate-700 dark:text-gray-200 text-xs font-semibold shadow-sm transition-all cursor-pointer hover:shadow"
          >
            <Printer className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">{isHi ? "प्रिंट / PDF सेव करें" : "Print / Save PDF"}</span>
          </button>
        </div>
      </div>

      {/* Main Title Badge */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white border-2 border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHi ? "वैधानिक सेवा नियम एवं अनुबंध" : "Statutory Deployment & Service Agreement"}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              {isHi ? "नियम एवं सेवा शर्तें (Terms of Service)" : "Terms of Service & Deployment Agreement"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isHi
                ? `${COMPANY_NAME} द्वारा प्रदान की जाने वाली सभी सुरक्षा सेवाओं, गार्ड तैनाती, गनमैन, बाउंसर एवं निगरानी ऑपरेशन्स के लिए वैधानिक नियम।`
                : `Comprehensive Client Deployment Agreement governing private security personnel, armed protection, bouncers, and surveillance operations provided by ${COMPANY_NAME}.`}
            </p>
          </div>

          <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 text-xs font-mono space-y-1.5 shrink-0 w-full sm:w-auto shadow-inner">
            <div className="text-slate-400 uppercase tracking-widest text-[10px]">{isHi ? "संस्था एवं निदेशक" : "Agency Details"}</div>
            <div className="font-extrabold text-amber-400 text-sm">{COMPANY_NAME}</div>
            <div className="text-slate-300 font-semibold">{isHi ? `निदेशक: ${DIRECTOR_NAME}` : `Director: ${DIRECTOR_NAME}`}</div>
            <div className="text-slate-400 text-[11px]">{isHi ? `स्थापना: ${COMPANY_ESTD} | जिला: औरंगाबाद (बिहार)` : `Estd: ${COMPANY_ESTD} | Dist: Aurangabad (Bihar)`}</div>
            <div className="text-emerald-400 text-[10px] font-bold flex items-center gap-1 pt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isHi ? "PSARA 2005 एवं आर्म्स एक्ट फ्रेमवर्क" : "PSARA 2005 & Arms Act Compliant"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Jump Pills (Print-hidden) */}
      <div className="print:hidden bg-slate-50 dark:bg-[#12121A] border border-slate-200 dark:border-[#262636] p-3.5 rounded-2xl">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-2 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-amber-500" />
          <span>{isHi ? "शीघ्र अनुभाग चयन (Quick Navigation):" : "Quick Section Navigation:"}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-[#1A1A24] border border-slate-200 dark:border-[#262636] text-slate-700 dark:text-gray-300 hover:text-amber-500 hover:border-amber-500/50 transition-colors font-medium whitespace-nowrap"
            >
              {isHi ? sec.titleHi : sec.titleEn}
            </a>
          ))}
        </div>
      </div>

      {/* DETAILED LEGAL SECTIONS CONTAINER */}
      <div className="bg-white dark:bg-[#14141E] border border-slate-200 dark:border-[#262636] rounded-3xl p-6 sm:p-10 space-y-10 shadow-xl text-sm leading-relaxed print:border-none print:shadow-none print:p-0">

        {/* 1. STATUTORY PREAMBLE */}
        <section id="sec-1" className="space-y-3 scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold font-mono text-sm">
              01
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {isHi ? "1. वैधानिक प्रस्तावना एवं अनुबंध की स्वीकृति (Statutory Preamble & Acceptance)" : "1. Statutory Preamble & Contractual Acceptance"}
            </h2>
          </div>

          {isHi ? (
            <div className="space-y-2.5 text-slate-700 dark:text-gray-300 text-xs sm:text-sm">
              <p>
                यह नियम एवं सेवा शर्तें अनुबंध (इसके बाद <strong>&quot;अनुबंध&quot;</strong> या <strong>&quot;Agreement&quot;</strong>) सेवा प्राप्तकर्ता (इसके बाद <strong>&quot;ग्राहक&quot;</strong>, <strong>&quot;क्लाइंट&quot;</strong> या <strong>&quot;Client&quot;</strong>) तथा <strong>{COMPANY_NAME}</strong> (जिसके अधिकृत निदेशक श्री <strong>{DIRECTOR_NAME}</strong> हैं, कार्यालय: नर्बदेश्वर नगर, भरथौली रोड, जसोइया, औरंगाबाद, बिहार - 824101, इसके बाद <strong>&quot;एजेंसी&quot;</strong> या <strong>&quot;AAF Security&quot;</strong>) के मध्य एक पूर्णतः वैधानिक एवं बाध्यकारी अनुबंध है।
              </p>
              <p>
                यह अनुबंध <strong>भारतीय अनुबंध अधिनियम, 1872 (Indian Contract Act, 1872)</strong>, <strong>प्राइवेट सिक्योरिटी एजेंसी (विनियमन) अधिनियम, 2005 (PSARA 2005)</strong>, <strong>शस्त्र अधिनियम, 1959 (Arms Act, 1959)</strong>, <strong>भारतीय न्याय संहिता, 2023 (BNS) / IPC</strong>, तथा <strong>सूचना प्रौद्योगिकी अधिनियम, 2000 (IT Act, 2000)</strong> के अंतर्गत निष्पादित होता है।
              </p>
              <p className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 font-medium text-amber-900 dark:text-amber-300">
                हमारी वेबसाइट पर ऑनलाइन बुकिंग सबमिट करने, व्हाट्सएप हेल्पलाइन द्वारा गार्ड की मांग करने, कोटेशन स्वीकृत करने, या किसी भी कार्य आदेश (Work Order) पर हस्ताक्षर करने पर यह स्वतः मान्य होगा कि ग्राहक ने इन सभी नियमों को पूर्णतः पढ़, समझ एवं बिना किसी शर्त के स्वीकार कर लिया है।
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 text-slate-700 dark:text-gray-300 text-xs sm:text-sm">
              <p>
                This Terms of Service &amp; Deployment Agreement (&quot;<strong>Agreement</strong>&quot;) constitutes a legally binding contract between the entity or person requisitioning security services (&quot;<strong>Client</strong>&quot;, &quot;<strong>You</strong>&quot;) and <strong>{COMPANY_NAME}</strong>, represented by its Director, <strong>{DIRECTOR_NAME}</strong>, having its central administrative office at Narbdeshwar Nagar, Bharthauli Road, Jasoiya, Aurangabad, Bihar - 824101 (&quot;<strong>Agency</strong>&quot;, &quot;<strong>AAF Security</strong>&quot;, &quot;<strong>We</strong>&quot;).
              </p>
              <p>
                This Agreement is governed by and executed under the <strong>Indian Contract Act, 1872</strong>, the <strong>Private Security Agencies (Regulation) Act, 2005 (PSARA 2005)</strong>, the <strong>Arms Act, 1959</strong>, the <strong>Bharatiya Nyaya Sanhita, 2023 (BNS) / IPC</strong>, and the <strong>Information Technology Act, 2000</strong>.
              </p>
              <p className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 font-medium text-amber-900 dark:text-amber-300">
                By submitting a booking form, issuing a formal Purchase/Work Order, confirming a deployment via WhatsApp official dispatch, or remitting any advance fee, the Client unconditionally consents to be bound by every provision delineated herein.
              </p>
            </div>
          )}
        </section>

        {/* 2. DEFINITIONS */}
        <section id="sec-2" className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold font-mono text-sm">
              02
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {isHi ? "2. परिभाषाएं एवं शब्दार्थ (Definitions & Interpretations)" : "2. Definitions & Interpretations"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181824] border border-slate-200 dark:border-[#262636] space-y-1">
              <span className="font-extrabold text-amber-500 uppercase tracking-wide text-xs">
                {isHi ? "सुरक्षा कर्मी / ऑपरेटिव (Security Operatives)" : "Security Operatives / Guards"}
              </span>
              <p className="text-slate-600 dark:text-gray-300">
                {isHi
                  ? "एजेंसी द्वारा तैनात किए गए चरित्र-सत्यापित गार्ड, आर्म्ड गनमैन, ट्रेंड बाउंसर, वीआईपी पीएसओ, पेट्रोलिंग चालक एवं कमांड ऑपरेटर।"
                  : "Police-vetted, trained manned guards, licensed armed gunners, bouncers, close protection officers (CPOs), and control-room dispatchers."}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181824] border border-slate-200 dark:border-[#262636] space-y-1">
              <span className="font-extrabold text-amber-500 uppercase tracking-wide text-xs">
                {isHi ? "तैनाती स्थल (Deployment Venue / Site)" : "Deployment Venue / Site"}
              </span>
              <p className="text-slate-600 dark:text-gray-300">
                {isHi
                  ? "ग्राहक द्वारा बुकिंग फॉर्म में उल्लिखित वह विशिष्ट भौतिक स्थान, परिसर, गेट या इवेंट हॉल जहां सुरक्षा दायित्व सौंपा गया है।"
                  : "The specific physical premises, boundary gates, commercial facility, or event address specified in the booking requisition."}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181824] border border-slate-200 dark:border-[#262636] space-y-1">
              <span className="font-extrabold text-amber-500 uppercase tracking-wide text-xs">
                {isHi ? "ड्यूटी शिफ्ट (Duty Shift)" : "Duty Shift"}
              </span>
              <p className="text-slate-600 dark:text-gray-300">
                {isHi
                  ? "मानक 8 घंटे, विस्तारित 12 घंटे, अथवा 24 घंटे का रोटेशनल रिले समय चक्र, जो श्रम कानूनों के विश्राम मानकों के अनुरूप हो।"
                  : "Prescribed operative duty windows: Standard 8-Hour, Extended 12-Hour, or 24-Hour rotational relay compliant with statutory rest norms."}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181824] border border-slate-200 dark:border-[#262636] space-y-1">
              <span className="font-extrabold text-amber-500 uppercase tracking-wide text-xs">
                {isHi ? "प्राथमिक रक्षा (Deterrent Security)" : "Deterrent Security Scope"}
              </span>
              <p className="text-slate-600 dark:text-gray-300">
                {isHi
                  ? "परिसर रक्षा, प्रवेश नियंत्रण, भीड़ नियंत्रण एवं असामाजिक तत्वों के निवारण का सुरक्षात्मक कार्य; यह पुलिस जांच या न्यायिक शक्ति नहीं है।"
                  : "Physical access control, preventive deterrence, crowd de-escalation, and perimeter watch. Operatives do not exercise statutory police investigatory powers."}
              </p>
            </div>
          </div>
        </section>

        {/* 3. SCOPE OF SERVICES */}
        <section id="sec-3" className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold font-mono text-sm">
              03
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {isHi ? "3. सुरक्षा सेवाओं का दायरा एवं श्रेणियां (Scope of Security Services)" : "3. Scope of Security Deployment & Services"}
            </h2>
          </div>

          <p className="text-slate-700 dark:text-gray-300 text-xs sm:text-sm">
            {isHi
              ? "एजेंसी निम्नलिखित प्रमुख सुरक्षा श्रेणियों के अंतर्गत पेशेवर गार्ड एवं तकनीकी निगरानी समाधान उपलब्ध कराती है:"
              : "AAF Security provides verified personnel and integrated technical surveillance under the following operational divisions:"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-slate-200 dark:border-[#262636] bg-slate-50/50 dark:bg-[#161622] space-y-1">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-500" />
                <span>{isHi ? "Manned Guarding (सुरक्षा गार्ड - स्टैटिक एवं गेट)" : "Manned Guarding (Static & Gate Access)"}</span>
              </div>
              <p className="text-slate-600 dark:text-gray-300">
                {isHi
                  ? "कॉर्पोरेट ऑफिस, बैंक, आवासीय सोसाइटी, वेयरहाउस, स्कूल, मॉल एवं निर्माण स्थलों पर 24/7 विज़िटर लॉगिंग, प्रवेश जांच एवं परिसर गश्त।"
                  : "24/7 entry logging, frisking protocols, badge verifications, boundary patrols for commercial towers, residential townships, and industrial yards."}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 dark:border-[#262636] bg-slate-50/50 dark:bg-[#161622] space-y-1">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-amber-500" />
                <span>{isHi ? "Armed Security (सशस्त्र गनमैन दस्ता)" : "Armed Tactical Security (Licensed Gunners)"}</span>
              </div>
              <p className="text-slate-600 dark:text-gray-300">
                {isHi
                  ? "कैश-इन-ट्रांजिट (CIT), ज्वैलरी शोरूम, बैंक शाखाओं एवं उच्च जोखिम वाले स्थलों हेतु वैध लाइसेंसधारी प्रशिक्षित गनमैन की तैनाती।"
                  : "Armed escort for high-value bullion transit, cash-in-transit (CIT), financial vaults, and vulnerable high-threat commercial facilities."}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 dark:border-[#262636] bg-slate-50/50 dark:bg-[#161622] space-y-1">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-amber-500" />
                <span>{isHi ? "Event & Bouncer Squads (इवेंट एवं बाउंसर सुरक्षा)" : "Event Security & Bouncer Contingents"}</span>
              </div>
              <p className="text-slate-600 dark:text-gray-300">
                {isHi
                  ? "शादियों, संगीत सम्मेलनों, रैलियों, क्लबों एवं प्रदर्शनियों हेतु भीड़ नियंत्रण, मंच सुरक्षा एवं वीआईपी एस्कॉर्ट बाउंसर।"
                  : "Crowd perimeter security, entry barricade control, conflict de-escalation, and VIP guest cordon for high-profile weddings and concerts."}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 dark:border-[#262636] bg-slate-50/50 dark:bg-[#161622] space-y-1">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>{isHi ? "VIP Executive Protection (पर्सनल बॉडीगार्ड / PSO)" : "VIP Executive Protection (Close Protection Officers)"}</span>
              </div>
              <p className="text-slate-600 dark:text-gray-300">
                {isHi
                  ? "उद्योगपतियों, वीआईपी हस्तियों एवं गणमान्य व्यक्तियों हेतु क्लोज़ प्रोटेक्शन ऑफिसर (CPO), कॉन्वॉय सुरक्षा एवं व्यक्तिगत एस्कॉर्ट।"
                  : "Tactically trained Close Protection Officers (CPOs) for HNWI executives, celebrities, and dignitary road-movement convoy escorts."}
              </p>
            </div>
          </div>
        </section>

        {/* 4. ARMED GUARDS & THE ARMS ACT 1959 - STRICT WARNING */}
        <section id="sec-4" className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <div className="w-8 h-8 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center font-bold font-mono text-sm">
              04
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {isHi ? "4. सशस्त्र सुरक्षा एवं शस्त्र अधिनियम, 1959 अनुपालन (Arms Act & Strict Firearms Rules)" : "4. Armed Security & Compliance with The Arms Act, 1959"}
            </h2>
          </div>

          {/* Strict Statutory Callout */}
          <div className="p-4 sm:p-5 rounded-2xl bg-red-500/10 border-2 border-red-500/40 text-red-900 dark:text-red-200 space-y-2">
            <div className="flex items-center gap-2 font-black text-red-600 dark:text-red-400 text-xs sm:text-sm uppercase tracking-wide">
              <AlertOctagon className="w-5 h-5 shrink-0" />
              <span>
                {isHi ? "वैधानिक चेतावनी: 'हर्ष फायरिंग' (Celebratory Firing) पर पूर्ण प्रतिबंध" : "STATUTORY WARNING: ABSOLUTE PROHIBITION ON CELEBRATORY FIRING"}
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">
              {isHi
                ? "शस्त्र (संशोधन) अधिनियम, 2019 की धारा 25(9) एवं माननीय सर्वोच्च न्यायालय के स्पष्ट आदेशानुसार, किसी भी शादी, जुलूस, उत्सव या सभा में हर्ष फायरिंग (हवाई गोलीबारी) एक गैर-जमानती संज्ञेय अपराध है (2 वर्ष तक का कारावास एवं ₹1,00,000 जुर्माना)। AAF Security के किसी भी गनमैन को हर्ष फायरिंग करने का आदेश देना सख्त वर्जित है। ऐसा करने पर गार्ड तत्काल ड्यूटी छोड़ देगा, निकटतम पुलिस स्टेशन में प्राथमिकी (FIR) दर्ज कराई जाएगी और सेवा शुल्क जब्त कर लिया जाएगा।"
                : "Under Section 25(9) of the Arms (Amendment) Act, 2019 and directives of the Supreme Court of India, celebratory gunfire ('Harsh Firing') in public assemblies, religious processions, or wedding celebrations is a cognizable, non-bailable offense punishable by up to 2 years imprisonment and ₹1,00,000 fine. Demanding celebratory gunfire from any AAF operative is strictly forbidden. Any breach results in immediate operative withdrawal, criminal police reporting, and full forfeiture of fees."}
            </p>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-gray-300">
            <p>
              {isHi ? (
                <>
                  <strong>लाइसेंस की वैधता:</strong> हमारे सभी सशस्त्र सुरक्षा कर्मी (Armed Gunners) भारत सरकार के सक्षम जिला मजिस्ट्रेट / पुलिस कमिश्नर द्वारा जारी वैध शस्त्र लाइसेंस (Arms License under Arms Rules, 2016) धारक होते हैं।
                </>
              ) : (
                <>
                  <strong>Licensing Veracity:</strong> Every armed operative deployed holds a verified arms license granted by competent statutory licensing authorities under the Arms Act, 1959 and Arms Rules, 2016.
                </>
              )}
            </p>
            <p>
              {isHi ? (
                <>
                  <strong>हथियार का उपयोग:</strong> हथियार का उपयोग केवल और केवल भारतीय कानून (BNS धारा 34–44 / IPC धारा 96–106) के तहत वास्तविक प्राणघातक संकट की स्थिति में वैध आत्मरक्षा (Private Defense of Life and Body) अथवा कैश लूट से बचाव हेतु ही किया जा सकता है।
                </>
              ) : (
                <>
                  <strong>Lawful Purpose:</strong> Weapon discharge is restricted strictly to legal self-defense and protection of human life against imminent fatal threats under Indian self-defense jurisprudence (Sections 34–44 BNS / Sections 96–106 IPC).
                </>
              )}
            </p>
            <p>
              {isHi ? (
                <>
                  <strong>हथियार सौंपने पर रोक:</strong> क्लाइंट या कोई भी अन्य व्यक्ति किसी भी परिस्थिति में गार्ड से उसका हथियार अपने हाथ में नहीं ले सकता और न ही किसी अतिथि या परिजन को सौंपने की अनुमति होगी।
                </>
              ) : (
                <>
                  <strong>Weapon Custody:</strong> Under no circumstance shall the Client, host, or guests handle, inspect, or take custody of an operative's firearm. Weapon custody remains exclusively with the assigned licensed operative.
                </>
              )}
            </p>
          </div>
        </section>

        {/* 5. CLIENT WARRANTIES & VENUE SAFETY */}
        <section id="sec-5" className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold font-mono text-sm">
              05
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {isHi ? "5. ग्राहक की जिम्मेदारियां एवं स्थल सुरक्षा (Client Warranties & Venue Conduct)" : "5. Client Warranties, Site Ownership & Deployment Prerequisites"}
            </h2>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-gray-300">
            <p>
              {isHi
                ? "ग्राहक यह प्रमाणित और वचनबद्ध करता है कि:"
                : "The Client explicitly covenants, warrants, and represents the following conditions:"}
            </p>

            <ul className="space-y-2 pl-5 list-disc">
              <li>
                {isHi ? (
                  <>
                    <strong>वैध मालिकाना हक / कब्जा:</strong> ग्राहक के पास तैनाती स्थल (Venue/Property) का वैध मालिकाना हक, वैध लीज या कार्यक्रम आयोजित करने की सक्षम प्रशासनिक अनुमति (Police / Fire / SDM NOC) मौजूद है।
                  </>
                ) : (
                  <>
                    <strong>Lawful Possession &amp; Permits:</strong> The Client holds undisputed ownership, registered tenancy, or official administrative/police clearance permits for the deployment venue.
                  </>
                )}
              </li>
              <li>
                {isHi ? (
                  <>
                    <strong className="text-red-600 dark:text-red-400">विवादित संपत्तियों पर तैनाती निषेध:</strong> AAF Security किसी भी कानूनी विवाद में फंसी जमीन, कब्जा खाली कराने (Forceful Eviction/Encroachment), कोर्ट के स्थगन आदेश (Stay Order) वाली संपत्ति, या दो पक्षों के हिंसक टकराव वाले स्थलों पर गार्ड तैनात नहीं करेगी।
                  </>
                ) : (
                  <>
                    <strong className="text-red-600 dark:text-red-400">No Disputed Land / Land-Grabbing Operations:</strong> AAF Security will never deploy operatives on disputed agricultural/commercial land, forceful eviction attempts, properties under active Court Injunctions, or illegal property grab skirmishes.
                  </>
                )}
              </li>
              <li>
                {isHi ? (
                  <>
                    <strong>मूलभूत मानवीय सुविधाएं:</strong> श्रम नियमों के अनुसार, ग्राहक ड्यूटी पोस्ट पर गार्ड्स के लिए स्वच्छ पीने का पानी, शौचालय सुविधा, तथा अत्यधिक धूप/वर्षा/कड़ाके की ठंड से बचने के लिए शेड/केबिन की व्यवस्था सुनिश्चित करेगा।
                  </>
                ) : (
                  <>
                    <strong>Occupational Amenities:</strong> The Client shall ensure basic human amenities at the post, including potable drinking water, clean sanitation/washroom access, and covered shelter against extreme heat, rain, or severe winter frost.
                  </>
                )}
              </li>
              <li>
                {isHi ? (
                  <>
                    <strong>व्यक्तिगत घरेलू कार्यों पर रोक:</strong> सुरक्षा गार्ड्स से केवल सुरक्षा संबंधी कार्य (गेट चेकिंग, गश्त, निगरानी) लिए जाएंगे। गार्ड्स से घरेलू बर्तन धोना, खाना बनाना, व्यक्तिगत गाड़ियां धुलवाना या घरेलू सामान ढुलवाना सख्त मना है।
                  </>
                ) : (
                  <>
                    <strong>Prohibition of Menial / Unrelated Chores:</strong> Security operatives are contracted strictly for protective deterrence. Requiring guards to cook, wash personal vehicles, clean household dishes, or perform domestic chores is strictly prohibited.
                  </>
                )}
              </li>
            </ul>
          </div>
        </section>

        {/* 6. SHIFTS, OVERTIME & REST */}
        <section id="sec-6" className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold font-mono text-sm">
              06
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {isHi ? "6. ड्यूटी शिफ्ट, विश्राम एवं ओवरटाइम नियम (Shift Protocols & Overtime)" : "6. Shift Timings, Rest Periods & Overtime Protocols"}
            </h2>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-gray-300">
            <p>
              {isHi ? (
                <>
                  <strong>मानक शिफ्ट अवधियां:</strong> सुरक्षा सेवाएं मानक 8 घंटे, 12 घंटे (डे/नाइट), अथवा 24 घंटे की रिले चक्र व्यवस्था में प्रदान की जाती हैं।
                </>
              ) : (
                <>
                  <strong>Standard Shift Intervals:</strong> Deployments are structured into Half-Day (4h), Standard (8h), Extended (12h), or 24-Hour continuous rotating relays.
                </>
              )}
            </p>
            <p>
              {isHi ? (
                <>
                  <strong>अधिकतम कार्य सीमा:</strong> मानसिक सतर्कता एवं शारीरिक चुस्ती बनाए रखने हेतु किसी भी सुरक्षा कर्मी को बिना रिले के लगातार 12 घंटे से अधिक एकल ड्यूटी पर नहीं रखा जाएगा। 24 घंटे की तैनाती में रिले गार्ड का बदलाव अनिवार्य है।
                </>
              ) : (
                <>
                  <strong>Fatigue Management:</strong> To maintain tactical vigilance, no operative shall be scheduled beyond 12 consecutive hours without an authorized relief replacement. Continuous 24-hour posts necessitate rotational relief guards.
                </>
              )}
            </p>
            <p>
              {isHi ? (
                <>
                  <strong>ओवरटाइम (Overtime Extension):</strong> यदि क्लाइंट तय समय के बाद ड्यूटी बढ़वाना चाहता है, तो इसके लिए एजेंसी को पूर्व सूचना देनी होगी। अतिरिक्त घंटे का भुगतान मानक प्रति-घंटे की दर से देय होगा। रात्रि 11:00 बजे से प्रातः 06:00 बजे के बीच अनशेड्यूल्ड एक्सटेंशन पर +20% नाइट सरचार्ज लागू होगा।
                </>
              ) : (
                <>
                  <strong>Overtime Surcharges:</strong> Duty extensions beyond booked hours must be pre-authorized. Overtime is billed pro-rata at standard hourly rates (+20% surcharge for unannounced late-night extensions between 11:00 PM and 06:00 AM).
                </>
              )}
            </p>
          </div>
        </section>

        {/* 7. COMMERCIALS, INVOICING & GST */}
        <section id="sec-7" className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold font-mono text-sm">
              07
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {isHi ? "7. व्यावसायिक दरें, बिलिंग एवं जीएसटी (Commercials, Billing & Taxes)" : "7. Commercial Rates, Invoicing, Deposits & GST"}
            </h2>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-gray-300">
            <p>
              {isHi ? (
                <>
                  <strong>मोबिलाइजेशन अग्रिम (Advance Deposit):</strong> इवेंट, शादी एवं अल्पकालिक सुरक्षा तैनाती के लिए 50% से 100% अग्रिम राशि ड्यूटी से पहले जमा करानी अनिवार्य है, जिसके बाद ही रोस्टर लॉक और गार्ड रवाना किए जाएंगे।
                </>
              ) : (
                <>
                  <strong>Mobilization Advance:</strong> Event, private escort, and temporary security assignments require 50% to 100% advance deposit prior to operative roster mobilization and departure.
                </>
              )}
            </p>
            <p>
              {isHi ? (
                <>
                  <strong>कॉर्पोरेट मासिक बिलिंग:</strong> नियमित औद्योगिक एवं कमर्शियल साइट्स के लिए बिलिंग प्रति माह के अंत में जारी की जाएगी, जिसका भुगतान इनवॉइस प्राप्ति के 7 कार्यदिवसों के भीतर करना होगा। विलंब होने पर 18% वार्षिक दर से ब्याज देय होगा।
                </>
              ) : (
                <>
                  <strong>Monthly Corporate Billing:</strong> Recurring monthly contracts are invoiced at month-end, payable within 7 business days. Overdue balances attract statutory interest at 18% per annum.
                </>
              )}
            </p>
            <p>
              {isHi ? (
                <>
                  <strong>जीएसटी एवं वैधानिक कर:</strong> सभी बिलों पर भारत सरकार द्वारा निर्धारित लागू दर (वर्तमान में 18% GST) अनुसार वस्तु एवं सेवा कर अतिरिक्त रूप से देय होगा।
                </>
              ) : (
                <>
                  <strong>Applicable Taxes (GST):</strong> All invoices are subject to statutory Goods &amp; Services Tax (GST) at prevailing government tax rates.
                </>
              )}
            </p>
            <p>
              {isHi ? (
                <>
                  <strong>आउटस्टेशन यात्रा व्यय:</strong> औरंगाबाद नगरपालिका सीमा से बाहर अथवा अन्य जिलों/राज्यों में वीआईपी एस्कॉर्ट हेतु ईंधन, टोल टैक्स, तथा यदि आवश्यक हो तो आवास/भोजन का वास्तविक खर्च क्लाइंट द्वारा वहन किया जाएगा।
                </>
              ) : (
                <>
                  <strong>Outstation Allowances:</strong> Inter-district travel, highway tolls, vehicle fuel, and outstation overnight lodging/meals for VIP escorts beyond city borders are chargeable to the Client on actuals.
                </>
              )}
            </p>
          </div>
        </section>

        {/* 8. CANCELLATION & REFUNDS */}
        <section id="sec-8" className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold font-mono text-sm">
              08
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {isHi ? "8. रद्दीकरण, पुनर्निर्धारण एवं रिफंड नीति (Cancellation & Refund Schedules)" : "8. Cancellation, Rescheduling & Structured Refund Policy"}
            </h2>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181824] border border-slate-200 dark:border-[#262636] space-y-2 text-xs">
            <div className="font-bold text-slate-900 dark:text-white">
              {isHi ? "रद्दीकरण समय-सीमा एवं रिफंड प्रतिशत (Refund Tier Schedule):" : "Official Cancellation Notice Windows & Refund Rates:"}
            </div>

            <div className="space-y-2">
              <div className="flex items-start justify-between gap-3 p-2 rounded-lg bg-emerald-500/10 text-emerald-800 dark:text-emerald-300">
                <span className="font-semibold">{isHi ? "शिफ्ट शुरू होने से 24+ घंटे पूर्व रद्दीकरण:" : "24+ Hours Notice Prior to Call Time:"}</span>
                <span className="font-black font-mono">100% {isHi ? "पूर्ण रिफंड" : "Full Refund"}</span>
              </div>

              <div className="flex items-start justify-between gap-3 p-2 rounded-lg bg-blue-500/10 text-blue-800 dark:text-blue-300">
                <span className="font-semibold">{isHi ? "शिफ्ट शुरू होने से 12 से 24 घंटे पूर्व:" : "12 to 24 Hours Notice Prior to Call Time:"}</span>
                <span className="font-black font-mono">80% {isHi ? "रिफंड (20% रोस्टर शुल्क)" : "Refund (20% roster hold)"}</span>
              </div>

              <div className="flex items-start justify-between gap-3 p-2 rounded-lg bg-amber-500/10 text-amber-800 dark:text-amber-300">
                <span className="font-semibold">{isHi ? "शिफ्ट शुरू होने से 4 से 12 घंटे पूर्व:" : "4 to 12 Hours Notice Prior to Call Time:"}</span>
                <span className="font-black font-mono">50% {isHi ? "रिफंड (50% मोबिलाइजेशन)" : "Refund (50% mobilization)"}</span>
              </div>

              <div className="flex items-start justify-between gap-3 p-2 rounded-lg bg-red-500/10 text-red-800 dark:text-red-300">
                <span className="font-semibold">{isHi ? "4 घंटे से कम समय अथवा गार्ड्स साइट पर पहुंचने के बाद:" : "Under 4 Hours Notice or Guards Arrived On-Site:"}</span>
                <span className="font-black font-mono">{isHi ? "प्रथम शिफ्ट नॉन-रिफंडेबल" : "First Shift Non-Refundable"}</span>
              </div>
            </div>

            <p className="text-slate-500 dark:text-gray-400 text-[11px] pt-1">
              {isHi
                ? "* तारीख बदलने (Rescheduling) के लिए कम से कम 12 घंटे पहले सूचित करना होगा। गार्ड उपलब्धता के आधार पर बिना किसी शुल्क के तारीख बदली जा सकेगी।"
                : "* Booking dates may be rescheduled free of penalty with at least 12 hours advance notice, subject to squad roster availability."}
            </p>
          </div>
        </section>

        {/* 9. CODE OF CONDUCT & UNIFORMS */}
        <section id="sec-9" className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold font-mono text-sm">
              09
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {isHi ? "9. सुरक्षा कर्मियों की आचरण संहिता एवं वर्दी (Operative Conduct & Uniforms)" : "9. Operative Code of Conduct, Sobriety & Uniform Protocol"}
            </h2>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-gray-300">
            <p>
              {isHi ? (
                <>
                  <strong>पूर्ण नशाबंदी नीति (Zero-Tolerance Sobriety):</strong> ड्यूटी पर तैनात किसी भी कर्मी द्वारा शराब, भांग, गुटखा, तंबाकू या किसी भी नशीले पदार्थ का सेवन पूर्णतः प्रतिबंधित है। फील्ड सुपरवाइजर औचक निरीक्षण एवं ब्रीथ एनालाइजर जांच करते हैं।
                </>
              ) : (
                <>
                  <strong>Zero-Tolerance Sobriety:</strong> Complete prohibition on consumption of alcohol, narcotics, or intoxicating substances on duty. Patrol field officers enforce random breathalyzer screenings.
                </>
              )}
            </p>
            <p>
              {isHi ? (
                <>
                  <strong>मानक वर्दी एवं आईडी कार्ड:</strong> प्रत्येक सुरक्षा कर्मी AAF Security की निर्धारित औपचारिक वर्दी (कंधे पर इंसिग्निया बैज, नेम-प्लेट, सुरक्षा बूट) एवं एजेंसी व पुलिस-सत्यापित फोटो पहचान पत्र के साथ उपस्थित रहेगा।
                </>
              ) : (
                <>
                  <strong>Uniform &amp; Credentials:</strong> Operatives report in prescribed agency uniforms bearing company crests, tactical rank badges, safety footwear, and government/agency photo identification cards.
                </>
              )}
            </p>
            <p>
              {isHi ? (
                <>
                  <strong>दुर्व्यवहार या अनुपस्थिति पर त्वरित रिप्लेसमेंट:</strong> यदि किसी गार्ड का आचरण असंतोषजनक पाया जाता है, तो क्लाइंट हमारे 24/7 कमांड सेंटर को सूचित करेगा। एजेंसी 2 से 4 घंटे के भीतर नया योग्य गार्ड तैनात करेगी।
                </>
              ) : (
                <>
                  <strong>Operative Replacement Guarantee:</strong> In the unlikely event of guard indiscipline or unfitness, the Command Center guarantees replacement dispatch within 2 to 4 hours in operational zones.
                </>
              )}
            </p>
          </div>
        </section>

        {/* 10. RIGHT OF PRIVATE DEFENSE & NON-VIOLENCE */}
        <section id="sec-10" className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold font-mono text-sm">
              10
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {isHi ? "10. आत्मरक्षा का अधिकार एवं गैर-कानूनी आदेशों पर रोक (Private Defense & Unlawful Orders)" : "10. Right of Private Defense & Non-Execution of Illegal Commands"}
            </h2>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-gray-300">
            <p>
              {isHi ? (
                <>
                  <strong>भारतीय कानून के तहत आत्मरक्षा:</strong> हमारे गार्ड्स को भारतीय न्याय संहिता (BNS) की धारा 34–44 (पूर्ववर्ती IPC धारा 96–106) के अंतर्गत शरीर एवं संपत्ति की आत्मरक्षा के सिद्धांतों के अनुसार प्रशिक्षित किया गया है।
                </>
              ) : (
                <>
                  <strong>Legal Self-Defense Framework:</strong> Guards operate under statutory principles of Private Defense of Person and Property as recognized under Sections 34–44 of Bharatiya Nyaya Sanhita, 2023 (BNS) / Sections 96–106 IPC.
                </>
              )}
            </p>
            <p>
              {isHi ? (
                <>
                  <strong className="text-red-600 dark:text-red-400">गैर-कानूनी आदेशों को मानने से पूर्ण इनकार:</strong> गार्ड्स को किसी भी निर्दोष व्यक्ति के साथ मारपीट करने, गैर-कानूनी बंदी बनाने, सरकारी कर्मचारियों/पुलिस के कार्य में बाधा डालने, पारिवारिक झगड़ों में हिंसा करने, या वसूली (Extortion/Recovery) करने का आदेश नहीं दिया जा सकता।
                </>
              ) : (
                <>
                  <strong className="text-red-600 dark:text-red-400">Absolute Refusal of Illegal Commands:</strong> Guards shall never obey client directives to commit unlawful battery, illegal confinement, obstruction of public servants/police, debt coercion, or illegal physical retaliation.
                </>
              )}
            </p>
            <p>
              {isHi ? (
                <>
                  <strong>ड्यूटी से हटने का अधिकार:</strong> यदि क्लाइंट गार्ड्स पर अपराध करने का दबाव बनाता है या गार्ड्स के साथ गाली-गलौज/हिंसा करता है, तो सुरक्षा दस्ते को अपनी जान बचाने हेतु स्थल से तत्काल हटने का कानूनी अधिकार है।
                </>
              ) : (
                <>
                  <strong>Right to Disengage:</strong> If the Client endangers operatives or demands felonious acts, operatives have the statutory right to immediately disengage and withdraw to safety with zero client recourse.
                </>
              )}
            </p>
          </div>
        </section>

        {/* 11. LIMITATION OF LIABILITY */}
        <section id="sec-11" className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold font-mono text-sm">
              11
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {isHi ? "11. दायित्व की कानूनी सीमा एवं जोखिम अस्वीकरण (Limitation of Liability & Disclaimer)" : "11. Limitation of Liability, Property Risk & Insurance Exclusion"}
            </h2>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-gray-300">
            <p>
              {isHi ? (
                <>
                  <strong>निवारक सुरक्षा (Deterrence vs. Insurance Underwriter):</strong> AAF Security एक पेशेवर सुरक्षा प्रदाता है, कोई बीमा कंपनी (Insurer) नहीं है। सुरक्षा गार्ड्स का कार्य असामाजिक तत्वों को रोकना और सतर्कता बरतना है। क्लाइंट को अपनी मूल्यवान संपत्तियों, नकदी एवं इन्वेंटरी का उचित बीमा कराकर रखना अनिवार्य है।
                </>
              ) : (
                <>
                  <strong>Deterrence, Not Insurance:</strong> AAF Security provides deterrence and protective watch, but is not an insurer or underwriter. The Client must maintain comprehensive property, burglary, and fire insurance for all assets.
                </>
              )}
            </p>
            <p>
              {isHi ? (
                <>
                  <strong>अप्रत्यक्ष नुकसान का अस्वीकरण:</strong> कानून द्वारा अनुमत अधिकतम सीमा तक, एजेंसी किसी भी अप्रत्यक्ष, आकस्मिक, परिणामी नुकसान, व्यापारिक हानि, या अप्रत्याशित डकैती/आतंकी घटना के वित्तीय नुकसान के लिए उत्तरदायी नहीं होगी।
                </>
              ) : (
                <>
                  <strong>Exclusion of Consequential Damages:</strong> To the fullest extent permitted by Indian Law, AAF Security shall not be liable for indirect, punitive, or consequential losses, business interruption, or unpreventable armed robbery.
                </>
              )}
            </p>
            <p className="p-3 rounded-xl bg-slate-50 dark:bg-[#181824] border border-slate-200 dark:border-[#262636] font-semibold">
              {isHi ? (
                <>
                  <strong>वित्तीय दायित्व की अधिकतम सीमा (Monetary Cap):</strong> किसी भी परिस्थिति में, AAF Security या उसके निदेशकों का कुल वित्तीय दायित्व संबंधित घटना वाली विशिष्ट शिफ्ट या महीने के लिए क्लाइंट द्वारा वास्तव में भुगतान किए गए सेवा शुल्क (Total Service Fee Paid) तक ही सीमित रहेगा।
                </>
              ) : (
                <>
                  <strong>Aggregate Financial Liability Cap:</strong> Under all circumstances, the maximum aggregate financial liability of AAF Security for any direct claim shall be strictly capped at the total service fees actually paid by the Client for the specific deployment shift or calendar month.
                </>
              )}
            </p>
          </div>
        </section>

        {/* 12. INDEMNIFICATION */}
        <section id="sec-12" className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold font-mono text-sm">
              12
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {isHi ? "12. ग्राहक की क्षतिपूर्ति बाध्यता (Client Indemnification)" : "12. Client Indemnification Obligations"}
            </h2>
          </div>

          <p className="text-slate-700 dark:text-gray-300 text-xs sm:text-sm">
            {isHi
              ? "ग्राहक यह वचन देता है कि वह AAF Security, इसके निदेशक श्री भूपेंद्र कुमार, अधिकारियों एवं कर्मियों को किसी भी तीसरे पक्ष (Third-Party) के दावों, सरकारी जुर्मानों, पुलिस मुकदमों एवं कानूनी खर्चों से पूर्णतः क्षतिपूर्ति (Indemnify) करेगा, यदि ऐसा नुकसान क्लाइंट की किसी गैर-कानूनी गतिविधि, गलत पते की घोषणा, स्थल पर आवश्यक लाइसेंस (Fire/Police NOC) के अभाव, या क्लाइंट के अतिथियों द्वारा सुरक्षा कर्मियों के साथ की गई हिंसा के कारण उत्पन्न हुआ हो।"
              : "The Client agrees to defend, indemnify, and hold harmless AAF Security, its Director Bhupendra Kumar, officers, and operatives against all third-party legal claims, regulatory fines, and litigation damages arising from: (a) Client's failure to obtain statutory event or fire NOCs, (b) fraudulent site ownership declarations, or (c) assault or injury inflicted upon security personnel by the Client or its guests."}
          </p>
        </section>

        {/* 13. CONFIDENTIALITY */}
        <section id="sec-13" className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold font-mono text-sm">
              13
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {isHi ? "13. गोपनीयता एवं गैर-प्रकटीकरण (Confidentiality & Non-Disclosure)" : "13. Client Confidentiality, Non-Disclosure & Data Protection"}
            </h2>
          </div>

          <p className="text-slate-700 dark:text-gray-300 text-xs sm:text-sm">
            {isHi
              ? "ड्यूटी के दौरान प्राप्त होने वाली क्लाइंट की व्यक्तिगत, व्यावसायिक एवं वीआईपी मूवमेंट संबंधी समस्त गोपनीय जानकारियों (CCTV फुटेज, फ्लोर मैप, गेस्ट लिस्ट) की पूर्ण गोपनीयता बनाए रखी जाएगी। कोई भी सुरक्षा कर्मी क्लाइंट के निजी परिसर की तस्वीरें या वीडियो बिना लिखित सहमति के सोशल मीडिया पर पोस्ट नहीं करेगा।"
              : "All non-public client information (CCTV feeds, structural blueprints, VIP movement itineraries, guest registries) accessed during duty is strictly confidential. Operatives are contractually barred from recording, publishing, or sharing client premises footage on social media without express written authorization."}
          </p>
        </section>

        {/* 14. NON-SOLICITATION / ANTI-POACHING */}
        <section id="sec-14" className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold font-mono text-sm">
              14
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {isHi ? "14. कर्मियों का गैर-हस्तांतरण / नो-पोचिंग खंड (Non-Solicitation - 12 Months)" : "14. Non-Solicitation & Anti-Poaching Covenant (12-Month Bar)"}
            </h2>
          </div>

          <p className="text-slate-700 dark:text-gray-300 text-xs sm:text-sm">
            {isHi
              ? "AAF Security अपने जवानों के सत्यापन, प्रशिक्षण एवं वर्दी पर पर्याप्त संसाधन खर्च करती है। ग्राहक यह स्वीकार करता है कि वह तैनाती के दौरान अथवा सेवा समाप्ति के 12 (बारह) महीने के भीतर एजेंसी के किसी भी गार्ड, गनमैन या बाउंसर को सीधे निजी तौर पर नौकरी पर नहीं रखेगा, जब तक कि एजेंसी की लिखित पूर्व अनुमति और निर्धारित प्लेसमेंट ट्रांसफर शुल्क का भुगतान न कर दिया जाए।"
              : "The Client covenants not to directly or indirectly solicit, recruit, or privately hire any operative introduced or deployed by AAF Security for 12 (twelve) months post-deployment, without the express written authorization of AAF Security and remittance of a standard corporate recruitment transfer fee."}
          </p>
        </section>

        {/* 15. FORCE MAJEURE */}
        <section id="sec-15" className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold font-mono text-sm">
              15
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {isHi ? "15. अपरिहार्य परिस्थितियां (Force Majeure & Emergencies)" : "15. Force Majeure & Uncontrollable Contingencies"}
            </h2>
          </div>

          <p className="text-slate-700 dark:text-gray-300 text-xs sm:text-sm">
            {isHi
              ? "दैवीय आपदा (बाढ़, भूकंप, चक्रवात), युद्ध, दंगे, सरकारी कर्फ्यू, महामारी, सड़क जाम, या कानूनी प्रतिबंधों के कारण यदि सेवा में कोई अप्रत्याशित व्यवधान या देरी होती है, तो इसके लिए किसी भी पक्ष को अनुबंध का उल्लंघनकर्ता नहीं माना जाएगा, बशर्ते कि स्थिति सामान्य होते ही यथाशीघ्र सेवाएं बहाल की जाएं।"
              : "Neither party shall be liable for deployment failure or delay occasioned by Acts of God (earthquakes, catastrophic flooding, cyclone), civil riots, armed war, government-mandated curfews, road blockades, pandemics, or statutory police prohibitions beyond reasonable control."}
          </p>
        </section>

        {/* 16. GOVERNING LAW & JURISDICTION */}
        <section id="sec-16" className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold font-mono text-sm">
              16
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {isHi ? "16. लागू कानून, मध्यस्थता एवं अनन्य न्यायिक क्षेत्र (Governing Law & Jurisdiction)" : "16. Governing Law, Arbitration & Exclusive Jurisdiction (Aurangabad, Bihar)"}
            </h2>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-gray-300">
            <p>
              {isHi ? (
                <>
                  <strong>लागू कानून:</strong> यह अनुबंध भारत गणराज्य के कानूनों के अंतर्गत निष्पादित एवं लागू होगा।
                </>
              ) : (
                <>
                  <strong>Governing Law:</strong> This Agreement is executed and governed in accordance with the laws of the Republic of India.
                </>
              )}
            </p>
            <p>
              {isHi ? (
                <>
                  <strong>पारस्परिक वार्ता एवं मध्यस्थता:</strong> किसी भी विवाद की स्थिति में पहले दोनों पक्ष 15 दिनों के भीतर आपसी सद्भावना से बातचीत करेंगे। समाधान न होने पर विवाद को <strong>मध्यस्थता एवं सुलह अधिनियम, 1996 (Arbitration and Conciliation Act, 1996)</strong> के तहत एकल मध्यस्थ (Sole Arbitrator) को सौंपा जाएगा, जिसकी बैठक औरंगाबाद (बिहार) में होगी।
                </>
              ) : (
                <>
                  <strong>Amicable Negotiation &amp; Arbitration:</strong> Unresolved disputes shall be referred to Sole Arbitration under the Arbitration &amp; Conciliation Act, 1996. The seat and legal venue of arbitration shall be Aurangabad, Bihar, India.
                </>
              )}
            </p>
            <p className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 font-bold text-amber-900 dark:text-amber-300">
              {isHi ? (
                <>
                  <strong>अनन्य न्यायिक क्षेत्र:</strong> इस अनुबंध से उत्पन्न होने वाले किसी भी कानूनी वाद या न्यायिक कार्रवाई के लिए केवल और केवल <strong>जिला न्यायालय, औरंगाबाद (बिहार), भारत</strong> के सक्षम न्यायालयों का ही अनन्य क्षेत्राधिकार (Exclusive Jurisdiction) होगा।
                </>
              ) : (
                <>
                  <strong>Exclusive Court Jurisdiction:</strong> Subject to arbitration, the competent civil courts at <strong>Aurangabad, District Aurangabad, Bihar, India</strong> shall possess exclusive and sole territorial jurisdiction.
                </>
              )}
            </p>
          </div>
        </section>

        {/* 17. OFFICIAL GRIEVANCE OFFICER & DIRECTOR SEAL */}
        <section id="sec-17" className="space-y-4 pt-6 border-t-2 border-amber-500/30 scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold font-mono text-sm">
              17
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {isHi ? "17. शिकायत निवारण अधिकारी एवं आधिकारिक मुहर (Grievance Officer & Official Seal)" : "17. Grievance Redressal Officer, Registered Office & Agency Seal"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Left: Contact Info */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-[#181824] border border-slate-200 dark:border-[#262636] text-xs">
              <div className="font-extrabold text-amber-500 uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-amber-500" />
                <span>{isHi ? "पंजीकृत कार्यालय एवं संपर्क केंद्र" : "Registered Headquarters & Dispatch Center"}</span>
              </div>

              <div className="space-y-2 text-slate-700 dark:text-gray-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{COMPANY_ADDRESS}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="font-mono font-bold">{COMPANY_PHONES.join(" • ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  <a href={`mailto:${COMPANY_EMAIL}`} className="hover:underline font-semibold text-slate-900 dark:text-white">
                    {COMPANY_EMAIL}
                  </a>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-500 dark:text-gray-400 border-t border-slate-200 dark:border-[#262636]">
                {isHi
                  ? "किसी भी विधिक नोटिस या आधिकारिक पत्राचार हेतु उपरोक्त पंजीकृत डाक पते पर लिखित सूचना प्रेषित करें।"
                  : "All official legal notices shall be served via registered post at the aforementioned registered office address."}
              </div>
            </div>

            {/* Right: Director Seal & Official Sign-off Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/40 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                    {isHi ? "अधिकृत हस्ताक्षर एवं मुहर" : "Authorized Agency Sign-off"}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                    ACTIVE 2026
                  </span>
                </div>

                <div className="text-base font-black text-slate-900 dark:text-white">
                  {COMPANY_NAME}
                </div>
                <div className="text-xs text-slate-600 dark:text-gray-300">
                  {isHi ? "निदेशक:" : "Director:"} <span className="font-bold text-slate-900 dark:text-white">{DIRECTOR_NAME}</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-gray-400 font-mono">
                  {isHi ? "स्थापना वर्ष:" : "Estd Year:"} {COMPANY_ESTD} • Dist. Aurangabad (Bihar)
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-500/30 text-center space-y-1 shadow-sm">
                <div className="text-[10px] uppercase font-mono font-bold text-amber-600 dark:text-amber-400">
                  {isHi ? "सुरक्षा एवं विधिक अनुपालन सील" : "Official Compliance Seal"}
                </div>
                <div className="text-[11px] font-bold text-slate-800 dark:text-gray-200">
                  PSARA 2005 &amp; The Arms Act, 1959
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isHi ? "सत्यापित एवं वैध अनुबंध" : "Legally Certified & Effective"}</span>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* Footer Bottom Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-gray-400 pt-4 print:hidden">
        <div>
          © {new Date().getFullYear()} {COMPANY_NAME}. All Legal Rights Reserved.
        </div>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:text-amber-500 transition-colors font-medium">
            {isHi ? "गोपनीयता नीति (Privacy Policy)" : "Privacy Policy"}
          </Link>
          <span>•</span>
          <Link href="/verification-protocol" className="hover:text-amber-500 transition-colors font-medium">
            {isHi ? "सत्यापन प्रोटोकॉल (Verification)" : "Verification Protocol"}
          </Link>
          <span>•</span>
          <Link href="/book" className="text-amber-500 font-bold hover:underline">
            {isHi ? "गार्ड बुक करें" : "Book Security Guard"}
          </Link>
        </div>
      </div>

    </div>
  );
}
