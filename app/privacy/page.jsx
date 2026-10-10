"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Scale,
  PhoneCall,
  Mail,
  MapPin,
  Building2,
  ShieldCheck,
  Languages,
  UserCheck,
  Server,
  Database,
  Camera,
  Radio,
  FileCheck2,
  UserX,
  FileLock2
} from "lucide-react";
import {
  COMPANY_NAME,
  DIRECTOR_NAME,
  DIRECTOR_NAMES_HI,
  DIRECTORS,
  COMPANY_PHONES,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  COMPANY_ESTD,
  COMPANY_PHONE
} from "../../utils/whatsapp";
import { useLanguage } from "../../context/LanguageContext";

export default function PrivacyPage() {
  const { language: globalLang } = useLanguage();
  const [activeLang, setActiveLang] = useState(globalLang || "hi");

  const isHi = activeLang === "hi";

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const sections = [
    { id: "sec-1", titleEn: "1. Statutory Framework & Scope (DPDP Act 2023)", titleHi: "1. वैधानिक ढांचा एवं दायरा (DPDP Act 2023)" },
    { id: "sec-2", titleEn: "2. Categories of Personal Data Collected", titleHi: "2. एकत्रित किए जाने वाले व्यक्तिगत डेटा की श्रेणियां" },
    { id: "sec-3", titleEn: "3. Lawful Purpose & Basis for Processing", titleHi: "3. डेटा प्रोसेसिंग का कानूनी उद्देश्य एवं आधार" },
    { id: "sec-4", titleEn: "4. Guard & Armed Operative Verification Records", titleHi: "4. सुरक्षा गार्ड्स एवं गनमैन का सत्यापन डेटा (PSARA)" },
    { id: "sec-5", titleEn: "5. CCTV Surveillance & Body-Cam Footage", titleHi: "5. सीसीटीवी निगरानी एवं बॉडी-कैम फुटेज नीति" },
    { id: "sec-6", titleEn: "6. GPS Tracking & Patrol Telemetry Data", titleHi: "6. जीपीएस ट्रैकिंग एवं पेट्रोलिंग टेलीमेट्री डेटा" },
    { id: "sec-7", titleEn: "7. Zero Commercial Sale / Non-Disclosure", titleHi: "7. शून्य डेटा बिक्री एवं सख्त गैर-प्रकटीकरण नीति" },
    { id: "sec-8", titleEn: "8. Disclosure to Police & Law Enforcement", titleHi: "8. पुलिस एवं कानून प्रवर्तन एजेंसियों को प्रकटीकरण" },
    { id: "sec-9", titleEn: "9. Technical Security & Encryption Standards", titleHi: "9. तकनीकी सुरक्षा एवं 256-बिट एन्क्रिप्शन मानक" },
    { id: "sec-10", titleEn: "10. Data Retention & Auto-Purge Timelines", titleHi: "10. डेटा प्रतिधारण एवं स्वतः निष्कासन समय-सीमा" },
    { id: "sec-11", titleEn: "11. Data Principal Statutory Rights", titleHi: "11. डेटा स्वामी (नागरिक) के विधिक अधिकार" },
    { id: "sec-12", titleEn: "12. Protection of Minors & Sensitive Venues", titleHi: "12. नाबालिगों एवं संवेदनशील परिसरों का संरक्षण" },
    { id: "sec-13", titleEn: "13. Cookies & Automated Digital Analytics", titleHi: "13. कुकीज़ एवं डिजिटल वेब एनालिटिक्स" },
    { id: "sec-14", titleEn: "14. Grievance Redressal & Grievance Officer", titleHi: "14. शिकायत निवारण तंत्र एवं अधिकारी" },
    { id: "sec-15", titleEn: "15. Amendments & Regulatory Notifications", titleHi: "15. नीति संशोधन एवं विधिक सूचनाएं" },
    { id: "sec-16", titleEn: "16. Statutory Registry & Executive Seal", titleHi: "16. पंजीकृत कंपनी ब्योरा एवं अधिकृत हस्ताक्षर" }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 print:py-2 print:px-2">
      
      {/* Top Navigation & Language / Print Controls */}
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
            aria-label="Print or Save Privacy Policy as PDF"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-[#16161F] border border-slate-300 dark:border-[#262636] hover:border-amber-500 text-slate-700 dark:text-gray-200 text-xs font-semibold shadow-sm transition-all cursor-pointer hover:shadow"
          >
            <Printer className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">{isHi ? "प्रिंट / PDF सेव करें" : "Print / Save PDF"}</span>
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50/80 via-white to-amber-100/40 dark:from-slate-900 dark:via-slate-950 dark:to-black text-slate-900 dark:text-white border-2 border-amber-500/30 shadow-xl dark:shadow-2xl overflow-hidden transition-colors">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>DPDP ACT 2023 &amp; IT ACT 2000 COMPLIANT</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {isHi ? "गोपनीयता नीति एवं डेटा संरक्षण घोषणा" : "Privacy Policy & Statutory Data Protection Charter"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              {isHi
                ? `${COMPANY_NAME} की आधिकारिक डेटा गोपनीयता नीति। डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDP Act, 2023), सूचना प्रौद्योगिकी अधिनियम 2000 (IT Act) एवं PSARA 2005 के वैधानिक प्रावधानों के अंतर्गत ग्राहक गोपनीयता, बायोमेट्रिक व सीसीटीवी फुटेज सुरक्षा की गारंटी।`
                : `Official Data Privacy Policy of ${COMPANY_NAME}. Governed in strict conformance with the Digital Personal Data Protection Act (DPDP Act, 2023), Information Technology Act 2000 (SPDI Rules 2011), and PSARA 2005 regulating physical security operations, surveillance, and client telemetry.`}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            <div>
              <span className="text-slate-500">{isHi ? "संस्था:" : "Entity:"}</span>{" "}
              <strong className="text-slate-800 dark:text-slate-200">{COMPANY_NAME}</strong>
            </div>
            <div>
              <span className="text-slate-500">{isHi ? "निदेशक:" : "Directors:"}</span>{" "}
              <strong className="text-amber-700 dark:text-amber-400">{isHi ? DIRECTOR_NAMES_HI : DIRECTOR_NAME}</strong>
            </div>
            <div>
              <span className="text-slate-500">{isHi ? "प्रभावी तिथि:" : "Effective Date:"}</span>{" "}
              <strong className="text-slate-800 dark:text-slate-200">January 1, 2026</strong>
            </div>
            <div>
              <span className="text-slate-500">{isHi ? "क्षेत्राधिकार:" : "Jurisdiction:"}</span>{" "}
              <strong className="text-slate-800 dark:text-slate-200">Aurangabad (Bihar), India</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Jump Table of Contents */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#12121A] border border-slate-200 dark:border-[#262636] print:hidden">
        <div className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-500" />
          <span>{isHi ? "त्वरित अनुभाग सूची (Table of Contents)" : "Table of Contents - Quick Navigation"}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
          {sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="p-2 rounded-lg bg-white dark:bg-[#181824] border border-slate-200/80 dark:border-[#262636] hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-all font-medium text-slate-700 dark:text-gray-300 truncate"
            >
              {isHi ? sec.titleHi : sec.titleEn}
            </a>
          ))}
        </div>
      </div>

      {/* Main Privacy Body */}
      <div className="bg-white dark:bg-[#14141E] border border-slate-200 dark:border-[#262636] rounded-3xl p-6 sm:p-10 space-y-10 shadow-xl text-slate-800 dark:text-gray-200 text-sm leading-relaxed">

        {/* Section 1 */}
        <section id="sec-1" className="space-y-4 scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <Scale className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isHi ? "1. वैधानिक प्रस्तावना एवं दायरा (DPDP Act 2023)" : "1. Statutory Framework & Scope (DPDP Act 2023)"}
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-gray-300">
            <p>
              {isHi
                ? `यह गोपनीयता नीति ${COMPANY_NAME} (इसके पश्चात "कंपनी", "एजेंसी", या "हम") द्वारा भारत गणराज्य के डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 (Digital Personal Data Protection Act, 2023), सूचना प्रौद्योगिकी अधिनियम, 2000 (Information Technology Act, 2000), सूचना प्रौद्योगिकी (उचित सुरक्षा अभ्यास और प्रक्रियाएं तथा संवेदनशील व्यक्तिगत डेटा या सूचना) नियम, 2011 (SPDI Rules 2011), तथा प्राइवेट सिक्योरिटी एजेंसीज (रेगुलेशन) एक्ट, 2005 (PSARA 2005) के पूर्ण अनुपालन में प्रकाशित की गई है।`
                : `This Privacy Policy is published and executed by ${COMPANY_NAME} ("Company", "Agency", "We", or "Us") in strict compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act 2023), the Information Technology Act, 2000 (IT Act 2000), the IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (SPDI Rules 2011), and the Private Security Agencies (Regulation) Act, 2005 (PSARA 2005).`}
            </p>
            <p>
              {isHi
                ? `यह नीति हमारे डिजिटल प्लेटफॉर्म, वेबसाइट, व्हाट्सएप डिस्पैच गेटवे, टेलीफोनिक बुकिंग और ऑन-ग्राउंड सुरक्षा डिप्लॉयमेंट के दौरान एकत्रित किए जाने वाले सभी व्यक्तिगत डेटा (Personal Data), संवेदनशील व्यक्तिगत डेटा (SPDI), स्थान निर्देशांक (Geo-Coordinates), और सुरक्षा फुटेज पर समान रूप से लागू होती है।`
                : `This Policy applies uniformly to all Personal Data, Sensitive Personal Data or Information (SPDI), venue coordinates, biometric/KYC records, and operational telemetry collected through our website, telephonic bookings, WhatsApp dispatch portals, and field physical deployment activities.`}
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="sec-2" className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <Database className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isHi ? "2. एकत्रित किए जाने वाले व्यक्तिगत डेटा की श्रेणियां" : "2. Categories of Personal Data Collected"}
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-gray-300">
            <p>
              {isHi
                ? `सुरक्षा सेवाओं के सुरक्षित आवंटन और निष्पादन हेतु कंपनी निम्नलिखित श्रेणियों में डेटा एकत्रित करती है:`
                : `To execute authorized physical security operations with lawful precision, the Company collects specific data categories as detailed below:`}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#181824] border border-slate-200 dark:border-[#262636] space-y-2">
                <div className="font-bold text-amber-600 dark:text-amber-400 text-xs flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" />
                  <span>{isHi ? "ग्राहक पहचान एवं संपर्क डेटा" : "Client Identification & Contact Data"}</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600 dark:text-gray-400">
                  <li>{isHi ? "ग्राहक का पूरा नाम, आधिकारिक संस्था/कंपनी नाम" : "Full Name, Legal Corporate Entity Name"}</li>
                  <li>{isHi ? "सत्यापित मोबाइल नंबर एवं व्हाट्सएप संपर्क" : "Verified Telephone Numbers & WhatsApp Mobile"}</li>
                  <li>{isHi ? "ईमेल पता एवं औपचारिक पत्राचार पता" : "Email Address & Official Billing Address"}</li>
                  <li>{isHi ? "सरकारी पहचान प्रमाण (आधार, पैन, वोटर आईडी - जहां आवश्यक हो)" : "Government ID Proofs (Aadhaar, PAN, GSTIN where statutory)"}</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#181824] border border-slate-200 dark:border-[#262636] space-y-2">
                <div className="font-bold text-amber-600 dark:text-amber-400 text-xs flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{isHi ? "तैनाती स्थल एवं ऑपरेशनल डेटा" : "Deployment Venue & Operational Data"}</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600 dark:text-gray-400">
                  <li>{isHi ? "कार्यक्रम/प्रतिष्ठान का सटीक पता एवं स्थल प्रकार" : "Exact Physical Address, Perimeter Layout & Venue Type"}</li>
                  <li>{isHi ? "सुरक्षा शिफ्ट समय (शुरुआत, समाप्ति, कुल घंटे)" : "Shift Roster Timing, Duty Hours & Rotation Schedules"}</li>
                  <li>{isHi ? "थ्रेट असेसमेंट एवं विशेष सुरक्षा निर्देश" : "Risk Profile, Vulnerability Notes & VIP Protocol Needs"}</li>
                  <li>{isHi ? "ऑन-साइट आपातकालीन संपर्क व्यक्तियों के विवरण" : "Designated On-Site Incident Point of Contact (SPOC)"}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="sec-3" className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isHi ? "3. डेटा प्रोसेसिंग का कानूनी उद्देश्य एवं आधार" : "3. Lawful Purpose & Basis for Processing"}
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-gray-300">
            <p>
              {isHi
                ? `DPDP अधिनियम 2023 की धारा 4 व धारा 7 के तहत, हम केवल वैध व्यावसायिक व कानूनी उद्देश्यों हेतु डेटा संसाधित करते हैं:`
                : `Under Section 4 and Section 7 of the DPDP Act 2023, data processing is conducted strictly on lawful legitimate bases:`}
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>{isHi ? "अनुबंध का निष्पादन (Contract Performance):" : "Execution of Security Contract:"}</strong>{" "}
                {isHi
                  ? "सत्यापित गार्ड्स, गनमैन व बाउंसर्स की उचित तैनाती, ड्यूटी रोस्टर प्रबंधन तथा ऑन-साइट सुरक्षा समन्वय हेतु।"
                  : "Mobilizing certified security personnel, formulating perimeter rosters, and executing protection assignments."}
              </li>
              <li>
                <strong>{isHi ? "सत्यापन एवं कॉल परामर्श (Direct Requirement Call):" : "Direct On-Call Consultation & Quote:"}</strong>{" "}
                {isHi
                  ? "ग्राहक द्वारा दिए गए नंबर पर हमारे सुरक्षा समन्वयक द्वारा प्रत्यक्ष फोन कॉल कर आवश्यकताओं को समझना तथा अनुकूलित कोटेशन प्रदान करना।"
                  : "Direct follow-up phone call to client to evaluate exact manpower needs and provide customized commercial proposals."}
              </li>
              <li>
                <strong>{isHi ? "आपदा एवं आपातकालीन प्रतिक्रिया (Emergency Response):" : "Crisis & Emergency Management:"}</strong>{" "}
                {isHi
                  ? "किसी अप्रिय घटना, आगजनी, चोरी अथवा मेडिकल इमरजेंसी की स्थिति में स्थानीय पुलिस/प्रशासन एवं ग्राहक को तत्काल सूचित करने हेतु।"
                  : "Coordinating with local law enforcement, medical responders, and client executives during critical breach incidents."}
              </li>
              <li>
                <strong>{isHi ? "विधिक एवं वित्तीय अनुपालन (Statutory Record-Keeping):" : "Statutory Billing & GST Compliance:"}</strong>{" "}
                {isHi
                  ? "आयकर अधिनियम, जीएसटी नियमों एवं PSARA रजिस्टर के अंतर्गत अनिवार्य बिलिंग एवं सेवा रिकॉर्ड संधारित करना।"
                  : "Fulfilling mandatory audit trails under the GST Act, Income Tax laws, and PSARA Section 15 register mandates."}
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section id="sec-4" className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <FileCheck2 className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isHi ? "4. सुरक्षा गार्ड्स एवं गनमैन का सत्यापन डेटा (PSARA)" : "4. Guard & Armed Operative Verification Records"}
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-gray-300">
            <p>
              {isHi
                ? `${COMPANY_NAME} अपने सभी तैनात सुरक्षा गार्ड्स, सशस्त्र गनमैन (Armed Guards), और बाउंसरों का कठोर वैधानिक रिकॉर्ड संधारित करती है:`
                : `${COMPANY_NAME} maintains strict regulatory dossiers for all deployed personnel under PSARA 2005 guidelines:`}
            </p>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-xs">
              <div className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>{isHi ? "सत्यापन एवं सुरक्षा सुरक्षा मानक" : "Mandatory Verification Benchmarks"}</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-gray-300">
                <li>{isHi ? "पुलिस चरित्र सत्यापन (Police Clearance Certificate - PCC) अनिवार्य।" : "Mandatory Police Character Clearance (PCC) before any active deployment."}</li>
                <li>{isHi ? "सशस्त्र गनमैन के पास वैध भारतीय शस्त्र लाइसेंस (Arms Act 1959) होना अनिवार्य।" : "Statutory Arms License verification under the Arms Act, 1959 for all armed personnel."}</li>
                <li>{isHi ? "पूर्व सैनिक (Ex-Army) कर्मियों का डिस्चार्ज बुक व सैन्य सेवा रिकॉर्ड प्रमाणित।" : "Ex-Servicemen discharge book certification and verified armed forces service credentials."}</li>
                <li>{isHi ? "बायोमेट्रिक आधार प्रमाणीकरण एवं स्थायी आवासीय पता सत्यापन।" : "Aadhaar e-KYC biometric identity proof and permanent domicile verification."}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="sec-5" className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <Camera className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isHi ? "5. सीसीटीवी निगरानी एवं बॉडी-कैम फुटेज नीति" : "5. CCTV Surveillance & Body-Cam Footage"}
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-gray-300">
            <p>
              {isHi
                ? `सुरक्षा निगरानी, अपराध निवारण और विवाद समाधान के लिए सीसीटीवी कैमरों और बॉडी-वॉर्न कैमरों (Body-Cams) का उपयोग किया जा सकता है:`
                : `For perimeter deterrence, asset protection, and evidential integrity, optical surveillance may be deployed:`}
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>
                <strong>{isHi ? "फुटेज का स्वामित्व:" : "Footage Ownership:"}</strong>{" "}
                {isHi
                  ? "क्लाइंट के निजी परिसर में रिकॉर्ड किया गया सीसीटीवी फुटेज क्लाइंट की संपत्ति है। कंपनी के बॉडी-कैम की फुटेज सुरक्षा ऑडिट एवं विवाद निवारण तक सीमित है।"
                  : "Client venue CCTV belongs to the client. Company-operated body-cam recordings are maintained solely for tactical audits and incident forensics."}
              </li>
              <li>
                <strong>{isHi ? "प्रतिधारण अवधि (Retention Window):" : "Retention Window:"}</strong>{" "}
                {isHi
                  ? "नियमित फुटेज सामान्यतः 30 दिनों के भीतर स्वतः मिटा (Auto-Purge) दी जाती है, जब तक कि किसी पुलिस जांच या न्यायिक मामले में संरक्षण आदेश न हो।"
                  : "Routine surveillance video is auto-purged within 30 to 90 days, unless preserved pursuant to a judicial subpoena or active police FIR investigation."}
              </li>
              <li>
                <strong>{isHi ? "सख्त गोपनीयता:" : "Prohibition of Unauthorized Sharing:"}</strong>{" "}
                {isHi
                  ? "किसी भी निजी परिसर की वीडियो रिकॉर्डिंग या फोटो सोशल मीडिया या अनधिकृत तृतीय-पक्ष पर साझा करना कंपनी के आचार संहिता के तहत आपराधिक अपराध माना जाता है।"
                  : "Dissemination of venue photos or footage on social media or unauthorized third parties is strictly prohibited and subject to criminal liability."}
              </li>
            </ul>
          </div>
        </section>

        {/* Section 6 */}
        <section id="sec-6" className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <Radio className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isHi ? "6. जीपीएस ट्रैकिंग एवं पेट्रोलिंग टेलीमेट्री डेटा" : "6. GPS Tracking & Patrol Telemetry Data"}
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-gray-300">
            <p>
              {isHi
                ? `मोबाइल पेट्रोलिंग वैन और वीआईपी एस्कॉर्ट्स के दौरान जीपीएस टेलीमेट्री का उपयोग किया जाता है:`
                : `Mobile patrol vehicles, quick-reaction teams (QRT), and VIP escorts utilize real-time satellite telemetry:`}
            </p>
            <p>
              {isHi
                ? `जीपीएस डेटा केवल गश्त की सत्यता, त्वरित रिस्पांस समय और क्लाइंट सुरक्षा सुनिश्चित करने के लिए उपयोग किया जाता है। असाइनमेंट समाप्ति के 30 दिनों के पश्चात टेलीमेट्री हिस्ट्री को सुरक्षित रूप से नष्ट कर दिया जाता है।`
                : `Telemetry data is utilized exclusively to audit checkpoint coverage, route compliance, and emergency transit speeds. Telemetry logs are purged 30 days following mission completion.`}
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="sec-7" className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <UserX className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isHi ? "7. शून्य डेटा बिक्री एवं सख्त गैर-प्रकटीकरण नीति" : "7. Zero Commercial Sale / Non-Disclosure"}
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-gray-300">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500 mt-0.5" />
              <span>
                {isHi
                  ? "हमारा स्पष्ट विधिक वचन: हम किसी भी परिस्थिति में अपने ग्राहकों का व्यक्तिगत डेटा, फोन नंबर, या वेन्यू विवरण किसी विज्ञापनदाता, टेलीमार्केटर, या तृतीय पक्ष को न तो बेचते हैं, न किराए पर देते हैं, और न ही व्यावसायिक लाभ हेतु साझा करते हैं।"
                  : "Absolute Statutory Pledge: We do NOT sell, lease, rent, trade, or commercially monetize client names, telephone numbers, venues, or security details to advertisers or brokers under any circumstance."}
              </span>
            </div>
            <p>
              {isHi
                ? `सभी क्लाइंट विवरण कंपनी के आंतरिक सुरक्षित डेटाबेस में एन्क्रिप्टेड रूप में सुरक्षित रखे जाते हैं और केवल अधिकृत ड्यूटी कोऑर्डिनेटरों द्वारा ही एक्सेस किए जा सकते हैं।`
                : `All customer information is stored in encrypted relational silos accessible solely by cleared duty coordinators and executive command dispatchers.`}
            </p>
          </div>
        </section>

        {/* Section 8 */}
        <section id="sec-8" className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isHi ? "8. पुलिस एवं कानून प्रवर्तन एजेंसियों को प्रकटीकरण" : "8. Disclosure to Police & Law Enforcement"}
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-gray-300">
            <p>
              {isHi
                ? `कंपनी निम्नलिखित वैधानिक परिस्थितियों में विधि सम्मत प्राधिकारियों को आवश्यक सूचनाएं प्रस्तुत करने हेतु बाध्य हो सकती है:`
                : `The Company may share requisite records with sovereign authorities only under stringent judicial and statutory mandates:`}
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>
                <strong>{isHi ? "न्यायिक आदेश / समन (Judicial Warrant):" : "Subpoena & Judicial Warrants:"}</strong>{" "}
                {isHi
                  ? "सक्षम न्यायालय अथवा सत्र न्यायालय द्वारा जारी आदेश के अनुपालन में।"
                  : "In direct compliance with court orders or valid magisterial directions."}
              </li>
              <li>
                <strong>{isHi ? "पुलिस अन्वेषण (Police Investigations):" : "Statutory Criminal Inquiries:"}</strong>{" "}
                {isHi
                  ? "भारतीय नागरिक सुरक्षा संहिता (BNSS) / CrPC की धारा 91 के तहत पुलिस उपाधीक्षक या थाना प्रभारी द्वारा अधिकृत आपराधिक अन्वेषण हेतु।"
                  : "Valid requisitions under BNSS / CrPC issued by gazetted police officers investigating cognizable offences."}
              </li>
              <li>
                <strong>{isHi ? "PSARA नियंत्रक प्राधिकारी (Controlling Authority):" : "PSARA Regulatory Audits:"}</strong>{" "}
                {isHi
                  ? "बिहार गृह विभाग अथवा PSARA सक्षम प्राधिकारी द्वारा अनिवार्य वार्षिक लाइसेंस ऑडिट के समय ड्यूटी रजिस्टर निरीक्षण।"
                  : "Mandatory register inspections by the Bihar Home Department PSARA Controlling Authority."}
              </li>
            </ul>
          </div>
        </section>

        {/* Section 9 */}
        <section id="sec-9" className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <Server className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isHi ? "9. तकनीकी सुरक्षा एवं 256-बिट एन्क्रिप्शन मानक" : "9. Technical Security & Encryption Standards"}
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-gray-300">
            <p>
              {isHi
                ? `IT एक्ट 2000 के SPDI नियमों के तहत, ${COMPANY_NAME} वाणिज्यिक स्तर के तकनीकी और संगठनात्मक सुरक्षा उपाय लागू करती है:`
                : `In conformance with Section 43A of the IT Act 2000, ${COMPANY_NAME} maintains enterprise-grade security protocols:`}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181824] border border-slate-200 dark:border-[#262636] space-y-1">
                <span className="text-amber-500 font-mono font-bold text-xs">TLS 1.3 / SSL</span>
                <p className="text-[11px] text-slate-500 dark:text-gray-400">
                  {isHi ? "वेबसाइट एवं सर्वर डेटा संचरण पूर्णतः 256-बिट एन्क्रिप्टेड है।" : "256-bit cryptographic transit encryption across all digital conduits."}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181824] border border-slate-200 dark:border-[#262636] space-y-1">
                <span className="text-emerald-500 font-mono font-bold text-xs">RBAC ACCESS</span>
                <p className="text-[11px] text-slate-500 dark:text-gray-400">
                  {isHi ? "भूमिका आधारित एक्सेस कंट्रोल; केवल अधिकृत निदेशकों को पूर्ण पहुंच।" : "Role-based authentication restricted to designated dispatch officers."}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181824] border border-slate-200 dark:border-[#262636] space-y-1">
                <span className="text-amber-500 font-mono font-bold text-xs">AUDIT TRAILS</span>
                <p className="text-[11px] text-slate-500 dark:text-gray-400">
                  {isHi ? "डेटा एक्सेस और पूछताछ के अपरिवर्तनीय ऑडिट लॉग्स सुरक्षित।" : "Immutable audit tracking for booking queries and client data updates."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10 */}
        <section id="sec-10" className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <FileLock2 className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isHi ? "10. डेटा प्रतिधारण एवं स्वतः निष्कासन समय-सीमा" : "10. Data Retention & Auto-Purge Timelines"}
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-gray-300">
            <p>
              {isHi
                ? `कंपनी आवश्यकता से अधिक समय तक डेटा संग्रहित नहीं करती:`
                : `We retain records only for durations strictly necessitated by operational efficacy and legal mandates:`}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 dark:border-[#262636] rounded-xl overflow-hidden">
                <thead className="bg-slate-100 dark:bg-[#181824] font-bold text-slate-900 dark:text-white">
                  <tr>
                    <th className="p-3 border-b border-slate-200 dark:border-[#262636]">{isHi ? "डेटा प्रकार" : "Data Category"}</th>
                    <th className="p-3 border-b border-slate-200 dark:border-[#262636]">{isHi ? "प्रतिधारण अवधि" : "Retention Window"}</th>
                    <th className="p-3 border-b border-slate-200 dark:border-[#262636]">{isHi ? "निष्कासन विधि" : "Purge Protocol"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-[#262636] text-slate-600 dark:text-gray-300">
                  <tr>
                    <td className="p-3 font-semibold">{isHi ? "वेबसाइट पूछताछ एवं प्रारंभिक कॉल लॉग" : "Inquiry Forms & Telephonic Call Logs"}</td>
                    <td className="p-3">{isHi ? "90 दिन (यदि बुकिंग नहीं हुई)" : "90 Days (if unconfirmed)"}</td>
                    <td className="p-3">{isHi ? "डिजिटल डेटाबेस से सुरक्षित निष्कासन" : "Secure database record purge"}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">{isHi ? "सीसीटीवी एवं बॉडी-कैम फुटेज" : "Surveillance CCTV / Body-Cam Media"}</td>
                    <td className="p-3">{isHi ? "30 से 90 दिन (गैर-विवादित)" : "30-90 Days (routine ops)"}</td>
                    <td className="p-3">{isHi ? "स्वचालित स्टोरेज ओवरराइट (FIFO)" : "Automated FIFO overwrite"}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">{isHi ? "जीपीएस गश्त ट्रैकिंग टेलीमेट्री" : "GPS Patrol Telemetry"}</td>
                    <td className="p-3">{isHi ? "30 दिन" : "30 Days post mission"}</td>
                    <td className="p-3">{isHi ? "सर्वर से स्थायी रूप से डिलीट" : "Permanent server telemetry erasure"}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">{isHi ? "टैक्स इनवॉइस एवं PSARA सेवा रजिस्टर" : "Tax Invoices & PSARA Service Registers"}</td>
                    <td className="p-3">{isHi ? "8 वर्ष (कानूनी आवश्यकता)" : "8 Years (Statutory Audit)"}</td>
                    <td className="p-3">{isHi ? "एन्क्रिप्टेड कोल्ड आर्काइव" : "Encrypted cold storage archive"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 11 */}
        <section id="sec-11" className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isHi ? "11. डेटा स्वामी (नागरिक) के विधिक अधिकार" : "11. Data Principal Statutory Rights"}
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-gray-300">
            <p>
              {isHi
                ? `डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 के तहत ग्राहकों (डेटा प्रिंसिपल्स) को निम्नलिखित अधिकार प्राप्त हैं:`
                : `Under Chapter III of the DPDP Act 2023, every Data Principal possesses inalienable statutory rights:`}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181824] border border-slate-200 dark:border-[#262636]">
                <strong className="text-slate-900 dark:text-white block mb-1">
                  {isHi ? "1. समीक्षा का अधिकार (Right to Summary/Access):" : "1. Right to Access & Summary:"}
                </strong>
                <span>
                  {isHi
                    ? "हमारे पास संग्रहित अपने व्यक्तिगत विवरण एवं सेवा इतिहास का सारांश देखने का अधिकार।"
                    : "Obtain a concise summary of personal data held and processed by the Company."}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181824] border border-slate-200 dark:border-[#262636]">
                <strong className="text-slate-900 dark:text-white block mb-1">
                  {isHi ? "2. सुधार एवं अद्यतन (Right to Correction):" : "2. Right to Rectification & Update:"}
                </strong>
                <span>
                  {isHi
                    ? "गलत या पुराने संपर्क नंबर, पते अथवा विवरण में तत्काल सुधार कराने का अधिकार।"
                    : "Request immediate correction of inaccurate or outdated contact and venue credentials."}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181824] border border-slate-200 dark:border-[#262636]">
                <strong className="text-slate-900 dark:text-white block mb-1">
                  {isHi ? "3. विलोपन का अधिकार (Right to Erasure):" : "3. Right to Erasure / Deletion:"}
                </strong>
                <span>
                  {isHi
                    ? "सुरक्षा सेवा पूर्ण होने पर अपने डेटा को स्थायी रूप से मिटाने का अनुरोध करने का अधिकार (वैधानिक टैक्स रिकॉर्ड्स को छोड़कर)।"
                    : "Request deletion of non-statutory personal identifiers once purpose is fulfilled."}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181824] border border-slate-200 dark:border-[#262636]">
                <strong className="text-slate-900 dark:text-white block mb-1">
                  {isHi ? "4. शिकायत निवारण का अधिकार (Right to Redressal):" : "4. Right to Grievance Redressal:"}
                </strong>
                <span>
                  {isHi
                    ? "डेटा सुरक्षा संबंधी किसी भी आपत्ति हेतु कंपनी के शिकायत अधिकारी अथवा डेटा संरक्षण बोर्ड (DPB) में आवेदन।"
                    : "Register grievances with our Grievance Officer or escalate to the Data Protection Board of India."}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 12 */}
        <section id="sec-12" className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <Eye className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isHi ? "12. नाबालिगों एवं संवेदनशील परिसरों का संरक्षण" : "12. Protection of Minors & Sensitive Venues"}
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-gray-300">
            <p>
              {isHi
                ? `DPDP अधिनियम 2023 की धारा 9 के अनुपालन में, हम किसी भी 18 वर्ष से कम उम्र के नाबालिग का डेटा बिना अभिभावक की स्पष्ट सहमति के प्रोसेस नहीं करते।`
                : `In accordance with Section 9 of the DPDP Act 2023, we do not knowingly process personal data of children under 18 years without verified parental or legal guardian consent.`}
            </p>
            <p>
              {isHi
                ? `स्कूलों, अस्पतालों एवं संवेदनशील संस्थानों में सुरक्षा तैनाती के दौरान गार्ड्स को बाल संरक्षण (POCSO) व निजता आचार संहिता का कड़ाई से पालन करने का निर्देश रहता है।`
                : `During deployments at educational premises or healthcare centers, deployed guards are strictly briefed to uphold child welfare protections (POCSO safeguards) and respect heightened privacy boundaries.`}
            </p>
          </div>
        </section>

        {/* Section 13 */}
        <section id="sec-13" className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <Lock className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isHi ? "13. कुकीज़ एवं डिजिटल वेब एनालिटिक्स" : "13. Cookies & Automated Digital Analytics"}
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-gray-300">
            <p>
              {isHi
                ? `हमारी वेबसाइट केवल आवश्यक सेशन कुकीज का उपयोग करती है जो ब्राउज़िंग अनुभव, भाषा चयन (हिंदी/अंग्रेजी), और सुरक्षा फॉर्म को सुचारू रूप से चलाने के लिए आवश्यक हैं। हम क्रॉस-साइट ट्रैकिंग या अवांछित तृतीय-पक्ष कुकीज़ का उपयोग नहीं करते हैं।`
                : `Our digital portal deploys strictly essential session cookies necessary for interface performance, bilingual preference toggles, and secure inquiry submissions. We do not engage in invasive cross-site advertising trackers.`}
            </p>
          </div>
        </section>

        {/* Section 14 */}
        <section id="sec-14" className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <PhoneCall className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isHi ? "14. शिकायत निवारण तंत्र एवं अधिकारी" : "14. Grievance Redressal & Grievance Officer"}
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-gray-300">
            <p>
              {isHi
                ? `DPDP अधिनियम 2023 एवं IT नियम 2011 के तहत किसी भी गोपनीयता संबंधी प्रश्न, डेटा सुधार अथवा शिकायत के लिए हमारे विधिक शिकायत अधिकारी से संपर्क करें:`
                : `In accordance with Section 8(10) of the DPDP Act 2023 and Rule 5(9) of the SPDI Rules 2011, designated Grievance Redressal contacts are designated as under:`}
            </p>
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#181824] border border-slate-200 dark:border-[#262636] space-y-3">
              <div className="font-extrabold text-amber-600 dark:text-amber-400 text-xs sm:text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>{isHi ? "नामित शिकायत निवारण अधिकारी (Grievance Officer)" : "Designated Grievance Redressal Officer"}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-gray-400 block">{isHi ? "अधिकारी नाम:" : "Officer:"}</span>
                  <strong className="text-slate-900 dark:text-white font-semibold">Bhupendra Kumar Singh / Legal Cell</strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-gray-400 block">{isHi ? "ईमेल संपर्क:" : "Official Email:"}</span>
                  <a href={`mailto:${COMPANY_EMAIL}`} className="font-bold text-amber-600 dark:text-amber-400 hover:underline">
                    {COMPANY_EMAIL}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-gray-400 block">{isHi ? "हेल्पलाइन / टेलीफोन:" : "Helpline / Phone:"}</span>
                  <a href="tel:9465857462" className="font-mono font-bold text-slate-900 dark:text-white hover:underline">
                    +91 94658 57462 / +91 97302 18260
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-gray-400 block">{isHi ? "निवारण समय सीमा:" : "Resolution Window:"}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {isHi ? "प्राप्ति के 7 कार्यदिवसों के भीतर" : "Within 7 business working days"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 15 */}
        <section id="sec-15" className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#262636] scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-[#262636]">
            <FileText className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isHi ? "15. नीति संशोधन एवं विधिक सूचनाएं" : "15. Amendments & Regulatory Notifications"}
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-gray-300">
            <p>
              {isHi
                ? `कंपनी अपने कानूनी सलाहकारों तथा गृह मंत्रालय के नवीन दिशानिर्देशों के अनुसार समय-समय पर इस गोपनीयता नीति को अद्यतन करने का अधिकार सुरक्षित रखती है। नीति में कोई भी संशोधन इस पृष्ठ पर प्रभावी तिथि के साथ प्रकाशित किया जाएगा।`
                : `The Company reserves the right to periodically review and update this charter in harmony with directives issued by the Ministry of Home Affairs, state PSARA revisions, or notifications by the Data Protection Board. Revised revisions will be immediately published on this URL with an updated effective date.`}
            </p>
          </div>
        </section>

        {/* Section 16: Executive Sign-off & Company Registry */}
        <section id="sec-16" className="space-y-6 pt-6 border-t-2 border-amber-500/30 scroll-mt-24">
          <div className="flex items-center gap-2.5 pb-2">
            <Building2 className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isHi ? "16. पंजीकृत कंपनी ब्योरा एवं अधिकृत हस्ताक्षर" : "16. Statutory Registry & Executive Seal"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Headquarters details */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-[#181824] border border-slate-200 dark:border-[#262636] text-xs">
              <div className="font-extrabold text-amber-500 uppercase tracking-wider text-xs flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>{isHi ? "पंजीकृत कार्यालय एवं नियंत्रण कक्ष" : "Registered Office & Command Cell"}</span>
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
                  ? "सभी कानूनी व गोपनीयता पत्राचार हेतु उपरोक्त पंजीकृत डाक पते पर लिखित सूचना प्रेषित करें।"
                  : "All formal statutory privacy requests should be remitted to the registered postal address above."}
              </div>
            </div>

            {/* Leadership & Seal Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/40 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                    {isHi ? "अधिकृत एजेंसी हस्ताक्षर एवं मुहर" : "Authorized Agency Sign-off"}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                    VERIFIED 2026
                  </span>
                </div>

                <div className="text-base font-black text-slate-900 dark:text-white">
                  {COMPANY_NAME}
                </div>
                
                {/* Dual Directors Breakdown */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-xs text-slate-700 dark:text-gray-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    <span>
                      <strong className="text-slate-900 dark:text-white">
                        {isHi ? "भूपेंद्र कुमार सिंह" : "Bhupendra Kumar Singh"}
                      </strong>{" "}
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                        [{isHi ? "पूर्व सैनिक (Ex-Army) - प्रबंध निदेशक" : "Ex-Indian Army Veteran - MD"}]
                      </span>
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-gray-300 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-amber-500" />
                    <span>
                      <strong className="text-slate-900 dark:text-white">
                        {isHi ? "मंजीत सिंह" : "Manjeet Singh"}
                      </strong>{" "}
                      <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                        [{isHi ? "निदेशक - ऑपरेशन्स एवं फील्ड डिप्लॉयमेंट" : "Director - Operations & Deployment"}]
                      </span>
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-gray-400 font-mono pt-1">
                  {isHi ? "स्थापना वर्ष:" : "Estd Year:"} {COMPANY_ESTD} • Aurangabad (Bihar) - 824101
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-500/30 text-center space-y-1 shadow-sm">
                <div className="text-[10px] uppercase font-mono font-bold text-amber-600 dark:text-amber-400">
                  {isHi ? "डेटा सुरक्षा एवं PSARA अनुपालन मुहर" : "Statutory Data Integrity Seal"}
                </div>
                <div className="text-[11px] font-bold text-slate-800 dark:text-gray-200">
                  DPDP Act, 2023 • IT Act, 2000 • PSARA, 2005
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isHi ? "पूर्णतः प्रमाणित एवं वैधानिक रूप से संरक्षित" : "Officially Registered & Compliant"}</span>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* Footer Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-gray-400 pt-4 print:hidden">
        <div>
          © {new Date().getFullYear()} {COMPANY_NAME}. All Legal Rights Reserved.
        </div>
        <div className="flex items-center gap-4">
          <Link href="/terms" className="hover:text-amber-500 transition-colors font-medium">
            {isHi ? "सेवा की शर्तें (Terms of Service)" : "Terms of Service"}
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
