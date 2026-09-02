"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  Phone, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Pill, 
  ShoppingCart, 
  Heart, 
  Home, 
  Package, 
  User, 
  Calendar,
  ArrowRight,
  MessageSquare
} from "lucide-react";

interface RiwayatItemAnak {
  id: string;
  kategori: "obat" | "sayur" | "kontrol" | "rumah";
  judul: string;
  deskripsi: string;
  untuk: string;
  relawan: string;
  tanggal: string;
  waktu: string;
  status: "selesai" | "dibatalkan";
  rating?: number;
  total?: string;
  detail: string[];
}

const RIWAYAT_DATA_ANAK: RiwayatItemAnak[] = [
  {
    id: "1",
    kategori: "obat",
    judul: "Titip Beli Obat Apotek",
    deskripsi: "Amlodipin 5mg, Metformin 500mg",
    untuk: "Bapak Prabowo",
    relawan: "Budi Santoso",
    tanggal: "Rabu, 26 Mei 2024",
    waktu: "08:45 WIB",
    status: "selesai",
    rating: 5,
    total: "Rp 87.500",
    detail: [
      "Amlodipin 5mg — 30 tablet",
      "Metformin 500mg — 30 tablet",
      "Vitamin D3 — 1 botol",
    ],
  },
  {
    id: "2",
    kategori: "sayur",
    judul: "Belanja Sayur Segar",
    deskripsi: "Sayur bayam, wortel, tahu, tempe",
    untuk: "Bapak Prabowo",
    relawan: "Pak Joko",
    tanggal: "Selasa, 25 Mei 2024",
    waktu: "07:30 WIB",
    status: "selesai",
    rating: 4,
    total: "Rp 32.000",
    detail: ["Bayam 1 ikat", "Wortel 1/2 kg", "Tahu putih 4 buah", "Tempe 2 buah"],
  },
  {
    id: "3",
    kategori: "kontrol",
    judul: "Teman Kontrol Puskesmas",
    deskripsi: "Puskesmas Condongcatur",
    untuk: "Bapak Prabowo",
    relawan: "Bu Ani",
    tanggal: "Senin, 20 Mei 2024",
    waktu: "09:00 WIB",
    status: "selesai",
    rating: 5,
    total: "Gratis Kas RT",
    detail: [
      "Cek tensi: 125/80 mmHg",
      "Cek gula darah: 108 mg/dL",
      "Resep dokter diambil",
    ],
  },
  {
    id: "4",
    kategori: "obat",
    judul: "Titip Obat Apotek",
    deskripsi: "Paracetamol 500mg, Antasida",
    untuk: "Ibu Lestari",
    relawan: "Budi Santoso",
    tanggal: "Kamis, 16 Mei 2024",
    waktu: "14:15 WIB",
    status: "selesai",
    rating: 5,
    total: "Rp 24.000",
    detail: ["Paracetamol 500mg — 10 tablet", "Antasida — 1 strip"],
  },
  {
    id: "5",
    kategori: "rumah",
    judul: "Kunjungan & Cek Rumah",
    deskripsi: "Cek kondisi fisik & perbaikan atap",
    untuk: "Bapak Prabowo",
    relawan: "Pak Joko",
    tanggal: "Senin, 13 Mei 2024",
    waktu: "10:00 WIB",
    status: "dibatalkan",
    detail: ["Jadwal ditunda karena hujan lebat", "Dijadwalkan ulang minggu berikutnya"],
  },
];

const KATEGORI_CONFIG = {
  obat: {
    bg: "bg-[#FEE2E2]",
    text: "text-[#DC2626]",
    icon: <Pill className="w-7 h-7 stroke-[2.2]" />,
    label: "Beli Obat",
  },
  sayur: {
    bg: "bg-[#FFEDD5]",
    text: "text-[#EA580C]",
    icon: <ShoppingCart className="w-7 h-7 stroke-[2.2]" />,
    label: "Belanja Sayur",
  },
  kontrol: {
    bg: "bg-[#F3E8FF]",
    text: "text-[#9333EA]",
    icon: <Heart className="w-7 h-7 stroke-[2.2]" />,
    label: "Teman Kontrol",
  },
  rumah: {
    bg: "bg-[#E6F4EA]",
    text: "text-[#00624E]",
    icon: <Home className="w-7 h-7 stroke-[2.2]" />,
    label: "Kunjungan Rumah",
  },
};

const RELAWAN_HIGHLIGHT = [
  { nama: "Budi Santoso", peranan: "Relawan Siaga RT", jumlah: 2, inisial: "BS", bg: "bg-[#00624E]" },
  { nama: "Pak Joko", peranan: "Ketua RT 04", jumlah: 2, inisial: "JW", bg: "bg-amber-500" },
  { nama: "Bu Ani", peranan: "Kader Posyandu", jumlah: 2, inisial: "AN", bg: "bg-rose-500" },
];

export default function RiwayatAnakPage() {
  const [filter, setFilter] = useState<"semua" | "obat" | "sayur" | "kontrol" | "rumah">("semua");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter === "semua" ? RIWAYAT_DATA_ANAK : RIWAYAT_DATA_ANAK.filter((r) => r.kategori === filter);
  const totalSelesai = RIWAYAT_DATA_ANAK.filter((r) => r.status === "selesai").length;
  const totalRelawan = [...new Set(RIWAYAT_DATA_ANAK.map((r) => r.relawan))].length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-36 sm:pb-32 lg:pb-12 bg-[#F8FAFC]">
      
      
      <div>
        <Link
          href="/anak"
          id="btn-back-riwayat-anak"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-[#00624E] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Pemantauan</span>
        </Link>
      </div>

      
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-[#00624E] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            Laporan Gotong Royong
          </span>
          <span className="text-xs text-slate-400 font-bold">• Posko RT 04 Condongcatur</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Riwayat Titipan &amp; Bantuan
        </h1>
        <p className="text-sm sm:text-base font-medium text-slate-500">
          Catatan lengkap bantuan dan laporan serah terima yang telah dilaksanakan relawan untuk orang tua.
        </p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Total Permintaan</span>
            <p className="text-2xl sm:text-3xl font-black text-[#00624E] mt-0.5">{RIWAYAT_DATA_ANAK.length}</p>
            <p className="text-xs text-slate-500 font-bold mt-0.5">Titipan tercatat</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#E6F4EA] text-[#00624E] flex items-center justify-center font-black shadow-2xs">
            <Package className="w-6 h-6 stroke-[2.2]" />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Selesai Berhasil</span>
            <p className="text-2xl sm:text-3xl font-black text-[#00624E] mt-0.5">{totalSelesai}</p>
            <p className="text-xs text-slate-500 font-bold mt-0.5">Diserahkan &amp; diverifikasi</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#E6F4EA] text-[#00624E] flex items-center justify-center font-black shadow-2xs">
            <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Relawan Terlibat</span>
            <p className="text-2xl sm:text-3xl font-black text-[#00624E] mt-0.5">{totalRelawan}</p>
            <p className="text-xs text-slate-500 font-bold mt-0.5">Warga tetangga siaga</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#E6F4EA] text-[#00624E] flex items-center justify-center font-black shadow-2xs">
            <User className="w-6 h-6 stroke-[2.2]" />
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        
        <div className="lg:col-span-8 space-y-4">

          
          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
            {(["semua", "obat", "sayur", "kontrol", "rumah"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all border shrink-0 cursor-pointer active:scale-95 ${
                  filter === f
                    ? "bg-[#00624E] text-white border-[#00624E] shadow-sm shadow-emerald-600/20"
                    : "bg-white text-slate-600 border-slate-200/80 hover:border-emerald-300 hover:text-[#00624E]"
                }`}
              >
                {f === "semua" ? "Semua Kategori" :
                 f === "obat" ? "💊 Beli Obat" :
                 f === "sayur" ? "🛒 Belanja Sayur" :
                 f === "kontrol" ? "💜 Teman Kontrol" : "🏠 Cek Rumah"}
              </button>
            ))}
          </div>

          
          <div className="space-y-3.5 sm:space-y-4">
            {filtered.map((item) => {
              const cfg = KATEGORI_CONFIG[item.kategori];
              const expanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedId(expanded ? null : item.id)}
                    className="w-full p-5 sm:p-6 flex items-start gap-4 sm:gap-5 text-left cursor-pointer hover:bg-slate-50/50 transition-colors"
                  >
                    
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${cfg.bg} ${cfg.text} flex items-center justify-center shrink-0 shadow-2xs`}>
                      {cfg.icon}
                    </div>

                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                              Untuk: {item.untuk}
                            </span>
                          </div>
                          <p className="font-black text-slate-900 text-base sm:text-lg leading-tight mt-1">{item.judul}</p>
                          <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">{item.deskripsi}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          {item.status === "selesai" ? (
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-[#00624E] bg-[#E6F4EA] border border-emerald-200 px-3 py-1 rounded-full">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                              <Clock className="w-3.5 h-3.5" /> Dibatalkan
                            </span>
                          )}
                          {item.total && (
                            <span className="text-xs sm:text-sm font-black text-slate-800 mt-0.5">{item.total}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-3 flex-wrap">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>Relawan: <strong>{item.relawan}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.tanggal}</span>
                        </div>
                      </div>

                      {item.rating && (
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < item.rating! ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`}
                            />
                          ))}
                          <span className="text-xs font-bold text-amber-600 ml-1">Layanan Terverifikasi Baik</span>
                        </div>
                      )}
                    </div>

                    <div className="shrink-0 text-slate-400 mt-1">
                      {expanded ? <ChevronUp className="w-5 h-5 text-slate-600" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {expanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-slate-100 bg-slate-50/50">
                      <div className="pt-4 space-y-3">
                        <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">
                          Rincian Barang / Layanan Titipan
                        </span>
                        <ul className="space-y-2">
                          {item.detail.map((d, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700 bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs">
                              <div className="w-2 h-2 rounded-full bg-[#00624E] shrink-0" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                            <Clock className="w-4 h-4 text-[#00624E]" />
                            <span>Waktu Penyerahan: <strong>{item.waktu}</strong></span>
                          </div>
                          <Link
                            href="/anak/bantuan"
                            className="text-xs font-black text-[#00624E] hover:underline inline-flex items-center gap-1"
                          >
                            Titip Bantuan Ulang →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Gotong Royong</span>
                <h2 className="font-black text-slate-900 text-base leading-tight">Relawan RT 04 Sleman</h2>
              </div>
              <span className="text-xs font-bold text-slate-400">Siap Siaga</span>
            </div>

            <div className="space-y-3">
              {RELAWAN_HIGHLIGHT.map((r) => (
                <div key={r.nama} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl ${r.bg} text-white flex items-center justify-center font-black text-xs shadow-xs`}>
                      {r.inisial}
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm leading-tight">{r.nama}</p>
                      <p className="text-[11px] text-slate-400 font-medium">{r.peranan} • {r.jumlah}x bantu</p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/628123456789"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-2xl bg-white text-emerald-600 border border-slate-200 hover:bg-emerald-50 flex items-center justify-center shadow-2xs active:scale-95 transition-all"
                    title={`Hubungi ${r.nama}`}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          
          <Link
            href="/anak/bantuan"
            id="btn-titip-lagi-riwayat"
            className="group flex items-center justify-between p-5 rounded-3xl bg-[#00624E] hover:bg-[#004d3d] active:scale-[0.98] text-white shadow-sm transition-all text-left"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Perlu Bantuan Baru?</span>
              <h3 className="text-base font-black leading-tight">Titip Bantuan Baru</h3>
              <p className="text-xs text-emerald-100 font-medium mt-0.5">Relawan terdekat siap membantu</p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5 stroke-[2.2]" />
            </div>
          </Link>

        </div>

      </div>

    </div>
  );
}
