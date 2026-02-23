import { create } from "zustand";
import toast from "react-hot-toast";
import { listingsApi, staysApi } from "@/lib/api";

function makeStore(api, label) {
  return create((set, get) => ({
    items:   [],
    total:   0,
    page:    1,
    limit:   12,
    loading: false,
    acting:  false,
    filters: {},

    fetch: async (extra = {}) => {
      set({ loading: true });
      try {
        const { page, limit, filters } = get();
        const res = await api.getAll({ page, limit, ...filters, ...extra });
        set({ items: res.data.data, total: res.data.total, loading: false });
      } catch {
        toast.error(`Failed to load ${label}s`);
        set({ loading: false });
      }
    },

    create: async (data) => {
      set({ acting: true });
      try {
        await api.create(data);
        toast.success(`${label} created!`);
        set({ acting: false, page: 1 });
        get().fetch();
        return true;
      } catch (e) {
        toast.error(e?.response?.data?.error ?? "Create failed");
        set({ acting: false });
        return false;
      }
    },

    update: async (id, data) => {
      set({ acting: true });
      try {
        await api.update(id, data);
        toast.success(`${label} updated!`);
        set({ acting: false });
        get().fetch();
        return true;
      } catch (e) {
        toast.error(e?.response?.data?.error ?? "Update failed");
        set({ acting: false });
        return false;
      }
    },

    remove: async (id) => {
      set({ acting: true });
      try {
        await api.remove(id);
        toast.success(`${label} deleted`);
        set((s) => ({ items: s.items.filter((i) => i._id !== id), acting: false }));
        return true;
      } catch {
        toast.error("Delete failed");
        set({ acting: false });
        return false;
      }
    },

    setPage:    (p) => set({ page: p }),
    setFilters: (f) => set({ filters: f, page: 1 }),
  }));
}

export const useListings = makeStore(listingsApi, "Listing");
export const useStays    = makeStore(staysApi,    "Stay");
