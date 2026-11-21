"use client";
import {useState,useEffect,useMemo,useRef} from "react";
import {ArrowUpRight,ArrowRight,ArrowDownRight,ArrowLeft,ChevronLeft,Sparkles,Command,LayoutDashboard,MessagesSquare,UtensilsCrossed,Workflow,ChevronRight,Menu,X,Check,Plus,Download,Trash2,Search,CalendarDays,Clock3,Users,Send,ShieldCheck,FileSpreadsheet,BarChart3,TrendingUp,Filter,Heart,Mail,Instagram,Github,Play,Layers,Globe2,MousePointer2,CheckCircle2} from "lucide-react";
import StudioPrinciples from "./StudioPrinciples";
import {SiNextdotjs,SiTypescript,SiReact,SiPython,SiJavascript,SiNodedotjs,SiHtml5,SiCss,SiPostgresql,SiDocker} from "react-icons/si";
type Work = "crm"|"support"|"restaurant"|"automation";
type Deal={id:string,name:string,company:string,value:number,stage:"Lead"|"Qualified"|"Proposal"|"Won"};
const initialDeals:Deal[]=[{id:"1",name:"Ava Thompson",company:"Linear Creative",value:5600,stage:"Proposal"},{id:"2",name:"Noah Williams",company:"Maison Store",value:3200,stage:"Qualified"},{id:"3",name:"Mia Chen",company:"Bright Agency",value:8900,stage:"Won"},{id:"4",name:"Leo Martin",company:"Wave Studio",value:2100,stage:"Lead"}];
const initialKB=[{q:"pricing",a:"Our plans start at $29/month for small teams. Enterprise pricing is tailored to your needs."},{q:"refund",a:"You can request a refund within 14 days of purchase by contacting the support team."},{q:"shipping",a:"Standard shipping takes 3–5 business days. Express shipping usually takes 1–2 business days."},{q:"hours",a:"Our support team is available Monday to Friday, 9 AM – 6 PM."}];
type Article={q:string,a:string};type Chat={role:"user"|"assistant",text:string};
const seedChat:Chat[]=[{role:"assistant",text:"Hey there! I'm here to help. Ask me about pricing, shipping, refunds or support hours."}];
const works:[Work,string,string,string][]=[["crm","Meridian CRM","Sales intelligence","An intuitive workspace to grow customer relationships and turn insights into revenue."],["support","Mellow AI","Customer experience","A considerate support experience powered by a searchable knowledge base."],["restaurant","Sorelle","Hospitality & dining","An elegant restaurant experience, from discovery to your reserved table."],["automation","Flowstate","Productivity tools","A smarter way to clean, organize and export your everyday data."]];
const cash=(n:number)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(n);
function useStored<T>(key:string, initial:T){
  const [state,setState]=useState<T>(initial);
  const ready=useRef(false);
  const [hydrated,setHydrated]=useState(false);
  useEffect(()=>{
    let active=true;
    (async()=>{
      let fallback=initial;
      try{const local=localStorage.getItem("northstar-v3-"+key);if(local)fallback=JSON.parse(local) as T;}catch{}
      try{
        const response=await fetch("/api/workspace?kind="+encodeURIComponent(key),{cache:"no-store"});
        if(response.ok){
          const body=await response.json() as {data:T|null};
          if(active)setState(body.data??fallback);
        } else if(active)setState(fallback);
      }catch{if(active)setState(fallback)}
      if(active){ready.current=true;setHydrated(true)}
    })();
    return()=>{active=false;ready.current=false};
  },[key]);
  useEffect(()=>{
    if(!hydrated||!ready.current)return;
    try{localStorage.setItem("northstar-v3-"+key,JSON.stringify(state))}catch{}
    const timer=setTimeout(()=>{
      fetch("/api/workspace?kind="+encodeURIComponent(key),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(state)}).catch(()=>{});
    },500);
    return()=>clearTimeout(timer);
  },[key,state,hydrated]);
  return [state,setState] as const;
}
function IconMark(){return <span className="mark"><span className="mark-star">N</span></span>}
function SectionTitle({eyebrow,title,desc}:{eyebrow:string,title:string,desc:string}){return <div className="section-title"><span className="eyebrow"><span className="eyebrow-line"/> {eyebrow}</span><h2>{title}</h2><p>{desc}</p></div>}
function DownloadCSV(rows:string[][],filename:string){const csv=rows.map(row=>row.map(s=>/[,"\n\r]/.test(s)?'"'+s.replaceAll('"','""')+'"':s).join(",")).join("\r\n");const a=document.createElement("a");const url=URL.createObjectURL(new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"}));a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),500)}
const monthlyRevenue=[67.2,72.8,71.1,84.5,82.0,91.2,102.1,98.7,109.8,114.6,118.4,128.42];
const monthNames=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
function RevenueChart(){
 const [selected,setSelected]=useState(11);
 const pts=monthlyRevenue.map((value,i)=>({x:54+i*46.8,y:225-(value-55)*1.95,value}));
 const d=pts.map((p,i)=>{if(i===0)return "M "+p.x.toFixed(1)+" "+p.y.toFixed(1);const prev=pts[i-1];const midX=(prev.x+p.x)/2;return " C "+midX.toFixed(1)+" "+prev.y.toFixed(1)+" "+midX.toFixed(1)+" "+p.y.toFixed(1)+" "+p.x.toFixed(1)+" "+p.y.toFixed(1)}).join("");
 const area=d+" L "+pts[pts.length-1].x+" 225 L 54 225 Z";
 const chosen=pts[selected];
 return <div className="revenue-chart" aria-label="Illustrative monthly revenue chart for January through December 2026">
  <div className="revenue-chart-head"><span>REVENUE PERFORMANCE <span className="chart-legend-dot"/></span><span className="chart-selection">{monthNames[selected]} 2026 <strong>${chosen.value.toFixed(1)}K</strong></span></div>
  <svg className="revenue-svg" viewBox="0 0 640 270" role="img" aria-label="Revenue rises from 67.2 thousand dollars in January to 128.4 thousand dollars in December. Interactive monthly points.">
   <defs><linearGradient id="northstar-revenue-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--chart-color)" stopOpacity=".22"/><stop offset="95%" stopColor="var(--chart-color)" stopOpacity=".005"/></linearGradient></defs>
   {[120,100,80,60].map(v=>{const y=225-(v-55)*1.95;return <g key={v}><line x1="48" y1={y} x2="609" y2={y} className="chart-gridline"/><text x="5" y={y+4} className="axis-tick">{v}K</text></g>})}
   <path d={area} fill="url(#northstar-revenue-fill)" className="chart-area"/>
   <path d={d} className="chart-line" fill="none" pathLength={100}/>
   <line x1={chosen.x} x2={chosen.x} y1="57" y2="225" className="chart-crosshair"/>
   <circle cx={chosen.x} cy={chosen.y} r="9" className="chart-selected-ring"/>
   <circle cx={chosen.x} cy={chosen.y} r="4.5" className="chart-selected-point"/>
   {pts.map((p,i)=><g key={i} role="button" tabIndex={0} aria-label={monthNames[i]+" revenue "+p.value+" thousand dollars"} onMouseEnter={()=>setSelected(i)} onFocus={()=>setSelected(i)} onClick={()=>setSelected(i)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setSelected(i)}}}><circle cx={p.x} cy={p.y} r="17" fill="transparent"/><circle cx={p.x} cy={p.y} r="2.2" className="chart-data-point"/></g>)}
   {["JAN","MAR","MAY","JUL","SEP","NOV"].map((n,i)=><text key={n} x={pts[i*2].x} y="250" textAnchor="middle" className="chart-month-label">{n}</text>)}
  </svg>
  <div className="chart-footnote"><span><span className="chart-footnote-line"/> HISTORICAL TREND · SAMPLE DATA</span><span>ANNUAL GROWTH <strong>+28.4%</strong></span></div>
 </div>
}
function MiniBars(){return <div className="hero-bars">{[26,38,29,53,47,66,57,81,72,96,84,100].map((v,i)=><div key={i} style={{height:v+"%"}}/>)}</div>}
function HeroVisual(){return <div className="hero-visual"><div className="orbit orbit1"/><div className="orbit orbit2"/><div className="mini-annotation top"><span className="dot lavender"/> BUILT WITH PURPOSE</div><div className="hero-app"><div className="app-shell"><div className="app-dots"><i/><i/><i/></div><span>meridian / intelligence</span><div className="shell-avatar">N</div></div><div className="hero-app-content"><div className="hero-app-label">PORTFOLIO SHOWCASE / PERFORMANCE</div><div className="hero-app-head"><div><small>Illustrative annual revenue</small><strong>$128,420 <span>+28.4%</span></strong></div><div className="app-dropdown">2026 · Yearly</div></div><RevenueChart/></div></div><div className="float-card float-left"><div className="float-icon"><TrendingUp size={21}/></div><div><small>Annual trend</small><strong>+28.4%</strong></div></div><div className="float-card float-right"><div className="hero-status-icon"><CheckCircle2 size={20}/></div><div><strong>Built for real use</strong><small>Interfaces you can actually try</small></div></div></div>}
function PipelineMix({deals}:{deals:Deal[]}){
 const stages:[Deal["stage"],string][]=[["Won","won"],["Proposal","proposal"],["Qualified","qualified"],["Lead","lead"]];
 const total=deals.reduce((sum,d)=>sum+d.value,0);
 return <section className="pipeline-breakdown" aria-label="Sales pipeline distribution">
  <div className="pipeline-intro"><span className="micro">LIVE PIPELINE DISTRIBUTION</span><h4>Every deal, in perspective.</h4><p>Values update as you add deals or change their stages.</p><strong>{cash(total)}</strong><small>TOTAL PIPELINE VALUE</small></div>
  <div className="pipeline-meters">{stages.map(([stage,cls])=>{const value=deals.filter(d=>d.stage===stage).reduce((sum,d)=>sum+d.value,0);const pct=total?Math.round(value/total*100):0;return <div key={stage} className={"pipeline-row pipeline-"+cls}><div className="pipeline-row-head"><strong><span className="pipeline-swatch"/> {stage}</strong><span>{cash(value)} <small>{pct}%</small></span></div><div className="pipeline-meter" role="progressbar" aria-label={stage+" pipeline value share"} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}><span style={{width:pct+"%"}}/></div></div>})}</div>
 </section>
}
function CRM(){const [deals,setDeals]=useStored<Deal[]>("deals",initialDeals);const [query,setQuery]=useState("");const [name,setName]=useState("");const [company,setCompany]=useState("");const [value,setValue]=useState("");const [stage,setStage]=useState<Deal["stage"]>("Lead");const [show,setShow]=useState(false);const filtered=deals.filter(x=>(x.name+" "+x.company).toLowerCase().includes(query.toLowerCase()));const total=deals.reduce((s,x)=>s+x.value,0);const won=deals.filter(x=>x.stage==="Won").reduce((s,x)=>s+x.value,0);return <div className="app-preview"><div className="product-bar"><div className="product-identity"><span className="product-logo violet"><LayoutDashboard size={19}/></span><div><strong>Meridian <span>CRM</span></strong><small>Sales overview / Workspace</small></div></div><div className="product-actions"><span className="live-label"><span/> LIVE DEMO</span><button className="small-button" onClick={()=>DownloadCSV([["Name","Company","Value","Stage"],...deals.map(x=>[x.name,x.company,String(x.value),x.stage])],"meridian-deals.csv")}><Download size={15}/> Export</button></div></div><div className="inner"><div className="app-greeting"><div><span className="micro">DASHBOARD / OVERVIEW</span><h3>Sales overview<span>.</span></h3><p>Here&apos;s what&apos;s happening with your business today.</p></div><button className="primary mini" onClick={()=>setShow(!show)}><Plus size={15}/> New deal</button></div><div className="stats"><div className="stat"><span>Pipeline value <TrendingUp size={15}/></span><strong>{cash(total)}</strong><small>Across {deals.length} opportunities</small></div><div className="stat"><span>Revenue closed <CheckCircle2 size={15}/></span><strong>{cash(won)}</strong><small>Confirmed won deals</small></div><div className="stat"><span>Active opportunities <Users size={15}/></span><strong>{deals.filter(x=>x.stage!=="Won").length.toString().padStart(2,"0")}</strong><small>Currently in progress</small></div></div>{show&&<form className="add-deal" onSubmit={e=>{e.preventDefault();if(!name.trim()||!company.trim()||!(Number(value)>0))return;setDeals(p=>[{id:Date.now().toString(),name:name.trim(),company:company.trim(),value:Number(value),stage},...p]);setName("");setCompany("");setValue("");setShow(false)}}><input value={name} onChange={e=>setName(e.target.value)} placeholder="Contact name" required maxLength={65}/><input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Company" required maxLength={65}/><input type="number" min="1" value={value} onChange={e=>setValue(e.target.value)} placeholder="Deal value ($)" required/><select value={stage} onChange={e=>setStage(e.target.value as Deal["stage"])}><option>Lead</option><option>Qualified</option><option>Proposal</option><option>Won</option></select><button className="primary mini">Add deal</button></form>}<PipelineMix deals={deals}/><div className="table-card"><div className="table-head"><div><h4>Recent opportunities</h4><p>Manage your customer pipeline</p></div><div className="search"><Search size={15}/><input aria-label="Search opportunities" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search contacts..."/></div></div><div className="table-scroll"><table><thead><tr><th>CONTACT</th><th>COMPANY</th><th>VALUE</th><th>STAGE</th><th>ACTION</th></tr></thead><tbody>{filtered.map((d,i)=><tr key={d.id}><td><span className={"person person"+i%4}>{d.name.charAt(0)}</span>{d.name}</td><td>{d.company}</td><td className="money">{cash(d.value)}</td><td><select aria-label={"Stage for "+d.name} className="stage" value={d.stage} onChange={e=>setDeals(p=>p.map(x=>x.id===d.id?{...x,stage:e.target.value as Deal["stage"]}:x))}><option>Lead</option><option>Qualified</option><option>Proposal</option><option>Won</option></select></td><td><button aria-label={"Delete "+d.name} className="icon-button" onClick={()=>setDeals(p=>p.filter(x=>x.id!==d.id))}><Trash2 size={15}/></button></td></tr>)}</tbody></table>{!filtered.length&&<p className="empty">No matching opportunities.</p>}</div></div><p className="demo-note"><ShieldCheck size={14}/> Demo data is saved in your browser, not on a server.</p></div></div>}
function Support(){const [articles,setArticles]=useStored<Article[]>("knowledge",initialKB);const [chat,setChat]=useStored<Chat[]>("chat",seedChat);const [message,setMessage]=useState("");const [topic,setTopic]=useState("");const [answer,setAnswer]=useState("");const [editing,setEditing]=useState(false);const endRef=useRef<HTMLDivElement>(null);useEffect(()=>{endRef.current?.scrollIntoView({block:"nearest",behavior:"smooth"})},[chat]);function ask(q:string){if(!q.trim())return;const terms=q.toLowerCase().split(/[^a-z]+/).filter(w=>w.length>2);const match=articles.find(a=>terms.some(w=>a.q.toLowerCase().includes(w)||w.includes(a.q.toLowerCase())));setChat(p=>[...p,{role:"user",text:q.trim()},{role:"assistant",text:match?match.a:"I couldn't find a reliable answer in our knowledge base. In a production setup, I'd hand this over to a human agent."}]);setMessage("")}return <div className="app-preview"><div className="product-bar"><div className="product-identity"><span className="product-logo sea"><MessagesSquare size={19}/></span><div><strong>mellow <span>support</span></strong><small>Knowledge-powered customer service</small></div></div><div className="product-actions"><span className="live-label"><span/> DEMO ONLINE</span><button className="small-button" onClick={()=>setEditing(!editing)}><Plus size={15}/> Knowledge base</button></div></div><div className="inner support-layout"><div className="chat-panel"><div className="chat-heading"><div className="chat-avatar"><Sparkles size={20}/></div><div><strong>Mellow Assistant</strong><small><span className="online-dot"/> Here to help</small></div><div className="assist-badge">KNOWLEDGE ASSISTANT</div></div><div className="chat-messages">{chat.map((m,i)=><div key={i} className={"bubble-row "+m.role}>{m.role==="assistant"&&<div className="bubble-avatar"><Sparkles size={15}/></div>}<div className="bubble">{m.text}</div></div>)}<div ref={endRef}/></div><div className="suggestions">{["Pricing","Refund policy","Shipping"].map(x=><button key={x} onClick={()=>ask(x)}>{x} <ArrowUpRight size={12}/></button>)}</div><form className="chat-compose" onSubmit={e=>{e.preventDefault();ask(message)}}><input aria-label="Ask a question" value={message} onChange={e=>setMessage(e.target.value)} placeholder="Ask me anything..."/><button className="primary mini" aria-label="Send" disabled={!message.trim()}><Send size={16}/></button></form></div><div className="support-aside"><div className="aside-symbol"><Layers size={21}/></div><h3>Answers, without the wait.</h3><p>See how a searchable knowledge base helps teams answer routine questions in seconds.</p><div className="small-stat"><span>KNOWLEDGE ARTICLES</span><strong>{articles.length.toString().padStart(2,"0")}</strong></div><div className="feature-check"><Check size={14}/> Editable knowledge base</div><div className="feature-check"><Check size={14}/> Honest escalation on unknown topics</div><div className="feature-check"><Check size={14}/> No external AI API required</div>{editing&&<form className="kb-edit" onSubmit={e=>{e.preventDefault();if(!topic.trim()||!answer.trim())return;setArticles(p=>[...p,{q:topic.trim(),a:answer.trim()}]);setTopic("");setAnswer("");setEditing(false)}}><input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Keyword (e.g. payments)" maxLength={40} required/><textarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Response" maxLength={500} required/><button className="primary mini">Save article</button></form>}</div></div></div>}
const menu=[{name:"Burrata & heirloom tomato",details:"Basil oil · sourdough · garden herbs",price:19},{name:"Wild mushroom risotto",details:"Aged parmesan · thyme · truffle",price:27},{name:"Seared sea bass",details:"Lemon beurre blanc · seasonal greens",price:34},{name:"Vanilla bean panna cotta",details:"Raspberry · pistachio crumble",price:14}];
type Booking={id:string,date:string,time:string,guests:number,name:string};
function Restaurant(){const [bookings,setBookings]=useStored<Booking[]>("bookings",[]);const [name,setName]=useState("");const [date,setDate]=useState("");const [time,setTime]=useState("19:00");const [guests,setGuests]=useState(2);const [notice,setNotice]=useState("");const [lang,setLang]=useState<"EN"|"RU">("EN");const today=new Date().toLocaleDateString("en-CA");function book(e:React.FormEvent){e.preventDefault();if(!date||date<today||!name.trim()){setNotice("Please select a future date and enter your name.");return}const occupied=bookings.filter(b=>b.date===date&&b.time===time).reduce((n,b)=>n+b.guests,0);if(occupied+guests>16){setNotice("That time is fully booked in this demo. Please select another slot.");return}setBookings(p=>[...p,{id:Date.now().toString(),date,time,guests,name:name.trim()}]);setNotice("Confirmed in demo — "+name+" · "+date+" · "+time+" · "+guests+" guests");setName("")}return <div className="restaurant-demo"><div className="rest-hero"><div className="rest-top"><span className="rest-brand">SORELLE<span>.</span></span><div><button onClick={()=>setLang(lang==="EN"?"RU":"EN")} className="rest-lang"><Globe2 size={13}/> {lang}</button></div></div><div className="rest-hero-inner"><span className="rest-kicker">A LITTLE SOMETHING SPECIAL</span><h3>{lang==="EN"?"Gather around good things.":"Встречаемся за хорошим столом."}</h3><p>{lang==="EN"?"Fresh ingredients. Beautiful moments. A table made for you.":"Свежие продукты, тёплая атмосфера и столик для вас."}</p></div><div className="rest-ornament">S</div></div><div className="rest-content"><div className="menu-panel"><div className="mini-eyebrow">SEASONAL FAVORITES</div><h3>Made with love, served with joy.</h3>{menu.map(m=><div className="dish" key={m.name}><div><strong>{m.name}</strong><small>{m.details}</small></div><b>${m.price}</b></div>)}</div><form className="reserve" onSubmit={book}><span className="mini-eyebrow">JOIN US</span><h3>Save a seat.</h3><p>Good evenings begin with a reservation.</p><label>Your name</label><input aria-label="Your name" value={name} onChange={e=>setName(e.target.value)} placeholder="Alex Morgan" maxLength={60} required/><div className="form-row"><div><label>Date</label><input aria-label="Date" type="date" min={today} value={date} onChange={e=>setDate(e.target.value)} required/></div><div><label>Time</label><select aria-label="Time" value={time} onChange={e=>setTime(e.target.value)}><option>18:00</option><option>19:00</option><option>20:00</option><option>21:00</option></select></div></div><label>Party size</label><select aria-label="Party size" value={guests} onChange={e=>setGuests(Number(e.target.value))}>{[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n} {n===1?"guest":"guests"}</option>)}</select><button className="reserve-btn">Reserve a table <ArrowUpRight size={17}/></button>{notice&&<div role="status" className="booking-notice">{notice}</div>}<small className="tiny-note">Demonstration only. No real restaurant is contacted. Per-slot capacity: 16 guests.</small></form></div></div>}
function parseCSV(raw:string):string[][]{const rows:string[][]=[];let row:string[]=[],field="",quoted=false;for(let i=0;i<raw.length;i++){const c=raw[i];if(c==='"'){if(quoted&&raw[i+1]==='"'){field+='"';i++}else quoted=!quoted}else if(c===","&&!quoted){row.push(field);field=""}else if((c==="\n"||c==="\r")&&!quoted){if(c==="\r"&&raw[i+1]==="\n")i++;row.push(field);rows.push(row);row=[];field=""}else field+=c}if(quoted)throw Error("Unclosed quote in CSV");if(row.length||field){row.push(field);rows.push(row)}return rows}
function Automation(){
 const [source,setSource]=useState("name,email,city\nAmelia,amelia@example.com,London\nLeo,leo@example.com,Paris\nAmelia,amelia@example.com,London\n  Maya  ,maya@example.com,  Yerevan  \n\n");
 const [result,setResult]=useState<string[][]>([]);
 const [before,setBefore]=useState(0);
 const [removed,setRemoved]=useState(0);
 const [error,setError]=useState("");
 const [processing,setProcessing]=useState(false);
 const fileRef=useRef<HTMLInputElement>(null);
 const resetResult=()=>{setResult([]);setBefore(0);setRemoved(0);setError("")};
 const inputLines=source?source.split(/\r?\n/).filter(x=>x.trim().length>0).length:0;
 async function process(){
  if(!source.trim()||processing)return;
  setProcessing(true);setError("");setResult([]);
  try{
    const response=await fetch("/api/automation",{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:source});
    const data=await response.json() as {error?:string,inputRows?:number,removed?:number,rows?:string[][]};
    if(!response.ok||!data.rows)throw Error(data.error||"The server could not process this CSV");
    setBefore(data.inputRows??0);setRemoved(data.removed??0);setResult(data.rows);
  }catch(e){
    setError(e instanceof Error?e.message:"Processing failed");
    setResult([]);
  }finally{setProcessing(false)}
 }
 async function onFile(e:React.ChangeEvent<HTMLInputElement>){
   const f=e.target.files?.[0];if(!f)return;
   if(f.size>100_000){resetResult();setError("The online demo supports CSV files up to 100 KB.");return;}
   setSource(await f.text());resetResult();
 }
 const hasResult=result.length>0;
 return <div className="app-preview flow-preview">
  <div className="product-bar"><div className="product-identity"><span className="product-logo blue"><Workflow size={19}/></span><div><strong>flowstate<span>.</span></strong><small>Data workspace / Automation</small></div></div><div className="product-actions"><span className="live-label"><span/> PRIVATE PROCESSING</span></div></div>
  <div className="inner flow-inner">
   <div className="app-greeting flow-greeting"><div><span className="micro">WORKSPACE / DATA ENGINE</span><h3>Make the messy useful<span>.</span></h3><p>Import, clean and export CSV data. Processing runs on the server without saving your file.</p></div><button className="small-button" onClick={()=>{setSource("");resetResult();if(fileRef.current)fileRef.current.value=""}}>Clear all</button></div>
   <section className={"flow-console "+(processing?"is-processing":hasResult?"is-complete":error?"has-error":"is-idle")} aria-label="Data processing workflow">
    <div className="flow-console-head"><div><span className="flow-console-eyebrow">LIVE WORKFLOW / 001</span><h4>Data, in motion.</h4></div><span className="flow-console-status" role="status" aria-live="polite"><span className="flow-status-light"/>{processing?"Processing file":hasResult?"Process complete":error?"Check the input":"Ready for input"}</span></div>
    <div className="flow-steps">
     <div className="flow-step flow-step-input"><div className="flow-step-head"><span>01 / SOURCE</span><FileSpreadsheet size={19}/></div><strong>{inputLines.toString().padStart(2,"0")}</strong><small>NON-EMPTY LINES</small><span className="flow-data-line"><i/><i/><i/><i/><i/><i/></span></div>
     <div className="flow-connector" aria-hidden="true"><span/></div>
     <div className="flow-step flow-step-transform"><div className="flow-step-head"><span>02 / TRANSFORM</span><Workflow size={19}/></div><div className="flow-core"><span/><span/><span/></div><small>TRIM · VALIDATE · DEDUPE</small><span className="flow-process-line"/></div>
     <div className="flow-connector" aria-hidden="true"><span/></div>
     <div className="flow-step flow-step-output"><div className="flow-step-head"><span>03 / OUTPUT</span><Download size={19}/></div><strong>{hasResult?String(result.length-1).padStart(2,"0"):"—"}</strong><small>CLEAN DATA ROWS</small><span className="flow-data-line"><i/><i/><i/><i/><i/><i/></span></div>
    </div>
    <div className="flow-console-bottom"><span>LOCAL UI <span className="flow-separator"/> SERVER API</span><span>{hasResult?removed+" rows removed":processing?"RUNNING VALIDATION":"NO FILES STORED"}</span></div>
   </section>
   <div className="automation-layout flow-workspace">
    <div className="table-card process-card"><div className="table-head"><div><h4>01 / Source data</h4><p>Paste CSV or import a file</p></div><label className="small-button upload"><Plus size={15}/> Import CSV<input type="file" ref={fileRef} accept=".csv,text/csv" onChange={onFile}/></label></div>
     <textarea aria-label="Source CSV" className="data-editor" spellCheck={false} value={source} onChange={e=>{setSource(e.target.value);resetResult()}} placeholder="name,email\nAlex,alex@example.com"/>
     <div className="process-footer"><span>Flexible CSV parsing · Row cleanup · Duplicates removed</span><button className="primary mini" disabled={!source.trim()||processing} onClick={process}>{processing?<Workflow size={15}/>:<ArrowRight size={15}/>} {processing?"Processing…":"Run cleanup"}</button></div>
     {error&&<p className="error-message" role="alert">{error}</p>}
    </div>
    <div className="result-card flow-output-card"><div className="flow-output-heading"><span>02 / THE RESULT</span><span className={"flow-output-indicator "+(hasResult?"is-ready":"")}>{hasResult?"READY TO EXPORT":"AWAITING INPUT"}</span></div><h4>{hasResult?"Your data, refined.":"An output worth using."}</h4><p>{hasResult?"The cleaned dataset is available below.":"Run the workflow to generate clean data."}</p>
      <div className="result-metrics"><div><strong>{hasResult?before:"—"}</strong><small>Input rows</small></div><ArrowRight size={17}/><div><strong>{hasResult?result.length-1:"—"}</strong><small>Clean rows</small></div></div>
      <div className="flow-output-window" aria-label="Preview of cleaned CSV">
       <div className="flow-output-window-top"><span/><span/><span/><small>{hasResult?"cleaned.csv":"output.csv"}</small></div>
       {hasResult?<div className="flow-output-window-lines">{result.slice(0,4).map((row,i)=><div key={i}><span>{String(i+1).padStart(2,"0")}</span><code>{row.slice(0,3).join("   |   ")}</code></div>)}</div>:<div className="flow-empty-bars" aria-hidden="true"><span/><span/><span/><span/></div>}
      </div>
      <button className="primary download" disabled={!hasResult||processing} onClick={()=>DownloadCSV(result,"flowstate-cleaned.csv")}><Download size={16}/> Download cleaned CSV</button><small className="tiny-note">Demo service: in-memory processing. No files retained.</small>
    </div>
   </div>
  </div>
 </div>;
}
const demos:Record<Work,React.ReactNode>={crm:<CRM/>,support:<Support/>,restaurant:<Restaurant/>,automation:<Automation/>};

function ProjectCarousel({onExplore}:{onExplore:(kind:Work)=>void}){
 const scrollRef=useRef<HTMLDivElement>(null);
 const paused=useRef(false);
 const [index,setIndex]=useState(0);
 const projects=[
  {id:"crm" as Work,number:"01",name:"MERIDIAN",kind:"CRM / ANALYTICS",subtitle:"The command center for better decisions.",theme:"meridian"},
  {id:"support" as Work,number:"02",name:"MELLOW",kind:"SUPPORT / KNOWLEDGE",subtitle:"Conversations without the friction.",theme:"mellow"},
  {id:"restaurant" as Work,number:"03",name:"SORELLE",kind:"HOSPITALITY / BOOKING",subtitle:"A table worth coming back for.",theme:"sorelle"},
  {id:"automation" as Work,number:"04",name:"FLOWSTATE",kind:"WORKFLOW / DATA",subtitle:"Give every hour a little more room.",theme:"flowstate"}
 ];
 const goto=(idx:number)=>{const el=scrollRef.current;if(!el)return;const next=(idx+projects.length)%projects.length;const card=el.querySelector<HTMLElement>(".editorial-slide");if(!card)return;const gap=parseFloat(getComputedStyle(el).columnGap)||24;el.scrollTo({left:next*(card.offsetWidth+gap),behavior:"smooth"});setIndex(next)};
 useEffect(()=>{const mq=window.matchMedia("(prefers-reduced-motion: reduce)");if(mq.matches)return;const timer=window.setInterval(()=>{if(!paused.current&&!document.hidden){setIndex(i=>{const next=(i+1)%4;const el=scrollRef.current;const card=el?.querySelector<HTMLElement>(".editorial-slide");if(el&&card){const gap=parseFloat(getComputedStyle(el).columnGap)||24;el.scrollTo({left:next*(card.offsetWidth+gap),behavior:"smooth"})}return next})}},7000);return()=>window.clearInterval(timer)},[]);
 return <div className="editorial-carousel" onMouseEnter={()=>{paused.current=true}} onMouseLeave={()=>{paused.current=false}} onFocusCapture={()=>{paused.current=true}} onBlurCapture={()=>{paused.current=false}}>
  <div className="editorial-controls"><div className="editorial-counter"><strong>0{index+1}</strong><span>/ 04</span></div><div className="carousel-buttons"><button type="button" aria-label="Previous project" onClick={()=>goto(index-1)}><ChevronLeft size={21}/></button><button type="button" aria-label="Next project" onClick={()=>goto(index+1)}><ChevronRight size={21}/></button></div></div>
  <div className="editorial-track" ref={scrollRef} aria-label="Portfolio projects" onScroll={()=>{const el=scrollRef.current;const first=el?.querySelector<HTMLElement>(".editorial-slide");if(el&&first){const gap=parseFloat(getComputedStyle(el).columnGap)||24;const next=Math.round(el.scrollLeft/(first.offsetWidth+gap));setIndex(Math.min(3,Math.max(0,next)))}}}>
  {projects.map(p=><article className={"editorial-slide slide-"+p.theme} key={p.id}>
   <div className="editorial-poster">
    <div className="poster-meta"><span>NORTHSTAR / CASE {p.number}</span><span>{p.kind}</span></div>
    {p.id==="crm"&&<div className="poster-crm"><div className="poster-crm-side"><span className="poster-symbol">M.</span><span>Overview<br/>Revenue<br/>Customers<br/>Insights</span></div><div className="poster-crm-main"><small>Business intelligence / 2026</small><b>Everything.<br/>Under control.</b><div className="poster-stat"><span>NET REVENUE</span><strong>$128,420</strong><span className="poster-progress"><i/></span></div></div></div>}
    {p.id==="support"&&<div className="poster-support"><div className="support-orb"><span className="orb-core"/></div><div className="poster-support-chat"><small>mellow / inbox</small><div>What can we help you with?</div><div>Let's find your answer.</div><div>Right here, right now.</div></div><div className="poster-support-title">A LITTLE<br/>MORE HUMAN.</div></div>}
    {p.id==="restaurant"&&<div className="poster-restaurant"><div className="restaurant-photo" role="img" aria-label="Warm restaurant interior by Brooke Balentine on Unsplash"/><div className="restaurant-photo-shade"/><span className="restaurant-monogram">S.</span><strong>AN EVENING<br/>WELL SPENT.</strong><span className="restaurant-credit">PHOTOGRAPHY: BROOKE BALENTINE / UNSPLASH</span></div>}
    {p.id==="automation"&&<div className="poster-flow"><div className="flow-giant">F</div><div className="flow-pipeline"><div>01 <span>IMPORT</span><Check size={17}/></div><div>02 <span>PROCESS</span><Check size={17}/></div><div>03 <span>EXPORT</span><ArrowUpRight size={18}/></div></div><span className="poster-flow-title">LESS REPETITION.<br/>MORE POSSIBILITY.</span></div>}
   </div>
   <div className="editorial-slide-footer"><div><span className="slide-eyebrow">{p.kind}</span><h3>{p.name}<span className="slide-dot">.</span></h3><p>{p.subtitle}</p></div><button className="slide-action" onClick={()=>onExplore(p.id)} aria-label={"Explore "+p.name}><ArrowUpRight size={24}/></button></div>
  </article>)}
  </div>
  <div className="carousel-progress" aria-label="Carousel position">{projects.map((p,i)=><button type="button" key={p.id} aria-label={"Go to project "+(i+1)} className={index===i?"active":""} onClick={()=>goto(i)} />)}</div>
 </div>
}
function ScrollEffects(){
 useEffect(()=>{
  if(!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const targets=document.querySelectorAll<HTMLElement>(".hero-copy, .hero-visual, .section-title, .editorial-carousel, .showcase-title, .showcase-app, .approach-lead, .studio-principles-heading, .studio-principles-body, .contact-topline, .contact-wrap h2, .contact-end, .footer-heading, .footer-column");
  const observer=new IntersectionObserver((entries)=>{
    for(const entry of entries){
      entry.target.classList.toggle("reveal-visible",entry.isIntersecting);
    }
  },{threshold:0,rootMargin:"12% 0px 12% 0px"});
  targets.forEach((el,index)=>{
    el.classList.add("reveal-candidate");
    el.style.setProperty("--reveal-delay",(index%3)*55+"ms");
    const rect=el.getBoundingClientRect();
    if(rect.top<window.innerHeight*1.12&&rect.bottom> -window.innerHeight*.12)el.classList.add("reveal-visible");
    observer.observe(el);
  });
  return()=>{observer.disconnect();targets.forEach(el=>{el.classList.remove("reveal-candidate","reveal-visible");el.style.removeProperty("--reveal-delay")})};
 },[]);
 return null;
}
type ThemeName="forest-citron"|"white-green";
const technologyStack=[
 {label:"Next.js",Icon:SiNextdotjs},{label:"TypeScript",Icon:SiTypescript},{label:"React",Icon:SiReact},
 {label:"Python",Icon:SiPython},{label:"JavaScript",Icon:SiJavascript},{label:"Node.js",Icon:SiNodedotjs},
 {label:"HTML5",Icon:SiHtml5},{label:"CSS3",Icon:SiCss},{label:"PostgreSQL",Icon:SiPostgresql},{label:"Docker",Icon:SiDocker}
];
function TechTicker(){
 const groups=[0,1];
 return <section className="trust-strip tech-marquee" aria-label="Technologies we work with">
  <div className="tech-marquee-meta"><span className="eyebrow">OUR TOOLKIT</span><strong>ENGINEERED WITH INTENTION</strong></div>
  <div className="tech-mask"><div className="tech-rail">
   {groups.map(copy=><div className="tech-group" key={copy} aria-hidden={copy===1?"true":undefined}>
    {technologyStack.map(({label,Icon})=><div className="tech-chip" key={label}><Icon aria-hidden="true"/><strong>{label}</strong></div>)}
   </div>)}
  </div></div>
 </section>;
}
function ThemeToggle({theme,onChange}:{theme:ThemeName,onChange:(theme:ThemeName)=>void}){
 return <div className="theme-toggle" role="group" aria-label="Choose site color theme">
  <button type="button" className={theme==="forest-citron"?"is-active":""} aria-pressed={theme==="forest-citron"} onClick={()=>onChange("forest-citron")} title="Forest and Citron color palette"><span className="theme-swatch citron-swatch"/> Forest</button>
  <button type="button" className={theme==="white-green"?"is-active":""} aria-pressed={theme==="white-green"} onClick={()=>onChange("white-green")} title="White and Dark Green color palette"><span className="theme-swatch green-swatch"/> White</button>
 </div>;
}
function MotionTicker(){return <div className="motion-ticker" aria-hidden="true"><div className="ticker-run">{Array.from({length:4},(_,i)=><span key={i}>DESIGN <span>✳</span> DEVELOPMENT <span>✳</span> DETAILS MATTER <span>✳</span> </span>)}</div></div>}
export default function Home(){const [active,setActive]=useState<Work>("crm");const [mobile,setMobile]=useState(false);const [headerVisible,setHeaderVisible]=useState(true);const [theme,setTheme]=useState<ThemeName>("forest-citron");useEffect(()=>{try{const saved=localStorage.getItem("northstar-color-theme");if(saved==="white-green"){setTheme("white-green");document.documentElement.dataset.theme="white-green"}else document.documentElement.dataset.theme="forest-citron"}catch{document.documentElement.dataset.theme="forest-citron"}},[]);const changeTheme=(next:ThemeName)=>{setTheme(next);document.documentElement.dataset.theme=next;try{localStorage.setItem("northstar-color-theme",next)}catch{}};useEffect(()=>{let last=window.scrollY;const onScroll=()=>{const y=window.scrollY;if(y<100||y<last-9)setHeaderVisible(true);else if(y>180&&y>last+5)setHeaderVisible(false);if(Math.abs(y-last)>5)last=y};window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll)},[]);function open(name:Work){setActive(name);document.getElementById("showcase")?.scrollIntoView({behavior:"smooth",block:"start"})}return <><ScrollEffects/><header className={"site-header "+(headerVisible?"header-revealed":"header-concealed")}><div className="container navigation"><a className="logo" href="#" aria-label="Northstar home"><IconMark/> northstar<span>.</span></a><nav className={mobile?"navigation-links open":"navigation-links"}><a onClick={()=>setMobile(false)} href="#about">About</a><a onClick={()=>setMobile(false)} href="#work">Selected work</a><a onClick={()=>setMobile(false)} href="#showcase">Live showcase</a><a onClick={()=>setMobile(false)} href="#contact">Contact</a></nav><div className="nav-actions"><ThemeToggle theme={theme} onChange={changeTheme}/><a href="#contact" className="primary nav-cta">Let&apos;s work together <ArrowUpRight size={16}/></a><button className="mobile-menu" aria-label="Toggle menu" onClick={()=>setMobile(!mobile)}>{mobile?<X size={22}/>:<Menu size={22}/>}</button></div></div></header><main><section className="hero container" id="about"><div className="hero-copy"><div className="hero-badge"><span className="badge-spark"><span className="badge-square"/></span> AVAILABLE FOR CREATIVE COLLABORATIONS <span className="badge-pulse"/></div><h1>DESIGN THAT<br/><em>HITS DIFFERENT<span>.</span></em></h1><p>Four bold digital products. Real interfaces. Real interactions. No filler — just design that works.</p><div className="hero-buttons"><a className="primary" href="#work">Explore our work <ArrowUpRight size={18}/></a><a className="text-link" href="#showcase"><span className="play-circle"><Play size={13} fill="currentColor"/></span> Experience the demos</a></div><div className="hero-social"><div className="avatars"><span>01</span><span>02</span><span>03</span></div><div><strong>04 INTERACTIVE PRODUCTS</strong><small>Built to be explored, not just seen</small></div></div></div><HeroVisual/></section><TechTicker/><section className="work-section" id="work"><div className="container"><div className="work-header"><SectionTitle eyebrow="01 / SELECTED WORK" title="THE WORK. THE DETAILS." desc="Every project has a point of view. Discover four independently designed digital experiences, each with a working demonstration."/><div className="work-side-note">HANDPICKED<br/>DIGITAL EXPERIENCES<br/>2026 — NORTHSTAR</div></div></div><ProjectCarousel onExplore={open}/></section><section className="showcase-section" id="showcase"><div className="container"><div className="showcase-title"><div><span className="eyebrow">02 / THE PLAYGROUND</span><h2>REAL WORK.<br/><em>REAL INTERACTION.</em></h2><p>Great products are meant to be used — not just looked at. Every demo below actually works.</p></div><span className="showcase-seal"><MousePointer2 size={18}/> INTERACTIVE<br/>PLAYGROUND</span></div><div className="showcase-tabs">{works.map(([id,title],i)=><button key={id} className={active===id?"selected":""} onClick={()=>setActive(id)}><span>0{i+1}</span>{title}{active===id&&<ArrowUpRight size={15}/>}</button>)}</div><div className="showcase-app" key={active}>{demos[active]}</div><p className="showcase-disclaimer">These are functional portfolio demos, not customer-facing production services. Sample data is illustrative.</p></div></section><StudioPrinciples/><MotionTicker/><section className="contact-section" id="contact"><div className="container contact-wrap"><div className="contact-topline"><span>04 / HAVE SOMETHING IN MIND?</span><span>INDEPENDENT DIGITAL STUDIO / WORLDWIDE</span></div><span className="eyebrow">LET'S BUILD SOMETHING PEOPLE REMEMBER</span><h2>THE NEXT<br/><em>GOOD THING.</em></h2><div className="contact-end"><p>Beautifully built. Thoughtfully engineered.<br/>See the work. Start a conversation.</p><a href="https://github.com/Akopyan0" target="_blank" rel="noopener noreferrer" className="contact-round" aria-label="Visit GitHub"><ArrowUpRight size={38}/></a></div></div></section></main><footer className="site-footer"><div className="container"><div className="footer-main"><div className="footer-heading"><a href="#" className="footer-wordmark">NORTHSTAR<span>®</span></a><p>Design-forward digital products.<br/>Built for people, made to last.</p></div><div className="footer-column"><span>EXPLORE</span><a href="#about">Studio <ArrowUpRight size={14}/></a><a href="#work">Work <ArrowUpRight size={14}/></a><a href="#showcase">Live demos <ArrowUpRight size={14}/></a></div><div className="footer-column"><span>CONNECT</span><a href="https://github.com/Akopyan0" target="_blank" rel="noopener noreferrer"><Github size={19}/> GitHub <ArrowUpRight size={14}/></a><a href="https://github.com/Akopyan0/Northstar---Portfolio" target="_blank" rel="noopener noreferrer"><Layers size={17}/> Source code <ArrowUpRight size={14}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} NORTHSTAR STUDIO</span><span>BUILT WITH NEXT.JS & TYPESCRIPT</span><a href="#about">BACK TO TOP <ArrowUpRight size={15}/></a></div></div></footer></>}