import Link from "next/link";
import { FiPhone, FiMail, FiMapPin, FiTwitter, FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import { FaPlaneDeparture, FaMosque, FaGlobe, FaShieldAlt } from "react-icons/fa";
import Footer from "@/components/Footer";

export default function HomePage() {
  const services = [
    { icon: FaPlaneDeparture, title: "Air Ticketing", desc: "Book flights to any destination across the globe at best prices", id: 1 },
    { icon: FaMosque, title: "Umrah Packages", desc: "VIP, VVIP, and Normal Umrah packages with complete arrangements", id: 2 },
    { icon: FaGlobe, title: "Tourism Packages", desc: "Explore Turkey, Singapore, Azerbaijan, Malaysia, Vietnam, Indonesia, and Dubai", id: 3 },
    { icon: FaShieldAlt, title: "Travel Insurance", desc: "Comprehensive travel insurance for all your journeys", id: 4 },
  ];

  const stats = [
    { value: "5+ Years", label: "Industry Experience" },
    { value: "10,000+", label: "Happy Travelers" },
    { value: "24/7", label: "Customer Support" },
    { value: "Best Rates", label: "Guaranteed Prices" },
  ];

  const testimonials = [
    { quote: "Excellent service! Best flight rates provided. Got my tickets sorted within minutes.", name: "Ahmed Khan, Lahore", rating: 5 },
    { quote: "Best Umrah arrangements. Highly recommended! The VIP package was absolutely flawless.", name: "Fatima Malik, Karachi", rating: 5 },
    { quote: "Great tour packages to Dubai. Very professional team and transparent pricing.", name: "Hassan Ali, Islamabad", rating: 5 },
  ];

  return (
    <div className="bg-[#1a1a1a] text-white font-sans min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-[#1a1a1a] px-4 pt-20">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="z-10 text-center animate-fade-in max-w-4xl mx-auto flex flex-col items-center">
          <div className="mb-6 text-[#D4AF37] text-2xl font-bold tracking-widest uppercase">
            ✨ Star Crown Tour
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-md">
            Your Journey, <br/><span className="text-[#D4AF37]">Our Expertise</span>
          </h1>
          <p className="text-[#C0C0C0] text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium">
            Premium Travel Solutions - Air Tickets, Umrah, Tourism & Insurance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="bg-[#D4AF37] hover:bg-[#A88A20] text-white px-8 py-4 rounded-full font-semibold transition-all shadow-[0_4px_14px_0_rgba(212,175,55,0.39)] hover:scale-105 hover:shadow-lg">
              Explore Services
            </Link>
            <Link href="/consultation" className="border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 px-8 py-4 rounded-full font-semibold transition-all hover:scale-105">
              Get Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Premium Services</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <div key={i} className="group bg-[#222222] border border-gray-800 rounded-2xl p-8 hover:border-[#D4AF37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.15)] transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
              <service.icon className="text-[#D4AF37] text-5xl mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-[#C0C0C0] mb-6 flex-grow">{service.desc}</p>
              <Link href={`/services/${service.id}`} className="text-[#D4AF37] font-semibold hover:text-[#F0D060] transition-colors flex items-center gap-2 group-hover:gap-3 mt-auto">
                Learn More <span>→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY CHOOSE US SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#222222]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Us</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-2xl p-8 text-center border-b-4 border-[#D4AF37] hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">{stat.value}</div>
                <div className="text-[#C0C0C0] font-medium uppercase tracking-wide text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-[#222222] p-8 rounded-2xl border border-gray-800 transition-all duration-300 hover:border-[#D4AF37]/50">
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-[#D4AF37] text-xl">⭐</span>
                ))}
              </div>
              <p className="text-[#C0C0C0] italic mb-8">&quot;{t.quote}&quot;</p>
              <div className="font-semibold text-white">{t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-24 px-4 text-center bg-gradient-to-r from-[#D4AF37] to-[#F0D060]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-[#1a1a1a]/80 text-xl mb-10 font-medium max-w-2xl mx-auto">
            Let our experts help plan your perfect trip
          </p>
          <Link href="/consultation" className="inline-block bg-[#1a1a1a] text-[#D4AF37] hover:bg-black px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl">
            Get Free Consultation
          </Link>
        </div>
      </section>

      {/* 6. FOOTER */}
      <Footer />
    </div>
  );
}
