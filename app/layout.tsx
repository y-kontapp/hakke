import type { Metadata } from "next";
import { Archivo_Black, Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "EKIKYO · 六十四卦",
  description:
    "サイコロを六回振り、易経の六十四卦と之卦を立てるシンプルな占いアプリ。",
  verification: {
    google: "alKr3qaPPA3wnNy16OzT4JRB4EFz-NKhDZhY3KGAxDU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJp.variable} ${inter.variable} ${archivoBlack.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F4E4C1] text-[#1A1A1A]">{children}</body>
    </html>
  );
}
