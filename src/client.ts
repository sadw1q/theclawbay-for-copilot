export interface ChatMessage {
	role: 'system' | 'user' | 'assistant' | 'tool';
	content?: string;
	tool_calls?: ToolCall[];
	tool_call_id?: string;
}

export interface ToolCall {
	id: string;
	type: 'function';
	function: {
		name: string;
		arguments: string;
	};
}

export interface Tool {
	type: 'function';
	function: {
		name: string;
		description?: string;
		parameters?: Record<string, unknown>;
	};
}

export interface ChatRequest {
	model: string;
	messages: ChatMessage[];
	stream: true;
	max_tokens?: number;
	tools?: Tool[];
	tool_choice?: 'none' | 'auto' | 'required';
	reasoning_effort?: 'minimal' | 'none' | 'low' | 'medium' | 'high' | 'xhigh';
	stream_options?: {
		include_usage: boolean;
	};
}

export interface StreamCallbacks {
	onContent: (text: string) => void;
	onThinking: (text: string) => void;
	onToolCallDelta: (index: number, delta: Partial<ToolCall>) => void;
	onDone: () => void;
	onError: (error: Error) => void;
}

export class TheClawBayClient {
	constructor(
		private readonly baseUrl: string,
		private readonly apiKey: string,
	) {}

	async streamChatCompletion(
		request: ChatRequest,
		callbacks: StreamCallbacks,
		signal: AbortSignal,
	): Promise<void> {
		const response = await fetch(`${this.baseUrl.replace(/\/$/, '')}/chat/completions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'text/event-stream',
				Authorization: `Bearer ${this.apiKey}`,
			},
			body: JSON.stringify({ ...request, stream_options: { include_usage: true } }),
			signal,
		});

		if (!response.ok || !response.body) {
			const body = await response.text().catch(() => '');
			callbacks.onError(new Error(`TheClawBay HTTP ${response.status}: ${body.slice(0, 500)}`));
			return;
		}

		const reader = response.body.getReader();
		const decoder = new TextDecoder();
		let buffer = '';

		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) {
					callbacks.onDone();
					return;
				}

				buffer += decoder.decode(value, { stream: true });
				let lineEnd: number;
				while ((lineEnd = buffer.indexOf('\n')) >= 0) {
					const line = buffer.slice(0, lineEnd).replace(/\r$/, '');
					buffer = buffer.slice(lineEnd + 1);
					if (!line.startsWith('data:')) {
						continue;
					}

					const data = line.slice(5).trim();
					if (!data) {
						continue;
					}
					if (data === '[DONE]') {
						callbacks.onDone();
						return;
					}

					this.handleData(data, callbacks);
				}
			}
		} catch (error) {
			if ((error as { name?: string }).name === 'AbortError') {
				callbacks.onDone();
				return;
			}
			callbacks.onError(error instanceof Error ? error : new Error(String(error)));
		}
	}

	private handleData(data: string, callbacks: StreamCallbacks): void {
		let chunk: any;
		try {
			chunk = JSON.parse(data);
		} catch {
			return;
		}

		const delta = chunk.choices?.[0]?.delta;
		if (!delta) {
			return;
		}

		if (typeof delta.reasoning_content === 'string' && delta.reasoning_content.length > 0) {
			callbacks.onThinking(delta.reasoning_content);
		}

		if (typeof delta.content === 'string' && delta.content.length > 0) {
			callbacks.onContent(delta.content);
		}

		if (Array.isArray(delta.tool_calls)) {
			for (const toolCall of delta.tool_calls) {
				callbacks.onToolCallDelta(typeof toolCall.index === 'number' ? toolCall.index : 0, {
					id: toolCall.id,
					type: toolCall.type,
					function: toolCall.function
						? {
								name: toolCall.function.name ?? '',
								arguments: toolCall.function.arguments ?? '',
							}
						: undefined,
				});
			}
		}
	}
}
