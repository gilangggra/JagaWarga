"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function speakPrompt(text: string) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "id-ID";
      utterance.rate = 0.92;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
    }
  }
}

const CATEGORIES = [
  {
    id: "obat",
    label: "Beli Obat",
    colorName: "Kotak Merah",
    colorBadge: "bg-rose-50 text-rose-700 border-rose-200",
    desc: "Apotek & Resep",
    href: "/lansia/bantuan?kategori=obat",
    speakText: "Membuka menu Kotak Merah, Beli Obat di Apotek.",
    iconBg: "bg-rose-500 text-white",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-15a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 4.5v15a2.25 2.25 0 0 0 2.25 2.25Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4.5m0 0H9.75m2.25 0h2.25" />
      </svg>
    ),
  },
  {
    id: "belanja",
    label: "Beli Sayur",
    colorName: "Kotak Oranye",
    colorBadge: "bg-amber-50 text-amber-800 border-amber-200",
    desc: "Warung RT",
    href: "/lansia/bantuan?kategori=belanja",
    speakText: "Membuka menu Kotak Oranye, Beli Sayur di Warung RT.",
    iconBg: "bg-amber-500 text-white",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
    ),
  },
  {
    id: "cek_fisik",
    label: "Teman Jalan",
    colorName: "Kotak Ungu",
    colorBadge: "bg-purple-50 text-purple-800 border-purple-200",
    desc: "Posyandu & Dokter",
    href: "/lansia/bantuan?kategori=cek_rumah",
    speakText: "Membuka menu Kotak Ungu, Teman Jalan ke Posyandu dan Dokter.",
    iconBg: "bg-purple-500 text-white",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    id: "alkes",
    label: "Pinjam Alkes",
    colorName: "Kotak Hijau",
    colorBadge: "bg-emerald-50 text-emerald-800 border-emerald-200",
    desc: "Kas RT Gratis",
    href: "/lansia/alkes",
    speakText: "Membuka menu Kotak Hijau, Pinjam Alat Kesehatan Kas RT.",
    iconBg: "bg-teal-600 text-white",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 6.75V18M12 18H8.25M12 18h3.75M8.25 18v-4.5a3.75 3.75 0 1 1 7.5 0V18" />
      </svg>
    ),
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
}

const RELAWAN_NEARBY: Relawan[] = [
  { id: "budi", nama: "Budi Santoso", inisial: "BS", peran: "Relawan Siaga", jarak: "50m", estimasi: "< 1 mnt", lokasi: "Blok C4, No. 12", telepon: "08123456789", avatarBg: "bg-teal-600" },
  { id: "joko", nama: "Pak Joko", inisial: "JW", peran: "Ketua RT 04", jarak: "100m", estimasi: "~2 mnt", lokasi: "Blok A1, No. 01", telepon: "08123456788", avatarBg: "bg-amber-600" },
  { id: "ani", nama: "Bu Ani", inisial: "AN", peran: "Kader Posyandu", jarak: "120m", estimasi: "~3 mnt", lokasi: "Blok B2, No. 08", telepon: "08123456787", avatarBg: "bg-rose-500" },
];

const JADWAL_HARIAN = [
  {
    id: "kabar_pagi",
    jam: "08:00",
    judul: "Kabar Pagi",
    kategori: "Check-in",
    waktuStatus: "Tuntas 08:05",
    isCompleted: true,
    accentColor: "emerald",
  },
  {
    id: "obat_siang",
    jam: "12:30",
    judul: "Minum Obat",
    kategori: "Hipertensi",
    waktuStatus: "Siaga 12:30",
    isActive: true,
    accentColor: "amber",
  },
  {
    id: "posyandu_sore",
    jam: "16:00",
    judul: "Posyandu",
    kategori: "Cek Tensi",
    waktuStatus: "Pukul 16:00",
    isUpcoming: true,
    accentColor: "sky",
  },
];

function IlluKabar() {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="160" cy="90" r="70" fill="rgba(255,255,255,0.15)" />
      <circle cx="160" cy="90" r="45" fill="rgba(255,255,255,0.1)" />

      <ellipse cx="160" cy="138" rx="42" ry="24" fill="#FED7AA" />
      <path d="M118 138 Q160 160 202 138 L198 152 Q160 168 122 152Z" fill="white" opacity="0.4" />
      <circle cx="160" cy="85" r="32" fill="#FED7AA" />
      <path d="M128 78 Q135 48 160 52 Q185 48 192 78" fill="#F8FAFC" />
      <ellipse cx="160" cy="54" rx="22" ry="8" fill="#F8FAFC" />

      <circle cx="146" cy="83" r="10" fill="white" stroke="#0F172A" strokeWidth="2.5" />
      <circle cx="174" cy="83" r="10" fill="white" stroke="#0F172A" strokeWidth="2.5" />
      <line x1="156" y1="83" x2="164" y2="83" stroke="#0F172A" strokeWidth="2.5" />
      <circle cx="146" cy="83" r="3" fill="#0F172A" />
      <circle cx="174" cy="83" r="3" fill="#0F172A" />
      <path d="M150 98 Q160 108 170 98" stroke="#EA580C" strokeWidth="2.8" strokeLinecap="round" fill="none" />

      <circle cx="215" cy="115" r="22" fill="#16A34A" stroke="white" strokeWidth="3.5" />
      <path d="M206 115 L212 121 L224 109" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IlluAlkes() {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="160" cy="90" r="70" fill="rgba(255,255,255,0.15)" />
      <circle cx="160" cy="90" r="45" fill="rgba(255,255,255,0.1)" />
      <ellipse cx="160" cy="154" rx="110" ry="8" fill="rgba(0,0,0,0.06)" />

      <g transform="translate(80, 20)">
        <circle cx="50" cy="95" r="30" fill="none" stroke="white" strokeWidth="5" />
        <circle cx="50" cy="95" r="10" fill="none" stroke="white" strokeWidth="3" />
        <circle cx="50" cy="95" r="4" fill="white" />
        <line x1="50" y1="65" x2="50" y2="85" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
        <line x1="50" y1="105" x2="50" y2="125" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
        <line x1="20" y1="95" x2="40" y2="95" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
        <line x1="60" y1="95" x2="80" y2="95" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
        <circle cx="106" cy="107" r="11" fill="none" stroke="white" strokeWidth="4" />
        <circle cx="106" cy="107" r="3" fill="white" />
        <path d="M50 70 L50 35 L88 35 L96 70 L106 82 L106 107" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="50" y="68" width="46" height="9" rx="4.5" fill="rgba(255,255,255,0.4)" />
        <rect x="46" y="32" width="42" height="12" rx="6" fill="rgba(255,255,255,0.4)" />
        <line x1="48" y1="32" x2="48" y2="15" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="88" y1="32" x2="88" y2="15" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
        <rect x="44" y="10" width="48" height="8" rx="4" fill="white" />
      </g>

      <circle cx="218" cy="72" r="22" fill="white" />
      <rect x="214" y="60" width="8" height="24" rx="2" fill="#0D9488" />
      <rect x="206" y="68" width="24" height="8" rx="2" fill="#0D9488" />
    </svg>
  );
}

export default function LansiaDashboardPage() {
  const router = useRouter();
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const [checkinSuccess, setCheckinSuccess] = useState(false);
  const [checkinTime, setCheckinTime] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);
  const [voiceStep, setVoiceStep] = useState<"listening" | "transcribed">("listening");
  const [voiceText, setVoiceText] = useState("");
  const [selectedRelawan, setSelectedRelawan] = useState<Relawan | null>(null);

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

  const handleCheckin = () => {
    const now = new Date();
    setCheckinTime(now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB");
    setCheckinSuccess(true);
    setShowCheckinModal(true);
  };

  const handleSendVoice = () => {
    setIsRecording(false);
    router.push("/lansia/status");
  };

  return (
    <div className="flex flex-col flex-1 min-h-full font-sans pb-32 lg:pb-12 bg-[#F8FAFC]">

      <header className="lg:hidden sticky top-0 z-20 pt-3 px-4 pb-2 space-y-2 bg-[#F8FAFC]">
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/60 px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
              BP
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Selamat Pagi</p>
              <h1 className="text-[15px] font-black text-slate-900 leading-none">Bapak Prabowo</h1>
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
              Selamat Pagi, Bapak Prabowo
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-800 text-xs font-black">3 Relawan Siaga RT 04</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">

          <div className="lg:col-span-8 space-y-4 sm:space-y-6">

            <div className="grid grid-cols-2 gap-3 sm:gap-4">

              <div className={`rounded-[22px] sm:rounded-[26px] p-3.5 sm:p-6 shadow-sm flex flex-col justify-between relative overflow-hidden text-white min-h-[160px] sm:min-h-[220px] transition-colors duration-300 ${
                checkinSuccess ? "bg-[#00624E]" : "bg-sky-600"
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-1.5 sm:mb-3">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full border border-white/25">
                      {checkinSuccess ? "Sudah Lapor" : "Laporan Pagi"}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-sky-100">08:00 WIB</span>
                  </div>

                  <div className="w-full h-16 sm:h-28 mb-2 sm:mb-3 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
                    <IlluKabar />
                  </div>

                  <h2 className="text-sm sm:text-xl font-black leading-tight">Kabar Saya Sehat</h2>
                </div>

                <div className="mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-white/20 flex items-center justify-end">
                  <button
                    id="btn-checkin"
                    onClick={() => {
                      handleCheckin();
                      speakPrompt("Kabar sehat Bapak berhasil dikirim ke keluarga dan relawan RT.");
                    }}
                    className="w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2.5 bg-white hover:bg-sky-50 active:scale-95 text-slate-900 font-black text-xs sm:text-sm rounded-full shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{checkinSuccess ? "Lapor Ulang" : "Kirim Kabar"}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="bg-[#0D9488] rounded-[22px] sm:rounded-[26px] p-3.5 sm:p-6 shadow-sm flex flex-col justify-between relative overflow-hidden text-white min-h-[160px] sm:min-h-[220px]">
                <div>
                  <div className="flex items-center justify-between mb-1.5 sm:mb-3">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full border border-white/25">
                      Kas Alkes RT
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-teal-100">Gratis 100%</span>
                  </div>

                  <div className="w-full h-16 sm:h-28 mb-2 sm:mb-3 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
                    <IlluAlkes />
                  </div>

                  <h2 className="text-sm sm:text-xl font-black leading-tight">Pinjam Alkes</h2>
                </div>

                <div className="mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-white/20 flex items-center justify-end">
                  <Link
                    href="/lansia/alkes"
                    id="btn-link-alkes"
                    onClick={() => speakPrompt("Membuka katalog pinjaman alat kesehatan Pos RT.")}
                    className="w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2.5 bg-white hover:bg-teal-50 active:scale-95 text-teal-900 font-black text-xs sm:text-sm rounded-full shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Lihat Alat</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>

            </div>

            <div className="bg-white rounded-[24px] sm:rounded-[26px] border border-slate-200/70 p-4 sm:p-6 shadow-xs space-y-3.5 sm:space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-black text-slate-900 text-base">Pilih Kebutuhan</h2>
                <button
                  type="button"
                  onClick={() => speakPrompt("Panduan warna: Kotak Merah Beli Obat, Kotak Oranye Beli Sayur, Kotak Ungu Teman Jalan, Kotak Hijau Pinjam Alkes.")}
                  className="flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-black transition-all border border-sky-200"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-3.5 h-3.5 text-sky-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.5A2.25 2.25 0 0 1 2.25 13.5v-3a2.25 2.25 0 0 1 2.25-2.25h2.25Z" />
                  </svg>
                  <span>Panduan Suara</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={cat.href}
                    onClick={() => speakPrompt(cat.speakText)}
                    className="group flex flex-col justify-between p-3 sm:p-4 rounded-[20px] border border-slate-200/70 bg-slate-50/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all active:scale-[0.97] min-h-[125px] sm:min-h-[135px]"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[9.5px] sm:text-[10px] font-black px-2 py-0.5 rounded-full border ${cat.colorBadge}`}>
                        {cat.colorName}
                      </span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-700 transition-colors">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>

                    <div className="my-1.5 sm:my-2">
                      <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-xs transition-all group-hover:scale-105 ${cat.iconBg}`}>
                        {cat.icon}
                      </div>
                    </div>

                    <div>
                      <p className="font-black text-sm sm:text-[15px] leading-tight text-slate-900">{cat.label}</p>
                      <p className="text-[10.5px] sm:text-[11px] font-medium text-slate-500 mt-0.5">{cat.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

              <button
                id="btn-voice"
                type="button"
                onClick={() => setIsRecording(true)}
                className="group flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-[22px] sm:rounded-[24px] bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white shadow-sm transition-all text-left"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-6 h-6 sm:w-7 sm:h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-sky-100">Pesan Suara</span>
                  <h3 className="text-lg sm:text-xl font-black leading-tight">Bicara Suara</h3>
                </div>
              </button>

              <Link
                href="/lansia/darurat"
                id="btn-sos"
                className="group flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-[22px] sm:rounded-[24px] bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white shadow-sm transition-all text-left"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-rose-100">Siaga 24 Jam</span>
                  <h3 className="text-lg sm:text-xl font-black leading-tight">Bantuan Darurat</h3>
                </div>
              </Link>

            </div>

          </div>

          <div className="lg:col-span-4 space-y-4 sm:space-y-5">

            <div className="bg-white rounded-[24px] sm:rounded-[26px] border border-slate-200/70 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h3 className="font-black text-slate-900 text-sm">Relawan Siaga RT 04</h3>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Radius 150m</span>
              </div>

              <div className="space-y-2">
                {RELAWAN_NEARBY.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRelawan(r)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 hover:bg-slate-100 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-full ${r.avatarBg} text-white flex items-center justify-center font-black text-xs flex-shrink-0`}>
                        {r.inisial}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 text-xs truncate">{r.nama}</p>
                        <p className="text-slate-400 text-[10.5px]">{r.peran}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex-shrink-0">
                      {r.jarak}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[24px] sm:rounded-[26px] border border-slate-200/70 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-black text-slate-900 text-sm">Jadwal Hari Ini</h3>
                <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  1/3 Selesai
                </span>
              </div>

              <div className="space-y-2">
                {JADWAL_HARIAN.map((j) => (
                  <div
                    key={j.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border ${
                      j.isActive
                        ? "bg-amber-50/70 border-amber-200"
                        : "bg-slate-50/80 border-slate-200/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xs font-black text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200/70">
                        {j.jam}
                      </span>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 text-xs truncate">{j.judul}</p>
                        <p className="text-slate-400 text-[10px]">{j.kategori}</p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        j.isCompleted
                          ? "text-emerald-700 bg-emerald-50"
                          : j.isActive
                          ? "text-amber-800 bg-amber-100 font-black"
                          : "text-slate-500 bg-slate-100"
                      }`}
                    >
                      {j.waktuStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>

      {showCheckinModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setShowCheckinModal(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 leading-tight">Kabar Terkirim</h3>
              <p className="text-slate-500 text-xs font-medium mt-1">
                Pukul {checkinTime} - Keluarga dan relawan telah menerima kabar sehat Anda.
              </p>
            </div>
            <button
              onClick={() => setShowCheckinModal(false)}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-xs rounded-full shadow-sm transition-all"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {isRecording && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setIsRecording(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-md p-6 text-center shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md animate-pulse">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
              </svg>
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-black mb-1">
                {voiceStep === "listening" ? "Mendengarkan..." : "Suara Dicatat"}
              </span>
              <h3 className="text-base font-black text-slate-900">
                {voiceStep === "listening" ? "Ucapkan Kebutuhan Bapak/Ibu" : "Rangkuman Permintaan"}
              </h3>
            </div>

            {voiceStep === "listening" ? (
              <div className="flex items-center justify-center gap-1 h-8 py-1">
                {[3, 6, 9, 6, 4, 8, 10, 6, 4, 7].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-sky-600 rounded-full animate-pulse"
                    style={{ height: `${h * 2.2}px`, animationDelay: `${i * 0.08}s` }}
                  />
                ))}
              </div>
            ) : (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs font-medium text-slate-800 leading-relaxed">
                &ldquo;{voiceText}&rdquo;
              </div>
            )}

            <div className="space-y-2 pt-1">
              {voiceStep === "transcribed" && (
                <button
                  onClick={handleSendVoice}
                  className="w-full py-3 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-black text-xs rounded-full shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Kirim ke Relawan RT</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              )}
              <button
                onClick={() => setIsRecording(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-full transition-all"
              >
                Batalkan
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedRelawan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setSelectedRelawan(null)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-4">
            <div className={`w-14 h-14 mx-auto rounded-full ${selectedRelawan.avatarBg} text-white flex items-center justify-center font-black text-lg shadow-sm`}>
              {selectedRelawan.inisial}
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900">{selectedRelawan.nama}</h3>
              <p className="text-emerald-600 text-xs font-bold mt-0.5">{selectedRelawan.peran} - Siaga Online</p>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black my-2">
                {selectedRelawan.jarak} dari rumah ({selectedRelawan.estimasi})
              </div>
              <p className="text-slate-400 text-xs">{selectedRelawan.lokasi}</p>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href={`tel:${selectedRelawan.telepon}`}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs rounded-full shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                </svg>
                <span>Telepon Relawan</span>
              </a>
              <button
                onClick={() => setSelectedRelawan(null)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-full transition-all"
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
