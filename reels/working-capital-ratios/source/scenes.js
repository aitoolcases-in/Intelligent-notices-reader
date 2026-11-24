// ---------- Ronnie: working capital + ratios ----------
const RN=(o)=>Object.assign({glasses:false,mustache:true},o);
const CAP=(y,html,u,a,size=56)=>T(80,y,`<div style="width:920px;font-family:MS,MSX;font-weight:800;font-size:${size}px;line-height:1.15;color:#034620">${html}</div>`,ap(u,a));
function sack(x,y,s,u,a,pat){const p=P(u,a,.3);
  return `<g filter="url(#pencil)" transform="translate(${x},${y}) scale(${s})" style="opacity:${p}"><path d="M10,20 C0,60 0,110 14,130 H96 C110,110 110,60 100,20 Z" fill="url(#${pat||'hA'})" stroke="${INK}" stroke-width="5"/><path d="M20,20 C35,5 75,5 90,20" fill="none" stroke="${INK}" stroke-width="5"/></g>`;}
function chip(x,y,text,u,a,bg){const p=P(u,a,.35);
  return T(x,y,`<div style="background:${bg||'#fff'};border:4px solid #034620;border-radius:14px;padding:12px 20px;font-size:36px;color:#034620">${text}</div>`,`opacity:${p};transform:translateY(${(1-p)*16}px)`);}
function wheel(u,a,speed,jam){ // cash -> stock -> sales -> cash
  const cx=540, cy=820, R=260, p=P(u,a,.4);
  const rot=(jam?Math.min(u*speed,40):u*speed)%360;
  const nodes=[['CASH',-90],['STOCK',30],['SALES',150]];
  let g=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${INK}" stroke-width="6" stroke-dasharray="26 18" transform="rotate(${rot} ${cx} ${cy})"/>`;
  nodes.forEach(([n,ang],i)=>{const x=cx+R*Math.cos(ang*Math.PI/180), y=cy+R*Math.sin(ang*Math.PI/180);
    const stuck=jam&&n==='STOCK';
    g+=`<circle cx="${x}" cy="${y}" r="92" fill="${stuck?'#f3d7cc':(i==0?'#dfe9e2':'#f1cf86')}" stroke="${stuck?LOSS:INK}" stroke-width="${stuck?8:5}"/><text x="${x}" y="${y+12}" text-anchor="middle" font-family="MS,MSX" font-weight="800" font-size="34" fill="${INK}">${n}</text>`;});
  return sv(`<g filter="url(#pencil)" style="opacity:${p}">${g}</g>`);
}
function gauge(u,a,val,max){ // quick-ratio dial with healthy band near 1
  const cx=540, cy=980, R=330, p=P(u,a,.4), pv=P(u,a+.6,1.2);
  const ang=v=>Math.PI+Math.PI*(v/max);
  const arc=(v1,v2,col)=>{const a1=ang(v1),a2=ang(v2);return `<path d="M${cx+R*Math.cos(a1)},${cy+R*Math.sin(a1)} A${R},${R} 0 0 1 ${cx+R*Math.cos(a2)},${cy+R*Math.sin(a2)}" fill="none" stroke="${col}" stroke-width="56"/>`;};
  const nv=1.6-(1.6-val)*pv, na=ang(nv);
  return sv(`<g style="opacity:${p}">${arc(0,.8,'#f3d7cc')}${arc(.8,1.5,'#9fbfab')}${arc(1.5,2,'#f6e2b4')}
    <path d="M${cx},${cy} L${cx+(R-70)*Math.cos(na)},${cy+(R-70)*Math.sin(na)}" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="22" fill="${INK}"/></g>`)+
   T(170,1010,`<span class="lab" style="font-size:24px;color:${LOSS}">TOO LOW</span>`,`opacity:${p}`)+
   T(470,580,`<span class="lab" style="font-size:24px;color:${G6}">HEALTHY ≈ 1</span>`,`opacity:${p}`)+
   T(800,1010,`<span class="lab" style="font-size:24px;color:#c98f1c">TOO HIGH</span>`,`opacity:${p}`)+
   T(390,1060,`<div style="width:300px;text-align:center;font-family:MS,MSX;font-weight:800;font-size:64px;color:${nv<.8?LOSS:INK}">${nv.toFixed(1)}</div>`,`opacity:${p}`);
}

// 1 hook
SC.push({kick:'ACCREVISE EXPLAINS',ring:[520,700,1100],d:3,ev:[.2,.6,2.2],f:u=>
  `<div class="hl" style="${ap(u,.2)}">Prices fell, so you</div>` +
  `<div class="hl" style="top:372px;${ap(u,.6)}"><span class="mark loss">stocked up?</span></div>` +
  T(80,500,`<div style="font-family:MS,MSX;font-weight:800;font-size:56px;color:#034620;opacity:${P(u,2.2,.4)};transform:translateY(${(1-P(u,2.2,.4))*20}px)">Here’s the <span class="mark">hidden cost.</span></div>`) +
  sv(rohan(150,620,1.5,RN({prop:'phone',mood:u>2.4?'worried':'happy'})),0,0)
});
// 2 meet ronnie
SC.push({kick:'MEET RONNIE',ring:[-500,1100,1000],d:3,ev:[.2,.6,2],f:u=>
  hl(u,'A ','10% discount') +
  `<div style="opacity:${P(u,.4,.5)}">`+sv(rohan(-10,560,1.0,RN({prop:'phone',mood:'happy',look:6})),0,0)+`</div>` +
  T(520,520,`<span class="lab" style="font-size:26px;color:#3f5e4b">WHOLESALER · WHATSAPP</span>`,ap(u,.6)) +
  T(520,570,`<div style="background:#dfe9e2;border:3px solid #034620;border-radius:22px 22px 22px 4px;padding:16px 22px;font-size:38px;line-height:1.2;color:#034620;width:440px;box-sizing:border-box">Oil &amp; dal 10% cheaper today! Bulk only 🙏</div>`,ap(u,1)) +
  T(520,820,`<span class="hand" style="font-size:46px;color:${G6}">“What a deal!”</span>`,ap(u,2))
});
// 3 all in
SC.push({kick:'ALL IN',ring:[600,1250,900],d:3.4,ev:[.2,.6,1.8,2.6],f:u=>{
  let s=''; for(let r=0;r<3;r++)for(let c=0;c<6;c++){const i=r*6+c;s+=sack(100+c*150,920-r*130,1,u,.6+i*.08,(i%3==1)?'hN':'hA');}
  return hl(u,'₹15 lakh of ','stock') + sv(s) +
   chip(80,480,'All his cash: <b>₹6 lakh</b>',u,1.8) + chip(80,580,'+ Overdraft: <b style="color:'+LOSS+'">₹9 lakh</b>',u,2.6,'#f3d7cc');
}});
// 4 the wheel
SC.push({kick:'THE WORKING CAPITAL CYCLE',ring:[640,-300,800],d:3,ev:[.2,.6],f:u=>
  hl(u,'A wheel of ','cash') + wheel(u,.6,40,false) +
  CAP(1170,`Turns every <span class="mark">15 days.</span>`,u,1.6,54)
});
// 5 jammed
SC.push({kick:'NOW',ring:[-400,1300,900],d:3,ev:[.2,.6,1.4],f:u=>
  hl(u,'The wheel ','jams','',' loss') + wheel(u,.2,40,true) +
  CAP(1170,`Extra stock: <span class="mark loss">4 months</span> to sell.`,u,1.4,52)
});
// 6 interest
SC.push({kick:'MEANWHILE',ring:[600,1300,1000],d:3.4,ev:[.2,.6,1.6],f:u=>{
  const m=Math.min(4,Math.floor(clamp((u-.6)/2.4)*4)+1);
  return hl(u,'Interest, every ','month') +
   T(160,500,`<div style="width:760px;background:#034620;border-radius:30px;padding:46px 40px;text-align:center;opacity:${P(u,.4,.3)}"><div class="lab" style="font-size:26px;color:#b9d0c1">OVERDRAFT INTEREST · MONTH ${m}</div><div style="font-family:MS,MSX;font-weight:800;font-size:96px;color:#f0a58c;margin-top:16px">₹${(9000*m).toLocaleString('en-IN')}</div><div style="font-size:34px;color:#f7f5ef;margin-top:6px">₹9,000 a month on ₹9 lakh</div></div>`) +
   `<div style="opacity:${P(u,1.6,.5)}">`+sv(rohan(340,900,.85,RN({mood:'worried',sweat:true})),0,0)+`</div>`;
}});
// 7 question
SC.push({kick:'SO…',ring:[-300,400,1300],green:true,d:2.4,ev:[.2],f:u=>
  `<div class="hl" style="top:800px;text-align:center;${ap(u,.2)}">Did he <span class="mark">save money?</span></div>`
});
// 8 the saving shrinks
SC.push({kick:'THE MATHS',ring:[-450,-300,900],d:5.4,ev:[.2,.6,1.8,3.2,4.6],f:u=>{
  const row=(a,lab,val,col,b)=>`<div style="display:flex;justify-content:space-between;padding:16px 0;${b?'border-top:4px solid #034620;margin-top:8px;':'border-bottom:2px dashed #9fbfab;'}opacity:${P(u,a,.3)}"><span>${lab}</span><b style="color:${col}">${val}</b></div>`;
  return hl(u,'The saving ','shrinks') +
   T(110,500,`<div style="background:#fff;border:4px solid #034620;padding:24px 36px;width:860px;box-sizing:border-box;font-size:44px;color:#034620">${row(.6,'Saved (10% off)','₹1,00,000',G6)}${row(1.8,'Interest, 4 months','− ₹36,000',LOSS)}${row(3.2,'Expired / damaged stock','− ₹40,000',LOSS)}${row(4.6,'Left','₹24,000',INK,true)}</div>`);
}});
// 9 lost sales
SC.push({kick:'AND',ring:[560,1250,1000],d:3,ev:[.2,.6,2.2],f:u=>
  hl(u,'Empty where it ','matters') +
  sv(`<g filter="url(#pencil)" style="opacity:${P(u,.4,.4)}"><rect x="100" y="500" width="420" height="420" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M100,640 H520 M100,780 H520" stroke="${INK}" stroke-width="5"/>${[0,1,2].map(i=>`<rect x="${130+i*130}" y="${530}" width="90" height="100" fill="url(#hA)" stroke="${INK}" stroke-width="4"/>`).join('')}<text x="310" y="720" text-anchor="middle" font-family="MS,MSX" font-weight="800" font-size="30" fill="${LOSS}">SOLD OUT</text><text x="310" y="860" text-anchor="middle" font-family="MS,MSX" font-weight="800" font-size="30" fill="${LOSS}">SOLD OUT</text></g>`) +
  T(560,520,`<div style="background:#dfe9e2;border:3px solid #034620;border-radius:22px 22px 4px 22px;padding:16px 22px;font-size:36px;line-height:1.2;color:#034620;width:420px;box-sizing:border-box">Bread, milk, eggs… out of stock? I’ll go next door.</div>`,ap(u,.8)) +
  CAP(1000,`No cash to restock the <span class="mark loss">fast sellers.</span>`,u,2.2,50)
});
// 10 concept
SC.push({kick:'THE CONCEPT',ring:[350,500,1300],green:true,d:3,ev:[.2,1.2],f:u=>
  `<div class="hl" style="top:760px;text-align:center;${ap(u,.2)}">This is what</div><div class="hl" style="top:850px;text-align:center;${ap(u,.8)}"><span class="mark">financial ratios</span> catch.</div>`
});
// 11 quick ratio
SC.push({kick:'RATIO 1',ring:[640,-300,800],d:3.4,ev:[.2,.6,1.6],f:u=>
  hl(u,'Quick ','ratio') +
  T(80,470,`<div style="font-size:38px;color:#034620;line-height:1.3;width:920px">Cash you can use <b>÷</b> bills you owe</div>`,ap(u,.4)) +
  gauge(u,.8,0.1,2) +
  T(80,1170,`<div style="font-size:40px;color:#034620">Ronnie: ₹1 lakh ÷ ₹10 lakh = <b style="color:${LOSS}">0.1</b></div>`,ap(u,2.6))
});
// 12 inventory days
SC.push({kick:'RATIO 2',ring:[-400,1300,900],d:3.3,ev:[.2,.6,1.8],f:u=>{
  const b1=P(u,.6,.6)*240, b2=P(u,1.8,.9)*800;
  return hl(u,'Inventory ','days') +
   T(80,470,`<div style="font-size:38px;color:#034620">How long stock sits on the shelf</div>`,ap(u,.4)) +
   T(80,580,`<span class="lab" style="font-size:28px;color:#034620">BEFORE · 15 DAYS</span>`,ap(u,.6)) +
   sv(`<g filter="url(#pencil)"><rect x="80" y="630" width="${b1}" height="100" fill="url(#hN)" stroke="${INK}" stroke-width="5"/><rect x="80" y="850" width="${b2}" height="100" fill="url(#hR)" stroke="${INK}" stroke-width="5"/></g>`) +
   T(80,800,`<span class="lab" style="font-size:28px;color:${LOSS}">AFTER THE “DEAL” · 50 DAYS</span>`,ap(u,1.8));
}});
// 13 both mean trouble
SC.push({kick:'THE RULE',ring:[600,1250,900],d:4.2,ev:[.2,.6,2,3.4],f:u=>
  hl(u,'Not too low. ','Not too high.') +
  card3(u)
});
function card3(u){
  const c=(x,a,bg,t,s)=>T(x,520,`<div style="width:290px;height:400px;box-sizing:border-box;background:${bg};border:4px solid #034620;border-radius:20px;padding:26px 22px;opacity:${P(u,a,.4)}"><div style="font-family:MS,MSX;font-weight:800;font-size:40px;color:#034620">${t}</div><div style="font-size:34px;color:#034620;margin-top:16px;line-height:1.25">${s}</div></div>`);
  return c(80,.6,'#f3d7cc','TOO LOW','Can’t pay bills on time.')+c(395,2,'#dfe9e2','HEALTHY','Bills paid, stock moving.')+c(710,3.4,'#f6e2b4','TOO HIGH','Money sitting idle.');
}
// 14 the AI prompt
SC.push({kick:'CHECK YOURS',ring:[-500,1350,900],d:3,ev:[.2,.6,1.2],f:u=>
  hl(u,'One ','AI prompt') +
  T(80,480,`<div style="width:920px;background:#034620;border-radius:20px;padding:30px 34px;box-sizing:border-box;font-family:'JetBrains Mono',monospace;font-size:31px;line-height:1.45;color:#f7f5ef;opacity:${P(u,.6,.4)}">“Here are my balance sheet and P&amp;L. Calculate my quick ratio, current ratio and inventory days, compare them with typical ranges for my kind of business, and tell me what to fix.”</div>`) +
  `<div style="opacity:${P(u,1.6,.5)}">`+sv(rohan(340,1000,.8,RN({prop:'laptop',mood:'happy'})),0,0)+`</div>`
});
// 15 CTA
SC.push({kick:null,ring:[-300,150,1700],green:true,logo:false,d:3,ev:[.2,.5,1.4,2.2],f:u=>
  T(0,330,`<div style="width:1080px;text-align:center"><img src="logo-paper.png" style="height:330px"></div>`,ap(u,.2)) +
  `<div class="hl" style="left:0;width:1080px;top:800px;text-align:center;${ap(u,.5)}">Want the full guide?</div>` +
  `<div class="hl" style="left:0;width:1080px;top:900px;text-align:center;${ap(u,1.2)}">Comment <span class="mark">RATIOS</span></div>` +
  T(110,1120,`<div class="foot" style="width:860px;text-align:center;color:#b9d0c1">Illustrative example. Ratio ranges are common rules of thumb; healthy levels vary by industry. Not financial advice.</div>`,ap(u,2.2))
});
