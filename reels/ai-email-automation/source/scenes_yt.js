// ---------- YouTube full version (23 beats) ----------
// 1 hook
SC.push({kick:'ACCREVISE EXPLAINS',ring:[520,700,1100],d:3.4,ev:[.2,.6,2.4],f:u=>
  `<div class="hl" style="${ap(u,.2)}">Not a <span class="mark loss">techie?</span></div>` +
  `<div class="hl" style="top:372px;font-size:60px;${ap(u,.9)}">Good. You don’t need to be.</div>` +
  T(80,480,`<div style="font-family:MS,MSX;font-weight:800;font-size:56px;color:#034620;opacity:${P(u,2.4,.4)};transform:translateY(${(1-P(u,2.4,.4))*20}px)">Just <span class="mark">ask better questions.</span></div>`) +
  sv(rohan(150,620,1.5,GJ({mood:u>2.6?'happy':'worried',crossed:u<2.6})),0,0)
});
// 2 what we'll build
SC.push({kick:'TODAY',ring:[-500,1100,1000],d:3,ev:[.2,.6,1.4],f:u=>
  hl(u,'A daily email ','assistant') +
  win(80,480,920,'WHAT IT DOES',`<div style="font-size:40px;color:#034620;line-height:1.6"><div>${RULE_DONE('Checks your inbox on a schedule')}</div><div style="opacity:${P(u,1,.3)}">${RULE_DONE('Drafts follow-ups and replies')}</div><div style="opacity:${P(u,1.4,.3)}">${RULE_DONE('Sends, if you allow it')}</div><div style="opacity:${P(u,1.8,.3)}">${RULE_DONE('<b>No code</b>')}</div></div>`,u,.6)
});
// 3 meet gupta ji
SC.push({kick:'MEET GUPTA JI',ring:[600,1250,900],d:3.4,ev:[.2,.6,1.2,1.8],f:u=>
  hl(u,'Forgotten ','follow-ups','',' loss') +
  `<div style="opacity:${P(u,.3,.5)}">`+sv(rohan(-10,600,.95,GJ({mood:'worried',scratch:true,sweat:true})),0,0)+`</div>` +
  sticky(560,480,'Reply to Sharma ✗',-4,u,.6) + sticky(590,640,'Payment reminder ✗',3,u,1.2,'#f3d7cc') + sticky(560,800,'Supplier PO ✗',-2,u,1.8)
});
// 4 meet meera
SC.push({kick:'MEET MEERA, HIS ACCOUNTANT',ring:[640,-300,800],d:3.4,ev:[.2,.6,1.2],f:u=>
  hl(u,'12 clients. ','One by one.') +
  `<div style="opacity:${P(u,.3,.5)}">`+sv(rohan(-10,1000,.85,MR({prop:'laptop',mood:'worried',sweat:u>2.4})),0,0)+`</div>` +
  envelopes(u,.6,12,false) +
  T(560,1080,`<div style="font-size:40px;color:#034620;width:440px;line-height:1.25">Invoices + reconciliations, <b>every month</b>.</div>`,ap(u,2))
});
// 5 what you need
SC.push({kick:'WHAT YOU NEED',ring:[-400,1300,900],d:3,ev:[.2,.6,1.2,1.8],f:u=>
  hl(u,'Just ','3 things') +
  [['A paid Claude plan',.6],['The Claude desktop app',1.2],['Your Gmail (+ Google Drive)',1.8]].map(([t,a],i)=>T(80,490+i*170,`<div style="display:flex;gap:24px;align-items:center;width:920px;background:#fff;border:4px solid #034620;border-radius:20px;padding:26px 30px;box-sizing:border-box"><span style="width:64px;height:64px;border-radius:50%;background:#034620;color:#f7f5ef;font-family:MS,MSX;font-weight:800;font-size:34px;display:flex;align-items:center;justify-content:center;flex:none">${i+1}</span><span style="font-size:42px;color:#034620">${t}</span></div>`,ap(u,a))).join('')
});
// 6 step 1 connectors
SC.push({kick:'STEP 1',ring:[600,1300,1000],d:3.4,ev:[.2,.6,1.6,2.4],f:u=>
  hl(u,'Connect ','Gmail + Drive') +
  win(80,480,920,'SETTINGS → CONNECTORS',connRow('Gmail','G',P(u,1.6,.4))+connRow('Google Drive','D',P(u,2.4,.4))+connRow('Calendar','C',0),u,.6) +
  T(80,960,`<div class="foot" style="font-size:26px;width:920px">Sign in with Google and allow access.</div>`,ap(u,2.6))
});
// 7 step 2 scheduled
SC.push({kick:'STEP 2',ring:[-450,-300,900],d:3.4,ev:[.2,.6,1.4,2.2],f:u=>
  hl(u,'Schedule a ','task') +
  win(80,480,920,'CLAUDE APP · SCHEDULED',`<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:36px;color:#034620">Scheduled tasks</span><span style="font-family:MS,MSX;font-weight:800;font-size:30px;background:${u>1.4?'#e2b04a':'#034620'};color:${u>1.4?'#034620':'#fff'};padding:12px 20px;border-radius:12px">+ New task</span></div><div style="margin-top:22px;border:3px dashed #9fbfab;border-radius:14px;padding:18px 20px;font-size:32px;color:#034620;opacity:${P(u,2.2,.3)}">✨ <b>Create with Claude</b></div>`,u,.6) +
  T(80,860,`<div class="foot" style="font-size:26px;width:920px">Sidebar → Scheduled → New task → Create with Claude</div>`,ap(u,2.4))
});
// 8 step 3 intro
SC.push({kick:'STEP 3',ring:[560,1250,1000],d:3,ev:[.2,.6],f:u=>
  hl(u,'Ask better ','questions') +
  `<div style="opacity:${P(u,.4,.5)}">`+sv(rohan(150,560,1.3,GJ({mood:'neutral',look:6})),0,0)+`</div>`
});
// 9 vague request
SC.push({kick:'DON’T',ring:[-500,1350,900],d:3,ev:[.2,.6,1.6],f:u=>
  hl(u,'Vague in, ','vague out','',' loss') +
  T(80,500,`<div style="background:#dfe9e2;border:3px solid #034620;border-radius:22px 22px 22px 4px;padding:22px 28px;font-size:46px;color:#034620;display:inline-block;position:relative">“Remind me about emails.”<span style="position:absolute;right:-30px;top:-40px;font-family:MS,MSX;font-weight:800;font-size:110px;color:${LOSS};opacity:${P(u,1.2,.3)}">✗</span></div>`,ap(u,.6)) +
  CAP(760,`Which emails? When? Then what?`,u,1.6,52)
});
// 10 the formula
SC.push({kick:'DO',ring:[600,1250,900],d:4.4,ev:[.2,.6,1.4,2.2,3],f:u=>
  hl(u,'Who, what, ','when, how') +
  card4(u,.6,[['WHO','The exact email addresses'],['WHAT','Follow up, reply or update'],['WHEN','Every weekday at 9 AM'],['HOW','Short, polite. Wait for my approval.']])
});
// 11 gupta's prompt
SC.push({kick:'GUPTA JI’S REQUEST',ring:[640,-300,800],d:5.4,ev:[.2,.6],f:u=>
  hl(u,'Written just ','like that') +
  promptCard(80,480,920,'Every weekday at 9 AM, check my Gmail for unanswered mails from sharma@example.com, mehta@example.com and rao@example.com. Draft a short, polite reply or follow-up for each. Wait for my approval before sending.',u,.4,48)
});
// 12 claude confirms
SC.push({kick:'CLAUDE CONFIRMS',ring:[-400,1300,900],d:3.4,ev:[.2,.6,1.4,2.4],f:u=>
  hl(u,'Approve, and it’s ','scheduled') +
  T(80,480,`<div style="background:#dfe9e2;border:3px solid #034620;border-radius:22px 22px 22px 4px;padding:18px 24px;font-size:36px;color:#034620;width:640px;box-sizing:border-box">Only mails from this week, or older ones too?</div>`,ap(u,.6)) +
  T(360,640,`<div style="background:#f6e2b4;border:3px solid #034620;border-radius:22px 22px 4px 22px;padding:18px 24px;font-size:36px;color:#034620;width:640px;box-sizing:border-box">Only this week.</div>`,ap(u,1.4)) +
  win(80,800,920,'NEW SCHEDULED TASK',`<div style="font-size:38px;color:#034620"><b>Daily client follow-ups</b></div><div style="font-size:32px;color:#3f5e4b;margin-top:8px">Weekdays · 9:00 AM</div><div class="lab" style="font-size:24px;color:${G6};margin-top:14px">✓ SCHEDULED</div>`,u,2.4)
});
// 13 step 4 intro
SC.push({kick:'STEP 4',ring:[600,1300,1000],d:2.6,ev:[.2,.6],f:u=>
  hl(u,'How much can it ','do alone?') +
  win(80,480,920,'GMAIL CONNECTOR · SEND EMAIL',perm(-1),u,.6)
});
// 14 needs approval
SC.push({kick:'OPTION A',ring:[-450,-300,900],d:3.6,ev:[.2,.6,1.4,2,2.6],f:u=>
  hl(u,'Needs ','approval') +
  win(80,480,920,'GMAIL CONNECTOR · SEND EMAIL',perm(1),u,.4) +
  ['Claude drafts','You review','You hit send'].map((t,i)=>T(80+i*310,720,`<div style="width:290px;box-sizing:border-box;background:#dfe9e2;border:4px solid #034620;border-radius:18px;padding:22px 18px;text-align:center;font-family:MS,MSX;font-weight:800;font-size:34px;color:#034620">${t}</div>`,ap(u,1.4+i*.6))).join('')
});
// 15 always allow
SC.push({kick:'OPTION B',ring:[560,1250,1000],d:3.6,ev:[.2,.6,1.4,2.6],f:u=>
  hl(u,'Always ','allow') +
  win(80,480,920,'GMAIL CONNECTOR · SEND EMAIL',perm(0),u,.4) +
  CAP(720,`Claude <span class="mark">sends on its own.</span>`,u,1.4,52) +
  T(80,880,`<div class="foot" style="font-size:28px;width:920px">On Team / Enterprise plans, your admin may need to allow this.</div>`,ap(u,2.6))
});
// 16 tip
SC.push({kick:'OUR TIP',ring:[-500,1350,900],d:3.6,ev:[.2,.6,2],f:u=>
  hl(u,'Start with ','approval') +
  T(80,500,`<div style="width:920px;background:#fff;border:4px solid #034620;border-radius:20px;padding:28px 32px;box-sizing:border-box"><div style="font-size:40px;color:#034620;line-height:1.35">Go automatic only for mails that are <b>the same every time</b>:</div><div style="margin-top:20px;background:#f6e2b4;border-radius:14px;padding:18px 22px;font-size:36px;color:#034620;opacity:${P(u,2,.4)}">“Reminder: our office is closed on Sunday.”</div></div>`,ap(u,.6))
});
// 17 meera's drive
SC.push({kick:'MEERA’S VERSION',ring:[600,1250,900],d:3.6,ev:[.2,.6,1.2,1.8,2.4,3],f:u=>{
  const rows=[[0,'📁 Clients/',.6],[1,'📁 Sharma Traders/',1.2],[2,'📄 Invoice_Nov.pdf',1.6],[2,'📄 Reconciliation_Nov.xlsx',2],[1,'📁 Mehta Steel/',2.4],[1,'📁 …10 more clients',3]];
  return hl(u,'One folder per ','client') +
   win(80,480,920,'GOOGLE DRIVE',rows.map(([d,t,a])=>`<div style="padding:10px 0 10px ${d*48}px;font-size:36px;color:#034620;opacity:${P(u,a,.3)}">${t}</div>`).join(''),u,.4);
}});
// 18 meera's prompt
SC.push({kick:'HER REQUEST',ring:[-400,1300,900],d:5.6,ev:[.2,.6],f:u=>
  hl(u,'On the 5th, ','every month') +
  promptCard(80,480,920,'On the 5th of every month, for each client folder in Drive › Clients, find the latest invoice and reconciliation and email the Drive links to that client with a short note. CC me. Wait for my approval.',u,.4,46)
});
// 19 links not attachments
SC.push({kick:'GOOD TO KNOW',ring:[600,1300,1000],d:3.6,ev:[.2,.6,1.4,2.4],f:u=>
  hl(u,'Links, not ','attachments') +
  win(80,480,920,'DRAFT · TO: SHARMA TRADERS',`<div style="font-size:34px;color:#034620;line-height:1.4">Dear Sharma ji, please find November’s documents:</div><div style="margin-top:16px;display:flex;gap:14px;flex-wrap:wrap"><span style="background:#dfe9e2;border:3px solid #034620;border-radius:12px;padding:10px 16px;font-size:30px">🔗 Invoice_Nov.pdf</span><span style="background:#dfe9e2;border:3px solid #034620;border-radius:12px;padding:10px 16px;font-size:30px">🔗 Reconciliation_Nov.xlsx</span></div>`,u,.6) +
  T(80,920,`<div style="width:920px;background:#f3d7cc;border:4px solid ${LOSS};border-radius:18px;padding:22px 26px;box-sizing:border-box;font-size:36px;color:#034620"><b>Check sharing first:</b> the client must have access to the folder.</div>`,ap(u,2.4))
});
// 20 meera result
SC.push({kick:'THE RESULT',ring:[-450,-300,900],d:3.6,ev:[.2,.6,2.2],f:u=>
  hl(u,'12 emails, ','on time') + envelopes(u,.4,12,true) +
  `<div style="opacity:${P(u,2.2,.5)}">`+sv(rohan(340,1060,.7,MR({mood:'cheer',jump:u>2.4&&u<3.6})),0,0)+`</div>`
});
// 21 to be fair
SC.push({kick:'TO BE FAIR',ring:[560,1250,1000],d:3.4,ev:[.2,.6,1.6],f:u=>
  hl(u,'Stay in ','control') +
  T(80,500,`<div style="font-size:44px;color:#034620;line-height:1.5;width:920px"><div style="opacity:${P(u,.6,.3)}">${RULE_DONE('Watch the first few runs closely')}</div><div style="opacity:${P(u,1.6,.3)};margin-top:18px">${RULE_DONE('Never automate a mail you wouldn’t want sent by mistake')}</div></div>`)
});
// 22 payoff
SC.push({kick:'THE PAYOFF',ring:[-500,1350,900],d:2.6,ev:[.2,.6,1.4],f:u=>
  hl(u,'10 minutes of ','setup') +
  CAP(520,`Every follow-up, <span class="mark">on time.</span>`,u,1,64) +
  `<div style="opacity:${P(u,1.4,.5)}">`+sv(rohan(150,700,1.1,GJ({mood:'cheer',jump:u>1.6&&u<2.6})),0,0)+`</div>`
});
// 23 CTA
SC.push({kick:null,ring:[-300,150,1700],green:true,logo:false,d:3,ev:[.2,.5,1.4,2.2],f:u=>
  T(0,330,`<div style="width:1080px;text-align:center"><img src="logo-paper.png" style="height:330px"></div>`,ap(u,.2)) +
  `<div class="hl" style="left:0;width:1080px;top:800px;text-align:center;${ap(u,.5)}">You don’t need to code.</div>` +
  `<div class="hl" style="left:0;width:1080px;top:900px;text-align:center;${ap(u,1.2)}">Just <span class="mark">ask clearly.</span></div>` +
  T(110,1110,`<div class="foot" style="width:860px;text-align:center;color:#b9d0c1">Simplified screens for illustration; menu names may change. Check Claude’s help centre for your plan. Example email addresses are placeholders.</div>`,ap(u,2.2))
});
