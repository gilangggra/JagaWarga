"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeft, 
  Activity, 
  Pill, 
  Calendar, 
  Heart, 
  ArrowRight, 
  Check, 
  Phone, 
  AlertCircle,
  Stethoscope,
  Plus
} from "lucide-react";

const TABS = [
  { id: "prabowo", label: "Bapak Prabowo (68 Thn)" },
  { id: "lestari", label: "Ibu Lestari (65 Thn)" },
];

const DATA_PRABOWO = {
  usia: "68 Tahun",
  golDarah: "O+",
  kondisi: "Hipertensi Terkontrol",
  rerataTensi: "125/80 mmHg",
  tren: "Stabil & Menurun Baik",
  obatAktif: "2 Jenis Harian",
  obatDetail: "Amlodipine & Vit B Kompleks",
  jadwal: "Sabtu, 29 Ags",
  jadwalDetail: "Posyandu Balai RT 04 (08:30 WIB)",
  obatList: [
    {
      nama: "Amlodipine 5mg",
      fungsi: "Obat Darah Tinggi (Hipertensi)",
      aturan: "1x sehari (12:30 WIB)",
      stok: "12 Tablet — Cukup 12 Hari",
      stokOk: true,
    },
    {
      nama: "Vitamin B Kompleks",
      fungsi: "Suplemen Saraf & Energi",
      aturan: "1x sehari (08:00 WIB)",
      stok: "20 Tablet — Cukup 20 Hari",
      stokOk: true,
    },
    {
      nama: "Paracetamol 500mg",
      fungsi: "Pereda Nyeri / Demam (Bila Perlu)",
      aturan: "Maks. 3x sehari bila sakit",
      stok: "4 Tablet — Perlu Tambah",
      stokOk: false,
    },
  ],
  riwayatTensi: [
    { tgl: "26 Ags 2026", sistol: 125, diastol: 80, status: "Normal", pemeriksa: "Kader Posyandu (Bu Ani)" },
    { tgl: "19 Ags 2026", sistol: 128, diastol: 82, status: "Normal", pemeriksa: "Kader Posyandu (Bu Ani)" },
    { tgl: "12 Ags 2026", sistol: 132, diastol: 85, status: "Pra-Hipertensi", pemeriksa: "dr. Hendra (Puskesmas)" },
    { tgl: "05 Ags 2026", sistol: 138, diastol: 88, status: "Pra-Hipertensi", pemeriksa: "Kader Posyandu (Bu Ani)" },
  ],
};

const DATA_LESTARI = {
  usia: "65 Tahun",
  golDarah: "A+",
  kondisi: "Belum Check-in Hari Ini",
  rerataTensi: "120/78 mmHg",
  tren: "Stabil Normal",
  obatAktif: "2 Jenis Harian",
  obatDetail: "Metformin & Vitamin D3",
  jadwal: "Rabu, 2 Sep",
  jadwalDetail: "Puskesmas Sleman (09:00 WIB)",
  obatList: [
    {
      nama: "Metformin 500mg",
      fungsi: "Pengontrol Gula Darah (Diabetes Tipe 2)",
      aturan: "2x sehari (07:00 & 19:00 WIB)",
      stok: "8 Tablet — Perlu Tambah",
      stokOk: false,
    },
    {
      nama: "Vitamin D3 1000IU",
      fungsi: "Suplemen Tulang & Imunitas",
      aturan: "1x sehari (07:00 WIB)",
      stok: "15 Tablet — Cukup 15 Hari",
      stokOk: true,
    },
  ],
  riwayatTensi: [
    { tgl: "19 Ags 2026", sistol: 118, diastol: 75, status: "Normal", pemeriksa: "Kader Posyandu" },
    { tgl: "12 Ags 2026", sistol: 122, diastol: 78, status: "Normal", pemeriksa: "Kader Posyandu" },
    { tgl: "05 Ags 2026", sistol: 120, diastol: 76, status: "Normal", pemeriksa: "Puskesmas Sleman" },
  ],
};

export default function AnakKesehatanPage() {
  const [activeTab, setActiveTab] = useState<"prabowo" | "lestari">("prabowo");
  const data = activeTab === "prabowo" ? DATA_PRABOWO : DATA_LESTARI;
  const isPrabowo = activeTab === "prabowo";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-36 sm:pb-32 lg:pb-12 bg-[#F8FAFC]">

      
      <div>
        <Link
          href="/anak"
          id="btn-back-kesehatan-anak"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-[#00624E] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Catatan Kesehatan Keluarga
        </h1>
        <p className="text-sm sm:text-base font-medium text-slate-500">
          Rekam medis, riwayat tekanan darah berkala, dan inventaris obat harian orang tua.
        </p>
      </div>

      
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-1.5 shadow-2xs flex gap-1.5 max-w-lg">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as "prabowo" | "lestari")}
              className={`flex-1 py-3 text-xs sm:text-sm font-black rounded-xl sm:rounded-2xl transition-all cursor-pointer ${
                isActive
                  ? "bg-[#00624E] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-bold"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Usia &amp; Gol. Darah</span>
          <p className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{data.usia} / {data.golDarah}</p>
          <p className="text-slate-500 text-xs font-medium">{isPrabowo ? "Bapak Prabowo" : "Ibu Lestari"}</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Rerata Tensi</span>
          <p className="text-xl sm:text-2xl font-black text-[#00624E] leading-tight">{data.rerataTensi}</p>
          <p className="text-xs font-bold text-emerald-700">{data.tren}</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Obat Aktif</span>
          <p className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{data.obatAktif}</p>
          <p className="text-slate-500 text-xs font-medium truncate">{data.obatDetail}</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Posyandu / Kontrol</span>
          <p className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{data.jadwal}</p>
          <p className="text-amber-700 text-xs font-bold truncate">{data.jadwalDetail}</p>
        </div>

      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        
        <div className="lg:col-span-7 space-y-6">

          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Pemeriksaan Berkala</span>
                <h3 className="font-black text-slate-900 text-base sm:text-lg leading-tight mt-0.5">
                  Riwayat Tekanan Darah Mingguan
                </h3>
              </div>
              <span className="text-[11px] font-black text-[#00624E] bg-[#E6F4EA] border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Posyandu RT 04
              </span>
            </div>

            <div className="space-y-3">
              {data.riwayatTensi.map((t, idx) => {
                const isNormal = t.status === "Normal";
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-black text-slate-900 text-sm">{t.tgl}</span>
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                          isNormal
                            ? "text-[#00624E] bg-[#E6F4EA] border-emerald-200"
                            : "text-amber-800 bg-amber-50 border-amber-200"
                        }`}>
                          {t.status}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs font-medium truncate">{t.pemeriksa}</p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-lg sm:text-xl font-black text-slate-900">{t.sistol}/{t.diastol}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">mmHg</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          
          <div className="bg-gradient-to-br from-[#E6F4EA]/80 via-[#F3FAF5] to-white border border-emerald-200/90 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-black text-slate-900 text-base leading-snug">
                Perlu Tebus Obat atau Cek Fisik ke Rumah?
              </h3>
              <p className="text-slate-600 text-xs font-medium">
                Titipkan ke relawan RT 04. Obat dan kunjungan langsung diantar ke {isPrabowo ? "Bapak Prabowo" : "Ibu Lestari"}.
              </p>
            </div>
            <Link
              href="/anak/bantuan?kategori=obat"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span>Titip Bantuan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        
        <div className="lg:col-span-5 space-y-6">

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Inventaris Rumah</span>
                <h3 className="font-black text-slate-900 text-base leading-tight mt-0.5">
                  Daftar Obat Rutin
                </h3>
              </div>
              <span className="text-[11px] font-black text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                {data.obatList.length} Macam
              </span>
            </div>

            <div className="space-y-3">
              {data.obatList.map((obat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-black text-slate-900 text-sm leading-snug">{obat.nama}</h4>
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border flex-shrink-0 ${
                      obat.stokOk
                        ? "bg-[#E6F4EA] text-[#00624E] border-emerald-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}>
                      {obat.stokOk ? "Cukup" : "Menipis"}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">{obat.fungsi}</p>
                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-bold">Aturan: {obat.aturan}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-400">{obat.stok}</p>
                </div>
              ))}
            </div>

            <Link
              href="/anak/bantuan?kategori=obat"
              className="w-full py-3.5 rounded-2xl bg-[#E6F4EA] hover:bg-emerald-100 text-[#00624E] border border-emerald-200 font-black text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Titip Tebus Obat Baru</span>
            </Link>
          </div>

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Tenaga Medis Lingkungan</span>
              <span className="text-[10.5px] font-black text-[#00624E] bg-[#E6F4EA] border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Kader Posyandu
              </span>
            </div>
            <p className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
              Bu Ani (Kader Posyandu Lansia RT 04) bertanggung jawab mencatat tensi mingguan dan mengingatkan jadwal kontrol ke Puskesmas.
            </p>
            <a
              href="tel:08123456787"
              className="inline-flex items-center gap-2 text-xs font-black text-[#00624E] hover:underline pt-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hubungi Bu Ani via Telepon (0812-3456-787)</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}

