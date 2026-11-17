# Edit videos with Claude Code — Accrevise reel

**On-screen hook (beat 1):** Edit videos with Claude Code. · End to end · One Skill

**Spoken hook to record (optional):** "Rohan spent two hours editing every reel. Now he types one line."

## Caption
Same edits on every reel? Trim pauses, add logo, add title, export. Teach Claude Code once.

Step 1: Make a folder: my-reels/ with raw/ (clips), brand/ (logo), final/
Step 2: Install Claude Code + FFmpeg
  Mac/Linux: curl -fsSL https://claude.ai/install.sh | bash
  Windows: irm https://claude.ai/install.ps1 | iex
  FFmpeg: brew install ffmpeg (Mac) · winget install Gyan.FFmpeg (Windows)
Step 3: In the folder, type: claude (log in)
Step 4: "Make a skill called reel-editor: cut pauses over 1 second, put brand/logo.png top-left, add the title I give you, export 1080×1920 to final/"
Step 5: /reel-editor raw/day1.mp4 "Your title"

Watch every reel before posting. If something's off, tell Claude and ask it to update the Skill.

Save this, and send it to someone who edits reels every night 🎬
What edit do you repeat on every video? 👇

#claudecode #claudeai #aitools #reelsediting #contentcreator #smallbusinessindia #accrevise

## Post at
Weekdays 7–9 PM IST or Sunday 10 AM–12 PM, then adjust from your Insights.

## Notes and assumptions (also on the last frame)
Illustrative times (2 hours editing → ~10 minutes checking). Claude Code needs a paid Claude plan or an API account. Install commands as of Nov 2026; check code.claude.com/docs. A project Skill lives at .claude/skills/<name>/SKILL.md and its folder name becomes the slash command (/reel-editor). FFmpeg does the actual cutting; Claude writes and runs the FFmpeg commands. Captions from speech would need an extra speech-to-text tool and are not shown.

## Voiceover script (Kokoro af_heart, speed 0.95, one line per beat)
1. Editing videos with Claude Code, explained.
2. Rohan films reels for his shop. Editing each one takes him two hours.
3. And it's the same edits every time. Trim the pauses. Add his logo. Add a title. Export for Instagram.
4. Now meet a second Rohan. He teaches Claude Code those edits once, as a Skill.
5. Step one. Make a folder. Raw clips go in one folder, your logo in another.
6. Step two. Install Claude Code, and F F mpeg, the free tool that does the actual cutting.
7. Step three. Open the folder in your terminal, type claude, and log in.
8. Step four. Ask Claude to make the Skill. Describe your edits in plain words.
9. Claude saves it as a file in your folder, so it remembers next time.
10. Now Rohan just types: slash reel editor, and the clip's name. Claude runs F F mpeg, and saves the reel.
11. Two hours of editing, down to about ten minutes of checking.
12. To be fair, watch every reel before posting. If something's off, tell Claude, and ask it to update the Skill.
13. Teach the edit once. Post every day.

## Sources
- https://code.claude.com/docs/en/skills
- https://code.claude.com/docs (install and setup)
