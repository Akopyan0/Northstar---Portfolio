import type {MetadataRoute} from "next";
export default function manifest():MetadataRoute.Manifest{
 return {
  name:"Northstar Studio — Digital experiences",
  short_name:"Northstar",
  description:"Design-forward websites, business tools and interactive digital product demos.",
  start_url:"/",
  display:"standalone",
  background_color:"#f7f8f3",
  theme_color:"#203328",
  icons:[{src:"/icon.svg",sizes:"any",type:"image/svg+xml",purpose:"any"}]
 };
}