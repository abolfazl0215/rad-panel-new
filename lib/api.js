import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://rad-back.onrender.com",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

const crud = (base) => ({
  getAll: (params) => api.get(base, { params }),
  getOne: (id) => api.get(`${base}/${id}`),
  create: (data) => api.post(base, data),
  update: (id, data) => api.put(`${base}/${id}`, data),
  remove: (id) => api.delete(`${base}/${id}`),
});

export const listingsApi = crud("/api/listings");
export const staysApi = crud("/api/staysOneNight");

export default api;
