const {chromium}=require('playwright');const D=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+D+'/reel/carousel.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
const n=await p.locator('.slide').count();
for(let i=0;i<n;i++){await p.locator('.slide').nth(i).screenshot({path:D+'/carousel_out/slide_'+String(i+1).padStart(2,'0')+'.png'});}
await p.pdf({path:D+'/carousel_out/carousel.pdf',width:'1080px',height:'1350px',printBackground:true,margin:{top:0,right:0,bottom:0,left:0}});
console.log('slides',n);await b.close();})();
