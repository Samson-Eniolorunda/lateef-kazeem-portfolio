import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { identity } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import { personJsonLd } from "@/lib/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: identity.title,
  description: identity.description,
  alternates: { canonical: "/" },
  authors: [{ name: identity.name }],
  openGraph: {
    type: "profile",
    locale: "en_GB",
    siteName: identity.name,
    title: identity.title,
    description: identity.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: identity.title,
    description: identity.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={GeistSans.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
