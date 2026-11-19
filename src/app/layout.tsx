import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lateef Kazeem | Centre Forward | Player Profile & Highlights",
  description:
    "Lateef Kazeem, Nigerian centre forward (b. 2007). Strong aerial presence, clinical finishing and creative link-up play. 33 competitive matches, 22 goals and 15 assists.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
