# Symfony Translation Shortcut

Quick keyboard shortcut to add translation keys to Symfony YAML files and auto-replace with Twig functions.

## Features

- **Keyboard shortcut**: `Ctrl+Alt+I` to launch command
- **Automatic selection**: Gets selected text from editor
- **YAML management**: Adds keys with proper indentation and hierarchy
- **Multi-language support**: Updates multiple translation files simultaneously
- **Twig integration**: Automatically replaces text with Twig translation function

## Usage

1. Select text to translate in the editor
2. Press `Ctrl+Alt+I` or run command "Add Symfony Translation Key"
3. Enter i18n key (ex: `homepage.greeting`)
4. Key and value are automatically added to YAML files and text is replaced with Twig function

## Configuration

The extension automatically creates `.vscode/settings.json` with default configuration on first use if it doesn't exist.

Manual configuration (optional) - Multi-language support:

```json
{
  "symfonyTranslationShortcut.translationFilePath": {
    "fr": "${workspaceFolder}/translations/app.fr.yaml",
    "en": "${workspaceFolder}/translations/app.en.yaml"
  }
}
```

The extension automatically adds the same translation key to all configured files.

## Example Usage

1. **Select** text to translate in your Twig template:
   ```twig
   <h1>Welcome to our website</h1>
   ```

2. **Press** `Ctrl+Alt+I`

3. **Enter** translation key (ex: `homepage.welcome`)

4. **Result**:
   - Text is replaced with: `<h1>{{ 'homepage.welcome'|trans({}, 'app') }}</h1>`
   - Key is added to all YAML files with original text as value:
     ```yaml
     # translations/app.fr.yaml
     homepage:
       welcome: "Welcome to our website"
     
     # translations/app.en.yaml  
     homepage:
       welcome: "Welcome to our website"
     ```
   - ⚠️ **Important**: You must manually translate values in each language file afterwards

## Installation

### Download from Releases
1. Go to [Releases](https://github.com/Mariollet/vs_auto_localize/releases)
2. Download the latest `symfony-i18n-helper-x.x.x.vsix` file
3. Install via VS Code:
   ```bash
   code --install-extension symfony-translation-shortcut-0.2.2.vsix
   ```

## Contributing

See [CHANGELOG.md](CHANGELOG.md) for version history and changes.

## License

This extension is released under the MIT License.
