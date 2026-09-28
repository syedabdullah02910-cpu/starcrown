'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle, FaTimesCircle, FaStar, FaArrowLeft, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

const servicesData = [
  {
    id: 1,
    name: "Air Ticketing Worldwide",
    category: "Air Tickets",
    price: "From PKR 8,000",
    rating: 4.8,
    reviews: 420,
    description: "We provide worldwide air ticketing services for all major airlines. Whether it's domestic or international travel, we get you the best fares.",
    image: "/api/placeholder/800/400",
    itinerary: [
      "Consultation for travel dates and routes",
      "Searching major airlines for best fares",
      "Comparing flexible and fixed rate options",
      "Securing preliminary booking",
      "Final ticket issuance upon payment"
    ],
    includes: [
      "Competitive pricing for all routes",
      "24/7 customer support",
      "Visa assistance options",
      "Airport transfers (optional addon)",
      "Baggage limit guidance"
    ],
    excludes: [
      "Hotel accommodation",
      "Meals (unless included by airline)"
    ],
    subPackages: []
  },
  {
    id: 2,
    name: "Umrah Packages",
    category: "Umrah",
    price: "From PKR 150,000",
    rating: 4.9,
    reviews: 890,
    description: "Choose from our three tier Umrah packages: Normal (economy), VIP (comfort), and VVIP (luxury) with flights, hotels, meals, and guides included.",
    image: "/api/placeholder/800/400",
    itinerary: [
      "Visa processing & flight booking",
      "Arrival in Jeddah & transport to Makkah",
      "Umrah performance with detailed guidance",
      "Stay in Makkah (depending on package)",
      "Travel to Madinah & Ziyarah",
      "Return journey to Pakistan"
    ],
    includes: [
      "Return flights to Saudi Arabia",
      "Makkah and Madinah Hotels",
      "Umrah Visa processing",
      "Complete ground transportation",
      "Ziyarah (Historical site visits)",
      "Dedicated Islamic guide"
    ],
    excludes: [
      "Personal shopping expenses",
      "Extra meals not in package",
      "Sadaqah/Charity amounts"
    ],
    subPackages: [
      { name: "Normal Umrah", desc: "Budget-friendly, economy hotels reasonably close to Haram.", price: "PKR 150,000 - 200,000" },
      { name: "VIP Umrah", desc: "Comfortable 4-star hotels, better meals, and group activities.", price: "PKR 250,000 - 350,000" },
      { name: "VVIP Umrah", desc: "Pure luxury, 5-star hotels at Haram gate, private guide, premium meals.", price: "PKR 400,000 - 500,000" }
    ]
  },
  {
    id: 3,
    name: "Tourism Packages",
    category: "Tourism",
    price: "From PKR 100,000",
    rating: 4.8,
    reviews: 350,
    description: "Experience the best of Asia and Middle East with our curated tourism packages to: Turkey, Singapore, Azerbaijan, Malaysia, Vietnam, Indonesia, and Dubai. Professional guides, quality hotels, and unforgettable experiences included.",
    image: "/api/placeholder/800/400",
    itinerary: [
      "Day 1: Airport arrival and hotel transfer",
      "Day 2: City sightseeing and iconic landmarks",
      "Day 3: Cultural visits and local experiences",
      "Day 4: Shopping and leisure activities",
      "Day 5: Adventure excursions (optional)",
      "Final Day: Departure and airport drop-off"
    ],
    includes: [
      "Return airfare from Pakistan",
      "Top-rated hotel accommodation",
      "Daily breakfast & selected meals",
      "Professional tour guide",
      "Visa processing assistance",
      "Entrance fees to major attractions"
    ],
    excludes: [
      "Personal shopping and souvenirs",
      "Extra meals / Room service",
      "Travel Insurance (can be added separately)"
    ],
    destinations: ["Turkey", "Singapore", "Azerbaijan", "Malaysia", "Vietnam", "Indonesia", "Dubai"],
    subPackages: []
  },
  {
    id: 4,
    name: "Travel Insurance",
    category: "Insurance",
    price: "From PKR 2,500",
    rating: 4.6,
    reviews: 215,
    description: "Complete travel insurance coverage for medical emergencies, baggage, trip cancellations, and more. Travel worry-free!",
    image: "/api/placeholder/800/400",
    itinerary: [
      "Select destination and travel dates",
      "Choose coverage level and policy type",
      "Provide traveler details",
      "Complete secure payment",
      "Instant policy document delivery via email"
    ],
    includes: [
      "Medical emergency coverage up to $50,000+",
      "Baggage delay and loss protection",
      "Trip cancellation or interruption",
      "Flight delay compensation",
      "Valid worldwide 24/7",
      "Emergency evacuation"
    ],
    excludes: [
      "Pre-existing medical conditions",
      "Extreme sports accidents (unless declared)"
    ],
    subPackages: []
  }
];

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const numericId = parseInt(id as string, 10);
  
  if (isNaN(numericId)) {
    router.push('/services');
    return null;
  }

  const service = servicesData.find(s => s.id === numericId);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-8xl font-bold text-[#D4AF37] mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">404</h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">Service Not Found</h2>
        <p className="text-gray-400 mb-10 text-lg max-w-md">
          The service package you are looking for does not exist or may have been removed.
        </p>
        <Link href="/services">
          <button className="flex items-center gap-3 bg-[#D4AF37] hover:bg-[#b89528] text-black font-bold py-3.5 px-8 rounded-full transition-transform transform hover:scale-105 shadow-[0_4px_14px_0_rgba(212,175,55,0.39)]">
            <FaArrowLeft /> Back to Services
          </button>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white pt-[76px] pb-10 overflow-hidden">
      {/* HERO SECTION */}
      <div className="relative w-full h-[450px] overflow-hidden">
        <Image 
          src={service.image} 
          alt={service.name} 
          fill 
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/70 to-black/40 flex flex-col items-center justify-center p-4">
          <div className="absolute top-6 left-6 z-10 hidden sm:block">
            <Link href="/services" className="text-white hover:text-[#D4AF37] flex items-center gap-2 transition-colors font-medium bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <FaArrowLeft /> View All Services
            </Link>
          </div>
          <div className="text-center w-full max-w-4xl mx-auto z-10 mt-8">
            <span className="inline-block px-4 py-1.5 mb-6 border border-[#D4AF37] text-[#D4AF37] rounded-full text-xs font-semibold uppercase tracking-widest bg-black/40 backdrop-blur-sm shadow-[0_0_10px_rgba(212,175,55,0.2)]">
              {service.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#D4AF37] mb-6 drop-shadow-lg tracking-tight">
              {service.name}
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-lg">
              <span className="font-semibold text-2xl md:text-3xl text-white drop-shadow-md">
                {service.price}
              </span>
              <span className="hidden sm:inline-block text-[#D4AF37] drop-shadow-md text-xl">•</span>
              <div className="flex items-center gap-2 bg-black/50 px-5 py-2 rounded-full backdrop-blur-sm border border-gray-700/50">
                <FaStar className="text-[#D4AF37] text-xl" />
                <span className="font-bold text-white tracking-wide">{service.rating}/5</span>
                <span className="text-gray-300 text-sm ml-1 font-medium">({service.reviews} reviews)</span>
              </div>
            </div>
            <div className="mt-10 flex gap-4 justify-center">
              <Link href="/consultation">
                <button className="bg-[#D4AF37] hover:bg-[#b89528] text-black font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-[0_4px_20px_0_rgba(212,175,55,0.4)] text-base active:scale-95 duration-200">
                  Book Now
                </button>
              </Link>
              <a href="tel:03099961987" className="border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-bold py-3 px-6 rounded-full transition-colors flex items-center gap-2">
                <FaPhoneAlt /> Call Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-16">
        <div className="lg:col-span-2 space-y-16">
          
          {/* DESCRIPTION SECTION */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-[#D4AF37] rounded-full inline-block shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
              Overview
            </h2>
            <div className="bg-[#2d2d2d] p-6 md:p-8 rounded-2xl shadow-xl border border-gray-800/60 leading-relaxed text-gray-300 text-lg hover:border-[#D4AF37]/30 transition-colors duration-300">
              <p className="mb-5">
                {service.description}
              </p>
              
              {service.destinations && (
                <div className="mt-6 pt-5 border-t border-gray-700">
                  <h4 className="text-white font-semibold mb-3">Popular Destinations Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.destinations.map(d => (
                      <span key={d} className="bg-dark/50 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 text-sm rounded-full">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
          
          {/* SUB-PACKAGES TIERS (Only for Umrah currently) */}
          {service.subPackages.length > 0 && (
             <section>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-[#D4AF37] rounded-full inline-block shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                  Package Tiers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {service.subPackages.map((pkg, i) => (
                    <div key={i} className="bg-[#222222] border border-gray-700 p-6 rounded-2xl hover:border-[#D4AF37]/80 transition-colors flex flex-col h-full shadow-lg">
                      <h3 className="text-xl font-bold text-[#D4AF37] mb-2">{pkg.name}</h3>
                      <p className="text-gray-300 text-sm mb-6 flex-grow">{pkg.desc}</p>
                      <div className="text-white font-bold bg-[#1a1a1a] rounded px-3 py-2 text-center text-sm border border-gray-800">
                        {pkg.price}
                      </div>
                    </div>
                  ))}
                </div>
             </section>
          )}

          {/* ITINERARY SECTION */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-[#D4AF37] rounded-full inline-block shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
              {service.id === 1 ? "Booking Process" : "Process / Itinerary"}
            </h2>
            <div className="relative border-l-2 border-[#D4AF37]/30 ml-4 md:ml-6 space-y-8 pb-4">
              {service.itinerary.map((step, index) => (
                <div key={index} className="relative pl-8 md:pl-12 group cursor-default">
                  <div className="absolute -left-[17px] top-1.5 h-8 w-8 bg-[#1a1a1a] border-2 border-[#D4AF37] rounded-full flex items-center justify-center text-[#D4AF37] font-bold shadow-[0_0_10px_rgba(212,175,55,0.2)] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300 z-10 group-hover:scale-110">
                    {index + 1}
                  </div>
                  <div className="bg-[#2d2d2d] border border-gray-800/80 p-5 rounded-xl shadow-lg group-hover:border-[#D4AF37]/60 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all duration-300 transform group-hover:-translate-y-1">
                    <p className="text-gray-200 text-lg font-medium">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-8 lg:mt-0">
          
          {/* QUICK CONTACT CARD */}
          <div className="bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] p-6 rounded-2xl shadow-xl border border-gold/30">
            <h3 className="text-xl font-bold text-white mb-4">Questions? Reach out!</h3>
            <p className="text-sm text-gray-400 mb-6">Our travel experts at Star Crown Tour are available to assist you.</p>
            <div className="flex flex-col gap-3">
              <a href="tel:03099961987" className="flex items-center gap-3 bg-[#111] p-3 rounded-xl hover:bg-gold/10 transition-colors border border-gray-800 text-white font-medium">
                 <FaPhoneAlt className="text-gold" /> 03099961987
              </a>
              <a href="https://wa.me/923099961987" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#111] p-3 rounded-xl hover:bg-[#25D366]/10 transition-colors border border-gray-800 text-white font-medium">
                 <FaWhatsapp className="text-[#25D366] text-xl" /> +92 309 9961987
              </a>
            </div>
          </div>

          {/* WHAT'S INCLUDED SECTION */}
          <section className="bg-gradient-to-br from-[#2d2d2d] to-[#252525] p-6 md:p-8 rounded-2xl shadow-xl border border-[#D4AF37]/30 relative overflow-hidden group hover:border-[#D4AF37]/60 transition-colors duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-110"></div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 relative z-10 border-b border-gray-700/80 pb-4">
              What's Included
            </h3>
            <ul className="space-y-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 relative z-10">
              {service.includes.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="bg-black/30 p-1.5 rounded-full mt-0.5">
                    <FaCheckCircle className="text-green-400 text-base flex-shrink-0" />
                  </div>
                  <span className="text-gray-300 text-sm md:text-base leading-snug font-medium pt-1">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* WHAT'S EXCLUDED SECTION */}
          <section className="bg-[#2d2d2d] p-6 md:p-8 rounded-2xl shadow-xl border border-gray-800/80 relative overflow-hidden group hover:border-gray-700 transition-colors duration-300">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 relative z-10 border-b border-gray-700/80 pb-4">
              What's Not Included
            </h3>
            <ul className="space-y-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 relative z-10">
              {service.excludes.map((item, index) => (
                <li key={index} className="flex items-start gap-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/20 p-1.5 rounded-full mt-0.5">
                    <FaTimesCircle className="text-gray-500 text-base flex-shrink-0" />
                  </div>
                  <span className="text-gray-400 text-sm md:text-base leading-snug font-medium pt-1">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-[#1a1a1a] via-[#2d2d2d]/80 to-[#1a1a1a] border-t border-b border-[#D4AF37]/20 py-24 mt-12 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md">
            Ready for your <span className="text-[#D4AF37] italic">next journey?</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 font-light">
            Our experts at Star Crown Tour will assist you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation">
              <button className="bg-[#D4AF37] hover:bg-[#b89528] text-black font-bold text-lg py-4 px-12 rounded-full transition-transform transform hover:scale-105 shadow-[0_0_25px_rgba(212,175,55,0.4)] active:scale-95 duration-200 w-full sm:w-auto">
                Get Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
