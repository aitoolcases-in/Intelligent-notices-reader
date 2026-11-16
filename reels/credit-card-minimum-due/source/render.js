// Renders reel.html frame by frame (30 fps) and pipes JPEG frames to ffmpeg.
const {chromium}=require('playwright');const path=require('path');const {spawn}=require('child_process');const fs=require('fs');
(async()=>{
  const dir=process.argv[2];const FPS=30;
  const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
  await p.goto('file://'+path.join(dir,'reel.html'));await p.evaluate(()=>document.fonts.ready);
  const total=await p.evaluate(()=>window.TOTAL);
  fs.writeFileSync(path.join(dir,'events.json'),JSON.stringify(await p.evaluate(()=>({total:window.TOTAL,events:window.EVENTS}))));
  const n=Math.round(total*FPS);
  const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','18','-preset','medium',path.join(dir,'video_silent.mp4')],{stdio:['pipe','inherit','inherit']});
  const stage=p.locator('#stage');
  for(let i=0;i<n;i++){
    await p.evaluate(t=>render(t),i/FPS);
    const buf=await stage.screenshot({type:'jpeg',quality:92});
    if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r));
    if(i%300===0) console.log('frame',i,'/',n);
  }
  ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('done',n);
})();
