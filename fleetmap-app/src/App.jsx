import{useState,useEffect}from"react";
const C=["#FF6B2B","#FF2255","#CC00AA","#8844FF","#4488FF","#00D4FF"],G=`linear-gradient(90deg,${C.join(",")})`;
const API="https://blackroad-live-stats.amundsonalexa.workers.dev/api/fleet";
const s={bg:"#0a0a0a",s1:"#0f0f0f",bd:"#1a1a1a",t1:"#f5f5f5",t3:"#737373",t4:"#404040",mono:"'JetBrains Mono',monospace",sans:"'Inter',sans-serif",head:"'Space Grotesk',sans-serif"};
export default function App(){
  const[fleet,setFleet]=useState(null);const[sel,setSel]=useState(null);const[tick,setTick]=useState(0);
  useEffect(()=>{fetch(API).then(r=>r.json()).then(setFleet);const i=setInterval(()=>fetch(API).then(r=>r.json()).then(setFleet),10000);return()=>clearInterval(i)},[]);
  useEffect(()=>{const i=setInterval(()=>setTick(t=>t+1),1000);return()=>clearInterval(i)},[]);
  const nodes=fleet?.nodes||[];
  const positions=[{x:50,y:30},{x:20,y:50},{x:80,y:50},{x:35,y:75},{x:65,y:75},{x:15,y:20},{x:85,y:20}];
  return(<div style={{background:s.bg,minHeight:"100vh",fontFamily:s.sans,color:s.t1}}>
    <div style={{height:3,background:G}}/>
    <div style={{padding:20,maxWidth:900,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <div style={{display:"flex",gap:2}}>{C.map(c=><div key={c} style={{width:3,height:14,borderRadius:2,background:c}}/>)}</div>
        <span style={{fontFamily:s.head,fontSize:18,fontWeight:700}}>Fleet Map</span>
        <span style={{fontFamily:s.mono,fontSize:10,color:s.t4}}>Live topology</span>
        <div style={{marginLeft:"auto",fontFamily:s.mono,fontSize:11,color:s.t3}}>{new Date().toLocaleTimeString()}</div>
      </div>
      <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,marginBottom:20}}>{nodes.length} nodes · WireGuard mesh · {tick}s uptime</div>
      {/* Visual map */}
      <div style={{position:"relative",background:s.s1,border:`1px solid ${s.bd}`,borderRadius:12,height:400,marginBottom:16,overflow:"hidden"}}>
        {/* Connection lines */}
        <svg style={{position:"absolute",width:"100%",height:"100%",top:0,left:0}}>
          {nodes.map((n,i)=>nodes.slice(i+1).map((n2,j)=>{
            const p1=positions[i],p2=positions[i+j+1];
            return p1&&p2?<line key={`${i}-${j}`} x1={`${p1.x}%`} y1={`${p1.y}%`} x2={`${p2.x}%`} y2={`${p2.y}%`} stroke="#1a1a1a" strokeWidth="1" strokeDasharray={i<5&&(i+j+1)<5?"":"4,4"}/>:null
          }))}
        </svg>
        {/* Nodes */}
        {nodes.map((n,i)=>{const p=positions[i];return p?(<div key={n.name} onClick={()=>setSel(sel===i?null:i)} style={{
          position:"absolute",left:`${p.x}%`,top:`${p.y}%`,transform:"translate(-50%,-50%)",
          background:sel===i?"#1a1a1a":s.s1,border:`2px solid ${sel===i?C[i%6]:s.bd}`,borderRadius:12,padding:"12px 16px",
          cursor:"pointer",transition:"all 0.2s",textAlign:"center",minWidth:100,zIndex:2
        }}>
          <div style={{width:8,height:8,borderRadius:"50%",background:n.status==="online"?"#22c55e":"#ef4444",margin:"0 auto 6px",boxShadow:`0 0 8px ${n.status==="online"?"#22c55e":"#ef4444"}`}}/>
          <div style={{fontFamily:s.head,fontSize:13,fontWeight:600}}>{n.name}</div>
          <div style={{fontFamily:s.mono,fontSize:9,color:s.t4}}>{n.role}</div>
          {n.temp&&<div style={{fontFamily:s.mono,fontSize:9,color:n.temp>60?C[1]:s.t3,marginTop:2}}>{n.temp}°C</div>}
          {n.disk&&<div style={{fontFamily:s.mono,fontSize:9,color:n.disk>80?C[1]:s.t3}}>{n.disk}% disk</div>}
        </div>):null})}
      </div>
      {/* Selected node detail */}
      {sel!==null&&nodes[sel]&&(<div style={{background:s.s1,border:`1px solid ${C[sel%6]}`,borderRadius:10,padding:20}}>
        <div style={{fontFamily:s.head,fontSize:18,fontWeight:700,marginBottom:8}}>{nodes[sel].name}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:8}}>
          {[{l:"Role",v:nodes[sel].role},{l:"IP",v:nodes[sel].ip},{l:"Temp",v:nodes[sel].temp?`${nodes[sel].temp}°C`:"N/A"},{l:"Disk",v:`${nodes[sel].disk}%`},{l:"Load",v:nodes[sel].load},{l:"Services",v:nodes[sel].services},{l:"Uptime",v:nodes[sel].uptime},{l:"Status",v:nodes[sel].status}].map(x=>
            <div key={x.l} style={{background:s.bg,borderRadius:6,padding:10}}>
              <div style={{fontFamily:s.mono,fontSize:9,color:s.t4,textTransform:"uppercase"}}>{x.l}</div>
              <div style={{fontFamily:s.mono,fontSize:13,color:s.t1,marginTop:2}}>{x.v}</div>
            </div>
          )}
        </div>
      </div>)}
    </div>
  </div>)
}
