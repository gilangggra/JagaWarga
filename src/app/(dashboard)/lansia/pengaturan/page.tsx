"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeft, 
  Type, 
  Volume2, 
  Phone, 
  Bell, 
  Check, 
  ShieldCheck, 
  Save, 
  RotateCcw,
  Sparkles,
  Heart,
  BookOpen
} from "lucide-react";

function speakPrompt(text: string) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "id-ID";
      utterance.rate = 0.88;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
    }
  }
}

export default function PengaturanLansiaPage() {
  const [textSize, setTextSize] = useState<"normal" | "sedang" | "besar">("sedang");
  const [highContrast, setHighContrast] = useState(true);
  const [voiceGuide, setVoiceGuide] = useState(true);
  const [voiceSpeed, setVoiceSpeed] = useState<"slow" | "normal">("slow");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [obatPagi, setObatPagi] = useState(true);
  const [obatSiang, setObatSiang] = useState(true);
  const [obatMalam, setObatMalam] = useState(true);

  const handleSave = () => {
    setSaveSuccess(true);
    speakPrompt("Pengaturan berhasil disimpan. Tampilan dan suara telah disesuaikan untuk kenyamanan Bapak.");
    setTimeout(() => setSaveSuccess(null as unknown as boolean), 4000);
  };

  const handleReset = () => {
    setTextSize("sedang");
    setHighContrast(true);
    setVoiceGuide(true);
    setVoiceSpeed("slow");
    speakPrompt("Pengaturan dikembalikan ke standar awal yang paling nyaman untuk lansia.");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-32 lg:pb-12 bg-[#F8FAFC]">
      
      
      <div>
        <Link
          href="/lansia"
          id="btn-back-pengaturan"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-[#00624E] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Pengaturan &amp; Kenyamanan
        </h1>
        <p className="text-sm sm:text-base font-medium text-slate-500">
          Sesuaikan ukuran huruf, panduan suara, dan kontak keluarga sesuai kenyamanan Bapak.
        </p>
      </div>

      
      <div className="bg-[#E6F4EA] border border-emerald-200/80 rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#00624E] text-white flex items-center justify-center shrink-0 shadow-xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-sm sm:text-base leading-tight">
              Panduan Cara Pakai Aplikasi
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Pelajari 6 langkah mudah menggunakan JagaWarga
            </p>
          </div>
        </div>
        <Link
          href="/lansia/panduan"
          className="px-4 py-2.5 bg-[#00624E] hover:bg-[#004d3e] text-white text-xs font-black rounded-2xl shadow-sm transition-all shrink-0 active:scale-95"
        >
          Buka Panduan →
        </Link>
      </div>

      
      {saveSuccess && (
        <div className="bg-[#00624E] text-white p-4 sm:p-5 rounded-3xl shadow-sm flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-white stroke-[3]" />
            </div>
            <div>
              <p className="font-black text-sm">Pengaturan Berhasil Disimpan</p>
              <p className="text-emerald-100 text-xs font-medium mt-0.5">
                Semua preferensi kenyamanan telah aktif dan siap digunakan.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSaveSuccess(false)}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-black text-xs rounded-full transition-all shrink-0"
          >
            Tutup
          </button>
        </div>
      )}

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        
        <div className="lg:col-span-7 space-y-6">

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#00624E] flex items-center justify-center font-black">
                <Type className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-black text-slate-900 text-base sm:text-lg leading-tight">
                  Ukuran Tulisan &amp; Tampilan
                </h2>
                <p className="text-slate-400 text-xs font-medium mt-0.5">
                  Pilih ukuran huruf yang paling nyaman dibaca mata
                </p>
              </div>
            </div>

            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500">Pilihan Ukuran Huruf:</label>
              <div className="grid grid-cols-3 gap-3">
                
                <button
                  type="button"
                  onClick={() => {
                    setTextSize("normal");
                    speakPrompt("Ukuran huruf disetel normal.");
                  }}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95 ${
                    textSize === "normal"
                      ? "bg-[#E6F4EA] border-2 border-[#00624E] text-[#00624E] shadow-2xs font-black"
                      : "bg-slate-50/80 border-slate-200 text-slate-700 font-bold hover:bg-slate-100"
                  }`}
                >
                  <span className="text-sm font-bold">A</span>
                  <span className="text-xs">Normal</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTextSize("sedang");
                    speakPrompt("Ukuran huruf disetel sedang, paling nyaman.");
                  }}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95 ${
                    textSize === "sedang"
                      ? "bg-[#E6F4EA] border-2 border-[#00624E] text-[#00624E] shadow-2xs font-black"
                      : "bg-slate-50/80 border-slate-200 text-slate-700 font-bold hover:bg-slate-100"
                  }`}
                >
                  <span className="text-lg font-black">A+</span>
                  <span className="text-xs">Sedang (Rekomendasi)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTextSize("besar");
                    speakPrompt("Ukuran huruf disetel sangat besar.");
                  }}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95 ${
                    textSize === "besar"
                      ? "bg-[#E6F4EA] border-2 border-[#00624E] text-[#00624E] shadow-2xs font-black"
                      : "bg-slate-50/80 border-slate-200 text-slate-700 font-bold hover:bg-slate-100"
                  }`}
                >
                  <span className="text-2xl font-black">A++</span>
                  <span className="text-xs">Sangat Besar</span>
                </button>

              </div>
            </div>

            
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <p className="font-black text-slate-900 text-xs sm:text-sm">Kontras Layar Ekstra Tinggi</p>
                <p className="text-slate-400 text-xs mt-0.5">Membuat garis dan warna lebih tegas dan tidak silau</p>
              </div>
              <button
                type="button"
                onClick={() => setHighContrast(!highContrast)}
                className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                  highContrast ? "bg-[#00624E]" : "bg-slate-300"
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform absolute top-1 ${
                    highContrast ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>

          </div>

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center font-black">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-black text-slate-900 text-base sm:text-lg leading-tight">
                  Pemandu Suara Otomatis
                </h2>
                <p className="text-slate-400 text-xs font-medium mt-0.5">
                  Bantuan audio pembaca tombol dan petunjuk aplikasi
                </p>
              </div>
            </div>

            
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <p className="font-black text-slate-900 text-xs sm:text-sm">Bacakan Teks Saat Tombol Ditekan</p>
                <p className="text-slate-400 text-xs mt-0.5">Membantu memastikan pilihan Bapak sudah benar</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setVoiceGuide(!voiceGuide);
                  if (!voiceGuide) speakPrompt("Panduan suara diaktifkan.");
                }}
                className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                  voiceGuide ? "bg-[#00624E]" : "bg-slate-300"
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform absolute top-1 ${
                    voiceGuide ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>

            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500">Kecepatan Bicara Pemandu:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setVoiceSpeed("slow");
                    speakPrompt("Kecepatan pemandu suara disetel perlahan dan jelas.");
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all text-xs font-black cursor-pointer ${
                    voiceSpeed === "slow"
                      ? "bg-sky-50 border-2 border-sky-600 text-sky-900"
                      : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  🐢 Lambat &amp; Sangat Jelas
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVoiceSpeed("normal");
                    speakPrompt("Kecepatan pemandu suara disetel normal.");
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all text-xs font-black cursor-pointer ${
                    voiceSpeed === "normal"
                      ? "bg-sky-50 border-2 border-sky-600 text-sky-900"
                      : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  ⚡ Standar Normal
                </button>
              </div>
            </div>

            
            <button
              type="button"
              onClick={() => speakPrompt("Halo Bapak Prabowo, pemandu suara JagaWarga siap membantu setiap saat.")}
              className="w-full py-3 bg-sky-50 hover:bg-sky-100 text-sky-800 font-black text-xs sm:text-sm rounded-2xl border border-sky-200 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Volume2 className="w-4 h-4 text-sky-700" />
              <span>Uji Coba Suara Pemandu</span>
            </button>

          </div>

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-black">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-black text-slate-900 text-base sm:text-lg leading-tight">
                  Pengingat Obat Harian
                </h2>
                <p className="text-slate-400 text-xs font-medium mt-0.5">
                  Alarm suara lembut otomatis ke ponsel Bapak
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🌅</span>
                  <div>
                    <p className="font-black text-xs sm:text-sm text-slate-900">Pagi (07:00 WIB)</p>
                    <p className="text-slate-400 text-[11px]">Obat Darah Tinggi (Amlodipine 5mg)</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setObatPagi(!obatPagi)}
                  className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                    obatPagi ? "bg-[#00624E]" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform absolute top-1 ${
                      obatPagi ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>

              
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70">
                <div className="flex items-center gap-3">
                  <span className="text-lg">☀️</span>
                  <div>
                    <p className="font-black text-xs sm:text-sm text-slate-900">Siang (13:00 WIB)</p>
                    <p className="text-slate-400 text-[11px]">Vitamin &amp; Kalsium Tulang</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setObatSiang(!obatSiang)}
                  className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                    obatSiang ? "bg-[#00624E]" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform absolute top-1 ${
                      obatSiang ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>

              
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🌙</span>
                  <div>
                    <p className="font-black text-xs sm:text-sm text-slate-900">Malam (20:00 WIB)</p>
                    <p className="text-slate-400 text-[11px]">Obat Kolesterol &amp; Lambung</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setObatMalam(!obatMalam)}
                  className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                    obatMalam ? "bg-[#00624E]" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform absolute top-1 ${
                      obatMalam ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>

          </div>

        </div>

        
        <div className="lg:col-span-5 space-y-6">

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-black">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-black text-slate-900 text-base sm:text-lg leading-tight">
                  Kontak Darurat Keluarga
                </h2>
                <p className="text-slate-400 text-xs font-medium mt-0.5">
                  Nomor utama yang menerima kabar harian
                </p>
              </div>
            </div>

            
            <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-black text-slate-900 text-sm">Dewi Lestari</p>
                  <p className="text-xs text-slate-500 font-medium">Anak Kandung (Perantauan Jakarta)</p>
                </div>
                <span className="text-[10.5px] font-black text-[#00624E] bg-[#E6F4EA] border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Terhubung
                </span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-700 pt-1">
                WhatsApp: 0812-3456-7890
              </p>
            </div>

            <p className="text-xs text-slate-400 font-medium">
              Setiap kali Bapak menekan tombol kabar atau bantuan, laporan otomatis terkirim ke WhatsApp Dewi.
            </p>
          </div>

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#00624E] flex items-center justify-center font-black">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-black text-slate-900 text-base sm:text-lg leading-tight">
                  Data Warga Terdaftar
                </h2>
                <p className="text-slate-400 text-xs font-medium mt-0.5">
                  Identitas resmi di posko RT 04
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
                <span className="text-slate-400 font-medium">Nama Kepala Rumah:</span>
                <span className="font-black text-slate-800">Bapak Prabowo</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
                <span className="text-slate-400 font-medium">Alamat Rumah:</span>
                <span className="font-bold text-slate-800">Blok C4, No. 12</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
                <span className="text-slate-400 font-medium">Lingkungan:</span>
                <span className="font-bold text-slate-800">RT 04 / RW 01 Sukamaju</span>
              </div>
            </div>
          </div>

          
          <div className="space-y-3 pt-2">
            <button
              id="btn-save-settings"
              type="button"
              onClick={handleSave}
              className="w-full py-4 rounded-2xl font-black text-sm sm:text-base text-white shadow-sm bg-[#00624E] hover:bg-[#004d3d] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>Simpan Pengaturan Sekarang</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3 rounded-2xl font-bold text-xs sm:text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Kembalikan ke Standar Nyaman</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
