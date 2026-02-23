"use client";

import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const fallback = (i) => `https://picsum.photos/seed/img${i}/800/500`;

export default function ImageGallery({ images, isOpen, onClose, title }) {
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 modal-bg z-[90] flex items-center justify-center p-4">
      <div className="bg-ink-900 border border-ink-700 rounded-2xl w-full max-w-3xl overflow-hidden animate-fade-in shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-700">
          <h3 className="font-display text-sm font-semibold text-white">{title ?? "Gallery"}</h3>
          <button onClick={onClose}
            className="w-8 h-8 rounded-xl bg-ink-700 hover:bg-ink-600 flex items-center justify-center transition-colors">
            <X size={15} className="text-slate-400" />
          </button>
        </div>

        {/* Swiper */}
        <div className="relative p-4">
          {images.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={{ prevEl: ".g-prev", nextEl: ".g-next" }}
              pagination={{ clickable: true, dynamicBullets: true }}
              loop={images.length > 1}
              style={{ height: 360, borderRadius: 12, overflow: "hidden" }}
            >
              {images.map((src, i) => (
                <SwiperSlide key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = fallback(i); }} />
                </SwiperSlide>
              ))}
              <button className="g-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 glass
                                 rounded-full border border-ink-600 flex items-center justify-center
                                 hover:border-gold-500/40 transition-all">
                <ChevronLeft size={17} />
              </button>
              <button className="g-next absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 glass
                                 rounded-full border border-ink-600 flex items-center justify-center
                                 hover:border-gold-500/40 transition-all">
                <ChevronRight size={17} />
              </button>
            </Swiper>
          ) : (
            <div className="h-64 rounded-xl bg-ink-800 flex items-center justify-center text-slate-500 text-sm">
              No images
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 px-4 pb-4 overflow-x-auto">
            {images.slice(0, 10).map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt=""
                className="w-14 h-10 object-cover rounded-lg border border-ink-600 hover:border-gold-500/40 transition-all shrink-0"
                onError={(e) => { e.target.src = fallback(i); }} />
            ))}
            {images.length > 10 && (
              <div className="w-14 h-10 rounded-lg border border-ink-600 bg-ink-700
                              flex items-center justify-center text-xs text-slate-400 shrink-0">
                +{images.length - 10}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
