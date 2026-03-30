import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Terry Bell — A Life Remembered",
  description:
    "A memorial microsite honouring Terry Bell (12 September 1948 – 25 March 2026) — veteran journalist, trade unionist, struggle stalwart, and activist.",
  openGraph: {
    title: "Terry Bell — A Life Remembered",
    description:
      "Honouring Terry Bell: veteran journalist, trade unionist, struggle stalwart, and activist. 12 September 1948 – 25 March 2026.",
    images: ["/images/terry-face.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
