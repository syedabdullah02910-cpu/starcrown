import api from "./axios";
import { LoginData, RegisterData, ConsultationData } from "@/types";

// Auth
export const loginUser = (data: LoginData) => api.post("/auth/login", data);
export const registerUser = (data: RegisterData) => api.post("/auth/register", data);
export const logoutUser = () => api.post("/auth/logout");
export const getMe = () => api.get("/auth/me");

// Services
export const getServices = () => api.get("/services");
export const getServiceById = (id: string) => api.get(`/services/${id}`);

// Consultation
export const submitConsultation = (data: ConsultationData) =>
  api.post("/consultations", data);
export const getConsultations = () => api.get("/consultations");
export const getMyConsultations = () => api.get("/consultations/me");
export const updateConsultationStatus = (id: string, status: string) =>
  api.patch(`/consultations/${id}/status`, { status });

// Dashboard
export const getDashboardStats = () => api.get("/dashboard/stats");
export const getUsers = () => api.get("/users");
export const updateUserRole = (id: string, role: string) =>
  api.patch(`/users/${id}/role`, { role });
