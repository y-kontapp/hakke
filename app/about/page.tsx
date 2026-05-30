import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "易経・八卦・六十四卦の基本と、本卦・之卦の読み方、三枚銭法の仕組みを解説するページです。",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · EKIKYO",
    description:
      "易経・八卦・六十四卦の基本と、本卦・之卦の読み方、三枚銭法の仕組みを解説するページです。",
    url: "https://hakke.vercel.app/about",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "About · EKIKYO",
    description:
      "易経・八卦・六十四卦の基本と、本卦・之卦の読み方、三枚銭法の仕組みを解説するページです。",
  },
};

const SECTIONS = [
  {
    no: "01",
    color: "bg-[#FCC419]",
    title: "易経（えききょう）",
    en: "The I Ching · Book of Changes",
    body: [
      "中国古代の経典で「五経」のひとつ。三千年以上の歴史を持ち、占いの書であると同時に、世界の変化の原理を説いた哲学書として読まれてきました。",
      "英語では Yì Jīng のピンインから I Ching、または意訳の Book of Changes / Classic of Changes と呼ばれます。",
    ],
  },
  {
    no: "02",
    color: "bg-[#E63946]",
    title: "八卦（はっけ）",
    en: "The 8 Trigrams",
    body: [
      "陰（- -）と陽（—）の二種類の爻を三本重ねた、八通りの基本図像です。",
      "それぞれが自然のはたらきを象徴します：乾（天）、坤（地）、震（雷）、巽（風）、坎（水）、離（火）、艮（山）、兌（沢）。",
      "あらゆる事象は、この八つの組み合わせで読み解けると考えられました。",
    ],
  },
  {
    no: "03",
    color: "bg-[#1D6FE5]",
    title: "六十四卦（ろくじゅうしか）",
    en: "The 64 Hexagrams",
    body: [
      "八卦を上下に二つ重ねると、8×8＝64通りの図像が生まれます。これが六十四卦で、六本の爻からなる卦＝ヘキサグラムです。",
      "それぞれに名前と卦辞（かじ）が与えられ、人生・自然・社会のあらゆる局面を象徴的に表します。",
    ],
  },
  {
    no: "04",
    color: "bg-[#FCC419]",
    title: "本卦（ほんけ）と之卦（しか）",
    en: "Primary & Transformed",
    body: [
      "占いで最初に立ち現れる卦が本卦で、いまの状況の構造を映します。",
      "爻のうち極まったもの（老陽・老陰）が変爻（へんこう）となって反転すると、もうひとつの卦＝之卦が現れます。これは本卦が向かっていく先、将来の姿を示すとされます。",
      "変爻がなければ、本卦の卦辞をそのまま受け取ります。",
    ],
  },
  {
    no: "05",
    color: "bg-[#E63946]",
    title: "三枚銭法（さんまいせんぽう）",
    en: "Three-Coin Method",
    body: [
      "古代は筮竹（ぜいちく）を用いた複雑な手順で爻を立てていましたが、後世になって硬貨三枚で代用する三枚銭法が広まりました。",
      "このアプリでは、三枚銭法と同じ確率分布になるよう、三個のサイコロを使います。1〜3を陽（3点）、4〜6を陰（2点）として合計を取り、6＝老陰、7＝少陽、8＝少陰、9＝老陽として爻を判じます。",
    ],
  },
  {
    no: "06",
    color: "bg-[#1D6FE5]",
    title: "卦の読み方",
    en: "How to Read",
    body: [
      "卦は具体的な答えを返してくるわけではなく、いまのあなたが置かれている状況の構造を、象徴的なメタファーとして映します。",
      "たとえば仕事の問いに「家人」が出ても、それは家庭の話そのものではなく「内を整えてから外に出よ」という構造の示唆として読み替えます。",
      "出た卦の本義を一度抽象に戻し、自分の問いに重ね直すことが、易経の作法です。",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F4E4C1]">
      <div className="absolute inset-x-0 top-0 h-[35%] bg-[#F5B878]" />

      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        <header className="relative mb-12">
          <div className="flex items-start justify-between">
            <div className="font-display flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#1A1A1A]">
              <span className="h-3 w-3 rounded-full bg-[#E63946]" />
              <span>I Ching Oracle</span>
            </div>
            <Link
              href="/"
              className="font-display border-[2.5px] border-[#1A1A1A] bg-[#F4E4C1] px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-[#1A1A1A] transition hover:bg-[#FCC419]"
            >
              ← Oracle
            </Link>
          </div>

          <div className="relative mt-12">
            <h1 className="font-display text-[16vw] leading-[0.85] text-[#1A1A1A] sm:text-[110px]">
              ABOUT
            </h1>
            <p className="font-display absolute -bottom-2 right-0 bg-[#1A1A1A] px-3 py-1 text-xs tracking-widest text-[#F4E4C1] sm:right-2">
              易経の手引き
            </p>
          </div>
        </header>

        <div className="space-y-6">
          {SECTIONS.map((section) => (
            <section
              key={section.no}
              className="fade-up frame-thick bg-[#FBF1DC] p-5 sm:p-10"
            >
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span
                  className={`font-display flex h-10 w-10 flex-shrink-0 items-center justify-center border-[2.5px] border-[#1A1A1A] text-base text-[#1A1A1A] ${section.color}`}
                >
                  {section.no}
                </span>
                <div>
                  <h2 className="font-display text-2xl text-[#1A1A1A]">
                    {section.title}
                  </h2>
                  <p className="font-display text-[11px] uppercase tracking-[0.25em] text-[#1A1A1A]/60">
                    {section.en}
                  </p>
                </div>
              </div>
              <div className="space-y-3 border-t-[2.5px] border-[#1A1A1A] pt-5">
                {section.body.map((p, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-[#1A1A1A]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="fade-up mt-12 flex justify-center">
          <Link
            href="/"
            className="font-display border-[2.5px] border-[#1A1A1A] bg-[#FCC419] px-8 py-4 text-xs uppercase tracking-[0.3em] text-[#1A1A1A] transition hover:bg-[#FCC419]/90"
          >
            占ってみる →
          </Link>
        </div>

        <footer className="mt-20 border-t-[2.5px] border-[#1A1A1A] pt-8">
          <div className="flex items-center justify-between">
            <div className="font-display text-[10px] uppercase tracking-[0.3em] text-[#1A1A1A]">
              EKIKYO
            </div>
            <div className="font-display text-[10px] uppercase tracking-[0.3em] text-[#1A1A1A]">
              About · 易経の手引き
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
