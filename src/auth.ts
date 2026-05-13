import * as vscode from 'vscode';

const SECRET_KEY = 'theclawbay-copilot.apiKey';

export class AuthManager {
	constructor(private readonly secrets: vscode.SecretStorage) {}

	async getApiKey(): Promise<string | undefined> {
		return this.secrets.get(SECRET_KEY);
	}

	async hasApiKey(): Promise<boolean> {
		return !!(await this.getApiKey());
	}

	async promptForApiKey(): Promise<boolean> {
		const value = await vscode.window.showInputBox({
			prompt: 'Enter your TheClawBay API key',
			placeHolder: 'sk-...',
			password: true,
			ignoreFocusOut: true,
			validateInput: (input) => (input.trim().length === 0 ? 'API key cannot be empty' : undefined),
		});

		if (!value) {
			return false;
		}

		await this.secrets.store(SECRET_KEY, value.trim());
		vscode.window.showInformationMessage('TheClawBay API key saved.');
		return true;
	}

	async clearApiKey(): Promise<void> {
		await this.secrets.delete(SECRET_KEY);
		vscode.window.showInformationMessage('TheClawBay API key removed.');
	}

	static get secretKey(): string {
		return SECRET_KEY;
	}
}
