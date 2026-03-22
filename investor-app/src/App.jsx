import{useState,useEffect}from"react";
const C=["#FF6B2B","#FF2255","#CC00AA","#8844FF","#4488FF","#00D4FF"],G=`linear-gradient(90deg,${C.join(",")})`;
const API="https://blackroad-live-stats.amundsonalexa.workers.dev/api/stats";
const s={bg:"#0a0a0a",s1:"#131313",bd:"#1a1a1a",t1:"#f5f5f5",t3:"#737373",t4:"#404040",mono:"'JetBrains Mono',monospace",sans:"'Inter',sans-serif",head:"'Space Grotesk',sans-serif"};
export default function App(){
  const[d,setD]=useState(null);const[tick,setTick]=useState(0);
  useEffect(()=>{fetch(API).then(r=>r.json()).then(setD);const i=setInterval(()=>fetch(API).then(r=>r.json()).then(setD),15000);return()=>clearInterval(i)},[]);
  useEffect(()=>{const i=setInterval(()=>setTick(t=>t+1),1000);return()=>clearInterval(i)},[]);
  const clock=new Date().toLocaleTimeString("en-US",{hour12:false});
  return(<div style={{background:s.bg,minHeight:"100vh",fontFamily:s.sans,color:s.t1}}>
    <div style={{height:3,background:G}}/>
    <div style={{padding:"32px 20px",maxWidth:720,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:32}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{display:"flex",gap:2}}>{C.map(c=><div key={c} style={{width:3,height:16,borderRadius:2,background:c}}/>)}</div>
            <span style={{fontFamily:s.head,fontSize:20,fontWeight:700}}>Investor Portal</span>
          </div>
          <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,marginTop:4}}>BlackRoad OS, Inc. · Delaware C-Corp · Live metrics</div>
        </div>
        <div style={{fontFamily:s.mono,fontSize:18,fontWeight:500,color:s.t3}}>{clock}</div>
      </div>
      {/* Key metrics */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:1,background:s.bd,borderRadius:10,overflow:"hidden",marginBottom:24}}>
        {[
          {v:`$${d?.finance?.monthly_burn||35.67}`,l:"Monthly Burn",c:C[1]},
          {v:`$${d?.finance?.mrr||0}`,l:"MRR",c:"#22c55e"},
          {v:`$${d?.finance?.target_mrr?.toLocaleString()||"10,790"}`,l:"Target MRR",c:C[4]},
          {v:d?.fleet?.nodes_online||7,l:"Nodes Online",c:"#22c55e"},
          {v:(d?.infra?.agents||30000).toLocaleString(),l:"AI Agents",c:C[0]},
          {v:d?.products?.road_products||86,l:"Products",c:C[2]},
        ].map(x=>(<div key={x.l} style={{background:s.s1,padding:"16px 14px",textAlign:"center"}}>
          <div style={{fontFamily:s.head,fontSize:24,fontWeight:700,color:x.c}}>{x.v}</div>
          <div style={{fontFamily:s.mono,fontSize:8,color:s.t4,textTransform:"uppercase",letterSpacing:"0.12em"}}>{x.l}</div>
        </div>))}
      </div>
      {/* Thesis */}
      <div style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:10,padding:24,marginBottom:16}}>
        <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:12}}>Investment Thesis</div>
        <div style={{fontFamily:s.head,fontSize:22,fontWeight:700,marginBottom:12,background:G,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>$600B+ TAM. $19/month infrastructure.</div>
        <div style={{fontSize:14,color:s.t3,lineHeight:1.7}}>
          BlackRoad OS replaces fragmented digital tools with sovereign infrastructure. Education ($250B), AI ($27B), Content Creation ($117B), Privacy ($441B) — same users, compounding problems, unified solution. Built on 5 Raspberry Pis and 2 cloud nodes at $19/month total cost.
        </div>
      </div>
      {/* Unit economics */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
        <div style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:10,padding:20}}>
          <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:10}}>Breakeven</div>
          <div style={{fontFamily:s.head,fontSize:28,fontWeight:700,color:"#22c55e"}}>2 subs</div>
          <div style={{fontFamily:s.mono,fontSize:11,color:s.t3}}>2 Rider subscribers = $58/mo > $35.67 burn</div>
        </div>
        <div style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:10,padding:20}}>
          <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:10}}>Series A Target</div>
          <div style={{fontFamily:s.head,fontSize:28,fontWeight:700,color:C[0]}}>$5M</div>
          <div style={{fontFamily:s.mono,fontSize:11,color:s.t3}}>40% eng · 30% creator · 20% GTM · 10% infra</div>
        </div>
      </div>
      {/* Assets */}
      <div style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:10,padding:20}}>
        <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:12}}>Assets</div>
        {[
          {k:"Infrastructure",v:"7 nodes, 52 TOPS, 279 websites"},
          {k:"Software",v:`${d?.products?.total_repos||254} repos, ${d?.products?.road_products||86} products, 22.9GB`},
          {k:"AI",v:`${(d?.infra?.agents||30000).toLocaleString()} agents, ${d?.infra?.ollama_models||228} models`},
          {k:"Memory",v:`${d?.memory?.journal_entries||1660} journal, ${d?.memory?.codex_solutions||251} codex`},
          {k:"Domains",v:`${d?.products?.domains||19} registered, ${d?.infra?.cf_workers||127} Workers`},
          {k:"Research",v:"Amundson Framework, 536/536 tests, Papers A+B"},
        ].map(x=>(<div key={x.k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${s.bd}`}}>
          <span style={{fontFamily:s.sans,fontSize:13,color:s.t3}}>{x.k}</span>
          <span style={{fontFamily:s.mono,fontSize:12,color:s.t1}}>{x.v}</span>
        </div>))}
      </div>
      <div style={{fontFamily:s.mono,fontSize:9,color:s.t4,textAlign:"center",marginTop:20}}>BlackRoad OS, Inc. · EIN {d?.company?.ein||"41-2663817"} · Founded {d?.company?.founded||"2025-11-17"} · Live data refreshes every 15s</div>
    </div>
  </div>)
}
