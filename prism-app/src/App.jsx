import{useState,useEffect}from"react";
const C=["#FF6B2B","#FF2255","#CC00AA","#8844FF","#4488FF","#00D4FF"];
const G=`linear-gradient(90deg,${C.join(",")})`;
const API="https://blackroad-live-stats.amundsonalexa.workers.dev/api/stats";
const NODES=[
  {name:"Alice",ip:".49",role:"Gateway",emoji:"🌐",services:["nginx","postgresql","redis","qdrant","pihole","roundtrip"]},
  {name:"Cecilia",ip:".96",role:"AI Engine",emoji:"🧠",services:["ollama","minio","postgresql","influxdb"]},
  {name:"Octavia",ip:".101",role:"Architect",emoji:"🐙",services:["gitea","docker","nats"]},
  {name:"Aria",ip:".98",role:"Interface",emoji:"🎵",services:["docker","nginx","ollama"]},
  {name:"Lucidia",ip:".38",role:"Dreamer",emoji:"💡",services:["ollama","nginx","roundtrip","docker"]},
  {name:"Gematria",ip:"DO",role:"Edge",emoji:"🔢",services:["caddy","ollama"]},
  {name:"Anastasia",ip:"DO",role:"Cloud",emoji:"👑",services:["caddy","docker"]},
];
const s={bg:"#0a0a0a",s1:"#131313",bd:"#1a1a1a",t1:"#f5f5f5",t3:"#737373",t4:"#404040",t5:"#262626",mono:"'JetBrains Mono',monospace",sans:"'Inter',sans-serif",head:"'Space Grotesk',sans-serif"};
function Label({children}){return<div style={{fontFamily:s.mono,fontSize:10,color:s.t4,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:10}}>{children}</div>}
export default function App(){
  const[data,setData]=useState(null);
  const[sel,setSel]=useState(null);
  useEffect(()=>{fetch(API).then(r=>r.json()).then(setData).catch(()=>{});const i=setInterval(()=>fetch(API).then(r=>r.json()).then(setData).catch(()=>{}),15000);return()=>clearInterval(i)},[]);
  return(<div style={{background:s.bg,minHeight:"100vh",fontFamily:s.sans,color:s.t1}}>
    <div style={{height:3,background:G}}/>
    <div style={{padding:"20px",maxWidth:900,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:24}}>
        <div style={{display:"flex",gap:2}}>{C.map(c=><div key={c} style={{width:3,height:14,borderRadius:2,background:c}}/>)}</div>
        <span style={{fontFamily:s.head,fontSize:18,fontWeight:700}}>PRISM</span>
        <span style={{fontFamily:s.mono,fontSize:10,color:s.t4}}>Console</span>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:6}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 6px #22c55e"}}/>
          <span style={{fontFamily:s.mono,fontSize:10,color:s.t3}}>LIVE</span>
        </div>
      </div>
      {/* Stats row */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:1,background:s.bd,borderRadius:10,overflow:"hidden",marginBottom:20}}>
        {[
          {v:data?.fleet?.nodes_online||7,l:"Nodes"},
          {v:data?.infra?.agents?.toLocaleString()||"30,000",l:"Agents"},
          {v:data?.infra?.websites||279,l:"Websites"},
          {v:data?.products?.road_products||83,l:"Products"},
          {v:data?.infra?.tops||52,l:"TOPS"},
          {v:data?.infra?.memory||1648,l:"Memory"},
        ].map(x=>(<div key={x.l} style={{background:s.s1,padding:"14px 12px",textAlign:"center"}}>
          <div style={{fontFamily:s.head,fontSize:22,fontWeight:700,background:G,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{x.v}</div>
          <div style={{fontFamily:s.mono,fontSize:9,color:s.t4,textTransform:"uppercase",letterSpacing:"0.1em"}}>{x.l}</div>
        </div>))}
      </div>
      {/* Nodes */}
      <Label>Fleet Nodes</Label>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:8,marginBottom:24}}>
        {NODES.map(n=>(<div key={n.name} onClick={()=>setSel(sel===n.name?null:n.name)} style={{background:s.s1,border:`1px solid ${sel===n.name?C[0]:s.bd}`,borderRadius:10,padding:16,cursor:"pointer",transition:"border-color 0.15s"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <span style={{fontSize:20}}>{n.emoji}</span>
            <div>
              <div style={{fontFamily:s.sans,fontSize:14,fontWeight:600}}>{n.name}</div>
              <div style={{fontFamily:s.mono,fontSize:10,color:s.t4}}>{n.role} · {n.ip}</div>
            </div>
            <div style={{marginLeft:"auto",width:6,height:6,borderRadius:"50%",background:"#22c55e"}}/>
          </div>
          {sel===n.name&&<div style={{borderTop:`1px solid ${s.bd}`,paddingTop:8,marginTop:4}}>
            <div style={{fontFamily:s.mono,fontSize:9,color:s.t4,textTransform:"uppercase",marginBottom:6}}>Services</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
              {n.services.map(svc=>(<span key={svc} style={{fontFamily:s.mono,fontSize:10,color:s.t3,background:s.bg,padding:"3px 8px",borderRadius:4,border:`1px solid ${s.t5}`}}>{svc}</span>))}
            </div>
          </div>}
        </div>))}
      </div>
      {/* Finance */}
      <Label>Finance</Label>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:24}}>
        <div style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:10,padding:16,textAlign:"center"}}>
          <div style={{fontFamily:s.head,fontSize:24,fontWeight:700,color:C[1]}}>-${data?.finance?.monthly_burn||35.67}</div>
          <div style={{fontFamily:s.mono,fontSize:9,color:s.t4,textTransform:"uppercase"}}>Monthly Burn</div>
        </div>
        <div style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:10,padding:16,textAlign:"center"}}>
          <div style={{fontFamily:s.head,fontSize:24,fontWeight:700,color:"#22c55e"}}>${data?.finance?.mrr||0}</div>
          <div style={{fontFamily:s.mono,fontSize:9,color:s.t4,textTransform:"uppercase"}}>MRR</div>
        </div>
        <div style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:10,padding:16,textAlign:"center"}}>
          <div style={{fontFamily:s.head,fontSize:24,fontWeight:700,color:C[4]}}>${data?.finance?.target_mrr||10790}</div>
          <div style={{fontFamily:s.mono,fontSize:9,color:s.t4,textTransform:"uppercase"}}>Target MRR</div>
        </div>
      </div>
      <div style={{fontFamily:s.mono,fontSize:10,color:s.t5,textAlign:"center"}}>PRISM Console · BlackRoad OS, Inc. · {data?.timestamp?.split("T")[0]||"live"}</div>
    </div>
  </div>)
}
