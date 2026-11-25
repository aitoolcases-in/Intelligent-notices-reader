# "Tired of editing names on the same file?" — placeholder automation (Meera)

Silent reel with on-screen captions (`Accrevise_Placeholder_Automation_silent_9x16.mp4`, ~78 s incl. kite outro). Record the voiceover below in Instagram Edits if you want one.

## Voiceover to record (timestamps = where each screen starts)

[0:00] Hook
Tired of editing names on the same file, again and again? You can automate it. And you don't need to be a coder.

[0:05] Meera's monthly grind
Meet Meera. Every month, she sends the same fee letter to forty clients. Open, change the name, month and amount, save. Forty times.

[0:11] The idea
Here's the trick. It's called a placeholder. Write the letter once, and leave blanks in curly brackets: Name, Month, Amount.

[0:17] The list
Then make one Excel sheet, one row per client. The column names match the placeholders.

[0:22] Step 1: Ask Claude
Now ask Claude: write a script that fills my template from my Excel list, one file per client, and explain step by step how to run it, because I'm not a coder.

[0:30] Claude replies
Claude writes the code for you. You don't need to read it. Just save it.

[0:36] Step 2: one-time setup
To run it offline: install Python once, it's free. Then put the three files in one folder.

[0:43] Two commands
In the folder's address bar, type cmd. Run the install line once, then python make_letters.py. That's it.

[0:51] Result
Forty letters, in seconds.

[0:57] Good to know
And it runs on your own computer. Claude only needs your column names, not your client data. Just check the first few letters.

[1:02] The point
You didn't write code. You just asked clearly.

[1:07] CTA
Want the full guide with the prompt? Comment TEMPLATE.

## Instagram caption
Editing the same file 40 times every month? Automate it. No coding needed 👇

Meera sends the same fee letter to 40 clients every month: open, change name, month, amount, save… 40 times.

The trick is called a placeholder:
1️⃣ Write the letter once with blanks: {{Name}}, {{Month}}, {{Amount}}
2️⃣ Make an Excel list, one row per client (same column names)
3️⃣ Ask Claude: "Write a Python script that fills template.docx from clients.xlsx and saves one file per client. I'm not a coder, explain step by step how to run it."
4️⃣ Run it offline:
• Install Python once (free, python.org; tick "Add Python to PATH")
• Put the 3 files in one folder
• Type cmd in the folder's address bar
• Run: pip install python-docx openpyxl (first time only)
• Then: python make_letters.py
(Mac: open Terminal in the folder and use python3)

40 letters in seconds 📄
🔒 It runs on your computer. Claude only needs your column names, not your client data. Check the first few files before sending.

You didn't write code. You asked clearly.

📌 Save this for your next month-end
💬 Comment "TEMPLATE" for the full guide + prompt

#automation #notechskills #claudeai #accountants #productivity #msme #smallbusinessindia #accrevise

**Pinned comment:** What file do you edit the same way every month: invoices, letters, certificates or reports? 👇

**Cover text:** 40 LETTERS IN 10 SECONDS

## Notes
- Works for Word (.docx) templates; the same idea works for Excel or PDF forms. Ask Claude for your exact file type.
- Only use "Comment TEMPLATE" if a guide will actually be sent.
