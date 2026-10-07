---
title: "Fiche CE — Chapitres 1 à 3"
---

# Fiche CE — Espace probabilisé, conditionnement, variables discrètes

!!! abstract "L'essentiel en 30 secondes"
    - **Toujours nommer les évènements** et traduire l'énoncé avant de calculer.
    - **Effectifs ≠ probabilités** : on divise par le total… du bon groupe (la condition).
    - « Au moins un » → **complémentaire**. « Raisonner par cas » → **SCE + probabilités totales**.
      « Retourner le sachant » → **Bayes**.
    - $V(X) = E(X^2) - E(X)^2$ et $\mathrm{Cov}(X, Y) = E(XY) - E(X)E(Y)$.
    - Indépendantes $\Rightarrow$ $\mathrm{Cov} = 0$, **jamais l'inverse**.

## Chapitre 1 — Calculer une probabilité

| Formule | À retenir |
|---------|-----------|
| $P(\overline{E}) = 1 - P(E)$ | « au moins un », « pas tous » |
| $P(E \cup F) = P(E) + P(F) - P(E \cap F)$ | on retire ce qui est compté deux fois |
| $\overline{E \cup F} = \overline{E} \cap \overline{F}$, $\overline{E \cap F} = \overline{E} \cup \overline{F}$ | De Morgan |
| $P(A) = P(A \cap B) + P(A \cap \overline{B})$ | découpage selon $B$ |
| $E \subset F \Rightarrow P(E) \le P(F)$ | |
| Uniforme : $P(E) = \frac{\operatorname{card} E}{\operatorname{card} \Omega}$ | cas favorables / cas possibles |

!!! theoreme "Poincaré à 3 évènements"
    $$
    P(E \cup F \cup G) = \Sigma P(\text{seuls}) - \Sigma P(\text{intersections de 2}) + P(E \cap F \cap G)
    $$

!!! methode "Traduire « exactement », « au plus », « au moins »"
    | Phrase | Écriture |
    |--------|----------|
    | Seulement $E$ | $E \cap \overline{F} \cap \overline{G}$ |
    | Aucun | $\overline{E} \cap \overline{F} \cap \overline{G}$ |
    | Au moins un | $E \cup F \cup G$ |
    | Au plus deux | $\overline{E \cap F \cap G}$ |
    | Exactement un parmi $E$, $F$ | $(E \cap \overline{F}) \cup (\overline{E} \cap F)$, $P = P(E) + P(F) - 2P(E \cap F)$ |

!!! piege "Système complet d'évènements"
    Deux conditions : ils **couvrent** $\Omega$ ET sont **deux à deux incompatibles**.
    À vérifier avant toute formule des probabilités totales ou de Bayes.

## Chapitre 2 — Conditionner

!!! definition "Définition et multiplication"
    $$
    P(E \mid F) = \frac{P(E \cap F)}{P(F)}
    \qquad
    P(E \cap F) = P(F)\,P(E \mid F)
    \qquad
    P(E_1 \cap E_2 \cap E_3) = P(E_1)P(E_2 \mid E_1)P(E_3 \mid E_1 \cap E_2)
    $$

!!! theoreme "Probabilités totales et Bayes"
    $$
    P(E) = \sum_i P(E \mid A_i)P(A_i)
    \qquad\qquad
    P(A_j \mid E) = \frac{P(E \mid A_j)P(A_j)}{\sum_i P(E \mid A_i)P(A_i)}
    $$

!!! methode "Arbre ou tableau ?"
    - L'énoncé donne des **pourcentages « parmi »** → **arbre** (niveau 1 = causes, niveau 2 = effet).
    - L'énoncé donne des **effectifs croisés** → **tableau de contingence** (lignes × colonnes + totaux).
    - Dans un tableau : $P(A \mid S) = \dfrac{\text{case } A \cap S}{\text{total de la colonne } S}$.

!!! theoreme "Indépendance"
    $E$, $F$ indépendants $\iff P(E \cap F) = P(E)P(F) \iff P(E \mid F) = P(E)$.
    Se transmet aux complémentaires. Pour trois évènements : **4 égalités**.

| | Incompatibles | Indépendants |
|-|---------------|--------------|
| Définition | $E \cap F = \emptyset$ | $P(E \cap F) = P(E)P(F)$ |
| Dépend de $P$ ? | non | oui |
| Lien | possibles et incompatibles $\Rightarrow$ **pas** indépendants | |

!!! piege "Les deux pièges du chapitre"
    - $P(A \mid B) \neq P(B \mid A)$ : test positif sachant malade ≠ malade sachant test positif.
    - $P(A \mid B) + P(\overline{A} \mid B) = 1$ ✓ mais $P(A \mid B) + P(A \mid \overline{B}) = 1$ ✗.

## Chapitre 3 — Variables aléatoires discrètes

!!! methode "Étudier une variable $X$"
    1. **Support** $X(\Omega)$.
    2. **Loi** : $P(X = x)$ pour chaque valeur ; vérifier $\sum = 1$.
    3. $E(X) = \sum x\,P(X = x)$, $E(X^2) = \sum x^2 P(X = x)$, $V = E(X^2) - E(X)^2$, $\sigma = \sqrt V$.

    Loi depuis la fonction de répartition : $P(X = x_k) = F(x_k) - F(x_{k-1})$.
    Loi de $Y = g(X)$ : regrouper les $x$ qui donnent le même $y$ et additionner.

| Propriété | Formule | Condition |
|-----------|---------|-----------|
| Linéarité | $E(aX + bY) = aE(X) + bE(Y)$ | toujours |
| Transfert | $E(g(X)) = \sum g(x)P(X = x)$ | toujours |
| Variance affine | $V(aX + b) = a^2V(X)$ | toujours |
| Variance d'une somme | $V(X + Y) = V(X) + V(Y) + 2\mathrm{Cov}(X, Y)$ | toujours |
| | $V(X + Y) = V(X) + V(Y)$ | si indépendantes |
| Centrée réduite | $Z = \frac{X - E(X)}{\sigma(X)}$ : $E(Z) = 0$, $V(Z) = 1$ | |

!!! methode "Couple $(X, Y)$ en tableau"
    1. **Marginales** : sommes des lignes et des colonnes.
    2. **Indépendance** : tester $P(X = x, Y = y) = P(X = x)P(Y = y)$ ; une case qui échoue suffit
       pour dire non. Lignes proportionnelles $\iff$ indépendance.
    3. $E(XY) = \sum_{\text{cases}} x\,y\,P(X = x, Y = y)$.
    4. $\mathrm{Cov} = E(XY) - E(X)E(Y)$, puis $\rho = \dfrac{\mathrm{Cov}}{\sigma_X\sigma_Y} \in [-1, 1]$.
    5. Conditionnelle : $P(X = x \mid Y = y) = \dfrac{\text{case}}{\text{total de la ligne/colonne } Y = y}$.

!!! piege "Covariance"
    $\mathrm{Cov} \neq 0 \Rightarrow$ pas indépendantes ✓. $\mathrm{Cov} = 0 \Rightarrow$ indépendantes ✗
    (contre-exemple : $X$ uniforme sur $\{-1, 0, 1\}$, $Y = X^2$).
    $|\rho| = 1 \iff Y = aX + b$.

## Formulaire des lois usuelles

| Loi | Quand ? | $P(X = k)$ | $E$ | $V$ |
|-----|---------|-----------|:---:|:---:|
| $\mathcal{U}([\![1, n]\!])$ | valeurs équiprobables | $\frac1n$ | $\frac{n+1}{2}$ | $\frac{n^2 - 1}{12}$ |
| $\mathcal{B}(p)$ | 1 essai succès/échec | $P(X = 1) = p$ | $p$ | $p(1-p)$ |
| $\mathcal{B}(n, p)$ | **nb de succès** sur $n$ essais | $\binom nk p^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| $\mathcal{BN}(r, p)$ | **nb d'essais** pour $r$ succès | $\binom{k-1}{r-1}p^r(1-p)^{k-r}$ | $\frac rp$ | $\frac{r(1-p)}{p^2}$ |
| $\mathcal{G}(p) = \mathcal{BN}(1, p)$ | rang du 1er succès | $(1-p)^{k-1}p$ | $\frac1p$ | $\frac{1-p}{p^2}$ |
| $\mathcal{P}(\lambda)$ | évènements rares, moyenne $\lambda$ | $e^{-\lambda}\frac{\lambda^k}{k!}$ | $\lambda$ | $\lambda$ |

- Sommes indépendantes : $\mathcal{B}(n, p) + \mathcal{B}(m, p) = \mathcal{B}(n + m, p)$ ; $\mathcal{P}(\lambda) + \mathcal{P}(\theta) = \mathcal{P}(\lambda + \theta)$.
- $n$ grand, $p$ petit : $\mathcal{B}(n, p) \approx \mathcal{P}(np)$.

## Auto-test

??? question "Un test détecte 99 % des malades, 2 % de faux positifs, 1 % de malades. $P(M \mid +)$ ?"
    $\dfrac{0{,}99 \times 0{,}01}{0{,}99 \times 0{,}01 + 0{,}02 \times 0{,}99} = \dfrac{1}{3}$.
    Le dénominateur vient des **probabilités totales**.

??? question "$P(A) = 0{,}5$, $P(B) = 0{,}4$, $P(A \cup B) = 0{,}7$. Indépendants ?"
    $P(A \cap B) = 0{,}5 + 0{,}4 - 0{,}7 = 0{,}2 = 0{,}5 \times 0{,}4$ : **oui**.

??? question "$X \sim \mathcal{B}(10;\ 0{,}3)$ : $P(X \ge 1)$, $E(X)$, $V(X)$ ?"
    $1 - 0{,}7^{10} \approx 0{,}972$ ; $E = 3$ ; $V = 2{,}1$.

??? question "$V(3X - 2)$ si $V(X) = 4$ ?"
    $9 \times 4 = 36$ (le $-2$ disparaît).

??? question "$E(X) = 2$, $E(Y) = 3$, $E(XY) = 6$. Indépendantes ?"
    $\mathrm{Cov} = 0$, mais on **ne peut pas conclure** : la covariance nulle ne prouve pas l'indépendance.

??? question "Pannes : $\mathcal{P}(2)$ par mois. Probabilité d'au moins 2 pannes en un mois ?"
    $1 - e^{-2}(1 + 2) = 1 - 3e^{-2} \approx 0{,}594$.

[:material-dice-multiple: S'entraîner avec le simulateur](../entrainement/index.md){ .md-button .md-button--primary }
[:material-help-circle: Les 62 questions de révision](../td/questions-revision.md){ .md-button }
