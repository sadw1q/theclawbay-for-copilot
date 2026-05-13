import * as vscode from 'vscode';
import { TheClawBayProvider } from './provider';
import { logger } from './logger';

let activeProvider: TheClawBayProvider | undefined;

export async function activate(context: vscode.ExtensionContext) {
	logger.info(`Activating TheClawBay extension version=${context.extension.packageJSON.version}`);
	const provider = new TheClawBayProvider(context);
	activeProvider = provider;

	context.subscriptions.push(
		vscode.commands.registerCommand('theclawbay-copilot.setApiKey', () => provider.configureApiKey()),
		vscode.commands.registerCommand('theclawbay-copilot.clearApiKey', () => provider.clearApiKey()),
		vscode.commands.registerCommand('theclawbay-copilot.openSettings', () =>
			vscode.commands.executeCommand('workbench.action.openSettings', 'theclawbay-copilot'),
		),
		vscode.commands.registerCommand('theclawbay-copilot.showLogs', () => logger.show()),
		vscode.lm.registerLanguageModelChatProvider('theclawbay', provider),
	);

	try {
		await vscode.extensions.getExtension('github.copilot-chat')?.activate();
	} catch {
		logger.warn('Copilot Chat activation unavailable; model picker refresh may be delayed');
	}

	provider.refresh();
}

export async function deactivate() {
	try {
		await activeProvider?.prepareForDeactivate();
	} finally {
		activeProvider = undefined;
		logger.dispose();
	}
}
