"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  User,
  Phone,
  Heart,
  Edit3,
  Check,
  Shield,
  Users,
  MapPin,
  Calendar,
  MessageSquare,
  Building,
  Save,
  CheckCircle2
} from "lucide-react";

export default function ProfilAnakPage() {
  const [editMode, setEditMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [profil, setProfil] = useState({
    nama: "Ibu Titiek",
    peran: "Anak Kandung / Penanggung Jawab Medis",
    lokasi: "Jakarta Selatan (Perantau)",
    telepon: "081298765432",
    email: "titiek.keluarga@gmail.com",
    pekerjaan: "Karyawan Swasta",
    ortu1Nama: "Bapak Prabowo (68 Tahun)",
    ortu1Alamat: "Blok C4 No. 12, RT 04, Sleman",
    ortu1Kondisi: "Hipertensi Terkontrol",
    ortu2Nama: "Ibu Lestari (65 Tahun)",
    ortu2Alamat: "Blok C4 No. 12, RT 04, Sleman",
    ortu2Kondisi: "Stabil Normal",
    kontakRtNama: "Pak Joko (Ketua RT 04)",
    kontakRtTlp: "081387654321",
    kontakPosyanduNama: "Bu Ani (Kader Posyandu)",
    kontakPosyanduTlp: "08123456787",
    catatan: "Memantau kesehatan rutin dan titipan obat harian orang tua dari Jakarta melalui platform JagaWarga RT 04.",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3500);
  };

  const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 focus:bg-white focus:border-[#00624E] focus:ring-2 focus:ring-emerald-100 focus:outline-none transition-all";
  const staticClass = "text-sm font-bold text-slate-900 bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100/90";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-36 sm:pb-32 lg:pb-12 bg-[#F8FAFC]">

      {isSaved && (
        <div className="fixed top-4 inset-x-4 z-50 max-w-md mx-auto animate-in fade-in slide-in-from-top-2">
          <div className="bg-[#00624E] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center justify-between gap-3 border border-emerald-300/40">
            <div className="flex items-center gap-2.5">
              <Check className="w-5 h-5 text-white stroke-[3] flex-shrink-0" />
              <p className="text-xs sm:text-sm font-bold">Profil akun keluarga berhasil diperbarui</p>
            </div>
            <button
              type="button"
              onClick={() => setIsSaved(false)}
              className="text-xs font-black px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full transition-all shrink-0 cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <div>
        <Link
          href="/anak"
          id="btn-back-profil-anak"
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-700 hover:text-[#00624E] font-black text-xs sm:text-sm shadow-2xs transition-all active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#00624E] group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Profil &amp; Akun Keluarga
          </h1>
          <p className="text-sm sm:text-base font-medium text-slate-500">
            Informasi identitas penanggung jawab, data orang tua terpantau, dan koordinasi dengan posko RT 04.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setEditMode(!editMode)}
          className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all border shrink-0 cursor-pointer active:scale-95 shadow-2xs ${
            editMode
              ? "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
              : "bg-[#00624E] text-white border-[#00624E] hover:bg-[#004d3d] shadow-sm shadow-emerald-500/20"
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>{editMode ? "Batal Edit" : "Ubah Profil"}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        <div className="lg:col-span-7 space-y-6">

          <div className="bg-gradient-to-br from-[#00624E] via-[#005544] to-[#004234] rounded-3xl p-6 sm:p-7 text-white shadow-xs relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/20 border-2 border-white/30 flex items-center justify-center font-black text-3xl text-white shrink-0 shadow-xs">
              IT
            </div>

            <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-100 text-[11px] font-bold uppercase tracking-wider mb-1">
                <Shield className="w-3.5 h-3.5" />
                <span>Keluarga Terverifikasi RT 04</span>
              </div>

              {editMode ? (
                <input
                  type="text"
                  required
                  value={profil.nama}
                  onChange={(e) => setProfil({ ...profil, nama: e.target.value })}
                  className="w-full bg-white/20 text-white font-black text-xl rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-white"
                />
              ) : (
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">{profil.nama}</h2>
              )}

              <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                {profil.peran} • {profil.lokasi}
              </p>

              <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[11px] font-bold text-white bg-white/15 px-3 py-1 rounded-full">
                  📱 {profil.telepon}
                </span>
                <span className="text-[11px] font-bold text-emerald-200 bg-white/10 px-3 py-1 rounded-full">
                  ✉️ {profil.email}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-[#E6F4EA] flex items-center justify-center text-[#00624E]">
                <User className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base sm:text-lg leading-tight">
                  Data Diri Penanggung Jawab
                </h3>
                <p className="text-xs text-slate-400 font-medium">Informasi anak kandung yang terdaftar dalam sistem</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Nama Lengkap</label>
                {editMode ? (
                  <input
                    type="text"
                    required
                    value={profil.nama}
                    onChange={(e) => setProfil({ ...profil, nama: e.target.value })}
                    className={inputClass}
                  />
                ) : (
                  <p className={staticClass}>{profil.nama}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Peran Keluarga</label>
                {editMode ? (
                  <input
                    type="text"
                    required
                    value={profil.peran}
                    onChange={(e) => setProfil({ ...profil, peran: e.target.value })}
                    className={inputClass}
                  />
                ) : (
                  <p className={staticClass}>{profil.peran}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Nomor WhatsApp Aktif</label>
                {editMode ? (
                  <input
                    type="tel"
                    required
                    value={profil.telepon}
                    onChange={(e) => setProfil({ ...profil, telepon: e.target.value })}
                    className={inputClass}
                  />
                ) : (
                  <p className={staticClass}>{profil.telepon}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Domisili Saat Ini</label>
                {editMode ? (
                  <input
                    type="text"
                    required
                    value={profil.lokasi}
                    onChange={(e) => setProfil({ ...profil, lokasi: e.target.value })}
                    className={inputClass}
                  />
                ) : (
                  <p className={staticClass}>{profil.lokasi}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-slate-500">Catatan Khusus Koordinasi</label>
              {editMode ? (
                <textarea
                  rows={3}
                  value={profil.catatan}
                  onChange={(e) => setProfil({ ...profil, catatan: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              ) : (
                <p className={`${staticClass} font-medium leading-relaxed`}>{profil.catatan}</p>
              )}
            </div>
          </div>

          {editMode && (
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-black text-sm text-white shadow-sm bg-[#00624E] hover:bg-[#004d3d] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Save className="w-4 h-4 stroke-[2.5]" />
                <span>Simpan Perubahan Profil</span>
              </button>
            </div>
          )}

        </div>

        <div className="lg:col-span-5 space-y-6">

          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-[#E6F4EA] flex items-center justify-center text-[#00624E]">
                <Users className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base leading-tight">
                  Orang Tua yang Dipantau
                </h3>
                <p className="text-xs text-slate-400 font-medium">Data lansia terhubung di Sleman, DIY</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-slate-900">{profil.ortu1Nama}</p>
                  <span className="text-[10px] font-black text-emerald-800 bg-[#E6F4EA] px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {profil.ortu1Kondisi}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{profil.ortu1Alamat}</span>
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <Link
                    href="/anak/kesehatan"
                    className="text-[11px] font-bold text-[#00624E] hover:underline"
                  >
                    Lihat Catatan Medis &rarr;
                  </Link>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-slate-900">{profil.ortu2Nama}</p>
                  <span className="text-[10px] font-black text-emerald-800 bg-[#E6F4EA] px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {profil.ortu2Kondisi}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{profil.ortu2Alamat}</span>
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <Link
                    href="/anak/kesehatan"
                    className="text-[11px] font-bold text-[#00624E] hover:underline"
                  >
                    Lihat Catatan Medis &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-700">
                <Building className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base leading-tight">
                  Kontak Posko &amp; Kader RT 04
                </h3>
                <p className="text-xs text-slate-400 font-medium">Jalur darurat &amp; koordinasi lingkungan</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="min-w-0">
                  <p className="font-black text-xs sm:text-sm text-slate-900">{profil.kontakRtNama}</p>
                  <p className="text-slate-400 text-xs font-medium">{profil.kontakRtTlp}</p>
                </div>
                <a
                  href={`tel:${profil.kontakRtTlp}`}
                  className="w-8 h-8 rounded-xl bg-[#00624E] text-white flex items-center justify-center hover:bg-[#004d3d] active:scale-95 transition-all shadow-2xs"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="min-w-0">
                  <p className="font-black text-xs sm:text-sm text-slate-900">{profil.kontakPosyanduNama}</p>
                  <p className="text-slate-400 text-xs font-medium">{profil.kontakPosyanduTlp}</p>
                </div>
                <a
                  href={`tel:${profil.kontakPosyanduTlp}`}
                  className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 active:scale-95 transition-all shadow-2xs"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </form>

    </div>
  );
}
