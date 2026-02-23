"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Building2, Hotel, CheckCircle2, TrendingUp } from "lucide-react";
import { useListings, useStays } from "../store";
import { StatsCard } from "../components/UI";
import Sidebar from "../components/Sidebar";

export default function DashboardClient() {
  const listings = useListings();
  const stays    = useStays();

  useEffect(() => {
    listings.fetch({ limit: 200 });
    stays.fetch({ limit: 200 });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const available = listings.items.filter((i) => i.available === "available").length;
  const rented    = listings.items.filter((i) => i.available === "rented").length;
  const sold      = listings.items.filter((i) => i.available === "sold").length;
  const avgPrice  = listings.items.length
    ? Math.round(listings.items.reduce((s, i) => s + i.price, 0) / listings.items.length)
    : 0;

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="lg:ml-60 flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
        <header className="mb-6 lg:mb-8">
          <p className="text-[11px] font-bold text-gold-500/70 uppercase tracking-[.15em] mb-1">Overview</p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Real-estate management at a glance</p>
        </header>

        {/* KPI */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6 lg:mb-8">
          <StatsCard label="Total Listings" value={listings.total} icon={<Building2 size={22} />} sub="All properties"     color="text-gold-400"    />
          <StatsCard label="Total Stays"    value={stays.total}    icon={<Hotel size={22} />}     sub="Hotels & resorts"   color="text-sky-400"     />
          <StatsCard label="Available Now"  value={available}      icon={<CheckCircle2 size={22} />} sub="Ready to rent/buy" color="text-emerald-400" />
          <StatsCard
            label="Avg. Price"
            value={avgPrice ? `${avgPrice.toLocaleString()} ֏` : "—"}
            icon={<TrendingUp size={22} />}
            sub="Across listings"
            color="text-purple-400"
          />
        </section>

        {/* Status breakdown */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 lg:mb-8">
          {[
            { label:"Available", count:available, color:"text-emerald-400", ring:"border-emerald-500/15 bg-emerald-500/5" },
            { label:"Rented",    count:rented,    color:"text-sky-400",     ring:"border-sky-500/15 bg-sky-500/5"         },
            { label:"Sold",      count:sold,      color:"text-rose-400",    ring:"border-rose-500/15 bg-rose-500/5"       },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl border p-4 sm:p-5 ${s.ring}`}>
              <p className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold mb-1">{s.label}</p>
              <p className={`text-2xl sm:text-3xl font-display font-bold ${s.color}`}>{s.count}</p>
              <p className="text-xs text-slate-500 mt-1">listings</p>
            </div>
          ))}
        </section>

        {/* Quick links */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          <Link href="/listings"
            className="group bg-ink-800 border border-ink-700 hover:border-gold-500/25 rounded-2xl p-5 sm:p-6 transition-all duration-300 card-glow block">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                <Building2 size={18} className="text-gold-400" />
              </div>
              <h2 className="font-display text-base font-semibold text-white group-hover:text-gold-400 transition-colors">
                Manage Listings
              </h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Create, edit and remove property listings. Filter by type, availability, and price range.
            </p>
            <p className="mt-4 text-xs font-semibold text-gold-500/60 group-hover:text-gold-400 transition-colors">
              Open Listings →
            </p>
          </Link>

          <Link href="/stays"
            className="group bg-ink-800 border border-ink-700 hover:border-sky-500/25 rounded-2xl p-5 sm:p-6 transition-all duration-300 block">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                <Hotel size={18} className="text-sky-400" />
              </div>
              <h2 className="font-display text-base font-semibold text-white group-hover:text-sky-400 transition-colors">
                Manage Stays
              </h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Handle hotels, resorts and short-term stays. Set pricing, policies and gallery images.
            </p>
            <p className="mt-4 text-xs font-semibold text-sky-500/60 group-hover:text-sky-400 transition-colors">
              Open Stays →
            </p>
          </Link>
        </section>
      </main>
    </div>
  );
}
