// ---------- drawings ----------
function stall(x,y,s,u,a){
  const p=P(u,a,.45);
  return `<g filter="url(#pencil)" transform="translate(${x},${y}) scale(${s})" style="opacity:${p}">
   <path d="M0,0 H300 L280,60 H20 Z" fill="url(#hA)" stroke="${INK}" stroke-width="5"/>
   <path d="M20,60 V300 M280,60 V300" stroke="${INK}" stroke-width="5"/>
   <rect x="0" y="200" width="300" height="110" fill="url(#hG)" stroke="${INK}" stroke-width="5"/>
   <path d="M90,200 C70,140 150,130 150,170 L150,200 Z" fill="url(#hN)" stroke="${INK}" stroke-width="4"/>
   <rect x="200" y="168" width="22" height="32" fill="#fff" stroke="${INK}" stroke-width="3"/><rect x="230" y="168" width="22" height="32" fill="#fff" stroke="${INK}" stroke-width="3"/>
   <text x="150" y="275" text-anchor="middle" font-family="MS,MSX" font-weight="800" font-size="36" fill="${INK}" stroke="none">CHAI</text></g>`;
}
function qr(x,y,s,u,a){ // a QR standee (generic pattern, no brand)
  const p=P(u,a,.4); let cells='';
  const pat=[[1,1,1,0,1,0,1,1,1],[1,0,1,0,0,1,1,0,1],[1,1,1,1,0,0,1,1,1],[0,0,1,0,1,1,0,1,0],[1,0,0,1,1,0,1,0,1],[0,1,1,0,0,1,0,0,1],[1,1,1,0,1,0,1,1,0],[1,0,1,1,0,1,0,1,1],[1,1,1,0,1,1,1,0,1]];
  pat.forEach((r,i)=>r.forEach((c,j)=>{if(c)cells+=`<rect x="${20+j*16}" y="${40+i*16}" width="16" height="16" fill="${INK}"/>`;}));
  return `<g transform="translate(${x},${y}) scale(${s})" style="opacity:${p}"><rect x="0" y="0" width="184" height="230" rx="14" fill="#fff" stroke="${INK}" stroke-width="5"/>${cells}<text x="92" y="215" text-anchor="middle" font-family="MS,MSX" font-weight="800" font-size="22" fill="${INK}">SCAN TO PAY</text></g>`;
}
function ping(x,y,text,u,a){const p=P(u,a,.3);
  return T(x,y,`<div style="background:#034620;color:#f7f5ef;border-radius:16px;padding:12px 18px;font-size:32px;display:inline-flex;gap:10px;align-items:center"><span style="color:#e2b04a;font-family:MS,MSX;font-weight:800">✓</span>${text}</div>`,`opacity:${p};transform:translateY(${(1-p)*24}px) scale(${.9+.1*p})`);}
function bubble(x,y,w,text,u,a,bg='#dfe9e2'){const p=P(u,a,.35);
  return `<div class="ab" style="left:${x}px;top:${y}px;width:${w}px;opacity:${p};transform:translateY(${(1-p)*20}px)"><div style="background:${bg};border:3px solid #034620;border-radius:22px 22px 22px 4px;padding:16px 22px;font-size:38px;line-height:1.2;color:#034620">${text}</div></div>`;}
function card(x,y,w,h,title,lines,u,a,num,bg){
  const p=P(u,a,.45);
  return sv(`<g filter="url(#pencil)" style="opacity:${p}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="${bg||'#fff'}" stroke="${INK}" stroke-width="5"/>${num?`<circle cx="${x}" cy="${y}" r="34" fill="#034620"/>`:''}</g>`)+
   (num?T(x-12,y-26,`<span class="lab" style="font-size:36px;color:#f7f5ef">${num}</span>`,`opacity:${p}`):'')+
   T(x+40,y+26,`<div style="width:${w-72}px"><div class="lab" style="font-size:30px;color:#034620">${title}</div>${lines?`<div style="font-size:34px;color:#3f5e4b;margin-top:8px;line-height:1.25">${lines}</div>`:''}</div>`,`opacity:${p}`);
}
const RO=(o)=>Object.assign({},o);
const FR=(o)=>Object.assign({glasses:false},o);

// 1 hook
SC.push({kick:'ACCREVISE EXPLAINS',ring:[520,700,1100],d:4.6,ev:[.2,.6,2.6],f:u=>
  `<div class="hl" style="${ap(u,.2)}">Think UPI money is</div>` +
  `<div class="hl" style="top:372px;${ap(u,.6)}"><span class="mark loss">invisible to tax?</span></div>` +
  T(80,500,`<div style="font-family:MS,MSX;font-weight:800;font-size:56px;color:#034620;opacity:${P(u,2.6,.4)};transform:translateY(${(1-P(u,2.6,.4))*20}px)">Here’s how to <span class="mark">stay safe.</span></div>`) +
  sv(rohan(150,620,1.5,RO({prop:'phone',mood:u>2.8?'happy':'worried',sweat:u<2.8})),0,0)
});
// 2 the stall takes UPI
SC.push({kick:'MEET ROHAN',ring:[-500,1100,1000],d:5.2,ev:[.2,.6,1.4,2.2,3],f:u=>
  hl(u,'UPI, ','all day') +
  sv(stall(80,520,1.2,u,.4)+qr(500,640,1,u,.6)) +
  `<div style="opacity:${P(u,.6,.5)}">`+sv(rohan(620,840,.8,RO({mood:'happy'})),0,0)+`</div>` +
  ping(700,480,'₹20 received',u,1.4) + ping(700,580,'₹40 received',u,2.2) + ping(700,680,'₹20 received',u,3)
});
// 3 the myth
SC.push({kick:'THE MYTH',ring:[600,1250,900],d:4.9,ev:[.2,.6,2.6],f:u=>{
  const st=P(u,2.6,.25);
  return hl(u,'“Small UPI doesn’t ','count”') +
   `<div style="opacity:${P(u,.4,.5)}">`+sv(rohan(-10,560,1.0,FR({mood:'happy',look:6})),0,0)+`</div>` +
   bubble(500,560,480,'Bhai, small UPI payments don’t count!',u,.6) +
   T(540,860,`<div style="border:8px solid ${LOSS};color:${LOSS};font-family:MS,MSX;font-weight:800;font-size:110px;padding:6px 30px;border-radius:14px;transform:rotate(-10deg) scale(${1.6-.6*st});opacity:${st}">MYTH</div>`);
}});
// 4 the truth
SC.push({kick:'THE TRUTH',ring:[640,-300,800],d:8.3,ev:[.2,.6,3.2],f:u=>
  hl(u,'The ','truth') +
  card(110,500,850,200,'NO TAX ON UPI ITSELF','The “GST on UPI over ₹2,000” claim was fake.',u,.6,'✓') +
  card(110,770,850,260,'BUT INCOME IS TAXABLE','however you receive it:<br><b style="color:#034620">cash · UPI · bank transfer</b>',u,3.2,'!','#f6e2b4')
});
// 5 the trail
SC.push({kick:'THE TRAIL',ring:[-400,1300,900],d:6,ev:[.2,.6,1.4,2.6],f:u=>{
  let rows='';
  ['+ ₹20 · UPI','+ ₹40 · UPI','+ ₹20 · UPI','+ ₹60 · UPI','+ ₹20 · UPI'].forEach((r,i)=>{rows+=`<div style="padding:10px 0;border-bottom:2px dashed #9fbfab;opacity:${P(u,1.6+i*.3,.25)}">${r}</div>`;});
  return hl(u,'Every rupee leaves a ','trail') +
   sv(`<g filter="url(#pencil)"><rect x="100" y="560" width="150" height="260" rx="20" fill="url(#hA)" stroke="${INK}" stroke-width="5" style="opacity:${P(u,.6,.4)}"/><path d="M270,690 C340,680 380,680 440,690" fill="none" stroke="${INK}" stroke-width="7" ${draw(P(u,1,.5))}/><path d="M420,670 L444,690 L420,710" fill="none" stroke="${INK}" stroke-width="7" style="opacity:${P(u,1.4,.2)}"/><g style="opacity:${P(u,1.2,.4)}"><path d="M470,600 L620,530 L770,600 Z" fill="url(#hN)" stroke="${INK}" stroke-width="5"/><path d="M490,610 V760 M560,610 V760 M680,610 V760 M750,610 V760 M470,770 H770" stroke="${INK}" stroke-width="6"/></g></g>`) +
   T(500,790,`<span class="lab" style="font-size:26px;color:#034620">YOUR BANK</span>`,ap(u,1.2)) +
   T(110,880,`<div style="background:#fff;border:4px solid #034620;border-radius:16px;padding:16px 26px;width:860px;box-sizing:border-box;font-family:'JetBrains Mono',monospace;font-size:32px;color:#034620">${rows}</div>`,ap(u,1.4));
}});
// 6 AIS
SC.push({kick:'WHAT THEY SEE',ring:[600,1300,1000],d:8.6,ev:[.2,.6,1.4,5],f:u=>
  hl(u,'Your ','A.I.S.') +
  T(80,480,`<div style="background:#fff;border:4px solid #034620;border-radius:18px;padding:26px 30px;width:920px;box-sizing:border-box;opacity:${P(u,.6,.4)}"><div class="lab" style="font-size:26px;color:#3f5e4b">ANNUAL INFORMATION STATEMENT</div>${['Interest from your bank','Dividends','High-value transactions','Tax deducted (TDS)'].map((r,i)=>`<div style="font-size:36px;color:#034620;padding:12px 0;border-bottom:2px dashed #9fbfab;opacity:${P(u,1.4+i*.4,.3)}">${r}</div>`).join('')}</div>`) +
  T(80,1010,`<div style="font-size:46px;color:#034620;line-height:1.25">…and it can <span class="mark" style="font-family:MS,MSX;font-weight:800">ask for your bank records.</span></div>`,ap(u,5))
});
// 7 question
SC.push({kick:'YOUR GUESS',ring:[-300,400,1300],green:true,d:2.6,ev:[.2],f:u=>
  `<div class="hl" style="top:780px;text-align:center;${ap(u,.2)}">When does a<br><span class="mark">notice</span> come?</div>`
});
// 8 mismatch
SC.push({kick:'THE MISMATCH',ring:[-450,-300,900],d:4.5,ev:[.2,.6,1.4,2.4],f:u=>{
  const b1=P(u,.6,.8)*720, b2=P(u,1.4,.8)*240;
  return hl(u,'When numbers ','don’t match') +
   T(80,530,`<span class="lab" style="font-size:28px;color:#034620">MONEY INTO HIS BANK · ₹9 LAKH</span>`,ap(u,.6)) +
   sv(`<g filter="url(#pencil)"><rect x="80" y="580" width="${b1}" height="100" fill="url(#hA)" stroke="${INK}" stroke-width="5"/><rect x="80" y="800" width="${b2}" height="100" fill="url(#hN)" stroke="${INK}" stroke-width="5"/></g>`) +
   T(80,750,`<span class="lab" style="font-size:28px;color:#034620">INCOME HE DECLARED · ₹3 LAKH</span>`,ap(u,1.4)) +
   T(420,780,`<span style="font-family:MS,MSX;font-weight:800;font-size:140px;color:${LOSS};opacity:${P(u,2.4,.3)}">?</span>`) +
   T(80,960,`<div class="foot" style="font-size:24px">Illustrative numbers.</div>`,ap(u,2.4)) +
   `<div style="opacity:${P(u,2.4,.4)}">`+sv(rohan(600,1000,.75,RO({mood:'worried',scratch:true,sweat:true})),0,0)+`</div>`;
}});
// 9 twin
SC.push({kick:'WHAT IF',ring:[640,-300,800],d:4.5,ev:[.2,.8,2],f:u=>{
  const sp=P(u,.8,.6);
  return hl(u,'A ','second',' Rohan') +
   sv(`<g filter="url(#pencil)"><path d="M540,470 L540,${470+1000*sp}" stroke="${INK}" stroke-width="5"/></g>`) +
   `<div style="opacity:${sp}">`+sv(rohan(40,620,1.15,RO({mood:'worried'})),0,0)+sv(rohan(590,620,1.15,RO({prop:'bill',mood:'happy'})),0,0)+`</div>`+
   T(80,1380,`<span class="lab" style="font-size:30px;color:#3f5e4b">HOPES NOBODY CHECKS</span>`,ap(u,1.2)) +
   T(600,1380,`<span class="lab" style="font-size:30px;color:${G6}">3 SIMPLE HABITS</span>`,ap(u,2));
}});
// 10 habits 1 + 2
SC.push({kick:'HABITS 1 + 2',ring:[560,1250,1000],d:7.8,ev:[.2,.8,2.6,4.4],f:u=>
  hl(u,'Keep it ','clean') +
  card(110,490,850,180,'A SEPARATE ACCOUNT','one for the stall, one for home',u,.8,1) +
  card(110,740,850,180,'A NOTE ON BIG CREDITS','what each one was for',u,2.6,2) +
  T(150,990,`<div style="background:#f6e2b4;border:3px solid #034620;padding:18px 24px;transform:rotate(-2deg);font-size:36px;color:#034620;width:620px;box-shadow:6px 6px 0 rgba(3,70,32,.15);opacity:${P(u,4.4,.4)}">+₹2,000 from Amit<br><b>= dinner split, not income</b></div>`)
});
// 11 habit 3
SC.push({kick:'HABIT 3',ring:[-500,1350,900],d:6.9,ev:[.2,.8,2.4],f:u=>
  hl(u,'Check your A.I.S. ','yearly') +
  T(80,530,`<div style="background:#fff;border:4px solid #034620;border-radius:18px;padding:26px 30px;width:920px;box-sizing:border-box;opacity:${P(u,.8,.4)}"><div class="lab" style="font-size:26px;color:#3f5e4b">INCOME TAX E-FILING PORTAL</div><div style="font-size:40px;color:#034620;margin-top:14px">Log in → <b>AIS</b> → match it with your own records</div><div style="font-size:34px;color:${G6};margin-top:14px">once a year, <b>before</b> you file</div></div>`) +
  `<div style="opacity:${P(u,2.4,.5)}">`+sv(rohan(340,900,.85,RO({prop:'laptop',mood:'happy'})),0,0)+`</div>`
});
// 12 AI + CA
SC.push({kick:'TO BE FAIR',ring:[600,1250,900],d:6.4,ev:[.2,.8,2.8],f:u=>
  hl(u,'AI sorts. ','A CA decides.') +
  card(80,520,430,380,'AI','Sorts a year of bank entries in minutes: sales, transfers, refunds.',u,.8,null,'#dfe9e2') +
  card(570,520,430,380,'YOUR CA','Decides what’s taxable and how to file.',u,2.8,null,'#f6e2b4')
});
// 13 truth
SC.push({kick:null,ring:[-300,150,1700],green:true,logo:false,d:4.3,ev:[.2,.5,1.5,2.4],f:u=>
  T(0,330,`<div style="width:1080px;text-align:center"><img src="logo-paper.png" style="height:330px"></div>`,ap(u,.2)) +
  `<div class="hl" style="left:0;width:1080px;top:800px;text-align:center;${ap(u,.5)}">UPI isn’t the problem.</div>` +
  `<div class="hl" style="left:0;width:1080px;top:900px;text-align:center;${ap(u,1.5)}"><span class="mark">Undeclared income</span> is.</div>` +
  T(110,1120,`<div class="foot" style="width:860px;text-align:center;color:#b9d0c1">General information, not tax advice. Rules can change; check your AIS on the e-filing portal and speak to a CA.</div>`,ap(u,2.4))
});
