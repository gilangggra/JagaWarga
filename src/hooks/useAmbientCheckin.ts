"use client";

import { useEffect, useState, useRef } from "react";
import { performCheckin } from "@/lib/sync/realtimeStore";
import { speakIndonesian } from "@/lib/speak";
import { CheckinRecord } from "@/types/database";

interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  onchargingchange: ((this: BatteryManager, ev: Event) => any) | null;
}

export function useAmbientCheckin(currentStatus: CheckinRecord["status"]) {
  const [isBatterySupported, setIsBatterySupported] = useState(false);
  const [isCharging, setIsCharging] = useState<boolean | null>(null);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [lastAmbientTrigger, setLastAmbientTrigger] = useState<string | null>(null);
  const prevChargingRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("getBattery" in navigator)) {
      setIsBatterySupported(false);
      return;
    }

    setIsBatterySupported(true);
    let batteryInstance: BatteryManager | null = null;

    const handleChargingChange = () => {
      if (!batteryInstance) return;
      const currentlyCharging = batteryInstance.charging;
      setIsCharging(currentlyCharging);

      if (prevChargingRef.current === true && currentlyCharging === false) {
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} WIB`;
        
        performCheckin(
          "success",
          "battery_ambient",
          "Terkonfirmasi otomatis saat mencabut kabel charger bangun tidur."
        );

        setLastAmbientTrigger(timeStr);

        if ("vibrate" in navigator) {
          try {
            navigator.vibrate([100, 50, 100]);
          } catch {}
        }

        try {
          speakIndonesian("Selamat pagi Bapak. Kabar sehat Anda telah terkonfirmasi otomatis.");
        } catch {}
      }

      prevChargingRef.current = currentlyCharging;
    };

    const handleLevelChange = () => {
      if (batteryInstance) {
        setBatteryLevel(Math.round(batteryInstance.level * 100));
      }
    };

    (navigator as any)
      .getBattery()
      .then((battery: BatteryManager) => {
        batteryInstance = battery;
        setIsCharging(battery.charging);
        setBatteryLevel(Math.round(battery.level * 100));
        prevChargingRef.current = battery.charging;

        battery.addEventListener("chargingchange", handleChargingChange);
        battery.addEventListener("levelchange", handleLevelChange);
      })
      .catch(() => {
        setIsBatterySupported(false);
      });

    return () => {
      if (batteryInstance) {
        batteryInstance.removeEventListener("chargingchange", handleChargingChange);
        batteryInstance.removeEventListener("levelchange", handleLevelChange);
      }
    };
  }, [currentStatus]);

  const simulateUnplug = () => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} WIB`;
    
    performCheckin(
      "success",
      "battery_ambient",
      "Terkonfirmasi otomatis saat mencabut kabel charger bangun tidur (Simulasi)."
    );

    setLastAmbientTrigger(timeStr);

    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([100, 50, 100]);
      } catch {}
    }

    try {
      speakIndonesian("Simulasi sensor cabut charger berhasil. Kabar sehat Bapak telah tercatat.");
    } catch {}
  };

  return {
    isBatterySupported,
    isCharging,
    batteryLevel,
    lastAmbientTrigger,
    simulateUnplug,
  };
}
