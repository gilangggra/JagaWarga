"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeft, 
  Accessibility, 
  Activity, 
  Heart, 
  HelpCircle, 
  Check, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Phone,
  AlertCircle
} from "lucide-react";

interface AlkesItem {
  id: string;
  nama: string;
  kategori: string;
  total: number;
  tersedia: number;
  lokasi: string;
  kondisi: string;
  deskripsi: string;
  icon: string;
}

const ALKES_DATA: AlkesItem[] = [
  {
    id: "kursi-roda",
    nama: "Kursi Roda Standar",
    kategori: "Mobilitas",
    total: 3,
    tersedia: 2,
    lokasi: "Posko RT 04 (Rumah Pak Joko)",
    kondisi: "Sangat Baik & Bersih",
    deskripsi: "Bisa dilipat, dilengkapi rem tangan ganda dan pijakan kaki yang nyaman untuk orang tua.",
    icon: "wheelchair",
  },
  {
    id: "tensimeter",
    nama: "Tensimeter Digital Omron",
    kategori: "Pemeriksaan",
    total: 4,
    tersedia: 3,
    lokasi: "Kader Posyandu (Bu Ani)",
    kondisi: "Akurat & Kalibrasi Rutin",
    deskripsi: "Tampilan layar besar dengan suara pembaca tensi otomatis, mudah dipasang di lengan orang tua.",
    icon: "heart",
  },
  {
    id: "oximeter",
    nama: "Pulse Oksimeter Ujung Jari",
    kategori: "Pemeriksaan",
    total: 5,
    tersedia: 4,
    lokasi: "Posko RT 04",
    kondisi: "Baterai Baru & Higienis",
    deskripsi: "Mengukur saturasi oksigen SpO2 dan detak nadi cepat dalam 5 detik.",
    icon: "activity",
  },
  {
    id: "tongkat",
    nama: "Tongkat Ketiak & Kaki 4",
    kategori: "Mobilitas",
    total: 4,
    tersedia: 3,
    lokasi: "Balai Warga RT 04",
    kondisi: "Karet Kaki Anti Selip",
    deskripsi: "Tinggi tongkat dapat disesuaikan (adjustable), stabil untuk membantu orang tua berjalan.",
    icon: "cane",
  },
  {
    id: "oksigen",
    nama: "Tabung Oksigen Portable 1m³",
    kategori: "Darurat",
    total: 2,
    tersedia: 1,
    lokasi: "Rumah Relawan (Pak Teddy)",
    kondisi: "Isi Penuh + Regulator Steril",
    deskripsi: "Siap pakai untuk kondisi sesak napas darurat sebelum bantuan medis tiba.",
    icon: "oxygen",
  },
];

export default function AnakAlkesPage() {
  const [selectedAlkes, setSelectedAlkes] = useState<AlkesItem | null>(null);
  const [targetOrtu, setTargetOrtu] = useState<"Bapak Prabowo" | "Ibu Lestari">("Bapak Prabowo");
  const [durasi, setDurasi] = useState("3 Hari");
  const [keperluan, setKeperluan] = useState("");
  const [successPinjam, setSuccessPinjam] = useState(false);

  const handleAjukan = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessPinjam(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-36 sm:pb-32 lg:pb-12 bg-[#F8FAFC]">
      
      
      <div>
        <Link
          href="/anak"
          id="btn-back-alkes-anak"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-[#00624E] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Pemantauan</span>
        </Link>
      </div>

      
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-[#00624E] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            Fasilitas Kas Warga RT 04
          </span>
          <span className="text-xs text-slate-400 font-bold">• Bebas Biaya Sewa (Gratis)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Peminjaman Alat Kesehatan untuk Ortu
        </h1>
        <p className="text-sm sm:text-base font-medium text-slate-500">
          Pinjam kursi roda, tabung oksigen, atau tensimeter digital kas RT 04 Sleman untuk diantar relawan ke rumah Bapak/Ibu.
        </p>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ALKES_DATA.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#E6F4EA] text-[#00624E] flex items-center justify-center font-black shadow-2xs group-hover:scale-105 transition-transform">
                      <Accessibility className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-xs font-black text-[#00624E] bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      Tersedia: {item.tersedia} Unit
                    </span>
                  </div>

                  <div>
                    <h3 className="font-black text-slate-900 text-base sm:text-lg leading-tight">
                      {item.nama}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                      {item.deskripsi}
                    </p>
                  </div>

                  <div className="space-y-1 text-xs font-bold text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <p className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-[#00624E]" />
                      <span>{item.lokasi}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item.kondisi}</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedAlkes(item);
                    setSuccessPinjam(false);
                  }}
                  className="w-full py-3 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Pinjamkan untuk Ortu</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-[#E6F4EA] text-[#00624E] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base leading-tight">Layanan Kas RT 04</h3>
                <p className="text-xs text-slate-400 font-medium">Bebas Biaya untuk Warga</p>
              </div>
            </div>

            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#00624E] shrink-0 mt-0.5" />
                <span>Alat kesehatan dibeli dari iuran kas gotong royong warga RT 04.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#00624E] shrink-0 mt-0.5" />
                <span>Relawan siap mengantar langsung ke rumah orang tua di Sleman.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#00624E] shrink-0 mt-0.5" />
                <span>Masa pinjam standar 3-7 hari dan dapat diperpanjang via aplikasi.</span>
              </li>
            </ul>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <p className="text-xs font-bold text-emerald-800">
                Pengurus Alkes: <strong>Pak Joko (Ketua RT)</strong>
              </p>
              <a
                href="tel:08123456788"
                className="text-xs font-black text-[#00624E] hover:underline inline-flex items-center gap-1 mt-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>0812-3456-788</span>
              </a>
            </div>
          </div>

        </div>

      </div>

      
      {selectedAlkes && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setSelectedAlkes(null)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-md p-6 sm:p-7 shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-4 animate-in zoom-in-95 duration-200">
            
            {!successPinjam ? (
              <form onSubmit={handleAjukan} className="space-y-4">
                <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-[#E6F4EA] text-[#00624E] flex items-center justify-center font-black shrink-0">
                    <Accessibility className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Formulir Titip Pinjam
                    </span>
                    <h3 className="text-lg font-black text-slate-900 leading-tight mt-0.5">
                      {selectedAlkes.nama}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wider block mb-1">
                      Penerima Pinjaman (Orang Tua):
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["Bapak Prabowo", "Ibu Lestari"] as const).map((ortu) => (
                        <button
                          key={ortu}
                          type="button"
                          onClick={() => setTargetOrtu(ortu)}
                          className={`py-2.5 px-3 rounded-2xl text-xs font-black border transition-all cursor-pointer ${
                            targetOrtu === ortu
                              ? "bg-[#00624E] text-white border-[#00624E] shadow-2xs"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {ortu}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wider block mb-1">
                      Durasi Peminjaman:
                    </label>
                    <select
                      value={durasi}
                      onChange={(e) => setDurasi(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00624E]"
                    >
                      <option value="3 Hari">3 Hari (Masa Percobaan / Kontrol)</option>
                      <option value="7 Hari">7 Hari (1 Minggu Penuh)</option>
                      <option value="14 Hari">14 Hari (Pemulihan Pasca Sakit)</option>
                      <option value="30 Hari">30 Hari (Penggunaan Jangka Panjang)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wider block mb-1">
                      Catatan Tambahan untuk Relawan Pengantar:
                    </label>
                    <textarea
                      value={keperluan}
                      onChange={(e) => setKeperluan(e.target.value)}
                      rows={2}
                      placeholder="Contoh: Mohon diantar sebelum jam 14:00 untuk kontrol dokter sore..."
                      className="w-full px-3.5 py-2 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00624E]"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Konfirmasi Pinjam &amp; Antar ke Rumah</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedAlkes(null)}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-2xl transition-all cursor-pointer"
                  >
                    Batal
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-4 py-2">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#00624E] text-white flex items-center justify-center shadow-md">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">Pengajuan Pinjam Berhasil!</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-1">
                    <strong>{selectedAlkes.nama}</strong> telah dijadwalkan untuk diantar relawan RT 04 ke rumah {targetOrtu} di Sleman.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium text-left space-y-1">
                  <p>• Durasi: <strong>{durasi}</strong></p>
                  <p>• Petugas Antar: <strong>Pak Teddy (Relawan Siaga RT)</strong></p>
                  <p>• Notifikasi status akan dikirimkan ke WhatsApp Anda.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAlkes(null)}
                  className="w-full py-3.5 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm transition-all cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
