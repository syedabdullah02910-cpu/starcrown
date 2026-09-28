"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight, FiCheck } from "react-icons/fi";
import { GiCrown } from "react-icons/gi";
import { registerUser } from "@/lib/api";

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const benefits = [
  "Exclusive member-only travel deals",
  "Dedicated personal travel concierge",
  "Priority booking & early access",
  "Loyalty rewards on every trip",
];

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      const res = await registerUser(data);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || "Registration failed. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center py-24 px-4">
      <div className="fixed top-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Panel */}
        <div className="hidden lg:block animate-slide-in-left">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <GiCrown className="text-gold text-4xl" />
            <div>
              <span className="font-serif text-2xl font-bold text-gold block">Star Crown</span>
              <span className="text-silver-dark text-xs tracking-widest uppercase">Travel</span>
            </div>
          </Link>
          <h2 className="font-serif text-4xl font-bold text-white mb-4">
            Join the Crown <br /> <span className="text-gold">Experience</span>
          </h2>
          <p className="text-silver-dark text-sm leading-relaxed mb-8">
            Create your account to unlock exclusive travel packages, personalized concierge services,
            and a world of luxury experiences tailored just for you.
          </p>
          <div className="space-y-4">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <FiCheck className="text-gold text-xs" />
                </div>
                <span className="text-silver text-sm">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Panel */}
        <div className="animate-slide-in-right">
          <div className="lg:hidden text-center mb-8">
            <GiCrown className="text-gold text-5xl mx-auto mb-2" />
            <span className="font-serif text-2xl font-bold text-gold">Star Crown Travel</span>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-3xl p-8 shadow-card">
            <h1 className="font-serif text-2xl font-bold text-white mb-1">Create Account</h1>
            <p className="text-silver-dark text-sm mb-7">Start your luxury travel journey today.</p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-5">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-silver text-sm font-medium mb-1.5">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-silver-dark" />
                  <input {...register("name")} type="text" placeholder="John Smith"
                    className="w-full bg-dark border border-dark-border rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-silver-dark text-sm focus:outline-none focus:border-gold transition-colors" />
                </div>
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-silver text-sm font-medium mb-1.5">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-silver-dark" />
                  <input {...register("email")} type="email" placeholder="you@example.com"
                    className="w-full bg-dark border border-dark-border rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-silver-dark text-sm focus:outline-none focus:border-gold transition-colors" />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-silver text-sm font-medium mb-1.5">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-silver-dark" />
                  <input {...register("password")} type={showPass ? "text" : "password"} placeholder="Min. 8 characters"
                    className="w-full bg-dark border border-dark-border rounded-xl pl-11 pr-12 py-3.5 text-white placeholder-silver-dark text-sm focus:outline-none focus:border-gold transition-colors" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-silver-dark hover:text-gold">
                    {showPass ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-silver text-sm font-medium mb-1.5">Confirm Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-silver-dark" />
                  <input {...register("confirmPassword")} type={showConfirm ? "text" : "password"} placeholder="Re-enter password"
                    className="w-full bg-dark border border-dark-border rounded-xl pl-11 pr-12 py-3.5 text-white placeholder-silver-dark text-sm focus:outline-none focus:border-gold transition-colors" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-silver-dark hover:text-gold">
                    {showConfirm ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
              </div>

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gold-gradient text-dark font-bold py-4 rounded-xl hover:opacity-90 hover:shadow-gold transition-all duration-300 disabled:opacity-60 mt-2">
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-dark" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                ) : (
                  <> Create My Account <FiArrowRight /> </>
                )}
              </button>
            </form>

            <p className="text-center text-silver-dark text-sm mt-6">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-gold hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
