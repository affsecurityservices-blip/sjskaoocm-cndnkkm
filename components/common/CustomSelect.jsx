"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function CustomSelect({
  options = [],
  value,
  onChange,
  placeholder = "Select Option",
  icon: Icon,
  className = "",
  triggerClassName = "",
  menuClassName = "",
  size = "md"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isGrouped = options.length > 0 && typeof options[0] === "object" && options[0].items;

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  // Find label for trigger display
  let selectedOption = null;
  if (isGrouped) {
    for (const group of options) {
      const match = group.items.find((item) =>
        typeof item === "object" ? item.value === value : item === value
      );
      if (match) {
        selectedOption = match;
        break;
      }
    }
  } else {
    selectedOption = options.find((opt) =>
      typeof opt === "object" ? opt.value === value : opt === value
    );
  }

  const displayLabel = selectedOption
    ? typeof selectedOption === "object"
      ? selectedOption.label
      : selectedOption
    : value || placeholder;

  const isLarge = size === "lg";

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-slate-50 dark:bg-[#0A0A0F] border-2 ${
          isOpen
            ? "border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
            : "border-slate-300 dark:border-[#38384E] hover:border-amber-500"
        } rounded-xl ${
          isLarge ? "px-4 py-3.5 text-base font-bold" : "px-3.5 py-2.5 text-xs sm:text-sm font-semibold"
        } text-slate-900 dark:text-white flex items-center justify-between transition-all duration-200 cursor-pointer focus:outline-none shadow-sm ${triggerClassName}`}
      >
        <div className="flex items-center gap-2.5 truncate pr-2">
          {Icon && <Icon className={`${isLarge ? "w-4 h-4" : "w-3.5 h-3.5"} text-amber-500 shrink-0`} />}
          <span className="truncate text-left font-bold text-slate-900 dark:text-white">
            {displayLabel}
          </span>
        </div>
        <ChevronDown
          className={`${isLarge ? "w-5 h-5" : "w-4 h-4"} text-slate-600 dark:text-gray-300 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-amber-500" : ""
          }`}
        />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className={`absolute left-0 w-full min-w-full max-h-72 overflow-y-auto top-full mt-2 bg-white dark:bg-[#16161F] border-2 border-slate-300 dark:border-[#262636] rounded-2xl shadow-2xl z-[100] p-2 space-y-1 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${menuClassName}`}>
          
          {isGrouped ? (
            /* Grouped Options Rendering */
            options.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1">
                <div className="px-3.5 py-1.5 text-[11px] uppercase tracking-wider font-black text-amber-600 dark:text-amber-500 bg-slate-100 dark:bg-[#0A0A0F] rounded-lg my-1 sticky top-0 backdrop-blur-md">
                  {group.groupName || group.state}
                </div>
                {group.items.map((item, itemIdx) => {
                  const itemVal = typeof item === "object" ? item.value : item;
                  const itemLabel = typeof item === "object" ? item.label : item;
                  const isSelected = value === itemVal;

                  return (
                    <button
                      key={itemIdx}
                      type="button"
                      onClick={() => handleSelect(itemVal)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-amber-500 text-black shadow-sm font-black"
                          : "text-slate-900 dark:text-gray-100 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400"
                      }`}
                    >
                      <span className="whitespace-normal break-words leading-snug">{itemLabel}</span>
                      {isSelected && <Check className="w-4 h-4 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            ))
          ) : (
            /* Flat Options Rendering */
            options.map((option, idx) => {
              const optVal = typeof option === "object" ? option.value : option;
              const optLabel = typeof option === "object" ? option.label : option;
              const isSelected = value === optVal;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(optVal)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-amber-500 text-black shadow-sm font-black"
                      : "text-slate-900 dark:text-gray-100 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400"
                  }`}
                >
                  <span className="whitespace-normal break-words leading-snug">{optLabel}</span>
                  {isSelected && <Check className="w-4 h-4 shrink-0" />}
                </button>
              );
            })
          )}

        </div>
      )}

    </div>
  );
}
