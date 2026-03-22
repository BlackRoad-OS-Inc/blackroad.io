import{useState,useEffect}from"react";
const C=["#FF6B2B","#FF2255","#CC00AA","#8844FF","#4488FF","#00D4FF"],G=`linear-gradient(90deg,${C.join(",")})`;
const s={bg:"#0a0a0a",s1:"#131313",bd:"#1a1a1a",t1:"#f5f5f5",t3:"#737373",t4:"#404040",mono:"'JetBrains Mono',monospace",head:"'Space Grotesk',sans-serif"};
const API="https://blackroad-live-stats.amundsonalexa.workers.dev/api/pricing";
export default function A(){
  const[plans,setPlans]=useState(null);const[annual,setAnnual]=useState(false);
  useEffect(()=>{fetch(API).then(r=>r.json()).then(setPlans)},[]);
  const allPlans=plans?Object.values(plans):[];
  return(<div style={{background:s.bg,minHeight:"100vh",fontFamily:"'Inter',sans-serif",color:s.t1}}>
    <div style={{height:3,background:G}}/>
    <div style={{padding:"40px 20px",maxWidth:900,margin:"0 auto",textAlign:"center"}}>
      <div style={{display:"flex",justifyContent:"center",gap:2,marginBottom:16}}>{C.map(c=><div key={c} style={{width:5,height:5,borderRadius:"50%",background:c}}/>)}</div>
      <div style={{fontFamily:s.head,fontSize:"clamp(28px,5vw,42px)",fontWeight:700,marginBottom:8}}>Choose your <span style={{background:G,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>plan</span></div>
      <div style={{fontSize:14,color:s.t3,marginBottom:24}}>Replaces $52.99 Adobe + $20 AI tools + $149 Brilliant + $40-100/hr tutoring</div>
      {/* Toggle */}
      <div style={{display:"inline-flex",background:s.s1,borderRadius:8,padding:3,marginBottom:32,border:`1px solid ${s.bd}`}}>
        <button onClick={()=>setAnnual(false)} style={{padding:"8px 20px",borderRadius:6,border:"none",fontFamily:s.mono,fontSize:11,cursor:"pointer",background:!annual?C[0]:"transparent",color:!annual?"#fff":s.t4}}>Monthly</button>
        <button onClick={()=>setAnnual(true)} style={{padding:"8px 20px",borderRadius:6,border:"none",fontFamily:s.mono,fontSize:11,cursor:"pointer",background:annual?C[0]:"transparent",color:annual?"#fff":s.t4}}>Annual <span style={{color:annual?"#fff":C[0],fontSize:9}}>save 17%</span></button>
      </div>
      {/* Plan cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:12,textAlign:"left"}}>
        {[
          {name:"Rider",price:29,annual:290,features:["AI chat with memory","RoadSearch","30K agents","Community support","19 domain access"],color:C[0],pop:false},
          {name:"Paver",price:99,annual:990,features:["Everything in Rider","PRISM console","Creator tools (Lucidia)","Fleet management","Priority AI inference","API access"],color:C[2],pop:true},
          {name:"Enterprise",price:299,annual:2990,features:["Everything in Paver","Dedicated nodes","Custom agents","SLA guarantee","Team management","Compliance suite","Priority support"],color:C[4],pop:false},
        ].map(p=>{
          const link=allPlans.find(x=>x.name?.includes(p.name))?.link||"#";
          return(<div key={p.name} style={{background:s.s1,border:`1px solid ${p.pop?p.color:s.bd}`,borderRadius:14,padding:"28px 24px",position:"relative"}}>
            {p.pop&&<div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:p.color,color:"#fff",padding:"3px 14px",borderRadius:20,fontFamily:s.mono,fontSize:9,fontWeight:700,letterSpacing:"0.1em"}}>POPULAR</div>}
            <div style={{fontFamily:s.head,fontSize:18,fontWeight:600,marginBottom:8}}>{p.name}</div>
            <div style={{marginBottom:16}}><span style={{fontFamily:s.head,fontSize:36,fontWeight:700}}>${annual?p.annual:p.price}</span><span style={{fontSize:13,color:s.t3}}>/{annual?"year":"mo"}</span></div>
            <ul style={{listStyle:"none",marginBottom:24}}>
              {p.features.map(f=><li key={f} style={{padding:"6px 0",borderBottom:`1px solid ${s.bd}`,fontSize:13,color:s.t3}}>
                <span style={{color:p.color,marginRight:8}}>→</span>{f}
              </li>)}
            </ul>
            <a href={link} target="_blank" rel="noopener" style={{display:"block",textAlign:"center",background:p.pop?p.color:"transparent",border:`1px solid ${p.pop?"transparent":s.bd}`,color:p.pop?"#fff":s.t1,padding:"12px",borderRadius:8,fontWeight:600,fontSize:14,textDecoration:"none"}}>Get {p.name}</a>
          </div>)
        })}
      </div>
      {/* Product add-ons */}
      <div style={{marginTop:32,textAlign:"left"}}>
        <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:12}}>Standalone Products</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:8}}>
          {[{name:"Lucidia Creator",price:29,desc:"90%+ rev share"},{name:"RoadWork Tutor",price:19,desc:"AI homework help"},{name:"RoadSearch",price:5,desc:"Privacy-first search"}].map(p=>{
            const link=allPlans.find(x=>x.name?.includes(p.name.split(" ")[0]))?.link||"#";
            return(<a key={p.name} href={link} target="_blank" rel="noopener" style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:10,padding:16,textDecoration:"none",display:"block"}}>
              <div style={{fontSize:14,fontWeight:600,color:s.t1}}>{p.name}</div>
              <div style={{fontFamily:s.mono,fontSize:11,color:s.t3,marginTop:2}}>{p.desc}</div>
              <div style={{fontFamily:s.head,fontSize:20,fontWeight:700,color:C[0],marginTop:8}}>${p.price}<span style={{fontSize:11,color:s.t4}}>/mo</span></div>
            </a>)
          })}
        </div>
      </div>
    </div>
  </div>)
}
