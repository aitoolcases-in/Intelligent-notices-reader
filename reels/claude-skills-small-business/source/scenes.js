// ---------- extra drawings ----------
const PR={hair:'long',glasses:false};
const pr=(o)=>Object.assign({},PR,o);
function bubble(x,y,w,text,u,a,side='l'){ // a chat message (no app logos)
  const p=P(u,a,.35);
  return `<div class="ab" style="left:${x}px;top:${y}px;width:${w}px;opacity:${p};transform:translateY(${(1-p)*20}px) scale(${.9+.1*p});transform-origin:${side==='l'?'0':'100%'} 100%;">
   <div style="background:#dfe9e2;border:3px solid #034620;border-radius:22px ${side==='l'?'22px 22px 4px':'22px 4px 22px'};padding:14px 20px;font-size:34px;line-height:1.2;color:#034620">${text}</div></div>`;
}
function book(x,y,s,u,a){ // the counter book, open, with scribbled orders
  const p=P(u,a,.45);
  return sv(`<g filter="url(#pencil)" transform="translate(${x},${y}) scale(${s})" style="opacity:${p}">
   <path d="M0,20 Q110,0 220,20 V320 Q110,300 0,320 Z" fill="#fff" stroke="${INK}" stroke-width="5"/>
   <path d="M220,20 Q330,0 440,20 V320 Q330,300 220,320 Z" fill="#fff" stroke="${INK}" stroke-width="5"/>
   <path d="M220,20 V320" stroke="${INK}" stroke-width="5"/>
   <path d="M24,70 q20,-14 40,0 t40,0 t40,0 M24,120 q20,-14 40,0 t40,0 M24,170 q20,-14 40,0 t40,0 t40,0 t30,0 M24,220 q20,-14 40,0 M244,70 q20,-14 40,0 t40,0 t40,0 M244,120 q20,-14 40,0 t40,0 t40,0 M244,170 q20,-14 40,0 t40,0" fill="none" stroke="#5b6b60" stroke-width="4"/>
  </g>`);
}
function card(x,y,w,h,title,lines,u,a,num){
  const p=P(u,a,.45);
  return sv(`<g filter="url(#pencil)" style="opacity:${p}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="#fff" stroke="${INK}" stroke-width="5"/>${num?`<circle cx="${x}" cy="${y}" r="34" fill="#034620"/>`:''}</g>`)+
   (num?T(x-12,y-26,`<span class="lab" style="font-size:36px;color:#f7f5ef">${num}</span>`,`opacity:${p}`):'')+
   T(x+40,y+26,`<div style="width:${w-72}px"><div class="lab" style="font-size:30px;color:#034620">${title}</div>${lines?`<div style="font-size:34px;color:#3f5e4b;margin-top:8px;line-height:1.25">${lines}</div>`:''}</div>`,`opacity:${p}`);
}

// 1 hook
SC.push({kick:'ACCREVISE EXPLAINS',ring:[520,700,1100],d:3.5,ev:[.2,1,1.8],f:u=>
  `<div class="hl" style="${ap(u,.2)}">Claude Skills,</div>` +
  `<div class="hl" style="top:372px;${ap(u,1)}"><span class="mark">explained.</span></div>` +
  T(80,500,`<span class="lab" style="font-size:30px;color:#3f5e4b">FOR A SMALL SHOP</span>`,ap(u,1.8)) +
  sv(rohan(20,440,1.5,pr({prop:'phone',mood:'happy'})),0,0) +
  bubble(640,600,360,'2kg KK – Sharma ji',u,1.2,'r') + bubble(640,730,360,'1 box soan papdi, Sat',u,1.9,'r')
});
// 2 meet the hero: WhatsApp + counter book
SC.push({kick:'MEET PRIYA',ring:[-500,1100,1000],d:5,ev:[.2,.8,1.5,2.2,2.9],f:u=>
  hl(u,'Priya runs a ','sweet shop') +
  `<div style="opacity:${P(u,.3,.5)}">`+sv(rohan(-20,470,1.0,pr({prop:'phone',mood:'neutral'})),0,0)+`</div>` +
  T(560,470,`<span class="lab" style="font-size:28px;color:#3f5e4b">ON WHATSAPP</span>`,ap(u,.6)) +
  bubble(560,520,420,'2kg KK – Sharma ji',u,.8) +
  bubble(560,630,420,'same as last week pls',u,1.5) +
  bubble(560,740,420,'1 box soan papdi, Sat',u,2.2) +
  T(560,880,`<span class="lab" style="font-size:28px;color:#3f5e4b">IN THE COUNTER BOOK</span>`,ap(u,2.9)) +
  book(560,930,.95,u,2.9)
});
// 3 the real job
SC.push({kick:'THE REAL JOB',ring:[600,1250,900],d:4.5,ev:[.2,.6,1.6,2.6],f:u=>
  hl(u,'She ','retypes',' every order') +
  bubble(80,480,360,'2kg KK – Sharma ji',u,.6) + book(80,610,.75,u,.8) +
  sv(`<g filter="url(#pencil)"><path d="M440,700 C500,690 540,690 600,700" fill="none" stroke="${LOSS}" stroke-width="7" ${draw(P(u,1.6,.5))}/><path d="M580,680 L604,700 L580,720" fill="none" stroke="${LOSS}" stroke-width="7" style="opacity:${P(u,2,.2)}"/></g>`) +
  sv(`<g filter="url(#pencil)" style="opacity:${P(u,1.6,.4)}"><rect x="640" y="560" width="340" height="230" rx="12" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M670,610 H950 M670,650 H900 M670,690 H930 M670,730 H860" stroke="#9fbfab" stroke-width="7"/><path d="M610,790 L1010,790 L1030,830 L590,830 Z" fill="url(#hG)" stroke="${INK}" stroke-width="5"/></g>`) +
  T(660,850,`<span class="lab" style="font-size:28px;color:#034620">HER BILLING APP</span>`,ap(u,1.8)) +
  `<div style="opacity:${P(u,2.4,.5)}">`+sv(rohan(340,960,.85,pr({prop:'bill',mood:'worried',scratch:u>3})),0,0)+`</div>`
});
// 4 her evenings
SC.push({kick:'HER EVENINGS',ring:[500,-350,800],d:4.8,ev:[.2,.8,1.8,2.8],f:u=>{
  const box=(a,x,lab,val,col)=>{const p=P(u,a,.45);return sv(`<g filter="url(#pencil)" style="opacity:${p}"><rect x="6" y="6" width="268" height="190" fill="#fff" stroke="${INK}" stroke-width="5"/></g>`,x,520,280,200)+T(x,540,`<div style="width:280px;text-align:center"><div class="lab" style="font-size:24px;color:#3f5e4b">${lab}</div><div style="font-size:60px;margin-top:28px;color:${col||'#034620'}">${val}</div></div>`,`opacity:${p}`)};
  return hl(u,'Every ','evening') + box(.8,70,'ORDERS A DAY','40') + box(1.8,400,'EACH','3 min') + box(2.8,730,'EVERY EVENING','2 hrs',LOSS) +
   `<div style="opacity:${P(u,3,.5)}">`+sv(rohan(340,860,.95,pr({prop:'bill',mood:'worried',sweat:u>3.6})),0,0)+`</div>`;
}});
// 5 the real cost
SC.push({kick:'THE REAL COST',ring:[-400,1300,900],d:6,ev:[.2,.6,2.6,3.8],f:u=>{
  const hrs=Math.round(clamp((u-.6)/2)*600);
  return hl(u,'One year ','later') +
   T(80,470,`<div style="font-size:200px;line-height:1;color:${LOSS};font-weight:600">${hrs}</div><div class="lab" style="font-size:36px;color:#034620;margin-top:10px">HOURS OF RETYPING</div>`,`opacity:${P(u,.6,.3)}`) +
   T(80,760,`<span style="font-size:40px;color:#3f5e4b">2 hrs × 300 working days</span>`,ap(u,2.6)) +
   sv(`<g filter="url(#pencil)" style="opacity:${P(u,3.8,.4)}"><rect x="80" y="860" width="520" height="130" rx="14" fill="url(#hR)" stroke="${INK}" stroke-width="5"/></g>`) +
   T(110,885,`<div style="font-size:38px;color:#034620;background:#fff;padding:4px 12px;display:inline-block">2 kg typed as <b style="color:${LOSS}">2 boxes</b></div>`,ap(u,3.8)) +
   `<div style="opacity:${P(u,2.6,.5)}">`+sv(rohan(600,820,.85,pr({mood:'worried',scratch:true,sweat:u>3.8})),0,0)+`</div>`;
}});
// 6 the twin
SC.push({kick:'WHAT IF',ring:[640,-300,800],d:5.5,ev:[.2,.8,2.2],f:u=>{
  const sp=P(u,.8,.6);
  return hl(u,'A ','second',' Priya') +
   sv(`<g filter="url(#pencil)"><path d="M540,470 L540,${470+1000*sp}" stroke="${INK}" stroke-width="5"/></g>`) +
   `<div style="opacity:${sp}">`+sv(rohan(40,620,1.15,pr({prop:'bill',mood:'neutral'})),0,0)+sv(rohan(590,620,1.15,pr({prop:'laptop',mood:'happy'})),0,0)+`</div>`+
   T(80,1380,`<span class="lab" style="font-size:30px;color:#3f5e4b">RETYPES EVERY ORDER</span>`,ap(u,1.2)) +
   T(600,1380,`<span class="lab" style="font-size:30px;color:${G6}">TEACHES CLAUDE ONCE</span>`,ap(u,1.2)) +
   T(80,470,`<span class="lab" style="font-size:36px;color:${G6}">SAME SHOP. SAME ORDERS.</span>`,ap(u,2.2));
}});
// 7 ask the viewer
SC.push({kick:'YOUR GUESS',ring:[-300,400,1300],green:true,d:2.4,ev:[.2,.9],f:u=>
  `<div class="hl" style="top:760px;text-align:center;${ap(u,.2)}">So, what does she</div><div class="hl" style="top:850px;text-align:center;${ap(u,.9)}"><span class="mark">teach</span> it?</div>`
});
// 8 what she teaches
SC.push({kick:'HER SKILL',ring:[600,1300,1000],d:9,ev:[.2,.6,1.4,4.8,6.2],f:u=>{
  const fold=`<g filter="url(#pencil)" style="opacity:${P(u,.6,.5)}"><path d="M80,470 H330 L370,520 H960 V1120 H80 Z" fill="url(#hA)" stroke="${INK}" stroke-width="6"/><rect x="80" y="540" width="880" height="580" fill="#fff" stroke="${INK}" stroke-width="5"/></g>`;
  const item=(a,y,n,title,sub)=>T(120,y,`<div style="display:flex;gap:26px;align-items:flex-start"><span class="lab" style="font-size:34px;color:#f7f5ef;background:#034620;border-radius:9999px;width:58px;height:58px;display:inline-flex;align-items:center;justify-content:center;flex:none">${n}</span><div><div class="lab" style="font-size:32px;color:#034620">${title}</div><div style="font-size:36px;color:#3f5e4b;margin-top:6px">${sub}</div></div></div>`,ap(u,a));
  return hl(u,'What she ','teaches') + sv(fold) +
   T(100,486,`<span class="lab" style="font-size:28px;color:#034620">PRIYA-ORDERS · SKILL</span>`,`opacity:${P(u,.6,.5)}`) +
   item(1.4,580,1,'PRICE LIST + NICKNAMES','“KK” = kaju katli, “SP” = soan papdi') +
   item(4.8,760,2,'REGULAR CUSTOMERS','names, addresses, GST numbers') +
   item(6.2,940,3,'3 REAL ORDERS','each with the right bill');
}});
// 9 twist
SC.push({kick:'THE TWIST',ring:[350,500,1300],green:true,d:3.5,ev:[.2,1.4],f:u=>
  `<div class="hl" style="top:740px;text-align:center;font-size:60px;${ap(u,.2)}">Her billing app keeps the books.</div><div class="hl" style="top:900px;text-align:center;font-size:60px;${ap(u,1.4)}">Claude does the <span class="mark">reading.</span></div>`
});
// 10 every evening now
SC.push({kick:'EVERY EVENING NOW',ring:[-450,-300,900],d:10,ev:[.2,.6,1.4,3.6,4.6,6.8],f:u=>{
  const rows=[['Sharma ji','Kaju katli','2 kg',''],['Gupta','Soan papdi','1 box',''],['Mehta','Same as last week','?','check'],['Rao','Ladoo','2','kg or box?']];
  let tbl=`<table style="border-collapse:collapse;width:880px;font-size:32px;color:#034620"><tr>${['CUSTOMER','ITEM','QTY','CHECK'].map(h=>`<th class="lab" style="text-align:left;font-size:24px;padding:10px 14px;border-bottom:4px solid #034620">${h}</th>`).join('')}</tr>`;
  rows.forEach((r,i)=>{const p=P(u,3.6+i*.35,.3), flag=!!r[3];
    tbl+=`<tr style="opacity:${p};background:${flag&&u>6.8?'#f6e2b4':'transparent'}">${r.map((c,j)=>`<td style="padding:12px 14px;border-bottom:2px solid #9fbfab;${j==3?`color:${LOSS};font-weight:600`:''}">${c}</td>`).join('')}</tr>`;});
  tbl+=`</table>`;
  return hl(u,'Get a ','clean sheet') +
   T(80,470,`<span class="lab" style="font-size:28px;color:#3f5e4b">SHE DROPS IN</span>`,ap(u,.6)) +
   sv(`<g filter="url(#pencil)" style="opacity:${P(u,.6,.4)}"><rect x="80" y="520" width="150" height="260" rx="18" fill="url(#hA)" stroke="${INK}" stroke-width="5"/><rect x="96" y="550" width="118" height="190" fill="#dfe9e2" stroke="${INK}" stroke-width="3"/><rect x="250" y="520" width="150" height="260" rx="18" fill="url(#hA)" stroke="${INK}" stroke-width="5"/><rect x="266" y="550" width="118" height="190" fill="#dfe9e2" stroke="${INK}" stroke-width="3"/></g>`) +
   book(440,520,.55,u,1.4) +
   T(84,800,`<span style="font-size:30px;color:#3f5e4b">WhatsApp screenshots + a photo of the book</span>`,ap(u,1.4)) +
   T(80,900,`<div style="background:#fff;border:4px solid #034620;border-radius:16px;padding:14px">${tbl}</div>`,ap(u,3.4)) +
   T(80,1300,`<span class="hand" style="font-size:44px;color:${LOSS}">2 unclear orders flagged, not guessed</span>`,ap(u,6.8));
}});
// 11 be fair
SC.push({kick:'TO BE FAIR',ring:[560,1250,1000],d:6,ev:[.2,.6,2,3.6],f:u=>
  hl(u,'She still ','checks') +
  `<div style="opacity:${P(u,.6,.5)}">`+sv(rohan(80,480,1.05,pr({prop:'bill',mood:u>3.6?'happy':'neutral',look:-6})),0,0)+`</div>` +
  T(560,580,`<div style="font-size:46px;color:#034620;width:420px;line-height:1.25">Every line, before billing.</div>`,ap(u,2)) +
  T(560,780,`<div class="hand" style="font-size:42px;color:${G6};width:420px;line-height:1.15">Claude doesn’t replace her billing app. It feeds it.</div>`,ap(u,3.6))
});
// 12 how to make one
SC.push({kick:'MAKE YOUR OWN',ring:[-500,1350,900],d:8.5,ev:[.2,.8,2.6,4.6],f:u=>
  hl(u,'Your Skill in ','3 steps') +
  card(110,490,850,200,'TURN IT ON','Settings → Capabilities → Skills: switch on “skill-creator”',u,.8,1) +
  card(110,750,850,200,'DESCRIBE IT','In a chat: “Help me make a Skill for my shop’s orders”',u,2.6,2) +
  card(110,1010,850,200,'UPLOAD + TEST','Upload the Skill it makes. Try it on yesterday’s orders.',u,4.6,3)
});
// 13 truth
SC.push({kick:null,ring:[-300,150,1700],green:true,logo:false,d:4.6,ev:[.2,.5,1.6,2.4],f:u=>
  T(0,330,`<div style="width:1080px;text-align:center"><img src="logo-paper.png" style="height:330px"></div>`,ap(u,.2)) +
  `<div class="hl" style="left:0;width:1080px;top:780px;text-align:center;font-size:60px;${ap(u,.5)}">Your software needs clean data.</div>` +
  `<div class="hl" style="left:0;width:1080px;top:880px;text-align:center;font-size:60px;${ap(u,1.6)}">Teach Claude to make it <span class="mark">clean.</span></div>` +
  T(110,1150,`<div class="foot" style="width:860px;text-align:center;color:#b9d0c1">Illustrative times for one shop. Skills are on Claude’s paid plans; menu names may change, see Claude’s help centre. Claude doesn’t read WhatsApp directly: share screenshots or chat exports. Check every line before billing.</div>`,ap(u,2.4))
});
