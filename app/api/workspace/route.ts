import { NextRequest, NextResponse } from "next/server";
import { get, put } from "@vercel/blob";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KINDS = new Set(["deals", "knowledge", "chat", "bookings"]);
const COOKIE = "northstar_demo_session";
const MAX_BYTES = 18_000;
const rate = new Map<string, { n: number; ts: number }>();

function session(req: NextRequest) {
  const current = req.cookies.get(COOKIE)?.value;
  if (current && /^[0-9a-f-]{36}$/i.test(current)) return { id: current, fresh: false };
  return { id: randomUUID(), fresh: true };
}
function reply(req: NextRequest, body: unknown, status: number, id: string, fresh: boolean) {
  const res = NextResponse.json(body, { status, headers: { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
  if (fresh) res.cookies.set(COOKIE, id, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
  return res;
}
function path(id: string, kind: string) { return `northstar-demo/v1/${id}/${kind}.json`; }
function kindOf(req: NextRequest) { const kind = req.nextUrl.searchParams.get("kind") || ""; return KINDS.has(kind) ? kind : null; }
function throttled(req: NextRequest) {
  const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const now = Date.now(); const prev = rate.get(ip);
  if (rate.size > 5000) rate.clear();
  if (!prev || now - prev.ts > 60_000) { rate.set(ip, { n: 1, ts: now }); return false; }
  prev.n++;
  return prev.n > 20;
}
function valid(kind: string, data: unknown) {
  if (!Array.isArray(data) || data.length > 80) return false;
  if (kind === "deals") return data.every(d => d && typeof d.id === "string" && typeof d.name === "string" && d.name.length <= 65 && typeof d.company === "string" && d.company.length <= 65 && Number.isFinite(d.value) && d.value >= 0 && d.value <= 1e7 && ["Lead", "Qualified", "Proposal", "Won"].includes(d.stage));
  if (kind === "knowledge") return data.every(d => d && typeof d.q === "string" && d.q.length <= 80 && typeof d.a === "string" && d.a.length <= 500);
  if (kind === "chat") return data.every(d => d && ["user", "assistant"].includes(d.role) && typeof d.text === "string" && d.text.length <= 1000);
  if (kind === "bookings") return data.every(d => d && typeof d.id === "string" && typeof d.name === "string" && d.name.length <= 60 && /^\d{4}-\d{2}-\d{2}$/.test(d.date) && /^\d\d:\d\d$/.test(d.time) && Number.isInteger(d.guests) && d.guests > 0 && d.guests <= 8);
  return false;
}
export async function GET(req: NextRequest) {
  const s = session(req); const kind = kindOf(req);
  if (!kind) return reply(req, { error: "Invalid workspace" }, 400, s.id, s.fresh);
  if (!process.env.BLOB_READ_WRITE_TOKEN) return reply(req, { data: null, storage: "unconfigured" }, 200, s.id, s.fresh);
  try {
    const result = await get(path(s.id, kind), { access: "private", useCache: false });
    if (!result?.stream) return reply(req, { data: null, storage: "private-blob" }, 200, s.id, s.fresh);
    const raw = await new Response(result.stream).text();
    const data: unknown = JSON.parse(raw);
    return reply(req, { data: valid(kind, data) ? data : null, storage: "private-blob" }, 200, s.id, s.fresh);
  } catch {
    return reply(req, { error: "Storage temporarily unavailable" }, 503, s.id, s.fresh);
  }
}
export async function PUT(req: NextRequest) {
  const s = session(req); const kind = kindOf(req);
  if (!kind) return reply(req, { error: "Invalid workspace" }, 400, s.id, s.fresh);
  if (!process.env.BLOB_READ_WRITE_TOKEN) return reply(req, { error: "Persistence unavailable" }, 503, s.id, s.fresh);
  const origin = req.headers.get("origin");
  if (origin && origin !== req.nextUrl.origin) return reply(req, { error: "Forbidden origin" }, 403, s.id, s.fresh);
  if (throttled(req)) return reply(req, { error: "Rate limit reached" }, 429, s.id, s.fresh);
  const raw = await req.text();
  if (raw.length > MAX_BYTES) return reply(req, { error: "Demo limit exceeded" }, 413, s.id, s.fresh);
  let data: unknown;
  try { data = JSON.parse(raw); } catch { return reply(req, { error: "Invalid JSON" }, 400, s.id, s.fresh); }
  if (!valid(kind, data)) return reply(req, { error: "Invalid data or demo limits exceeded" }, 422, s.id, s.fresh);
  try {
    await put(path(s.id, kind), JSON.stringify(data), { access: "private", allowOverwrite: true, contentType: "application/json" });
    return reply(req, { ok: true }, 200, s.id, s.fresh);
  } catch {
    return reply(req, { error: "Could not save" }, 503, s.id, s.fresh);
  }
}
