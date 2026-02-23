"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Hotel, LayoutDashboard, ChevronRight, Settings, Menu, X, FileText } from "lucide-react";
import clsx from "clsx";

const nav = [
  { href: "/",         label: "Dashboard", icon: LayoutDashboard },
  { href: "/listings", label: "Listings",  icon: Building2 },
  { href: "/stays",    label: "Stays",     icon: Hotel },
  { href: "/forms",    label: "Forms",     icon: FileText },
];

export default function Sidebar() {
  const path = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-ink-800 border border-ink-700 flex items-center justify-center text-white hover:bg-ink-700 transition-colors"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={clsx(
        "fixed inset-y-0 left-0 w-60 bg-ink-900 border-r border-ink-700 flex flex-col z-40 transition-transform duration-300",
        "lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
      {/* Brand */}
      <div className="px-5 py-5 border-b border-ink-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/30">
            <Building2 size={17} className="text-ink-950" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-display text-sm font-bold text-white tracking-wide leading-none">Estate</p>
            <p className="text-[10px] text-ink-400 tracking-[.15em] uppercase mt-0.5">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? path === "/" : path.startsWith(href);
          return (
            <Link key={href} href={href}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                active
                  ? "bg-gold-500/10 text-gold-400 border border-gold-500/15"
                  : "text-slate-400 hover:text-white hover:bg-ink-700 border border-transparent"
              )}>
              <Icon size={16} className={clsx("shrink-0", active ? "text-gold-400" : "text-ink-400 group-hover:text-slate-300")} />
              <span>{label}</span>
              {active && <ChevronRight size={13} className="ml-auto text-gold-500/50" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-ink-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-600/20
                          border border-gold-500/20 flex items-center justify-center text-xs font-bold text-gold-400">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin</p>
            <p className="text-xs text-ink-400 truncate">admin@estate.am</p>
          </div>
          <button className="text-ink-400 hover:text-white transition-colors">
            <Settings size={15} />
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}
