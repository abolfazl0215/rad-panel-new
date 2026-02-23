"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  GraduationCap,
  FileText,
  Car,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  User,
  Phone,
  Globe,
  X,
} from "lucide-react";
import clsx from "clsx";
import Sidebar from "../../components/Sidebar";
import { Spinner, Pagination, EmptyState } from "../../components/UI";
import api from "../../lib/api";

// ─── Config ───────────────────────────────────────────────────────────────────
const FORM_TYPES = [
  { value: "all",          label: "All Forms",     icon: FileText,      color: "text-slate-400"  },
  { value: "contact",      label: "Contact",       icon: Mail,          color: "text-sky-400"    },
  { value: "consultation", label: "Consultation",  icon: MessageSquare, color: "text-violet-400" },
  { value: "education",    label: "Education",     icon: GraduationCap, color: "text-emerald-400"},
  { value: "visa",         label: "Visa",          icon: Globe,         color: "text-amber-400"  },
  { value: "transfer",     label: "Transfer",      icon: Car,           color: "text-rose-400"   },
];

const TYPE_COLOR = {
  contact:      "bg-sky-500/10 text-sky-400 border-sky-500/20",
  consultation: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  education:    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  visa:         "bg-amber-500/10 text-amber-400 border-amber-500/20",
  transfer:     "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
function formatTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

// Fields to skip in the detail view (shown in header already or noisy)
const SKIP_FIELDS = new Set(["_id", "__v", "type", "createdAt", "updatedAt"]);

function humanLabel(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

// ─── FormCard ─────────────────────────────────────────────────────────────────
function FormCard({ form }) {
  const [expanded, setExpanded] = useState(false);

  const name =
    form.fullName ||
    [form.firstName, form.lastName].filter(Boolean).join(" ") ||
    "—";

  const detailEntries = Object.entries(form).filter(
    ([k, v]) => !SKIP_FIELDS.has(k) && v !== null && v !== undefined && v !== ""
  );

  return (
    <div className="bg-ink-800 border border-ink-700 rounded-2xl overflow-hidden transition-all duration-200 hover:border-ink-600">
      {/* Header row */}
      <div
        className="flex items-center gap-4 px-5 py-4 cursor-pointer select-none"
        onClick={() => setExpanded((p) => !p)}
      >
        {/* Icon */}
        <div className="w-10 h-10 rounded-xl bg-ink-700 border border-ink-600 flex items-center justify-center shrink-0">
          {(() => {
            const t = FORM_TYPES.find((f) => f.value === form.type);
            const Icon = t?.icon ?? FileText;
            return <Icon size={16} className={t?.color ?? "text-slate-400"} />;
          })()}
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-white text-sm truncate">{name}</span>
            <span
              className={clsx(
                "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border uppercase tracking-wider",
                TYPE_COLOR[form.type] ?? "bg-ink-600 text-slate-400 border-ink-500"
              )}
            >
              {form.type}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-0.5 flex-wrap">
            {form.email && (
              <span className="text-xs text-ink-400 truncate">{form.email}</span>
            )}
            {form.phoneNumber && (
              <span className="text-xs text-ink-400">{form.phoneNumber}</span>
            )}
          </div>
        </div>

        {/* Date & chevron */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-300">{formatDate(form.createdAt)}</p>
            <p className="text-[11px] text-ink-400">{formatTime(form.createdAt)}</p>
          </div>
          {expanded ? (
            <ChevronUp size={15} className="text-ink-400" />
          ) : (
            <ChevronDown size={15} className="text-ink-400" />
          )}
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-ink-700 px-5 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {detailEntries.map(([key, val]) => (
              <div key={key} className="bg-ink-900/60 rounded-xl px-3.5 py-2.5">
                <p className="text-[10px] font-semibold text-ink-400 uppercase tracking-wider mb-0.5">
                  {humanLabel(key)}
                </p>
                <p className="text-sm text-slate-200 break-words">
                  {typeof val === "number" ? val : String(val)}
                </p>
              </div>
            ))}
          </div>
          {/* Timestamps */}
          <div className="mt-3 flex items-center gap-4 text-[11px] text-ink-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={11} />
              Submitted: {formatDate(form.createdAt)} {formatTime(form.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={11} />
              Updated: {formatDate(form.updatedAt)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function FormsClient() {
  const [activeType, setActiveType] = useState("all");
  const [forms, setForms] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 20;

  useEffect(() => {
    setPage(1);
  }, [activeType]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const params = { page, limit };
        if (activeType !== "all") params.type = activeType;
        const { data } = await api.get("/api/forms", { params });
        setForms(data.data);
        setTotal(data.total);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [activeType, page]);

  // Count per type for badges (only when "all" is active & data is loaded)
  const countByType = forms.reduce((acc, f) => {
    acc[f.type] = (acc[f.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="lg:ml-60 flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
        {/* Page Header */}
        <header className="mb-6">
          <p className="text-[11px] font-bold text-gold-500/70 uppercase tracking-[.15em] mb-1">
            Submissions
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Forms
          </h1>
          <p className="text-sm text-ink-400 mt-1">
            {total} submission{total !== 1 ? "s" : ""} — newest first
          </p>
        </header>

        {/* Type Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FORM_TYPES.map(({ value, label, icon: Icon, color }) => (
            <button
              key={value}
              onClick={() => setActiveType(value)}
              className={clsx(
                "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-150",
                activeType === value
                  ? "bg-gold-500/10 text-gold-400 border-gold-500/20"
                  : "bg-ink-800 text-ink-400 border-ink-700 hover:text-white hover:bg-ink-700 hover:border-ink-600"
              )}
            >
              <Icon size={14} className={activeType === value ? "text-gold-400" : color} />
              {label}
              {value !== "all" && activeType === "all" && countByType[value] ? (
                <span className="text-[10px] bg-ink-600 text-slate-300 rounded-full px-1.5 py-0.5 leading-none">
                  {countByType[value]}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Spinner size={32} />
          </div>
        ) : forms.length === 0 ? (
          <EmptyState
            label="No forms found"
            sub={activeType !== "all" ? `No submissions of type "${activeType}" yet.` : "No form submissions yet."}
          />
        ) : (
          <div className="space-y-3">
            {forms.map((form) => (
              <FormCard key={form._id} form={form} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {total > limit && (
          <div className="mt-6">
            <Pagination page={page} total={total} limit={limit} onPage={setPage} />
          </div>
        )}
      </main>
    </div>
  );
}
