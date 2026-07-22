export interface PromptTemplate {
    name: string;
    description: string;
    systemInstruction: string;
    promptText: string;
    expectedJsonSchema: string;
    responseSchema?: any;
}
export declare const PRESET_TEMPLATES: Record<string, PromptTemplate>;
//# sourceMappingURL=templates.d.ts.map