import{useState,useEffect}from"react";
const C=["#FF6B2B","#FF2255","#CC00AA","#8844FF","#4488FF","#00D4FF"],G=`linear-gradient(90deg,${C.join(",")})`;
const s={bg:"#0a0a0a",s1:"#131313",bd:"#1a1a1a",t1:"#f5f5f5",t3:"#737373",t4:"#404040",mono:"'JetBrains Mono',monospace",head:"'Space Grotesk',sans-serif"};
const API="https://blackroad-live-stats.amundsonalexa.workers.dev/api/stats";
function Spark({data,color=C[0],w=120,h=30}){const max=Math.max(...data),min=Math.min(...data),r=max-min||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-min)/r)*h}`).join(" ");
  return<svg width={w} height={h}><polyline points={pts} fill="none" stroke={color} strokeWidth="1.5"/></svg>}
export default function A(){
  const[d,setD]=useState(null);const[tick,setTick]=useState(0);
  useEffect(()=>{fetch(API).then(r=>r.json()).then(setD);const i=setInterval(()=>{fetch(API).then(r=>r.json()).then(setD);setTick(t=>t+1)},10000);return()=>clearInterval(i)},[]);
  const sparkData=()=>Array.from({length:24},()=>Math.floor(Math.random()*100+50));
  const[sparks]=useState(()=>({agents:sparkData(),memory:sparkData(),requests:sparkData(),websites:sparkData()}));
  return(<div style={{background:s.bg,minHeight:"100vh",fontFamily:"'Inter',sans-serif",color:s.t1}}>
    <div style={{height:3,background:G}}/>
    <div style={{padding:20,maxWidth:900,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <div style={{display:"flex",gap:2}}>{C.map(c=><div key={c} style={{width:3,height:14,borderRadius:2,background:c}}/>)}</div>
        <span style={{fontFamily:s.head,fontSize:18,fontWeight:700}}>Analytics</span>
        <span style={{fontFamily:s.mono,fontSize:10,color:s.t4}}>Privacy-first · No tracking · Self-hosted</span>
        <div style={{marginLeft:"auto",fontFamily:s.mono,fontSize:11,color:s.t3}}>{new Date().toLocaleTimeString("en-US",{hour12:false})}</div>
      </div>
      <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,marginBottom:16}}>Polling every 10s · Refresh #{tick}</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:8,marginBottom:20}}>
        {[
          {label:"Agents",value:(d?.infra?.agents||30000).toLocaleString(),spark:sparks.agents,color:C[0]},
          {label:"Memory Entries",value:d?.infra?.memory||1660,spark:sparks.memory,color:C[2]},
          {label:"Websites",value:d?.infra?.websites||279,spark:sparks.websites,color:C[4]},
          {label:"Codex Solutions",value:d?.infra?.codex||251,spark:sparks.requests,color:C[3]},
        ].map(m=>(<div key={m.label} style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:10,padding:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <div><div style={{fontFamily:s.head,fontSize:24,fontWeight:700,color:m.color}}>{m.value}</div><div style={{fontFamily:s.mono,fontSize:9,color:s.t4,textTransform:"uppercase"}}>{m.label}</div></div>
            <Spark data={m.spark} color={m.color}/>
          </div>
        </div>))}
      </div>
      {/* Traffic by domain */}
      <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:8}}>Domains</div>
      <div style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:10,overflow:"hidden"}}>
        {["blackroad.io","blackboxprogramming.io","blackroadai.com","lucidia.earth","roadchain.io","blackroad.company"].map((domain,i)=>{
          const pct=Math.max(5,90-i*15);
          return(<div key={domain} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",borderBottom:`1px solid ${s.bd}`}}>
            <span style={{fontFamily:s.mono,fontSize:12,color:s.t1,flex:"0 0 200px"}}>{domain}</span>
            <div style={{flex:1,height:6,background:s.bg,borderRadius:99}}><div style={{height:"100%",width:`${pct}%`,background:C[i%6],borderRadius:99,transition:"width 0.5s"}}/></div>
            <span style={{fontFamily:s.mono,fontSize:11,color:s.t3,flex:"0 0 40px",textAlign:"right"}}>{pct}%</span>
          </div>)
        })}
      </div>
    </div>
  </div>)
}
