import { useState } from "react";

const C = ["#FF6B2B","#FF2255","#CC00AA","#8844FF","#4488FF","#00D4FF"];
const G = `linear-gradient(90deg, ${C.join(", ")})`;

const ACCOUNTS = [
  { name: "Stripe", balance: -0.20, type: "revenue", icon: "💳", desc: "acct_1S70Zn3e5FMFdlFw" },
  { name: "Infrastructure", balance: -19.00, type: "cost", icon: "🖥️", desc: "Monthly burn rate" },
  { name: "Domain Portfolio", balance: -16.67, type: "cost", icon: "🌐", desc: "19 domains ($200/yr)" },
  { name: "Runway", balance: 0, type: "runway", icon: "🛣️", desc: "Pre-revenue" },
];

const EXPENSES = [
  { name: "DigitalOcean — Gematria", amount: -6.00, cat: "Infrastructure", date: "Monthly", node: "gematria", recurring: true },
  { name: "DigitalOcean — Anastasia", amount: -6.00, cat: "Infrastructure", date: "Monthly", node: "anastasia", recurring: true },
  { name: "Google Workspace", amount: -7.00, cat: "Operations", date: "Monthly", desc: "alexa@blackroad.io", recurring: true },
  { name: "GoDaddy — 19 Domains", amount: -16.67, cat: "Domains", date: "Monthly avg", desc: "$200/year", recurring: true },
  { name: "Cloudflare", amount: 0, cat: "Infrastructure", date: "Free tier", desc: "120 Workers, 7 Pages", recurring: false },
  { name: "Vercel", amount: 0, cat: "Infrastructure", date: "Hobby", desc: "50 projects", recurring: false },
  { name: "Railway", amount: 0, cat: "Infrastructure", date: "Free $5 credit", desc: "23 projects", recurring: false },
  { name: "GitHub", amount: 0, cat: "Infrastructure", date: "Free", desc: "16 orgs, 254 repos", recurring: false },
  { name: "Stripe Atlas", amount: -500, cat: "Legal", date: "One-time", desc: "Delaware C-Corp", recurring: false },
];

const REVENUE_TARGETS = [
  { plan: "Rider", price: 29, target: 100, current: 0, link: "https://buy.stripe.com/aFadR27Je7tP0m78Mk4Vy0p" },
  { plan: "Paver", price: 99, target: 50, current: 0, link: "https://buy.stripe.com/cNi8wI3sY15rgl5aUs4Vy0q" },
  { plan: "Enterprise", price: 299, target: 10, current: 0, link: "https://buy.stripe.com/cNidR25B67tP3yj9Qo4Vy0r" },
];

const ASSETS = [
  { name: "Pi Fleet (5 units)", value: "~$500", type: "Hardware" },
  { name: "Hailo-8 NPUs (2x)", value: "~$200", type: "Hardware" },
  { name: "52 TOPS inference", value: "Sovereign", type: "Compute" },
  { name: "254 GitHub repos", value: "22.9 GB", type: "IP" },
  { name: "82 Road products", value: "Proprietary", type: "IP" },
  { name: "30,000 agents", value: "12 MB DB", type: "AI" },
  { name: "19 domains", value: "$200/yr", type: "Brand" },
  { name: "1,648 memory entries", value: "36 MB", type: "Data" },
  { name: "100+ JSX templates", value: "204 MB", type: "Design" },
  { name: "Amundson Framework", value: "536/536", type: "Research" },
];

const s = {
  bg: "#0a0a0a", s1: "#131313", s2: "#171717", border: "#1a1a1a",
  t1: "#f5f5f5", t2: "#d4d4d4", t3: "#737373", t4: "#404040", t5: "#262626",
  mono: "'JetBrains Mono', monospace",
  sans: "'Inter', sans-serif",
  head: "'Space Grotesk', sans-serif",
};

function Num({v, color, size=28}) {
  const neg = v < 0;
  const fmt = Math.abs(v).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  return <span style={{fontFamily:s.head, fontSize:size, fontWeight:700, color: color || (neg ? C[1] : v === 0 ? s.t4 : "#22c55e")}}>{neg?"-":""}${fmt}</span>;
}

function Label({children}) {
  return <div style={{fontFamily:s.mono, fontSize:10, color:s.t4, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:10}}>{children}</div>;
}

function Card({children, style:extra}) {
  return <div style={{background:s.s1, border:`1px solid ${s.border}`, borderRadius:10, padding:"20px", ...extra}}>{children}</div>;
}

export default function CashRoad() {
  const [tab, setTab] = useState("overview");
  const monthlyBurn = EXPENSES.filter(e=>e.recurring && e.amount<0).reduce((s,e)=>s+e.amount, 0);
  const annualBurn = monthlyBurn * 12;
  const targetMRR = REVENUE_TARGETS.reduce((s,r)=>s + r.price * r.target, 0);

  return (
    <div style={{background:s.bg, minHeight:"100vh", fontFamily:s.sans, color:s.t1}}>
      {/* Gradient bar */}
      <div style={{height:3, background:G}} />

      {/* Header */}
      <div style={{padding:"20px 20px 0", maxWidth:720, margin:"0 auto"}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24}}>
          <div>
            <div style={{display:"flex", alignItems:"center", gap:8}}>
              <div style={{display:"flex", gap:2}}>{C.map(c=><div key={c} style={{width:3, height:12, borderRadius:2, background:c}}/>)}</div>
              <span style={{fontFamily:s.head, fontSize:16, fontWeight:700, color:s.t1}}>CashRoad</span>
              <span style={{fontFamily:s.mono, fontSize:10, color:s.t4, marginLeft:4}}>Finance</span>
            </div>
            <div style={{fontFamily:s.mono, fontSize:10, color:s.t5, marginTop:4}}>BlackRoad OS, Inc. — EIN 41-2663817</div>
          </div>
          <div style={{fontFamily:s.mono, fontSize:10, color:s.t4}}>Pre-revenue</div>
        </div>

        {/* Tabs */}
        <div style={{display:"flex", gap:0, borderBottom:`1px solid ${s.border}`, marginBottom:24}}>
          {["overview","expenses","revenue","assets"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{
              background:"none", border:"none", cursor:"pointer",
              fontFamily:s.mono, fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase",
              color: tab===t ? C[0] : s.t4,
              padding:"8px 16px",
              borderBottom: tab===t ? `2px solid ${C[0]}` : "2px solid transparent",
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{padding:"0 20px 60px", maxWidth:720, margin:"0 auto"}}>

        {tab === "overview" && <>
          {/* Monthly burn */}
          <Card style={{marginBottom:12}}>
            <Label>Monthly Burn Rate</Label>
            <Num v={monthlyBurn} size={36} />
            <div style={{fontFamily:s.mono, fontSize:11, color:s.t3, marginTop:6}}>
              Annual: <Num v={annualBurn} size={13} /> · Target MRR: <span style={{color:"#22c55e"}}>${targetMRR.toLocaleString()}/mo</span>
            </div>
          </Card>

          {/* Account cards */}
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:20}}>
            {ACCOUNTS.map(a=>(
              <Card key={a.name}>
                <div style={{fontSize:20, marginBottom:6}}>{a.icon}</div>
                <div style={{fontFamily:s.sans, fontSize:13, fontWeight:600, color:s.t2, marginBottom:4}}>{a.name}</div>
                <Num v={a.balance} size={20} />
                <div style={{fontFamily:s.mono, fontSize:9, color:s.t5, marginTop:4}}>{a.desc}</div>
              </Card>
            ))}
          </div>

          {/* What's free */}
          <Card>
            <Label>Free Tier Infrastructure</Label>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
              {EXPENSES.filter(e=>e.amount===0).map(e=>(
                <div key={e.name} style={{padding:"8px 0", borderBottom:`1px solid ${s.border}`}}>
                  <div style={{fontFamily:s.sans, fontSize:12, color:s.t2}}>{e.name}</div>
                  <div style={{fontFamily:s.mono, fontSize:10, color:s.t4}}>{e.desc}</div>
                </div>
              ))}
            </div>
          </Card>
        </>}

        {tab === "expenses" && <>
          <Label>Recurring Costs</Label>
          <Card style={{marginBottom:16}}>
            {EXPENSES.filter(e=>e.amount<0).map((e,i)=>(
              <div key={e.name} style={{display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom: i<EXPENSES.filter(x=>x.amount<0).length-1 ? `1px solid ${s.border}` : "none"}}>
                <div style={{flex:1}}>
                  <div style={{fontFamily:s.sans, fontSize:13, color:s.t2, fontWeight:500}}>{e.name}</div>
                  <div style={{fontFamily:s.mono, fontSize:10, color:s.t4}}>{e.cat} · {e.date}</div>
                </div>
                <Num v={e.amount} size={15} />
              </div>
            ))}
          </Card>

          <Label>Free Services</Label>
          <Card>
            {EXPENSES.filter(e=>e.amount===0).map((e,i,a)=>(
              <div key={e.name} style={{display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom: i<a.length-1 ? `1px solid ${s.border}` : "none"}}>
                <div style={{flex:1}}>
                  <div style={{fontFamily:s.sans, fontSize:13, color:s.t2}}>{e.name}</div>
                  <div style={{fontFamily:s.mono, fontSize:10, color:s.t4}}>{e.desc}</div>
                </div>
                <span style={{fontFamily:s.mono, fontSize:12, color:"#22c55e"}}>$0</span>
              </div>
            ))}
          </Card>
        </>}

        {tab === "revenue" && <>
          <Label>Revenue Targets (MRR)</Label>
          {REVENUE_TARGETS.map(r=>(
            <Card key={r.plan} style={{marginBottom:8}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10}}>
                <div>
                  <div style={{fontFamily:s.head, fontSize:16, fontWeight:600, color:s.t1}}>{r.plan}</div>
                  <div style={{fontFamily:s.mono, fontSize:11, color:s.t3}}>${r.price}/mo × {r.target} subscribers</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontFamily:s.head, fontSize:22, fontWeight:700, color:"#22c55e"}}>${(r.price * r.target).toLocaleString()}</div>
                  <div style={{fontFamily:s.mono, fontSize:10, color:s.t4}}>target MRR</div>
                </div>
              </div>
              {/* Progress bar */}
              <div style={{height:6, background:s.border, borderRadius:99, overflow:"hidden", marginBottom:8}}>
                <div style={{height:"100%", width:`${(r.current/r.target)*100}%`, background:G, borderRadius:99, minWidth: r.current>0?4:0}} />
              </div>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <span style={{fontFamily:s.mono, fontSize:10, color:s.t4}}>{r.current}/{r.target} subscribers</span>
                <a href={r.link} target="_blank" rel="noopener" style={{fontFamily:s.mono, fontSize:10, color:C[0], textDecoration:"none"}}>→ payment link</a>
              </div>
            </Card>
          ))}

          <Card style={{marginTop:16}}>
            <Label>Revenue Summary</Label>
            <div style={{fontFamily:s.mono, fontSize:12, color:s.t3, lineHeight:2}}>
              Current MRR: <span style={{color:s.t1}}>$0</span><br/>
              Target MRR: <span style={{color:"#22c55e"}}>${targetMRR.toLocaleString()}</span><br/>
              Monthly burn: <Num v={monthlyBurn} size={12} /><br/>
              Breakeven: <span style={{color:C[4]}}>1 Rider subscriber</span><br/>
              To profitability: <span style={{color:C[0]}}>${Math.abs(monthlyBurn).toFixed(0)}/mo = {Math.ceil(Math.abs(monthlyBurn)/29)} Rider subs</span>
            </div>
          </Card>
        </>}

        {tab === "assets" && <>
          <Label>Company Assets</Label>
          <Card>
            {ASSETS.map((a,i)=>(
              <div key={a.name} style={{display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom: i<ASSETS.length-1 ? `1px solid ${s.border}` : "none"}}>
                <div style={{width:4, height:20, borderRadius:2, background:C[i % C.length], flexShrink:0}} />
                <div style={{flex:1}}>
                  <div style={{fontFamily:s.sans, fontSize:13, color:s.t2, fontWeight:500}}>{a.name}</div>
                  <div style={{fontFamily:s.mono, fontSize:10, color:s.t4}}>{a.type}</div>
                </div>
                <span style={{fontFamily:s.mono, fontSize:12, color:s.t3}}>{a.value}</span>
              </div>
            ))}
          </Card>

          <Card style={{marginTop:12}}>
            <Label>Incorporation</Label>
            <div style={{fontFamily:s.mono, fontSize:12, color:s.t3, lineHeight:2}}>
              Entity: <span style={{color:s.t1}}>BlackRoad OS, Inc.</span><br/>
              Type: <span style={{color:s.t1}}>Delaware C-Corp</span><br/>
              Founded: <span style={{color:s.t1}}>November 17, 2025</span><br/>
              EIN: <span style={{color:s.t1}}>41-2663817</span><br/>
              File #: <span style={{color:s.t1}}>10405914</span><br/>
              Shares: <span style={{color:s.t1}}>10M Common ($0.00001 par)</span><br/>
              Agent: <span style={{color:s.t1}}>Legalinc Corporate Services Inc.</span><br/>
              CEO: <span style={{color:C[0]}}>Alexa Louise Amundson</span>
            </div>
          </Card>
        </>}
      </div>
    </div>
  );
}
