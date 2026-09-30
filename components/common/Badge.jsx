import React from "react";

export default function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-[#262636] text-gray-300 border border-gray-700",
    amber: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
    bouncer: "bg-red-500/10 text-red-400 border border-red-500/30",
    bodyguard: "bg-amber-500/15 text-amber-300 border border-amber-500/40 font-semibold",
    security: "bg-blue-500/10 text-blue-400 border border-blue-500/30",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
    danger: "bg-rose-500/10 text-rose-400 border border-rose-500/30"
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs tracking-wide ${
        variants[variant] || variants.default
      } ${className}`}
    >
      {children}
    </span>
  );
}
