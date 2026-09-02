import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "JagaWarga — Tetangga Saling Cek, Lingkungan Lebih Aman",
    template: "%s | JagaWarga",
  },
  description:
    "Platform koordinasi bantuan mikro hiper-lokal berbasis RT/RW. Menjamin kecepatan respons < 15 menit untuk warga rentan, lansia, dan penyandang disabilitas.",
  keywords: ["keamanan lingkungan", "lansia", "RT", "bantuan warga", "civic tech"],
  authors: [{ name: "JagaWarga" }],
  creator: "JagaWarga",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "JagaWarga",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "JagaWarga — Tetangga Saling Cek, Lingkungan Lebih Aman",
    description:
      "Platform koordinasi bantuan mikro hiper-lokal berbasis RT/RW untuk warga rentan.",
    siteName: "JagaWarga",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D9488",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 font-[family-name:var(--font-plus-jakarta)]">
        {children}
      </body>
    </html>
  );
}
