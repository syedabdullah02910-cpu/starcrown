"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaPlane, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaUsers, 
  FaSpinner 
} from "react-icons/fa";

const generateRequestId = () => `SR-${Math.floor(100000 + Math.random() * 900000)}`;

export default function ConsultationPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [requestId, setRequestId] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    destination: "",
    travelDate: "",
    passengers: "",
    specialRequirements: "",
    terms: false
  });
  
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRequestId(generateRequestId());
  }, []);

  const validate = (name: string, value: any): string => {
    switch (name) {
      case "name":
        if (!value) return "Full Name is required";
        if (value.length < 3) return "Name must be at least 3 characters";
        if (value.length > 100) return "Name is too long";
        if (/[^a-zA-Z\s.-]/.test(value)) return "Name cannot contain special characters";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email";
        return "";
      case "phone":
        if (!value) return "Phone number is required";
        if (!value.startsWith("+92")) return "Phone must start with +92";
        if (!/^\+92\s?[0-9\s-]{9,11}$/.test(value)) return "Format: +92 300 1234567";
        return "";
      case "service":
        if (!value || value === "Select a service") return "Please select a service";
        return "";
      case "travelDate":
        if (!value) return "Travel Date is required";
        const selectedDate = new Date(value);
        const minDate = new Date();
        minDate.setDate(minDate.getDate() + 7);
        minDate.setHours(0,0,0,0);
        if (selectedDate < minDate) return "Date must be at least 7 days from today";
        return "";
      case "passengers":
        if (!value) return "Number of passengers is required";
        const num = parseInt(value, 10);
        if (isNaN(num) || num < 1 || num > 10) return "Must be between 1 and 10";
        return "";
      case "terms":
        if (!value) return "You must agree to the terms and conditions";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    // @ts-ignore
    const checked = type === "checkbox" ? e.target.checked : undefined;
    const finalValue = type === "checkbox" ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: finalValue }));
    
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validate(name, finalValue) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    // @ts-ignore
    const finalValue = type === "checkbox" ? e.target.checked : value;
    
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validate(name, finalValue) }));
  };

  const validateAll = () => {
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      // @ts-ignore
      const err = validate(key, formData[key]);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    if (validateAll()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        const payload = {
          id: requestId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          destination: formData.destination,
          travel_date: formData.travelDate,
          passengers: parseInt(formData.passengers, 10),
          special_requirements: formData.specialRequirements,
          submitted_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };
        
        console.log("Form Submitted:", payload);
        
        // Save to localStorage
        try {
          const existing = JSON.parse(localStorage.getItem("quote_requests") || "[]");
          existing.push(payload);
          localStorage.setItem("quote_requests", JSON.stringify(existing));
        } catch (err) {
          console.error("Local storage save failed", err);
        }

        setIsSuccess(true);
        setIsSubmitting(false);
        
        setTimeout(() => {
          router.push(`/thank-you?id=${requestId}`);
        }, 2000);
        
      }, 1500);
    }
  };

  if (!mounted) return null;

  // Calculate 7 days from today for min date
  const minDateConfig = new Date();
  minDateConfig.setDate(minDateConfig.getDate() + 7);
  const minDateString = minDateConfig.toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* PAGE HEADER */}
      <div className="pt-24 pb-16 px-4 bg-gradient-to-b from-[#111] to-[#1a1a1a] border-b border-[#D4AF37]/20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
          Get Your Free <span className="text-[#D4AF37]">Consultation</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
          Tell us about your travel plans and we'll create the perfect package for you.
        </p>

        {/* Contact info banner */}
        <div className="inline-flex flex-col sm:flex-row gap-6 bg-[#2d2d2d]/80 px-6 md:px-10 py-5 rounded-2xl border border-[#D4AF37]/30 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-3 text-sm font-medium">
            <FaPhoneAlt className="text-[#D4AF37] text-xl" /> 
            Call us: <a href="tel:03099961987" className="hover:text-[#D4AF37] transition-colors">03099961987</a>
          </div>
          <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
          <div className="flex items-center gap-3 text-sm font-medium text-left">
            <FaMapMarkerAlt className="text-[#D4AF37] text-xl shrink-0" />
            <span>Visit us: 418-B, Khurram Plaza,<br className="sm:hidden"/> Chandni Chowk, Rawalpindi</span>
          </div>
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="py-12 px-4 relative z-10 w-full max-w-[600px] mx-auto md:w-[90%] sm:p-[20px] md:p-[30px] lg:p-0">
        <div className="bg-[#2d2d2d] rounded-xl p-6 md:p-10 border border-[#D4AF37]/40 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          
          {isSuccess ? (
            <div className="text-center py-10 animate-fade-in bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-xl p-6">
              <div className="w-16 h-16 bg-[#22c55e] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                ✓
              </div>
              <h2 className="text-2xl font-bold text-[#22c55e] mb-2">Request submitted successfully!</h2>
              <p className="text-white mb-2 text-lg">Request ID: <span className="font-mono font-bold">{requestId}</span></p>
              <p className="text-gray-300">Our team will contact you within 24 hours.</p>
              <p className="text-sm text-gray-400 mt-6 flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin" /> Redirecting safely...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name */}
              <div>
                <label className="block text-[#D4AF37] font-semibold mb-2">Full Name *</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your full name" 
                    className={`w-full bg-[#1a1a1a] border ${errors.name && touched.name ? 'border-[#ef4444]' : 'border-[#444]'} focus:border-[#D4AF37] text-white rounded-md py-3 pl-11 pr-4 transition-colors outline-none`}
                  />
                </div>
                {errors.name && touched.name && <p className="text-[#ef4444] text-[12px] mt-1">{errors.name}</p>}
              </div>

              {/* Email & Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#D4AF37] font-semibold mb-2">Email *</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="your@email.com" 
                      className={`w-full bg-[#1a1a1a] border ${errors.email && touched.email ? 'border-[#ef4444]' : 'border-[#444]'} focus:border-[#D4AF37] text-white rounded-md py-3 pl-11 pr-4 transition-colors outline-none`}
                    />
                  </div>
                  {errors.email && touched.email && <p className="text-[#ef4444] text-[12px] mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-[#D4AF37] font-semibold mb-2">Phone Number *</label>
                  <div className="relative">
                    <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="+92 300 1234567" 
                      className={`w-full bg-[#1a1a1a] border ${errors.phone && touched.phone ? 'border-[#ef4444]' : 'border-[#444]'} focus:border-[#D4AF37] text-white rounded-md py-3 pl-11 pr-4 transition-colors outline-none`}
                    />
                  </div>
                  {errors.phone && touched.phone && <p className="text-[#ef4444] text-[12px] mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="block text-[#D4AF37] font-semibold mb-2">Preferred Service *</label>
                <div className="relative">
                  <FaPlane className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full bg-[#1a1a1a] border ${errors.service && touched.service ? 'border-[#ef4444]' : 'border-[#444]'} focus:border-[#D4AF37] text-white rounded-md py-3 pl-11 pr-4 transition-colors outline-none appearance-none`}
                  >
                    <option value="">Select a service</option>
                    <option value="Air Ticketing Worldwide">Air Ticketing Worldwide</option>
                    <option value="Umrah Packages (Normal/VIP/VVIP)">Umrah Packages (Normal/VIP/VVIP)</option>
                    <option value="Tourism Packages">Tourism Packages</option>
                    <option value="Travel Insurance">Travel Insurance</option>
                  </select>
                </div>
                {errors.service && touched.service && <p className="text-[#ef4444] text-[12px] mt-1">{errors.service}</p>}
              </div>

              {/* Destination */}
              <div>
                <label className="block text-[#D4AF37] font-semibold mb-2">Destination <span className="text-gray-400 font-normal text-sm">(Optional)</span></label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g., Dubai, Turkey, Singapore" 
                    className={`w-full bg-[#1a1a1a] border border-[#444] focus:border-[#D4AF37] text-white rounded-md py-3 pl-11 pr-4 transition-colors outline-none`}
                  />
                </div>
              </div>

              {/* Date & Passengers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#D4AF37] font-semibold mb-2">Travel Date *</label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input 
                      type="date" 
                      name="travelDate"
                      min={minDateString}
                      value={formData.travelDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-[#1a1a1a] border ${errors.travelDate && touched.travelDate ? 'border-[#ef4444]' : 'border-[#444]'} focus:border-[#D4AF37] text-white rounded-md py-3 pl-11 pr-4 transition-colors outline-none [color-scheme:dark]`}
                    />
                  </div>
                  {errors.travelDate && touched.travelDate && <p className="text-[#ef4444] text-[12px] mt-1">{errors.travelDate}</p>}
                </div>
                
                <div>
                  <label className="block text-[#D4AF37] font-semibold mb-2">Number of Passengers *</label>
                  <div className="relative">
                    <FaUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="number" 
                      name="passengers"
                      min="1"
                      max="10"
                      value={formData.passengers}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="How many travelers?" 
                      className={`w-full bg-[#1a1a1a] border ${errors.passengers && touched.passengers ? 'border-[#ef4444]' : 'border-[#444]'} focus:border-[#D4AF37] text-white rounded-md py-3 pl-11 pr-4 transition-colors outline-none`}
                    />
                  </div>
                  {errors.passengers && touched.passengers && <p className="text-[#ef4444] text-[12px] mt-1">{errors.passengers}</p>}
                </div>
              </div>

              {/* Special Requirements */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="block text-[#D4AF37] font-semibold">Special Requirements <span className="text-gray-400 font-normal text-sm">(Optional)</span></label>
                  <span className="text-xs text-gray-400">{formData.specialRequirements.length}/500</span>
                </div>
                <textarea 
                  name="specialRequirements"
                  maxLength={500}
                  rows={5}
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  placeholder="Any special preferences? (halal food, wheelchair access, family rooms, etc.)"
                  className="w-full bg-[#1a1a1a] border border-[#444] focus:border-[#D4AF37] text-white rounded-md py-3 px-4 transition-colors outline-none resize-none"
                />
              </div>

              {/* Terms */}
              <div className="flex items-center gap-3 mt-4">
                <input 
                  type="checkbox" 
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="termsCheck"
                  className="w-5 h-5 accent-[#D4AF37] cursor-pointer"
                />
                <label htmlFor="termsCheck" className="text-sm text-gray-300">
                  I agree to the <a href="/terms" className="text-[#D4AF37] hover:underline">terms and conditions</a> *
                </label>
              </div>
              {errors.terms && touched.terms && <p className="text-[#ef4444] text-[12px] mt-1">{errors.terms}</p>}

              {/* Submit */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#D4AF37] text-[#1a1a1a] font-bold py-4 rounded-md transition-colors hover:bg-[#D4AF37]/90 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Submit Consultation Request"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
