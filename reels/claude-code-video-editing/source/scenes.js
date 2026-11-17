// ---------- extra drawings ----------
const MONO="'JetBrains Mono','DejaVu Sans Mono',monospace";
const typ=(s,u,a,cps=32)=>{const n=Math.max(0,Math.floor((u-a)*cps));return n>=s.length?s:s.slice(0,n)+'<span style="opacity:.8">▍</span>'};
function term(x,y,w,h,lines,u,a,title='Terminal'){ // a terminal window; lines: [{t,at,col,typed}]
  const p=P(u,a,.4);
  let body='';
  lines.forEach(l=>{ if(u<l.at) return;
    const txt=l.typed===false?l.t:typ(l.t,u,l.at,l.cps||32);
    body+=`<div style="color:${l.col||'#f7f5ef'};white-space:pre-wrap;word-break:break-word">${l.p===false?'':'<span style="color:#e2b04a">$ </span>'}${txt}</div>`;});
  return `<div class="ab" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;opacity:${p};transform:translateY(${(1-p)*20}px);background:#034620;border:5px solid #034620;border-radius:20px;overflow:hidden;box-shadow:0 10px 0 rgba(3,70,32,.15)">
   <div style="background:#0b5a2e;padding:12px 18px;display:flex;gap:10px;align-items:center"><span style="width:16px;height:16px;border-radius:50%;background:#e2b04a"></span><span style="width:16px;height:16px;border-radius:50%;background:#9fbfab"></span><span style="width:16px;height:16px;border-radius:50%;background:#f7f5ef"></span><span class="lab" style="font-size:22px;color:#b9d0c1;margin-left:12px">${title}</span></div>
   <div style="padding:22px 26px;font-family:${MONO};font-size:31px;line-height:1.45;display:flex;flex-direction:column;gap:6px">${body}</div></div>`;
}
function tree(x,y,rows,u){ // folder tree; rows: [{d,name,kind,at,note}]
  let h='';
  rows.forEach(r=>{const p=P(u,r.at,.35);
    const icon=r.kind==='dir'?`<svg width="44" height="34" viewBox="0 0 44 34" style="flex:none"><path d="M2,6 H16 L20,11 H42 V32 H2 Z" fill="#f1cf86" stroke="#034620" stroke-width="3"/></svg>`
      :`<svg width="34" height="40" viewBox="0 0 34 40" style="flex:none"><path d="M3,2 H22 L31,11 V38 H3 Z" fill="#fff" stroke="#034620" stroke-width="3"/><path d="M22,2 V11 H31" fill="none" stroke="#034620" stroke-width="3"/></svg>`;
    h+=`<div style="display:flex;align-items:center;gap:16px;margin-left:${r.d*56}px;opacity:${p};transform:translateX(${(1-p)*-20}px);height:62px">${icon}<span style="font-family:${MONO};font-size:36px;color:#034620;${r.hi?'background:#e2b04a;padding:0 8px;border-radius:6px;':''}">${r.name}</span>${r.note?`<span style="font-size:30px;color:#3f5e4b;margin-left:8px">${r.note}</span>`:''}</div>`;});
  return T(x,y,`<div>${h}</div>`);
}
function clock(x,y,r,label,u,a,col){
  const p=P(u,a,.4), ang=-90+360*clamp((u-a)/1.6)*0.9;
  return sv(`<g filter="url(#pencil)" style="opacity:${p}"><circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${INK}" stroke-width="6"/><path d="M${x},${y} L${x+Math.cos(ang*Math.PI/180)*r*.7},${y+Math.sin(ang*Math.PI/180)*r*.7}" stroke="${col||LOSS}" stroke-width="7" stroke-linecap="round"/><path d="M${x},${y} L${x},${y-r*.5}" stroke="${INK}" stroke-width="7" stroke-linecap="round"/></g>`)+
   T(x-r,y+r+16,`<div style="width:${2*r}px;text-align:center"><span style="font-size:52px;color:${col||LOSS};font-weight:600">${label}</span></div>`,`opacity:${p}`);
}
function film(x,y,w,u,a){const p=P(u,a,.4);let holes='';for(let i=0;i<Math.floor(w/40);i++)holes+=`<rect x="${x+10+i*40}" y="${y+8}" width="20" height="14" rx="3" fill="#f7f5ef"/><rect x="${x+10+i*40}" y="${y+118}" width="20" height="14" rx="3" fill="#f7f5ef"/>`;
  let fr='';for(let i=0;i<3;i++)fr+=`<rect x="${x+14+i*(w-28)/3}" y="${y+32}" width="${(w-28)/3-12}" height="76" fill="url(#hA)" stroke="${INK}" stroke-width="3"/>`;
  return sv(`<g filter="url(#pencil)" style="opacity:${p}"><rect x="${x}" y="${y}" width="${w}" height="140" rx="8" fill="#034620"/>${holes}${fr}</g>`);}

// 1 hook
SC.push({kick:'ACCREVISE EXPLAINS',ring:[520,700,1100],d:3.4,ev:[.2,1,1.8],f:u=>
  `<div class="hl" style="${ap(u,.2)}">Edit videos with</div>` +
  `<div class="hl" style="top:372px;${ap(u,1)}"><span class="mark">Claude Code.</span></div>` +
  T(80,500,`<span class="lab" style="font-size:30px;color:#3f5e4b">END TO END · ONE SKILL</span>`,ap(u,1.8)) +
  sv(rohan(20,440,1.5,{prop:'phone',mood:'happy'}),0,0) + film(620,640,400,u,1.2)
});
// 2 meet rohan
SC.push({kick:'MEET ROHAN',ring:[-500,1100,1000],d:5.3,ev:[.2,.6,1.8,2.8],f:u=>
  hl(u,'Rohan films ','reels') +
  `<div style="opacity:${P(u,.4,.5)}">`+sv(rohan(-10,470,1.0,{prop:'phone',mood:u>2.8?'worried':'happy',scratch:u>3.6}),0,0)+`</div>` +
  film(560,500,440,u,.8) +
  clock(780,880,120,'2 hrs each',u,1.8) +
  T(80,1170,`<span class="hand" style="font-size:48px;color:${LOSS}">in an editing app, by hand</span>`,ap(u,2.8))
});
// 3 same edits every time
SC.push({kick:'THE REAL JOB',ring:[600,1250,900],d:7.9,ev:[.2,.6,2,3.2,4.4,5.6],f:u=>{
  const bx=P(u,.6,.6);
  return hl(u,'Same edits, ','every time') +
   sv(`<g filter="url(#pencil)" style="opacity:${bx}"><rect x="80" y="440" width="880" height="620" fill="#fff" stroke="${INK}" stroke-width="6"/><rect x="80" y="440" width="880" height="80" fill="url(#hG)" stroke="${INK}" stroke-width="6"/></g>`) +
   T(110,456,`<span class="lab" style="font-size:30px;color:#034620;background:#fff;padding:4px 10px">EVERY SINGLE REEL</span>`,`opacity:${bx}`) +
   tick(u,2,130,560,'trim the pauses') + tick(u,3.2,130,680,'add his logo, top-left') +
   tick(u,4.4,130,800,'add a title') + tick(u,5.6,130,920,'export 1080 × 1920 for Instagram');
}});
// 4 the twin
SC.push({kick:'WHAT IF',ring:[640,-300,800],d:5.8,ev:[.2,.8,2.4],f:u=>{
  const sp=P(u,.8,.6);
  return hl(u,'A ','second',' Rohan') +
   sv(`<g filter="url(#pencil)"><path d="M540,470 L540,${470+1000*sp}" stroke="${INK}" stroke-width="5"/></g>`) +
   `<div style="opacity:${sp}">`+sv(rohan(40,620,1.15,{prop:'phone',mood:'worried'}),0,0)+sv(rohan(590,620,1.15,{prop:'laptop',mood:'happy'}),0,0)+`</div>`+
   T(80,1380,`<span class="lab" style="font-size:30px;color:#3f5e4b">EDITS EVERY REEL</span>`,ap(u,1.2)) +
   T(600,1380,`<span class="lab" style="font-size:30px;color:${G6}">TEACHES CLAUDE ONCE</span>`,ap(u,1.2)) +
   T(80,470,`<span class="lab" style="font-size:36px;color:${G6}">THOSE 4 EDITS → ONE SKILL</span>`,ap(u,2.4));
}});
// 5 step 1: folder
SC.push({kick:'STEP 1',ring:[-450,-300,900],d:5.6,ev:[.2,.6,1.4,2.2,3,3.8],f:u=>
  hl(u,'Make a ','folder') +
  tree(110,500,[{d:0,name:'my-reels/',kind:'dir',at:.6},{d:1,name:'raw/',kind:'dir',at:1.4,note:'your clips'},{d:2,name:'day1.mp4',kind:'file',at:1.8},{d:1,name:'brand/',kind:'dir',at:2.6,note:'your logo'},{d:2,name:'logo.png',kind:'file',at:3},{d:1,name:'final/',kind:'dir',at:3.8,note:'finished reels'}],u) +
  `<div style="opacity:${P(u,1,.5)}">`+sv(rohan(600,1000,.8,{prop:'laptop',mood:'happy'}),0,0)+`</div>`
});
// 6 step 2: install
SC.push({kick:'STEP 2',ring:[600,1250,900],d:6.8,ev:[.2,.6,1.2,3.4],f:u=>
  hl(u,'Install ','2 tools') +
  term(80,470,920,330,[{t:'# Claude Code (Mac / Linux)',at:.8,col:'#9fbfab',typed:false,p:false},{t:'curl -fsSL https://claude.ai/install.sh | bash',at:1.2}],u,.6,'1 · Claude Code') +
  term(80,850,920,250,[{t:'# FFmpeg: the free video cutter',at:3,col:'#9fbfab',typed:false,p:false},{t:'brew install ffmpeg',at:3.4}],u,2.8,'2 · FFmpeg') +
  T(80,1140,`<div class="foot" style="width:900px">Windows: <span style="font-family:${MONO}">irm https://claude.ai/install.ps1 | iex</span> and <span style="font-family:${MONO}">winget install Gyan.FFmpeg</span></div>`,ap(u,4.4))
});
// 7 step 3: open claude in the folder
SC.push({kick:'STEP 3',ring:[-500,1100,1000],d:5,ev:[.2,.6,1.2,2.2],f:u=>
  hl(u,'Open Claude ','in the folder') +
  term(80,480,920,420,[{t:'cd my-reels',at:1},{t:'claude',at:2},{t:'✻ Welcome to Claude Code',at:2.8,col:'#e2b04a',typed:false,p:false},{t:'Log in with your Claude account',at:3.2,col:'#b9d0c1',typed:false,p:false}],u,.6) +
  `<div style="opacity:${P(u,1,.5)}">`+sv(rohan(340,950,.85,{prop:'laptop',mood:'happy'}),0,0)+`</div>`
});
// 8 step 4: ask for the skill
SC.push({kick:'STEP 4',ring:[640,-300,800],d:5.5,ev:[.2,.6,1],f:u=>
  hl(u,'Ask for the ','Skill') +
  term(80,470,920,640,[{t:'> Make a skill called reel-editor. For each clip in raw/: cut pauses longer than 1 second, put brand/logo.png top-left, add the title I give you, export 1080×1920 to final/.',at:1,p:false,col:'#f7f5ef',cps:70}],u,.6,'claude · my-reels') +
  T(80,1150,`<span class="hand" style="font-size:44px;color:${G6}">plain words. no code.</span>`,ap(u,4.2))
});
// 9 it writes the skill
SC.push({kick:'STEP 4 · DONE',ring:[560,1250,1000],d:4.9,ev:[.2,.6,1.4,2.2],f:u=>
  hl(u,'Saved as a ','file') +
  tree(110,480,[{d:0,name:'my-reels/',kind:'dir',at:-1},{d:1,name:'.claude/skills/reel-editor/',kind:'dir',at:.6},{d:2,name:'SKILL.md',kind:'file',at:1.4,hi:u>2.2},{d:1,name:'raw/  brand/  final/',kind:'dir',at:-1}],u) +
  T(80,790,`<div style="background:#fff;border:4px solid #034620;border-radius:16px;padding:22px 26px;width:860px;font-family:${MONO};font-size:28px;line-height:1.45;color:#034620;opacity:${P(u,2.2,.4)}">---<br>name: reel-editor<br>description: Edit raw clips into<br>&nbsp;&nbsp;Instagram reels for my shop<br>---<br>1. Cut pauses over 1 s (ffmpeg)<br>2. Logo top-left, title on top<br>3. Export 1080×1920 to final/</div>`)
});
// 10 step 5: use it
SC.push({kick:'STEP 5',ring:[-450,-300,900],d:8.2,ev:[.2,.6,1,3.4,5.2],f:u=>
  hl(u,'Use it ','every day') +
  term(80,470,920,520,[{t:'/reel-editor raw/day1.mp4 "Diwali offer"',at:1,p:false,col:'#e2b04a'},{t:'Running ffmpeg… cutting 14 pauses',at:3.4,typed:false,p:false,col:'#b9d0c1'},{t:'Adding logo + title… exporting',at:4.2,typed:false,p:false,col:'#b9d0c1'},{t:'✓ Saved final/day1_reel.mp4',at:5.2,typed:false,p:false,col:'#9fbfab'}],u,.6,'claude · my-reels') +
  `<div style="opacity:${P(u,5.2,.5)}">`+sv(rohan(340,1030,.8,{prop:'phone',mood:'happy'}),0,0)+`</div>`
});
// 11 reveal
SC.push({kick:'THE RESULT',ring:[600,1300,1000],d:4.4,ev:[.2,.6,1.6,2.6],f:u=>
  hl(u,'From 2 hours to ','10 minutes') +
  clock(270,700,150,'2 hrs editing',u,.6) + clock(790,700,150,'~10 min checking',u,1.6,G6) +
  `<div style="opacity:${P(u,2.4,.5)}">`+sv(rohan(340,1020,.8,{mood:'cheer',jump:u>2.4&&u<4.2}),0,0)+`</div>`
});
// 12 be fair
SC.push({kick:'TO BE FAIR',ring:[560,1250,1000],d:7.4,ev:[.2,.6,2,4.2],f:u=>
  hl(u,'Always ','watch it') +
  `<div style="opacity:${P(u,.6,.5)}">`+sv(rohan(60,480,1.05,{prop:'phone',mood:u>4.2?'happy':'neutral',look:6}),0,0)+`</div>` +
  T(560,560,`<div style="font-size:46px;color:#034620;width:420px;line-height:1.25">Watch every reel before you post.</div>`,ap(u,2)) +
  term(560,800,440,260,[{t:'> Make the title bigger, and update the Skill.',at:4.4,p:false}],u,4.2,'claude') +
  T(560,1090,`<span class="hand" style="font-size:38px;color:${G6}">it remembers next time</span>`,ap(u,6.2))
});
// 13 truth
SC.push({kick:null,ring:[-300,150,1700],green:true,logo:false,d:3.5,ev:[.2,.5,1.4,2.2],f:u=>
  T(0,330,`<div style="width:1080px;text-align:center"><img src="logo-paper.png" style="height:330px"></div>`,ap(u,.2)) +
  `<div class="hl" style="left:0;width:1080px;top:800px;text-align:center;${ap(u,.5)}">Teach the edit once.</div>` +
  `<div class="hl" style="left:0;width:1080px;top:900px;text-align:center;${ap(u,1.4)}">Post <span class="mark">every day.</span></div>` +
  T(110,1150,`<div class="foot" style="width:860px;text-align:center;color:#b9d0c1">Illustrative times. Claude Code needs a paid Claude plan or API account. Commands as of Nov 2026; see code.claude.com/docs. Always review before posting.</div>`,ap(u,2.2))
});
