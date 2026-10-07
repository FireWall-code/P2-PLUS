---
title: "Fiche — Domaines et courbes de niveau"
---

# Fiche — Domaines et courbes de niveau

!!! abstract "L'essentiel en 30 secondes"
    - Domaine : dénominateur $\neq 0$, racine $\geq 0$, $\ln > 0$. Bord inclus pour $\geq$, exclu pour $>$ et $\neq$.
    - Pour savoir de quel côté d'une courbe on est : **tester $(0, 0)$**.
    - Courbe de niveau $k$ : résoudre $f(x, y) = k$, reconnaître la courbe, **discuter selon $k$**.

## Méthodes

!!! methode "Domaine de définition"
    1. Lister les conditions.
    2. Les réécrire comme des courbes connues ($y \geq -x - 1$, $x < y^2$, $\frac{x^2}{9} + y^2 < 1$…).
    3. Dessiner, hachurer l'intersection, mettre les bords exclus en pointillés.

!!! methode "Courbes de niveau"
    1. $f(x, y) = k$.
    2. Isoler pour faire apparaître une équation type.
    3. Valeurs de $k$ : courbe, point unique, ou ensemble vide.

## Formulaire

| Équation | Courbe |
|----------|--------|
| $(x - x_0)^2 + (y - y_0)^2 = R^2$ | cercle |
| $y = a(x - x_0)^2 + y_0$ | parabole verticale (min si $a > 0$) |
| $x = a(y - y_0)^2 + x_0$ | parabole couchée (ouverte à droite si $a > 0$) |
| $\frac{(x - x_0)^2}{a^2} + \frac{(y - y_0)^2}{b^2} = 1$ | ellipse |
| $\frac{x^2}{a^2} - \frac{y^2}{b^2} = \pm1$, ou $xy = k$ | hyperbole |

| Surface | Niveaux |
|---------|---------|
| plan $z = ax + by + c$ | droites parallèles |
| $z = x^2 + y^2$ | cercles |
| $z = ax^2 + by^2$ ($a, b > 0$) | ellipses |
| $z = x^2 - y^2$ (selle) | hyperboles |
| $z = x^2$ | droites |

## Pièges classiques

!!! piege "$\frac{1}{\sqrt{A}}$"
    Racine **et** dénominateur : $A > 0$ strict, pas $A \geq 0$.

!!! piege "$xy > -1$"
    Ce n'est pas un demi-plan : c'est la région entre les deux branches de l'hyperbole $xy = -1$.

## Auto-test

??? question "Domaine de $\ln(9 - x^2 - 9y^2)$ ?"
    $\frac{x^2}{9} + y^2 < 1$ : intérieur de l'ellipse de demi-axes 3 et 1, bord exclu.

??? question "Courbes de niveau de $9 - x^2 - y^2$ ?"
    Cercles de rayon $\sqrt{9 - k}$ pour $k < 9$, le point $O$ pour $k = 9$, rien pour $k > 9$.
