"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GuardsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/book");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0F] text-slate-900 dark:text-[#E5E5E5] flex items-center justify-center p-6">
      <div className="text-center space-y-2">
        <p className="text-sm font-semibold text-amber-500">Redirecting to Guard Booking...</p>
      </div>
    </div>
  );
}
