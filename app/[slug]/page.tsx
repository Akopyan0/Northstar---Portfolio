import {notFound} from "next/navigation";
import type {Metadata} from "next";
import StudioPage from "../StudioPage";
import {pageRegistry,allPages} from "../portfolio-pages";

type Params={params:Promise<{slug:string}>};
export function generateStaticParams(){return allPages.map(p=>({slug:p.slug}));}
export const dynamicParams=false;
export async function generateMetadata({params}:Params):Promise<Metadata>{
 const {slug}=await params;const page=pageRegistry[slug];
 if(!page)return {title:"Page not found | Northstar Studio"};
 return {title:page.accent+" | Northstar Studio",description:page.intro,openGraph:{title:page.accent+" — Northstar Studio",description:page.intro,type:"website"}};
}
export default async function Page({params}:Params){
 const {slug}=await params;const page=pageRegistry[slug];if(!page)notFound();
 return <StudioPage spec={page}/>;
}
