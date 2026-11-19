import { defineConfig } from "@playwright/test";

const sizes = [
  { name: "phone-360", width: 360, height: 740 },
  { name: "phone-390", width: 390, height: 844 },
  { name: "phone-430", width: 430, height: 932 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1280", width: 1280, height: 800 },
  { name: "desktop-1536", width: 1536, height: 960 },
];

export default defineConfig({
  testDir: "e2e",
  webServer: { command: "npm run build && npm run start", url: "http://localhost:3000", reuseExistingServer: true, timeout: 240_000 },
  use: { baseURL: "http://localhost:3000" },
  projects: sizes.map((s) => ({ name: s.name, use: { viewport: { width: s.width, height: s.height } } })),
});
