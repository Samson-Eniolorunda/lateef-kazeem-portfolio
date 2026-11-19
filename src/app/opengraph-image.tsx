import { ImageResponse } from "next/og";
import { identity } from "@/lib/content";

export const alt = `${identity.name}, ${identity.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 96,
        background: "#0b0d0c",
        color: "#f4f6f5",
      }}
    >
      <div style={{ fontSize: 32, color: "#3ddc84", letterSpacing: 4 }}>
        {identity.role.toUpperCase()}
      </div>
      <div style={{ fontSize: 112, fontWeight: 700, marginTop: 16 }}>{identity.name}</div>
      <div style={{ fontSize: 44, marginTop: 16, color: "#b8c0bc" }}>
        {identity.headline}
      </div>
    </div>,
    size,
  );
}
