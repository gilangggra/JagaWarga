"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/lansia",
    label: "Beranda",
    exact: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    href: "/lansia/bantuan",
    label: "Bantuan",
    exact: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    href: "/lansia/status",
    label: "Status",
    exact: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
    ),
  },
  {
    href: "/lansia/alkes",
    label: "Alkes",
    exact: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
      </svg>
    ),
  },
];

export default function LansiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-[#F3F6FA] text-slate-900 flex flex-col lg:flex-row font-sans selection:bg-sky-100">
      
      <aside className="hidden lg:flex lg:flex-col lg:w-64 xl:w-72 bg-white border-r border-slate-200/80 min-h-screen sticky top-0 h-screen z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="px-6 py-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#38BDF8] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md shadow-sky-200">
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
            </div>
            <div>
              <p className="font-black text-slate-900 text-lg tracking-tight">TilikAman</p>
              <p className="text-sky-600 text-xs font-bold">Portal Lansia RT 04</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-sky-100 border border-sky-300 flex items-center justify-center text-sky-800 font-black text-sm flex-shrink-0">
              BP
            </div>
            <div className="min-w-0">
              <p className="font-black text-slate-900 text-sm truncate">Bapak Prabowo</p>
              <p className="text-slate-400 text-xs font-medium">RT 04 / RW 01</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-200 text-sm font-extrabold
                  ${active
                    ? "bg-[#38BDF8] text-white shadow-md shadow-sky-200"
                    : "text-slate-500 hover:bg-slate-100/70 hover:text-slate-900"
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {active && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-5 border-t border-slate-100">
          <Link
            href="/lansia/darurat"
            className="flex items-center justify-center gap-2 w-full bg-red-500 hover:bg-red-600 active:scale-95 text-white font-black text-sm py-3.5 rounded-2xl shadow-lg shadow-red-500/20 transition-all"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            </svg>
            Alarm Darurat SOS
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        
        <header className="hidden lg:flex items-center justify-between px-6 lg:px-8 xl:px-10 py-4 bg-white border-b border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/80 text-slate-700 text-xs font-black">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
              <span>RT 04 / RW 01 · Komunitas Lansia Siaga</span>
            </div>
            <span className="text-slate-400 text-xs font-semibold">Rabu, 26 Agustus 2026</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>3 Relawan Siaga Online</span>
            </div>

            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="text-right">
                <p className="text-[13px] font-black text-slate-900 leading-tight">Bapak Prabowo</p>
                <p className="text-[10.5px] font-bold text-slate-400">Warga Lansia · Blok C4</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#38BDF8] text-white flex items-center justify-center font-black text-xs shadow-sm border-2 border-white ring-2 ring-sky-100">
                BP
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 relative overflow-y-auto">
          {children}
        </main>
      </div>

      <div className="lg:hidden fixed bottom-4 inset-x-4 z-50 max-w-md mx-auto">
        <nav className="bg-white/95 backdrop-blur-xl rounded-full shadow-[0_12px_35px_rgba(0,0,0,0.12)] border border-slate-100 px-3 py-2 flex items-center justify-around">
          
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-all duration-200 flex items-center gap-1.5
                  ${active
                    ? "bg-[#38BDF8] text-white px-4 py-2 rounded-full shadow-md shadow-sky-300/50 font-black text-xs scale-105"
                    : "p-2.5 text-slate-400 hover:text-slate-700 active:scale-95"
                  }`}
              >
                {item.icon}
                {active && <span>{item.label}</span>}
              </Link>
            );
          })}

          <Link
            href="/lansia/darurat"
            className="p-2.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 active:scale-95 transition-all"
            title="SOS Darurat"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            </svg>
          </Link>
        </nav>
      </div>

    </div>
  );
}
