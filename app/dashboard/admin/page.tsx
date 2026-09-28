"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getConsultations, getUsers, updateConsultationStatus, getDashboardStats } from "@/lib/api";
import { Consultation, User, DashboardStats } from "@/types";
import { FiCheck, FiX, FiUsers, FiFileText, FiClock, FiRefreshCw } from "react-icons/fi";
import { GiCrown } from "react-icons/gi";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  reviewed: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  approved: "bg-green-500/10 text-green-400 border-green-500/30",
  rejected: "bg-red-500/10 text-red-400 border-red-500/30",
};

const MOCK_CONSULTATIONS: Consultation[] = [
  { id: "1", userId: "u1", name: "John Smith", email: "john@example.com", phone: "+1234567890", destination: "Maldives", travelDate: "2025-03-15", duration: "1 Week", travelers: 2, budget: "$5,000–$10,000", serviceType: "Luxury Tours", message: "Honeymoon trip", status: "pending", createdAt: "2025-01-10" },
  { id: "2", userId: "u2", name: "Sarah Lee", email: "sarah@example.com", phone: "+9876543210", destination: "Paris", travelDate: "2025-04-20", duration: "5 Days", travelers: 2, budget: "$2,000–$5,000", serviceType: "Honeymoon Package", message: "Anniversary trip", status: "approved", createdAt: "2025-01-12" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"consultations" | "users">("consultations");
  const [consultations, setConsultations] = useState<Consultation[]>(MOCK_CONSULTATIONS);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) { router.push("/auth/login"); return; }
    const user = JSON.parse(stored);
    if (user.role !== "admin") { router.push("/dashboard"); return; }

    Promise.allSettled([
      getDashboardStats().then((r) => setStats(r.data)),
      getConsultations().then((r) => { if (r.data?.length) setConsultations(r.data); }),
      getUsers().then((r) => setUsers(r.data || [])),
    ]).finally(() => setLoading(false));
  }, [router]);

  const handleStatusChange = async (id: string, status: string) => {
    setUpdating(id);
    try {
      await updateConsultationStatus(id, status);
      setConsultations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: status as Consultation["status"] } : c))
      );
    } catch {
      // local update on error
      setConsultations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: status as Consultation["status"] } : c))
      );
    } finally {
      setUpdating(null);
    }
  };

  const statCards = [
    { label: "Total Consultations", value: stats?.totalConsultations ?? consultations.length, icon: FiFileText, emoji: "📋" },
    { label: "Pending", value: stats?.pendingConsultations ?? consultations.filter((c) => c.status === "pending").length, icon: FiClock, emoji: "⏳" },
    { label: "Approved", value: stats?.approvedConsultations ?? consultations.filter((c) => c.status === "approved").length, icon: FiCheck, emoji: "✅" },
    { label: "Total Users", value: stats?.totalUsers ?? users.length, icon: FiUsers, emoji: "👥" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <GiCrown className="text-gold text-2xl" />
          <span className="text-gold text-sm font-medium">Admin Panel</span>
        </div>
        <h1 className="font-serif text-4xl font-bold text-white mb-2">Control Center</h1>
        <p className="text-silver-dark text-sm mb-10">Manage consultations, bookings, and user accounts.</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {statCards.map((s) => (
            <div key={s.label} className="bg-card-gradient border border-dark-border rounded-2xl p-5 text-center hover:border-gold/30 transition-all">
              <div className="text-3xl mb-2">{s.emoji}</div>
              <div className="text-2xl font-bold text-gold font-serif">{s.value}</div>
              <div className="text-silver-dark text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["consultations", "users"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium capitalize transition-all ${
                activeTab === tab
                  ? "bg-gold-gradient text-dark"
                  : "border border-dark-border text-silver-dark hover:border-gold/40 hover:text-gold"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Consultations Tab */}
        {activeTab === "consultations" && (
          <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-dark-border flex justify-between items-center">
              <h2 className="text-white font-semibold">Consultation Requests</h2>
              <span className="text-silver-dark text-xs">{consultations.length} total</span>
            </div>
            {loading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-dark-hover rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="divide-y divide-dark-border">
                {consultations.map((c) => (
                  <div key={c.id} className="px-6 py-5 hover:bg-dark-hover transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-white font-medium">{c.name}</span>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full border capitalize ${statusColors[c.status]}`}>
                            {c.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-silver-dark">
                          <span>📧 {c.email}</span>
                          <span>📍 {c.destination}</span>
                          <span>🗓️ {c.travelDate}</span>
                          <span>👥 {c.travelers} travelers</span>
                          <span>💰 {c.budget}</span>
                        </div>
                        <p className="text-silver-dark text-xs mt-1 line-clamp-1">
                          {c.serviceType} – {c.message}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {c.status !== "approved" && (
                          <button
                            onClick={() => handleStatusChange(c.id, "approved")}
                            disabled={updating === c.id}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs rounded-lg hover:bg-green-500/20 transition-all disabled:opacity-50"
                          >
                            {updating === c.id ? <FiRefreshCw className="animate-spin" /> : <FiCheck />}
                            Approve
                          </button>
                        )}
                        {c.status !== "rejected" && (
                          <button
                            onClick={() => handleStatusChange(c.id, "rejected")}
                            disabled={updating === c.id}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg hover:bg-red-500/20 transition-all disabled:opacity-50"
                          >
                            <FiX /> Reject
                          </button>
                        )}
                        {c.status !== "reviewed" && c.status !== "approved" && (
                          <button
                            onClick={() => handleStatusChange(c.id, "reviewed")}
                            disabled={updating === c.id}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs rounded-lg hover:bg-blue-500/20 transition-all disabled:opacity-50"
                          >
                            Mark Reviewed
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-dark-border flex justify-between items-center">
              <h2 className="text-white font-semibold">User Accounts</h2>
              <span className="text-silver-dark text-xs">{users.length} registered</span>
            </div>
            {users.length === 0 ? (
              <div className="p-10 text-center">
                <div className="text-5xl mb-3">👥</div>
                <p className="text-white font-medium mb-1">No users loaded</p>
                <p className="text-silver-dark text-sm">Connect to the backend API to view users.</p>
              </div>
            ) : (
              <div className="divide-y divide-dark-border">
                {users.map((u) => (
                  <div key={u.id} className="px-6 py-4 hover:bg-dark-hover transition-colors flex items-center justify-between">
                    <div>
                      <div className="text-white text-sm font-medium">{u.name}</div>
                      <div className="text-silver-dark text-xs">{u.email}</div>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full border capitalize ${
                      u.role === "admin"
                        ? "bg-gold/10 text-gold border-gold/30"
                        : "bg-dark border-dark-border text-silver-dark"
                    }`}>
                      {u.role}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
