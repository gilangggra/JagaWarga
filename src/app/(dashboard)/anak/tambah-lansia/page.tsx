"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Users, 
  Heart, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  Clock, 
  Plus, 
  Search, 
  CheckCircle2, 
  Home, 
  Activity, 
  Calendar, 
  Accessibility, 
  AlertCircle, 
  ChevronRight, 
  Shield, 
  Info,
  Building,
  CheckCircle
} from "lucide-react";

export default function TambahLansiaPage() {
  const [metode, setMetode] = useState<"daftar_baru" | "cari_nomor">("daftar_baru");
  
  // State Pencarian Nomor
  const [searchPhone, setSearchPhone] = useState("");
  const [searchResult, setSearchResult] = useState<{
    nama: string;
    usia: string;
    alamat: string;
    status: string;
    nikTersamar: string;
  } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [connectSuccess, setConnectSuccess] = useState<string | null>(null);

  // State Form Daftar Baru
  const [formData, setFormData] = useState({
    namaLengkap: "",
    hubungan: "Ibu Kandung",
    usia: "68",
    jenisKelamin: "perempuan" as "perempuan" | "laki_laki",
    punyaHp: true,
    telepon: "",
    lingkunganRt: "RT 04 / RW 01 - Sleman, Yogyakarta",
    blokNomor: "",
    patokanRumah: "",
    mobilitas: "mandiri" as "mandiri" | "butuh_alat" | "bedridden",
    riwayatPenyakit: ["Hipertensi"] as string[],
    obatRutin: "",
    jendelaCheckin: "07:00 - 09:00 WIB",
    tetanggaNama: "",
    tetanggaTelepon: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePenyakit = (penyakit: string) => {
    setFormData((prev) => ({
      ...prev,
      riwayatPenyakit: prev.riwayatPenyakit.includes(penyakit)
        ? prev.riwayatPenyakit.filter((p) => p !== penyakit)
        : [...prev.riwayatPenyakit, penyakit],
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchPhone.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchResult({
        nama: "Ibu Nurhayati",
        usia: "69 Tahun",
        alamat: "RT 04 / RW 01 Sukamaju, Sleman (Blok B2 No. 08)",
        status: "Akun Lansia Terdaftar di Posko RT 04",
        nikTersamar: "340407******0002"
      });
    }, 600);
  };

  const handleQuickDemoSearch = () => {
    setSearchPhone("8123456789");
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchResult({
        nama: "Ibu Nurhayati",
        usia: "69 Tahun",
        alamat: "RT 04 / RW 01 Sukamaju, Sleman (Blok B2 No. 08)",
        status: "Akun Lansia Terdaftar di Posko RT 04",
        nikTersamar: "340407******0002"
      });
    }, 400);
  };

  const handleConnectFound = () => {
    if (!searchResult) return;
    setConnectSuccess(searchResult.nama);
    setSearchResult(null);
    setSearchPhone("");
  };

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.namaLengkap.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setConnectSuccess(formData.namaLengkap);
    }, 600);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-36 sm:pb-32 lg:pb-12 bg-[#F8FAFC]">
      
      {/* Tombol Back */}
      <div>
        <Link
          href="/anak/profil"
          id="btn-back-tambah-lansia"
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-700 hover:text-[#00624E] font-black text-xs sm:text-sm shadow-2xs transition-all active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#00624E] group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Profil Keluarga</span>
        </Link>
      </div>

      {/* Header Utama */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Hubungkan Lansia / Orang Tua Baru
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-medium text-slate-500 leading-relaxed max-w-3xl">
          Daftarkan orang tua Anda untuk dipantau kondisinya dari jauh. Data akan terintegrasi langsung dengan posko RT 04 Sukamaju, Sleman untuk jadwal cek fisik rutin dan siaga darurat 24 jam.
        </p>
      </div>

      {/* Banner Sukses Terhubung */}
      {connectSuccess && (
        <div className="bg-[#00624E] text-white p-5 sm:p-7 rounded-3xl shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2 border border-emerald-400/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 shadow-xs">
              <CheckCircle2 className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-black text-base sm:text-xl">
                {connectSuccess} Berhasil Terhubung!
              </h3>
              <p className="text-emerald-100 text-xs sm:text-sm font-medium leading-relaxed">
                Data orang tua telah tersimpan dalam daftar pantau keluarga Anda. Relawan RT 04 dan kader posyandu telah menerima notifikasi pendaftaran dan siap mendampingi.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/anak"
              className="px-5 py-2.5 rounded-2xl bg-white text-[#00624E] font-black text-xs sm:text-sm shadow-xs hover:bg-emerald-50 active:scale-95 transition-all inline-flex items-center gap-1.5"
            >
              <span>Buka Beranda Pemantauan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/anak/profil"
              className="px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm transition-all"
            >
              Lihat di Profil Saya
            </Link>
          </div>
        </div>
      )}

      {/* 2-Column Grid Matching Profil and Bantuan Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* KOLOM KIRI (FORM & SELEKSI METODE) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Pemilihan Metode Penghubungan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setMetode("daftar_baru")}
              className={`p-4 sm:p-5 rounded-3xl border text-left transition-all cursor-pointer flex items-start gap-3.5 relative active:scale-[0.99] ${
                metode === "daftar_baru"
                  ? "bg-[#E6F4EA] border-2 border-[#00624E] text-[#00624E] shadow-xs"
                  : "bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50/80 hover:border-slate-300"
              }`}
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                metode === "daftar_baru" ? "bg-[#00624E] text-white shadow-xs" : "bg-slate-100 text-slate-500"
              }`}>
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-black text-sm sm:text-base leading-tight">Daftarkan Orang Tua Baru</p>
                  {metode === "daftar_baru" && (
                    <span className="w-2 h-2 rounded-full bg-[#00624E] shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1 leading-normal">
                  Pilihan jika lansia belum punya akun di JagaWarga.
                </p>
                <span className="inline-block mt-2 text-[10px] font-extrabold uppercase tracking-wider text-[#00624E] bg-white/80 px-2 py-0.5 rounded-full border border-emerald-200">
                  Rekomendasi
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMetode("cari_nomor")}
              className={`p-4 sm:p-5 rounded-3xl border text-left transition-all cursor-pointer flex items-start gap-3.5 relative active:scale-[0.99] ${
                metode === "cari_nomor"
                  ? "bg-[#E6F4EA] border-2 border-[#00624E] text-[#00624E] shadow-xs"
                  : "bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50/80 hover:border-slate-300"
              }`}
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                metode === "cari_nomor" ? "bg-[#00624E] text-white shadow-xs" : "bg-slate-100 text-slate-500"
              }`}>
                <Search className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-black text-sm sm:text-base leading-tight">Sambungkan No. HP Lansia</p>
                  {metode === "cari_nomor" && (
                    <span className="w-2 h-2 rounded-full bg-[#00624E] shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1 leading-normal">
                  Hubungkan via WhatsApp jika lansia sudah terdata di RT.
                </p>
                <span className="inline-block mt-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                  Cepat • 1 Langkah
                </span>
              </div>
            </button>
          </div>

          {/* ========================================================= */}
          {/* MODE 1: SAMBUNGKAN DENGAN NOMOR HP */}
          {/* ========================================================= */}
          {metode === "cari_nomor" && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E6F4EA] to-emerald-100 text-[#00624E] flex items-center justify-center font-black shadow-xs">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-black text-slate-900 text-base sm:text-lg">
                    Cari Akun Lansia Terdaftar di RT
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm font-medium">
                    Ketik nomor WhatsApp orang tua untuk mengirimkan konfirmasi sambungan keluarga
                  </p>
                </div>
              </div>

              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="search-phone" className="text-xs font-bold text-slate-700">
                    Nomor WhatsApp / HP Orang Tua
                  </label>
                  
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        +62
                      </span>
                      <input
                        id="search-phone"
                        type="tel"
                        required
                        value={searchPhone}
                        onChange={(e) => setSearchPhone(e.target.value)}
                        placeholder="812-3456-7890"
                        className="w-full h-12 pl-12 pr-4 rounded-2xl border border-slate-200/90 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00624E] focus:border-transparent bg-slate-50/50"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSearching}
                      className="px-6 h-12 rounded-2xl bg-[#00624E] hover:bg-[#004d3e] text-white font-black text-xs sm:text-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50 shadow-xs"
                    >
                      <Search className="w-4 h-4" />
                      <span>{isSearching ? "Mencari Data..." : "Cari Lansia"}</span>
                    </button>
                  </div>

                  {/* Quick Demo Fill Helper */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs text-slate-400 font-medium">Uji Coba Demo:</span>
                    <button
                      type="button"
                      onClick={handleQuickDemoSearch}
                      className="text-xs font-bold text-[#00624E] hover:underline bg-[#E6F4EA] px-2.5 py-1 rounded-xl cursor-pointer"
                    >
                      Gunakan: 08123456789 (Ibu Nurhayati)
                    </button>
                  </div>
                </div>
              </form>

              {searchResult && (
                <div className="p-5 sm:p-6 rounded-3xl bg-[#E6F4EA]/80 border border-emerald-300/80 space-y-4 animate-in fade-in zoom-in-95">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#00624E] bg-white px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
                      {searchResult.status}
                    </span>
                    <span className="text-xs font-black text-slate-600 bg-white/70 px-3 py-1 rounded-full">
                      Usia: {searchResult.usia}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 text-lg sm:text-xl">{searchResult.nama}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#00624E] shrink-0" />
                      <span>{searchResult.alamat}</span>
                    </p>
                    <p className="text-xs text-slate-400 font-medium pt-0.5">
                      NIK Terverifikasi Posko: {searchResult.nikTersamar}
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleConnectFound}
                      className="w-full sm:flex-1 py-3.5 bg-[#00624E] hover:bg-[#004d3e] text-white font-black text-xs sm:text-sm rounded-2xl shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Kirim Permintaan Hubungkan Keluarga</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchResult(null)}
                      className="w-full sm:w-auto px-5 py-3.5 bg-white text-slate-600 font-bold text-xs sm:text-sm rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer text-center"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* MODE 2: FORM PENDAFTARAN ORANG TUA BARU */}
          {/* ========================================================= */}
          {metode === "daftar_baru" && (
            <form onSubmit={handleSubmitNew} className="space-y-6">
              
              {/* SEKSI 1: DATA IDENTITAS LANSIA */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center gap-3.5 pb-3.5 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E6F4EA] to-emerald-100 text-[#00624E] flex items-center justify-center font-black text-base shadow-xs">
                    1
                  </div>
                  <div>
                    <h2 className="font-black text-slate-900 text-base sm:text-lg">
                      Data Diri &amp; Hubungan Keluarga
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-medium">
                      Nama lengkap dan status hubungan keluarga dengan Anda
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label htmlFor="input-nama-lansia" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <span>Nama Lengkap Orang Tua / Lansia</span>
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="input-nama-lansia"
                      type="text"
                      required
                      value={formData.namaLengkap}
                      onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                      placeholder="Contoh: Ibu Nurhayati / Bapak Slamet Raharjo"
                      className="w-full h-12 px-4 rounded-2xl border border-slate-200/90 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00624E] focus:border-transparent bg-slate-50/50"
                    />
                  </div>

                  {/* Hubungan Keluarga */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700">Hubungan Keluarga Anda:</label>
                    <div className="flex flex-wrap gap-2">
                      {["Ibu Kandung", "Ayah Kandung", "Ibu Mertua", "Ayah Mertua", "Kakek/Nenek", "Paman/Bibi"].map((hub) => {
                        const isSelected = formData.hubungan === hub;
                        return (
                          <button
                            key={hub}
                            type="button"
                            onClick={() => setFormData({ ...formData, hubungan: hub })}
                            className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition-all border cursor-pointer active:scale-95 flex items-center gap-1.5 ${
                              isSelected
                                ? "bg-[#00624E] text-white border-[#00624E] shadow-2xs"
                                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            <span>{hub}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Usia dengan suffix */}
                  <div className="space-y-1.5">
                    <label htmlFor="input-usia-lansia" className="text-xs font-bold text-slate-700">
                      Usia Lansia
                    </label>
                    <div className="relative">
                      <input
                        id="input-usia-lansia"
                        type="number"
                        min="50"
                        max="120"
                        value={formData.usia}
                        onChange={(e) => setFormData({ ...formData, usia: e.target.value })}
                        placeholder="68"
                        className="w-full h-12 pl-4 pr-16 rounded-2xl border border-slate-200/90 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00624E] focus:border-transparent bg-slate-50/50"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        Tahun
                      </span>
                    </div>
                  </div>

                  {/* Jenis Kelamin */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Jenis Kelamin</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "perempuan", label: "Perempuan" },
                        { id: "laki_laki", label: "Laki-laki" },
                      ].map((jk) => (
                        <button
                          key={jk.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, jenisKelamin: jk.id as any })}
                          className={`h-12 rounded-2xl text-xs font-black border transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 ${
                            formData.jenisKelamin === jk.id
                              ? "bg-[#E6F4EA] border-2 border-[#00624E] text-[#00624E]"
                              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {formData.jenisKelamin === jk.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          <span>{jk.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* No WhatsApp Lansia & Toggle Punya HP */}
                  <div className="space-y-2 sm:col-span-2 pt-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label htmlFor="input-phone-lansia" className="text-xs font-bold text-slate-700">
                        Nomor WhatsApp Lansia
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600 select-none bg-slate-100 px-3 py-1 rounded-xl">
                        <input
                          type="checkbox"
                          checked={!formData.punyaHp}
                          onChange={(e) => setFormData({ ...formData, punyaHp: !e.target.checked })}
                          className="w-4 h-4 rounded text-[#00624E] focus:ring-[#00624E]"
                        />
                        <span>Lansia tidak memakai ponsel</span>
                      </label>
                    </div>

                    {formData.punyaHp ? (
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                          +62
                        </span>
                        <input
                          id="input-phone-lansia"
                          type="tel"
                          value={formData.telepon}
                          onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                          placeholder="812-xxxx-xxxx"
                          className="w-full h-12 pl-12 pr-4 rounded-2xl border border-slate-200/90 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00624E] focus:border-transparent bg-slate-50/50"
                        />
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs text-amber-900 font-medium flex items-start gap-2.5">
                        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          Lansia tanpa HP akan dimasukkan dalam jadwal <strong>Kunjungan Fisik Kader RT 04</strong> setiap pagi pukul 08:00 WIB untuk cek kondisi dan tensi langsung ke rumah.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* SEKSI 2: ALAMAT & LINGKUNGAN RT */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center gap-3.5 pb-3.5 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E6F4EA] to-emerald-100 text-[#00624E] flex items-center justify-center font-black text-base shadow-xs">
                    2
                  </div>
                  <div>
                    <h2 className="font-black text-slate-900 text-base sm:text-lg">
                      Alamat Rumah &amp; Posko Lingkungan RT
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-medium">
                      Lokasi rumah orang tua agar tim relawan siaga RT dapat mendatangi tepat waktu
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="select-rt" className="text-xs font-bold text-slate-700">
                      Pilih Lingkungan RT / RW Tempat Tinggal
                    </label>
                    <div className="relative">
                      <select
                        id="select-rt"
                        value={formData.lingkunganRt}
                        onChange={(e) => setFormData({ ...formData, lingkunganRt: e.target.value })}
                        className="w-full h-12 px-4 rounded-2xl border border-slate-200/90 text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00624E] focus:border-transparent bg-slate-50/50 cursor-pointer"
                      >
                        <option value="RT 04 / RW 01 - Sleman, Yogyakarta">
                          RT 04 / RW 01 Sukamaju, Sleman, DIY (Radar Aktif 24 Jam)
                        </option>
                        <option value="RT 05 / RW 01 - Sleman, Yogyakarta">
                          RT 05 / RW 01 Sukamaju, Sleman, DIY
                        </option>
                        <option value="RT 02 / RW 03 - Depok, Sleman">
                          RT 02 / RW 03 Condongcatur, Depok, Sleman
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="input-blok" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                        <span>Blok &amp; Nomor Rumah</span>
                        <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="input-blok"
                        type="text"
                        required
                        value={formData.blokNomor}
                        onChange={(e) => setFormData({ ...formData, blokNomor: e.target.value })}
                        placeholder="Contoh: Blok B2 No. 08"
                        className="w-full h-12 px-4 rounded-2xl border border-slate-200/90 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00624E] focus:border-transparent bg-slate-50/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="input-patokan" className="text-xs font-bold text-slate-700">
                        Ciri / Patokan Visual Rumah
                      </label>
                      <input
                        id="input-patokan"
                        type="text"
                        value={formData.patokanRumah}
                        onChange={(e) => setFormData({ ...formData, patokanRumah: e.target.value })}
                        placeholder="Contoh: Pagar hijau, depan pohon mangga"
                        className="w-full h-12 px-4 rounded-2xl border border-slate-200/90 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00624E] focus:border-transparent bg-slate-50/50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SEKSI 3: KONDISI KESEHATAN & MEDIS KHUSUS */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center gap-3.5 pb-3.5 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E6F4EA] to-emerald-100 text-[#00624E] flex items-center justify-center font-black text-base shadow-xs">
                    3
                  </div>
                  <div>
                    <h2 className="font-black text-slate-900 text-base sm:text-lg">
                      Kondisi Medis &amp; Pemantauan
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-medium">
                      Informasi kesehatan dasar untuk panduan kader posyandu dan relawan
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Tingkat Mobilitas */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Kondisi Mobilitas Berjalan:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: "mandiri", title: "Mandiri", desc: "Bisa jalan sendiri tanpa bantuan", icon: <User className="w-4 h-4" /> },
                        { id: "butuh_alat", title: "Bantu Tongkat/Walker", desc: "Berjalan perlu penopang", icon: <Accessibility className="w-4 h-4" /> },
                        { id: "bedridden", title: "Tirah Baring", desc: "Lebih banyak di ranjang", icon: <Heart className="w-4 h-4" /> },
                      ].map((mob) => (
                        <button
                          key={mob.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, mobilitas: mob.id as any })}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 active:scale-95 ${
                            formData.mobilitas === mob.id
                              ? "bg-[#E6F4EA] border-2 border-[#00624E] text-[#00624E] shadow-2xs"
                              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black">{mob.title}</span>
                            {formData.mobilitas === mob.id && (
                              <Check className="w-3.5 h-3.5 stroke-[3] text-[#00624E]" />
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 font-medium">{mob.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Riwayat Penyakit Multi-Select */}
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-bold text-slate-700">Riwayat Penyakit / Perhatian Khusus:</label>
                    <div className="flex flex-wrap gap-2">
                      {["Hipertensi", "Diabetes", "Kolesterol", "Asam Urat", "Jantung", "Pikun / Demensia", "Lambung / Maag"].map((peny) => {
                        const isSelected = formData.riwayatPenyakit.includes(peny);
                        return (
                          <button
                            key={peny}
                            type="button"
                            onClick={() => togglePenyakit(peny)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                              isSelected
                                ? "bg-[#E6F4EA] border-[#00624E] text-[#00624E] shadow-2xs"
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            <span>{peny}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Obat Rutin */}
                  <div className="space-y-1.5 pt-1">
                    <label htmlFor="input-obat-rutin" className="text-xs font-bold text-slate-700">
                      Obat Rutin yang Harus Diminum
                    </label>
                    <input
                      id="input-obat-rutin"
                      type="text"
                      value={formData.obatRutin}
                      onChange={(e) => setFormData({ ...formData, obatRutin: e.target.value })}
                      placeholder="Contoh: Amlodipine 5mg (pagi), Metformin 500mg (siang)"
                      className="w-full h-12 px-4 rounded-2xl border border-slate-200/90 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00624E] focus:border-transparent bg-slate-50/50"
                    />
                  </div>

                  {/* Jam Check-In Rutin */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">
                        Jendela Waktu Check-In Pagi Sehat:
                      </label>
                      <span className="text-[11px] font-medium text-slate-400">
                        Standar RT: 07:00 - 09:00 WIB
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        "06:00 - 08:00 WIB",
                        "07:00 - 09:00 WIB",
                        "08:00 - 10:00 WIB",
                      ].map((wkt) => {
                        const isSelected = formData.jendelaCheckin === wkt;
                        return (
                          <button
                            key={wkt}
                            type="button"
                            onClick={() => setFormData({ ...formData, jendelaCheckin: wkt })}
                            className={`h-12 rounded-2xl border text-xs sm:text-sm font-black transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2 ${
                              isSelected
                                ? "bg-[#00624E] text-white border-[#00624E] shadow-2xs"
                                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <Clock className="w-4 h-4 shrink-0" />
                            <span>{wkt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* SEKSI 4: KONTAK TETANGGA DEKAT (OPSIONAL) */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center gap-3.5 pb-3.5 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E6F4EA] to-emerald-100 text-[#00624E] flex items-center justify-center font-black text-base shadow-xs">
                    4
                  </div>
                  <div>
                    <h2 className="font-black text-slate-900 text-base sm:text-lg">
                      Tetangga Terdekat / Samping Rumah (Opsional)
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-medium">
                      Kontak cadangan jika telepon orang tua tidak terhubung saat jadwal pemantauan
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="input-tetangga-nama" className="text-xs font-bold text-slate-700">
                      Nama Tetangga / Kader Dekat
                    </label>
                    <input
                      id="input-tetangga-nama"
                      type="text"
                      value={formData.tetanggaNama}
                      onChange={(e) => setFormData({ ...formData, tetanggaNama: e.target.value })}
                      placeholder="Contoh: Pak Budi (Rumah Sebelah No. 07)"
                      className="w-full h-12 px-4 rounded-2xl border border-slate-200/90 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00624E] focus:border-transparent bg-slate-50/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="input-tetangga-telp" className="text-xs font-bold text-slate-700">
                      Nomor HP Tetangga
                    </label>
                    <input
                      id="input-tetangga-telp"
                      type="tel"
                      value={formData.tetanggaTelepon}
                      onChange={(e) => setFormData({ ...formData, tetanggaTelepon: e.target.value })}
                      placeholder="Contoh: 0813-9876-5432"
                      className="w-full h-12 px-4 rounded-2xl border border-slate-200/90 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00624E] focus:border-transparent bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* Tombol Simpan & Submit */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="btn-simpan-lansia"
                    className="w-full sm:flex-1 py-4 rounded-2xl font-black text-sm text-white shadow-sm bg-[#00624E] hover:bg-[#004d3e] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
                    <span>{isSubmitting ? "Menghubungkan ke Posko RT..." : "Simpan & Hubungkan Lansia Ini"}</span>
                  </button>

                  <Link
                    href="/anak/profil"
                    className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-xs sm:text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all text-center"
                  >
                    Batalkan
                  </Link>
                </div>

                {/* Privacy note */}
                <p className="text-[11px] text-slate-400 text-center font-medium flex items-center justify-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  <span>Data tersimpan aman dan hanya digunakan untuk keperluan pemantauan kesehatan keluarga.</span>
                </p>
              </div>

            </form>
          )}

        </div>

        {/* KOLOM KANAN (SIDEBAR KONTEKS, LANSIA AKTIF, & POSKO RT) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Kartu 1: Lansia yang Sedang Dipantau */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-[#E6F4EA] flex items-center justify-center text-[#00624E]">
                <Users className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base leading-tight">
                  Orang Tua yang Sedang Dipantau
                </h3>
                <p className="text-xs text-slate-400 font-medium">Terhubung di Sleman, Yogyakarta (2 Lansia)</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-slate-900">Bapak Prabowo (68 Tahun)</p>
                  <span className="text-[10px] font-black text-emerald-800 bg-[#E6F4EA] px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Hipertensi Terkontrol
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Blok C4 No. 12, RT 04, Sleman</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-slate-900">Ibu Lestari (65 Tahun)</p>
                  <span className="text-[10px] font-black text-emerald-800 bg-[#E6F4EA] px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Stabil Normal
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Blok C4 No. 12, RT 04, Sleman</span>
                </p>
              </div>
            </div>
          </div>

          {/* Kartu 2: Manfaat Pemantauan Terhubung */}
          <div className="bg-[#E6F4EA]/80 border border-emerald-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#00624E]" />
              <h3 className="font-black text-[#00624E] text-base leading-tight">
                Integrasi Radar JagaWarga RT 04
              </h3>
            </div>
            
            <p className="text-xs text-emerald-950/80 font-medium leading-relaxed">
              Setelah orang tua terhubung, sistem JagaWarga akan mengaktifkan 3 perlindungan otomatis:
            </p>

            <ul className="space-y-2.5 text-xs text-emerald-950 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00624E] shrink-0 mt-0.5" />
                <span><strong>Check-in Pagi Sehat:</strong> Konfirmasi kabar otomatis atau manual setiap pagi hari.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00624E] shrink-0 mt-0.5" />
                <span><strong>Kunjungan Kader RT:</strong> Jika lansia tidak ada kabar dalam 2 jam, kader mendatangi rumah langsung.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00624E] shrink-0 mt-0.5" />
                <span><strong>Akses Cepat Alkes &amp; Titip Obat:</strong> Permohonan bantuan instan bebas repot bagi keluarga perantau.</span>
              </li>
            </ul>
          </div>

          {/* Kartu 3: Kontak Posko & Kader RT 04 */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-700">
                <Building className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base leading-tight">
                  Posko Siaga RT 04 Sleman
                </h3>
                <p className="text-xs text-slate-400 font-medium">Koordinasi langsung jika ada pertanyaan</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="min-w-0">
                  <p className="font-black text-xs sm:text-sm text-slate-900">Pak Joko (Ketua RT 04)</p>
                  <p className="text-slate-400 text-xs font-medium">081387654321</p>
                </div>
                <a
                  href="tel:081387654321"
                  className="w-8 h-8 rounded-xl bg-[#00624E] text-white flex items-center justify-center hover:bg-[#004d3d] active:scale-95 transition-all shadow-2xs"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="min-w-0">
                  <p className="font-black text-xs sm:text-sm text-slate-900">Bu Ani (Kader Posyandu)</p>
                  <p className="text-slate-400 text-xs font-medium">08123456787</p>
                </div>
                <a
                  href="tel:08123456787"
                  className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 active:scale-95 transition-all shadow-2xs"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
