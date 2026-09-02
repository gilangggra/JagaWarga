"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Volume2,
  ChevronRight,
  Home,
  HandHeart,
  Activity,
  Accessibility,
  Settings,
  AlertTriangle,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Check,
} from "lucide-react";

function speakPrompt(text: string) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "id-ID";
      utterance.rate = 0.90;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
    }
  }
}

const PANDUAN_STEPS = [
  {
    id: "beranda",
    nomor: "1",
    judul: "Halaman Beranda & Kabar Pagi",
    ringkas: "Kirim kabar sehat setiap pagi cukup dengan 1 sentuhan.",
    speakText: "Langkah satu. Halaman Beranda. Tekan tombol Kirim Kabar Ulang setiap pagi pukul delapan untuk memberitahu keluarga dan relawan bahwa Bapak dalam keadaan sehat.",
    icon: <Home className="w-7 h-7 stroke-[2.2]" />,
    bg: "bg-[#E6F4EA]",
    text: "text-[#00624E]",
    langkah: [
      "Buka aplikasi JagaWarga di pagi hari (sekitar pukul 08:00 WIB).",
      "Periksa kartu hijau bertuliskan 'Kabar Saya Sehat & Aman'.",
      "Tekan tombol 'Kirim Kabar Ulang' jika ingin memperbarui status kesehatan.",
      "Keluarga di perantauan dan relawan RT 04 akan otomatis menerima notifikasi.",
    ],
  },
  {
    id: "bantuan",
    nomor: "2",
    judul: "Meminta Bantuan Tetangga",
    ringkas: "Titip beli obat resep, belanja sayur pasar, atau teman kontrol.",
    speakText: "Langkah dua. Minta Bantuan. Pilih kategori seperti Beli Obat atau Belanja Sayur, tulis atau sebutkan kebutuhan, lalu relawan terdekat akan membelikan ke rumah.",
    icon: <HandHeart className="w-7 h-7 stroke-[2.2]" />,
    bg: "bg-[#FEE2E2]",
    text: "text-[#DC2626]",
    langkah: [
      "Buka menu 'Minta Bantuan' di sebelah kiri atau dari tombol beranda.",
      "Pilih 1 dari 4 kategori: Beli Obat, Belanja Sayur, Teman Kontrol, atau Cek Rumah.",
      "Ketik atau gunakan fitur suara untuk menyebutkan nama obat/kebutuhan.",
      "Tekan tombol hijau 'Kirim Permintaan' dan tunggu konfirmasi relawan.",
    ],
  },
  {
    id: "status",
    nomor: "3",
    judul: "Memantau Perjalanan Relawan",
    ringkas: "Lacak proses pembelian dan serah terima dengan kode QR aman.",
    speakText: "Langkah tiga. Pantau Status Bantuan. Bapak bisa melihat relawan sedang di apotek, dalam perjalanan, atau sudah sampai di depan rumah.",
    icon: <Activity className="w-7 h-7 stroke-[2.2]" />,
    bg: "bg-[#FFEDD5]",
    text: "text-[#EA580C]",
    langkah: [
      "Buka menu 'Status Bantuan' untuk melihat garis waktu perjalanan relawan.",
      "Perhatikan lingkaran status: Permintaan Diterima → Belanja di Apotek → Menuju Rumah.",
      "Saat relawan tiba di rumah, tunjukkan PIN 4 Digit untuk serah terima yang aman.",
      "Gunakan tombol telepon hijau jika ingin berbicara langsung dengan relawan.",
    ],
  },
  {
    id: "alkes",
    nomor: "4",
    judul: "Meminjam Alat Kesehatan Gratis",
    speakText: "Langkah empat. Pinjam Alkes. Kursi roda, tabung oksigen, dan tongkat jalan kas RT 04 bisa dipinjam tanpa biaya dan diantar dalam lima menit.",
    ringkas: "Kursi roda, tabung oksigen, dan tongkat jalan kas RT 04.",
    icon: <Accessibility className="w-7 h-7 stroke-[2.2]" />,
    bg: "bg-[#F3E8FF]",
    text: "text-[#9333EA]",
    langkah: [
      "Buka menu 'Pinjam Alkes' untuk melihat stok alat kesehatan milik kas RT 04.",
      "Pilih alat kesehatan yang dibutuhkan: Kursi Roda Lipat, Tabung Oksigen, atau Tongkat.",
      "Periksa status ketersediaan 'Tersedia di Pos RT'.",
      "Tekan tombol 'Pinjam Sekarang — Antar ke Rumah' (Relawan tiba <5 menit).",
    ],
  },
  {
    id: "darurat",
    nomor: "5",
    judul: "Tombol Alarm Darurat SOS",
    speakText: "Langkah lima. Alarm Darurat SOS. Jika merasa sakit mendadak atau terjatuh, tekan tombol merah besar di pojok kiri bawah. Sirine dan pesan darurat akan berbunyi di ponsel tetangga.",
    ringkas: "Bantuan seketika saat terjatuh atau mendadak tidak enak badan.",
    icon: <AlertTriangle className="w-7 h-7 stroke-[2.2]" />,
    bg: "bg-[#FEE2E2]",
    text: "text-[#DC2626]",
    langkah: [
      "Tombol merah 'Alarm Darurat SOS' selalu siap di pojok kiri bawah layar.",
      "Tekan tombol merah satu kali saat Bapak/Ibu membutuhkan pertolongan mendesak.",
      "Konfirmasi dengan menekan 'Ya, Bunyikan Alarm Darurat'.",
      "Ponsel 3 relawan terdekat, Ketua RT, dan keluarga akan berdering serentak.",
    ],
  },
  {
    id: "pengaturan",
    nomor: "6",
    judul: "Pengaturan Huruf & Suara",
    speakText: "Langkah enam. Pengaturan. Sesuaikan ukuran tulisan menjadi lebih besar dan aktifkan suara panduan agar layar sangat mudah dan nyaman dibaca.",
    ringkas: "Perbesar ukuran tulisan dan aktifkan pembaca suara otomatis.",
    icon: <Settings className="w-7 h-7 stroke-[2.2]" />,
    bg: "bg-[#E6F4EA]",
    text: "text-[#00624E]",
    langkah: [
      "Buka menu 'Pengaturan' di bagian bawah sidebar atau dari header.",
      "Pilih ukuran huruf 'Sedang (A+)' atau 'Sangat Besar (A++)' agar mudah dibaca.",
      "Nyalakan opsi 'Panduan Suara Otomatis' agar sistem membacakan isi layar.",
      "Tekan tombol hijau 'Simpan Pengaturan' untuk mengunci preferensi.",
    ],
  },
];

export default function PanduanPage() {
  const [activeStep, setActiveStep] = useState<string | null>("beranda");
  const [selesai, setSelesai] = useState<Set<string>>(new Set(["beranda"]));

  const toggleSelesai = (id: string) => {
    setSelesai((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const persen = Math.round((selesai.size / PANDUAN_STEPS.length) * 100);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-36 sm:pb-32 lg:pb-12 bg-[#F8FAFC]">

      
      <div>
        <Link
          href="/lansia"
          id="btn-back-panduan"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-[#00624E] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Panduan Cara Pakai JagaWarga
        </h1>
        <p className="text-sm sm:text-base font-medium text-slate-500">
          Langkah-langkah praktis dan ramah lansia untuk memanfaatkan seluruh layanan gotong royong RT 04.
        </p>
      </div>

      
      <div className="bg-gradient-to-br from-[#00624E] to-[#004d3e] rounded-3xl p-6 sm:p-7 text-white shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Panduan Interaktif Dilengkapi Suara</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black leading-tight">
            Belajar 6 Langkah Mudah Bersama JagaWarga
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium max-w-xl leading-relaxed">
            Tekan tombol speaker di setiap langkah untuk mendengarkan arahan suara yang jelas dan tenang.
          </p>
        </div>

        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center min-w-[200px] shrink-0 z-10">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">Progress Belajar</p>
          <p className="text-2xl sm:text-3xl font-black mt-0.5">{persen}%</p>
          <p className="text-xs text-white/80 font-bold mt-0.5">{selesai.size} dari {PANDUAN_STEPS.length} Langkah Selesai</p>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        
        <div className="lg:col-span-8 space-y-4">
          {PANDUAN_STEPS.map((step) => {
            const isOpen = activeStep === step.id;
            const isDone = selesai.has(step.id);
            return (
              <div
                key={step.id}
                className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                  isDone ? "border-emerald-200 shadow-xs" : "border-slate-200/80 shadow-xs"
                }`}
              >
                
                <button
                  type="button"
                  onClick={() => setActiveStep(isOpen ? null : step.id)}
                  className="w-full p-5 sm:p-6 flex items-start sm:items-center gap-4 sm:gap-5 text-left cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${step.bg} ${step.text} flex items-center justify-center shrink-0 shadow-2xs relative`}>
                    {step.icon}
                    {isDone && (
                      <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-[#00624E] text-white rounded-full flex items-center justify-center shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">
                        Langkah {step.nomor}
                      </span>
                      {isDone && (
                        <span className="text-[10.5px] font-black text-[#00624E] bg-[#E6F4EA] border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          Sudah Dipahami
                        </span>
                      )}
                    </div>
                    <h3 className="font-black text-slate-900 text-base sm:text-lg leading-tight">
                      {step.judul}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
                      {step.ringkas}
                    </p>
                  </div>

                  
                  <div className={`text-slate-400 shrink-0 transition-transform ${isOpen ? "rotate-90 text-[#00624E]" : ""}`}>
                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </button>

                
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-slate-100 bg-slate-50/40 space-y-4">
                    <div className="pt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">
                          Urutan Tindakan:
                        </span>

                        
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakPrompt(step.speakText);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 hover:bg-emerald-200 text-[#00624E] text-xs font-black transition-all border border-emerald-200 active:scale-95"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Dengarkan Suara</span>
                        </button>
                      </div>

                      <ol className="space-y-2.5">
                        {step.langkah.map((l, idx) => (
                          <li key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-2xs">
                            <span className="w-6 h-6 rounded-xl bg-[#00624E] text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="text-sm font-bold text-slate-700 leading-snug">
                              {l}
                            </span>
                          </li>
                        ))}
                      </ol>

                      
                      <div className="pt-2 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => toggleSelesai(step.id)}
                          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                            isDone
                              ? "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                              : "bg-[#00624E] text-white hover:bg-[#004d3d] shadow-sm shadow-emerald-500/20"
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{isDone ? "Batalkan Tanda Selesai" : "Tandai Sudah Paham"}</span>
                        </button>

                        <Link
                          href="/lansia"
                          className="text-xs font-black text-[#00624E] hover:underline"
                        >
                          Coba di Beranda →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">Daftar Langkah</span>
              <h2 className="font-black text-slate-900 text-base leading-tight mt-0.5">Ringkasan Materi</h2>
            </div>

            <div className="space-y-2">
              {PANDUAN_STEPS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveStep(s.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all text-left cursor-pointer ${
                    activeStep === s.id
                      ? "bg-[#E6F4EA] text-[#00624E] font-black border border-emerald-200/70"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 font-bold border border-slate-100"
                  }`}
                >
                  <span className="text-xs">{s.nomor}. {s.judul}</span>
                  {selesai.has(s.id) ? (
                    <CheckCircle2 className="w-4 h-4 text-[#00624E] shrink-0" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          
          <div className="bg-[#E6F4EA] rounded-3xl border border-emerald-200/80 p-5 sm:p-6 space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-[#00624E]">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              <span className="text-xs font-black uppercase tracking-wider">Bimbingan Tetangga</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#00624E] leading-relaxed">
              Jangan ragu meminta bantuan anak atau kader RT saat pertama kali mencoba. Relawan selalu siap mendampingi ke rumah.
            </p>
          </div>

          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-xs shadow-xs">
                JW
              </div>
              <div>
                <p className="font-black text-slate-900 text-sm">Pak Joko (Ketua RT)</p>
                <p className="text-[11px] text-slate-400 font-medium">Bantuan Teknis &amp; Tanya Jawab</p>
              </div>
            </div>
            <a
              href="tel:081387654321"
              className="w-9 h-9 rounded-2xl bg-[#E6F4EA] text-[#00624E] border border-emerald-200 hover:bg-emerald-100 flex items-center justify-center active:scale-95 transition-all shadow-2xs"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
