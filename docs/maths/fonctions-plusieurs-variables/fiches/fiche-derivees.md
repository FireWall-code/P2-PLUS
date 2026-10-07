---
title: "Fiche — Dérivées partielles"
---

# Fiche — Dérivées partielles et différentiabilité

!!! abstract "L'essentiel en 30 secondes"
    - $f_x$ : $y$ est une constante. $f_y$ : $x$ est une constante.
    - **Schwarz** : $f_{xy} = f_{yx}$ si les dérivées secondes sont continues.
    - Au **point problématique**, on revient à la définition $\lim_{h\to0}\frac{f(a + h, b) - f(a, b)}{h}$.
    - $C^1$ (dérivées partielles continues) ⇒ différentiable ⇒ continue.

## Méthodes

!!! methode "Différentiabilité en $(0, 0)$ d'une fonction en deux morceaux"
    1. $f_x$, $f_y$ hors de $(0, 0)$ : règles de calcul.
    2. $f_x(0, 0)$, $f_y(0, 0)$ : définition avec $h$.
    3. Limite de $f_x(x, y)$ et $f_y(x, y)$ en $(0, 0)$ (polaires ou majoration) : égale aux valeurs de l'étape 2 ?
    4. Oui pour les deux : $f$ est $C^1$ donc différentiable.

!!! methode "EDP"
    - **Primitiver** : la constante devient une fonction de l'autre variable. $f_x = 2x + y \Rightarrow f = x^2 + xy + g(y)$.
    - **Changement de variables** $f(x, y) = g(u, v)$ : $f_x = g_u u_x + g_v v_x$, $f_y = g_u u_y + g_v v_y$, on remplace, l'équation se simplifie en $g_u = 0$ ou $g_v = \dots$.

## Formulaire

| Notion | Formule |
|--------|---------|
| définition | $f_x(a, b) = \lim\limits_{h\to0}\frac{f(a + h, b) - f(a, b)}{h}$ |
| chaîne, une variable | $\frac{df}{dt} = f_x\,x'(t) + f_y\,y'(t)$ |
| chaîne, deux variables | $f_u = f_x x_u + f_y y_u$ |
| gradient | $\nabla f = (f_x, f_y)$ : direction de plus forte montée, $\perp$ aux niveaux |
| dérivée directionnelle | $D_{\vec u} f = \nabla f\cdot\vec u$ avec $\lVert\vec u\rVert = 1$ |
| Laplace | $f_{xx} + f_{yy} = 0$ (harmonique) |
| ondes | $f_{tt} = c^2 f_{xx}$ |

## Pièges classiques

!!! piege "Dérivées partielles qui existent"
    $\frac{2xy}{x^2 + y^2}$ (prolongée par 0) a $f_x(0, 0) = f_y(0, 0) = 0$ et n'est **pas continue**. L'existence des dérivées partielles ne suffit pas.

!!! piege "Oublier de normer $\vec u$"
    Direction $(3, -4)$ : on divise par 5 avant le produit scalaire.

!!! piege "Appliquer les formules au point problématique"
    En $(0, 0)$, la formule obtenue par la règle du quotient n'a pas de sens ($\frac00$). Seule la définition marche.

## Auto-test

??? question "$f_x$ et $f_y$ de $\frac{x + y}{1 + x^2 y}$ ?"
    $f_x = \frac{1 - x^2 y - 2xy^2}{(1 + x^2 y)^2}$, $f_y = \frac{1 - x^3}{(1 + x^2 y)^2}$.

??? question "$f_x(0, 0)$ pour $\frac{2x^3 - y^3}{x^2 + 3y^2}$ prolongée par 0 ?"
    $f(h, 0) = 2h$ donc $f_x(0, 0) = 2$.

??? question "Solutions de $f_{xy} = 0$ ?"
    $f(x, y) = G(x) + H(y)$.
