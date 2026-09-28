import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Star Crown Tour – Premium Travel Experiences",
  description:
    "Discover extraordinary destinations with Star Crown Tour. Premium VIP Umrah packages, worldwide air ticketing, curated tourism packages, and comprehensive travel insurance.",
  keywords: "luxury travel, tours, honeymoon, corporate travel, adventure, Star Crown",
  openGraph: {
    title: "Star Crown Tour",
    description: "Your gateway to extraordinary luxury travel experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-dark text-white font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
