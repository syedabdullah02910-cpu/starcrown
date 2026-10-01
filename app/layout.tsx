import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>",
  },
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
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen">
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  );
}
