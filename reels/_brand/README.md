# Accrevise kite outro

`Accrevise_Kite_Outro_9x16.mp4` (5.7 s, 1080×1920, with sound) is the user's original animation
(`Accrevise_Claude_Capabilities_LinkedIn_4x5.mov`, 1080×1350, 8.4 s), made faster and fitted to 9:16:

- Green kite part (0.2–5.07 s of the original): sped up 1.7×, scaled to 1536×1920 and centre-cropped to 1080×1920, so clouds and string reach the edges.
- White logo part (5.07–8.38 s): sped up 1.4×, near-white snapped to pure white and padded to 1080×1920 on white, then the final logo held for 0.5 s.
- Sound added: whoosh as the kite flies in, paper taps at the envelope, chime as the wordmark lands.

ffmpeg filter used:
```
[0:v]trim=0.2:5.066,setpts=(PTS-STARTPTS)/1.7,scale=1536:1920:flags=lanczos,crop=1080:1920,fps=30,format=yuv420p,setsar=1[a];
[0:v]trim=5.067:8.384,setpts=(PTS-STARTPTS)/1.4,format=rgb24,lutrgb=r='if(gte(val,247),255,val)':g='if(gte(val,247),255,val)':b='if(gte(val,247),255,val)',pad=1080:1920:0:285:color=white,tpad=stop_mode=clone:stop_duration=0.5,fps=30,format=yuv420p,setsar=1[b];
[a][b]concat=n=2:v=1:a=0[v]
```
