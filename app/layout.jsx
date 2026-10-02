import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { BookingProvider } from "../context/BookingContext";
import { LanguageProvider } from "../context/LanguageContext";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export const metadata = {
  title: "AAF Security Services | Bouncers, Bodyguards, Armed Security & 24/7 Protection | Aurangabad (Bihar)",
  description: "AAF Security Services (Estd 2026) - Trusted Security. Complete Protection. Services: Manned Guarding, CCTV Surveillance, Mobile Patrolling, Event Security, Risk Management, Armed Security, Bouncers & Bodyguards. Director: Bhupendra Kumar (Sonu Singh). Head Office: Aurangabad (Bihar).",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col justify-between selection:bg-amber-500 selection:text-black">
        <ThemeProvider>
          <LanguageProvider>
            <BookingProvider>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </BookingProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
