import{useState}from"react";
const C=["#FF6B2B","#FF2255","#CC00AA","#8844FF","#4488FF","#00D4FF"],G=`linear-gradient(90deg,${C.join(",")})`;
const s={bg:"#0a0a0a",s1:"#131313",bd:"#1a1a1a",t1:"#f5f5f5",t3:"#737373",t4:"#404040",mono:"'JetBrains Mono',monospace",head:"'Space Grotesk',sans-serif"};
const BASE="https://blackroad-live-stats.amundsonalexa.workers.dev";
const ENDPOINTS=[
  {method:"GET",path:"/api/stats",desc:"Everything — fleet, products, infra, pricing, finance, memory, agents",color:"#22c55e"},
  {method:"GET",path:"/api/fleet",desc:"7 nodes with temp, disk%, load, services, uptime",color:"#22c55e"},
  {method:"GET",path:"/api/agents",desc:"30K agents — total, tiers, named agents with roles",color:"#22c55e"},
  {method:"GET",path:"/api/memory",desc:"1,660 journal entries, 251 codex solutions, recent activity",color:"#22c55e"},
  {method:"GET",path:"/api/finance",desc:"$35.67 burn, $0 MRR, expenses, free services, assets",color:"#22c55e"},
  {method:"GET",path:"/api/pricing",desc:"6 plans with Stripe payment links and subscriber counts",color:"#22c55e"},
  {method:"GET",path:"/api/social",desc:"BackRoad Social — posts today, avg depth, recent posts",color:"#22c55e"},
  {method:"GET",path:"/api/search",desc:"1,383 indexed entries, 23 sources, 28 entity types",color:"#22c55e"},
  {method:"GET",path:"/api/company",desc:"Delaware C-Corp details, EIN, shares, CEO",color:"#22c55e"},
  {method:"GET",path:"/api/infra",desc:"279 sites, 127 Workers, 70 workflows, 52 TOPS",color:"#22c55e"},
  {method:"GET",path:"/api/education",desc:"6 subjects, problem counts",color:"#22c55e"},
  {method:"GET",path:"/mesh/agents",desc:"10 registered mesh agents with workers and tags",color:"#22c55e"},
  {method:"GET",path:"/mesh/health",desc:"Agent mesh operational status",color:"#22c55e"},
  {method:"POST",path:"/mesh/route",desc:"Route message to named agent",color:"#f59e0b"},
  {method:"POST",path:"/mesh/broadcast",desc:"Fan-out to agents matching tags",color:"#f59e0b"},
];
export default function A(){
  const[sel,setSel]=useState(null);const[result,setResult]=useState(null);const[loading,setLoading]=useState(false);
  const tryIt=async(ep)=>{
    setSel(ep.path);setLoading(true);setResult(null);
    const url=ep.path.startsWith("/mesh")?`https://br-router.amundsonalexa.workers.dev${ep.path}`:`${BASE}${ep.path}`;
    try{const r=await fetch(url);const d=await r.json();setResult(JSON.stringify(d,null,2))}catch(e){setResult(`Error: ${e.message}`)}
    setLoading(false);
  };
  return(<div style={{background:s.bg,minHeight:"100vh",fontFamily:"'Inter',sans-serif",color:s.t1}}>
    <div style={{height:3,background:G}}/>
    <div style={{padding:20,maxWidth:800,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <div style={{display:"flex",gap:2}}>{C.map(c=><div key={c} style={{width:3,height:14,borderRadius:2,background:c}}/>)}</div>
        <span style={{fontFamily:s.head,fontSize:18,fontWeight:700}}>API Explorer</span>
        <span style={{fontFamily:s.mono,fontSize:10,color:s.t4}}>Try it live</span>
      </div>
      <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,marginBottom:16}}>15 endpoints · Stats API + Agent Mesh · Click to try</div>
      {ENDPOINTS.map((ep,i)=>(<div key={ep.path} style={{marginBottom:4}}>
        <div onClick={()=>tryIt(ep)} style={{background:s.s1,border:`1px solid ${sel===ep.path?C[0]:s.bd}`,borderRadius:8,padding:"10px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:12,transition:"border-color 0.15s"}}>
          <span style={{fontFamily:s.mono,fontSize:11,fontWeight:700,color:ep.color,width:36}}>{ep.method}</span>
          <span style={{fontFamily:s.mono,fontSize:12,color:s.t1,flex:"1 1 200px"}}>{ep.path}</span>
          <span style={{fontSize:11,color:s.t4,flex:"1 1 300px"}}>{ep.desc}</span>
        </div>
        {sel===ep.path&&(<div style={{background:"#0d0d0d",border:`1px solid ${s.bd}`,borderTop:"none",borderRadius:"0 0 8px 8px",padding:16,marginTop:-4}}>
          <div style={{fontFamily:s.mono,fontSize:9,color:s.t4,marginBottom:6}}>{loading?"Loading...":"Response:"}</div>
          <pre style={{fontFamily:s.mono,fontSize:11,color:C[4],background:s.bg,padding:12,borderRadius:6,overflow:"auto",maxHeight:300,lineHeight:1.5,border:`1px solid ${s.bd}`}}>{result||"..."}</pre>
        </div>)}
      </div>))}
    </div>
  </div>)
}
