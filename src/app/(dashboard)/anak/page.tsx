"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Pill, 
  ShoppingCart, 
  Heart, 
  HandHeart, 
  AlertTriangle, 
  Check, 
  Phone, 
  ArrowRight, 
  Clock, 
  Bell, 
  ShieldCheck,
  Accessibility,
  ChevronRight,
  Activity,
  MapPin,
  MessageSquare,
  User,
  Users,
  CheckCircle2,
  Sparkles,
  Search,
  QrCode,
  X
} from "lucide-react";

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

interface TetanggaRequest {
  id: string;
  nama: string;
  usia: string;
  lokasi: string;
  alamatLengkap: string;
  kategori: string;
  iconBg: string;
  iconColor: string;
  detail: string;
  waktu: string;
}

const RELAWAN_NEARBY: Relawan[] = [
  { id: "budi", nama: "Budi Santoso", inisial: "BS", peran: "Relawan Siaga", jarak: "50m", estimasi: "< 1 mnt", lokasi: "Blok C4 No. 12", telepon: "08123456789", avatarBg: "bg-[#00624E]" },
  { id: "joko", nama: "Pak Joko", inisial: "JW", peran: "Ketua RT 04", jarak: "100m", estimasi: "~2 mnt", lokasi: "Blok A1 No. 01", telepon: "08123456788", avatarBg: "bg-amber-600" },
  { id: "ani", nama: "Bu Ani", inisial: "AN", peran: "Kader Posyandu", jarak: "120m", estimasi: "~3 mnt", lokasi: "Blok B2 No. 08", telepon: "08123456787", avatarBg: "bg-rose-500" },
];

const CATEGORIES = [
  {
    id: "obat",
    label: "Beli Obat",
    desc: "Apotek & Resep Dokter",
    href: "/anak/bantuan?kategori=obat",
    containerBg: "bg-[#FEE2E2]",
    iconColor: "text-[#DC2626]",
    icon: <Pill className="w-8 h-8 stroke-[2.2]" />,
  },
  {
    id: "sayur",
    label: "Belanja Sayur",
    desc: "Warung RT & Kebutuhan Dapur",
    href: "/anak/bantuan?kategori=sayur",
    containerBg: "bg-[#FFEDD5]",
    iconColor: "text-[#EA580C]",
    icon: <ShoppingCart className="w-8 h-8 stroke-[2.2]" />,
  },
  {
    id: "alkes",
    label: "Pinjam Alkes",
    desc: "Kas RT Bebas Biaya",
    href: "/anak/alkes",
    containerBg: "bg-[#E6F4EA]",
    iconColor: "text-[#00624E]",
    icon: <Accessibility className="w-8 h-8 stroke-[2.2]" />,
  },
  {
    id: "kontrol",
    label: "Teman Kontrol",
    desc: "Posyandu & Puskesmas",
    href: "/anak/bantuan?kategori=kontrol",
    containerBg: "bg-[#F3E8FF]",
    iconColor: "text-[#9333EA]",
    icon: <Heart className="w-8 h-8 stroke-[2.2]" />,
  },
];

const TETANGGA_REQUESTS: TetanggaRequest[] = [
  {
    id: "req-minah",
    nama: "Nek Minah",
    usia: "74 Tahun",
    lokasi: "50m dari Anda di Jakarta • RT 04 Sukamaju",
    alamatLengkap: "Jl. Kenanga No. 08, RT 04 Sukamaju, Jakarta",
    kategori: "Bantuan Belanja Sayur",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-700",
    detail: "Tolong belikan sayur bayam 2 ikat, tempe, dan tahu di warung Bu RT depan gang.",
    waktu: "5 menit lalu",
  },
  {
    id: "req-syarif",
    nama: "Kakek Syarif",
    usia: "71 Tahun",
    lokasi: "90m dari Anda di Jakarta • Gang Melati RT 04",
    alamatLengkap: "Gang Melati Blok B1 No. 14, RT 04 Sukamaju, Jakarta",
    kategori: "Teman Jalan ke Klinik",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-700",
    detail: "Perlu ditemani jalan kaki ke Klinik Pratama Sukamaju untuk cek tensi darah rutin.",
    waktu: "18 menit lalu",
  },
  {
    id: "req-darmi",
    nama: "Mbah Darmi",
    usia: "80 Tahun",
    lokasi: "120m dari Anda di Jakarta • Blok B2 No. 04",
    alamatLengkap: "Jl. Mawar Blok B2 No. 04, RT 04 Sukamaju, Jakarta",
    kategori: "Cek Kondisi Rumah",
    iconBg: "bg-emerald-50",
    iconColor: "text-[#00624E]",
    detail: "Bantuan cek saklar lampu teras yang padam dan cek persediaan air galon dapur.",
    waktu: "45 menit lalu",
  },
];

function IlluSeniorBapak() {
  return (
    <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-3xl bg-[#E6F4EA] flex items-center justify-center shrink-0 shadow-inner">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 sm:w-18 sm:h-18">
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
      <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#00624E] text-white flex items-center justify-center shadow-xs border-2 border-white">
        <Check className="w-4 h-4 stroke-[3]" />
      </div>
    </div>
  );
}

function IlluSeniorIbu() {
  return (
    <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-3xl bg-[#FEF3C7] flex items-center justify-center shrink-0 shadow-inner">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 sm:w-18 sm:h-18">
        <circle cx="50" cy="50" r="44" fill="#FEF3C7" />
        
        <path d="M20 86 C20 68, 32 62, 50 62 C68 62, 80 68, 80 86 Z" fill="#D97706" opacity="0.8" />
        <path d="M42 62 L50 74 L58 62 Z" fill="#FED7AA" />
        <path d="M38 62 L50 78 L62 62" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.5" fill="none" />

        <circle cx="28" cy="45" r="5" fill="#FDBA74" />
        <circle cx="72" cy="45" r="5" fill="#FDBA74" />
        <circle cx="28" cy="47.5" r="1.5" fill="#F59E0B" />
        <circle cx="72" cy="47.5" r="1.5" fill="#F59E0B" />

        <circle cx="50" cy="18" r="9" fill="#94A3B8" />
        <rect x="42" y="17" width="16" height="2.5" rx="1" fill="#F59E0B" />

        <circle cx="50" cy="44" r="21" fill="#FED7AA" />

        <circle cx="36" cy="48" r="3.5" fill="#FECDD3" opacity="0.8" />
        <circle cx="64" cy="48" r="3.5" fill="#FECDD3" opacity="0.8" />

        <path d="M28 42 C27 22, 38 17, 50 17 C62 17, 73 22, 72 42 C68 25, 59 23, 50 25 C41 23, 32 25, 28 42 Z" fill="#94A3B8" />
        <path d="M31 33 Q40 25 50 28 Q60 25 69 33" stroke="#64748B" strokeWidth="1.5" fill="none" />

        <path d="M37 34 Q41 31 45 33" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M55 33 Q59 31 63 34" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        <circle cx="41" cy="40.5" r="5.8" fill="white" stroke="#B45309" strokeWidth="1.8" />
        <circle cx="59" cy="40.5" r="5.8" fill="white" stroke="#B45309" strokeWidth="1.8" />
        <line x1="46.8" y1="40.5" x2="53.2" y2="40.5" stroke="#B45309" strokeWidth="1.8" />
        <line x1="35.2" y1="40.5" x2="29" y2="42" stroke="#B45309" strokeWidth="1.3" />
        <line x1="64.8" y1="40.5" x2="71" y2="42" stroke="#B45309" strokeWidth="1.3" />

        <circle cx="41" cy="40.5" r="1.8" fill="#0F172A" />
        <circle cx="59" cy="40.5" r="1.8" fill="#0F172A" />

        <path d="M50 43 L49 47 L51 47" stroke="#EA580C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M44 52 Q50 57 56 52" stroke="#BE123C" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      </svg>
      <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs border-2 border-white">
        <Clock className="w-4 h-4 stroke-[2.5]" />
      </div>
    </div>
  );
}

export default function AnakDashboardPage() {
  const [activeTab, setActiveTab] = useState<"keluarga" | "tetangga">("keluarga");
  const [siapMembantu, setSiapMembantu] = useState(true);
  const [remindToast, setRemindToast] = useState(false);
  const [bantuSuccessToast, setBantuSuccessToast] = useState<string | null>(null);
  const [selectedRelawan, setSelectedRelawan] = useState<Relawan | null>(null);
  const [selectedTetangga, setSelectedTetangga] = useState<TetanggaRequest | null>(null);
  const [claimedList, setClaimedList] = useState<string[]>([]);
  const [showQrisModal, setShowQrisModal] = useState(false);
  const [qrisPaid, setQrisPaid] = useState(false);

  const handleRemind = () => {
    setRemindToast(true);
    setTimeout(() => setRemindToast(false), 4000);
  };

  const handleClaimBantu = (req: TetanggaRequest) => {
    setClaimedList((prev) => [...prev, req.id]);
    setSelectedTetangga(null);
    setBantuSuccessToast(`Tugas bantuan untuk ${req.nama} berhasil diambil!`);
    setTimeout(() => setBantuSuccessToast(null), 5000);
  };

  const handleConfirmQris = () => {
    setQrisPaid(true);
    setShowQrisModal(false);
    setBantuSuccessToast("Pembayaran talangan obat Rp 35.000 berhasil dikonfirmasi ke Pak Teddy via QRIS!");
    setTimeout(() => setBantuSuccessToast(null), 5000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-36 sm:pb-32 lg:pb-12 bg-[#F8FAFC]">

      {remindToast && (
        <div className="fixed top-4 inset-x-4 z-50 max-w-md mx-auto">
          <div className="bg-[#00624E] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center justify-between gap-3 border border-emerald-300/40 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2.5">
              <Check className="w-5 h-5 text-white stroke-[3] flex-shrink-0" />
              <p className="text-xs sm:text-sm font-bold">Pesan pengingat terkirim ke WhatsApp Ibu Lestari</p>
            </div>
            <button onClick={() => setRemindToast(false)} className="text-xs font-black px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full transition-all shrink-0 cursor-pointer">
              Tutup
            </button>
          </div>
        </div>
      )}

      {bantuSuccessToast && (
        <div className="fixed top-4 inset-x-4 z-50 max-w-md mx-auto">
          <div className="bg-[#00624E] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center justify-between gap-3 border border-emerald-300/40 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-white stroke-[2.5] flex-shrink-0" />
              <p className="text-xs sm:text-sm font-bold">{bantuSuccessToast}</p>
            </div>
            <button onClick={() => setBantuSuccessToast(null)} className="text-xs font-black px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full transition-all shrink-0 cursor-pointer">
              Tutup
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#00624E] text-white flex items-center justify-center font-black shadow-xs shrink-0">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-black text-slate-900">
                Dimas Prasetyo
              </h1>
              <span className="text-[10.5px] font-extrabold uppercase tracking-wider bg-emerald-50 text-[#00624E] border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Warga Siaga
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Domisili: RT 04 Sukamaju, Jakarta</span>
            </p>
          </div>
        </div>

        <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200/70 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("keluarga")}
            id="tab-keluarga"
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "keluarga"
                ? "bg-white text-[#00624E] shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {activeTab === "keluarga" && <Check className="w-4 h-4 stroke-[3]" />}
            <span>KELUARGA SAYA (2)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("tetangga")}
            id="tab-tetangga"
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "tetangga"
                ? "bg-white text-[#00624E] shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {activeTab === "tetangga" && <Check className="w-4 h-4 stroke-[3]" />}
            <span>BANTU TETANGGA SEKITAR</span>
          </button>
        </div>
      </div>

      {activeTab === "keluarga" ? (
        <div className="space-y-6 sm:space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#E6F4EA]/90 border border-emerald-200/80 rounded-3xl p-4 sm:p-5 shadow-2xs">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#00624E] text-white flex items-center justify-center shadow-xs shrink-0">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#00624E]">
                  Status Wilayah Pemantauan Jarak Jauh
                </p>
                <p className="text-sm sm:text-base font-black text-emerald-950">
                  Memantau kondisi Bapak Prabowo &amp; Ibu Lestari di Sleman, Yogyakarta
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 border border-emerald-300/80 shadow-2xs self-start sm:self-auto shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black text-[#00624E]">Koneksi Posko RT 04 Aktif</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

              <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F4EA] text-[#00624E] text-xs font-black">
                    <span className="w-2 h-2 rounded-full bg-[#00624E]" />
                    <span>Kabar Pagi (08:00 WIB)</span>
                  </span>
                  <span className="text-xs font-black text-[#00624E] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Sehat &amp; Aman</span>
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <IlluSeniorBapak />
                  <div className="min-w-0 space-y-0.5">
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                      Bapak Prabowo
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">68 Tahun • Blok C4 No. 12, Sleman</p>
                    <p className="text-xs font-bold text-[#00624E] pt-0.5">Tensi Terakhir: 120/80 mmHg (Normal)</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Obat harian diminum tepat waktu</span>
                  <Link
                    href="/anak/kesehatan"
                    className="px-4 py-2 bg-[#00624E] hover:bg-[#004d3d] text-white text-xs font-black rounded-2xl shadow-2xs flex items-center gap-1.5 active:scale-95 transition-all"
                  >
                    <span>Catatan Sehat</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-black">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span>Belum Check-in</span>
                  </span>
                  <span className="text-xs font-bold text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full">
                    Perlu Diingatkan
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <IlluSeniorIbu />
                  <div className="min-w-0 space-y-0.5">
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                      Ibu Lestari
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">65 Tahun • Blok C4 No. 12, Sleman</p>
                    <p className="text-xs font-bold text-amber-700 pt-0.5">Belum kirim kabar sejak semalam</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Kirim sapaan WhatsApp</span>
                  <button
                    type="button"
                    onClick={handleRemind}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white text-xs font-black rounded-2xl shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>Ingatkan</span>
                  </button>
                </div>
              </div>

            </div>

            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="font-black text-slate-900 text-sm sm:text-base">
                    Relawan Siaga RT 04 Sleman
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-slate-400">Radius 150m</span>
              </div>

              <div className="space-y-2 flex-1">
                {RELAWAN_NEARBY.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRelawan(r)}
                    className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-all border border-slate-100 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-2xl ${r.avatarBg} text-white flex items-center justify-center font-black text-xs shadow-2xs shrink-0 group-hover:scale-105 transition-transform`}>
                        {r.inisial}
                      </div>
                      <div className="min-w-0">
                        <p className="font-black text-slate-900 text-xs sm:text-sm truncate">{r.nama}</p>
                        <p className="text-slate-400 text-[11px] font-medium truncate">{r.peran}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black text-[#00624E] bg-[#E6F4EA] px-2.5 py-1 rounded-full shrink-0">
                        {r.jarak}
                      </span>
                      <Phone className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00624E] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-400 font-medium text-center pt-1 border-t border-slate-100">
                Warga tetangga di Sleman siap membantu orang tua Anda.
              </p>
            </div>

          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Layanan Cepat Warga</span>
                <h2 className="font-black text-slate-900 text-lg sm:text-xl leading-tight">
                  Titipkan Kebutuhan ke Sleman
                </h2>
              </div>
              <Link
                href="/anak/riwayat"
                className="text-xs font-black text-[#00624E] hover:underline flex items-center gap-1"
              >
                <span>Riwayat Titipan</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className="group bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all active:scale-[0.98] flex flex-col justify-between min-h-[160px] sm:min-h-[180px]"
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center ${cat.containerBg} ${cat.iconColor} shadow-2xs group-hover:scale-105 transition-transform`}>
                    {cat.icon}
                  </div>
                  <div className="mt-4 space-y-0.5">
                    <p className="font-black text-base sm:text-lg leading-tight text-slate-900 group-hover:text-[#00624E] transition-colors">
                      {cat.label}
                    </p>
                    <p className="text-xs font-medium text-slate-500 truncate">
                      {cat.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between min-h-[250px]">
              <div>
                <div className="flex items-center">
                  <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#E6F4EA] text-[#00624E] border border-emerald-200/80 text-[11px] sm:text-xs font-black">
                    <span className="w-2 h-2 rounded-full bg-[#00624E] animate-pulse" />
                    <span>Sedang Diantar (ETA ~12 mnt)</span>
                  </span>
                </div>

                <div className="mt-4 space-y-1">
                  <h3 className="font-black text-base sm:text-lg text-slate-900 leading-snug">
                    Obat Darah Tinggi (Amlodipin)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    Pak Teddy sedang menuju rumah Bapak
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="tel:08123456789"
                  id="btn-call-pak-teddy"
                  className="w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm text-white shadow-xs bg-[#00624E] hover:bg-[#004d3d] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>Hubungi Pak Teddy</span>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between min-h-[250px]">
              <div>
                <div className="flex items-center">
                  <span className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-black border ${
                    qrisPaid 
                      ? "bg-[#E6F4EA] text-[#00624E] border-emerald-200" 
                      : "bg-amber-50 text-amber-800 border-amber-200/80"
                  }`}>
                    {qrisPaid ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3] text-[#00624E]" />
                        <span>Lunas via QRIS</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        <span>Tagihan Belum Lunas</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="mt-4 space-y-1">
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    Rp 35.000
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    1 Strip Amlodipin di Apotek K-24
                  </p>
                </div>
              </div>

              <div className="pt-4">
                {!qrisPaid ? (
                  <button
                    type="button"
                    id="btn-bayar-qris"
                    onClick={() => setShowQrisModal(true)}
                    className="w-full py-3.5 rounded-2xl bg-[#00624E] hover:bg-[#004d3d] active:scale-[0.98] text-white font-black text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <QrCode className="w-4 h-4 stroke-[2.2]" />
                    <span>Bayar via QRIS</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowQrisModal(true)}
                    className="w-full py-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-[#00624E] border border-emerald-200/90 font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Lihat Bukti QRIS Lunas</span>
                  </button>
                )}
              </div>
            </div>

            <div className="bg-[#FEF2F2] rounded-3xl border border-red-200/90 p-5 sm:p-6 shadow-xs hover:border-red-300 hover:shadow-sm transition-all flex flex-col justify-between min-h-[250px]">
              <div>
                <div className="flex items-center">
                  <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-red-100/90 text-red-700 border border-red-200 text-[11px] sm:text-xs font-black">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                    <span>Siaga 24 Jam</span>
                  </span>
                </div>

                <div className="mt-4 space-y-1">
                  <h3 className="font-black text-base sm:text-lg text-red-900 leading-snug">
                    Bantuan Darurat Ortu
                  </h3>
                  <p className="text-xs sm:text-sm text-red-600 font-medium leading-relaxed">
                    Picu alarm siaga relawan terdekat di Sleman
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/anak/bantuan?darurat=1"
                  id="btn-sos-bottom-anak"
                  className="w-full py-3.5 rounded-2xl bg-[#DC2626] hover:bg-[#b91c1c] active:scale-[0.98] text-white font-black text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 text-center group cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4 group-hover:scale-110 transition-transform animate-pulse" />
                  <span>Minta Bantuan Darurat</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">

          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${siapMembantu ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
                <h3 className="font-black text-slate-900 text-base sm:text-lg">
                  Status Siap Membantu: {siapMembantu ? "Aktif" : "Non-Aktif"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl">
                {siapMembantu
                  ? "Ponsel Anda akan menerima notifikasi jika tetangga lansia di RT 04 Sukamaju, Jakarta memerlukan bantuan mikro."
                  : "Anda sedang beristirahat. Aktifkan status untuk mulai menerima permintaan bantuan dari tetangga."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSiapMembantu(!siapMembantu)}
              className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer ${
                siapMembantu
                  ? "bg-[#00624E] hover:bg-[#004d3d] text-white shadow-xs active:scale-95"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              <Check className={`w-4 h-4 stroke-[3] ${siapMembantu ? "opacity-100" : "opacity-0"}`} />
              <span>{siapMembantu ? "Siap Membantu (Aktif)" : "Aktifkan Status"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F4EA] text-[#00624E] flex items-center justify-center font-black shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">3 Kali</p>
                <p className="text-xs text-slate-500 font-medium">Membantu Bulan Ini</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-black shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">30 Poin</p>
                <p className="text-xs text-slate-500 font-medium">Gotong Royong RT 04</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center font-black shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">150m</p>
                <p className="text-xs text-slate-500 font-medium">Radius Siaga Jakarta</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-1">
              <div>
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">
                  Permintaan Terbuka
                </span>
                <h2 className="font-black text-slate-900 text-lg sm:text-xl">
                  Tetangga Lansia Sekitar Membutuhkan Bantuan
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                RT 04 Sukamaju, Jakarta
              </span>
            </div>

            <div className="space-y-4">
              {TETANGGA_REQUESTS.map((item) => {
                const isClaimed = claimedList.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-3xl border p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5 transition-all ${
                      isClaimed ? "border-emerald-300 bg-[#E6F4EA]/30" : "border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${item.iconBg} ${item.iconColor}`}>
                          {item.kategori}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">• {item.waktu}</span>
                        {isClaimed && (
                          <span className="text-xs font-black text-[#00624E] bg-white border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Tugas Diambil oleh Anda</span>
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900">
                          {item.nama} ({item.usia})
                        </h3>
                        <p className="text-xs font-bold text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.lokasi}</span>
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        &quot;{item.detail}&quot;
                      </p>

                      {isClaimed && (
                        <div className="p-3 rounded-2xl bg-white border border-emerald-200/90 text-xs space-y-0.5">
                          <div className="flex items-center justify-between flex-wrap gap-1">
                            <span className="font-bold text-[#00624E]">Alamat Asli &amp; Nomor Rumah:</span>
                            <span className="font-black text-slate-900">{item.alamatLengkap}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-medium">Alamat lengkap terbuka untuk navigasi setelah tugas diklaim.</p>
                        </div>
                      )}
                    </div>

                    {!isClaimed ? (
                      <button
                        type="button"
                        onClick={() => setSelectedTetangga(item)}
                        className="px-6 py-3.5 rounded-2xl bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                      >
                        <HandHeart className="w-4 h-4" />
                        <span>Saya Bantu</span>
                      </button>
                    ) : (
                      <span className="px-5 py-3 rounded-2xl bg-[#E6F4EA] text-[#00624E] font-black text-xs sm:text-sm border border-emerald-200 flex items-center justify-center gap-2 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Sedang Anda Bantu</span>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {selectedRelawan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setSelectedRelawan(null)} />
          <div className="relative bg-white rounded-3xl w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-4 animate-in zoom-in-95 duration-200">
            <div className={`w-14 h-14 mx-auto rounded-2xl ${selectedRelawan.avatarBg} text-white flex items-center justify-center font-black text-lg shadow-2xs`}>
              {selectedRelawan.inisial}
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">{selectedRelawan.nama}</h3>
              <p className="text-[#00624E] text-xs font-bold mt-0.5">{selectedRelawan.peran} — Posko RT 04</p>
              <div className="inline-block px-3 py-1 rounded-full bg-[#E6F4EA] border border-emerald-200 text-[#00624E] text-xs font-black my-2">
                {selectedRelawan.jarak} dari rumah orang tua
              </div>
              <p className="text-xs text-slate-400 font-medium">{selectedRelawan.lokasi}</p>
            </div>
            <div className="space-y-2 pt-2">
              <Link
                href="/anak/bantuan"
                onClick={() => setSelectedRelawan(null)}
                className="w-full py-3.5 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>Titipkan Bantuan ke {selectedRelawan.nama}</span>
              </Link>
              <button
                type="button"
                onClick={() => setSelectedRelawan(null)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-2xl transition-all cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedTetangga && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setSelectedTetangga(null)} />
          <div className="relative bg-white rounded-3xl w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E6F4EA] text-[#00624E] flex items-center justify-center font-black text-lg shadow-2xs">
              <HandHeart className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Konfirmasi Ambil Tugas
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">
                Bantu {selectedTetangga.nama}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {selectedTetangga.lokasi}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs space-y-2">
              <div>
                <p className="font-bold text-slate-700">Kebutuhan:</p>
                <p className="text-slate-600 font-medium leading-relaxed mt-0.5">
                  &quot;{selectedTetangga.detail}&quot;
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200/60">
                <span className="text-[11px] text-slate-400 font-medium">
                  Alamat lengkap &amp; nomor rumah akan terbuka secara otomatis setelah tugas Anda klaim demi privasi warga.
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => handleClaimBantu(selectedTetangga)}
                className="w-full py-3.5 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Saya Siap Membantu Sekarang</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedTetangga(null)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-2xl transition-all cursor-pointer"
              >
                Batalkan
              </button>
            </div>
          </div>
        </div>
      )}

      {showQrisModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowQrisModal(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00624E]">
                  Pembayaran Gotong Royong
                </span>
                <h3 className="text-base font-black text-slate-900 leading-tight">
                  QRIS Talangan Obat
                </h3>
              </div>
              <button
                onClick={() => setShowQrisModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Penerima Dana:</span>
                <span className="font-bold text-slate-800">Pak Teddy (Relawan RT 04)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Item Pembelian:</span>
                <span className="font-bold text-slate-800">1 Strip Amlodipin 5mg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Apotek Pembelian:</span>
                <span className="font-bold text-slate-800">Apotek K-24 Gejayan</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200/70">
                <span className="text-slate-500 font-black">Total Talangan:</span>
                <span className="font-black text-base text-[#00624E]">Rp 35.000</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="font-black text-xs tracking-wider text-slate-800">QRIS STANDAR BI</span>
                <span className="text-[10px] font-bold text-slate-400">Nol Biaya Admin</span>
              </div>
              
              <div className="w-48 h-48 mx-auto bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-center relative">
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900" fill="currentColor">
                  <rect x="0" y="0" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" rx="3" />
                  <rect x="7" y="7" width="14" height="14" rx="2" />
                  <rect x="72" y="0" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" rx="3" />
                  <rect x="79" y="7" width="14" height="14" rx="2" />
                  <rect x="0" y="72" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" rx="3" />
                  <rect x="7" y="79" width="14" height="14" rx="2" />
                  <rect x="36" y="8" width="6" height="6" />
                  <rect x="46" y="8" width="6" height="14" />
                  <rect x="58" y="14" width="6" height="8" />
                  <rect x="8" y="36" width="14" height="6" />
                  <rect x="28" y="36" width="6" height="14" />
                  <rect x="66" y="36" width="10" height="6" />
                  <rect x="82" y="36" width="10" height="12" />
                  <rect x="36" y="58" width="14" height="6" />
                  <rect x="58" y="56" width="8" height="12" />
                  <rect x="72" y="56" width="8" height="8" />
                  <rect x="86" y="56" width="6" height="18" />
                  <rect x="36" y="72" width="10" height="10" />
                  <rect x="52" y="72" width="12" height="6" />
                  <rect x="52" y="84" width="6" height="10" />
                  <rect x="64" y="80" width="8" height="14" />
                  <rect x="34" y="34" width="32" height="32" rx="6" fill="white" />
                </svg>
                <div className="absolute inset-0 m-auto w-10 h-10 rounded-xl bg-white p-1 shadow-xs border border-slate-200 flex items-center justify-center">
                  <div className="w-full h-full rounded-lg bg-[#00624E] text-white flex items-center justify-center font-black text-[10px]">
                    QRIS
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 font-medium">
                Pindai dengan BCA, Livin, GoPay, OVO, ShopeePay, atau m-Banking apa pun.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {!qrisPaid ? (
                <button
                  type="button"
                  id="btn-confirm-qris-modal"
                  onClick={handleConfirmQris}
                  className="w-full py-3.5 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Konfirmasi Pembayaran Berhasil</span>
                </button>
              ) : (
                <div className="p-3 bg-[#E6F4EA] border border-emerald-200 rounded-2xl text-center">
                  <p className="text-xs font-black text-[#00624E] flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Pembayaran Telah Diterima Pak Teddy</span>
                  </p>
                </div>
              )}
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

    </div>
  );
}
