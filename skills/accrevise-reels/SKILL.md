---
name: accrevise-reels
description: "Use when making Instagram reels for Accrevise (AI-powered CFO brand): character-led sketch story in 13 beats, one worked example, a 'what if' twin, closing truth line, kite outro."
---

# Accrevise reels

Vertical reels (1080x1920, 30 fps) about money, tax, scams and AI tools for an Indian audience.
Every reel follows the character-and-story flow of the reference reel "Personal loans, explained" (88 s).
Where an older Accrevise rule clashes with that reel, the reel wins. The full beat sheet is in `docs/accrevise-video-flow.md`.

## The flow (13 beats, about 60-90 s)
1. **Hook + promise:** the topic in a serif headline with one italic word ("Personal loans, *explained.*"), a series tag (amber chip, e.g. "in 90 seconds") and the example's key numbers, over a sketch of the hero and the thing they want.
2. **Meet the hero:** "Rohan needs a *bike*": the object, its ₹ price tag, and the gap ("his savings: ₹0 → a personal loan").
3. **Define it:** three plain features, ticked one at a time.
4. **The offer:** amount, rate and term boxes pop in, with an assumptions footnote.
5. **The real cost:** show the time (one dot per payment), then the total split into what they got and what it cost.
6. **The twin:** "A *second* Rohan" makes the opposite choice with the same money (split-screen sketch).
7. **Ask the viewer:** one question, text only ("How long does he have to *wait?*").
8. **The reveal:** answer in the same visual language (jar fills, the object arrives, "Done.").
9. **Reframe:** two short lines ("Not cheaper. *Sooner.*").
10. **The insight:** turn the cost into a price per month the viewer can judge (two timelines with the gap).
11. **Be fair:** "Sometimes *worth it*", with the honest case.
12. **Generalise:** one rule the viewer can apply (3 / 5 / 7-year bars).
13. **The truth:** a closing line the viewer can repeat, the series tag again, and the assumptions footnote.

## Caricature
- One named, relatable Indian hero (a salaried 28-year-old, a parent, a small-shop owner), drawn as a simple pencil sketch.
- Greyscale sketch world with ONE colour pop on the thing the hero wants (amber #E2B04A).
- The hero appears on the story beats (1, 2, 6, 11). Maths beats use clean hand-drawn diagrams: dot grids, filling jars, hatched bars and timelines.

## Look
- One light ground for the whole reel: white or paper #F7F5EF with faint ruled lines. No dark-green slides, no ground switch for "the fix", no glowing or sci-fi visuals.
- Headline at the top left in a serif (Source Serif 4), 2-5 words, with the key word in coloured italic (green-900 #034620; loss red #A8452A when the word is a loss). Montserrat 700 for small labels, axis ticks and annotations.
- Ink is green-900. Loss figures use the loss red, the "saved / better" side uses green-600 #2D7049, and amber is used for the colour pop and the series tag.
- Every number has a unit (₹, months, years).

## Pace
- About 6-7 s per beat. Each beat builds in 2-3 steps (empty box → ticks → number). A sentence may build across steps ("A loan doesn't buy you money." → "It buys *time.*").
- 60-90 s total. The headline stays put while the visual builds below it.

## Ending
- Beat 13 is the last story frame. After it, cut to the original Accrevise kite -> envelope -> logo outro (from Accrevise_Chatbot_Privacy_Reel_9x16.mp4, from 24.6 s to the end; ask the user to attach it if it isn't available).
- No separate CTA slide. The share/save CTA goes in the caption.
- No logos of other companies; use plain name chips.

## Reel cover
- Use the Accrevise design system's reel cover: white ground, logo centred at the top, a 2-3 word UPPERCASE title in the centre.

## Audio
- Default: a soft pencil/paper sound on each build step and a light page turn between beats, generated in code.
- If the user wants narration: Kokoro TTS (pip kokoro-onnx; model files from the thewh1teagle/kokoro-onnx GitHub releases), voice af_heart, speed ~1.1, one line per beat, and re-time the beats to fit the speech. No sound effects under a voiceover.
- Also offer a silent version so they can add a trending track.

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
