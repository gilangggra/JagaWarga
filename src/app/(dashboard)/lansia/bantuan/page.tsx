"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

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
    colorName: "Kotak Merah",
    colorBadge: "bg-rose-50 text-rose-700 border-rose-200",
    desc: "Apotek & Resep",
    kategori: "obat",
    color: "rose",
    bg: "bg-rose-500",
    shadow: "shadow-rose-300/30",
    lightBg: "bg-rose-50",
    lightText: "text-rose-700",
    lightBorder: "border-rose-200",
    speakText: "Memilih Kotak Merah, Beli Obat di Apotek.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-15a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 4.5v15a2.25 2.25 0 0 0 2.25 2.25Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4.5m0 0H9.75m2.25 0h2.25" />
      </svg>
    ),
  },
  {
    id: "makanan",
    label: "Beli Sayur",
    colorName: "Kotak Oranye",
    colorBadge: "bg-amber-50 text-amber-800 border-amber-200",
    desc: "Warung RT",
    kategori: "belanja",
    color: "amber",
    bg: "bg-amber-500",
    shadow: "shadow-amber-300/30",
    lightBg: "bg-amber-50",
    lightText: "text-amber-700",
    lightBorder: "border-amber-200",
    speakText: "Memilih Kotak Oranye, Beli Sayur di Warung RT.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
    ),
  },
  {
    id: "pendampingan",
    label: "Teman Jalan",
    colorName: "Kotak Ungu",
    colorBadge: "bg-purple-50 text-purple-800 border-purple-200",
    desc: "Posyandu & Dokter",
    kategori: "cek_rumah",
    color: "purple",
    bg: "bg-purple-500",
    shadow: "shadow-purple-300/30",
    lightBg: "bg-purple-50",
    lightText: "text-purple-700",
    lightBorder: "border-purple-200",
    speakText: "Memilih Kotak Ungu, Teman Jalan ke Posyandu dan Dokter.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    id: "antar_jemput",
    label: "Pinjam Alkes",
    colorName: "Kotak Hijau",
    colorBadge: "bg-emerald-50 text-emerald-800 border-emerald-200",
    desc: "Kursi Roda & O2",
    kategori: "lainnya",
    color: "emerald",
    bg: "bg-teal-600",
    shadow: "shadow-teal-300/30",
    lightBg: "bg-emerald-50",
    lightText: "text-emerald-700",
    lightBorder: "border-emerald-200",
    speakText: "Memilih Kotak Hijau, Pinjam Alat Kesehatan Kas RT.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 6.75V18M12 18H8.25M12 18h3.75M8.25 18v-4.5a3.75 3.75 0 1 1 7.5 0V18" />
      </svg>
    ),
  },
];

const RELAWAN_LIST = [
  { inisial: "BS", nama: "Budi Santoso", peran: "Relawan Siaga", jarak: "50m", estimasi: "< 1 mnt", color: "bg-teal-600", telp: "08123456789" },
  { inisial: "JW", nama: "Pak Joko", peran: "Ketua RT 04", jarak: "100m", estimasi: "~2 mnt", color: "bg-amber-600", telp: "08123456788" },
  { inisial: "AN", nama: "Bu Ani", peran: "Kader Posyandu", jarak: "120m", estimasi: "~3 mnt", color: "bg-rose-500", telp: "08123456787" },
];

const VOICE_SAMPLE_TEXTS: Record<string, string> = {
  obat_rutin: "Tolong belikan obat darah tinggi merek Captopril di apotek depan, resep dokter ada di lemari...",
  makanan: "Tolong belikan sayur bayam 2 ikat, tahu 5 biji, dan bawang merah di warung Bu RT...",
  pendampingan: "Saya perlu ditemani ke Posyandu besok pagi pukul delapan untuk cek tensi...",
  antar_jemput: "Bisa tolong pinjamkan kursi roda dari pos RT untuk dipakai besok pagi?",
};

function BantuanContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const kategoriParam = searchParams.get("kategori");

  const [selected, setSelected] = useState<string>(
    BANTUAN_LIST.find((b) => b.kategori === kategoriParam)?.id ?? BANTUAN_LIST[0].id
  );
  const [pesan, setPesan] = useState("");
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
      setVoiceText(VOICE_SAMPLE_TEXTS[selected] ?? "Tolong bantu saya dengan kebutuhan yang sudah saya sebutkan.");
    }, 2200);
    return () => clearTimeout(t);
  }, [isRecording, selected]);

  const handleKirim = () => {
    if (!selected) return;
    setIsSubmitting(true);
    setTimeout(() => router.push("/lansia/status"), 600);
  };

  const handleSendVoice = () => {
    setIsRecording(false);
    setIsSubmitting(true);
    setTimeout(() => router.push("/lansia/status"), 600);
  };

  return (
    <div className="flex flex-col flex-1 min-h-full font-sans pb-36 lg:pb-12 bg-[#F8FAFC]">

      <header className="lg:hidden sticky top-0 z-20 pt-3 px-4 pb-2">
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/60 px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/lansia"
              id="btn-back-bantuan"
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-600 flex items-center justify-center active:scale-95 transition-all"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </Link>
            <div>
              <p className="text-sky-600 text-[10px] font-black uppercase tracking-wider">Gotong Royong RT 04</p>
              <h1 className="text-[15px] font-black text-slate-900 leading-none">Minta Bantuan Warga</h1>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-black">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>3 Siaga</span>
          </div>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6 space-y-4 sm:space-y-5">

        <div className="hidden lg:flex items-center justify-between pb-1">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
              Minta Bantuan Warga
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-800 text-xs font-black">3 Relawan Siaga RT 04</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-start">

          <div className="md:col-span-7 space-y-4 sm:space-y-5">

            <section className="bg-white rounded-[24px] sm:rounded-[26px] border border-slate-200/70 p-4 sm:p-6 shadow-xs space-y-3.5 sm:space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Langkah 1</span>
                  <h2 className="font-black text-slate-900 text-base leading-tight">Pilih Kebutuhan</h2>
                </div>
                <button
                  type="button"
                  onClick={() => speakPrompt("Panduan warna: Kotak Merah Beli Obat, Kotak Oranye Beli Sayur, Kotak Ungu Teman Jalan, Kotak Hijau Pinjam Alkes.")}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-black transition-all border border-sky-200"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-3.5 h-3.5 text-sky-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.5A2.25 2.25 0 0 1 2.25 13.5v-3a2.25 2.25 0 0 1 2.25-2.25h2.25Z" />
                  </svg>
                  <span>Panduan Suara</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
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
                      className={`group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-[20px] text-left transition-all duration-200 min-h-[125px] sm:min-h-[128px] active:scale-[0.97] ${
                        isSelected
                          ? `${item.bg} text-white shadow-md ${item.shadow}`
                          : "bg-slate-50/70 hover:bg-white border border-slate-200/70 hover:border-slate-300 hover:shadow-xs"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-[9px] sm:text-[9.5px] font-black px-2 py-0.5 rounded-full border transition-all ${
                          isSelected
                            ? "bg-white/20 text-white border-white/30"
                            : `${item.colorBadge}`
                        }`}>
                          {item.colorName}
                        </span>
                        {isSelected && (
                          <span className="w-4.5 h-4.5 bg-white text-emerald-800 font-black text-xs rounded-full flex items-center justify-center shadow-xs">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.5} className="w-3 h-3 text-emerald-800">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                          </span>
                        )}
                      </div>

                      <div className="my-1.5">
                        <div className={`w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105 ${
                          isSelected ? "bg-white/25" : item.bg
                        }`}>
                          {item.icon}
                        </div>
                      </div>

                      <div>
                        <p className={`font-black text-[13.5px] sm:text-sm leading-snug ${isSelected ? "text-white" : "text-slate-900"}`}>
                          {item.label}
                        </p>
                        <p className={`text-[10px] sm:text-[10.5px] font-medium mt-0.5 leading-tight ${isSelected ? "text-white/85" : "text-slate-500"}`}>
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="bg-white rounded-[24px] sm:rounded-[26px] border border-slate-200/70 p-4 sm:p-6 shadow-xs space-y-3">
              <div>
                <span className="text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Langkah 2</span>
                <h2 className="font-black text-slate-900 text-base leading-tight">Sampaikan Detail</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">

                <div className="bg-sky-50/70 border border-sky-200/80 rounded-[20px] p-4 flex flex-col justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[9px] sm:text-[9.5px] font-black uppercase tracking-wider bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">
                      Praktis
                    </span>
                    <h3 className="font-black text-slate-900 text-sm">Bicara Suara</h3>
                  </div>
                  <button
                    id="btn-voice-bantuan"
                    type="button"
                    onClick={() => setIsRecording(true)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-black text-xs rounded-full shadow-xs transition-all"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                    </svg>
                    <span>Rekam Suara</span>
                  </button>
                </div>

                <div className="bg-slate-50/70 border border-slate-200/80 rounded-[20px] p-4 flex flex-col justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[9px] sm:text-[9.5px] font-black uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                      Opsional
                    </span>
                    <h3 className="font-black text-slate-900 text-sm">Tulis Catatan</h3>
                  </div>
                  <textarea
                    id="pesan-tambahan"
                    value={pesan}
                    onChange={(e) => setPesan(e.target.value)}
                    placeholder="Tulis nama obat atau belanja..."
                    rows={2}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-800 text-xs placeholder:text-slate-400 resize-none focus:border-sky-400 focus:outline-none transition-all font-medium"
                  />
                </div>

              </div>
            </section>

          </div>

          <div className="md:col-span-5 space-y-4 sm:space-y-5">

            <section className="bg-white rounded-[24px] sm:rounded-[26px] border border-slate-200/70 p-4 sm:p-6 shadow-xs space-y-3 sm:space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <span className="text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Langkah 3</span>
                  <h2 className="font-black text-slate-900 text-base leading-tight">Relawan Sekitar</h2>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Radius 150m</span>
              </div>

              <p className="text-[11px] sm:text-[11.5px] text-slate-500 font-medium leading-relaxed">
                3 Relawan terdekat siap menerima tiket Anda secara otomatis:
              </p>

              <div className="space-y-2">
                {RELAWAN_LIST.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/60"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-full ${r.color} text-white flex items-center justify-center font-black text-xs flex-shrink-0`}>
                        {r.inisial}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 text-xs truncate">{r.nama}</p>
                        <p className="text-slate-400 text-[10px]">{r.peran}</p>
                      </div>
                    </div>
                    <span className="text-[10.5px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex-shrink-0">
                      {r.jarak}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-4 h-4 text-emerald-700 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
                <span>Otomatis diteruskan dan estimasi tiba di bawah 5 menit</span>
              </div>
            </section>

            <div className="space-y-2">
              <button
                id="btn-kirim-bantuan"
                type="button"
                onClick={handleKirim}
                disabled={!selected || isSubmitting}
                className={`w-full flex items-center justify-center gap-2.5 py-3.5 sm:py-4.5 rounded-full font-black text-sm sm:text-base shadow-md transition-all active:scale-[0.98] ${
                  selected
                    ? "bg-[#00624E] hover:bg-[#004d3d] text-white shadow-emerald-900/20"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Kirim Permintaan Sekarang</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between px-2 text-[11px] text-slate-400 font-bold">
                <span>Pilihan: {selectedItem.colorName} ({selectedItem.label})</span>
                <Link href="/lansia" className="text-emerald-700 hover:underline">
                  Batalkan
                </Link>
              </div>
            </div>

          </div>

        </div>

      </main>

      <div className="md:hidden fixed bottom-20 inset-x-4 z-40 max-w-md mx-auto">
        <button
          type="button"
          onClick={handleKirim}
          disabled={!selected || isSubmitting}
          className={`w-full flex items-center justify-between px-5 py-3.5 rounded-full font-black text-sm shadow-xl backdrop-blur-md active:scale-[0.98] transition-all ${
            selected
              ? "bg-[#00624E] text-white shadow-emerald-950/30 ring-2 ring-emerald-400/30"
              : "bg-slate-300 text-slate-500 cursor-not-allowed"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
            <span>Kirim Permintaan</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-xs bg-white/20 px-3 py-1 rounded-full">
            <span>{selectedItem.colorName}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </button>
      </div>

      {isRecording && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs animate-in fade-in" onClick={() => setIsRecording(false)} />

          <div className="relative bg-white rounded-[32px] w-full max-w-sm p-6 text-center shadow-2xl border border-slate-100 z-10 overflow-hidden space-y-4">
            <div className={`h-1.5 w-full ${selectedItem.bg} absolute top-0 inset-x-0`} />

            <div className="pt-2">
              <span className={`text-[11px] font-black px-3 py-1 rounded-full border ${selectedItem.colorBadge}`}>
                {selectedItem.colorName}: {selectedItem.label}
              </span>
            </div>

            <div className="relative w-18 h-18 mx-auto flex items-center justify-center">
              {voiceStep === "listening" && (
                <div className="absolute inset-0 bg-sky-400 rounded-full animate-ping opacity-20" />
              )}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md transition-all ${
                voiceStep === "transcribed" ? "bg-emerald-500" : "bg-sky-600"
              }`}>
                {voiceStep === "transcribed" ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                  </svg>
                )}
              </div>
            </div>

            {voiceStep === "listening" ? (
              <>
                <div>
                  <h3 className="text-base font-black text-slate-900">Mendengarkan...</h3>
                  <p className="text-slate-500 text-xs font-medium mt-0.5">Sebutkan kebutuhan Bapak/Ibu</p>
                </div>
                <div className="flex items-center justify-center gap-1 h-6">
                  {[4, 7, 5, 8, 6, 7, 4].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-sky-600 rounded-full animate-pulse"
                      style={{ height: `${h * 2.8}px`, animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="w-full">
                  <h3 className="text-[14px] font-black text-slate-900 mb-1.5">Permintaan Dicatat:</h3>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-left text-xs font-medium text-slate-800 leading-relaxed">
                    &ldquo;{voiceText}&rdquo;
                  </div>
                </div>

                <div className="w-full space-y-2 pt-1">
                  <button
                    onClick={handleSendVoice}
                    className="w-full py-3 bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs rounded-full shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Kirim ke Relawan RT</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => speakPrompt(voiceText)}
                      className="flex-1 py-2 bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-xs rounded-full border border-sky-200 transition-all flex items-center justify-center gap-1.5"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-3.5 h-3.5 text-sky-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.5A2.25 2.25 0 0 1 2.25 13.5v-3a2.25 2.25 0 0 1 2.25-2.25h2.25Z" />
                      </svg>
                      <span>Dengarkan</span>
                    </button>
                    <button
                      onClick={() => { setVoiceStep("idle"); setIsRecording(true); }}
                      className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-full transition-all"
                    >
                      Rekam Ulang
                    </button>
                  </div>
                </div>
              </>
            )}

            <button
              onClick={() => { setIsRecording(false); setVoiceStep("idle"); }}
              className="px-4 py-1.5 text-slate-400 hover:text-slate-600 font-bold text-xs transition-all"
            >
              Batalkan
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function BantuanPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <BantuanContent />
    </Suspense>
  );
}
