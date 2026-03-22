import{useState,useEffect}from"react";
const C=["#FF6B2B","#FF2255","#CC00AA","#8844FF","#4488FF","#00D4FF"],G=`linear-gradient(90deg,${C.join(",")})`;
const s={bg:"#0a0a0a",s1:"#131313",bd:"#1a1a1a",t1:"#f5f5f5",t3:"#737373",t4:"#404040",mono:"'JetBrains Mono',monospace",head:"'Space Grotesk',sans-serif"};
const API="https://blackroad-live-stats.amundsonalexa.workers.dev/api/memory";
const NODES=[
  {id:"amundson",label:"Amundson Framework",type:"math",connections:["gn","elimit","quantum"],x:50,y:25,color:C[0]},
  {id:"gn",label:"G(n)=n^(n+1)/(n+1)^n",type:"equation",connections:["amundson","convergence"],x:30,y:40,color:C[1]},
  {id:"elimit",label:"e-Limit Refinement",type:"paper",connections:["amundson","convergence"],x:70,y:40,color:C[2]},
  {id:"convergence",label:"A_G ≈ 1.24433",type:"constant",connections:["gn","elimit","trinary"],x:50,y:55,color:C[3]},
  {id:"trinary",label:"Ternary Logic",type:"system",connections:["convergence","blackbox","agents"],x:30,y:70,color:C[4]},
  {id:"blackbox",label:"BlackBox Protocol",type:"protocol",connections:["trinary","mesh","tor"],x:70,y:70,color:C[5]},
  {id:"agents",label:"30K Agent Fleet",type:"infra",connections:["trinary","mesh","memory"],x:15,y:55,color:C[0]},
  {id:"mesh",label:"WireGuard Mesh",type:"network",connections:["blackbox","agents"],x:85,y:55,color:C[4]},
  {id:"memory",label:"1,660 Journal Entries",type:"data",connections:["agents","codex"],x:15,y:85,color:C[2]},
  {id:"codex",label:"251 Codex Solutions",type:"knowledge",connections:["memory"],x:50,y:85,color:C[3]},
  {id:"tor",label:"Tor Hidden Services",type:"privacy",connections:["blackbox"],x:85,y:85,color:C[5]},
  {id:"quantum",label:"Quantum Experiments",type:"research",connections:["amundson"],x:85,y:25,color:C[1]},
];
export default function A(){
  const[sel,setSel]=useState(null);const[mem,setMem]=useState(null);const[tick,setTick]=useState(0);
  useEffect(()=>{fetch(API).then(r=>r.json()).then(setMem)},[]);
  useEffect(()=>{const i=setInterval(()=>setTick(t=>t+1),2000);return()=>clearInterval(i)},[]);
  const active=sel?NODES.find(n=>n.id===sel):null;
  const connected=active?NODES.filter(n=>active.connections.includes(n.id)):[];
  return(<div style={{background:s.bg,minHeight:"100vh",fontFamily:"'Inter',sans-serif",color:s.t1}}>
    <div style={{height:3,background:G}}/>
    <div style={{padding:20,maxWidth:900,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <div style={{display:"flex",gap:2}}>{C.map(c=><div key={c} style={{width:3,height:14,borderRadius:2,background:c}}/>)}</div>
        <span style={{fontFamily:s.head,fontSize:18,fontWeight:700}}>Knowledge Graph</span>
        <span style={{fontFamily:s.mono,fontSize:10,color:s.t4}}>Live · {mem?.journal_entries||1660} entries</span>
      </div>
      <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,marginBottom:16}}>{NODES.length} nodes · {NODES.reduce((s,n)=>s+n.connections.length,0)} connections · Click to explore</div>
      {/* Graph */}
      <div style={{position:"relative",background:s.s1,border:`1px solid ${s.bd}`,borderRadius:12,height:400,marginBottom:16,overflow:"hidden"}}>
        <svg style={{position:"absolute",width:"100%",height:"100%"}}>
          {NODES.map(n=>n.connections.map(cId=>{const target=NODES.find(t=>t.id===cId);return target?
            <line key={`${n.id}-${cId}`} x1={`${n.x}%`} y1={`${n.y}%`} x2={`${target.x}%`} y2={`${target.y}%`}
              stroke={sel===n.id||sel===cId?C[0]:"#1a1a1a"} strokeWidth={sel===n.id||sel===cId?2:1} opacity={sel&&sel!==n.id&&sel!==cId?0.2:1}/>:null
          }))}
        </svg>
        {NODES.map(n=>(<div key={n.id} onClick={()=>setSel(sel===n.id?null:n.id)} style={{
          position:"absolute",left:`${n.x}%`,top:`${n.y}%`,transform:"translate(-50%,-50%)",
          background:sel===n.id?n.color+"22":s.bg,border:`2px solid ${sel===n.id?n.color:connected.find(c=>c.id===n.id)?n.color+"66":s.bd}`,
          borderRadius:10,padding:"8px 12px",cursor:"pointer",zIndex:2,transition:"all 0.2s",
          opacity:sel&&sel!==n.id&&!connected.find(c=>c.id===n.id)?0.3:1
        }}>
          <div style={{fontFamily:s.mono,fontSize:11,fontWeight:600,color:n.color,whiteSpace:"nowrap"}}>{n.label}</div>
          <div style={{fontFamily:s.mono,fontSize:8,color:s.t4}}>{n.type}</div>
        </div>))}
      </div>
      {/* Detail */}
      {active&&<div style={{background:s.s1,border:`1px solid ${active.color}`,borderRadius:10,padding:20}}>
        <div style={{fontFamily:s.head,fontSize:18,fontWeight:700,color:active.color,marginBottom:8}}>{active.label}</div>
        <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,marginBottom:12}}>Type: {active.type} · Connections: {active.connections.length}</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {connected.map(c=>(<span key={c.id} onClick={()=>setSel(c.id)} style={{fontFamily:s.mono,fontSize:11,color:c.color,background:s.bg,padding:"4px 10px",borderRadius:6,border:`1px solid ${c.color}33`,cursor:"pointer"}}>{c.label}</span>))}
        </div>
      </div>}
    </div>
  </div>)
}
