export declare const isApiKeyConfigured: boolean;
export interface AnalyzeOptions {
    systemInstruction?: string;
    responseSchema?: any;
}
export declare function getMockResponse(): string;
export declare function sendImageToGemini(imageBuffer: Buffer, mimeType: string, promptText: string, options?: AnalyzeOptions): Promise<string>;
//# sourceMappingURL=gemini.d.ts.map