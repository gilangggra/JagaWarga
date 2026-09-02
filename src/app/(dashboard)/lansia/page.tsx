"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Pill,
  ShoppingCart,
  Heart,
  Accessibility,
  Mic,
  AlertTriangle,
  Volume2,
  Check,
  Phone,
  ArrowRight,
  ShieldCheck,
  BookOpen
} from "lucide-react";

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
}

const RELAWAN_NEARBY: Relawan[] = [
  { id: "budi", nama: "Budi Santoso", inisial: "BS", peran: "Relawan Siaga", jarak: "50m", estimasi: "< 1 mnt", lokasi: "Blok C4, No. 12", telepon: "08123456789", avatarBg: "bg-teal-600" },
  { id: "joko", nama: "Pak Joko", inisial: "JW", peran: "Ketua RT 04", jarak: "100m", estimasi: "~2 mnt", lokasi: "Blok A1, No. 01", telepon: "08123456788", avatarBg: "bg-amber-600" },
  { id: "ani", nama: "Bu Ani", inisial: "AN", peran: "Kader Posyandu", jarak: "120m", estimasi: "~3 mnt", lokasi: "Blok B2, No. 08", telepon: "08123456787", avatarBg: "bg-rose-500" },
];

function IlluHappySenior() {
  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-center flex-shrink-0 shadow-2xs group">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 sm:w-20 sm:h-20">
        
        <circle cx="50" cy="50" r="42" fill="#E6F4EA" />

        
        <path d="M22 84 C22 66, 34 60, 50 60 C66 60, 78 66, 78 84 Z" fill="#FED7AA" />
        <path d="M28 84 C32 68, 68 68, 72 84 Z" fill="#FFFFFF" opacity="0.7" />

        
        <circle cx="50" cy="42" r="20" fill="#FED7AA" />

        
        <path d="M30 40 C30 20, 70 20, 70 40 C65 24, 35 24, 30 40 Z" fill="#CBD5E1" />
        <ellipse cx="50" cy="24" rx="14" ry="6" fill="#CBD5E1" />

        
        <circle cx="42" cy="40" r="6" fill="white" stroke="#0F172A" strokeWidth="2" />
        <circle cx="58" cy="40" r="6" fill="white" stroke="#0F172A" strokeWidth="2" />
        <line x1="48" y1="40" x2="52" y2="40" stroke="#0F172A" strokeWidth="2" />
        <circle cx="42" cy="40" r="2" fill="#0F172A" />
        <circle cx="58" cy="40" r="2" fill="#0F172A" />

        
        <path d="M44 50 Q50 56 56 50" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>

      
      <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00624E] text-white flex items-center justify-center shadow-sm border-2 border-white ring-1 ring-emerald-200">
        <Check className="w-4 h-4 stroke-[3]" />
      </div>
    </div>
  );
}

export default function LansiaDashboardPage() {
  const router = useRouter();
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const [checkinSuccess, setCheckinSuccess] = useState(false);
  const [checkinTime, setCheckinTime] = useState<string>("08:00 WIB");

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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-36 sm:pb-32 lg:pb-12">

      
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Selamat Pagi, Bapak Prabowo!
        </h1>
        <p className="text-sm sm:text-base font-medium text-slate-500">
          Semoga hari ini Bapak sehat dan bahagia selalu.
        </p>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">

        
        <div className="lg:col-span-7 xl:col-span-8 bg-gradient-to-br from-[#E6F4EA]/70 via-[#F3FAF5] to-white border border-emerald-200/90 rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,98,78,0.04)] flex flex-col justify-between min-h-[250px] sm:min-h-[270px] relative overflow-hidden">

          
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#00624E] text-xs font-black border border-emerald-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#00624E] animate-pulse" />
              <span>Laporan Pagi ({checkinTime})</span>
            </span>

            <span className="text-xs font-black text-white bg-[#00624E] px-3.5 py-1.5 rounded-full shadow-2xs flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Terkonfirmasi</span>
            </span>
          </div>

          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 my-3 text-center sm:text-left">
            <IlluHappySenior />
            <div className="space-y-1 sm:space-y-1.5 flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                Kabar Saya Sehat &amp; Aman
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed">
                Terkonfirmasi pukul <strong className="text-[#00624E] font-black">{checkinTime}</strong> ke Dewi (Anak) &amp; Relawan RT 04.
              </p>
            </div>
          </div>

          
          <div className="pt-3.5 border-t border-emerald-100/90 flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-medium text-slate-400 hidden sm:inline">
              Tetap terhubung dengan keluarga setiap pagi
            </span>
            <button
              id="btn-checkin-ulang"
              onClick={() => {
                handleCheckin();
                speakPrompt("Kabar sehat Bapak berhasil dikirim ulang ke keluarga dan relawan RT.");
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 ml-auto cursor-pointer"
            >
              <span>{checkinSuccess ? "Kabar Terkirim (Kirim Ulang)" : "Kirim Kabar Ulang"}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

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
                onClick={() => setSelectedRelawan(r)}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 hover:bg-slate-100/90 cursor-pointer transition-all border border-slate-100 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-2xl ${r.avatarBg} text-white flex items-center justify-center font-black text-xs shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    {r.inisial}
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-slate-900 text-xs sm:text-sm truncate">{r.nama}</p>
                    <p className="text-slate-400 text-[11px] font-medium">{r.peran}</p>
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
            Klik kontak relawan untuk panggilan telepon langsung.
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
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#00624E] text-xs font-black transition-all border border-emerald-200 active:scale-95 shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#00624E]" />
              <span>Panduan</span>
            </Link>

            <button
              type="button"
              onClick={() => speakPrompt("Pilihan kebutuhan hari ini: Beli Obat, Belanja Sayur, Pinjam Alat Kesehatan, dan Teman Kontrol ke Dokter.")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-black transition-all border border-sky-200 active:scale-95 shadow-2xs"
            >
              <Volume2 className="w-3.5 h-3.5 text-sky-700" />
              <span>Suara</span>
            </button>
          </div>
        </div>

        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              onClick={() => speakPrompt(cat.speakText)}
              className="group bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all active:scale-[0.98] flex flex-col justify-between min-h-[160px] sm:min-h-[180px]"
            >
              
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center ${cat.containerBg} ${cat.iconColor} shadow-2xs group-hover:scale-105 transition-transform`}>
                {cat.icon}
              </div>

              <div className="mt-4 space-y-0.5">
                <p className="font-black text-base sm:text-lg leading-tight text-slate-900">
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

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-2">

        
        <button
          id="btn-voice-bottom"
          type="button"
          onClick={() => setIsRecording(true)}
          className="group flex items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-3xl bg-[#00624E] hover:bg-[#004d3d] active:scale-[0.98] text-white shadow-sm transition-all text-left"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform">
            <Mic className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-200">Praktis Tanpa Ketik</span>
            <h3 className="text-lg sm:text-xl font-black leading-tight">
              Bicara dengan Suara
            </h3>
            <p className="text-xs text-emerald-100 font-medium mt-0.5">
              Tekan &amp; sebutkan bantuan yang Bapak/Ibu perlukan
            </p>
          </div>
        </button>

        
        <Link
          href="/lansia/darurat"
          id="btn-sos-bottom"
          className="group flex items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-3xl bg-[#DC2626] hover:bg-[#b91c1c] active:scale-[0.98] text-white shadow-sm transition-all text-left"
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
              Alarm darurat seketika ke ponsel relawan &amp; tetangga
            </p>
          </div>
        </Link>

      </div>

      
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
                Pukul {checkinTime} - Keluarga Dewi &amp; relawan RT 04 telah menerima kabar bahwa Bapak dalam kondisi sehat.
              </p>
            </div>
            <button
              onClick={() => setShowCheckinModal(false)}
              className="w-full py-3.5 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm transition-all"
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
                {voiceStep === "listening" ? "Mendengarkan..." : "Suara Dicatat"}
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
                  className="w-full py-3.5 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Kirim ke Relawan RT</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              )}
              <button
                onClick={() => setIsRecording(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-2xl transition-all"
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
              <p className="text-emerald-700 text-xs font-bold mt-0.5">{selectedRelawan.peran} - Siaga Online</p>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black my-2">
                {selectedRelawan.jarak} dari rumah ({selectedRelawan.estimasi})
              </div>
              <p className="text-slate-400 text-xs">{selectedRelawan.lokasi}</p>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href={`tel:${selectedRelawan.telepon}`}
                className="w-full py-3.5 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Telepon Relawan Sekarang</span>
              </a>
              <button
                onClick={() => setSelectedRelawan(null)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-2xl transition-all"
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
