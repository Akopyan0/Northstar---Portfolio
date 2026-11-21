import type { Metadata } from "next";
import "./globals.css";
import "./premium.css";
import "./bold.css";
import "./atelier.css";
export const metadata: Metadata = {title:"Northstar — Digital experiences, designed with purpose",description:"A curated portfolio of thoughtful products: CRM, customer support, restaurant booking and workflow automation.",openGraph:{title:"Northstar — Digital Product Studio",description:"Beautiful websites and tools that work.",type:"website"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
