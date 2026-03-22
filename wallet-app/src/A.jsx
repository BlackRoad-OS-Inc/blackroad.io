import{useState,useEffect}from"react";
const C=["#FF6B2B","#FF2255","#CC00AA","#8844FF","#4488FF","#00D4FF"],G=`linear-gradient(90deg,${C.join(",")})`;
const s={bg:"#0a0a0a",s1:"#131313",bd:"#1a1a1a",t1:"#f5f5f5",t3:"#737373",t4:"#404040",mono:"'JetBrains Mono',monospace",head:"'Space Grotesk',sans-serif"};
const HISTORY=[
  {type:"received",from:"@creator_42",amount:29.00,desc:"Rider subscription",time:"2h ago"},
  {type:"sent",to:"@cadence",amount:0.50,desc:"Tip for composition #43",time:"4h ago"},
  {type:"received",from:"@system",amount:5.00,desc:"Creator reward",time:"1d ago"},
  {type:"sent",to:"@lucidia",amount:1.00,desc:"AI inference credit",time:"1d ago"},
  {type:"received",from:"@student_18",amount:19.00,desc:"RoadWork subscription",time:"2d ago"},
  {type:"received",from:"@creator_7",amount:29.00,desc:"Lucidia subscription",time:"3d ago"},
];
export default function A(){
  const[tab,setTab]=useState("overview");const[tick,setTick]=useState(0);
  useEffect(()=>{const i=setInterval(()=>setTick(t=>t+1),1000);return()=>clearInterval(i)},[]);
  const balance=82.50+tick*0.001;
  return(<div style={{background:s.bg,minHeight:"100vh",fontFamily:"'Inter',sans-serif",color:s.t1}}>
    <div style={{height:3,background:G}}/>
    <div style={{padding:20,maxWidth:500,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
        <div style={{display:"flex",gap:2}}>{C.map(c=><div key={c} style={{width:3,height:14,borderRadius:2,background:c}}/>)}</div>
        <span style={{fontFamily:s.head,fontSize:18,fontWeight:700}}>RoadCoin</span>
        <span style={{fontFamily:s.mono,fontSize:10,color:s.t4}}>Wallet</span>
      </div>
      {/* Balance card */}
      <div style={{background:G,borderRadius:16,padding:32,textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.6)",fontFamily:s.mono,textTransform:"uppercase",letterSpacing:"0.14em",marginBottom:8}}>Total Balance</div>
        <div style={{fontFamily:s.head,fontSize:42,fontWeight:700,color:"#fff"}}>{balance.toFixed(2)} <span style={{fontSize:18}}>RC</span></div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",fontFamily:s.mono,marginTop:4}}>≈ ${(balance*1).toFixed(2)} USD</div>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:20}}>
          <button style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:8,padding:"10px 24px",color:"#fff",fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:600,cursor:"pointer"}}>Send</button>
          <button style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:8,padding:"10px 24px",color:"#fff",fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:600,cursor:"pointer"}}>Receive</button>
          <button style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:8,padding:"10px 24px",color:"#fff",fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:600,cursor:"pointer"}}>Swap</button>
        </div>
      </div>
      {/* Address */}
      <div style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:10,padding:"12px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
        <div style={{fontFamily:s.mono,fontSize:10,color:s.t4}}>Address</div>
        <div style={{fontFamily:s.mono,fontSize:11,color:s.t3,flex:1}}>rc1q...amundson...7f3d</div>
        <button style={{fontFamily:s.mono,fontSize:9,color:C[0],background:"none",border:"none",cursor:"pointer"}}>copy</button>
      </div>
      {/* History */}
      <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:8}}>Transaction History</div>
      {HISTORY.map((h,i)=>(<div key={i} style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:8,padding:"12px 16px",marginBottom:4,display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:32,height:32,borderRadius:8,background:h.type==="received"?"rgba(34,197,94,0.1)":"rgba(255,34,85,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{h.type==="received"?"↓":"↑"}</div>
        <div style={{flex:1}}><div style={{fontSize:13,fontWeight:500}}>{h.desc}</div><div style={{fontFamily:s.mono,fontSize:10,color:s.t4}}>{h.type==="received"?`from ${h.from}`:`to ${h.to}`}</div></div>
        <div style={{textAlign:"right"}}><div style={{fontFamily:s.head,fontSize:14,fontWeight:600,color:h.type==="received"?"#22c55e":C[1]}}>{h.type==="received"?"+":"-"}{h.amount.toFixed(2)} RC</div><div style={{fontFamily:s.mono,fontSize:9,color:s.t4}}>{h.time}</div></div>
      </div>))}
    </div>
  </div>)
}
