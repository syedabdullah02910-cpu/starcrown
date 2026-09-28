"use client";

import { useState, useEffect } from "react";
import ServiceCard from "@/components/ServiceCard";
import { getServices } from "@/lib/api";
import { Service } from "@/types";
import { FiSearch, FiFilter } from "react-icons/fi";
import { GiCrown } from "react-icons/gi";

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
    image: "/api/placeholder/800/400",
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
    image: "/api/placeholder/800/400",
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
    image: "/api/placeholder/800/400",
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
    image: "/api/placeholder/800/400",
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
        if (res.data?.length) {
          setServices(res.data);
          setFiltered(res.data);
        } else {
          setServices(MOCK_SERVICES);
          setFiltered(MOCK_SERVICES);
        }
      } catch {
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
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <div className="bg-dark-card border-b border-dark-border py-20 text-center">
        <div className="section-tag mb-6 mx-auto w-fit">
          <GiCrown className="text-gold" /> Our Services
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">
          Premium Travel <span className="text-gold">Solutions</span>
        </h1>
        <p className="text-silver-dark text-lg max-w-xl mx-auto">
          Explore our complete range of travel services designed to give you peace of mind and unforgettable experiences.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-silver-dark" />
            <input
              type="text"
              placeholder="Search services, destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-dark-card border border-dark-border rounded-full pl-11 pr-5 py-3.5 text-white placeholder-silver-dark text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <FiFilter className="text-silver-dark shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gold-gradient text-dark"
                    : "border border-dark-border text-silver-dark hover:border-gold/40 hover:text-gold"
                }`}
              >
                {formatCategory(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-silver-dark text-sm mb-6">
          {filtered.length} package{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-80 bg-dark-card border border-dark-border rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-white text-xl font-semibold mb-2">No results found</h3>
            <p className="text-silver-dark text-sm">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
