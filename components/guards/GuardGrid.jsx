import GuardCard from "./GuardCard";
import { ShieldAlert } from "lucide-react";

export default function GuardGrid({ guards = [] }) {
  if (!guards || guards.length === 0) {
    return (
      <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] rounded-2xl p-12 text-center max-w-lg mx-auto my-8 space-y-4 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Security Guards Found</h3>
        <p className="text-sm text-slate-600 dark:text-gray-400">
          No active personnel match your exact filter criteria. Try adjusting the state, city, guard type, or max price parameter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {guards.map((guard) => (
        <GuardCard key={guard.id} guard={guard} />
      ))}
    </div>
  );
}
