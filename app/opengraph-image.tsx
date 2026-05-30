import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "EKIKYO · 六十四卦";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F4E4C1",
          padding: 80,
          color: "#1A1A1A",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 18,
                height: 18,
                background: "#E63946",
                borderRadius: 999,
              }}
            />
            <span>I Ching Oracle · 2026</span>
          </div>
          <div>'26 / 64 Hexagrams</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 280,
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: -8,
            }}
          >
            EKIKYO
          </div>
          <div
            style={{
              fontSize: 56,
              letterSpacing: 20,
              marginTop: 24,
              fontWeight: 500,
            }}
          >
            六 十 四 卦
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              background: "#1A1A1A",
              color: "#F4E4C1",
              padding: "10px 18px",
              fontSize: 22,
              letterSpacing: 8,
              textTransform: "uppercase",
            }}
          >
            Yì Jīng · 易经
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 140,
            right: 110,
            width: 260,
            height: 260,
            background: "#FCC419",
            borderRadius: 999,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 260,
            right: 260,
            width: 160,
            height: 160,
            background: "#E63946",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 360,
            right: 90,
            width: 180,
            height: 100,
            background: "#1D6FE5",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
