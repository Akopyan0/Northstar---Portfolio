"use client";
import {useState} from "react";
import {ArrowUpRight,Check,Compass,Code2,GitBranch} from "lucide-react";

type Principle="intent"|"craft"|"growth";
const chapters: {id:Principle;number:string;name:string;sub:string;tag:string}[]=[
 {id:"intent",number:"01",name:"Design with purpose",sub:"Clarity is the starting point, not an afterthought.",tag:"VISUAL SYSTEM"},
 {id:"craft",number:"02",name:"Build what matters",sub:"Small technical decisions create better experiences.",tag:"ENGINEERING"},
 {id:"growth",number:"03",name:"Leave room to evolve",sub:"The best ideas can grow without starting over.",tag:"PRODUCT THINKING"}
];
const details:Record<Principle,{headline:string;description:string;accent:string}>={
 intent:{headline:"Give every detail a reason.",description:"Interfaces should be instantly understandable, without sacrificing character.",accent:"FORM / FUNCTION"},
 craft:{headline:"Make the complex feel simple.",description:"From state and data to animation and accessibility: the invisible work matters.",accent:"DESIGN / ENGINEERING"},
 growth:{headline:"Designed for what comes next.",description:"Flexible patterns and intentional foundations help products mature.",accent:"TODAY / TOMORROW"}
};
function PrincipleArtwork({selected}:{selected:Principle}){
 return <div className={"principle-art principle-art--"+selected}>
   <div className="principle-art-top"><span>NS—STUDIO / STUDIES</span><span>{details[selected].accent}</span></div>
   <div className="principle-art-visual" key={selected}>
   {selected==="intent"&&<svg viewBox="0 0 560 296" role="img" aria-label="Precision layout study: geometric circles intersect on a measured grid">
      <defs><pattern id="ns-grid-intent" width="29" height="29" patternUnits="userSpaceOnUse"><path d="M29 0H0V29" fill="none" stroke="currentColor" strokeOpacity=".16" strokeWidth=".65"/></pattern></defs>
      <rect x="1" y="1" width="558" height="294" fill="url(#ns-grid-intent)"/>
      <circle className="art-ring art-ring-a" cx="272" cy="145" r="111" fill="none" stroke="currentColor" strokeOpacity=".5" strokeWidth="1.3"/>
      <circle className="art-ring art-ring-b" cx="272" cy="145" r="77" fill="none" stroke="currentColor" strokeOpacity=".6" strokeWidth="1.3"/>
      <circle className="art-ring art-ring-c" cx="272" cy="145" r="43" fill="none" stroke="var(--citron)" strokeWidth="4"/>
      <path className="art-draw" d="M115 145H429M272 0V296" fill="none" stroke="currentColor" strokeOpacity=".6"/>
      <path className="art-draw" d="M185 59L358 232M358 59L185 232" fill="none" stroke="var(--citron)" strokeOpacity=".8" strokeWidth="1.8"/>
      <rect x="242" y="115" width="60" height="60" rx="3" fill="var(--citron)" stroke="var(--citron)"/>
      <path d="M256 146h32M272 130v32" stroke="var(--forest)" strokeWidth="2"/>
      <circle cx="272" cy="145" r="127" stroke="currentColor" strokeOpacity=".25" strokeDasharray="3 8" fill="none"/>
      <text x="25" y="40" className="principle-art-svg-label">GRID / 01</text><text x="437" y="267" className="principle-art-svg-label">ALIGNMENT</text>
    </svg>}
   {selected==="craft"&&<svg viewBox="0 0 560 296" role="img" aria-label="Engineering study: interconnected modules and a flowing signal">
      <defs><pattern id="ns-grid-craft" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth=".65"/></pattern></defs>
      <rect x="1" y="1" width="558" height="294" fill="url(#ns-grid-craft)"/>
      <path className="art-signal" d="M60 147H158C188 147 188 70 225 70H323C360 70 360 147 396 147H502" fill="none" stroke="var(--citron)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="10 8"/>
      <path d="M60 180H175C204 180 203 226 242 226H328C365 226 367 180 399 180H502" fill="none" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.4"/>
      <rect x="167" y="110" width="80" height="72" rx="6" fill="var(--forest-soft)" stroke="currentColor" strokeOpacity=".6"/>
      <rect x="249" y="110" width="80" height="72" rx="6" fill="var(--forest-soft)" stroke="var(--citron)" strokeWidth="1.6"/>
      <rect x="331" y="110" width="80" height="72" rx="6" fill="var(--forest-soft)" stroke="currentColor" strokeOpacity=".6"/>
      <path className="art-draw" d="M186 136h42m-42 11h26m56-11h42m-42 11h28m58-11h40m-40 11h24" stroke="currentColor" strokeWidth="2" opacity=".75"/>
      <circle className="art-pulse" cx="289" cy="147" r="10" fill="var(--citron)"/>
      <circle cx="289" cy="147" r="3" fill="var(--forest)"/>
      <text x="30" y="42" className="principle-art-svg-label">SYSTEM / 02</text><text x="419" y="271" className="principle-art-svg-label">FLOW STATE</text>
    </svg>}
   {selected==="growth"&&<svg viewBox="0 0 560 296" role="img" aria-label="Growth study: a branching architecture diagram expanding from one core">
      <defs><pattern id="ns-grid-growth" width="27" height="27" patternUnits="userSpaceOnUse"><path d="M27 0H0V27" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth=".65"/></pattern></defs>
      <rect x="1" y="1" width="558" height="294" fill="url(#ns-grid-growth)"/>
      <path className="art-draw" d="M100 148H205Q226 148 226 126V75H326M226 148H326M226 148V218H326" stroke="currentColor" strokeWidth="1.6" fill="none"/>
      <path className="art-draw" d="M355 75H445M355 148H445M355 218H445" stroke="var(--citron)" strokeWidth="2" fill="none"/>
      <rect x="73" y="119" width="70" height="58" rx="10" fill="var(--citron)"/>
      <path d="M91 148h34m-17-17v34" stroke="var(--forest)" strokeWidth="2"/>
      {[75,148,218].map((y,i)=><g key={i}><rect x="320" y={y-22} width="69" height="44" rx="8" stroke="currentColor" strokeOpacity=".9" fill="var(--forest-soft)"/><circle cx="354" cy={y} r="6" fill="var(--citron)"/><circle className="art-pulse" cx="445" cy={y} r="6" fill="var(--citron)"/></g>)}
      <path d="M463 42v202" stroke="currentColor" strokeDasharray="3 7" strokeOpacity=".25"/>
      <text x="27" y="37" className="principle-art-svg-label">SCALE / 03</text><text x="421" y="270" className="principle-art-svg-label">EVOLUTION</text>
    </svg>}
   </div>
   <div className="principle-art-caption"><span>FIG. {chapters.find(c=>c.id===selected)?.number} / A STUDY IN {selected.toUpperCase()}</span><span className="principle-art-signal"><span/> ACTIVE SYSTEM</span></div>
 </div>
}
export default function StudioPrinciples(){
 const [active,setActive]=useState<Principle>("intent");
 const item=details[active];
 return <section className="studio-principles" aria-label="Our approach to design and engineering">
  <div className="container studio-principles-shell">
   <div className="studio-principles-heading">
    <div className="studio-principles-kicker"><span className="studio-kicker-dot"/> THE STUDIO / 03</div>
    <div className="studio-principles-header-row">
      <h2>LESS NOISE.<br/><em>MORE MEANING.</em></h2>
      <p>We don't believe every website needs another floating card. We believe in a point of view, precise details, and experiences built to be used.</p>
    </div>
   </div>
   <div className="studio-principles-body">
    <div className="studio-principles-selector" role="group" aria-label="Select a design principle">
     <div className="studio-selector-heading"><span>OUR APPROACH</span><span>01 — 03</span></div>
     {chapters.map(c=><button type="button" key={c.id} onClick={()=>setActive(c.id)} className={"studio-principle-item "+(active===c.id?"is-current":"")} aria-pressed={active===c.id}>
       <span className="studio-principle-index">{c.number}</span><span className="studio-principle-content"><strong>{c.name}</strong><small>{c.sub}</small></span>
       <span className="studio-principle-action">{active===c.id?<Check size={19}/>:<ArrowUpRight size={18}/>}</span>
       <span className="studio-principle-rule"/>
     </button>)}
     <div className="studio-selector-footnote"><Compass size={18}/><span>Three principles. One consistent standard.</span></div>
    </div>
    <div className="studio-principles-visual">
      <PrincipleArtwork selected={active}/>
      <div className="studio-principles-detail" key={active}><div><span>ACTIVE STUDY / {chapters.find(c=>c.id===active)?.number}</span><h3>{item.headline}</h3><p>{item.description}</p></div><Code2 size={24} aria-hidden="true"/></div>
    </div>
   </div>
  </div>
 </section>
}
