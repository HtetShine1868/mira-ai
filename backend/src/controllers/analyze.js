import { PRESET_TEMPLATES } from '../prompts/templates.js';
import { sendImageToGemini, isApiKeyConfigured, getMockResponse } from '../services/gemini.js';
import { cleanAndParseJSON } from '../utils/jsonCleaner.js';
export async function analyzeImageController(req, res) {
    try {
        // 1. Receive Image & Check image exists
        const file = req.file;
        if (!file) {
            res.status(400).json({
                success: false,
                error: 'No image file uploaded. Please upload an image under "image" key.',
            });
            return;
        }
        // 2. Resolve Prompt template & Custom Prompt
        const preset = (req.body.preset || 'general');
        const customPrompt = (req.body.customPrompt || '');
        const template = PRESET_TEMPLATES[preset];
        if (!template) {
            res.status(400).json({
                success: false,
                error: `Invalid preset category: "${preset}". Available presets: ${Object.keys(PRESET_TEMPLATES).join(', ')}`,
            });
            return;
        }
        // 3. Build AI Prompt
        let finalPrompt = template.promptText;
        if (customPrompt.trim().length > 0) {
            finalPrompt = `${finalPrompt}\n\nAdditional user guidelines:\n${customPrompt}`;
        }
        // 4. Send image to Gemini Vision & Receive AI response
        let rawAiResponse;
        if (isApiKeyConfigured) {
            console.log(`Sending image to Gemini Vision API using preset: ${preset}...`);
            rawAiResponse = await sendImageToGemini(file.buffer, file.mimetype, finalPrompt, {
                systemInstruction: template.systemInstruction,
                responseSchema: template.responseSchema,
            });
        }
        else {
            console.log(`API key not configured. Generating realistic mock data response for preset: ${preset}...`);
            // Simulate realistic API delay
            await new Promise((resolve) => setTimeout(resolve, 1500));
            rawAiResponse = getMockResponse(preset);
        }
        // 5. Convert into clean JSON
        console.log('Gemini returned response. Cleaning and parsing JSON...');
        const parsedJson = cleanAndParseJSON(rawAiResponse);
        // 6. Return JSON response to client
        res.status(200).json({
            success: true,
            preset: preset,
            data: parsedJson,
        });
    }
    catch (error) {
        console.error('Error in analyzeImageController:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'An internal error occurred during image analysis',
        });
    }
}
//# sourceMappingURL=analyze.js.map