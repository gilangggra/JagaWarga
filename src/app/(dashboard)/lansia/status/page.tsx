"use client";

import Link from "next/link";
import { useState } from "react";

const STEPS = [
  {
    id: "dibuat",
    label: "Permintaan Diterima Sistem",
    sub: "Pukul 10:42 WIB",
    status: "done",
    desc: "Permintaan bantuan tercatat dan otomatis diteruskan ke relawan.",
  },
  {
    id: "menuju",
    label: "Relawan Menuju Rumah Anda",
    sub: "Estimasi tiba: 3 - 5 Menit",
    status: "active",
    desc: "Budi Santoso sedang dalam perjalanan membawa kebutuhan Bapak.",
  },
  {
    id: "tiba",
    label: "Tiba di Rumah dan Serah Terima",
    sub: "Pintu Depan Rumah",
    status: "pending",
    desc: "Relawan sampai dan menyerahkan bantuan.",
  },
  {
    id: "selesai",
    label: "Bantuan Selesai",
    sub: "Konfirmasi Otomatis",
    status: "pending",
    desc: "Laporan masuk ke posko RT dan anak di perantauan.",
  },
];

export default function StatusPage() {
  const [bantuanSelesai, setBantuanSelesai] = useState(false);

  return (
    <div className="flex flex-col flex-1 min-h-full font-sans pb-36 lg:pb-12 bg-[#F8FAFC]">

      <header className="lg:hidden sticky top-0 z-20 pt-3 px-4 pb-2">
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/60 px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/lansia"
              id="btn-back-status"
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-600 flex items-center justify-center active:scale-95 transition-all"
              title="Kembali ke Beranda"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </Link>
            <div>
              <p className="text-sky-600 text-[10px] font-black uppercase tracking-wider">Pelacakan Langsung</p>
              <h1 className="text-[15px] font-black text-slate-900 leading-none">Status Bantuan</h1>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-black">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>3 Siaga</span>
          </div>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6 space-y-4 sm:space-y-6">

        <div className="hidden lg:flex items-center justify-between pb-1">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
              Status Permintaan Bantuan
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-800 text-xs font-black">3 Relawan Siaga RT 04</span>
          </div>
        </div>

        <div className="bg-[#0284C7] rounded-[22px] sm:rounded-[26px] p-4 sm:p-6 text-white shadow-sm relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-white/10 rounded-full pointer-events-none" />
          <div className="relative z-10 space-y-1.5 sm:space-y-2 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] sm:text-[10.5px] font-black uppercase tracking-wider backdrop-blur-sm border border-white/25">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>Dalam Perjalanan</span>
            </span>
            <h2 className="text-lg sm:text-2xl font-black leading-tight">
              Budi Santoso Sedang Menuju Rumah Bapak
            </h2>
            <p className="text-sky-50 text-xs sm:text-sm font-medium leading-relaxed max-w-lg">
              Harap tetap santai di dalam rumah. Relawan membawa pesanan obat dan akan tiba dalam <strong>3-5 menit</strong>.
            </p>
          </div>

          <div className="relative z-10 w-14 h-14 sm:w-18 sm:h-18 bg-white/20 rounded-2xl sm:rounded-3xl flex items-center justify-center flex-shrink-0 shadow-inner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7 sm:w-9 sm:h-9 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V3.75m0 3.75h-7.5M14.25 7.5H6.75m0 0H4.875c-.621 0-1.125.504-1.125 1.125v6.75" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">

          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="bg-white rounded-[24px] sm:rounded-[26px] border border-slate-200/70 p-4 sm:p-6 shadow-xs space-y-3.5 sm:space-y-4">
              <div>
                <span className="text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Alur Proses</span>
                <h3 className="font-black text-slate-900 text-base leading-tight mt-0.5">Tahapan Bantuan Warga</h3>
              </div>

              <div className="space-y-3 sm:space-y-3.5">
                {STEPS.map((step, idx) => {
                  const isDone = step.status === "done";
                  const isActive = step.status === "active";
                  return (
                    <div key={step.id} className="flex items-start gap-3 sm:gap-3.5 relative">
                      {idx < STEPS.length - 1 && (
                        <div
                          className={`absolute left-4.5 sm:left-5 top-9 sm:top-10 bottom-[-14px] sm:bottom-[-16px] w-[2px] ${isDone ? "bg-[#0284C7]" : "bg-slate-200"}`}
                        />
                      )}

                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs flex-shrink-0 z-10 shadow-xs transition-all ${isDone ? "bg-[#0284C7] text-white" : isActive ? "bg-emerald-600 text-white ring-4 ring-emerald-100 animate-pulse" : "bg-slate-100 text-slate-400 border border-slate-200"}`}
                      >
                        {isDone ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>

                      <div
                        className={`flex-1 p-3 sm:p-3.5 rounded-[18px] transition-all ${isActive ? "bg-emerald-50/70 border border-emerald-200" : isDone ? "bg-slate-50/70 border border-slate-200/70" : "bg-white border border-slate-100 opacity-60"}`}
                      >
                        <div className="flex items-center justify-between">
                          <p className={`font-black text-[13px] sm:text-sm ${isActive ? "text-emerald-900" : "text-slate-900"}`}>
                            {step.label}
                          </p>
                          <span
                            className={`text-[9.5px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full ${isActive ? "bg-emerald-200 text-emerald-800" : isDone ? "bg-sky-50 text-sky-800" : "text-slate-400"}`}
                          >
                            {step.sub}
                          </span>
                        </div>
                        <p className="text-slate-500 text-xs font-medium mt-0.5 sm:mt-1 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 sm:space-y-5">

            <div className="bg-white rounded-[24px] sm:rounded-[26px] border border-slate-200/70 p-4 sm:p-6 shadow-xs space-y-3 sm:space-y-3.5">
              <div>
                <span className="text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Relawan Bertugas</span>
                <h3 className="font-black text-slate-900 text-base leading-tight mt-0.5">Kontak Pendamping</h3>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-[20px] bg-slate-50/70 border border-slate-200/70">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal-600 text-white flex items-center justify-center font-black text-base sm:text-lg shadow-sm flex-shrink-0">
                  BS
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-slate-900 text-sm sm:text-base leading-snug">Budi Santoso</p>
                  <p className="text-emerald-600 text-xs font-extrabold">Relawan Siaga RT 04 - Aktif</p>
                  <p className="text-slate-400 text-[10.5px] sm:text-[11px] font-medium mt-0.5">Blok C4, No. 12 (50m dari rumah)</p>
                </div>
              </div>

              <a
                href="tel:08123456789"
                className="w-full py-3 sm:py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                </svg>
                <span>Telepon Relawan Langsung</span>
              </a>
            </div>

            <div className="bg-white rounded-[24px] sm:rounded-[26px] border border-slate-200/70 p-4 sm:p-6 shadow-xs space-y-3 sm:space-y-3.5">
              <div>
                <span className="text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Detail Titipan</span>
                <h3 className="font-black text-slate-900 text-base leading-tight mt-0.5">Beli Obat Apotek</h3>
              </div>

              <div className="bg-slate-50/70 border border-slate-200/70 rounded-[18px] p-3.5 sm:p-4 text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Pemohon:</span>
                  <span className="font-black text-slate-800">Bapak Prabowo (Lansia)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Catatan:</span>
                  <span className="font-bold text-slate-800">Obat Darah Tinggi (Amlodipine)</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-slate-100">
                  <span className="text-slate-400 font-medium">Notifikasi Anak:</span>
                  <span className="inline-flex items-center gap-1.5 font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10.5px]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="w-3 h-3 text-emerald-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span>Terkirim ke Dewi (WhatsApp)</span>
                  </span>
                </div>
              </div>

              <button
                onClick={() => setBantuanSelesai(true)}
                className="w-full py-3.5 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-full shadow-md transition-all flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <span>Konfirmasi Bantuan Sudah Diterima</span>
              </button>

              <Link
                href="/lansia"
                className="block text-center text-xs font-bold text-slate-400 hover:text-sky-700 transition-colors pt-1"
              >
                Kembali ke Dashboard Lansia
              </Link>
            </div>

          </div>

        </div>

      </main>

      {bantuanSelesai && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setBantuanSelesai(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-md p-6 sm:p-8 text-center shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 leading-tight">Alhamdulillah, Bantuan Selesai</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-1">
                Terima kasih. Budi Santoso dan Dewi telah menerima konfirmasi bahwa bantuan telah selesai dengan aman.
              </p>
            </div>
            <Link
              href="/lansia"
              className="block w-full py-3.5 bg-[#00624E] hover:bg-[#004d3d] text-white font-black text-xs sm:text-sm rounded-full shadow-md active:scale-95 transition-all"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
