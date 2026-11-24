// ---------- shared: Gupta ji, Meera, simplified app screens ----------
const GJ=(o)=>Object.assign({glasses:false},o);
const MR=(o)=>Object.assign({hair:'long'},o);
const MONO="'JetBrains Mono','DejaVu Sans Mono',monospace";
const CAP=(y,html,u,a,size=54)=>T(80,y,`<div style="width:920px;font-family:MS,MSX;font-weight:800;font-size:${size}px;line-height:1.15;color:#034620">${html}</div>`,ap(u,a));
const typ=(s,u,a,cps=40)=>{const n=Math.max(0,Math.floor((u-a)*cps));return n>=s.length?s:s.slice(0,n)+'<span style="opacity:.8">▍</span>'};
function win(x,y,w,title,inner,u,a){const p=P(u,a,.4);
  return `<div class="ab" style="left:${x}px;top:${y}px;width:${w}px;opacity:${p};transform:translateY(${(1-p)*20}px);background:#fff;border:4px solid #034620;border-radius:20px;overflow:hidden;box-shadow:0 10px 0 rgba(3,70,32,.12)">
   <div style="background:#dfe9e2;padding:12px 18px;display:flex;gap:10px;align-items:center;border-bottom:3px solid #034620"><span style="width:14px;height:14px;border-radius:50%;background:#e2b04a"></span><span style="width:14px;height:14px;border-radius:50%;background:#9fbfab"></span><span class="lab" style="font-size:22px;color:#034620;margin-left:10px">${title}</span></div>
   <div style="padding:22px 26px">${inner}</div></div>`;}
function tog(on){const bg=on>.5?G6:'#b9c4bd';return `<span style="display:inline-block;position:relative;width:104px;height:56px;border-radius:9999px;background:${bg};border:3px solid #034620;flex:none"><span style="position:absolute;top:4px;left:${6+on*42}px;width:42px;height:42px;border-radius:50%;background:#fff;border:3px solid #034620"></span></span>`;}
function connRow(name,letter,on,label){return `<div style="display:flex;align-items:center;gap:20px;padding:16px 0;border-bottom:2px dashed #9fbfab"><span style="width:60px;height:60px;border-radius:14px;background:#f6e2b4;border:3px solid #034620;display:flex;align-items:center;justify-content:center;font-family:MS,MSX;font-weight:800;font-size:30px;color:#034620;flex:none">${letter}</span><span style="flex:1;font-size:38px;color:#034620">${name}</span><span class="lab" style="font-size:22px;color:${on>.5?G6:'#3f5e4b'};margin-right:12px">${on>.5?'CONNECTED':(label||'CONNECT')}</span>${tog(on)}</div>`;}
function promptCard(x,y,w,text,u,a,cps,label){const p=P(u,a,.4);
  return `<div class="ab" style="left:${x}px;top:${y}px;width:${w}px;opacity:${p};background:#034620;border-radius:20px;padding:26px 30px;box-sizing:border-box;box-shadow:0 10px 0 rgba(3,70,32,.15)"><div class="lab" style="font-size:22px;color:#e2b04a;margin-bottom:12px">${label||'YOU TYPE'}</div><div style="font-family:${MONO};font-size:31px;line-height:1.45;color:#f7f5ef;white-space:pre-wrap">${typ(text,u,a+.3,cps||40)}</div></div>`;}
function perm(sel){ // segmented control: 0 always, 1 needs approval, 2 blocked
  const opts=['Always allow','Needs approval','Blocked'];
  return `<div style="display:flex;border:3px solid #034620;border-radius:14px;overflow:hidden">${opts.map((o,i)=>`<div style="flex:1;text-align:center;padding:14px 6px;font-size:28px;font-family:MS,MSX;font-weight:700;${i==sel?`background:${i==0?'#e2b04a':(i==1?'#9fbfab':'#f3d7cc')};color:#034620`:'background:#fff;color:#7f8f80'};${i<2?'border-right:3px solid #034620':''}">${o}</div>`).join('')}</div>`;}
function inboxRow(from,subj,state){ // state: draft|sent|none
  const chip=state==='sent'?`<span class="lab" style="font-size:20px;background:${G6};color:#fff;padding:6px 12px;border-radius:8px">SENT ✓</span>`:(state==='draft'?`<span class="lab" style="font-size:20px;background:#e2b04a;color:#034620;padding:6px 12px;border-radius:8px">DRAFT READY</span>`:'');
  return `<div style="display:flex;align-items:center;gap:16px;padding:14px 0;border-bottom:2px dashed #9fbfab"><div style="flex:1"><div style="font-size:30px;color:#034620;font-weight:600">${from}</div><div style="font-size:26px;color:#3f5e4b">${subj}</div></div>${chip}</div>`;}
function sticky(x,y,text,rot,u,a,col){const p=P(u,a,.3);
  return T(x,y,`<div style="background:${col||'#f6e2b4'};border:3px solid #034620;padding:16px 22px;font-size:34px;color:#034620;width:380px;box-shadow:6px 6px 0 rgba(3,70,32,.15);transform:rotate(${rot}deg)">${text}</div>`,`opacity:${p}`);}
function card4(u,a,items){ // WHO/WHAT/WHEN/HOW
  return items.map(([t,s],i)=>{const x=80+(i%2)*470, y=480+Math.floor(i/2)*330, p=P(u,a+i*.8,.4);
    return T(x,y,`<div style="width:450px;height:300px;box-sizing:border-box;background:${['#dfe9e2','#f6e2b4','#dfe9e2','#f6e2b4'][i]};border:4px solid #034620;border-radius:20px;padding:24px 26px;opacity:${p}"><div style="font-family:MS,MSX;font-weight:800;font-size:52px;color:#034620">${t}</div><div style="font-size:34px;color:#034620;margin-top:14px;line-height:1.25">${s}</div></div>`);}).join('');
}
function envelopes(u,a,n,sent){let g='';for(let i=0;i<n;i++){const c=i%4,r=Math.floor(i/4),p=P(u,a+i*.12,.25),x=110+c*220,y=520+r*170;
  g+=`<g style="opacity:${p}"><rect x="${x}" y="${y}" width="170" height="120" rx="10" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M${x},${y} L${x+85},${y+65} L${x+170},${y}" fill="none" stroke="${INK}" stroke-width="5"/>${sent&&u>a+1.6+i*.08?`<circle cx="${x+150}" cy="${y+12}" r="24" fill="${G6}"/><path d="M${x+139},${y+12} l8,8 l16,-16" stroke="#fff" stroke-width="5" fill="none"/>`:''}</g>`;}
  return sv(`<g filter="url(#pencil)">${g}</g>`);}
const RULE_DONE=(t)=>`<span style="color:${G6};font-family:MS,MSX;font-weight:800">✓</span> ${t}`;
