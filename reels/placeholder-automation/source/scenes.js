// ---------- Placeholder automation (silent, captions) ----------
const MR=(o)=>Object.assign({hair:'long'},o);
const MONO="'JetBrains Mono','DejaVu Sans Mono',monospace";
const CAP=(y,html,u,a,size=54)=>T(80,y,`<div style="width:920px;font-family:MS,MSX;font-weight:800;font-size:${size}px;line-height:1.15;color:#034620">${html}</div>`,ap(u,a));
const typ=(s,u,a,cps=40)=>{const n=Math.max(0,Math.floor((u-a)*cps));return n>=s.length?s:s.slice(0,n)+'<span style="opacity:.8">▍</span>'};
const PH=(t)=>`<span style="background:#e2b04a;border-radius:6px;padding:0 6px;font-family:${MONO};font-weight:700">{{${t}}}</span>`;
function doc(x,y,w,inner,u,a,rot){const p=P(u,a,.4);
  return T(x,y,`<div style="width:${w}px;box-sizing:border-box;background:#fff;border:4px solid #034620;padding:34px 36px;font-size:34px;line-height:1.55;color:#034620;box-shadow:10px 10px 0 rgba(3,70,32,.12);transform:rotate(${rot||0}deg)">${inner}</div>`,`opacity:${p};transform:translateY(${(1-p)*20}px)`);}
function win(x,y,w,title,inner,u,a,dark){const p=P(u,a,.4);
  return `<div class="ab" style="left:${x}px;top:${y}px;width:${w}px;opacity:${p};transform:translateY(${(1-p)*20}px);background:${dark?'#034620':'#fff'};border:4px solid #034620;border-radius:20px;overflow:hidden;box-shadow:0 10px 0 rgba(3,70,32,.12)"><div style="background:${dark?'#0b5a2e':'#dfe9e2'};padding:12px 18px;display:flex;gap:10px;align-items:center"><span style="width:14px;height:14px;border-radius:50%;background:#e2b04a"></span><span style="width:14px;height:14px;border-radius:50%;background:#9fbfab"></span><span class="lab" style="font-size:22px;color:${dark?'#b9d0c1':'#034620'};margin-left:10px">${title}</span></div><div style="padding:22px 26px">${inner}</div></div>`;}
function sheet(rows,u,a,hdr){return `<table style="border-collapse:collapse;width:100%;font-size:32px;color:#034620">${`<tr>${hdr.map(h=>`<th style="text-align:left;padding:10px 12px;background:#dfe9e2;border:2px solid #034620;font-family:MS,MSX;font-weight:800;font-size:26px">${h}</th>`).join('')}</tr>`}${rows.map((r,i)=>`<tr style="opacity:${P(u,a+i*.3,.25)}">${r.map(c=>`<td style="padding:10px 12px;border:2px solid #9fbfab">${c}</td>`).join('')}</tr>`).join('')}</table>`;}
function files(u,a,names,cols){let h='';names.forEach((n,i)=>{const p=P(u,a+i*.12,.2);h+=`<div style="display:flex;flex-direction:column;align-items:center;width:200px;opacity:${p};transform:scale(${.7+.3*p})"><svg width="80" height="96" viewBox="0 0 80 96"><path d="M6,4 H52 L74,26 V92 H6 Z" fill="#fff" stroke="#034620" stroke-width="5"/><path d="M52,4 V26 H74" fill="none" stroke="#034620" stroke-width="5"/><path d="M18,48 H60 M18,62 H54 M18,76 H46" stroke="#9fbfab" stroke-width="5"/></svg><span style="font-size:22px;color:#034620;text-align:center;margin-top:4px">${n}</span></div>`;});
  return `<div style="display:flex;flex-wrap:wrap;gap:14px 18px;width:${cols*218}px">${h}</div>`;}
function stack(x,y,n,u,a){let g='';for(let i=0;i<n;i++){const p=P(u,a+i*.05,.2);g+=`<g transform="translate(${(i%2?8:-8)+Math.sin(i)*6},${-i*16}) rotate(${Math.sin(i*2.1)*4} 110 70)" style="opacity:${p}"><rect width="220" height="150" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M20,34 H150 M20,62 H180 M20,90 H120" stroke="#9fbfab" stroke-width="7"/></g>`;}
  return sv(`<g filter="url(#pencil)" transform="translate(${x},${y})">${g}</g>`);}

// 1 hook
SC.push({kick:'ACCREVISE EXPLAINS',ring:[520,700,1100],d:5,f:u=>
  `<div class="hl" style="${ap(u,.2)}">Editing names on the</div>` +
  `<div class="hl" style="top:372px;${ap(u,.6)}"><span class="mark loss">same file, again?</span></div>` +
  T(80,500,`<div style="font-family:MS,MSX;font-weight:800;font-size:54px;color:#034620;opacity:${P(u,2.4,.4)};transform:translateY(${(1-P(u,2.4,.4))*20}px)">Automate it. <span class="mark">No coding needed.</span></div>`) +
  sv(rohan(60,700,1.3,MR({prop:'laptop',mood:u>2.6?'happy':'worried',sweat:u<2.6}))) + stack(660,1180,10,u,.6)
});
// 2 meera's monthly grind
SC.push({kick:'MEET MEERA',ring:[-500,1100,1000],d:6,f:u=>{
  const n=Math.min(40,Math.round(clamp((u-1.2)/3)*40));
  return hl(u,'40 clients. ','Same letter.') +
   doc(80,480,560,`Dear <b style="color:${LOSS}">Sharma ji</b>,<br>Your fees for <b style="color:${LOSS}">November</b> are <b style="color:${LOSS}">₹12,000</b>.<br>Regards, Meera`,u,.6,-2) +
   T(680,500,`<div style="width:320px;font-family:MS,MSX;font-weight:800;font-size:110px;color:${LOSS};line-height:1">${n}<span style="font-size:44px">/40</span></div><div class="lab" style="font-size:24px;color:#034620;margin-top:8px">EDITED BY HAND</div>`,ap(u,1.2)) +
   CAP(960,`Open. Change name, month, amount. Save. <span class="mark loss">40 times.</span>`,u,2.4,46) +
   `<div style="opacity:${P(u,1,.5)}">`+sv(rohan(340,1140,.6,MR({mood:'worried',scratch:true,sweat:u>3})))+`</div>`;
}});
// 3 the idea: placeholder
SC.push({kick:'THE IDEA',ring:[600,1250,900],d:6,f:u=>
  hl(u,'It’s called a ','placeholder') +
  doc(80,490,920,`Dear ${PH('Name')},<br>Your fees for ${PH('Month')} are ${PH('Amount')}.<br>Regards, Meera`,u,.6) +
  CAP(860,`Write the letter <span class="mark">once</span>. Leave blanks in <span style="font-family:${MONO}">{{ }}</span>.`,u,2,48) +
  T(80,1010,`<div style="font-size:36px;color:#3f5e4b;width:920px">Save it as <b>template.docx</b></div>`,ap(u,3))
});
// 4 the list
SC.push({kick:'THE LIST',ring:[640,-300,800],d:5.4,f:u=>
  hl(u,'One row per ','client') +
  win(80,490,920,'clients.xlsx',sheet([['Sharma ji','November','₹12,000'],['Mehta Steel','November','₹8,500'],['Rao & Co','November','₹15,000'],['…37 more','','']],u,1,['Name','Month','Amount']),u,.6) +
  CAP(960,`Column names = <span class="mark">placeholder names.</span>`,u,2.6,48)
});
// 5 ask claude
SC.push({kick:'STEP 1 · ASK CLAUDE',ring:[-400,1300,900],d:8,f:u=>
  hl(u,'Ask for the ','code') +
  win(80,480,920,'CLAUDE · YOU TYPE',`<div style="font-family:${MONO};font-size:29px;line-height:1.45;color:#f7f5ef;white-space:pre-wrap">${typ('Write a Python script that fills template.docx using clients.xlsx. Replace {{Name}}, {{Month}} and {{Amount}} for each row, and save one file per client in a folder called Letters.\n\nI’m not a coder: explain step by step how to run it on Windows.',u,.8,42)}</div>`,u,.4,true) +
  T(80,1180,`<div class="foot" style="font-size:26px;width:920px">You share only the column names, not your client data.</div>`,ap(u,6))
});
// 6 claude replies
SC.push({kick:'STEP 1 · ASK CLAUDE',ring:[600,1300,1000],d:6,f:u=>
  hl(u,'Claude writes it ','for you') +
  win(80,480,920,'CLAUDE · REPLY',`<div style="font-size:30px;color:#034620;margin-bottom:14px">Here’s your script. Save it as <b>make_letters.py</b>:</div><div style="background:#034620;border-radius:14px;padding:18px 22px;font-family:${MONO};font-size:25px;line-height:1.5;color:#f7f5ef;white-space:pre">${['from docx import Document','import openpyxl, os','','rows = openpyxl.load_workbook(','    "clients.xlsx").active','for row in rows.iter_rows(...):','    doc = Document("template.docx")','    # replace {{Name}}, {{Month}}…','    doc.save(f"Letters/{name}.docx")'].map((l,i)=>`<div style="opacity:${P(u,.8+i*.25,.2)}">${l.replace(/</g,'&lt;')||'&nbsp;'}</div>`).join('')}</div><div style="font-size:28px;color:#3f5e4b;margin-top:14px;opacity:${P(u,3.6,.3)}">…plus step-by-step instructions to run it.</div>`,u,.4) +
  CAP(1170,`You don’t need to read it. <span class="mark">Just save it.</span>`,u,4.2,46)
});
// 7 run offline: set up
SC.push({kick:'STEP 2 · RUN IT OFFLINE',ring:[-450,-300,900],d:7,f:u=>
  hl(u,'One-time ','setup') +
  [['Install Python','Free, from python.org. Tick “Add Python to PATH”.'],['One folder, 3 files','template.docx · clients.xlsx · make_letters.py']].map(([t,s],i)=>T(80,490+i*250,`<div style="display:flex;gap:24px;align-items:flex-start;width:920px;background:#fff;border:4px solid #034620;border-radius:20px;padding:26px 30px;box-sizing:border-box"><span style="width:64px;height:64px;border-radius:50%;background:#034620;color:#f7f5ef;font-family:MS,MSX;font-weight:800;font-size:34px;display:flex;align-items:center;justify-content:center;flex:none">${i+1}</span><span><div style="font-family:MS,MSX;font-weight:800;font-size:40px;color:#034620">${t}</div><div style="font-size:32px;color:#3f5e4b;margin-top:6px;line-height:1.3">${s}</div></span></div>`,ap(u,.6+i*1.6))).join('') +
  T(80,1010,`<div style="width:920px">${files(u,3.6,['template.docx','clients.xlsx','make_letters.py'],4)}</div>`)
});
// 8 run: two commands
SC.push({kick:'STEP 2 · RUN IT OFFLINE',ring:[600,1250,900],d:8,f:u=>
  hl(u,'Two ','commands') +
  T(80,470,`<div style="font-size:34px;color:#034620;width:920px;line-height:1.35">In the folder’s address bar, type <b style="font-family:${MONO}">cmd</b> and press Enter.</div>`,ap(u,.4)) +
  win(80,620,920,'COMMAND PROMPT',`<div style="font-family:${MONO};font-size:30px;line-height:1.6;color:#f7f5ef"><div style="color:#9fbfab;opacity:${P(u,1.4,.2)}"># first time only</div><div>${u>1.6?'<span style="color:#e2b04a">&gt; </span>'+typ('pip install python-docx openpyxl',u,1.6,30):''}</div><div style="color:#9fbfab;margin-top:12px;opacity:${P(u,3.4,.2)}"># every month</div><div>${u>3.6?'<span style="color:#e2b04a">&gt; </span>'+typ('python make_letters.py',u,3.6,24):''}</div><div style="color:#9fbfab;margin-top:12px;opacity:${P(u,5.2,.2)}">✓ 40 letters saved in Letters/</div></div>`,u,.8,true) +
  T(80,1150,`<div class="foot" style="font-size:24px;width:920px">On a Mac: open Terminal in the folder and use python3.</div>`,ap(u,6))
});
// 9 result
SC.push({kick:'THE RESULT',ring:[-400,1300,900],d:5.6,f:u=>
  hl(u,'40 letters in ','seconds') +
  win(80,480,920,'Letters/',files(u,.6,['Sharma ji.docx','Mehta Steel.docx','Rao & Co.docx','Gupta Traders.docx','Iyer Foods.docx','Khan Motors.docx','Patel Agro.docx','+33 more'],4),u,.4) +
  `<div style="opacity:${P(u,2.4,.5)}">`+sv(rohan(340,1000,.8,MR({mood:'cheer',jump:u>2.6&&u<4.4})))+`</div>`
});
// 10 privacy
SC.push({kick:'GOOD TO KNOW',ring:[600,1300,1000],d:5.6,f:u=>
  hl(u,'Your data stays ','with you') +
  T(80,500,`<div style="font-size:44px;color:#034620;line-height:1.5;width:920px"><div style="opacity:${P(u,.6,.3)}"><span style="color:${G6};font-family:MS,MSX;font-weight:800">✓</span> The script runs <b>on your computer</b>, offline.</div><div style="opacity:${P(u,1.8,.3)};margin-top:18px"><span style="color:${G6};font-family:MS,MSX;font-weight:800">✓</span> Claude only needs your <b>column names</b>, not your client list.</div><div style="opacity:${P(u,3,.3)};margin-top:18px"><span style="color:${G6};font-family:MS,MSX;font-weight:800">✓</span> Check the first few letters before sending.</div></div>`)
});
// 11 not a coder
SC.push({kick:'THE POINT',ring:[350,500,1300],green:true,d:4.6,f:u=>
  `<div class="hl" style="top:740px;text-align:center;${ap(u,.2)}">You didn’t write code.</div><div class="hl" style="top:850px;text-align:center;${ap(u,1.2)}">You <span class="mark">asked clearly.</span></div>`
});
// 12 CTA
SC.push({kick:null,ring:[-300,150,1700],green:true,logo:false,d:5,f:u=>
  T(0,330,`<div style="width:1080px;text-align:center"><img src="logo-paper.png" style="height:330px"></div>`,ap(u,.2)) +
  `<div class="hl" style="left:0;width:1080px;top:780px;text-align:center;font-size:62px;${ap(u,.5)}">Want the full guide + prompt?</div>` +
  `<div class="hl" style="left:0;width:1080px;top:880px;text-align:center;${ap(u,1.2)}">Comment <span class="mark">TEMPLATE</span></div>` +
  T(110,1100,`<div class="foot" style="width:860px;text-align:center;color:#b9d0c1">Example names and amounts are illustrative. Always check generated files before sending.</div>`,ap(u,2.2))
});
