import type {MetadataRoute} from "next";
export default function robots():MetadataRoute.Robots{
 return {rules:[{userAgent:"*",allow:"/",disallow:"/api/"}],sitemap:"https://northstar-portfolio-studio.vercel.app/sitemap.xml"};
}
