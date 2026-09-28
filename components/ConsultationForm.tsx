"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { FiSend, FiCheck } from "react-icons/fi";
import { submitConsultation } from "@/lib/api";
import { ConsultationData } from "@/types";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  destination: z.string().min(2, "Please enter a destination"),
  travelDate: z.string().min(1, "Please select a travel date"),
  duration: z.string().min(1, "Please select duration"),
  travelers: z.number().min(1).max(50),
  budget: z.string().min(1, "Please select a budget range"),
  serviceType: z.string().min(1, "Please select a service type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const serviceTypes = [
  "Luxury Tours",
  "Honeymoon Package",
  "Corporate Travel",
  "Adventure Travel",
  "Group Tour",
  "Custom Itinerary",
];

const budgets = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $20,000",
  "$20,000+",
];

const durations = [
  "3-5 Days",
  "1 Week",
  "2 Weeks",
  "3 Weeks",
  "1 Month",
  "Custom",
];

export default function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<FormData>({ resolver: zodResolver(schema) as any });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      await submitConsultation(data as ConsultationData);
      setSubmitted(true);
      reset();
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || "Failed to submit. Please try again.");
      } else {
        setError("Failed to submit. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mb-6 animate-pulse-gold">
          <FiCheck className="text-gold text-4xl" />
        </div>
        <h3 className="text-2xl font-serif text-white font-bold mb-2">
          Request Submitted!
        </h3>
        <p className="text-silver-dark text-base max-w-md mb-6">
          Our travel experts will review your request and contact you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-gold border border-gold/40 px-6 py-2.5 rounded-full hover:bg-gold/10 transition-all text-sm font-medium"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {/* Contact Info Header */}
      <div className="bg-dark/50 border border-gold/20 rounded-xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-silver">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="text-gold text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path></svg>
          </div>
          <div>
            <p className="text-xs text-silver-dark uppercase tracking-wide">Call us</p>
            <a href="tel:03099961987" className="font-medium text-white hover:text-gold transition-colors">03099961987</a>
          </div>
        </div>
        
        <div className="h-px sm:h-10 w-full sm:w-px bg-dark-border"></div>
        
        <div className="flex items-center gap-3 text-silver">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="text-gold text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <div>
            <p className="text-xs text-silver-dark uppercase tracking-wide">Visit us</p>
            <p className="font-medium text-white text-sm">418-B, Khurram Plaza,<br/>Chandni Chowk, Rawalpindi</p>
          </div>
        </div>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-silver text-sm font-medium mb-1.5">
            Full Name *
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="John Smith"
            className="w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-white placeholder-silver-dark text-sm focus:outline-none focus:border-gold transition-colors"
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-silver text-sm font-medium mb-1.5">
            Email Address *
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="john@example.com"
            className="w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-white placeholder-silver-dark text-sm focus:outline-none focus:border-gold transition-colors"
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-silver text-sm font-medium mb-1.5">
            Phone Number *
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+1 234 567 8900"
            className="w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-white placeholder-silver-dark text-sm focus:outline-none focus:border-gold transition-colors"
          />
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label className="block text-silver text-sm font-medium mb-1.5">
            Dream Destination *
          </label>
          <input
            {...register("destination")}
            type="text"
            placeholder="Maldives, Paris, Tokyo..."
            className="w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-white placeholder-silver-dark text-sm focus:outline-none focus:border-gold transition-colors"
          />
          {errors.destination && (
            <p className="text-red-400 text-xs mt-1">{errors.destination.message}</p>
          )}
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block text-silver text-sm font-medium mb-1.5">
            Travel Date *
          </label>
          <input
            {...register("travelDate")}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold transition-colors"
          />
          {errors.travelDate && (
            <p className="text-red-400 text-xs mt-1">{errors.travelDate.message}</p>
          )}
        </div>
        <div>
          <label className="block text-silver text-sm font-medium mb-1.5">
            Duration *
          </label>
          <select
            {...register("duration")}
            className="w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold transition-colors"
          >
            <option value="">Select duration</option>
            {durations.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {errors.duration && (
            <p className="text-red-400 text-xs mt-1">{errors.duration.message}</p>
          )}
        </div>
        <div>
          <label className="block text-silver text-sm font-medium mb-1.5">
            Travelers *
          </label>
          <input
            {...register("travelers", { valueAsNumber: true })}
            type="number"
            min={1}
            max={50}
            placeholder="2"
            className="w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-white placeholder-silver-dark text-sm focus:outline-none focus:border-gold transition-colors"
          />
          {errors.travelers && (
            <p className="text-red-400 text-xs mt-1">{errors.travelers.message}</p>
          )}
        </div>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-silver text-sm font-medium mb-1.5">
            Budget Range *
          </label>
          <select
            {...register("budget")}
            className="w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold transition-colors"
          >
            <option value="">Select budget</option>
            {budgets.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errors.budget && (
            <p className="text-red-400 text-xs mt-1">{errors.budget.message}</p>
          )}
        </div>
        <div>
          <label className="block text-silver text-sm font-medium mb-1.5">
            Service Type *
          </label>
          <select
            {...register("serviceType")}
            className="w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold transition-colors"
          >
            <option value="">Select service</option>
            {serviceTypes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.serviceType && (
            <p className="text-red-400 text-xs mt-1">{errors.serviceType.message}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-silver text-sm font-medium mb-1.5">
          Special Requests / Message *
        </label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Tell us about your dream vacation, special requirements, dietary needs, accessibility needs..."
          className="w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-white placeholder-silver-dark text-sm focus:outline-none focus:border-gold transition-colors resize-none"
        />
        {errors.message && (
          <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-gold-gradient text-dark font-bold py-4 rounded-xl hover:opacity-90 hover:shadow-gold-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-base"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-dark" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Submitting...
          </span>
        ) : (
          <>
            <FiSend className="text-lg" />
            Send Consultation Request
          </>
        )}
      </button>
    </form>
  );
}
