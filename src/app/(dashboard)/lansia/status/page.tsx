"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StatusRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/lansia/bantuan?tab=lacak");
  }, [router]);

  return (
    <div className="p-8 text-center text-slate-400 font-sans">
      Mengarahkan ke Layanan Bantuan &amp; Lacak...
    </div>
  );
}
