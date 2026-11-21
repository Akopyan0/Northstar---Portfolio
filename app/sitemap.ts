import type {MetadataRoute} from "next";
import {allPages} from "./portfolio-pages";
const origin="https://northstar-portfolio-studio.vercel.app";
export default function sitemap():MetadataRoute.Sitemap{
 return [{url:origin+"/",changeFrequency:"monthly",priority:1},
 ...allPages.map(page=>({url:origin+"/"+page.slug,changeFrequency:"monthly" as const,priority:["services","pricing","work","contact"].includes(page.slug)?0.85:0.6}))];
}
