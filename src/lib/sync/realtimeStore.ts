"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckinRecord, HelpTicket, RealtimeSyncPayload } from "@/types/database";

const CHANNEL_NAME = "tilikaman_sync_channel";
const STORAGE_KEY_CHECKIN = "tilikaman_checkin_state";
const STORAGE_KEY_TICKETS = "tilikaman_tickets_state";

const DEFAULT_CHECKIN: CheckinRecord = {
  id: "checkin-today-01",
  elderlyId: "lansia-budi-01",
  elderlyName: "Bapak Budi Santoso",
  checkinDate: new Date().toISOString().split("T")[0],
  status: "pending",
  snoozeCount: 0,
  windowStart: "07:00",
  windowEnd: "09:00",
  checkinTime: undefined,
  source: undefined,
  moodNote: undefined,
};

const DEFAULT_TICKETS: HelpTicket[] = [
  {
    id: "ticket-seed-01",
    requesterId: "lansia-budi-01",
    requesterName: "Bapak Budi Santoso",
    requesterPhone: "0812-3456-7890",
    category: "antar_obat",
    description: "Tebus obat tensi Amlodipin 5mg di Apotek Sehat Farma",
    status: "claimed",
    escalationTier: 1,
    claimedBy: "vol-budi-01",
    claimedByName: "Budi Santoso (Relawan Siaga RT 04)",
    claimedByPhone: "0812-9876-5432",
    claimedAt: "08:15 WIB",
    createdAt: "08:05 WIB",
    addressMasked: "Radius ~50m dari Balai RT 04",
    addressFull: "Jl. Melati Blok C4 No. 12, RT 04 / RW 02",
    pinCode: "7429",
  },
];

function getStoredCheckin(): CheckinRecord {
  if (typeof window === "undefined") return DEFAULT_CHECKIN;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CHECKIN);
    return raw ? JSON.parse(raw) : DEFAULT_CHECKIN;
  } catch {
    return DEFAULT_CHECKIN;
  }
}

function getStoredTickets(): HelpTicket[] {
  if (typeof window === "undefined") return DEFAULT_TICKETS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TICKETS);
    return raw ? JSON.parse(raw) : DEFAULT_TICKETS;
  } catch {
    return DEFAULT_TICKETS;
  }
}

function broadcastSync(payload: RealtimeSyncPayload) {
  if (typeof window === "undefined") return;
  try {
    if ("BroadcastChannel" in window) {
      const bc = new BroadcastChannel(CHANNEL_NAME);
      bc.postMessage(payload);
      bc.close();
    }
  } catch {}
}

export function performCheckin(
  status: "success" | "kurang_enak" | "butuh_bantuan" = "success",
  source: CheckinRecord["source"] = "manual_button",
  moodNote?: string
): CheckinRecord {
  const current = getStoredCheckin();
  const now = new Date();
  const timeString = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} WIB`;

  const updated: CheckinRecord = {
    ...current,
    status: "success",
    checkinTime: timeString,
    source,
    moodNote: moodNote || (status === "kurang_enak" ? "Kurang enak badan" : "Kabar baik"),
  };

  try {
    localStorage.setItem(STORAGE_KEY_CHECKIN, JSON.stringify(updated));
  } catch {}

  broadcastSync({
    type: "CHECKIN_UPDATE",
    checkin: updated,
    timestamp: Date.now(),
  });

  return updated;
}

export function performSnooze(): CheckinRecord {
  const current = getStoredCheckin();
  if (current.snoozeCount >= 2) return current;

  const updated: CheckinRecord = {
    ...current,
    status: "snoozed",
    snoozeCount: current.snoozeCount + 1,
    windowEnd: "09:30",
  };

  try {
    localStorage.setItem(STORAGE_KEY_CHECKIN, JSON.stringify(updated));
  } catch {}

  broadcastSync({
    type: "CHECKIN_UPDATE",
    checkin: updated,
    timestamp: Date.now(),
  });

  return updated;
}

export function createHelpTicket(
  category: HelpTicket["category"],
  description: string,
  createdBy?: string
): HelpTicket {
  const tickets = getStoredTickets();
  const now = new Date();
  const timeString = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} WIB`;
  const pin = String(Math.floor(1000 + Math.random() * 9000));

  const newTicket: HelpTicket = {
    id: `ticket-${Date.now()}`,
    requesterId: "lansia-budi-01",
    requesterName: "Bapak Budi Santoso",
    requesterPhone: "0812-3456-7890",
    createdBy,
    category,
    description,
    status: "open",
    escalationTier: category === "sos_darurat" ? 3 : 1,
    createdAt: timeString,
    addressMasked: "Radius ~50m dari Balai RT 04",
    addressFull: "Jl. Melati Blok C4 No. 12, RT 04 / RW 02",
    pinCode: pin,
  };

  const updated = [newTicket, ...tickets];
  try {
    localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify(updated));
  } catch {}

  broadcastSync({
    type: "TICKET_CREATED",
    ticket: newTicket,
    timestamp: Date.now(),
  });

  return newTicket;
}

export function claimTicket(
  ticketId: string,
  volunteerName = "Dimas Prakoso (Karang Taruna RT 04)",
  volunteerPhone = "0813-2345-6789"
): HelpTicket | null {
  const tickets = getStoredTickets();
  const now = new Date();
  const timeString = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} WIB`;

  let updatedTarget: HelpTicket | null = null;
  const updated = tickets.map((t) => {
    if (t.id === ticketId) {
      updatedTarget = {
        ...t,
        status: "claimed" as const,
        claimedBy: "vol-current-user",
        claimedByName: volunteerName,
        claimedByPhone: volunteerPhone,
        claimedAt: timeString,
      };
      return updatedTarget;
    }
    return t;
  });

  if (updatedTarget) {
    try {
      localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify(updated));
    } catch {}

    broadcastSync({
      type: "TICKET_CLAIMED",
      ticket: updatedTarget,
      timestamp: Date.now(),
    });
  }

  return updatedTarget;
}

export function completeTicket(ticketId: string, enteredPin: string): boolean {
  const tickets = getStoredTickets();
  const target = tickets.find((t) => t.id === ticketId);
  if (!target) return false;

  if (target.pinCode !== enteredPin.trim()) {
    return false;
  }

  const now = new Date();
  const timeString = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} WIB`;

  let completedTarget: HelpTicket | null = null;
  const updated = tickets.map((t) => {
    if (t.id === ticketId) {
      completedTarget = {
        ...t,
        status: "completed" as const,
        completedAt: timeString,
      };
      return completedTarget;
    }
    return t;
  });

  if (completedTarget) {
    try {
      localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify(updated));
    } catch {}

    broadcastSync({
      type: "TICKET_COMPLETED",
      ticket: completedTarget,
      timestamp: Date.now(),
    });
  }

  return true;
}

export function resetDemoState(): void {
  try {
    localStorage.setItem(STORAGE_KEY_CHECKIN, JSON.stringify(DEFAULT_CHECKIN));
    localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify(DEFAULT_TICKETS));
  } catch {}

  broadcastSync({
    type: "STATE_RESET",
    timestamp: Date.now(),
  });
}

export function useRealtimeCheckin() {
  const [checkin, setCheckin] = useState<CheckinRecord>(DEFAULT_CHECKIN);

  useEffect(() => {
    setCheckin(getStoredCheckin());

    let bc: BroadcastChannel | null = null;
    try {
      if ("BroadcastChannel" in window) {
        bc = new BroadcastChannel(CHANNEL_NAME);
        bc.onmessage = (event: MessageEvent<RealtimeSyncPayload>) => {
          if (event.data.type === "CHECKIN_UPDATE" && event.data.checkin) {
            setCheckin(event.data.checkin);
          } else if (event.data.type === "STATE_RESET") {
            setCheckin(getStoredCheckin());
          }
        };
      }
    } catch {}

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_CHECKIN && e.newValue) {
        try {
          setCheckin(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      if (bc) bc.close();
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const doCheckin = useCallback(
    (status?: "success" | "kurang_enak" | "butuh_bantuan", source?: CheckinRecord["source"], moodNote?: string) => {
      const res = performCheckin(status, source, moodNote);
      setCheckin(res);
      return res;
    },
    []
  );

  const doSnooze = useCallback(() => {
    const res = performSnooze();
    setCheckin(res);
    return res;
  }, []);

  const doReset = useCallback(() => {
    resetDemoState();
    setCheckin(DEFAULT_CHECKIN);
  }, []);

  return { checkin, performCheckin: doCheckin, performSnooze: doSnooze, resetDemoState: doReset };
}

export function useRealtimeTickets() {
  const [tickets, setTickets] = useState<HelpTicket[]>(DEFAULT_TICKETS);

  useEffect(() => {
    setTickets(getStoredTickets());

    let bc: BroadcastChannel | null = null;
    try {
      if ("BroadcastChannel" in window) {
        bc = new BroadcastChannel(CHANNEL_NAME);
        bc.onmessage = (event: MessageEvent<RealtimeSyncPayload>) => {
          if (
            event.data.type === "TICKET_CREATED" ||
            event.data.type === "TICKET_CLAIMED" ||
            event.data.type === "TICKET_COMPLETED" ||
            event.data.type === "STATE_RESET"
          ) {
            setTickets(getStoredTickets());
          }
        };
      }
    } catch {}

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_TICKETS && e.newValue) {
        try {
          setTickets(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      if (bc) bc.close();
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const doCreate = useCallback((cat: HelpTicket["category"], desc: string, by?: string) => {
    const res = createHelpTicket(cat, desc, by);
    setTickets(getStoredTickets());
    return res;
  }, []);

  const doClaim = useCallback((id: string, vName?: string, vPhone?: string) => {
    const res = claimTicket(id, vName, vPhone);
    setTickets(getStoredTickets());
    return res;
  }, []);

  const doComplete = useCallback((id: string, pin: string) => {
    const res = completeTicket(id, pin);
    setTickets(getStoredTickets());
    return res;
  }, []);

  return { tickets, createTicket: doCreate, claimTicket: doClaim, completeTicket: doComplete };
}
