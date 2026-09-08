"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Pill, 
  KeyRound, 
  AlertCircle, 
  Navigation,
  Award,
  Sparkles,
  Camera,
  QrCode
} from "lucide-react";

type VerificationMode = "pin" | "qr";

export default function TugasSiagaWargaPage() {
  const router = useRouter();
  
  const [mode, setMode] = useState<VerificationMode>("pin");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [pinError, setPinError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const [step1Checked, setStep1Checked] = useState(true);
  const [step2Checked, setStep2Checked] = useState(true);
  const [step3Checked, setStep3Checked] = useState(false);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (mode === "pin" && !isCompleted) {
      inputRefs[0]?.current?.focus();
    }
  }, [mode, isCompleted]);

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    setPinError(false);

    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);

    if (value && index < 3) {
      inputRefs[index + 1]?.current?.focus();
    }

    const fullPin = newPin.join("");
    if (fullPin.length === 4) {
      verifyPin(fullPin);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  const verifyPin = (enteredPin: string) => {
    setIsVerifying(true);
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try { navigator.vibrate(30); } catch {}
    }

    setTimeout(() => {
      setIsVerifying(false);
      // Valid PIN is 8241 (matching lansia status screen)
      if (enteredPin === "8241") {
        if (typeof window !== "undefined" && "vibrate" in navigator) {
          try { navigator.vibrate([60, 40, 60]); } catch {}
        }
        setIsCompleted(true);
        setStep3Checked(true);
      } else {
        setPinError(true);
        setPin(["", "", "", ""]);
        inputRefs[0]?.current?.focus();
      }
    }, 500);
  };

  const handleSimulateQrScan = () => {
    setIsScanning(true);
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try { navigator.vibrate(40); } catch {}
    }

    setTimeout(() => {
      setIsScanning(false);
      setIsCompleted(true);
      setStep3Checked(true);
    }, 1200);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-36 sm:pb-32 lg:pb-12 bg-[#F8FAFC]">
      
      {/* NAVIGATION BACK */}
      <div className="flex items-center justify-between">
        <Link
          href="/anak/radar"
          id="btn-back-to-radar"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-[#00624E] font-black text-xs shadow-2xs transition-all active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#00624E] group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Radar Bantuan</span>
        </Link>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          <span>Sedang Ditangani oleh Anda</span>
        </span>
      </div>

      {/* HEADER TITLE */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Tugas Siaga &amp; Serah Terima
        </h1>
        <p className="text-sm sm:text-base font-medium text-slate-500">
          Tiket <strong>TKT-08241</strong> • Alamat telah dibuka secara sah untuk proses serah terima bantuan.
        </p>
      </div>

      {/* MAIN 12-COL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT 7 COLS: UNMASKED ADDRESS & ORDER DETAILS */}
        <div className="lg:col-span-7 space-y-6">

          {/* UNMASKED ADDRESS CARD */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00624E] flex items-center justify-center font-black">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00624E]">
                    Alamat Tujuan Terbuka Penuh
                  </span>
                  <h2 className="font-black text-slate-900 text-lg leading-tight">
                    Bapak Prabowo (71 Tahun)
                  </h2>
                </div>
              </div>

              <span className="text-xs font-black text-emerald-800 bg-[#E6F4EA] border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#00624E]" />
                <span>Radius 50m</span>
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <p className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                Jl. Melati Blok C4 No. 12, RT 04 / RW 02
              </p>
              <p className="text-xs font-medium text-slate-600 leading-relaxed">
                Patokan: Rumah pagar hitam minimalis, terdapat pohon mangga di pekarangan depan. Bel pintu berada di sisi kanan pagar.
              </p>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href="tel:081234567888"
                id="btn-call-senior-from-siaga"
                className="py-3 px-4 rounded-2xl bg-[#00624E] hover:bg-[#004d3d] text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Telepon Bapak Prabowo</span>
              </a>

              <a
                href="https://wa.me/6281234567890?text=Halo%20Ibu%20Titiek,%20saya%20tetangga%20RT%2004.%20Obat%20Bapak%20Prabowo%20sudah%20saya%20tebus%20dan%20sedang%20menuju%20ke%20rumah."
                target="_blank"
                rel="noreferrer"
                id="btn-wa-child-from-siaga"
                className="py-3 px-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#00624E] hover:bg-emerald-100/60 font-black text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Keluarga</span>
              </a>
            </div>
          </div>

          {/* ITEM DETAILS */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00624E] flex items-center justify-center">
                  <Pill className="w-4 h-4 stroke-[2.2]" />
                </div>
                <h3 className="font-black text-slate-900 text-base">
                  Rincian Obat &amp; Resep
                </h3>
              </div>
              <span className="text-xs font-black text-emerald-800 bg-[#E6F4EA] border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Talangan Lunas
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start justify-between gap-3">
                <div>
                  <p className="font-black text-sm text-slate-900">
                    1 Strip Amlodipin 5mg (10 Tablet)
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Ditebus di: <strong>Apotek K-24 Gejayan</strong> • Resep No: <strong>RSP-08241</strong>
                  </p>
                </div>
                <span className="text-xs font-black text-slate-900 bg-white px-2.5 py-1 rounded-xl border border-slate-200 shrink-0">
                  Rp35.000
                </span>
              </div>

              <p className="text-[11px] text-slate-500 font-medium leading-relaxed px-1">
                * Biaya talangan Rp35.000 sudah ditransfer langsung oleh keluarga pemohon via transfer bank / QRIS. Tidak perlu menagih tunai kepada lansia.
              </p>
            </div>
          </div>

          {/* CHECKLIST RELAWAN */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-4">
            <h3 className="font-black text-slate-900 text-base">
              Checklist Langkah Penyerahan
            </h3>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={step1Checked}
                  onChange={(e) => setStep1Checked(e.target.checked)}
                  className="w-5 h-5 rounded-lg accent-[#00624E]"
                />
                <span className="text-xs font-bold text-slate-800">
                  1. Tebus obat di Apotek K-24 &amp; pastikan tanggal kadaluarsa aman
                </span>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={step2Checked}
                  onChange={(e) => setStep2Checked(e.target.checked)}
                  className="w-5 h-5 rounded-lg accent-[#00624E]"
                />
                <span className="text-xs font-bold text-slate-800">
                  2. Menuju ke Jl. Melati Blok C4 No. 12 &amp; tekan bel pagar
                </span>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={step3Checked}
                  onChange={(e) => setStep3Checked(e.target.checked)}
                  className="w-5 h-5 rounded-lg accent-[#00624E]"
                />
                <span className="text-xs font-bold text-slate-800">
                  3. Minta 4-Digit PIN atau Scan QR di layar HP Bapak Prabowo
                </span>
              </label>
            </div>
          </div>

        </div>

        {/* RIGHT 5 COLS: TWO-WAY VERIFICATION MODULE (FR-07) */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="bg-white rounded-3xl border-2 border-[#00624E]/30 p-6 sm:p-7 shadow-sm space-y-5 text-center">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00624E]">
                  Validasi Dua Arah (FR-07)
                </span>
                <h2 className="font-black text-slate-900 text-lg leading-tight">
                  Verifikasi Penyerahan Sah
                </h2>
              </div>
              <div className="w-9 h-9 rounded-2xl bg-[#E6F4EA] text-[#00624E] flex items-center justify-center font-black">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>

            <p className="text-xs text-slate-600 font-medium text-left leading-relaxed">
              Untuk mencegah salah serah dan menjamin keselamatan lansia, masukkan <strong>PIN 4-Digit</strong> yang tertera di layar Bapak Prabowo, atau scan kode QR-nya.
            </p>

            {/* Mode Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
              <button
                type="button"
                onClick={() => setMode("pin")}
                className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  mode === "pin"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Input 4-Digit PIN</span>
              </button>

              <button
                type="button"
                onClick={() => setMode("qr")}
                className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  mode === "qr"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Scan QR Code</span>
              </button>
            </div>

            {/* MODE A: 4-DIGIT PIN INPUT */}
            {mode === "pin" && (
              <div className="space-y-4 py-2">
                <div className="flex justify-center gap-3">
                  {pin.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={inputRefs[idx]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handlePinChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      disabled={isVerifying || isCompleted}
                      className={`w-14 h-16 sm:w-16 sm:h-18 text-center text-3xl font-black font-mono rounded-2xl border-2 transition-all outline-hidden ${
                        pinError
                          ? "border-rose-400 bg-rose-50 text-rose-700 animate-shake"
                          : digit
                          ? "border-[#00624E] bg-emerald-50 text-[#00624E]"
                          : "border-slate-200 bg-white text-slate-900 focus:border-[#00624E] focus:ring-4 focus:ring-emerald-500/10"
                      }`}
                    />
                  ))}
                </div>

                {pinError ? (
                  <p className="text-xs font-bold text-rose-600 flex items-center justify-center gap-1.5 animate-in fade-in duration-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>PIN keliru! Minta Bapak Prabowo membaca PIN di HP-nya (Hint: 8241).</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-400 font-medium">
                    Ketik 4 angka PIN (Contoh kode sinkron lansia: <strong>8241</strong>)
                  </p>
                )}

                <button
                  type="button"
                  id="btn-verify-pin-siaga"
                  onClick={() => verifyPin(pin.join(""))}
                  disabled={pin.join("").length < 4 || isVerifying || isCompleted}
                  className="w-full py-3.5 rounded-2xl bg-[#00624E] hover:bg-[#004d3d] disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isVerifying ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Memverifikasi PIN...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verifikasi &amp; Selesaikan Tugas</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* MODE B: QR CODE SCANNER SIMULATION */}
            {mode === "qr" && (
              <div className="space-y-4 py-2">
                <div className="relative w-56 h-56 mx-auto bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-800 flex items-center justify-center shadow-inner">
                  <div className="absolute inset-4 border-2 border-dashed border-emerald-400/80 rounded-2xl pointer-events-none" />
                  
                  {isScanning ? (
                    <div className="absolute inset-x-0 top-0 h-1 bg-emerald-400 shadow-[0_0_15px_#34D399] animate-bounce duration-700" />
                  ) : (
                    <Camera className="w-12 h-12 text-slate-600 animate-pulse" />
                  )}

                  <div className="absolute bottom-3 inset-x-3 text-center">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white">
                      {isScanning ? "Membaca QR..." : "Arahkan ke QR Lansia"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  id="btn-simulate-qr-siaga"
                  onClick={handleSimulateQrScan}
                  disabled={isScanning || isCompleted}
                  className="w-full py-3.5 rounded-2xl bg-[#00624E] hover:bg-[#004d3d] text-white font-black text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  <span>{isScanning ? "Memindai Kode..." : "Simulasikan Scan Kamera QR"}</span>
                </button>
              </div>
            )}

            <div className="p-3.5 rounded-2xl bg-emerald-50 text-left border border-emerald-200/80 space-y-1">
              <p className="text-xs font-black text-[#00624E] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Otentikasi Dua Arah Tanpa Repot</span>
              </p>
              <p className="text-[11px] text-emerald-950 font-medium leading-relaxed">
                Begitu verifikasi cocok, notifikasi WhatsApp otomatis dikirimkan ke pihak keluarga pemohon dan tugas dicatat selesai.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* SUCCESS MODAL UPON COMPLETION */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-[#00624E] border-2 border-emerald-300 flex items-center justify-center mx-auto shadow-md">
              <Award className="w-8 h-8 stroke-[2.2]" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#00624E] text-xs font-black border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>+50 Poin Kebaikan Warga Siaga</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Bantuan Berhasil Diserahkan!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Terima kasih atas kepedulian Anda! Obat telah diterima dengan aman oleh Bapak Prabowo dan keluarga telah diberi tahu secara otomatis.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">Waktu Respons (MTTA):</span>
                <span className="text-emerald-700 font-black">6 Menit (Golden Hour Aman)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">Kode Verifikasi:</span>
                <span className="text-slate-900 font-mono font-bold">PIN 8241 (Sah)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <Link
                href="/anak/radar"
                id="btn-modal-back-radar"
                className="flex-1 py-3.5 rounded-2xl bg-[#00624E] hover:bg-[#004d3d] text-white font-black text-xs shadow-md transition-all active:scale-95"
              >
                Kembali ke Radar
              </Link>
              <Link
                href="/anak/riwayat"
                id="btn-modal-view-history"
                className="flex-1 py-3.5 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-black text-xs transition-all active:scale-95"
              >
                Lihat Riwayat &amp; Poin
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
