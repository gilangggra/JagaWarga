export type UserRole = "elderly" | "guardian" | "volunteer" | "admin_rt";

export type CheckinStatus = "pending" | "success" | "snoozed" | "missed";

export type CheckinSource = "manual_button" | "battery_ambient" | "voice" | "guardian_proxy" | "system_cron";

export type TicketCategory = 
  | "antar_obat" 
  | "belanja" 
  | "cek_rumah" 
  | "pendampingan" 
  | "sos_darurat";

export type TicketStatus = "open" | "claimed" | "completed" | "expired" | "cancelled";

export interface CheckinRecord {
  id: string;
  elderlyId: string;
  elderlyName: string;
  checkinDate: string;
  status: CheckinStatus;
  snoozeCount: number;
  windowStart: string;
  windowEnd: string;
  checkinTime?: string;
  source?: CheckinSource;
  moodNote?: string;
}

export interface HelpTicket {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterPhone: string;
  createdBy?: string;
  category: TicketCategory;
  description: string;
  status: TicketStatus;
  escalationTier: number;
  claimedBy?: string;
  claimedByName?: string;
  claimedByPhone?: string;
  claimedAt?: string;
  completedAt?: string;
  createdAt: string;
  addressMasked: string;
  addressFull: string;
  pinCode: string;
}

export interface RealtimeSyncPayload {
  type: "CHECKIN_UPDATE" | "TICKET_CREATED" | "TICKET_CLAIMED" | "TICKET_COMPLETED" | "STATE_RESET";
  checkin?: CheckinRecord;
  ticket?: HelpTicket;
  timestamp: number;
}
