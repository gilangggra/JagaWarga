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
  Plus,
  PackageCheck,
  HeartHandshake,
  FileText,
  CheckCircle2,
  Activity,
  Accessibility,
  Heart,
  Sparkles
} from "lucide-react";

export interface AlkesItem {
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
  kategori?: string;
  donatur?: string;
  spesifikasi: { label: string; value: string }[];
}

const INITIAL_ALKES_LIST: AlkesItem[] = [
  {
    id: "kursi-roda",
    nama: "Kursi Roda Lipat Medis",
    status: "tersedia",
    kategori: "Mobilitas",
    badgeText: "2 Tersedia di Pos RT",
    badgeBg: "bg-[#E6F4EA] text-[#00624E] border-[#00624E]/20",
    containerBg: "bg-[#E6F4EA]/60",
    photoSrc: "/alkes-kursi-roda.jpg",
    desc: "Ringan, mudah dilipat, dengan rem tangan ganda & pijakan kaki nyaman untuk orang tua.",
    metaText: "Pos RT 04 • Antar < 5 Menit",
    lokasi: "Pos RT 04 (2 Unit)",
    pengantaran: "Siap Antar (< 5 Menit)",
    spesifikasi: [
      { label: "Material", value: "Aluminium ringan anti-karat" },
      { label: "Kapasitas Beban", value: "Maks. 120 kg" },
      { label: "Lebar Dudukan", value: "45 cm ergonomis" },
      { label: "Kondisi", value: "Bersih, steril & siap pakai" },
    ],
  },
  {
    id: "tabung-o2",
    nama: "Tabung Oksigen 1m³ + Regulator",
    status: "dipinjam",
    kategori: "Pernapasan",
    badgeText: "Sedang Dipinjam",
    badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
    containerBg: "bg-amber-50/70",
    photoSrc: "/alkes-tabung-o2.jpg",
    desc: "Lengkap dengan regulator flow-meter & selang kanula steril baru untuk keadaan darurat.",
    metaText: "Dipinjam: Bu Siti (Blok D2) • Kembali: Besok",
    lokasi: "Blok D2 (Sedang digunakan)",
    pengantaran: "Antre Pengembalian",
    peminjam: "Bu Siti (Blok D2)",
    kembali: "Besok Sore (16:00 WIB)",
    spesifikasi: [
      { label: "Kapasitas Tabung", value: "1 m³ (isi penuh)" },
      { label: "Regulator", value: "Flow-meter 0-15 L/min" },
      { label: "Peminjam Saat Ini", value: "Ibu Siti (Blok D2, No. 04)" },
      { label: "Estimasi Kembali", value: "Besok Sore (16:00 WIB)" },
    ],
  },
  {
    id: "tongkat",
    nama: "Tongkat Jalan Kaki Empat",
    status: "tersedia",
    kategori: "Mobilitas",
    badgeText: "3 Tersedia di Pos RT",
    badgeBg: "bg-[#E6F4EA] text-[#00624E] border-[#00624E]/20",
    containerBg: "bg-[#E6F4EA]/60",
    photoSrc: "/alkes-tongkat-jalan.jpg",
    desc: "Tinggi dapat disetel 10 level, 4 kaki karet anti-selip kokoh membantu stabilitas berjalan.",
    metaText: "Pos RT 04 • Antar < 5 Menit",
    lokasi: "Pos RT 04 (3 Unit)",
    pengantaran: "Siap Antar (< 5 Menit)",
    spesifikasi: [
      { label: "Material", value: "Aluminium Anodized" },
      { label: "Pengaturan Tinggi", value: "76 - 101 cm (10 tingkat)" },
      { label: "Kaki Penyangga", value: "4 titik karet anti-selip" },
      { label: "Kondisi", value: "Kokoh, terawat & steril" },
    ],
  },
];

interface MyContribution {
  id: string;
  nama: string;
  kategori: string;
  tipe: "Hibah Kas RT" | "Titip Pinjam Pribadi";
  tglDaftar: string;
  status: "Siap di Pos RT" | "Sedang Dipinjam Warga";
  peminjam?: string;
  kondisi: string;
  unit: number;
}

const INITIAL_MY_CONTRIBUTIONS: MyContribution[] = [
  {
    id: "my-1",
    nama: "Tensimeter Digital Omron HEM-7120",
    kategori: "Pemeriksaan",
    tipe: "Titip Pinjam Pribadi",
    tglDaftar: "12 Mei 2024",
    status: "Siap di Pos RT",
    kondisi: "Sangat Baik (Baterai Baru)",
    unit: 1,
  },
  {
    id: "my-2",
    nama: "Tongkat Penyangga Ketiak (Kruk Sepasang)",
    kategori: "Mobilitas",
    tipe: "Hibah Kas RT",
    tglDaftar: "28 April 2024",
    status: "Sedang Dipinjam Warga",
    peminjam: "Pak Hadi (Blok B3)",
    kondisi: "Normal Siap Pakai",
    unit: 1,
  },
];

const PRESET_CHIPS = [
  { nama: "Kursi Roda Lipat", kategori: "Mobilitas", merek: "Sella Medis 871" },
  { nama: "Nebulizer Kompresor", kategori: "Pernapasan", merek: "Omron NE-C28" },
  { nama: "Kasur Decubitus Anti-Luka", kategori: "Perawatan Ranjang", merek: "Apex Domus 1" },
  { nama: "Tensimeter Digital", kategori: "Pemeriksaan", merek: "Omron HEM-7130" },
  { nama: "Walker Kaki Empat", kategori: "Mobilitas", merek: "Gea Medical FS913L" },
  { nama: "Tabung Oksigen 1m³", kategori: "Pernapasan", merek: "Pure O2 + Regulator" },
];

export default function AnakAlkesPage() {
  const [alkesList, setAlkesList] = useState<AlkesItem[]>(INITIAL_ALKES_LIST);
  const [myContributions, setMyContributions] = useState<MyContribution[]>(INITIAL_MY_CONTRIBUTIONS);
  
  const [activeTab, setActiveTab] = useState<"katalog" | "tambah" | "saya">("katalog");
  
  const [selectedAlkes, setSelectedAlkes] = useState<AlkesItem | null>(null);
  const [detailAlkes, setDetailAlkes] = useState<AlkesItem | null>(null);
  const [targetOrtu, setTargetOrtu] = useState<"Bapak Prabowo" | "Ibu Lestari">("Bapak Prabowo");
  const [pinjamSuccess, setPinjamSuccess] = useState<string | null>(null);
  const [reminderSuccess, setReminderSuccess] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    jenisKontribusi: "titip_pinjam" as "donasi" | "titip_pinjam",
    kategori: "Mobilitas",
    namaAlkes: "",
    merekModel: "",
    jumlahUnit: 1,
    kondisi: "sangat_baik" as "baru" | "sangat_baik" | "cukup",
    kelengkapan: ["adaptor", "buku"] as string[],
    metodeSerah: "jemput_relawan" as "jemput_relawan" | "antar_posko",
    catatan: "",
  });

  const toggleKelengkapan = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      kelengkapan: prev.kelengkapan.includes(item)
        ? prev.kelengkapan.filter((x) => x !== item)
        : [...prev.kelengkapan, item],
    }));
  };

  const handleApplyPreset = (chip: typeof PRESET_CHIPS[0]) => {
    setFormData((prev) => ({
      ...prev,
      namaAlkes: chip.nama,
      kategori: chip.kategori,
      merekModel: chip.merek,
    }));
  };

  const handlePinjam = (nama: string) => {
    setSelectedAlkes(null);
    setPinjamSuccess(nama);
    setTimeout(() => setPinjamSuccess(null), 5000);
  };

  const handleSetReminder = (nama: string) => {
    setReminderSuccess(nama);
    setTimeout(() => setReminderSuccess(null), 5000);
  };

  const handleSubmitAlkes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.namaAlkes.trim()) return;

    const newId = `alkes-${Date.now()}`;
    const newItem: AlkesItem = {
      id: newId,
      nama: formData.namaAlkes,
      status: "tersedia",
      kategori: formData.kategori,
      badgeText: `${formData.jumlahUnit} Unit Siap di Pos RT`,
      badgeBg: "bg-[#E6F4EA] text-[#00624E] border-[#00624E]/20",
      containerBg: "bg-[#E6F4EA]/60",
      photoSrc: "/alkes-kursi-roda.jpg",
      desc: `${formData.merekModel ? formData.merekModel + " • " : ""}${
        formData.kondisi === "baru" ? "Kondisi baru segel" : "Kondisi sangat baik & steril"
      }. Dititipkan oleh Ibu Titiek.`,
      metaText: "Pos RT 04 • Antar < 5 Menit",
      lokasi: formData.metodeSerah === "jemput_relawan" ? "Menunggu Penjemputan Relawan" : "Pos RT 04",
      pengantaran: "Siap Pakai Warga",
      donatur: "Ibu Titiek (Blok C4)",
      spesifikasi: [
        { label: "Merek / Tipe", value: formData.merekModel || "Standar Medis" },
        { label: "Kategori", value: formData.kategori },
        { label: "Kondisi Alat", value: formData.kondisi === "baru" ? "Baru Segel" : "Bekas Sangat Baik" },
        { label: "Kepemilikan", value: formData.jenisKontribusi === "donasi" ? "Hibah Kas RT" : "Titip Pinjam Pribadi" },
        { label: "Catatan Donatur", value: formData.catatan || "Siap disterilkan dan dipakai" },
      ],
    };

    const newContrib: MyContribution = {
      id: `contrib-${Date.now()}`,
      nama: formData.namaAlkes,
      kategori: formData.kategori,
      tipe: formData.jenisKontribusi === "donasi" ? "Hibah Kas RT" : "Titip Pinjam Pribadi",
      tglDaftar: "Hari Ini",
      status: "Siap di Pos RT",
      kondisi: formData.kondisi === "baru" ? "Baru Segel" : "Sangat Baik",
      unit: formData.jumlahUnit,
    };

    setAlkesList((prev) => [newItem, ...prev]);
    setMyContributions((prev) => [newContrib, ...prev]);
    setSubmitSuccess(formData.namaAlkes);

    setFormData({
      jenisKontribusi: "titip_pinjam",
      kategori: "Mobilitas",
      namaAlkes: "",
      merekModel: "",
      jumlahUnit: 1,
      kondisi: "sangat_baik",
      kelengkapan: ["adaptor", "buku"],
      metodeSerah: "jemput_relawan",
      catatan: "",
    });

    setActiveTab("katalog");
    setTimeout(() => setSubmitSuccess(null), 6000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-36 sm:pb-32 lg:pb-12 bg-[#F8FAFC]">
      
      {/* Tombol Back */}
      <div>
        <Link
          href="/anak"
          id="btn-back-alkes-anak"
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-700 hover:text-[#00624E] font-black text-xs sm:text-sm shadow-2xs transition-all active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#00624E] group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      {/* Header Utama & Action Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Layanan Alkes Kas RT 04
          </h1>
          <p className="text-sm sm:text-base font-medium text-slate-500">
            Pinjam gratis alat kesehatan untuk orang tua, atau titipkan alkes keluarga demi kemaslahatan bersama.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("tambah")}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#00624E] hover:bg-[#004d3e] text-white font-black text-xs sm:text-sm shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Titipkan / Donasikan Alkes</span>
          </button>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200/80 gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab("katalog")}
          className={`pb-3.5 px-3 text-xs sm:text-sm font-black transition-all relative whitespace-nowrap cursor-pointer ${
            activeTab === "katalog"
              ? "text-[#00624E]"
              : "text-slate-400 hover:text-slate-700"
          }`}
        >
          <span>Katalog Alkes RT ({alkesList.length})</span>
          {activeTab === "katalog" && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#00624E] rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("tambah")}
          className={`pb-3.5 px-3 text-xs sm:text-sm font-black transition-all relative whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === "tambah"
              ? "text-[#00624E]"
              : "text-slate-400 hover:text-slate-700"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Formulir Input Alkes</span>
          {activeTab === "tambah" && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#00624E] rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("saya")}
          className={`pb-3.5 px-3 text-xs sm:text-sm font-black transition-all relative whitespace-nowrap cursor-pointer ${
            activeTab === "saya"
              ? "text-[#00624E]"
              : "text-slate-400 hover:text-slate-700"
          }`}
        >
          <span>Titipan Keluarga Saya ({myContributions.length})</span>
          {activeTab === "saya" && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#00624E] rounded-full" />
          )}
        </button>
      </div>

      {/* Banner Sukses Form Submit */}
      {submitSuccess && (
        <div className="bg-[#00624E] text-white p-4 sm:p-5 rounded-3xl shadow-sm flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <PackageCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-sm">Alkes Berhasil Didaftarkan ke Kas RT</p>
              <p className="text-emerald-100 text-xs font-medium mt-0.5">
                <strong>{submitSuccess}</strong> telah masuk ke sistem inventaris. Relawan siaga akan segera berkoordinasi untuk serah terima.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSubmitSuccess(null)}
            className="px-4 py-2 bg-white text-[#00624E] font-black text-xs rounded-full shadow-xs hover:bg-emerald-50 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Banner Sukses Pinjam */}
      {pinjamSuccess && (
        <div className="bg-[#00624E] text-white p-4 sm:p-5 rounded-3xl shadow-sm flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-white stroke-[3]" />
            </div>
            <div>
              <p className="font-black text-sm">Permintaan Pinjam Berhasil Diteruskan</p>
              <p className="text-emerald-100 text-xs font-medium mt-0.5">
                <strong>{pinjamSuccess}</strong> akan segera diantar relawan siaga ke rumah {targetOrtu}.
              </p>
            </div>
          </div>
          <Link
            href="/anak/status"
            className="px-4 py-2 bg-white text-[#00624E] font-black text-xs rounded-full shadow-xs hover:bg-emerald-50 active:scale-95 transition-all shrink-0"
          >
            Lihat Status
          </Link>
        </div>
      )}

      {/* Banner Sukses Reminder */}
      {reminderSuccess && (
        <div className="bg-amber-600 text-white p-4 sm:p-5 rounded-3xl shadow-sm flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-sm">Pengingat Berhasil Diaktifkan</p>
              <p className="text-amber-100 text-xs font-medium mt-0.5">
                Notifikasi otomatis akan dikirim ke WhatsApp Anda segera setelah <strong>{reminderSuccess}</strong> kembali ke Pos RT.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setReminderSuccess(null)}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-black text-xs rounded-full transition-all shrink-0 cursor-pointer"
          >
            Mengerti
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 1: KATALOG ALKES RT */}
      {/* ========================================================= */}
      {activeTab === "katalog" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {alkesList.map((alkes) => {
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
                        type="button"
                        onClick={() => setDetailAlkes(alkes)}
                        className="text-slate-400 hover:text-slate-700 transition-colors p-1 cursor-pointer"
                        title="Lihat Spesifikasi & Detail"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>

                    <div
                      onClick={() => setDetailAlkes(alkes)}
                      className={`w-full h-44 sm:h-48 rounded-2xl ${alkes.containerBg} flex items-center justify-center p-3 relative overflow-hidden cursor-pointer group transition-transform duration-300 active:scale-[0.99]`}
                    >
                      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xs">
                        <Image
                          src={alkes.photoSrc}
                          alt={`Foto ${alkes.nama}`}
                          fill
                          className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                            !isTersedia ? "grayscale-[0.3] opacity-90" : ""
                          }`}
                          sizes="(max-width: 768px) 100vw, 380px"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          {alkes.kategori || "Alat Medis"}
                        </span>
                        {alkes.donatur && (
                          <span className="text-[10.5px] font-bold text-[#00624E] bg-emerald-50 px-2 py-0.5 rounded-full">
                            Titipan Warga
                          </span>
                        )}
                      </div>
                      <h3 className="font-black text-slate-900 text-base sm:text-lg leading-snug">
                        {alkes.nama}
                      </h3>
                      <p className="text-slate-500 text-xs font-medium leading-relaxed">
                        {alkes.desc}
                      </p>
                    </div>

                    <div className="pt-1">
                      {isTersedia ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-600 w-full justify-between">
                          <span className="flex items-center gap-1.5 text-slate-700">
                            <MapPin className="w-3.5 h-3.5 text-[#00624E]" />
                            <span>Pos RT 04</span>
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1.5 font-bold text-[#00624E]">
                            <Zap className="w-3.5 h-3.5 fill-[#00624E]" />
                            <span>Antar &lt; 5 Menit</span>
                          </span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50/70 border border-amber-100 text-xs font-semibold text-amber-900 w-full justify-between">
                          <span className="flex items-center gap-1.5 truncate">
                            <User className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                            <span className="truncate">{alkes.peminjam || "Warga RT"}</span>
                          </span>
                          <span className="text-amber-300">•</span>
                          <span className="flex items-center gap-1.5 font-bold text-amber-800 shrink-0">
                            <Calendar className="w-3.5 h-3.5 text-amber-700" />
                            <span>Kembali: {alkes.kembali || "Segera"}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    {isTersedia ? (
                      <button
                        type="button"
                        onClick={() => setSelectedAlkes(alkes)}
                        className="w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm text-white shadow-sm bg-[#00624E] hover:bg-[#004d3d] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Ajukan Pinjam untuk Ortu</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetReminder(alkes.nama)}
                        className="w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 shadow-2xs active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Bell className="w-4 h-4 text-amber-700" />
                        <span>Ingatkan Saat Tersedia</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Banner Donasi CTA */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-black text-slate-900 text-sm sm:text-base">
                  Punya Alkes Bekas yang Masih Layak di Rumah?
                </p>
                <p className="text-slate-500 text-xs font-medium mt-0.5">
                  Titipkan ke Kas RT 04 agar bermanfaat untuk tetangga lansia lain yang membutuhkan bantuan berjalan/terapi.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("tambah")}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#00624E] hover:bg-[#004d3e] text-white font-black text-xs transition-all text-center shrink-0 cursor-pointer shadow-xs active:scale-95"
            >
              Mulai Input Alkes Baru →
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: FORMULIR INPUT ALKES BARU */}
      {/* ========================================================= */}
      {activeTab === "tambah" && (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
          
          {/* Card Penjelasan & Panduan Input */}
          <div className="bg-[#E6F4EA] border border-emerald-200/90 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#00624E] text-white flex items-center justify-center shrink-0 shadow-xs">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-sm sm:text-base leading-tight">
                  Program Gotong Royong Alkes RT 04
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Alkes yang Anda daftarkan akan dicatat resmi, disterilisasi oleh tim kader, dan siap dipinjamkan cuma-cuma kepada lansia sekitar.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-white/80 text-[#00624E] font-black text-xs rounded-full border border-emerald-300/60 self-start sm:self-auto shrink-0">
              Gotong Royong RT
            </span>
          </div>

          <form onSubmit={handleSubmitAlkes} className="space-y-6">
            
            {/* 1. Jenis Kontribusi */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00624E] flex items-center justify-center font-black">
                  1
                </div>
                <div>
                  <h2 className="font-black text-slate-900 text-sm sm:text-base">
                    Jenis Kepemilikan &amp; Kontribusi
                  </h2>
                  <p className="text-slate-400 text-xs font-medium">
                    Tentukan apakah alkes disumbangkan permanen atau sekadar dititipkan
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, jenisKontribusi: "titip_pinjam" })}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 active:scale-[0.99] ${
                    formData.jenisKontribusi === "titip_pinjam"
                      ? "bg-[#E6F4EA] border-2 border-[#00624E] text-[#00624E] shadow-2xs"
                      : "bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm">Titip Pakai Suka Rela</span>
                    {formData.jenisKontribusi === "titip_pinjam" && (
                      <CheckCircle2 className="w-5 h-5 text-[#00624E]" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Tetap milik keluarga Anda, namun boleh dipinjamkan ke tetangga lansia lain saat sedang tidak dipakai di rumah.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, jenisKontribusi: "donasi" })}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 active:scale-[0.99] ${
                    formData.jenisKontribusi === "donasi"
                      ? "bg-[#E6F4EA] border-2 border-[#00624E] text-[#00624E] shadow-2xs"
                      : "bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm">Donasi Penuh (Hibah Kas RT)</span>
                    {formData.jenisKontribusi === "donasi" && (
                      <CheckCircle2 className="w-5 h-5 text-[#00624E]" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Dihibahkan menjadi aset inventaris tetap Kas RT 04 untuk kemanfaatan seluruh warga selamanya.
                  </p>
                </button>
              </div>
            </div>

            {/* 2. Informasi Alat Kesehatan */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00624E] flex items-center justify-center font-black">
                  2
                </div>
                <div>
                  <h2 className="font-black text-slate-900 text-sm sm:text-base">
                    Detail Alat Kesehatan
                  </h2>
                  <p className="text-slate-400 text-xs font-medium">
                    Lengkapi identitas alat dan spesifikasi agar warga mengetahui kegunaannya
                  </p>
                </div>
              </div>

              {/* Rekomendasi Pilihan Cepat (Chips) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Pilih Cepat Jenis Alkes Umum:</label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_CHIPS.map((chip) => (
                    <button
                      key={chip.nama}
                      type="button"
                      onClick={() => handleApplyPreset(chip)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer active:scale-95 ${
                        formData.namaAlkes === chip.nama
                          ? "bg-[#00624E] text-white border-[#00624E]"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {chip.nama}
                    </button>
                  ))}
                </div>
              </div>

              {/* Kategori Alkes */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold text-slate-600">Kategori Alat:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "Mobilitas", icon: Accessibility, label: "Mobilitas & Jalan" },
                    { id: "Pernapasan", icon: Activity, label: "Pernapasan / O2" },
                    { id: "Perawatan Ranjang", icon: Heart, label: "Kasur & Ranjang" },
                    { id: "Pemeriksaan", icon: FileText, label: "Alat Cek Medis" },
                  ].map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = formData.kategori === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, kategori: cat.id })}
                        className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                          isSelected
                            ? "bg-[#E6F4EA] border-2 border-[#00624E] text-[#00624E] font-black"
                            : "bg-slate-50/80 border-slate-200 text-slate-600 font-bold hover:bg-slate-100"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-xs">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nama Alkes */}
              <div className="space-y-1.5">
                <label htmlFor="input-nama-alkes" className="text-xs font-bold text-slate-700">
                  Nama Alat Kesehatan <span className="text-rose-500">*</span>
                </label>
                <input
                  id="input-nama-alkes"
                  type="text"
                  required
                  value={formData.namaAlkes}
                  onChange={(e) => setFormData({ ...formData, namaAlkes: e.target.value })}
                  placeholder="Contoh: Kursi Roda Standar Medis Lipat"
                  className="w-full h-12 px-4 rounded-2xl border border-slate-200/90 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00624E] focus:border-transparent bg-slate-50/50"
                />
              </div>

              {/* Merek & Jumlah Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label htmlFor="input-merek-alkes" className="text-xs font-bold text-slate-700">
                    Merek &amp; Tipe / Seri
                  </label>
                  <input
                    id="input-merek-alkes"
                    type="text"
                    value={formData.merekModel}
                    onChange={(e) => setFormData({ ...formData, merekModel: e.target.value })}
                    placeholder="Contoh: Omron HEM-7120 / Sella 871"
                    className="w-full h-12 px-4 rounded-2xl border border-slate-200/90 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00624E] focus:border-transparent bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="input-jumlah-unit" className="text-xs font-bold text-slate-700">
                    Jumlah Unit
                  </label>
                  <div className="flex items-center h-12 rounded-2xl border border-slate-200/90 bg-slate-50/50 px-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, jumlahUnit: Math.max(1, formData.jumlahUnit - 1) })}
                      className="w-8 h-8 rounded-xl bg-white border border-slate-200 font-black text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-black text-sm text-slate-900">
                      {formData.jumlahUnit} Unit
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, jumlahUnit: formData.jumlahUnit + 1 })}
                      className="w-8 h-8 rounded-xl bg-white border border-slate-200 font-black text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* 3. Kondisi & Kelengkapan */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00624E] flex items-center justify-center font-black">
                  3
                </div>
                <div>
                  <h2 className="font-black text-slate-900 text-sm sm:text-base">
                    Kondisi Fisik &amp; Kelengkapan
                  </h2>
                  <p className="text-slate-400 text-xs font-medium">
                    Pastikan alat dalam kondisi layak dan steril untuk keamanan lansia
                  </p>
                </div>
              </div>

              {/* Status Kondisi */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">Kondisi Alat Saat Ini:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "baru", title: "Baru / Segel", desc: "Belum pernah dipakai" },
                    { id: "sangat_baik", title: "Bekas - Sangat Baik", desc: "Bersih, steril & normal" },
                    { id: "cukup", title: "Bekas - Berfungsi", desc: "Ada tanda pakai wajar" },
                  ].map((kond) => (
                    <button
                      key={kond.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, kondisi: kond.id as any })}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-0.5 active:scale-95 ${
                        formData.kondisi === kond.id
                          ? "bg-[#E6F4EA] border-2 border-[#00624E] text-[#00624E]"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-xs font-black">{kond.title}</span>
                      <span className="text-[11px] text-slate-400">{kond.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Kelengkapan Checklist */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold text-slate-600">Kelengkapan Tambahan yang Disertakan:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: "adaptor", label: "Adaptor / Kabel Charger Daya" },
                    { id: "buku", label: "Buku Panduan / Petunjuk Pakai" },
                    { id: "aksesoris", label: "Selang / Manset / Part Cadangan Baru" },
                    { id: "tas", label: "Dus / Tas Penyimpanan Asli" },
                  ].map((kel) => {
                    const isChecked = formData.kelengkapan.includes(kel.id);
                    return (
                      <button
                        key={kel.id}
                        type="button"
                        onClick={() => toggleKelengkapan(kel.id)}
                        className={`p-3 rounded-2xl border text-left text-xs font-bold flex items-center gap-3 transition-all cursor-pointer ${
                          isChecked
                            ? "bg-emerald-50/70 border-emerald-300 text-[#00624E]"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-colors ${
                          isChecked ? "bg-[#00624E] border-[#00624E] text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span>{kel.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Catatan Perawatan */}
              <div className="space-y-1.5 pt-1">
                <label htmlFor="input-catatan-alkes" className="text-xs font-bold text-slate-700">
                  Catatan atau Petunjuk Khusus
                </label>
                <textarea
                  id="input-catatan-alkes"
                  rows={3}
                  value={formData.catatan}
                  onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                  placeholder="Contoh: Baterai baru diganti kemarin, rem tangan kiri agak kesat tapi berfungsi pakem."
                  className="w-full p-4 rounded-2xl border border-slate-200/90 text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00624E] focus:border-transparent bg-slate-50/50"
                />
              </div>

            </div>

            {/* 4. Metode Penyerahan & Kontak Donatur */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00624E] flex items-center justify-center font-black">
                  4
                </div>
                <div>
                  <h2 className="font-black text-slate-900 text-sm sm:text-base">
                    Metode Penyerahan &amp; Kontak Keluarga
                  </h2>
                  <p className="text-slate-400 text-xs font-medium">
                    Relawan siaga RT dapat menjemput langsung ke rumah Anda
                  </p>
                </div>
              </div>

              {/* Pilihan Metode Penyerahan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, metodeSerah: "jemput_relawan" })}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 active:scale-95 ${
                    formData.metodeSerah === "jemput_relawan"
                      ? "bg-[#E6F4EA] border-2 border-[#00624E] text-[#00624E]"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#00624E] flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 fill-[#00624E]" />
                  </div>
                  <div>
                    <p className="font-black text-xs sm:text-sm">Jemput ke Rumah (Rekomendasi)</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Relawan RT mengambil ke Blok C4 No. 12</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, metodeSerah: "antar_posko" })}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 active:scale-95 ${
                    formData.metodeSerah === "antar_posko"
                      ? "bg-[#E6F4EA] border-2 border-[#00624E] text-[#00624E]"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-black text-xs sm:text-sm">Diantar Sendiri</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Diserahkan langsung ke Posko RT 04</p>
                  </div>
                </button>
              </div>

              {/* Info Profil Donatur */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00624E] text-white flex items-center justify-center font-black shrink-0 shadow-xs">
                    IT
                  </div>
                  <div>
                    <p className="font-black text-slate-900">Ibu Titiek (Keluarga Terdaftar)</p>
                    <p className="text-slate-400 font-medium">WhatsApp: 0812-9876-5432 • Blok C4 No. 12</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-[#00624E] font-black text-[10.5px]">
                  Terverifikasi RT
                </span>
              </div>

            </div>

            {/* Tombol Submit & Cancel */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="submit"
                id="btn-submit-alkes"
                className="w-full sm:flex-1 py-4 rounded-2xl font-black text-sm text-white shadow-sm bg-[#00624E] hover:bg-[#004d3e] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PackageCheck className="w-4 h-4 stroke-[2.5]" />
                <span>Simpan &amp; Daftarkan Alkes ke Kas RT</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("katalog")}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-xs sm:text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all cursor-pointer"
              >
                Batalkan
              </button>
            </div>

          </form>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: TITIPAN KELUARGA SAYA */}
      {/* ========================================================= */}
      {activeTab === "saya" && (
        <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="font-black text-slate-900 text-base sm:text-lg">
                  Alat Kesehatan yang Pernah Didaftarkan
                </h2>
                <p className="text-slate-400 text-xs font-medium">
                  Riwayat kontribusi dan status pemakaian alat oleh warga sekitar
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#00624E] border border-emerald-200 text-xs font-black">
                {myContributions.length} Alat Terdaftar
              </span>
            </div>

            <div className="space-y-3">
              {myContributions.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00624E] flex items-center justify-center font-black shrink-0">
                      <Accessibility className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-slate-900 text-sm">{item.nama}</h4>
                        <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                          {item.tipe}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">
                        Didaftarkan pada {item.tglDaftar} • Kondisi: {item.kondisi} ({item.unit} Unit)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <span className={`text-xs font-black px-3 py-1 rounded-full border ${
                      item.status === "Siap di Pos RT"
                        ? "bg-[#E6F4EA] text-[#00624E] border-[#00624E]/20"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}>
                      {item.status === "Sedang Dipinjam Warga" && item.peminjam 
                        ? `Dipakai: ${item.peminjam}`
                        : item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setActiveTab("tambah")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#00624E] hover:bg-[#004d3e] text-white text-xs font-black shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Tambah Titipan Alkes Baru</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL KONFIRMASI PINJAM UNTUK ORANG TUA */}
      {/* ========================================================= */}
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
                Alat akan diantar langsung ke rumah <strong>{targetOrtu} (Blok C4, No. 12)</strong> oleh relawan siaga.
              </p>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-bold text-slate-500">Penerima Pinjaman:</label>
              <div className="grid grid-cols-2 gap-2">
                {(["Bapak Prabowo", "Ibu Lestari"] as const).map((ortu) => (
                  <button
                    key={ortu}
                    type="button"
                    onClick={() => setTargetOrtu(ortu)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                      targetOrtu === ortu
                        ? "bg-[#00624E] text-white border-[#00624E] shadow-2xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {ortu}
                  </button>
                ))}
              </div>
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
                type="button"
                onClick={() => handlePinjam(selectedAlkes.nama)}
                className="w-full py-3.5 rounded-2xl font-black text-xs text-white shadow-sm bg-[#00624E] hover:bg-[#004d3d] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Konfirmasi &amp; Antar Sekarang</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedAlkes(null)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-2xl transition-all cursor-pointer"
              >
                Batalkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL DETAIL & SPESIFIKASI ALKES */}
      {/* ========================================================= */}
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
                type="button"
                onClick={() => setDetailAlkes(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer"
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
              <div>
                <h3 className="font-black text-slate-900 text-lg leading-tight">{detailAlkes.nama}</h3>
                <p className="text-slate-500 text-xs font-medium mt-1 leading-relaxed">{detailAlkes.desc}</p>
              </div>

              <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-4 space-y-2.5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Spesifikasi Teknis</p>
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
                    type="button"
                    onClick={() => {
                      setDetailAlkes(null);
                      setSelectedAlkes(detailAlkes);
                    }}
                    className="w-full py-3.5 rounded-2xl font-black text-xs text-white shadow-sm bg-[#00624E] hover:bg-[#004d3d] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Ajukan Pinjam untuk Ortu</span>
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
                    className="w-full py-3.5 rounded-2xl font-bold text-xs text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 shadow-2xs active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Bell className="w-4 h-4 text-amber-700" />
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

    </div>
  );
}
