"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";

/**
 * Reveals section content when it enters view, both scrolling down and up.
 * Only decorates content after mount: no layout changes, no hidden content
 * when scripts are unavailable, and reduced-motion settings are respected.
 */
export default function SectionMotion(){
 const pathname=usePathname();
 useEffect(()=>{
  if(typeof window==="undefined"||!("IntersectionObserver" in window))return;
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const selector=[
   ".work-header",
   ".showcase-title",
   ".showcase-app",
   ".studio-principles-heading",
   ".studio-principles-body",
   ".contact-topline",
   ".contact-wrap h2",
   ".studio-page .inner-hero-content",
   ".studio-page .inner-hero-art",
   ".studio-page .page-section-head",
   ".studio-page .feature-system",
   ".studio-page .cases-grid",
   ".studio-page .price-cards",
   ".studio-page .service-links",
   ".studio-page .process-steps",
   ".studio-page .case-visual-story"
  ].join(",");
  let items:HTMLElement[]=[];
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    entry.target.classList.toggle("is-inview",entry.isIntersecting);
   }
  },{threshold:0.06,rootMargin:"5% 0px -8% 0px"});
  const frame=requestAnimationFrame(()=>{
   items=Array.from(document.querySelectorAll<HTMLElement>(selector));
   for(const item of items){
    const rect=item.getBoundingClientRect();
    item.classList.add("reveal-on-scroll");
    if(rect.top<window.innerHeight*.97&&rect.bottom>window.innerHeight*.03)item.classList.add("is-inview");
    observer.observe(item);
   }
  });
  return()=>{
   cancelAnimationFrame(frame);
   observer.disconnect();
   for(const item of items)item.classList.remove("reveal-on-scroll","is-inview");
  };
 },[pathname]);
 return null;
}
