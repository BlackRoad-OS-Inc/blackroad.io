import{useState}from"react";
const C=["#FF6B2B","#FF2255","#CC00AA","#8844FF","#4488FF","#00D4FF"];const G=`linear-gradient(90deg,${C.join(",")})`;
const s={bg:"#0a0a0a",s1:"#131313",bd:"#1a1a1a",t1:"#f5f5f5",t3:"#737373",t4:"#404040",mono:"'JetBrains Mono',monospace",sans:"'Inter',sans-serif",head:"'Space Grotesk',sans-serif"};
const SUBJECTS=[{name:"Algebra",icon:"📐",level:3,next:"Quadratic equations"},{name:"Geometry",icon:"📏",level:2,next:"Triangle congruence"},{name:"Physics",icon:"⚡",level:1,next:"Newton's laws"},{name:"Chemistry",icon:"🧪",level:2,next:"Balancing equations"},{name:"Biology",icon:"🧬",level:4,next:"Cell division"},{name:"History",icon:"📜",level:3,next:"Civil War causes"}];
const PROBLEMS=[
  {q:"Solve: 3x + 7 = 22",subject:"Algebra",difficulty:"medium",hint:"Subtract 7 from both sides first",steps:["3x + 7 = 22","3x = 22 - 7","3x = 15","x = 15 ÷ 3","x = 5"],answer:"x = 5"},
  {q:"Find the area of a triangle with base 8cm and height 5cm",subject:"Geometry",difficulty:"easy",hint:"Area = ½ × base × height",steps:["A = ½ × b × h","A = ½ × 8 × 5","A = ½ × 40","A = 20 cm²"],answer:"20 cm²"},
  {q:"A car travels 120 miles in 2 hours. What is its average speed?",subject:"Physics",difficulty:"easy",hint:"Speed = Distance ÷ Time",steps:["v = d ÷ t","v = 120 ÷ 2","v = 60 mph"],answer:"60 mph"},
];
export default function App(){
  const[tab,setTab]=useState("subjects");
  const[prob,setProb]=useState(null);
  const[step,setStep]=useState(0);
  const[showHint,setShowHint]=useState(false);
  return(<div style={{background:s.bg,minHeight:"100vh",fontFamily:s.sans,color:s.t1}}>
    <div style={{height:3,background:G}}/>
    <div style={{padding:20,maxWidth:600,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <div style={{display:"flex",gap:2}}>{C.map(c=><div key={c} style={{width:3,height:14,borderRadius:2,background:c}}/>)}</div>
        <span style={{fontFamily:s.head,fontSize:18,fontWeight:700}}>RoadWork</span>
        <span style={{fontFamily:s.mono,fontSize:10,color:s.t4}}>Tutor</span>
      </div>
      <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,marginBottom:20}}>AI tutoring · conceptual understanding · not drill-and-practice</div>
      <div style={{display:"flex",gap:0,borderBottom:`1px solid ${s.bd}`,marginBottom:20}}>
        {["subjects","practice","progress"].map(t=>(<button key={t} onClick={()=>{setTab(t);setProb(null)}} style={{background:"none",border:"none",fontFamily:s.mono,fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:tab===t?C[0]:s.t4,padding:"8px 16px",borderBottom:tab===t?`2px solid ${C[0]}`:"2px solid transparent",cursor:"pointer"}}>{t}</button>))}
      </div>
      {tab==="subjects"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {SUBJECTS.map(sub=>(<div key={sub.name} style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:10,padding:16}}>
          <div style={{fontSize:24,marginBottom:8}}>{sub.icon}</div>
          <div style={{fontFamily:s.head,fontSize:15,fontWeight:600,marginBottom:4}}>{sub.name}</div>
          <div style={{height:4,background:s.bd,borderRadius:99,marginBottom:8}}><div style={{height:"100%",width:`${sub.level*20}%`,background:G,borderRadius:99}}/></div>
          <div style={{fontFamily:s.mono,fontSize:10,color:s.t4}}>Next: {sub.next}</div>
        </div>))}
      </div>}
      {tab==="practice"&&!prob&&<div>{PROBLEMS.map((p,i)=>(<div key={i} onClick={()=>{setProb(p);setStep(0);setShowHint(false)}} style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:10,padding:16,marginBottom:8,cursor:"pointer"}}>
        <div style={{fontFamily:s.mono,fontSize:9,color:C[i%6],textTransform:"uppercase",marginBottom:6}}>{p.subject} · {p.difficulty}</div>
        <div style={{fontSize:14,fontWeight:500}}>{p.q}</div>
      </div>))}</div>}
      {tab==="practice"&&prob&&<div>
        <div style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:10,padding:20,marginBottom:12}}>
          <div style={{fontFamily:s.mono,fontSize:9,color:C[0],textTransform:"uppercase",marginBottom:10}}>{prob.subject}</div>
          <div style={{fontSize:16,fontWeight:600,marginBottom:16}}>{prob.q}</div>
          {showHint&&<div style={{background:s.bg,borderRadius:8,padding:12,marginBottom:12,borderLeft:`3px solid ${C[4]}`}}><div style={{fontFamily:s.mono,fontSize:10,color:C[4],marginBottom:4}}>HINT</div><div style={{fontSize:13,color:s.t3}}>{prob.hint}</div></div>}
          <div style={{fontFamily:s.mono,fontSize:10,color:s.t4,textTransform:"uppercase",marginBottom:8}}>Step-by-step</div>
          {prob.steps.map((st,i)=>(<div key={i} style={{padding:"8px 12px",borderRadius:6,marginBottom:4,background:i<=step?s.bg:"transparent",border:`1px solid ${i<=step?s.bd:"transparent"}`,opacity:i<=step?1:0.2,transition:"all 0.2s"}}>
            <span style={{fontFamily:s.mono,fontSize:12,color:i===step?C[0]:s.t3}}>{st}</span>
          </div>))}
          <div style={{display:"flex",gap:8,marginTop:16}}>
            {!showHint&&<button onClick={()=>setShowHint(true)} style={{background:"transparent",border:`1px solid ${s.bd}`,borderRadius:8,padding:"8px 16px",color:s.t3,fontFamily:s.mono,fontSize:11,cursor:"pointer"}}>Show hint</button>}
            {step<prob.steps.length-1&&<button onClick={()=>setStep(step+1)} style={{background:C[0],border:"none",borderRadius:8,padding:"8px 16px",color:"#fff",fontFamily:s.sans,fontSize:13,fontWeight:600,cursor:"pointer"}}>Next step</button>}
            {step===prob.steps.length-1&&<div style={{fontFamily:s.head,fontSize:18,fontWeight:700,color:"#22c55e",padding:"8px 0"}}>Answer: {prob.answer}</div>}
          </div>
        </div>
        <button onClick={()=>setProb(null)} style={{fontFamily:s.mono,fontSize:10,color:s.t4,background:"none",border:"none",cursor:"pointer"}}>← back to problems</button>
      </div>}
      {tab==="progress"&&<div style={{background:s.s1,border:`1px solid ${s.bd}`,borderRadius:10,padding:20}}>
        <div style={{fontFamily:s.head,fontSize:20,fontWeight:700,marginBottom:16}}>Your Progress</div>
        {SUBJECTS.map((sub,i)=>(<div key={sub.name} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${s.bd}`}}>
          <span style={{fontSize:18}}>{sub.icon}</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:500}}>{sub.name}</div><div style={{height:3,background:s.bd,borderRadius:99,marginTop:4}}><div style={{height:"100%",width:`${sub.level*20}%`,background:C[i%6],borderRadius:99}}/></div></div>
          <span style={{fontFamily:s.mono,fontSize:11,color:s.t3}}>{sub.level*20}%</span>
        </div>))}
      </div>}
    </div>
  </div>)
}
