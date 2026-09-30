import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { BookingProvider } from "../context/BookingContext";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export const metadata = {
  title: "AegisGuard | Tactical Security & Personal Bodyguard Booking",
  description: "Book verified bouncers, personal bodyguards, and tactical security guards on-demand across major Indian cities & districts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col justify-between selection:bg-amber-500 selection:text-black">
        <ThemeProvider>
          <BookingProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </BookingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
