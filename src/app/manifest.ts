import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JagaWarga — Tetangga Saling Cek, Lingkungan Lebih Aman",
    short_name: "JagaWarga",
    description:
      "Platform koordinasi bantuan mikro hiper-lokal berbasis RT/RW untuk menjamin kecepatan respons dan menjaga privasi warga rentan.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0D9488",
    theme_color: "#0D9488",
    categories: ["health", "social", "utilities"],
    lang: "id",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Pagi Sehat",
        short_name: "Check-in",
        description: "Konfirmasi kabar pagi harian",
        url: "/lansia",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Minta Bantuan",
        short_name: "Bantuan",
        description: "Buat tiket permintaan bantuan",
        url: "/lansia/bantuan",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
    ],
  };
}
