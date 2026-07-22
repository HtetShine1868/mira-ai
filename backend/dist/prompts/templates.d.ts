export interface SecurityReport {
    isSafe: boolean;
    riskLevel: 'Critical' | 'High' | 'Medium' | 'Low' | 'Safe';
    confidenceScore: number;
    attackType: string;
    indicators: string[];
    explanation: string;
    recommendedActions: string[];
    affectedElements: string[];
    severityBreakdown: {
        urgency: 'Immediate' | 'High' | 'Moderate' | 'Low' | 'None';
        dataRisk: 'High' | 'Medium' | 'Low' | 'None';
        financialRisk: 'High' | 'Medium' | 'Low' | 'None';
    };
}
export interface PromptTemplate {
    name: string;
    description: string;
    systemInstruction: string;
    promptText: string;
    responseSchema: any;
}
export declare const CYBERSECURITY_TEMPLATE: PromptTemplate;
//# sourceMappingURL=templates.d.ts.map