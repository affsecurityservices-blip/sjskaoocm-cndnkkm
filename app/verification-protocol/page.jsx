"use client";

import Link from "next/link";
import { Shield, ShieldCheck, CheckCircle2, ArrowLeft, Award, Lock, FileCheck, UserCheck, Activity, MapPin } from "lucide-react";

export default function VerificationProtocolPage() {
  const steps = [
    {
      num: "01",
      title: "Police Clearance Certificate (PCC) & Background Check",
      desc: "Every applicant undergoes rigorous criminal background verification through local police stations and district crime record bureaus before joining the AegisGuard roster.",
      icon: FileCheck,
      status: "Mandatory 100% Pass"
    },
    {
      num: "02",
      title: "Physical Fitness & Tactical Endurance Assessment",
      desc: "Operatives undergo physical fitness evaluations: minimum height standards (5'10\"+ for guards, 6'0\"+ for bouncers), strength endurance, and sprint agility drills.",
      icon: Activity,
      status: "Quarterly Certified"
    },
    {
      num: "03",
      title: "Unarmed & Armed Combat Certification",
      desc: "Comprehensive training in non-lethal de-escalation, VIP defensive positioning, unarmed martial arts containment, and licensed firearms safety.",
      icon: ShieldCheck,
      status: "Advanced Qualified"
    },
    {
      num: "04",
      title: "Psychological Evaluation & Crisis Temperament",
      desc: "Psychometric screening ensures operatives maintain calm judgment, extreme discipline, and composure during high-tension venue conflicts or emergency evacuation situations.",
      icon: UserCheck,
      status: "Psychologically Vetted"
    },
    {
      num: "05",
      title: "Comprehensive Drug & Medical Screening",
      desc: "Strict zero-tolerance policy. Mandatory 10-panel substance screening and medical physicals conducted bi-annually.",
      icon: CheckCircle2,
      status: "Zero-Tolerance Verified"
    },
    {
      num: "06",
      title: "VIP Escort & Crowd Control Specialization",
      desc: "Advanced tactical training for celebrity escorting, nightclub perimeter security, high-net-worth individual (HNWI) travel protection, and wedding convoy escorts.",
      icon: Award,
      status: "Specialized Training"
    },
    {
      num: "07",
      title: "Live GPS Tracking & 24/7 Command Dispatch",
      desc: "Active duty personnel are equipped with live GPS location beacons, linked directly to our central emergency response headquarters for instant back-up dispatch.",
      icon: MapPin,
      status: "Live Monitored"
    }
  ];

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
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">7-Step Operative Verification Protocol</h1>
            <p className="text-xs text-slate-500 dark:text-gray-400">Strict Personnel Vetting & Quality Assurance Standard | AegisGuard Operatives</p>
          </div>
        </div>
      </div>

      {/* Protocol Banner */}
      <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
            <Shield className="w-3.5 h-3.5 text-amber-500" />
            <span>Zero Compromise Security Guarantee</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Only Top 5% Candidates Clear Our Vetting Process</h2>
          <p className="text-xs text-slate-600 dark:text-gray-400 max-w-xl">
            Every bouncer, bodyguard, and security guard available on AegisGuard has passed all 7 stringent verification stages.
          </p>
        </div>
        <div className="shrink-0 text-center bg-slate-50 dark:bg-[#0A0A0F] p-4 rounded-xl border border-slate-200 dark:border-[#262636]">
          <div className="text-2xl font-extrabold text-amber-500 font-mono">100%</div>
          <div className="text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-widest font-semibold">Background Verified</div>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((step) => {
          const IconComp = step.icon;
          return (
            <div
              key={step.num}
              className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] hover:border-amber-500/40 rounded-2xl p-5 sm:p-6 transition-all shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center justify-center font-bold font-mono shrink-0">
                  {step.num}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed max-w-xl">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="shrink-0 sm:self-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {step.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
