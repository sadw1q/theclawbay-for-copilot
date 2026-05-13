import * as vscode from 'vscode';
import type { ChatMessage, Tool, ToolCall } from './client';

function safeStringify(value: unknown): string {
	try {
		return JSON.stringify(value);
	} catch {
		return '{}';
	}
}

function mapRole(role: vscode.LanguageModelChatMessageRole): 'user' | 'assistant' {
	if (role === vscode.LanguageModelChatMessageRole.Assistant) {
		return 'assistant';
	}
	return 'user';
}

export function convertMessages(
	messages: readonly vscode.LanguageModelChatRequestMessage[],
): ChatMessage[] {
	const result: ChatMessage[] = [];

	for (const message of messages) {
		const role = mapRole(message.role);
		let content = '';
		const toolCalls: ToolCall[] = [];
		const toolResults: Array<{ callId: string; content: string }> = [];

		for (const part of message.content) {
			if (part instanceof vscode.LanguageModelTextPart) {
				content += part.value;
			} else if (part instanceof vscode.LanguageModelToolCallPart) {
				toolCalls.push({
					id: part.callId,
					type: 'function',
					function: {
						name: part.name,
						arguments: safeStringify(part.input),
					},
				});
			} else if (part instanceof vscode.LanguageModelToolResultPart) {
				let toolContent = '';
				for (const item of part.content) {
					if (item instanceof vscode.LanguageModelTextPart) {
						toolContent += item.value;
					}
				}
				toolResults.push({
					callId: part.callId,
					content: toolContent || safeStringify(part.content),
				});
			}
		}

		for (const toolResult of toolResults) {
			result.push({
				role: 'tool',
				tool_call_id: toolResult.callId,
				content: toolResult.content,
			});
		}

		if (role === 'assistant') {
			if (content || toolCalls.length > 0) {
				const assistantMessage: ChatMessage = {
					role: 'assistant',
					content: content || '',
				};
				if (toolCalls.length > 0) {
					assistantMessage.tool_calls = toolCalls;
				}
				result.push(assistantMessage);
			}
		} else if (content) {
			result.push({ role: 'user', content });
		}
	}

	return result;
}

export function convertTools(
	tools: readonly vscode.LanguageModelChatTool[] | undefined,
): Tool[] | undefined {
	if (!tools || tools.length === 0) {
		return undefined;
	}

	return tools.map((tool) => ({
		type: 'function' as const,
		function: {
			name: tool.name,
			description: tool.description,
			parameters: tool.inputSchema as Record<string, unknown> | undefined,
		},
	}));
}
