// ---------- Instagram glimpse (10 beats) ----------
SC.push({kick:'ACCREVISE EXPLAINS',ring:[520,700,1100],d:3.4,ev:[.2,.6,2.4],f:u=>
  `<div class="hl" style="${ap(u,.2)}">Not a <span class="mark loss">techie?</span></div>` +
  `<div class="hl" style="top:372px;font-size:60px;${ap(u,.9)}">Good. You don’t need to be.</div>` +
  T(80,480,`<div style="font-family:MS,MSX;font-weight:800;font-size:56px;color:#034620;opacity:${P(u,2.4,.4)};transform:translateY(${(1-P(u,2.4,.4))*20}px)">Just <span class="mark">ask better questions.</span></div>`) +
  sv(rohan(150,620,1.5,GJ({mood:u>2.6?'happy':'worried',crossed:u<2.6})),0,0)
});
SC.push({kick:'MEET GUPTA JI',ring:[-500,1100,1000],d:3.4,ev:[.2,.6,1.2,1.8],f:u=>
  hl(u,'Forgotten ','follow-ups','',' loss') +
  `<div style="opacity:${P(u,.3,.5)}">`+sv(rohan(-10,600,.95,GJ({mood:'worried',scratch:true,sweat:true})),0,0)+`</div>` +
  sticky(560,480,'Reply to Sharma ✗',-4,u,.6) + sticky(590,640,'Payment reminder ✗',3,u,1.2,'#f3d7cc') + sticky(560,800,'Supplier PO ✗',-2,u,1.8)
});
SC.push({kick:'THE FIX',ring:[600,1250,900],d:2.6,ev:[.2,.8],f:u=>
  hl(u,'10 minutes. ','No code.') +
  sv(`<g filter="url(#pencil)" style="opacity:${P(u,.6,.4)}"><circle cx="540" cy="860" r="250" fill="#fff" stroke="${INK}" stroke-width="8"/><path d="M540,860 L540,680" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M540,860 L${540+Math.cos((-90+P(u,.8,1.4)*60)*Math.PI/180)*170},${860+Math.sin((-90+P(u,.8,1.4)*60)*Math.PI/180)*170}" stroke="${LOSS}" stroke-width="12" stroke-linecap="round"/><circle cx="540" cy="860" r="18" fill="${INK}"/></g>`)
});
SC.push({kick:'STEP 1',ring:[640,-300,800],d:3,ev:[.2,.6,1.6],f:u=>
  hl(u,'Connect ','Gmail') +
  win(80,480,920,'SETTINGS → CONNECTORS',connRow('Gmail','G',P(u,1.6,.4))+connRow('Google Drive','D',0)+connRow('Calendar','C',0),u,.6) +
  `<div style="opacity:${P(u,1.8,.5)}">`+sv(rohan(340,1000,.75,GJ({prop:'laptop',mood:'happy'})),0,0)+`</div>`
});
SC.push({kick:'STEP 2',ring:[-400,1300,900],d:3.4,ev:[.2,.6,1.4,2.2],f:u=>
  hl(u,'Schedule a ','task') +
  win(80,480,920,'CLAUDE · SCHEDULED',`<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:36px;color:#034620">Scheduled tasks</span><span style="font-family:MS,MSX;font-weight:800;font-size:30px;background:${u>1.4?'#e2b04a':'#034620'};color:${u>1.4?'#034620':'#fff'};padding:12px 20px;border-radius:12px">+ New task</span></div><div style="margin-top:22px;border:3px dashed #9fbfab;border-radius:14px;padding:18px 20px;font-size:32px;color:#034620;opacity:${P(u,2.2,.3)}">✨ <b>Create with Claude</b></div>`,u,.6)
});
SC.push({kick:'JUST DESCRIBE IT',ring:[600,1300,1000],d:4,ev:[.2,.6],f:u=>
  hl(u,'Plain ','words') +
  promptCard(80,480,920,'Every weekday at 9 AM, check mails from my 3 clients. If anyone is waiting on me, draft a reply.',u,.4,32)
});
SC.push({kick:'STEP 3',ring:[-450,-300,900],d:5.2,ev:[.2,.6,1.4,3.4],f:u=>{
  const sel=u<3.2?1:0;
  return hl(u,'How much ','trust?') +
   win(80,480,920,'GMAIL · SEND EMAIL',perm(sel),u,.6) +
   T(80,700,`<div style="font-size:40px;color:#034620;line-height:1.35;width:920px">${sel==1?'<b>Needs approval:</b> Claude drafts, <span class="mark" style="font-family:MS,MSX;font-weight:800">you review</span> and send.':'<b>Always allow:</b> Claude <span class="mark" style="font-family:MS,MSX;font-weight:800">sends on its own.</span>'}</div>`,ap(u,1.4));
}});
SC.push({kick:'EVERY MORNING',ring:[560,1250,1000],d:3.6,ev:[.2,.6,2.4],f:u=>
  hl(u,'Drafts, ','ready') +
  win(80,480,920,'GMAIL · 9:00 AM',inboxRow('Sharma Traders','Re: Delivery date?',u>2.4?'sent':'draft')+inboxRow('Mehta Steel','Payment reminder',u>2.7?'sent':'draft')+inboxRow('Rao Enterprises','Re: Quote for 200 pcs',u>3?'sent':'draft'),u,.6)
});
SC.push({kick:'THE RESULT',ring:[-500,1350,900],d:3,ev:[.2,.6,1.4],f:u=>
  hl(u,'No missed ','follow-ups') +
  T(80,500,`<div style="font-size:46px;color:#034620;line-height:1.6"><div style="opacity:${P(u,.6,.3)}">${RULE_DONE('Every weekday, 9 AM')}</div><div style="opacity:${P(u,1,.3)}">${RULE_DONE('Even when he forgets')}</div></div>`) +
  `<div style="opacity:${P(u,1.4,.5)}">`+sv(rohan(340,820,.85,GJ({mood:'cheer',jump:u>1.6&&u<3})),0,0)+`</div>`
});
SC.push({kick:null,ring:[-300,150,1700],green:true,logo:false,d:3,ev:[.2,.5,1.4,2.2],f:u=>
  T(0,330,`<div style="width:1080px;text-align:center"><img src="logo-paper.png" style="height:330px"></div>`,ap(u,.2)) +
  `<div class="hl" style="left:0;width:1080px;top:800px;text-align:center;${ap(u,.5)}">You don’t need to code.</div>` +
  `<div class="hl" style="left:0;width:1080px;top:900px;text-align:center;${ap(u,1.2)}">Just <span class="mark">ask clearly.</span></div>` +
  T(110,1100,`<div style="width:860px;text-align:center;font-family:MS,MSX;font-weight:700;font-size:34px;color:#e2b04a">Full step-by-step guide on our YouTube ▶</div>`,ap(u,2.2))
});
