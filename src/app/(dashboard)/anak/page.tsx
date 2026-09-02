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
  MessageSquare
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
    icon: <Pill className="w-7 h-7 stroke-[2.2]" />,
  },
  {
    id: "sayur",
    label: "Belanja Sayur",
    desc: "Warung RT & Kebutuhan Dapur",
    href: "/anak/bantuan?kategori=sayur",
    containerBg: "bg-[#FFEDD5]",
    iconColor: "text-[#EA580C]",
    icon: <ShoppingCart className="w-7 h-7 stroke-[2.2]" />,
  },
  {
    id: "alkes",
    label: "Pinjam Alkes",
    desc: "Kas RT Bebas Biaya",
    href: "/anak/alkes",
    containerBg: "bg-[#E6F4EA]",
    iconColor: "text-[#00624E]",
    icon: <Accessibility className="w-7 h-7 stroke-[2.2]" />,
  },
  {
    id: "kontrol",
    label: "Teman Kontrol",
    desc: "Posyandu & Puskesmas",
    href: "/anak/bantuan?kategori=kontrol",
    containerBg: "bg-[#F3E8FF]",
    iconColor: "text-[#9333EA]",
    icon: <Heart className="w-7 h-7 stroke-[2.2]" />,
  },
];

const AKTIVITAS_TERBARU = [
  { id: "1", jam: "10:42 WIB", judul: "Beli Obat Tensi (Amlodipin)", untuk: "Bapak Prabowo", status: "Sedang Berjalan", relawan: "Pak Teddy", statusBadge: "bg-sky-50 text-sky-800 border-sky-200" },
  { id: "2", jam: "08:00 WIB", judul: "Konfirmasi Kabar Pagi", untuk: "Bapak Prabowo", status: "Aman Terkonfirmasi", relawan: "Sistem JagaWarga", statusBadge: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  { id: "3", jam: "Kemarin", judul: "Belum Check-in Kabar", untuk: "Ibu Lestari", status: "Perlu Pengingat", relawan: "Keluarga", statusBadge: "bg-amber-50 text-amber-800 border-amber-200" },
];

function IlluSeniorBapak() {
  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#E6F4EA] flex items-center justify-center shrink-0">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 sm:w-16 sm:h-16">
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
      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#00624E] text-white flex items-center justify-center shadow-xs border-2 border-white">
        <Check className="w-3.5 h-3.5 stroke-[3]" />
      </div>
    </div>
  );
}

function IlluSeniorIbu() {
  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FEF3C7] flex items-center justify-center shrink-0">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 sm:w-16 sm:h-16">
        <circle cx="50" cy="50" r="42" fill="#FEF3C7" />
        <path d="M22 84 C22 66, 34 60, 50 60 C66 60, 78 66, 78 84 Z" fill="#FED7AA" />
        <path d="M28 84 C32 68, 68 68, 72 84 Z" fill="#FFFFFF" opacity="0.7" />
        <circle cx="50" cy="42" r="20" fill="#FED7AA" />
        <path d="M28 42 C28 22, 72 22, 72 42 C68 26, 32 26, 28 42 Z" fill="#64748B" />
        <ellipse cx="50" cy="24" rx="14" ry="6" fill="#64748B" />
        <circle cx="42" cy="40" r="6" fill="white" stroke="#0F172A" strokeWidth="2" />
        <circle cx="58" cy="40" r="6" fill="white" stroke="#0F172A" strokeWidth="2" />
        <line x1="48" y1="40" x2="52" y2="40" stroke="#0F172A" strokeWidth="2" />
        <circle cx="42" cy="40" r="2" fill="#0F172A" />
        <circle cx="58" cy="40" r="2" fill="#0F172A" />
        <path d="M45 52 Q50 56 55 52" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-xs border-2 border-white">
        <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
      </div>
    </div>
  );
}

export default function AnakDashboardPage() {
  const [remindToast, setRemindToast] = useState(false);
  const [selectedRelawan, setSelectedRelawan] = useState<Relawan | null>(null);

  const handleRemind = () => {
    setRemindToast(true);
    setTimeout(() => setRemindToast(false), 4000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-7 font-sans pb-36 sm:pb-32 lg:pb-12 bg-[#F8FAFC]">

      
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

      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-[#00624E] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              Pemantauan Aktif
            </span>
            <span className="text-xs text-slate-400 font-bold">• Sleman, Yogyakarta</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Selamat Pagi, Ibu Titiek
          </h1>
          <p className="text-sm sm:text-base font-medium text-slate-500">
            Berikut ringkasan kabar harian, kondisi kesehatan, dan titipan bantuan untuk orang tua.
          </p>
        </div>

        <Link
          href="/anak/status"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 text-xs font-bold text-slate-700 hover:text-[#00624E] shadow-2xs transition-all active:scale-95 shrink-0 self-start sm:self-auto"
        >
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          <span>1 Titipan Sedang Jalan</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </Link>
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
                <h2 className="text-lg font-black text-slate-900 leading-tight">
                  Bapak Prabowo
                </h2>
                <p className="text-xs text-slate-500 font-medium">68 Tahun • Blok C4 No. 12</p>
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
                <h2 className="text-lg font-black text-slate-900 leading-tight">
                  Ibu Lestari
                </h2>
                <p className="text-xs text-slate-500 font-medium">65 Tahun • Blok C4 No. 12</p>
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
                Relawan Siaga RT 04
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
                  <span className="text-[11px] font-black text-[#00624E] bg-[#E6F4EA] px-2 py-0.5 rounded-full shrink-0">
                    {r.jarak}
                  </span>
                  <Phone className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00624E] transition-colors" />
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 font-medium text-center pt-1 border-t border-slate-100">
            Warga tetangga siap dimintai tolong cek fisik atau belikan obat.
          </p>
        </div>

      </div>

      
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Gotong Royong</span>
            <h2 className="font-black text-slate-900 text-lg sm:text-xl leading-tight">
              Titipkan Kebutuhan ke Relawan
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all active:scale-[0.98] flex flex-col justify-between min-h-[150px] sm:min-h-[160px]"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center ${cat.containerBg} ${cat.iconColor} shadow-2xs group-hover:scale-105 transition-transform`}>
                {cat.icon}
              </div>
              <div className="mt-3 space-y-0.5">
                <p className="font-black text-base leading-tight text-slate-900 group-hover:text-[#00624E] transition-colors">
                  {cat.label}
                </p>
                <p className="text-xs font-medium text-slate-400 truncate">
                  {cat.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        
        
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Pembaruan Terkini</span>
              <h3 className="font-black text-slate-900 text-sm sm:text-base leading-tight">
                Aktivitas &amp; Laporan Relawan
              </h3>
            </div>
            <Link href="/anak/riwayat" className="text-xs font-bold text-slate-400 hover:text-[#00624E]">
              Lihat Semua
            </Link>
          </div>

          <div className="space-y-2.5">
            {AKTIVITAS_TERBARU.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[11px] font-black text-slate-600 bg-white px-2 py-1 rounded-xl border border-slate-200 shrink-0">
                    {a.jam}
                  </span>
                  <div className="min-w-0">
                    <p className="font-black text-slate-900 text-xs sm:text-sm truncate">{a.judul}</p>
                    <p className="text-slate-400 text-[11px] font-medium truncate">Untuk: {a.untuk} • {a.relawan}</p>
                  </div>
                </div>
                <span className={`text-[10.5px] font-black px-2.5 py-1 rounded-full border shrink-0 ${a.statusBadge}`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        
        <div className="lg:col-span-5 flex flex-col justify-between gap-3.5">
          
          <Link
            href="/anak/bantuan"
            className="group flex items-center justify-between p-5 rounded-3xl bg-[#00624E] hover:bg-[#004d3d] active:scale-[0.98] text-white shadow-xs transition-all flex-1"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                <HandHeart className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Gotong Royong RT</span>
                <h4 className="text-base font-black leading-tight">Titip Bantuan Baru</h4>
                <p className="text-xs text-emerald-100 font-medium mt-0.5">Obat, sayur, atau cek kondisi fisik</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/70 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>

          <Link
            href="/anak/bantuan?darurat=1"
            className="group flex items-center justify-between p-5 rounded-3xl bg-white hover:bg-rose-50/50 border border-rose-200 active:scale-[0.98] text-slate-900 shadow-xs transition-all flex-1"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-[#DC2626] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Siaga 24 Jam</span>
                <h4 className="text-base font-black leading-tight text-slate-900">Bantuan Darurat Ortu</h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Respon cepat relawan terdekat (&lt; 15 mnt)</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>

        </div>

      </div>

      
      {selectedRelawan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setSelectedRelawan(null)} />
          <div className="relative bg-white rounded-3xl w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 space-y-4 animate-in fade-in zoom-in-95">
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
