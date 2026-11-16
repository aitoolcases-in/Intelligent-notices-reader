# Builds the sound bed: a soft pencil scratch on each build step, a paper page-turn between beats.
import json, sys, wave
import numpy as np
d = sys.argv[1]
info = json.load(open(f"{d}/events.json"))
SR = 48000
N = int((info["total"] + 0.5) * SR)
out = np.zeros(N)
rng = np.random.default_rng(7)

def bandnoise(n, lo, hi):
    x = rng.standard_normal(n)
    f = np.fft.rfft(x)
    fr = np.fft.rfftfreq(n, 1 / SR)
    f[(fr < lo) | (fr > hi)] = 0
    y = np.fft.irfft(f, n)
    return y / (np.abs(y).max() + 1e-9)

def pencil():
    n = int(0.32 * SR)
    t = np.arange(n) / SR
    y = bandnoise(n, 2500, 7000)
    env = np.minimum(t / 0.02, 1) * np.exp(-t / 0.12)
    grain = 0.6 + 0.4 * np.sin(2 * np.pi * 38 * t) ** 2
    return y * env * grain * 0.16

def turn():
    n = int(0.55 * SR)
    t = np.arange(n) / SR
    y = bandnoise(n, 400, 5000)
    env = np.sin(np.pi * np.clip(t / 0.5, 0, 1)) ** 2
    lp = np.convolve(y, np.ones(6) / 6, mode="same")
    return lp * env * 0.22

for e in info["events"]:
    s = pencil() if e["k"] == "pencil" else turn()
    i = int(e["t"] * SR)
    j = min(N, i + len(s))
    out[i:j] += s[: j - i]

out = np.clip(out, -1, 1)
pcm = (out * 32767).astype(np.int16)
with wave.open(f"{d}/sfx.wav", "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print("ok", len(info["events"]), "events")
