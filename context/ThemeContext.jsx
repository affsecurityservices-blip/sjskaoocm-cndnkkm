"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedTheme = localStorage.getItem("aegis_theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("aegis_theme", theme);
      const root = document.documentElement;
      const body = document.body;

      if (theme === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
        if (body) {
          body.classList.add("dark");
          body.classList.remove("light");
        }
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
        if (body) {
          body.classList.remove("dark");
          body.classList.add("light");
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
