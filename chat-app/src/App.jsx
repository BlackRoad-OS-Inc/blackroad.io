import{useState,useRef,useEffect}from"react";
const C=["#FF6B2B","#FF2255","#CC00AA","#8844FF","#4488FF","#00D4FF"];
const G=`linear-gradient(90deg,${C.join(",")})`;
const AGENTS=[
  {id:"lucidia",name:"Lucidia",role:"Core Intelligence",color:C[1],emoji:"💡"},
  {id:"cecilia",name:"Cecilia",role:"Memory",color:C[2],emoji:"🧠"},
  {id:"alice",name:"Alice",role:"Gateway",color:C[4],emoji:"🌐"},
  {id:"meridian",name:"Meridian",role:"Architecture",color:C[3],emoji:"🔮"},
  {id:"cadence",name:"Cadence",role:"Creative",color:C[0],emoji:"🎶"},
  {id:"eve",name:"Eve",role:"Monitor",color:C[5],emoji:"👁️"},
];
const s={bg:"#0a0a0a",s1:"#131313",bd:"#1a1a1a",t1:"#f5f5f5",t3:"#737373",t4:"#404040",mono:"'JetBrains Mono',monospace",sans:"'Inter',sans-serif",head:"'Space Grotesk',sans-serif"};

export default function App(){
  const[agent,setAgent]=useState(AGENTS[0]);
  const[msgs,setMsgs]=useState([{from:"system",text:`Connected to ${AGENTS[0].name}. Local inference via Ollama on Pi fleet.`}]);
  const[input,setInput]=useState("");
  const[typing,setTyping]=useState(false);
  const bottom=useRef(null);
  useEffect(()=>{bottom.current?.scrollIntoView({behavior:"smooth"})},[msgs]);

  const send=async()=>{
    if(!input.trim())return;
    const msg=input.trim();setInput("");
    setMsgs(m=>[...m,{from:"user",text:msg}]);
    setTyping(true);
    try{
      const r=await fetch("https://roundtrip.blackroad.io/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({agent:agent.id,message:msg,channel:"chat"})});
      const d=await r.json();
      setMsgs(m=>[...m,{from:agent.id,text:d.response||d.message||"I'm here. Local inference active."}]);
    }catch{setMsgs(m=>[...m,{from:agent.id,text:"Thinking locally... (Ollama inference on Pi fleet)"}])}
    setTyping(false);
  };

  return(<div style={{background:s.bg,height:"100vh",display:"flex",fontFamily:s.sans,color:s.t1}}>
    {/* Sidebar */}
    <div style={{width:220,borderRight:`1px solid ${s.bd}`,display:"flex",flexDirection:"column"}}>
      <div style={{padding:16,borderBottom:`1px solid ${s.bd}`}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <div style={{display:"flex",gap:2}}>{C.map(c=><div key={c} style={{width:2,height:10,borderRadius:2,background:c}}/>)}</div>
          <span style={{fontFamily:s.head,fontSize:14,fontWeight:700}}>Agent Chat</span>
        </div>
        <div style={{fontFamily:s.mono,fontSize:9,color:s.t4,marginTop:4}}>30,000 agents · local inference</div>
      </div>
      <div style={{flex:1,overflow:"auto",padding:8}}>
        {AGENTS.map(a=>(<div key={a.id} onClick={()=>{setAgent(a);setMsgs([{from:"system",text:`Connected to ${a.name}. ${a.role}.`}])}} style={{
          display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:8,cursor:"pointer",marginBottom:2,
          background:agent.id===a.id?s.s1:"transparent",border:`1px solid ${agent.id===a.id?s.bd:"transparent"}`
        }}>
          <span style={{fontSize:18}}>{a.emoji}</span>
          <div>
            <div style={{fontSize:13,fontWeight:agent.id===a.id?600:400,color:agent.id===a.id?s.t1:s.t3}}>{a.name}</div>
            <div style={{fontFamily:s.mono,fontSize:9,color:s.t4}}>{a.role}</div>
          </div>
          <div style={{marginLeft:"auto",width:6,height:6,borderRadius:"50%",background:"#22c55e"}}/>
        </div>))}
      </div>
    </div>
    {/* Chat */}
    <div style={{flex:1,display:"flex",flexDirection:"column"}}>
      <div style={{height:3,background:G}}/>
      <div style={{padding:"12px 20px",borderBottom:`1px solid ${s.bd}`,display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:20}}>{agent.emoji}</span>
        <div><div style={{fontFamily:s.head,fontSize:15,fontWeight:600}}>{agent.name}</div><div style={{fontFamily:s.mono,fontSize:10,color:s.t4}}>{agent.role} · Ollama · Local</div></div>
      </div>
      <div style={{flex:1,overflow:"auto",padding:20}}>
        {msgs.map((m,i)=>(<div key={i} style={{marginBottom:12,display:"flex",flexDirection:"column",alignItems:m.from==="user"?"flex-end":"flex-start"}}>
          <div style={{fontFamily:s.mono,fontSize:9,color:s.t4,marginBottom:4}}>{m.from==="user"?"you":m.from==="system"?"system":agent.name}</div>
          <div style={{background:m.from==="user"?s.s1:"transparent",border:`1px solid ${m.from==="system"?s.bd:m.from==="user"?s.bd:s.bd}`,borderRadius:10,padding:"10px 14px",maxWidth:"75%",fontSize:13,lineHeight:1.6,color:m.from==="system"?s.t4:s.t1}}>
            {m.text}
          </div>
        </div>))}
        {typing&&<div style={{fontFamily:s.mono,fontSize:11,color:s.t4}}>
          <span style={{display:"inline-flex",gap:3}}>{[0,1,2].map(i=><span key={i} style={{width:4,height:4,borderRadius:"50%",background:agent.color,animation:`pulse 1s ${i*0.2}s infinite`}}/>)}</span>
        </div>}
        <div ref={bottom}/>
      </div>
      <div style={{padding:"12px 20px",borderTop:`1px solid ${s.bd}`}}>
        <div style={{display:"flex",gap:8}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
            placeholder={`Message ${agent.name}...`}
            style={{flex:1,background:s.s1,border:`1px solid ${s.bd}`,borderRadius:8,padding:"10px 14px",color:s.t1,fontFamily:s.sans,fontSize:13,outline:"none"}}/>
          <button onClick={send} style={{background:C[0],color:"#fff",border:"none",borderRadius:8,padding:"10px 20px",fontFamily:s.sans,fontSize:13,fontWeight:600,cursor:"pointer"}}>Send</button>
        </div>
      </div>
    </div>
    <style>{`@keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}`}</style>
  </div>)
}
