"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Shield, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Accessibility, 
  HeartHandshake
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("81234567890");
  const [pin, setPin] = useState("123456");
  const [showPin, setShowPin] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"siaga" | "lansia">("siaga");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try { navigator.vibrate(40); } catch {}
    }
    setIsLoading(true);

    setTimeout(() => {
      if (selectedRole === "lansia") {
        router.push("/lansia");
      } else {
        router.push("/anak");
      }
    }, 500);
  };

  const handleQuickDemo = (role: "siaga" | "lansia") => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try { navigator.vibrate(30); } catch {}
    }
    setSelectedRole(role);
    if (role === "lansia") {
      setPhone("81234567888");
      setPin("824100");
    } else {
      setPhone("81234567890");
      setPin("123456");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6 font-sans selection:bg-emerald-100">
      
      {/* Top Header */}
      <header className="w-full max-w-xl mx-auto flex items-center justify-between pb-4 sm:pb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#00624E] rounded-2xl flex items-center justify-center shadow-xs text-white">
            <Shield className="w-5 h-5 fill-white/20 stroke-[2.2]" />
          </div>
          <div>
            <span className="font-black text-slate-900 text-xl tracking-tight leading-none block">
              JagaWarga
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              Sistem Keamanan &amp; Rawat Lansia RT
            </span>
          </div>
        </div>

        <Link
          href="/register"
          id="btn-nav-daftar"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:bg-emerald-50/40 text-[#00624E] font-black text-xs sm:text-sm shadow-2xs transition-all active:scale-95"
        >
          <span>Daftar Baru</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Main Card Container */}
      <main className="w-full max-w-xl mx-auto flex-1 flex flex-col justify-center my-2 sm:my-4">
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-9 shadow-xs">
          
          <div className="space-y-1 mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Masuk ke JagaWarga
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              Pilih peran Anda dan masukkan nomor WhatsApp untuk mengakses dashboard.
            </p>
          </div>

          {/* Role Toggle Selector */}
          <div className="grid grid-cols-2 gap-2.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 mb-6">
            <button
              type="button"
              id="tab-role-siaga"
              onClick={() => handleQuickDemo("siaga")}
              className={`py-3 px-3 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedRole === "siaga"
                  ? "bg-white text-[#00624E] shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <HeartHandshake className="w-4 h-4 stroke-[2.5]" />
              <span>Warga Siaga</span>
            </button>

            <button
              type="button"
              id="tab-role-lansia"
              onClick={() => handleQuickDemo("lansia")}
              className={`py-3 px-3 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedRole === "lansia"
                  ? "bg-white text-[#00624E] shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Accessibility className="w-4 h-4 stroke-[2.5]" />
              <span>Lansia / Warga</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* WhatsApp Input */}
            <div className="space-y-1.5">
              <label htmlFor="login-wa" className="text-xs sm:text-sm font-bold text-slate-700 block">
                Nomor WhatsApp Terdaftar
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="absolute inset-y-0 left-11 flex items-center pointer-events-none text-slate-500 font-bold text-sm sm:text-base pr-2 border-r border-slate-200 my-3">
                  +62
                </div>
                <input
                  id="login-wa"
                  type="tel"
                  required
                  placeholder="812-3456-7890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="w-full h-14 pl-24 pr-4 bg-white border border-slate-200 rounded-2xl text-slate-900 text-sm sm:text-base font-semibold placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#00624E] focus:border-[#00624E] transition-all"
                />
              </div>
            </div>

            {/* PIN / Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="login-pin" className="text-xs sm:text-sm font-bold text-slate-700 block">
                  PIN Keamanan / Kata Sandi
                </label>
                <button
                  type="button"
                  onClick={() => alert("PIN sementara demo: 123456 (Warga Siaga) atau 824100 (Lansia)")}
                  className="text-xs font-bold text-[#00624E] hover:underline cursor-pointer"
                >
                  Lupa PIN?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-5 h-5 stroke-[2]" />
                </div>
                <input
                  id="login-pin"
                  type={showPin ? "text" : "password"}
                  required
                  placeholder="Masukkan 6 digit PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full h-14 pl-12 pr-12 bg-white border border-slate-200 rounded-2xl text-slate-900 text-sm sm:text-base font-semibold placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#00624E] focus:border-[#00624E] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Quick Profile Summary Badge */}
            <div className="p-3.5 rounded-2xl bg-[#E6F4EA] border border-emerald-200/80 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00624E] animate-pulse" />
                <span className="font-black text-[#00624E]">
                  Akan masuk ke: {selectedRole === "lansia" ? "Portal Lansia (Bapak Prabowo)" : "Portal Warga Siaga (Dimas / Titiek)"}
                </span>
              </div>
              <span className="text-[11px] font-bold text-emerald-800">RT 04 Sleman</span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="btn-submit-login"
                disabled={isLoading}
                className="w-full h-14 bg-[#00624E] hover:bg-[#004d3d] active:scale-[0.98] text-white font-black text-sm sm:text-base rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 group"
              >
                {isLoading ? (
                  <span>Menghubungkan ke Posko RT...</span>
                ) : (
                  <>
                    <span>Masuk ke Dashboard</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Quick Demo Switcher */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center space-y-3">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              Akses Cepat Mode Penjurian / Demo
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                id="demo-login-lansia"
                onClick={() => handleQuickDemo("lansia")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  selectedRole === "lansia"
                    ? "bg-[#00624E] text-white border-[#00624E]"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                Bapak Prabowo (Lansia)
              </button>

              <button
                type="button"
                id="demo-login-siaga"
                onClick={() => handleQuickDemo("siaga")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  selectedRole === "siaga"
                    ? "bg-[#00624E] text-white border-[#00624E]"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                Dimas Prasetyo (Warga Siaga)
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Link to Register */}
        <div className="text-center mt-6">
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Belum terdaftar sebagai warga di RT Anda?{" "}
            <Link
              href="/register"
              id="link-ke-register"
              className="font-black text-[#00624E] hover:underline"
            >
              Daftar Warga Baru Sekarang
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
