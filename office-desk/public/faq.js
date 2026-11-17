// Ready-made questions and answers for the help desk.
// Edit freely: each entry has a topic, the question as shown, extra words people might type (keys),
// the answer (supports **bold**, "- " bullets and "1. " numbered lines),
// and email: true when the case needs a person at the office to look at it.

export const TOPICS = [
  ["start", "Getting started"],
  ["itr", "Income tax return"],
  ["gst", "GST"],
  ["notice", "Notices"],
  ["trademark", "Trademark"],
  ["loans", "Loans"],
  ["docs", "Sending documents"],
  ["books", "Accounting & billing"],
  ["office", "Fees, timing & contact"],
];

export const FAQ = [
  // Getting started
  { topic: "start", q: "What services does the office provide?", keys: "services offer help what do you do",
    a: "We handle:\n- Income tax returns (salaried, business, capital gains)\n- GST registration and monthly/quarterly returns\n- Replies to income tax and GST notices\n- Contracts and agreements\n- Trademark filing\n- Loan files with banks and NBFCs\n- Accounting, billing and bookkeeping" },
  { topic: "start", q: "How do I start working with you?", keys: "onboard new client begin start register join",
    a: "1. Tell us the service you need (pick a topic in this chat).\n2. We send you a document checklist.\n3. Share the documents by email or WhatsApp.\n4. A team member is assigned and keeps you updated here under **My updates**." },
  { topic: "start", q: "How do I tell you what I have sent or done?", keys: "update sent uploaded share progress status tell",
    a: "Type it here, for example **“Sent bank statements for October”**, and press **Save as update**. Or open **My updates** and fill the short form. The team sees it the same day." },
  { topic: "start", q: "How will I know the status of my work?", keys: "status progress where is my file track",
    a: "Your assigned team member updates you after each step. For the exact status of your file, email the office with your name and service and we reply within one working day.", email: true },

  // ITR
  { topic: "itr", q: "Which documents do I need for my income tax return?", keys: "itr documents papers needed checklist income tax return file",
    a: "**Basic**\n- PAN and Aadhaar (mobile linked to Aadhaar)\n- Bank account details for refund\n\n**Income**\n- Form 16 from employer / salary slips\n- Bank statements and interest certificates\n- Capital gains statement from broker or mutual fund\n- Rent received details, if any\n- Profit & loss and books, if you have a business\n\n**Deductions (old regime)**\n- 80C proofs (PPF, LIC, ELSS, tuition fees)\n- Health insurance (80D), home loan interest certificate, donations\n\n**Last year's** ITR acknowledgement, if filed elsewhere." },
  { topic: "itr", q: "What is the last date to file the income tax return?", keys: "due date deadline last date itr july october",
    a: "- **31 July** for most individuals (no audit)\n- **31 October** if your accounts need a tax audit\n- **31 December** for a late (belated) or revised return, with a late fee\n\nThe government sometimes extends these dates. We remind you in advance." },
  { topic: "itr", q: "What happens if I file late?", keys: "late fee penalty missed deadline 234f",
    a: "- Late fee of **₹5,000** (₹1,000 if total income is up to ₹5 lakh)\n- Interest on any unpaid tax\n- Some losses cannot be carried forward\n\nAfter 31 December you can still file an **updated return (ITR-U)** with extra tax." },
  { topic: "itr", q: "Old regime or new regime: which is better for me?", keys: "old new regime tax slab choose which better",
    a: "The **new regime** is the default and has lower rates: income up to **₹12 lakh** is tax-free (₹12.75 lakh for salaried) for FY 2025-26. The **old regime** can be better if you claim large deductions such as home loan interest, 80C and HRA.\n\nWe compare both for you before filing. For a calculation on your numbers, email us your Form 16 and deduction proofs.", email: true },
  { topic: "itr", q: "When will I get my refund?", keys: "refund when not received delay",
    a: "Refunds usually arrive within **4–6 weeks** after the return is e-verified and processed. Make sure your bank account is **pre-validated** on the income tax portal. If it has been longer than 2 months, email us and we will check the status.", email: true },
  { topic: "itr", q: "What is e-verification and why is it needed?", keys: "e verify verification otp aadhaar itr-v",
    a: "After filing, the return must be **verified within 30 days**, usually with an Aadhaar OTP on your linked mobile. If it is not verified, the return is treated as **not filed**. We will ask you for the OTP on a call; never share OTPs in chat or email." },
  { topic: "itr", q: "What is AIS and why do you ask for it?", keys: "ais tis 26as annual information statement",
    a: "The **Annual Information Statement (AIS)** shows everything the tax department knows about you: salary, interest, dividends, share sales, property deals. We match your return with it so you do not get a mismatch notice later." },

  // GST
  { topic: "gst", q: "Do I need GST registration?", keys: "gst registration required threshold need limit",
    a: "Registration is required if your yearly turnover crosses:\n- **₹40 lakh** for goods (₹20 lakh in some special category states)\n- **₹20 lakh** for services (₹10 lakh in special category states)\n\nIt is also required for inter-state sales of goods, e-commerce sellers and some other cases, whatever the turnover." },
  { topic: "gst", q: "Which documents are needed for GST registration?", keys: "gst registration documents papers new",
    a: "- PAN and Aadhaar of the owner / partners / directors\n- Photo of each\n- Business address proof (electricity bill + rent agreement or ownership proof, NOC from owner)\n- Bank statement or cancelled cheque\n- Partnership deed / incorporation certificate, if not a proprietor\n- Email and mobile for OTPs" },
  { topic: "gst", q: "What do you need from me every month for GST?", keys: "monthly gst data send every month need from me return due",
    a: "By the **5th of every month**, send:\n- All sales invoices / sales register\n- All purchase and expense bills\n- Credit and debit notes\n- Bank statement for the month\n\nThis lets us file GSTR-1 by the 11th and GSTR-3B by the 20th." },
  { topic: "gst", q: "What are the GST return due dates?", keys: "gst due date gstr1 gstr3b 11th 20th qrmp",
    a: "**Monthly filers**\n- GSTR-1 (sales): 11th of next month\n- GSTR-3B (tax payment): 20th of next month\n\n**Quarterly (QRMP) filers**\n- GSTR-1: 13th after the quarter\n- GSTR-3B: 22nd or 24th after the quarter\n- Tax for months 1 and 2: 25th of next month\n\n**Annual return** GSTR-9: 31 December." },
  { topic: "gst", q: "Why can't I claim input credit on some purchase bills?", keys: "input tax credit itc missing 2b supplier not filed",
    a: "Credit is allowed only when the bill appears in your **GSTR-2B**, which happens after your supplier files their GSTR-1. Ask the supplier to file it. Also, the supplier must be paid within **180 days**, or the credit has to be reversed." },
  { topic: "gst", q: "What is the late fee for GST returns?", keys: "gst late fee penalty interest",
    a: "- **₹50 per day** of delay (₹20 per day for nil returns), subject to a cap\n- **18% yearly interest** on tax paid late\n\nReturns older than 3 years cannot be filed at all, so do not leave them pending." },
  { topic: "gst", q: "What are the current GST rates?", keys: "gst rate slab 5 18 40 percentage",
    a: "From 22 September 2025 the main rates are **5%** and **18%**, with **40%** on luxury and sin goods. Some items are at 0% or 3% (gold). The rate depends on the HSN/SAC code of your product or service; email us the item list if you are unsure.", email: true },

  // Notices
  { topic: "notice", q: "I received an income tax notice. What should I do?", keys: "income tax notice received letter 143 148 139 scrutiny",
    a: "1. **Do not ignore it.** Every notice has a reply deadline.\n2. Note the notice number, section and due date.\n3. Email a copy (PDF or clear photo) to the office today, with your PAN.\n4. We read it, tell you what documents are needed, and prepare the reply.\n\nCommon ones: **139(9)** defective return (15 days), **143(1)(a)** mismatch (30 days), **143(2)** scrutiny, **148A** reassessment.", email: true },
  { topic: "notice", q: "I received a GST notice. What should I do?", keys: "gst notice asmt drc show cause scn",
    a: "1. Download the notice from the GST portal (Services → User services → View notices).\n2. Note the form (ASMT-10, DRC-01A, DRC-01, REG-03…) and the due date.\n3. Email it to the office immediately.\n\nMost GST notices must be answered within **7–30 days**.", email: true },
  { topic: "notice", q: "Can you draft a reply to my notice?", keys: "draft reply response notice letter",
    a: "Yes. We draft a point-by-point reply with supporting documents and file it on the portal for you. Each case is different, so please email the notice and your documents to the office.", email: true },

  // Contracts
  { topic: "notice", q: "Can you draft an agreement or contract?", keys: "contract agreement draft rent partnership deed nda service",
    a: "Yes: rent agreements, partnership deeds, service agreements, NDAs, vendor and employment contracts. Email us:\n- Names, addresses and PAN of all parties\n- What is being agreed (work, amount, duration)\n- Payment terms and any special conditions\n\nStamp duty depends on your state; we tell you the amount.", email: true },

  // Trademark
  { topic: "trademark", q: "How do I register a trademark?", keys: "trademark register brand name logo protect",
    a: "1. We search the trademark database for similar names.\n2. We choose the right **class** for your goods or services.\n3. You sign an authorisation (TM-48) and we file the application (TM-A).\n4. You get an application number the same day and can use **™**.\n5. The registry examines it, publishes it, and if no one objects in 4 months, it is registered. Then you can use **®**." },
  { topic: "trademark", q: "What documents are needed for a trademark?", keys: "trademark documents papers needed",
    a: "- Brand name, and logo in JPG if you have one\n- Applicant name, address and PAN (or company / firm documents)\n- Udyam (MSME) or startup certificate, for the lower government fee\n- Date you started using the brand, with an old invoice or ad as proof, if any" },
  { topic: "trademark", q: "How long does trademark registration take and what is the government fee?", keys: "trademark time how long fee fees cost price government",
    a: "- Government fee: **₹4,500 per class** for individuals, startups and small businesses; **₹9,000** for others.\n- Time: usually **8–18 months** if there is no objection. You can use ™ from the day of filing.\n- Registration is valid for **10 years** and can be renewed." },
  { topic: "trademark", q: "I received an objection on my trademark.", keys: "trademark objection examination report hearing opposition",
    a: "An examination report must be answered within **1 month**. Email us the report and we draft the reply. If there is a hearing or an opposition, we represent you.", email: true },

  // Loans
  { topic: "loans", q: "Which documents are needed for a business loan?", keys: "business loan documents msme working capital cc od term",
    a: "- KYC: PAN, Aadhaar, photos of owners/partners/directors\n- Business proof: GST certificate, Udyam, partnership deed / company documents\n- **ITR with computation – last 2–3 years**\n- Audited balance sheet and P&L – last 2–3 years\n- **Bank statements – last 12 months** (all accounts)\n- GSTR-3B for the last 12 months\n- Existing loan sanction letters and repayment schedules\n- Property papers, if offering security" },
  { topic: "loans", q: "Which documents are needed for a home loan?", keys: "home loan housing documents property",
    a: "- KYC and photos\n- Salaried: 3 salary slips, Form 16 (2 years), 6 months bank statement\n- Self-employed: 2–3 years ITR and financials, 12 months bank statement\n- Property: sale agreement, title chain, approved plan, tax receipts, builder NOC\n- Own contribution proof (receipts of amount paid)" },
  { topic: "loans", q: "How much loan can I get?", keys: "loan eligibility amount how much emi foir cibil",
    a: "It depends on income, existing EMIs and credit score. Roughly, banks allow total EMIs up to **50–60% of monthly income**, and prefer a CIBIL score of **750+**. Send us your last 2 ITRs and current EMIs by email and we work out the eligible amount and best lenders.", email: true },
  { topic: "loans", q: "Bank or NBFC: which should I choose?", keys: "bank nbfc difference choose which",
    a: "- **Banks:** lower interest, stricter documents, slower.\n- **NBFCs:** faster approval, more flexible on documents, slightly higher interest.\n\nWe compare 2–3 lenders and share the rates, fees and conditions before you apply." },
  { topic: "loans", q: "Why should I not apply to many banks at once?", keys: "many banks cibil enquiry score drop",
    a: "Each application makes the lender check your credit report. Many checks in a short time **lower your credit score** and make lenders cautious. We shortlist and apply only where approval is likely." },

  // Documents
  { topic: "docs", q: "How should I send my documents?", keys: "send documents share upload how email whatsapp",
    a: "- Email them to the office address, or WhatsApp them to your assigned team member.\n- Send **PDFs or clear photos**, all pages, not cut at the edges.\n- If a PDF has a password, share the password on a phone call, not in the same message.\n- Never send OTPs, net-banking passwords or card numbers." },
  { topic: "docs", q: "How do I download my bank statement as PDF?", keys: "bank statement download pdf netbanking",
    a: "In net banking or the bank app: **Accounts → Statement → choose dates → Download as PDF**. Choose the full period we asked for (for example 1 April to 31 March). Most statements are password-protected with your customer ID or date of birth." },
  { topic: "docs", q: "How do I download Form 26AS / AIS?", keys: "download 26as ais how portal",
    a: "1. Log in at incometax.gov.in with PAN and password.\n2. **e-File → Income Tax Returns → View Form 26AS**, or **Services → Annual Information Statement**.\n3. Choose the year and download PDF.\n\nIf you prefer, give us access on a call and we download it for you." },

  // Accounting & billing
  { topic: "books", q: "Do you maintain accounts and books?", keys: "accounting bookkeeping tally zoho books maintain",
    a: "Yes. We keep your books in Tally or Zoho Books, reconcile your bank every month, record GST and TDS, and send a monthly summary of sales, expenses, profit and pending payments. Send bills and bank statements by the 5th of each month." },
  { topic: "books", q: "What must a GST invoice show?", keys: "invoice bill format gst mandatory fields",
    a: "- Your name, address and GSTIN\n- Invoice number (unique, up to 16 characters) and date\n- Buyer's name, address and GSTIN (for business buyers)\n- Place of supply\n- HSN/SAC, description, quantity, value\n- GST rate and CGST/SGST or IGST amounts\n- Total in figures and words, and signature" },
  { topic: "books", q: "Do I need e-invoicing or e-way bills?", keys: "e invoice einvoice irn eway e-way bill",
    a: "- **E-invoicing** is required when your yearly turnover is above **₹5 crore**.\n- An **e-way bill** is needed to move goods worth more than **₹50,000** in one consignment." },
  { topic: "books", q: "What is TDS and when do I deduct it?", keys: "tds deduct 194c 194j rent contractor professional",
    a: "TDS is tax you cut from certain payments and deposit with the government, for example contractor payments (194C), professional fees (194J), rent (194I) and commission (194H). Deposit it by the **7th of next month** and file quarterly returns. Thresholds and rates vary; email us your payment list if unsure.", email: true },

  // Office
  { topic: "office", q: "What are your fees?", keys: "fees charges cost price how much pay",
    a: "Fees depend on the service and the size of the work. Email the office with what you need and we send a written quote, usually the same day.", email: true },
  { topic: "office", q: "What are the office hours?", keys: "office hours timing open time working",
    a: "Monday to Saturday, 10 am to 7 pm. Questions sent after hours are answered the next working day." },
  { topic: "office", q: "How do I talk to a person?", keys: "talk person human call contact speak someone",
    a: "Email the office with your name, phone number and question. Someone from the team will call or reply within one working day.", email: true },
];

/** Words people type that mean "please record this as an update". */
export const UPDATE_WORDS = ["sent", "send you", "uploaded", "shared", "emailed", "whatsapped", "submitted", "paid", "finished", "completed", "done with", "filed", "log:"];

/** Words that point to a case-specific or technical question that needs a person. */
export const TECH_WORDS = ["my case", "my file", "calculate", "calculation", "how much tax", "will i pay", "my income", "my rental", "my salary", "my business", "liable", "should i", "legal opinion", "section", "penalty on me", "my notice", "assessment order", "appeal", "tribunal", "demand", "refund status"];

const STOP = new Set("a an the is are am i me my we our you your of to for in on at and or do does did can could will would should what which when where why how it this that be with from have has please tell about need want get".split(" "));
const words = (s) => String(s).toLowerCase().replace(/[^a-z0-9₹ ]+/g, " ").split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w));

/** Find the best ready-made answers for a typed question. */
export function searchFaq(text, limit = 3) {
  const want = words(text);
  if (!want.length) return [];
  return FAQ.map((f) => {
    const hay = new Set(words(f.q + " " + f.keys));
    let score = 0;
    for (const w of want) {
      if (hay.has(w)) score += 2;
      else if ([...hay].some((h) => h.length > 3 && (h.startsWith(w) || w.startsWith(h)))) score += 1;
    }
    return { f, score: score / Math.max(2, want.length) };
  }).filter((r) => r.score >= 0.6).sort((a, b) => b.score - a.score).slice(0, limit).map((r) => r.f);
}
