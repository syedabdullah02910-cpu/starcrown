"use client";

import { useState, useEffect } from "react";
import ServiceCard from "@/components/ServiceCard";
import { getServices } from "@/lib/api";
import { Service } from "@/types";
import { FiSearch, FiFilter } from "react-icons/fi";
import { GiCrown } from "react-icons/gi";
import { serviceCardImages } from "@/lib/tourMedia";
import Image from "next/image";

// Ensure the Service type matches this, or allow extending it in reality.
const MOCK_SERVICES: Service[] = [
  {
    id: "1",
    title: "Air Ticketing Worldwide",
    description: "Book flights to any destination across the globe at best prices",
    shortDescription: "We provide worldwide air ticketing services for all major airlines. Whether it's domestic or international travel, we get you the best fares.",
    price: 8000,
    duration: "Flexible",
    category: "air_tickets",
    image: serviceCardImages.air_tickets,
    features: ["Global Destinations", "Major Airlines", "Best Fares", "24/7 Support"],
    destinations: ["Worldwide"],
    rating: 4.8,
    reviewCount: 420,
    popular: true,
  },
  {
    id: "2",
    title: "Umrah Packages",
    description: "VIP, VVIP, and Normal Umrah packages with complete arrangements",
    shortDescription: "Choose from our three tier Umrah packages: Normal, VIP, and VVIP with flights, hotels, meals, and guides included.",
    price: 150000,
    duration: "7 - 14 Days",
    category: "umrah",
    image: serviceCardImages.umrah,
    features: ["Flights Included", "Makkah & Madinah Hotels", "Visa Processing", "Transfers"],
    destinations: ["Makkah", "Madinah"],
    rating: 4.9,
    reviewCount: 890,
    popular: true,
  },
  {
    id: "3",
    title: "Tourism Packages",
    description: "Explore Turkey, Singapore, Azerbaijan, Malaysia, Vietnam, Indonesia, and Dubai",
    shortDescription: "Experience the best of Asia and Middle East with our curated tourism packages. Professional guides, quality hotels, and unforgettable experiences.",
    price: 100000,
    duration: "4 - 10 Days",
    category: "tourism",
    image: serviceCardImages.tourism,
    features: ["Hotels", "Guided Tours", "Meals", "Transfers"],
    destinations: ["Turkey", "Singapore", "Dubai", "Malaysia"],
    rating: 4.8,
    reviewCount: 350,
    popular: true,
  },
  {
    id: "4",
    title: "Travel Insurance",
    description: "Comprehensive travel insurance for all your journeys",
    shortDescription: "Complete travel insurance coverage for medical emergencies, baggage, trip cancellations, and more. Travel worry-free!",
    price: 2500,
    duration: "Varies",
    category: "insurance",
    image: serviceCardImages.insurance,
    features: ["Medical Coverage", "Luggage Loss", "Trip Cancellation", "24/7 Hotline"],
    destinations: ["Worldwide"],
    rating: 4.6,
    reviewCount: 215,
    popular: false,
  }
];

const categories = ["all", "air_tickets", "umrah", "tourism", "insurance"];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES);
  const [filtered, setFiltered] = useState<Service[]>(MOCK_SERVICES);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Still calling getServices just in case we have real backend running later
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await getServices();
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          const mappedServices = res.data.map((s: Record<string, unknown>): Service => {
             let parsedFeatures: string[] = [];
             try {
                parsedFeatures = typeof s.features === 'string' ? JSON.parse(s.features) : (Array.isArray(s.features) ? s.features as string[] : ["Standard feature"]);
             } catch {
                parsedFeatures = ["Available Features"]; 
             }
             
             const description = String(s.description ?? "Description");
             const priceRaw = s.price;
             const price =
               typeof priceRaw === "string"
                 ? parseInt(priceRaw.replace(/[^0-9]/g, ""), 10) || 5000
                 : typeof priceRaw === "number"
                   ? priceRaw
                   : 5000;
             const category = String(s.category ?? "worldwide");

             return {
                id: String(s.id ?? ""),
                title: String(s.name ?? s.title ?? "Service"),
                description,
                shortDescription: description.length > 120 ? `${description.substring(0, 120)}...` : description,
                price,
                duration: String(s.duration ?? "Flexible"),
                category,
                image: String(s.image_url ?? "/api/placeholder/800/400"),
                features: parsedFeatures,
                destinations: category === "saudi" ? ["Makkah", "Madinah"] :
                             category === "asia-arab" ? ["Turkey", "Dubai"] : ["Worldwide"],
                rating: typeof s.rating === "number" ? s.rating : 4.9,
                reviewCount: typeof s.reviewCount === "number" ? s.reviewCount : 100,
                popular: Boolean(s.popular ?? true),
             };
          });
          setServices(mappedServices);
          setFiltered(mappedServices);
        } else {
          setServices(MOCK_SERVICES);
          setFiltered(MOCK_SERVICES);
        }
      } catch (err) {
        console.error(err);
        setServices(MOCK_SERVICES);
        setFiltered(MOCK_SERVICES);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    let result = services;
    if (activeCategory !== "all") {
      result = result.filter((s) => s.category === activeCategory);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.destinations.some((d) => d.toLowerCase().includes(q)) ||
          s.category.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [activeCategory, search, services]);

  const formatCategory = (cat: string) => {
    if (cat === "air_tickets") return "Air Tickets";
    return cat.replace("_", " ");
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-20">
      {/* Header */}
      <div className="relative border-b border-neutral-200 py-24 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1540962351504-03077e80460e?q=80&w=2000"
            alt="Premium Travel Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />
        </div>
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
          <div className="section-tag mb-6 mx-auto w-fit text-white bg-white/10 border-white/20">
            <GiCrown className="text-gold" /> Our Services
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">
            Premium Travel <span className="text-gold-light">Solutions</span>
          </h1>
          <p className="text-neutral-200 text-lg max-w-2xl mx-auto tracking-wide">
            Explore our complete range of travel services designed to give you peace of mind and unforgettable experiences.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1 relative shadow-sm">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 text-lg" />
            <input
              type="text"
              placeholder="Search services, destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-neutral-200 rounded-full pl-12 pr-5 py-3.5 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <FiFilter className="text-neutral-500 shrink-0 mx-2" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium capitalize transition-all duration-300 shadow-sm ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md scale-105"
                    : "bg-white border border-neutral-200 text-neutral-600 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {formatCategory(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-neutral-500 text-sm mb-6 font-medium">
          {filtered.length} package{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-[420px] bg-white border border-neutral-200 rounded-2xl animate-pulse shadow-sm"
              />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200 shadow-sm">
            <div className="text-6xl mb-4 opacity-50">🔍</div>
            <h3 className="text-neutral-900 text-xl font-bold mb-2 font-serif">No results found</h3>
            <p className="text-neutral-500 text-sm">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
