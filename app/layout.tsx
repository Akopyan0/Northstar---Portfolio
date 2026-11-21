import type {Metadata, Viewport} from "next";
import {SiteHeader,SiteFooter} from "./SiteChrome";
import "./globals.css";
import "./atelier.css";
import "./collection.css";
import "./serene.css";
import "./forest.css";
import "./studio-motion.css";
import "./site-pages.css";
import "./gallery-next.css";
import "./design-parity.css";
import "./site-unified.css";
import "./editorial-refresh.css";
import SectionMotion from "./SectionMotion";

const origin="https://northstar-portfolio-studio.vercel.app";
const description="Northstar Studio builds design-forward digital experiences. Explore working demos of a CRM dashboard, customer support workspace, restaurant reservation concept, and data automation tools.";
export const metadata:Metadata={
 metadataBase:new URL(origin),
 applicationName:"Northstar Studio",
 title:{default:"Northstar Studio — Digital experiences that hit different",template:"%s | Northstar Studio"},
 description,
 keywords:["Northstar Studio","web design","Next.js","TypeScript","React","freelance web developer","digital product design","CRM dashboard","Python automation","website development","customer support interfaces"],
 creator:"Northstar Studio",
 publisher:"Northstar Studio",
 category:"technology",
 alternates:{canonical:"/"},
 robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1}},
 icons:{icon:[{url:"/icon.svg",type:"image/svg+xml"}],apple:[{url:"/apple-icon",sizes:"180x180"}]},
 manifest:"/manifest.webmanifest",
 openGraph:{
  type:"website",
  locale:"en_US",
  url:origin,
  siteName:"Northstar Studio",
  title:"Northstar Studio — Design-forward digital products",
  description,
  images:[{url:"/opengraph-image",width:1200,height:630,alt:"Northstar Studio — Design that hits different"}]
 },
 twitter:{card:"summary_large_image",title:"Northstar Studio — Design that hits different",description,images:["/opengraph-image"]},
 appleWebApp:{title:"Northstar Studio",capable:true,statusBarStyle:"default"}
};
export const viewport:Viewport={themeColor:"#203328",colorScheme:"light"};
const websiteSchema={
 "@context":"https://schema.org",
 "@type":"WebSite",
 name:"Northstar Studio",
 url:origin,
 description,
 inLanguage:"en",
 sameAs:["https://github.com/Akopyan0"]
};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en" data-theme="forest-citron">
  <body>
   <SiteHeader/>
   <SectionMotion/>
   {children}
   <SiteFooter/>
   <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteSchema).replace(/</g,"\\u003c")}}/>
  </body>
 </html>;
}
