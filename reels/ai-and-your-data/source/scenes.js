// ---------- Harry + extra drawings ----------
const HR={glasses:false};
const hr=(o)=>Object.assign({},HR,o);
const RED='#a8452a', AMBR='#e2b04a', GRN='#2d7049';
function bubble(x,y,w,text,u,a,side='l',bg='#dfe9e2'){
  const p=P(u,a,.35);
  return `<div class="ab" style="left:${x}px;top:${y}px;width:${w}px;opacity:${p};transform:translateY(${(1-p)*20}px)"><div style="background:${bg};border:3px solid #034620;border-radius:22px ${side==='l'?'22px 22px 4px':'22px 4px 22px'};padding:14px 20px;font-size:34px;line-height:1.2;color:#034620">${text}</div></div>`;
}
function light(x,y,s,on,u,a){ // traffic light; on = 'r'|'a'|'g'|null
  const p=P(u,a,.4);
  const c=(k,col,cy)=>`<circle cx="70" cy="${cy}" r="48" fill="${on===k?col:'#e9e6dc'}" stroke="${INK}" stroke-width="5"/>${on===k?`<circle cx="70" cy="${cy}" r="64" fill="none" stroke="${col}" stroke-width="6" opacity=".5"/>`:''}`;
  return sv(`<g filter="url(#pencil)" transform="translate(${x},${y}) scale(${s})" style="opacity:${p}"><rect x="0" y="0" width="140" height="360" rx="30" fill="#034620" stroke="${INK}" stroke-width="5"/>${c('r',RED,66)}${c('a',AMBR,180)}${c('g',GRN,294)}<rect x="60" y="360" width="20" height="160" fill="#034620"/></g>`);
}
function list(x,y,items,u,a,mark,col){
  return items.map((t,i)=>T(x,y+i*84,`<div style="display:flex;gap:22px;align-items:center"><span style="font-family:MS,MSX;font-weight:800;font-size:44px;color:${col};width:40px">${mark}</span><span style="font-size:42px;color:#034620">${t}</span></div>`,ap(u,a+i*.35))).join('');
}
function toggle(x,y,on){ // on: 0..1
  const bg=on>.5?GRN:'#b9c4bd';
  return `<div class="ab" style="left:${x}px;top:${y}px;width:150px;height:80px;border-radius:9999px;background:${bg};border:4px solid #034620"><div style="position:absolute;top:6px;left:${8+on*62}px;width:60px;height:60px;border-radius:50%;background:#fff;border:3px solid #034620"></div></div>`;
}

// 1 hook
SC.push({kick:'ACCREVISE EXPLAINS',ring:[520,700,1100],d:4.4,ev:[.2,1,2],f:u=>
  `<div class="hl" style="${ap(u,.2)}">“AI will take</div>` +
  `<div class="hl" style="top:372px;${ap(u,1)}"><span class="mark">my data.</span>”</div>` +
  T(80,500,`<span class="lab" style="font-size:30px;color:#3f5e4b">LET’S CHECK THAT</span>`,ap(u,2)) +
  sv(rohan(150,440,1.6,hr({mood:'worried',crossed:true})),0,0)
});
// 2 meet harry
SC.push({kick:'MEET HARRY',ring:[-500,1100,1000],d:6.9,ev:[.2,.6,1.6,2.4,3.2,4.4],f:u=>
  hl(u,'Harry fixes ','phones') +
  `<div style="opacity:${P(u,.4,.5)}">`+sv(rohan(-10,480,1.0,hr({prop:'phone',mood:u>4.4?'worried':'happy',scratch:u>5})),0,0)+`</div>` +
  T(560,480,`<span class="lab" style="font-size:28px;color:#3f5e4b">HIS CUSTOMER BOOK</span>`,ap(u,1.2)) +
  bubble(560,530,420,'Sharma ji · 98XXX XXX21',u,1.6) +
  bubble(560,640,420,'Iyer · iPhone, screen',u,2.4) +
  bubble(560,750,420,'Khan · GSTIN 27AB…',u,3.2) +
  T(80,1170,`<span class="hand" style="font-size:44px;color:${LOSS}">“What if AI leaks this?”</span>`,ap(u,4.4))
});
// 3 the worry is fair
SC.push({kick:'THE WORRY IS FAIR',ring:[600,1250,900],d:7.3,ev:[.2,.6,1.6,4.4],f:u=>
  hl(u,'The worry is ','fair') +
  sv(`<g filter="url(#pencil)" style="opacity:${P(u,.6,.4)}"><rect x="80" y="520" width="360" height="220" rx="16" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M110,580 H400 M110,630 H360 M110,680 H300" stroke="#9fbfab" stroke-width="7"/></g>`) +
  T(100,750,`<span class="lab" style="font-size:26px;color:#034620">WHAT YOU PASTE</span>`,ap(u,.6)) +
  sv(`<g filter="url(#pencil)"><path d="M460,630 C540,620 600,620 660,630" fill="none" stroke="${LOSS}" stroke-width="7" ${draw(P(u,1.6,.6))}/><path d="M640,610 L664,630 L640,650" fill="none" stroke="${LOSS}" stroke-width="7" style="opacity:${P(u,2.1,.2)}"/></g>`) +
  sv(`<g filter="url(#pencil)" style="opacity:${P(u,1.9,.4)}"><path d="M700,700 C660,700 650,640 700,630 C705,580 780,570 800,610 C830,580 900,600 890,650 C940,660 930,710 890,710 Z" fill="#dfe9e2" stroke="${INK}" stroke-width="5"/></g>`) +
  T(700,740,`<span class="lab" style="font-size:26px;color:#034620">THE AI COMPANY</span>`,ap(u,1.9)) +
  T(80,880,`<div style="font-size:52px;color:#034620;line-height:1.25">So <span class="mark" style="font-family:MS,MSX;font-weight:800">you decide</span><br>what goes in.</div>`,ap(u,4.4))
});
// 4 the twin
SC.push({kick:'WHAT IF',ring:[640,-300,800],d:6.3,ev:[.2,.8,2.4],f:u=>{
  const sp=P(u,.8,.6);
  return hl(u,'Two ','Harrys') +
   sv(`<g filter="url(#pencil)"><path d="M540,470 L540,${470+1000*sp}" stroke="${INK}" stroke-width="5"/></g>`) +
   `<div style="opacity:${sp}">`+sv(rohan(40,620,1.15,hr({mood:'neutral',crossed:true})),0,0)+sv(rohan(590,620,1.15,hr({prop:'laptop',mood:'happy'})),0,0)+`</div>`+
   T(80,1380,`<span class="lab" style="font-size:30px;color:#3f5e4b">AVOIDS AI</span>`,ap(u,1.2)) +
   T(600,1380,`<span class="lab" style="font-size:30px;color:${G6}">USES AI · 3 RULES</span>`,ap(u,2.4));
}});
// 5 cost of avoiding
SC.push({kick:'THE COST',ring:[-400,1300,900],d:6.4,ev:[.2,.6,2,3.2],f:u=>
  hl(u,'Falling ','behind') +
  `<div style="opacity:${P(u,.6,.5)}">`+sv(rohan(-10,560,.95,hr({prop:'phone',mood:'worried',sweat:u>3})),0,0)+`</div>` +
  T(80,480,`<span class="lab" style="font-size:28px;color:#3f5e4b">HARRY 1 · BY HAND</span>`,ap(u,.6)) +
  T(560,480,`<span class="lab" style="font-size:28px;color:#3f5e4b">THE SHOP NEXT DOOR</span>`,ap(u,2)) +
  bubble(560,540,420,'Is my phone ready?',u,2.2) +
  bubble(560,660,420,'Yes! Ready by 6 pm ✓',u,3,'r','#f6e2b4') +
  T(560,790,`<span class="hand" style="font-size:40px;color:${G6}">replied in 30 seconds</span>`,ap(u,3.4))
});
// 6 rule 1
SC.push({kick:'RULE 1',ring:[600,1250,900],d:7.5,ev:[.2,.6,1.6,4],f:u=>{
  const on=1-P(u,4,.5);
  return hl(u,'Training ','off') +
   T(80,480,`<div style="width:900px;background:#fff;border:4px solid #034620;border-radius:22px;padding:30px 34px;box-sizing:border-box;opacity:${P(u,.6,.4)}"><div class="lab" style="font-size:26px;color:#3f5e4b">SETTINGS → PRIVACY / DATA CONTROLS</div><div style="font-size:42px;color:#034620;margin-top:30px;width:600px;line-height:1.2">Use my chats to train the AI</div></div>`) +
   (P(u,.6,.4)>0?toggle(800,590,on):'') +
   T(80,760,`<span class="hand" style="font-size:44px;color:${on>.5?LOSS:G6}">${on>.5?'often ON by default':'OFF ✓ new chats aren’t used for training'}</span>`,ap(u,1.6)) +
   T(80,880,`<div class="foot" style="width:900px;font-size:26px">Business plans: read your plan’s data terms.</div>`,ap(u,5))
}});
// 7 rule 2
SC.push({kick:'RULE 2',ring:[-500,1100,1000],d:3.6,ev:[.2,.8],f:u=>
  hl(u,'A data ','traffic light') + light(470,520,1.3,null,u,.8)
});
// 8 red
SC.push({kick:'RED',ring:[640,-300,800],d:5.9,ev:[.2,.6,1,1.4,1.8,2.2],f:u=>
  hl(u,'Never ','paste it','',' loss') + light(80,500,1,'r',u,.2) +
  list(300,520,['Aadhaar','PAN','Passwords','Card numbers','OTPs'],u,.6,'✕',RED)
});
// 9 amber
SC.push({kick:'AMBER',ring:[600,1300,1000],d:7.4,ev:[.2,.6,2.6],f:u=>
  hl(u,'Hide details ','first') + light(80,500,1,'a',u,.2) +
  T(300,500,`<div style="background:#fff;border:4px solid #034620;border-radius:16px;padding:20px 26px;font-size:36px;line-height:1.5;color:#034620;width:620px;box-sizing:border-box;opacity:${P(u,.6,.4)}">Sharma ji, 98XXX XXX21,<br>GSTIN 27AB…, screen ₹4,500</div>`) +
  T(560,700,`<span style="font-family:MS,MSX;font-weight:800;font-size:56px;color:${INK};opacity:${P(u,2.2,.3)}">↓</span>`) +
  T(300,790,`<div style="background:#f6e2b4;border:4px solid #034620;border-radius:16px;padding:20px 26px;font-size:36px;line-height:1.5;color:#034620;width:620px;box-sizing:border-box;opacity:${P(u,2.6,.4)}"><b>Customer A</b>, [phone],<br>[GST], screen ₹4,500</div>`)
});
// 10 green
SC.push({kick:'GREEN',ring:[-450,-300,900],d:5.8,ev:[.2,.6,1,1.4,1.8],f:u=>
  hl(u,'Safe to ','share') + light(80,500,1,'g',u,.2) +
  list(300,520,['Price lists','Product details','Templates','Your own drafts'],u,.6,'✓',GRN)
});
// 11 rule 3
SC.push({kick:'RULE 3',ring:[560,1250,1000],d:5.1,ev:[.2,.6,2],f:u=>
  hl(u,'Check every ','answer') +
  `<div style="opacity:${P(u,.6,.5)}">`+sv(rohan(60,480,1.05,hr({prop:'bill',mood:'neutral',look:6})),0,0)+`</div>` +
  T(560,600,`<div style="font-size:52px;color:#034620;width:420px;line-height:1.2">AI can be <span class="mark" style="font-family:MS,MSX;font-weight:800">wrong.</span></div>`,ap(u,2))
});
// 12 payoff
SC.push({kick:'THE RESULT',ring:[-500,1350,900],d:6,ev:[.2,.6,1.8,3],f:u=>
  hl(u,'Fast, and ','safe') +
  list(80,500,['Replies in minutes','Private details stay in the shop'],u,.8,'✓',GRN) +
  `<div style="opacity:${P(u,2.4,.5)}">`+sv(rohan(340,820,.85,hr({mood:'cheer',jump:u>2.6&&u<4.6})),0,0)+`</div>`
});
// 13 truth
SC.push({kick:null,ring:[-300,150,1700],green:true,logo:false,d:3.4,ev:[.2,.5,1.4,2.2],f:u=>
  T(0,330,`<div style="width:1080px;text-align:center"><img src="logo-paper.png" style="height:330px"></div>`,ap(u,.2)) +
  `<div class="hl" style="left:0;width:1080px;top:800px;text-align:center;${ap(u,.5)}">Don’t avoid AI.</div>` +
  `<div class="hl" style="left:0;width:1080px;top:900px;text-align:center;${ap(u,1.4)}">Decide what it <span class="mark">sees.</span></div>` +
  T(110,1120,`<div class="foot" style="width:860px;text-align:center;color:#b9d0c1">Setting names differ by app and change over time; check yours. General guidance, not legal advice.</div>`,ap(u,2.2))
});
