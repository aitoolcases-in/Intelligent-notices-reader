/* ---------------- Training content ---------------- */
export const AREAS = [
  ["itr","Income tax returns"],["gst","GST returns"],["drafting","Contracts & notice replies"],
  ["trademark","Trademark filing"],["loans","Bank & NBFC loans"],["docs","Document preparation"],
  ["accounting","Accounting"],["billing","Billing & invoicing"],["calling","Cold calling"],["other","Other"]
];
export const AREA_NAME = Object.fromEntries(AREAS);

export const MODULES = [
{id:"itr",title:"Filing income tax returns",tag:"ITR",
 intro:"Income earned from 1 April 2025 to 31 March 2026 (FY 2025-26, AY 2026-27) is filed under the Income-tax Act, 1961. From 1 April 2026 the new Income-tax Act, 2025 applies: “previous year” and “assessment year” become a single “tax year”, and section numbers change. Income of tax year 2026-27 is filed in 2027. Always check which Act a client's year falls under.",
 steps:[
  "Collect documents from the client (see checklist) and confirm PAN–Aadhaar link and bank account pre-validation on incometax.gov.in.",
  "Download AIS, TIS and Form 26AS. Match every TDS entry, interest, dividend and high-value transaction with the client's papers. Ask the client about anything that does not match.",
  "Choose the form: ITR-1 (salary, one house, other sources, income up to ₹50 lakh), ITR-2 (capital gains, more than one house, foreign assets), ITR-3 (business or profession), ITR-4 (presumptive 44AD/44ADA/44AE, up to ₹50 lakh), ITR-5 (firm/LLP), ITR-6 (company), ITR-7 (trust).",
  "Compute income under both regimes. The new regime is the default; a salaried person can choose the old regime while filing. Business taxpayers switch using Form 10-IEA.",
  "Pay any self-assessment tax through e-Pay Tax (Challan 280) before submitting, and enter the challan details in the return.",
  "File the return, then e-verify the same day (Aadhaar OTP, net banking or EVC). A return not verified within 30 days is treated as not filed.",
  "Send the client the ITR-V acknowledgement and computation, and log the acknowledgement number in the file."],
 docs:["PAN, Aadhaar, mobile linked to Aadhaar","Form 16 / 16A, salary slips","Bank statements and interest certificates","AIS, TIS, Form 26AS","Capital gains statements from broker / mutual fund (CAMS, KFintech)","Rent receipts, home loan interest certificate","Investment proofs for old regime (80C, 80D, etc.)","Books of account / P&L for business income","Previous year's ITR and computation"],
 facts:[["Due date – non-audit cases","31 July (check for extensions each year)"],["Due date – audit cases","31 October"],["Belated / revised return","31 December of the assessment year"],["Updated return (ITR-U)","Up to 48 months from end of the assessment year"],["Late fee u/s 234F","₹5,000 (₹1,000 if total income ≤ ₹5 lakh)"],["New regime, FY 2025-26","No tax up to ₹12 lakh after 87A rebate; salaried get ₹75,000 standard deduction (so ₹12.75 lakh)"],["New regime slabs FY 2025-26","0–4L nil · 4–8L 5% · 8–12L 10% · 12–16L 15% · 16–20L 20% · 20–24L 25% · above 24L 30%"]],
 mistakes:["Filing without matching AIS, which triggers a 143(1)(a) mismatch notice","Forgetting to e-verify","Missing exempt income or savings interest","Wrong form, for example ITR-1 when there are capital gains","Claiming old-regime deductions after choosing the new regime"],
 quiz:[
  {q:"A salaried client sold mutual funds this year. Which form?",o:["ITR-1","ITR-2","ITR-4"],a:1,why:"Capital gains above the small 112A allowance take the client out of ITR-1; with no business income it is ITR-2."},
  {q:"The return was filed but not e-verified for 35 days. What is its status?",o:["Valid","Treated as not filed","Defective u/s 139(9)"],a:1,why:"Verification is due within 30 days of filing; after that the return is treated as never filed."},
  {q:"Which statement shows every reported transaction of a taxpayer?",o:["Form 16","AIS","ITR-V"],a:1,why:"The Annual Information Statement lists TDS, interest, dividends, securities and other reported transactions."}]},

{id:"gst",title:"Filing GST returns",tag:"GST",
 intro:"Every regular GST taxpayer reports sales in GSTR-1 and pays tax through GSTR-3B. Purchases are claimed as input tax credit (ITC) only when they appear in GSTR-2B. Since 22 September 2025 the main GST rates are 5% and 18%, with 40% on luxury and sin goods.",
 steps:[
  "By the 5th: collect the sales register, purchase bills, debit and credit notes, and bank statement for the month.",
  "Prepare GSTR-1 from sales invoices: B2B with buyer GSTIN, B2C, exports, credit/debit notes, HSN summary and document summary. Upload and file it.",
  "Open the Invoice Management System (IMS) and accept, reject or keep pending each supplier invoice. Then check GSTR-2B.",
  "Reconcile the purchase register with GSTR-2B. Claim ITC only for bills in 2B that meet section 16 conditions (invoice held, goods/services received, supplier has paid tax, payment made within 180 days).",
  "Prepare GSTR-3B. Output tax auto-fills from GSTR-1 and is locked, so correct mistakes through GSTR-1A before filing 3B.",
  "Set off ITC, pay the balance in cash through the electronic cash ledger, and file 3B with EVC or DSC.",
  "Save the filed returns and challans in the client folder and update the compliance tracker."],
 docs:["Sales register / invoices","Purchase invoices and expense bills","Credit and debit notes","Bank statement","E-way bills and e-invoices (IRN) if applicable","Previous month's GSTR-3B","GSTR-2B download"],
 facts:[["GSTR-1 (monthly)","11th of next month"],["GSTR-1 / IFF (QRMP)","13th of month after the quarter (IFF optional for months 1–2)"],["GSTR-3B (monthly)","20th of next month"],["GSTR-3B (QRMP)","22nd or 24th after the quarter, by state"],["PMT-06 (QRMP months 1–2)","25th of next month"],["CMP-08 (composition)","18th after the quarter; GSTR-4 annual by 30 April"],["GSTR-9 / 9C","31 December; 9 mandatory above ₹2 crore, 9C above ₹5 crore"],["Late fee / interest","₹50 per day (₹20 for nil returns), interest 18% p.a."],["Time bar","Returns cannot be filed after 3 years from the due date"]],
 mistakes:["Claiming ITC that is not in GSTR-2B","Typing the wrong buyer GSTIN in GSTR-1","Filing 3B before fixing errors in GSTR-1","Ignoring rejected invoices in IMS","Missing the HSN summary"],
 quiz:[
  {q:"A supplier's bill is missing from GSTR-2B. Can the client claim ITC this month?",o:["Yes, the bill is enough","No, wait until it shows in 2B","Only half"],a:1,why:"ITC follows GSTR-2B (section 16(2)(aa)); ask the supplier to report the invoice."},
  {q:"GSTR-3B output tax looks wrong because of a GSTR-1 error. What do you do?",o:["Edit 3B directly","Amend through GSTR-1A, then file 3B","Ignore it"],a:1,why:"Auto-filled liability in 3B is locked; correct it through GSTR-1A."},
  {q:"Monthly GSTR-3B is due on…",o:["11th","20th","25th"],a:1,why:"The 20th for monthly filers; the 11th is GSTR-1."}]},

{id:"drafting",title:"Drafting contracts and replies to notices",tag:"Drafting",
 intro:"Two kinds of drafting come to the office: agreements between parties, and replies to tax notices. Both need facts first, then structure, then careful wording. Never miss a notice deadline; ask for an adjournment in writing if more time is needed.",
 steps:[
  "Read the whole document. For a notice, note the section, DIN or reference number, issue date, reply due date and the exact information asked.",
  "Enter the due date in the compliance tracker immediately and tell the senior.",
  "Collect facts and documents from the client: invoices, ledgers, bank entries, agreements.",
  "Draft a reply in this order: reference details, brief facts, point-by-point reply in the notice's own order, legal grounds (sections, circulars, case law), list of annexures, request (prayer), signature of the authorised representative.",
  "Contracts: start from the firm's template, then fill parties, recitals, scope of work, payment terms, term and termination, confidentiality, IP ownership, indemnity, limitation of liability, dispute resolution (arbitration seat and law), notices clause, signatures.",
  "Get the draft reviewed by a senior before it goes out.",
  "Submit the reply on the portal (Income tax: e-Proceedings; GST: reply form under the notice), download the acknowledgement and save it to the file. For contracts, check stamp duty under the state's Stamp Act (e-stamp paper)."],
 docs:["Copy of the notice / earlier agreement","Return, computation and AIS for the year in question","Ledgers, invoices, bank statements supporting each point","Authorisation / vakalatnama if appearing for client","Party details: legal names, addresses, PAN/GSTIN, signatory authority"],
 facts:[["Defective return u/s 139(9)","Reply within 15 days"],["Proposed adjustment u/s 143(1)(a)","Reply within 30 days"],["Scrutiny u/s 143(2) / 142(1)","Reply by the date in the notice"],["Reassessment u/s 148A","Show-cause reply by the date given (usually 7–30 days)"],["GST ASMT-10 (scrutiny)","Reply in ASMT-11 within 30 days"],["GST DRC-01A / DRC-01","Pre-SCN intimation / show cause; reply in DRC-01A part B / DRC-06"],["From tax year 2026-27","Income-tax Act, 2025 section numbers apply; quote the section printed on the notice"]],
 mistakes:["Missing the due date","Replying in general terms instead of point by point","Not attaching evidence for each claim","Admitting liability by mistake in wording","Contract with no termination or dispute clause"],
 quiz:[
  {q:"Defective return notice u/s 139(9). Reply within?",o:["15 days","30 days","90 days"],a:0,why:"The default time is 15 days unless extended."},
  {q:"Best structure for a notice reply?",o:["One paragraph summary","Point-by-point in the notice's order, with annexures","Only attach documents"],a:1,why:"Officers check each point; answering in their order with evidence avoids follow-ups."},
  {q:"Which clause says where disputes are decided?",o:["Indemnity","Dispute resolution / jurisdiction","Force majeure"],a:1,why:"It fixes arbitration, seat and governing law."}]},

{id:"trademark",title:"Filing a trademark",tag:"Trademark",
 intro:"A trademark protects a brand name, logo or tagline. Applications are filed online with the Trade Marks Registry (IP India) in Form TM-A. Goods fall in classes 1–34 and services in 35–45.",
 steps:[
  "Get the exact mark from the client: word, logo file (JPG), tagline, and what goods or services it is used for.",
  "Run a public search on the IP India site for identical and similar marks in the relevant class. Share the search result and risk with the client.",
  "Pick the class(es) and write a clear specification of goods/services.",
  "Decide the date of use: “proposed to be used”, or the actual first-use date backed by a user affidavit and evidence (invoices, ads).",
  "Prepare Form TM-48 (authorisation of agent) for client signature, and get the MSME/Udyam or startup certificate if claiming the lower fee.",
  "File TM-A online, pay the fee, and save the application number and receipt. The client may use ™ from now; ® only after registration.",
  "Track the application: examination report → reply within 1 month → hearing if needed → acceptance and publication in the Trade Marks Journal → 4 months for opposition → registration certificate."],
 docs:["Applicant name, address, nationality / entity type","Logo in JPG (if device mark)","Udyam / DPIIT startup certificate for reduced fee","Signed TM-48 power of attorney","User affidavit and proof of use if claiming prior use"],
 facts:[["Fee per class (e-filing)","₹4,500 for individuals, startups, small enterprises; ₹9,000 for others"],["Examination report reply","Within 1 month"],["Opposition window","4 months from journal publication"],["Validity","10 years, renewable (TM-R)"],["Symbols","™ after filing, ® only after registration"]],
 mistakes:["Skipping the search","Wrong class or vague specification","Claiming prior use without evidence","Missing the examination report deadline"],
 quiz:[
  {q:"A café wants to protect its name. Which class?",o:["Class 30","Class 43","Class 35"],a:1,why:"Class 43 covers services for providing food and drink."},
  {q:"When can the client use ®?",o:["After filing","After registration","After publication"],a:1,why:"® is only for registered marks; using it earlier is an offence."},
  {q:"How long is the opposition period?",o:["30 days","4 months","1 year"],a:1,why:"Four months from publication in the Trade Marks Journal."}]},

{id:"loans",title:"Applying loan files with banks and NBFCs",tag:"Loans",
 intro:"We help clients pick the right lender, prepare a complete file and follow it to disbursement. Banks are usually cheaper but slower and stricter; NBFCs are faster and more flexible on documents but cost more.",
 steps:[
  "Understand the need: purpose, amount, tenure, security offered, existing EMIs.",
  "Check eligibility: CIBIL score (750+ preferred), income from last 2–3 ITRs, FOIR (total EMIs ÷ income, usually up to 50–60%), DSCR for business loans (1.25 or more).",
  "Shortlist 2–3 lenders by product, rate, processing fee and turnaround. Share a comparison with the client.",
  "Prepare the file using the document checklist. Number and index every document.",
  "Log in the file with the lender and note the application / lead ID in the tracker.",
  "Support verification: personal discussion, field visit, and technical and legal checks of property for secured loans. Answer queries the same day.",
  "Review the sanction letter with the client (rate, fees, prepayment terms, conditions), complete the agreement and pre-disbursement conditions, and follow up until disbursement."],
 docs:["KYC: PAN, Aadhaar, photos, address proof","ITR with computation – last 2–3 years","Salary slips (3 months) and Form 16 for salaried","Bank statements – 6 to 12 months","Audited balance sheet, P&L and tax audit report – 2–3 years","GST registration and GSTR-3B for 12 months","Udyam certificate, business proof, partnership deed / MOA-AOA","Existing loan sanction letters and repayment schedules","Property papers: sale deed, chain documents, approved plan, tax receipts, NOC","CMA data / projections for working capital"],
 facts:[["Home loan LTV","Up to 90% (≤ ₹30 lakh), 80% (₹30–75 lakh), 75% (above ₹75 lakh)"],["Working capital","Cash credit / overdraft, renewed yearly; needs stock statements"],["MSME collateral-free","CGTMSE guarantee cover through banks"],["Every hard enquiry","Pulls the CIBIL score slightly; avoid applying to many lenders at once"]],
 mistakes:["Applying to many lenders at once","Bank statements with unexplained cash deposits or bounces","Income in ITR lower than what the loan needs","Missing pages or unsigned documents","Not reading the sanction conditions"],
 quiz:[
  {q:"Client earns ₹1,00,000 a month with ₹20,000 existing EMIs. At 50% FOIR, the maximum new EMI is…",o:["₹50,000","₹30,000","₹20,000"],a:1,why:"50% of ₹1,00,000 is ₹50,000; minus ₹20,000 existing EMIs leaves ₹30,000."},
  {q:"Which document shows repayment capacity of a business?",o:["Aadhaar","ITR with audited financials","Udyam certificate"],a:1,why:"Lenders assess income and cash flow from ITRs, financials and bank statements."},
  {q:"Why not send the file to 8 lenders the same week?",o:["It is illegal","Multiple hard enquiries reduce the credit score","Banks share files"],a:1,why:"Each lender pulls the bureau report; many enquiries signal credit hunger."}]},

{id:"docs",title:"Preparing documents for ITR and loan files",tag:"Documents",
 intro:"A clean file gets filed or sanctioned faster. Every document should be complete, readable, correctly named and stored in the client's folder.",
 steps:[
  "Send the client the checklist for the service on WhatsApp or email, with one deadline.",
  "On receipt, tick each item and list what is missing in one message (not one item at a time).",
  "Check quality: all pages, readable scans, signatures where needed, correct financial year, statements covering the full period.",
  "Remove PDF passwords (keep a note of them in the client record, never in chat groups) and merge pages of the same document.",
  "Name files the same way every time: ClientName_DocType_Period, e.g. SharmaTraders_BankStmt_Apr25-Mar26.pdf.",
  "Store in the client folder: /Client/Year/Service/. Keep originals separate from working copies.",
  "Prepare a one-page index for loan files and a computation summary for ITR files."],
 docs:["Service checklist (ITR / GST / loan)","Client folder created","Index sheet","Missing-items message sent","Password notes in the client record"],
 facts:[["File naming","ClientName_DocType_Period.pdf"],["Folder","/Client/Year/Service/"],["Scans","300 dpi, colour for KYC, under 5 MB per file for portals"]],
 mistakes:["Asking the client for documents again and again","Bank statements with missing months","Sharing client documents in personal chats","Files named scan001.pdf"],
 quiz:[
  {q:"Best way to ask for missing documents?",o:["One item per message as you notice","One consolidated list with a deadline","Wait for client to send"],a:1,why:"One clear list respects the client's time and gets faster replies."},
  {q:"Which file name follows our convention?",o:["IMG_2234.pdf","SharmaTraders_GSTR3B_Oct26.pdf","final final.pdf"],a:1,why:"ClientName_DocType_Period."},
  {q:"Where should PDF passwords be kept?",o:["Office WhatsApp group","Client record","File name"],a:1,why:"Keep them private in the client's record only."}]},

{id:"accounting",title:"Accounting and bookkeeping",tag:"Accounting",
 intro:"Good books make every other service easy: GST returns, ITR, loans and audits. We keep books in Tally Prime or Zoho Books, voucher by voucher, and close every month.",
 steps:[
  "Create ledgers under the right groups (Sundry Debtors, Sundry Creditors, Duties & Taxes, Direct/Indirect Expenses, Bank Accounts).",
  "Enter vouchers daily or weekly. Tally shortcuts: Contra F4, Payment F5, Receipt F6, Journal F7, Sales F8, Purchase F9.",
  "Record GST correctly on every sales and purchase voucher (rate, HSN/SAC, place of supply).",
  "Deduct and record TDS where applicable (194C contractors, 194J professional fees, 194I rent, 194H commission) and pay by the 7th of next month.",
  "Reconcile the bank account with the bank statement every month.",
  "Month-end: match debtors and creditors, check cash balance is never negative, pass provisions, tally GST ledgers with returns.",
  "Share a monthly MIS with the client: sales, expenses, profit, receivables and payables ageing."],
 docs:["Bank statements","Sales and purchase invoices","Expense bills and cash vouchers","Salary sheet","Loan statements","TDS challans"],
 facts:[["TDS payment","7th of next month (30 April for March)"],["TDS returns (24Q/26Q)","31 July, 31 October, 31 January, 31 May"],["Section 43B(h)","Pay MSME suppliers within 15/45 days or the expense is disallowed that year"]],
 mistakes:["Negative cash balance","Personal expenses booked as business","No bank reconciliation","GST ledgers not matching returns","TDS deducted but not paid"],
 quiz:[
  {q:"Shortcut for a Receipt voucher in Tally Prime?",o:["F5","F6","F8"],a:1,why:"F6 is Receipt; F5 is Payment; F8 is Sales."},
  {q:"Professional fees paid to a CA attract TDS under…",o:["194C","194J","194I"],a:1,why:"194J covers professional and technical fees."},
  {q:"TDS deducted in October must be paid by…",o:["7 November","30 November","31 March"],a:0,why:"The 7th of the following month."}]},

{id:"billing",title:"Billing and invoicing",tag:"Billing",
 intro:"We raise our own fee invoices and help clients raise GST-compliant invoices. A correct invoice protects the buyer's ITC and our payment.",
 steps:[
  "Confirm the service, fee and GST rate (most professional services: 18%, SAC 9982 for legal/accounting).",
  "Raise the tax invoice with every mandatory field (see list) in a serial number series that is unique for the financial year.",
  "Use CGST + SGST for buyers in the same state, IGST for other states (based on place of supply).",
  "If the client's turnover crosses the e-invoice limit, generate the IRN and QR code on the IRP. Generate an e-way bill for goods worth over ₹50,000.",
  "Send the invoice the same day with payment details and due date.",
  "Track receivables by age: 0–30, 31–60, 61–90, over 90 days. Send polite reminders at 7, 15 and 30 days overdue.",
  "Record the receipt in the books and mark the invoice paid."],
 docs:["Supplier name, address, GSTIN","Invoice number (max 16 characters, unique per year) and date","Recipient name, address, GSTIN","Place of supply","HSN / SAC, description, quantity, value","Tax rate and CGST/SGST/IGST amounts","Total in figures and words","Signature or digital signature"],
 facts:[["E-invoicing","Mandatory when aggregate turnover exceeds ₹5 crore"],["IRP reporting time","Within 30 days of invoice date for turnover ₹10 crore and above"],["E-way bill","Goods consignment above ₹50,000"],["Credit note","Issue by 30 November after the year end, or the annual return date if earlier"]],
 mistakes:["Duplicate invoice numbers","Wrong place of supply (IGST vs CGST/SGST)","Missing buyer GSTIN for B2B","No follow-up on unpaid bills"],
 quiz:[
  {q:"Seller in Maharashtra, buyer in Gujarat. Which tax?",o:["CGST + SGST","IGST","No GST"],a:1,why:"Inter-state supply attracts IGST."},
  {q:"Maximum length of an invoice number?",o:["10","16","20"],a:1,why:"Rule 46 allows up to 16 characters."},
  {q:"E-invoicing is mandatory above aggregate turnover of…",o:["₹5 crore","₹50 crore","₹40 lakh"],a:0,why:"The current threshold is ₹5 crore."}]},

{id:"calling",title:"Cold calling customers",tag:"Calling",
 intro:"Cold calls introduce the office to small businesses, salaried people and professionals who need tax, GST, loan or trademark help. The goal of a call is a short meeting or a WhatsApp follow-up, not a sale on the spot.",
 steps:[
  "Prepare the list: name, business, city, likely need (GST filer, new business, salaried before ITR season).",
  "Call between 10 am and 7 pm on working days. Never call numbers that asked not to be called; respect DND / NCPR rules.",
  "Open in 10 seconds: who you are, why you are calling, and a question.",
  "Ask discovery questions and listen: Who files your GST now? Any notice received? Planning a loan this year?",
  "Offer one relevant service and one benefit, and ask for a 15-minute call or office visit.",
  "Handle objections calmly (see script) and never promise refunds, approvals or results.",
  "Log every call: outcome (interested, call back, not interested, wrong number), next date and notes."],
 docs:["Call list","Script","Service price list","Call log sheet","WhatsApp intro message and brochure"],
 script:`Opening
“Good morning, am I speaking with Mr. Sharma? This is Priya from Accrevise, we handle GST, income tax and loan files for traders in Pune. Do you have one minute?”

Discovery
“Who handles your GST returns right now?”
“Have you received any notice from GST or income tax this year?”
“Are you planning a business loan or a home loan in the next few months?”

Pitch (pick one)
“We file GST monthly with a reconciliation report so you never lose input credit. Most traders save time and avoid late fees.”

Close
“Can I set a 15-minute call with our CA on Thursday at 4, or would Friday morning suit you better?”

Objections
“I already have a CA.” → “That's good. Many clients keep their CA and use us for loan files or notices. Can I send our details on WhatsApp for later?”
“Too expensive.” → “I'll share our fee list; you can compare. Filing on time also saves ₹50 a day in late fees.”
“Not now.” → “No problem. When should I call back – after the 20th, once returns are filed?”`,
 facts:[["Calling hours","Working days, 10 am – 7 pm (never outside 9 am – 9 pm)"],["DND / NCPR","Do not call numbers that opted out; bulk promotional calling needs registered 140-series numbers"],["Target","40–60 dials a day, 8–10 real conversations"]],
 mistakes:["Reading the script like a robot","Talking more than listening","Promising refunds or loan approval","Not logging the call","Calling the same person repeatedly"],
 quiz:[
  {q:"The aim of a first cold call is to…",o:["Close the sale","Book a short meeting or follow-up","Collect documents"],a:1,why:"A first call earns the next conversation."},
  {q:"Prospect says “I already have a CA.” Best reply?",o:["End the call","Criticise their CA","Offer a different service and ask to share details"],a:2,why:"Stay helpful and keep the door open."},
  {q:"What must be logged after every call?",o:["Only sales","Outcome, next date and notes","Nothing if not interested"],a:1,why:"The log drives tomorrow's follow-ups."}]}
];


/** Plain-text knowledge base handed to the assistant. */
export const KNOWLEDGE_BASE = MODULES.map(m => `## ${m.title}\n${m.intro}\nSteps: ${m.steps.join(" | ")}\nChecklist: ${m.docs.join("; ")}\nKey facts: ${m.facts.map(f => f.join(": ")).join("; ")}\nCommon mistakes: ${m.mistakes.join("; ")}`).join("\n\n");
