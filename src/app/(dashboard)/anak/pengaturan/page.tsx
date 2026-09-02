"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeft, 
  Bell, 
  Smartphone, 
  Users, 
  ShieldCheck, 
  Save, 
  Check, 
  Phone, 
  Volume2, 
  MapPin,
  MessageSquare
} from "lucide-react";

export default function AnakPengaturanPage() {
  const [waCheckin, setWaCheckin] = useState(true);
  const [waBantuan, setWaBantuan] = useState(true);
  const [waTensi, setWaTensi] = useState(true);
  const [soundSos, setSoundSos] = useState(true);
  const [nomorHp, setNomorHp] = useState("081298765432");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-36 sm:pb-32 lg:pb-12 bg-[#F8FAFC]">

      
      {isSaved && (
        <div className="fixed top-4 inset-x-4 z-50 max-w-md mx-auto animate-in fade-in slide-in-from-top-2">
          <div className="bg-[#00624E] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center justify-between gap-3 border border-emerald-300/40">
            <div className="flex items-center gap-2.5">
              <Check className="w-5 h-5 text-white stroke-[3] flex-shrink-0" />
              <p className="text-xs sm:text-sm font-bold">Pengaturan notifikasi keluarga berhasil disimpan</p>
            </div>
            <button onClick={() => setIsSaved(false)} className="text-xs font-black px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full transition-all shrink-0 cursor-pointer">
              Tutup
            </button>
          </div>
        </div>
      )}

      
      <div>
        <Link
          href="/anak"
          id="btn-back-pengaturan-anak"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-[#00624E] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Pengaturan &amp; Notifikasi
        </h1>
        <p className="text-sm sm:text-base font-medium text-slate-500">
          Atur nomor WhatsApp penerima notifikasi kabar harian dan koordinasi posko RT 04.
        </p>
      </div>

      
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        
        <div className="lg:col-span-7 space-y-6">

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-[#E6F4EA] flex items-center justify-center text-[#00624E]">
                <MessageSquare className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base leading-tight">
                  Notifikasi WhatsApp &amp; SMS
                </h3>
                <p className="text-xs text-slate-400 font-medium">Pengingat otomatis keadaan orang tua di Sleman</p>
              </div>
            </div>

            
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider">
                Nomor WhatsApp Anda (Ibu Titiek)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={nomorHp}
                  onChange={(e) => setNomorHp(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 focus:bg-white focus:border-[#00624E] focus:ring-2 focus:ring-emerald-100 focus:outline-none transition-all"
                  placeholder="08123456789"
                />
                <span className="absolute right-3.5 top-3 text-[11px] font-black text-[#00624E] bg-[#E6F4EA] border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Terverifikasi
                </span>
              </div>
            </div>

            
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
              <div className="space-y-0.5 max-w-[80%]">
                <p className="text-sm font-black text-slate-900 leading-tight">Peringatan Belum Check-in Pagi</p>
                <p className="text-xs text-slate-500 font-medium">
                  Kirim pesan WhatsApp jika orang tua belum menyapa sistem lewat jam 08:30 WIB.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setWaCheckin(!waCheckin)}
                className={`w-12 h-7 rounded-full transition-colors relative p-1 cursor-pointer shrink-0 ${
                  waCheckin ? "bg-[#00624E]" : "bg-slate-300"
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  waCheckin ? "translate-x-5" : "translate-x-0"
                }`} />
              </button>
            </div>

            
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
              <div className="space-y-0.5 max-w-[80%]">
                <p className="text-sm font-black text-slate-900 leading-tight">Status Penyerahan Bantuan</p>
                <p className="text-xs text-slate-500 font-medium">
                  Notifikasi real-time saat relawan selesai membelikan obat dan menyerahkannya ke rumah.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setWaBantuan(!waBantuan)}
                className={`w-12 h-7 rounded-full transition-colors relative p-1 cursor-pointer shrink-0 ${
                  waBantuan ? "bg-[#00624E]" : "bg-slate-300"
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  waBantuan ? "translate-x-5" : "translate-x-0"
                }`} />
              </button>
            </div>

            
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
              <div className="space-y-0.5 max-w-[80%]">
                <p className="text-sm font-black text-slate-900 leading-tight">Rekap Tensi &amp; Posyandu</p>
                <p className="text-xs text-slate-500 font-medium">
                  Dapatkan laporan hasil tensi dari kader posyandu setiap Sabtu sore.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setWaTensi(!waTensi)}
                className={`w-12 h-7 rounded-full transition-colors relative p-1 cursor-pointer shrink-0 ${
                  waTensi ? "bg-[#00624E]" : "bg-slate-300"
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  waTensi ? "translate-x-5" : "translate-x-0"
                }`} />
              </button>
            </div>

          </div>

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                <Volume2 className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base leading-tight">
                  Peringatan Suara Darurat SOS
                </h3>
                <p className="text-xs text-slate-400 font-medium">Bunyi sirene instan pada HP Anda saat lansia butuh darurat</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100">
              <div className="space-y-0.5 max-w-[80%]">
                <p className="text-sm font-black text-slate-900 leading-tight">Bunyikan Alarm Bypass Suara Hening</p>
                <p className="text-xs text-slate-500 font-medium">
                  HP Anda akan tetap berbunyi keras meski dalam mode diam (Silent/Do Not Disturb).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSoundSos(!soundSos)}
                className={`w-12 h-7 rounded-full transition-colors relative p-1 cursor-pointer shrink-0 ${
                  soundSos ? "bg-rose-600" : "bg-slate-300"
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  soundSos ? "translate-x-5" : "translate-x-0"
                }`} />
              </button>
            </div>
          </div>

          
          <button
            type="submit"
            className="w-full py-4 rounded-2xl font-black text-sm sm:text-base text-white shadow-sm bg-[#00624E] hover:bg-[#004d3d] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Pengaturan</span>
          </button>

        </div>

        
        <div className="lg:col-span-5 space-y-6">

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Sinkronisasi</span>
                <h3 className="font-black text-slate-900 text-base leading-tight mt-0.5">
                  Orang Tua Terdaftar
                </h3>
              </div>
              <span className="text-[11px] font-black text-[#00624E] bg-[#E6F4EA] border border-emerald-200 px-2.5 py-0.5 rounded-full">
                2 Lansia
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#E6F4EA] text-[#00624E] font-black text-sm flex items-center justify-center">
                    BP
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm leading-tight">Bapak Prabowo</h4>
                    <p className="text-slate-400 text-xs font-medium">68 Tahun • Blok C4 No. 12</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#00624E]">Aktif</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 font-black text-sm flex items-center justify-center">
                    IL
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm leading-tight">Ibu Lestari</h4>
                    <p className="text-slate-400 text-xs font-medium">65 Tahun • Blok C4 No. 12</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#00624E]">Aktif</span>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Komunitas Warga</span>
                <h3 className="font-black text-slate-900 text-base leading-tight mt-0.5">
                  Posko RT 04 Sleman
                </h3>
              </div>
              <span className="text-[11px] font-black text-[#00624E] bg-[#E6F4EA] border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Siaga
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-600 font-medium leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00624E] shrink-0 mt-0.5" />
                <p>Balai Pertemuan RT 04 / RW 02, Kec. Sleman, D.I. Yogyakarta</p>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#E6F4EA]/60 border border-emerald-200/80">
                <div>
                  <p className="font-black text-slate-900 text-xs">Pak Joko (Ketua RT 04)</p>
                  <p className="text-slate-500 text-[11px]">Koordinator Relawan Lansia</p>
                </div>
                <a
                  href="tel:08123456788"
                  className="px-3 py-1.5 bg-white text-[#00624E] border border-emerald-200 rounded-xl font-black text-xs shadow-2xs hover:bg-emerald-50 transition-colors"
                >
                  Telepon
                </a>
              </div>
            </div>
          </div>

        </div>

      </form>

    </div>
  );
}
