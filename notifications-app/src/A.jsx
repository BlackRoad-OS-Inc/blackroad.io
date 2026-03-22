import{useState,useEffect}from"react";
const C=["#FF6B2B","#FF2255","#CC00AA","#8844FF","#4488FF","#00D4FF"],G=`linear-gradient(90deg,${C.join(",")})`;
const s={bg:"#0a0a0a",s1:"#131313",bd:"#1a1a1a",t1:"#f5f5f5",t3:"#737373",t4:"#404040",mono:"'JetBrains Mono',monospace",head:"'Space Grotesk',sans-serif"};
const NOTIFS=[
  {type:"deploy",agent:"meridian",msg:"19 CF Workers updated with SEO fixes",time:"2m ago",read:false,color:C[0]},
  {type:"agent",agent:"lucidia",msg:"Memory commit #1,660 — conversation persisted",time:"5m ago",read:false,color:C[1]},
  {type:"fleet",agent:"eve",msg:"All 7 nodes responding. Octavia load: 9.5",time:"10m ago",read:false,color:"#22c55e"},
  {type:"build",agent:"cadence",msg:"SoundRoad Studio deployed — composition #43 exported",time:"15m ago",read:true,color:C[2]},
  {type:"finance",agent:"mercury",msg:"Stripe webhook: test charge -$0.20",time:"30m ago",read:true,color:C[3]},
  {type:"security",agent:"cipher",msg:"SSH key audit passed. 3 keys on all 7 nodes",time:"1h ago",read:true,color:C[4]},
  {type:"collab",agent:"cece",msg:"COLLAB: 5 sessions active, 0 pending handoffs",time:"1h ago",read:true,color:C[5]},
  {type:"spawn",agent:"system",msg:"30,000 agents spawned: 10K general + 10K specialized + 10K micro",time:"2h ago",read:true,color:C[0]},
  {type:"audit",agent:"meridian",msg:"Full repo audit: 254 repos, 22.9GB, 86 Road products",time:"3h ago",read:true,color:C[4]},
  {type:"brand",agent:"calliope",msg:"100/100 templates chromatic. Zero non-chromatic.",time:"4h ago",read:true,color:C[2]},
];
export default function A(){
  const[filter,setFilter]=useState("all");const[notifs,setNotifs]=useState(NOTIFS);const[tick,setTick]=useState(0);
  useEffect(()=>{const i=setInterval(()=>setTick(t=>t+1),5000);return()=>clearInterval(i)},[]);
  const filtered=filter==="all"?notifs:filter==="unread"?notifs.filter(n=>!n.read):notifs.filter(n=>n.type===filter);
  return(<div style={{background:s.bg,minHeight:"100vh",fontFamily:"'Inter',sans-serif",color:s.t1}}>
    <div style={{height:3,background:G}}/>
    <div style={{padding:20,maxWidth:600,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <div style={{display:"flex",gap:2}}>{C.map(c=><div key={c} style={{width:3,height:14,borderRadius:2,background:c}}/>)}</div>
        <span style={{fontFamily:s.head,fontSize:18,fontWeight:700}}>Notifications</span>
        <span style={{fontFamily:s.mono,fontSize:10,color:C[1],marginLeft:8,background:"rgba(255,34,85,0.1)",padding:"2px 8px",borderRadius:10}}>{notifs.filter(n=>!n.read).length} new</span>
      </div>
      <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,marginBottom:16}}>Cross-agent alerts · Live</div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
        {["all","unread","deploy","agent","fleet","build","security"].map(f=>(<button key={f} onClick={()=>setFilter(f)} style={{fontFamily:s.mono,fontSize:9,textTransform:"uppercase",letterSpacing:"0.08em",color:filter===f?s.t1:s.t4,background:filter===f?s.s1:"transparent",border:`1px solid ${s.bd}`,borderRadius:4,padding:"4px 10px",cursor:"pointer"}}>{f}</button>))}
      </div>
      {filtered.map((n,i)=>(<div key={i} onClick={()=>setNotifs(notifs.map((nn,j)=>j===NOTIFS.indexOf(n)?{...nn,read:true}:nn))} style={{background:n.read?s.s1:s.bg,border:`1px solid ${n.read?s.bd:n.color+"33"}`,borderLeft:`3px solid ${n.color}`,borderRadius:8,padding:"12px 16px",marginBottom:4,cursor:"pointer",opacity:n.read?0.7:1}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
          <span style={{fontFamily:s.mono,fontSize:10,color:n.color,fontWeight:500}}>{n.agent}</span>
          <span style={{fontFamily:s.mono,fontSize:9,color:s.t4,background:s.bg,padding:"1px 6px",borderRadius:3}}>{n.type}</span>
          <span style={{marginLeft:"auto",fontFamily:s.mono,fontSize:9,color:s.t4}}>{n.time}</span>
          {!n.read&&<div style={{width:6,height:6,borderRadius:"50%",background:n.color}}/>}
        </div>
        <div style={{fontSize:13,color:n.read?s.t3:s.t1,lineHeight:1.5}}>{n.msg}</div>
      </div>))}
    </div>
  </div>)
}
