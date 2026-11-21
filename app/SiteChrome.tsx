"use client";

import Link from "next/link";
import {useEffect,useState} from "react";
import {usePathname} from "next/navigation";
import {ArrowUpRight, Github, Layers, Mail, Menu, X, MessageCircle} from "lucide-react";

/** One header and one footer for the complete site, including the homepage. */
export function SiteHeader(){
 const pathname=usePathname();
 const [mobile,setMobile]=useState(false);
 const [visible,setVisible]=useState(true);
 useEffect(()=>{
  // The former white/green experiment is retired site-wide.
  document.documentElement.dataset.theme="forest-citron";
  try{localStorage.removeItem("northstar-color-theme")}catch{}
 },[]);
 useEffect(()=>{
  let previous=window.scrollY;
  const onScroll=()=>{
   const current=window.scrollY;
   if(current<100||current<previous-9)setVisible(true);
   else if(current>180&&current>previous+5)setVisible(false);
   if(Math.abs(current-previous)>5)previous=current;
  };
  window.addEventListener("scroll",onScroll,{passive:true});
  return()=>window.removeEventListener("scroll",onScroll);
 },[]);
 useEffect(()=>setMobile(false),[pathname]);
 const items=[
  {href:"/",label:"Home"},
  {href:"/services",label:"Services"},
  {href:"/work",label:"Portfolio"},
  {href:"/pricing",label:"Pricing"},
  {href:"/#showcase",label:"Live demos"},
  {href:"/studio",label:"Studio"},
  {href:"/contact",label:"Contact"},
 ];
 return <header className={"site-header "+(visible?"header-revealed":"header-concealed")}>
  <div className="container navigation">
   <Link className="logo" href="/" aria-label="Northstar Studio — Home">
    <span className="mark" aria-hidden="true"><span className="mark-star">N</span></span>
    northstar<span>.</span>
   </Link>
   <nav id="northstar-main-navigation" aria-label="Main navigation" className={mobile?"navigation-links open":"navigation-links"}>
    {items.map(item=><Link key={item.href} href={item.href} onClick={()=>setMobile(false)} aria-current={pathname===item.href||(item.href==="/work"&&pathname.startsWith("/case-"))?"page":undefined}>{item.label}</Link>)}
   </nav>
   <div className="nav-actions">
    <Link href="/contact" className="primary nav-cta" onClick={()=>setMobile(false)}>Let&apos;s work together <ArrowUpRight size={16}/></Link>
    <button type="button" className="mobile-menu" onClick={()=>setMobile(v=>!v)} aria-label={mobile?"Close navigation":"Open navigation"} aria-controls="northstar-main-navigation" aria-expanded={mobile}>{mobile?<X size={22}/>:<Menu size={22}/>}</button>
   </div>
  </div>
 </header>;
}

export function SiteFooter(){
 return <footer className="site-footer">
  <div className="container">
   <div className="footer-main">
    <div className="footer-heading">
     <Link href="/" className="footer-wordmark" aria-label="Northstar Studio home">NORTHSTAR<span>®</span></Link>
     <p>Design-forward digital products.<br/>Built for people, made to last.</p>
    </div>
    <nav className="footer-column" aria-label="Explore pages">
     <span>MORE TO EXPLORE</span>
     <Link href="/services">Services <ArrowUpRight size={14}/></Link>
     <Link href="/work">Portfolio <ArrowUpRight size={14}/></Link>
     <Link href="/pricing">Pricing <ArrowUpRight size={14}/></Link>
     <Link href="/process">Process <ArrowUpRight size={14}/></Link>
     <Link href="/legal">Legal <ArrowUpRight size={14}/></Link>
    </nav>
    <nav className="footer-column" aria-label="Contact and social links">
     <span>GET IN TOUCH</span>
     <Link href="/contact"><Mail size={18}/> Contact <ArrowUpRight size={14}/></Link>
     <a href="https://github.com/Akopyan0" target="_blank" rel="noopener noreferrer"><Github size={18}/> GitHub <ArrowUpRight size={14}/></a>
     <a href="https://github.com/Akopyan0/Northstar---Portfolio/issues/new" target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/> Project inquiry <ArrowUpRight size={14}/></a>
     <a href="https://github.com/Akopyan0/Northstar---Portfolio" target="_blank" rel="noopener noreferrer"><Layers size={18}/> Source code <ArrowUpRight size={14}/></a>
    </nav>
   </div>
   <div className="footer-bottom">
    <span>© {new Date().getFullYear()} NORTHSTAR STUDIO</span>
    <span>BUILT WITH NEXT.JS & TYPESCRIPT</span>
    <a href="#top" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:"smooth"})}}>BACK TO TOP <ArrowUpRight size={15}/></a>
   </div>
  </div>
 </footer>;
}
