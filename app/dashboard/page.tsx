"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getMyConsultations } from "@/lib/api";
import { Consultation } from "@/types";
import { FiCalendar, FiMapPin, FiClock, FiArrowRight, FiPlus, FiUser } from "react-icons/fi";
import { GiCrown } from "react-icons/gi";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  reviewed: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  approved: "bg-green-500/10 text-green-400 border-green-500/30",
  rejected: "bg-red-500/10 text-red-400 border-red-500/30",
};

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) { router.push("/auth/login"); return; }
    setUser(JSON.parse(stored));

    getMyConsultations()
      .then((r) => setConsultations(r.data || []))
      .catch(() => setConsultations([]))
      .finally(() => setLoading(false));
  }, [router]);

  if (!user) return null;

  const stats = [
    { label: "Total Requests", value: consultations.length, emoji: "📋" },
    { label: "Pending", value: consultations.filter((c) => c.status === "pending").length, emoji: "⏳" },
    { label: "Approved", value: consultations.filter((c) => c.status === "approved").length, emoji: "✅" },
    { label: "Completed", value: consultations.filter((c) => c.status === "rejected").length, emoji: "❌" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GiCrown className="text-gold text-xl" />
              <span className="text-gold text-sm font-medium">My Dashboard</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">
              Welcome back, {user.name.split(" ")[0]}!
            </h1>
            <p className="text-silver-dark text-sm mt-1">
              Manage your travel consultations and bookings.
            </p>
          </div>
          <Link
            href="/consultation"
            className="flex items-center gap-2 bg-gold-gradient text-dark font-semibold px-5 py-3 rounded-full hover:shadow-gold transition-all text-sm"
          >
            <FiPlus /> New Consultation
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-card-gradient border border-dark-border rounded-2xl p-5 text-center hover:border-gold/30 transition-all">
              <div className="text-3xl mb-2">{s.emoji}</div>
              <div className="text-2xl font-bold text-gold font-serif">{s.value}</div>
              <div className="text-silver-dark text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Profile Card */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-card-gradient border border-dark-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <FiUser className="text-gold text-xl" />
              </div>
              <div>
                <div className="text-white font-semibold">{user.name}</div>
                <div className="text-silver-dark text-xs">{user.email}</div>
              </div>
            </div>
            <div className="border-t border-dark-border pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-silver-dark">Role</span>
                <span className="text-white capitalize">{user.role}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-silver-dark">Tier</span>
                <span className="text-gold font-medium">Crown Member</span>
              </div>
            </div>
            {user.role === "admin" && (
              <Link
                href="/dashboard/admin"
                className="mt-4 w-full flex items-center justify-center gap-2 border border-gold/40 text-gold text-sm font-medium py-2.5 rounded-xl hover:bg-gold/10 transition-all"
              >
                Admin Panel <FiArrowRight />
              </Link>
            )}
          </div>

          {/* Consultations */}
          <div className="lg:col-span-2 bg-card-gradient border border-dark-border rounded-2xl p-6">
            <h2 className="text-white font-semibold text-lg mb-5">My Consultation Requests</h2>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-dark-hover rounded-xl animate-pulse" />
                ))}
              </div>
            ) : consultations.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-3">✈️</div>
                <p className="text-white font-medium mb-1">No consultations yet</p>
                <p className="text-silver-dark text-sm mb-5">
                  Start planning your dream trip today!
                </p>
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 bg-gold-gradient text-dark font-semibold px-5 py-2.5 rounded-full text-sm"
                >
                  Book Consultation <FiArrowRight />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {consultations.map((c) => (
                  <div
                    key={c.id}
                    className="bg-dark border border-dark-border rounded-xl p-4 hover:border-gold/30 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h4 className="text-white font-medium text-sm">{c.serviceType}</h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-silver-dark">
                          <span className="flex items-center gap-1"><FiMapPin className="text-gold" />{c.destination}</span>
                          <span className="flex items-center gap-1"><FiCalendar className="text-gold" />{c.travelDate}</span>
                          <span className="flex items-center gap-1"><FiClock className="text-gold" />{c.duration}</span>
                        </div>
                      </div>
                      <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full border capitalize ${statusColors[c.status] || ""}`}>
                        {c.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
