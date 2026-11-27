// ---------- Build your own app with Claude (Ronnie's udhaar tracker) ----------
const RN=(o)=>Object.assign({glasses:false,mustache:true},o);
const MONO="'JetBrains Mono','DejaVu Sans Mono',monospace";
const CAP=(y,html,u,a,size=52)=>T(80,y,`<div style="width:920px;font-family:MS,MSX;font-weight:800;font-size:${size}px;line-height:1.15;color:#034620">${html}</div>`,ap(u,a));
const typ=(s,u,a,cps=40)=>{const n=Math.max(0,Math.floor((u-a)*cps));return n>=s.length?s:s.slice(0,n)+'<span style="opacity:.8">▍</span>'};
function frame(x,y,w,title,inner,u,a,dark){const p=P(u,a,.4);
  return `<div class="ab" style="left:${x}px;top:${y}px;width:${w}px;opacity:${p};transform:translateY(${(1-p)*20}px);background:${dark?'#034620':'#fff'};border:4px solid #034620;border-radius:20px;overflow:hidden;box-shadow:0 10px 0 rgba(3,70,32,.12)"><div style="background:${dark?'#0b5a2e':'#dfe9e2'};padding:12px 18px;display:flex;gap:10px;align-items:center"><span style="width:14px;height:14px;border-radius:50%;background:#e2b04a"></span><span style="width:14px;height:14px;border-radius:50%;background:#9fbfab"></span><span class="lab" style="font-size:22px;color:${dark?'#b9d0c1':'#034620'};margin-left:10px">${title}</span></div><div style="padding:20px 24px">${inner}</div></div>`;}
// the app Claude builds (o: {wa, hindi, big})
function udhaarApp(u,a,o){o=o||{};const big=o.big?1.15:1;
  const L=o.hindi?{t:'उधार ट्रैकर',due:'बकाया',over:'देर से',tot:'कुल बकाया',add:'+ ग्राहक जोड़ें',remind:'WhatsApp याद दिलाएँ'}:{t:'Udhaar Tracker',due:'Due',over:'OVERDUE',tot:'Total owed to you',add:'+ Add customer',remind:'WhatsApp reminder'};
  const rows=[['Sharma ji','₹1,200','12 days',true],['Mehta aunty','₹450','3 days',false],['Rao bhai','₹2,800','21 days',true],['Iyer','₹300','1 day',false]];
  return `<div style="font-family:MS,MSX;font-size:${26*big}px">
   <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:800;font-size:${36*big}px">${L.t}</span><span style="background:#034620;color:#fff;border-radius:10px;padding:${8*big}px ${14*big}px;font-size:${22*big}px;font-weight:700">${L.add}</span></div>
   ${rows.map((r,i)=>`<div style="display:flex;align-items:center;gap:12px;padding:${12*big}px 0;border-bottom:2px dashed #dfe9e2;opacity:${P(u,a+i*.2,.25)}"><span style="flex:1;font-family:SS4,SS4X;font-size:${28*big}px">${r[0]}<div style="font-size:${18*big}px;color:#7f8f80;font-family:MS,MSX">${r[2]}</div></span><b style="font-size:${28*big}px">${r[1]}</b>${r[3]?`<span style="background:#a8452a;color:#fff;border-radius:8px;padding:4px 10px;font-size:${16*big}px;font-weight:800">${L.over}</span>`:''}${o.wa?`<span style="background:#2d7049;color:#fff;border-radius:8px;padding:4px 10px;font-size:${16*big}px;font-weight:800">💬 ${o.hindi?'याद दिलाएँ':'Remind'}</span>`:''}</div>`).join('')}
   <div style="display:flex;justify-content:space-between;margin-top:14px;font-weight:800;font-size:${30*big}px;opacity:${P(u,a+1,.3)}"><span>${L.tot}</span><span style="color:#a8452a">₹4,750</span></div></div>`;}

// 1 hook
SC.push({kick:'ACCREVISE EXPLAINS',ring:[520,700,1100],d:4,f:u=>
  `<div class="hl" style="${ap(u,.2)}">Want your own app?</div>` +
  `<div class="hl" style="top:372px;font-size:60px;${ap(u,.8)}"><span class="mark loss">Can’t code. Can’t hire.</span></div>` +
  T(80,480,`<div style="font-family:MS,MSX;font-weight:800;font-size:56px;color:#034620;opacity:${P(u,2.4,.4)};transform:translateY(${(1-P(u,2.4,.4))*20}px)">Build it with <span class="mark">Claude. Today.</span></div>`) +
  sv(rohan(150,640,1.5,RN({prop:'phone',mood:u>2.6?'happy':'worried',crossed:u<2.6})),0,0)
});
// 2 the notebook
SC.push({kick:'MEET RONNIE',ring:[-500,1100,1000],d:4,f:u=>
  hl(u,'Udhaar in a ','notebook','',' loss') +
  sv(`<g filter="url(#pencil)" style="opacity:${P(u,.4,.4)}" transform="translate(520,500) rotate(-4)"><rect width="460" height="520" fill="#fff" stroke="${INK}" stroke-width="5"/>${[0,1,2,3,4,5,6,7].map(i=>`<path d="M30,${60+i*55} q40,-18 80,0 t80,0 t80,0 ${i%3?'t80,0':''}" fill="none" stroke="${i%4==1?LOSS:'#5b6b60'}" stroke-width="4"/>`).join('')}<path d="M40,120 L400,380 M400,120 L60,420" stroke="${LOSS}" stroke-width="4" opacity=".6"/></g>`) +
  `<div style="opacity:${P(u,.3,.5)}">`+sv(rohan(-10,560,1.0,RN({mood:'worried',scratch:true,sweat:true})),0,0)+`</div>` +
  CAP(1240,`Who owes what? Since when? <span class="mark loss">Pages everywhere.</span>`,u,1.6,46)
});
// 3+4 describe it
SC.push({kick:'STEP 1 · DESCRIBE IT',ring:[600,1250,900],d:3,f:u=>
  hl(u,'Just ','describe it') +
  `<div style="opacity:${P(u,.4,.5)}">`+sv(rohan(340,640,1.0,RN({prop:'laptop',mood:'happy'})),0,0)+`</div>`
});
SC.push({kick:'STEP 1 · DESCRIBE IT',ring:[640,-300,800],d:4,f:u=>
  hl(u,'In plain ','words') +
  frame(80,480,920,'CLAUDE · YOU TYPE',`<div style="font-family:${MONO};font-size:31px;line-height:1.5;color:#f7f5ef;white-space:pre-wrap">${typ('Make me an udhaar tracker app.\nAdd customers and amounts, show who is overdue, and total what I am owed.',u,.5,36)}</div>`,u,.3,true)
});
// 5 claude builds it
SC.push({kick:'STEP 2 · CLAUDE BUILDS IT',ring:[-400,1300,900],d:4,f:u=>
  hl(u,'A working ','app') +
  frame(80,470,920,'CLAUDE · YOUR APP',udhaarApp(u,.8,{}),u,.4) +
  CAP(1180,`Not a picture. <span class="mark">It actually works.</span>`,u,2.4,46)
});
// 6 ask for changes
SC.push({kick:'STEP 3 · IMPROVE IT',ring:[600,1300,1000],d:4.5,f:u=>
  hl(u,'Want changes? ','Just ask.') +
  ['+ Add a WhatsApp reminder button','+ Show it in Hindi','+ Make the buttons bigger'].map((t,i)=>T(80,480+i*130,`<div style="background:#f6e2b4;border:3px solid #034620;border-radius:22px 22px 4px 22px;padding:18px 26px;font-size:40px;color:#034620;display:inline-block">${t}</div>`,ap(u,.6+i*1))).join('')
});
// 7 updated in seconds
SC.push({kick:'STEP 3 · IMPROVE IT',ring:[-450,-300,900],d:3,f:u=>
  hl(u,'Updated in ','seconds') +
  frame(80,470,920,'CLAUDE · YOUR APP · VERSION 2',udhaarApp(u,.3,{wa:true,hindi:u>1.2,big:true}),u,.2)
});
// 8 share
SC.push({kick:'STEP 4 · SHARE IT',ring:[560,1250,1000],d:4,f:u=>
  hl(u,'Tap ','Share') +
  frame(80,480,920,'SHARE',`<div style="font-size:34px;line-height:1.4">Anyone with the link can use your app.</div><div style="display:flex;gap:14px;margin-top:18px;align-items:center"><span style="flex:1;background:#f7f5ef;border:3px solid #9fbfab;border-radius:12px;padding:14px 18px;font-family:${MONO};font-size:26px;color:#3f5e4b">claude.ai/…/udhaar-tracker</span><span style="background:${u>1.6?'#2d7049':'#034620'};color:#fff;border-radius:12px;padding:14px 20px;font-family:MS,MSX;font-weight:800;font-size:28px">${u>1.6?'✓ Copied':'Copy link'}</span></div>`,u,.5) +
  `<div style="opacity:${P(u,2,.5)}">`+sv(rohan(80,860,.8,RN({prop:'phone',mood:'happy'})),0,0)+sv(rohan(560,860,.8,{glasses:false,prop:'phone',mood:'happy'}),0,0)+`</div>` +
  T(600,1380,`<span class="lab" style="font-size:26px;color:#3f5e4b">HIS HELPER AT THE COUNTER</span>`,ap(u,2.2))
});
// 9 install as app
SC.push({kick:'BONUS',ring:[-500,1350,900],d:3.4,f:u=>
  hl(u,'Install it ','like an app') +
  sv(`<g style="opacity:${P(u,.4,.4)}"><rect x="140" y="500" width="800" height="500" rx="24" fill="#dfe9e2" stroke="${INK}" stroke-width="6"/><rect x="420" y="1000" width="240" height="40" fill="${INK}"/><rect x="340" y="1040" width="400" height="20" rx="8" fill="${INK}"/>${[0,1,2].map(i=>`<rect x="${240+i*170}" y="620" width="110" height="110" rx="24" fill="#fff" stroke="${INK}" stroke-width="4"/>`).join('')}<g style="opacity:${P(u,1.2,.3)}"><rect x="750" y="620" width="110" height="110" rx="24" fill="#e2b04a" stroke="${INK}" stroke-width="5"/><text x="805" y="690" text-anchor="middle" font-family="MS,MSX" font-weight="800" font-size="34" fill="${INK}">₹</text></g></g>`) +
  T(700,750,`<span class="lab" style="font-size:22px;color:#034620">UDHAAR TRACKER</span>`,ap(u,1.2)) +
  T(80,1110,`<div class="foot" style="font-size:26px;width:920px">Claude desktop app (Mac / Windows): “Install as app” (beta).</div>`,ap(u,1.6))
});
// 10 to be fair
SC.push({kick:'TO BE FAIR',ring:[600,1250,900],d:5,f:u=>
  hl(u,'Know the ','limits') +
  [['Perfect for','Simple tools: trackers, calculators, checklists, forms.','#dfe9e2'],['Needs more','Big apps with logins and payments: Claude Code or a developer.','#f6e2b4']].map(([t,s,bg],i)=>T(80,490+i*290,`<div style="width:920px;box-sizing:border-box;background:${bg};border:4px solid #034620;border-radius:22px;padding:28px 32px"><div style="font-family:MS,MSX;font-weight:800;font-size:44px">${t}</div><div style="font-size:38px;margin-top:10px;line-height:1.3">${s}</div></div>`,ap(u,.6+i*1.8))).join('')
});
// 11 test it
SC.push({kick:'TO BE FAIR',ring:[-400,1300,900],d:3,f:u=>
  hl(u,'Test it ','first') +
  T(80,500,`<div style="font-size:46px;color:#034620;line-height:1.6"><div style="opacity:${P(u,.5,.3)}"><span style="color:${G6};font-family:MS,MSX;font-weight:800">✓</span> Start with sample data</div><div style="opacity:${P(u,1.2,.3)}"><span style="color:${G6};font-family:MS,MSX;font-weight:800">✓</span> Check every total</div></div>`) +
  `<div style="opacity:${P(u,1.4,.5)}">`+sv(rohan(340,820,.85,RN({mood:'cheer',jump:u>1.6&&u<3})),0,0)+`</div>`
});
// 12 truth + CTA
SC.push({kick:null,ring:[-300,150,1700],green:true,logo:false,d:3.6,f:u=>
  T(0,330,`<div style="width:1080px;text-align:center"><img src="logo-paper.png" style="height:330px"></div>`,ap(u,.2)) +
  `<div class="hl" style="left:0;width:1080px;top:780px;text-align:center;font-size:62px;${ap(u,.5)}">You don’t need to code.</div>` +
  `<div class="hl" style="left:0;width:1080px;top:880px;text-align:center;${ap(u,1.1)}">You need a <span class="mark">clear idea.</span></div>` +
  T(0,1030,`<div style="width:1080px;text-align:center;font-family:MS,MSX;font-weight:800;font-size:40px;color:#e2b04a">Comment “APP” for the prompt</div>`,ap(u,1.8)) +
  T(110,1140,`<div class="foot" style="width:860px;text-align:center;color:#b9d0c1">Illustrated screens; features and plan availability may change. Check Claude’s help centre.</div>`,ap(u,2.2))
});
