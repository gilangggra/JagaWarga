"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Heart, 
  Calendar, 
  Accessibility, 
  User,
  AlertTriangle, 
  ArrowRight,
  Settings,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  ShieldCheck
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  subtitle: string;
  exact: boolean;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: "/lansia",
    label: "Beranda",
    subtitle: "Kabar & Tanda Vital",
    exact: true,
    icon: <Home className="w-5 h-5 stroke-[2.2]" />,
  },
  {
    href: "/lansia/bantuan",
    label: "Bantuan Warga",
    subtitle: "Minta & Lacak Bantuan",
    exact: false,
    icon: <Calendar className="w-5 h-5 stroke-[2.2]" />,
  },
  {
    href: "/lansia/alkes",
    label: "Pinjam Alkes",
    subtitle: "Kas RT Bebas Biaya",
    exact: false,
    icon: <Accessibility className="w-5 h-5 stroke-[2.2]" />,
  },
  {
    href: "/lansia/profil",
    label: "Profil & Kontak",
    subtitle: "Data Medis & Relawan",
    exact: false,
    icon: <User className="w-5 h-5 stroke-[2.2]" />,
  },
];

export default function LansiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-slate-800 font-sans selection:bg-[#52B1AF]/20 flex flex-col lg:flex-row relative">
      
      {/* DESKTOP SIDEBAR - Soft Teal Panel with Botanical Leaves & Expand/Collapse Toggle */}
      <aside 
        className={`hidden lg:flex sticky top-0 h-screen bg-gradient-to-b from-[#56B4B2] via-[#4FAAA8] to-[#3D9A98] text-white flex-col py-6 px-3 shrink-0 select-none z-30 transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "w-64 xl:w-72" : "w-20 xl:w-24 items-center"
        }`}
      >
          {/* ── BOTANICAL LEAF DECORATIONS ─────────────────────────── */}
          {/* pointer-events-none ensures they never block any click */}

          {/* Leaf A — large tropical leaf, top-right corner */}
          <svg
            viewBox="0 0 140 220"
            className="absolute -top-8 -right-10 w-36 opacity-[0.18] pointer-events-none"
            style={{ transform: "rotate(15deg)" }}
            aria-hidden="true"
          >
            {/* Natural asymmetric tropical leaf body */}
            <path
              d="M70 215 C18 178 -2 128 3 82 C8 36 38 6 70 3 C102 6 132 36 137 82 C142 128 122 178 70 215 Z"
              fill="white"
            />
            {/* Midrib (main vein) */}
            <line x1="70" y1="215" x2="70" y2="3" stroke="white" strokeWidth="2.8" strokeOpacity="0.5" />
            {/* Secondary veins */}
            <line x1="70" y1="55"  x2="35" y2="98"  stroke="white" strokeWidth="1.4" strokeOpacity="0.4" />
            <line x1="70" y1="55"  x2="105" y2="98"  stroke="white" strokeWidth="1.4" strokeOpacity="0.4" />
            <line x1="70" y1="95"  x2="22" y2="138" stroke="white" strokeWidth="1.2" strokeOpacity="0.35" />
            <line x1="70" y1="95"  x2="118" y2="138" stroke="white" strokeWidth="1.2" strokeOpacity="0.35" />
            <line x1="70" y1="135" x2="30" y2="172" stroke="white" strokeWidth="1"   strokeOpacity="0.3" />
            <line x1="70" y1="135" x2="110" y2="172" stroke="white" strokeWidth="1"   strokeOpacity="0.3" />
            <line x1="70" y1="170" x2="45" y2="198" stroke="white" strokeWidth="0.8" strokeOpacity="0.25" />
            <line x1="70" y1="170" x2="95" y2="198" stroke="white" strokeWidth="0.8" strokeOpacity="0.25" />
          </svg>

          {/* Leaf B — medium leaf, bottom-left, facing opposite */}
          <svg
            viewBox="0 0 110 190"
            className="absolute -bottom-6 -left-8 w-28 opacity-[0.15] pointer-events-none"
            style={{ transform: "rotate(-30deg) scaleX(-1)" }}
            aria-hidden="true"
          >
            <path
              d="M55 185 C14 155 -2 112 3 72 C8 32 30 5 55 3 C80 5 102 32 107 72 C112 112 96 155 55 185 Z"
              fill="white"
            />
            <line x1="55" y1="185" x2="55" y2="3"   stroke="white" strokeWidth="2.3" strokeOpacity="0.45" />
            <line x1="55" y1="50"  x2="25" y2="88"  stroke="white" strokeWidth="1.2" strokeOpacity="0.38" />
            <line x1="55" y1="50"  x2="85" y2="88"  stroke="white" strokeWidth="1.2" strokeOpacity="0.38" />
            <line x1="55" y1="90"  x2="18" y2="125" stroke="white" strokeWidth="1"   strokeOpacity="0.32" />
            <line x1="55" y1="90"  x2="92" y2="125" stroke="white" strokeWidth="1"   strokeOpacity="0.32" />
            <line x1="55" y1="128" x2="28" y2="158" stroke="white" strokeWidth="0.9" strokeOpacity="0.28" />
            <line x1="55" y1="128" x2="82" y2="158" stroke="white" strokeWidth="0.9" strokeOpacity="0.28" />
          </svg>

          {/* Leaf C — small accent leaf, mid-right */}
          <svg
            viewBox="0 0 85 145"
            className="absolute top-[40%] -right-6 w-20 opacity-[0.14] pointer-events-none"
            style={{ transform: "rotate(50deg)" }}
            aria-hidden="true"
          >
            <path
              d="M42 140 C10 118 -1 85 2 57 C5 28 22 4 42 2 C62 4 79 28 82 57 C85 85 74 118 42 140 Z"
              fill="white"
            />
            <line x1="42" y1="140" x2="42" y2="2"  stroke="white" strokeWidth="1.8" strokeOpacity="0.4" />
            <line x1="42" y1="42"  x2="18" y2="72" stroke="white" strokeWidth="1"   strokeOpacity="0.32" />
            <line x1="42" y1="42"  x2="66" y2="72" stroke="white" strokeWidth="1"   strokeOpacity="0.32" />
            <line x1="42" y1="78"  x2="14" y2="105" stroke="white" strokeWidth="0.8" strokeOpacity="0.28" />
            <line x1="42" y1="78"  x2="70" y2="105" stroke="white" strokeWidth="0.8" strokeOpacity="0.28" />
          </svg>

          {/* Leaf D — accent, top-left peering in */}
          <svg
            viewBox="0 0 65 110"
            className="absolute top-[15%] -left-4 w-14 opacity-[0.12] pointer-events-none"
            style={{ transform: "rotate(-55deg)" }}
            aria-hidden="true"
          >
            <path
              d="M32 106 C8 88 -1 65 2 44 C5 23 17 4 32 2 C47 4 59 23 62 44 C65 65 56 88 32 106 Z"
              fill="white"
            />
            <line x1="32" y1="106" x2="32" y2="2"  stroke="white" strokeWidth="1.5" strokeOpacity="0.38" />
            <line x1="32" y1="38"  x2="14" y2="62" stroke="white" strokeWidth="0.9" strokeOpacity="0.3" />
            <line x1="32" y1="38"  x2="50" y2="62" stroke="white" strokeWidth="0.9" strokeOpacity="0.3" />
            <line x1="32" y1="65"  x2="12" y2="86" stroke="white" strokeWidth="0.7" strokeOpacity="0.25" />
            <line x1="32" y1="65"  x2="52" y2="86" stroke="white" strokeWidth="0.7" strokeOpacity="0.25" />
          </svg>

          {/* Leaf E — tiny center accent for depth */}
          <svg
            viewBox="0 0 55 95"
            className="absolute top-[62%] -left-3 w-11 opacity-[0.10] pointer-events-none"
            style={{ transform: "rotate(-15deg) scaleX(-1)" }}
            aria-hidden="true"
          >
            <path
              d="M27 91 C6 76 -1 56 2 37 C5 18 15 3 27 2 C39 3 49 18 52 37 C55 56 48 76 27 91 Z"
              fill="white"
            />
            <line x1="27" y1="91" x2="27" y2="2"  stroke="white" strokeWidth="1.3" strokeOpacity="0.35" />
            <line x1="27" y1="33" x2="11" y2="52" stroke="white" strokeWidth="0.7" strokeOpacity="0.28" />
            <line x1="27" y1="33" x2="43" y2="52" stroke="white" strokeWidth="0.7" strokeOpacity="0.28" />
          </svg>

          {/* Ambient radial glow - bottom center */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-32 rounded-full bg-white/8 blur-3xl pointer-events-none" />
          {/* Ambient radial glow - top center */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          {/* ──────────────────────────────────────────────────────── */}

          
          {/* 1. TOP LOGO & EXPAND/COLLAPSE TOGGLE */}
          <div className={`flex items-center w-full mb-7 ${
            isExpanded ? "justify-between px-1" : "flex-col gap-2"
          }`}>
            
            {/* Brand Logo Mark */}
            <Link href="/lansia" className="flex items-center gap-3 group shrink-0">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner group-hover:scale-105 transition-transform shrink-0">
                <ShieldCheck className="w-5.5 h-5.5 stroke-[2] text-white" />
              </div>
              {isExpanded && (
                <div className="animate-in fade-in duration-200">
                  <span className="font-black text-[15px] tracking-tight block leading-tight text-white">
                    TilikAman
                  </span>
                  <span className="font-bold text-[10.5px] tracking-wider text-white/75 block">
                    Portal Lansia
                  </span>
                </div>
              )}
            </Link>

            {/* Toggle Buttons */}
            {isExpanded ? (
              <button
                type="button"
                id="btn-sidebar-collapse"
                onClick={() => setIsExpanded(false)}
                className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                id="btn-sidebar-expand"
                onClick={() => setIsExpanded(true)}
                className="flex items-center gap-0.5 px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold transition-all active:scale-95 cursor-pointer"
              >
                <span>Menu</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* 2. NAVIGATION ITEMS */}
          <nav className="flex flex-col w-full space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-all duration-200 relative group cursor-pointer ${
                    isExpanded
                      ? `flex items-center gap-3.5 px-3.5 py-3 rounded-2xl w-full ${
                          active
                            ? "bg-white/25 text-white font-black shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-white/40"
                            : "text-white/80 hover:text-white hover:bg-white/15 font-semibold"
                        }`
                      : `w-12 h-12 rounded-2xl mx-auto flex items-center justify-center ${
                          active
                            ? "bg-white/25 text-white shadow-[0_6px_20px_rgba(0,0,0,0.08)] border border-white/40 scale-105"
                            : "text-white/70 hover:text-white hover:bg-white/15"
                        }`
                  }`}
                >
                  <div className={`shrink-0 ${isExpanded && active ? "scale-110 transition-transform" : ""}`}>
                    {item.icon}
                  </div>

                  {/* Text descriptions when expanded */}
                  {isExpanded && (
                    <div className="min-w-0 flex-1 animate-in fade-in duration-200">
                      <p className="text-xs font-black leading-tight truncate">{item.label}</p>
                      <p className={`text-[10.5px] font-medium truncate mt-0.5 ${active ? "text-white/90" : "text-white/70"}`}>
                        {item.subtitle}
                      </p>
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 3. BOTTOM ACTIONS — anchored to bottom */}
          <div className={`mt-auto pt-6 flex flex-col gap-2.5 w-full ${isExpanded ? "px-1" : "items-center"}`}>
            
            {/* SOS Darurat Button */}
            <Link
              href="/lansia/darurat"
              className={`rounded-2xl bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-900/20 active:scale-95 transition-all group ${
                isExpanded ? "w-full py-3 px-3.5 gap-2.5 text-xs font-black" : "w-11 h-11"
              }`}
            >
              <AlertTriangle className="w-5 h-5 animate-pulse shrink-0" />
              {isExpanded && (
                <span className="truncate tracking-wide animate-in fade-in duration-200">
                  ALARM DARURAT SOS
                </span>
              )}
            </Link>

            {/* Switch to Warga portal */}
            <Link
              href="/anak"
              className={`flex items-center justify-center gap-1.5 text-[11px] font-bold text-white/80 hover:text-white transition-colors py-1.5 group rounded-xl hover:bg-white/10 ${
                isExpanded ? "w-full px-2" : ""
              }`}
            >
              <span>{isExpanded ? "Beralih ke Portal Warga" : "Warga"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </aside>

        {/* MOBILE TOP BAR (Responsive for Phone/Tablet) */}
        <div className="lg:hidden bg-gradient-to-r from-[#56B4B2] to-[#4FAAA8] px-4 py-3.5 flex items-center justify-between text-white shadow-sm shrink-0">
          <Link href="/lansia" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <ShieldCheck className="w-4.5 h-4.5 stroke-[2] text-white" />
            </div>
            <div>
              <p className="font-black text-sm leading-tight text-white">TilikAman</p>
              <p className="text-[10px] text-white/80 font-bold -mt-0.5">Portal Lansia</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/lansia/panduan"
              className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-white text-xs font-bold"
              title="Panduan"
            >
              <BookOpen className="w-4 h-4" />
            </Link>
            <Link
              href="/lansia/pengaturan"
              className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-white"
              title="Pengaturan"
            >
              <Settings className="w-4 h-4" />
            </Link>
            <Link
              href="/lansia/darurat"
              className="px-2.5 py-1 rounded-xl bg-rose-500 text-white text-xs font-black flex items-center gap-1 shadow-xs"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>SOS</span>
            </Link>
          </div>
        </div>

        {/* MAIN BODY VIEWPORT */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#F7FBFC] min-h-screen">
          {children}
        </main>

        {/* MOBILE BOTTOM NAVIGATION BAR */}
        <div className="lg:hidden sticky bottom-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#DFECEE] px-3 py-2 flex items-center justify-around shadow-lg">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                  active ? "text-[#4FAAA8] font-black" : "text-slate-400 hover:text-slate-600 font-bold"
                }`}
              >
                <div className={`p-1 rounded-lg ${active ? "bg-[#56B4B2]/15 text-[#4FAAA8]" : ""}`}>
                  {item.icon}
                </div>
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </Link>
            );
          })}
        </div>

    </div>
  );
}
