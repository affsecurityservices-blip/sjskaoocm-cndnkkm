"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("hi");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("aaf_security_lang");
      if (savedLang && (savedLang === "en" || savedLang === "hi")) {
        setLanguage(savedLang);
      }
    } catch (e) {
      console.error("Language Context localStorage error:", e);
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "en" ? "hi" : "en";
      try {
        localStorage.setItem("aaf_security_lang", next);
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const t = (path) => {
    const keys = path.split(".");
    let current = translations[language] || translations.en;
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        // Fallback to English if key missing
        let fallback = translations.en;
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
