// ===== 16:9 YouTube step-by-step guide (silent, captions on screen) =====
const RX=840, RW=1000; // right panel

// 0 title card (green)
SC.push({green:true,logo:false,ring:[1100,-300,1300],d:7,f:u=>
  T(90,90,`<img src="logo-paper.png" style="height:150px">`,ap(u,.1)) +
  T(90,330,`<div style="width:900px;font-family:MS,MSX;font-weight:800;font-size:84px;line-height:1.05;color:#f7f5ef">Not a <span class="mark loss">techie?</span><br>Set up an AI email assistant.</div>`,ap(u,.4)) +
  T(90,610,`<div style="font-family:MS,MSX;font-weight:700;font-size:38px;color:#e2b04a">Step-by-step · No code · About 10 minutes</div>`,ap(u,1.4)) +
  T(90,700,`<div style="font-size:32px;color:#f7f5ef;width:860px;line-height:1.4">You don’t need to be a techie. You just need to <b>ask better questions.</b></div>`,ap(u,2.2)) +
  `<div style="opacity:${P(u,1,.5)}">`+sv(rohan(1150,330,1.15,AR({mood:'happy',prop:'laptop'})))+`</div>`
});
// 1 meet aryan + meera
SC.push({ch:'INTRODUCTION',step:'WHO THIS IS FOR',title:'Meet Aryan and <span class="mark">Meera</span>',ring:[-400,700,900],d:9,f:u=>
  body(420,`<b>Aryan</b> runs a small shop and keeps forgetting follow-ups: client replies, payment reminders, supplier mails.`,u,.6) +
  body(640,`<b>Meera</b>, his accountant, emails invoices and reconciliations to <b>12 clients</b> every month, one by one.`,u,2.4) +
  `<div style="opacity:${P(u,.6,.5)}">`+sv(rohan(900,330,1.05,AR({mood:'worried',scratch:true})))+`</div>` +
  `<div style="opacity:${P(u,2.4,.5)}">`+sv(rohan(1380,330,1.05,MR({prop:'laptop',mood:'worried'})))+`</div>` +
  T(980,1000,`<span class="lab" style="font-size:24px">ARYAN</span>`,ap(u,.8)) + T(1470,1000,`<span class="lab" style="font-size:24px">MEERA</span>`,ap(u,2.6))
});
// 2 what you need
SC.push({ch:'BEFORE YOU START',step:'WHAT YOU NEED',title:'Just <span class="mark">3 things</span>',ring:[1300,700,900],d:7,f:u=>
  body(420,`Nothing to install except the Claude app. No code, no add-ons.`,u,.6) +
  [['A paid Claude plan','Scheduled tasks and connectors need one.'],['The Claude desktop app','Where scheduled tasks live.'],['Your Gmail','Plus Google Drive if you keep files there.']].map(([t,s],i)=>T(RX,200+i*250,`<div style="display:flex;gap:26px;align-items:center;width:${RW}px;background:#fff;border:4px solid #034620;border-radius:22px;padding:30px 34px;box-sizing:border-box"><span style="width:80px;height:80px;border-radius:50%;background:#034620;color:#f7f5ef;font-family:MS,MSX;font-weight:800;font-size:42px;display:flex;align-items:center;justify-content:center;flex:none">${i+1}</span><span><div style="font-family:MS,MSX;font-weight:800;font-size:40px">${t}</div><div style="font-size:28px;color:#3f5e4b;margin-top:6px">${s}</div></span></div>`,ap(u,1+i*.8))).join('')
});
// 3 step 1a settings -> connectors
SC.push({ch:'STEP 1 · CONNECT',step:'STEP 1',title:'Open <span class="mark">Connectors</span>',d:8,f:u=>
  body(420,`In Claude, click <b>Settings</b>, then open <b>Connectors</b>.`,u,.6) +
  body(560,`<span class="foot" style="font-size:24px">Connectors let Claude use your apps, like Gmail and Drive.</span>`,u,1.4) +
  app(RX,170,RW,760,'Settings',`<div style="display:flex;gap:28px"><div style="width:230px">${['General','Account','Privacy','Connectors','Billing'].map(s=>`<div style="padding:14px 16px;border-radius:10px;font-size:26px;font-family:MS,MSX;font-weight:700;${s==='Connectors'&&u>2.4?'background:#e2b04a;color:#034620':'color:#3f5e4b'};${OUT(s==='Connectors'&&u>2&&u<3.4)}">${s}${TAG(s==='Connectors'&&u>2&&u<3.4,'Click')}</div>`).join('')}</div><div style="flex:1;font-size:28px;color:#3f5e4b;padding-top:14px">${u>2.4?'<b style="color:#034620;font-family:MS,MSX">Connectors</b><br>Connect Claude to the apps you use.':'<b style="color:#034620;font-family:MS,MSX">General</b><br>Your name, language and theme.'}</div></div>`,u,.4,{side:u>1.2&&u<2.2?'Settings':null})
});
// 4 step 1b connect gmail
SC.push({ch:'STEP 1 · CONNECT',step:'STEP 1',title:'Connect <span class="mark">Gmail</span>',d:9,f:u=>{
  const on=P(u,5,.4);
  return body(420,`Find <b>Gmail</b> and click <b>Connect</b>.`,u,.6) +
   body(520,`Sign in with Google and <b>allow access</b>. The switch turns green.`,u,2.4) +
   app(RX,170,RW,760,'Settings',`<div style="font-family:MS,MSX;font-weight:800;font-size:32px;margin-bottom:10px">Connectors</div>${connRow('Gmail','G',on,'Read, draft and send email',u>1.2&&u<5)}${connRow('Google Drive','D',0,'Find and share files')}${connRow('Google Calendar','C',0,'See your schedule')}`,u,.4)+
   (u>2.6&&u<5?T(RX+260,420,`<div style="width:520px;background:#fff;border:4px solid #034620;border-radius:18px;padding:26px 28px;box-shadow:0 16px 0 rgba(3,70,32,.18)"><div class="lab" style="font-size:20px;color:#3f5e4b">SIGN IN WITH GOOGLE</div><div style="font-size:28px;margin-top:12px;color:#034620">Claude wants to access your Gmail</div><div style="display:flex;justify-content:flex-end;gap:14px;margin-top:22px"><span style="padding:10px 18px;border:3px solid #034620;border-radius:10px;font-size:24px">Cancel</span><span style="padding:10px 18px;background:#034620;color:#fff;border-radius:10px;font-size:24px;font-family:MS,MSX;font-weight:800">Allow</span></div></div>`,`opacity:${P(u,2.6,.3)}`):'');
}});
// 5 step 1c drive
SC.push({ch:'STEP 1 · CONNECT',step:'STEP 1 · OPTIONAL',title:'Connect <span class="mark">Google Drive</span>',d:7,f:u=>
  body(420,`Keep invoices or reports in Drive? Connect it the same way.`,u,.6) +
  body(560,`Meera needs this for her monthly emails.`,u,1.6) +
  app(RX,170,RW,760,'Settings',`<div style="font-family:MS,MSX;font-weight:800;font-size:32px;margin-bottom:10px">Connectors</div>${connRow('Gmail','G',1,'Read, draft and send email')}${connRow('Google Drive','D',P(u,2.6,.4),'Find and share files',u>1.6&&u<3)}${connRow('Google Calendar','C',0,'See your schedule')}`,u,.4)
});
// 6 step 2a scheduled
SC.push({ch:'STEP 2 · SCHEDULE',step:'STEP 2',title:'Open <span class="mark">Scheduled</span>',d:7,f:u=>
  body(420,`In the <b>Claude desktop app</b>, click <b>Scheduled</b> in the left sidebar.`,u,.6) +
  app(RX,170,RW,760,u>2?'Scheduled':'New chat',u>2?`<div style="font-family:MS,MSX;font-weight:800;font-size:34px">Scheduled tasks</div><div style="font-size:26px;color:#7f8f80;margin-top:14px">No scheduled tasks yet.</div>`:`<div style="font-size:30px;color:#7f8f80;margin-top:200px;text-align:center">How can I help you today?</div>`,u,.4,{side:u>1.2&&u<2.8?'Scheduled':null})
});
// 7 step 2b new task
SC.push({ch:'STEP 2 · SCHEDULE',step:'STEP 2',title:'New task → <span class="mark">Create with Claude</span>',d:8,f:u=>
  body(470,`Click <b>New task</b>, then choose <b>Create with Claude</b>.`,u,.6) +
  body(600,`<span class="foot" style="font-size:24px">Tip: you can also type /schedule in a chat.</span>`,u,2.4) +
  app(RX,170,RW,760,'Scheduled',`<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-family:MS,MSX;font-weight:800;font-size:34px">Scheduled tasks</span><span style="font-family:MS,MSX;font-weight:800;font-size:26px;background:#034620;color:#fff;padding:12px 20px;border-radius:12px;${OUT(u>1&&u<2.2)}">+ New task</span></div>${u>2?`<div style="margin-top:26px;border:3px solid #034620;border-radius:14px;overflow:hidden;width:420px;margin-left:auto"><div style="padding:16px 20px;font-size:26px;background:#f6e2b4;${u>2.6?`box-shadow:inset 0 0 0 6px ${LOSS}`:''}"><b>✨ Create with Claude</b>${TAG(u>2.6,'Click')}</div><div style="padding:16px 20px;font-size:26px;color:#3f5e4b;border-top:2px solid #dfe9e2">Create manually</div></div>`:''}`,u,.4)
});
// 8 step 3a better questions: vague
SC.push({ch:'STEP 3 · DESCRIBE',step:'STEP 3',title:'Ask <span class="mark">better questions</span>',d:7,f:u=>
  body(470,`A vague request gets a vague result.`,u,.6) +
  body(560,`Claude can’t guess <b>which</b> emails, <b>when</b>, or <b>what</b> to do with them.`,u,1.6) +
  T(RX,300,`<div style="background:#dfe9e2;border:4px solid #034620;border-radius:26px 26px 26px 6px;padding:30px 36px;font-size:48px;color:#034620;display:inline-block;position:relative">“Remind me about emails.”<span style="position:absolute;right:-40px;top:-60px;font-family:MS,MSX;font-weight:800;font-size:150px;color:${LOSS};opacity:${P(u,1.2,.3)}">✗</span></div>`,ap(u,.4)) +
  `<div style="opacity:${P(u,2,.5)}">`+sv(rohan(1180,520,1.0,AR({mood:'neutral',look:6})))+`</div>`
});
// 9 step 3b formula
SC.push({ch:'STEP 3 · DESCRIBE',step:'STEP 3',title:'Who, what, <span class="mark">when, how</span>',d:9,f:u=>
  body(470,`Answer these four in one message. That’s all “prompting” is.`,u,.6) +
  [['WHO','The exact email addresses'],['WHAT','Follow up, reply or send an update'],['WHEN','e.g. every weekday at 9 AM'],['HOW','Tone, and “wait for my approval”']].map(([t,s],i)=>T(RX+(i%2)*510,190+Math.floor(i/2)*380,`<div style="width:490px;height:350px;box-sizing:border-box;background:${['#dfe9e2','#f6e2b4','#f6e2b4','#dfe9e2'][i]};border:4px solid #034620;border-radius:22px;padding:30px 32px"><div style="font-family:MS,MSX;font-weight:800;font-size:62px">${t}</div><div style="font-size:36px;margin-top:18px;line-height:1.3">${s}</div></div>`,ap(u,1+i*1))).join('')
});
// 10 step 3c aryan's prompt
SC.push({ch:'STEP 3 · DESCRIBE',step:'STEP 3',title:'Aryan’s <span class="mark">request</span>',d:11,f:u=>
  body(420,`He types it in plain words. No special format.`,u,.6) +
  body(560,`<span class="foot" style="font-size:24px">Example addresses are placeholders.</span>`,u,1) +
  app(RX,170,RW,760,'Scheduled',`<div style="font-family:MS,MSX;font-weight:800;font-size:28px;margin-bottom:14px">Create with Claude</div>${promptBox('Every weekday at 9 AM, check my Gmail for unanswered mails from sharma@example.com, mehta@example.com and rao@example.com.\n\nDraft a short, polite reply or follow-up for each.\n\nWait for my approval before sending.',u,1,32)}`,u,.4)
});
// 11 step 3d confirm
SC.push({ch:'STEP 3 · DESCRIBE',step:'STEP 3',title:'Claude checks, you <span class="mark">approve</span>',d:10,f:u=>
  body(420,`Claude may ask a quick question, then shows the task: name, schedule and instructions.`,u,.6) +
  body(640,`Check it, then save. It now runs on its own.`,u,4.4) +
  app(RX,170,RW,760,'Scheduled',bubble('Should I include older unanswered mails, or only this week’s?','l',u,1)+bubble('Only this week.','r',u,2.2)+`<div style="margin-top:18px;border:4px solid #034620;border-radius:16px;padding:20px 24px;opacity:${P(u,3.2,.4)}"><div style="font-family:MS,MSX;font-weight:800;font-size:30px">Daily client follow-ups</div><div style="font-size:24px;color:#3f5e4b;margin-top:6px">⏰ Weekdays · 9:00 AM</div><div style="font-size:22px;color:#3f5e4b;margin-top:6px">Check unanswered mails from 3 clients · draft replies · wait for approval</div><div style="display:flex;justify-content:flex-end;margin-top:14px"><span style="font-family:MS,MSX;font-weight:800;font-size:24px;background:${u>4.4?G6:'#034620'};color:#fff;padding:10px 20px;border-radius:10px;${OUT(u>3.8&&u<4.4)}">${u>4.4?'✓ Scheduled':'Save task'}</span></div></div>`,u,.4)
});
// 12 step 4a permissions
SC.push({ch:'STEP 4 · CONTROL',step:'STEP 4',title:'How much can it <span class="mark">do alone?</span>',d:9,f:u=>
  body(470,`Back in <b>Settings → Connectors → Gmail</b>, each action has a permission.`,u,.6) +
  body(650,`Set <b>Send email</b> to the level you’re comfortable with.`,u,2.2) +
  app(RX,170,RW,760,'Settings',`<div style="font-family:MS,MSX;font-weight:800;font-size:32px;margin-bottom:16px">Gmail · tool permissions</div>${[['Search email',0],['Create draft',0],['Send email',u>3.6?1:-1]].map(([n,s])=>`<div style="display:flex;align-items:center;gap:18px;padding:14px 10px;border-bottom:2px dashed #dfe9e2;border-radius:10px;${OUT(n==='Send email'&&u>2.6)}"><span style="width:240px;font-size:28px">${n}</span><span style="flex:1">${perm(s)}</span></div>`).join('')}`,u,.4)
});
// 13 step 4b needs approval
SC.push({ch:'STEP 4 · CONTROL',step:'OPTION A · RECOMMENDED',title:'<span class="mark">Needs approval</span>',d:9,f:u=>
  body(470,`Claude drafts. You review. You press send.`,u,.6) +
  body(600,`Best for replies and anything that changes each time.`,u,1.6) +
  ['Claude drafts','You review','You send'].map((t,i)=>T(RX+i*340,250,`<div style="width:320px;box-sizing:border-box;background:#dfe9e2;border:4px solid #034620;border-radius:22px;padding:34px 18px;text-align:center;font-family:MS,MSX;font-weight:800;font-size:38px">${t}</div>`,ap(u,1.2+i*.8))).join('') +
  win(RX,520,RW,'GMAIL · 9:00 AM',['Sharma Traders · Re: Delivery date?','Mehta Steel · Payment reminder','Rao Enterprises · Re: Quote for 200 pcs'].map((r,i)=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:2px dashed #dfe9e2;font-size:28px"><span>${r}</span><span class="lab" style="font-size:18px;background:${u>5+i*.5?G6:'#e2b04a'};color:${u>5+i*.5?'#fff':'#034620'};padding:6px 12px;border-radius:8px">${u>5+i*.5?'SENT ✓':'DRAFT READY'}</span></div>`).join(''),u,3.4)
});
// 14 step 4c always allow
SC.push({ch:'STEP 4 · CONTROL',step:'OPTION B',title:'<span class="mark">Always allow</span>',d:9,f:u=>
  body(470,`Claude sends on its own, on schedule, even if you forget.`,u,.6) +
  body(600,`Use it only for mails that are <b>the same every time</b>, like a weekly reminder.`,u,1.8) +
  body(780,`<span class="foot" style="font-size:24px">On Team or Enterprise plans, an admin may need to allow this.</span>`,u,3.2) +
  win(RX,250,RW,'GMAIL · SEND EMAIL',perm(0),u,.6) +
  win(RX,460,RW,'SCHEDULED · EVERY FRIDAY 6 PM · SENT AUTOMATICALLY',`<div style="font-size:30px;line-height:1.5">To: all customers<br><b>Reminder: our shop is closed this Sunday.</b></div><div class="lab" style="font-size:20px;color:${G6};margin-top:14px">✓ SENT AUTOMATICALLY</div>`,u,2.4)
});
// 15 example 2: meera's drive
SC.push({ch:'EXAMPLE 2 · ACCOUNTANT',step:'MEERA’S SETUP',title:'One folder per <span class="mark">client</span>',d:8,f:u=>{
  const rows=[[0,'📁 Clients',.6],[1,'📁 Sharma Traders',1],[2,'📄 Invoice_Nov.pdf',1.4],[2,'📄 Reconciliation_Nov.xlsx',1.8],[1,'📁 Mehta Steel',2.2],[2,'📄 Invoice_Nov.pdf',2.6],[1,'📁 …10 more clients',3]];
  return body(470,`Each month, Meera saves every client’s invoice and reconciliation in that client’s Drive folder.`,u,.6) +
   win(RX,180,RW,'GOOGLE DRIVE',rows.map(([d,t,a])=>`<div style="padding:9px 0 9px ${d*52}px;font-size:32px;opacity:${P(u,a,.3)}">${t}</div>`).join(''),u,.4) +
   `<div style="opacity:${P(u,3.4,.5)}">`+sv(rohan(380,640,.7,MR({mood:'happy'})))+`</div>`;
}});
// 16 meera's prompt
SC.push({ch:'EXAMPLE 2 · ACCOUNTANT',step:'HER REQUEST',title:'On the 5th, <span class="mark">every month</span>',d:12,f:u=>
  body(470,`Same steps: Scheduled → New task → Create with Claude.`,u,.6) +
  app(RX,170,RW,760,'Scheduled',`<div style="font-family:MS,MSX;font-weight:800;font-size:28px;margin-bottom:14px">Create with Claude</div>${promptBox('On the 5th of every month, for each client folder in Drive › Clients, find the latest invoice and reconciliation.\n\nEmail the Drive links to that client with a short note. CC me.\n\nWait for my approval before sending.',u,1,30)}`,u,.4)
});
// 17 links not attachments
SC.push({ch:'EXAMPLE 2 · ACCOUNTANT',step:'GOOD TO KNOW',title:'Links, not <span class="mark">attachments</span>',d:9,f:u=>
  body(470,`The Gmail connector shares <b>Drive links</b>. It doesn’t attach files.`,u,.6) +
  body(640,`So check sharing first: each client must have access to their folder.`,u,2.4) +
  win(RX,190,RW,'DRAFT · TO: SHARMA TRADERS · CC: MEERA',`<div style="font-size:30px;line-height:1.5">Dear Sharma ji,<br>Please find November’s documents below.</div><div style="display:flex;gap:16px;margin-top:20px;flex-wrap:wrap"><span style="background:#dfe9e2;border:3px solid #034620;border-radius:12px;padding:12px 18px;font-size:28px">🔗 Invoice_Nov.pdf</span><span style="background:#dfe9e2;border:3px solid #034620;border-radius:12px;padding:12px 18px;font-size:28px">🔗 Reconciliation_Nov.xlsx</span></div><div style="font-size:28px;margin-top:20px">Regards, Meera</div>`,u,.4) +
  T(RX,690,`<div style="width:${RW}px;box-sizing:border-box;background:#f3d7cc;border:4px solid ${LOSS};border-radius:18px;padding:24px 30px;font-size:32px"><b>Drive › Share</b> the client’s folder with the client’s email address first.</div>`,ap(u,2.4))
});
// 18 result
SC.push({ch:'THE RESULT',step:'EVERY DAY · EVERY MONTH',title:'On time, <span class="mark">without fail</span>',d:8,f:u=>
  body(470,`Two tasks, set up once. They keep running, even on busy days.`,u,.6) +
  app(RX,170,RW,760,'Scheduled',`<div style="font-family:MS,MSX;font-weight:800;font-size:34px;margin-bottom:18px">Scheduled tasks</div>${[['Daily client follow-ups','Aryan · Weekdays 9:00 AM','Next run: tomorrow 9:00 AM'],['Monthly client documents','Meera · 5th of every month','Next run: 5 Dec']].map(([a,b,c],i)=>`<div style="border:3px solid #034620;border-radius:16px;padding:18px 22px;margin-bottom:16px;opacity:${P(u,1+i*.8,.3)}"><div style="font-family:MS,MSX;font-weight:800;font-size:30px">${a}</div><div style="font-size:24px;color:#3f5e4b">${b}</div><div class="lab" style="font-size:18px;color:${G6};margin-top:6px">${c}</div></div>`).join('')}`,u,.4) +
  `<div style="opacity:${P(u,2.6,.5)}">`+sv(rohan(200,640,.7,AR({mood:'cheer',jump:u>2.8&&u<5})))+`</div>`
});
// 19 safety
SC.push({ch:'STAY IN CONTROL',step:'TO BE FAIR',title:'Stay in <span class="mark">control</span>',ring:[1300,600,900],d:8,f:u=>
  [['Watch the first few runs closely.',.8],['Start with “Needs approval”; go automatic later.',1.8],['Never automate a mail you wouldn’t want sent by mistake.',2.8],['Check Drive sharing before sending links.',3.8]].map(([t,a],i)=>T(RX,200+i*170,`<div style="width:${RW}px;box-sizing:border-box;background:#fff;border:4px solid #034620;border-radius:20px;padding:26px 30px;font-size:36px">${CHECK(t)}</div>`,ap(u,a))).join('')
});
// 20 recap
SC.push({ch:'RECAP',step:'RECAP',title:'4 steps, <span class="mark">10 minutes</span>',d:9,f:u=>
  [['1','Connect Gmail (and Drive)','Settings → Connectors'],['2','Create a scheduled task','Scheduled → New task → Create with Claude'],['3','Describe it clearly','Who · what · when · how'],['4','Choose control','Needs approval or Always allow']].map(([n,t,s],i)=>T(RX,170+i*200,`<div style="display:flex;gap:26px;align-items:center;width:${RW}px;background:${i%2?'#f6e2b4':'#dfe9e2'};border:4px solid #034620;border-radius:22px;padding:24px 30px;box-sizing:border-box"><span style="width:76px;height:76px;border-radius:50%;background:#034620;color:#f7f5ef;font-family:MS,MSX;font-weight:800;font-size:40px;display:flex;align-items:center;justify-content:center;flex:none">${n}</span><span><div style="font-family:MS,MSX;font-weight:800;font-size:38px">${t}</div><div style="font-size:28px;color:#3f5e4b;margin-top:4px">${s}</div></span></div>`,ap(u,.6+i*.9))).join('')
});
// 21 end card
SC.push({green:true,logo:false,ring:[-300,-200,1400],d:7,f:u=>
  T(0,140,`<div style="width:1920px;text-align:center"><img src="logo-paper.png" style="height:260px"></div>`,ap(u,.2)) +
  T(0,470,`<div style="width:1920px;text-align:center;font-family:MS,MSX;font-weight:800;font-size:80px;color:#f7f5ef;line-height:1.15">You don’t need to code.<br>Just <span class="mark">ask clearly.</span></div>`,ap(u,.6)) +
  T(0,760,`<div style="width:1920px;text-align:center;font-family:MS,MSX;font-weight:700;font-size:36px;color:#e2b04a">Subscribe for one practical AI automation every week</div>`,ap(u,1.6)) +
  T(260,900,`<div class="foot" style="width:1400px;text-align:center;color:#b9d0c1">Illustrated screens, not real screenshots; menu names may change. Check Claude’s help centre for your plan. Example email addresses are placeholders.</div>`,ap(u,2.2))
});
