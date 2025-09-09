# Changelog

All notable changes to the "Symfony i18n Helper" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-09-09 🧹 **Clean Release**

### Changed
- **Complete codebase cleanup**: Removed unnecessary files and dependencies
- **Internationalization**: All comments and messages translated to English
- **Documentation restructure**: Version history moved to dedicated CHANGELOG.md
- **Optimized configuration**: Simplified tsconfig.json and .vscodeignore
- **Professional structure**: Ready for VS Code Marketplace publication

### Removed
- ESLint configuration files (not needed)
- VS Code test configuration files
- Redundant documentation sections

### Technical
- Bundle size reduced and optimized
- Cleaner project structure with only essential files
- English-first codebase for better maintainability

## [0.1.1] - 2025-09-09

### Added
- **Automatic replacement**: Selected text is automatically replaced with `{{ 'key'|trans({}, 'app') }}`
- **Complete workflow**: Selection → Key generation → YAML files update → Twig function replacement

## [0.1.0] - 2025-09-09 🚀 **Major Release**

### Added
- **Multi-language support**: Object-based configuration with multiple translation files
- **Simultaneous update**: Same key automatically added to all configured files
- **Automatic configuration**: Creates `.vscode/settings.json` with multi-language example
- **Dynamic variables**: Support for `${workspaceFolder}` in file paths

## [0.0.3] - 2025-09-09

### Added
- Automatic creation of `.vscode/settings.json` if not existing
- Automatic configuration on first use

## [0.0.2] - 2025-09-09

### Changed
- Configuration via `.vscode/settings.json` instead of global VS Code preferences
- Improved error handling

## [0.0.1] - 2025-09-09

### Added
- Initial version with YAML support and keyboard shortcut