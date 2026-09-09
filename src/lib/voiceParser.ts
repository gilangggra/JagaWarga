import { TicketCategory } from "@/types/database";

export interface ParsedVoiceIntent {
  category: TicketCategory;
  urgency: "rendah" | "sedang" | "tinggi" | "kritis";
  targetItem?: string;
  targetLocation?: string;
  summary: string;
  detectedKeywords: string[];
}

export function parseElderlySpeech(rawText: string): ParsedVoiceIntent {
  const text = rawText.toLowerCase().trim();
  const matchedKeywords: string[] = [];

  const sosKeywords = [
    "darurat", "tolong", "jatuh", "ngguling", "sesak", "ambruk", "pingsan", 
    "sekarat", "nyeri dada", "jantung", "lumpuh", "kebakaran", "maling", "darah"
  ];
  const foundSos = sosKeywords.filter(k => text.includes(k));
  if (foundSos.length > 0) {
    return {
      category: "sos_darurat",
      urgency: "kritis",
      summary: `Panggilan darurat: "${rawText}"`,
      detectedKeywords: foundSos,
    };
  }

  const medicineKeywords = [
    "obat", "apotek", "resep", "tensi", "bodrex", "parasetamol", "paracetamol", 
    "amlodipin", "metformin", "inhaler", "perban", "betadine", "salep", "pil", "kapsul",
    "nggliyeng", "pusing", "mumet", "demam", "panas"
  ];
  const foundMed = medicineKeywords.filter(k => text.includes(k));
  if (foundMed.length > 0) {
    matchedKeywords.push(...foundMed);
    
    let item = "Obat harian";
    if (text.includes("amlodipin")) item = "Obat Amlodipin 5mg";
    else if (text.includes("parasetamol") || text.includes("paracetamol")) item = "Parasetamol";
    else if (text.includes("bodrex")) item = "Bodrex Sakit Kepala";
    else if (text.includes("tensi")) item = "Obat Hipertensi";

    return {
      category: "antar_obat",
      urgency: text.includes("habis") || text.includes("nggliyeng") ? "tinggi" : "sedang",
      targetItem: item,
      targetLocation: text.includes("apotek") ? "Apotek terdekat" : "Apotek / Warung",
      summary: `Minta bantuan belikan ${item} (${rawText})`,
      detectedKeywords: matchedKeywords,
    };
  }

  const shoppingKeywords = [
    "belanja", "sayur", "tumbas", "warung", "beras", "minyak", "telur", 
    "gula", "tepung", "sabun", "roti", "lauk", "bayam", "kangkung", "tempe", "tahu"
  ];
  const foundShop = shoppingKeywords.filter(k => text.includes(k));
  if (foundShop.length > 0) {
    matchedKeywords.push(...foundShop);
    return {
      category: "belanja",
      urgency: "sedang",
      targetLocation: "Warung RT / Pasar terdekat",
      summary: `Titip belanja bahan pokok/sayur: "${rawText}"`,
      detectedKeywords: matchedKeywords,
    };
  }

  const checkKeywords = [
    "cek", "tengok", "kunci", "kompor", "kran", "lampu", "atap", "bocor", "pintu", "rumah"
  ];
  const foundCheck = checkKeywords.filter(k => text.includes(k));
  if (foundCheck.length > 0) {
    matchedKeywords.push(...foundCheck);
    return {
      category: "cek_rumah",
      urgency: "sedang",
      summary: `Minta bantuan cek kondisi rumah: "${rawText}"`,
      detectedKeywords: matchedKeywords,
    };
  }

  return {
    category: "pendampingan",
    urgency: "rendah",
    summary: `Permintaan pendampingan: "${rawText}"`,
    detectedKeywords: ["pendampingan_umum"],
  };
}
