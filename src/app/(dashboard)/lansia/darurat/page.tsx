"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const COUNTDOWN_SECONDS = 4;

export default function DaruratPage() {
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [activated, setActivated] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!activated) return;
    if (countdown <= 0) return;

    intervalRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [activated]);

  const handleActivate = () => setActivated(true);

  const handleCancel = () => {
    setActivated(false);
    setCountdown(COUNTDOWN_SECONDS);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div className="flex flex-col flex-1 min-h-full bg-red-600 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-500 rounded-full opacity-40" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-red-700 rounded-full opacity-40" />
      </div>

      <div className="relative z-10 px-5 pt-5">
        <Link
          href="/lansia"
          id="btn-back-darurat"
          className="inline-flex p-2 rounded-xl bg-red-500/50 hover:bg-red-500/70 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </Link>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="white" className="w-14 h-14">
            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
          </svg>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-white leading-tight">
            ALARM DARURAT<br />AKTIF!
          </h1>
          <p className="text-red-200 mt-3 text-base leading-relaxed max-w-xs mx-auto">
            Sistem sedang menghubungi Tetangga Terdekat &amp; Pengurus RT.
          </p>
        </div>

        {!activated ? (
          <button
            id="btn-activate-sos"
            onClick={handleActivate}
            className="w-40 h-40 rounded-full bg-white/20 border-4 border-white/50 hover:bg-white/30 active:scale-95 transition-all duration-150 flex items-center justify-center"
          >
            <span className="text-white font-extrabold text-xl text-center leading-tight">
              Tahan<br />untuk<br />Aktivasi
            </span>
          </button>
        ) : (
          <div className="w-40 h-40 rounded-full bg-white/20 border-4 border-white flex items-center justify-center">
            <div className="text-center">
              <span className="text-white font-extrabold text-6xl tabular-nums">
                {countdown}
              </span>
              <p className="text-red-200 text-sm font-bold tracking-widest uppercase mt-1">
                Detik
              </p>
            </div>
          </div>
        )}

        <button
          id="btn-cancel-sos"
          onClick={handleCancel}
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/50 text-white font-bold text-base hover:bg-white/10 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          Batalkan (Salah Pencet)
        </button>

        <p className="text-red-300 text-xs">
          Ketuk tombol di atas jika ini bukan kondisi darurat.
        </p>
      </div>
    </div>
  );
}
