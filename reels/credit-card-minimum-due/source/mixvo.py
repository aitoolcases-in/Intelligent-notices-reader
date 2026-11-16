# Places each beat's voiceover clip at its scene start (+0.25 s) and writes a 48 kHz mono track.
import json, sys
import numpy as np, soundfile as sf
d = sys.argv[1]
info = json.load(open(f"{d}/events.json"))
starts = json.load(open(f"{d}/starts.json"))
SR = 48000
N = int((info["total"] + 0.5) * SR)
out = np.zeros(N)
for i, st in enumerate(starts):
    y, sr = sf.read(f"{d}/vo_{i:02d}.wav")
    if y.ndim > 1: y = y.mean(1)
    # resample to 48 kHz
    x = np.interp(np.arange(0, len(y), sr / SR), np.arange(len(y)), y)
    a = int((st + 0.25) * SR); b = min(N, a + len(x))
    out[a:b] += x[: b - a]
out = out / (np.abs(out).max() + 1e-9) * 0.89
sf.write(f"{d}/vo_track.wav", out, SR)
print("ok", round(N / SR, 2))
