"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeft, 
  Home, 
  HandHeart, 
  Activity, 
  Accessibility, 
  Heart, 
  AlertTriangle, 
  Check, 
  ArrowRight,
  BookOpen,
  Sparkles,
  Phone,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface PanduanStepAnak {
  id: string;
  nomor: string;
  judul: string;
  ringkas: string;
  icon: React.ReactNode;
  bg: string;
  text: string;
  langkah: string[];
}

const PANDUAN_STEPS_ANAK: PanduanStepAnak[] = [
  {
    id: "pantau",
    nomor: "1",
    judul: "Memantau Kabar Pagi Harian Ortu",
    ringkas: "Cek kepastian kabar sehat orang tua setiap pagi dari jarak jauh.",
    icon: <Home className="w-7 h-7 stroke-[2.2]" />,
    bg: "bg-[#E6F4EA]",
    text: "text-[#00624E]",
    langkah: [
      "Buka Portal Anak JagaWarga setiap pagi setelah pukul 08:00 WIB.",
      "Periksa kartu status orang tua (Bapak Prabowo & Ibu Lestari).",
      "Jika status bertuliskan 'Kabar Saya Sehat & Aman', artinya orang tua telah menekan tombol check-in.",
      "Jika hingga pukul 09:00 WIB belum check-in, sistem otomatis mengirimkan pengingat ke WhatsApp Anda dan Posko RT.",
    ],
  },
  {
    id: "titip",
    nomor: "2",
    judul: "Menitipkan Bantuan Mikro ke Relawan RT",
    ringkas: "Kirim titipan beli obat apotek, belanja sayur, atau teman kontrol.",
    icon: <HandHeart className="w-7 h-7 stroke-[2.2]" />,
    bg: "bg-[#FEE2E2]",
    text: "text-[#DC2626]",
    langkah: [
      "Pilih menu 'Titip Bantuan' dari sidebar atau beranda.",
      "Pilih kategori kebutuhan: Beli Obat, Belanja Sayur, atau Teman Kontrol.",
      "Tuliskan rincian barang/pesanan beserta apotek atau warung tujuan.",
      "Relawan terdekat dalam radius 150m akan mengklaim tugas dan membelikan untuk orang tua.",
    ],
  },
  {
    id: "status",
    nomor: "3",
    judul: "Melacak Perjalanan Relawan Real-Time",
    ringkas: "Pantau posisi relawan dari apotek hingga sampai di depan pintu rumah.",
    icon: <Activity className="w-7 h-7 stroke-[2.2]" />,
    bg: "bg-[#E6F4EA]",
    text: "text-[#00624E]",
    langkah: [
      "Buka menu 'Status Bantuan' untuk melihat garis waktu 4 tahap pengantaran.",
      "Ketahui nama relawan bertugas (misal: Pak Teddy) dan estimasi menit tiba.",
      "Gunakan tombol 'Chat WA' atau 'Telepon' untuk koordinasi langsung dengan relawan.",
      "Laporan foto serah terima otomatis terkirim ke WhatsApp Anda setelah barang diserahkan.",
    ],
  },
  {
    id: "alkes",
    nomor: "4",
    judul: "Peminjaman Alat Kesehatan Kas RT",
    ringkas: "Pinjam kursi roda, tensimeter, atau tabung oksigen gratis.",
    icon: <Accessibility className="w-7 h-7 stroke-[2.2]" />,
    bg: "bg-[#FFEDD5]",
    text: "text-[#EA580C]",
    langkah: [
      "Buka menu 'Pinjam Alkes' untuk melihat katalog ketersediaan di Balai RT 04.",
      "Pilih alat kesehatan yang dibutuhkan (Kursi Roda, Tensimeter, Oksimeter, dll).",
      "Tentukan masa pinjam (3 s/d 30 hari) dan ajukan permohonan.",
      "Relawan siaga RT akan mengantarkan alat langsung ke rumah orang tua tanpa biaya sewa.",
    ],
  },
  {
    id: "kesehatan",
    nomor: "5",
    judul: "Melihat Riwayat Tensi & Jadwal Obat",
    ringkas: "Pantau grafik tekanan darah dan ketersediaan stok obat kronis harian.",
    icon: <Heart className="w-7 h-7 stroke-[2.2]" />,
    bg: "bg-[#F3E8FF]",
    text: "text-[#9333EA]",
    langkah: [
      "Buka menu 'Catatan Sehat' untuk melihat riwayat pemeriksaan kader Posyandu.",
      "Pantau tren tensi darah (Sistol/Diastol) apakah berada di zona normal atau hipertensi.",
      "Periksa indikator stok obat harian (misal: Amlodipine) agar bisa ditebus sebelum habis.",
      "Ketahui tanggal jadwal pemeriksaan posyandu lansia berikutnya.",
    ],
  },
  {
    id: "darurat",
    nomor: "6",
    judul: "Bantuan Darurat Ortu (Eskalasi Cepat)",
    ringkas: "Pemicu respons siaga darurat jika orang tua mengalami insiden mendesak.",
    icon: <AlertTriangle className="w-7 h-7 stroke-[2.2]" />,
    bg: "bg-[#FEE2E2]",
    text: "text-[#DC2626]",
    langkah: [
      "Tekan tombol merah 'Bantuan Darurat Ortu' di sidebar atau bottom dock.",
      "Sistem membunyikan alarm di perangkat relawan siaga RT 04 dalam hitungan detik.",
      "Relawan terdekat langsung menuju lokasi (< 15 menit) untuk memeriksa keadaan fisik orang tua.",
      "Nomor kontak darurat keluarga dan ambulans terdekat otomatis tersambung.",
    ],
  },
];

export default function AnakPanduanPage() {
  const [expandedId, setExpandedId] = useState<string>("pantau");
  const [selesai, setSelesai] = useState<Set<string>>(new Set(["pantau"]));

  const toggleSelesai = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelesai((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const persen = Math.round((selesai.size / PANDUAN_STEPS_ANAK.length) * 100);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-36 sm:pb-32 lg:pb-12 bg-[#F8FAFC]">
      
      
      <div>
        <Link
          href="/anak"
          id="btn-back-panduan-anak"
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-700 hover:text-[#00624E] font-black text-xs sm:text-sm shadow-2xs transition-all active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#00624E] group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-[#00624E] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            Edukasi &amp; Panduan Pengguna
          </span>
          <span className="text-xs text-slate-400 font-bold">• Portal Keluarga</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Panduan Portal Keluarga JagaWarga
        </h1>
        <p className="text-sm sm:text-base font-medium text-slate-500">
          Pelajari cara memantau orang tua, menitipkan bantuan obat, dan berkoordinasi dengan relawan RT 04 dari jarak jauh.
        </p>
      </div>

      
      <div className="bg-gradient-to-br from-[#00624E] to-[#004d3e] rounded-3xl p-6 sm:p-7 text-white shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Panduan Praktis Keluarga</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black leading-tight">
            6 Langkah Merawat Orang Tua Jarak Jauh
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium max-w-xl leading-relaxed">
            Menghubungkan anak di perantauan dengan kepedulian gotong royong tetangga di lingkungan tempat tinggal orang tua.
          </p>
        </div>

        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center min-w-[200px] shrink-0 z-10">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">Progress Panduan</p>
          <p className="text-2xl sm:text-3xl font-black mt-0.5">{persen}%</p>
          <p className="text-xs text-white/80 font-bold mt-0.5">{selesai.size} dari {PANDUAN_STEPS_ANAK.length} Langkah Dipelajari</p>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        
        <div className="lg:col-span-8 space-y-4">
          {PANDUAN_STEPS_ANAK.map((step) => {
            const isExpanded = expandedId === step.id;
            const isDone = selesai.has(step.id);

            return (
              <div
                key={step.id}
                className={`bg-white rounded-3xl border transition-all duration-200 shadow-xs overflow-hidden ${
                  isExpanded ? "border-[#00624E] ring-1 ring-[#00624E]/20" : "border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? "" : step.id)}
                  className="p-5 sm:p-6 flex items-start gap-4 sm:gap-5 cursor-pointer select-none"
                >
                  
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${step.bg} ${step.text} flex items-center justify-center shrink-0 shadow-2xs`}>
                    {step.icon}
                  </div>

                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-black text-[#00624E] bg-[#E6F4EA] px-2.5 py-0.5 rounded-full">
                        Langkah {step.nomor}
                      </span>
                      {isDone && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                          <Check className="w-3 h-3 stroke-[3]" /> Dipahami
                        </span>
                      )}
                    </div>

                    <h3 className="font-black text-slate-900 text-base sm:text-lg leading-tight mt-1">
                      {step.judul}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
                      {step.ringkas}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => toggleSelesai(step.id, e)}
                      title={isDone ? "Tandai belum dibaca" : "Tandai sudah dipahami"}
                      className={`w-9 h-9 rounded-2xl border flex items-center justify-center transition-all cursor-pointer ${
                        isDone
                          ? "bg-[#00624E] text-white border-[#00624E] shadow-2xs"
                          : "border-slate-200 text-slate-400 hover:border-emerald-300 hover:text-[#00624E]"
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>
                    <div className="text-slate-400 p-1">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-slate-100 bg-slate-50/50">
                    <div className="pt-4 space-y-4">
                      <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">
                        Petunjuk Langkah Demi Langkah
                      </span>
                      <ol className="space-y-2.5">
                        {step.langkah.map((l, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-100 text-xs sm:text-sm font-bold text-slate-700 shadow-2xs leading-relaxed"
                          >
                            <span className="w-6 h-6 rounded-full bg-[#E6F4EA] text-[#00624E] flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span className="flex-1">{l}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-[#E6F4EA] text-[#00624E] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base leading-tight">Posko RT 04 Sleman</h3>
                <p className="text-xs text-slate-400 font-medium">Bantuan Siaga 24 Jam</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Jika mengalami kendala penggunaan atau membutuhkan koordinasi darurat langsung dengan pengurus RT:
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Ketua RT 04:</span>
                <span className="font-black text-slate-900">Pak Joko</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Koord. Relawan:</span>
                <span className="font-black text-slate-900">Pak Teddy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Kader Posyandu:</span>
                <span className="font-black text-slate-900">Bu Ani</span>
              </div>
            </div>

            <a
              href="tel:08123456788"
              className="w-full py-3 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Telepon Posko RT 04</span>
            </a>
          </div>

          
          <Link
            href="/anak"
            className="group flex items-center justify-between p-5 rounded-3xl bg-[#00624E] hover:bg-[#004d3d] active:scale-[0.98] text-white shadow-sm transition-all text-left"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Mulai Pemantauan</span>
              <h3 className="text-base font-black leading-tight">Buka Dashboard Pemantauan</h3>
              <p className="text-xs text-emerald-100 font-medium mt-0.5">Kondisi orang tua di Sleman</p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5 stroke-[2.2]" />
            </div>
          </Link>

        </div>

      </div>

    </div>
  );
}
