import{useState}from"react";
const C=["#FF6B2B","#FF2255","#CC00AA","#8844FF","#4488FF","#00D4FF"];const G=`linear-gradient(90deg,${C.join(",")})`;
const s={bg:"#0a0a0a",s1:"#131313",bd:"#1a1a1a",t1:"#f5f5f5",t3:"#737373",t4:"#404040",mono:"'JetBrains Mono',monospace",sans:"'Inter',sans-serif",head:"'Space Grotesk',sans-serif"};
const ENTRIES=[
  {type:"journal",action:"deploy",entity:"domain-websites",detail:"Built 19 domain sites with chromatic brand",hash:"c2272044",time:"1h ago"},
  {type:"journal",action:"spawn",entity:"30k-agents",detail:"Spawned 30,000 agents: 10K general, 10K specialized, 10K micro",hash:"83a0dd37",time:"2h ago"},
  {type:"journal",action:"wire",entity:"stripe-products",detail:"Created 8 Stripe products, 6 payment links live",hash:"c7c14bb5",time:"3h ago"},
  {type:"journal",action:"audit",entity:"full-repo-audit",detail:"233 repos, 22.9GB, 82 Road products cataloged",hash:"9377eb34",time:"4h ago"},
  {type:"journal",action:"consolidate",entity:"org-infrastructure",detail:"Forked 31 repos from BlackRoad-OS to Inc",hash:"50a2ccc6",time:"5h ago"},
  {type:"codex",action:"solution",entity:"CF Worker SEO Template",detail:"Worker factory with canonical, og:url, JSON-LD, robots.txt",hash:"ee143e1f",time:"1h ago"},
  {type:"codex",action:"solution",entity:"React App Build Pipeline",detail:"Vite+React18, ~160KB, ~400ms build, SEO injected",hash:"bbb4858c",time:"2h ago"},
  {type:"codex",action:"solution",entity:"Pi Fleet Code Import",detail:"SSH→cat→/tmp→git add to RoadCode scaffold dirs",hash:"6de19bef",time:"6h ago"},
  {type:"til",action:"broadcast",entity:"frontend",detail:"60s app factory: 101 templates, Vite build, scp deploy",hash:"f74b9492",time:"30m ago"},
  {type:"til",action:"broadcast",entity:"infrastructure",detail:"Full org deploy: 35 repos × 127 files = 4,445 files",hash:"a4cdc528",time:"5h ago"},
  {type:"til",action:"broadcast",entity:"collaboration",detail:"Duplicate work detected: RoadCode frozen 3x, domain deploy 2x",hash:"a6d1f101",time:"8h ago"},
];
const TYPES={journal:{color:C[0],icon:"📋"},codex:{color:C[2],icon:"📚"},til:{color:C[4],icon:"💡"}};
function Label({children}){return<div style={{fontFamily:s.mono,fontSize:10,color:s.t4,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:10}}>{children}</div>}
export default function App(){
  const[filter,setFilter]=useState("all");
  const[search,setSearch]=useState("");
  const filtered=ENTRIES.filter(e=>(filter==="all"||e.type===filter)&&(search===""||JSON.stringify(e).toLowerCase().includes(search.toLowerCase())));
  return(<div style={{background:s.bg,minHeight:"100vh",fontFamily:s.sans,color:s.t1}}>
    <div style={{height:3,background:G}}/>
    <div style={{padding:20,maxWidth:720,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
        <div style={{display:"flex",gap:2}}>{C.map(c=><div key={c} style={{width:3,height:14,borderRadius:2,background:c}}/>)}</div>
        <span style={{fontFamily:s.head,fontSize:18,fontWeight:700}}>Memory Explorer</span>
      </div>
      <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,marginBottom:20}}>1,648 journal · 249 codex · hash-chained</div>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search memory..." style={{width:"100%",background:s.s1,border:`1px solid ${s.bd}`,borderRadius:8,padding:"10px 14px",color:s.t1,fontFamily:s.sans,fontSize:13,outline:"none",marginBottom:12}}/>
      <div style={{display:"flex",gap:4,marginBottom:16}}>
        {["all","journal","codex","til"].map(t=>(<button key={t} onClick={()=>setFilter(t)} style={{fontFamily:s.mono,fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",color:filter===t?s.t1:s.t4,background:filter===t?s.s1:"transparent",border:`1px solid ${filter===t?s.bd:s.bd}`,borderRadius:5,padding:"5px 12px",cursor:"pointer"}}>{t}</button>))}
      </div>
      {filtered.map((e,i)=>{const T=TYPES[e.type];return(
        <div key={i} style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:8,padding:"14px 16px",marginBottom:6}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <span>{T.icon}</span>
            <span style={{fontFamily:s.mono,fontSize:11,color:T.color,fontWeight:500}}>{e.action}</span>
            <span style={{fontFamily:s.mono,fontSize:11,color:s.t3}}>→ {e.entity}</span>
            <span style={{marginLeft:"auto",fontFamily:s.mono,fontSize:9,color:s.t4}}>{e.time}</span>
          </div>
          <div style={{fontSize:13,color:s.t3,marginBottom:6,lineHeight:1.5}}>{e.detail}</div>
          <div style={{fontFamily:s.mono,fontSize:9,color:s.t4}}>hash: {e.hash}...</div>
        </div>
      )})}
    </div>
  </div>)
}
