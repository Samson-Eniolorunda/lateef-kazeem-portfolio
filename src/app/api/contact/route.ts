import { handleContact } from "@/lib/contact/handle";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let raw: unknown = null;
  try {
    raw = await request.json();
  } catch {
    /* fall through to validation error */
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { status, body } = await handleContact(raw, ip);
  return Response.json(body, { status });
}
