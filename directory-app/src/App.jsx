import{useState,useEffect}from"react";
const C=["#FF6B2B","#FF2255","#CC00AA","#8844FF","#4488FF","#00D4FF"],G=`linear-gradient(90deg,${C.join(",")})`;
const API="https://blackroad-live-stats.amundsonalexa.workers.dev/api/agents";
const PREFIXES=["Road","Lane","Highway","Street","Avenue","Boulevard","Drive","Path","Trail","Route","Bridge","Cross"];
const SUFFIXES=["Runner","Walker","Keeper","Guard","Scout","Ranger","Seeker","Builder","Maker","Smith","Wright","Rider"];
const ROLES=["analyst","builder","communicator","debugger","educator","facilitator","guardian","helper","inspector","journalist","keeper","librarian"];
const GROUPS=["fleet","ops","ai","security","education","creator","finance","research","community","infrastructure"];
const s={bg:"#0a0a0a",s1:"#131313",bd:"#1a1a1a",t1:"#f5f5f5",t3:"#737373",t4:"#404040",mono:"'JetBrains Mono',monospace",sans:"'Inter',sans-serif",head:"'Space Grotesk',sans-serif"};
function genAgents(count){return Array.from({length:count},(_,i)=>({
  name:`${PREFIXES[i%12]}${SUFFIXES[Math.floor(i/12)%12]}${i>143?`-${Math.floor(i/144)}`:""}`,
  role:ROLES[i%12],group:GROUPS[i%10],tier:i<100?"general":i<200?"specialized":"micro",
  id:i.toString(16).padStart(4,"0")
}))}
export default function App(){
  const[data,setData]=useState(null);const[search,setSearch]=useState("");const[group,setGroup]=useState("all");const[page,setPage]=useState(0);
  useEffect(()=>{fetch(API).then(r=>r.json()).then(setData)},[]);
  const agents=genAgents(500);
  const filtered=agents.filter(a=>(group==="all"||a.group===group)&&(search===""||a.name.toLowerCase().includes(search.toLowerCase())||a.role.includes(search.toLowerCase())));
  const paged=filtered.slice(page*50,(page+1)*50);
  return(<div style={{background:s.bg,minHeight:"100vh",fontFamily:s.sans,color:s.t1}}>
    <div style={{height:3,background:G}}/>
    <div style={{padding:20,maxWidth:800,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <div style={{display:"flex",gap:2}}>{C.map(c=><div key={c} style={{width:3,height:14,borderRadius:2,background:c}}/>)}</div>
        <span style={{fontFamily:s.head,fontSize:18,fontWeight:700}}>Roadie Directory</span>
      </div>
      <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,marginBottom:16}}>{(data?.total||30000).toLocaleString()} agents · {data?.tiers?.general||10000} general · {data?.tiers?.specialized||10000} specialized · {data?.tiers?.micro||10000} micro</div>
      {/* Named agents */}
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
        {(data?.named||[]).map(a=>(<div key={a.id} style={{background:s.s1,border:`1px solid ${a.color}`,borderRadius:8,padding:"8px 14px",display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:a.color,boxShadow:`0 0 6px ${a.color}`}}/>
          <div><div style={{fontSize:12,fontWeight:600}}>{a.name}</div><div style={{fontFamily:s.mono,fontSize:9,color:s.t4}}>{a.role}</div></div>
        </div>))}
      </div>
      <input value={search} onChange={e=>{setSearch(e.target.value);setPage(0)}} placeholder="Search 30,000 agents..." style={{width:"100%",background:s.s1,border:`1px solid ${s.bd}`,borderRadius:8,padding:"10px 14px",color:s.t1,fontFamily:s.sans,fontSize:13,outline:"none",marginBottom:10}}/>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
        {["all",...GROUPS].map(g=>(<button key={g} onClick={()=>{setGroup(g);setPage(0)}} style={{fontFamily:s.mono,fontSize:9,textTransform:"uppercase",letterSpacing:"0.08em",color:group===g?s.t1:s.t4,background:group===g?s.s1:"transparent",border:`1px solid ${s.bd}`,borderRadius:4,padding:"4px 10px",cursor:"pointer"}}>{g}</button>))}
      </div>
      <div style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:10,overflow:"hidden"}}>
        {paged.map((a,i)=>(<div key={a.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 14px",borderBottom:i<paged.length-1?`1px solid ${s.bd}`:"none"}}>
          <div style={{width:4,height:14,borderRadius:1,background:C[GROUPS.indexOf(a.group)%6],flexShrink:0}}/>
          <span style={{fontFamily:s.mono,fontSize:12,color:s.t1,flex:"1 1 140px"}}>{a.name}</span>
          <span style={{fontFamily:s.mono,fontSize:10,color:s.t3,flex:"1 1 80px"}}>{a.role}</span>
          <span style={{fontFamily:s.mono,fontSize:9,color:s.t4,background:s.bg,padding:"2px 6px",borderRadius:3}}>{a.group}</span>
          <span style={{fontFamily:s.mono,fontSize:9,color:s.t4}}>{a.tier}</span>
          <span style={{fontFamily:s.mono,fontSize:9,color:s.t4}}>0x{a.id}</span>
        </div>))}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:10}}>
        <button onClick={()=>setPage(Math.max(0,page-1))} disabled={page===0} style={{fontFamily:s.mono,fontSize:10,color:page>0?C[0]:s.t4,background:"none",border:"none",cursor:"pointer"}}>← prev</button>
        <span style={{fontFamily:s.mono,fontSize:10,color:s.t4}}>showing {page*50+1}-{Math.min((page+1)*50,filtered.length)} of {filtered.length}</span>
        <button onClick={()=>setPage(page+1)} disabled={(page+1)*50>=filtered.length} style={{fontFamily:s.mono,fontSize:10,color:(page+1)*50<filtered.length?C[0]:s.t4,background:"none",border:"none",cursor:"pointer"}}>next →</button>
      </div>
    </div>
  </div>)
}
