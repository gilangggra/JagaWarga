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
  MessageSquare, 
  QrCode, 
  Shield, 
  Copy, 
  CheckCircle2, 
  CheckCheck,
  AlertCircle
} from "lucide-react";

type TrackingState = 1 | 2 | 3 | 4;

function QrCodeIllustration() {
  return (
    <div className="w-48 h-48 sm:w-52 sm:h-52 bg-white p-3 rounded-2xl border-2 border-slate-900 mx-auto shadow-xs flex flex-col items-center justify-center relative">
      <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
        <rect x="10" y="10" width="30" height="30" rx="4" fill="#0F172A" />
        <rect x="16" y="16" width="18" height="18" rx="2" fill="white" />
        <rect x="21" y="21" width="8" height="8" rx="1" fill="#0F172A" />

        <rect x="80" y="10" width="30" height="30" rx="4" fill="#0F172A" />
        <rect x="86" y="16" width="18" height="18" rx="2" fill="white" />
        <rect x="91" y="21" width="8" height="8" rx="1" fill="#0F172A" />

        <rect x="10" y="80" width="30" height="30" rx="4" fill="#0F172A" />
        <rect x="16" y="86" width="18" height="18" rx="2" fill="white" />
        <rect x="21" y="91" width="8" height="8" rx="1" fill="#0F172A" />

        <rect x="46" y="12" width="6" height="6" fill="#0F172A" />
        <rect x="58" y="12" width="6" height="6" fill="#0F172A" />
        <rect x="68" y="18" width="6" height="6" fill="#0F172A" />
        <rect x="46" y="24" width="6" height="6" fill="#0F172A" />
        <rect x="58" y="30" width="6" height="6" fill="#0F172A" />
        <rect x="68" y="34" width="6" height="6" fill="#0F172A" />
        
        <rect x="12" y="46" width="6" height="6" fill="#0F172A" />
        <rect x="24" y="58" width="6" height="6" fill="#0F172A" />
        <rect x="34" y="46" width="6" height="6" fill="#0F172A" />
        <rect x="80" y="46" width="6" height="6" fill="#0F172A" />
        <rect x="92" y="58" width="6" height="6" fill="#0F172A" />
        <rect x="102" y="46" width="6" height="6" fill="#0F172A" />
        
        <rect x="46" y="80" width="6" height="6" fill="#0F172A" />
        <rect x="58" y="86" width="6" height="6" fill="#0F172A" />
        <rect x="68" y="92" width="6" height="6" fill="#0F172A" />
        <rect x="80" y="80" width="6" height="6" fill="#0F172A" />
        <rect x="92" y="86" width="6" height="6" fill="#0F172A" />
        <rect x="102" y="98" width="6" height="6" fill="#0F172A" />

        <rect x="48" y="48" width="24" height="24" rx="6" fill="#00624E" />
        <path d="M54 60 L58 64 L66 54" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function StatusAnakContent() {
  const [currentState, setCurrentState] = useState<TrackingState>(2);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showQrisModal, setShowQrisModal] = useState(false);
  const [showPakRtModal, setShowPakRtModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isQrisPaid, setIsQrisPaid] = useState(false);
  const [copiedNominal, setCopiedNominal] = useState(false);

  const handleStateChange = (step: TrackingState) => {
    setCurrentState(step);
    if (step === 4) {
      setShowSuccessModal(true);
    }
  };

  const handleCopyNominal = () => {
    navigator.clipboard.writeText("35000");
    setCopiedNominal(true);
    setTimeout(() => setCopiedNominal(false), 2000);
  };

  const handleConfirmQris = () => {
    setIsQrisPaid(true);
    setShowQrisModal(false);
  };

  const waPakRtMessage = encodeURIComponent(
    "Selamat pagi Pak RT Joko, saya Ibu Titiek (anak Bapak Prabowo Blok C4). Mau konfirmasi mengenai titipan obat tensi yang sedang dibawa Mas Teddy, apakah ada kendala di lapangan?"
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9 space-y-6 sm:space-y-8 font-sans pb-36 sm:pb-32 lg:pb-16 bg-[#F8FAFC]">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/anak"
          id="btn-back-status-anak"
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-700 hover:text-[#00624E] font-black text-xs sm:text-sm shadow-2xs transition-all active:scale-95 self-start group"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#00624E] group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E6F4EA] border border-emerald-200/80 text-[#00624E] text-xs font-bold shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            <span>LIVE MONITORING • Jakarta ➔ Sleman</span>
          </div>

          <div className="flex items-center gap-1 p-1 bg-white border border-slate-200/80 rounded-full shadow-2xs">
            {([1, 2, 3, 4] as TrackingState[]).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => handleStateChange(st)}
                title={`Simulasi Tahap ${st}`}
                className={`w-6 h-6 rounded-full text-[10.5px] font-extrabold flex items-center justify-center transition-all cursor-pointer ${
                  currentState === st
                    ? "bg-[#00624E] text-white shadow-xs"
                    : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Lacak Titipan &amp; Status Relawan
        </h1>
        <p className="text-sm sm:text-base font-medium text-slate-500">
          Bantuan obat untuk Bapak Prabowo sedang diantar oleh relawan RT 04.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

        <div className="lg:col-span-7 space-y-6">

          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">
                  Perjalanan Bantuan
                </span>
                <h2 className="font-black text-slate-900 text-lg leading-tight mt-0.5">
                  Proses Pengantaran ke Sleman
                </h2>
              </div>
              <span className="text-xs font-black text-emerald-800 bg-[#E6F4EA] border border-emerald-200/80 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00624E]" />
                <span>Tahap {currentState} dari 4</span>
              </span>
            </div>

            <div className="space-y-6 relative pl-1">

              <div className="flex items-start gap-4 relative">
                <div className={`absolute left-4 top-8 bottom-[-24px] w-0.5 ${currentState >= 2 ? "bg-emerald-500" : "bg-slate-200"}`} />
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 z-10 shadow-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div className="pt-0.5 min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-black text-sm text-slate-900">
                      Permintaan Dibuat oleh Anda
                    </p>
                    <span className="text-[11px] font-bold text-slate-400">10:42 WIB</span>
                  </div>
                  <p className="text-xs font-medium text-slate-500 mt-0.5 leading-relaxed">
                    Tiket titipan tercatat otomatis di Posko RT 04 Sleman.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 relative">
                <div className={`absolute left-4 top-8 bottom-[-24px] w-0.5 ${currentState >= 3 ? "bg-emerald-500" : "bg-slate-200"}`} />

                {currentState === 1 ? (
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 text-slate-400 flex items-center justify-center font-bold text-xs shrink-0 z-10">
                    2
                  </div>
                ) : currentState === 2 ? (
                  <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs shrink-0 z-10 shadow-sm ring-4 ring-blue-100">
                    <Car className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 z-10 shadow-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}

                {currentState === 2 ? (
                  <div className="flex-1 bg-[#EFF6FF] rounded-2xl p-4 sm:p-5 border border-blue-100/90 shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <p className="font-black text-sm text-blue-950">
                        Relawan Sedang Membeli &amp; Mengantar
                      </p>
                      <span className="inline-flex items-center gap-1.5 bg-blue-100/90 text-[#2563EB] px-2.5 py-0.5 rounded-full text-xs font-bold">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]" />
                        </span>
                        Sedang Jalan
                      </span>
                    </div>
                    <p className="text-xs font-medium text-blue-900/80 leading-relaxed">
                      Pak Teddy sedang menuju rumah Bapak Prabowo membawa obat resep dari apotek • <strong className="font-black text-blue-950">Estimasi ~6 Menit</strong>
                    </p>
                  </div>
                ) : (
                  <div className="pt-0.5 min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-bold text-sm ${currentState > 2 ? "text-slate-900" : "text-slate-400"}`}>
                        Relawan Sedang Membeli &amp; Mengantar
                      </p>
                      {currentState > 2 && <span className="text-xs font-medium text-slate-400">10:48 WIB</span>}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {currentState === 1
                        ? "Menunggu relawan mengklaim tugas di Sleman."
                        : "Pak Teddy selesai membeli obat di Apotek K-24 Gejayan."}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-4 relative">
                <div className={`absolute left-4 top-8 bottom-[-24px] w-0.5 ${currentState >= 4 ? "bg-emerald-500" : "bg-slate-200"}`} />

                {currentState <= 2 ? (
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 text-slate-400 flex items-center justify-center font-bold text-xs shrink-0 z-10">
                    3
                  </div>
                ) : currentState === 3 ? (
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 z-10 shadow-sm ring-4 ring-amber-100">
                    <MapPin className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 z-10 shadow-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}

                {currentState === 3 ? (
                  <div className="flex-1 bg-amber-50/80 rounded-2xl p-4 sm:p-5 border border-amber-200/80 shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <p className="font-black text-sm text-amber-950">
                        Penyerahan &amp; Verifikasi PIN di Pintu
                      </p>
                      <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                        Di Depan Pintu
                      </span>
                    </div>
                    <p className="text-xs font-medium text-amber-900/80 leading-relaxed">
                      Pak Teddy tiba di rumah dan sedang memvalidasi kode PIN keamanan Bapak Prabowo.
                    </p>
                  </div>
                ) : (
                  <div className="pt-0.5 min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-bold text-sm ${currentState >= 4 ? "text-slate-900" : "text-slate-400"}`}>
                        Penyerahan &amp; Verifikasi PIN di Pintu
                      </p>
                      <span className="text-xs font-medium text-slate-400">
                        {currentState >= 4 ? "10:52 WIB" : "~6 Menit lagi"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Validasi kode keamanan langsung di lokasi serah terima.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-4 relative">
                {currentState < 4 ? (
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 text-slate-400 flex items-center justify-center font-bold text-xs shrink-0 z-10">
                    4
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 z-10 shadow-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}

                <div className="pt-0.5 min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`font-bold text-sm ${currentState === 4 ? "text-slate-900" : "text-slate-400"}`}>
                      Laporan Selesai ke WhatsApp Anda
                    </p>
                    <span className="text-xs font-medium text-slate-400">
                      {currentState === 4 ? "10:53 WIB" : "Otomatis WA"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Notifikasi foto dan konfirmasi serah terima otomatis terkirim.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div>
              <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">
                Transparansi Biaya
              </span>
              <h3 className="font-black text-slate-900 text-base leading-tight mt-0.5">
                Rincian Barang &amp; Talangan Dana
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-sm font-black text-slate-800">
                  Amlodipin 5mg (Obat Tensi Harian)
                </span>
                <span className="text-xs font-medium text-slate-500">
                  1 Strip (10 Tablet)
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-sm font-black text-slate-800">
                  Vitamin C 500mg IPI
                </span>
                <span className="text-xs font-medium text-slate-500">
                  1 Botol
                </span>
              </div>
            </div>

            <div className="bg-[#E6F4EA] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#00624E] block">
                  Talangan Relawan RT 04:
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-lg sm:text-xl font-black text-[#00624E]">
                    Rp 35.000
                  </span>
                  {isQrisPaid && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-800 bg-white border border-emerald-300 px-2.5 py-0.5 rounded-full shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Lunas via QRIS Kas RT
                    </span>
                  )}
                </div>
              </div>

              {!isQrisPaid ? (
                <button
                  type="button"
                  onClick={() => setShowQrisModal(true)}
                  id="btn-bayar-qris"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm shadow-sm transition-all cursor-pointer shrink-0"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Bayar via QRIS</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowQrisModal(true)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-[#00624E] font-bold text-xs border border-emerald-300 transition-all cursor-pointer shrink-0"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Lihat Bukti Pembayaran</span>
                </button>
              )}
            </div>
          </div>

        </div>

        <div className="lg:col-span-5 space-y-4">

          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">
                  Petugas Lapangan
                </span>
                <h3 className="font-black text-slate-900 text-base leading-tight mt-0.5">
                  Relawan yang Bertugas
                </h3>
              </div>
              <span className="text-[11px] font-black text-[#00624E] bg-[#E6F4EA] border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Siaga Aktif
              </span>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/70">
              <div className="w-12 h-12 rounded-2xl bg-[#00624E] text-white flex items-center justify-center font-black text-base shadow-xs shrink-0">
                PT
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-black text-slate-900 text-sm sm:text-base leading-snug truncate">
                  Pak Teddy
                </p>
                <p className="text-slate-500 text-xs font-medium truncate mt-0.5">
                  Tetangga Blok C4, 50m
                </p>
                <p className="text-xs font-bold text-[#00624E] flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Sleman, Yogyakarta</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="py-3 px-3 rounded-2xl font-black text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setShowCallModal(true)}
                className="py-3 px-3 rounded-2xl font-black text-xs sm:text-sm text-white bg-[#00624E] hover:bg-[#004d3d] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Panggil Telepon</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00624E] flex items-center justify-center shadow-2xs">
                <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-sm sm:text-base leading-tight">
                  Verifikasi Dua Arah
                </h3>
                <p className="text-slate-400 text-xs font-medium">Protokol Keamanan Serah Terima</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Bapak Prabowo memegang kode PIN verifikasi di tablet beliau untuk mencocokkan barang titipan sebelum diserahkan relawan secara fisik.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Kode PIN Validasi:</span>
              <span className="text-xs font-bold text-emerald-800 bg-[#E6F4EA] px-3 py-1 rounded-full">
                4 Angka Rahasia di Lokasi
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shadow-2xs border border-amber-200/60">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-sm sm:text-base leading-tight">
                  Ada Kendala Pengantaran?
                </h3>
                <p className="text-slate-400 text-xs font-medium">Pusat Bantuan Pengurus RT 04</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Hubungi Pak Joko (Ketua RT 04) jika relawan sulit dihubungi atau terjadi kendala di lapangan.
            </p>

            <button
              type="button"
              onClick={() => setShowPakRtModal(true)}
              id="btn-hubungi-pak-rt"
              className="w-full py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-900 font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <Phone className="w-4 h-4 text-[#00624E]" />
              <span>Hubungi Pak RT</span>
            </button>
          </div>

        </div>

      </div>

      {showQrisModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowQrisModal(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-4 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-left">
                <div className="w-8 h-8 rounded-xl bg-[#E6F4EA] text-[#00624E] flex items-center justify-center font-bold">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 leading-tight">QRIS Kas RT 04 / Relawan Teddy</h3>
                  <p className="text-[10px] font-bold text-slate-400">NMID: ID10230492810</p>
                </div>
              </div>
              <span className="text-[10px] font-black text-[#00624E] bg-[#E6F4EA] px-2 py-0.5 rounded-full">
                Instan
              </span>
            </div>

            <QrCodeIllustration />

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Nominal Talangan:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-slate-900 text-sm">Rp 35.000</span>
                  <button
                    type="button"
                    onClick={handleCopyNominal}
                    className="p-1 text-slate-400 hover:text-[#00624E] transition-colors"
                    title="Salin nominal"
                  >
                    {copiedNominal ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 font-medium text-left">
                Untuk: Obat Amlodipin &amp; Vitamin C (Pak Teddy)
              </p>
            </div>

            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Buka aplikasi BCA, Mandiri, BRI, GoPay, OVO, ShopeePay, atau DANA lalu pindai barcode di atas.
            </p>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleConfirmQris}
                className="w-full py-3.5 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Konfirmasi Sudah Bayar</span>
              </button>
              <button
                type="button"
                onClick={() => setShowQrisModal(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-2xl transition-all cursor-pointer"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

      {showPakRtModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setShowPakRtModal(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 leading-tight">Pak Joko (Ketua RT 04)</h3>
              <p className="text-amber-800 text-xs font-bold mt-0.5">Penanggung Jawab Wilayah &amp; Posko Siaga</p>
              <p className="text-slate-400 text-xs mt-1">0813-8765-4321 • Blok A1 No. 01</p>
            </div>
            <div className="space-y-2 pt-1">
              <a
                href="tel:081387654321"
                className="w-full py-3.5 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Telepon Pak RT</span>
              </a>
              <a
                href={`https://wa.me/6281387654321?text=${waPakRtMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat WhatsApp Pak RT</span>
              </a>
              <button
                type="button"
                onClick={() => setShowPakRtModal(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-2xl transition-all cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

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

      {showSuccessModal && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowSuccessModal(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-md p-6 sm:p-8 text-center shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-5 animate-in zoom-in-95 duration-200">
            
            <div className="w-20 h-20 mx-auto rounded-3xl bg-[#E6F4EA] text-[#00624E] flex items-center justify-center shadow-md border-2 border-emerald-200">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900 leading-tight">
                Bantuan Selesai Diserahkan!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Relawan Pak Teddy telah selesai menyerahkan obat Amlodipin kepada Bapak Prabowo dengan selamat.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-left">
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-bold">
                <Clock className="w-4 h-4 text-[#00624E]" />
                <span>Waktu Respons: 11 Menit</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-bold">
                <ShieldCheck className="w-4 h-4 text-[#00624E]" />
                <span>Terverifikasi PIN Fisik di Lokasi (8 2 4 1)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-bold">
                <MessageSquare className="w-4 h-4 text-[#00624E]" />
                <span>Notifikasi otomatis telah dikirim ke WhatsApp Anda</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/anak"
                id="btn-success-kembali-beranda"
                className="w-full py-4 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Kembali ke Beranda Utama</span>
              </Link>
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
