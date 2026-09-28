# P2-PLUS — Révisions EFREI

Site de révision (MkDocs Material) : https://yarushimow.github.io/P2-PLUS/

## Lancer en local

```bash
python -m venv .venv && source .venv/bin/activate   # Windows : .venv\Scripts\activate
pip install -r requirements.txt
mkdocs serve        # → http://127.0.0.1:8000, rechargement automatique
```

## Organisation

```
docs/<catégorie>/<matière>/
├── index.md        page d'accueil de la matière
├── cours/          notes de cours (une page par chapitre)
├── td/             corrections de TD
└── fiches/         fiches de révision (_modele.md = modèle, non publié)
```

La navigation est générée depuis l'arborescence ; les fichiers `.pages` fixent
les titres et l'ordre. Les formules LaTeX s'écrivent `$...$` et `$$...$$`.
Admonitions disponibles : `!!! definition`, `!!! theoreme`, `!!! methode`, `!!! piege`.

## Ajouter une matière

```bash
python ajouter_cours.py maths algebre-lineaire --titre "Algèbre linéaire" --code SM302P \
    --description "Espaces vectoriels, matrices, diagonalisation" --icone material-matrix
```

## PDF des profs

À ranger dans un dossier `pdf/` (n'importe où) : il est ignoré par git et exclu du site.

## Publication

Chaque push sur `main` déclenche `.github/workflows/deploy.yml`, qui construit le
site (`mkdocs build --strict`) et le publie sur GitHub Pages.
