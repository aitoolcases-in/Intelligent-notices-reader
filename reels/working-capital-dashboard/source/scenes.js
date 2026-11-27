// ---------- Working capital dashboard with AI (Ronnie) ----------
const RN=(o)=>Object.assign({glasses:false,mustache:true},o);
const MONO="'JetBrains Mono','DejaVu Sans Mono',monospace";
const CAP=(y,html,u,a,size=52)=>T(80,y,`<div style="width:920px;font-family:MS,MSX;font-weight:800;font-size:${size}px;line-height:1.15;color:#034620">${html}</div>`,ap(u,a));
const typ=(s,u,a,cps=40)=>{const n=Math.max(0,Math.floor((u-a)*cps));return n>=s.length?s:s.slice(0,n)+'<span style="opacity:.8">▍</span>'};
function frame(x,y,w,title,inner,u,a,dark){const p=P(u,a,.4);
  return `<div class="ab" style="left:${x}px;top:${y}px;width:${w}px;opacity:${p};transform:translateY(${(1-p)*20}px);background:${dark?'#034620':'#fff'};border:4px solid #034620;border-radius:20px;overflow:hidden;box-shadow:0 10px 0 rgba(3,70,32,.12)"><div style="background:${dark?'#0b5a2e':'#dfe9e2'};padding:12px 18px;display:flex;gap:10px;align-items:center"><span style="width:14px;height:14px;border-radius:50%;background:#e2b04a"></span><span style="width:14px;height:14px;border-radius:50%;background:#9fbfab"></span><span class="lab" style="font-size:22px;color:${dark?'#b9d0c1':'#034620'};margin-left:10px">${title}</span></div><div style="padding:20px 22px">${inner}</div></div>`;}
// KPI tile
function kpi(lab,val,sub,col,hl,u,a){const p=P(u,a,.35);const n=Math.round(val*clamp((u-a)/.8));
  return `<div style="flex:1;min-width:0;background:${hl?'#f6e2b4':'#f7f5ef'};border:3px solid ${hl?'#034620':'#9fbfab'};border-radius:16px;padding:16px 18px;opacity:${p};${hl?'box-shadow:0 0 0 5px #e2b04a;':''}"><div class="lab" style="font-size:18px;color:#3f5e4b">${lab}</div><div style="font-family:MS,MSX;font-weight:800;font-size:64px;line-height:1;color:${col||'#034620'};margin-top:6px">${n}<span style="font-size:24px;color:#3f5e4b"> days</span></div><div style="font-size:20px;color:#3f5e4b;margin-top:4px">${sub}</div></div>`;}
function dashboard(u,a,focus){
  const pts=[[0,58],[1,55],[2,57],[3,52],[4,50],[5,49]];
  const X=i=>20+i*150, Y=v=>130-(v-40)*5;
  const line='M'+pts.map(([i,v])=>`${X(i)},${Y(v)}`).join(' L');
  const over=[['Rao Traders','₹6.2L','68 days'],['Sharma & Sons','₹4.8L','55 days'],['Mehta Stores','₹3.1L','47 days']];
  return `<div style="display:flex;gap:12px">${kpi('DEBTOR DAYS',42,'customers pay you','#a8452a',focus==='d',u,a)}${kpi('INVENTORY DAYS',35,'stock sits',null,focus==='i',u,a+.2)}</div>
   <div style="display:flex;gap:12px;margin-top:12px">${kpi('CREDITOR DAYS',28,'you pay suppliers',null,focus==='c',u,a+.4)}${kpi('CASH CYCLE',49,'35 + 42 − 28','#a8452a',focus==='cc',u,a+.6)}</div>
   <div style="display:flex;gap:12px;margin-top:12px">
    <div style="flex:1;border:3px solid #9fbfab;border-radius:16px;padding:12px 14px;opacity:${P(u,a+1,.3)}"><div class="lab" style="font-size:18px;color:#3f5e4b">CASH CYCLE · 6 MONTHS</div><svg width="100%" height="150" viewBox="0 0 800 150"><path d="${line}" fill="none" stroke="#2d7049" stroke-width="6" ${draw(P(u,a+1.2,1))}/>${pts.map(([i,v])=>`<circle cx="${X(i)}" cy="${Y(v)}" r="7" fill="#034620" style="opacity:${P(u,a+1.2+i*.15,.2)}"/>`).join('')}</svg></div>
    <div style="flex:1;border:3px solid #9fbfab;border-radius:16px;padding:12px 14px;opacity:${P(u,a+1.4,.3)};${focus==='o'?'box-shadow:0 0 0 5px #e2b04a;':''}"><div class="lab" style="font-size:18px;color:#a8452a">TOP OVERDUE</div>${over.map(r=>`<div style="display:flex;justify-content:space-between;font-size:20px;padding:5px 0;border-bottom:2px dashed #dfe9e2"><span>${r[0]}</span><b>${r[1]}</b></div>`).join('')}</div></div>`;
}

// 1 hook
SC.push({kick:'ACCREVISE EXPLAINS',ring:[520,700,1100],d:4.4,f:u=>
  `<div class="hl" style="${ap(u,.2)}">How many days is your</div>` +
  `<div class="hl" style="top:372px;${ap(u,.6)}"><span class="mark loss">money stuck?</span></div>` +
  T(80,500,`<div style="font-family:MS,MSX;font-weight:800;font-size:54px;color:#034620;opacity:${P(u,2.6,.4)};transform:translateY(${(1-P(u,2.6,.4))*20}px)">See it on <span class="mark">one screen, with AI.</span></div>`) +
  sv(rohan(150,640,1.5,RN({mood:u>2.8?'happy':'worried',scratch:u<2.8})),0,0)
});
// 2 ronnie
SC.push({kick:'MEET RONNIE',ring:[-500,1100,1000],d:4,f:u=>
  hl(u,'Sales good. ','Cash short.','',' loss') +
  `<div style="opacity:${P(u,.4,.5)}">`+sv(rohan(-10,560,1.0,RN({prop:'bill',mood:'worried',sweat:true})),0,0)+`</div>` +
  T(540,520,`<div style="width:440px;background:#fff;border:4px solid #034620;border-radius:18px;padding:20px 24px;font-size:34px;line-height:1.5"><div style="opacity:${P(u,.8,.3)}">Sales: <b style="color:${G6}">₹30L/month ↑</b></div><div style="opacity:${P(u,1.6,.3)}">Bank: <b style="color:${LOSS}">always tight ↓</b></div></div>`)
});
// 3 step 1 export
SC.push({kick:'STEP 1 · EXPORT',ring:[600,1250,900],d:4.4,f:u=>
  hl(u,'Export ','4 reports') +
  [['Sales register','what you sold'],['Purchase register','what you bought'],['Debtors / ageing','who owes you'],['Stock summary','what’s on the shelf']].map(([t,s],i)=>T(80+(i%2)*470,480+Math.floor(i/2)*250,`<div style="width:450px;height:220px;box-sizing:border-box;background:${i%3?'#dfe9e2':'#f6e2b4'};border:4px solid #034620;border-radius:20px;padding:24px 26px"><div style="font-size:44px">📄</div><div style="font-family:MS,MSX;font-weight:800;font-size:34px;margin-top:6px">${t}</div><div style="font-size:28px;color:#3f5e4b">${s}</div></div>`,ap(u,.6+i*.6))).join('') +
  T(80,1000,`<div class="foot" style="font-size:26px;width:920px">From Tally, Zoho, Busy or Excel: Excel or PDF is fine.</div>`,ap(u,3))
});
// 4 step 2 upload
SC.push({kick:'STEP 2 · ASK CLAUDE',ring:[640,-300,800],d:3.4,f:u=>
  hl(u,'Upload and ','ask') +
  frame(80,480,920,'CLAUDE',`<div style="display:flex;gap:12px;flex-wrap:wrap">${['sales.xlsx','purchases.xlsx','debtors.xlsx','stock.xlsx'].map((f,i)=>`<span style="background:#dfe9e2;border:3px solid #034620;border-radius:12px;padding:10px 16px;font-size:26px;opacity:${P(u,.8+i*.3,.25)}">📎 ${f}</span>`).join('')}</div>`,u,.4)
});
// 5 the prompt
SC.push({kick:'STEP 2 · ASK CLAUDE',ring:[-400,1300,900],d:5,f:u=>
  hl(u,'One clear ','prompt') +
  frame(80,480,920,'CLAUDE · YOU TYPE',`<div style="font-family:${MONO};font-size:30px;line-height:1.5;color:#f7f5ef;white-space:pre-wrap">${typ('Build a working capital dashboard from these files.\nShow debtor days, creditor days, inventory days and my cash cycle, a 6-month trend, and top overdue customers.\nFlag anything unhealthy for my industry and explain each number simply.',u,.5,75)}</div>`,u,.3,true)
});
// 6 dashboard appears
SC.push({kick:'STEP 3 · YOUR DASHBOARD',ring:[600,1300,1000],d:3.6,f:u=>
  hl(u,'Built in ','minutes') + frame(60,460,960,'CLAUDE · WORKING CAPITAL DASHBOARD',dashboard(u,.6),u,.3)
});
// 7 debtor days
SC.push({kick:'READ IT',ring:[-450,-300,900],d:3,f:u=>
  hl(u,'Debtor days: ','42','',' loss') + frame(60,460,960,'CLAUDE · WORKING CAPITAL DASHBOARD',dashboard(u,-5,'d'),u,-1) +
  CAP(1270,`Customers take <span class="mark loss">6 weeks</span> to pay.`,u,.6,46)
});
// 8 inventory + creditor
SC.push({kick:'READ IT',ring:[560,1250,1000],d:3,f:u=>
  hl(u,'Stock 35. ','Suppliers 28.') + frame(60,460,960,'CLAUDE · WORKING CAPITAL DASHBOARD',dashboard(u,-5,u<1.4?'i':'c'),u,-1)
});
// 9 the cycle
SC.push({kick:'THE CASH CYCLE',ring:[-500,1350,900],d:4.4,f:u=>{
  const w=v=>v*11;
  return hl(u,'49 days ','stuck','',' loss') +
   sv(`<g filter="url(#pencil)"><rect x="80" y="540" width="${w(35)*P(u,.5,.6)}" height="110" fill="url(#hA)" stroke="${INK}" stroke-width="5"/><rect x="${80+w(35)}" y="540" width="${w(42)*P(u,1.2,.6)}" height="110" fill="url(#hR)" stroke="${INK}" stroke-width="5"/><rect x="80" y="720" width="${w(28)*P(u,2,.6)}" height="90" fill="url(#hN)" stroke="${INK}" stroke-width="5"/></g>`) +
   T(90,500,`<span class="lab" style="font-size:24px">STOCK SITS · 35</span>`,ap(u,.5)) + T(80+w(35)+10,500,`<span class="lab" style="font-size:24px;color:${LOSS}">CUSTOMERS PAY · 42</span>`,ap(u,1.2)) +
   T(90,830,`<span class="lab" style="font-size:24px;color:${G6}">− SUPPLIERS WAIT · 28</span>`,ap(u,2)) +
   CAP(920,`35 + 42 − 28 = <span class="mark loss">49 days</span>`,u,2.6,60) +
   T(80,1020,`<div style="font-size:40px;color:#034620;width:920px;line-height:1.3">Every rupee he spends takes <b>7 weeks</b> to come back.</div>`,ap(u,3.2));
}});
// 10 question
SC.push({kick:'SO…',ring:[-300,400,1300],green:true,d:2.2,f:u=>
  `<div class="hl" style="top:800px;text-align:center;${ap(u,.2)}">What can he <span class="mark">fix?</span></div>`
});
// 11 the fix
SC.push({kick:'THE FIX',ring:[600,1250,900],d:4.4,f:u=>
  hl(u,'Collect ','faster') +
  T(80,490,`<div style="display:flex;gap:30px;align-items:center"><div style="text-align:center"><div style="font-family:MS,MSX;font-weight:800;font-size:110px;color:${LOSS}">42</div><div class="lab" style="font-size:22px">DEBTOR DAYS NOW</div></div><div style="font-family:MS,MSX;font-weight:800;font-size:80px;opacity:${P(u,.8,.3)}">→</div><div style="text-align:center;opacity:${P(u,1,.3)}"><div style="font-family:MS,MSX;font-weight:800;font-size:110px;color:${G6}">30</div><div class="lab" style="font-size:22px">TARGET</div></div></div>`,ap(u,.4)) +
  CAP(760,`Frees up <span class="mark">₹12 lakh</span> of his own cash.`,u,1.8,58) +
  T(80,920,`<div class="foot" style="font-size:26px;width:920px">12 fewer days × ₹1 lakh sales a day</div>`,ap(u,2.4)) +
  `<div style="opacity:${P(u,2.4,.5)}">`+sv(rohan(340,1000,.75,RN({mood:'cheer',jump:u>2.6&&u<4.2})),0,0)+`</div>`
});
// 12 monthly refresh
SC.push({kick:'EVERY MONTH',ring:[-400,1300,900],d:3,f:u=>
  hl(u,'Refresh ','monthly') +
  T(80,500,`<div style="font-size:44px;color:#034620;line-height:1.5;width:920px"><div style="opacity:${P(u,.5,.3)}">📤 Upload fresh exports</div><div style="opacity:${P(u,1,.3)}">📈 Ask Claude to update the dashboard</div><div style="opacity:${P(u,1.5,.3)}">👀 Watch the trend, not one number</div></div>`)
});
// 13 to be fair
SC.push({kick:'TO BE FAIR',ring:[600,1300,1000],d:3.6,f:u=>
  hl(u,'Garbage in, ','garbage out','',' loss') +
  T(80,500,`<div style="font-size:44px;color:#034620;line-height:1.5;width:920px"><div style="opacity:${P(u,.5,.3)}"><span style="color:${G6};font-family:MS,MSX;font-weight:800">✓</span> Use clean, complete exports</div><div style="opacity:${P(u,1.2,.3)}"><span style="color:${G6};font-family:MS,MSX;font-weight:800">✓</span> Cross-check with your books or CA</div><div style="opacity:${P(u,1.9,.3)}"><span style="color:${G6};font-family:MS,MSX;font-weight:800">✓</span> Check your AI privacy settings first</div></div>`)
});
// 14 CTA
SC.push({kick:null,ring:[-300,150,1700],green:true,logo:false,d:4,f:u=>
  T(0,330,`<div style="width:1080px;text-align:center"><img src="logo-paper.png" style="height:330px"></div>`,ap(u,.2)) +
  `<div class="hl" style="left:0;width:1080px;top:780px;text-align:center;${ap(u,.5)}">Don’t guess your cash.</div>` +
  `<div class="hl" style="left:0;width:1080px;top:880px;text-align:center;${ap(u,1.1)}"><span class="mark">See it.</span></div>` +
  T(0,1010,`<div style="width:1080px;text-align:center;font-family:MS,MSX;font-weight:800;font-size:40px;color:#e2b04a">Comment “DASHBOARD” for the prompt</div>`,ap(u,1.8)) +
  T(110,1120,`<div class="foot" style="width:860px;text-align:center;color:#b9d0c1">Illustrative numbers and screens. Healthy ranges vary by industry. Not financial advice.</div>`,ap(u,2.2))
});
