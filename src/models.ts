export type ReasoningEffort = 'minimal' | 'none' | 'low' | 'medium' | 'high' | 'xhigh';

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
		name: 'GPT-5.5',
		family: 'gpt-5.5',
		version: '5.5',
		detail: 'GPT-5.5 via TheClawBay',
		maxInputTokens: 400_000,
		maxOutputTokens: 128_000,
		capabilities: { toolCalling: true, imageInput: false, thinking: true },
		reasoning: {
			efforts: ['low', 'medium', 'high', 'xhigh'],
			default: 'xhigh',
		},
	},
	{
		id: 'gpt-5-4',
		apiModelId: 'gpt-5.4',
		name: 'GPT-5.4',
		family: 'gpt-5.4',
		version: '5.4',
		detail: 'GPT-5.4 via TheClawBay',
		maxInputTokens: 400_000,
		maxOutputTokens: 128_000,
		capabilities: { toolCalling: true, imageInput: false, thinking: true },
		reasoning: {
			efforts: ['minimal', 'low', 'medium', 'high'],
			default: 'medium',
		},
	},
	{
		id: 'gpt-5-4-mini',
		apiModelId: 'gpt-5.4-mini',
		name: 'GPT-5.4 mini',
		family: 'gpt-5.4-mini',
		version: '5.4-mini',
		detail: 'GPT-5.4 mini via TheClawBay',
		maxInputTokens: 400_000,
		maxOutputTokens: 128_000,
		capabilities: { toolCalling: true, imageInput: false, thinking: true },
		reasoning: {
			efforts: ['minimal', 'low', 'medium', 'high'],
			default: 'medium',
		},
	},
	{
		id: 'gpt-5-3-codex',
		apiModelId: 'gpt-5.3-codex',
		name: 'GPT-5.3-Codex',
		family: 'gpt-5.3-codex',
		version: '5.3-codex',
		detail: 'GPT-5.3 Codex via TheClawBay',
		maxInputTokens: 400_000,
		maxOutputTokens: 128_000,
		capabilities: { toolCalling: true, imageInput: false, thinking: true },
		reasoning: {
			efforts: ['low', 'medium', 'high'],
			default: 'medium',
		},
	},
	{
		id: 'gpt-5-2',
		apiModelId: 'gpt-5.2',
		name: 'GPT-5.2',
		family: 'gpt-5.2',
		version: '5.2',
		detail: 'GPT-5.2 via TheClawBay',
		maxInputTokens: 400_000,
		maxOutputTokens: 128_000,
		capabilities: { toolCalling: true, imageInput: false, thinking: true },
		reasoning: {
			efforts: ['none', 'low', 'medium', 'high', 'xhigh'],
			default: 'medium',
		},
	},
	{
		id: 'gpt-5-2-codex',
		apiModelId: 'gpt-5.2-codex',
		name: 'GPT-5.2-Codex',
		family: 'gpt-5.2-codex',
		version: '5.2-codex',
		detail: 'GPT-5.2 Codex via TheClawBay',
		maxInputTokens: 400_000,
		maxOutputTokens: 128_000,
		capabilities: { toolCalling: true, imageInput: false, thinking: true },
		reasoning: {
			efforts: ['low', 'medium', 'high', 'xhigh'],
			default: 'medium',
		},
	},
	{
		id: 'gpt-5-1-codex-mini',
		apiModelId: 'gpt-5.1-codex-mini',
		name: 'GPT-5.1-Codex mini',
		family: 'gpt-5.1-codex-mini',
		version: '5.1-codex-mini',
		detail: 'GPT-5.1 Codex mini via TheClawBay',
		maxInputTokens: 400_000,
		maxOutputTokens: 128_000,
		capabilities: { toolCalling: true, imageInput: false, thinking: true },
		reasoning: {
			efforts: ['medium', 'high'],
			default: 'medium',
		},
	},
	{
		id: 'gpt-5-1-codex-max',
		apiModelId: 'gpt-5.1-codex-max',
		name: 'GPT-5.1-Codex max',
		family: 'gpt-5.1-codex-max',
		version: '5.1-codex-max',
		detail: 'GPT-5.1 Codex max via TheClawBay',
		maxInputTokens: 400_000,
		maxOutputTokens: 128_000,
		capabilities: { toolCalling: true, imageInput: false, thinking: true },
		reasoning: {
			efforts: ['none', 'medium', 'high', 'xhigh'],
			default: 'medium',
		},
	},
];
