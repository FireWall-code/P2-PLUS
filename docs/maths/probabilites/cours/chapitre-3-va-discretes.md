---
title: "Ch. 3 — Variables aléatoires discrètes"
---

# Chapitre 3 — Variables aléatoires discrètes

Souvent, ce n'est pas le résultat de l'expérience qui nous intéresse mais **un nombre
calculé à partir de lui** : la somme de deux dés, une note, un nombre d'appels…

## 3.1 Définitions de base

!!! definition "Variable aléatoire"
    Une variable aléatoire est une fonction $X : \Omega \to \mathbb{R}$.
    L'ensemble de ses valeurs possibles $X(\Omega)$ est son **support**.
    $X$ est **discrète** si $X(\Omega)$ est fini ou dénombrable.

Les sommes, produits, multiples et composées $f(X)$ de variables aléatoires sont encore
des variables aléatoires (exemple : la note finale $0{,}6X + 0{,}4Y$).

!!! theoreme "Le SCE associé à $X$"
    Les évènements $(X = x)$, pour $x \in X(\Omega)$, forment un **système complet
    d'évènements**. C'est ce qui permet d'utiliser les probabilités totales avec une variable.

!!! definition "Loi de probabilité"
    La loi de $X$ est la donnée des $p_i = P(X = x_i)$ pour tout $x_i \in X(\Omega)$.
    On la présente en tableau. On vérifie toujours :

    $$
    p_i \ge 0 \qquad\text{et}\qquad \sum_i p_i = 1
    $$

!!! definition "Fonction de répartition"
    $$
    F_X(x) = P(X \le x) = \sum_{x_i \le x} P(X = x_i)
    $$

    Pour une variable discrète, $F_X$ est **en escalier** : chaque saut, en $x_i$,
    a pour hauteur $P(X = x_i)$. Pour retrouver la loi : $P(X = x_i) = F(x_i) - F(x_{i-1})$.

!!! methode "Fiche méthode #2 — Loi de $Y = g(X)$"
    1. Déterminer le **support** $Y(\Omega)$ (appliquer $g$ à chaque valeur de $X$).
    2. Pour chaque $y$, écrire $(Y = y)$ comme une **réunion** d'évènements $(X = x_i)$.
    3. **Additionner** les probabilités correspondantes.

    Exemple : si $Y = X^2$, alors $(Y = 1) = (X = -1) \cup (X = 1)$, donc
    $P(Y = 1) = P(X = -1) + P(X = 1)$.

## 3.2 Couples de variables discrètes

!!! definition "Loi conjointe"
    La loi conjointe de $(X, Y)$ est la donnée des $P(X = x, Y = y)$ pour tous les couples
    $(x, y)$. On la range dans un **tableau à double entrée**.

!!! theoreme "Lois marginales"
    $$
    P(X = x) = \sum_{y} P(X = x, Y = y)
    \qquad
    P(Y = y) = \sum_{x} P(X = x, Y = y)
    $$

    Dans le tableau : on **somme chaque ligne et chaque colonne**.
    La loi conjointe donne les marginales, mais **pas l'inverse** : deux tableaux
    différents peuvent avoir les mêmes marges.

!!! definition "Variables indépendantes"
    $X$ et $Y$ sont indépendantes si, **pour tous** $x$ et $y$,

    $$
    P(X = x, Y = y) = P(X = x)\,P(Y = y)
    $$

    Un seul couple qui ne vérifie pas l'égalité suffit pour conclure « non indépendantes »
    (une case à 0 alors que les deux marges sont non nulles, par exemple).
    Astuce : dans un tableau indépendant, les **lignes sont proportionnelles** entre elles.

!!! example "Probabilité conditionnelle sur un tableau"
    $$
    P(X = x \mid Y = y) = \frac{P(X = x, Y = y)}{P(Y = y)}
    \qquad
    P(X = 1 \mid Y \ge 2) = \frac{\sum_{y \ge 2} P(X = 1, Y = y)}{\sum_{y \ge 2} P(Y = y)}
    $$

## 3.3 Espérance, variance, écart-type

!!! definition "Espérance (moyenne théorique)"
    $$
    E(X) = \sum_{x \in X(\Omega)} x\,P(X = x)
    $$

    Si le support est infini, la série peut diverger : l'espérance n'existe pas toujours
    (paradoxe de Saint-Pétersbourg, gain $2^n$ avec probabilité $1/2^n$).

!!! theoreme "Linéarité"
    $$
    E(aX + bY) = a\,E(X) + b\,E(Y)
    $$

    Vrai **toujours**, même si $X$ et $Y$ ne sont pas indépendantes.

!!! theoreme "Théorème du transfert"
    $$
    E\big(g(X)\big) = \sum_{x} g(x)\,P(X = x)
    $$

    Pas besoin de chercher la loi de $g(X)$. Par exemple $E(X^2) = \sum x^2\,P(X = x)$.
    Pour un couple : $E(XY) = \sum_{x,y} x\,y\,P(X = x, Y = y)$.

!!! piege "$E(X^2) \neq E(X)^2$"
    En général $E(X^2) \ge E(X)^2$ (la différence est justement la variance).

!!! definition "Variance et écart-type"
    $$
    V(X) = E\Big(\big(X - E(X)\big)^2\Big) = E(X^2) - E(X)^2
    \qquad
    \sigma(X) = \sqrt{V(X)}
    $$

    La 1re formule est la **définition** (écart quadratique moyen à la moyenne), la 2e
    (Koenig-Huygens) sert **aux calculs**. $\sigma$ a la même unité que $X$ et mesure la dispersion.

!!! theoreme "Règles de calcul de la variance"
    - $V(aX + b) = a^2\,V(X)$ (une translation ne change pas la dispersion).
    - Si $X$ et $Y$ sont **indépendantes** : $V(X + Y) = V(X) + V(Y)$.
    - En général : $V(X + Y) = V(X) + V(Y) + 2\,\mathrm{Cov}(X, Y)$.

!!! definition "Variable centrée réduite"
    $Z = \dfrac{X - E(X)}{\sigma(X)}$ vérifie $E(Z) = 0$ et $V(Z) = 1$.

!!! definition "Moments"
    Moment d'ordre $n$ : $m_n = E(X^n)$. Moment centré d'ordre $n$ : $\mu_n = E\big((X - E(X))^n\big)$.
    Ainsi $m_1 = E(X)$ et $\mu_2 = V(X)$.

## 3.4 Covariance et corrélation

!!! definition "Covariance"
    $$
    \mathrm{Cov}(X, Y) = E(XY) - E(X)\,E(Y)
    $$

    $\mathrm{Cov}(X, X) = V(X)$. La covariance est **symétrique** et **bilinéaire** :
    $\mathrm{Cov}(\alpha X + \beta Y, Z) = \alpha\,\mathrm{Cov}(X, Z) + \beta\,\mathrm{Cov}(Y, Z)$.

!!! theoreme "Indépendance et covariance"
    $$
    X, Y \text{ indépendantes} \implies \mathrm{Cov}(X, Y) = 0
    $$

    La **contraposée** est l'outil pratique : $\mathrm{Cov}(X, Y) \neq 0 \implies$ non indépendantes.

!!! piege "La réciproque est fausse"
    $X$ uniforme sur $\{-1, 0, 1\}$ et $Y = X^2$ : $Y$ dépend complètement de $X$,
    mais $E(X) = 0$ et $E(XY) = E(X^3) = 0$, donc $\mathrm{Cov}(X, Y) = 0$.

!!! definition "Coefficient de corrélation linéaire"
    $$
    \rho(X, Y) = \frac{\mathrm{Cov}(X, Y)}{\sigma(X)\,\sigma(Y)} \in [-1, 1]
    $$

    - $\rho > 0$ : $Y$ a tendance à augmenter avec $X$ ; $\rho < 0$ : à diminuer.
    - $|\rho| = 1 \iff Y = aX + b$ (relation affine exacte).
    - $\rho = 0$ : pas de corrélation **linéaire** (ce qui n'est pas l'indépendance).

## 3.5 Lois usuelles

| Loi | Situation | Support | $P(X = k)$ | $E(X)$ | $V(X)$ |
|-----|-----------|---------|------------|:------:|:------:|
| Uniforme $\mathcal{U}([\![ 1, n ]\!])$ | valeurs équiprobables | $[\![ 1, n ]\!]$ | $\dfrac1n$ | $\dfrac{n+1}{2}$ | $\dfrac{n^2-1}{12}$ |
| Bernoulli $\mathcal{B}(p)$ | une expérience succès / échec | $\{0, 1\}$ | $P(X=1) = p$ | $p$ | $p(1-p)$ |
| Binomiale $\mathcal{B}(n, p)$ | **nombre de succès** en $n$ essais indépendants | $[\![ 0, n ]\!]$ | $\binom{n}{k} p^k (1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| Binomiale négative $\mathcal{BN}(r, p)$ | **nombre d'essais** pour obtenir $r$ succès | $[\![ r, +\infty [\![$ | $\binom{k-1}{r-1} p^r (1-p)^{k-r}$ | $\dfrac{r}{p}$ | $\dfrac{r(1-p)}{p^2}$ |
| Géométrique $= \mathcal{BN}(1, p)$ | rang du **1er** succès | $\mathbb{N}^*$ | $(1-p)^{k-1} p$ | $\dfrac1p$ | $\dfrac{1-p}{p^2}$ |
| Poisson $\mathcal{P}(\lambda)$ | évènements **rares** (accidents, pannes, coquilles) | $\mathbb{N}$ | $e^{-\lambda} \dfrac{\lambda^k}{k!}$ | $\lambda$ | $\lambda$ |

!!! methode "Reconnaître la bonne loi"
    1. On **fixe le nombre d'essais** et on **compte les succès** → binomiale.
    2. On **fixe le nombre de succès** voulu et on **compte les essais** → binomiale négative
       (géométrique si on attend le 1er succès).
    3. On compte des évènements **rares** dans une période ou un espace, avec une
       **moyenne** $\lambda$ connue → Poisson.
    4. Tirages **sans remise** dans une petite population → ni binomiale ni géométrique
       (compter directement, ou loi uniforme comme pour les clés du serrurier).

!!! theoreme "Sommes de lois indépendantes"
    - $X \sim \mathcal{B}(n, p)$ et $Y \sim \mathcal{B}(m, p)$ indépendantes $\Rightarrow X + Y \sim \mathcal{B}(n + m, p)$.
    - $X \sim \mathcal{P}(\lambda)$ et $Y \sim \mathcal{P}(\theta)$ indépendantes $\Rightarrow X + Y \sim \mathcal{P}(\lambda + \theta)$.
    - Une binomiale est une **somme de $n$ Bernoulli** indépendantes : d'où $E = np$ et $V = np(1-p)$.

!!! theoreme "Approximation binomiale → Poisson"
    Quand $n \to +\infty$, $p \to 0$ et $np \to \lambda$ : $\mathcal{B}(n, p) \approx \mathcal{P}(\lambda)$.
    En pratique : $n$ grand, $p$ petit, on prend $\lambda = np$.

!!! piege "Calculs de « au moins » et « au plus »"
    - $P(X \ge 1) = 1 - P(X = 0)$ : toujours passer par le complémentaire.
    - $P(X > 2) = 1 - P(X = 0) - P(X = 1) - P(X = 2)$.
    - Binomiale : $P(X = 0) = (1-p)^n$. Poisson : $P(X = 0) = e^{-\lambda}$.

## Acquis d'apprentissage

- [ ] Déterminer la loi d'une variable discrète et celle de $Y = g(X)$.
- [ ] Calculer $E$, $V$, $\sigma$.
- [ ] Construire une loi conjointe, en déduire les marginales, tester l'indépendance.
- [ ] Calculer $\mathrm{Cov}(X, Y)$ et $\rho(X, Y)$.
- [ ] Reconnaître et utiliser les lois uniforme, binomiale, binomiale négative et de Poisson.
