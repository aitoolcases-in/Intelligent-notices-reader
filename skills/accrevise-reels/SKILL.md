---
name: accrevise-reels
description: "Use when making Instagram reels for Accrevise (AI-powered CFO brand): character-led sketch story in 13 beats, one worked example, a 'what if' twin, closing truth line, kite outro."
---

# Accrevise reels

Vertical reels (1080x1920, 30 fps) about money, tax, scams and AI tools for an Indian audience.
Every reel follows a character-and-story flow (13 beats). The full beat sheet is in `docs/accrevise-video-flow.md`.
We borrow only the STORY STRUCTURE from the reference reel we studied. Never use its creator's name or handle, its series tag ("in 90 seconds"), its character, its wording, or its exact look (ruled paper, serif headlines with an italic word, greyscale sketch with a yellow pop). Every frame is unmistakably Accrevise.

## The flow (13 beats, about 60-90 s)
1. **Hook + promise:** kicker "ACCREVISE EXPLAINS", the topic as the headline with one word in the amber marker ("Minimum due, ==explained.=="), the example's key numbers, over a sketch of the hero and the thing they want.
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
- Paper ground #F7F5EF (no ruled lines). Ledger green #034620 ground for the question (beat 7), the twist (beat 9) and the closing truth (beat 13).
- An UPPERCASE kicker above each headline (Montserrat 700, letter-spaced, ink-muted): ACCREVISE EXPLAINS, MEET ROHAN, WHAT IT IS, THE NUMBERS, THE REAL COST, WHAT IF, YOUR GUESS, THE ANSWER, THE TWIST, WHY IT HAPPENS, TO BE FAIR, THE RULE.
- Headline: Montserrat 800, sentence case, ~72 px, green-900, with ONE key word in the amber marker highlight (loss red marker for a loss word).
- Body: Source Serif 4. Labels and annotations: Montserrat 700.
- The brand ring (thin green-300 circle, partly off-canvas) behind each frame; receipts for bills; loss red only for losses; green-600 for the "better" side.
- Transition: the Accrevise green wipe between beats.
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
- Default: a soft pencil sound on each build step and a light whoosh with each green wipe, generated in code.
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
