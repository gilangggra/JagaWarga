"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Pill, 
  ShoppingCart, 
  Heart, 
  Accessibility, 
  Mic, 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  Check, 
  Send,
  Zap
} from "lucide-react";

function speakPrompt(text: string) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "id-ID";
      utterance.rate = 0.92;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
    }
  }
}

const BANTUAN_LIST = [
  {
    id: "obat_rutin",
    label: "Beli Obat",
    desc: "Apotek & Resep",
    kategori: "obat",
    containerBg: "bg-[#FEE2E2]",
    iconColor: "text-[#DC2626]",
    speakText: "Memilih Beli Obat di Apotek.",
    icon: <Pill className="w-7 h-7 stroke-[2.2]" />,
  },
  {
    id: "makanan",
    label: "Beli Sayur",
    desc: "Warung RT",
    kategori: "belanja",
    containerBg: "bg-[#FFEDD5]",
    iconColor: "text-[#EA580C]",
    speakText: "Memilih Beli Sayur di Warung RT.",
    icon: <ShoppingCart className="w-7 h-7 stroke-[2.2]" />,
  },
  {
    id: "pendampingan",
    label: "Teman Jalan",
    desc: "Posyandu & Dokter",
    kategori: "cek_rumah",
    containerBg: "bg-[#F3E8FF]",
    iconColor: "text-[#9333EA]",
    speakText: "Memilih Teman Jalan ke Posyandu dan Dokter.",
    icon: <Heart className="w-7 h-7 stroke-[2.2]" />,
  },
  {
    id: "antar_jemput",
    label: "Pinjam Alkes",
    desc: "Kursi Roda & O2",
    kategori: "lainnya",
    containerBg: "bg-[#E6F4EA]",
    iconColor: "text-[#00624E]",
    speakText: "Memilih Pinjam Alat Kesehatan Kas RT.",
    icon: <Accessibility className="w-7 h-7 stroke-[2.2]" />,
  },
];

const RELAWAN_LIST = [
  { inisial: "BS", nama: "Budi Santoso", peran: "Relawan Siaga", jarak: "50m", estimasi: "< 1 mnt", color: "bg-teal-600", telp: "08123456789" },
  { inisial: "JW", nama: "Pak Joko", peran: "Ketua RT 04", jarak: "100m", estimasi: "~2 mnt", color: "bg-amber-600", telp: "08123456788" },
  { inisial: "AN", nama: "Bu Ani", peran: "Kader Posyandu", jarak: "120m", estimasi: "~3 mnt", color: "bg-rose-500", telp: "08123456787" },
];

const VOICE_SAMPLE_TEXTS: Record<string, string> = {
  obat_rutin: "Tolong belikan obat darah tinggi (Amlodipine 5mg) di apotek depan, resep ada di meja ruang tamu.",
  makanan: "Tolong belikan sayur bayam 2 ikat, tahu 5 biji, dan tempe di warung Bu RT.",
  pendampingan: "Saya perlu ditemani ke Posyandu RT 04 sore nanti pukul empat untuk cek tensi rutin.",
  antar_jemput: "Bisa tolong pinjamkan kursi roda lipat dari pos RT untuk dipakai kontrol ke dokter besok?",
};

function BantuanContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const kategoriParam = searchParams.get("kategori");

  const [selected, setSelected] = useState<string>(
    BANTUAN_LIST.find((b) => b.kategori === kategoriParam)?.id ?? BANTUAN_LIST[0].id
  );
  const [catatan, setCatatan] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [voiceStep, setVoiceStep] = useState<"idle" | "listening" | "transcribed">("idle");
  const [voiceText, setVoiceText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedItem = BANTUAN_LIST.find((b) => b.id === selected) ?? BANTUAN_LIST[0];

  useEffect(() => {
    if (!isRecording) return;
    setVoiceStep("listening");
    setVoiceText("");
    const t = setTimeout(() => {
      setVoiceStep("transcribed");
      setVoiceText(VOICE_SAMPLE_TEXTS[selected] ?? "Tolong bantu kebutuhan saya, terima kasih relawan RT.");
    }, 2200);
    return () => clearTimeout(t);
  }, [isRecording, selected]);

  const handleKirim = () => {
    if (!selected) return;
    setIsSubmitting(true);
    speakPrompt(`Permintaan ${selectedItem.label} berhasil dikirim ke relawan terdekat.`);
    setTimeout(() => router.push("/lansia/status"), 600);
  };

  const handleSendVoice = () => {
    setIsRecording(false);
    setIsSubmitting(true);
    speakPrompt(`Permintaan suara ${selectedItem.label} berhasil dikirim ke relawan terdekat.`);
    setTimeout(() => router.push("/lansia/status"), 600);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-32 lg:pb-12 bg-[#F8FAFC]">

      
      <div>
        <Link
          href="/lansia"
          id="btn-back-bantuan"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-[#00624E] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Minta Bantuan Warga
        </h1>
        <p className="text-sm sm:text-base font-medium text-slate-500">
          Pilih kebutuhan Bapak/Ibu, relawan terdekat siap mengantarkan dalam &lt;5 menit.
        </p>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        
        <div className="lg:col-span-7 space-y-6">

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#00624E] text-white font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h2 className="font-black text-slate-900 text-base sm:text-lg">
                  Pilih Kebutuhan
                </h2>
              </div>

              <button
                type="button"
                onClick={() => speakPrompt("Pilihan kebutuhan: Beli Obat, Beli Sayur, Teman Jalan, dan Pinjam Alkes.")}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-black transition-all border border-sky-200 active:scale-95"
              >
                <Volume2 className="w-3.5 h-3.5 text-sky-700" />
                <span>Panduan Suara</span>
              </button>
            </div>

            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {BANTUAN_LIST.map((item) => {
                const isSelected = selected === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    id={`bantuan-${item.id}`}
                    onClick={() => {
                      setSelected(item.id);
                      speakPrompt(item.speakText);
                    }}
                    className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 min-h-[140px] sm:min-h-[155px] active:scale-[0.98] ${
                      isSelected
                        ? "bg-[#E6F4EA] border-[2.5px] border-[#00624E] shadow-sm"
                        : "bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-2xs"
                    }`}
                  >
                    
                    <div className="flex items-center justify-between w-full">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center ${item.containerBg} ${item.iconColor} shadow-2xs group-hover:scale-105 transition-transform`}>
                        {item.icon}
                      </div>

                      {isSelected && (
                        <span className="w-6 h-6 bg-[#00624E] text-white rounded-full flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      )}
                    </div>

                    
                    <div className="mt-3">
                      <p className={`font-black text-sm sm:text-base leading-tight ${isSelected ? "text-[#00624E]" : "text-slate-900"}`}>
                        {item.label}
                      </p>
                      <p className={`text-xs font-medium mt-0.5 ${isSelected ? "text-emerald-900/80" : "text-slate-500"}`}>
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#00624E] text-white font-black text-xs flex items-center justify-center">
                2
              </span>
              <h2 className="font-black text-slate-900 text-base sm:text-lg">
                Sampaikan Detail Bantuan
              </h2>
            </div>

            
            <div className="bg-sky-50/80 border border-sky-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-xs flex-shrink-0">
                  <Mic className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-black text-slate-900 text-sm sm:text-base leading-tight">
                    Rekam Pesan Suara
                  </p>
                  <p className="text-xs text-sky-800 font-medium mt-0.5">
                    Paling mudah &amp; praktis tanpa perlu mengetik
                  </p>
                </div>
              </div>

              <button
                type="button"
                id="btn-voice-record"
                onClick={() => setIsRecording(true)}
                className="w-full sm:w-auto px-5 py-2.5 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-black text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <span>Tekan &amp; Mulai Bicara</span>
                <Mic className="w-4 h-4" />
              </button>
            </div>

            
            <div className="space-y-1.5">
              <label htmlFor="catatan-bantuan" className="text-xs font-bold text-slate-500">
                Atau tulis catatan tambahan (Opsional):
              </label>
              <textarea
                id="catatan-bantuan"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Contoh: Tolong belikan Paracetamol 500mg strip 1, resep ada di ruang tamu..."
                rows={3}
                className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#00624E] focus:ring-1 focus:ring-[#00624E] transition-all resize-none outline-none font-medium"
              />
            </div>

          </div>

        </div>

        
        <div className="lg:col-span-5 space-y-6">

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#00624E] text-white font-black text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className="font-black text-slate-900 text-base">
                  Relawan Siaga Terdekat
                </h3>
              </div>
              <span className="text-[11px] font-bold text-slate-400">Radius 150m</span>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              3 Relawan aktif siap menerima tiket Anda seketika:
            </p>

            
            <div className="space-y-2.5">
              {RELAWAN_LIST.map((r) => (
                <div
                  key={r.nama}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-2xl ${r.color} text-white flex items-center justify-center font-black text-xs shadow-xs flex-shrink-0`}>
                      {r.inisial}
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-slate-900 text-xs sm:text-sm truncate">{r.nama}</p>
                      <p className="text-slate-400 text-[11px] font-medium">{r.peran}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-black text-[#00624E] bg-[#E6F4EA] border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                      {r.jarak}
                    </span>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">{r.estimasi}</p>
                  </div>
                </div>
              ))}
            </div>

            
            <div className="bg-[#E6F4EA] border border-emerald-200/80 rounded-2xl p-3.5 flex items-center gap-2.5 text-[#00624E]">
              <Zap className="w-4 h-4 fill-[#00624E] flex-shrink-0" />
              <p className="text-xs font-bold leading-tight">
                Otomatis diteruskan ke relawan terdekat saat tombol ditekan.
              </p>
            </div>

          </div>

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            
            
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-3.5 text-xs font-semibold text-slate-700 flex items-center justify-between gap-2">
              <span className="truncate">
                📋 Pilihan: <strong className="text-slate-900">{selectedItem.label}</strong>
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 shrink-0">
                Rumah Bapak (Blok C4)
              </span>
            </div>

            
            <button
              id="btn-submit-bantuan"
              type="button"
              disabled={isSubmitting}
              onClick={handleKirim}
              className="w-full py-4 rounded-2xl font-black text-sm sm:text-base text-white shadow-sm bg-[#00624E] hover:bg-[#004d3d] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
              <span>{isSubmitting ? "Meneruskan ke Relawan..." : "Kirim Permintaan Sekarang"}</span>
            </button>

            
            <div className="text-center pt-1">
              <Link
                href="/lansia"
                className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
              >
                Batalkan
              </Link>
            </div>

          </div>

        </div>

      </div>

      
      {isRecording && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setIsRecording(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-md p-6 sm:p-7 text-center shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md animate-pulse">
              <Mic className="w-8 h-8" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-black mb-1.5">
                {voiceStep === "listening" ? "Mendengarkan..." : "Suara Dicatat"}
              </span>
              <h3 className="text-lg font-black text-slate-900">
                {voiceStep === "listening" ? "Sampaikan Bantuan yang Diperlukan" : "Rangkuman Permintaan"}
              </h3>
            </div>

            {voiceStep === "listening" ? (
              <div className="flex items-center justify-center gap-1.5 h-10 py-1">
                {[4, 7, 11, 7, 5, 10, 13, 7, 5, 9].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-sky-600 rounded-full animate-pulse"
                    style={{ height: `${h * 2.4}px`, animationDelay: `${i * 0.08}s` }}
                  />
                ))}
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                &ldquo;{voiceText}&rdquo;
              </div>
            )}

            <div className="space-y-2 pt-2">
              {voiceStep === "transcribed" && (
                <button
                  onClick={handleSendVoice}
                  className="w-full py-3.5 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Kirim Pesan Suara ke Relawan</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              )}
              <button
                onClick={() => setIsRecording(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-2xl transition-all"
              >
                Batalkan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function BantuanPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Memuat halaman bantuan...</div>}>
      <BantuanContent />
    </Suspense>
  );
}
