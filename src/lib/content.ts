/** All real site content, copied verbatim from the original site. Do not invent entries. */

export const identity = {
  name: "Lateef Kazeem",
  role: "Footballer",
  headline: "Centre Forward & Attacking Midfielder",
  title: "Lateef Kazeem | Centre Forward | Player Profile & Highlights",
  description:
    "Lateef Kazeem, Nigerian centre forward (b. 2007). Strong aerial presence, clinical finishing and creative link-up play. 33 competitive matches, 22 goals and 15 assists.",
} as const;

export const about =
  "I am a dedicated and highly coachable forward with a strong physical presence, good movement off the ball and a calm mentality in front of goal. I am comfortable playing as a centre forward, attacking midfielder or wide forward, using my height, timing and technique to link play and create chances for the team. I work hard out of possession, press intelligently and read the game well, with a genuine desire to keep improving and compete at higher levels of football.";

export const profile = [
  { label: "Date of Birth", value: "08 February 2007" },
  { label: "Nationality", value: "Nigeria" },
  { label: "Place of Birth", value: "Lagos State" },
  { label: "Height", value: "1.95 m" },
  { label: "Weight", value: "70 kg" },
  { label: "Current Club", value: "Victory Football Club (2024 – Present)" },
  { label: "Primary Position", value: "Centre Forward (CF)" },
  { label: "Secondary Positions", value: "Attacking Midfielder, Left / Right Winger" },
  { label: "Dominant Foot", value: "Comfortable with both feet" },
] as const;

export const competencies = [
  "Strong aerial ability and hold-up play",
  "Confident 1v1 dribbling and close control",
  "Clinical finishing with both feet and head",
  "Creative link-up play and vision in the final third",
  "Disciplined defensive work rate and pressing",
  "Mature attitude, coachability and team-first mentality",
] as const;

export const stats = [
  { label: "Competitive Matches", value: 33 },
  { label: "Goals Scored", value: 22 },
  { label: "Assists", value: 15 },
] as const;

export const scoutNote =
  "Open to trial opportunities, academy pathways and professional development programmes in Nigeria and abroad. Full match footage and additional data available on request.";

export const experience = [
  {
    title: "Nationwide League One (NLO) 2023/2024",
    text: "Forward for Victory FC, regular starter across the campaign.",
  },
  {
    title: "Obasa Games 2024",
    text: "Represented Victory FC in a highly competitive Lagos-based tournament.",
  },
  {
    title: "Lagos State FA Cup 2024",
    text: "Featured as a centre forward against strong regional opposition.",
  },
  {
    title: "Nationwide League One (NLO) 2024/2025",
    text: "Key attacking player, contributing goals and assists throughout the season.",
  },
] as const;

export const achievements = [
  {
    highlight: "6 goals in 9 matches",
    text: "in the Nationwide League One (NLO) 2023/2024 season.",
  },
  {
    highlight: "second highest goal scorer",
    text: "with 4 goals in 7 matches at the Obasa Games 2024.",
    lead: "Finished as",
  },
  {
    highlight: "12 goals in 17 matches",
    text: "in the Nationwide League One (NLO) 2024/2025 season.",
  },
] as const;

export type MediaKind = "image" | "video";

export interface MediaItem {
  id: string;
  kind: MediaKind;
  /** Photograph path, or video thumbnail path. */
  src: string;
  width: number;
  height: number;
  alt: string;
  /** YouTube video id, for kind "video". */
  youtubeId?: string;
}

export const media: readonly MediaItem[] = [
  {
    id: "photo-1",
    kind: "image",
    src: "/img/lateef-2.jpg",
    width: 960,
    height: 1280,
    alt: "Lateef Kazeem match photo 1",
  },
  {
    id: "photo-2",
    kind: "image",
    src: "/img/lateef-3.jpg",
    width: 960,
    height: 1280,
    alt: "Lateef Kazeem match photo 2",
  },
  {
    id: "photo-3",
    kind: "image",
    src: "/img/lateef-4.jpg",
    width: 1280,
    height: 848,
    alt: "Lateef Kazeem match photo 3",
  },
  {
    id: "photo-4",
    kind: "image",
    src: "/img/lateef-5.jpg",
    width: 1280,
    height: 992,
    alt: "Lateef Kazeem match photo 4",
  },
  {
    id: "video-1",
    kind: "video",
    src: "/img/lateef-1.jpg",
    width: 804,
    height: 1080,
    alt: "YouTube highlight thumbnail",
    youtubeId: "rjg0Gb7vKhE",
  },
];

export const portrait = {
  src: "/img/lateef-1.jpg",
  width: 804,
  height: 1080,
  alt: "Portrait of footballer Lateef Kazeem",
} as const;

export const organisations = [
  { name: "FIFA", src: "/img/fifa.png", width: 500, height: 334 },
  { name: "CAF", src: "/img/caf.png", width: 308, height: 286 },
  { name: "Nigeria Football Federation", src: "/img/nff.png", width: 285, height: 280 },
  { name: "Nationwide League One", src: "/img/nlo.jpg", width: 400, height: 497 },
] as const;

export const cv = {
  href: "/cv/Lateef-Kazeem-CV.pdf",
  label: "Download Player CV",
} as const;

export const navigation = [
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
] as const;
