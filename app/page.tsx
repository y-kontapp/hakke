"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  HEXAGRAMS,
  type Hexagram,
  type LineType,
  findByLines,
  transformLines,
} from "./hexagrams";

type Throw = {
  dice: [number, number, number];
  sum: number;
  line: LineType;
};

const LINE_LABEL: Record<LineType, string> = {
  oldYang: "老陽",
  youngYang: "少陽",
  youngYin: "少陰",
  oldYin: "老陰",
};

const POSITION_LABELS = ["初", "二", "三", "四", "五", "上"];

function rollDie(): number {
  return Math.floor(Math.random() * 6) + 1;
}

function rollLine(): Throw {
  const dice: [number, number, number] = [rollDie(), rollDie(), rollDie()];
  const sum = dice.reduce((acc, d) => acc + (d <= 3 ? 3 : 2), 0);
  let line: LineType;
  if (sum === 6) line = "oldYin";
  else if (sum === 7) line = "youngYang";
  else if (sum === 8) line = "youngYin";
  else line = "oldYang";
  return { dice, sum, line };
}

const PIP_POSITIONS: Record<number, string[]> = {
  1: ["c"],
  2: ["tl", "br"],
  3: ["tl", "c", "br"],
  4: ["tl", "tr", "bl", "br"],
  5: ["tl", "tr", "c", "bl", "br"],
  6: ["tl", "tr", "ml", "mr", "bl", "br"],
};

const PIP_GRID_CELL: Record<string, string> = {
  tl: "col-start-1 row-start-1",
  tr: "col-start-3 row-start-1",
  ml: "col-start-1 row-start-2",
  c: "col-start-2 row-start-2",
  mr: "col-start-3 row-start-2",
  bl: "col-start-1 row-start-3",
  br: "col-start-3 row-start-3",
};

const DIE_BG_CYCLE = [
  "bg-[#FCC419]",
  "bg-[#E63946]",
  "bg-[#1D6FE5]",
];

function Pips({ count }: { count: number }) {
  const positions = PIP_POSITIONS[count] ?? [];
  return (
    <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-0 p-2">
      {positions.map((pos) => (
        <div
          key={pos}
          className={`${PIP_GRID_CELL[pos]} flex items-center justify-center`}
        >
          <div className="h-2 w-2 rounded-full bg-[#1A1A1A]" />
        </div>
      ))}
    </div>
  );
}

function Die({
  value,
  spinning,
  tick,
  delay,
  colorIndex,
}: {
  value: number;
  spinning?: boolean;
  tick: number;
  delay: number;
  colorIndex: number;
}) {
  const displayValue = spinning
    ? (((tick * 7 + delay * 11) % 6) + 1)
    : value;

  if (value === 0 && !spinning) {
    return (
      <div className="h-12 w-12 border-2 border-dashed border-[#1A1A1A]/30" />
    );
  }

  const bg = spinning ? DIE_BG_CYCLE[(tick + delay) % 3] : "bg-[#F4E4C1]";

  return (
    <div
      className={`relative h-12 w-12 border-[2.5px] border-[#1A1A1A] ${bg} ${
        spinning ? "shake" : ""
      }`}
    >
      <Pips count={displayValue} />
    </div>
  );
}

function LineGlyph({
  line,
  changed,
}: {
  line: LineType;
  changed?: boolean;
}) {
  const isYang = line === "youngYang" || line === "oldYang";
  const isOld = line === "oldYang" || line === "oldYin";
  const bar = changed ? "bg-[#E63946]" : "bg-[#1A1A1A]";
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-3 w-44 items-center">
        {isYang ? (
          <div className={`h-2 w-full ${bar}`} />
        ) : (
          <div className="flex w-full justify-between">
            <div className={`h-2 w-[44%] ${bar}`} />
            <div className={`h-2 w-[44%] ${bar}`} />
          </div>
        )}
      </div>
      {isOld && (
        <span
          className={`h-3 w-3 rounded-full border-2 border-[#1A1A1A] ${
            changed ? "bg-[#FCC419]" : "bg-[#F4E4C1]"
          }`}
        />
      )}
    </div>
  );
}

function HexagramView({
  lines,
  highlightChanges,
}: {
  lines: LineType[];
  highlightChanges?: boolean;
}) {
  const displayLines = [...lines].reverse();
  return (
    <div className="flex flex-col gap-2.5 py-2">
      {displayLines.map((l, i) => (
        <LineGlyph
          key={i}
          line={l}
          changed={highlightChanges && (l === "oldYang" || l === "oldYin")}
        />
      ))}
    </div>
  );
}

function HexagramCard({
  hex,
  label,
  lines,
  highlightChanges,
  accentColor,
}: {
  hex: Hexagram;
  label: string;
  lines: LineType[];
  highlightChanges?: boolean;
  accentColor: string;
}) {
  return (
    <div className="fade-up bg-[#FBF1DC] frame-thick relative overflow-hidden">
      <div
        className={`absolute -right-12 -top-12 h-40 w-40 rounded-full ${accentColor}`}
      />
      <div
        className={`absolute right-4 top-4 z-10 ${accentColor} frame px-3 py-1`}
      >
        <span className="font-display text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]">
          {label}
        </span>
      </div>

      <div className="relative p-8 sm:p-10">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-5xl text-[#1A1A1A]">
            № {String(hex.no).padStart(2, "0")}
          </span>
          <span className="font-display text-sm text-[#1A1A1A]/60">
            / 64
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          <div className="flex flex-col items-center gap-3">
            <div className="text-8xl leading-none text-[#1A1A1A]">
              {hex.symbol}
            </div>
            <div className="frame inline-block bg-[#F4E4C1] px-2 py-0.5 text-[10px] tracking-widest text-[#1A1A1A]">
              HEXAGRAM
            </div>
          </div>

          <div className="flex-1">
            <div className="font-display text-xs uppercase tracking-[0.3em] text-[#1A1A1A]/60">
              {hex.reading.toUpperCase()}
            </div>
            <h2 className="font-display mt-1 text-4xl tracking-wide text-[#1A1A1A]">
              {hex.name}
            </h2>
            <div className="mt-5 inline-block bg-[#F4E4C1] frame p-3">
              <HexagramView lines={lines} highlightChanges={highlightChanges} />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-7 border-t-[2.5px] border-[#1A1A1A] pt-6">
          <div>
            <div className="font-display mb-2 inline-block bg-[#1A1A1A] px-2 py-0.5 text-[10px] uppercase tracking-[0.25em] text-[#F4E4C1]">
              Judgement · 卦辞（かじ）
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]">
              {hex.judgement}
            </p>
          </div>
          <div>
            <div className="font-display mb-2 inline-block bg-[#1A1A1A] px-2 py-0.5 text-[10px] uppercase tracking-[0.25em] text-[#F4E4C1]">
              Interpretation · 解釈
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]">
              {hex.interpretation}
            </p>
          </div>
          <div>
            <div className="font-display mb-3 inline-block bg-[#1A1A1A] px-2 py-0.5 text-[10px] uppercase tracking-[0.25em] text-[#F4E4C1]">
              Guidance · 領域別の指針
            </div>
            <div className="mt-3 space-y-3">
              {[
                { label: "仕事", en: "Work", color: "bg-[#FCC419]", text: hex.guidance.work },
                { label: "思想", en: "Thought", color: "bg-[#E63946]", text: hex.guidance.thought },
                { label: "勉強", en: "Study", color: "bg-[#1D6FE5]", text: hex.guidance.study },
                { label: "恋愛", en: "Love", color: "bg-[#FCC419]", text: hex.guidance.love },
                { label: "健康", en: "Health", color: "bg-[#1D6FE5]", text: hex.guidance.health },
              ].map((g) => (
                <div
                  key={g.en}
                  className="border-[2.5px] border-[#1A1A1A] bg-[#F4E4C1] p-3"
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className={`h-2 w-2 ${g.color}`} />
                    <span className="font-display text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]">
                      {g.label} · {g.en}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#1A1A1A]">
                    {g.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [throws, setThrows] = useState<(Throw | null)[]>(Array(6).fill(null));
  const [spinningSlots, setSpinningSlots] = useState<Set<number>>(new Set());
  const [tick, setTick] = useState(0);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    if (spinningSlots.size === 0) return;
    const id = setInterval(() => setTick((t) => t + 1), 70);
    return () => clearInterval(id);
  }, [spinningSlots.size]);

  const animating = spinningSlots.size > 0;
  const completedThrows = throws.filter((t): t is Throw => t !== null);
  const allRolled = completedThrows.length === 6 && !animating;

  const lines = allRolled
    ? (completedThrows.map((t) => t.line) as LineType[])
    : [];
  const transformed = useMemo(
    () => (allRolled ? transformLines(lines) : null),
    [allRolled, lines],
  );

  const primary = allRolled ? findByLines(lines) : null;
  const secondary =
    transformed && transformed.length === 6 ? findByLines(transformed) : null;

  function rollOne() {
    const nextSlot = throws.findIndex((t) => t === null);
    if (nextSlot === -1 || animating) return;
    const result = rollLine();
    setSpinningSlots(new Set([nextSlot]));
    setTimeout(() => {
      setThrows((prev) => {
        const copy = [...prev];
        copy[nextSlot] = result;
        return copy;
      });
      setSpinningSlots(new Set());
    }, 850);
  }

  function rollAll() {
    if (animating) return;
    const results = Array.from({ length: 6 }, () => rollLine());
    setThrows(Array(6).fill(null));
    setSpinningSlots(new Set([0, 1, 2, 3, 4, 5]));

    results.forEach((r, i) => {
      setTimeout(
        () => {
          setThrows((prev) => {
            const copy = [...prev];
            copy[i] = r;
            return copy;
          });
          setSpinningSlots((prev) => {
            const next = new Set(prev);
            next.delete(i);
            return next;
          });
        },
        700 + i * 200,
      );
    });
  }

  function reset() {
    setThrows(Array(6).fill(null));
    setSpinningSlots(new Set());
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F4E4C1]">
      <div className="absolute inset-x-0 top-0 h-[55%] bg-[#F5B878]" />

      <div className="relative mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <header className="relative mb-12">
          <div className="flex items-start justify-between">
            <div className="font-display flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#1A1A1A]">
              <span className="h-3 w-3 rounded-full bg-[#E63946]" />
              <span>I Ching Oracle</span>
            </div>
            <Link
              href="/about"
              className="font-display border-[2.5px] border-[#1A1A1A] bg-[#F4E4C1] px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-[#1A1A1A] transition hover:bg-[#FCC419]"
            >
              About →
            </Link>
          </div>

          <div className="relative mt-12">
            <h1 className="font-display text-[20vw] leading-[0.85] text-[#1A1A1A] sm:text-[140px]">
              EKIKYO
            </h1>
            <p className="font-display absolute -bottom-2 right-0 bg-[#1A1A1A] px-3 py-1 text-xs tracking-widest text-[#F4E4C1] sm:right-2">
              YÌ JĪNG · 易经
            </p>
          </div>

          <div className="mt-10 flex items-center justify-center">
            <div className="relative h-44 w-44 sm:h-56 sm:w-56">
              <div className="absolute inset-0 rounded-full bg-[#FCC419]" />
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute left-1/2 top-0 h-full w-1/2 bg-[#1A1A1A]" />
              </div>
              <div className="absolute left-[15%] top-[35%] h-20 w-20 bg-[#E63946] sm:h-28 sm:w-28" />
              <div className="absolute right-0 bottom-[10%] h-16 w-24 bg-[#1D6FE5] sm:h-20 sm:w-32" />
            </div>
          </div>

        </header>

        <section className="fade-up frame-thick mb-10 bg-[#FBF1DC] p-8 sm:p-10">
          <ol className="space-y-5">
            {[
              {
                title: "胸の奥にある問いを、ひとつ思い浮かべる",
                desc: "まず三度、深く息を整えてください。決めかねていること、揺れていること。たったひとつだけ、言葉のかたちにしてみてください。",
                color: "bg-[#FCC419]",
              },
              {
                title: "その問いを胸に、サイコロを六度委ねる",
                desc: "一爻（こう）ずつ間を置いても、六爻まとめて投じても構いません。",
                color: "bg-[#E63946]",
              },
              {
                title: "立ち現れた卦（か）から、問いへの示唆を汲み取る",
                desc: "変爻（へんこう）があれば之卦（しか）が浮かび、いまから先へと続く流れが指し示されます。",
                color: "bg-[#1D6FE5]",
              },
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className={`font-display flex h-10 w-10 flex-shrink-0 items-center justify-center border-[2.5px] border-[#1A1A1A] text-base text-[#1A1A1A] ${step.color}`}
                >
                  {i + 1}
                </span>
                <div className="flex-1 pt-1.5">
                  <p className="text-base font-medium text-[#1A1A1A]">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#1A1A1A]/70">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="fade-up frame-thick mb-10 bg-[#1A1A1A] p-8 sm:p-10">
          <div className="mb-4 inline-block bg-[#FCC419] px-2 py-0.5">
            <span className="font-display text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]">
              Reading · 読み解きのコツ
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[#F4E4C1]">
            卦は答えを差し出すのではなく、いまの状況の構造を、静かに映す鏡。問いと一見そぐわぬ象——家庭、旅、争い——が立ち現れても、その本義をたぐり寄せ、自分の問いに重ね合わせて読み解いていきます。
          </p>
        </section>

        <section className="fade-up frame-thick mb-10 bg-[#FBF1DC] p-8 sm:p-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-display border-[2.5px] border-[#1A1A1A] bg-[#FCC419] px-2 py-0.5 text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]">
              Question · 今考えていること
            </span>
          </div>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="例：いまの道を進むべきか。あの人との距離を、どう測るべきか。"
            rows={3}
            className="w-full resize-none border-[2.5px] border-[#1A1A1A] bg-[#F4E4C1] px-4 py-3 text-sm leading-relaxed text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:outline-none focus:ring-0"
          />
          <p className="mt-2 text-xs text-[#1A1A1A]/60">
            綴らずとも占えますが、言葉にすることで、問いは輪郭を取り戻します。
          </p>
        </section>

        <section className="fade-up frame-thick mb-12 bg-[#FBF1DC] p-8 sm:p-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-4 w-4 rounded-full bg-[#1D6FE5]" />
              <span className="font-display text-xs uppercase tracking-[0.3em] text-[#1A1A1A]">
                Cast · 卜筮
              </span>
              <span className="font-display border-2 border-[#1A1A1A] bg-[#F4E4C1] px-2 py-0.5 text-xs tabular-nums text-[#1A1A1A]">
                {completedThrows.length}/6
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={rollOne}
                disabled={completedThrows.length >= 6 || animating}
                className="font-display border-[2.5px] border-[#1A1A1A] bg-[#FCC419] px-5 py-2 text-xs uppercase tracking-wider text-[#1A1A1A] transition hover:bg-[#FCC419]/90 disabled:cursor-not-allowed disabled:border-[#1A1A1A]/30 disabled:bg-[#F4E4C1] disabled:text-[#1A1A1A]/30"
              >
                一爻振る
              </button>
              <button
                onClick={rollAll}
                disabled={animating}
                className="font-display border-[2.5px] border-[#1A1A1A] bg-[#E63946] px-5 py-2 text-xs uppercase tracking-wider text-[#F4E4C1] transition hover:bg-[#E63946]/90 disabled:cursor-not-allowed disabled:border-[#1A1A1A]/30 disabled:bg-[#F4E4C1] disabled:text-[#1A1A1A]/30"
              >
                六爻一括
              </button>
              <button
                onClick={reset}
                disabled={
                  (completedThrows.length === 0 && spinningSlots.size === 0) ||
                  animating
                }
                className="font-display border-[2.5px] border-[#1A1A1A] bg-[#F4E4C1] px-4 py-2 text-xs uppercase tracking-wider text-[#1A1A1A] transition hover:bg-[#F4E4C1]/80 disabled:cursor-not-allowed disabled:border-[#1A1A1A]/30 disabled:text-[#1A1A1A]/30"
              >
                やり直す
              </button>
            </div>
          </div>

          <ol className="space-y-2.5">
            {POSITION_LABELS.map((label, i) => {
              const t = throws[i];
              const spinning = spinningSlots.has(i);
              return (
                <li
                  key={i}
                  className={`flex items-center gap-4 border-[2.5px] px-4 py-3 transition-colors ${
                    spinning
                      ? "border-[#1A1A1A] bg-[#FCC419]/30"
                      : t
                        ? "border-[#1A1A1A] bg-[#F4E4C1]"
                        : "border-dashed border-[#1A1A1A]/30 bg-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-display flex h-8 w-8 items-center justify-center border-2 text-xs ${
                        t || spinning
                          ? "border-[#1A1A1A] bg-[#1A1A1A] text-[#F4E4C1]"
                          : "border-[#1A1A1A]/30 bg-transparent text-[#1A1A1A]/40"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`text-sm ${
                        t || spinning
                          ? "text-[#1A1A1A]"
                          : "text-[#1A1A1A]/40"
                      }`}
                    >
                      {label}爻
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Die
                      value={t?.dice[0] ?? 0}
                      spinning={spinning}
                      tick={tick}
                      delay={0}
                      colorIndex={i * 3}
                    />
                    <Die
                      value={t?.dice[1] ?? 0}
                      spinning={spinning}
                      tick={tick}
                      delay={3}
                      colorIndex={i * 3 + 1}
                    />
                    <Die
                      value={t?.dice[2] ?? 0}
                      spinning={spinning}
                      tick={tick}
                      delay={6}
                      colorIndex={i * 3 + 2}
                    />
                  </div>
                  <div className="ml-auto text-right">
                    {spinning ? (
                      <span className="font-display animate-pulse bg-[#E63946] px-2 py-0.5 text-[10px] tracking-widest text-[#F4E4C1]">
                        ROLLING
                      </span>
                    ) : t ? (
                      <>
                        <div className="font-display text-[10px] tabular-nums tracking-widest text-[#1A1A1A]/60">
                          SUM {t.sum}
                        </div>
                        <div className="text-sm font-medium text-[#1A1A1A]">
                          {LINE_LABEL[t.line]}
                          {(t.line === "oldYang" || t.line === "oldYin") && (
                            <span className="ml-1 text-[#E63946]">●</span>
                          )}
                        </div>
                      </>
                    ) : (
                      <span className="font-display text-[10px] tracking-widest text-[#1A1A1A]/30">
                        IDLE
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {primary && (
          <section className="space-y-6">
            <div className="fade-up frame-thick bg-[#FBF1DC] p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex items-start gap-4">
                  <span className="h-3 w-3 flex-shrink-0 translate-y-1.5 bg-[#FCC419]" />
                  <div>
                    <div className="font-display text-[10px] uppercase tracking-[0.3em] text-[#1A1A1A]/60">
                      Primary · 本卦
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#1A1A1A]">
                      いま、自分が置かれている状況——その構造そのもの。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="h-3 w-3 flex-shrink-0 translate-y-1.5 bg-[#E63946]" />
                  <div>
                    <div className="font-display text-[10px] uppercase tracking-[0.3em] text-[#1A1A1A]/60">
                      To Come · 之卦
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#1A1A1A]">
                      そこから自ずと流れ着く先——変化のあとに立ち現れる姿。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {question.trim() && (
              <div className="fade-up frame-thick bg-[#1A1A1A] p-6 sm:p-8">
                <div className="font-display mb-3 inline-block bg-[#FCC419] px-2 py-0.5 text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]">
                  Your Question · 問い
                </div>
                <p className="text-base leading-relaxed text-[#F4E4C1] sm:text-lg">
                  {question}
                </p>
              </div>
            )}
            <HexagramCard
              hex={primary}
              label="本卦（ほんけ） · Primary"
              lines={lines}
              highlightChanges
              accentColor="bg-[#FCC419]"
            />
            {secondary && (
              <>
                <div className="fade-up flex items-center justify-center gap-4 py-2">
                  <span className="h-[2.5px] w-12 bg-[#1A1A1A]" />
                  <span className="font-display border-[2.5px] border-[#1A1A1A] bg-[#E63946] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[#F4E4C1]">
                    今後 · 之卦（しか）
                  </span>
                  <span className="h-[2.5px] w-12 bg-[#1A1A1A]" />
                </div>
                <HexagramCard
                  hex={secondary}
                  label="之卦 · 今後"
                  lines={transformed!}
                  accentColor="bg-[#1D6FE5]"
                />
              </>
            )}
            {!secondary && (
              <p className="fade-up frame-thick bg-[#FBF1DC] p-5 text-center text-sm tracking-wide text-[#1A1A1A]">
                変爻なし——いまの状況は、まだ動かず。本卦の示唆を、そのまま胸に置いてください。
              </p>
            )}
          </section>
        )}

        <footer className="mt-20 border-t-[2.5px] border-[#1A1A1A] pt-8">
          <div className="flex justify-end">
            <div className="font-display text-[10px] uppercase tracking-[0.3em] text-[#1A1A1A]">
              '26 · {HEXAGRAMS.length} Hexagrams
            </div>
          </div>
          <p className="mt-5 text-center text-xs leading-relaxed text-[#1A1A1A]/70">
            三枚銭法（さんまいせんぽう）に倣い、三つのサイコロで各爻を立てる手法をとります。
            <br />
            1〜3 を陽（3点）、4〜6 を陰（2点）と置き、合計で爻の性質を見定めます。
            <br />
            6＝老陰（ろういん）、7＝少陽（しょうよう）、8＝少陰（しょういん）、9＝老陽（ろうよう）。
            <br />
            極まった老陽・老陰が変爻となり、之卦を呼び寄せます。
          </p>
        </footer>
      </div>
    </main>
  );
}
