import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
// Vercel's preview toolbar (comments, feedback) needs these hosts; production is unchanged.
const isPreview = process.env.VERCEL_ENV === "preview";
const live = isPreview ? " https://vercel.live" : "";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${live}`,
  `style-src 'self' 'unsafe-inline'${live}`,
  `img-src 'self' data: blob:${isPreview ? " https://vercel.live https://vercel.com" : ""}`,
  `font-src 'self'${isPreview ? " https://vercel.live https://assets.vercel.com" : ""}`,
  `frame-src https://www.youtube-nocookie.com${live}`,
  `connect-src 'self'${isPreview ? " https://vercel.live wss://ws-us3.pusher.com" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

/** Permanent redirects from the addresses used by the old static site. */
export const redirectRules = [
  {
    source: "/assets/cv/Lateef-Kazeem-CV.pdf",
    destination: "/cv/Lateef-Kazeem-CV.pdf",
    permanent: true,
  },
  { source: "/assets/img/:file*", destination: "/img/:file*", permanent: true },
  { source: "/index.html", destination: "/", permanent: true },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], minimumCacheTTL: 31536000 },
  async redirects() {
    return redirectRules;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            // No preload or includeSubDomains until a domain is chosen and every subdomain uses HTTPS.
            value: "max-age=63072000",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
