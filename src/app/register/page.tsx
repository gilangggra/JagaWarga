"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Shield, 
  User, 
  Phone, 
  MapPin, 
  Home, 
  Accessibility, 
  HeartHandshake, 
  ChevronDown
} from "lucide-react";

type RoleType = "siaga" | "lansia";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [namaLengkap, setNamaLengkap] = useState("Dimas Prasetyo");
  const [nomorWa, setNomorWa] = useState("81234567890");
  const [lingkunganRt, setLingkunganRt] = useState("RT 04 / RW 01 - Sleman, Yogyakarta");
  const [blokNomor, setBlokNomor] = useState("Blok C4 No. 12");
  const [peran, setPeran] = useState<RoleType>("siaga");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try { navigator.vibrate(30); } catch {}
    }
    setStep(2);
  };

  const handlePrevStep = () => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try { navigator.vibrate(30); } catch {}
    }
    setStep(1);
  };

  const handleFinishRegister = () => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try { navigator.vibrate(50); } catch {}
    }
    setIsSubmitting(true);

    setTimeout(() => {
      if (peran === "lansia") {
        router.push("/lansia");
      } else {
        router.push("/anak");
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6 font-sans selection:bg-emerald-100">
      
      {/* Top Header */}
      <header className="w-full max-w-xl mx-auto flex items-center justify-between pb-4 sm:pb-6">
        {step === 1 ? (
          <Link
            href="/login"
            id="btn-kembali-login"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-700 hover:text-[#00624E] font-bold text-xs sm:text-sm shadow-2xs transition-all active:scale-95 group"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#00624E] group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali ke Login</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={handlePrevStep}
            id="btn-kembali-step1"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-700 hover:text-[#00624E] font-bold text-xs sm:text-sm shadow-2xs transition-all active:scale-95 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#00624E] group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali ke Data Diri</span>
          </button>
        )}

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#00624E] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xs text-white">
            <Shield className="w-5 h-5 fill-white/20 stroke-[2.2]" />
          </div>
          <span className="font-black text-slate-900 text-lg sm:text-xl tracking-tight">
            JagaWarga
          </span>
        </div>
      </header>

      {/* Main Card Container */}
      <main className="w-full max-w-xl mx-auto flex-1 flex flex-col justify-center my-2 sm:my-4">
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-9 shadow-xs">
          
          {/* STEP 1: DAFTAR WARGA BARU */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Step Badge */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F4EA] border border-[#00624E]/20 text-[#00624E] text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00624E]" />
                  <span>Langkah 1 dari 2</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  Daftar Warga Baru
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  Lengkapi data tempat tinggal Anda untuk bergabung di lingkungan RT.
                </p>
              </div>

              {/* 4 Input Fields */}
              <form onSubmit={handleNextStep} className="space-y-4 pt-1">
                
                {/* 1. Nama Lengkap (with User icon) */}
                <div className="space-y-1.5">
                  <label htmlFor="input-nama" className="text-xs sm:text-sm font-bold text-slate-700 block">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <User className="w-5 h-5 stroke-[2]" />
                    </div>
                    <input
                      id="input-nama"
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap Anda"
                      value={namaLengkap}
                      onChange={(e) => setNamaLengkap(e.target.value)}
                      className="w-full h-14 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl text-slate-900 text-sm sm:text-base font-semibold placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#00624E] focus:border-[#00624E] transition-all"
                    />
                  </div>
                </div>

                {/* 2. Nomor WhatsApp (+62 prefix with Phone icon) */}
                <div className="space-y-1.5">
                  <label htmlFor="input-wa" className="text-xs sm:text-sm font-bold text-slate-700 block">
                    Nomor WhatsApp
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div className="absolute inset-y-0 left-11 flex items-center pointer-events-none text-slate-500 font-bold text-sm sm:text-base pr-2 border-r border-slate-200 my-3">
                      +62
                    </div>
                    <input
                      id="input-wa"
                      type="tel"
                      required
                      placeholder="812-3456-7890"
                      value={nomorWa}
                      onChange={(e) => setNomorWa(e.target.value.replace(/\D/g, ""))}
                      className="w-full h-14 pl-24 pr-4 bg-white border border-slate-200 rounded-2xl text-slate-900 text-sm sm:text-base font-semibold placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#00624E] focus:border-[#00624E] transition-all"
                    />
                  </div>
                </div>

                {/* 3. Pilih Lingkungan RT/RW (Dropdown select with MapPin icon) */}
                <div className="space-y-1.5">
                  <label htmlFor="select-rt" className="text-xs sm:text-sm font-bold text-slate-700 block">
                    Pilih Lingkungan RT/RW
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="w-5 h-5 stroke-[2]" />
                    </div>
                    <select
                      id="select-rt"
                      required
                      value={lingkunganRt}
                      onChange={(e) => setLingkunganRt(e.target.value)}
                      className="w-full h-14 pl-12 pr-10 bg-white border border-slate-200 rounded-2xl text-slate-900 text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-[#00624E] focus:border-[#00624E] transition-all appearance-none cursor-pointer"
                    >
                      <option value="RT 04 / RW 01 - Sleman, Yogyakarta">
                        RT 04 / RW 01 - Sleman, Yogyakarta
                      </option>
                      <option value="RT 02 / RW 01 - Sleman, Yogyakarta">
                        RT 02 / RW 01 - Sleman, Yogyakarta
                      </option>
                      <option value="RT 05 / RW 02 - Sleman, Yogyakarta">
                        RT 05 / RW 02 - Sleman, Yogyakarta
                      </option>
                      <option value="RT 04 / RW 03 - Sukamaju, Jakarta">
                        RT 04 / RW 03 - Sukamaju, Jakarta
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* 4. Blok / Nomor Rumah (with Home icon) */}
                <div className="space-y-1.5">
                  <label htmlFor="input-blok" className="text-xs sm:text-sm font-bold text-slate-700 block">
                    Blok / Nomor Rumah
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <Home className="w-5 h-5 stroke-[2]" />
                    </div>
                    <input
                      id="input-blok"
                      type="text"
                      required
                      placeholder="Contoh: Blok C4 No. 12"
                      value={blokNomor}
                      onChange={(e) => setBlokNomor(e.target.value)}
                      className="w-full h-14 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl text-slate-900 text-sm sm:text-base font-semibold placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#00624E] focus:border-[#00624E] transition-all"
                    />
                  </div>
                </div>

                {/* Primary Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    id="btn-next-step1"
                    className="w-full h-14 bg-[#00624E] hover:bg-[#004d3d] active:scale-[0.98] text-white font-bold text-sm sm:text-base rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Lanjut: Pilih Peran Anda</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </form>

            </div>
          )}

          {/* STEP 2: PILIH PERAN ANDA */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Step Badge */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F4EA] border border-[#00624E]/20 text-[#00624E] text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00624E]" />
                  <span>Langkah 2 dari 2</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  Pilih Peran Anda di JagaWarga
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  Pilihan ini menyesuaikan tampilan antarmuka yang paling tepat untuk Anda.
                </p>
              </div>

              {/* 2 Selectable Cards */}
              <div className="space-y-3.5 pt-1">
                
                {/* 1. Saya Lansia / Warga Rentan */}
                <div
                  id="role-card-lansia"
                  onClick={() => {
                    if (typeof window !== "undefined" && "vibrate" in navigator) {
                      try { navigator.vibrate(30); } catch {}
                    }
                    setPeran("lansia");
                  }}
                  className={`p-5 rounded-3xl cursor-pointer transition-all duration-200 border text-left relative active:scale-[0.99] ${
                    peran === "lansia"
                      ? "bg-[#E6F4EA] border-2 border-[#00624E] shadow-2xs"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-2xs"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform ${
                      peran === "lansia"
                        ? "bg-[#00624E] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      <Accessibility className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    <div className="flex-1 min-w-0 pr-6">
                      <h3 className={`font-black text-base sm:text-lg leading-tight ${
                        peran === "lansia" ? "text-[#00624E]" : "text-slate-900"
                      }`}>
                        Saya Lansia / Warga Rentan
                      </h3>
                      <p className={`text-xs sm:text-sm font-medium mt-1 leading-relaxed ${
                        peran === "lansia" ? "text-emerald-950/80" : "text-slate-500"
                      }`}>
                        Tampilan ramah orang tua, tombol sentuh besar, fitur konfirmasi Pagi Sehat harian, dan tombol darurat SOS.
                      </p>
                    </div>

                    <div className="absolute top-5 right-5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        peran === "lansia"
                          ? "bg-[#00624E] text-white shadow-xs"
                          : "border-2 border-slate-300 bg-white"
                      }`}>
                        {peran === "lansia" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Saya Warga Siaga (Keluarga & Relawan) - SELECTED STATE */}
                <div
                  id="role-card-siaga"
                  onClick={() => {
                    if (typeof window !== "undefined" && "vibrate" in navigator) {
                      try { navigator.vibrate(30); } catch {}
                    }
                    setPeran("siaga");
                  }}
                  className={`p-5 rounded-3xl cursor-pointer transition-all duration-200 border text-left relative active:scale-[0.99] ${
                    peran === "siaga"
                      ? "bg-[#E6F4EA] border-2 border-[#00624E] shadow-2xs"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-2xs"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform ${
                      peran === "siaga"
                        ? "bg-[#00624E] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      <HeartHandshake className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    <div className="flex-1 min-w-0 pr-6">
                      <h3 className={`font-black text-base sm:text-lg leading-tight ${
                        peran === "siaga" ? "text-[#00624E]" : "text-slate-900"
                      }`}>
                        Saya Warga Siaga (Keluarga &amp; Relawan)
                      </h3>
                      <p className={`text-xs sm:text-sm font-medium mt-1 leading-relaxed ${
                        peran === "siaga" ? "text-emerald-950/80" : "text-slate-500"
                      }`}>
                        Bisa memantau kondisi orang tua dari jarak jauh, sekaligus siap membantu tetangga di sekitar tempat tinggal Anda.
                      </p>
                    </div>

                    <div className="absolute top-5 right-5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        peran === "siaga"
                          ? "bg-[#00624E] text-white shadow-xs"
                          : "border-2 border-slate-300 bg-white"
                      }`}>
                        {peran === "siaga" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Primary Button */}
              <div className="pt-2">
                <button
                  type="button"
                  id="btn-finish-register"
                  disabled={isSubmitting}
                  onClick={handleFinishRegister}
                  className="w-full h-14 bg-[#00624E] hover:bg-[#004d3d] active:scale-[0.98] text-white font-bold text-sm sm:text-base rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span>Mempersiapkan Akun...</span>
                  ) : (
                    <>
                      <Check className="w-5 h-5 stroke-[3]" />
                      <span>Selesaikan Pendaftaran</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Bottom Link to Login */}
        <div className="text-center mt-6">
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Sudah memiliki akun?{" "}
            <Link
              href="/login"
              id="link-ke-login"
              className="font-bold text-[#00624E] hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full max-w-xl mx-auto text-center pt-4 text-xs text-slate-400 font-medium">
        <p>JagaWarga — Platform Gotong Royong Warga &amp; Pemantauan Lansia Hiper-Lokal RT/RW.</p>
      </footer>

    </div>
  );
}
