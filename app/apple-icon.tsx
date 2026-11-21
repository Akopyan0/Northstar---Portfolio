import {ImageResponse} from "next/og";
export const size={width:180,height:180};
export const contentType="image/png";
export default function AppleIcon(){
 return new ImageResponse(
  <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",background:"#203328",borderRadius:36,position:"relative"}}>
   <div style={{fontSize:130,fontWeight:900,fontFamily:"sans-serif",color:"#FCFCF8",letterSpacing:-15,marginRight:12}}>N</div>
   <div style={{position:"absolute",right:19,top:19,width:20,height:20,borderRadius:"50%",background:"#D7EF73"}}/>
  </div>,size
 );
}