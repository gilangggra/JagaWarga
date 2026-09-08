"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Radio, 
  MapPin, 
  Clock, 
  Pill, 
  Flame, 
  ShoppingBag, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Navigation,
  ArrowRight, 
  EyeOff, 
  ArrowLeft,
  HeartHandshake
} from "lucide-react";

interface Ticket {
  id: string;
  category: "obat" | "cek_rumah" | "belanja" | "darurat";
  title: string;
  description: string;
  maskedName: string;
  maskedAddress: string;
  distance: string;
  timeAgo: string;
  tier: 1 | 2 | 3;
  status: "open" | "claimed" | "completed";
  proxyRequester?: string;
  urgent?: boolean;
}

const INITIAL_TICKETS: Ticket[] = [
  {
    id: "TKT-08241",
    category: "obat",
    title: "Tebus Obat Hipertensi (Amlodipin 5mg)",
    description: "Tolong tebuskan 1 strip Amlodipin 5mg di Apotek K-24 Gejayan. Resep dokter terlampir. Biaya talangan langsung diganti via transfer oleh keluarga.",
    maskedName: "Bapak P. (71 th)",
    maskedAddress: "Radius ~50m dari posisi Anda • Sektor Blok C4",
    distance: "50 meter",
    timeAgo: "4 menit yang lalu",
    tier: 1,
    status: "open",
    proxyRequester: "Titiek (Anak di Jakarta)",
    urgent: true,
  },
  {
    id: "TKT-08242",
    category: "cek_rumah",
    title: "Pengecekan Kompor & Regulator Gas",
    description: "Nenek mencium sedikit bau gas setelah memasak air pagi ini, minta tolong tetangga terdekat cek regulator tabung LPG 3kg apakah sudah rapat.",
    maskedName: "Nenek S. (68 th)",
    maskedAddress: "Radius ~120m dari posisi Anda • Sektor Blok B2",
    distance: "120 meter",
    timeAgo: "12 menit yang lalu",
    tier: 2,
    status: "open",
    urgent: false,
  },
  {
    id: "TKT-08243",
    category: "belanja",
    title: "Titip Belanja Beras & Telur di Warung",
    description: "Kakek sedang nyeri lutut kambuh sehingga kesulitan jalan ke warung depan komplek. Titip beras 5kg dan 1/2 kg telur.",
    maskedName: "Kakek W. (75 th)",
    maskedAddress: "Radius ~200m dari posisi Anda • Sektor Blok D1",
    distance: "200 meter",
    timeAgo: "22 menit yang lalu",
    tier: 2,
    status: "open",
    urgent: false,
  },
];

export default function RadarBantuTetanggaPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTicketToClaim, setSelectedTicketToClaim] = useState<Ticket | null>(null);
  const [isClaiming, setIsClaiming] = useState(false);
  const [hasActiveTask, setHasActiveTask] = useState(true);

  const filteredTickets = tickets.filter((t) => {
    if (selectedCategory === "all") return true;
    return t.category === selectedCategory;
  });

  const handleClaimClick = (ticket: Ticket) => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try { navigator.vibrate(40); } catch {}
    }
    setSelectedTicketToClaim(ticket);
  };

  const confirmClaim = () => {
    if (!selectedTicketToClaim) return;
    setIsClaiming(true);

    setTimeout(() => {
      setIsClaiming(false);
      setSelectedTicketToClaim(null);
      setHasActiveTask(true);
      router.push("/anak/tugas-siaga");
    }, 600);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 font-sans pb-36 sm:pb-32 lg:pb-12 bg-[#F8FAFC]">
      
      {/* NAVIGATION BACK */}
      <div className="flex items-center justify-between">
        <Link
          href="/anak"
          id="btn-back-to-dashboard"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-[#00624E] font-black text-xs shadow-2xs transition-all active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#00624E] group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda Keluarga</span>
        </Link>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#E6F4EA] text-[#00624E] border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Radar RT 04 RW 02 Aktif</span>
        </span>
      </div>

      {/* HERO STATUS RADAR */}
      <div className="bg-gradient-to-br from-[#004D3D] via-[#00624E] to-[#013b30] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-96 h-96 pointer-events-none opacity-15">
          <div className="w-full h-full rounded-full border-2 border-emerald-300 animate-ping duration-1000" />
          <div className="absolute inset-8 rounded-full border-2 border-emerald-200" />
        </div>

        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-black text-emerald-200">
            <HeartHandshake className="w-4 h-4 text-emerald-300" />
            <span>Gotong Royong Warga • Radius 250m</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              Bantu Tetangga Sekitar
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 font-medium mt-1 leading-relaxed">
              Sebagai warga siaga, Anda dapat merespons permintaan bantuan mikro tetangga lansia di lingkungan RT 04. Alamat disamarkan demi privasi hingga Anda resmi mengambil tugas.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-200">
                Pagi Sehat RT
              </span>
              <p className="text-xl sm:text-2xl font-black text-white mt-0.5">
                12 / 12
              </p>
              <span className="text-[10px] text-emerald-300 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Semua Aman
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-200">
                Tiket Terbuka
              </span>
              <p className="text-xl sm:text-2xl font-black text-amber-300 mt-0.5">
                1 Butuh
              </p>
              <span className="text-[10px] text-emerald-200 font-medium">
                Radius Dekat
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-200">
                SLA Respons
              </span>
              <p className="text-xl sm:text-2xl font-black text-white mt-0.5">
                7,2 Mnt
              </p>
              <span className="text-[10px] text-emerald-300 font-bold">
                Target &lt; 15 Mnt
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-200">
                Poin Kebaikan
              </span>
              <p className="text-xl sm:text-2xl font-black text-emerald-300 mt-0.5">
                950 Pts
              </p>
              <span className="text-[10px] text-emerald-200 font-medium">
                Warga Aktif
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BANNER TUGAS BERJALAN JIKA ADA KLAIM */}
      {hasActiveTask && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Navigation className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-black bg-amber-500 text-white uppercase tracking-wider">
                  Misi Sedang Anda Tangani
                </span>
                <span className="text-xs font-bold text-amber-900">
                  Estimasi Tiba ~6 Menit
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                Tebus Obat Hipertensi (Amlodipin 5mg) • Bapak Prabowo
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Alamat lengkap telah terbuka di halaman tugas siaga • Siap verifikasi PIN/QR serah terima.
              </p>
            </div>
          </div>

          <Link
            href="/anak/tugas-siaga"
            id="btn-goto-active-task-from-radar"
            className="px-5 py-3 rounded-2xl bg-[#00624E] hover:bg-[#004d3d] text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 group"
          >
            <span>Buka Tugas &amp; Verifikasi</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}

      {/* SECTION HEADER & PRIVACY NOTICE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#00624E] animate-pulse" />
            <span>Permintaan Bantuan Warga Sekitar</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 inline shrink-0" />
            <span>Kepatuhan UU PDP: Alamat disamarkan menjadi radius lingkar hingga tugas Anda klaim sah.</span>
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: "all", label: "Semua" },
            { id: "obat", label: "Obat" },
            { id: "cek_rumah", label: "Cek Rumah" },
            { id: "belanja", label: "Belanja" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#00624E] text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* TICKET LIST */}
      <div className="grid grid-cols-1 gap-5">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className={`bg-white rounded-3xl border transition-all p-5 sm:p-7 shadow-xs hover:shadow-md ${
              ticket.urgent 
                ? "border-emerald-300 ring-2 ring-emerald-500/10" 
                : "border-slate-200/80"
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 ${
                    ticket.category === "obat"
                      ? "bg-emerald-100 text-emerald-800"
                      : ticket.category === "cek_rumah"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-sky-100 text-sky-800"
                  }`}>
                    {ticket.category === "obat" && <Pill className="w-3.5 h-3.5" />}
                    {ticket.category === "cek_rumah" && <Flame className="w-3.5 h-3.5" />}
                    {ticket.category === "belanja" && <ShoppingBag className="w-3.5 h-3.5" />}
                    <span>{ticket.title}</span>
                  </span>

                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{ticket.timeAgo}</span>
                  </span>

                  <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                    ticket.tier === 1 
                      ? "bg-emerald-50 text-[#00624E] border border-emerald-200" 
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>
                    Tier {ticket.tier} (Prioritas)
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    {ticket.description}
                  </h3>
                  {ticket.proxyRequester && (
                    <p className="text-xs font-bold text-slate-500 mt-1 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#00624E]" />
                      <span>Pembuat Permohonan: <strong>{ticket.proxyRequester}</strong></span>
                    </p>
                  )}
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-500 shadow-2xs">
                      <EyeOff className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900">
                        {ticket.maskedName}
                      </p>
                      <p className="text-slate-500 font-medium">
                        {ticket.maskedAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="inline-flex items-center gap-1 font-bold text-[#00624E] bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{ticket.distance}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:w-48 shrink-0 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 space-y-2">
                <button
                  id={`btn-claim-${ticket.id}`}
                  onClick={() => handleClaimClick(ticket)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#00624E] hover:bg-[#004d3d] active:scale-95 text-white font-black text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Navigation className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>Ambil Tugas Ini</span>
                </button>
                <p className="text-[10.5px] text-center text-slate-400 font-medium leading-tight">
                  1 Warga per Tiket • SLA &lt; 15 Mnt
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* MODAL KONFIRMASI KLAIM (FR-06) */}
      {selectedTicketToClaim && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#00624E] border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
              <Navigation className="w-7 h-7 animate-bounce" />
            </div>

            <div className="text-center space-y-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00624E] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Konfirmasi Siaga
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Bantu Tetangga Ini?
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Anda akan menjadi penanggung jawab tugas ini. Alamat lengkap dan nomor kontak lansia akan terbuka untuk proses serah terima.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between font-bold">
                <span className="text-slate-500">Tugas:</span>
                <span className="text-slate-900 text-right">{selectedTicketToClaim.title}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-slate-500">Jarak:</span>
                <span className="text-emerald-700">{selectedTicketToClaim.distance}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setSelectedTicketToClaim(null)}
                disabled={isClaiming}
                className="flex-1 py-3.5 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-black text-xs transition-all cursor-pointer"
              >
                Batal
              </button>

              <button
                type="button"
                id="btn-confirm-atomic-claim"
                onClick={confirmClaim}
                disabled={isClaiming}
                className="flex-1 py-3.5 rounded-2xl bg-[#00624E] hover:bg-[#004d3d] text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isClaiming ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Mengklaim...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Saya Siap Bantu</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
