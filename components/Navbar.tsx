"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiSettings,
  FiChevronDown,
} from "react-icons/fi";
import { GiCrown } from "react-icons/gi";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Consultation", href: "/consultation" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setUserOpen(false);
    router.push("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-dark-nav/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.6)] border-b border-dark-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <GiCrown className="text-gold text-3xl group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-lg scale-0 group-hover:scale-150 transition-transform duration-500" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-xl font-bold text-gold">
                Star Crown
              </span>
              <span className="text-silver-dark text-[10px] tracking-[0.25em] uppercase font-medium">
                Tour
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors duration-300 group ${
                  pathname === item.href
                    ? "text-gold"
                    : "text-silver hover:text-gold"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gold-gradient transition-all duration-300 ${
                    pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserOpen(!userOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 text-gold hover:bg-gold/10 transition-all duration-300 text-sm font-medium"
                >
                  <FiUser className="text-base" />
                  <span>{user.name.split(" ")[0]}</span>
                  <FiChevronDown
                    className={`transition-transform duration-300 ${userOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {userOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-dark-card border border-dark-border rounded-xl shadow-card overflow-hidden animate-fade-in">
                    <Link
                      href="/dashboard"
                      onClick={() => setUserOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-silver hover:text-gold hover:bg-dark-hover transition-all text-sm"
                    >
                      <FiSettings /> Dashboard
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        href="/dashboard/admin"
                        onClick={() => setUserOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-silver hover:text-gold hover:bg-dark-hover transition-all text-sm"
                      >
                        <FiSettings /> Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-dark-hover transition-all text-sm border-t border-dark-border"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-silver hover:text-gold text-sm font-medium transition-colors duration-300"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-gold-gradient text-dark font-semibold text-sm px-5 py-2.5 rounded-full hover:opacity-90 hover:shadow-gold transition-all duration-300"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-silver hover:text-gold transition-colors p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-nav/98 backdrop-blur-xl border-t border-dark-border animate-fade-in">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 text-base font-medium transition-colors ${
                  pathname === item.href
                    ? "text-gold"
                    : "text-silver hover:text-gold"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-dark-border flex flex-col gap-3">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="text-silver hover:text-gold text-base"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-400 text-base"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setMenuOpen(false)}
                    className="text-silver hover:text-gold text-base"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMenuOpen(false)}
                    className="bg-gold-gradient text-dark font-semibold text-sm px-5 py-2.5 rounded-full text-center"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
