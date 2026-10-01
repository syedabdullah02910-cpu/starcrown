"use client";

import Link from "next/link";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
} from "react-icons/fi";
import { GiCrown } from "react-icons/gi";

const footerLinks = {
  services: [
    { label: "Luxury Tours", href: "/services" },
    { label: "Honeymoon Packages", href: "/services" },
    { label: "Corporate Travel", href: "/services" },
    { label: "Adventure Travel", href: "/services" },
    { label: "Group Tours", href: "/services" },
  ],
  company: [
    { label: "About Us", href: "/" },
    { label: "Our Team", href: "/" },
    { label: "Careers", href: "/" },
    { label: "Press", href: "/" },
    { label: "Contact", href: "/consultation" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/" },
    { label: "Terms of Service", href: "/" },
    { label: "Cookie Policy", href: "/" },
    { label: "Refund Policy", href: "/" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-white border-t border-primary-light">
      {/* Newsletter Strip */}
      <div className="bg-gold-gradient py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-primary text-2xl font-serif font-bold">
              Get Exclusive Travel Deals
            </h3>
            <p className="text-primary/70 text-sm mt-1 font-medium">
              Subscribe for luxury offers and destination guides
            </p>
          </div>
          <form className="flex gap-3 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 md:w-72 px-4 py-3 rounded-full bg-white/90 text-primary placeholder-neutral-500 text-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white font-semibold text-sm rounded-full hover:bg-[#002244] shadow-md transition-all duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <GiCrown className="text-gold text-4xl group-hover:scale-105 transition-transform" />
              <div>
                <span className="font-serif text-2xl font-bold text-white block">
                  Star Crown
                </span>
                <span className="text-gold-light text-xs tracking-widest uppercase font-bold">
                  Tour
                </span>
              </div>
            </Link>
            <p className="text-neutral-300 text-sm leading-relaxed max-w-xs mb-6">
              Your Journey, Our Expertise. Premium travel solutions including Air Tickets, Umrah, Tourism & Insurance.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FiInstagram, href: "#" },
                { icon: FiFacebook, href: "#" },
                { icon: FiTwitter, href: "#" },
                { icon: FiLinkedin, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-neutral-300 hover:text-white hover:border-gold hover:bg-gold/10 transition-all duration-300"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-gold font-bold text-sm mb-4 tracking-wide uppercase">
              Services
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-gold-light text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-gold font-bold text-sm mb-4 tracking-wide uppercase">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-gold-light text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold font-bold text-sm mb-4 tracking-wide uppercase">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-neutral-300 text-sm">
                <FiMapPin className="text-gold shrink-0 mt-0.5" />
                <span>418-B, Khurram Plaza, Chandni Chowk, Rawalpindi</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-300 text-sm">
                <FiPhone className="text-gold shrink-0" />
                <a href="tel:+923099961987" className="hover:text-gold-light transition-colors">
                  +92 309 9961987
                </a>
              </li>
              <li className="flex items-center gap-3 text-neutral-300 text-sm">
                <FiMail className="text-gold shrink-0" />
                <a
                  href="mailto:info@starcrowntoursofficial.com"
                  className="hover:text-gold-light transition-colors"
                >
                  info@starcrowntoursofficial.com
                </a>
              </li>
              
              <li className="pt-4 mt-2 border-t border-white/10 w-full block">
                <h5 className="text-gold font-bold text-xs mb-2 uppercase tracking-wider">Working Hours</h5>
                <div className="text-neutral-400 text-xs space-y-1">
                  <p>Mon - Fri: <span className="text-white relative">9:00 AM - 6:00 PM</span></p>
                  <p>Saturday: <span className="text-white relative">10:00 AM - 4:00 PM</span></p>
                  <p>Sunday: <span className="text-white/50">Closed</span></p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-400 text-xs tracking-wider">
            © {new Date().getFullYear()} Star Crown Tour. All rights reserved.
          </p>
          <div className="flex gap-5">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-neutral-400 hover:text-white text-xs transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
