# Generates one voiceover clip per beat with Kokoro (af_heart, speed 1.1) and writes vo.js with durations.
import json, sys
import soundfile as sf
from kokoro_onnx import Kokoro

d = sys.argv[1]
LINES = [
    "Minimum due on your credit card, explained.",
    "Rohan buys a new phone for fifty thousand rupees. When the bill comes, he pays only the minimum. Two thousand five hundred.",
    "The minimum due is about five percent of your bill. Pay it, and there's no late fee. But the rest keeps costing you three and a half percent a month, plus G S T.",
    "So here's Rohan's bill. Fifty thousand owed. Three and a half percent a month. Five percent minimum.",
    "One year later, he has paid about twenty-eight thousand rupees. And he still owes almost forty-four thousand. Only about six thousand actually cut the debt. The rest was interest.",
    "Now meet a second Rohan. He starts with the same two thousand five hundred. But he never lets it shrink.",
    "So, how long until he's debt-free?",
    "Thirty-nine months. That's it. And the first Rohan, paying the minimum? He's still paying.",
    "Because the minimum due is not the minimum cost.",
    "As his balance falls, his minimum falls too, all the way down to two hundred rupees. So the debt drags on for about twenty-three years, and costs him over one lakh rupees extra.",
    "To be fair, in one tight month, paying the minimum beats missing it. No late fee. No hit to your credit score. Just not every month.",
    "The rule is simple. The more you pay each month, the less you pay overall. Pay the full bill, and the interest is zero.",
    "Minimum due. Maximum interest.",
]
k = Kokoro(f"{d}/../tts/kokoro-v1.0.onnx", f"{d}/../tts/voices-v1.0.bin")
durs = []
for i, line in enumerate(LINES):
    samples, sr = k.create(line, voice="af_heart", speed=1.1, lang="en-us")
    sf.write(f"{d}/vo_{i:02d}.wav", samples, sr)
    durs.append(round(len(samples) / sr, 3))
    print(i, durs[-1])
open(f"{d}/vo.js", "w").write("window.VO=" + json.dumps(durs) + ";")
json.dump({"lines": LINES, "durs": durs, "sr": sr}, open(f"{d}/vo.json", "w"))
