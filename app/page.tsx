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

const POSITION_LABELS = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"];

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

function LineGlyph({
  line,
  changed,
}: {
  line: LineType;
  changed?: boolean;
}) {
  const isYang = line === "youngYang" || line === "oldYang";
  const isOld = line === "oldYang" || line === "oldYin";
  const color = changed ? "bg-amber-400" : "bg-zinc-100";
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-3 w-40 items-center">
        {isYang ? (
          <div className={`h-[3px] w-full rounded-full ${color}`} />
        ) : (
          <div className="flex w-full justify-between">
            <div className={`h-[3px] w-[44%] rounded-full ${color}`} />
            <div className={`h-[3px] w-[44%] rounded-full ${color}`} />
          </div>
        )}
      </div>
      {isOld && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            changed ? "bg-amber-400" : "bg-amber-400/40"
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
}: {
  hex: Hexagram;
  label: string;
  lines: LineType[];
  highlightChanges?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-[0_0_60px_-20px_rgba(251,191,36,0.15)] backdrop-blur">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-amber-400/80">
          {label}
        </span>
        <span className="text-[10px] tracking-[0.3em] text-zinc-500">
          NO. {String(hex.no).padStart(2, "0")}
        </span>
      </div>

      <div className="flex items-start gap-8">
        <div className="flex-shrink-0">
          <div className="text-6xl leading-none text-zinc-100">{hex.symbol}</div>
        </div>
        <div className="flex-1 pt-1">
          <div className="text-2xl font-light tracking-wider text-zinc-50">
            {hex.name}
          </div>
          <div className="mt-1 text-xs tracking-widest text-zinc-500">
            {hex.reading.toUpperCase()}
          </div>
          <div className="mt-3 flex justify-end">
            <HexagramView lines={lines} highlightChanges={highlightChanges} />
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-5 border-t border-zinc-800 pt-6">
        <div>
          <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-zinc-500">
            Judgement / 卦辞
          </div>
          <p className="text-sm leading-relaxed text-zinc-300">
            {hex.judgement}
          </p>
        </div>
        <div>
          <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-zinc-500">
            Interpretation / 解釈
          </div>
          <p className="text-sm leading-relaxed text-zinc-300">
            {hex.interpretation}
          </p>
        </div>
      </div>
    </div>
  );
}

function Die({
  value,
  spinning,
  tick,
}: {
  value: number;
  spinning?: boolean;
  tick: number;
}) {
  const display = spinning
    ? ((tick * 7 + value * 13 + 1) % 6) + 1
    : value === 0
      ? null
      : value;

  return (
    <div
      className={`relative flex h-11 w-11 items-center justify-center rounded-lg text-base font-medium tabular-nums transition-all duration-150 ${
        spinning
          ? "border border-amber-400/60 bg-zinc-800 text-amber-300 shadow-[0_0_20px_-4px_rgba(251,191,36,0.5)]"
          : value === 0
            ? "border border-dashed border-zinc-700 bg-transparent text-zinc-700"
            : "border border-zinc-200 bg-zinc-50 text-zinc-900 shadow-md"
      }`}
      style={
        spinning
          ? { transform: `rotate(${(tick * 23) % 360}deg)` }
          : undefined
      }
    >
      {display ?? "·"}
    </div>
  );
}

export default function Page() {
  const [throws, setThrows] = useState<(Throw | null)[]>(
    Array(6).fill(null),
  );
  const [spinningSlots, setSpinningSlots] = useState<Set<number>>(new Set());
  const [tick, setTick] = useState(0);

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
        700 + i * 220,
      );
    });
  }

  function reset() {
    setThrows(Array(6).fill(null));
    setSpinningSlots(new Set());
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="absolute inset-x-0 top-0 h-[400px] bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.08),_transparent_60%)]" />

      <div className="relative mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <header className="mb-16 text-center">
          <div className="mb-5 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-amber-400/80">
            <span className="h-px w-8 bg-amber-400/40" />
            I Ching Oracle
            <span className="h-px w-8 bg-amber-400/40" />
          </div>
          <h1 className="text-4xl font-extralight tracking-[0.2em] text-zinc-50 sm:text-5xl">
            六 十 四 卦
          </h1>
          <p className="mt-4 text-sm tracking-wider text-zinc-500">
            サイコロを六回振り、本卦と之卦を立てる
          </p>
        </header>

        <section className="mb-12 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 backdrop-blur">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-6 bg-amber-400/60" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-amber-400/80">
              Ritual / 占いの手順
            </span>
          </div>
          <ol className="space-y-5">
            <li className="flex gap-5">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-amber-400/50 text-xs font-medium text-amber-400">
                1
              </span>
              <div>
                <p className="text-sm font-medium text-zinc-100">
                  今、心に抱えている問いを思い浮かべる
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  悩んでいること、決めかねていること、ひとつだけ選んで言葉にしてみてください。
                </p>
              </div>
            </li>
            <li className="flex gap-5">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-amber-400/50 text-xs font-medium text-amber-400">
                2
              </span>
              <div>
                <p className="text-sm font-medium text-zinc-100">
                  その問いを胸に置いたまま、サイコロを六回振る
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  一爻ずつじっくり振っても、六爻まとめて振っても構いません。
                </p>
              </div>
            </li>
            <li className="flex gap-5">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-amber-400/50 text-xs font-medium text-amber-400">
                3
              </span>
              <div>
                <p className="text-sm font-medium text-zinc-100">
                  立ち現れた卦から、問いへの示唆を読み取る
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  変爻があれば之卦が現れ、現在から未来への流れを示します。
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="mb-12 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 backdrop-blur">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-amber-400/60" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-amber-400/80">
                Cast / 卜筮
              </span>
              <span className="text-xs text-zinc-500">
                {completedThrows.length} / 6
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={rollOne}
                disabled={completedThrows.length >= 6 || animating}
                className="rounded-md bg-amber-400 px-4 py-2 text-xs font-medium tracking-wider text-zinc-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-600"
              >
                一爻振る
              </button>
              <button
                onClick={rollAll}
                disabled={animating}
                className="rounded-md border border-zinc-700 px-4 py-2 text-xs font-medium tracking-wider text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800/50 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:text-zinc-600"
              >
                六爻一括
              </button>
              <button
                onClick={reset}
                disabled={
                  (completedThrows.length === 0 && spinningSlots.size === 0) ||
                  animating
                }
                className="rounded-md px-3 py-2 text-xs tracking-wider text-zinc-500 transition hover:text-zinc-200 disabled:cursor-not-allowed disabled:text-zinc-700"
              >
                やり直す
              </button>
            </div>
          </div>

          <ol className="space-y-2">
            {POSITION_LABELS.map((label, i) => {
              const t = throws[i];
              const spinning = spinningSlots.has(i);
              return (
                <li
                  key={i}
                  className={`flex items-center gap-4 rounded-lg border px-4 py-3 transition-colors ${
                    spinning
                      ? "border-amber-400/30 bg-amber-400/[0.04]"
                      : t
                        ? "border-zinc-800 bg-zinc-900/50"
                        : "border-dashed border-zinc-800/60 bg-transparent"
                  }`}
                >
                  <span className="w-10 text-[10px] uppercase tracking-widest text-zinc-500">
                    {label}
                  </span>
                  <div className="flex gap-2">
                    <Die
                      value={t?.dice[0] ?? 0}
                      spinning={spinning}
                      tick={tick}
                    />
                    <Die
                      value={t?.dice[1] ?? 0}
                      spinning={spinning}
                      tick={tick + 2}
                    />
                    <Die
                      value={t?.dice[2] ?? 0}
                      spinning={spinning}
                      tick={tick + 5}
                    />
                  </div>
                  <div className="ml-auto text-right">
                    {spinning ? (
                      <span className="text-[10px] tracking-widest text-amber-400/80">
                        ROLLING…
                      </span>
                    ) : t ? (
                      <>
                        <div className="text-[10px] tracking-widest text-zinc-500">
                          SUM {t.sum}
                        </div>
                        <div className="text-sm text-zinc-200">
                          {LINE_LABEL[t.line]}
                          {(t.line === "oldYang" || t.line === "oldYin") && (
                            <span className="ml-1 text-amber-400">●</span>
                          )}
                        </div>
                      </>
                    ) : (
                      <span className="text-[10px] tracking-widest text-zinc-600">
                        待機中
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
              label="本卦 / Primary"
              lines={lines}
              highlightChanges
            />
            {secondary && (
              <>
                <div className="flex items-center justify-center gap-4 py-2">
                  <span className="h-px w-12 bg-zinc-800" />
                  <span className="text-[10px] uppercase tracking-[0.4em] text-amber-400/70">
                    Transforms into
                  </span>
                  <span className="h-px w-12 bg-zinc-800" />
                </div>
                <HexagramCard
                  hex={secondary}
                  label="之卦 / Transformed"
                  lines={transformed!}
                />
              </>
            )}
            {!secondary && (
              <p className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 text-center text-xs tracking-wider text-zinc-500">
                変爻なし — 本卦の示唆をそのまま受け取ってください
              </p>
            )}
          </section>
        )}

        <footer className="mt-20 border-t border-zinc-800 pt-8 text-center text-[10px] leading-relaxed tracking-wider text-zinc-600">
          <p>三枚銭法に倣い、三個のサイコロで各爻を決定します。</p>
          <p className="mt-1">
            1〜3 を陽（3点）、4〜6 を陰（2点）として合計6〜9 で爻の性質を判じます。
          </p>
          <p className="mt-2 text-zinc-700">
            All {HEXAGRAMS.length} hexagrams · I Ching · 2026
          </p>
        </footer>
      </div>
    </main>
  );
}
