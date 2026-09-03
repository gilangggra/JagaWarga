"use client";

import React from "react";
import { Phone, Clock, ShieldCheck } from "lucide-react";

export interface ActiveDeliveryProps {
  recipientName: string;
  itemName: string;
  volunteerName: string;
  volunteerPhone: string;
  etaMinutes: number;
}

export const ActiveDeliveryCard: React.FC<ActiveDeliveryProps> = ({
  recipientName,
  itemName,
  volunteerName,
  volunteerPhone,
  etaMinutes,
}) => {
  return (
    <div className="bg-[#00624E] text-white p-6 rounded-3xl shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-emerald-100 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Sedang Berjalan
          </span>
          <span className="text-xs text-emerald-200 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> ETA: ~{etaMinutes} mnt
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-1">
          {itemName}
        </h3>
        <p className="text-sm text-emerald-100 mb-4">
          Untuk: <span className="font-semibold text-white">{recipientName}</span> • Ditangani oleh <span className="font-semibold text-white">{volunteerName}</span>
        </p>
      </div>

      <div className="pt-2 border-t border-emerald-700/50">
        <a
          href={`tel:${volunteerPhone}`}
          className="w-full bg-white text-[#00624E] hover:bg-emerald-50 active:scale-[0.98] transition-all font-semibold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-sm min-h-[44px]"
          aria-label={`Hubungi relawan ${volunteerName}`}
        >
          <Phone className="w-4 h-4" />
          Hubungi {volunteerName}
        </a>
      </div>
    </div>
  );
};

export default ActiveDeliveryCard;
