"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeft, 
  Check, 
  Car, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  AlertCircle
} from "lucide-react";

export default function StatusPage() {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [bantuanSelesai, setBantuanSelesai] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-36 sm:pb-32 lg:pb-12 bg-[#F8FAFC]">
      
      
      <div>
        <Link
          href="/lansia"
          id="btn-back-status"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-[#00624E] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Lacak Bantuan &amp; Serah Terima
        </h1>
        <p className="text-sm sm:text-base font-medium text-slate-500">
          Relawan terdekat sedang memproses permintaan obat Bapak Prabowo.
        </p>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        
        <div className="lg:col-span-7 space-y-6">

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Proses Langsung</span>
                <h2 className="font-black text-slate-900 text-lg leading-tight">Status Perjalanan</h2>
              </div>
              <span className="text-xs font-black text-emerald-800 bg-[#E6F4EA] border border-emerald-200/80 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00624E]" />
                <span>Estimasi ~6 Menit</span>
              </span>
            </div>

            
            <div className="space-y-6 relative pl-2">
              
              
              <div className="flex items-start gap-4 relative">
                <div className="absolute left-4 top-9 bottom-[-24px] w-[2px] bg-[#00624E]" />
                
                <div className="w-8 h-8 rounded-full bg-[#00624E] text-white flex items-center justify-center font-black text-xs flex-shrink-0 z-10 shadow-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                
                <div className="flex-1 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <div className="flex items-center justify-between">
                    <p className="font-black text-sm text-slate-900">Permintaan Dibuat</p>
                    <span className="text-[11px] font-bold text-slate-500">10:42 WIB</span>
                  </div>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    Permintaan obat darah tinggi (Amlodipine) tercatat dan diterima relawan.
                  </p>
                </div>
              </div>

              
              <div className="flex items-start gap-4 relative">
                <div className="absolute left-4 top-9 bottom-[-24px] w-[2px] bg-slate-200" />
                
                <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-black text-xs flex-shrink-0 z-10 shadow-md ring-4 ring-sky-100 animate-pulse">
                  <Car className="w-4 h-4" />
                </div>
                
                <div className="flex-1 p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200">
                  <div className="flex items-center justify-between">
                    <p className="font-black text-sm text-sky-950">Relawan Menuju Lokasi</p>
                    <span className="text-[11px] font-black text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                      Sedang Jalan
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-sky-900/90 mt-1 leading-relaxed">
                    Pak Teddy sedang membelikan obat di apotek • Estimasi tiba 6 menit ke rumah Bapak.
                  </p>
                </div>
              </div>

              
              <div className="flex items-start gap-4 relative">
                <div className="absolute left-4 top-9 bottom-[-24px] w-[2px] bg-slate-200" />
                
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 text-slate-400 flex items-center justify-center font-black text-xs flex-shrink-0 z-10">
                  3
                </div>
                
                <div className="flex-1 p-3.5 rounded-2xl bg-white border border-slate-100 opacity-60">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm text-slate-800">Tiba di Lokasi &amp; Penyerahan</p>
                    <span className="text-[11px] font-medium text-slate-400">Pintu Rumah</span>
                  </div>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">
                    Relawan sampai dan menyerahkan obat pesanan di depan pintu rumah.
                  </p>
                </div>
              </div>

              
              <div className="flex items-start gap-4 relative">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 text-slate-400 flex items-center justify-center font-black text-xs flex-shrink-0 z-10">
                  4
                </div>
                
                <div className="flex-1 p-3.5 rounded-2xl bg-white border border-slate-100 opacity-60">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm text-slate-800">Selesai &amp; Terverifikasi</p>
                    <span className="text-[11px] font-medium text-slate-400">Otomatis</span>
                  </div>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">
                    Konfirmasi selesai terkirim otomatis ke Dewi (Anak) via WhatsApp.
                  </p>
                </div>
              </div>

            </div>
          </div>

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-base">Relawan yang Bertugas</h3>
              <span className="text-[11px] font-bold text-emerald-800 bg-[#E6F4EA] border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Siaga Aktif
              </span>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/70">
              <div className="w-12 h-12 rounded-2xl bg-[#00624E] text-white flex items-center justify-center font-black text-base shadow-xs flex-shrink-0">
                PT
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-black text-slate-900 text-sm sm:text-base leading-snug truncate">
                  Pak Teddy
                </p>
                <p className="text-slate-500 text-xs font-medium truncate">
                  Tetangga Blok C4, No. 12
                </p>
                <p className="text-xs font-bold text-[#00624E] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>50m dari rumah Bapak</span>
                </p>
              </div>
            </div>

            <button
              id="btn-call-volunteer"
              onClick={() => setShowCallModal(true)}
              className="w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm text-white shadow-sm bg-[#00624E] hover:bg-[#004d3d] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Telepon Relawan Pak Teddy</span>
            </button>
          </div>

        </div>

        
        <div className="lg:col-span-5 space-y-4">

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-5 text-center">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="text-left">
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Verifikasi Aman</span>
                <h2 className="font-black text-slate-900 text-lg leading-tight">Keamanan &amp; Serah Terima</h2>
              </div>
              <span className="w-8 h-8 rounded-full bg-[#E6F4EA] text-[#00624E] flex items-center justify-center shadow-2xs">
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              </span>
            </div>

            
            <p className="text-xs sm:text-sm text-slate-600 font-semibold max-w-sm mx-auto leading-relaxed">
              Tunjukkan QR ini kepada Pak Teddy, atau sebutkan PIN 4 angka di bawah:
            </p>

            
            <div className="w-56 h-56 mx-auto bg-white p-3.5 rounded-2xl border-2 border-slate-200/80 shadow-xs flex items-center justify-center relative group">
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
                <rect x="40" y="30" width="20" height="20" rx="4" fill="#00624E" />
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
              </svg>
              
              <div className="absolute inset-0 m-auto w-10 h-10 rounded-xl bg-[#00624E] text-white flex items-center justify-center shadow-md border-2 border-white">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>

            
            <div className="bg-[#00624E] text-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-200">
                KODE PIN KEAMANAN
              </p>
              <p className="text-3xl sm:text-4xl font-black tracking-[0.4em] font-mono leading-none py-1">
                8 2 4 1
              </p>
              <p className="text-[10.5px] text-emerald-100 font-medium">
                Sebutkan 4 angka di atas saat serah terima barang
              </p>
            </div>

            
            <button
              onClick={() => setBantuanSelesai(true)}
              className="w-full py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Check className="w-3.5 h-3.5 text-[#00624E]" />
              <span>Simulasikan Barang Diterima</span>
            </button>

          </div>

          
          <div className="text-center pt-2">
            <button
              id="btn-cancel-help"
              onClick={() => setShowCancelModal(true)}
              className="text-xs font-bold text-slate-400 hover:text-rose-600 transition-colors py-1 cursor-pointer"
            >
              Batalkan Permintaan Bantuan
            </button>
          </div>

        </div>

      </div>

      
      {showCancelModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setShowCancelModal(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shadow-xs">
              <AlertCircle className="w-7 h-7 stroke-[2.2]" />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 leading-tight">
                Batalkan Permintaan Bantuan?
              </h3>
              <p className="text-slate-500 text-xs font-medium mt-1">
                Pak Teddy sudah dalam perjalanan. Apakah Bapak yakin ingin membatalkan bantuan ini?
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <Link
                href="/lansia"
                className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center"
              >
                Ya, Batalkan Sekarang
              </Link>
              <button
                onClick={() => setShowCancelModal(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-2xl transition-all cursor-pointer"
              >
                Tidak, Lanjutkan Bantuan
              </button>
            </div>
          </div>
        </div>
      )}

      
      {showCallModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setShowCallModal(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E6F4EA] text-[#00624E] flex items-center justify-center shadow-xs">
              <Phone className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 leading-tight">Hubungi Pak Teddy</h3>
              <p className="text-[#00624E] text-xs font-bold mt-0.5">Relawan Siaga Aktif (50m)</p>
              <p className="text-slate-400 text-xs mt-1">Nomor Telepon: 0812-3456-7890</p>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href="tel:081234567890"
                className="w-full py-3.5 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Panggil Sekarang</span>
              </a>
              <button
                onClick={() => setShowCallModal(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-2xl transition-all cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      
      {bantuanSelesai && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setBantuanSelesai(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-md p-6 sm:p-8 text-center shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#00624E] text-white flex items-center justify-center shadow-md">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 leading-tight">Alhamdulillah, Bantuan Selesai</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-1">
                Obat telah diserahkan dengan aman oleh Pak Teddy. Laporan otomatis terkirim ke Dewi (Anak) dan Posko RT 04.
              </p>
            </div>
            <Link
              href="/lansia"
              className="block w-full py-3.5 bg-[#00624E] hover:bg-[#004d3d] text-white font-black text-xs sm:text-sm rounded-2xl shadow-md active:scale-95 transition-all text-center"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
