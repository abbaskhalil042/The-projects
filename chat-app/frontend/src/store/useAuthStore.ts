import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import axios from "axios";

interface AuthUser {
    name: string;
  id: string;
  email: string;
  username: string;
  profile: string;
}

export interface AuthStore {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signup: (data: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: string) => Promise<void>; // Add updateProfile methoddata: { profile: string }) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      // Rename `username` to `name`
      const payload = {
        name: data.username,
        email: data.email,
        password: data.password,
      };
      console.log("Payload:", payload); // Debugging

      const response = await axiosInstance.post("/auth/signup", payload);
      console.log("from auth store", response.data);
      set({ authUser: response.data });
      toast.success("Account created successfully");
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };
      const response = await axiosInstance.post("/auth/login", payload);
      console.log("from auth store", response.data);
      set({ authUser: response.data });
      toast.success("Logged in successfully");
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/auth/update-profile", {
        profile: data,
      });
      console.log("from auth store", response.data);
      set({ authUser: response.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
      console.log("from auth store", response.data);
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
