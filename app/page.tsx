"use client";

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

function Pips({ count, dark }: { count: number; dark?: boolean }) {
  const positions = PIP_POSITIONS[count] ?? [];
  return (
    <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-0 p-2">
      {positions.map((pos) => (
        <div
          key={pos}
          className={`${PIP_GRID_CELL[pos]} flex items-center justify-center`}
        >
          <div
            className={`h-1.5 w-1.5 rounded-full ${
              dark ? "bg-zinc-100" : "bg-zinc-900"
            }`}
          />
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
}: {
  value: number;
  spinning?: boolean;
  tick: number;
  delay: number;
}) {
  const displayValue = spinning
    ? (((tick * 7 + delay * 11) % 6) + 1)
    : value;

  if (value === 0 && !spinning) {
    return (
      <div className="h-12 w-12 rounded-xl border border-dashed border-white/10" />
    );
  }

  return (
    <div
      className={`relative h-12 w-12 rounded-xl transition-all duration-150 ${
        spinning
          ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_0_24px_-4px_rgba(167,139,250,0.7)]"
          : "bg-gradient-to-br from-zinc-50 to-zinc-200 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.5)]"
      }`}
      style={
        spinning
          ? {
              transform: `rotate(${(tick * 17 + delay * 30) % 360}deg) scale(${
                0.95 + 0.05 * Math.sin(tick / 2)
              })`,
            }
          : undefined
      }
    >
      <Pips count={displayValue} dark={spinning} />
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
  const bar = changed
    ? "bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300"
    : "bg-zinc-100";
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-3 w-44 items-center">
        {isYang ? (
          <div className={`h-1 w-full rounded-full ${bar}`} />
        ) : (
          <div className="flex w-full justify-between">
            <div className={`h-1 w-[44%] rounded-full ${bar}`} />
            <div className={`h-1 w-[44%] rounded-full ${bar}`} />
          </div>
        )}
      </div>
      {isOld && (
        <span
          className={`h-2 w-2 rounded-full ${
            changed
              ? "bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.8)]"
              : "bg-white/20"
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
    <div className="flex flex-col gap-3 py-2">
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
}: {
  hex: Hexagram;
  label: string;
  lines: LineType[];
  highlightChanges?: boolean;
}) {
  return (
    <div className="surface gradient-border fade-up overflow-hidden rounded-3xl p-8 sm:p-10">
      <div className="mb-8 flex items-center justify-between">
        <span className="font-display text-[10px] font-medium uppercase tracking-[0.4em] text-violet-300">
          {label}
        </span>
        <span className="font-display text-[10px] tracking-[0.3em] text-zinc-500">
          № {String(hex.no).padStart(2, "0")} / 64
        </span>
      </div>

      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        <div className="flex-shrink-0">
          <div className="text-7xl leading-none text-zinc-50 sm:text-8xl">
            {hex.symbol}
          </div>
        </div>
        <div className="flex-1">
          <div className="font-display text-xs tracking-[0.3em] text-zinc-500">
            {hex.reading.toUpperCase()}
          </div>
          <h2 className="mt-1 text-3xl font-medium tracking-wider text-zinc-50">
            {hex.name}
          </h2>
          <div className="mt-5">
            <HexagramView lines={lines} highlightChanges={highlightChanges} />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 border-t border-white/5 pt-8 sm:grid-cols-2">
        <div>
          <div className="font-display mb-3 text-[10px] uppercase tracking-[0.3em] text-zinc-500">
            Judgement · 卦辞
          </div>
          <p className="text-sm leading-relaxed text-zinc-300">
            {hex.judgement}
          </p>
        </div>
        <div>
          <div className="font-display mb-3 text-[10px] uppercase tracking-[0.3em] text-zinc-500">
            Interpretation · 解釈
          </div>
          <p className="text-sm leading-relaxed text-zinc-300">
            {hex.interpretation}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [throws, setThrows] = useState<(Throw | null)[]>(Array(6).fill(null));
  const [spinningSlots, setSpinningSlots] = useState<Set<number>>(new Set());
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (spinningSlots.size === 0) return;
    const id = setInterval(() => setTick((t) => t + 1), 60);
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
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <header className="mb-20 text-center">
          <div className="font-display mb-6 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.4em] text-zinc-400">
            <span className="h-px w-8 bg-zinc-700" />
            I Ching Oracle · 2026
            <span className="h-px w-8 bg-zinc-700" />
          </div>
          <h1 className="gradient-text text-6xl font-bold tracking-tight sm:text-7xl">
            六十四卦
          </h1>
          <p className="mt-6 text-base font-light text-zinc-400">
            サイコロを六回振り、本卦と之卦を立てる
          </p>
        </header>

        <section className="surface fade-up mb-10 rounded-3xl p-8 sm:p-10">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-6 bg-gradient-to-r from-violet-400 to-fuchsia-400" />
            <span className="font-display text-[10px] font-medium uppercase tracking-[0.4em] text-violet-300">
              How it works · 占いの手順
            </span>
          </div>
          <ol className="space-y-6">
            {[
              {
                title: "今、心に抱えている問いを思い浮かべる",
                desc: "悩んでいること、決めかねていること、ひとつだけ選んで言葉にしてみてください。",
              },
              {
                title: "その問いを胸に、サイコロを六回振る",
                desc: "一爻ずつじっくり振っても、六爻一括で振っても構いません。",
              },
              {
                title: "立ち現れた卦から、問いへの示唆を読み取る",
                desc: "変爻があれば之卦が現れ、現在から未来への流れを示します。",
              },
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-5">
                <span className="font-display flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 text-sm font-semibold text-violet-200 ring-1 ring-violet-400/30">
                  {i + 1}
                </span>
                <div className="flex-1 pt-0.5">
                  <p className="text-[15px] font-medium text-zinc-100">
                    {step.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="surface fade-up mb-12 rounded-3xl p-8 sm:p-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-gradient-to-r from-violet-400 to-fuchsia-400" />
              <span className="font-display text-[10px] font-medium uppercase tracking-[0.4em] text-violet-300">
                Cast · 卜筮
              </span>
              <span className="font-display text-xs tabular-nums text-zinc-500">
                {completedThrows.length}/6
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={rollOne}
                disabled={completedThrows.length >= 6 || animating}
                className="btn-primary rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider"
              >
                一爻振る
              </button>
              <button
                onClick={rollAll}
                disabled={animating}
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-medium tracking-wider text-zinc-100 transition hover:border-white/30 hover:bg-white/10 disabled:cursor-not-allowed disabled:border-white/5 disabled:text-zinc-600"
              >
                六爻一括
              </button>
              <button
                onClick={reset}
                disabled={
                  (completedThrows.length === 0 && spinningSlots.size === 0) ||
                  animating
                }
                className="rounded-full px-4 py-2.5 text-xs tracking-wider text-zinc-500 transition hover:text-zinc-200 disabled:cursor-not-allowed disabled:text-zinc-700"
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
                  className={`flex items-center gap-4 rounded-2xl border px-5 py-4 transition-all duration-300 ${
                    spinning
                      ? "border-violet-400/40 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/5"
                      : t
                        ? "border-white/8 bg-white/[0.02]"
                        : "border-dashed border-white/5 bg-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-display text-xs font-medium tabular-nums ${
                        t ? "text-zinc-300" : "text-zinc-700"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`text-xs ${
                        t ? "text-zinc-500" : "text-zinc-700"
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
                    />
                    <Die
                      value={t?.dice[1] ?? 0}
                      spinning={spinning}
                      tick={tick}
                      delay={3}
                    />
                    <Die
                      value={t?.dice[2] ?? 0}
                      spinning={spinning}
                      tick={tick}
                      delay={6}
                    />
                  </div>
                  <div className="ml-auto text-right">
                    {spinning ? (
                      <span className="font-display animate-pulse text-[10px] font-medium tracking-[0.3em] text-violet-300">
                        ROLLING
                      </span>
                    ) : t ? (
                      <>
                        <div className="font-display text-[10px] tabular-nums tracking-widest text-zinc-500">
                          {t.sum}
                        </div>
                        <div className="text-sm text-zinc-100">
                          {LINE_LABEL[t.line]}
                          {(t.line === "oldYang" || t.line === "oldYin") && (
                            <span className="ml-1.5 text-fuchsia-400">●</span>
                          )}
                        </div>
                      </>
                    ) : (
                      <span className="font-display text-[10px] tracking-widest text-zinc-700">
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
            <HexagramCard
              hex={primary}
              label="Primary · 本卦"
              lines={lines}
              highlightChanges
            />
            {secondary && (
              <>
                <div className="fade-up flex items-center justify-center gap-4 py-2">
                  <span className="h-px w-12 bg-white/10" />
                  <span className="font-display text-[10px] font-medium uppercase tracking-[0.4em] text-fuchsia-300">
                    Transforms into
                  </span>
                  <span className="h-px w-12 bg-white/10" />
                </div>
                <HexagramCard
                  hex={secondary}
                  label="Transformed · 之卦"
                  lines={transformed!}
                />
              </>
            )}
            {!secondary && (
              <p className="fade-up surface rounded-2xl p-5 text-center text-xs tracking-wider text-zinc-500">
                変爻なし — 本卦の示唆をそのまま受け取ってください
              </p>
            )}
          </section>
        )}

        <footer className="mt-24 border-t border-white/5 pt-10 text-center">
          <p className="text-xs leading-relaxed text-zinc-500">
            三枚銭法に倣い、三個のサイコロで各爻を決定します。
          </p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-500">
            1〜3 を陽（3点）、4〜6 を陰（2点）として合計 6〜9 で爻の性質を判じます。
          </p>
          <p className="font-display mt-4 text-[10px] tracking-[0.3em] text-zinc-700">
            All {HEXAGRAMS.length} hexagrams · I Ching · 2026
          </p>
        </footer>
      </div>
    </main>
  );
}
