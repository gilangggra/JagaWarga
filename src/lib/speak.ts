let cachedFemaleVoice: SpeechSynthesisVoice | null = null;

function getIndonesianFemaleVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const exactFemale = voices.find((v) => {
    const name = v.name.toLowerCase();
    const lang = (v.lang || "").toLowerCase();
    const isId = lang.startsWith("id") || name.includes("indonesia");
    const isFemale =
      name.includes("gadis") ||
      name.includes("google") ||
      name.includes("damayanti") ||
      name.includes("siti") ||
      name.includes("female") ||
      name.includes("perempuan");
    return isId && isFemale;
  });
  if (exactFemale) return exactFemale;

  const nonMale = voices.find((v) => {
    const name = v.name.toLowerCase();
    const lang = (v.lang || "").toLowerCase();
    const isId = lang.startsWith("id") || name.includes("indonesia");
    const isMale =
      name.includes("ardi") ||
      name.includes("andika") ||
      name.includes("david") ||
      name.includes("male") ||
      name.includes("pria");
    return isId && !isMale;
  });
  if (nonMale) return nonMale;

  const anyFemale = voices.find((v) => {
    const name = v.name.toLowerCase();
    return (
      name.includes("gadis") ||
      name.includes("zira") ||
      name.includes("samantha") ||
      name.includes("female") ||
      name.includes("woman")
    );
  });
  if (anyFemale) return anyFemale;

  return null;
}

export function initSpeechVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const update = () => {
    const v = getIndonesianFemaleVoice();
    if (v) cachedFemaleVoice = v;
  };

  update();
  window.speechSynthesis.onvoiceschanged = update;
}

if (typeof window !== "undefined") {
  initSpeechVoices();
}

export function speakIndonesian(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  try {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    utterance.rate = 0.92;
    utterance.pitch = 1.1;

    const voice = cachedFemaleVoice || getIndonesianFemaleVoice();

    if (voice) {
      utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    } else {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          const loadedVoice = getIndonesianFemaleVoice();
          if (loadedVoice) {
            cachedFemaleVoice = loadedVoice;
            utterance.voice = loadedVoice;
          }
          window.speechSynthesis.speak(utterance);
        };
      } else {
        window.speechSynthesis.speak(utterance);
      }
    }
  } catch {}
}
