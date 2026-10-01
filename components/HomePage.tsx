"use client";

import Link from "next/link";
import Image from "next/image";
import { FaPlaneDeparture, FaMosque, FaGlobe, FaShieldAlt, FaHotel } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  {
    icon: FaPlaneDeparture,
    title: "Air Ticketing",
    desc: "Book flights to any destination across the globe at best prices",
    id: 1,
  },
  {
    icon: FaMosque,
    title: "Umrah Packages",
    desc: "VIP, VVIP, and Normal Umrah packages with complete arrangements",
    id: 2,
  },
  {
    icon: FaGlobe,
    title: "Tourism Packages",
    desc: "Explore Turkey, Azerbaijan, Dubai, Malaysia & more with our guided tourism packages",
    id: 3,
  },
  {
    icon: FaShieldAlt,
    title: "Travel Insurance",
    desc: "Comprehensive travel insurance for all your global journeys",
    id: 4,
  },
  {
    icon: FaHotel,
    title: "Global Hotels",
    desc: "Premium and budget-friendly hotel bookings worldwide",
    id: 5,
  },
  {
    icon: IoDocumentText,
    title: "Visa Processing",
    desc: "Hassle-free visa application and processing for multiple countries",
    id: 6,
  },
];

const stats = [
  { value: "5+ Years", label: "Industry Experience" },
  { value: "10,000+", label: "Happy Travelers" },
  { value: "24/7", label: "Customer Support" },
  { value: "Best Rates", label: "Guaranteed Prices" },
];

const testimonials = [
  {
    review:
      "Excellent service! Best flight rates provided. Got my tickets sorted within minutes.",
    name: "Ahmed Khan",
    city: "Lahore",
  },
  {
    review:
      "Best Umrah arrangements. Highly recommended! The VIP package was absolutely flawless.",
    name: "Fatima Malik",
    city: "Karachi",
  },
  {
    review:
      "Great tour packages to Dubai. Very professional team and transparent pricing.",
    name: "Hassan Ali",
    city: "Islamabad",
  },
];

export default function HomePage() {
  return (
    <div className="bg-neutral-50 text-neutral-900 font-sans min-h-screen">
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074"
            alt="Beautiful travel destination"
            fill
            className="object-cover object-bottom"
            priority
          />
          <div className="absolute inset-0 bg-hero-gradient backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center px-4 w-full">
          <p className="mb-6 section-tag animate-fade-in-up text-white bg-white/10 border-white/30 tracking-[0.25em]">✨ EXPRESS YOUR DREAMS</p>

          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
            Discover the World with<br />
            <span className="text-gold-light">Star Crown</span> Tour
          </h1>

          <p className="text-neutral-100 text-lg md:text-xl mb-12 max-w-3xl mx-auto font-medium animate-slide-in-up opacity-0 drop-shadow-md tracking-wide"
             style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
             Travel | Tours | Umrah | Visa | Flights | Hotels
          </p>

          <div
            className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
          >
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full px-10 py-4 font-bold bg-gold-gradient text-primary hover:shadow-gold-lg hover:scale-105 transition-all duration-300"
            >
              Explore Services
            </Link>
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center rounded-full px-10 py-4 font-bold border-2 border-white/80 text-white backdrop-blur-sm hover:bg-white hover:text-primary hover:scale-105 transition-all duration-300"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-neutral-50">
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Premium Services
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full glow-pulse" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delayMs={i * 100}>
              <div className="group glass-card h-full rounded-2xl p-8 border border-neutral-200 hover:border-gold/50 hover:shadow-card transition-all duration-300 hover:-translate-y-2 flex flex-col bg-white">
                <div className="bg-neutral-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="text-primary text-3xl animate-float" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2 font-serif">{service.title}</h3>
                <p className="text-neutral-500 mb-6 flex-grow text-sm leading-relaxed">{service.desc}</p>
                <Link
                  href={service.id < 5 ? `/services/${service.id}` : "/services"}
                  className="text-primary font-semibold hover:text-gold transition-colors flex items-center gap-2 group-hover:gap-3 mt-auto text-sm uppercase tracking-wider"
                >
                  Discover More <span>→</span>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-100/50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Choose Us
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delayMs={i * 80}>
                <div className="bg-white rounded-2xl p-8 text-center border-b-4 border-gold shadow-sm hover:shadow-card transition-all hover:-translate-y-1">
                  <div className="text-4xl font-bold text-primary mb-2 font-serif">{stat.value}</div>
                  <div className="text-neutral-500 font-medium uppercase tracking-wide text-xs">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
            What Our Clients Say
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.name} delayMs={index * 120}>
              <div className="relative bg-white p-8 rounded-2xl border border-neutral-200 hover:border-gold/40 shadow-sm hover:shadow-card transition-all duration-300 h-full">
                <div className="text-6xl text-gold/20 absolute top-4 left-4 font-serif">❝</div>
                <p className="text-neutral-600 mb-6 relative z-10 pt-6 text-sm italic">&quot;{testimonial.review}&quot;</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="text-gold animate-star-pop"
                      style={{ animationDelay: `${index * 0.1 + i * 0.05}s` }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 text-sm">{testimonial.name}</p>
                    <p className="text-neutral-400 text-xs">{testimonial.city}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-4 text-center bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.15),transparent_60%)]" />
        <ScrollReveal className="max-w-4xl mx-auto relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-neutral-300 text-lg mb-10 max-w-2xl mx-auto">
            Let our experts help plan your perfect trip with unmatched luxury and convenience.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center rounded-full px-10 py-4 text-lg font-bold bg-gold-gradient text-primary hover:scale-105 shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300"
          >
            Get Free Consultation
          </Link>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
}
