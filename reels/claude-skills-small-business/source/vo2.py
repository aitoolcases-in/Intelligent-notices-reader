# Voiceover per beat from a JSON list of lines: python vo2.py <dir> [voice] [speed]. Writes vo_XX.wav, vo.js, vo.json.
import json, sys
import soundfile as sf
from kokoro_onnx import Kokoro
d = sys.argv[1]
voice = sys.argv[2] if len(sys.argv) > 2 else "af_heart"
speed = float(sys.argv[3]) if len(sys.argv) > 3 else 0.95
LINES = json.load(open(f"{d}/vo_lines.json"))
base = __file__.rsplit("/", 1)[0]
k = Kokoro(f"{base}/tts/kokoro-v1.0.onnx", f"{base}/tts/voices-v1.0.bin")
durs = []
for i, line in enumerate(LINES):
    samples, sr = k.create(line, voice=voice, speed=speed, lang="en-us")
    sf.write(f"{d}/vo_{i:02d}.wav", samples, sr)
    durs.append(round(len(samples) / sr, 3))
open(f"{d}/vo.js", "w").write("window.VO=" + json.dumps(durs) + ";")
json.dump({"lines": LINES, "durs": durs, "sr": sr, "voice": voice, "speed": speed}, open(f"{d}/vo.json", "w"))
print(durs, round(sum(durs), 1), "s of speech")
