"use client";
import {useState} from "react";
import {ArrowUpRight,Check,Compass,Code2} from "lucide-react";

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
 const chapter=chapters.find(c=>c.id===selected);
 return <div className={"principle-art principle-art--"+selected}>
  <div className="principle-art-top"><span>NORTHSTAR / DESIGN NOTES</span><span>{details[selected].accent}</span></div>
  <div className="principle-art-visual editorial-study" key={selected}>
   {selected==="intent"&&<div className="study-type" aria-label="Typographic hierarchy and spacing study">
     <div className="study-type-top"><span>01 / VISUAL HIERARCHY</span><span>FORM FOLLOWS INTENTION</span></div>
     <div className="study-type-layout">
      <span className="study-type-vertical">DESIGN SYSTEM / EXERCISE NO. 01</span>
      <div className="study-type-composition"><small>A NORTHSTAR DESIGN STUDY</small><strong>LESS,<br/><em>BUT</em> BETTER<span>.</span></strong><p>Every element needs a purpose.<br/>Every space needs room to breathe.</p></div>
      <div className="study-type-scale"><span>01</span><span>64</span><span>16</span><span>08</span></div>
     </div>
     <div className="study-type-bottom"><span>HIERARCHY</span><span>CONTRAST</span><span>RHYTHM</span><span>CLARITY</span></div>
    </div>}
   {selected==="craft"&&<div className="study-craft" aria-label="Engineering craft illustrated by an actual product interface layout">
     <div className="study-craft-head"><span>02 / A PRODUCT THAT WORKS</span><span>FUNCTION OVER FRICTION</span></div>
     <div className="study-craft-window">
      <div className="study-craft-sidebar"><b>N.</b><span>01</span><span>02</span><span>03</span></div>
      <div className="study-craft-dashboard"><div className="study-craft-caption"><span>WORKSPACE / OVERVIEW</span><span>● LIVE DEMO</span></div>
       <strong>Clear data.<br/>Better choices.</strong>
       <div className="study-craft-line"><span>PIPELINE HEALTH</span><span>82%</span></div>
       <div className="study-craft-progress"><span/></div>
       <div className="study-craft-foot"><span>01 / RESEARCH</span><span>02 / DESIGN</span><span>03 / BUILD</span></div>
      </div>
     </div>
     <div className="study-craft-bottom"><span>DESIGN</span><span>+</span><span>ENGINEERING</span><span>=</span><strong>USEFUL</strong></div>
    </div>}
   {selected==="growth"&&<div className="study-growth" aria-label="Visual product roadmap from prototype to scalable system">
     <div className="study-growth-head"><span>03 / BUILT FOR WHAT'S NEXT</span><span>PRODUCT EVOLUTION</span></div>
     <div className="study-growth-hero"><span>FROM FIRST IDEA<br/>TO WHAT COMES NEXT</span><strong>EVOLVE<span>.</span></strong></div>
     <div className="study-growth-track">
      <div><span>01 / START</span><strong>Idea</strong><small>A focused first version</small></div>
      <div><span>02 / SHAPE</span><strong>Product</strong><small>Designed around people</small></div>
      <div><span>03 / EXPAND</span><strong>System</strong><small>Room for what follows</small></div>
     </div>
     <div className="study-growth-footer"><span>DESIGNED TO ADAPT</span><span>NOT JUST TO LAUNCH</span></div>
    </div>}
  </div>
  <div className="principle-art-caption"><span>STUDY {chapter?.number} / {chapter?.tag}</span><span className="principle-art-signal"><span/> DESIGNED WITH INTENT</span></div>
 </div>;
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
