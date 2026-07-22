import { CYBERSECURITY_TEMPLATE } from '../prompts/templates.js';
import { sendImageToGemini, isApiKeyConfigured, getMockResponse } from '../services/gemini.js';
import { cleanAndParseJSON } from '../utils/jsonCleaner.js';
// ─────────────────────────────────────────────────────────────────────────────
// Mira AI – Cybersecurity Image Analysis Controller
//
// Pipeline:
//   1. Receive screenshot from Mira widget
//   2. Validate image (handled by multer middleware)
//   3. Build cybersecurity prompt
//   4. Send image to Gemini Vision API (or return mock data in demo mode)
//   5. Clean and parse the AI JSON response
//   6. Return structured security report to the frontend
// ─────────────────────────────────────────────────────────────────────────────
export async function analyzeImageController(req, res) {
    try {
        // ── Step 1: Receive Image ─────────────────────────────────────────────────
        const file = req.file;
        if (!file) {
            res.status(400).json({
                success: false,
                error: 'No screenshot received. The Mira widget must upload an image under the "image" key.',
            });
            return;
        }
        console.log(`[Mira] Screenshot received — ${file.originalname} (${(file.size / 1024).toFixed(1)} KB, ${file.mimetype})`);
        // ── Step 2: Check Image ───────────────────────────────────────────────────
        // Validation is already enforced by the multer upload middleware.
        // Supported formats: JPEG, PNG, WEBP, GIF. Max size: 5 MB.
        // ── Step 3: Build AI Prompt ───────────────────────────────────────────────
        const template = CYBERSECURITY_TEMPLATE;
        const finalPrompt = template.promptText;
        // ── Step 4: Send Image to Gemini Vision ───────────────────────────────────
        let rawAiResponse;
        if (isApiKeyConfigured) {
            console.log('[Mira] Sending screenshot to Gemini Vision API for cybersecurity analysis...');
            rawAiResponse = await sendImageToGemini(file.buffer, file.mimetype, finalPrompt, {
                systemInstruction: template.systemInstruction,
                responseSchema: template.responseSchema,
            });
            console.log('[Mira] Gemini Vision API response received.');
        }
        else {
            // Demo / Mock mode — returns realistic threat scenarios without an API key
            console.log('[Mira] Demo mode active. Returning mock cybersecurity report...');
            await new Promise((resolve) => setTimeout(resolve, 1200)); // simulate latency
            rawAiResponse = getMockResponse();
        }
        // ── Step 5: Convert into Clean JSON ──────────────────────────────────────
        console.log('[Mira] Parsing and cleaning security report JSON...');
        const securityReport = cleanAndParseJSON(rawAiResponse);
        // ── Step 6: Return JSON to Frontend ──────────────────────────────────────
        console.log(`[Mira] Analysis complete. Risk level: ${securityReport.riskLevel ?? 'Unknown'}`);
        res.status(200).json({
            success: true,
            data: securityReport,
        });
    }
    catch (error) {
        console.error('[Mira] Error during cybersecurity analysis:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'An internal error occurred during cybersecurity image analysis.',
        });
    }
}
//# sourceMappingURL=analyze.js.map