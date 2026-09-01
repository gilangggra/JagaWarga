"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ALKES_LIST = [
  {
    id: "kursi-roda",
    nama: "Kursi Roda Lipat Medis",
    status: "tersedia" as const,
    unitText: "2 Unit Tersedia",
    keterangan: "Tersedia 2 unit di Pos RT 04",
    estimasi: "Siap Antar (< 5 Menit)",
    bg: "bg-teal-600",
    lightBg: "bg-teal-50",
    lightText: "text-teal-700",
    lightBorder: "border-teal-200",
    photoSrc: "/alkes-kursi-roda.jpg",
    desc: "Ringan, mudah dilipat, dilengkapi rem tangan ganda dan pijakan kaki nyaman.",
    spesifikasi: [
      { label: "Material", value: "Aluminium ringan anti-karat" },
      { label: "Kapasitas Berat", value: "Maks. 120 kg" },
      { label: "Lebar Dudukan", value: "45 cm" },
      { label: "Fitur", value: "Rem tangan ganda, pijakan kaki lipat" },
      { label: "Kondisi", value: "Baik, sudah didesinfeksi" },
    ],
    kondisi: "Sangat Baik",
    kondisiBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    id: "tabung-o2",
    nama: "Tabung Oksigen + Regulator",
    status: "dipinjam" as const,
    unitText: "Sedang Dipinjam",
    peminjamInfo: "Sedang Dipinjam Bu Siti (Blok D2)",
    estimasiKembali: "Estimasi Kembali: Besok Sore",
    keterangan: "Sedang digunakan warga Blok D2",
    estimasi: "Antre Pengembalian",
    bg: "bg-slate-600",
    lightBg: "bg-amber-50",
    lightText: "text-amber-800",
    lightBorder: "border-amber-200",
    photoSrc: "/alkes-tabung-o2.jpg",
    desc: "Tabung oksigen medis lengkap dengan regulator, selang kanula steril baru, dan troli roda.",
    spesifikasi: [
      { label: "Kapasitas Tabung", value: "1 kubik (isi penuh)" },
      { label: "Regulator", value: "Flow-meter 0-15 L/min" },
      { label: "Peminjam Saat Ini", value: "Ibu Siti (Blok D2, No. 04)" },
      { label: "Tgl Pengembalian", value: "Besok (16:00 WIB)" },
      { label: "Kondisi", value: "Terawat, refill gratis Kas RT" },
    ],
    kondisi: "Dipinjam Warga",
    kondisiBg: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    id: "tongkat",
    nama: "Tongkat Jalan Kaki Empat",
    status: "tersedia" as const,
    unitText: "3 Unit Tersedia",
    keterangan: "Tersedia 3 unit di Pos RT",
    estimasi: "Siap Antar (< 5 Menit)",
    bg: "bg-amber-600",
    lightBg: "bg-amber-50",
    lightText: "text-amber-700",
    lightBorder: "border-amber-200",
    photoSrc: "/alkes-tongkat-jalan.jpg",
    desc: "Ketinggian dapat diatur 10 tingkat, karet anti-selip kokoh, pegangan busa ergonomis.",
    spesifikasi: [
      { label: "Material", value: "Aluminium anodized" },
      { label: "Tinggi", value: "Adjustable 76-101 cm (10 tingkat)" },
      { label: "Kaki", value: "4 titik karet anti-selip" },
      { label: "Pegangan", value: "Busa ergonomis nyaman" },
      { label: "Kondisi", value: "Baik, sudah didesinfeksi" },
    ],
    kondisi: "Sangat Baik",
    kondisiBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
];

export default function AlkesPage() {
  const [selectedAlkes, setSelectedAlkes] = useState<typeof ALKES_LIST[0] | null>(null);
  const [detailAlkes, setDetailAlkes] = useState<typeof ALKES_LIST[0] | null>(null);
  const [pinjamSuccess, setPinjamSuccess] = useState<string | null>(null);
  const [reminderSuccess, setReminderSuccess] = useState<string | null>(null);

  const handlePinjam = (nama: string) => {
    setSelectedAlkes(null);
    setPinjamSuccess(nama);
    setTimeout(() => setPinjamSuccess(null), 4500);
  };

  const handleSetReminder = (nama: string) => {
    setReminderSuccess(nama);
    setTimeout(() => setReminderSuccess(null), 4500);
  };

  return (
    <div className="flex flex-col flex-1 min-h-full font-sans pb-32 lg:pb-12 bg-[#F8FAFC]">

      <header className="lg:hidden sticky top-0 z-20 pt-3 px-4 pb-2">
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/60 px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/lansia"
              id="btn-back-alkes-mobile"
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-600 flex items-center justify-center active:scale-95 transition-all"
              title="Kembali ke Beranda"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </Link>
            <div>
              <p className="text-teal-700 text-[10px] font-black uppercase tracking-wider">Kas Jimpitan Warga</p>
              <h1 className="text-[15px] font-black text-slate-900 leading-none">Pinjam Alkes Kas RT</h1>
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
              Pinjam Alkes Kas RT
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-800 text-xs font-black">3 Relawan Siaga RT 04</span>
          </div>
        </div>

        {pinjamSuccess && (
          <div className="bg-[#00624E] text-white p-4 sm:p-5 rounded-[24px] sm:rounded-[26px] shadow-sm flex items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="font-black text-sm">Permintaan Pinjam Berhasil Dikirim</p>
                <p className="text-emerald-100 text-xs font-medium mt-0.5">
                  <strong>{pinjamSuccess}</strong> akan segera diantar relawan ke rumah Bapak Prabowo.
                </p>
              </div>
            </div>
            <Link
              href="/lansia/status"
              className="px-4 py-2 bg-white text-emerald-900 font-black text-xs rounded-full shadow-xs hover:bg-emerald-50 active:scale-95 transition-all shrink-0"
            >
              Lihat Status
            </Link>
          </div>
        )}

        {reminderSuccess && (
          <div className="bg-amber-600 text-white p-4 sm:p-5 rounded-[24px] sm:rounded-[26px] shadow-sm flex items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
              </div>
              <div>
                <p className="font-black text-sm">Pengingat Diaktifkan</p>
                <p className="text-amber-100 text-xs font-medium mt-0.5">
                  Kami akan memberi tahu Bapak Prabowo otomatis via WhatsApp segera setelah <strong>{reminderSuccess}</strong> kembali ke Pos RT.
                </p>
              </div>
            </div>
            <button
              onClick={() => setReminderSuccess(null)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-black text-xs rounded-full transition-all shrink-0"
            >
              Mengerti
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {ALKES_LIST.map((alkes) => {
            const isTersedia = alkes.status === "tersedia";

            return (
              <div
                key={alkes.id}
                className={`bg-white rounded-[24px] sm:rounded-[26px] border border-slate-200/70 shadow-xs overflow-hidden flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all duration-200 ${
                  !isTersedia ? "opacity-95" : ""
                }`}
              >
                <div className="h-44 sm:h-48 relative overflow-hidden bg-slate-100 flex items-center justify-center">
                  <Image
                    src={alkes.photoSrc}
                    alt={`Foto ${alkes.nama}`}
                    fill
                    className={`object-cover transition-transform duration-300 ${
                      !isTersedia ? "grayscale-[0.5] opacity-80" : ""
                    }`}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-black/20" />

                  <span className={`absolute top-3.5 left-3.5 backdrop-blur-md text-[10px] sm:text-[10.5px] font-black px-2.5 py-0.5 rounded-full shadow-2xs border ${
                    isTersedia
                      ? "bg-white/95 text-emerald-800 border-white/60"
                      : "bg-amber-500 text-white border-amber-400"
                  }`}>
                    {alkes.unitText}
                  </span>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5 sm:space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-black text-slate-900 text-base leading-snug">{alkes.nama}</h3>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed">{alkes.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                    {isTersedia ? (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-medium">Lokasi:</span>
                          <span className="font-bold text-slate-700">{alkes.keterangan}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-medium">Pengantaran:</span>
                          <span className="font-black text-teal-700">{alkes.estimasi}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-medium">Peminjam:</span>
                          <span className="font-black text-amber-800">Bu Siti (Blok D2)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-medium">Status:</span>
                          <span className="font-bold text-amber-700">{alkes.estimasiKembali}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => setDetailAlkes(alkes)}
                      className="w-full py-2.5 rounded-full font-bold text-xs border transition-all active:scale-95 flex items-center justify-center gap-2 text-slate-700 border-slate-200/80 bg-slate-50/70 hover:bg-slate-100 hover:border-slate-300"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-3.5 h-3.5 text-slate-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                      <span>Lihat Spesifikasi &amp; Foto</span>
                    </button>

                    {isTersedia ? (
                      <button
                        onClick={() => setSelectedAlkes(alkes)}
                        className="w-full py-3 rounded-full font-black text-xs text-white shadow-xs bg-[#00624E] hover:bg-[#004d3d] active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <span>Ajukan Pinjam Gratis</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSetReminder(alkes.nama)}
                        className="w-full py-3 rounded-full font-black text-xs text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 shadow-2xs active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-3.5 h-3.5 text-amber-900">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                        </svg>
                        <span>Ingatkan Saat Kembali</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-[24px] sm:rounded-[26px] border border-slate-200/70 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 text-amber-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.999-3.199a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>
            </div>
            <div>
              <p className="font-black text-slate-900 text-sm">Ingin Berdonasi Alkes / Kas Jimpitan?</p>
              <p className="text-slate-500 text-xs font-medium mt-0.5">
                Hubungi pengurus RT 04 untuk menyumbangkan alat kesehatan demi kemanfaatan bersama.
              </p>
            </div>
          </div>
          <Link
            href="/lansia"
            className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all shrink-0"
          >
            Hubungi Pengurus RT
          </Link>
        </div>

      </main>

      {detailAlkes && (
        <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setDetailAlkes(null)}
          />
          <div className="relative bg-white w-full sm:max-w-md rounded-t-[32px] sm:rounded-[32px] shadow-2xl border border-slate-100 z-10 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="relative w-full h-52 sm:h-56 flex-shrink-0 bg-slate-100">
              <Image
                src={detailAlkes.photoSrc}
                alt={`Foto ${detailAlkes.nama}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <button
                onClick={() => setDetailAlkes(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center active:scale-95 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <span className={`text-[10px] font-black px-3 py-0.5 rounded-full border ${detailAlkes.kondisiBg}`}>
                  {detailAlkes.kondisi}
                </span>
                <span className="text-[10px] font-black px-3 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-slate-800 border border-white/50">
                  {detailAlkes.unitText}
                </span>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-4">
              <div>
                <h3 className="font-black text-slate-900 text-lg leading-tight">{detailAlkes.nama}</h3>
                <p className="text-slate-500 text-xs font-medium mt-1 leading-relaxed">{detailAlkes.desc}</p>
              </div>

              <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-4 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Spesifikasi Teknis</p>
                {detailAlkes.spesifikasi.map((spec) => (
                  <div key={spec.label} className="flex items-start justify-between gap-3 text-xs">
                    <span className="text-slate-400 font-medium flex-shrink-0">{spec.label}</span>
                    <span className="font-bold text-slate-800 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className={`flex items-center gap-3 p-3.5 rounded-2xl ${detailAlkes.lightBg} border ${detailAlkes.lightBorder}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${detailAlkes.bg} text-white flex-shrink-0`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
                <div>
                  <p className={`text-xs font-black ${detailAlkes.lightText}`}>{detailAlkes.estimasi}</p>
                  <p className="text-[10.5px] text-slate-500 font-medium">Gratis diantar relawan RT ke rumah Anda</p>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                {detailAlkes.status === "tersedia" ? (
                  <button
                    onClick={() => {
                      setDetailAlkes(null);
                      setSelectedAlkes(detailAlkes);
                    }}
                    className="w-full py-3.5 rounded-full font-black text-xs text-white shadow-xs bg-[#00624E] hover:bg-[#004d3d] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Ajukan Pinjam Gratis</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const nama = detailAlkes.nama;
                      setDetailAlkes(null);
                      handleSetReminder(nama);
                    }}
                    className="w-full py-3.5 rounded-full font-black text-xs text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 shadow-2xs active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-3.5 h-3.5 text-amber-900">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                    <span>Ingatkan Saat Kembali</span>
                  </button>
                )}
                <button
                  onClick={() => setDetailAlkes(null)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-full transition-all"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedAlkes && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setSelectedAlkes(null)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm shadow-2xl border border-slate-100 z-10 overflow-hidden">
            <div className={`h-1.5 w-full ${selectedAlkes.bg}`} />
            <div className="p-6 space-y-4 text-center">
              <div className={`w-14 h-14 mx-auto rounded-2xl ${selectedAlkes.bg} text-white flex items-center justify-center shadow-md`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 6.75V18M12 18H8.25M12 18h3.75M8.25 18v-4.5a3.75 3.75 0 1 1 7.5 0V18" />
                </svg>
              </div>

              <div>
                <span className="inline-block px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black mb-1.5">
                  Pinjam Bebas Biaya
                </span>
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  Konfirmasi Pinjam {selectedAlkes.nama}
                </h3>
                <p className="text-slate-500 text-xs font-medium mt-1">
                  Alat akan diantar langsung ke rumah <strong>Bapak Prabowo (Blok C4, No. 12)</strong> oleh relawan siaga.
                </p>
              </div>

              <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-3.5 text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Durasi:</span>
                  <span className="font-bold text-slate-800">Sesuai Kebutuhan</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Biaya:</span>
                  <span className="font-black text-emerald-600">Rp 0 (Gratis Kas RT)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pengantar:</span>
                  <span className="font-bold text-teal-700">Budi Santoso (50m)</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => handlePinjam(selectedAlkes.nama)}
                  className="w-full py-3.5 rounded-full font-black text-xs text-white shadow-xs bg-[#00624E] hover:bg-[#004d3d] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Konfirmasi &amp; Antar Sekarang</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedAlkes(null)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-full transition-all"
                >
                  Batalkan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
