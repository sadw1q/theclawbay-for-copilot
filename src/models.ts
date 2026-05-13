export type ReasoningEffort = 'low' | 'medium' | 'high' | 'xhigh';

export interface ModelDef {
	id: string;
	apiModelId: string;
	name: string;
	family: string;
	version: string;
	detail: string;
	maxInputTokens: number;
	maxOutputTokens: number;
	capabilities: {
		toolCalling: boolean;
		imageInput: boolean;
		thinking: boolean;
	};
	reasoning: {
		efforts: ReasoningEffort[];
		default: ReasoningEffort;
	};
}

export const MODELS: ModelDef[] = [
	{
		id: 'gpt-5-5',
		apiModelId: 'gpt-5.5',
		name: 'GPT 5.5',
		family: 'gpt',
		version: '5.5',
		detail: 'GPT 5.5 via TheClawBay',
		maxInputTokens: 400_000,
		maxOutputTokens: 128_000,
		capabilities: {
			toolCalling: true,
			imageInput: false,
			thinking: true,
		},
		reasoning: {
			efforts: ['low', 'medium', 'high', 'xhigh'],
			default: 'medium',
		},
	},
];
