// ─── Mira AI – Mock AI Service ───────────────────────────────────────────────
// Provides realistic cybersecurity analysis without requiring an API key.
// Detects keywords for demo predictability, cycles through scenarios for screenshots.

const CYBER_TIPS = [
  "Always check the exact website address before entering your password. Scammers use addresses like 'paypa1.com' that look almost right.",
  "Banks and services will never ask for your full password by email or text. If they do, it's a scam.",
  "If an offer seems too good to be true — like winning a prize you never entered — it almost always is.",
  "When in doubt, go directly to the official website by typing the address yourself instead of clicking links.",
  "Scammers create urgency on purpose. Taking a breath and verifying before acting is always the right choice.",
  "Use different passwords for each website. That way, if one is stolen, your other accounts stay safe.",
  "QR codes can lead anywhere — only scan QR codes from sources you trust completely.",
];

const QUICK_RESPONSES = {
  "Why is this suspicious?": {
    danger: "I noticed several things that make this look unsafe. 🔍\n\nThe website address is slightly different from the real one — scammers copy the design of trusted sites but use a fake address to steal your details. It's also asking for personal information in a way that legitimate services don't.\n\nThis is a classic phishing attempt.",
    warning: "A few things caught my attention. ⚠️\n\nThe message is trying to create urgency — telling you to act fast — which is a common trick to stop you thinking clearly. Some details don't quite add up, like where the message came from.\n\nIt might be fine, but I wouldn't trust it without double-checking first.",
    safe: "Good news — I checked this carefully and everything looks fine! ✅\n\nThe website address matches the official domain, the security certificate is valid, and there are no unusual requests for your personal information. No red flags detected.",
  },
  "Tell me what to do": {
    danger: "Here's exactly what I'd recommend:\n\n1️⃣ **Don't enter any information** — especially passwords, card numbers, or personal details.\n2️⃣ **Close this page** right away.\n3️⃣ If you need that service, **type the official address** directly into your browser bar.\n4️⃣ If you already entered info, **change your password immediately** and contact your bank if financial details were shared.",
    warning: "I'd suggest being careful:\n\n1️⃣ **Don't click any links** until you've verified the source.\n2️⃣ **Go to the official website directly** rather than using this link.\n3️⃣ **Don't share personal information** yet.\n4️⃣ If this came by email, contact the company through their official website to confirm.",
    safe: "You're all good! ✅ No action needed — this content looks legitimate and safe to use normally.",
  },
  "Is this definitely fake?": {
    danger: "Based on everything I can see, I'm about **92% confident** this is a scam. 🚨\n\nThe combination of a suspicious web address, urgent language, and requests for personal information are all classic phishing tactics. I'd treat this as dangerous.",
    warning: "I can't say with 100% certainty, but the patterns are concerning. 🤔\n\nI'd estimate about a **70% chance** this is a scam or misleading content. When something looks this suspicious, it's safer to treat it as a threat and verify independently.",
    safe: "Based on what I can see, this looks genuinely legitimate. ✅ The details check out and there are no obvious warning signs.",
  },
  "How can I recognize this next time?": {
    danger: "Great question! Here's what to watch for: 🔍\n\n• **Check the URL carefully** — scammers use 'paypa1.com' or 'secure-paypal-login.xyz' instead of 'paypal.com'\n• **Urgency is a red flag** — phrases like 'Act now!' or 'Your account will be closed!' are pressure tactics\n• **Hover over links** before clicking to see where they really lead\n• **Unusual login fields** — real sites don't ask for your SSN or card PIN to log in\n• **When in doubt, type it yourself** — go directly to the official website",
    warning: "Here's what to watch for: 👀\n\n• **Check who sent it** — look at the full email address or phone number, not just the name\n• **Urgency is suspicious** — scammers rush you so you don't think clearly\n• **Too-good-to-be-true offers** — free gifts, prizes, and giveaways are often bait\n• **Unexpected messages** from companies are worth verifying on their real website",
    safe: "This one was safe! Here are habits that will keep you protected: ✅\n\n• Always check the website address before logging in\n• Look for the padlock icon in your browser\n• Be cautious with unexpected emails asking you to click something\n• Use different passwords for different websites",
  },
  "Teach me about this scam": {
    danger: "**What is Phishing?** 🎣\n\nPhishing is when scammers build a fake version of a trusted website — like your bank or PayPal. The goal is to trick you into entering your password or personal details, which they then steal.\n\n**How they do it:**\n• They copy the logo and design exactly\n• They use a web address that looks almost right\n• They create panic — 'Your account will be suspended!'\n\n**Why it works:** When we're scared or rushed, we stop thinking critically. That's what scammers count on.\n\n**Your defense:** Slow down. Check the URL. When in doubt, type the website yourself.",
    warning: "**What are Suspicious Messages?** ⚠️\n\nNot everything suspicious is confirmed dangerous, but some patterns are warning signs:\n\n• Messages from unexpected senders\n• Offers that seem too good to be true\n• Requests for personal information or urgent action\n• Links to websites you don't recognize\n\n**The golden rule:** If something doesn't feel right, trust your instincts. Verify before you act.",
    safe: "**Staying Safe Online** 🛡️\n\nEven when content is safe, good habits protect you:\n\n• Use strong, unique passwords for each account\n• Enable two-step verification when available\n• Keep your apps and browser updated\n• Be skeptical of unexpected messages asking you to click something\n• When in doubt — ask Mira! I'm always here to help 💜",
  },
};

const SCENARIOS = {
  danger: {
    isSafe: false,
    riskLevel: 'Critical',
    confidenceScore: 92,
    attackType: 'Phishing',
    scenarioType: 'danger',
    miraMessage: "⚠️ Wait — this looks risky. Click me so I can explain.",
    indicators: [
      "The website address looks similar to a trusted site but is slightly different",
      "It urgently asks for your password or personal information",
      "The message uses fear or pressure to make you act quickly",
      "The sender or source cannot be verified",
      "The design looks almost right but some small details are off",
    ],
    explanation: "This looks like a phishing page — a fake website built to look like a real one. Someone made it to trick you into entering your password or personal details so they can steal them. This is one of the most common online scams.",
    recommendedActions: [
      "Do not enter your password or any personal information",
      "Close this page right away",
      "Visit the real website by typing the address yourself",
      "If you already entered information, change your password immediately",
      "Contact your bank if you shared any financial details",
    ],
    affectedElements: ["Suspicious website address", "Urgent login form", "Pressure messaging"],
    severityBreakdown: { urgency: "Immediate", dataRisk: "High", financialRisk: "High" },
  },
  warning: {
    isSafe: false,
    riskLevel: 'Medium',
    confidenceScore: 74,
    attackType: 'Suspicious Content',
    scenarioType: 'warning',
    miraMessage: "🤔 Hmm, something doesn't look quite right. Click me to find out.",
    indicators: [
      "The message creates unnecessary urgency or excitement",
      "The source is unverified or came out of nowhere",
      "The offer seems unusually good or too easy",
      "Some details just don't quite add up",
    ],
    explanation: "I spotted some warning signs here. While I can't say for certain it's dangerous, the pattern looks like it could be an attempt to scam or mislead you. The urgency and unusual promises are classic signs of something suspicious.",
    recommendedActions: [
      "Be careful before clicking any links",
      "Do not share personal information yet",
      "Verify by visiting the official website directly",
      "If it's from a company, call them directly to confirm",
    ],
    affectedElements: ["Urgent messaging", "Unverified sender", "Suspicious offer or promise"],
    severityBreakdown: { urgency: "Moderate", dataRisk: "Medium", financialRisk: "Medium" },
  },
  safe: {
    isSafe: true,
    riskLevel: 'Safe',
    confidenceScore: 96,
    attackType: 'Safe',
    scenarioType: 'safe',
    miraMessage: "✅ Everything looks good here! This seems safe.",
    indicators: [
      "The website address matches the official domain exactly",
      "Valid security certificate confirmed",
      "No unusual requests for personal information",
      "The design and branding look authentic",
      "No pressure tactics or suspicious urgency detected",
    ],
    explanation: "This content looks genuine and safe. The website address is correct, the security is in place, and there are no signs of phishing or scam tactics. You can proceed with confidence.",
    recommendedActions: [
      "This looks safe — no action needed",
      "Always double-check before entering passwords on any site",
      "Use unique passwords for each account for extra protection",
    ],
    affectedElements: [],
    severityBreakdown: { urgency: "None", dataRisk: "None", financialRisk: "None" },
  },
};

// Cycles through scenarios for screenshots / unknown input
let demoIndex = 0;
const DEMO_ROTATION = ['danger', 'warning', 'safe', 'danger', 'warning'];

export function getDailyTip() {
  return CYBER_TIPS[new Date().getDay() % CYBER_TIPS.length];
}

export async function analyzeContent(input = '', type = 'url') {
  // Simulate realistic AI processing delay
  await new Promise((r) => setTimeout(r, 2600 + Math.random() * 800));

  if (type !== 'screenshot') {
    const lower = input.toLowerCase();

    // DANGER keywords — phishing/malware patterns
    if (
      lower.match(/\.(xyz|tk|ml|ga|cf|gq|top|click|link)\b/) ||
      lower.includes('secure-') ||
      lower.includes('login-') ||
      lower.includes('verify-') ||
      lower.includes('account-suspended') ||
      (lower.includes('password') && lower.includes('now')) ||
      (lower.includes('bank') && !lower.includes('bank.com')) ||
      lower.includes('your account will') ||
      lower.includes('click here immediately') ||
      lower.includes('credential') ||
      lower.includes('phishing')
    ) {
      return SCENARIOS.danger;
    }

    // WARNING keywords — scam patterns
    if (
      lower.includes('you have won') ||
      lower.includes("you've won") ||
      lower.includes('congratulations') ||
      lower.includes('free iphone') ||
      lower.includes('free prize') ||
      lower.includes('claim your') ||
      lower.includes('limited time offer') ||
      lower.includes('act now') ||
      lower.includes('giveaway') ||
      lower.includes('lottery') ||
      lower.includes('suspicious')
    ) {
      return SCENARIOS.warning;
    }

    // SAFE patterns — well-known domains
    if (
      lower.match(/^(https?:\/\/)?(www\.)?(google|youtube|github|microsoft|apple|amazon|facebook|twitter|linkedin)\.com/) ||
      lower === 'google.com' || lower === 'youtube.com'
    ) {
      return SCENARIOS.safe;
    }
  }

  // Unknown or screenshot: use demo rotation
  const key = DEMO_ROTATION[demoIndex % DEMO_ROTATION.length];
  demoIndex++;
  return SCENARIOS[key];
}

export async function getChatResponse(question, currentResult) {
  await new Promise((r) => setTimeout(r, 700 + Math.random() * 500));

  const type = currentResult?.scenarioType ||
    (currentResult?.isSafe ? 'safe'
      : (currentResult?.riskLevel === 'Critical' || currentResult?.riskLevel === 'High') ? 'danger'
      : 'warning');

  // Known quick questions
  if (QUICK_RESPONSES[question]) {
    return QUICK_RESPONSES[question][type] || QUICK_RESPONSES[question].safe;
  }

  // Free-text fallback — pick best matching template
  const lower = question.toLowerCase();
  if (lower.includes('why') || lower.includes('what') || lower.includes('suspicious')) {
    return QUICK_RESPONSES["Why is this suspicious?"][type];
  }
  if (lower.includes('do') || lower.includes('should') || lower.includes('what') || lower.includes('action')) {
    return QUICK_RESPONSES["Tell me what to do"][type];
  }
  if (lower.includes('fake') || lower.includes('real') || lower.includes('sure') || lower.includes('certain')) {
    return QUICK_RESPONSES["Is this definitely fake?"][type];
  }
  if (lower.includes('next time') || lower.includes('recognize') || lower.includes('spot') || lower.includes('tell')) {
    return QUICK_RESPONSES["How can I recognize this next time?"][type];
  }
  if (lower.includes('learn') || lower.includes('teach') || lower.includes('explain') || lower.includes('scam')) {
    return QUICK_RESPONSES["Teach me about this scam"][type];
  }

  // Generic fallback
  const map = { danger: "dangerous — avoid it entirely", warning: "suspicious — treat it carefully", safe: "safe — no action needed" };
  return `Good question! Based on my analysis, this content looks ${map[type]}. Is there anything specific you'd like me to explain? 💜`;
}

export const QUICK_QUESTIONS = [
  "Why is this suspicious?",
  "Tell me what to do",
  "Is this definitely fake?",
  "How can I recognize this next time?",
  "Teach me about this scam",
];
