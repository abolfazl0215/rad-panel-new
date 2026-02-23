"use client";

import { useEffect, useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { useStays } from "../store";
import {
  Button,
  Input,
  Textarea,
  Select,
  TagInput,
  SectionDivider,
} from "./UI";

const ARMENIAN_REGIONS = [
  "Yerevan",
  "Aragatsotn",
  "Ararat",
  "Armavir",
  "Gegharkunik",
  "Kotayk",
  "Lori",
  "Shirak",
  "Syunik",
  "Tavush",
  "Vayots Dzor",
];

const YEREVAN_DISTRICTS = [
  "Ajapnyak",
  "Arabkir",
  "Avan",
  "Davtashen",
  "Erebuni",
  "Kentron",
  "Malatia-Sebastia",
  "Nor Nork",
  "Nork-Marash",
  "Nubarashen",
  "Shengavit",
  "Zeytun",
];

const EMPTY = {
  title: "",
  region: "",
  district: "",
  type: "hotel",
  stars: 3,
  pricePerNight: 0,
  guests: 2,
  rooms: 1,
  area: 0,
  floor: 0,
  totalFloors: 0,
  address: "",
  rating: "",
  reviewCount: 0,
  description: "",
  features: [],
  amenities: [],
  images: [],
  breakfast: "",
  cancellation: "",
  checkIn: "14:00",
  checkOut: "12:00",
  badge: "",
  badgeColor: "",
};

export default function StayForm({ isOpen, onClose, editing }) {
  const { create, update, acting } = useStays();
  const [f, setF] = useState({ ...EMPTY });

  useEffect(() => {
    setF(editing ? { ...editing } : { ...EMPTY });
  }, [editing, isOpen]);

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  // When region changes, clear district if not Yerevan
  const handleRegionChange = (e) => {
    const newRegion = e.target.value;
    set("region", newRegion);
    if (newRegion !== "Yerevan") {
      set("district", "");
    }
  };

  // Image URL management
  const addImageUrl = () => {
    setF((p) => ({ ...p, images: [...p.images, ""] }));
  };

  const updateImageUrl = (index, value) => {
    setF((p) => ({
      ...p,
      images: p.images.map((img, i) => (i === index ? value : img)),
    }));
  };

  const removeImageUrl = (index) => {
    setF((p) => ({
      ...p,
      images: p.images.filter((_, i) => i !== index),
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    // Filter out empty image URLs before submitting
    const cleanedData = {
      ...f,
      images: f.images.filter((url) => url.trim() !== ""),
    };
    const ok = editing
      ? await update(editing._id, cleanedData)
      : await create(cleanedData);
    if (ok) onClose();
  };

  if (!isOpen) return null;

  const isYerevan = f.region === "Yerevan";

  return (
    <div className="fixed inset-0 modal-bg z-[80] flex items-center justify-center p-2 sm:p-4">
      <div className="bg-ink-900 border border-ink-700 rounded-2xl w-full max-w-2xl max-h-[96vh] sm:max-h-[92vh] overflow-y-auto animate-fade-in shadow-2xl">
        <div className="sticky top-0 z-10 bg-ink-900/95 backdrop-blur border-b border-ink-700 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-base sm:text-lg font-bold text-white truncate">
              {editing ? "Edit Stay" : "New Stay"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              {editing
                ? `_id: ${editing._id}`
                : "Fields marked * are required"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-ink-700 hover:bg-ink-600 flex items-center justify-center transition-colors shrink-0 ml-2">
            <X size={15} className="text-slate-400" />
          </button>
        </div>

        <form
          onSubmit={submit}
          className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          <SectionDivider label="Basic Info" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="col-span-1 sm:col-span-2">
              <Input
                label="Title *"
                required
                value={f.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. Grand Palace Hotel"
              />
            </div>
            <Select
              label="Region *"
              required
              value={f.region}
              onChange={handleRegionChange}
              options={ARMENIAN_REGIONS.map((r) => ({
                value: r,
                label: r,
              }))}
            />
            <Select
              label="District"
              value={f.district}
              onChange={(e) => set("district", e.target.value)}
              disabled={!isYerevan}
              options={
                isYerevan
                  ? YEREVAN_DISTRICTS.map((d) => ({
                      value: d,
                      label: d,
                    }))
                  : [{ value: "", label: "Select region first" }]
              }
            />
            <Select
              label="Type *"
              value={f.type}
              onChange={(e) => set("type", e.target.value)}
              options={[
                "hotel",
                "resort",
                "hostel",
                "villa",
                "apartment",
                "other",
              ].map((v) => ({
                value: v,
                label: v[0].toUpperCase() + v.slice(1),
              }))}
            />
            <Input
              label="Stars"
              type="number"
              min={1}
              max={5}
              value={f.stars || ""}
              onChange={(e) => set("stars", +e.target.value)}
              placeholder="1–5"
            />
            <Input
              label="Price / Night (AMD) *"
              type="number"
              min={0}
              required
              value={f.pricePerNight || ""}
              onChange={(e) => set("pricePerNight", +e.target.value)}
            />
            <Input
              label="Max Guests"
              type="number"
              min={1}
              value={f.guests || ""}
              onChange={(e) => set("guests", +e.target.value)}
            />
          </div>

          <SectionDivider label="Details" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Input
              label="Rooms"
              type="number"
              min={1}
              value={f.rooms || ""}
              onChange={(e) => set("rooms", +e.target.value)}
            />
            <Input
              label="Area m²"
              type="number"
              min={0}
              value={f.area || ""}
              onChange={(e) => set("area", +e.target.value)}
            />
            <Input
              label="Floor"
              type="number"
              value={f.floor || ""}
              onChange={(e) => set("floor", +e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Rating"
              value={f.rating || ""}
              onChange={(e) => set("rating", e.target.value)}
              placeholder="4.5/5"
            />
            <Input
              label="Review Count"
              type="number"
              min={0}
              value={f.reviewCount || ""}
              onChange={(e) => set("reviewCount", +e.target.value)}
            />
          </div>
          <Input
            label="Address"
            value={f.address}
            onChange={(e) => set("address", e.target.value)}
          />
          <Textarea
            label="Description"
            value={f.description}
            onChange={(e) => set("description", e.target.value)}
            rows={3}
          />

          <SectionDivider label="Policies" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="Check-In"
              value={f.checkIn}
              onChange={(e) => set("checkIn", e.target.value)}
              placeholder="14:00"
            />
            <Input
              label="Check-Out"
              value={f.checkOut}
              onChange={(e) => set("checkOut", e.target.value)}
              placeholder="12:00"
            />
            <Input
              label="Breakfast"
              value={f.breakfast}
              onChange={(e) => set("breakfast", e.target.value)}
              placeholder="Included"
            />
          </div>
          <Input
            label="Cancellation Policy"
            value={f.cancellation}
            onChange={(e) => set("cancellation", e.target.value)}
            placeholder="Free until 48h"
          />

          <SectionDivider label="Badge" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Badge Text"
              value={f.badge}
              onChange={(e) => set("badge", e.target.value)}
              placeholder="Most Popular"
            />
            <Select
              label="Badge Color"
              value={f.badgeColor}
              onChange={(e) => set("badgeColor", e.target.value)}
              options={["red", "blue", "green", "gold", "purple"].map(
                (v) => ({
                  value: v,
                  label: v[0].toUpperCase() + v.slice(1),
                }),
              )}
            />
          </div>

          <SectionDivider label="Tags & Media" />
          <TagInput
            label="Features"
            value={f.features}
            onChange={(v) => set("features", v)}
            placeholder="Ocean view, Balcony…"
          />
          <TagInput
            label="Amenities"
            value={f.amenities}
            onChange={(v) => set("amenities", v)}
            placeholder="Free Wi-Fi, Pool…"
          />

          {/* Image URLs Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-slate-400">
                Image URLs
              </label>
              <button
                type="button"
                onClick={addImageUrl}
                className="flex items-center gap-1 px-2 py-1 text-xs rounded-lg bg-ink-700 hover:bg-ink-600 text-slate-300 transition-colors">
                <Plus size={14} />
                Add Image
              </button>
            </div>

            {f.images.length === 0 ? (
              <div className="text-xs text-slate-500 text-center py-4 border border-dashed border-ink-700 rounded-lg">
                No images added yet. Click "Add Image" to start.
              </div>
            ) : (
              <div className="space-y-2">
                {f.images.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={url}
                      onChange={(e) =>
                        updateImageUrl(index, e.target.value)
                      }
                      placeholder={`Image URL ${index + 1}`}
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeImageUrl(index)}
                      className="w-9 h-9 rounded-lg bg-red-900/20 hover:bg-red-900/30 border border-red-800/30 flex items-center justify-center transition-colors shrink-0"
                      title="Remove image">
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-2.5 pt-2 border-t border-ink-700">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={acting}
              className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              type="submit"
              loading={acting}
              className="w-full sm:w-auto">
              {editing ? "Save Changes" : "Create Stay"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
