// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "symfony-i18n-helper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('symfony-i18n-helper.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Symfony i18n Helper!');
	});

	context.subscriptions.push(disposable);

	const i18nDisposable = vscode.commands.registerCommand('symfony-i18n-helper.addI18nKey', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('Aucun éditeur actif.');
			return;
		}
		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);
		if (!selectedText) {
			vscode.window.showErrorMessage('Sélectionnez le texte à traduire.');
			return;
		}

		// Récupérer le chemin du fichier de traduction depuis les settings
		const config = vscode.workspace.getConfiguration('symfonyI18nHelper');
		const translationFilePath = config.get<string>('translationFilePath');
		if (!translationFilePath) {
			vscode.window.showErrorMessage('Chemin du fichier de traduction non configuré (symfonyI18nHelper.translationFilePath).');
			return;
		}

		// Demander la clé i18n à l’utilisateur (autocomplétion à améliorer)
		const i18nKey = await vscode.window.showInputBox({
			prompt: 'Entrez la clé i18n',
			placeHolder: 'ex: homepage.title',
		});
		if (!i18nKey) {
			vscode.window.showErrorMessage('Aucune clé i18n fournie.');
			return;
		}

		// Écrire la clé/valeur dans le fichier de traduction
		const wsFolders = vscode.workspace.workspaceFolders;
		if (!wsFolders) {
			vscode.window.showErrorMessage('Aucun dossier ouvert dans l’espace de travail.');
			return;
		}
		const fileUri = vscode.Uri.joinPath(wsFolders[0].uri, translationFilePath);
		try {
			let fileContent = '';
			try {
				fileContent = (await vscode.workspace.fs.readFile(fileUri)).toString();
			} catch (e) {
				fileContent = '';
			}
			// Traiter la clé i18n pour YAML (ex: homepage.greeting -> homepage: greeting:)
			const keyParts = i18nKey.split('.');
			const lines = fileContent.split('\n');
			
			// Fonction pour ajouter la clé YAML avec la bonne indentation
			function addYamlKey(lines: string[], keyParts: string[], value: string): string[] {
				let currentIndent = 0;
				let insertIndex = lines.length;
				
				// Chercher si les clés parentes existent déjà
				for (let i = 0; i < keyParts.length - 1; i++) {
					const currentKey = keyParts[i];
					const expectedIndent = i * 2; // 2 espaces par niveau
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
						// Créer la clé parente manquante
						const indent = ' '.repeat(expectedIndent);
						lines.splice(insertIndex, 0, `${indent}${currentKey}:`);
						insertIndex++;
						currentIndent = expectedIndent + 2;
					}
				}
				
				// Ajouter la clé finale avec sa valeur
				const finalKey = keyParts[keyParts.length - 1];
				const indent = ' '.repeat(currentIndent);
				lines.splice(insertIndex, 0, `${indent}${finalKey}: "${value}"`);
				
				return lines;
			}
			
			const updatedLines = addYamlKey(lines, keyParts, selectedText);
			const updatedContent = updatedLines.join('\n');
			
			await vscode.workspace.fs.writeFile(fileUri, Buffer.from(updatedContent));
			vscode.window.showInformationMessage(`Clé i18n ajoutée : ${i18nKey}`);
		} catch (err) {
			vscode.window.showErrorMessage('Erreur lors de l’écriture dans le fichier de traduction.');
		}
	});

	context.subscriptions.push(i18nDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
