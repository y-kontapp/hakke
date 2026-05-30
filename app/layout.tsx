import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Archivo_Black } from "next/font/google";
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

const SITE_URL = "https://hakke.vercel.app";
const SITE_NAME = "EKIKYO";
const TITLE = "EKIKYO · 六十四卦";
const DESCRIPTION =
  "サイコロを六回振り、易経の六十四卦と之卦を立てる、内省のためのオラクル。三千年の問いの作法を、現代のシンプルな手触りで。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · EKIKYO",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "易経",
    "六十四卦",
    "占い",
    "オラクル",
    "I Ching",
    "EKIKYO",
    "内省",
    "瞑想",
    "本卦",
    "之卦",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "alKr3qaPPA3wnNy16OzT4JRB4EFz-NKhDZhY3KGAxDU",
  },
  category: "lifestyle",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  alternateName: "六十四卦オラクル",
  url: SITE_URL,
  description: DESCRIPTION,
  inLanguage: "ja",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
  about: {
    "@type": "Thing",
    name: "易経",
    sameAs: "https://ja.wikipedia.org/wiki/%E6%98%93%E7%B5%8C",
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
      <body className="min-h-full bg-[#F4E4C1] text-[#1A1A1A]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
