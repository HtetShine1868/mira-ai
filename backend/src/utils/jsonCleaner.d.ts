/**
 * Utility to extract, clean, and parse JSON from API outputs.
 * Sometimes models wrap JSON in markdown block structures (e.g. ```json ... ```)
 * or output leading/trailing garbage text. This utility handles those cases.
 */
export declare function cleanAndParseJSON<T = any>(rawText: string): T;
//# sourceMappingURL=jsonCleaner.d.ts.map