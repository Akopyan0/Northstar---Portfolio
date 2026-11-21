import {notFound} from "next/navigation";
import type {Metadata} from "next";
import StudioPage from "../StudioPage";
import {pageRegistry,allPages} from "../portfolio-pages";

type Params={params:Promise<{slug:string}>};
export function generateStaticParams(){return allPages.map(p=>({slug:p.slug}));}
export const dynamicParams=false;
export async function generateMetadata({params}:Params):Promise<Metadata>{
 const {slug}=await params;
 const page=pageRegistry[slug];
 if(!page)return {title:"Page not found"};
 const url="/"+slug;
 return {
  title:page.accent,
  description:page.intro,
  alternates:{canonical:url},
  openGraph:{
   type:"website",url,siteName:"Northstar Studio",
   title:page.accent+" — Northstar Studio",description:page.intro,
   images:[{url:"/opengraph-image",width:1200,height:630,alt:"Northstar Studio — Design that hits different"}]
  },
  twitter:{card:"summary_large_image",title:page.accent+" — Northstar Studio",description:page.intro,images:["/opengraph-image"]}
 };
}
export default async function Page({params}:Params){
 const {slug}=await params;const page=pageRegistry[slug];if(!page)notFound();
 return <StudioPage spec={page}/>;
}
