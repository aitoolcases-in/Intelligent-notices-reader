---
name: accrevise-reels
description: "Use when making Instagram reels for Accrevise (AI-powered CFO brand): character-led sketch story in 13 beats, one worked example, a 'what if' twin, closing truth line, kite outro."
---

# Accrevise reels

Vertical reels (1080x1920, 30 fps) about money, tax, scams and AI tools for an Indian audience.
Every reel follows a character-and-story flow (13 beats). The full beat sheet is in `docs/accrevise-video-flow.md`.
We borrow only the STORY STRUCTURE from the reference reel we studied. Never use its creator's name or handle, its series tag ("in 90 seconds"), its character, its wording, or its exact look (ruled paper, serif headlines with an italic word, greyscale sketch with a yellow pop). Every frame is unmistakably Accrevise.

## The flow (13 beats, 80-90 s total, never over 90 s)
1. **Hook = negative + solution, in the first 3 seconds:** kicker "ACCREVISE EXPLAINS"; line 1 states the fear or loss as a question, with the key words in the loss-red marker ("Scared AI will misuse *your data?*"); about 2 s in, the solution promise lands in the amber marker ("*3 rules* so it can't."). The hero reacts (worried → relieved). The spoken line says both: "Scared AI will misuse your data? Here are three simple rules, so it can't." Keep text minimal: the story and the man carry the rest.
2. **Meet the hero:** "Rohan buys a ==phone==": the object, its ₹ price tag, and the decision ("he pays only the minimum: ₹2,500").
3. **Define it:** three plain features on a receipt, ticked one at a time.
4. **The numbers:** amount, rate and payment boxes pop in, with an assumptions footnote.
5. **The real cost:** show the time (one dot per payment), then the total split into what reduced the debt and what it cost.
6. **The twin:** "A ==second== Rohan" makes the opposite choice with the same money (split-screen sketch).
7. **Ask the viewer:** on ledger green, one question, text only ("How long until he's ==debt-free?==").
8. **The reveal:** answer in the same visual language (the debt column empties, "₹0 ✓").
9. **Reframe:** on ledger green, two short lines in our own words ("Minimum due ≠ ==minimum cost.==").
10. **The insight:** turn the cost into something the viewer can judge (a falling line, two timelines).
11. **Be fair:** "Sometimes ==worth it==", with the honest case.
12. **Generalise:** one rule the viewer can apply (bars for different choices).
13. **The truth:** on ledger green, the large Accrevise logo (paper version), a closing line the viewer can repeat, and the assumptions footnote.

## Caricature
- One named, relatable Indian hero (a salaried 28-year-old, a parent, a small-shop owner), drawn as a simple pencil sketch.
- Line art in Accrevise green (#034620) with green-300 hatching; ONE amber (#E2B04A) colour pop on the thing the hero wants.
- The hero appears on the story beats (1, 2, 6, 11). Maths beats use clean hand-drawn diagrams: dot grids, filling jars, hatched bars and timelines.

## Look (Accrevise design system)
- Accrevise logo on every frame: `accrevise-logo-green.png` top-left (~118 px tall) on paper, `accrevise-logo-paper.png` on green. The last frame carries it large and centred.
- Paper ground #F7F5EF. Ledger green #034620 ground for the question (beat 7), the twist (beat 9) and the closing truth (beat 13).
- An UPPERCASE kicker above each headline (Montserrat 700, letter-spaced, ink-muted).
- Headline: Montserrat 800, sentence case, ~72 px, green-900, ONE key word in the amber marker (loss red marker for a loss word). Body: Source Serif 4.
- The brand ring behind each frame; receipts for bills; loss red only for losses; green-600 for the "better" side; green wipe between beats.
- Keep on-screen text short: one headline plus 1-3 short lines per beat. The man and the drawings tell the story.
- Never use another creator's name, tag, character, wording or look; only the story structure is shared.

## The man (Rohan) is animated
- Line art in Accrevise green, green hatching, one amber pop (his phone).
- Always alive: blinks every ~3 s, gentle breathing bob and head tilt, eyes glance around, the phone sways in his hand.
- Acts out the story: happy with his new phone (beats 1-2), worried and scratching his head as the debt grows (beats 4-5, 11), cheering with both arms up and jumping when the debt hits ₹0 (beat 8).
- He appears in most beats, small beside the diagram when the maths leads.

## Pace
- Whole reel 80-90 s, never over 90 s. Plan the voiceover first: about 170-190 spoken words in total at speed 0.95 (~2.2 words a second), with short lines of 6-16 words per beat and 0.8-1 s of silence after each line.
- If the script runs long, cut words, not speed. Merge or drop a beat (e.g. fold beat 4 into beat 3) before speeding the voice up.
- Each beat builds in 2-3 steps timed to the spoken line; the headline stays put while the visual builds below it.

## Ending
- Beat 13 (closing truth on ledger green) is the last story frame. Then append the Accrevise kite outro: `reels/_brand/Accrevise_Kite_Outro_9x16.mp4` (5.7 s). It is the user's own animation (cream kite over clouds on green → white → envelope opens → receipt rises → ring draws → ACCREVISE wordmark), sped up and fitted to 9:16; see `reels/_brand/README.md`. Never redraw it.
- Re-encode when concatenating (30 fps, yuv420p, 48 kHz stereo). The silent version gets the outro with silent audio.
- Keep reel + outro within 90 s: budget the story for ≤ 84 s.
- No separate CTA slide; the share/save CTA goes in the caption. No logos of other companies; use plain name chips.

## Reel cover
- Use the Accrevise design system's reel cover: white ground, logo centred at the top, a 2-3 word UPPERCASE title in the centre.

## Audio
- Default: voiceover. Kokoro TTS (pip kokoro-onnx; model files from the thewh1teagle/kokoro-onnx GitHub releases, model-files-v1.0), voice af_heart at a normal, unhurried pace: speed 0.95 (1.1 was too fast; Kokoro's Indian voices were tried and rejected), one calm explainer line per beat, numbers written out as words. Each beat lasts at least its line + ~1 s; the beat's animations stretch to fit. No sound effects under the voice.
- Also deliver a silent version so they can add a trending track.

## Pronouncing Indian names in the voiceover
- Spell names phonetically in the voiceover lines only (screen text keeps the real spelling): "Gupta ji" → "Goopta jee" (said Goopta-G; the engine reads "ji" as "jai"). Check new names with the engine's phonemizer before rendering.

## Facts
Look up every price, rate or app setting before it goes on screen. Show approximate figures with a footnote where sources disagree, and list the sources in the reply.

## Deliver with each reel
- The beat-1 on-screen headline, plus a spoken hook for the user to record.
- A short caption: the hook line, 2-3 lines of value, a save/share CTA, a comment question and 5-8 hashtags.
- Best posting window for an Indian audience: weekdays 7-9 PM IST or Sunday 10 AM-12 PM, adjusted by their Insights.

## Checklist
- [ ] A named hero appears in the first 3 seconds
- [ ] One worked example, with numbers that never change
- [ ] A twin or "what if" scene
- [ ] One question to the viewer before the reveal
- [ ] A fair "sometimes it's worth it" beat
- [ ] A closing truth line and footnote, then the kite outro
