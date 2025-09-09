import * as vscode from 'vscode';

interface TranslationConfig {
    [language: string]: string;
}

export function activate(context: vscode.ExtensionContext) {
	const i18nDisposable = vscode.commands.registerCommand('symfony-translation-shortcut.addTranslationKey', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active editor.');
			return;
		}
		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);
		if (!selectedText) {
			vscode.window.showErrorMessage('Please select text to translate.');
			return;
		}

		// Get translation files configuration
		const wsFolders = vscode.workspace.workspaceFolders;
		if (!wsFolders) {
			vscode.window.showErrorMessage('No workspace folder open.');
			return;
		}
		
		const workspaceConfig = vscode.workspace.getConfiguration();
		let translationConfig = workspaceConfig.get<TranslationConfig>('symfonyTranslationShortcut.translationFilePath');
		
		if (!translationConfig) {
			// Default configuration
			translationConfig = {
				"fr": "${workspaceFolder}/translations/app.fr.yaml",
				"en": "${workspaceFolder}/translations/app.en.yaml"
			};
			
			// Automatically create .vscode/settings.json
			try {
				const vscodeDir = vscode.Uri.joinPath(wsFolders[0].uri, '.vscode');
				const settingsFile = vscode.Uri.joinPath(vscodeDir, 'settings.json');
				
				let settingsContent = '{}';
				try {
					const existingContent = await vscode.workspace.fs.readFile(settingsFile);
					settingsContent = existingContent.toString();
				} catch (e) {
					await vscode.workspace.fs.createDirectory(vscodeDir);
				}
				
				const settings = JSON.parse(settingsContent);
				settings['symfonyTranslationShortcut.translationFilePath'] = translationConfig;
				
				const updatedContent = JSON.stringify(settings, null, 2);
				await vscode.workspace.fs.writeFile(settingsFile, Buffer.from(updatedContent));
				
				vscode.window.showInformationMessage('Multi-language configuration created in .vscode/settings.json');
			} catch (err) {
				vscode.window.showWarningMessage('Could not create .vscode/settings.json. Using default configuration.');
			}
		}

		// Ask user for i18n key
		const i18nKey = await vscode.window.showInputBox({
			prompt: 'Enter i18n key',
			placeHolder: 'ex: homepage.title',
		});
		if (!i18nKey) {
			vscode.window.showErrorMessage('No i18n key provided.');
			return;
		}

		// Function to add YAML key with proper indentation
		function addYamlKey(lines: string[], keyParts: string[], value: string): string[] {
			let currentIndent = 0;
			let insertIndex = lines.length;
			
			// Check if parent keys already exist
			for (let i = 0; i < keyParts.length - 1; i++) {
				const currentKey = keyParts[i];
				const expectedIndent = i * 2; // 2 spaces per level
				let keyFound = false;
				
				for (let j = 0; j < lines.length; j++) {
					const line = lines[j];
					const lineIndent = line.search(/\S/);
					
					if (lineIndent === expectedIndent && line.trim().startsWith(currentKey + ':')) {
						keyFound = true;
						currentIndent = expectedIndent + 2;
						insertIndex = j + 1;
						break;
					}
				}
				
				if (!keyFound) {
					// Create missing parent key
					const indent = ' '.repeat(expectedIndent);
					lines.splice(insertIndex, 0, `${indent}${currentKey}:`);
					insertIndex++;
					currentIndent = expectedIndent + 2;
				}
			}
			
			// Add final key with value
			const finalKey = keyParts[keyParts.length - 1];
			const indent = ' '.repeat(currentIndent);
			lines.splice(insertIndex, 0, `${indent}${finalKey}: "${value}"`);
			
			return lines;
		}

		// Process i18n key for YAML
		const keyParts = i18nKey.split('.');
		
		// Write to all translation files
		const results: string[] = [];
		
		for (const [language, filePath] of Object.entries(translationConfig)) {
			try {
				const resolvedPath = filePath.replace('${workspaceFolder}', '');
				const fileUri = vscode.Uri.joinPath(wsFolders[0].uri, resolvedPath);
				
				let fileContent = '';
				try {
					fileContent = (await vscode.workspace.fs.readFile(fileUri)).toString();
				} catch (e) {
					const parentDir = vscode.Uri.joinPath(wsFolders[0].uri, 'translations');
					try {
						await vscode.workspace.fs.createDirectory(parentDir);
					} catch (dirErr) {}
					fileContent = '';
				}
				
				const lines = fileContent.split('\n');
				const updatedLines = addYamlKey(lines, keyParts, selectedText);
				const updatedContent = updatedLines.join('\n');
				
				await vscode.workspace.fs.writeFile(fileUri, Buffer.from(updatedContent));
				results.push(`${language}: ${resolvedPath}`);
			} catch (err) {
				vscode.window.showErrorMessage(`Error writing to ${language}: ${filePath}`);
			}
		}
		
		if (results.length > 0) {
			const twigFunction = `{{ '${i18nKey}'|trans({}, 'app') }}`;
			await editor.edit(editBuilder => {
				editBuilder.replace(selection, twigFunction);
			});
			
			vscode.window.showInformationMessage(`Key "${i18nKey}" added to: ${results.join(', ')}`);
		}
	});

	context.subscriptions.push(i18nDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
