import {ImageResponse} from "next/og";
export const size={width:1200,height:630};
export const contentType="image/png";
export const alt="Northstar Studio — Design-forward digital experiences";
export default function Image(){
 return new ImageResponse(
  <div style={{display:"flex",width:"100%",height:"100%",backgroundColor:"#F7F8F3",color:"#13241A",fontFamily:"sans-serif",padding:"72px",flexDirection:"column",justifyContent:"space-between",position:"relative",overflow:"hidden"}}>
   <div style={{display:"flex",alignItems:"center",gap:18,fontSize:38,fontWeight:800,letterSpacing:"-1.8px"}}>
    <div style={{display:"flex",width:64,height:64,alignItems:"center",justifyContent:"center",backgroundColor:"#203328",borderRadius:16,color:"#fff",fontSize:43,fontWeight:900}}>N</div>
    <span>northstar<span style={{color:"#2F6745"}}>.</span></span>
    <span style={{marginLeft:"auto",fontSize:15,letterSpacing:3,fontWeight:700}}>INDEPENDENT DIGITAL STUDIO / 2026</span>
   </div>
   <div style={{display:"flex",flexDirection:"column",zIndex:2}}>
    <div style={{fontWeight:800,fontSize:103,letterSpacing:-8,lineHeight:1.03}}>DESIGN THAT</div>
    <div style={{display:"flex",fontWeight:800,fontSize:103,letterSpacing:-8,lineHeight:1.03,color:"#2F503A"}}>HITS DIFFERENT<span style={{color:"#D7EF73"}}>.</span></div>
    <div style={{fontSize:26,color:"#526054",fontWeight:500,marginTop:25}}>Web experiences. Business systems. Automation.</div>
   </div>
   <div style={{display:"flex",alignItems:"center",gap:20,color:"#526054",fontSize:16,fontWeight:700,letterSpacing:1.5}}>
    <div style={{width:64,height:5,borderRadius:8,background:"#D7EF73"}}/>
    NORTHSTAR-PORTFOLIO-STUDIO.VERCEL.APP
   </div>
   <div style={{display:"flex",position:"absolute",width:360,height:360,border:"2px solid #D6DECF",borderRadius:"50%",right:-105,bottom:-105}}/>
  </div>,
  size
 );
}