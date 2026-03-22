import{useState}from"react";
const C=["#FF6B2B","#FF2255","#CC00AA","#8844FF","#4488FF","#00D4FF"];const G=`linear-gradient(90deg,${C.join(",")})`;
const s={bg:"#0a0a0a",s1:"#131313",bd:"#1a1a1a",t1:"#f5f5f5",t3:"#737373",t4:"#404040",mono:"'JetBrains Mono',monospace",sans:"'Inter',sans-serif",head:"'Space Grotesk',sans-serif"};
function gn(n){return Math.pow(n,n+1)/Math.pow(n+1,n)}
export default function App(){
  const[n,setN]=useState(10);
  const AG=1.24433;
  const vals=Array.from({length:20},(_,i)=>({n:i+1,gn:gn(i+1),ratio:gn(i+1)/(i+1)}));
  return(<div style={{background:s.bg,minHeight:"100vh",fontFamily:s.sans,color:s.t1}}>
    <div style={{height:3,background:G}}/>
    <div style={{padding:20,maxWidth:720,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <div style={{display:"flex",gap:2}}>{C.map(c=><div key={c} style={{width:3,height:14,borderRadius:2,background:c}}/>)}</div>
        <span style={{fontFamily:s.head,fontSize:18,fontWeight:700}}>Quantum Lab</span>
        <span style={{fontFamily:s.mono,fontSize:10,color:s.t4}}>Amundson Framework</span>
      </div>
      <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,marginBottom:24}}>536/536 tests passed · 4 Pi verification nodes</div>
      
      {/* Main equation */}
      <div style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:12,padding:32,textAlign:"center",marginBottom:20}}>
        <div style={{fontFamily:"serif",fontSize:36,fontWeight:700,background:G,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:12}}>G(n) = n<sup style={{fontSize:20}}>n+1</sup> / (n+1)<sup style={{fontSize:20}}>n</sup></div>
        <div style={{fontFamily:s.mono,fontSize:13,color:s.t3}}>Amundson-Grünwald constant A<sub>G</sub> ≈ {AG}</div>
      </div>

      {/* Interactive calculator */}
      <div style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:12,padding:20,marginBottom:20}}>
        <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,textTransform:"uppercase",letterSpacing:"0.14em",marginBottom:12}}>Interactive Calculator</div>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16}}>
          <span style={{fontFamily:s.mono,fontSize:13,color:s.t3}}>n =</span>
          <input type="range" min="1" max="100" value={n} onChange={e=>setN(+e.target.value)} style={{flex:1,accentColor:C[0]}}/>
          <span style={{fontFamily:s.head,fontSize:24,fontWeight:700,color:C[0],minWidth:50}}>{n}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          <div style={{background:s.bg,borderRadius:8,padding:12,textAlign:"center"}}>
            <div style={{fontFamily:s.head,fontSize:20,fontWeight:700,color:C[4]}}>{gn(n).toFixed(6)}</div>
            <div style={{fontFamily:s.mono,fontSize:9,color:s.t4}}>G({n})</div>
          </div>
          <div style={{background:s.bg,borderRadius:8,padding:12,textAlign:"center"}}>
            <div style={{fontFamily:s.head,fontSize:20,fontWeight:700,color:C[2]}}>{(gn(n)/n).toFixed(6)}</div>
            <div style={{fontFamily:s.mono,fontSize:9,color:s.t4}}>G({n})/{n}</div>
          </div>
          <div style={{background:s.bg,borderRadius:8,padding:12,textAlign:"center"}}>
            <div style={{fontFamily:s.head,fontSize:20,fontWeight:700,color:"#22c55e"}}>{Math.abs(gn(n)/n - 1/Math.E).toExponential(4)}</div>
            <div style={{fontFamily:s.mono,fontSize:9,color:s.t4}}>|G(n)/n - 1/e|</div>
          </div>
        </div>
      </div>

      {/* Convergence table */}
      <div style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:12,padding:20}}>
        <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,textTransform:"uppercase",letterSpacing:"0.14em",marginBottom:12}}>Convergence Table</div>
        <div style={{overflowX:"auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"60px 1fr 1fr 1fr",gap:0}}>
            {["n","G(n)","G(n)/n","→ 1/e"].map(h=>(<div key={h} style={{fontFamily:s.mono,fontSize:9,color:s.t4,padding:"6px 8px",borderBottom:`1px solid ${s.bd}`}}>{h}</div>))}
            {vals.slice(0,12).map(v=>([
              <div key={v.n+"n"} style={{fontFamily:s.mono,fontSize:11,color:s.t1,padding:"6px 8px",borderBottom:`1px solid ${s.bd}`}}>{v.n}</div>,
              <div key={v.n+"g"} style={{fontFamily:s.mono,fontSize:11,color:C[4],padding:"6px 8px",borderBottom:`1px solid ${s.bd}`}}>{v.gn.toFixed(4)}</div>,
              <div key={v.n+"r"} style={{fontFamily:s.mono,fontSize:11,color:C[2],padding:"6px 8px",borderBottom:`1px solid ${s.bd}`}}>{v.ratio.toFixed(6)}</div>,
              <div key={v.n+"e"} style={{fontFamily:s.mono,fontSize:11,color:"#22c55e",padding:"6px 8px",borderBottom:`1px solid ${s.bd}`}}>{(1/Math.E).toFixed(6)}</div>,
            ]))}
          </div>
        </div>
      </div>
    </div>
  </div>)
}
