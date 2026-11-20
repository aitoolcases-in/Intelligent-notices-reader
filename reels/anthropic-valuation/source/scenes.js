// ---------- drawings ----------
function stall(x,y,s,u,a){ // chai stall: awning, counter, kettle, glasses
  const p=P(u,a,.45);
  return `<g filter="url(#pencil)" transform="translate(${x},${y}) scale(${s})" style="opacity:${p}">
   <path d="M0,0 H300 L280,60 H20 Z" fill="url(#hA)" stroke="${INK}" stroke-width="5"/>
   <path d="M20,60 V300 M280,60 V300" stroke="${INK}" stroke-width="5"/>
   <rect x="0" y="200" width="300" height="110" fill="url(#hG)" stroke="${INK}" stroke-width="5"/>
   <path d="M90,200 C70,140 150,130 150,170 L150,200 Z" fill="url(#hN)" stroke="${INK}" stroke-width="4"/><path d="M150,170 C175,160 185,150 195,140" stroke="${INK}" stroke-width="4" fill="none"/>
   <rect x="200" y="168" width="22" height="32" fill="#fff" stroke="${INK}" stroke-width="3"/><rect x="230" y="168" width="22" height="32" fill="#fff" stroke="${INK}" stroke-width="3"/>
   <text x="150" y="275" text-anchor="middle" font-family="MS,MSX" font-weight="800" font-size="36" fill="${INK}" stroke="none">CHAI</text></g>`;
}
function bars(u,list,y0,hmax,maxv){ // [{lab,val,txt,at,col}]
  const w=200, gap=90, x0=110;
  let g='',t='';
  list.forEach((b,i)=>{const p=P(u,b.at,.8), h=hmax*b.val/maxv*p, x=x0+i*(w+gap);
    g+=`<rect x="${x}" y="${y0-h}" width="${w}" height="${h}" fill="url(#${b.pat||'hN'})" stroke="${INK}" stroke-width="5"/>`;
    t+=T(x-20,y0+16,`<div style="width:${w+40}px;text-align:center" class="lab"><span style="font-size:24px;color:#3f5e4b">${b.lab}</span></div>`,`opacity:${P(u,b.at,.3)}`);
    t+=T(x-40,y0-h-70,`<div style="width:${w+80}px;text-align:center"><span style="font-family:MS,MSX;font-weight:800;font-size:46px;color:${b.col||'#034620'}">${b.txt}</span></div>`,`opacity:${P(u,b.at+.6,.3)}`);});
  return sv(`<g filter="url(#pencil)">${g}<path d="M80,${y0} H1000" stroke="${INK}" stroke-width="5"/></g>`)+t;
}
const RO=(o)=>Object.assign({},o);
const BUY=(o)=>Object.assign({mustache:true,grey:true},o);

// 1 hook: negative + solution
SC.push({kick:'ACCREVISE EXPLAINS',ring:[520,700,1100],d:4.5,ev:[.2,.6,2.8],f:u=>
  `<div class="hl" style="${ap(u,.2)}">Anthropic’s valuation?</div>` +
  `<div class="hl" style="top:372px;${ap(u,.6)}">Most get it <span class="mark loss">wrong.</span></div>` +
  T(80,500,`<div style="font-family:MS,MSX;font-weight:800;font-size:56px;color:#034620;opacity:${P(u,2.8,.4)};transform:translateY(${(1-P(u,2.8,.4))*20}px)">Here’s what it <span class="mark">really means.</span></div>`) +
  sv(rohan(150,620,1.5,RO({prop:'phone',mood:u>3?'happy':'worried',scratch:u<3})),0,0)
});
// 2 the hype: feb
SC.push({kick:'THE HYPE',ring:[-500,1100,1000],d:5.5,ev:[.2,.6,1.4],f:u=>
  hl(u,'Anthropic makes ','Claude') +
  T(80,480,`<span class="lab" style="font-size:28px;color:#3f5e4b">PRIVATE VALUATION, USD</span>`,ap(u,.6)) +
  bars(u,[{lab:'FEB 2026',val:380,txt:'$380B',at:1.4}],1250,620,965)
});
// 3 may + IPO
SC.push({kick:'THE HYPE',ring:[640,-300,800],d:5.4,ev:[.2,.6,2.6],f:u=>
  hl(u,'Then it ','jumped') +
  T(80,480,`<span class="lab" style="font-size:28px;color:#3f5e4b">PRIVATE VALUATION, USD</span>`) +
  bars(u,[{lab:'FEB 2026',val:380,txt:'$380B',at:-2},{lab:'MAY 2026',val:965,txt:'$965B',at:.6,pat:'hA'}],1250,620,965) +
  T(690,560,`<div style="width:320px;background:#034620;color:#f7f5ef;border-radius:16px;padding:18px 20px;opacity:${P(u,2.6,.4)}"><div class="lab" style="font-size:24px;color:#e2b04a">NOV 2026</div><div style="font-size:36px;line-height:1.2;margin-top:6px">Listed on the stock market</div></div>`)
});
// 4 rohan's chai stall
SC.push({kick:'WHAT IS A VALUATION?',ring:[600,1250,900],d:4.7,ev:[.2,.6,1.6],f:u=>
  hl(u,'Rohan’s ','chai stall') +
  `<div style="opacity:${P(u,.4,.5)}">`+sv(rohan(-10,560,.95,RO({mood:'happy'})),0,0)+`</div>` +
  sv(stall(560,500,1.3,u,.6)) +
  T(560,960,`<div style="font-size:48px;color:#034620">Profit: <b style="font-weight:600">₹2 lakh</b> a year</div>`,ap(u,1.6))
});
// 5 the offer
SC.push({kick:'THE OFFER',ring:[-400,1300,900],d:6.9,ev:[.2,.6,1.8,4],f:u=>
  hl(u,'A buyer offers ','₹50 lakh') +
  `<div style="opacity:${P(u,.4,.5)}">`+sv(rohan(-10,560,.95,RO({mood:u>1.8?'happy':'neutral',look:6})),0,0)+sv(rohan(580,560,.95,BUY({prop:'bill',mood:'happy'})),0,0)+`</div>` +
  T(620,1200,`<div style="background:#fff;border:4px solid #034620;border-radius:14px;padding:14px 22px;font-size:40px;color:#034620;opacity:${P(u,1.8,.4)}">Cheque: <b>₹50,00,000</b></div>`) +
  T(80,1330,`<div style="font-size:44px;color:#034620;opacity:${P(u,4,.4)}">That’s <span class="mark" style="font-family:MS,MSX;font-weight:800">25×</span> a year’s profit.</div>`)
});
// 6 question
SC.push({kick:'YOUR GUESS',ring:[-300,400,1300],green:true,d:2.7,ev:[.2],f:u=>
  `<div class="hl" style="top:800px;text-align:center;${ap(u,.2)}">Is ₹50 lakh <span class="mark">crazy?</span></div>`
});
// 7 a bet on the future
SC.push({kick:'THE ANSWER',ring:[600,1300,1000],d:7.1,ev:[.2,.6,1.2,1.8,2.4,4.6],f:u=>{
  let chain='';
  [[80,520],[400,520],[720,520],[80,820],[400,820],[720,820]].forEach(([x,y],i)=>{chain+=stall(x,y,.85,u,.6+i*.35);});
  return hl(u,'A bet on the ','future') + sv(chain) +
   T(80,1150,`<div style="font-size:48px;color:#034620;line-height:1.25">Not a price tag<br>on <span class="mark" style="font-family:MS,MSX;font-weight:800">today.</span></div>`,ap(u,4.6));
}});
// 8 why anthropic: revenue
SC.push({kick:'WHY THE BET',ring:[-450,-300,900],d:7.9,ev:[.2,.6,1.6,4],f:u=>
  hl(u,'Revenue grew ','fast') +
  T(80,480,`<span class="lab" style="font-size:28px;color:#3f5e4b">ANNUAL REVENUE RUN-RATE, USD</span>`,ap(u,.6)) +
  bars(u,[{lab:'FEB 2026',val:14,txt:'~$14B',at:.6},{lab:'MAY 2026',val:47,txt:'$47B+',at:1.6,pat:'hA'}],1150,520,47) +
  T(690,560,`<div style="width:320px;background:#dfe9e2;border:3px solid #034620;border-radius:16px;padding:18px 20px;opacity:${P(u,4,.4)}"><div style="font-size:36px;line-height:1.2;color:#034620">Mostly from <b>businesses</b> paying for Claude</div></div>`) +
  T(80,1230,`<div class="foot" style="width:900px">As reported by Anthropic and the press.</div>`,ap(u,1.6))
});
// 9 twist
SC.push({kick:'THE TWIST',ring:[350,500,1300],green:true,d:3.8,ev:[.2,1.4],f:u=>
  `<div class="hl" style="top:780px;text-align:center;${ap(u,.2)}">Not the number.</div><div class="hl" style="top:880px;text-align:center;${ap(u,1.4)}"><span class="mark">Who’s paying.</span></div>`
});
// 10 for you
SC.push({kick:'WHAT IT MEANS FOR YOU',ring:[560,1250,1000],d:7,ev:[.2,.6,2,3.8],f:u=>
  hl(u,'Your competitors ','are learning') +
  `<div style="opacity:${P(u,.6,.5)}">`+sv(rohan(60,520,1.0,RO({prop:'laptop',mood:'neutral'})),0,0)+`</div>` +
  T(560,600,`<div style="font-size:44px;color:#034620;width:430px;line-height:1.25">Businesses everywhere now pay for AI work.</div>`,ap(u,2)) +
  T(560,860,`<div class="hand" style="font-size:42px;color:${LOSS};width:430px;line-height:1.15">The shop next door is learning it too.</div>`,ap(u,3.8))
});
// 11 to be fair
SC.push({kick:'TO BE FAIR',ring:[-500,1350,900],d:7.7,ev:[.2,.6,2.6,4.6],f:u=>{
  const pts=[[120,1000],[260,940],[380,820],[480,640],[560,520],[620,600],[700,860],[800,960],[920,990]];
  const d='M'+pts.map(p=>p.join(',')).join(' L');
  return hl(u,'Bets can be ','wrong') +
   sv(`<g filter="url(#pencil)"><path d="M100,460 V1040 H960" fill="none" stroke="${INK}" stroke-width="4"/><path d="${d}" fill="none" stroke="${LOSS}" stroke-width="7" ${draw(P(u,.6,1.8))}/></g>`) +
   T(440,470,`<span class="lab" style="font-size:26px;color:${LOSS}">THE DOT-COM BUBBLE, 2000</span>`,ap(u,2.6)) +
   T(80,1100,`<div style="font-size:44px;color:#034620;line-height:1.25">Many giants were overvalued.<br><span class="mark" style="font-family:MS,MSX;font-weight:800">Not investment advice.</span></div>`,ap(u,4.6));
}});
// 12 the rule
SC.push({kick:'THE RULE',ring:[600,1250,900],d:6,ev:[.2,.6,2],f:u=>
  hl(u,'Skip the ','hype') +
  T(80,520,`<div style="background:#fff;border:5px solid #034620;border-radius:22px;padding:34px 36px;width:920px;box-sizing:border-box;opacity:${P(u,2,.4)}"><div class="lab" style="font-size:26px;color:#3f5e4b">ASK ONE QUESTION</div><div style="font-family:MS,MSX;font-weight:800;font-size:58px;color:#034620;line-height:1.15;margin-top:14px">What can AI do for <span class="mark">my business</span> this week?</div></div>`) +
  `<div style="opacity:${P(u,3,.5)}">`+sv(rohan(340,1020,.8,RO({mood:'happy',prop:'phone'})),0,0)+`</div>`
});
// 13 truth
SC.push({kick:null,ring:[-300,150,1700],green:true,logo:false,d:3.6,ev:[.2,.5,1.4,2.2],f:u=>
  T(0,330,`<div style="width:1080px;text-align:center"><img src="logo-paper.png" style="height:330px"></div>`,ap(u,.2)) +
  `<div class="hl" style="left:0;width:1080px;top:800px;text-align:center;${ap(u,.5)}">Valuations are bets.</div>` +
  `<div class="hl" style="left:0;width:1080px;top:900px;text-align:center;${ap(u,1.4)}">Your time is <span class="mark">real.</span></div>` +
  T(110,1120,`<div class="foot" style="width:860px;text-align:center;color:#b9d0c1">Figures as reported to Nov 2026 (CNBC, company statements). Chai stall is illustrative. Not investment advice.</div>`,ap(u,2.2))
});
