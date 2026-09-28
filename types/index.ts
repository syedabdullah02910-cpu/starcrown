export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  duration: string;
  category: string;
  image: string;
  features: string[];
  destinations: string[];
  rating: number;
  reviewCount: number;
  popular: boolean;
}

export interface ConsultationData {
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDate: string;
  duration: string;
  travelers: number;
  budget: string;
  serviceType: string;
  message: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Consultation {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDate: string;
  duration: string;
  travelers: number;
  budget: string;
  serviceType: string;
  message: string;
  status: "pending" | "reviewed" | "approved" | "rejected";
  createdAt: string;
}

export interface DashboardStats {
  totalConsultations: number;
  pendingConsultations: number;
  approvedConsultations: number;
  totalUsers: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
