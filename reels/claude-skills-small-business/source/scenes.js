// ---------- extra drawings ----------
function stack(n,x,y,s=1){ // a pile of invoices
  let g='';
  for(let i=0;i<n;i++){const dx=(i%2?6:-6)+Math.sin(i*1.7)*8, dy=-i*14;
    g+=`<g transform="translate(${dx},${dy}) rotate(${Math.sin(i*2.3)*4} 110 70)"><rect x="0" y="0" width="220" height="140" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M18,30 H150 M18,56 H120 M18,82 H100" stroke="#9fbfab" stroke-width="6"/><path d="M140,112 H200" stroke="${LOSS}" stroke-width="7"/></g>`;}
  return `<g filter="url(#pencil)" transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}
function card(x,y,w,h,title,lines,u,a){
  const p=P(u,a,.45);
  return sv(`<g filter="url(#pencil)" style="opacity:${p}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="#fff" stroke="${INK}" stroke-width="5"/></g>`)+
   T(x+28,y+24,`<div style="width:${w-56}px"><div class="lab" style="font-size:30px;color:#034620">${title}</div>${lines?`<div style="font-size:32px;color:#3f5e4b;margin-top:8px;line-height:1.25">${lines}</div>`:''}</div>`,`opacity:${p}`);
}
const C=(y,html,st='')=>T(80,y,`<div style="width:920px;text-align:center">${html}</div>`,st);

// 1 hook + promise
SC.push({kick:'ACCREVISE EXPLAINS',ring:[520,700,1100],d:4.5,ev:[.2,1.2,2.2],f:u=>
  `<div class="hl" style="${ap(u,.2)}">Claude Skills,</div>` +
  `<div class="hl" style="top:372px;${ap(u,1.2)}"><span class="mark">explained.</span></div>` +
  T(80,500,`<span class="lab" style="font-size:30px;color:#3f5e4b">FOR A SMALL BUSINESS · 30 INVOICES A WEEK</span>`,ap(u,2.2)) +
  sv(rohan(160,380,1.68,{hair:'long',glasses:false,prop:'laptop',mood:'happy'}),0,0)
});
// 2 meet the hero
SC.push({kick:'MEET PRIYA',ring:[-500,1100,1000],d:6,ev:[.2,.6,2.2,3.6],f:u=>{
  const n=Math.round(clamp((u-.8)/2.6)*12);
  return hl(u,'Priya runs a ','sweet shop') +
   `<div style="opacity:${P(u,.4,.5)}">`+sv(rohan(-10,470,1.0,{hair:'long',glasses:false,prop:'bill',mood:u>3.6?'worried':'neutral',scratch:u>4.2}),0,0)+`</div>` +
   sv(stack(n,620,900,1.15)) +
   T(600,520,`<div style="width:420px"><div class="hand" style="font-size:96px;color:${LOSS};line-height:1">${Math.round(clamp((u-.8)/2.6)*30)}</div><div class="lab" style="font-size:30px;color:#034620">INVOICES EVERY WEEK</div></div>`,`opacity:${P(u,.8,.3)}`) +
   T(80,1170,`<span class="hand" style="font-size:48px;color:${LOSS}">typed by hand, one by one</span>`,ap(u,3.6));
}});
// 3 define it
SC.push({kick:'WHAT IT IS',ring:[600,1250,900],d:7,ev:[.2,.6,1.8,3.2,4.6],f:u=>{
  const bx=P(u,.6,.6);
  return hl(u,'A Claude ','Skill') +
   sv(`<g filter="url(#pencil)" style="opacity:${bx}"><rect x="80" y="440" width="880" height="560" fill="#fff" stroke="${INK}" stroke-width="6"/><rect x="80" y="440" width="880" height="80" fill="url(#hG)" stroke="${INK}" stroke-width="6"/></g>`) +
   T(110,456,`<span class="lab" style="font-size:30px;color:#034620;background:#fff;padding:4px 10px">ONE SKILL = ONE FOLDER</span>`,`opacity:${bx}`) +
   tick(u,1.8,130,580,'your instructions, saved once') +
   tick(u,3.2,130,700,'your template, your rules') +
   tick(u,4.6,130,820,'used whenever that job comes up');
}});
// 4 her week
SC.push({kick:'HER WEEK',ring:[500,-350,800],d:5.5,ev:[.2,1,2.2,3.4],f:u=>{
  const box=(a,x,lab,val,col)=>{const p=P(u,a,.45);return sv(`<g filter="url(#pencil)" style="opacity:${p}"><rect x="6" y="6" width="268" height="190" fill="#fff" stroke="${INK}" stroke-width="5"/></g>`,x,520,280,200)+T(x,540,`<div style="width:280px;text-align:center"><div class="lab" style="font-size:24px;color:#3f5e4b">${lab}</div><div style="font-size:60px;margin-top:28px;color:${col||'#034620'}">${val}</div></div>`,`opacity:${p}`)};
  return hl(u,'Priya’s ','week') + box(1,70,'INVOICES','30') + box(2.2,400,'EACH','12 min') + box(3.4,730,'EVERY WEEK','6 hrs',LOSS) +
   `<div style="opacity:${P(u,3.8,.5)}">`+sv(rohan(340,860,.95,{hair:'long',glasses:false,prop:'bill',mood:'worried',sweat:u>4.4}),0,0)+`</div>`;
}});
// 5 the real cost
SC.push({kick:'THE REAL COST',ring:[-400,1300,900],d:7,ev:[.2,.5,3.4,4.8],f:u=>{
  let dots='';
  for(let i=0;i<52;i++){const a=.5+i*.05, p=P(u,a,.15), cx=120+(i%13)*68, cy=480+Math.floor(i/13)*68;
    dots+=`<circle cx="${cx}" cy="${cy}" r="26" fill="${p>.5?'url(#hR)':'#fff'}" stroke="${INK}" stroke-width="4"/>`;}
  return hl(u,'One year ','later') + sv(`<g filter="url(#pencil)">${dots}</g>`) +
   T(80,770,`<span style="font-size:52px;color:#034620"><span class="lab" style="font-size:34px">52 WEEKS × 6 HRS =</span> 312 hours</span>`,ap(u,3.4)) +
   T(80,860,`<span style="font-size:52px;color:#034620">≈ <b style="color:${LOSS};font-weight:600">39 working days</b> of typing</span>`,ap(u,4.8)) +
   `<div style="opacity:${P(u,4.8,.5)}">`+sv(rohan(340,1000,.85,{hair:'long',glasses:false,mood:'worried',scratch:true,sweat:true}),0,0)+`</div>`;
}});
// 6 the twin
SC.push({kick:'WHAT IF',ring:[640,-300,800],d:6,ev:[.2,.8,2.6],f:u=>{
  const sp=P(u,.8,.6);
  return hl(u,'A ','second',' Priya') +
   sv(`<g filter="url(#pencil)"><path d="M540,470 L540,${470+1000*sp}" stroke="${INK}" stroke-width="5"/></g>`) +
   `<div style="opacity:${sp}">`+sv(rohan(40,620,1.15,{hair:'long',glasses:false,prop:'bill',mood:'neutral'}),0,0)+sv(rohan(590,620,1.15,{hair:'long',glasses:false,prop:'laptop',mood:'happy'}),0,0)+`</div>`+
   T(80,1380,`<span class="lab" style="font-size:30px;color:#3f5e4b">TYPES EVERY INVOICE</span>`,ap(u,1.2)) +
   T(600,1380,`<span class="lab" style="font-size:30px;color:${G6}">TEACHES CLAUDE ONCE</span>`,ap(u,1.2)) +
   T(80,470,`<span class="lab" style="font-size:36px;color:${G6}">SAME SHOP. SAME 30 INVOICES.</span>`,ap(u,2.6));
}});
// 7 ask the viewer
SC.push({kick:'YOUR GUESS',ring:[-300,400,1300],green:true,d:3.5,ev:[.2,1.2],f:u=>
  `<div class="hl" style="top:760px;text-align:center;${ap(u,.2)}">How long does her</div><div class="hl" style="top:850px;text-align:center;${ap(u,1.2)}">week take <span class="mark">now?</span></div>`
});
// 8 the reveal
SC.push({kick:'THE ANSWER',ring:[600,1300,1000],d:6,ev:[.2,.6,3.2,4.4],f:u=>{
  const p=P(u,.6,2.4), h=720, full=h, lvl=full*(1-p*5/6);
  return hl(u,'Claude drafts. She ','checks.') +
   sv(`<g filter="url(#pencil)"><rect x="140" y="480" width="230" height="${h}" fill="#fff" stroke="${INK}" stroke-width="6"/><rect x="140" y="${480+h-lvl}" width="230" height="${lvl}" fill="url(#hN)" stroke="${INK}" stroke-width="5"/></g>`) +
   T(390,480+h-lvl-24,`<span class="hand" style="font-size:44px;color:${G6}">${(6-5*p).toFixed(0)} hrs</span>`) +
   T(140,1220,`<span class="lab" style="font-size:24px;color:#3f5e4b">HOURS A WEEK</span>`) +
   T(560,600,`<div style="width:420px"><div style="font-size:60px;color:#034620;line-height:1.1">From 6 hours<br>to <b style="font-weight:600;color:${G6}">about 1.</b></div></div>`,ap(u,3.2)) +
   `<div style="opacity:${P(u,3.4,.5)}">`+sv(rohan(600,880,.72,{hair:'long',glasses:false,mood:'cheer',jump:u>3.4&&u<5.5}),0,0)+`</div>`;
}});
// 9 reframe
SC.push({kick:'THE TWIST',ring:[350,500,1300],green:true,d:3.5,ev:[.2,1.2],f:u=>
  `<div class="hl" style="top:780px;text-align:center;${ap(u,.2)}">Same Claude.</div><div class="hl" style="top:880px;text-align:center;${ap(u,1.2)}"><span class="mark">Her rules.</span></div>`
});
// 10 the insight
SC.push({kick:'WHY IT WORKS',ring:[-450,-300,900],d:8,ev:[.2,.6,1.6,2.6,3.6,5.6],f:u=>{
  const fold=`<g filter="url(#pencil)" style="opacity:${P(u,.6,.5)}"><path d="M80,470 H330 L370,520 H960 V1000 H80 Z" fill="url(#hA)" stroke="${INK}" stroke-width="6"/><rect x="80" y="540" width="880" height="460" fill="#fff" stroke="${INK}" stroke-width="5"/></g>`;
  const file=(a,y,name,what)=>T(130,y,`<div style="display:flex;gap:24px;align-items:baseline"><span class="lab" style="font-size:30px;color:#034620;background:#dfe9e2;padding:6px 14px;border-radius:8px">${name}</span><span style="font-size:36px;color:#3f5e4b">${what}</span></div>`,ap(u,a));
  return hl(u,'Inside her ','Skill') + sv(fold) +
   T(100,486,`<span class="lab" style="font-size:28px;color:#034620">PRIYA-INVOICES</span>`,`opacity:${P(u,.6,.5)}`) +
   file(1.6,590,'SKILL.md','how she likes it done') +
   file(2.6,720,'TEMPLATE','her invoice layout') +
   file(3.6,850,'RATES + CUSTOMERS','tax rates, names, GST numbers') +
   T(80,1070,`<div style="font-size:46px;color:#034620;line-height:1.3">Set up once: <b style="font-weight:600">~1 hour</b><br>Saves: <b style="font-weight:600;color:${G6}">~5 hours a week</b></div>`,ap(u,4.8)) +
   T(80,1240,`<span class="hand" style="font-size:52px;color:${G6}">→ pays back in week one</span>`,ap(u,5.6));
}});
// 11 be fair
SC.push({kick:'TO BE FAIR',ring:[560,1250,1000],d:6,ev:[.2,.6,2.2,3.6],f:u=>
  hl(u,'Always ','check it') +
  `<div style="opacity:${P(u,.6,.5)}">`+sv(rohan(80,480,1.05,{hair:'long',glasses:false,prop:'bill',mood:u>3.6?'happy':'neutral',look:-6}),0,0)+`</div>` +
  T(560,560,`<div style="font-size:46px;color:#034620;width:420px;line-height:1.25">AI can make mistakes.</div>`,ap(u,2.2)) +
  T(560,740,`<div class="hand" style="font-size:42px;color:${G6};width:420px;line-height:1.15">She checks every total and GST number before it goes out.</div>`,ap(u,3.6)) +
  T(80,1220,`<div style="font-size:52px;color:#034620">Her name is on the <span class="mark">invoice.</span></div>`,ap(u,4.6))
});
// 12 generalise
SC.push({kick:'THE RULE',ring:[-500,1350,900],d:6.5,ev:[.2,1,2.2,3.4],f:u=>
  hl(u,'Teach it ','more jobs') +
  card(80,470,880,170,'PAYMENT REMINDERS','polite nudges for unpaid bills',u,1) +
  card(80,670,880,170,'SUPPLIER ORDERS','the weekly order, in her format',u,2.2) +
  card(80,870,880,170,'MONTHLY SALES SUMMARY','what sold, what didn’t',u,3.4) +
  `<div style="opacity:${P(u,4,.5)}">`+sv(rohan(340,1080,.8,{hair:'long',glasses:false,prop:'laptop',mood:'happy'}),0,0)+`</div>`
});
// 13 the truth
SC.push({kick:null,ring:[-300,150,1700],green:true,logo:false,d:6,ev:[.2,.6,1.6,2.6],f:u=>
  T(0,330,`<div style="width:1080px;text-align:center"><img src="logo-paper.png" style="height:330px"></div>`,ap(u,.2)) +
  `<div class="hl" style="left:0;width:1080px;top:820px;text-align:center;${ap(u,.6)}">Teach it once.</div>` +
  `<div class="hl" style="left:0;width:1080px;top:920px;text-align:center;${ap(u,1.6)}">Save <span class="mark">every week.</span></div>` +
  T(110,1170,`<div class="foot" style="width:860px;text-align:center;color:#b9d0c1">Illustrative times for one small shop. Claude Skills are available on Claude’s paid plans (Pro, Max, Team, Enterprise); check claude.ai for your plan. Always review AI output before sending.</div>`,ap(u,2.6))
});
