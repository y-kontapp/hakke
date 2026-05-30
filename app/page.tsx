"use client";

import { useMemo, useState } from "react";
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
  oldYang: "老陽（変爻）",
  youngYang: "少陽",
  youngYin: "少陰",
  oldYin: "老陰（変爻）",
};

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
  return (
    <div className="flex h-5 items-center justify-center">
      {isYang ? (
        <div
          className={`h-1.5 w-32 rounded-sm ${
            changed ? "bg-amber-500" : "bg-stone-800"
          }`}
        />
      ) : (
        <div className="flex w-32 justify-between">
          <div
            className={`h-1.5 w-[44%] rounded-sm ${
              changed ? "bg-amber-500" : "bg-stone-800"
            }`}
          />
          <div
            className={`h-1.5 w-[44%] rounded-sm ${
              changed ? "bg-amber-500" : "bg-stone-800"
            }`}
          />
        </div>
      )}
      {isOld && !changed && (
        <span className="ml-3 text-xs text-amber-600">●</span>
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
    <div className="flex flex-col gap-2 py-2">
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
    <div className="rounded-lg border border-stone-300 bg-white/70 p-6 shadow-sm">
      <div className="mb-3 text-xs tracking-widest text-stone-500">{label}</div>
      <div className="mb-4 flex items-baseline gap-3">
        <span className="text-5xl leading-none text-stone-800">
          {hex.symbol}
        </span>
        <div>
          <div className="text-xl font-medium text-stone-900">
            第{hex.no}卦　{hex.name}
          </div>
          <div className="text-sm text-stone-500">{hex.reading}</div>
        </div>
      </div>
      <div className="flex justify-center">
        <HexagramView lines={lines} highlightChanges={highlightChanges} />
      </div>
      <div className="mt-5 space-y-3 text-sm leading-relaxed text-stone-700">
        <div>
          <div className="mb-1 text-xs text-stone-500">卦辞</div>
          <p>{hex.judgement}</p>
        </div>
        <div>
          <div className="mb-1 text-xs text-stone-500">解釈</div>
          <p>{hex.interpretation}</p>
        </div>
      </div>
    </div>
  );
}

function Die({ value }: { value: number }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-stone-300 bg-white text-sm font-medium text-stone-700 shadow-sm">
      {value === 0 ? "" : value}
    </div>
  );
}

export default function Page() {
  const [throws, setThrows] = useState<Throw[]>([]);
  const [animating, setAnimating] = useState(false);

  const lines = useMemo(() => throws.map((t) => t.line), [throws]);
  const transformed = useMemo(
    () => (lines.length === 6 ? transformLines(lines) : null),
    [lines],
  );

  const primary = lines.length === 6 ? findByLines(lines) : null;
  const secondary =
    transformed && transformed.length === 6 ? findByLines(transformed) : null;

  function rollOne() {
    if (throws.length >= 6 || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setThrows((prev) => [...prev, rollLine()]);
      setAnimating(false);
    }, 350);
  }

  function rollAll() {
    if (animating) return;
    setAnimating(true);
    const result: Throw[] = [];
    for (let i = 0; i < 6; i++) result.push(rollLine());
    setTimeout(() => {
      setThrows(result);
      setAnimating(false);
    }, 500);
  }

  function reset() {
    setThrows([]);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 px-4 py-10 text-stone-900">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 text-center">
          <h1 className="mb-2 text-3xl font-medium tracking-wide">
            八卦サイコロ占い
          </h1>
          <p className="text-sm text-stone-500">
            サイコロを六回振り、六十四卦と之卦を立てます
          </p>
        </header>

        <section className="mb-8 rounded-xl border border-stone-300 bg-white/70 p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-stone-600">
              {throws.length} / 6 爻
            </div>
            <div className="flex gap-2">
              <button
                onClick={rollOne}
                disabled={throws.length >= 6 || animating}
                className="rounded-md bg-stone-800 px-4 py-2 text-sm text-stone-50 transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300"
              >
                一爻振る
              </button>
              <button
                onClick={rollAll}
                disabled={animating}
                className="rounded-md border border-stone-700 px-4 py-2 text-sm text-stone-800 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:border-stone-300 disabled:text-stone-400"
              >
                六爻一括
              </button>
              <button
                onClick={reset}
                disabled={throws.length === 0 || animating}
                className="rounded-md px-4 py-2 text-sm text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:text-stone-300"
              >
                やり直す
              </button>
            </div>
          </div>

          <ol className="space-y-2">
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const t = throws[i];
              const positionLabel = [
                "初爻",
                "二爻",
                "三爻",
                "四爻",
                "五爻",
                "上爻",
              ][i];
              return (
                <li
                  key={i}
                  className={`flex items-center gap-4 rounded-md border px-4 py-3 ${
                    t
                      ? "border-stone-200 bg-stone-50"
                      : "border-dashed border-stone-200 bg-transparent"
                  }`}
                >
                  <span className="w-12 text-xs text-stone-500">
                    {positionLabel}
                  </span>
                  <div className="flex gap-2">
                    {t ? (
                      <>
                        <Die value={t.dice[0]} />
                        <Die value={t.dice[1]} />
                        <Die value={t.dice[2]} />
                      </>
                    ) : (
                      <>
                        <Die value={0} />
                        <Die value={0} />
                        <Die value={0} />
                      </>
                    )}
                  </div>
                  <div className="ml-auto text-right">
                    {t ? (
                      <>
                        <div className="text-xs text-stone-500">
                          合計 {t.sum}
                        </div>
                        <div className="text-sm">{LINE_LABEL[t.line]}</div>
                      </>
                    ) : (
                      <span className="text-xs text-stone-300">未定</span>
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
              label="本卦"
              lines={lines}
              highlightChanges
            />
            {secondary && (
              <>
                <div className="text-center text-xs tracking-widest text-stone-400">
                  ⇣ 変爻により転ずる ⇣
                </div>
                <HexagramCard
                  hex={secondary}
                  label="之卦"
                  lines={transformed!}
                />
              </>
            )}
            {!secondary && (
              <p className="text-center text-sm text-stone-500">
                今回は変爻なし。本卦の卦辞をそのまま受け取ってください。
              </p>
            )}
          </section>
        )}

        <footer className="mt-16 text-center text-xs leading-relaxed text-stone-400">
          三枚銭法に倣い、三個のサイコロで各爻を決定します。
          <br />
          1〜3を表（陽3）、4〜6を裏（陰2）として合計6〜9で爻の性質を分けます。
          <br />
          全{HEXAGRAMS.length}卦を収録。
        </footer>
      </div>
    </main>
  );
}
