import{useState,useEffect}from"react";
const C=["#FF6B2B","#FF2255","#CC00AA","#8844FF","#4488FF","#00D4FF"],G=`linear-gradient(90deg,${C.join(",")})`;
const s={bg:"#0a0a0a",s1:"#131313",bd:"#1a1a1a",t1:"#f5f5f5",t3:"#737373",t4:"#404040",mono:"'JetBrains Mono',monospace",head:"'Space Grotesk',sans-serif"};
const BLOCKS=[
  {height:1247,hash:"9a98beb50e93..0a0000",txs:3,miner:"Alice",time:"12s ago",size:"1.2KB",nonce:3153866},
  {height:1246,hash:"7f4e107f81a3..c989",txs:5,miner:"Cecilia",time:"42s ago",size:"2.1KB",nonce:892341},
  {height:1245,hash:"8ffaed72c989..c08",txs:2,miner:"Octavia",time:"1m ago",size:"0.8KB",nonce:1567234},
  {height:1244,hash:"1daac79cfc08..d268",txs:8,miner:"Lucidia",time:"2m ago",size:"3.4KB",nonce:4521098},
  {height:1243,hash:"cd4d7124d268..e0b7",txs:1,miner:"Gematria",time:"3m ago",size:"0.4KB",nonce:2234567},
  {height:1242,hash:"1091e0b6fd76..af23",txs:4,miner:"Alice",time:"4m ago",size:"1.8KB",nonce:7891234},
];
const TXS=[
  {hash:"0xf7a3..2c91",from:"@alexa",to:"@cadence",amount:"0.50 RC",type:"tip",time:"12s ago"},
  {hash:"0x8b21..e4f0",from:"@meridian",to:"@lucidia",amount:"1.00 RC",type:"transfer",time:"42s ago"},
  {hash:"0xc4e9..7d88",from:"@creator_42",to:"@alexa",amount:"29.00 RC",type:"subscription",time:"1m ago"},
  {hash:"0xa1b2..9c3d",from:"@alice",to:"@eve",amount:"0.10 RC",type:"micro",time:"2m ago"},
  {hash:"0xd5e6..f7a8",from:"@system",to:"@cecilia",amount:"5.00 RC",type:"reward",time:"3m ago"},
];
export default function A(){
  const[tab,setTab]=useState("blocks");const[tick,setTick]=useState(0);
  useEffect(()=>{const i=setInterval(()=>setTick(t=>t+1),1000);return()=>clearInterval(i)},[]);
  return(<div style={{background:s.bg,minHeight:"100vh",fontFamily:"'Inter',sans-serif",color:s.t1}}>
    <div style={{height:3,background:G}}/>
    <div style={{padding:20,maxWidth:800,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <div style={{display:"flex",gap:2}}>{C.map(c=><div key={c} style={{width:3,height:14,borderRadius:2,background:c}}/>)}</div>
        <span style={{fontFamily:s.head,fontSize:18,fontWeight:700}}>RoadChain</span>
        <span style={{fontFamily:s.mono,fontSize:10,color:s.t4}}>Explorer</span>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:6}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 6px #22c55e"}}/>
          <span style={{fontFamily:s.mono,fontSize:10,color:"#22c55e"}}>LIVE</span>
          <span style={{fontFamily:s.mono,fontSize:12,color:s.t3}}>{new Date().toLocaleTimeString("en-US",{hour12:false})}</span>
        </div>
      </div>
      <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,marginBottom:16}}>Layer-1 · secp256k1 · Python-native · Block #{1247+Math.floor(tick/30)}</div>
      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:1,background:s.bd,borderRadius:10,overflow:"hidden",marginBottom:16}}>
        {[{v:1247+Math.floor(tick/30),l:"Block Height",c:C[0]},{v:"182K",l:"Hash Rate",c:C[4]},{v:23+tick,l:"Total TXs",c:C[2]},{v:"20-bit",l:"Difficulty",c:C[3]},{v:5,l:"Validators",c:"#22c55e"}].map(x=>
          <div key={x.l} style={{background:s.s1,padding:"12px",textAlign:"center"}}>
            <div style={{fontFamily:s.head,fontSize:20,fontWeight:700,color:x.c}}>{x.v}</div>
            <div style={{fontFamily:s.mono,fontSize:8,color:s.t4,textTransform:"uppercase",letterSpacing:"0.1em"}}>{x.l}</div>
          </div>
        )}
      </div>
      <div style={{display:"flex",gap:0,borderBottom:`1px solid ${s.bd}`,marginBottom:12}}>
        {["blocks","transactions"].map(t=>(<button key={t} onClick={()=>setTab(t)} style={{background:"none",border:"none",fontFamily:s.mono,fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:tab===t?C[0]:s.t4,padding:"8px 16px",borderBottom:tab===t?`2px solid ${C[0]}`:"2px solid transparent",cursor:"pointer"}}>{t}</button>))}
      </div>
      {tab==="blocks"&&BLOCKS.map((b,i)=>(<div key={b.height} style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:8,padding:"12px 16px",marginBottom:4,display:"grid",gridTemplateColumns:"60px 1fr auto",gap:12,alignItems:"center"}}>
        <div style={{fontFamily:s.head,fontSize:18,fontWeight:700,color:C[i%6]}}>#{b.height}</div>
        <div><div style={{fontFamily:s.mono,fontSize:11,color:s.t1}}>{b.hash}</div><div style={{fontFamily:s.mono,fontSize:9,color:s.t4}}>{b.txs} txs · {b.size} · miner: {b.miner} · nonce: {b.nonce}</div></div>
        <div style={{fontFamily:s.mono,fontSize:10,color:s.t4}}>{b.time}</div>
      </div>))}
      {tab==="transactions"&&TXS.map((tx,i)=>(<div key={tx.hash} style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:8,padding:"12px 16px",marginBottom:4,display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:4,height:20,borderRadius:2,background:C[i%6]}}/>
        <div style={{flex:1}}><div style={{fontFamily:s.mono,fontSize:11,color:s.t1}}>{tx.from} → {tx.to}</div><div style={{fontFamily:s.mono,fontSize:9,color:s.t4}}>{tx.hash} · {tx.type}</div></div>
        <div style={{fontFamily:s.head,fontSize:14,fontWeight:600,color:C[0]}}>{tx.amount}</div>
        <div style={{fontFamily:s.mono,fontSize:10,color:s.t4}}>{tx.time}</div>
      </div>))}
    </div>
  </div>)
}
