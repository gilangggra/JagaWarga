"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Pill, 
  ShoppingCart, 
  Heart, 
  Accessibility, 
  AlertTriangle, 
  Check, 
  Phone, 
  ArrowRight, 
  Volume2, 
  Mic, 
  BookOpen, 
  Clock, 
  MapPin,
  Shield,
  ShieldAlert,
  Sun,
  RotateCw
} from "lucide-react";

function triggerHaptic(duration = 40) {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(duration);
    } catch {}
  }
}

import { speakIndonesian } from "@/lib/speak";

const CATEGORIES = [
  {
    id: "obat",
    label: "Beli Obat",
    desc: "Apotek & Resep",
    href: "/lansia/bantuan?kategori=obat",
    speakText: "Membuka menu Beli Obat di Apotek.",
    containerBg: "bg-[#FEE2E2]",
    iconColor: "text-[#DC2626]",
    icon: <Pill className="w-8 h-8 stroke-[2.2]" />,
  },
  {
    id: "belanja",
    label: "Belanja Sayur",
    desc: "Warung RT",
    href: "/lansia/bantuan?kategori=belanja",
    speakText: "Membuka menu Belanja Sayur di Warung RT.",
    containerBg: "bg-[#FFEDD5]",
    iconColor: "text-[#EA580C]",
    icon: <ShoppingCart className="w-8 h-8 stroke-[2.2]" />,
  },
  {
    id: "alkes",
    label: "Pinjam Alkes",
    desc: "Kas RT Gratis",
    href: "/lansia/alkes",
    speakText: "Membuka menu Pinjam Alat Kesehatan Kas RT.",
    containerBg: "bg-[#E6F4EA]",
    iconColor: "text-[#00624E]",
    icon: <Accessibility className="w-8 h-8 stroke-[2.2]" />,
  },
  {
    id: "cek_fisik",
    label: "Teman Kontrol",
    desc: "Posyandu & Dokter",
    href: "/lansia/bantuan?kategori=cek_rumah",
    speakText: "Membuka menu Teman Kontrol ke Posyandu dan Dokter.",
    containerBg: "bg-[#F3E8FF]",
    iconColor: "text-[#9333EA]",
    icon: <Heart className="w-8 h-8 stroke-[2.2]" />,
  },
];

interface Relawan {
  id: string;
  nama: string;
  inisial: string;
  peran: string;
  jarak: string;
  estimasi: string;
  lokasi: string;
  telepon: string;
  avatarBg: string;
  isHotline?: boolean;
}

const RELAWAN_NEARBY: Relawan[] = [
  { id: "joko", nama: "Pak Joko", inisial: "JW", peran: "Ketua RT 04 (Hotline 24 Jam)", jarak: "100m", estimasi: "~2 mnt", lokasi: "Blok A1, No. 01", telepon: "08123456788", avatarBg: "bg-amber-600", isHotline: true },
  { id: "budi", nama: "Budi Santoso", inisial: "BS", peran: "Relawan Siaga (Aktif Saat Tugas)", jarak: "50m", estimasi: "< 1 mnt", lokasi: "Blok C4, No. 12", telepon: "08123456789", avatarBg: "bg-teal-600", isHotline: false },
  { id: "ani", nama: "Bu Ani", inisial: "AN", peran: "Kader Posyandu (Aktif Saat Tugas)", jarak: "120m", estimasi: "~3 mnt", lokasi: "Blok B2, No. 08", telepon: "08123456787", avatarBg: "bg-rose-500", isHotline: false },
];

function IlluSeniorBapak({ isChecked = true }: { isChecked?: boolean }) {
  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#E6F4EA] flex items-center justify-center flex-shrink-0 shadow-inner">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 sm:w-20 sm:h-20">
        <circle cx="50" cy="50" r="44" fill="#E6F4EA" />
        <path d="M20 86 C20 68, 32 62, 50 62 C68 62, 80 68, 80 86 Z" fill="#00624E" opacity="0.85" />
        <path d="M42 62 L50 74 L58 62 Z" fill="#FED7AA" />
        <path d="M36 62 L44 86 L50 86 L56 86 L64 62" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.4" fill="none" />
        
        <circle cx="28" cy="45" r="5" fill="#FDBA74" />
        <circle cx="72" cy="45" r="5" fill="#FDBA74" />

        <circle cx="50" cy="44" r="21" fill="#FED7AA" />

        <path d="M28 42 C28 25, 40 18, 50 18 C60 18, 72 25, 72 42 C70 28, 62 23, 50 23 C38 23, 30 28, 28 42 Z" fill="#64748B" />
        <path d="M28 40 L28 46 L31 43 Z" fill="#64748B" />
        <path d="M72 40 L72 46 L69 43 Z" fill="#64748B" />

        <path d="M38 34 Q42 32 46 34" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M54 34 Q58 32 62 34" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" fill="none" />

        <rect x="36" y="37" width="11" height="9" rx="3" fill="white" stroke="#334155" strokeWidth="2" />
        <rect x="53" y="37" width="11" height="9" rx="3" fill="white" stroke="#334155" strokeWidth="2" />
        <line x1="47" y1="41" x2="53" y2="41" stroke="#334155" strokeWidth="2" />
        <line x1="36" y1="40" x2="29" y2="42" stroke="#334155" strokeWidth="1.5" />
        <line x1="64" y1="40" x2="71" y2="42" stroke="#334155" strokeWidth="1.5" />

        <circle cx="41.5" cy="41.5" r="2" fill="#0F172A" />
        <circle cx="58.5" cy="41.5" r="2" fill="#0F172A" />

        <path d="M50 43 L48.5 48 L51.5 48" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M43 53 Q50 59 57 53" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
      {isChecked ? (
        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#00624E] text-white flex items-center justify-center shadow-xs border-2 border-white">
          <Check className="w-4 h-4 stroke-[3]" />
        </div>
      ) : (
        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs border-2 border-white">
          <Clock className="w-4 h-4 stroke-[2.5]" />
        </div>
      )}
    </div>
  );
}

export default function LansiaDashboardPage() {
  const router = useRouter();
  const [isCheckinDone, setIsCheckinDone] = useState(false);
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const [checkinTime, setCheckinTime] = useState<string>("08:00 WIB");
  const [snoozeToast, setSnoozeToast] = useState(false);
  const [sosCountdown, setSosCountdown] = useState<number | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [voiceStep, setVoiceStep] = useState<"listening" | "transcribed">("listening");
  const [voiceText, setVoiceText] = useState("");
  const [selectedRelawan, setSelectedRelawan] = useState<Relawan | null>(null);

  useEffect(() => {
    if (sosCountdown === null) return;
    if (sosCountdown === 0) {
      router.push("/lansia/darurat");
      return;
    }
    const timer = setTimeout(() => {
      triggerHaptic(50);
      setSosCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);
    return () => clearTimeout(timer);
  }, [sosCountdown, router]);

  useEffect(() => {
    if (isRecording) {
      setVoiceStep("listening");
      setVoiceText("");
      const t = setTimeout(() => {
        setVoiceStep("transcribed");
        setVoiceText("Tolong bantu belikan obat darah tinggi (Amlodipine) di apotek terdekat.");
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [isRecording]);

  const handleStartSos = () => {
    triggerHaptic(100);
    setSosCountdown(5);
  };

  const handleCancelSos = () => {
    triggerHaptic(30);
    setSosCountdown(null);
  };

  const handleCheckin = () => {
    triggerHaptic(40);
    const now = new Date();
    const timeStr = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";
    setCheckinTime(timeStr);
    setIsCheckinDone(true);
    setShowCheckinModal(true);
    speakIndonesian("Kabar sehat Bapak berhasil dikirim ke Titiek dan relawan RT 04.");
  };

  const handleLaporUlang = () => {
    triggerHaptic(40);
    setShowCheckinModal(true);
    speakIndonesian("Laporan kondisi terbaru Bapak berhasil dikirim ulang ke Titiek dan relawan RT 04.");
  };

  const handleSnooze = () => {
    triggerHaptic(40);
    setSnoozeToast(true);
    speakIndonesian("Waktu istirahat Bapak ditunda 30 menit. Notifikasi ke keluarga dijeda sementara.");
    setTimeout(() => setSnoozeToast(false), 4500);
  };

  const handleSendVoice = () => {
    triggerHaptic(40);
    setIsRecording(false);
    router.push("/lansia/status");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-5 sm:space-y-8 font-sans pb-36 sm:pb-32 lg:pb-12 min-w-0 overflow-x-hidden">

      {snoozeToast && (
        <div className="fixed top-4 inset-x-4 z-50 max-w-md mx-auto">
          <div className="bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center justify-between gap-3 border border-slate-700 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-emerald-400 stroke-[2.5] flex-shrink-0" />
              <p className="text-xs sm:text-sm font-bold">Waktu istirahat ditunda 30 menit. Tetangga &amp; keluarga dijeda.</p>
            </div>
            <button onClick={() => setSnoozeToast(false)} className="text-xs font-black px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full transition-all shrink-0 cursor-pointer">
              Tutup
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5 sm:space-y-1">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Selamat Pagi, Bapak Prabowo!
          </h1>
          <p className="text-xs sm:text-base font-medium text-slate-500">
            Semoga hari ini Bapak sehat dan bahagia selalu.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:items-center gap-1 p-1 bg-white border border-slate-200/90 rounded-2xl shadow-2xs w-full sm:w-auto text-xs">
          <button
            type="button"
            onClick={() => {
              triggerHaptic(30);
              setIsCheckinDone(false);
            }}
            className={`py-2 px-2 sm:px-3 rounded-xl font-bold transition-all cursor-pointer text-[11px] sm:text-xs text-center truncate ${
              !isCheckinDone
                ? "bg-amber-100 text-amber-900 font-black shadow-2xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span className="sm:hidden">07:00 (Belum Lapor)</span>
            <span className="hidden sm:inline">State 1: Belum Lapor (07:00)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              triggerHaptic(30);
              setIsCheckinDone(true);
            }}
            className={`py-2 px-2 sm:px-3 rounded-xl font-bold transition-all cursor-pointer text-[11px] sm:text-xs text-center truncate ${
              isCheckinDone
                ? "bg-[#00624E] text-white font-black shadow-2xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span className="sm:hidden">08:00 (Sudah Lapor)</span>
            <span className="hidden sm:inline">State 2: Sudah Lapor (08:00)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">

        <div className={`lg:col-span-7 xl:col-span-8 rounded-3xl p-4 sm:p-7 shadow-[0_4px_24px_rgba(0,98,78,0.04)] flex flex-col justify-between min-h-[250px] sm:min-h-[270px] relative overflow-hidden transition-all duration-300 ${
          isCheckinDone
            ? "bg-gradient-to-br from-[#E6F4EA]/70 via-[#F3FAF5] to-white border border-emerald-200/90"
            : "bg-gradient-to-br from-amber-50/60 via-amber-50/20 to-white border border-amber-200/90"
        }`}>

          <div className="flex flex-wrap items-center justify-between gap-2">
            {isCheckinDone ? (
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white text-[#00624E] text-[11px] sm:text-xs font-black border border-emerald-200 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#00624E] animate-pulse" />
                <span>Laporan Pagi ({checkinTime})</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-[11px] sm:text-xs font-black border border-amber-200/90 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Laporan Pagi (Batas 09:00 WIB)</span>
              </span>
            )}

            {isCheckinDone ? (
              <span className="text-[11px] sm:text-xs font-black text-white bg-[#00624E] px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-2xs flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Terkonfirmasi</span>
              </span>
            ) : (
              <span className="text-[11px] sm:text-xs font-bold text-amber-800 bg-amber-100/90 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-amber-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Belum Konfirmasi</span>
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5 my-4 sm:my-3 text-center sm:text-left">
            <IlluSeniorBapak isChecked={isCheckinDone} />
            <div className="space-y-1 sm:space-y-1.5 flex-1 min-w-0">
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">
                {isCheckinDone ? "Kabar Saya Sehat & Aman" : "Bagaimana Kabar Bapak Pagi Ini?"}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed max-w-xl">
                {isCheckinDone ? (
                  <>
                    Terkonfirmasi pukul <strong className="text-[#00624E] font-black">{checkinTime}</strong> ke Titiek (Anak) &amp; Relawan RT 04.
                  </>
                ) : (
                  <>
                    Tekan tombol untuk memberi kabar ke <strong className="text-slate-800">Titiek (Anak di Jakarta)</strong> &amp; Pengurus RT 04.
                  </>
                )}
              </p>
            </div>
          </div>

          {isCheckinDone ? (
            <div className="pt-3.5 border-t border-emerald-100/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-[#00624E]">
                <Check className="w-4 h-4 stroke-[3] shrink-0" />
                <span>Laporan Selesai untuk Hari Ini</span>
              </div>

              <button
                type="button"
                id="btn-lapor-ulang"
                onClick={handleLaporUlang}
                className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-black text-xs sm:text-sm rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <RotateCw className="w-3.5 h-3.5 text-slate-600" />
                <span>Lapor Ulang Kondisi</span>
              </button>
            </div>
          ) : (
            <div className="pt-3.5 border-t border-amber-200/80 flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-3">
              <button
                type="button"
                id="btn-checkin-utama"
                onClick={handleCheckin}
                className="w-full sm:flex-1 py-3.5 px-4 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2"
              >
                <Sun className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>KABAR SAYA SEHAT &amp; AMAN</span>
              </button>

              <button
                type="button"
                onClick={handleSnooze}
                id="btn-snooze-checkin"
                className="w-full sm:flex-1 py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-black text-xs sm:text-sm rounded-2xl border border-slate-200 shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 order-2 sm:order-1"
              >
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Tidur Lagi 30 Menit (Tunda)</span>
              </button>
            </div>
          )}

        </div>

        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">

          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-black text-slate-900 text-sm sm:text-base">
                Relawan Siaga di Sekitar
              </h3>
            </div>
            <span className="text-[11px] font-black text-slate-400">Radius 150m</span>
          </div>

          <div className="space-y-2.5 flex-1">
            {RELAWAN_NEARBY.map((r) => (
              <div
                key={r.id}
                onClick={() => {
                  triggerHaptic(30);
                  setSelectedRelawan(r);
                }}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 hover:bg-slate-100/90 cursor-pointer transition-all border border-slate-100 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-2xl ${r.avatarBg} text-white flex items-center justify-center font-black text-xs shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    {r.inisial}
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-slate-900 text-xs sm:text-sm truncate">{r.nama}</p>
                    <p className="text-slate-400 text-[11px] font-medium truncate">{r.peran}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#00624E] bg-[#E6F4EA] border border-emerald-200/80 px-2.5 py-1 rounded-full flex-shrink-0">
                    {r.jarak}
                  </span>
                  <Phone className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00624E] transition-colors" />
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 font-medium text-center">
            Pak Joko hotline 24 jam. Kontak relawan tetangga aktif saat ada tugas.
          </p>

        </div>

      </div>

      <div className="space-y-4">

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Layanan Cepat Warga</span>
            <h2 className="font-black text-slate-900 text-lg sm:text-xl leading-tight">
              Butuh Bantuan Apa Hari Ini?
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/lansia/panduan"
              onClick={() => triggerHaptic(30)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#00624E] text-xs font-black transition-all border border-emerald-200 active:scale-95 shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#00624E]" />
              <span>Panduan</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                triggerHaptic(30);
                speakIndonesian("Pilih salah satu menu bantuan: Beli Obat, Belanja Sayur, Pinjam Alat Kesehatan, atau Teman Kontrol.");
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black transition-all border border-slate-200 active:scale-95 shadow-2xs cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-slate-600" />
              <span>Suara</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              onClick={() => {
                triggerHaptic(40);
                speakIndonesian(cat.speakText);
              }}
              className="group bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all active:scale-[0.98] flex flex-col justify-between min-h-[160px] sm:min-h-[180px]"
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center ${cat.containerBg} ${cat.iconColor} shadow-2xs group-hover:scale-105 transition-transform`}>
                {cat.icon}
              </div>
              <div className="mt-4 space-y-0.5">
                <p className="font-black text-base sm:text-lg leading-tight text-slate-900 group-hover:text-[#00624E] transition-colors">
                  {cat.label}
                </p>
                <p className="text-xs font-medium text-slate-500">
                  {cat.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

        <button
          onClick={() => {
            triggerHaptic(40);
            setIsRecording(true);
          }}
          className="group flex items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-sm active:scale-[0.98] shadow-xs transition-all text-left cursor-pointer"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform">
            <Mic className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-sky-600">Paling Mudah</span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
              Bicara Pakai Suara
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Tekan untuk merekam suara tanpa mengetik
            </p>
          </div>
        </button>

        <button
          type="button"
          id="btn-sos-bottom"
          onClick={handleStartSos}
          className="group flex items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-3xl bg-[#DC2626] hover:bg-[#b91c1c] active:scale-[0.98] text-white shadow-sm transition-all text-left w-full cursor-pointer"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform">
            <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-rose-200">Siaga RT 24 Jam</span>
            <h3 className="text-lg sm:text-xl font-black leading-tight">
              Bantuan Mendesak
            </h3>
            <p className="text-xs text-rose-100 font-medium mt-0.5">
              Alarm darurat siaga (Dilengkapi jeda batal 5 detik)
            </p>
          </div>
        </button>

      </div>

      {sosCountdown !== null && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={handleCancelSos} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm p-6 sm:p-7 text-center shadow-2xl border border-rose-200 z-10 overflow-hidden space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 mx-auto rounded-full bg-rose-100 text-[#DC2626] flex items-center justify-center font-black text-3xl shadow-inner animate-pulse">
              {sosCountdown}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#DC2626] bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                Alarm Darurat Siaga
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2 leading-tight">
                Menghubungi Posko Siaga RT &amp; 112
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Alarm berbunyi dalam <strong>{sosCountdown} detik</strong>. Jika tidak sengaja tertekan, segera batalkan di bawah.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleCancelSos}
                id="btn-batal-sos"
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-sm rounded-2xl shadow-md active:scale-95 transition-all cursor-pointer"
              >
                Batalkan (Salah Pencet)
              </button>

              <button
                type="button"
                onClick={() => {
                  triggerHaptic(100);
                  router.push("/lansia/darurat");
                }}
                className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-[#DC2626] font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Kirim Sekarang Tanpa Tunggu
              </button>
            </div>
          </div>
        </div>
      )}

      {showCheckinModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setShowCheckinModal(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E6F4EA] text-[#00624E] flex items-center justify-center shadow-xs">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 leading-tight">Kabar Sehat Terkirim</h3>
              <p className="text-slate-500 text-xs font-medium mt-1">
                Pukul {checkinTime} - Keluarga Titiek &amp; relawan RT 04 telah menerima kabar bahwa Bapak dalam kondisi sehat.
              </p>
            </div>
            <button
              onClick={() => {
                triggerHaptic(30);
                setShowCheckinModal(false);
              }}
              className="w-full py-3.5 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm transition-all cursor-pointer"
            >
              Alhamdulillah, Tutup
            </button>
          </div>
        </div>
      )}

      {isRecording && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setIsRecording(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-md p-6 text-center shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#00624E] text-white flex items-center justify-center shadow-md animate-pulse">
              <Mic className="w-8 h-8" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#00624E] text-xs font-black mb-1">
                {voiceStep === "listening" ? "Mendengarkan (Maks. 30 dtk)..." : "Suara Dicatat"}
              </span>
              <h3 className="text-base font-black text-slate-900">
                {voiceStep === "listening" ? "Ucapkan Kebutuhan Bapak/Ibu" : "Rangkuman Permintaan"}
              </h3>
            </div>

            {voiceStep === "listening" ? (
              <div className="flex items-center justify-center gap-1.5 h-10 py-1">
                {[4, 7, 11, 7, 5, 10, 13, 7, 5, 9].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-[#00624E] rounded-full animate-pulse"
                    style={{ height: `${h * 2.4}px`, animationDelay: `${i * 0.08}s` }}
                  />
                ))}
              </div>
            ) : (
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs font-medium text-slate-800 leading-relaxed">
                &ldquo;{voiceText}&rdquo;
              </div>
            )}

            <div className="space-y-2 pt-1">
              {voiceStep === "transcribed" && (
                <button
                  onClick={handleSendVoice}
                  className="w-full py-3.5 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Kirim ke Relawan RT</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              )}

              <button
                onClick={() => {
                  triggerHaptic(30);
                  setIsRecording(false);
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-2xl transition-all cursor-pointer"
              >
                Batalkan
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedRelawan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setSelectedRelawan(null)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-4 animate-in zoom-in-95 duration-200">
            <div className={`w-14 h-14 mx-auto rounded-2xl ${selectedRelawan.avatarBg} text-white flex items-center justify-center font-black text-lg shadow-sm`}>
              {selectedRelawan.inisial}
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900">{selectedRelawan.nama}</h3>
              <p className="text-emerald-700 text-xs font-bold mt-0.5">{selectedRelawan.peran}</p>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black my-2">
                {selectedRelawan.jarak} dari rumah ({selectedRelawan.estimasi})
              </div>
              <p className="text-slate-400 text-xs">{selectedRelawan.lokasi}</p>
            </div>

            <div className="space-y-2 pt-1">
              {selectedRelawan.isHotline ? (
                <a
                  href={`tel:${selectedRelawan.telepon}`}
                  onClick={() => triggerHaptic(50)}
                  className="w-full py-3.5 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Hubungi Hotline Pak RT (24 Jam)</span>
                </a>
              ) : (
                <div className="space-y-2">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-1">
                    <p className="font-bold text-slate-800">Status Panggilan:</p>
                    <p className="text-[11px] leading-relaxed">
                      Panggilan telepon ke relawan tetangga akan aktif otomatis saat relawan sedang ditugaskan mengantar untuk Bapak.
                    </p>
                  </div>
                  <a
                    href="tel:08123456788"
                    onClick={() => triggerHaptic(50)}
                    className="w-full py-3 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Hubungi Hotline Pak RT (Pak Joko)</span>
                  </a>
                </div>
              )}

              <button
                onClick={() => setSelectedRelawan(null)}
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
