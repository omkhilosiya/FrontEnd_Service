import axios from "axios";
import { store } from "../app/store";
import { logout } from "../app/authSlice";

const BASE_URL = "https://backendservice-production-1032.up.railway.app";


export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/* 🔐 Attach JWT from localStorage */
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* 🚨 Handle Token Expiry / 401 */
axiosPrivate.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear redux + storage
      store.dispatch(logout());
      localStorage.clear();

      // Hard redirect (prevents back navigation)
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);
