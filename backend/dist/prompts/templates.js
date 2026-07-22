// ─────────────────────────────────────────────────────────────────────────────
// Mira AI – Cybersecurity Prompt Templates
// The system analyses screenshots from the simulated user environment and
// returns a structured security report indicating whether the content is safe
// or a potential cyber threat (phishing, scam, fake login, social engineering).
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// CYBERSECURITY ANALYSIS TEMPLATE
// Used for every screenshot received from the Mira widget
// ─────────────────────────────────────────────────────────────────────────────
export const CYBERSECURITY_TEMPLATE = {
    name: 'Mira Cyber Threat Analysis',
    description: 'Analyses a screenshot from a simulated user environment to detect phishing, scams, fake login pages, and social engineering attacks.',
    systemInstruction: `You are Mira, an expert AI cybersecurity analyst specialising in visual threat detection.
Your job is to examine screenshots from a user's screen and determine whether the content is safe or a potential cyber attack.

You must look for the following threat categories:
- Phishing: Fake websites or emails designed to steal credentials
- Scam: Fraudulent offers, lottery wins, fake prizes, investment fraud
- Fake Login Page: Spoofed login forms mimicking legitimate services (banks, Google, Facebook, etc.)
- Social Engineering: Psychological manipulation to get users to take harmful actions
- Malware Distribution: Download prompts, fake update alerts, suspicious installers
- Safe: Legitimate, trustworthy content with no indicators of threat

When assessing risk, inspect:
1. URL bar content – suspicious domains, misspellings, unusual TLDs
2. Branding – logo quality, colour accuracy, font matching
3. Form fields – unexpected requests for passwords, card numbers, OTPs
4. Language – urgency, threats, grammatical errors, too-good-to-be-true offers
5. Visual design – poor quality graphics, mismatched elements
6. Trust signals – missing HTTPS, absent privacy policy, no contact info

Always output a complete and accurate JSON security report. Be thorough but concise.`,
    promptText: `Analyse this screenshot from the user's simulated environment for cybersecurity threats.

Examine every visible element: the URL bar, any logos or branding, form fields, buttons, text content, and visual design quality.

Determine:
1. Whether this content is SAFE or a THREAT
2. The specific attack type if a threat is detected
3. Your confidence level (0–100) in this assessment
4. All specific red flags or indicators you observed
5. A clear explanation of why this is dangerous or safe
6. Concrete recommended actions the user should take
7. Which specific UI elements appear suspicious or compromised
8. The severity breakdown (urgency, data risk, financial risk)

Provide your full analysis as a structured JSON security report.`,
    responseSchema: {
        type: 'OBJECT',
        properties: {
            isSafe: { type: 'BOOLEAN' },
            riskLevel: {
                type: 'STRING',
                enum: ['Critical', 'High', 'Medium', 'Low', 'Safe'],
            },
            confidenceScore: { type: 'INTEGER' },
            attackType: { type: 'STRING' },
            indicators: {
                type: 'ARRAY',
                items: { type: 'STRING' },
            },
            explanation: { type: 'STRING' },
            recommendedActions: {
                type: 'ARRAY',
                items: { type: 'STRING' },
            },
            affectedElements: {
                type: 'ARRAY',
                items: { type: 'STRING' },
            },
            severityBreakdown: {
                type: 'OBJECT',
                properties: {
                    urgency: {
                        type: 'STRING',
                        enum: ['Immediate', 'High', 'Moderate', 'Low', 'None'],
                    },
                    dataRisk: {
                        type: 'STRING',
                        enum: ['High', 'Medium', 'Low', 'None'],
                    },
                    financialRisk: {
                        type: 'STRING',
                        enum: ['High', 'Medium', 'Low', 'None'],
                    },
                },
                required: ['urgency', 'dataRisk', 'financialRisk'],
            },
        },
        required: [
            'isSafe',
            'riskLevel',
            'confidenceScore',
            'attackType',
            'indicators',
            'explanation',
            'recommendedActions',
            'affectedElements',
            'severityBreakdown',
        ],
    },
};
//# sourceMappingURL=templates.js.map