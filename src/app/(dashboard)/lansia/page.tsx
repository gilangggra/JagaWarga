"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Pill, 
  Heart, 
  Accessibility, 
  Plus, 
  Bell, 
  Paperclip, 
  Check, 
  CheckCircle2, 
  Clock, 
  Phone, 
  ArrowRight, 
  Volume2, 
  Mic, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  KeyRound, 
  Activity, 
  FileText, 
  MapPin, 
  Mail,
  Minus,
  Smile,
  AlertCircle,
  Stethoscope,
  Sparkles,
  Calendar as CalendarIcon,
  ShieldCheck,
  RotateCcw
} from "lucide-react";
import { speakIndonesian } from "@/lib/speak";

function triggerHaptic(duration = 40) {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(duration);
    } catch {}
  }
}

interface Relawan {
  id: string;
  nama: string;
  inisial: string;
  peran: string;
  jarak: string;
  telepon: string;
  avatarBg: string;
  isHotline?: boolean;
}

const RELAWAN_LIST: Relawan[] = [
  { id: "joko", nama: "Pak Joko", inisial: "JW", peran: "Ketua RT 04 (Hotline 24 Jam)", jarak: "100m", telepon: "08123456788", avatarBg: "bg-amber-600", isHotline: true },
  { id: "budi", nama: "Budi Santoso", inisial: "BS", peran: "Relawan Siaga RT 04", jarak: "50m", telepon: "08123456789", avatarBg: "bg-[#4FAAA8]", isHotline: false },
  { id: "ani", nama: "Bu Ani", inisial: "AN", peran: "Kader Posyandu Lansia", jarak: "120m", telepon: "08123456787", avatarBg: "bg-rose-500", isHotline: false },
];

export default function LansiaDashboardPage() {
  const router = useRouter();

  // Check-in state (FR-01)
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [checkinTime, setCheckinTime] = useState("08:00 WIB");
  const [checkinStatus, setCheckinStatus] = useState<"sehat" | "kurang_enak" | "butuh_bantuan">("sehat");
  const [showCheckinModal, setShowCheckinModal] = useState(false);

  // Voice note recording simulation (FR-04)
  const [isRecording, setIsRecording] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  // Active bookmark tab (Documents, Contacts, Address)
  const [activeBookmark, setActiveBookmark] = useState<"documents" | "contacts" | "address" | null>(null);

  // Selected contact for call modal
  const [selectedRelawan, setSelectedRelawan] = useState<Relawan | null>(null);

  // Reminder count stepper & interactive items
  const [reminderCount, setReminderCount] = useState(2);
  const [reminders, setReminders] = useState([
    { id: 1, text: "Minum Amlodipin 5mg", time: "Pagi • 07:00", done: true },
    { id: 2, text: "Kunjungan Bu Ani (Kader RT)", time: "Siang • 13:00 WIB", done: false },
    { id: 3, text: "Jalan Santai Pagi 15 Menit", time: "Besok • 06:30 WIB", done: false },
  ]);

  // Floating appointment status
  const [appointmentDone, setAppointmentDone] = useState(true);

  // Active date selection on calendar
  const [selectedDay, setSelectedDay] = useState(8);

  // TTS audio read summary
  const handleReadSummary = () => {
    triggerHaptic(50);
    speakIndonesian(
      "Halo Bapak Prabowo. Hari ini Selasa, 8 September 2026. Tanda vital Bapak stabil, tekanan darah normal 120 per 80, gula darah 95, denyut jantung 72. Jadwal kontrol Posyandu Melati pukul 11 lewat 30 telah tercatat. Obat pagi Amlodipin telah diminum."
    );
  };

  const handleSelectCheckinCondition = (condition: "sehat" | "kurang_enak" | "butuh_bantuan") => {
    triggerHaptic(50);
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} WIB`;
    setCheckinTime(timeStr);
    setCheckinStatus(condition);
    setIsCheckedIn(true);
    setShowCheckinModal(false);

    if (condition === "sehat") {
      speakIndonesian("Alhamdulillah Bapak sehat. Laporan telah dikirim ke Ibu Titiek dan pengurus RT.");
    } else if (condition === "kurang_enak") {
      speakIndonesian("Pesan tercatat Bapak kurang enak badan. Notifikasi telah diteruskan ke Bu Ani kader Posyandu untuk menengok.");
    } else {
      speakIndonesian("Pesan darurat diterima. Relawan dan keluarga segera dihubungi.");
    }
  };

  const handleStartVoice = () => {
    triggerHaptic(40);
    setShowVoiceModal(true);
    setIsRecording(true);
    setVoiceText("Mendengarkan suara Bapak...");
    speakIndonesian("Silakan sebutkan bantuan yang Bapak butuhkan.");
    setTimeout(() => {
      setVoiceText("Tolong tebuskan obat tensi Amlodipin 5mg di Apotek K-24...");
      setIsRecording(false);
    }, 2800);
  };

  const toggleReminder = (id: number) => {
    triggerHaptic(30);
    setReminders(prev => prev.map(r => r.id === id ? { ...r, done: !r.done } : r));
  };

  return (
    <div className="p-4 sm:p-5 lg:p-6 flex flex-col gap-5 lg:gap-6 w-full max-w-full">
      
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* 1. TOP HEADER - GREETING & VOICE ASSISTANT                   */}
      {/* ============================================================ */}
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Greeting with high-contrast, friendly typography */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Selamat Pagi, Bapak Prabowo!
          </h1>
          <button
            type="button"
            onClick={handleReadSummary}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#EBF5F5] hover:bg-[#D9EFEF] text-[#00624E] border border-teal-200/80 active:scale-95 transition-all cursor-pointer shadow-2xs group shrink-0"
            title="Dengarkan Suara Panduan (TTS)"
          >
            <Volume2 className="w-4 h-4 stroke-[2.5] text-[#4FAAA8] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold hidden sm:inline">Panduan Suara</span>
          </button>
        </div>

        {/* Right: Voice Assistant Mic Button (FR-04) */}
        <button
          type="button"
          onClick={handleStartVoice}
          id="btn-lansia-mic"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#4EA8A6] to-[#3B8F8D] hover:from-[#3B8F8D] hover:to-[#2F7775] active:scale-95 text-white shadow-md shadow-[#4FAAA8]/25 transition-all duration-300 cursor-pointer font-extrabold text-xs sm:text-sm shrink-0 group"
          title="Bicara untuk minta bantuan (Voice Note)"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Mic className="w-3.5 h-3.5 stroke-[2.5] animate-pulse text-white" />
          </div>
          <span>Bicara Bantuan</span>
        </button>

      </div>

      {/* ============================================================ */}
      {/* 2. MAIN TWO-COLUMN DASHBOARD GRID                             */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* ------------------------------------------------------------ */}
        {/* LEFT COLUMN (approx 8 of 12 cols): CARDS + CALENDAR          */}
        {/* ------------------------------------------------------------ */}
        <div className="xl:col-span-8 flex flex-col gap-6 relative">
          
          {/* ROW A: 2 HERO CARDS (Welcome back Teal & Latest results Blue) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* CARD 1: Welcome back... (Kabar Pagi Bapak Prabowo) */}
            <div className="bg-gradient-to-br from-[#4EA8A6] via-[#54B1AF] to-[#6BC5C3] rounded-[28px] p-6 sm:p-7 text-white relative overflow-hidden shadow-[0_16px_40px_rgba(82,177,175,0.25)] hover:shadow-[0_20px_50px_rgba(82,177,175,0.35)] transition-all duration-300 flex flex-col justify-between min-h-[230px] group">
              
              {/* Soft decorative ambient glow */}
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-white/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-teal-300/20 rounded-full blur-xl pointer-events-none" />

              <div className="relative z-10 space-y-1.5 max-w-[65%]">
                <div className="flex items-center gap-1.5 text-white/90 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Halo Warga RT 04</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight text-white">
                  Kabar Pagi Bapak
                </h2>
                <p className="text-xs sm:text-sm font-medium text-white/95 leading-relaxed pt-1">
                  Semoga Bapak sehat selalu. Ada yang bisa tetangga bantu hari ini?
                </p>
              </div>

              {/* Primary Action Button: Lapor Kabar Sehat (FR-01 Halo Warga) */}
              <div className="relative z-10 pt-4 flex items-center">
                <button
                  type="button"
                  id="btn-welcome-checkin"
                  onClick={() => {
                    triggerHaptic(40);
                    setShowCheckinModal(true);
                  }}
                  className="group/btn inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-white text-emerald-900 hover:bg-emerald-50 active:scale-95 transition-all duration-200 shadow-md font-black text-xs sm:text-sm cursor-pointer border border-white/80"
                  title="Klik untuk lapor atau perbarui kondisi kabar kesehatan hari ini"
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    checkinStatus === "sehat" ? "bg-emerald-500 animate-pulse" : checkinStatus === "kurang_enak" ? "bg-amber-500 animate-ping" : "bg-rose-500 animate-ping"
                  }`} />
                  <span>
                    {checkinStatus === "sehat"
                      ? `Lapor Sehat (${checkinTime})`
                      : checkinStatus === "kurang_enak"
                      ? `Kurang Enak (${checkinTime})`
                      : `Butuh Bantuan (${checkinTime})`}
                  </span>
                  <span className="text-[10.5px] font-bold text-emerald-700/80 bg-emerald-100/70 px-2 py-0.5 rounded-md group-hover/btn:bg-emerald-200/70 transition-colors">
                    Ubah
                  </span>
                </button>
              </div>

              {/* Friendly Senior Bapak Illustration with Smooth Floating Animation */}
              <div className="absolute bottom-0 right-2 sm:right-5 w-36 sm:w-40 h-44 pointer-events-none select-none flex items-end justify-center animate-float-gentle">
                
                {/* Yellow Warm Sun Backdrop */}
                <div className="absolute bottom-2 w-28 sm:w-32 h-28 sm:h-32 bg-[#FDBA74] rounded-full shadow-inner opacity-95" />

                {/* Soft Tropical Leaves Motif */}
                <div className="absolute -bottom-2 -right-2 w-10 h-16 bg-white/20 rounded-full rotate-45 blur-2xs" />
                <div className="absolute -bottom-2 left-0 w-8 h-12 bg-white/15 rounded-full -rotate-30 blur-2xs" />

                {/* High-Fidelity SVG Senior Bapak */}
                <svg viewBox="0 0 100 120" className="w-32 h-40 relative z-10 drop-shadow-lg">
                  {/* Torso / White coat with green accents */}
                  <path d="M22 80 Q22 54 50 54 Q78 54 78 80 L78 120 L22 120 Z" fill="#FFFFFF" />
                  <path d="M38 64 L50 82 L62 64 Z" fill="#FED7AA" />
                  <line x1="50" y1="82" x2="50" y2="120" stroke="#CBD5E1" strokeWidth="2.5" />
                  
                  {/* Tablet / Rekam Medis in hand */}
                  <rect x="42" y="75" width="24" height="20" rx="3.5" fill="#1E293B" />
                  <rect x="44" y="77" width="20" height="16" rx="2" fill="#94A3B8" />
                  <circle cx="54" cy="85" r="3" fill="#38BDF8" />

                  {/* Head */}
                  <circle cx="50" cy="38" r="16" fill="#FED7AA" />
                  
                  {/* Silver/Grey Hair for Senior Bapak */}
                  <path d="M32 38 C32 20 42 17 50 17 C60 17 68 20 68 38 C64 28 38 27 32 38 Z" fill="#64748B" />
                  <circle cx="67" cy="41" r="5" fill="#64748B" />
                  <circle cx="33" cy="41" r="5" fill="#64748B" />

                  {/* Glasses */}
                  <rect x="38" y="34" width="9" height="8" rx="2.5" fill="none" stroke="#1E293B" strokeWidth="1.8" />
                  <rect x="53" y="34" width="9" height="8" rx="2.5" fill="none" stroke="#1E293B" strokeWidth="1.8" />
                  <line x1="47" y1="38" x2="53" y2="38" stroke="#1E293B" strokeWidth="1.8" />
                  
                  {/* Eyes & Warm Smile */}
                  <circle cx="42.5" cy="38" r="1.2" fill="#0F172A" />
                  <circle cx="57.5" cy="38" r="1.2" fill="#0F172A" />
                  <path d="M46 46 Q50 51 54 46" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              </div>

            </div>

            {/* CARD 2: Latest results (Tanda Vital Terkini with Animated Progress) */}
            <div className="bg-gradient-to-br from-[#77A4FB] via-[#6395F8] to-[#4F86F7] rounded-[28px] p-6 sm:p-7 text-white relative overflow-hidden shadow-[0_16px_40px_rgba(97,147,247,0.25)] hover:shadow-[0_20px_50px_rgba(97,147,247,0.35)] transition-all duration-300 flex flex-col justify-between min-h-[230px]">
              
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white/90 text-xs font-bold uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Kondisi Fisik</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight text-white">
                  Tanda Vital Terkini
                </h2>
                <p className="text-xs sm:text-sm font-medium text-white/95">
                  Semua parameter stabil dalam batas normal!
                </p>
              </div>

              {/* Metric Progress Bars: Tensi, Gula Darah, Detak Jantung with Glowing Accents */}
              <div className="space-y-3.5 pt-4">
                
                {/* Metric 1: Tekanan Darah (Tensi) */}
                <div className="flex items-center justify-between gap-3 text-xs group/item">
                  <div className="flex items-center gap-2 min-w-[105px]">
                    <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    <span className="font-bold text-white/90">Tensi Darah</span>
                  </div>
                  <div className="flex-1 bg-white/20 rounded-full h-2 overflow-hidden shadow-inner">
                    <div className="bg-white h-full rounded-full w-[85%] animate-progress-fill" />
                  </div>
                  <div className="min-w-[75px] text-right flex items-center justify-end gap-1.5">
                    <span className="font-black text-white">120/80</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-white/20 rounded-md">Normal</span>
                  </div>
                </div>

                {/* Metric 2: Gula Darah Puasa */}
                <div className="flex items-center justify-between gap-3 text-xs group/item">
                  <div className="flex items-center gap-2 min-w-[105px]">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-200 shadow-[0_0_8px_rgba(165,243,252,0.8)]" />
                    <span className="font-bold text-white/90">Gula Darah</span>
                  </div>
                  <div className="flex-1 bg-white/20 rounded-full h-2 overflow-hidden shadow-inner">
                    <div className="bg-cyan-200 h-full rounded-full w-[65%] animate-progress-fill" />
                  </div>
                  <div className="min-w-[75px] text-right flex items-center justify-end gap-1.5">
                    <span className="font-black text-white">95 mg</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-cyan-300/30 text-cyan-100 rounded-md">Aman</span>
                  </div>
                </div>

                {/* Metric 3: Detak Jantung */}
                <div className="flex items-center justify-between gap-3 text-xs group/item">
                  <div className="flex items-center gap-2 min-w-[105px]">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(253,224,71,0.8)]" />
                    <span className="font-bold text-white/90">Detak Jantung</span>
                  </div>
                  <div className="flex-1 bg-white/20 rounded-full h-2 overflow-hidden shadow-inner">
                    <div className="bg-amber-300 h-full rounded-full w-[72%] animate-progress-fill" />
                  </div>
                  <div className="min-w-[75px] text-right flex items-center justify-end gap-1.5">
                    <span className="font-black text-white">72 bpm</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-amber-400/30 text-amber-100 rounded-md">Stabil</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* ROW B: 3 QUICK ACTION CARDS (Beli Obat, Teman Kontrol, Pinjam Alkes) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Action 1: Beli Obat Apotek */}
            <Link
              href="/lansia/bantuan?kategori=obat"
              id="card-action-diagnosis"
              className="bg-white rounded-[24px] p-4 sm:p-5 border border-[#E1EFF0] shadow-[0_6px_20px_rgba(79,170,168,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#E6F5F5] to-[#D4EFEF] text-[#3F9A98] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Pill className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-black text-sm text-slate-900 leading-tight group-hover:text-[#4FAAA8] transition-colors">
                    Beli Obat
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                    Apotek &amp; Resep
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-xl bg-[#E6F5F5] text-[#4FAAA8] flex items-center justify-center shrink-0 group-hover:bg-[#4FAAA8] group-hover:text-white transition-all duration-300 shadow-2xs">
                <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            {/* Action 2: Teman Kontrol Posyandu */}
            <Link
              href="/lansia/bantuan?kategori=cek_rumah"
              id="card-action-tests"
              className="bg-white rounded-[24px] p-4 sm:p-5 border border-[#E1EFF0] shadow-[0_6px_20px_rgba(79,170,168,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#EEF4FF] to-[#DBE8FF] text-[#558BF5] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                  <Stethoscope className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-black text-sm text-slate-900 leading-tight group-hover:text-[#558BF5] transition-colors">
                    Teman Kontrol
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                    Posyandu &amp; Dokter
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-xl bg-[#EEF4FF] text-[#6395F8] flex items-center justify-center shrink-0 group-hover:bg-[#6395F8] group-hover:text-white transition-all duration-300 shadow-2xs">
                <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            {/* Action 3: Pinjam Alkes RT */}
            <Link
              href="/lansia/alkes"
              id="card-action-drugs"
              className="bg-white rounded-[24px] p-4 sm:p-5 border border-[#E1EFF0] shadow-[0_6px_20px_rgba(79,170,168,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#FEF6E8] to-[#FDE8C7] text-[#E08A00] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Accessibility className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-black text-sm text-slate-900 leading-tight group-hover:text-[#F59E0B] transition-colors">
                    Pinjam Alkes
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                    Kas RT Bebas Biaya
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-xl bg-[#FEF6E8] text-[#F59E0B] flex items-center justify-center shrink-0 group-hover:bg-[#F59E0B] group-hover:text-white transition-all duration-300 shadow-2xs">
                <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

          </div>

          {/* ROW C: UNIFIED SPLIT-PANE CALENDAR & AGENDA CARD (NO OVERLAP) */}
          <div className="bg-white rounded-[28px] border border-[#E1EFF0] shadow-[0_8px_30px_rgba(79,170,168,0.05)] overflow-hidden">
            
            {/* Top Segmented Header: Integrated Tab Switcher */}
            <div className="px-5 sm:px-6 pt-5 pb-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-white via-white to-[#F8FCFC]">
              
              {/* Month Indicator */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E6F5F5] text-[#4FAAA8] flex items-center justify-center shadow-2xs">
                  <CalendarIcon className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900 tracking-tight leading-tight">
                    September 2026
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-400">
                    Jadwal Posyandu &amp; Kunjungan Kader
                  </p>
                </div>
              </div>

              {/* Integrated Drawer / Quick View Chips */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl">
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic(20);
                    setActiveBookmark(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeBookmark === null
                      ? "bg-white text-[#00624E] shadow-xs font-black ring-1 ring-slate-200/70"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Jadwal
                </button>

                <button
                  type="button"
                  id="btn-tab-documents"
                  onClick={() => {
                    triggerHaptic(30);
                    setActiveBookmark("documents");
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeBookmark === "documents"
                      ? "bg-white text-amber-800 shadow-xs font-black ring-1 ring-amber-300"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Catatan</span>
                </button>

                <button
                  type="button"
                  id="btn-tab-contacts"
                  onClick={() => {
                    triggerHaptic(30);
                    setActiveBookmark("contacts");
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeBookmark === "contacts"
                      ? "bg-white text-[#00624E] shadow-xs font-black ring-1 ring-emerald-300"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52B1AF]" />
                  <span>Kontak RT</span>
                </button>

                <button
                  type="button"
                  id="btn-tab-address"
                  onClick={() => {
                    triggerHaptic(30);
                    setActiveBookmark("address");
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeBookmark === "address"
                      ? "bg-white text-[#3A9694] shadow-xs font-black ring-1 ring-teal-300"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3A9694]" />
                  <span>Alamat &amp; PIN</span>
                </button>
              </div>

            </div>

            {/* Split Content: Calendar (Left) & Upcoming Appointment Detail (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
              
              {/* Left Column: Full Legible Calendar Grid */}
              <div className="lg:col-span-7 p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Pilih Hari:
                  </span>
                  <div className="flex items-center gap-1">
                    <button type="button" className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold text-slate-600 px-1">Bulan Ini</span>
                    <button type="button" className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Weekdays in Indonesian */}
                <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 mb-2.5">
                  <span>sen</span>
                  <span>sel</span>
                  <span>rab</span>
                  <span>kam</span>
                  <span>jum</span>
                  <span>sab</span>
                  <span>min</span>
                </div>

                {/* Dates Grid - 100% Legible with no overlap */}
                <div className="grid grid-cols-7 gap-y-2 text-center text-xs sm:text-sm font-semibold text-slate-700">
                  {/* Row 1 */}
                  <span className="text-slate-300 font-normal py-1.5">28</span>
                  <span className="text-slate-300 font-normal py-1.5">29</span>
                  <span className="text-slate-300 font-normal py-1.5">30</span>
                  <span className="text-slate-300 font-normal py-1.5">31</span>
                  <button type="button" onClick={() => setSelectedDay(1)} className={`rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 1 ? "bg-[#56B4B2] text-white font-black" : "font-bold hover:bg-slate-100 text-slate-900"}`}>1</button>
                  <span className="text-slate-400 font-medium py-1.5">2</span>
                  <span className="text-slate-400 font-medium py-1.5">3</span>

                  {/* Row 2 */}
                  <button type="button" onClick={() => setSelectedDay(4)} className={`rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 4 ? "bg-[#56B4B2] text-white font-black" : "font-bold hover:bg-slate-100"}`}>4</button>
                  <button type="button" onClick={() => setSelectedDay(5)} className={`rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 5 ? "bg-[#56B4B2] text-white font-black" : "font-bold hover:bg-slate-100"}`}>5</button>
                  <button type="button" onClick={() => setSelectedDay(6)} className={`rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 6 ? "bg-[#56B4B2] text-white font-black" : "font-bold hover:bg-slate-100"}`}>6</button>
                  <button type="button" onClick={() => setSelectedDay(7)} className={`relative inline-flex items-center justify-center rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 7 ? "bg-[#56B4B2] text-white font-black" : "font-black hover:bg-slate-100"}`}>
                    <span>7</span>
                    <span className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
                  </button>
                  <button type="button" onClick={() => setSelectedDay(8)} className={`relative inline-flex flex-col items-center justify-center rounded-xl py-1 gap-0.5 transition-colors cursor-pointer ${selectedDay === 8 ? "bg-[#56B4B2] text-white font-black" : "font-black text-slate-900 hover:bg-slate-100 ring-2 ring-[#56B4B2]/60 ring-inset"}`}>
                    <span>8</span>
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors ${selectedDay === 8 ? "bg-white/80" : "bg-[#4FAAA8]"}`} />
                  </button>
                  <span className="text-slate-400 font-medium py-1.5">9</span>
                  <span className="text-slate-400 font-medium py-1.5">10</span>

                  {/* Row 3 */}
                  <button type="button" onClick={() => setSelectedDay(11)} className={`rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 11 ? "bg-[#56B4B2] text-white font-black" : "font-bold hover:bg-slate-100"}`}>11</button>
                  <button type="button" onClick={() => setSelectedDay(12)} className={`rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 12 ? "bg-[#56B4B2] text-white font-black" : "font-bold hover:bg-slate-100"}`}>12</button>
                  <button type="button" onClick={() => setSelectedDay(13)} className={`rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 13 ? "bg-[#56B4B2] text-white font-black" : "font-bold hover:bg-slate-100"}`}>13</button>
                  <button type="button" onClick={() => setSelectedDay(14)} className={`rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 14 ? "bg-[#56B4B2] text-white font-black" : "font-bold hover:bg-slate-100"}`}>14</button>
                  <button type="button" onClick={() => setSelectedDay(15)} className={`rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 15 ? "bg-[#56B4B2] text-white font-black" : "font-bold hover:bg-slate-100"}`}>15</button>
                  <span className="text-slate-400 font-medium py-1.5">16</span>
                  <span className="text-slate-400 font-medium py-1.5">17</span>

                  {/* Row 4 */}
                  <button type="button" onClick={() => setSelectedDay(18)} className={`relative inline-flex items-center justify-center rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 18 ? "bg-[#56B4B2] text-white font-black" : "font-black hover:bg-slate-100"}`}>
                    <span>18</span>
                    <span className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full" />
                  </button>
                  <button type="button" onClick={() => setSelectedDay(19)} className={`rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 19 ? "bg-[#56B4B2] text-white font-black" : "font-bold hover:bg-slate-100"}`}>19</button>
                  <button type="button" onClick={() => setSelectedDay(20)} className={`rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 20 ? "bg-[#56B4B2] text-white font-black" : "font-bold hover:bg-slate-100"}`}>20</button>
                  <button type="button" onClick={() => setSelectedDay(21)} className={`rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 21 ? "bg-[#56B4B2] text-white font-black" : "font-bold hover:bg-slate-100"}`}>21</button>
                  <button type="button" onClick={() => setSelectedDay(22)} className={`rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 22 ? "bg-[#56B4B2] text-white font-black" : "font-bold hover:bg-slate-100"}`}>22</button>
                  <span className="text-slate-400 font-medium py-1.5">23</span>
                  <span className="text-slate-400 font-medium py-1.5">24</span>

                  {/* Row 5 */}
                  <button type="button" onClick={() => setSelectedDay(25)} className={`rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 25 ? "bg-[#56B4B2] text-white font-black" : "font-bold hover:bg-slate-100"}`}>25</button>
                  <button type="button" onClick={() => setSelectedDay(26)} className={`rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 26 ? "bg-[#56B4B2] text-white font-black" : "font-bold hover:bg-slate-100"}`}>26</button>
                  <button type="button" onClick={() => setSelectedDay(27)} className={`rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 27 ? "bg-[#56B4B2] text-white font-black" : "font-bold hover:bg-slate-100"}`}>27</button>
                  <button type="button" onClick={() => setSelectedDay(28)} className={`rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 28 ? "bg-[#56B4B2] text-white font-black" : "font-bold hover:bg-slate-100"}`}>28</button>
                  <button type="button" onClick={() => setSelectedDay(30)} className={`rounded-xl py-1.5 transition-colors cursor-pointer ${selectedDay === 30 ? "bg-[#56B4B2] text-white font-black" : "font-bold hover:bg-slate-100"}`}>30</button>
                  <span className="text-slate-300 font-normal py-1.5">1</span>
                  <span className="text-slate-300 font-normal py-1.5">2</span>
                </div>
              </div>

              {/* Right Column: Upcoming Agenda & Appointment Card */}
              <div className="lg:col-span-5 p-5 sm:p-6 bg-[#F8FCFC] flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-extrabold text-[#4FAAA8] uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Agenda Terdekat</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Terjadwal
                    </span>
                  </div>

                  {/* Clean Appointment Card */}
                  <div className="bg-white rounded-2xl p-4 border border-[#E1EFF0] shadow-xs space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-black text-sm text-slate-900 leading-tight">
                          Jadwal Kontrol
                        </h4>
                        <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                          Posyandu Lansia Melati
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shadow-xs shrink-0">
                        <Bell className="w-4 h-4 fill-white" />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-extrabold text-slate-800">Bidan Bu Ani</p>
                        <p className="text-[11px] font-semibold text-slate-400">11:30 - 12:00 WIB</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          triggerHaptic(30);
                          setAppointmentDone(!appointmentDone);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer active:scale-95 ${
                          appointmentDone
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                        }`}
                        title={appointmentDone ? "Status: Sudah Hadir (Klik untuk ubah)" : "Status: Belum Hadir (Klik untuk tandai hadir)"}
                      >
                        {appointmentDone ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Sudah Hadir</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            <span>Tandai Hadir</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Friendly Context Note */}
                <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 text-[11px] text-teal-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#4FAAA8] shrink-0" />
                  <span>Kader RT siap mendampingi Bapak selama posyandu berlangsung.</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ------------------------------------------------------------ */}
        {/* RIGHT COLUMN (approx 4 of 12 cols): PROFILE & REMINDERS     */}
        {/* ------------------------------------------------------------ */}
        <div className="xl:col-span-4 flex flex-col gap-5">
          
          {/* PROFILE CARD - Bapak Prabowo */}
          <div className="bg-white rounded-[26px] p-5 sm:p-6 border border-[#E1EFF0] shadow-[0_8px_25px_rgba(79,170,168,0.04)] hover:shadow-md transition-all duration-300 flex flex-col items-center text-center">
            
            {/* Friendly Avatar Bapak Prabowo with Online Ring */}
            <div className="relative mb-3 group/avatar">
              <div className="w-18 h-18 rounded-full bg-[#EBF5F5] border-2 border-white shadow-md overflow-hidden flex items-center justify-center group-hover/avatar:scale-105 transition-transform duration-300">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="48" fill="#FED7AA" />
                  <path d="M20 95 C20 75 32 68 50 68 C68 68 80 75 80 95 Z" fill="#00624E" />
                  <path d="M30 38 C30 20 40 18 50 18 C60 18 70 20 70 38 C68 28 55 24 50 24 C42 24 32 28 30 38 Z" fill="#64748B" />
                  <circle cx="28" cy="45" r="4" fill="#FDBA74" />
                  <circle cx="72" cy="45" r="4" fill="#FDBA74" />
                  <circle cx="42" cy="45" r="2.5" fill="#0F172A" />
                  <circle cx="58" cy="45" r="2.5" fill="#0F172A" />
                  <path d="M45 54 Q50 58 55 54" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <span className="absolute bottom-0 right-0 w-4.5 h-4.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
            </div>

            {/* Name & Subtitle */}
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              Bapak Prabowo (71 th)
            </h3>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">
              Terhubung: Ibu Titiek (Anak) • RT 04
            </p>

            {/* 4 Physical Vitals Badges in 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2 w-full mt-4 pt-4 border-t border-slate-100 text-center">
              <div className="bg-slate-50/80 p-2 rounded-xl">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Gol. Darah</span>
                <span className="text-sm font-black text-slate-800 mt-0.5 block">O+</span>
              </div>
              <div className="bg-slate-50/80 p-2 rounded-xl">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Tinggi</span>
                <span className="text-sm font-black text-slate-800 mt-0.5 block">168 cm</span>
              </div>
              <div className="bg-slate-50/80 p-2 rounded-xl">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Berat</span>
                <span className="text-sm font-black text-slate-800 mt-0.5 block">65 kg</span>
              </div>
              {/* BMI derived from 65 / (1.68^2) ≈ 23.0 — Normal */}
              <div className="bg-emerald-50/80 p-2 rounded-xl border border-emerald-100">
                <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider block">BMI</span>
                <span className="text-sm font-black text-emerald-700 mt-0.5 block">23.0</span>
                <span className="text-[9px] font-bold text-emerald-500 block leading-none">Normal</span>
              </div>
            </div>

          </div>

          {/* RECENT RESULTS CARD - Catatan Pemeriksaan Terkini */}
          <div className="bg-white rounded-[24px] p-4.5 sm:p-5 border border-[#E1EFF0] shadow-[0_6px_20px_rgba(79,170,168,0.03)] hover:shadow-md transition-all duration-300 space-y-2 group">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-bold text-[11px] text-[#4FAAA8]">17/08/2026 • Posyandu Melati</span>
              <Paperclip className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
            </div>

            <h4 className="font-extrabold text-sm text-slate-900">
              Catatan Bidan Bu Ani
            </h4>

            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Tekanan darah stabil 120/80 mmHg, denyut nadi 72 bpm. Terus konsumsi Amlodipin 5mg teratur setelah sarapan dan lakukan peregangan ringan setiap pagi.
            </p>
          </div>

          {/* REMINDERS CARD - Interactive Checkable Reminders */}
          <div className="bg-white rounded-[24px] p-4.5 sm:p-5 border border-[#E1EFF0] shadow-[0_6px_20px_rgba(79,170,168,0.03)] hover:shadow-md transition-all duration-300 space-y-3.5">
            
            {/* Header with Bell Icon */}
            <div className="flex items-center justify-between">
              <h4 className="font-black text-sm text-slate-900">
                Pengingat Rutin
              </h4>
              <Bell className="w-4 h-4 text-slate-400" />
            </div>

            {/* Medication Adherence Streak */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
              <span className="text-base leading-none">🔥</span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-black text-emerald-800 leading-tight">7 Hari Berturut-turut Patuh</p>
                <p className="text-[10px] font-medium text-emerald-600">Minum Amlodipin 5mg tepat waktu</p>
              </div>
              <span className="shrink-0 text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Streak</span>
            </div>

            {/* List of Interactive Reminder Items */}
            <div className="space-y-2">
              {reminders.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleReminder(item.id)}
                  className={`flex items-start gap-3 p-2.5 rounded-xl transition-all cursor-pointer ${
                    item.done ? "bg-[#E6F5F5]/60 border border-teal-100" : "hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    item.done ? "bg-[#4FAAA8] text-white" : "bg-slate-100 text-slate-400"
                  }`}>
                    {item.done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Clock className="w-3.5 h-3.5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-bold leading-tight truncate ${
                      item.done ? "line-through text-slate-400" : "text-slate-800"
                    }`}>
                      {item.text}
                    </p>
                    <p className="text-[10.5px] text-slate-400 mt-0.5 truncate">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stepper Controller with Helpful Label */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400">
                {reminderCount} Pengingat Aktif
              </span>
              <div className="inline-flex items-center gap-1 bg-[#F0F8F8] border border-teal-200/80 p-1 rounded-xl shadow-2xs">
                <button
                  type="button"
                  aria-label="Kurangi jumlah pengingat"
                  onClick={() => {
                    triggerHaptic(20);
                    if (reminderCount > 1) setReminderCount(reminderCount - 1);
                  }}
                  className="w-7 h-7 rounded-lg bg-white hover:bg-teal-50 text-teal-800 active:scale-90 flex items-center justify-center transition-all cursor-pointer shadow-xs border border-teal-100 disabled:opacity-40"
                  disabled={reminderCount <= 1}
                >
                  <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
                <span className="text-xs font-black min-w-[20px] text-center text-teal-900">{reminderCount}</span>
                <button
                  type="button"
                  aria-label="Tambah jumlah pengingat"
                  onClick={() => {
                    triggerHaptic(20);
                    setReminderCount(reminderCount + 1);
                  }}
                  className="w-7 h-7 rounded-lg bg-white hover:bg-teal-50 text-teal-800 active:scale-90 flex items-center justify-center transition-all cursor-pointer shadow-xs border border-teal-100"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>

          </div>

          {/* TWO-WAY HANDOVER VERIFICATION PIN (FR-07) - 4 SEPARATE BOXES */}
          <div className="bg-white rounded-[24px] p-4.5 border border-amber-200/90 bg-gradient-to-br from-amber-50/50 to-white shadow-xs space-y-2.5 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                <span>PIN Serah Terima Bantuan</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">FR-07</span>
            </div>
            
            <p className="text-[11px] text-slate-500 font-medium text-center">
              Sebutkan 4-Digit ini saat relawan tiba di rumah:
            </p>

            {/* 4 Separate Clean Monospaced Boxes */}
            <div className="grid grid-cols-4 gap-2 max-w-[220px] mx-auto pt-0.5">
              {["8", "2", "4", "1"].map((digit, idx) => (
                <div
                  key={idx}
                  className="h-11 rounded-xl bg-white border-2 border-amber-300/80 shadow-xs flex items-center justify-center text-xl font-mono font-black text-amber-900"
                >
                  {digit}
                </div>
              ))}
            </div>
          </div>

          {/* EMERGENCY ALARM SOS TRIGGER (FR-02) */}
          <Link
            href="/lansia/darurat"
            id="btn-lansia-emergency-sos"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 active:scale-95 text-white font-black text-xs sm:text-sm shadow-md shadow-rose-500/25 flex items-center justify-center gap-2 transition-all duration-300 group cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 animate-pulse group-hover:rotate-12 transition-transform" />
            <span>ALARM DARURAT SOS RT 04</span>
          </Link>

        </div>

      </div>

      {/* ============================================================ */}
      {/* 3. MODAL CHECK-IN MANDIRI HALO WARGA (FR-01)                 */}
      {/* ============================================================ */}
      {showCheckinModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowCheckinModal(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#E6F5F5] text-[#4FAAA8] flex items-center justify-center shadow-xs">
              <Smile className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#4FAAA8]">
                Halo Warga RT 04 (FR-01)
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">
                Bagaimana Kondisi Bapak Hari Ini?
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Laporan ini akan langsung tersambung ke Ibu Titiek dan Pengurus RT.
              </p>
            </div>

            <div className="space-y-2.5 pt-2 text-left">
              <button
                type="button"
                onClick={() => handleSelectCheckinCondition("sehat")}
                className={`w-full p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  checkinStatus === "sehat"
                    ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
                    : "bg-slate-50 hover:bg-emerald-50/50 border-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Smile className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-black text-xs sm:text-sm text-slate-900">Saya Sehat &amp; Bugar</p>
                    <p className="text-[11px] text-slate-500 font-medium">Laporan normal diteruskan ke RT</p>
                  </div>
                </div>
                {checkinStatus === "sehat" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full border-2 border-slate-300 group-hover:border-emerald-400 shrink-0" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleSelectCheckinCondition("kurang_enak")}
                className={`w-full p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  checkinStatus === "kurang_enak"
                    ? "bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 shadow-xs"
                    : "bg-slate-50 hover:bg-amber-50/50 border-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-black text-xs sm:text-sm text-slate-900">Kurang Enak Badan</p>
                    <p className="text-[11px] text-slate-500 font-medium">Minta kader posyandu menengok</p>
                  </div>
                </div>
                {checkinStatus === "kurang_enak" ? (
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full border-2 border-slate-300 group-hover:border-amber-400 shrink-0" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleSelectCheckinCondition("butuh_bantuan")}
                className={`w-full p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  checkinStatus === "butuh_bantuan"
                    ? "bg-rose-50 border-rose-500 ring-2 ring-rose-500/20 shadow-xs"
                    : "bg-slate-50 hover:bg-rose-50/50 border-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-black text-xs sm:text-sm text-slate-900">Butuh Bantuan Hari Ini</p>
                    <p className="text-[11px] text-slate-500 font-medium">Sinyal siaga ke relawan tetangga</p>
                  </div>
                </div>
                {checkinStatus === "butuh_bantuan" ? (
                  <CheckCircle2 className="w-5 h-5 text-rose-600 shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full border-2 border-slate-300 group-hover:border-rose-400 shrink-0" />
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowCheckinModal(false)}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-all cursor-pointer active:scale-95"
            >
              Tutup / Batal
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. INTERACTIVE SLIDE-IN DRAWER FOR BOOKMARK TABS              */}
      {/* ============================================================ */}
      {activeBookmark && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="absolute inset-0" 
            onClick={() => setActiveBookmark(null)} 
          />
          <div className="relative bg-white rounded-[32px] w-full max-w-md p-6 shadow-2xl border border-[#DFECEE] z-10 space-y-4 animate-in slide-in-from-right duration-200">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-xs ${
                  activeBookmark === "documents" ? "bg-[#F59E0B]" : activeBookmark === "contacts" ? "bg-[#52B1AF]" : "bg-[#3A9694]"
                }`}>
                  {activeBookmark === "documents" ? "DOC" : activeBookmark === "contacts" ? "CON" : "ADR"}
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900 capitalize">
                    {activeBookmark === "documents" ? "Catatan Medis & Posyandu" : activeBookmark === "contacts" ? "Kontak Relawan & RT 04" : "Alamat & PIN Verifikasi"}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">Informasi Penting Lansia</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveBookmark(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Content according to tab */}
            {activeBookmark === "documents" && (
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                  <p className="font-extrabold text-amber-900">Resep Rutin: Amlodipin 5mg</p>
                  <p className="text-amber-800 font-medium">1x sehari sesudah sarapan pagi untuk menjaga tekanan darah stabil.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="font-extrabold text-slate-800">Catatan Posyandu Melati (Bidan Bu Ani)</p>
                  <p className="text-slate-600 font-medium">&quot;Kondisi umum sangat baik, gula darah puasa 95 mg/dL aman. Jadwal kontrol berikutnya akhir bulan.&quot;</p>
                </div>
              </div>
            )}

            {activeBookmark === "contacts" && (
              <div className="space-y-2.5">
                {RELAWAN_LIST.map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${r.avatarBg} text-white flex items-center justify-center font-bold text-xs`}>
                        {r.inisial}
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900">{r.nama}</p>
                        <p className="text-[11px] text-slate-500 font-medium">{r.peran}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRelawan(r);
                        setActiveBookmark(null);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-[#00624E] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#004D3D] active:scale-95 transition-all cursor-pointer shadow-2xs shrink-0"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Hubungi</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeBookmark === "address" && (
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-extrabold text-teal-900">
                    <MapPin className="w-4 h-4 text-[#4FAAA8]" />
                    <span>Alamat Rumah Terdaftar:</span>
                  </div>
                  <p className="text-teal-800 font-medium leading-relaxed pl-5">
                    Jl. Melati Blok C4 No. 12, RT 04 / RW 02, Sukamaju, Sleman, D.I. Yogyakarta.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="font-extrabold text-slate-800">PIN Keamanan Verifikasi:</p>
                  <p className="text-xl font-mono font-black text-[#4FAAA8]">8 2 4 1</p>
                  <p className="text-slate-500 text-[11px]">Gunakan untuk memastikan relawan yang datang adalah tetangga sah.</p>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setActiveBookmark(null)}
              className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Tutup
            </button>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. MODAL TELEPON RELAWAN                                      */}
      {/* ============================================================ */}
      {selectedRelawan && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setSelectedRelawan(null)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 space-y-4 animate-in zoom-in-95 duration-200">
            <div className={`w-14 h-14 mx-auto rounded-2xl ${selectedRelawan.avatarBg} text-white flex items-center justify-center font-black text-lg shadow-sm`}>
              {selectedRelawan.inisial}
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">{selectedRelawan.nama}</h3>
              <p className="text-[#4FAAA8] text-xs font-bold mt-0.5">{selectedRelawan.peran}</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Jarak ~{selectedRelawan.jarak} dari rumah Bapak</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="text-slate-400 font-medium">Nomor Telepon / WhatsApp:</span>
              <p className="font-mono font-black text-base text-slate-800 mt-0.5">{selectedRelawan.telepon}</p>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={`tel:${selectedRelawan.telepon}`}
                onClick={() => triggerHaptic(50)}
                className="w-full py-3.5 bg-[#00624E] hover:bg-[#004D3D] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Panggil Sekarang</span>
              </a>
              <button
                type="button"
                onClick={() => setSelectedRelawan(null)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-all cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 6. MODAL VOICE NOTE ASSISTANT (FR-04)                         */}
      {/* ============================================================ */}
      {showVoiceModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowVoiceModal(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#E6F5F5] text-[#4FAAA8] flex items-center justify-center shadow-sm relative">
              <Mic className="w-8 h-8 animate-bounce" />
              {isRecording && (
                <span className="absolute inset-0 rounded-full border-2 border-[#4FAAA8] animate-ping" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                {isRecording ? "Mendengarkan Suara..." : "Permintaan Diterima"}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Bicara santai, sistem kami akan meneruskan pesan Bapak ke relawan terdekat.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700 leading-relaxed italic min-h-[60px] flex items-center justify-center">
              &quot;{voiceText}&quot;
            </div>

            <div className="space-y-2 pt-2">
              {!isRecording ? (
                <Link
                  href="/lansia/bantuan?kategori=obat"
                  onClick={() => setShowVoiceModal(false)}
                  className="w-full py-3.5 bg-[#00624E] hover:bg-[#004D3D] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Kirim ke Relawan RT</span>
                </Link>
              ) : null}
              <button
                type="button"
                onClick={() => setShowVoiceModal(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-all cursor-pointer"
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
