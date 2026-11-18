// ---------- Gupta ji + the test grid ----------
const GJ={mustache:true,grey:true};
const gj=(o)=>Object.assign({},GJ,o);
const JOBS=[
 {t:'Talk to customers',m:['✓','✕','✕'],v:'HUMAN',k:'no'},
 {t:'Check stock by eye',m:['✓','✕','✕'],v:'HANDS-ON',k:'no'},
 {t:'Supplier deals',m:['✓','✕','✕'],v:'JUDGMENT',k:'no'},
 {t:'“In stock?” replies',m:['✓','✓','✓'],v:'AI FITS',k:'ai'},
 {t:'Payment reminders',m:['✓','✓','✓'],v:'AI FITS',k:'ai'},
 {t:'GST billing',m:['✓','✓','✓'],v:'SOFTWARE',k:'sw'}];
// cfg: rowsAt (array of times or number), colsAt, evalAt {i:t}, dim (bool), y
function grid(u,cfg){
  const y=cfg.y||760;
  const head=`<tr><th style="text-align:left;width:360px"></th>${['EVERY<br>WEEK?','READ, WRITE<br>OR SORT?','LEARN IN<br>5 MIN?'].map(h=>`<th class="lab" style="font-size:20px;color:#3f5e4b;text-align:center;padding:6px 4px;opacity:${cfg.colsAt==null?0:P(u,cfg.colsAt,.4)}">${h}</th>`).join('')}<th style="width:190px"></th></tr>`;
  let rows='';
  JOBS.forEach((j,i)=>{
    const ra=Array.isArray(cfg.rowsAt)?cfg.rowsAt[i]:cfg.rowsAt;
    const rp=ra==null?1:P(u,ra,.35);
    const ea=cfg.evalAt&&cfg.evalAt[i]!=null?cfg.evalAt[i]:null;
    const done=ea!=null&&u>=ea;
    const dim=cfg.dim&&j.k!=='ai';
    const bg=done&&j.k==='ai'?'#f6e2b4':'transparent';
    const marks=j.m.map((m,c)=>{const shown=ea!=null&&u>=ea+c*.25;const col=m==='✓'?'#2d7049':'#a8452a';
      return `<td style="text-align:center;font-family:MS,MSX;font-weight:800;font-size:40px;color:${col};opacity:${shown?1:0}">${m}</td>`;}).join('');
    const vcol=j.k==='ai'?'#034620':j.k==='sw'?'#3f5e4b':'#a8452a';
    const vbg=j.k==='ai'?'#e2b04a':j.k==='sw'?'#dfe9e2':'#f3d7cc';
    const vshow=ea!=null&&u>=ea+.8;
    rows+=`<tr style="opacity:${rp*(dim?.35:1)};background:${bg}"><td style="font-size:34px;color:#034620;padding:14px 10px;border-bottom:2px solid #9fbfab${done&&j.k==='no'?';text-decoration:line-through;text-decoration-color:#a8452a':''}">${j.t}</td>${marks}<td style="text-align:right;border-bottom:2px solid #9fbfab"><span class="lab" style="font-size:22px;color:${vcol};background:${vbg};padding:6px 12px;border-radius:8px;opacity:${vshow?1:0}">${j.v}</span></td></tr>`;
  });
  return T(80,y,`<table style="border-collapse:collapse;width:920px">${head}${rows}</table>`);
}
function shop(x,y,s,u,a){ // shelves with tools and paint cans
  const p=P(u,a,.45);
  return sv(`<g filter="url(#pencil)" transform="translate(${x},${y}) scale(${s})" style="opacity:${p}">
   <rect x="0" y="0" width="420" height="460" fill="#fff" stroke="${INK}" stroke-width="5"/>
   <path d="M0,150 H420 M0,300 H420" stroke="${INK}" stroke-width="5"/>
   <rect x="30" y="70" width="70" height="80" fill="url(#hA)" stroke="${INK}" stroke-width="4"/><rect x="120" y="90" width="70" height="60" fill="url(#hN)" stroke="${INK}" stroke-width="4"/><rect x="210" y="60" width="70" height="90" fill="url(#hA)" stroke="${INK}" stroke-width="4"/>
   <path d="M310,140 L390,60 M372,50 l30,30" stroke="${INK}" stroke-width="7"/>
   <circle cx="80" cy="250" r="40" fill="url(#hN)" stroke="${INK}" stroke-width="4"/><rect x="150" y="215" width="110" height="85" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M290,300 V230 H360 V300" fill="url(#hG)" stroke="${INK}" stroke-width="4"/>
   <path d="M40,440 V360 H120 V440 M160,440 V340 H260 V440 M300,440 V370 H390 V440" fill="url(#hG)" stroke="${INK}" stroke-width="4"/>
  </g>`);
}
function card(x,y,w,h,title,lines,u,a,num){
  const p=P(u,a,.45);
  return sv(`<g filter="url(#pencil)" style="opacity:${p}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="#fff" stroke="${INK}" stroke-width="5"/>${num?`<circle cx="${x}" cy="${y}" r="34" fill="#034620"/>`:''}</g>`)+
   (num?T(x-12,y-26,`<span class="lab" style="font-size:36px;color:#f7f5ef">${num}</span>`,`opacity:${p}`):'')+
   T(x+40,y+26,`<div style="width:${w-72}px"><div class="lab" style="font-size:30px;color:#034620">${title}</div>${lines?`<div style="font-size:34px;color:#3f5e4b;margin-top:8px;line-height:1.25">${lines}</div>`:''}</div>`,`opacity:${p}`);
}
const QS=(u,a)=>[['1','Does it repeat every week?'],['2','Is it reading, writing or sorting?'],['3','Could a new helper learn it in 5 min?']].map(([n,q],i)=>
  T(80,440+i*96,`<div style="display:flex;gap:22px;align-items:center"><span class="lab" style="font-size:30px;color:#f7f5ef;background:#034620;border-radius:9999px;width:56px;height:56px;display:inline-flex;align-items:center;justify-content:center">${n}</span><span style="font-size:40px;color:#034620">${q}</span></div>`,ap(u,a+i*1.6))).join('');

// 1 hook
SC.push({kick:'ACCREVISE EXPLAINS',ring:[520,700,1100],d:3.9,ev:[.2,1,2],f:u=>
  `<div class="hl" style="${ap(u,.2)}">“AI is not for</div>` +
  `<div class="hl" style="top:372px;${ap(u,1)}"><span class="mark">my business.</span>”</div>` +
  T(80,500,`<span class="lab" style="font-size:30px;color:#3f5e4b">LET’S TEST THAT</span>`,ap(u,2)) +
  sv(rohan(150,440,1.6,gj({mood:'neutral',crossed:true})),0,0)
});
// 2 meet gupta ji
SC.push({kick:'MEET GUPTA JI',ring:[-500,1100,1000],d:6.5,ev:[.2,.6,1.6,3.6],f:u=>
  hl(u,'25 years, one ','hardware shop') +
  `<div style="opacity:${P(u,.4,.5)}">`+sv(rohan(-10,520,1.0,gj({mood:u>3.6?'neutral':'happy',crossed:u>3.6})),0,0)+`</div>` +
  shop(560,560,1.0,u,.6) +
  T(80,1220,`<span class="hand" style="font-size:46px;color:${LOSS}">“AI? Not for a shop like mine.”</span>`,ap(u,3.6))
});
// 3 the real question
SC.push({kick:'THE REAL QUESTION',ring:[600,1250,900],d:6,ev:[.2,.6,2,3],f:u=>
  hl(u,'He’s ','half right') +
  T(80,520,`<div style="font-size:64px;color:#3f5e4b;position:relative;display:inline-block">Should I use AI?<span style="position:absolute;left:-10px;top:50%;height:8px;background:${LOSS};width:${P(u,2,.5)*110}%"></span></div>`,ap(u,.6)) +
  T(80,700,`<div style="font-size:72px;color:#034620;font-weight:600;line-height:1.15">Which of my jobs<br><span class="mark" style="font-family:MS,MSX;font-weight:800">fit AI?</span></div>`,ap(u,3)) +
  `<div style="opacity:${P(u,3.4,.5)}">`+sv(rohan(600,1000,.75,gj({mood:'neutral',look:-6})),0,0)+`</div>`
});
// 4 his week
SC.push({kick:'HIS WEEK',ring:[500,-350,800],d:3.3,ev:[.2,.5],f:u=>
  hl(u,'His week: ','6 jobs') + grid(u,{y:470,rowsAt:[.4,.6,.8,1,1.2,1.4]}) +
  `<div style="opacity:${P(u,1.6,.5)}">`+sv(rohan(380,1080,.7,gj({mood:'neutral'})),0,0)+`</div>`
});
// 5 the 3-question test
SC.push({kick:'THE TEST',ring:[-400,1300,900],d:10.3,ev:[.2,.6,2.2,3.8,6],f:u=>
  hl(u,'The ','3-question test') + QS(u,.6) + grid(u,{y:760,colsAt:6})
});
// 6 the ✕ jobs
SC.push({kick:'THE TEST',ring:[640,-300,800],d:7.5,ev:[.2,.6,2.4,4.2],f:u=>
  hl(u,'Some jobs stay ','human') + grid(u,{y:470,colsAt:-1,evalAt:{0:.6,1:2.4,2:4.2}}) +
  `<div style="opacity:${P(u,.6,.5)}">`+sv(rohan(380,1080,.7,gj({mood:'happy'})),0,0)+`</div>`
});
// 7 ask
SC.push({kick:'YOUR GUESS',ring:[-300,400,1300],green:true,d:2.1,ev:[.2],f:u=>
  `<div class="hl" style="top:800px;text-align:center;${ap(u,.2)}">So, what’s <span class="mark">left?</span></div>`
});
// 8 the AI jobs
SC.push({kick:'THE ANSWER',ring:[600,1300,1000],d:7,ev:[.2,.6,2.8],f:u=>
  hl(u,'Two jobs pass ','all three') + grid(u,{y:470,colsAt:-1,evalAt:{0:-9,1:-9,2:-9,3:.6,4:2.8},dim:true}) +
  `<div style="opacity:${P(u,3.6,.5)}">`+sv(rohan(380,1080,.7,gj({mood:'happy',look:6})),0,0)+`</div>`
});
// 9 software already does it
SC.push({kick:'ONE MORE',ring:[350,500,1300],d:6.9,ev:[.2,.6,2.4],f:u=>
  hl(u,'Software already ','does it') + grid(u,{y:470,colsAt:-1,evalAt:{0:-9,1:-9,2:-9,3:-9,4:-9,5:.6},dim:false}) +
  T(80,1110,`<div style="font-size:48px;color:#034620;line-height:1.2">Don’t add AI where<br><span class="mark" style="font-family:MS,MSX;font-weight:800">software works.</span></div>`,ap(u,2.4))
});
// 10 the payoff
SC.push({kick:'THE PAYOFF',ring:[-450,-300,900],d:6,ev:[.2,.6,1.6,3],f:u=>{
  const b1=P(u,.6,.8)*640, b2=P(u,1.6,.8)*640*2/6;
  return hl(u,'About ','8 hours a week') +
   T(80,480,`<span class="lab" style="font-size:28px;color:#034620">“IN STOCK?” REPLIES · ~6 HRS</span>`,ap(u,.6)) +
   sv(`<g filter="url(#pencil)"><rect x="80" y="530" width="${b1}" height="90" fill="url(#hA)" stroke="${INK}" stroke-width="5"/><rect x="80" y="720" width="${b2}" height="90" fill="url(#hA)" stroke="${INK}" stroke-width="5"/></g>`) +
   T(80,670,`<span class="lab" style="font-size:28px;color:#034620">PAYMENT REMINDERS · ~2 HRS</span>`,ap(u,1.6)) +
   T(80,880,`<div style="font-size:52px;color:#034620;line-height:1.2">That’s where AI fits.<br><b style="color:${LOSS};font-weight:600">Nowhere else.</b></div>`,ap(u,3)) +
   `<div style="opacity:${P(u,3,.5)}">`+sv(rohan(600,1050,.75,gj({mood:'cheer',jump:u>3&&u<5.2})),0,0)+`</div>`;
}});
// 11 be fair
SC.push({kick:'TO BE FAIR',ring:[560,1250,1000],d:6.5,ev:[.2,.6,2.4],f:u=>
  hl(u,'Nothing passes? ','No AI.') +
  `<div style="opacity:${P(u,.6,.5)}">`+sv(rohan(60,480,1.05,gj({mood:u>2.4?'happy':'neutral'})),0,0)+`</div>` +
  T(560,600,`<div style="font-size:46px;color:#034620;width:420px;line-height:1.25">Then you don’t need AI yet.</div>`,ap(u,.8)) +
  T(560,820,`<div class="hand" style="font-size:42px;color:${G6};width:420px;line-height:1.15">That’s a good answer too.</div>`,ap(u,2.4))
});
// 12 your turn
SC.push({kick:'YOUR TURN',ring:[-500,1350,900],d:6.4,ev:[.2,.8,2.2,3.6],f:u=>
  hl(u,'Try it ','tonight') +
  card(110,500,850,180,'LIST YOUR WEEK','every job, big and small',u,.8,1) +
  card(110,740,850,180,'ASK THE 3 QUESTIONS','repeat? read/write/sort? learn in 5 min?',u,2.2,2) +
  card(110,980,850,180,'START WITH ONE JOB','only one that passes all three',u,3.6,3)
});
// 13 truth
SC.push({kick:null,ring:[-300,150,1700],green:true,logo:false,d:4,ev:[.2,.5,1.5,2.4],f:u=>
  T(0,330,`<div style="width:1080px;text-align:center"><img src="logo-paper.png" style="height:330px"></div>`,ap(u,.2)) +
  `<div class="hl" style="left:0;width:1080px;top:800px;text-align:center;font-size:64px;${ap(u,.5)}">Don’t ask if AI is for you.</div>` +
  `<div class="hl" style="left:0;width:1080px;top:900px;text-align:center;font-size:64px;${ap(u,1.5)}">Ask which <span class="mark">job</span> is.</div>` +
  T(110,1120,`<div class="foot" style="width:860px;text-align:center;color:#b9d0c1">Illustrative example for one shop. Hours are estimates; check before you invest in any tool.</div>`,ap(u,2.4))
});
