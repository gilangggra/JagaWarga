"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  User,
  Phone,
  Heart,
  AlertTriangle,
  Edit3,
  Save,
  Check,
  Shield,
  Users,
  Activity,
  Calendar,
  Sparkles,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export default function ProfilPage() {
  const [editMode, setEditMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [profil, setProfil] = useState({
    nama: "Bapak Prabowo",
    usia: "68",
    blok: "Blok C4 No. 12",
    telepon: "081234567890",
    golDarah: "B+",
    tinggiBadan: "168",
    beratBadan: "65",
    riwayatPenyakit: "Hipertensi, Diabetes Tipe 2",
    alergiObat: "Penisilin",
    kontakDarurat1Nama: "Ibu Titiek (Anak)",
    kontakDarurat1Tlp: "081298765432",
    kontakDarurat2Nama: "Pak Joko (Ketua RT 04)",
    kontakDarurat2Tlp: "081387654321",
    dokterNama: "dr. Sari Utami, Sp.PD",
    dokterTempat: "Puskesmas Condongcatur",
    dokterTlp: "0274-123456",
    catatan: "Rutin kontrol tensi setiap 2 minggu di Posyandu Lansia. Minum obat Amlodipin 5mg pagi hari.",
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
              <p className="text-xs sm:text-sm font-bold">Profil kesehatan berhasil diperbarui</p>
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
          href="/lansia"
          id="btn-back-profil"
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-700 hover:text-[#00624E] font-black text-xs sm:text-sm shadow-2xs transition-all active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#00624E] group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Profil &amp; Data Medis Saya
          </h1>
          <p className="text-sm sm:text-base font-medium text-slate-500">
            Informasi identitas, rekam kondisi kesehatan, dan kontak darurat Bapak Prabowo.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setEditMode(!editMode)}
          className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all border shrink-0 cursor-pointer active:scale-95 shadow-2xs ${
            editMode
              ? "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
              : "bg-[#00624E] text-white border-[#00624E] hover:bg-[#004d3e] shadow-sm shadow-emerald-500/20"
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
              BP
            </div>

            <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-100 text-[11px] font-bold uppercase tracking-wider mb-1">
                <Shield className="w-3.5 h-3.5" />
                <span>Warga Lansia Tanggap RT 04</span>
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
                {profil.usia} Tahun • {profil.blok}, Sleman, D.I. Yogyakarta
              </p>

              <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-white/10 text-white text-xs font-bold border border-white/10">
                  <Heart className="w-3.5 h-3.5 text-rose-300" /> Gol. Darah: {profil.golDarah}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-white/10 text-white text-xs font-bold border border-white/10">
                  <Activity className="w-3.5 h-3.5 text-emerald-300" /> Tensi: 120/80
                </span>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
              <div className="w-11 h-11 rounded-2xl bg-[#E6F4EA] text-[#00624E] flex items-center justify-center font-black shrink-0">
                <User className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base sm:text-lg leading-tight">
                  Data Diri &amp; Fisik
                </h3>
                <p className="text-xs text-slate-400 font-medium">Informasi biologis untuk penanganan medis awal</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Usia</label>
                {editMode ? (
                  <input
                    type="number"
                    value={profil.usia}
                    onChange={(e) => setProfil({ ...profil, usia: e.target.value })}
                    className={inputClass}
                  />
                ) : (
                  <p className={staticClass}>{profil.usia} Tahun</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Golongan Darah</label>
                {editMode ? (
                  <input
                    type="text"
                    value={profil.golDarah}
                    onChange={(e) => setProfil({ ...profil, golDarah: e.target.value })}
                    className={inputClass}
                  />
                ) : (
                  <p className={staticClass}>{profil.golDarah}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Tinggi Badan</label>
                {editMode ? (
                  <input
                    type="number"
                    value={profil.tinggiBadan}
                    onChange={(e) => setProfil({ ...profil, tinggiBadan: e.target.value })}
                    className={inputClass}
                  />
                ) : (
                  <p className={staticClass}>{profil.tinggiBadan} cm</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Berat Badan</label>
                {editMode ? (
                  <input
                    type="number"
                    value={profil.beratBadan}
                    onChange={(e) => setProfil({ ...profil, beratBadan: e.target.value })}
                    className={inputClass}
                  />
                ) : (
                  <p className={staticClass}>{profil.beratBadan} kg</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Alamat Lengkap</label>
              {editMode ? (
                <input
                  type="text"
                  value={profil.blok}
                  onChange={(e) => setProfil({ ...profil, blok: e.target.value })}
                  className={inputClass}
                />
              ) : (
                <p className={staticClass}>{profil.blok}, RT 04 / RW 02, Condongcatur, Sleman</p>
              )}
            </div>
          </div>

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
              <div className="w-11 h-11 rounded-2xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center font-black shrink-0">
                <Heart className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base sm:text-lg leading-tight">
                  Riwayat Medis &amp; Catatan Obat
                </h3>
                <p className="text-xs text-slate-400 font-medium">Penting diketahui oleh relawan saat membelikan obat</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#E6F4EA]/70 border border-emerald-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00624E] shrink-0" />
                <span className="font-black text-[#00624E]">Status: Terverifikasi (Proxy Fill)</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Dikelola oleh Titiek (Anak) &amp; Kader Posyandu RT 04</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Diagnosis Penyakit Kronis</label>
                {editMode ? (
                  <textarea
                    rows={2}
                    value={profil.riwayatPenyakit}
                    onChange={(e) => setProfil({ ...profil, riwayatPenyakit: e.target.value })}
                    className={inputClass}
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profil.riwayatPenyakit.split(", ").map((p) => (
                      <span key={p} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-rose-50 text-[#DC2626] text-xs font-black border border-rose-200">
                        <Heart className="w-3.5 h-3.5" />
                        <span>{p}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Alergi Obat Tertentu</label>
                {editMode ? (
                  <input
                    type="text"
                    value={profil.alergiObat}
                    onChange={(e) => setProfil({ ...profil, alergiObat: e.target.value })}
                    className={inputClass}
                  />
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-amber-50 text-amber-900 text-xs font-black border border-amber-200">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Alergi: {profil.alergiObat}</span>
                  </span>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Catatan Tambahan Relawan</label>
                {editMode ? (
                  <textarea
                    rows={3}
                    value={profil.catatan}
                    onChange={(e) => setProfil({ ...profil, catatan: e.target.value })}
                    className={inputClass}
                  />
                ) : (
                  <p className="text-xs sm:text-sm font-semibold text-slate-700 bg-slate-50 rounded-2xl p-4 border border-slate-100 leading-relaxed">
                    {profil.catatan}
                  </p>
                )}
              </div>
            </div>
          </div>

          
          {editMode && (
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 bg-[#00624E] hover:bg-[#004d3e] active:scale-95 text-white font-black text-sm py-4 rounded-3xl shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Save className="w-5 h-5" />
              <span>Simpan Perubahan Data Profil</span>
            </button>
          )}
        </div>

        
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Siaga 24 Jam</span>
                <h3 className="font-black text-slate-900 text-base leading-tight mt-0.5">Kontak Darurat</h3>
              </div>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">Prioritas</span>
            </div>

            <div className="space-y-3">
              
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#00624E] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                    IT
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-slate-900 text-sm truncate">{profil.kontakDarurat1Nama}</p>
                    <p className="text-xs text-slate-500 font-bold">{profil.kontakDarurat1Tlp}</p>
                  </div>
                </div>
                <a
                  href={`tel:${profil.kontakDarurat1Tlp}`}
                  className="w-9 h-9 rounded-2xl bg-white text-[#00624E] border border-slate-200 hover:bg-emerald-50 flex items-center justify-center shadow-2xs active:scale-95 transition-all shrink-0"
                  title="Telepon Anak"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                    JW
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-slate-900 text-sm truncate">{profil.kontakDarurat2Nama}</p>
                    <p className="text-xs text-slate-500 font-bold">{profil.kontakDarurat2Tlp}</p>
                  </div>
                </div>
                <a
                  href={`tel:${profil.kontakDarurat2Tlp}`}
                  className="w-9 h-9 rounded-2xl bg-white text-[#00624E] border border-slate-200 hover:bg-emerald-50 flex items-center justify-center shadow-2xs active:scale-95 transition-all shrink-0"
                  title="Telepon Ketua RT"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Rujukan Faskes</span>
                <h3 className="font-black text-slate-900 text-base leading-tight mt-0.5">Dokter &amp; Puskesmas</h3>
              </div>
              <Users className="w-4 h-4 text-purple-600" />
            </div>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100/80 space-y-1">
                <p className="text-xs font-extrabold uppercase tracking-wider text-purple-700">Dokter Keluarga</p>
                <p className="font-black text-slate-900 text-sm">{profil.dokterNama}</p>
                <p className="text-xs text-slate-600 font-medium">{profil.dokterTempat}</p>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="space-y-0.5">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Layanan Darurat Puskesmas</p>
                  <p className="font-black text-slate-900 text-sm">{profil.dokterTlp}</p>
                </div>
                <a
                  href={`tel:${profil.dokterTlp}`}
                  className="w-9 h-9 rounded-2xl bg-[#E6F4EA] text-[#00624E] border border-emerald-200 hover:bg-emerald-100 flex items-center justify-center active:scale-95 transition-all shadow-2xs"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          
          <div className="bg-[#E6F4EA] border border-emerald-200/80 rounded-3xl p-5 sm:p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-[#00624E]">
              <Sparkles className="w-5 h-5 stroke-[2.2]" />
              <span className="text-xs font-black uppercase tracking-wider">Rekap Aktivitas Pos RT 04</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-white rounded-2xl p-3.5 border border-emerald-100 text-center shadow-2xs">
                <p className="text-xl sm:text-2xl font-black text-[#00624E]">6x</p>
                <p className="text-[11px] font-bold text-slate-500 mt-0.5">Bantuan Diterima</p>
              </div>
              <div className="bg-white rounded-2xl p-3.5 border border-emerald-100 text-center shadow-2xs">
                <p className="text-xl sm:text-2xl font-black text-[#00624E]">100%</p>
                <p className="text-[11px] font-bold text-slate-500 mt-0.5">Check-in Pagi</p>
              </div>
            </div>
          </div>

        </div>

      </form>
    </div>
  );
}
