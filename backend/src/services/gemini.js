import { GoogleGenAI } from '@google/genai';
// Initialize the Google Gen AI client with the key from environments
const apiKey = process.env.GEMINI_API_KEY;
export const isApiKeyConfigured = !!apiKey && apiKey !== 'your_api_key' && apiKey.trim().length > 0;
if (!isApiKeyConfigured) {
    console.warn('WARNING: GEMINI_API_KEY is not configured or is set to placeholder in .env file! Running in Demo/Mock fallback mode.');
}
const ai = new GoogleGenAI({ apiKey: isApiKeyConfigured ? apiKey : 'mock_key' });
export function getMockResponse(preset) {
    const mocks = {
        general: {
            summary: "Mock Mode: A beautiful futuristic software developer workspace sitting in a modern home office with violet and cyan accent lighting.",
            objects: ["widescreen monitor", "mechanical keyboard", "caffeine beverage", "rgb led strip", "indoor plant"],
            visualStyle: {
                dominantColors: ["#9b51e0", "#00f2fe", "#0a0a16"],
                theme: "cyberpunk dark theme"
            },
            context: "Developer workstation in a smart home office environment at night",
            detectedText: ["MIRA AI Vision Console", "Ready for deployment"]
        },
        ocr: {
            documentType: "terminal logging output",
            detectedLanguage: "English (Technical)",
            title: "Backend Service Status Console",
            paragraphs: [
                "[Server] Mira AI Backend running on http://localhost:5000",
                "[Database] Connected successfully to memory store",
                "[Gemini] Vision Pipeline listening for multipart image uploads"
            ],
            rawText: "[Server] Mira AI Backend running on http://localhost:5000\n[Database] Connected successfully to memory store\n[Gemini] Vision Pipeline listening for multipart image uploads"
        },
        uiux: {
            screenName: "Mira AI Developer Workspace Dashboard",
            components: ["Header Brand Bar", "Drag & Drop Uploader Panel", "Preset Grid Cards", "Console Code Tab View"],
            colorPalette: ["#030307", "#9b51e0", "#00f2fe", "#f3f2fa"],
            readibilityScore: "Excellent",
            usabilityIssues: [
                {
                    issue: "Preset description text has slightly lower contrast against cards when inactive",
                    severity: "Low"
                }
            ],
            suggestions: [
                "Include a toggle to switch between Gemini 2.5 Flash and Gemini 2.5 Pro",
                "Add a history list of past processed images in the sidebar"
            ]
        },
        objects: {
            objectsCount: 3,
            detections: [
                {
                    label: "widescreen display",
                    boundingBox: { x: 15, y: 10, width: 70, height: 60 },
                    confidence: "High"
                },
                {
                    label: "ergonomic chair",
                    boundingBox: { x: 35, y: 55, width: 30, height: 40 },
                    confidence: "High"
                },
                {
                    label: "coffee mug",
                    boundingBox: { x: 80, y: 75, width: 10, height: 15 },
                    confidence: "Medium"
                }
            ]
        },
        receipt: {
            merchant: "Silicon Coffee & Doughnuts",
            date: "2026-07-22",
            currency: "USD",
            items: [
                {
                    name: "V60 Chemex Coffee",
                    price: 5.50,
                    quantity: 1
                },
                {
                    name: "Double Glazed Matcha Donut",
                    price: 4.25,
                    quantity: 2
                }
            ],
            tax: 1.12,
            total: 15.12,
            paymentMethod: "NFC Mobile Payment"
        }
    };
    return JSON.stringify(mocks[preset] || mocks.general);
}
export async function sendImageToGemini(imageBuffer, mimeType, promptText, options = {}) {
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
        const config = {};
        if (options.systemInstruction) {
            config.systemInstruction = options.systemInstruction;
        }
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
            throw new Error('No content returned from Gemini model');
        }
        return response.text;
    }
    catch (error) {
        console.error('Error invoking Gemini Vision API:', error);
        throw new Error(`Gemini API Error: ${error.message || error}`);
    }
}
//# sourceMappingURL=gemini.js.map