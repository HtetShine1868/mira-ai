export const PRESET_TEMPLATES = {
    general: {
        name: 'General Description',
        description: 'Provides a detailed visual analysis of the image, including objects, text, color theme, and context.',
        systemInstruction: 'You are an advanced AI vision analyzer. Analyze the provided image thoroughly and output your results strictly in the specified JSON format.',
        promptText: 'Analyze the image in detail. Extract the following information: a summary of what the image shows, a list of primary objects visible, the main colors and visual theme, any readable text found, and the estimated setting or context.',
        expectedJsonSchema: `{
  "summary": "Brief summary of the image",
  "objects": ["object1", "object2"],
  "visualStyle": {
    "dominantColors": ["color1", "color2"],
    "theme": "modern/retro/industrial/etc"
  },
  "detectedText": ["list of strings found in image"],
  "context": "setting/context of the image"
}`,
        responseSchema: {
            type: "OBJECT",
            properties: {
                summary: { type: "STRING" },
                objects: {
                    type: "ARRAY",
                    items: { type: "STRING" }
                },
                visualStyle: {
                    type: "OBJECT",
                    properties: {
                        dominantColors: {
                            type: "ARRAY",
                            items: { type: "STRING" }
                        },
                        theme: { type: "STRING" }
                    },
                    required: ["dominantColors", "theme"]
                },
                detectedText: {
                    type: "ARRAY",
                    items: { type: "STRING" }
                },
                context: { type: "STRING" }
            },
            required: ["summary", "objects", "visualStyle", "detectedText", "context"]
        }
    },
    ocr: {
        name: 'Document OCR',
        description: 'Extracts all readable text and reconstructs the document structure.',
        systemInstruction: 'You are an expert OCR and document analysis engine. Extract text from the image verbatim and structure it cleanly into JSON.',
        promptText: 'Perform OCR on the image. Transcribe all text, detect the language, identify distinct paragraphs or blocks, detect headers/titles, and estimate the document type.',
        expectedJsonSchema: `{
  "documentType": "e.g., article, banner, code screenshot, document",
  "detectedLanguage": "e.g., English",
  "title": "Title of the document (if found)",
  "paragraphs": ["paragraph 1 text", "paragraph 2 text"],
  "rawText": "Entire raw text joined together"
}`,
        responseSchema: {
            type: "OBJECT",
            properties: {
                documentType: { type: "STRING" },
                detectedLanguage: { type: "STRING" },
                title: { type: "STRING" },
                paragraphs: {
                    type: "ARRAY",
                    items: { type: "STRING" }
                },
                rawText: { type: "STRING" }
            },
            required: ["documentType", "detectedLanguage", "title", "paragraphs", "rawText"]
        }
    },
    uiux: {
        name: 'UI/UX Analysis',
        description: 'Evaluates user interfaces, layouts, component usage, color palettes, and issues.',
        systemInstruction: 'You are a Senior UI/UX Designer and Frontend Auditor. Evaluate the screenshot of the UI and output a detailed audit in JSON.',
        promptText: 'Analyze the user interface layout in this screenshot. List detected UI elements, evaluate the color scheme, check readability/contrast, identify potential accessibility/usability issues, and provide design suggestions.',
        expectedJsonSchema: `{
  "screenName": "Identify the screen/dashboard type",
  "components": ["button", "input field", "navbar"],
  "colorPalette": ["#hex1", "#hex2"],
  "readibilityScore": "Excellent | Good | Poor",
  "usabilityIssues": [
    {
      "issue": "Description of issue",
      "severity": "High | Medium | Low"
    }
  ],
  "suggestions": ["Suggestion 1", "Suggestion 2"]
}`,
        responseSchema: {
            type: "OBJECT",
            properties: {
                screenName: { type: "STRING" },
                components: {
                    type: "ARRAY",
                    items: { type: "STRING" }
                },
                colorPalette: {
                    type: "ARRAY",
                    items: { type: "STRING" }
                },
                readibilityScore: { type: "STRING" },
                usabilityIssues: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            issue: { type: "STRING" },
                            severity: { type: "STRING" }
                        },
                        required: ["issue", "severity"]
                    }
                },
                suggestions: {
                    type: "ARRAY",
                    items: { type: "STRING" }
                }
            },
            required: ["screenName", "components", "colorPalette", "readibilityScore", "usabilityIssues", "suggestions"]
        }
    },
    objects: {
        name: 'Object Detection',
        description: 'Identifies, counts, and gives approximate screen bounding/locations of key objects.',
        systemInstruction: 'You are a computer vision model specialized in locating and classifying physical objects in images. Output your detections in JSON.',
        promptText: 'Identify distinct objects visible in the image. For each object, provide its label, approximate coordinates on a normalized 0-100 grid relative to the image size (x_min, y_min, x_max, y_max), and confidence estimation (High/Medium/Low).',
        expectedJsonSchema: `{
  "objectsCount": 3,
  "detections": [
    {
      "label": "object name",
      "boundingBox": {
        "x": 10,
        "y": 20,
        "width": 30,
        "height": 40
      },
      "confidence": "High"
    }
  ]
}`,
        responseSchema: {
            type: "OBJECT",
            properties: {
                objectsCount: { type: "INTEGER" },
                detections: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            label: { type: "STRING" },
                            boundingBox: {
                                type: "OBJECT",
                                properties: {
                                    x: { type: "INTEGER" },
                                    y: { type: "INTEGER" },
                                    width: { type: "INTEGER" },
                                    height: { type: "INTEGER" }
                                },
                                required: ["x", "y", "width", "height"]
                            },
                            confidence: { type: "STRING" }
                        },
                        required: ["label", "boundingBox", "confidence"]
                    }
                }
            },
            required: ["objectsCount", "detections"]
        }
    },
    receipt: {
        name: 'Receipt & Invoice Parsing',
        description: 'Extracts merchant, date, total, tax, currency, and line items from billing docs.',
        systemInstruction: 'You are an accounting automation assistant. Extract transaction details from the receipt image and format as JSON.',
        promptText: 'Analyze this receipt/invoice. Extract the merchant name, transaction date/time, list of items with their price/quantity, tax, total cost, currency, and payment method.',
        expectedJsonSchema: `{
  "merchant": "Vendor name",
  "date": "YYYY-MM-DD or raw string",
  "currency": "USD/EUR/etc",
  "items": [
    {
      "name": "item description",
      "price": 10.99,
      "quantity": 1
    }
  ],
  "tax": 0.88,
  "total": 11.87,
  "paymentMethod": "Cash/Card"
}`,
        responseSchema: {
            type: "OBJECT",
            properties: {
                merchant: { type: "STRING" },
                date: { type: "STRING" },
                currency: { type: "STRING" },
                items: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            name: { type: "STRING" },
                            price: { type: "NUMBER" },
                            quantity: { type: "INTEGER" }
                        },
                        required: ["name", "price", "quantity"]
                    }
                },
                tax: { type: "NUMBER" },
                total: { type: "NUMBER" },
                paymentMethod: { type: "STRING" }
            },
            required: ["merchant", "date", "currency", "items", "tax", "total", "paymentMethod"]
        }
    }
};
//# sourceMappingURL=templates.js.map