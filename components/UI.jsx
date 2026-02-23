"use client";

import { useState } from "react";
import {
  Loader2,
  X,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";

/* ── Spinner ──────────────────────────────────────────── */
export function Spinner({ size = 18, className = "" }) {
  return (
    <Loader2
      size={size}
      className={clsx("animate-spin text-gold-400", className)}
    />
  );
}

/* ── Button ───────────────────────────────────────────── */
const BV = {
  primary:
    "bg-gold-500 hover:bg-gold-400 active:bg-gold-600 text-ink-950 font-semibold shadow-lg shadow-gold-500/20",
  ghost:
    "bg-ink-700 hover:bg-ink-600 text-white border border-ink-600 hover:border-ink-500",
  danger:
    "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40",
  outline:
    "border border-ink-600 hover:border-gold-500/40 text-slate-300 hover:text-white",
};
const BS = {
  xs: "px-2.5 py-1 text-[11px] gap-1.5",
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-5 py-2.5 text-sm gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  icon,
  children,
  className,
  disabled,
  ...rest
}) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150",
        "disabled:opacity-50 disabled:cursor-not-allowed select-none",
        BV[variant],
        BS[size],
        className,
      )}
      disabled={disabled || loading}
      {...rest}>
      {loading ? <Spinner size={14} /> : icon}
      {children}
    </button>
  );
}

/* ── Badge ────────────────────────────────────────────── */
const BC = {
  available:
    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  rented: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  sold: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  rent: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  sale: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  hotel: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  resort: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  hostel: "bg-lime-500/10 text-lime-400 border-lime-500/20",
  villa: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  apartment: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  house: "bg-green-500/10 text-green-400 border-green-500/20",
  commercial: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  land: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

export function Badge({ label }) {
  const cls =
    BC[label?.toLowerCase()] ??
    "bg-ink-600 text-slate-400 border-ink-500";
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border",
        cls,
      )}>
      {label}
    </span>
  );
}

/* ── Input ────────────────────────────────────────────── */
export function Input({ label, error, className, ...rest }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
          {label}
        </label>
      )}
      <input
        className={clsx(
          "field",
          error && "!border-red-500/60",
          className,
        )}
        {...rest}
      />
      {error && (
        <p className="text-xs text-red-400 mt-0.5">{error}</p>
      )}
    </div>
  );
}

/* ── Textarea ─────────────────────────────────────────── */
export function Textarea({ label, className, ...rest }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
          {label}
        </label>
      )}
      <textarea
        className={clsx("field resize-none min-h-[88px]", className)}
        {...rest}
      />
    </div>
  );
}

/* ── Select ───────────────────────────────────────────── */
export function Select({ label, options, className, ...rest }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
          {label}
        </label>
      )}
      <select
        className={clsx("field cursor-pointer", className)}
        {...rest}>
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ── Tag Input ────────────────────────────────────────── */
export function TagInput({ label, value, onChange, placeholder }) {
  const [raw, setRaw] = useState("");
  const commit = () => {
    const v = raw.trim();
    if (v && !value.includes(v)) onChange([...value, v]);
    setRaw("");
  };
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
          {label}
        </label>
      )}
      <div
        className="bg-ink-900 border border-ink-600 rounded-xl p-2 flex flex-wrap gap-1.5 min-h-[44px]
                      focus-within:border-gold-500 focus-within:ring-2 focus-within:ring-gold-500/20 transition-all">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 bg-ink-700 border border-ink-500
                                     rounded-full px-2.5 py-0.5 text-xs text-slate-300">
            {tag}
            <button
              type="button"
              onClick={() => onChange(value.filter((t) => t !== tag))}
              className="hover:text-red-400 transition-colors">
              <X size={9} />
            </button>
          </span>
        ))}
        <input
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === ",") &&
            (e.preventDefault(), commit())
          }
          onBlur={commit}
          placeholder={
            value.length === 0
              ? (placeholder ?? "Type then press Enter…")
              : ""
          }
          className="bg-transparent text-sm text-white outline-none placeholder-ink-400 flex-1 min-w-[100px] px-1"
        />
      </div>
    </div>
  );
}

/* ── Confirm Dialog ───────────────────────────────────── */
export function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  loading,
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 modal-bg z-[100] flex items-center justify-center p-4">
      <div className="bg-ink-800 border border-ink-600 rounded-2xl p-6 max-w-sm w-full animate-fade-in shadow-2xl">
        <div className="flex gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-red-400" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-white">
              {title}
            </h3>
            <p className="text-sm text-slate-400 mt-1">{message}</p>
          </div>
        </div>
        <div className="flex gap-2.5 justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onConfirm}
            loading={loading}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ── Skeleton Card ────────────────────────────────────── */
export function SkeletonCard() {
  return (
    <div className="bg-ink-800 rounded-2xl overflow-hidden border border-ink-700">
      <div className="skeleton h-44 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-3/4 rounded-lg" />
        <div className="skeleton h-3 w-1/2 rounded-lg" />
        <div className="skeleton h-3 w-2/3 rounded-lg" />
      </div>
    </div>
  );
}

/* ── Stats Card ───────────────────────────────────────── */
export function StatsCard({
  label,
  value,
  icon,
  color = "text-gold-400",
  sub,
}) {
  return (
    <div className="bg-ink-800 border border-ink-700 rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 card-glow transition-all duration-300">
      <div
        className={clsx(
          "w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-ink-700 border border-ink-600 flex items-center justify-center shrink-0",
          color,
        )}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold truncate">
          {label}
        </p>
        <p className="text-xl sm:text-2xl font-display font-bold text-white mt-0.5 truncate">
          {value}
        </p>
        {sub && <p className="text-xs text-ink-400 mt-0.5 truncate">{sub}</p>}
      </div>
    </div>
  );
}

/* ── Section Divider ──────────────────────────────────── */
export function SectionDivider({ label }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <p className="text-[11px] font-bold text-gold-500 uppercase tracking-[.12em] shrink-0">
        {label}
      </p>
      <div className="flex-1 gold-bar" />
    </div>
  );
}

/* ── Empty State ──────────────────────────────────────── */
export function EmptyState({ label, sub, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-ink-800 border border-ink-700 flex items-center justify-center mb-4">
        <X size={22} className="text-ink-500" />
      </div>
      <p className="font-display text-lg text-white mb-1">{label}</p>
      <p className="text-sm text-slate-500 mb-5 max-w-xs">{sub}</p>
      {action}
    </div>
  );
}

/* ── Pagination ───────────────────────────────────────── */
export function Pagination({ page, total, limit, onPage }) {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  const range = Array.from(
    { length: Math.min(totalPages, 7) },
    (_, i) => {
      if (totalPages <= 7) return i + 1;
      if (page <= 4) return i + 1;
      if (page >= totalPages - 3) return totalPages - 6 + i;
      return page - 3 + i;
    },
  );

  const btn =
    "w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs sm:text-sm font-medium transition-all border flex items-center justify-center";

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-1.5 mt-8 sm:mt-10">
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        className={clsx(
          btn,
          "bg-ink-800 text-slate-400 border-ink-700 hover:border-gold-500/40 disabled:opacity-40 disabled:cursor-not-allowed",
        )}>
        <ChevronLeft size={15} />
      </button>

      {range.map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={clsx(
            btn,
            p === page
              ? "bg-gold-500 text-ink-950 border-gold-500 font-bold"
              : "bg-ink-800 text-slate-400 border-ink-700 hover:border-gold-500/30 hover:text-white",
          )}>
          {p}
        </button>
      ))}

      <button
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages}
        className={clsx(
          btn,
          "bg-ink-800 text-slate-400 border-ink-700 hover:border-gold-500/40 disabled:opacity-40 disabled:cursor-not-allowed",
        )}>
        <ChevronRight size={15} />
      </button>
    </div>
  );
}
