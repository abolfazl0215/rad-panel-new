"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button, Select } from "./UI";
import clsx from "clsx";

const REGIONS = [
  "Yerevan",
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

export default function FilterBar({ type, onChange }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({});

  const update = (key, val) => {
    const next = { ...filters, [key]: val };
    if (!val) delete next[key];
    setFilters(next);
    onChange(search ? { ...next, region: search } : next);
  };

  const handleSearch = (v) => {
    setSearch(v);
    onChange(v ? { ...filters, region: v } : { ...filters });
  };

  const clear = () => {
    setSearch("");
    setFilters({});
    onChange({});
  };
  const count = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5">
        {/* Search */}
        <div className="relative flex-1">
          {/* <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" /> */}
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={`Search ${type}…`}
            className="field pl-9 pr-8 w-full"
          />
          {search && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-white transition-colors">
              <X size={13} />
            </button>
          )}
        </div>

        <div className="flex gap-2 sm:gap-2.5">
          <Button
            variant={open ? "primary" : "ghost"}
            size="md"
            icon={<SlidersHorizontal size={14} />}
            onClick={() => setOpen((o) => !o)}
            className="flex-1 sm:flex-none">
            Filters
            {count > 0 && (
              <span className="ml-0.5 bg-ink-950 text-gold-400 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </Button>

          {(count > 0 || search) && (
            <Button
              variant="outline"
              size="md"
              icon={<X size={13} />}
              onClick={clear}
              className="flex-1 sm:flex-none">
              Clear
            </Button>
          )}
        </div>
      </div>

      {open && (
        <div
          className={clsx(
            "bg-ink-800 border border-ink-700 rounded-2xl p-4 grid gap-3 animate-fade-in",
            type === "listings"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          )}>
          <Select
            label="Region"
            value={filters.region ?? ""}
            onChange={(e) => update("region", e.target.value)}
            options={REGIONS.map((r) => ({ value: r, label: r }))}
          />

          {type === "listings" ? (
            <>
              <Select
                label="Type"
                value={filters.type ?? ""}
                onChange={(e) => update("type", e.target.value)}
                options={[
                  "apartment",
                  "house",
                  "commercial",
                  "land",
                  "other",
                ].map((v) => ({
                  value: v,
                  label: v[0].toUpperCase() + v.slice(1),
                }))}
              />
              <Select
                label="Listing Type"
                value={filters.listingType ?? ""}
                onChange={(e) =>
                  update("listingType", e.target.value)
                }
                options={[
                  { value: "rent", label: "Rent" },
                  { value: "sale", label: "Sale" },
                ]}
              />
              <Select
                label="Availability"
                value={filters.available ?? ""}
                onChange={(e) => update("available", e.target.value)}
                options={["available", "rented", "sold"].map((v) => ({
                  value: v,
                  label: v[0].toUpperCase() + v.slice(1),
                }))}
              />
            </>
          ) : (
            <>
              <Select
                label="Type"
                value={filters.type ?? ""}
                onChange={(e) => update("type", e.target.value)}
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
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
                    Min ֏
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={filters.minPrice ?? ""}
                    placeholder="0"
                    onChange={(e) =>
                      update("minPrice", e.target.value)
                    }
                    className="field"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
                    Max ֏
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={filters.maxPrice ?? ""}
                    placeholder="∞"
                    onChange={(e) =>
                      update("maxPrice", e.target.value)
                    }
                    className="field"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
