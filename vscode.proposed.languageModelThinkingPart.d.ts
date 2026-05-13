// Defines VS Code's proposed LanguageModelThinkingPart type until it is stable in @types/vscode.

declare module 'vscode' {
	export class LanguageModelThinkingPart {
		value: string | string[];
		id?: string;
		metadata?: { readonly [key: string]: any };
		constructor(value: string | string[], id?: string, metadata?: { readonly [key: string]: any });
	}
}
