import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
const MAX = 100_000;
function parseCsv(text: string) {
  const out: string[][] = []; let row: string[] = []; let cell = ""; let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (quoted && text[i+1] === '"') { cell += '"'; i++; } else quoted = !quoted;
    } else if (char === "," && !quoted) { row.push(cell); cell = ""; }
    else if ((char === "\r" || char === "\n") && !quoted) {
      if (char === "\r" && text[i+1] === "\n") i++;
      row.push(cell); out.push(row); row = []; cell = "";
    } else cell += char;
  }
  if (quoted) throw Error("Unclosed quoted field");
  if (row.length || cell) { row.push(cell); out.push(row); }
  return out;
}
function esc(s: string) { return /[,\r\n"]/.test(s) ? '"'+s.replaceAll('"','""')+'"' : s; }
export async function POST(request: NextRequest) {
  const origin=request.headers.get("origin");
  if(origin && origin!==request.nextUrl.origin) return NextResponse.json({error:"Forbidden origin"},{status:403});
  const type=request.headers.get("content-type")||"";
  if(!type.startsWith("text/plain")) return NextResponse.json({error:"Send text/plain CSV"},{status:415});
  const size=Number(request.headers.get("content-length")||0);
  if(size>MAX) return NextResponse.json({error:"CSV too large for live demo"},{status:413});
  const text=await request.text();
  if(text.length>MAX) return NextResponse.json({error:"CSV too large"},{status:413});
  try{
    const rows=parseCsv(text);
    if(!rows.length) return NextResponse.json({error:"No rows supplied"},{status:400});
    if(rows.length>2000) return NextResponse.json({error:"Demo limit 2000 rows"},{status:413});
    const width=rows[0].length;
    const normalized=rows.map(r=>r.map(c=>c.trim())).filter(r=>r.some(Boolean));
    if(normalized.some(r=>r.length!==width)) return NextResponse.json({error:"Inconsistent CSV column widths"},{status:422});
    const seen=new Set<string>();
    const clean=normalized.filter((r,i)=>{
      if(i===0)return true;
      const key=JSON.stringify(r.map(x=>x.toLowerCase()));
      if(seen.has(key))return false;
      seen.add(key);return true;
    });
    return NextResponse.json({inputRows:Math.max(0,rows.length-1),outputRows:Math.max(0,clean.length-1),removed:rows.length-clean.length,rows:clean,csv:clean.map(r=>r.map(esc).join(",")).join("\r\n")},{headers:{"Cache-Control":"no-store"}});
  }catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Invalid CSV"},{status:400});}
}
