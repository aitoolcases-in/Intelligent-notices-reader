// ---------- silent reel: profit on paper, no cash in bank ----------
const PR=(o)=>Object.assign({hair:'long',glasses:false},o);
const CAP=(y,html,u,a,size=58)=>T(80,y,`<div style="width:920px;font-family:MS,MSX;font-weight:800;font-size:${size}px;line-height:1.15;color:#034620">${html}</div>`,ap(u,a));
function box(x,y,s,u,a){const p=P(u,a,.35);
  return `<g filter="url(#pencil)" transform="translate(${x},${y}) scale(${s})" style="opacity:${p}"><rect x="0" y="0" width="120" height="90" fill="url(#hA)" stroke="${INK}" stroke-width="5"/><path d="M60,0 V90 M0,45 H120" stroke="${LOSS}" stroke-width="6"/><path d="M60,0 C40,-30 20,-20 40,0 M60,0 C80,-30 100,-20 80,0" fill="none" stroke="${LOSS}" stroke-width="5"/></g>`;}
function bubble(x,y,w,text,u,a){const p=P(u,a,.35);
  return `<div class="ab" style="left:${x}px;top:${y}px;width:${w}px;opacity:${p};transform:translateY(${(1-p)*20}px)"><div style="background:#dfe9e2;border:3px solid #034620;border-radius:22px 22px 22px 4px;padding:14px 20px;font-size:36px;line-height:1.2;color:#034620">${text}</div></div>`;}
function card(x,y,w,h,title,lines,u,a,num,bg){
  const p=P(u,a,.45);
  return sv(`<g filter="url(#pencil)" style="opacity:${p}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="${bg||'#fff'}" stroke="${INK}" stroke-width="5"/>${num?`<circle cx="${x}" cy="${y}" r="34" fill="#034620"/>`:''}</g>`)+
   (num?T(x-12,y-26,`<span class="lab" style="font-size:36px;color:#f7f5ef">${num}</span>`,`opacity:${p}`):'')+
   T(x+40,y+24,`<div style="width:${w-72}px"><div class="lab" style="font-size:30px;color:#034620">${title}</div>${lines?`<div style="font-size:36px;color:#3f5e4b;margin-top:8px;line-height:1.25">${lines}</div>`:''}</div>`,`opacity:${p}`);
}

// 1 hook: negative + solution
SC.push({kick:'ACCREVISE EXPLAINS',ring:[520,700,1100],d:4.6,ev:[.2,.6,2.4],f:u=>
  `<div class="hl" style="${ap(u,.2)}">Made a profit.</div>` +
  `<div class="hl" style="top:372px;${ap(u,.8)}"><span class="mark loss">Bank is empty?</span></div>` +
  T(80,500,`<div style="font-family:MS,MSX;font-weight:800;font-size:56px;color:#034620;opacity:${P(u,2.4,.4)};transform:translateY(${(1-P(u,2.4,.4))*20}px)">Here’s where <span class="mark">the cash went.</span></div>`) +
  sv(rohan(150,620,1.5,PR({prop:'bill',mood:u>.8?'worried':'happy',sweat:u>1.4})),0,0)
});
// 2 diwali rush
SC.push({kick:'MEET PRIYA',ring:[-500,1100,1000],d:4.8,ev:[.2,.6,1,1.4,1.8,2.6],f:u=>{
  let b=''; [[560,980],[690,980],[820,980],[620,890],[750,890],[690,800]].forEach(([x,y],i)=>b+=box(x,y,1,u,.6+i*.3));
  const n=Math.round(clamp((u-.6)/2)*6);
  return hl(u,'Diwali ','rush') + sv(b) +
   `<div style="opacity:${P(u,.4,.5)}">`+sv(rohan(-10,560,1.0,PR({mood:'cheer',jump:u>2.6&&u<4.2})),0,0)+`</div>` +
   CAP(470,`Record sales: <span class="mark">₹${n} lakh</span>`,u,.6,60);
}});
// 3 profit on paper
SC.push({kick:'ON PAPER',ring:[600,1250,900],d:4.6,ev:[.2,.6,1.4,2.2],f:u=>
  hl(u,'Profit: ','₹1.2 lakh') +
  T(110,520,`<div style="background:#fff;border:4px solid #034620;padding:34px 40px;width:860px;box-sizing:border-box;font-size:46px;color:#034620;line-height:1.7">
   <div style="display:flex;justify-content:space-between;opacity:${P(u,.6,.3)}"><span>Sales</span><b>₹6,00,000</b></div>
   <div style="display:flex;justify-content:space-between;opacity:${P(u,1.4,.3)}"><span>Costs</span><b>− ₹4,80,000</b></div>
   <div style="display:flex;justify-content:space-between;border-top:4px solid #034620;margin-top:10px;padding-top:10px;opacity:${P(u,2.2,.3)}"><span>Profit</span><b style="color:${G6}">₹1,20,000 ✓</b></div></div>`) +
  `<div style="opacity:${P(u,2.4,.5)}">`+sv(rohan(340,1030,.8,PR({mood:'happy'})),0,0)+`</div>`
});
// 4 bank balance
SC.push({kick:'1 NOVEMBER',ring:[640,-300,800],d:4.4,ev:[.2,.6,1.6],f:u=>{
  const bal=Math.round(340000-clamp((u-.6)/1.4)*330000);
  return hl(u,'Bank ','balance','',' loss') +
   T(260,480,`<div style="width:560px;background:#034620;border-radius:44px;padding:70px 40px;text-align:center;box-shadow:0 10px 0 rgba(3,70,32,.15);opacity:${P(u,.4,.3)}"><div class="lab" style="font-size:26px;color:#b9d0c1">AVAILABLE BALANCE</div><div style="font-family:MS,MSX;font-weight:800;font-size:92px;color:${u>2?'#f0a58c':'#f7f5ef'};margin-top:20px">₹${bal.toLocaleString('en-IN')}</div></div>`) +
   `<div style="opacity:${P(u,1.6,.4)}">`+sv(rohan(340,920,.85,PR({mood:'worried',scratch:true,sweat:true})),0,0)+`</div>`;
}});
// 5 bills due
SC.push({kick:'THIS WEEK',ring:[-400,1300,900],d:4.4,ev:[.2,.6,1.2,1.8,2.6],f:u=>
  hl(u,'Bills ','due') +
  card(110,500,850,130,'SUPPLIER','₹1,50,000',u,.6,null) +
  card(110,660,850,130,'STAFF SALARIES','₹45,000',u,1.2,null) +
  card(110,820,850,130,'RENT','₹15,000',u,1.8,null) +
  CAP(1010,`Total due: <span class="mark loss">₹2.1 lakh</span>`,u,2.6,62)
});
// 6 question
SC.push({kick:'SO…',ring:[-300,400,1300],green:true,d:3,ev:[.2],f:u=>
  `<div class="hl" style="top:780px;text-align:center;${ap(u,.2)}">Where did the<br><span class="mark">cash go?</span></div>`
});
// 7 leak 1: credit
SC.push({kick:'LEAK 1',ring:[600,1300,1000],d:5,ev:[.2,.6,1.2,1.8,2.8],f:u=>
  hl(u,'Stuck with ','customers') +
  bubble(80,500,600,'Will pay after Diwali 🙏',u,.6) +
  bubble(200,620,600,'Send bill, will clear next month',u,1.2) +
  bubble(80,740,600,'Office order. Pay in 30 days.',u,1.8) +
  CAP(900,`<span class="mark loss">₹3 lakh</span> sold on credit.<br>Profit, but no cash.`,u,2.8,56)
});
// 8 leak 2: stock
SC.push({kick:'LEAK 2',ring:[-450,-300,900],d:4.8,ev:[.2,.6,2.6],f:u=>{
  let j=''; for(let r=0;r<3;r++)for(let c=0;c<5;c++){const i=r*5+c;j+=`<g style="opacity:${P(u,.6+i*.08,.2)}"><rect x="${130+c*170}" y="${560+r*150}" width="110" height="110" rx="14" fill="url(#hA)" stroke="${INK}" stroke-width="4"/><rect x="${140+c*170}" y="${545+r*150}" width="90" height="20" rx="6" fill="url(#hN)" stroke="${INK}" stroke-width="3"/></g>`;}
  return hl(u,'Sitting on the ','shelf') +
   sv(`<g filter="url(#pencil)">${j}<path d="M100,680 H960 M100,830 H960 M100,980 H960" stroke="${INK}" stroke-width="6"/></g>`) +
   CAP(1060,`<span class="mark loss">₹1.5 lakh</span> of extra dry-fruit stock.`,u,2.6,52);
}});
// 9 the rule
SC.push({kick:'THE DIFFERENCE',ring:[350,500,1300],d:5,ev:[.2,.6,2.2],f:u=>
  hl(u,'Profit ≠ ','cash') +
  card(80,500,430,420,'',null,u,.6,null,'#dfe9e2') + T(120,540,`<div style="width:360px"><div style="font-family:MS,MSX;font-weight:800;font-size:64px;color:#034620">PROFIT</div><div style="font-size:48px;line-height:1.25;color:#034620;margin-top:24px">What you <b>earn</b> on paper.</div></div>`,ap(u,.6)) +
  card(570,500,430,420,'',null,u,2.2,null,'#f6e2b4') + T(610,540,`<div style="width:360px"><div style="font-family:MS,MSX;font-weight:800;font-size:64px;color:#034620">CASH</div><div style="font-size:48px;line-height:1.25;color:#034620;margin-top:24px">What you can <b>spend</b> today.</div></div>`,ap(u,2.2))
});
// 10 twin
SC.push({kick:'WHAT IF',ring:[560,1250,1000],d:4.2,ev:[.2,.8,2],f:u=>{
  const sp=P(u,.8,.6);
  return hl(u,'A ','second',' Priya') +
   sv(`<g filter="url(#pencil)"><path d="M540,470 L540,${470+1000*sp}" stroke="${INK}" stroke-width="5"/></g>`) +
   `<div style="opacity:${sp}">`+sv(rohan(40,620,1.15,PR({prop:'bill',mood:'worried'})),0,0)+sv(rohan(590,620,1.15,PR({prop:'phone',mood:'happy'})),0,0)+`</div>`+
   T(80,1380,`<span class="lab" style="font-size:30px;color:#3f5e4b">SAME SALES</span>`,ap(u,1.2)) +
   T(600,1380,`<span class="lab" style="font-size:30px;color:${G6}">3 CASH HABITS</span>`,ap(u,2));
}});
// 11 habits
SC.push({kick:'3 CASH HABITS',ring:[-500,1350,900],d:7.6,ev:[.2,.8,2.8,4.8],f:u=>
  hl(u,'Cash ','first') +
  card(110,490,850,190,'50% ADVANCE','on every bulk or office order',u,.8,1) +
  card(110,740,850,190,'A DUE DATE ON EVERY CREDIT','+ a polite reminder every week',u,2.8,2) +
  card(110,990,850,190,'BUY STOCK IN BATCHES','not all at once before the rush',u,4.8,3)
});
// 12 cash calendar + AI
SC.push({kick:'EVERY MONDAY',ring:[600,1250,900],d:7,ev:[.2,.6,1,1.4,1.8,4],f:u=>{
  const wk=[['WEEK 1','+₹1.8L','−₹1.2L'],['WEEK 2','+₹1.1L','−₹0.9L'],['WEEK 3','+₹0.9L','−₹1.4L'],['WEEK 4','+₹1.5L','−₹0.8L']];
  let rows=wk.map((w,i)=>`<div style="display:flex;justify-content:space-between;padding:14px 0;border-bottom:2px dashed #9fbfab;opacity:${P(u,.6+i*.4,.3)}"><span class="lab" style="font-size:28px">${w[0]}</span><span style="color:${G6}">${w[1]} in</span><span style="color:${LOSS}">${w[2]} out</span></div>`).join('');
  return hl(u,'A 4-week ','cash calendar') +
   T(80,500,`<div style="background:#fff;border:4px solid #034620;border-radius:18px;padding:20px 30px;width:920px;box-sizing:border-box;font-size:38px;color:#034620">${rows}</div>`) +
   T(80,920,`<div style="background:#034620;color:#f7f5ef;border-radius:18px;padding:24px 30px;width:920px;box-sizing:border-box;font-size:40px;line-height:1.25;opacity:${P(u,4,.4)}"><span style="color:#e2b04a;font-family:MS,MSX;font-weight:800">AI</span> can build this from your bank statement and dues list in minutes.</div>`) +
   T(80,1110,`<div class="foot" style="font-size:24px">Illustrative numbers.</div>`,ap(u,4));
}});
// 13 result
SC.push({kick:'THE RESULT',ring:[-400,1300,900],d:4.4,ev:[.2,.6,1.6],f:u=>
  hl(u,'No ','panic loan') +
  T(80,500,`<div style="font-size:48px;color:#034620;line-height:1.6"><div style="opacity:${P(u,.6,.3)}"><span style="color:${G6};font-family:MS,MSX;font-weight:800">✓</span> Supplier paid on time</div><div style="opacity:${P(u,1,.3)}"><span style="color:${G6};font-family:MS,MSX;font-weight:800">✓</span> Staff paid on the 1st</div><div style="opacity:${P(u,1.4,.3)}"><span style="color:${G6};font-family:MS,MSX;font-weight:800">✓</span> Sleeps well after Diwali</div></div>`) +
  `<div style="opacity:${P(u,1.6,.5)}">`+sv(rohan(340,900,.85,PR({mood:'cheer',jump:u>1.8&&u<3.6})),0,0)+`</div>`
});
// 14 truth
SC.push({kick:null,ring:[-300,150,1700],green:true,logo:false,d:4.8,ev:[.2,.5,1.5,2.4],f:u=>
  T(0,330,`<div style="width:1080px;text-align:center"><img src="logo-paper.png" style="height:330px"></div>`,ap(u,.2)) +
  `<div class="hl" style="left:0;width:1080px;top:800px;text-align:center;${ap(u,.5)}">Profit is an opinion.</div>` +
  `<div class="hl" style="left:0;width:1080px;top:900px;text-align:center;${ap(u,1.5)}">Cash is a <span class="mark">fact.</span></div>` +
  T(110,1120,`<div class="foot" style="width:860px;text-align:center;color:#b9d0c1">Illustrative example for one shop. General information, not financial advice.</div>`,ap(u,2.4))
});
