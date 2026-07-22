import { GoogleGenAI } from '@google/genai';

// ─────────────────────────────────────────────────────────────────────────────
// Gemini Vision Service – Mira AI Cyber Awareness Assistant
// Sends a screenshot to Gemini Vision API and returns a structured security
// report. Falls back to a realistic mock response if no API key is configured.
// ─────────────────────────────────────────────────────────────────────────────

const apiKey = process.env.GEMINI_API_KEY;

export const isApiKeyConfigured =
  !!apiKey && apiKey !== 'your_api_key' && apiKey.trim().length > 0;

if (!isApiKeyConfigured) {
  console.warn(
    'WARNING: GEMINI_API_KEY is not configured or is set to placeholder in .env file! Running in Demo/Mock fallback mode.'
  );
}

const ai = new GoogleGenAI({
  apiKey: isApiKeyConfigured ? (apiKey as string) : 'mock_key',
});

export interface AnalyzeOptions {
  systemInstruction?: string;
  responseSchema?: any;
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK RESPONSES
// Realistic cybersecurity mock data used when GEMINI_API_KEY is not set.
// Cycles through different threat scenarios to demonstrate all risk levels.
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_SCENARIOS = [
  // Scenario 1: Critical – Phishing (bank fake login)
  {
    isSafe: false,
    riskLevel: 'Critical',
    confidenceScore: 97,
    attackType: 'Phishing',
    indicators: [
      'Domain "secure-bankofamerica-login.com" is not the official "bankofamerica.com"',
      'URL contains hyphenated subdomain used to appear legitimate',
      'Login form requests SSN and card PIN — legitimate banks never ask for these online',
      'SSL certificate issued only 3 days ago',
      'Logo is low-resolution and colour is slightly off (#E41B17 vs official #E31837)',
      'No "About Us" or "Privacy Policy" links present in the footer',
    ],
    explanation:
      'This is a highly convincing phishing page impersonating Bank of America. The domain is fraudulent — it uses a lookalike URL with extra hyphens to deceive users. The form is designed to harvest banking credentials, SSN, and card PIN data which will be sent directly to attackers. Entering any information here will result in immediate account compromise.',
    recommendedActions: [
      'Do NOT enter any credentials or personal information',
      'Close this tab immediately',
      'Navigate directly to bankofamerica.com by typing it in the address bar',
      'Report this URL to Google Safe Browsing: safebrowsing.google.com/safebrowsing/report_phish',
      'If you already submitted information, contact your bank immediately at 1-800-432-1000',
      'Change your online banking password from a secure, verified device',
    ],
    affectedElements: [
      'URL bar — fraudulent domain detected',
      'Bank logo — low-quality spoofed graphic',
      'Login form — requests excessive sensitive fields (SSN, PIN)',
      'Footer — missing legal links',
    ],
    severityBreakdown: {
      urgency: 'Immediate',
      dataRisk: 'High',
      financialRisk: 'High',
    },
  },

  // Scenario 2: High – Social Engineering (fake IT support email)
  {
    isSafe: false,
    riskLevel: 'High',
    confidenceScore: 91,
    attackType: 'Social Engineering',
    indicators: [
      'Sender address "support@microsoft-helpdesk.net" is not an official Microsoft domain',
      'Message creates artificial urgency: "Your account will be suspended in 24 hours"',
      'Embedded link points to a non-Microsoft URL',
      'Requests remote access installation (AnyDesk/TeamViewer)',
      'Grammar and punctuation errors in body text',
      'Generic greeting "Dear User" instead of your actual name',
    ],
    explanation:
      'This is a social engineering email impersonating Microsoft IT support. It uses fear and urgency ("suspension in 24 hours") to pressure the user into clicking a malicious link and installing remote access software. Once installed, the attacker gains full control over your device, enabling data theft, ransomware installation, or financial fraud.',
    recommendedActions: [
      'Do NOT click any links or download any attachments',
      'Do NOT install any remote access software',
      'Mark this email as Phishing/Spam in your mail client',
      'Report to Microsoft at phishing@office365.microsoft.com',
      'Verify your account status directly at account.microsoft.com',
      'Notify your IT department if this was received on a work device',
    ],
    affectedElements: [
      'Sender email address — spoofed Microsoft domain',
      'Email body — urgency language and threats',
      'Embedded CTA button — links to malicious URL',
      'Attachment / download prompt',
    ],
    severityBreakdown: {
      urgency: 'High',
      dataRisk: 'High',
      financialRisk: 'Medium',
    },
  },

  // Scenario 3: Safe content
  {
    isSafe: true,
    riskLevel: 'Safe',
    confidenceScore: 96,
    attackType: 'Safe',
    indicators: [
      'Domain verified as legitimate: google.com',
      'Valid HTTPS with trusted TLS certificate (Let\'s Encrypt / Google Trust Services)',
      'No unexpected form fields or data requests',
      'Branding matches official Google design system',
      'Footer contains Privacy Policy, Terms of Service links',
      'No urgency language or suspicious calls-to-action',
    ],
    explanation:
      'This page has been verified as safe. The domain is the legitimate Google homepage, the HTTPS certificate is valid and trusted, and the visual design matches Google\'s official brand guidelines. No phishing indicators, suspicious form fields, or social engineering tactics were detected.',
    recommendedActions: [
      'This page is safe — no action required',
      'Always verify the URL before entering credentials on any login page',
      'Enable two-factor authentication on your Google account for extra protection',
    ],
    affectedElements: [],
    severityBreakdown: {
      urgency: 'None',
      dataRisk: 'None',
      financialRisk: 'None',
    },
  },

  // Scenario 4: Medium – Scam (fake prize/lottery)
  {
    isSafe: false,
    riskLevel: 'Medium',
    confidenceScore: 88,
    attackType: 'Scam',
    indicators: [
      'Headline claims user has "WON $5,000 Amazon Gift Card" — classic scam lure',
      'Countdown timer creates false urgency',
      'Requires personal information to "claim" the prize',
      'Domain is unrelated to Amazon: "promo-winners2024.xyz"',
      'Excessive use of exclamation marks and ALL CAPS text',
      'Pop-up behaviour blocks page navigation',
    ],
    explanation:
      'This is a prize scam page designed to trick users into submitting personal information under the pretence of winning a reward. Amazon does not run giveaways through third-party sites. The collected information (name, address, phone, email) is sold to data brokers or used for further targeted attacks. Some variants also attempt to collect credit card details under the guise of "shipping fees".',
    recommendedActions: [
      'Do NOT enter any personal information',
      'Close the browser tab immediately',
      'Clear your browser cookies if you clicked any links on this page',
      'Report the domain at safebrowsing.google.com/safebrowsing/report_badware',
      'If you submitted information, monitor your email and accounts for suspicious activity',
    ],
    affectedElements: [
      'Page headline — fake prize claim',
      'Countdown timer — artificial urgency manipulation',
      'Personal data form — data harvesting',
      'URL bar — non-Amazon suspicious domain (.xyz TLD)',
    ],
    severityBreakdown: {
      urgency: 'Moderate',
      dataRisk: 'Medium',
      financialRisk: 'Medium',
    },
  },
];

let mockScenarioIndex = 0;

export function getMockResponse(): string {
  // Rotate through mock scenarios so each request shows a different case
  const scenario = MOCK_SCENARIOS[mockScenarioIndex % MOCK_SCENARIOS.length];
  mockScenarioIndex++;
  return JSON.stringify(scenario);
}

// ─────────────────────────────────────────────────────────────────────────────
// GEMINI VISION API CALL
// Converts the screenshot buffer to base64 and sends it to Gemini 2.5 Flash
// along with the cybersecurity analysis prompt and structured response schema.
// ─────────────────────────────────────────────────────────────────────────────
export async function sendImageToGemini(
  imageBuffer: Buffer,
  mimeType: string,
  promptText: string,
  options: AnalyzeOptions = {}
): Promise<string> {
  const base64Image = imageBuffer.toString('base64');
  const modelName = 'gemini-2.5-flash';

  const contents = [
    {
      inlineData: {
        mimeType,
        data: base64Image,
      },
    },
    promptText,
  ];

  try {
    const config: any = {};

    if (options.systemInstruction) {
      config.systemInstruction = options.systemInstruction;
    }

    // Force structured JSON output using the cybersecurity report schema
    if (options.responseSchema) {
      config.responseMimeType = 'application/json';
      config.responseSchema = options.responseSchema;
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents,
      config: config,
    });

    if (!response || !response.text) {
      throw new Error('No content returned from Gemini Vision model');
    }

    return response.text;
  } catch (error: any) {
    console.error('Error invoking Gemini Vision API:', error);
    throw new Error(`Gemini API Error: ${error.message || error}`);
  }
}
