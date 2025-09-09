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

L'extension crée automatiquement le fichier `.vscode/settings.json` avec la configuration par défaut lors de la première utilisation si elle n'existe pas.

Configuration manuelle (optionnelle) - Support multi-langues :

```json
{
  "symfonyI18nHelper.translationFilePath": {
    "fr": "${workspaceFolder}/translations/app.fr.yaml",
    "en": "${workspaceFolder}/translations/app.en.yaml"
  }
}
```

L'extension ajoutera automatiquement la même clé de traduction dans tous les fichiers configurés.

## Exemple d'utilisation

1. **Sélectionnez** le texte à traduire dans votre template Twig :
   ```twig
   <h1>Bienvenue sur notre site</h1>
   ```

2. **Appuyez** sur `Ctrl+Alt+I`

3. **Entrez** la clé de traduction (ex: `homepage.welcome`)

4. **Résultat** :
   - Le texte est remplacé par : `<h1>{{ 'homepage.welcome'|trans({}, 'app') }}</h1>`
   - La clé est ajoutée dans tous vos fichiers YAML avec le texte original comme valeur :
     ```yaml
     # translations/app.fr.yaml
     homepage:
       welcome: "Bienvenue sur notre site"
     
     # translations/app.en.yaml  
     homepage:
       welcome: "Bienvenue sur notre site"
     ```
   - ⚠️ **Important** : Vous devrez ensuite traduire manuellement (par IA) les valeurs dans chaque fichier de langue

## Installation

Installez l'extension via le fichier `.vsix` :
```bash
code --install-extension symfony-i18n-helper-0.1.1.vsix
```

## Notes de version

### 0.1.1

- **Remplacement automatique** : Le texte sélectionné est automatiquement remplacé par `{{ 'key'|trans({}, 'app') }}`
- **Workflow complet** : Sélection → Génération de clé → Ajout aux fichiers YAML → Remplacement par fonction Twig

### 0.1.0 🚀 **Version Majeure**

- **Support multi-langues** : Configuration par objet avec plusieurs fichiers de traduction
- **Mise à jour simultanée** : La même clé est ajoutée automatiquement dans tous les fichiers configurés
- **Configuration automatique** : Création de `.vscode/settings.json` avec exemple multi-langues
- **Variables dynamiques** : Support de `${workspaceFolder}` dans les chemins

### 0.0.3

- Création automatique de `.vscode/settings.json` si non existant
- Configuration automatique lors de la première utilisation

### 0.0.2

- Configuration via `.vscode/settings.json` au lieu des préférences globales VS Code
- Amélioration de la gestion des erreurs

### 0.0.1

Version initiale avec support YAML et raccourci clavier.
