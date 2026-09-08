"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Zap, 
  User, 
  Calendar, 
  Bell, 
  Lightbulb, 
  Check, 
  CheckCircle2, 
  X, 
  ShieldCheck,
  Info,
  Volume2,
  Sparkles,
  Phone,
  Clock,
  Heart,
  Accessibility,
  Activity,
  Pill,
  ExternalLink,
  Shield,
  Stethoscope,
  ChevronRight
} from "lucide-react";
import { speakIndonesian } from "@/lib/speak";

function triggerHaptic(duration = 40) {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(duration);
    } catch {}
  }
}

interface AlkesItem {
  id: string;
  nama: string;
  kategori: "mobilitas" | "pemeriksaan" | "pernapasan";
  status: "tersedia" | "dipinjam";
  badgeText: string;
  badgeBg: string;
  containerBg: string;
  photoSrc: string;
  desc: string;
  lokasi: string;
  pengantaran: string;
  biaya: string;
  peminjam?: string;
  kembali?: string;
  highlightTags: string[];
  spesifikasi: { label: string; value: string }[];
}

const ALKES_LIST: AlkesItem[] = [
  {
    id: "kursi-roda",
    nama: "Kursi Roda Lipat Ringan",
    kategori: "mobilitas",
    status: "tersedia",
    badgeText: "2 Unit Tersedia",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
    containerBg: "bg-emerald-50/30",
    photoSrc: "/alkes-kursi-roda.jpg",
    desc: "Rangka aluminium ringan, mudah dilipat masuk mobil untuk kontrol ke dokter atau posyandu.",
    lokasi: "Posko Siaga RT 04 (2 Unit)",
    pengantaran: "Siap Antar (< 5 Menit)",
    biaya: "Rp 0 (Kas RT 04)",
    highlightTags: ["Busa Empuk & Lipat", "Rem Tangan Ganda", "Gratis Kas RT"],
    spesifikasi: [
      { label: "Kenyamanan Duduk", value: "Busa empuk dengan sandaran punggung ergonomis" },
      { label: "Kemudahan Lipat", value: "Rangka ringan, praktis dilipat masuk bagasi mobil" },
      { label: "Keamanan Rem", value: "Rem tangan ganda di pegangan pendorong & roda" },
      { label: "Biaya Pinjam", value: "100% Bebas Biaya Kas RT (Tanpa Sewa)" },
    ],
  },
  {
    id: "tabung-o2",
    nama: "Tabung Oksigen Siaga Medis",
    kategori: "pernapasan",
    status: "dipinjam",
    badgeText: "Sedang Digunakan",
    badgeBg: "bg-amber-50 text-amber-900 border-amber-200/90",
    containerBg: "bg-amber-50/30",
    photoSrc: "/alkes-tabung-o2.jpg",
    desc: "Tabung oksigen darurat siap pakai lengkap dengan regulator dan selang kanula baru.",
    lokasi: "Blok D2 (Sedang Digunakan)",
    pengantaran: "Antre Pengembalian",
    biaya: "Rp 0 (Kas RT 04)",
    peminjam: "Ibu Siti (Blok D2 No. 04)",
    kembali: "Besok Sore (16:00 WIB)",
    highlightTags: ["Gas Medis Terisi Penuh", "Regulator & Selang Baru", "Antre Besok Sore"],
    spesifikasi: [
      { label: "Kesiapan Gas", value: "Gas oksigen medis murni terisi penuh siap pakai" },
      { label: "Perlengkapan", value: "Regulator pengukur tekanan & selang kanula steril" },
      { label: "Peminjam Saat Ini", value: "Ibu Siti (Warga Blok D2, No. 04)" },
      { label: "Estimasi Pengembalian", value: "Besok Sore pukul 16:00 WIB" },
    ],
  },
  {
    id: "alat-tensi",
    nama: "Tensimeter Digital Otomatis",
    kategori: "pemeriksaan",
    status: "tersedia",
    badgeText: "2 Unit Tersedia",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
    containerBg: "bg-emerald-50/30",
    photoSrc: "/alkes-tensimeter.jpg",
    desc: "Tinggal pasang manset di lengan dan tekan satu tombol, tensi langsung terbaca di layar.",
    lokasi: "Posko Siaga RT 04 (2 Unit)",
    pengantaran: "Siap Antar (< 5 Menit)",
    biaya: "Rp 0 (Kas RT 04)",
    highlightTags: ["1 Tombol Otomatis", "Layar Angka Raksasa", "Deteksi Jantung"],
    spesifikasi: [
      { label: "Cara Pakai Praktis", value: "Pasang manset di lengan & tekan tombol Start" },
      { label: "Tampilan Layar", value: "Layar digital angka besar, jelas dibaca lansia" },
      { label: "Hasil Pemeriksaan", value: "Tekanan sistolik, diastolik, & detak jantung" },
      { label: "Biaya Pinjam", value: "100% Bebas Biaya Kas RT (Tanpa Sewa)" },
    ],
  },
  {
    id: "tongkat",
    nama: "Tongkat Kaki Empat Kokoh",
    kategori: "mobilitas",
    status: "tersedia",
    badgeText: "3 Unit Tersedia",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
    containerBg: "bg-emerald-50/30",
    photoSrc: "/alkes-tongkat-jalan.jpg",
    desc: "Sangat stabil menyangga langkah kaki dengan 4 bantalan karet tebal anti-licin.",
    lokasi: "Posko Siaga RT 04 (3 Unit)",
    pengantaran: "Siap Antar (< 5 Menit)",
    biaya: "Rp 0 (Kas RT 04)",
    highlightTags: ["4 Karet Anti-Slip", "Tinggi Bisa Disetel", "Rangka Aluminium"],
    spesifikasi: [
      { label: "Kestabilan", value: "Paling stabil menyangga tubuh saat berjalan santai" },
      { label: "Tinggi Tongkat", value: "Ketinggian fleksibel disetel sesuai tinggi badan" },
      { label: "Ujung Kaki", value: "4 bantalan karet tebal anti-peleset lantai basah" },
      { label: "Kondisi Alat", value: "Bersih, kuat, kokoh, dan langsung siap pakai" },
    ],
  },
];

export default function AlkesPage() {
  const [activeFilter, setActiveFilter] = useState<"semua" | "tersedia" | "mobilitas" | "pemeriksaan">("semua");
  const [selectedAlkes, setSelectedAlkes] = useState<AlkesItem | null>(null);
  const [detailAlkes, setDetailAlkes] = useState<AlkesItem | null>(null);
  const [showCallModal, setShowCallModal] = useState(false);
  const [pinjamSuccess, setPinjamSuccess] = useState<string | null>(null);
  const [reminderSuccess, setReminderSuccess] = useState<string | null>(null);

  const filteredAlkes = ALKES_LIST.filter((item) => {
    if (activeFilter === "tersedia") return item.status === "tersedia";
    if (activeFilter === "mobilitas") return item.kategori === "mobilitas";
    if (activeFilter === "pemeriksaan") return item.kategori === "pemeriksaan" || item.kategori === "pernapasan";
    return true;
  });

  const handlePinjam = (item: AlkesItem) => {
    triggerHaptic(50);
    setSelectedAlkes(null);
    setPinjamSuccess(item.nama);
    speakIndonesian(`Permintaan pinjam ${item.nama} berhasil dikirim. Relawan siaga Budi Santoso segera mengantarkan ke rumah Bapak.`);
    setTimeout(() => setPinjamSuccess(null), 6000);
  };

  const handleSetReminder = (nama: string) => {
    triggerHaptic(40);
    setReminderSuccess(nama);
    speakIndonesian(`Pengingat aktif. Kami akan mengirimkan notifikasi saat ${nama} telah kembali ke Posko RT.`);
    setTimeout(() => setReminderSuccess(null), 6000);
  };

  const handleReadPanduan = () => {
    triggerHaptic(40);
    speakIndonesian(
      "Halaman Peminjaman Alat Kesehatan Kas RT 04. Tersedia Kursi Roda Lipat Ringan, Tensimeter Digital, Tongkat Kaki Empat, dan Tabung Oksigen Siaga. Seluruh alat bebas biaya sewa dan langsung diantar relawan ke rumah Bapak Prabowo."
    );
  };

  return (
    <div className="p-4 sm:p-5 lg:p-6 flex flex-col gap-5 lg:gap-6 w-full max-w-full font-sans">
      
      {/* ============================================================ */}
      {/* 1. TOP HEADER & NAVIGATION                                   */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left: Back Button & Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/lansia"
            id="btn-back-alkes"
            onClick={() => triggerHaptic(30)}
            className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white hover:bg-[#EBF5F5] text-slate-700 hover:text-[#3B8F8D] border border-[#E1EFF0] shadow-2xs transition-all active:scale-95 group shrink-0"
            title="Kembali ke Beranda"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-[#3B8F8D] group-hover:-translate-x-0.5 transition-transform" />
          </Link>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#4FAAA8] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fasilitas Gotong Royong Kas RT 04</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Pinjam Alat Kesehatan Gratis
            </h1>
          </div>
        </div>

        {/* Right: Audio Guide Button & RT Hotline */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            id="btn-alkes-voice"
            onClick={handleReadPanduan}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#EBF5F5] hover:bg-[#D9EFEF] text-[#00624E] border border-teal-200/80 active:scale-95 transition-all cursor-pointer shadow-2xs group shrink-0"
            title="Dengarkan Panduan Suara (TTS)"
          >
            <Volume2 className="w-4 h-4 stroke-[2.5] text-[#4FAAA8] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold hidden sm:inline">Panduan Suara</span>
          </button>

          <button
            type="button"
            id="btn-hotline-rt"
            onClick={() => {
              triggerHaptic(35);
              setShowCallModal(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs active:scale-95 transition-all cursor-pointer font-extrabold text-xs sm:text-sm shrink-0"
            title="Hubungi Pengurus Posko RT 04"
          >
            <Phone className="w-4 h-4 text-[#4FAAA8]" />
            <span className="hidden sm:inline">Kontak Posko RT</span>
          </button>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 2. HERO BANNER: FASILITAS GOTONG ROYONG RT 04                 */}
      {/* ============================================================ */}
      <div className="bg-gradient-to-br from-[#4EA8A6] via-[#54B1AF] to-[#6BC5C3] rounded-[28px] p-6 sm:p-7 text-white relative overflow-hidden shadow-[0_16px_40px_rgba(82,177,175,0.25)] flex flex-col justify-between min-h-[200px] group">
        
        {/* Soft Ambient Glows */}
        <div className="absolute -top-12 -left-12 w-44 h-44 bg-white/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-36 h-36 bg-teal-300/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-xs font-bold text-white shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>Fasilitas Siaga 24 Jam di Posko RT 04</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight text-white">
            Alat Kesehatan Gratis untuk Warga
          </h2>

          <p className="text-xs sm:text-sm font-medium text-white/95 leading-relaxed max-w-xl">
            Seluruh fasilitas alat kesehatan kas RT dapat dipinjam bebas biaya sewa. Relawan siaga siap mengantar langsung ke depan pintu rumah Bapak.
          </p>
        </div>

        {/* Stat Badges */}
        <div className="relative z-10 pt-4 flex flex-wrap items-center gap-2.5 border-t border-white/20 mt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-sm text-xs font-bold text-white shadow-2xs">
            <MapPin className="w-3.5 h-3.5" />
            <span>Posko RT 04 (Radius 150m)</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-sm text-xs font-bold text-white shadow-2xs">
            <Zap className="w-3.5 h-3.5 fill-white text-white" />
            <span>Siap Antar (&lt; 5 Menit)</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/30 backdrop-blur-sm text-xs font-bold text-white border border-emerald-300/40 shadow-2xs">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>100% Bebas Biaya Kas RT</span>
          </div>
        </div>

        {/* Warm Friendly Illustration on Right (Desktop) */}
        <div className="hidden lg:flex absolute bottom-0 right-6 sm:right-10 w-40 sm:w-44 h-48 pointer-events-none select-none items-end justify-center animate-float-gentle">
          {/* Warm Sun Backdrop */}
          <div className="absolute bottom-2 w-32 h-32 bg-[#FDBA74] rounded-full shadow-inner opacity-95" />
          <div className="absolute -bottom-2 -right-2 w-10 h-16 bg-white/20 rounded-full rotate-45 blur-2xs" />

          {/* High-Fidelity Healthcare Aid SVG */}
          <svg viewBox="0 0 100 120" className="w-36 h-44 relative z-10 drop-shadow-lg">
            {/* Wheelchair & Medical Aid Illustration */}
            {/* Large Wheel */}
            <circle cx="48" cy="74" r="22" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            <circle cx="48" cy="74" r="16" fill="none" stroke="#00624E" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="48" cy="74" r="4" fill="#FFFFFF" />
            
            {/* Front Wheel */}
            <circle cx="76" cy="88" r="8" fill="none" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="76" cy="88" r="2" fill="#FFFFFF" />

            {/* Frame */}
            <path d="M34 50 L48 74 L74 88" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M44 56 L68 56 L72 74" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M30 40 L34 50" stroke="#00624E" strokeWidth="4" strokeLinecap="round" fill="none" />

            {/* Red Cross Medical Badge */}
            <circle cx="68" cy="38" r="14" fill="#FFFFFF" className="drop-shadow-md" />
            <rect x="65" y="30" width="6" height="16" rx="2" fill="#E11D48" />
            <rect x="60" y="35" width="16" height="6" rx="2" fill="#E11D48" />
          </svg>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 3. SUCCESS TOASTS                                             */}
      {/* ============================================================ */}
      {pinjamSuccess && (
        <div className="bg-emerald-600 text-white p-4 sm:p-5 rounded-2xl shadow-md flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-white stroke-[3]" />
            </div>
            <div>
              <p className="font-black text-sm sm:text-base">Permintaan Pinjam Berhasil Diteruskan!</p>
              <p className="text-emerald-100 text-xs font-medium mt-0.5">
                <strong>{pinjamSuccess}</strong> segera diantar oleh relawan Budi Santoso ke rumah Bapak Prabowo.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/lansia/bantuan"
              className="px-4 py-2 bg-white text-emerald-900 font-black text-xs rounded-xl shadow-xs hover:bg-emerald-50 active:scale-95 transition-all"
            >
              Lacak Pengantaran →
            </Link>
            <button
              onClick={() => setPinjamSuccess(null)}
              className="p-1 text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {reminderSuccess && (
        <div className="bg-amber-600 text-white p-4 sm:p-5 rounded-2xl shadow-md flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-sm sm:text-base">Pengingat Berhasil Diaktifkan!</p>
              <p className="text-amber-100 text-xs font-medium mt-0.5">
                Notifikasi otomatis akan dikirim ke WhatsApp segera setelah <strong>{reminderSuccess}</strong> kembali ke Posko RT.
              </p>
            </div>
          </div>
          <button
            onClick={() => setReminderSuccess(null)}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-black text-xs rounded-xl transition-all shrink-0"
          >
            Mengerti
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. MAIN TWO-COLUMN DASHBOARD GRID                             */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* ------------------------------------------------------------ */}
        {/* LEFT COLUMN (8 cols): ALKES CATALOG GRID                     */}
        {/* ------------------------------------------------------------ */}
        <div className="xl:col-span-8 flex flex-col gap-5 sm:gap-6">
          
          {/* FILTER TABS */}
          <div className="flex items-center justify-between gap-2 flex-wrap pb-1">
            <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
              <button
                type="button"
                onClick={() => {
                  triggerHaptic(25);
                  setActiveFilter("semua");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                  activeFilter === "semua"
                    ? "bg-[#4EA8A6] text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                Semua Alat (4)
              </button>

              <button
                type="button"
                onClick={() => {
                  triggerHaptic(25);
                  setActiveFilter("tersedia");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                  activeFilter === "tersedia"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                ● Siap Antar (3)
              </button>

              <button
                type="button"
                onClick={() => {
                  triggerHaptic(25);
                  setActiveFilter("mobilitas");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                  activeFilter === "mobilitas"
                    ? "bg-[#4EA8A6] text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                Mobilitas & Kursi Roda (2)
              </button>

              <button
                type="button"
                onClick={() => {
                  triggerHaptic(25);
                  setActiveFilter("pemeriksaan");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                  activeFilter === "pemeriksaan"
                    ? "bg-[#4EA8A6] text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                Pemeriksaan & Oksigen (2)
              </button>
            </div>

            <span className="text-xs text-slate-400 font-bold hidden sm:inline">
              Menampilkan {filteredAlkes.length} alat
            </span>
          </div>

          {/* CATALOG CARDS (2-Column Grid on Tablet/Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {filteredAlkes.map((alkes) => {
              const isTersedia = alkes.status === "tersedia";

              return (
                <div
                  key={alkes.id}
                  className="bg-white rounded-[26px] border border-[#E1EFF0] shadow-[0_6px_25px_rgba(79,170,168,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between p-5 space-y-4 group"
                >
                  <div className="space-y-3.5">
                    
                    {/* Top Row: Status Badge + Info Button + TTS Button */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${alkes.badgeBg}`}>
                        <span className={`w-2 h-2 rounded-full ${isTersedia ? "bg-emerald-600 animate-pulse" : "bg-amber-600"}`} />
                        <span>{alkes.badgeText}</span>
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            triggerHaptic(30);
                            speakIndonesian(`${alkes.nama}. ${alkes.desc}. Status: ${alkes.badgeText}. Biaya: Gratis Kas RT.`);
                          }}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-[#00624E] hover:bg-[#EBF5F5] transition-colors"
                          title="Dengarkan Suara Alat"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            triggerHaptic(30);
                            setDetailAlkes(alkes);
                          }}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                          title="Lihat Spesifikasi & Detail"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Centered Photo Box (No awkward stretching, object-contain) */}
                    <div
                      onClick={() => {
                        triggerHaptic(30);
                        setDetailAlkes(alkes);
                      }}
                      className="relative w-full h-44 sm:h-48 rounded-2xl bg-gradient-to-br from-slate-50 via-teal-50/25 to-slate-50 flex items-center justify-center p-3.5 overflow-hidden border border-slate-100 group-hover:border-teal-200 transition-all cursor-pointer"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={alkes.photoSrc}
                          alt={`Foto ${alkes.nama}`}
                          fill
                          className={`object-contain transition-transform duration-300 group-hover:scale-105 ${
                            !isTersedia ? "opacity-85 grayscale-[0.2]" : ""
                          }`}
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1">
                      <h3 className="font-black text-slate-900 text-base sm:text-lg leading-snug group-hover:text-[#3B8F8D] transition-colors">
                        {alkes.nama}
                      </h3>
                      <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-2">
                        {alkes.desc}
                      </p>
                    </div>

                    {/* Highlight Feature Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {alkes.highlightTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold text-[#246A68] bg-[#EBF5F5] border border-teal-200/60 px-2.5 py-0.5 rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Delivery & Status Bar */}
                    <div className="pt-1">
                      {isTersedia ? (
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                          <span className="flex items-center gap-1 text-slate-700 font-bold">
                            <MapPin className="w-3.5 h-3.5 text-[#4EA8A6]" />
                            <span>Posko RT 04</span>
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1 font-black text-[#00624E]">
                            <Zap className="w-3.5 h-3.5 fill-[#00624E]" />
                            <span>Antar &lt; 5 Mnt</span>
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="font-bold text-slate-600">Rp 0</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950">
                          <span className="flex items-center gap-1 font-bold truncate max-w-[130px]">
                            <User className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                            <span className="truncate">{alkes.peminjam}</span>
                          </span>
                          <span className="text-amber-300">•</span>
                          <span className="flex items-center gap-1 font-black text-amber-900 shrink-0">
                            <Calendar className="w-3.5 h-3.5 text-amber-700" />
                            <span>Kembali: Besok</span>
                          </span>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    {isTersedia ? (
                      <button
                        type="button"
                        id={`btn-pinjam-${alkes.id}`}
                        onClick={() => {
                          triggerHaptic(40);
                          setSelectedAlkes(alkes);
                        }}
                        className="w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm text-white shadow-md shadow-[#4EA8A6]/25 bg-gradient-to-r from-[#4EA8A6] via-[#469F9D] to-[#3B8F8D] hover:from-[#3B8F8D] hover:to-[#2F7775] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Ajukan Pinjam Gratis</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        id={`btn-ingatkan-${alkes.id}`}
                        onClick={() => handleSetReminder(alkes.nama)}
                        className="w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 shadow-xs active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Bell className="w-4 h-4 text-amber-800 stroke-[2.5]" />
                        <span>Ingatkan Saat Tersedia</span>
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* ------------------------------------------------------------ */}
        {/* RIGHT COLUMN (4 cols): SIDEBAR REASSURANCE & CONTACTS        */}
        {/* ------------------------------------------------------------ */}
        <div className="xl:col-span-4 flex flex-col gap-5 sm:gap-6">
          
          {/* CARD 1: PROFIL PENERIMA & ALAMAT ANTAR */}
          <div className="bg-white rounded-[26px] p-5 sm:p-6 border border-[#E1EFF0] shadow-[0_8px_25px_rgba(79,170,168,0.04)] space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-xs border border-teal-100 shrink-0">
                <Image
                  src="/images/avatar-prabowo.jpg"
                  alt="Foto Profil Bapak Prabowo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-slate-900 text-sm sm:text-base truncate">Bapak Prabowo</h3>
                  <span className="text-[10px] font-extrabold text-[#00624E] bg-[#D4ECEC] px-1.5 py-0.2 rounded-md shrink-0">
                    71 th
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium truncate flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#4FAAA8] shrink-0" />
                  <span>Jl. Melati Blok C4 No. 12, RT 04</span>
                </p>
              </div>
            </div>

            <div className="bg-[#F8FAFB] border border-[#E1EFF0] rounded-2xl p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Relawan Pengantar:</span>
                <span className="font-black text-slate-900">Budi Santoso (50m)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Estimasi Waktu Tiba:</span>
                <span className="font-black text-emerald-700">&lt; 5 Menit</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                <span className="text-slate-500 font-medium">Biaya Antar &amp; Pinjam:</span>
                <span className="font-black text-[#00624E]">Gratis (Kas RT)</span>
              </div>
            </div>
          </div>

          {/* CARD 2: KETENTUAN GOTONG ROYONG KAS RT */}
          <div className="bg-white rounded-[26px] p-5 sm:p-6 border border-[#E1EFF0] shadow-[0_8px_25px_rgba(79,170,168,0.04)] space-y-3.5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <div className="w-7 h-7 rounded-xl bg-[#EBF5F5] text-[#246A68] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-black text-sm text-slate-900">
                Ketentuan Gotong Royong
              </h4>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <span><strong>100% Gratis:</strong> Dibiayai penuh dari kas iuran gotong royong warga RT 04.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <span><strong>Diantar &amp; Dijemput:</strong> Relawan siaga yang membawakan dan mengambil kembali ke rumah.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <span><strong>Durasi Fleksibel:</strong> Dipinjam sesuai kebutuhan kontrol dokter atau pemulihan.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <span><strong>Dirawat Bersama:</strong> Alat dibersihkan dan disterilisasi sebelum diserahkan kembali.</span>
              </li>
            </ul>
          </div>

          {/* CARD 3: BANNER DONASI & KONTAK PENGURUS RT */}
          <div className="bg-gradient-to-br from-[#FFFDF5] via-[#FFFBEB] to-[#FEF3C7] border-2 border-amber-300/80 rounded-[26px] p-5 sm:p-6 text-slate-900 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Donasi Alkes untuk Warga</span>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Punya kursi roda, tongkat, atau tensimeter yang sudah tidak terpakai di rumah? Donasikan ke kas RT 04 untuk membantu tetangga yang membutuhkan.
            </p>

            <button
              type="button"
              onClick={() => {
                triggerHaptic(35);
                setShowCallModal(true);
              }}
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-black text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Hubungi Pengurus RT (Pak Joko)</span>
            </button>
          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* 5. MODAL: KONFIRMASI PINJAM ALAT                              */}
      {/* ============================================================ */}
      {selectedAlkes && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setSelectedAlkes(null)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm shadow-2xl border border-slate-100 z-10 overflow-hidden p-6 space-y-4 text-center animate-in zoom-in-95 duration-200">
            
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#EBF5F5] text-[#246A68] flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div>
              <span className="inline-block px-3 py-0.5 rounded-full bg-[#EBF5F5] border border-teal-200 text-[#00624E] text-xs font-black mb-1.5">
                Pinjam Bebas Biaya Kas RT
              </span>
              <h3 className="text-lg font-black text-slate-900 leading-tight">
                Konfirmasi Pinjam {selectedAlkes.nama}
              </h3>
              <p className="text-slate-500 text-xs font-medium mt-1">
                Alat akan langsung diantar ke rumah <strong>Bapak Prabowo (Blok C4 No. 12)</strong> oleh relawan siaga.
              </p>
            </div>

            <div className="bg-[#F8FAFB] border border-[#E1EFF0] rounded-2xl p-3.5 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Durasi Pinjam:</span>
                <span className="font-bold text-slate-800">Sesuai Kebutuhan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Biaya Sewa:</span>
                <span className="font-black text-[#00624E]">Rp 0 (Gratis Kas RT)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Relawan Pengantar:</span>
                <span className="font-bold text-slate-800">Budi Santoso (&lt; 5 Mnt)</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                id="btn-confirm-pinjam-modal"
                onClick={() => handlePinjam(selectedAlkes)}
                className="w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm text-white shadow-md shadow-[#4EA8A6]/25 bg-gradient-to-r from-[#4EA8A6] via-[#469F9D] to-[#3B8F8D] hover:from-[#3B8F8D] hover:to-[#2F7775] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Konfirmasi &amp; Antar Sekarang</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedAlkes(null)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-2xl transition-all cursor-pointer"
              >
                Kembali
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 6. MODAL: DETAIL & SPESIFIKASI ALAT                           */}
      {/* ============================================================ */}
      {detailAlkes && (
        <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setDetailAlkes(null)}
          />
          <div className="relative bg-white w-full sm:max-w-md rounded-t-[32px] sm:rounded-[32px] shadow-2xl border border-slate-100 z-10 overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">
            
            {/* Photo Header */}
            <div className="relative w-full h-52 sm:h-56 flex-shrink-0 bg-gradient-to-br from-slate-50 to-teal-50/40 p-4 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={detailAlkes.photoSrc}
                  alt={`Foto ${detailAlkes.nama}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 448px"
                />
              </div>

              <button
                type="button"
                onClick={() => setDetailAlkes(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center active:scale-95 transition-all hover:bg-black/60 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <span className={`text-[10px] font-black px-3 py-1 rounded-full border shadow-2xs ${detailAlkes.badgeBg}`}>
                  {detailAlkes.badgeText}
                </span>
                <span className="text-[10px] font-black px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-slate-800 border border-white/60 shadow-2xs">
                  Posko RT 04
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-black text-slate-900 text-lg leading-tight truncate">{detailAlkes.nama}</h3>
                  <p className="text-slate-500 text-xs font-medium mt-1 leading-relaxed">{detailAlkes.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic(30);
                    const speechText = `${detailAlkes.nama}. ${detailAlkes.desc}. ${detailAlkes.spesifikasi.map((s) => s.label + ': ' + s.value).join('. ')}`;
                    speakIndonesian(speechText);
                  }}
                  className="p-3 rounded-2xl bg-[#EBF5F5] hover:bg-[#D9EFEF] text-[#00624E] border border-teal-200 transition-all shrink-0 cursor-pointer shadow-2xs active:scale-95"
                  title="Dengarkan Suara"
                >
                  <Volume2 className="w-5 h-5 text-[#4FAAA8]" />
                </button>
              </div>

              <div className="bg-[#F8FAFB] border border-[#E1EFF0] rounded-2xl p-4 space-y-2.5">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#246A68]">
                  Manfaat &amp; Kemudahan Pakai
                </p>
                {detailAlkes.spesifikasi.map((spec) => (
                  <div key={spec.label} className="flex items-start justify-between gap-3 text-xs">
                    <span className="text-slate-400 font-medium shrink-0">{spec.label}</span>
                    <span className="font-bold text-slate-800 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-1">
                {detailAlkes.status === "tersedia" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setDetailAlkes(null);
                      setSelectedAlkes(detailAlkes);
                    }}
                    className="w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm text-white shadow-md shadow-[#4EA8A6]/25 bg-gradient-to-r from-[#4EA8A6] via-[#469F9D] to-[#3B8F8D] hover:from-[#3B8F8D] hover:to-[#2F7775] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Ajukan Pinjam Gratis</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const nama = detailAlkes.nama;
                      setDetailAlkes(null);
                      handleSetReminder(nama);
                    }}
                    className="w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Bell className="w-4 h-4 text-amber-800" />
                    <span>Ingatkan Saat Tersedia</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setDetailAlkes(null)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-2xl transition-all cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 7. MODAL: HOTLINE POSKO & PENGURUS RT                        */}
      {/* ============================================================ */}
      {showCallModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setShowCallModal(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm shadow-2xl border border-slate-100 z-10 p-6 space-y-4 text-center animate-in zoom-in-95 duration-200">
            
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#EBF5F5] text-[#246A68] flex items-center justify-center shadow-xs">
              <Phone className="w-7 h-7" />
            </div>

            <div>
              <span className="inline-block px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black mb-1">
                Siaga Hotline 24 Jam
              </span>
              <h3 className="text-lg font-black text-slate-900">
                Posko Gotong Royong RT 04
              </h3>
              <p className="text-slate-500 text-xs font-medium mt-1">
                Bapak bisa langsung menelepon Ketua RT atau relawan siaga untuk kebutuhan mendesak.
              </p>
            </div>

            <div className="space-y-2.5 text-left">
              <a
                href="tel:08123456788"
                onClick={() => speakIndonesian("Menghubungi Pak Joko Ketua RT 04 Sukamaju.")}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-[#EBF5F5] border border-slate-200/80 hover:border-teal-200 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    JW
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-slate-900 truncate">Pak Joko</p>
                    <p className="text-[10px] text-slate-500">Ketua RT 04 • 0812-3456-788</p>
                  </div>
                </div>
                <Phone className="w-4 h-4 text-[#4FAAA8] group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="tel:08123456789"
                onClick={() => speakIndonesian("Menghubungi Budi Santoso Relawan Siaga RT 04.")}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-[#EBF5F5] border border-slate-200/80 hover:border-teal-200 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#4EA8A6] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    BS
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-slate-900 truncate">Budi Santoso</p>
                    <p className="text-[10px] text-slate-500">Relawan Siaga • 0812-3456-789</p>
                  </div>
                </div>
                <Phone className="w-4 h-4 text-[#4FAAA8] group-hover:scale-110 transition-transform" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setShowCallModal(false)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-2xl transition-all cursor-pointer"
            >
              Tutup
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
