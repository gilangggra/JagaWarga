"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  HandHeart, 
  Activity, 
  Accessibility,
  History,
  BookOpen,
  Settings, 
  AlertTriangle, 
  Shield, 
  ArrowLeftRight,
  Heart
} from "lucide-react";

const NAV_ITEMS = [
  {
    href: "/anak",
    label: "Pemantauan",
    exact: true,
    icon: <Home className="w-5 h-5" />,
  },
  {
    href: "/anak/bantuan",
    label: "Titip Bantuan",
    exact: false,
    icon: <HandHeart className="w-5 h-5" />,
  },
  {
    href: "/anak/status",
    label: "Status Bantuan",
    exact: false,
    icon: <Activity className="w-5 h-5" />,
  },
  {
    href: "/anak/alkes",
    label: "Pinjam Alkes",
    exact: false,
    icon: <Accessibility className="w-5 h-5" />,
  },
  {
    href: "/anak/riwayat",
    label: "Riwayat Bantuan",
    exact: false,
    icon: <History className="w-5 h-5" />,
  },
  {
    href: "/anak/kesehatan",
    label: "Catatan Sehat",
    exact: false,
    icon: <Heart className="w-5 h-5" />,
    iconBg: "bg-purple-100 text-purple-600 group-hover:bg-purple-200",
  },
];

export default function AnakLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col lg:flex-row font-sans selection:bg-emerald-100">
      
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden lg:block lg:w-72 xl:w-80 bg-white border-r border-slate-200/80 self-stretch shrink-0 z-30 shadow-[2px_0_16px_rgba(0,0,0,0.02)]">
        <div className="sticky top-0 h-screen flex flex-col justify-between overflow-hidden">
          
          <div className="p-6 border-b border-slate-100 shrink-0">
            <Link href="/anak" className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 bg-[#00624E] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm text-white group-hover:scale-105 transition-transform">
                <Shield className="w-6 h-6 fill-white/20 stroke-[2.2]" />
              </div>
              <div>
                <p className="font-black text-slate-900 text-xl tracking-tight leading-none">
                  JagaWarga
                </p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-5 space-y-2 overflow-y-auto min-h-0">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 mb-2">
              Menu Utama
            </p>
            
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl transition-all duration-200 group ${
                    active
                      ? "bg-[#E6F4EA] text-[#00624E] shadow-2xs font-black border border-emerald-200/70"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-bold border border-transparent"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${
                    active
                      ? "bg-[#00624E] text-white shadow-xs"
                      : (item.iconBg || "bg-slate-100 text-slate-500 group-hover:bg-slate-200")
                  }`}>
                    {item.icon}
                  </div>
                  <span className="text-sm leading-none flex-1 truncate">{item.label}</span>
                  {active && (
                    <span className="w-2 h-2 rounded-full bg-[#00624E] shrink-0" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-100 space-y-2.5 shrink-0">
            <Link
              href="/lansia"
              className="flex items-center justify-center gap-2 w-full bg-slate-50 hover:bg-slate-100 active:scale-95 text-slate-700 font-bold text-xs py-2.5 rounded-2xl transition-all border border-slate-200/80"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-slate-500" />
              <span>Beralih ke Portal Lansia</span>
            </Link>

            <Link
              href="/anak/bantuan?darurat=1"
              className="flex items-center justify-center gap-2.5 w-full bg-[#DC2626] hover:bg-[#b91c1c] active:scale-95 text-white font-black text-sm py-3.5 rounded-2xl shadow-md shadow-rose-500/20 transition-all group"
            >
              <AlertTriangle className="w-5 h-5 group-hover:scale-110 transition-transform animate-pulse" />
              <span>Bantuan Darurat Ortu</span>
            </Link>
          </div>

        </div>
      </aside>

      
      <div className="flex-1 flex flex-col min-h-screen">
        
        
        <header className="hidden lg:flex items-center justify-between px-8 py-3.5 bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-20 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500">
              Rabu, 26 Mei 2024
            </span>
          </div>

          <div className="flex items-center gap-3">
            
            <Link
              href="/anak/panduan"
              id="btn-desktop-panduan-anak"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 text-slate-600 hover:text-[#00624E] text-xs font-bold active:scale-95 transition-all shadow-2xs"
              title="Panduan Cara Pakai JagaWarga"
            >
              <BookOpen className="w-4 h-4 text-[#00624E]" />
              <span>Panduan Keluarga</span>
            </Link>

            
            <Link
              href="/anak/pengaturan"
              id="btn-desktop-settings-anak"
              className="w-9 h-9 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-slate-100 flex items-center justify-center text-slate-600 hover:text-[#00624E] active:scale-95 transition-all shadow-2xs"
              title="Pengaturan Notifikasi & Akun"
            >
              <Settings className="w-4 h-4" />
            </Link>

            <div className="h-6 w-[1px] bg-slate-200 mx-1" />

            
            <Link
              href="/anak/profil"
              id="btn-desktop-profile-anak"
              className="flex items-center gap-3 p-1.5 pl-3.5 rounded-2xl hover:bg-slate-100/80 active:scale-95 transition-all group"
              title="Buka Profil Saya"
            >
              <span className="text-xs font-black text-slate-900 group-hover:text-[#00624E] transition-colors">
                Ibu Titiek
              </span>
              <div className="w-9 h-9 rounded-2xl bg-[#00624E] text-white flex items-center justify-center font-black text-xs shadow-xs group-hover:scale-105 transition-transform">
                IT
              </div>
            </Link>
          </div>
        </header>

        
        <header className="lg:hidden sticky top-0 z-20 pt-3 px-4 pb-2 bg-[#F8FAFC]">
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200/60 px-4 h-14 flex items-center justify-between">
            <Link
              href="/anak/profil"
              id="btn-mobile-profile-anak"
              className="flex items-center gap-2.5 hover:opacity-80 active:scale-95 transition-all"
              title="Buka Profil Saya"
            >
              <div className="w-9 h-9 rounded-2xl bg-[#00624E] text-white flex items-center justify-center font-black text-xs shadow-xs">
                IT
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 leading-none">
                  PORTAL KELUARGA
                </p>
                <p className="text-xs font-black text-slate-900 leading-tight mt-0.5">
                  Ibu Titiek
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-1.5">
              
              <Link
                href="/anak/panduan"
                id="btn-mobile-panduan-anak"
                className="w-9 h-9 rounded-2xl border border-emerald-200 bg-emerald-50/80 flex items-center justify-center text-[#00624E] active:scale-95 transition-all"
                title="Buka Panduan"
              >
                <BookOpen className="w-4 h-4" />
              </Link>

              
              <Link
                href="/anak/pengaturan"
                id="btn-mobile-settings-anak"
                className="w-9 h-9 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 active:scale-95 transition-all"
                title="Buka Pengaturan"
              >
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </header>

        
        <main className="flex-1">
          {children}
        </main>

      </div>

      
      <div className="lg:hidden fixed bottom-4 inset-x-4 z-50 max-w-md mx-auto">
        <nav className="bg-white/95 backdrop-blur-xl rounded-full shadow-[0_12px_35px_rgba(0,0,0,0.12)] border border-slate-200/80 px-2 py-1.5 flex items-center justify-around relative">
          
          
          <Link
            href="/anak"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all ${
              isActive("/anak", true)
                ? "text-[#00624E] font-black"
                : "text-slate-400 hover:text-slate-600 font-bold"
            }`}
          >
            <span className={`p-1.5 rounded-xl ${isActive("/anak", true) ? "bg-[#E6F4EA]" : ""}`}>
              <Home className="w-5 h-5" />
            </span>
            <span className="text-[9px] mt-0.5">Pantau</span>
          </Link>

          
          <Link
            href="/anak/bantuan"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all ${
              isActive("/anak/bantuan", false)
                ? "text-[#00624E] font-black"
                : "text-slate-400 hover:text-slate-600 font-bold"
            }`}
          >
            <span className={`p-1.5 rounded-xl ${isActive("/anak/bantuan", false) ? "bg-[#E6F4EA]" : ""}`}>
              <HandHeart className="w-5 h-5" />
            </span>
            <span className="text-[9px] mt-0.5">Titip</span>
          </Link>

          
          <Link
            href="/anak/bantuan?darurat=1"
            className="flex flex-col items-center justify-center -mt-5 group"
            title="Bantuan Darurat Ortu"
          >
            <div className="w-12 h-12 rounded-full bg-[#DC2626] text-white flex items-center justify-center shadow-lg shadow-rose-600/35 border-2 border-white ring-2 ring-rose-100 group-hover:scale-105 active:scale-95 transition-all">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-[9px] font-black text-rose-600 mt-1">Darurat</span>
          </Link>

          
          <Link
            href="/anak/status"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all ${
              isActive("/anak/status", false)
                ? "text-[#00624E] font-black"
                : "text-slate-400 hover:text-slate-600 font-bold"
            }`}
          >
            <span className={`p-1.5 rounded-xl ${isActive("/anak/status", false) ? "bg-[#E6F4EA]" : ""}`}>
              <Activity className="w-5 h-5" />
            </span>
            <span className="text-[9px] mt-0.5">Status</span>
          </Link>

          
          <Link
            href="/anak/kesehatan"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all ${
              isActive("/anak/kesehatan", false)
                ? "text-[#00624E] font-black"
                : "text-slate-400 hover:text-slate-600 font-bold"
            }`}
          >
            <span className={`p-1.5 rounded-xl ${isActive("/anak/kesehatan", false) ? "bg-[#E6F4EA]" : ""}`}>
              <Heart className="w-5 h-5" />
            </span>
            <span className="text-[9px] mt-0.5">Sehat</span>
          </Link>

        </nav>
      </div>

    </div>
  );
}
