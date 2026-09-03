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
  Plus,
  TrendingDown,
  User,
  Bell,
  ChevronRight
} from "lucide-react";

const DATA_PRABOWO = {
  usia: "68 Tahun",
  golDarah: "O+",
  kondisi: "Hipertensi Terkontrol",
  rerataTensi: "125/80 mmHg",
  tren: "Stabil Normal",
  obatAktif: "2 Jenis Harian",
  obatDetail: "Amlodipin & Vit B",
  jadwal: "Sabtu, 29 Mei 2024",
  jadwalDetail: "Posyandu Balai RT 04 (08:30 WIB)",
  obatList: [
    {
      nama: "Amlodipine 5mg",
      fungsi: "Obat Darah Tinggi (Hipertensi)",
      aturan: "1x sehari (12:30 WIB)",
      stok: "Sisa 12 H (12 Tablet)",
      stokBadge: "Cukup: Sisa 12 H",
      stokOk: true,
    },
    {
      nama: "Vitamin B Kompleks",
      fungsi: "Suplemen Saraf & Energi",
      aturan: "1x sehari (08:00 WIB)",
      stok: "Sisa 20 H (20 Tablet)",
      stokBadge: "Cukup: Sisa 20 H",
      stokOk: true,
    },
    {
      nama: "Paracetamol 500mg",
      fungsi: "Bila sakit demam / pusing",
      aturan: "Maks. 3x sehari bila sakit",
      stok: "Sisa 4T (Perlu Tambah)",
      stokBadge: "Menipis: Sisa 4T",
      stokOk: false,
    },
  ],
  riwayatTensi: [
    { tgl: "26 Mei 2024", sistol: 125, diastol: 80, status: "Normal", pemeriksa: "Kader Posyandu (Bu Ani)" },
    { tgl: "19 Mei 2024", sistol: 128, diastol: 82, status: "Normal", pemeriksa: "Kader Posyandu (Bu Ani)" },
    { tgl: "12 Mei 2024", sistol: 132, diastol: 85, status: "Pra-Hipertensi", pemeriksa: "dr. Hendra (Puskesmas)" },
    { tgl: "05 Mei 2024", sistol: 138, diastol: 88, status: "Pra-Hipertensi", pemeriksa: "Kader Posyandu (Bu Ani)" },
  ],
};

const DATA_LESTARI = {
  usia: "65 Tahun",
  golDarah: "A+",
  kondisi: "Belum Check-in Hari Ini",
  rerataTensi: "120/78 mmHg",
  tren: "Stabil Normal",
  obatAktif: "2 Jenis Harian",
  obatDetail: "Metformin & Vit D3",
  jadwal: "Rabu, 05 Jun 2024",
  jadwalDetail: "Puskesmas Sleman (09:00 WIB)",
  obatList: [
    {
      nama: "Metformin 500mg",
      fungsi: "Pengontrol Gula Darah (Diabetes Tipe 2)",
      aturan: "2x sehari (07:00 & 19:00 WIB)",
      stok: "Sisa 8 Tablet (Perlu Tambah)",
      stokBadge: "Menipis: Sisa 8T",
      stokOk: false,
    },
    {
      nama: "Vitamin D3 1000IU",
      fungsi: "Suplemen Tulang & Imunitas",
      aturan: "1x sehari (07:00 WIB)",
      stok: "Sisa 15 H (15 Tablet)",
      stokBadge: "Cukup: Sisa 15 H",
      stokOk: true,
    },
  ],
  riwayatTensi: [
    { tgl: "26 Mei 2024", sistol: 120, diastol: 78, status: "Normal", pemeriksa: "Kader Posyandu" },
    { tgl: "19 Mei 2024", sistol: 118, diastol: 75, status: "Normal", pemeriksa: "Kader Posyandu" },
    { tgl: "12 Mei 2024", sistol: 122, diastol: 78, status: "Normal", pemeriksa: "Puskesmas Sleman" },
    { tgl: "05 Mei 2024", sistol: 120, diastol: 76, status: "Normal", pemeriksa: "Kader Posyandu" },
  ],
};

export default function AnakKesehatanPage() {
  const [activeTab, setActiveTab] = useState<"prabowo" | "lestari">("prabowo");
  const data = activeTab === "prabowo" ? DATA_PRABOWO : DATA_LESTARI;
  const isPrabowo = activeTab === "prabowo";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-36 sm:pb-32 lg:pb-12 bg-[#F8FAFC]">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link
          href="/anak"
          id="btn-back-kesehatan-anak"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 text-xs sm:text-sm font-black text-slate-700 hover:text-[#00624E] shadow-2xs hover:shadow-xs transition-all self-start active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-[#00624E] group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-xs font-black text-slate-700 shadow-2xs">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#00624E] flex items-center justify-center">
              <User className="w-3.5 h-3.5" />
            </div>
            <span>Dimas Prasetyo (Wali)</span>
          </div>

          <div className="w-9 h-9 rounded-full bg-white border border-slate-200/90 flex items-center justify-center text-slate-600 shadow-2xs relative">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-1.5 right-1.5 ring-2 ring-white" />
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Catatan Kesehatan Keluarga
        </h1>
        <p className="text-sm sm:text-base font-medium text-slate-500">
          Rekam medis berkala, pemantauan tensi, dan inventaris obat harian orang tua.
        </p>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-1.5 shadow-2xs flex gap-1.5 max-w-md">
        <button
          type="button"
          onClick={() => setActiveTab("prabowo")}
          className={`flex-1 py-3 text-xs sm:text-sm font-black rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isPrabowo
              ? "bg-[#00624E] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-bold"
          }`}
        >
          <span>Bapak Prabowo (68 Thn)</span>
          <Check className="w-4 h-4 stroke-[3]" />
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("lestari")}
          className={`flex-1 py-3 text-xs sm:text-sm font-black rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
            !isPrabowo
              ? "bg-[#00624E] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-bold"
          }`}
        >
          <span>Ibu Lestari (65 Thn)</span>
        </button>
      </div>

      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-3">
          Ringkasan Kesehatan Cepat
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-1.5 hover:border-slate-300 transition-all">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Usia &amp; Gol. Darah</span>
            <p className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{data.usia} / {data.golDarah}</p>
            <p className="text-slate-500 text-xs font-medium">{isPrabowo ? "Bapak Prabowo" : "Ibu Lestari"}</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-1.5 hover:border-slate-300 transition-all">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Rerata Tensi</span>
            <p className="text-xl sm:text-2xl font-black text-[#00624E] leading-tight">{data.rerataTensi}</p>
            <p className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{data.tren}</span>
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-1.5 hover:border-slate-300 transition-all">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Obat Aktif</span>
            <p className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{data.obatAktif}</p>
            <p className="text-slate-500 text-xs font-medium truncate">{data.obatDetail}</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-1.5 hover:border-slate-300 transition-all">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Jadwal Kontrol Berikutnya</span>
            <p className="text-base sm:text-lg font-black text-slate-900 leading-tight">{data.jadwal}</p>
            <p className="text-amber-700 text-xs font-bold truncate">{data.jadwalDetail}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        <div className="lg:col-span-7 space-y-6">

          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  Pemeriksaan Posyandu RT 04
                </span>
                <h3 className="font-black text-slate-900 text-base sm:text-lg leading-tight mt-0.5">
                  Riwayat Tekanan Darah
                </h3>
              </div>

              {isPrabowo && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E6F4EA] border border-emerald-200 text-[#00624E] text-xs font-black shadow-2xs self-start sm:self-auto">
                  <TrendingDown className="w-4 h-4 stroke-[2.5]" />
                  <span>Tren: Menurun Stabil (-13 mmHg dalam 1 Bulan)</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {data.riwayatTensi.map((t, idx) => {
                const isNormal = t.status === "Normal";
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-black text-slate-900 text-sm">{t.tgl}</span>
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                          isNormal
                            ? "text-[#00624E] bg-[#E6F4EA] border-emerald-200"
                            : "text-amber-800 bg-amber-50 border-amber-200"
                        }`}>
                          {isNormal ? "✓ " : "• "}{t.status}
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
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-[#00624E] text-[10.5px] font-black mb-0.5">
                <Heart className="w-3 h-3" />
                <span>Kader Posyandu Siap Kunjungan Fisik</span>
              </div>
              <h3 className="font-black text-slate-900 text-base leading-snug">
                Butuh Cek Fisik ke Rumah?
              </h3>
              <p className="text-slate-600 text-xs font-medium">
                Kader Posyandu RT 04 siap melakukan kunjungan pemeriksaan tensi langsung ke rumah {isPrabowo ? "Bapak Prabowo" : "Ibu Lestari"}.
              </p>
            </div>
            <Link
              href="/anak/bantuan?kategori=kontrol"
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span>Titip Bantuan Cek Rumah</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        <div className="lg:col-span-5 space-y-6">

          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Inventaris Obat Rumah</span>
                <h3 className="font-black text-slate-900 text-base leading-tight mt-0.5">
                  Daftar Obat Rutin
                </h3>
              </div>
              <span className="text-[11px] font-black text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                {data.obatList.length} Macam
              </span>
            </div>

            <div className="space-y-3">
              {data.obatList.map((obat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-2 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-black text-slate-900 text-sm leading-snug">{obat.nama}</h4>
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border flex-shrink-0 ${
                      obat.stokOk
                        ? "bg-[#E6F4EA] text-[#00624E] border-emerald-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}>
                      {obat.stokBadge}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">{obat.fungsi}</p>
                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-bold">Aturan: {obat.aturan}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/anak/bantuan?kategori=obat"
              className="w-full py-3.5 rounded-2xl bg-[#00624E] hover:bg-[#004d3d] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Titip Tebus Obat Baru</span>
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Tenaga Medis Lingkungan</span>
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

