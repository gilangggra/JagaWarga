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
  X, 
  ShieldCheck,
  Info,
  Volume2
} from "lucide-react";
import { speakIndonesian } from "@/lib/speak";

interface AlkesItem {
  id: string;
  nama: string;
  status: "tersedia" | "dipinjam";
  badgeText: string;
  badgeBg: string;
  containerBg: string;
  photoSrc: string;
  desc: string;
  metaText: string;
  lokasi: string;
  pengantaran: string;
  peminjam?: string;
  kembali?: string;
  spesifikasi: { label: string; value: string }[];
}

const ALKES_LIST: AlkesItem[] = [
  {
    id: "kursi-roda",
    nama: "Kursi Roda Lipat Ringan",
    status: "tersedia",
    badgeText: "2 Tersedia di Pos RT",
    badgeBg: "bg-[#E6F4EA] text-[#00624E] border-[#00624E]/20",
    containerBg: "bg-[#E6F4EA]/60",
    photoSrc: "/alkes-kursi-roda.jpg",
    desc: "Ringan, bisa dilipat masuk mobil untuk kontrol ke dokter atau posyandu.",
    metaText: "Pos RT 04 • Antar < 5 Menit",
    lokasi: "Pos RT 04 (2 Unit)",
    pengantaran: "Siap Antar (< 5 Menit)",
    spesifikasi: [
      { label: "Kenyamanan Duduk", value: "Busa empuk dengan sandaran punggung" },
      { label: "Kemudahan Lipat", value: "Rangka ringan, bisa dilipat masuk mobil" },
      { label: "Keamanan Rem", value: "Rem tangan ganda di pegangan & roda" },
      { label: "Biaya Pinjam", value: "Gratis Kas RT (Bebas Biaya)" },
    ],
  },
  {
    id: "tabung-o2",
    nama: "Tabung Oksigen Siaga Bernapas",
    status: "dipinjam",
    badgeText: "Sedang Dipinjam",
    badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
    containerBg: "bg-amber-50/70",
    photoSrc: "/alkes-tabung-o2.jpg",
    desc: "Tabung oksigen darurat siap pakai dengan selang kanula steril baru.",
    metaText: "Dipinjam: Bu Siti (Blok D2) • Kembali: Besok",
    lokasi: "Blok D2 (Sedang digunakan)",
    pengantaran: "Antre Pengembalian",
    peminjam: "Bu Siti (Blok D2)",
    kembali: "Besok Sore (16:00 WIB)",
    spesifikasi: [
      { label: "Kesiapan Oksigen", value: "Gas oksigen medis murni terisi penuh" },
      { label: "Perlengkapan", value: "Regulator & selang kanula steril baru" },
      { label: "Peminjam Saat Ini", value: "Ibu Siti (Blok D2, No. 04)" },
      { label: "Estimasi Kembali", value: "Besok Sore (16:00 WIB)" },
    ],
  },
  {
    id: "alat-tensi",
    nama: "Alat Cek Tensi Darah Otomatis",
    status: "tersedia",
    badgeText: "2 Tersedia di Pos RT",
    badgeBg: "bg-[#E6F4EA] text-[#00624E] border-[#00624E]/20",
    containerBg: "bg-[#E6F4EA]/60",
    photoSrc: "/alkes-tensimeter.jpg",
    desc: "Cukup pasang manset di lengan dan pencet satu tombol, tensi langsung terbaca.",
    metaText: "Pos RT 04 • Antar < 5 Menit",
    lokasi: "Pos RT 04 (2 Unit)",
    pengantaran: "Siap Antar (< 5 Menit)",
    spesifikasi: [
      { label: "Cara Pakai Praktis", value: "Cukup pasang di lengan & pencet tombol start" },
      { label: "Tampilan Layar", value: "Layar digital angka besar & jelas terbaca" },
      { label: "Pemeriksaan", value: "Mendeteksi tekanan darah & detak jantung" },
      { label: "Biaya Pinjam", value: "Gratis Kas RT (Bebas Biaya)" },
    ],
  },
  {
    id: "tongkat",
    nama: "Tongkat Kaki Empat Kokoh",
    status: "tersedia",
    badgeText: "3 Tersedia di Pos RT",
    badgeBg: "bg-[#E6F4EA] text-[#00624E] border-[#00624E]/20",
    containerBg: "bg-[#E6F4EA]/60",
    photoSrc: "/alkes-tongkat-jalan.jpg",
    desc: "Sangat stabil untuk menyangga langkah kaki, dengan 4 karet anti-peleset.",
    metaText: "Pos RT 04 • Antar < 5 Menit",
    lokasi: "Pos RT 04 (3 Unit)",
    pengantaran: "Siap Antar (< 5 Menit)",
    spesifikasi: [
      { label: "Kestabilan", value: "Paling stabil menyangga tubuh saat berjalan" },
      { label: "Tinggi Tongkat", value: "Bisa disetel pas dengan tinggi badan Bapak" },
      { label: "Ujung Kaki", value: "4 bantalan karet tebal anti-licin" },
      { label: "Kondisi Alat", value: "Bersih, kokoh, dan langsung siap pakai" },
    ],
  },
];

export default function AlkesPage() {
  const [selectedAlkes, setSelectedAlkes] = useState<AlkesItem | null>(null);
  const [detailAlkes, setDetailAlkes] = useState<AlkesItem | null>(null);
  const [pinjamSuccess, setPinjamSuccess] = useState<string | null>(null);
  const [reminderSuccess, setReminderSuccess] = useState<string | null>(null);

  const handlePinjam = (nama: string) => {
    setSelectedAlkes(null);
    setPinjamSuccess(nama);
    setTimeout(() => setPinjamSuccess(null), 5000);
  };

  const handleSetReminder = (nama: string) => {
    setReminderSuccess(nama);
    setTimeout(() => setReminderSuccess(null), 5000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-32 lg:pb-12 bg-[#F8FAFC]">
      
      
      <div>
        <Link
          href="/lansia"
          id="btn-back-alkes"
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-700 hover:text-[#00624E] font-black text-xs sm:text-sm shadow-2xs transition-all active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#00624E] group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Pinjam Alkes Kas RT 04
          </h1>
          <p className="text-sm sm:text-base font-medium text-slate-500">
            Fasilitas alat kesehatan gratis untuk warga, siap diantar relawan dalam &lt;5 menit.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            speakIndonesian("Peminjaman Alat Kesehatan Kas RT 04. Tersedia Kursi Roda Lipat Ringan, Tabung Oksigen Siaga Bernapas, Alat Cek Tensi Darah Otomatis, dan Tongkat Kaki Empat. Seluruh alat gratis dan siap diantar relawan siaga ke rumah Bapak.");
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-[#00624E] border border-emerald-200 text-xs sm:text-sm font-black transition-all active:scale-95 shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
          <span>Dengarkan Panduan Suara</span>
        </button>
      </div>

      
      {pinjamSuccess && (
        <div className="bg-[#00624E] text-white p-4 sm:p-5 rounded-3xl shadow-sm flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-white stroke-[3]" />
            </div>
            <div>
              <p className="font-black text-sm">Permintaan Pinjam Berhasil Diteruskan</p>
              <p className="text-emerald-100 text-xs font-medium mt-0.5">
                <strong>{pinjamSuccess}</strong> akan segera diantar relawan siaga ke rumah Bapak Prabowo.
              </p>
            </div>
          </div>
          <Link
            href="/lansia/status"
            className="px-4 py-2 bg-white text-[#00624E] font-black text-xs rounded-full shadow-xs hover:bg-emerald-50 active:scale-95 transition-all shrink-0"
          >
            Lihat Status
          </Link>
        </div>
      )}

      
      {reminderSuccess && (
        <div className="bg-amber-600 text-white p-4 sm:p-5 rounded-3xl shadow-sm flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-sm">Pengingat Berhasil Diaktifkan</p>
              <p className="text-amber-100 text-xs font-medium mt-0.5">
                Notifikasi otomatis akan dikirim ke WhatsApp segera setelah <strong>{reminderSuccess}</strong> kembali ke Pos RT.
              </p>
            </div>
          </div>
          <button
            onClick={() => setReminderSuccess(null)}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-black text-xs rounded-full transition-all shrink-0"
          >
            Mengerti
          </button>
        </div>
      )}

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
        {ALKES_LIST.map((alkes) => {
          const isTersedia = alkes.status === "tersedia";

          return (
            <div
              key={alkes.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all duration-200 flex flex-col justify-between p-5 sm:p-6 space-y-5"
            >
              
              <div className="space-y-4">
                
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${alkes.badgeBg}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isTersedia ? "bg-[#00624E]" : "bg-amber-600"}`} />
                    <span>{alkes.badgeText}</span>
                  </span>

                  <button
                    onClick={() => setDetailAlkes(alkes)}
                    className="text-slate-400 hover:text-slate-700 transition-colors p-1"
                    title="Lihat Spesifikasi & Detail"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>

                
                <div
                  onClick={() => setDetailAlkes(alkes)}
                  className={`w-full h-48 sm:h-52 rounded-2xl ${alkes.containerBg} flex items-center justify-center p-3 relative overflow-hidden cursor-pointer group transition-transform duration-300 active:scale-[0.99]`}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xs">
                    <Image
                      src={alkes.photoSrc}
                      alt={`Foto ${alkes.nama}`}
                      fill
                      className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                        !isTersedia ? "grayscale-[0.3] opacity-90" : ""
                      }`}
                      sizes="(max-width: 768px) 100vw, 550px"
                    />
                  </div>
                </div>

                
                <div className="space-y-1">
                  <h3 className="font-black text-slate-900 text-base sm:text-lg leading-snug">
                    {alkes.nama}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                    {alkes.desc}
                  </p>
                </div>

                
                <div className="pt-1">
                  {isTersedia ? (
                    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-600 w-full justify-between">
                      <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                        <MapPin className="w-3.5 h-3.5 text-[#00624E]" />
                        <span>Pos RT 04</span>
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1.5 font-black text-[#00624E]">
                        <Zap className="w-3.5 h-3.5 fill-[#00624E]" />
                        <span>Antar &lt; 5 Menit</span>
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50/70 border border-amber-200/90 text-xs font-semibold text-amber-900 w-full justify-between">
                      <span className="flex items-center gap-1.5 truncate font-bold text-amber-950">
                        <User className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span className="truncate">Bu Siti (Blok D2)</span>
                      </span>
                      <span className="text-amber-300">•</span>
                      <span className="flex items-center gap-1.5 font-black text-amber-900 shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-amber-700" />
                        <span>Kembali: Besok</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              
              <div>
                {isTersedia ? (
                  <button
                    onClick={() => setSelectedAlkes(alkes)}
                    className="w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm text-white shadow-sm bg-[#00624E] hover:bg-[#004d3d] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Ajukan Pinjam Gratis</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                ) : (
                  <button
                    type="button"
                    id="btn-ingatkan-alkes"
                    onClick={() => handleSetReminder(alkes.nama)}
                    className="w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm text-[#78350F] bg-[#FEF3C7] hover:bg-[#FDE68A] border-2 border-[#F59E0B]/70 shadow-xs active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Bell className="w-4 h-4 text-[#92400E] stroke-[2.5]" />
                    <span>Ingatkan Saat Tersedia</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="font-black text-slate-900 text-sm sm:text-base">
              Ingin Berdonasi Alkes untuk Warga?
            </p>
            <p className="text-slate-500 text-xs font-medium mt-0.5">
              Hubungi pengurus RT 04 untuk menyumbangkan alat kesehatan demi kemanfaatan bersama.
            </p>
          </div>
        </div>
        <a
          href="tel:08123456788"
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-sm transition-all text-center shrink-0 active:scale-95"
        >
          Hubungi Pengurus RT
        </a>
      </div>

      
      {selectedAlkes && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setSelectedAlkes(null)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm shadow-2xl border border-slate-100 z-10 overflow-hidden p-6 space-y-4 text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E6F4EA] text-[#00624E] flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div>
              <span className="inline-block px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#00624E] text-xs font-black mb-1.5">
                Pinjam Bebas Biaya
              </span>
              <h3 className="text-lg font-black text-slate-900 leading-tight">
                Konfirmasi Pinjam {selectedAlkes.nama}
              </h3>
              <p className="text-slate-500 text-xs font-medium mt-1">
                Alat akan diantar langsung ke rumah <strong>Bapak Prabowo (Blok C4, No. 12)</strong> oleh relawan siaga.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-3.5 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Durasi Pinjam:</span>
                <span className="font-bold text-slate-800">Sesuai Kebutuhan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Biaya:</span>
                <span className="font-black text-[#00624E]">Rp 0 (Gratis Kas RT)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Pengantar:</span>
                <span className="font-bold text-slate-800">Budi Santoso (50m)</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => handlePinjam(selectedAlkes.nama)}
                className="w-full py-3.5 rounded-2xl font-black text-xs text-white shadow-sm bg-[#00624E] hover:bg-[#004d3d] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Konfirmasi &amp; Antar Sekarang</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                onClick={() => setSelectedAlkes(null)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-2xl transition-all"
              >
                Batalkan
              </button>
            </div>
          </div>
        </div>
      )}

      
      {detailAlkes && (
        <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setDetailAlkes(null)}
          />
          <div className="relative bg-white w-full sm:max-w-md rounded-t-[32px] sm:rounded-[32px] shadow-2xl border border-slate-100 z-10 overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">
            <div className="relative w-full h-52 sm:h-56 flex-shrink-0 bg-slate-100">
              <Image
                src={detailAlkes.photoSrc}
                alt={`Foto ${detailAlkes.nama}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <button
                onClick={() => setDetailAlkes(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center active:scale-95 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <span className={`text-[10px] font-black px-3 py-0.5 rounded-full border ${detailAlkes.badgeBg}`}>
                  {detailAlkes.badgeText}
                </span>
                <span className="text-[10px] font-black px-3 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-slate-800 border border-white/50">
                  Pos RT 04
                </span>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-black text-slate-900 text-lg leading-tight truncate">{detailAlkes.nama}</h3>
                  <p className="text-slate-500 text-xs font-medium mt-1 leading-relaxed">{detailAlkes.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const speechText = `${detailAlkes.nama}. ${detailAlkes.desc}. ${detailAlkes.spesifikasi.map((s) => s.label + ': ' + s.value).join('. ')}`;
                    speakIndonesian(speechText);
                  }}
                  className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-[#00624E] border border-emerald-200 transition-all shrink-0 cursor-pointer shadow-2xs active:scale-95"
                  title="Dengarkan Suara"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-4 space-y-2.5">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#00624E]">Manfaat &amp; Kemudahan Pakai</p>
                {detailAlkes.spesifikasi.map((spec) => (
                  <div key={spec.label} className="flex items-start justify-between gap-3 text-xs">
                    <span className="text-slate-400 font-medium flex-shrink-0">{spec.label}</span>
                    <span className="font-bold text-slate-800 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-1">
                {detailAlkes.status === "tersedia" ? (
                  <button
                    onClick={() => {
                      setDetailAlkes(null);
                      setSelectedAlkes(detailAlkes);
                    }}
                    className="w-full py-3.5 rounded-2xl font-black text-xs text-white shadow-sm bg-[#00624E] hover:bg-[#004d3d] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Ajukan Pinjam Gratis</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const nama = detailAlkes.nama;
                      setDetailAlkes(null);
                      handleSetReminder(nama);
                    }}
                    className="w-full py-3.5 rounded-2xl font-bold text-xs text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 shadow-2xs active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Bell className="w-4 h-4 text-amber-700" />
                    <span>Ingatkan Saat Tersedia</span>
                  </button>
                )}
                <button
                  onClick={() => setDetailAlkes(null)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-2xl transition-all"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
