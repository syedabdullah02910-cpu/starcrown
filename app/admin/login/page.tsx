"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import { GiCrown } from "react-icons/gi";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Validation states
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});

  // Auto-login check and prepopulate
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      router.push("/admin/dashboard");
    }

    const savedEmail = localStorage.getItem("admin_email_saved");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
    setMounted(true);
  }, [router]);

  const validateEmail = (val: string) => {
    if (!val) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Please enter valid email";
    if (val.length > 255) return "Email is too long";
    return "";
  };

  const validatePassword = (val: string) => {
    if (!val) return "Password is required";
    if (val.length < 6) return "Password must be at least 6 characters";
    if (val.length > 50) return "Password is too long";
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (touched.password) {
      setErrors((prev) => ({ ...prev, password: validatePassword(val) }));
    }
  };

  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
    } else {
      setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const validateForm = () => {
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    
    setErrors({ email: emailErr, password: passErr });
    setTouched({ email: true, password: true });

    return !emailErr && !passErr;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API Call
    setTimeout(() => {
      // For demo purposes, we accept any format-valid email and 6+ char password
      
      // Save tokens + data
      localStorage.setItem("admin_token", "demo_jwt_token_123456789");
      localStorage.setItem("admin_email", email);
      localStorage.setItem("admin_name", "System Admin");
      
      if (rememberMe) {
        localStorage.setItem("admin_email_saved", email);
      } else {
        localStorage.removeItem("admin_email_saved");
      }

      setSuccess(true);
      setIsLoading(false);

      // Redirect after 1 second
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1000);
      
    }, 1000);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex">
      
      {/* LEFT SIDE (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center relative overflow-hidden" 
           style={{ background: "linear-gradient(135deg, #D4AF37, #1a1a1a)" }}>
        
        {/* Subtle decorative overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-10" />

        <div className="relative z-20 text-center px-12 max-w-lg">
          <GiCrown className="text-white text-8xl mx-auto mb-6 drop-shadow-xl" />
          <h1 className="text-white text-4xl font-bold font-serif mb-4 drop-shadow-md">
            Admin Portal
          </h1>
          <p className="text-[#f5f5f5] text-lg mb-10 font-medium">
            Star Crown Tour Management Portal
          </p>
          
          <div className="space-y-4 text-left inline-block">
            {[
              "Manage Quote Requests",
              "Track Customer Inquiries",
              "View Analytics & Reports",
              "Update Package Status"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-white">
                <div className="bg-white/20 p-1 rounded-full">
                  <FaCheck className="text-white text-sm" />
                </div>
                <span className="font-medium text-[15px]">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-white/70 text-sm font-semibold tracking-widest uppercase">
            Secure Admin Access
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 relative">
        
        {/* Mobile Logo Header */}
        <div className="lg:hidden flex flex-col items-center mb-8 text-center mt-[-40px]">
          <GiCrown className="text-[#D4AF37] text-6xl mb-2" />
          <h1 className="text-2xl font-bold text-white font-serif tracking-wide">
            Star Crown Tour
          </h1>
          <p className="text-[#D4AF37] text-sm uppercase tracking-widest mt-1">Admin Portal</p>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[450px] bg-[#1a1a1a] rounded-lg border border-[#333333] shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-6 md:p-12 transition-all">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
            <p className="text-[#C0C0C0] text-sm font-medium">Star Crown Tour Management Portal</p>
          </div>

          {/* Messages */}
          {success && (
            <div className="bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 px-4 py-3 rounded-md mb-6 text-sm font-medium flex items-center justify-center animate-fade-in">
              <FaCheck className="mr-2" /> Login successful! Redirecting...
            </div>
          )}

          {error && (
            <div className="bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/30 px-4 py-3 rounded-md mb-6 text-sm flex items-center justify-between animate-fade-in">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="text-[#ef4444] hover:text-white font-bold ml-4">✕</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            
            {/* Email Field */}
            <div>
              <label className="block text-[#D4AF37] font-semibold text-sm mb-2" htmlFor="email">
                Admin Email *
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <FaEnvelope className="text-[#D4AF37] text-[18px]" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => handleBlur("email")}
                  placeholder="admin@starcrowntoursofficial.com"
                  disabled={isLoading || success}
                  className={`w-full bg-[#0a0a0a] border-2 ${
                    errors.email && touched.email ? "border-[#ef4444]" : "border-[#333333]"
                  } focus:border-[#D4AF37] text-white text-[16px] rounded-md py-3 pl-[40px] pr-4 transition-colors duration-300 outline-none`}
                />
              </div>
              {errors.email && touched.email && (
                <p className="text-[#ef4444] text-[12px] mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[#D4AF37] font-semibold text-sm mb-2" htmlFor="password">
                Password *
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <FaLock className="text-[#D4AF37] text-[18px]" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => handleBlur("password")}
                  placeholder="Enter your password"
                  disabled={isLoading || success}
                  className={`w-full bg-[#0a0a0a] border-2 ${
                    errors.password && touched.password ? "border-[#ef4444]" : "border-[#333333]"
                  } focus:border-[#D4AF37] text-white text-[16px] rounded-md py-3 pl-[40px] pr-12 transition-colors duration-300 outline-none`}
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D4AF37] transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash className="text-[18px]" /> : <FaEye className="text-[18px]" />}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="text-[#ef4444] text-[12px] mt-1">{errors.password}</p>
              )}
              
              <div className="text-right mt-2">
                <Link href="#forgot" className="text-xs text-gray-400 hover:text-[#D4AF37] font-medium transition-colors">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-1 pb-2">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMe}
                disabled={isLoading || success}
                className="w-[18px] h-[18px] accent-[#D4AF37] bg-[#0a0a0a] border-[#333333] cursor-pointer rounded-sm"
              />
              <label htmlFor="rememberMe" className="text-[#A0A0A0] text-sm cursor-pointer select-none hover:text-[#D4AF37] transition-colors">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || success}
              className={`w-full bg-[#D4AF37] text-[#1a1a1a] font-bold py-3 rounded-md transition-all duration-300 flex items-center justify-center gap-2
                ${(isLoading || success) ? "opacity-80 cursor-not-allowed" : "hover:bg-[#b89528] active:scale-[0.98] shadow-[0_0_15px_rgba(212,175,55,0.3)]"}
              `}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
            
          </form>
        </div>
      </div>

    </div>
  );
}
