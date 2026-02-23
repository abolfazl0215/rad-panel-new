"use client";

import { Badge, Button } from "./UI";
import { Pencil, Trash2, Images, MapPin, Star, Users, DoorOpen } from "lucide-react";
import clsx from "clsx";

const BADGE_CLR = {
  red:    "bg-red-500/10 text-red-400 border-red-500/20",
  blue:   "bg-sky-500/10 text-sky-400 border-sky-500/20",
  green:  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  gold:   "bg-gold-500/10 text-gold-400 border-gold-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function StayCard({ item, onEdit, onDelete, onGallery }) {
  const thumb    = item.images?.[0] ?? `https://picsum.photos/seed/${item._id}/600/400`;
  const badgeCls = BADGE_CLR[item.badgeColor] ?? "bg-gold-500/10 text-gold-400 border-gold-500/20";

  return (
    <article className="group bg-ink-800 border border-ink-700 rounded-2xl overflow-hidden card-glow transition-all duration-300 animate-fade-in flex flex-col">
      <div className="relative h-44 overflow-hidden shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb} alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = `https://picsum.photos/seed/${item._id}/600/400`; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent" />

        {item.badge && (
          <span className={clsx("absolute top-3 left-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border", badgeCls)}>
            {item.badge}
          </span>
        )}

        {!!item.stars && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-ink-950/80 border border-ink-600 rounded-lg px-2 py-1">
            <Star size={11} className="text-gold-400 fill-gold-400" />
            <span className="text-xs font-medium text-white">{item.stars}</span>
          </div>
        )}

        {item.images?.length > 1 && (
          <button onClick={onGallery}
            className="absolute bottom-3 right-3 flex items-center gap-1 bg-ink-950/80 border border-ink-600
                       rounded-lg px-2 py-1 text-[11px] text-slate-300 hover:text-gold-400
                       hover:border-gold-500/40 transition-all">
            <Images size={12} />{item.images.length}
          </button>
        )}

        <p className="absolute bottom-3 left-3 font-display text-xl font-bold text-white drop-shadow">
          {item.pricePerNight && item.pricePerNight.toLocaleString()}
          <span className="text-xs font-body text-slate-300 ml-1">AMD/night</span>
        </p>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display text-sm font-semibold text-white line-clamp-1 mb-1">{item.title}</h3>

        <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
          <MapPin size={11} className="text-gold-500/60 shrink-0" />
          <span className="truncate">{[item.district, item.region].filter(Boolean).join(", ")}</span>
        </div>

        <div className="flex items-center flex-wrap gap-3 text-xs text-slate-400">
          {!!item.guests && <span className="flex items-center gap-1.5"><Users    size={12} className="text-ink-400" />{item.guests}</span>}
          {!!item.rooms  && <span className="flex items-center gap-1.5"><DoorOpen size={12} className="text-ink-400" />{item.rooms}</span>}
          {item.rating   && <span className="flex items-center gap-1 text-gold-400 font-medium"><Star size={11} className="fill-gold-400" />{item.rating}</span>}
          <Badge label={item.type} />
        </div>

        {(item.checkIn || item.checkOut) && (
          <p className="text-xs text-slate-500 mt-2">
            {item.checkIn  && <>In: <span className="text-slate-400">{item.checkIn}</span></>}
            {item.checkIn && item.checkOut && " · "}
            {item.checkOut && <>Out: <span className="text-slate-400">{item.checkOut}</span></>}
          </p>
        )}

        <div className="flex gap-2 mt-4 pt-3 border-t border-ink-700">
          <Button variant="ghost"  size="sm" icon={<Pencil size={12} />} onClick={onEdit}   className="flex-1">Edit</Button>
          <Button variant="danger" size="sm" icon={<Trash2 size={12} />} onClick={onDelete} className="flex-1">Delete</Button>
        </div>
      </div>
    </article>
  );
}
