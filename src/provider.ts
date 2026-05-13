import * as vscode from 'vscode';
import { AuthManager } from './auth';
import { TheClawBayClient, type ChatRequest, type ToolCall } from './client';
import { convertMessages, convertTools } from './convert';
import { logger } from './logger';
import { MODELS, type ModelDef, type ReasoningEffort } from './models';

interface ModelConfigurationOptions extends vscode.ProvideLanguageModelChatResponseOptions {
	readonly modelConfiguration?: Record<string, unknown>;
	readonly configuration?: Record<string, unknown>;
}

const EFFORT_LABELS: Record<ReasoningEffort, string> = {
	low: 'Low',
	medium: 'Medium',
	high: 'High',
	xhigh: 'X-High',
};

const EFFORT_DESCRIPTIONS: Record<ReasoningEffort, string> = {
	low: 'Fastest responses',
	medium: 'Balanced default',
	high: 'Recommended for harder tasks',
	xhigh: 'Deep reasoning for complex tasks',
};

function getReasoningEffort(
	model: ModelDef,
	options: vscode.ProvideLanguageModelChatResponseOptions,
): ReasoningEffort {
	const raw = (options as ModelConfigurationOptions).modelConfiguration?.reasoningEffort ??
		(options as ModelConfigurationOptions).configuration?.reasoningEffort;
	if (typeof raw === 'string' && model.reasoning.efforts.includes(raw as ReasoningEffort)) {
		return raw as ReasoningEffort;
	}
	return model.reasoning.default;
}

function buildReasoningSchema(model: ModelDef) {
	return {
		properties: {
			reasoningEffort: {
				type: 'string',
				title: 'Reasoning Effort',
				enum: model.reasoning.efforts,
				enumItemLabels: model.reasoning.efforts.map((v) => EFFORT_LABELS[v]),
				enumDescriptions: model.reasoning.efforts.map((v) => EFFORT_DESCRIPTIONS[v]),
				default: model.reasoning.default,
				group: 'navigation',
			},
		},
	} as const;
}

function toChatInfo(
	model: ModelDef,
	hasKey: boolean,
): vscode.LanguageModelChatInformation {
	return {
		id: model.id,
		name: model.name,
		family: model.family,
		version: model.version,
		detail: hasKey ? model.detail : 'Run TheClawBay: Set API Key first.',
		tooltip: hasKey ? undefined : 'API key is required',
		statusIcon: hasKey ? undefined : new vscode.ThemeIcon('warning'),
		maxInputTokens: model.maxInputTokens,
		maxOutputTokens: model.maxOutputTokens,
		isUserSelectable: true,
		capabilities: {
			toolCalling: model.capabilities.toolCalling,
			imageInput: model.capabilities.imageInput,
		},
		...(model.capabilities.thinking ? { configurationSchema: buildReasoningSchema(model) } : {}),
	} as vscode.LanguageModelChatInformation;
}

export class TheClawBayProvider implements vscode.LanguageModelChatProvider {
	private readonly onDidChangeLanguageModelChatInformationEmitter = new vscode.EventEmitter<void>();
	readonly onDidChangeLanguageModelChatInformation =
		this.onDidChangeLanguageModelChatInformationEmitter.event;
	private readonly authManager: AuthManager;
	private isActive = true;

	constructor(private readonly context: vscode.ExtensionContext) {
		this.authManager = new AuthManager(context.secrets);
		context.subscriptions.push(
			this.onDidChangeLanguageModelChatInformationEmitter,
			context.secrets.onDidChange((e) => {
				if (e.key === AuthManager.secretKey) {
					this.refresh();
				}
			}),
			vscode.workspace.onDidChangeConfiguration((e) => {
				if (
					e.affectsConfiguration('theclawbay-copilot.baseUrl') ||
						e.affectsConfiguration('theclawbay-copilot.maxTokens') ||
						e.affectsConfiguration('theclawbay-copilot.debug')
				) {
					this.refresh();
				}
			}),
		);
	}

	refresh(): void {
		this.onDidChangeLanguageModelChatInformationEmitter.fire();
	}

	async configureApiKey(): Promise<void> {
		const saved = await this.authManager.promptForApiKey();
		if (saved) {
			this.refresh();
		}
	}

	async clearApiKey(): Promise<void> {
		await this.authManager.clearApiKey();
		this.refresh();
		vscode.window.showInformationMessage('TheClawBay API key removed.');
	}

	async hasApiKey(): Promise<boolean> {
		return this.authManager.hasApiKey();
	}

	async prepareForDeactivate(): Promise<void> {
		this.isActive = false;
		this.refresh();
	}

	async provideLanguageModelChatInformation(): Promise<vscode.LanguageModelChatInformation[]> {
		if (!this.isActive) {
			return [];
		}
		const hasKey = await this.authManager.hasApiKey();
		return MODELS.map((model) => toChatInfo(model, hasKey));
	}

	async provideLanguageModelChatResponse(
		modelInfo: vscode.LanguageModelChatInformation,
		messages: readonly vscode.LanguageModelChatRequestMessage[],
		options: vscode.ProvideLanguageModelChatResponseOptions,
		progress: vscode.Progress<vscode.LanguageModelResponsePart>,
		token: vscode.CancellationToken,
	): Promise<void> {
		const apiKey = await this.authManager.getApiKey();
		if (!apiKey) {
			throw new Error('TheClawBay API key not configured.');
		}

		const model = MODELS.find((m) => m.id === modelInfo.id);
		if (!model) {
			throw new Error(`Unknown model: ${modelInfo.id}`);
		}

		const config = vscode.workspace.getConfiguration();
		const baseUrl = config.get<string>('theclawbay-copilot.baseUrl', 'https://api.theclawbay.com/v1');
		const maxTokens = config.get<number>('theclawbay-copilot.maxTokens', 0) || undefined;
		const reasoningEffort = getReasoningEffort(model, options);

		const request: ChatRequest = {
			model: model.apiModelId,
			messages: convertMessages(messages),
			stream: true,
			max_tokens: maxTokens,
			tools: model.capabilities.toolCalling ? convertTools(options.tools) : undefined,
			tool_choice: options.tools && options.tools.length > 0 ? 'auto' : undefined,
			reasoning_effort: reasoningEffort,
			stream_options: { include_usage: true },
		};

		if (config.get<boolean>('theclawbay-copilot.debug', false)) {
			logger.info(`request model=${model.id} effort=${reasoningEffort} baseUrl=${baseUrl}`);
		}

		const client = new TheClawBayClient(baseUrl, apiKey);
		const controller = new AbortController();
		const cancel = token.onCancellationRequested(() => controller.abort());
		const toolCalls = new Map<number, ToolCall>();

		try {
			await client.streamChatCompletion(
				request,
				{
					onContent: (text) => {
						progress.report(new vscode.LanguageModelTextPart(text));
					},
					onThinking: (text) => {
						const ctor = (vscode as unknown as Record<string, unknown>).LanguageModelThinkingPart as
							| (new (value: string) => vscode.LanguageModelThinkingPart)
							| undefined;
						if (typeof ctor === 'function') {
							progress.report(new ctor(text) as unknown as vscode.LanguageModelResponsePart);
						}
					},
					onToolCallDelta: (index, delta) => {
						const current = toolCalls.get(index) ?? {
							id: delta.id ?? '',
							type: 'function' as const,
							function: { name: '', arguments: '' },
						};
						if (delta.id) current.id = delta.id;
						if (delta.function?.name) current.function.name += delta.function.name;
						if (delta.function?.arguments) current.function.arguments += delta.function.arguments;
						toolCalls.set(index, current);
					},
					onDone: () => {
						for (const call of toolCalls.values()) {
							try {
								progress.report(
									new vscode.LanguageModelToolCallPart(
										call.id,
										call.function.name,
										JSON.parse(call.function.arguments || '{}'),
									),
								);
							} catch {
								progress.report(
									new vscode.LanguageModelToolCallPart(call.id, call.function.name, {}),
								);
							}
						}
					},
					onError: (err) => {
						throw err;
					},
				},
				controller.signal,
			);
		} finally {
			cancel.dispose();
		}
	}

	async provideTokenCount(
		_modelInfo: vscode.LanguageModelChatInformation,
		text: string | vscode.LanguageModelChatRequestMessage,
	): Promise<number> {
		if (typeof text === 'string') {
			return Math.max(1, Math.ceil(text.length / 4));
		}
		let chars = 0;
		for (const part of text.content) {
			if (part instanceof vscode.LanguageModelTextPart) {
				chars += part.value.length;
			}
		}
		return Math.max(1, Math.ceil(chars / 4));
	}
}
