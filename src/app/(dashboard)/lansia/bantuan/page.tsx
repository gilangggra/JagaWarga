"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import QRCode from "qrcode";
import { 
  Pill, 
  ShoppingCart, 
  Heart, 
  Accessibility, 
  Mic, 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  Check, 
  Send,
  Zap,
  Sparkles,
  MapPin,
  Clock,
  Radio,
  FileText,
  RotateCcw,
  BadgeCheck,
  ShieldCheck,
  Play,
  Square,
  X,
  Phone,
  CheckCircle2,
  Stethoscope,
  Car,
  Package,
  Receipt,
  ExternalLink,
  PlusCircle,
  AlertCircle
} from "lucide-react";

import { speakIndonesian } from "@/lib/speak";

function triggerHaptic(duration = 40) {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(duration);
    } catch {}
  }
}

interface BantuanOption {
  id: string;
  label: string;
  desc: string;
  kategori: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  iconGradient: string;
  iconColor: string;
  speakText: string;
  biaya: string;
  icon: React.ReactNode;
  tags: string[];
}

const BANTUAN_LIST: BantuanOption[] = [
  {
    id: "obat_rutin",
    label: "Beli Obat",
    desc: "Apotek K-24 & Tebus Resep",
    kategori: "obat",
    badge: "Prioritas",
    badgeBg: "bg-rose-50 border-rose-200/80",
    badgeText: "text-rose-700",
    iconGradient: "from-[#FFE4E6] to-[#FECDD3]",
    iconColor: "text-rose-600",
    speakText: "Memilih Beli Obat di Apotek atau tebus resep dokter.",
    biaya: "Sesuai Struk Apotek Resmi",
    icon: <Pill className="w-6 h-6 stroke-[2.2]" />,
    tags: [
      "Amlodipine 5mg (Tensi)",
      "Resep di meja ruang tamu",
      "Paracetamol 500mg strip",
      "Vitamin B Kompleks",
    ],
  },
  {
    id: "makanan",
    label: "Beli Sayur",
    desc: "Warung RT & Bahan Dapur",
    kategori: "belanja",
    badge: "Harian",
    badgeBg: "bg-amber-50 border-amber-200/80",
    badgeText: "text-amber-800",
    iconGradient: "from-[#FEF3C7] to-[#FDE68A]",
    iconColor: "text-amber-600",
    speakText: "Memilih Beli Sayur dan bahan makanan di Warung RT.",
    biaya: "Sesuai Nota Warung Bu RT",
    icon: <ShoppingCart className="w-6 h-6 stroke-[2.2]" />,
    tags: [
      "Sayur bayam & wortel",
      "Tahu 5 & tempe 1 papan",
      "Beras 5kg warung Bu RT",
      "Telur ayam 1/2 kg",
    ],
  },
  {
    id: "pendampingan",
    label: "Teman Kontrol",
    desc: "Posyandu & Dokter Puskesmas",
    kategori: "cek_rumah",
    badge: "Pendampingan",
    badgeBg: "bg-blue-50 border-blue-200/80",
    badgeText: "text-blue-700",
    iconGradient: "from-[#EEF4FF] to-[#DBE8FF]",
    iconColor: "text-[#558BF5]",
    speakText: "Memilih Teman Jalan untuk kontrol posyandu atau periksa dokter.",
    biaya: "Gratis Relawan RT 04",
    icon: <Stethoscope className="w-6 h-6 stroke-[2.2]" />,
    tags: [
      "Temani ke Posyandu sore",
      "Bantu cek tensi di rumah",
      "Antar kontrol Puskesmas",
      "Teman jalan santai pagi",
    ],
  },
  {
    id: "antar_jemput",
    label: "Pinjam Alkes",
    desc: "Kursi Roda & Oksigen RT",
    kategori: "lainnya",
    badge: "Fasilitas RT",
    badgeBg: "bg-teal-50 border-teal-200/80",
    badgeText: "text-[#246A68]",
    iconGradient: "from-[#E6F5F5] to-[#D4EFEF]",
    iconColor: "text-[#3F9A98]",
    speakText: "Memilih Pinjam Alat Kesehatan seperti kursi roda atau tabung oksigen kas RT.",
    biaya: "Gratis Fasilitas Kas RT",
    icon: <Accessibility className="w-6 h-6 stroke-[2.2]" />,
    tags: [
      "Kursi roda lipat kas RT",
      "Tabung oksigen cadangan",
      "Tongkat jalan kaki empat",
      "Tensimeter digital kas RT",
    ],
  },
];

const RELAWAN_LIST = [
  { 
    id: "budi",
    inisial: "BS", 
    nama: "Budi Santoso", 
    peran: "Relawan Siaga RT 04", 
    jarak: "50m", 
    estimasi: "< 1 mnt", 
    avatarBg: "bg-[#4EA8A6]", 
    kendaraan: "Jalan Kaki"
  },
  { 
    id: "joko",
    inisial: "JW", 
    nama: "Pak Joko", 
    peran: "Ketua RT 04", 
    jarak: "100m", 
    estimasi: "~2 mnt", 
    avatarBg: "bg-amber-600", 
    kendaraan: "Motor"
  },
  { 
    id: "ani",
    inisial: "AN", 
    nama: "Bu Ani", 
    peran: "Kader Posyandu Lansia", 
    jarak: "120m", 
    estimasi: "~3 mnt", 
    avatarBg: "bg-rose-500", 
    kendaraan: "Siaga RT"
  },
];

const VOICE_SAMPLE_TEXTS: Record<string, string> = {
  obat_rutin: "Tolong belikan obat darah tinggi (Amlodipine 5mg) di apotek depan, resep ada di meja ruang tamu.",
  makanan: "Tolong belikan sayur bayam 2 ikat, tahu 5 biji, dan tempe di warung Bu RT.",
  pendampingan: "Saya perlu ditemani ke Posyandu RT 04 sore nanti pukul empat untuk cek tensi rutin.",
  antar_jemput: "Bisa tolong pinjamkan kursi roda lipat dari pos RT untuk dipakai kontrol ke dokter besok?",
};

function BantuanContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const kategoriParam = searchParams.get("kategori");
  const tabParam = searchParams.get("tab");

  // Stepped Lifecycle Wizard State (Opsi 4)
  // Step 1: Pesan Bantuan (Pilih obat/sayur, suara, catatan)
  // Step 2: Pengantaran Relawan (Lacak posisi Pak Teddy OTW, estimasi waktu, telepon)
  // Step 3: Serah Terima & PIN (Kode PIN 8241, Scan QR, Verifikasi selesai)
  const initialStep: 1 | 2 | 3 = tabParam === "minta" || kategoriParam ? 1 : 2;
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(initialStep);
  const activeTab: "minta" | "lacak" = currentStep === 1 ? "minta" : "lacak";

  // Form State (Tab Minta Bantuan)
  const [selected, setSelected] = useState<string>(
    BANTUAN_LIST.find((b) => b.kategori === kategoriParam)?.id ?? BANTUAN_LIST[0].id
  );
  const [catatan, setCatatan] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [voiceStep, setVoiceStep] = useState<"idle" | "listening" | "transcribed">("idle");
  const [voiceText, setVoiceText] = useState("");
  const [hasVoiceAttached, setHasVoiceAttached] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(30);
  const [showToast, setShowToast] = useState(false);

  // Tracking State (Tab Lacak & Serah Terima)
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [bantuanSelesai, setBantuanSelesai] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const selectedItem = BANTUAN_LIST.find((b) => b.id === selected) ?? BANTUAN_LIST[0];

  // Generate real scannable QR code
  useEffect(() => {
    const qrContent = 
`TILIKAMAN — VERIFIKASI SERAH TERIMA
PIN VALIDASI: 8241
ID Bantuan: #B-0824
Penerima: Bpk. Prabowo Subianto (RT 04 Sukamaju)
Relawan Pengantar: Pak Teddy (Blok C4 No. 12)
Obat: 1 Strip Amlodipin 5mg (Apotek K-24 Gejayan)
Status: LUNAS & RESMI TERVERIFIKASI`;

    QRCode.toDataURL(qrContent, {
      width: 420,
      margin: 2,
      errorCorrectionLevel: "H",
      color: {
        dark: "#0F172A",
        light: "#FFFFFF",
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("Gagal generate QR Code:", err));
  }, []);

  // Voice recording simulation
  useEffect(() => {
    if (!isRecording) {
      setRecordSeconds(30);
      return;
    }
    setVoiceStep("listening");
    setVoiceText("");
    setRecordSeconds(30);

    const interval = setInterval(() => {
      setRecordSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setVoiceStep("transcribed");
          setVoiceText(VOICE_SAMPLE_TEXTS[selected] ?? "Tolong bantu kebutuhan saya, terima kasih relawan RT.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const t = setTimeout(() => {
      setVoiceStep("transcribed");
      setVoiceText(VOICE_SAMPLE_TEXTS[selected] ?? "Tolong bantu kebutuhan saya, terima kasih relawan RT.");
    }, 3200);

    return () => {
      clearTimeout(t);
      clearInterval(interval);
    };
  }, [isRecording, selected]);

  const handleReadPanduan = () => {
    triggerHaptic(40);
    if (currentStep === 1) {
      speakIndonesian(
        "Langkah Satu dari Tiga: Pesan Bantuan Warga. Silakan pilih kebutuhan seperti Beli Obat, Beli Sayur, Teman Kontrol, atau Pinjam Alat Kesehatan. Bapak juga bisa merekam pesan suara."
      );
    } else if (currentStep === 2) {
      speakIndonesian(
        "Langkah Dua dari Tiga: Pengantaran Relawan. Pak Teddy sedang dalam perjalanan menuju rumah Bapak dengan estimasi waktu enam menit. Obat telah ditebus di Apotek K-24."
      );
    } else {
      speakIndonesian(
        "Langkah Tiga dari Tiga: Serah Terima dan PIN. Mohon sebutkan kode PIN 8 2 4 1 atau tunjukkan kode QR saat Pak Teddy tiba di depan pintu rumah."
      );
    }
  };

  const handleSelectBantuan = (item: BantuanOption) => {
    triggerHaptic(35);
    setSelected(item.id);
    speakIndonesian(item.speakText);
  };

  const handleAppendTag = (tag: string) => {
    triggerHaptic(25);
    setCatatan((prev) => {
      if (!prev.trim()) return tag;
      if (prev.includes(tag)) return prev;
      return `${prev.trim()}, ${tag}`;
    });
  };

  const handlePlayVoicePreview = () => {
    triggerHaptic(30);
    setIsPlayingAudio(true);
    speakIndonesian(voiceText || VOICE_SAMPLE_TEXTS[selected]);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 3500);
  };

  const handleKirim = () => {
    if (!selected) return;
    triggerHaptic(50);
    setIsSubmitting(true);
    speakIndonesian(`Permintaan ${selectedItem.label} berhasil dikirim ke relawan siaga RT 04. Melanjutkan ke Langkah Dua pengantaran.`);
    
    // Smoothly transition to Step 2 with notification
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(2);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }, 800);
  };

  const handleConfirmVoice = () => {
    triggerHaptic(40);
    setHasVoiceAttached(true);
    if (!catatan.trim()) {
      setCatatan(voiceText);
    }
    setIsRecording(false);
  };

  const handleSendVoiceDirect = () => {
    triggerHaptic(50);
    setIsRecording(false);
    setIsSubmitting(true);
    speakIndonesian(`Permintaan suara ${selectedItem.label} berhasil dikirim ke relawan terdekat. Melanjutkan ke Langkah Dua pengantaran.`);
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(2);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }, 800);
  };

  return (
    <div className="p-4 sm:p-5 lg:p-6 flex flex-col gap-5 lg:gap-6 w-full max-w-full font-sans">

      {/* ============================================================ */}
      {/* 1. TOP HEADER & AUDIO GUIDE                                  */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left: Back Arrow + Page Heading */}
        <div className="flex items-center gap-3">
          <Link
            href="/lansia"
            id="btn-back-bantuan"
            onClick={() => triggerHaptic(30)}
            className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white hover:bg-[#EBF5F5] text-slate-700 hover:text-[#3B8F8D] border border-[#E1EFF0] shadow-2xs transition-all active:scale-95 group shrink-0"
            title="Kembali ke Beranda"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-[#3B8F8D] group-hover:-translate-x-0.5 transition-transform" />
          </Link>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {currentStep === 1 && "1. Pesan Bantuan Warga"}
              {currentStep === 2 && "2. Lacak Pengantaran Relawan"}
              {currentStep === 3 && "3. Serah Terima & Kode PIN"}
            </h1>
          </div>
        </div>

        {/* Right: Audio Guide Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            id="btn-bantuan-voice"
            onClick={handleReadPanduan}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#EBF5F5] hover:bg-[#D9EFEF] text-[#00624E] border border-teal-200/80 active:scale-95 transition-all cursor-pointer shadow-2xs group shrink-0"
            title="Dengarkan Suara Panduan (TTS)"
          >
            <Volume2 className="w-4 h-4 stroke-[2.5] text-[#4FAAA8] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold hidden sm:inline">Panduan Suara</span>
          </button>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 2. STEPPED LIFECYCLE WIZARD PROGRESS TRACKER (OPSI 4)        */}
      {/* ============================================================ */}
      <div className="w-full bg-white rounded-[28px] p-4 sm:p-5 border border-[#DFECEE] shadow-[0_6px_25px_rgba(79,170,168,0.05)] relative overflow-hidden space-y-3.5">
        
        {/* Top Header of Stepper */}
        <div className="flex items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4EA8A6] animate-pulse" />
            <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
              Alur Tahapan Bantuan (Langkah {currentStep} dari 3)
            </span>
            <span className="text-[11px] font-extrabold text-[#2C8583] bg-[#E8F6F6] px-2.5 py-0.5 rounded-full border border-teal-200/60 hidden sm:inline-flex">
              {currentStep === 1 && "Formulir Permintaan Bantuan"}
              {currentStep === 2 && "Relawan OTW Menuju Rumah"}
              {currentStep === 3 && "Serah Terima & Validasi PIN 8241"}
            </span>
          </div>

          <span className="text-[11px] font-bold text-slate-400 hidden lg:inline">
            Ketuk langkah untuk berpindah layar
          </span>
        </div>

        {/* 3 Step Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* STEP 1: Pesan Bantuan */}
          <button
            type="button"
            id="step-btn-1"
            onClick={() => {
              triggerHaptic(30);
              setCurrentStep(1);
              if (typeof window !== "undefined") {
                window.history.replaceState(null, "", "/lansia/bantuan?step=1");
              }
              speakIndonesian("Membuka Langkah 1: Formulir Pesan Bantuan.");
            }}
            className={`flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer group relative overflow-hidden ${
              currentStep === 1
                ? "bg-gradient-to-br from-[#EBF5F5] to-white border-[#4EA8A6] ring-3 ring-[#4EA8A6]/20 shadow-[0_6px_20px_rgba(78,168,166,0.15)] -translate-y-0.5"
                : currentStep > 1
                ? "bg-[#F8FCFC] border-emerald-200 text-slate-700 hover:bg-emerald-50/50 hover:border-emerald-300"
                : "bg-slate-50 border-slate-200/80 text-slate-400 hover:bg-slate-100"
            }`}
          >
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 transition-all ${
              currentStep === 1
                ? "bg-gradient-to-br from-[#4EA8A6] to-[#3B8F8D] text-white shadow-md shadow-[#4EA8A6]/30 scale-105"
                : currentStep > 1
                ? "bg-emerald-500 text-white shadow-xs"
                : "bg-slate-200 text-slate-500"
            }`}>
              {currentStep > 1 ? <Check className="w-5 h-5 stroke-[3]" /> : "1"}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs sm:text-sm font-black text-slate-900 truncate">
                  1. Pesan Bantuan
                </span>
                {currentStep > 1 ? (
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200/80">
                    Selesai ✓
                  </span>
                ) : (
                  <span className="text-[10px] font-extrabold text-[#00624E] bg-[#D4ECEC] px-2 py-0.5 rounded-full border border-teal-200/80">
                    Aktif
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                {currentStep > 1 ? "1 Strip Amlodipin 5mg" : "Pilih Kebutuhan & Rekam Suara"}
              </p>
            </div>
          </button>

          {/* STEP 2: Pengantaran Relawan */}
          <button
            type="button"
            id="step-btn-2"
            onClick={() => {
              triggerHaptic(30);
              setCurrentStep(2);
              if (typeof window !== "undefined") {
                window.history.replaceState(null, "", "/lansia/bantuan?step=2");
              }
              speakIndonesian("Membuka Langkah 2: Pelacakan Kurir Relawan Pak Teddy.");
            }}
            className={`flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer group relative overflow-hidden ${
              currentStep === 2
                ? "bg-gradient-to-br from-emerald-50/90 to-white border-emerald-500 ring-3 ring-emerald-500/20 shadow-[0_6px_20px_rgba(16,185,129,0.15)] -translate-y-0.5"
                : currentStep > 2
                ? "bg-[#F8FCFC] border-emerald-200 text-slate-700 hover:bg-emerald-50/50 hover:border-emerald-300"
                : "bg-slate-50 border-slate-200/80 text-slate-400 hover:bg-slate-100"
            }`}
          >
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 transition-all ${
              currentStep === 2
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 animate-pulse scale-105"
                : currentStep > 2
                ? "bg-emerald-500 text-white shadow-xs"
                : "bg-slate-200 text-slate-500"
            }`}>
              {currentStep > 2 ? <Check className="w-5 h-5 stroke-[3]" /> : <Car className="w-5 h-5" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs sm:text-sm font-black text-slate-900 truncate">
                  2. Pengantaran Relawan
                </span>
                {currentStep === 2 && (
                  <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300 animate-pulse">
                    ● OTW (~6 mnt)
                  </span>
                )}
                {currentStep > 2 && (
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200/80">
                    Selesai ✓
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                Pak Teddy Menuju Rumah
              </p>
            </div>
          </button>

          {/* STEP 3: Serah Terima & PIN */}
          <button
            type="button"
            id="step-btn-3"
            onClick={() => {
              triggerHaptic(30);
              setCurrentStep(3);
              if (typeof window !== "undefined") {
                window.history.replaceState(null, "", "/lansia/bantuan?step=3");
              }
              speakIndonesian("Membuka Langkah 3: Serah Terima dan Kode PIN 8 2 4 1.");
            }}
            className={`flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer group relative overflow-hidden ${
              currentStep === 3
                ? "bg-gradient-to-br from-amber-50/90 to-white border-amber-500 ring-3 ring-amber-500/20 shadow-[0_6px_20px_rgba(245,158,11,0.15)] -translate-y-0.5"
                : "bg-slate-50 border-slate-200/80 text-slate-400 hover:bg-slate-100"
            }`}
          >
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 transition-all ${
              currentStep === 3
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/30 scale-105"
                : "bg-slate-200 text-slate-500"
            }`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs sm:text-sm font-black text-slate-900 truncate">
                  3. Serah Terima & PIN
                </span>
                {currentStep === 3 ? (
                  <span className="text-[10px] font-extrabold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full border border-amber-300">
                    Validasi PIN
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-full">
                    Tahap 3
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                PIN 8241 &amp; Scan QR Resmi
              </p>
            </div>
          </button>

        </div>
      </div>

      {/* SUCCESS TOAST NOTIFICATION */}
      {showToast && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-3 rounded-2xl flex items-center justify-between gap-3 shadow-sm animate-in fade-in-50">
          <div className="flex items-center gap-2.5 text-xs font-bold">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span>Permintaan berhasil dikirim! Anda sekarang berada di layar pelacakan langsung.</span>
          </div>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            className="text-emerald-700 hover:text-emerald-950 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. CONTENT VIEW 1: TAB MINTA BANTUAN (FORMULIR BARU)          */}
      {/* ============================================================ */}
      {activeTab === "minta" && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start animate-in fade-in duration-200">
          
          {/* LEFT COLUMN (8 cols) */}
          <div className="xl:col-span-8 flex flex-col gap-5 sm:gap-6 relative">
            
            {/* HERO BANNER */}
            <div className="bg-gradient-to-br from-[#4EA8A6] via-[#54B1AF] to-[#6BC5C3] rounded-[28px] p-6 sm:p-7 text-white relative overflow-hidden shadow-[0_16px_40px_rgba(82,177,175,0.25)] flex flex-col justify-between min-h-[185px] group">
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-white/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 right-1/3 w-36 h-36 bg-teal-300/20 rounded-full blur-xl pointer-events-none" />

              <div className="relative z-10 space-y-1.5 max-w-[70%]">
                <div className="flex items-center gap-1.5 text-white/90 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Pelayanan Gotong Royong RT 04</span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight text-white">
                  Ada yang Bisa Tetangga Bantu, Pak?
                </h2>
                <p className="text-xs sm:text-sm font-medium text-white/95 leading-relaxed pt-1">
                  Pilih salah satu kebutuhan di bawah atau rekam pesan suara. Relawan siaga siap tiba di rumah dalam hitungan menit.
                </p>
              </div>

              <div className="relative z-10 pt-4 flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-xs border border-white/30 text-xs font-bold text-white shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span>3 Relawan Siaga Radius 150m</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-xs border border-white/30 text-xs font-bold text-white shadow-2xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Estimasi Respons: &lt; 5 Menit</span>
                </div>
              </div>

              {/* Friendly Senior Bapak Illustration with Smooth Floating Animation */}
              <div className="hidden lg:flex absolute bottom-0 right-4 sm:right-6 w-36 sm:w-40 h-44 pointer-events-none select-none items-end justify-center animate-float-gentle">
                {/* Yellow Warm Sun Backdrop */}
                <div className="absolute bottom-2 w-28 sm:w-32 h-28 sm:h-32 bg-[#FDBA74] rounded-full shadow-inner opacity-95" />
                <div className="absolute -bottom-2 -right-2 w-10 h-16 bg-white/20 rounded-full rotate-45 blur-2xs" />
                <div className="absolute -bottom-2 left-0 w-8 h-12 bg-white/15 rounded-full -rotate-30 blur-2xs" />

                {/* High-Fidelity SVG Senior Bapak */}
                <svg viewBox="0 0 100 120" className="w-32 h-40 relative z-10 drop-shadow-lg">
                  <path d="M22 80 Q22 54 50 54 Q78 54 78 80 L78 120 L22 120 Z" fill="#FFFFFF" />
                  <path d="M38 64 L50 82 L62 64 Z" fill="#FED7AA" />
                  <line x1="50" y1="82" x2="50" y2="120" stroke="#CBD5E1" strokeWidth="2.5" />
                  
                  {/* Shopping basket in hand */}
                  <rect x="42" y="75" width="24" height="20" rx="3.5" fill="#4EA8A6" />
                  <path d="M46 75 C46 68 62 68 62 75" stroke="#FFFFFF" strokeWidth="2" fill="none" />
                  <circle cx="54" cy="85" r="2.5" fill="#FFFFFF" />

                  {/* Head */}
                  <circle cx="50" cy="38" r="16" fill="#FED7AA" />
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

            {/* 4 ACTION CARDS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#4EA8A6] text-white font-black text-xs flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-black text-base text-slate-900 tracking-tight">
                    Pilih Kebutuhan Bantuan
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#3B8F8D] bg-[#EBF5F5] px-3 py-1 rounded-full border border-teal-200/70">
                  Terpilih: <strong>{selectedItem.label}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {BANTUAN_LIST.map((item) => {
                  const isSelected = selected === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      id={`bantuan-${item.id}`}
                      onClick={() => handleSelectBantuan(item)}
                      className={`bg-white rounded-[24px] p-4 sm:p-5 border transition-all duration-300 flex items-center justify-between group cursor-pointer text-left ${
                        isSelected
                          ? "border-2 border-[#4EA8A6] ring-4 ring-[#4EA8A6]/15 bg-gradient-to-br from-[#F0FAF9] to-white shadow-[0_10px_25px_rgba(78,168,166,0.18)] -translate-y-0.5"
                          : "border-[#E1EFF0] shadow-[0_6px_20px_rgba(79,170,168,0.04)] hover:shadow-xl hover:-translate-y-1"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${item.iconGradient} ${item.iconColor} flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <h4 className={`font-black text-sm sm:text-base leading-tight truncate transition-colors ${
                            isSelected ? "text-[#185351]" : "text-slate-900 group-hover:text-[#4FAAA8]"
                          }`}>
                            {item.label}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                            {item.desc}
                          </p>
                          <p className={`text-[10px] font-bold mt-1 ${
                            isSelected ? "text-[#3B8F8D]" : "text-slate-500"
                          }`}>
                            {item.biaya}
                          </p>
                        </div>
                      </div>

                      {isSelected ? (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#4EA8A6] to-[#3B8F8D] text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-xl bg-[#E6F5F5] text-[#4FAAA8] flex items-center justify-center shrink-0 group-hover:bg-[#4FAAA8] group-hover:text-white transition-all duration-300 shadow-2xs">
                          <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DETAIL & CATATAN CARD */}
            <div className="bg-white rounded-[28px] border border-[#E1EFF0] shadow-[0_8px_30px_rgba(79,170,168,0.05)] p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#4EA8A6] text-white font-black text-xs flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <h3 className="font-black text-base text-slate-900 tracking-tight leading-tight">
                      Sampaikan Catatan &amp; Suara
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Gunakan rekaman suara tanpa mengetik atau pilih saran cepat
                    </p>
                  </div>
                </div>
              </div>

              {/* Voice hero box */}
              <div className="bg-gradient-to-r from-[#EBF5F5] via-[#E2F2F2] to-[#EBF5F5] border border-teal-200/90 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative overflow-hidden shadow-2xs">
                <div className="flex items-center gap-3.5 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4EA8A6] to-[#3B8F8D] text-white flex items-center justify-center shadow-md shadow-[#4EA8A6]/25 flex-shrink-0">
                    <Mic className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-black text-slate-900 text-sm leading-tight">
                        Rekam Pesan Suara
                      </p>
                      <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/90 text-[#246A68] border border-teal-200 shadow-2xs">
                        Paling Praktis
                      </span>
                    </div>
                    <p className="text-xs text-[#2D7371] font-semibold mt-0.5">
                      Cukup bicara tanpa mengetik, suara otomatis diubah menjadi teks catatan.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  id="btn-voice-record"
                  onClick={() => {
                    triggerHaptic(40);
                    setIsRecording(true);
                  }}
                  className="w-full sm:w-auto px-4.5 py-2.5 bg-gradient-to-r from-[#4EA8A6] to-[#3B8F8D] hover:from-[#3B8F8D] hover:to-[#2F7775] active:scale-95 text-white font-black text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <Mic className="w-4 h-4 animate-pulse" />
                  <span>Mulai Bicara</span>
                </button>
              </div>

              {/* Player if voice attached */}
              {hasVoiceAttached && (
                <div className="bg-gradient-to-r from-[#F0FAF9] to-[#E6F6F5] border border-teal-200/90 rounded-2xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in-50 shadow-2xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={handlePlayVoicePreview}
                      className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#4EA8A6] to-[#3B8F8D] text-white flex items-center justify-center shadow-xs shrink-0 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                      title="Putar Rekaman Suara"
                    >
                      {isPlayingAudio ? (
                        <Square className="w-3.5 h-3.5 fill-white" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                      )}
                    </button>
                    <div className="min-w-0">
                      <p className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                        <span>🎙️ Rekaman Suara Bapak Dilampirkan</span>
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full">Siap Kirim</span>
                      </p>
                      <p className="text-xs text-slate-600 font-medium truncate italic mt-0.5">
                        &ldquo;{voiceText}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={handlePlayVoicePreview}
                      className="text-xs font-bold text-[#246A68] hover:text-[#174846] bg-white px-3 py-1 rounded-full border border-teal-200/80 cursor-pointer"
                    >
                      {isPlayingAudio ? "Memutar..." : "Putar Suara"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic(25);
                        setIsRecording(true);
                      }}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 bg-white px-3 py-1 rounded-full border border-slate-200 cursor-pointer"
                    >
                      Rekam Ulang
                    </button>
                  </div>
                </div>
              )}

              {/* 1-tap quick tags */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#4FAAA8]" />
                    <span>Saran Cepat 1-Ketuk ({selectedItem.label}):</span>
                  </label>
                  <span className="text-[10px] font-medium text-slate-400">Ketuk untuk menambah</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItem.tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleAppendTag(tag)}
                      className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#F5FBFB] hover:bg-[#EBF7F7] text-[#246A68] border border-teal-200/80 active:scale-95 transition-all cursor-pointer shadow-2xs hover:border-teal-300"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="catatan-bantuan" className="text-xs font-bold text-slate-600">
                    Catatan Tambahan (Opsional):
                  </label>
                  {catatan && (
                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic(20);
                        setCatatan("");
                      }}
                      className="text-[11px] font-bold text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      Bersihkan Catatan
                    </button>
                  )}
                </div>
                <textarea
                  id="catatan-bantuan"
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Contoh: Tolong belikan Amlodipine 5mg satu strip di Apotek K-24, uang dan resep ada di amplop meja tamu..."
                  rows={2}
                  className="w-full rounded-2xl border border-[#E1EFF0] bg-[#FAFCFC] p-3.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#4EA8A6] focus:ring-4 focus:ring-[#4EA8A6]/10 transition-all resize-none outline-none font-medium leading-relaxed"
                />
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN (4 cols) */}
          <div className="xl:col-span-4 flex flex-col gap-5 xl:sticky xl:top-6">
            
            {/* PROFILE CARD */}
            <div className="bg-white rounded-[26px] p-5 border border-[#E1EFF0] shadow-[0_8px_25px_rgba(79,170,168,0.04)] flex flex-col items-center text-center">
              <div className="relative mb-2.5">
                <div className="w-16 h-16 rounded-full bg-[#EBF5F5] border-2 border-white shadow-md overflow-hidden flex items-center justify-center">
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
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
              </div>

              <h3 className="text-base font-black text-slate-900 leading-tight">
                Bapak Prabowo (71 th)
              </h3>
              <p className="text-xs font-semibold text-slate-400 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#4FAAA8]" />
                <span>Jl. Melati Blok C4 No. 12, RT 04</span>
              </p>

              <div className="w-full mt-3 pt-3 border-t border-slate-100 flex items-center justify-between p-2.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-left">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 block">
                    PIN Validasi Serah Terima:
                  </span>
                  <span className="text-xs text-amber-800 font-semibold block">
                    Tunjukkan saat relawan tiba
                  </span>
                </div>
                <span className="text-lg font-mono font-black text-amber-900 tracking-widest bg-white px-2.5 py-1 rounded-xl shadow-2xs border border-amber-200">
                  8241
                </span>
              </div>
            </div>

            {/* RELAWAN SIAGA CARD */}
            <div className="bg-white rounded-[26px] p-5 border border-[#E1EFF0] shadow-[0_8px_25px_rgba(79,170,168,0.04)] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#4EA8A6] text-white font-black text-[10px] flex items-center justify-center">
                    3
                  </span>
                  <h4 className="font-black text-sm text-slate-900">
                    Relawan Siaga RT 04
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  ● 3 Aktif
                </span>
              </div>

              <div className="space-y-2">
                {RELAWAN_LIST.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-teal-200/80 transition-all shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-xl ${r.avatarBg} text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0`}>
                        {r.inisial}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900 truncate leading-tight">{r.nama}</p>
                        <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">{r.peran} • {r.kendaraan}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-black text-[#246A68] bg-[#EBF5F5] px-2 py-0.5 rounded-full border border-teal-200/80">
                        {r.jarak}
                      </span>
                      <p className="text-[9px] font-bold text-slate-400 mt-0.5">{r.estimasi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CONFIRMATION TICKET */}
            <div className="bg-white rounded-[26px] p-5 border border-[#E1EFF0] shadow-[0_12px_35px_rgba(79,170,168,0.08)] space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#4FAAA8]" />
                  <span>Ringkasan Tiket</span>
                </h4>
                <span className="text-[10px] font-mono font-bold text-slate-400">#TIK-0824</span>
              </div>

              <div className="bg-[#F8FAFB] border border-[#E1EFF0] rounded-2xl p-3 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Bantuan:</span>
                  <span className="font-black text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#4EA8A6]" />
                    {selectedItem.label}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Ketentuan:</span>
                  <span className="font-bold text-slate-800">
                    {selectedItem.biaya}
                  </span>
                </div>

                <div className="flex items-start justify-between pt-1 border-t border-slate-200/60">
                  <span className="text-slate-500 font-medium shrink-0">Catatan:</span>
                  <span className="font-semibold text-slate-700 text-right truncate max-w-[170px]">
                    {catatan.trim() 
                      ? catatan 
                      : hasVoiceAttached 
                        ? "Pesan suara terlampir" 
                        : "(Tanpa catatan khusus)"}
                  </span>
                </div>
              </div>

              <button
                id="btn-submit-bantuan"
                type="button"
                disabled={isSubmitting}
                onClick={handleKirim}
                className="w-full py-4 rounded-2xl font-black text-sm sm:text-base text-white shadow-[0_10px_28px_rgba(78,168,166,0.35)] bg-gradient-to-r from-[#4EA8A6] via-[#469F9D] to-[#3B8F8D] hover:from-[#3B8F8D] hover:to-[#2F7775] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
                <span>{isSubmitting ? "Meneruskan ke Relawan..." : "Kirim & Lanjut ke Langkah 2: Pengantaran →"}</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* 4. CONTENT VIEW 2: LANGKAH 2 (PENGANTARAN RELAWAN OTW)       */}
      {/* ============================================================ */}
      {currentStep === 2 && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          
          {/* HERO 1: STATUS PENGANTARAN */}
          <div className="bg-gradient-to-br from-[#4EA8A6] via-[#54B1AF] to-[#6BC5C3] rounded-[28px] p-6 sm:p-7 text-white relative overflow-hidden shadow-[0_16px_40px_rgba(82,177,175,0.25)] flex flex-col justify-between min-h-[220px] group">
            <div className="absolute -top-12 -left-12 w-44 h-44 bg-white/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-10 w-36 h-36 bg-teal-300/20 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10 space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-xs font-bold text-white/95 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Langkah 2: Relawan Sedang Berjalan Menuju Rumah</span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight text-white">
                Pak Teddy Mengantar Obat Bapak
              </h2>

              <p className="text-xs sm:text-sm font-medium text-white/95 leading-relaxed">
                1 Strip Amlodipin 5mg sudah selesai ditebus di Apotek K-24 Gejayan dan sedang diantar ke rumah Bapak.
              </p>
            </div>

            <div className="relative z-10 pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/20 mt-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-sm text-white">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Estimasi ~6 Menit</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-sm text-white">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Jarak 50m (Blok C4)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/30 backdrop-blur-sm text-white border border-emerald-300/40">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Talangan Lunas</span>
                </span>
              </div>

              <button
                type="button"
                id="btn-call-hero"
                onClick={() => {
                  triggerHaptic(40);
                  setShowCallModal(true);
                }}
                className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-white text-emerald-900 hover:bg-emerald-50 active:scale-95 transition-all shadow-md font-black text-xs sm:text-sm cursor-pointer border border-white/80 shrink-0 z-20"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>Telepon Pak Teddy</span>
              </button>
            </div>

            {/* Friendly Volunteer Pak Teddy Illustration with Smooth Floating Animation */}
            <div className="hidden lg:flex absolute bottom-0 right-4 sm:right-8 w-36 sm:w-44 h-48 pointer-events-none select-none items-end justify-center animate-float-gentle">
              {/* Warm Sun Backdrop */}
              <div className="absolute bottom-2 w-28 sm:w-32 h-28 sm:h-32 bg-[#FDBA74] rounded-full shadow-inner opacity-95" />
              <div className="absolute -bottom-2 -right-2 w-10 h-16 bg-white/20 rounded-full rotate-45 blur-2xs" />
              <div className="absolute -bottom-2 left-0 w-8 h-12 bg-white/15 rounded-full -rotate-30 blur-2xs" />
              
              {/* High-Fidelity SVG Pak Teddy Volunteer */}
              <svg viewBox="0 0 100 120" className="w-32 h-44 relative z-10 drop-shadow-lg">
                {/* Torso with Volunteer Vest */}
                <path d="M22 78 Q22 52 50 52 Q78 52 78 78 L78 120 L22 120 Z" fill="#00624E" />
                <path d="M36 52 L50 72 L64 52 Z" fill="#FED7AA" />
                <line x1="50" y1="72" x2="50" y2="120" stroke="#4EA8A6" strokeWidth="2.5" />
                <rect x="28" y="80" width="12" height="14" rx="2" fill="#185351" />
                <rect x="60" y="80" width="12" height="14" rx="2" fill="#185351" />
                
                {/* Parcel Box in Hand */}
                <rect x="36" y="74" width="28" height="22" rx="3.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
                <rect x="48" y="79" width="4" height="12" rx="1" fill="#E11D48" />
                <rect x="44" y="83" width="12" height="4" rx="1" fill="#E11D48" />

                {/* Head */}
                <circle cx="50" cy="36" r="15" fill="#FED7AA" />
                
                {/* Green Volunteer Cap */}
                <path d="M34 30 C34 16 42 14 50 14 C58 14 66 16 66 30 Z" fill="#00624E" />
                <rect x="32" y="28" width="36" height="5" rx="2.5" fill="#185351" />
                
                {/* Eyes & Warm Smile */}
                <circle cx="43" cy="36" r="1.3" fill="#0F172A" />
                <circle cx="57" cy="36" r="1.3" fill="#0F172A" />
                <path d="M46 43 Q50 48 54 43" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            </div>
          </div>

          {/* TWO-COLUMN DETAILS: TIMELINE & PIN PREVIEW */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* LEFT: TIMELINE STEPPER (7 cols) */}
            <div className="xl:col-span-7 flex flex-col gap-6">
              <div className="bg-white rounded-[28px] border border-[#DFECEE] p-6 sm:p-7 shadow-[0_6px_25px_rgba(79,170,168,0.04)] space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-[#4FAAA8]">
                      Pelacakan Real-Time
                    </span>
                    <h3 className="font-black text-slate-900 text-lg sm:text-xl leading-tight mt-0.5">
                      Tahapan Pengantaran Obat
                    </h3>
                  </div>
                  <span className="text-xs font-black text-[#2C8583] bg-[#E8F6F6] border border-teal-200/60 px-3 py-1 rounded-full">
                    Tahap 2 dari 4 (50%)
                  </span>
                </div>

                <div className="space-y-5 relative pl-2">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4 relative">
                    <div className="absolute left-[15px] top-8 bottom-[-22px] w-[2px] bg-[#56B4B2] z-0" />
                    <div className="w-8 h-8 rounded-full bg-[#56B4B2] text-white flex items-center justify-center font-black text-xs shrink-0 z-10 shadow-sm relative">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div className="flex-1 p-4 rounded-2xl bg-[#F7FBFC] border border-[#E1EFF0]">
                      <div className="flex items-center justify-between">
                        <p className="font-black text-sm text-slate-900">1. Permintaan Diterima Posko RT 04</p>
                        <span className="text-[11px] font-bold text-slate-500">10:42 WIB</span>
                      </div>
                      <p className="text-xs font-medium text-slate-500 mt-1">
                        Permintaan resep obat Amlodipin 5mg masuk ke koordinasi relawan RT 04 Sukamaju.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 (Active) */}
                  <div className="flex items-start gap-4 relative">
                    <div className="absolute left-[15px] top-8 bottom-[-22px] w-[2px] bg-slate-200 z-0" />
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4EA8A6] to-[#3B8F8D] text-white flex items-center justify-center font-black text-xs shrink-0 z-10 shadow-md ring-4 ring-teal-100 animate-pulse relative">
                      <Car className="w-4 h-4" />
                    </div>
                    <div className="flex-1 p-4 rounded-2xl bg-gradient-to-r from-teal-50/90 to-emerald-50/60 border border-teal-200 shadow-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-black text-sm text-teal-950">2. Obat Ditebus & Dalam Perjalanan</p>
                        <span className="inline-flex items-center gap-1.5 bg-[#E8F6F6] text-[#2C8583] border border-teal-200/80 px-3 py-1 rounded-full text-xs font-black shadow-2xs">
                          <span className="w-2 h-2 rounded-full bg-[#4FAAA8] animate-ping" />
                          Pak Teddy Sedang Jalan
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-teal-900/90 mt-1.5">
                        Pak Teddy selesai menebus Amlodipin 5mg dan sedang berjalan kaki menuju rumah Bapak. Estimasi waktu tiba 6 menit.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-4 relative opacity-60">
                    <div className="absolute left-[15px] top-8 bottom-[-22px] w-[2px] bg-slate-200 z-0" />
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 text-slate-400 flex items-center justify-center font-black text-xs shrink-0 z-10">
                      3
                    </div>
                    <div className="flex-1 p-4 rounded-2xl bg-white border border-slate-100/90">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-sm text-slate-800">3. Menunggu di Depan Pintu</p>
                        <span className="text-[11px] text-slate-400 font-medium">Tunggu Relawan</span>
                      </div>
                      <p className="text-xs font-medium text-slate-400 mt-0.5">
                        Relawan tiba di titik lokasi dan menunggu konfirmasi serah terima.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start gap-4 relative opacity-60">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs shrink-0 z-10">
                      4
                    </div>
                    <div className="flex-1 p-4 rounded-2xl bg-[#FAFCFC] border border-slate-200">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-sm text-slate-700">4. Serah Terima &amp; Verifikasi PIN 8241</p>
                        <span className="text-[11px] text-slate-400 font-medium">Berikutnya</span>
                      </div>
                      <p className="text-xs font-medium text-slate-400 mt-1">
                        Sebutkan PIN 8241 atau scan barcode saat obat diserahkan di pintu rumah.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: RELAWAN PROFILE, RESEP & NEXT STEP BUTTON (5 cols) */}
            <div className="xl:col-span-5 flex flex-col gap-6">
              
              {/* RELAWAN CARD */}
              <div className="bg-white rounded-[28px] border border-[#DFECEE] p-6 shadow-[0_6px_25px_rgba(79,170,168,0.04)] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#4EA8A6] text-white flex items-center justify-center font-black text-base shadow-xs">
                      PT
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-base">Pak Teddy</h4>
                      <p className="text-xs font-semibold text-[#4FAAA8]">Relawan Siaga RT 04</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCallModal(true)}
                    className="p-2.5 rounded-xl bg-[#EBF5F5] hover:bg-[#D9EFEF] text-[#00624E] border border-teal-200 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F8FAFB] border border-[#DFECEE] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Obat Dipesan:</span>
                    <strong className="text-slate-800">1 Strip Amlodipin 5mg</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Apotek:</span>
                    <strong className="text-slate-800">K-24 Gejayan (Lunas)</strong>
                  </div>
                </div>

                <button
                  type="button"
                  id="btn-view-receipt-step2"
                  onClick={() => {
                    triggerHaptic(30);
                    setShowReceiptModal(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Receipt className="w-4 h-4 text-slate-500" />
                  <span>Lihat Bukti Struk &amp; Resep Asli</span>
                </button>
              </div>

              {/* CARD PREVIEW LANGKAH 3 (PIN HANDOVER) */}
              <div className="bg-gradient-to-br from-[#FFFDF5] via-[#FFFBEB] to-[#FEF3C7] border-2 border-amber-300/90 rounded-[28px] p-6 text-slate-900 shadow-[0_8px_25px_rgba(245,158,11,0.08)] space-y-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-800">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Langkah Berikutnya: Serah Terima</span>
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-semibold">
                    Kode PIN Keamanan Serah Terima Bapak:
                  </p>
                  <div className="flex items-center gap-2 mt-2.5">
                    {["8", "2", "4", "1"].map((d, i) => (
                      <span key={i} className="px-3.5 py-1.5 rounded-xl bg-white border-2 border-amber-300 font-mono text-2xl font-black text-amber-950 shadow-xs">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  id="btn-open-step-3"
                  onClick={() => {
                    triggerHaptic(35);
                    setCurrentStep(3);
                    speakIndonesian("Menuju ke Langkah 3: Layar Serah Terima dan Kode PIN 8 2 4 1.");
                  }}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs sm:text-sm transition-all shadow-md shadow-amber-500/25 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Buka Layar Serah Terima (Langkah 3) →</span>
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowCancelModal(true)}
                  className="text-xs font-bold text-slate-400 hover:text-rose-600 transition-colors py-1"
                >
                  Batalkan Bantuan Ini
                </button>
              </div>

            </div>

          </div>

          {/* WIZARD STEP 2 NAVIGATION BAR */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-[#DFECEE] shadow-[0_4px_20px_rgba(79,170,168,0.04)]">
            <button
              type="button"
              onClick={() => {
                triggerHaptic(30);
                setCurrentStep(1);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Kembali ke Detail Pesanan (Langkah 1)</span>
            </button>

            <button
              type="button"
              id="btn-goto-step-3-bar"
              onClick={() => {
                triggerHaptic(35);
                setCurrentStep(3);
                speakIndonesian("Menuju ke Langkah 3: Layar Serah Terima dan Kode PIN 8 2 4 1.");
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs sm:text-sm font-black transition-all active:scale-95 shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <span>Lanjut ke Langkah 3: Serah Terima PIN 8241 →</span>
            </button>
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* 5. CONTENT VIEW 3: LANGKAH 3 (SERAH TERIMA & KODE PIN 8241)   */}
      {/* ============================================================ */}
      {currentStep === 3 && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
            
            {/* LEFT (7 cols): HERO KODE PIN 8241 */}
            <div className="xl:col-span-7 bg-gradient-to-br from-[#FFFDF5] via-[#FFFBEB] to-[#FEF3C7] border-2 border-amber-300 rounded-[28px] p-6 sm:p-8 text-slate-900 shadow-[0_8px_30px_rgba(245,158,11,0.12)] flex flex-col justify-between text-center relative overflow-hidden min-h-[360px]">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black tracking-wider uppercase border border-amber-200">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>KODE PIN KEAMANAN SERAH TERIMA</span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                  Sebutkan 4 Angka Ini Kepada Pak Teddy
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto">
                  Pak Teddy yang akan memasukkan PIN ini di ponselnya. Layar otomatis berubah hijau ketika serah terima selesai.
                </p>
              </div>

              {/* 4 GIANT TILES */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-6">
                {["8", "2", "4", "1"].map((digit, i) => (
                  <div 
                    key={i} 
                    className="w-18 h-22 sm:w-22 sm:h-26 rounded-[22px] bg-white border-3 border-amber-400 font-mono text-4xl sm:text-5xl font-black text-amber-950 flex items-center justify-center shadow-lg shadow-amber-400/20 active:scale-95 transition-transform"
                  >
                    {digit}
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2 border-t border-amber-200/80">
                {/* Reassurance pill */}
                <div className="p-2.5 bg-white/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 font-semibold flex items-center justify-center gap-2 max-w-lg mx-auto">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Obat telah dibayar <strong>Lunas Kas RT (Rp 28.500)</strong>. Tanpa biaya tambahan.</span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic(40);
                      speakIndonesian("Kode PIN keamanan serah terima adalah delapan dua empat satu.");
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-amber-950 font-black text-xs transition-all cursor-pointer border border-amber-300 shadow-2xs"
                  >
                    <Volume2 className="w-4 h-4 text-amber-800" />
                    <span>Dengarkan Suara PIN (8-2-4-1)</span>
                  </button>

                  <button
                    type="button"
                    id="btn-simulate-completion-step3"
                    onClick={() => {
                      triggerHaptic(50);
                      setBantuanSelesai(true);
                    }}
                    className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>(Klik untuk Simulasi: Relawan Cocokkan PIN 8241)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT (5 cols): KODE QR RESMI & STRUK */}
            <div className="xl:col-span-5 flex flex-col gap-5">
              
              <div className="bg-white rounded-[28px] border border-[#DFECEE] p-6 text-center space-y-4 shadow-[0_6px_25px_rgba(79,170,168,0.04)]">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#4FAAA8]">
                    Pilihan Alternatif Pindai
                  </span>
                  <h3 className="font-black text-slate-900 text-base sm:text-lg">
                    Kode QR Serah Terima
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">Jika Pak Teddy memilih memindai barcode langsung</p>
                </div>

                <div className="relative w-44 h-44 sm:w-48 sm:h-48 mx-auto bg-white p-3 rounded-2xl border-2 border-[#DFECEE] shadow-sm flex items-center justify-center">
                  {/* Viewfinder brackets */}
                  <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#4EA8A6] rounded-tl" />
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#4EA8A6] rounded-tr" />
                  <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#4EA8A6] rounded-bl" />
                  <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#4EA8A6] rounded-br" />

                  {qrDataUrl ? (
                    <img 
                      src={qrDataUrl} 
                      alt="Kode QR Resmi Serah Terima PIN 8241" 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="animate-pulse text-xs text-slate-400">Memuat Kode QR...</div>
                  )}
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs space-y-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Relawan Pengantar:</span>
                    <strong className="text-slate-900">Pak Teddy (RT 04)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">ID Bantuan:</span>
                    <span className="font-mono font-bold text-[#2C8583]">#B-08241</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Status Pembayaran:</span>
                    <strong className="text-emerald-700">Lunas Rp 28.500</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic(30);
                    setShowReceiptModal(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#EBF5F5] hover:bg-[#D9EFEF] text-[#00624E] font-bold text-xs flex items-center justify-center gap-2 border border-teal-200 transition-colors"
                >
                  <Receipt className="w-4 h-4 text-[#4FAAA8]" />
                  <span>Lihat Bukti Struk Apotek K-24</span>
                </button>
              </div>

            </div>

          </div>

          {/* WIZARD STEP 3 NAVIGATION BAR */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-[#DFECEE] shadow-[0_4px_20px_rgba(79,170,168,0.04)]">
            <button
              type="button"
              onClick={() => {
                triggerHaptic(30);
                setCurrentStep(2);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Kembali ke Pelacakan (Langkah 2)</span>
            </button>

            <button
              type="button"
              id="btn-complete-step-3-bar"
              onClick={() => {
                triggerHaptic(50);
                setBantuanSelesai(true);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs sm:text-sm font-black transition-all active:scale-95 shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Selesaikan Serah Terima (PIN 8241 Cocok) ✓</span>
            </button>
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* 5. MODALS                                                     */}
      {/* ============================================================ */}

      {/* VOICE RECORDING MODAL */}
      {isRecording && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsRecording(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-md p-6 sm:p-7 text-center shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-[#DFECEE] z-10 overflow-hidden space-y-4 animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsRecording(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative mx-auto w-18 h-18">
              <div className="absolute inset-0 rounded-3xl bg-[#4EA8A6]/20 animate-ping" />
              <div className="relative w-18 h-18 rounded-3xl bg-gradient-to-br from-[#4EA8A6] to-[#3B8F8D] text-white flex items-center justify-center shadow-lg shadow-[#4EA8A6]/30">
                <Mic className="w-9 h-9 animate-pulse" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#EBF5F5] border border-teal-200 text-[#246A68] text-xs font-black">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-[#4FAAA8]" />
                  {voiceStep === "listening" ? "Sedang Merekam Suara..." : "Suara Berhasil Dicatat"}
                </span>
                {voiceStep === "listening" && (
                  <span className="text-xs font-black text-[#246A68] font-mono bg-teal-100/90 px-2 py-0.2 rounded-full">
                    {recordSeconds}s
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                {voiceStep === "listening" ? "Sampaikan Kebutuhan Bapak/Ibu" : "Rangkuman Permintaan Suara"}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {voiceStep === "listening" ? "Bicaralah dengan tenang dan jelas. Sistem otomatis mencatat suara Bapak." : "Pesan suara telah siap dilampirkan atau dikirim langsung ke relawan."}
              </p>
            </div>

            {voiceStep === "listening" ? (
              <div className="space-y-2 py-2.5 bg-[#FAFCFC] rounded-2xl border border-[#DFECEE]">
                <div className="flex items-center justify-center gap-1.5 h-12">
                  {[6, 12, 22, 14, 8, 18, 26, 15, 9, 20, 11, 24, 7, 16, 10, 19].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-[#4EA8A6] to-[#3B8F8D] rounded-full animate-pulse"
                      style={{ height: `${h * 1.5}px`, animationDelay: `${i * 0.08}s` }}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-[#3B8F8D] font-bold">
                  Gelombang mikrofon aktif mendeteksi suara...
                </p>
              </div>
            ) : (
              <div className="p-3.5 bg-[#F8FAFB] rounded-2xl border border-[#DFECEE] text-left text-xs font-semibold text-slate-800 leading-relaxed space-y-1.5">
                <span className="text-[10px] font-black uppercase text-[#4FAAA8] tracking-wider block">
                  Teks Terdeteksi:
                </span>
                <p className="italic text-slate-900 text-xs sm:text-sm">
                  &ldquo;{voiceText}&rdquo;
                </p>
              </div>
            )}

            <div className="space-y-2 pt-1">
              {voiceStep === "transcribed" ? (
                <>
                  <button
                    type="button"
                    onClick={handleSendVoiceDirect}
                    className="w-full py-3 bg-gradient-to-r from-[#4EA8A6] to-[#3B8F8D] hover:from-[#3B8F8D] hover:to-[#2F7775] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md shadow-[#4EA8A6]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Kirim Langsung ke Relawan</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmVoice}
                    className="w-full py-2 bg-[#EBF5F5] hover:bg-[#D9EFEF] text-[#246A68] font-black text-xs rounded-xl transition-all cursor-pointer border border-teal-200/80"
                  >
                    Simpan Catatan &amp; Kembali ke Formulir
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsRecording(false)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Batalkan Perekaman
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STRUK & RESEP MODAL */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowReceiptModal(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-lg p-6 sm:p-7 shadow-2xl border border-slate-100 z-10 space-y-4 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#3B8F8D] flex items-center justify-center shadow-xs">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-slate-900">
                    Bukti Struk &amp; Resep Asli
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">Apotek K-24 Gejayan • Terbayar Lunas</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowReceiptModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 font-mono space-y-2">
                <div className="text-center pb-2 border-b border-dashed border-slate-300">
                  <p className="font-black text-sm text-slate-800">APOTEK K-24 GEJAYAN</p>
                  <p className="text-[10px] text-slate-500">Jl. Affandi No. 12, Gejayan, Sleman</p>
                  <p className="text-[10px] text-slate-400">Telp: (0274) 555-1234 • SIPA: 1982/2024</p>
                </div>
                <div className="flex justify-between text-slate-600 pt-1">
                  <span>Tanggal: 08 Sep 2026</span>
                  <span>10:48 WIB</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Kasir: Sari W.</span>
                  <span>No: TRX-082410</span>
                </div>
                <div className="py-2 border-y border-dashed border-slate-300 space-y-1">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>1x AMLODIPIN 5MG (10 TAB)</span>
                    <span>Rp 24.500</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>1x BIAYA PELAYANAN RESEP</span>
                    <span>Rp 4.000</span>
                  </div>
                </div>
                <div className="flex justify-between font-black text-sm text-slate-900 pt-1">
                  <span>TOTAL PEMBAYARAN</span>
                  <span className="text-emerald-700">Rp 28.500</span>
                </div>
                <div className="text-center pt-2 text-[10px] text-emerald-800 font-bold bg-emerald-50 rounded-xl p-1.5 border border-emerald-200">
                  STATUS: LUNAS (QRIS / TRANSFER AN. TITIEK PRABOWO)
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowReceiptModal(false)}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-all cursor-pointer"
            >
              Tutup Rincian
            </button>
          </div>
        </div>
      )}

      {/* TELEPON RELAWAN MODAL */}
      {showCallModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowCallModal(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#4EA8A6] text-white flex items-center justify-center font-black text-lg shadow-sm">
              PT
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Pak Teddy</h3>
              <p className="text-[#4FAAA8] text-xs font-bold mt-0.5">Relawan Siaga Pengantar</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Jarak ~50m dari rumah Bapak</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="text-slate-400 font-medium">Nomor WhatsApp / Telepon:</span>
              <p className="font-mono font-black text-base text-slate-800 mt-0.5">0812-3456-7890</p>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="tel:081234567890"
                onClick={() => triggerHaptic(50)}
                className="w-full py-3.5 bg-gradient-to-r from-[#4EA8A6] to-[#3B8F8D] hover:from-[#3B8F8D] hover:to-[#2F7775] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Panggil Sekarang</span>
              </a>
              <button
                type="button"
                onClick={() => setShowCallModal(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-all cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BATALKAN BANTUAN MODAL */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowCancelModal(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Batalkan Bantuan Ini?</h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                Pak Teddy sudah menebus obat di apotek. Jika dibatalkan, mohon koordinasikan dengan relawan terlebih dahulu.
              </p>
            </div>
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  triggerHaptic(40);
                  setShowCancelModal(false);
                  setCurrentStep(1);
                  if (typeof window !== "undefined") {
                    window.history.replaceState(null, "", "/lansia/bantuan?step=1");
                  }
                }}
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-2xl transition-all cursor-pointer"
              >
                Tetap Batalkan & Buat Baru
              </button>
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-all cursor-pointer"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIMULASI SELESAI MODAL */}
      {bantuanSelesai && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative bg-white rounded-[32px] w-full max-w-sm p-7 text-center shadow-2xl border border-emerald-200 z-10 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md animate-bounce">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                PIN 8241 Cocok &amp; Valid
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-2">
                Serah Terima Selesai!
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                Obat Amlodipin 5mg telah diserahterimakan kepada Bapak Prabowo. Laporan otomatis terkirim ke keluarga.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                triggerHaptic(40);
                setBantuanSelesai(false);
                setCurrentStep(1);
                if (typeof window !== "undefined") {
                  window.history.replaceState(null, "", "/lansia/bantuan?step=1");
                }
              }}
              className="w-full py-3.5 bg-gradient-to-r from-[#4EA8A6] to-[#3B8F8D] text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all cursor-pointer"
            >
              Kembali ke Menu Bantuan
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function BantuanPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Memuat halaman bantuan...</div>}>
      <BantuanContent />
    </Suspense>
  );
}
