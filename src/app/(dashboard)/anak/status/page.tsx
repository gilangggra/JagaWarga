"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { 
  ArrowLeft, 
  Check, 
  Car, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  AlertCircle,
  Pill,
  MessageSquare,
  User,
  ArrowRight,
  FileText
} from "lucide-react";

function StatusAnakContent() {
  const [showCallModal, setShowCallModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-36 sm:pb-32 lg:pb-12 bg-[#F8FAFC]">
      
      
      <div>
        <Link
          href="/anak"
          id="btn-back-status-anak"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-[#00624E] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Pemantauan</span>
        </Link>
      </div>

      
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-[#00624E] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            Live Monitoring
          </span>
          <span className="text-xs text-slate-400 font-bold">• Untuk: Bapak Prabowo (Sleman)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Lacak Titipan &amp; Status Relawan
        </h1>
        <p className="text-sm sm:text-base font-medium text-slate-500">
          Pantau proses bantuan obat dari relawan RT 04 ke rumah orang tua secara real-time dari Jakarta.
        </p>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        
        <div className="lg:col-span-7 space-y-6">

          
          <div className="bg-gradient-to-br from-[#E6F4EA]/80 via-[#F3FAF5] to-white border border-emerald-200/90 rounded-3xl p-5 sm:p-7 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center font-black shrink-0 shadow-2xs">
                <Pill className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10.5px] font-black uppercase tracking-wider text-[#00624E] bg-white border border-emerald-200 px-2.5 py-0.5 rounded-full shadow-2xs">
                    Titip Obat Apotek
                  </span>
                  <span className="text-xs text-slate-400 font-bold">• 10:42 WIB</span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  Amlodipin 5mg (Tensi) &amp; Vitamin C
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Apotek K-24 Gejayan • Relawan: <strong>Pak Teddy (50m)</strong>
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00624E] text-white text-xs font-black shadow-2xs shrink-0 self-end sm:self-center">
              <Clock className="w-3.5 h-3.5" />
              <span>Estimasi ~6 Menit Tiba</span>
            </span>
          </div>

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Garis Waktu Bantuan</span>
                <h3 className="font-black text-slate-900 text-base sm:text-lg leading-tight mt-0.5">Proses Pengantaran ke Sleman</h3>
              </div>
              <span className="text-xs font-black text-[#00624E] bg-[#E6F4EA] border border-emerald-200 px-3 py-1 rounded-full">
                Tahap 2 dari 4
              </span>
            </div>

            <div className="space-y-5 relative pl-1">
              
              <div className="flex items-start gap-4 relative">
                <div className="absolute left-4 top-8 bottom-[-20px] w-[2px] bg-[#00624E]" />
                <div className="w-8 h-8 rounded-full bg-[#00624E] text-white flex items-center justify-center font-black text-xs shrink-0 z-10 shadow-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div className="flex-1 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <div className="flex items-center justify-between">
                    <p className="font-black text-sm text-slate-900">1. Permintaan Dibuat oleh Anda</p>
                    <span className="text-[11px] font-bold text-slate-400">10:42 WIB</span>
                  </div>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    Titipan obat berhasil tercatat di Posko RT 04 dan diterima oleh relawan terdekat.
                  </p>
                </div>
              </div>

              
              <div className="flex items-start gap-4 relative">
                <div className="absolute left-4 top-8 bottom-[-20px] w-[2px] bg-slate-200" />
                <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-black text-xs shrink-0 z-10 shadow-md ring-4 ring-sky-100 animate-pulse">
                  <Car className="w-4 h-4" />
                </div>
                <div className="flex-1 p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200">
                  <div className="flex items-center justify-between">
                    <p className="font-black text-sm text-sky-950">2. Relawan Sedang Membeli &amp; Mengantar</p>
                    <span className="text-[11px] font-black text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                      Sedang Jalan
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-sky-900/90 mt-0.5 leading-relaxed">
                    Pak Teddy sedang menuju rumah Bapak Prabowo membawa obat resep dari apotek.
                  </p>
                </div>
              </div>

              
              <div className="flex items-start gap-4 relative">
                <div className="absolute left-4 top-8 bottom-[-20px] w-[2px] bg-slate-200" />
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 text-slate-400 flex items-center justify-center font-black text-xs shrink-0 z-10">
                  3
                </div>
                <div className="flex-1 p-3.5 rounded-2xl bg-white border border-slate-100 opacity-60">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm text-slate-700">3. Penyerahan &amp; Verifikasi PIN di Pintu</p>
                    <span className="text-[11px] font-medium text-slate-400">~6 Menit lagi</span>
                  </div>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">
                    Pak Teddy tiba di rumah dan memvalidasi kode PIN keamanan Bapak Prabowo.
                  </p>
                </div>
              </div>

              
              <div className="flex items-start gap-4 relative">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 text-slate-400 flex items-center justify-center font-black text-xs shrink-0 z-10">
                  4
                </div>
                <div className="flex-1 p-3.5 rounded-2xl bg-white border border-slate-100 opacity-60">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm text-slate-700">4. Laporan Selesai ke WhatsApp Anda</p>
                    <span className="text-[11px] font-medium text-slate-400">Otomatis WA</span>
                  </div>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">
                    Notifikasi foto serah terima dan tanda terima otomatis terkirim ke WhatsApp Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00624E] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="font-black text-slate-900 text-base">Rincian Barang yang Dipesan</h3>
              </div>
              <span className="text-xs font-bold text-slate-400">Titipan Anak</span>
            </div>

            <ul className="space-y-2.5">
              <li className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-sm font-bold text-slate-800">Amlodipin 5mg (Obat Tensi Harian)</span>
                <span className="text-xs font-bold text-slate-500">1 Strip (10 Tab)</span>
              </li>
              <li className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-sm font-bold text-slate-800">Vitamin C 500mg IPI</span>
                <span className="text-xs font-bold text-slate-500">1 Botol</span>
              </li>
            </ul>

            <div className="p-3.5 rounded-2xl bg-[#E6F4EA] border border-emerald-200/80 flex items-center justify-between">
              <span className="text-xs font-bold text-[#00624E]">Talangan Relawan RT 04:</span>
              <span className="text-sm font-black text-[#00624E]">Rp 35.000 (Bisa Transfer QRIS Kas RT)</span>
            </div>
          </div>

        </div>

        
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Petugas Lapangan</span>
                <h3 className="font-black text-slate-900 text-base leading-tight mt-0.5">Relawan yang Bertugas</h3>
              </div>
              <span className="text-[11px] font-black text-[#00624E] bg-[#E6F4EA] border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Siaga Aktif
              </span>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-12 h-12 rounded-2xl bg-[#00624E] text-white flex items-center justify-center font-black text-base shadow-xs shrink-0">
                PT
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-black text-slate-900 text-base leading-tight truncate">Pak Teddy</p>
                <p className="text-slate-500 text-xs font-medium truncate">Tetangga Blok C4 No. 12 (50m)</p>
                <p className="text-xs font-bold text-[#00624E] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Sleman, Yogyakarta</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="py-3 px-3 rounded-2xl font-black text-xs text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat WA</span>
              </a>

              <button
                type="button"
                onClick={() => setShowCallModal(true)}
                className="py-3 px-3 rounded-2xl font-black text-xs text-white bg-[#00624E] hover:bg-[#004d3d] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Telepon</span>
              </button>
            </div>
          </div>

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Protokol Keamanan</span>
                <h3 className="font-black text-slate-900 text-base leading-tight mt-0.5">Verifikasi Dua Arah</h3>
              </div>
              <span className="w-8 h-8 rounded-full bg-[#E6F4EA] text-[#00624E] flex items-center justify-center shadow-2xs">
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              </span>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Bapak Prabowo memegang kode PIN verifikasi di aplikasi lansia beliau untuk mencocokkan barang titipan sebelum diserahkan relawan.
            </p>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-center space-y-1">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">Kode Keamanan Lansia</span>
              <p className="text-xl font-mono font-black text-slate-800 tracking-widest">● ● ● ● (Tersimpan Aman)</p>
            </div>
          </div>

          
          <Link
            href="/anak/bantuan"
            className="group flex items-center justify-between p-5 rounded-3xl bg-[#00624E] hover:bg-[#004d3d] active:scale-[0.98] text-white shadow-sm transition-all text-left"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Kebutuhan Lain?</span>
              <h3 className="text-base font-black leading-tight">Titip Bantuan Baru</h3>
              <p className="text-xs text-emerald-100 font-medium mt-0.5">Relawan RT 04 selalu siap siaga</p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5 stroke-[2.2]" />
            </div>
          </Link>

        </div>

      </div>

      
      {showCallModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setShowCallModal(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E6F4EA] text-[#00624E] flex items-center justify-center shadow-xs">
              <Phone className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 leading-tight">Hubungi Pak Teddy</h3>
              <p className="text-[#00624E] text-xs font-bold mt-0.5">Relawan Siaga RT 04 (Sleman)</p>
              <p className="text-slate-400 text-xs mt-1">0812-3456-7890</p>
            </div>
            <div className="space-y-2 pt-1">
              <a
                href="tel:081234567890"
                className="w-full py-3.5 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Panggil Sekarang</span>
              </a>
              <button
                type="button"
                onClick={() => setShowCallModal(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-2xl transition-all cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function StatusAnakPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 font-bold">Memuat status bantuan...</div>}>
      <StatusAnakContent />
    </Suspense>
  );
}
