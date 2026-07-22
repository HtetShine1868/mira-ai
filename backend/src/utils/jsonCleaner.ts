/**
 * Utility to extract, clean, and parse JSON from API outputs.
 * Sometimes models wrap JSON in markdown block structures (e.g. ```json ... ```)
 * or output leading/trailing garbage text. This utility handles those cases.
 */
export function cleanAndParseJSON<T = any>(rawText: string): T {
  if (!rawText) {
    throw new Error('Empty response received from AI model');
  }

  let cleaned = rawText.trim();

  // Remove markdown code blocks if present (```json ... ``` or ``` ... ```)
  const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
  const match = cleaned.match(codeBlockRegex);
  if (match && match[1]) {
    cleaned = match[1].trim();
  }

  // Find first '{' or '[' and last '}' or ']' to isolate the JSON content
  const firstBrace = cleaned.indexOf('{');
  const firstBracket = cleaned.indexOf('[');
  let startIdx = -1;
  let endIdx = -1;

  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    startIdx = firstBrace;
    endIdx = cleaned.lastIndexOf('}');
  } else if (firstBracket !== -1) {
    startIdx = firstBracket;
    endIdx = cleaned.lastIndexOf(']');
  }

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    cleaned = cleaned.substring(startIdx, endIdx + 1);
  }

  try {
    return JSON.parse(cleaned) as T;
  } catch (error: any) {
    console.error('Failed to parse JSON. Raw content was:', rawText);
    console.error('Cleaned content was:', cleaned);
    throw new Error(`Invalid JSON format returned by AI: ${error.message}`);
  }
}
