import * as vscode from 'vscode';

class Logger {
	private channel: vscode.OutputChannel | undefined;

	private ensure(): vscode.OutputChannel {
		if (!this.channel) {
			this.channel = vscode.window.createOutputChannel('TheClawBay for Copilot');
		}
		return this.channel;
	}

	info(message: string, ...rest: unknown[]) {
		this.ensure().appendLine(`[info] ${message}${this.format(rest)}`);
	}

	warn(message: string, ...rest: unknown[]) {
		this.ensure().appendLine(`[warn] ${message}${this.format(rest)}`);
	}

	error(message: string, ...rest: unknown[]) {
		this.ensure().appendLine(`[error] ${message}${this.format(rest)}`);
	}

	show() {
		this.ensure().show();
	}

	dispose() {
		this.channel?.dispose();
	}

	private format(rest: unknown[]): string {
		if (rest.length === 0) {
			return '';
		}
		return ` ${rest
			.map((item) => {
				if (item instanceof Error) {
					return item.stack ?? item.message;
				}
				try {
					return JSON.stringify(item);
				} catch {
					return String(item);
				}
			})
			.join(' ')}`;
	}
}

export const logger = new Logger();
