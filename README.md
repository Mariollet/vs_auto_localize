# Symfony i18n Helper

Extension VS Code pour faciliter l'internationalisation avec Symfony. Permet d'ajouter rapidement des clés de traduction dans les fichiers YAML.

## Fonctionnalités

- **Raccourci clavier** : `Ctrl+Alt+I` pour lancer la commande
- **Sélection automatique** : Récupère le texte sélectionné dans l'éditeur
- **Gestion YAML** : Ajoute les clés avec la bonne indentation et hiérarchie
- **Configuration flexible** : Chemin du fichier de traduction configurable

## Utilisation

1. Sélectionnez le texte à traduire dans l'éditeur
2. Appuyez sur `Ctrl+Alt+I` ou lancez la commande "Ajouter une clé i18n Symfony"
3. Entrez la clé i18n (ex: `homepage.greeting`)
4. La clé et la valeur sont automatiquement ajoutées au fichier YAML

## Configuration

Cette extension contribue aux paramètres suivants :

* `symfonyI18nHelper.translationFilePath`: Chemin relatif du fichier de traduction YAML (défaut: `translations/app.fr.yaml`)

## Installation

Installez l'extension via le fichier `.vsix` :
```bash
code --install-extension symfony-i18n-helper-0.0.1.vsix
```

## Notes de version

### 0.0.1

Version initiale avec support YAML et raccourci clavier.
