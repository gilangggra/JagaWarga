"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  Pill, 
  ShoppingCart, 
  Heart, 
  Home, 
  Check, 
  ArrowRight, 
  Clock, 
  AlertTriangle, 
  Send,
  ShieldCheck,
  PhoneCall
} from "lucide-react";

const BANTUAN_LIST = [
  {
    id: "obat",
    label: "Beli Obat",
    desc: "Apotek & Resep",
    kategori: "obat",
    containerBg: "bg-[#FEE2E2]",
    iconColor: "text-[#DC2626]",
    icon: <Pill className="w-7 h-7 stroke-[2.2]" />,
  },
  {
    id: "sayur",
    label: "Beli Sayur",
    desc: "Warung RT / Pasar",
    kategori: "sayur",
    containerBg: "bg-[#FFEDD5]",
    iconColor: "text-[#EA580C]",
    icon: <ShoppingCart className="w-7 h-7 stroke-[2.2]" />,
  },
  {
    id: "kontrol",
    label: "Teman Jalan",
    desc: "Posyandu & Dokter",
    kategori: "kontrol",
    containerBg: "bg-[#F3E8FF]",
    iconColor: "text-[#9333EA]",
    icon: <Heart className="w-7 h-7 stroke-[2.2]" />,
  },
  {
    id: "cek_rumah",
    label: "Cek Rumah",
    desc: "Kunjungan Fisik & Tensi",
    kategori: "cek_rumah",
    containerBg: "bg-[#E6F4EA]",
    iconColor: "text-[#00624E]",
    icon: <Home className="w-7 h-7 stroke-[2.2]" />,
  },
];

const RIWAYAT_BANTUAN = [
  {
    id: "req-1",
    kategori: "Beli Obat Apotek",
    detail: "Amlodipine 5mg (1 strip) + Vitamin C",
    untuk: "Bapak Prabowo",
    relawan: "Budi Santoso",
    jarak: "50m",
    waktu: "Hari ini, 10:42 WIB",
    status: "Sedang Berjalan",
    statusBadge: "bg-sky-50 text-sky-800 border-sky-200",
  },
  {
    id: "req-2",
    kategori: "Belanja Sayur",
    detail: "Bayam 2 ikat, tahu putih, buah pisang",
    untuk: "Bapak Prabowo",
    relawan: "Bu Ani",
    jarak: "120m",
    waktu: "Kemarin, 16:30 WIB",
    status: "Selesai Diterima",
    statusBadge: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    id: "req-3",
    kategori: "Cek Rumah & Tensi",
    detail: "Pemeriksaan tensi darah rutin mingguan",
    untuk: "Bapak Prabowo",
    relawan: "Pak Joko",
    jarak: "100m",
    waktu: "22 Agustus 2026",
    status: "Selesai Diterima",
    statusBadge: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
];

function BantuanContent() {
  const searchParams = useSearchParams();
  const initialKategori = searchParams.get("kategori") ?? "obat";
  const isDarurat = searchParams.get("darurat") === "1";

  const [selectedKategori, setSelectedKategori] = useState(
    BANTUAN_LIST.find((b) => b.kategori === initialKategori)?.id ?? "obat"
  );
  const [targetOrtu, setTargetOrtu] = useState<"prabowo" | "lestari">("prabowo");
  const [catatan, setCatatan] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showDaruratModal, setShowDaruratModal] = useState(isDarurat);

  useEffect(() => {
    if (isDarurat) setShowDaruratModal(true);
  }, [isDarurat]);

  const selectedItem = BANTUAN_LIST.find((b) => b.id === selectedKategori) ?? BANTUAN_LIST[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 7000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-36 sm:pb-32 lg:pb-12 bg-[#F8FAFC]">

      {showDaruratModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowDaruratModal(false)} />
          <div className="relative bg-white rounded-3xl w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#DC2626] text-white flex items-center justify-center shadow-md">
              <AlertTriangle className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Bantuan Darurat Posko RT 04</h3>
              <p className="text-slate-500 text-xs font-medium mt-1 leading-relaxed">
                Relawan siaga dan pengurus RT 04 akan segera dihubungi untuk mendatangi rumah orang tua Anda seketika.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <a
                href="tel:112"
                className="w-full py-3.5 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Panggil Posko Darurat RT / 112</span>
              </a>
              <button
                onClick={() => setShowDaruratModal(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-2xl transition-all cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <Link
          href="/anak"
          id="btn-back-bantuan-anak"
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-700 hover:text-[#00624E] font-black text-xs sm:text-sm shadow-2xs transition-all active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#00624E] group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Titip Bantuan Jarak Jauh
        </h1>
        <p className="text-sm sm:text-base font-medium text-slate-500">
          Pesan obat, belanjaan, atau minta tolong relawan terdekat untuk cek orang tua di RT 04.
        </p>
      </div>

      {isSuccess && (
        <div className="bg-[#00624E] text-white p-4 sm:p-5 rounded-3xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-white stroke-[3]" />
            </div>
            <div>
              <p className="font-black text-sm">Titipan Berhasil Diteruskan ke Relawan RT 04 (Pak Teddy)</p>
              <p className="text-emerald-100 text-xs font-medium mt-0.5">
                Relawan terdekat telah menerima notifikasi tugas dan sedang menuju Apotek K-24 Gejayan.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <Link
              href="/anak/status"
              className="px-4 py-2 bg-white text-[#00624E] font-black text-xs rounded-xl hover:bg-emerald-50 transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Lacak Pengantaran</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setIsSuccess(false)}
              className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        <div className="lg:col-span-7 space-y-6">

          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#00624E] text-white font-black text-xs flex items-center justify-center">
                1
              </span>
              <h2 className="font-black text-slate-900 text-base sm:text-lg">
                Pilih Kebutuhan
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {BANTUAN_LIST.map((item) => {
                const isSelected = selectedKategori === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    id={`bantuan-${item.id}`}
                    onClick={() => setSelectedKategori(item.id)}
                    className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 min-h-[140px] sm:min-h-[155px] active:scale-[0.98] cursor-pointer ${
                      isSelected
                        ? "bg-[#E6F4EA] border-[2.5px] border-[#00624E] shadow-sm"
                        : "bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-2xs"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center ${item.containerBg} ${item.iconColor} shadow-2xs group-hover:scale-105 transition-transform`}>
                        {item.icon}
                      </div>

                      {isSelected && (
                        <span className="w-6 h-6 bg-[#00624E] text-white rounded-full flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      )}
                    </div>

                    <div className="mt-3">
                      <p className={`font-black text-sm sm:text-base leading-tight ${isSelected ? "text-[#00624E]" : "text-slate-900"}`}>
                        {item.label}
                      </p>
                      <p className={`text-xs font-medium mt-0.5 ${isSelected ? "text-emerald-900/80" : "text-slate-500"}`}>
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#00624E] text-white font-black text-xs flex items-center justify-center">
                2
              </span>
              <h2 className="font-black text-slate-900 text-base sm:text-lg">
                Sampaikan Detail Bantuan
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Target Orang Tua yang Menerima:</label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setTargetOrtu("prabowo")}
                    className={`p-3 rounded-2xl border text-left transition-all active:scale-95 cursor-pointer ${
                      targetOrtu === "prabowo"
                        ? "bg-[#E6F4EA] border-[#00624E] shadow-2xs"
                        : "bg-slate-50 border-slate-200/80 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className={`font-black text-xs sm:text-sm ${targetOrtu === "prabowo" ? "text-[#00624E]" : "text-slate-900"}`}>
                        Bapak Prabowo
                      </p>
                      {targetOrtu === "prabowo" && <Check className="w-4 h-4 text-[#00624E] stroke-[3]" />}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">Blok C4 No. 12 (Sleman)</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetOrtu("lestari")}
                    className={`p-3 rounded-2xl border text-left transition-all active:scale-95 cursor-pointer ${
                      targetOrtu === "lestari"
                        ? "bg-[#E6F4EA] border-[#00624E] shadow-2xs"
                        : "bg-slate-50 border-slate-200/80 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className={`font-black text-xs sm:text-sm ${targetOrtu === "lestari" ? "text-[#00624E]" : "text-slate-900"}`}>
                        Ibu Lestari
                      </p>
                      {targetOrtu === "lestari" && <Check className="w-4 h-4 text-[#00624E] stroke-[3]" />}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">Blok C4 No. 12 (Sleman)</p>
                  </button>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F4EA] border border-emerald-200 text-[#00624E] text-xs font-black shadow-2xs">
                <span>Kebutuhan: {selectedItem.label} ({selectedItem.desc})</span>
              </div>

              <textarea
                required
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Contoh: Tolong belikan Amlodipin 5mg satu strip di Apotek K-24 Gejayan..."
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 text-sm placeholder:text-slate-400 resize-none focus:bg-white focus:border-[#00624E] focus:ring-2 focus:ring-emerald-100 focus:outline-none transition-all font-medium leading-relaxed"
              />

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#E6F4EA]/80 border border-emerald-200 text-[#00624E] text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#00624E] animate-pulse shrink-0" />
                <span>Otomatis diteruskan ke relawan terdekat saat tombol ditekan.</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-black text-sm sm:text-base text-white shadow-sm bg-[#00624E] hover:bg-[#004d3d] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Kirim Permintaan ke RT 04</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </div>

        </div>

        <div className="lg:col-span-5 space-y-6">

          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Transparansi Warga</span>
                <h3 className="font-black text-slate-900 text-base leading-tight mt-0.5">
                  Riwayat Titipan Bantuan
                </h3>
              </div>
              <span className="text-[11px] font-black text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                {RIWAYAT_BANTUAN.length} Catatan
              </span>
            </div>

            <div className="space-y-3">
              {RIWAYAT_BANTUAN.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${item.statusBadge}`}>
                      {item.status}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{item.waktu}</span>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 text-sm leading-snug">{item.kategori}</h4>
                    <p className="text-slate-600 text-xs font-medium mt-0.5 leading-relaxed">{item.detail}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">Untuk:</span>
                      <span className="font-black text-slate-800">{item.untuk}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">Oleh:</span>
                      <span className="font-black text-[#00624E]">{item.relawan} ({item.jarak})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default function AnakBantuanPage() {
  return (
    <Suspense>
      <BantuanContent />
    </Suspense>
  );
}
