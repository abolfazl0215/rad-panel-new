"use client";

import { Badge, Button } from "./UI";
import {
  Pencil,
  Trash2,
  Images,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
} from "lucide-react";

export default function ListingCard({
  item,
  onEdit,
  onDelete,
  onGallery,
}) {
  const thumb =
    item.images?.[0] ??
    `https://picsum.photos/seed/${item._id}/600/400`;

  return (
    <article className="group bg-ink-800 border border-ink-700 rounded-2xl overflow-hidden card-glow transition-all duration-300 animate-fade-in flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://picsum.photos/seed/${item._id}/600/400`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge label={item.listingType} />
          <Badge label={item.available} />
        </div>

        {item.images?.length > 1 && (
          <button
            onClick={onGallery}
            className="absolute top-3 right-3 flex items-center gap-1 bg-ink-950/80 border border-ink-600
                       rounded-lg px-2 py-1 text-[11px] text-slate-300 hover:text-gold-400
                       hover:border-gold-500/40 transition-all">
            <Images size={12} />
            {item.images.length}
          </button>
        )}

        <p className="absolute bottom-3 left-3 font-display text-xl font-bold text-white drop-shadow">
          {item.price && item.price.toLocaleString()}
          <span className="text-xs font-body text-slate-300 ml-1">
            AMD
          </span>
        </p>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display text-sm font-semibold text-white line-clamp-1 mb-1">
          {item.title}
        </h3>

        <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
          <MapPin size={11} className="text-gold-500/60 shrink-0" />
          <span className="truncate">
            {[item.district, item.region].filter(Boolean).join(", ")}
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-3 text-xs text-slate-400">
          {item.bedrooms != null && (
            <span className="flex items-center gap-1.5">
              <BedDouble size={12} className="text-ink-400" />
              {item.bedrooms}
            </span>
          )}
          {item.bathrooms != null && (
            <span className="flex items-center gap-1.5">
              <Bath size={12} className="text-ink-400" />
              {item.bathrooms}
            </span>
          )}
          {!!item.area && (
            <span className="flex items-center gap-1.5">
              <Maximize2 size={12} className="text-ink-400" />
              {item.area}m²
            </span>
          )}
          <Badge label={item.type} />
        </div>

        <div className="flex gap-2 mt-4 pt-3 border-t border-ink-700">
          <Button
            variant="ghost"
            size="sm"
            icon={<Pencil size={12} />}
            onClick={onEdit}
            className="flex-1">
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={<Trash2 size={12} />}
            onClick={onDelete}
            className="flex-1">
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
}
