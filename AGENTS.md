# Consignes pour les assistants

Ce dépôt est un site de révision personnel. Les règles ci-dessous priment sur
toute habitude par défaut.

## Git — identité

**Ne jamais surcharger l'identité git.** Les commits doivent porter la
configuration git de l'auteur du dépôt, telle quelle.

Interdits :

- `git -c user.name=… -c user.email=… commit`
- `git commit --author=…`
- les variables `GIT_AUTHOR_NAME`, `GIT_AUTHOR_EMAIL`, `GIT_COMMITTER_NAME`,
  `GIT_COMMITTER_EMAIL`
- toute mention `Co-Authored-By:` ajoutée automatiquement

Un hook `pre-commit` global refuse déjà ces commits. Ne pas le contourner
(`--no-verify`) sans demande explicite.

## Git — historique

- Ne pas réécrire l'historique publié (`rebase`, `amend`, `push --force`) sans
  demande explicite.
- Ne pas pousser sur `main` sans que ce soit demandé.

## Contenu

- Le contenu pédagogique (cours, TD, fiches) est rédigé en français.
- Les formules s'écrivent en LaTeX : `$…$` et `$$…$$`.
- Les admonitions disponibles sont `!!! definition`, `!!! theoreme`,
  `!!! methode`, `!!! piege`.
- Ne pas publier de données personnelles : le calendrier ne doit contenir que
  le module, le type de séance, les horaires et les supports (pas de salles ni
  d'enseignants).

## Avant de proposer un changement

- Vérifier le build : `mkdocs build --strict`.
- Ne pas committer le dossier `site/` ni `index.html` à la racine.
