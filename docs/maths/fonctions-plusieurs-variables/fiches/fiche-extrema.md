---
title: "Fiche — Extrema"
---

# Fiche — Extrema

!!! abstract "L'essentiel en 30 secondes"
    - Extremum possible seulement en : point **critique** ($\nabla f = 0$), point **singulier**, point du **bord**.
    - Test : $AC - B^2 > 0$ et $A > 0$ → min ; $A < 0$ → max ; $AC - B^2 < 0$ → selle ; $= 0$ → on ne sait pas.
    - $f$ convexe : point critique = **minimum global**. $f$ concave : **maximum global**.

## Méthodes

!!! methode "Trouver et classer"
    1. $f_x = 0$, $f_y = 0$ : **factoriser** et faire tous les cas.
    2. Hessienne $\begin{pmatrix} A & B \\ B & C\end{pmatrix}$ en chaque point.
    3. Test du déterminant.
    4. Si $\det = 0$ : signe de $f(a + h, b + k) - f(a, b)$ sur des chemins (axes, $y = \pm x$, paraboles). Signe constant : extremum. Change de signe : selle.
    5. Global ? Convexité, ou chemin vers $-\infty$ / $+\infty$ pour dire non.

!!! methode "Domaine fermé borné"
    Points critiques **intérieurs** + étude de **chaque côté** du bord (fonction d'une variable) + **coins**. On compare toutes les valeurs.

!!! methode "Sous contrainte $g(x, y) = c$"
    - Substitution si on peut isoler $y$.
    - Lagrangien $L = f - \lambda(g - c)$ : $L_x = L_y = 0$ et $g = c$.

!!! methode "Problème concret (boîte, somme fixée…)"
    Variables, fonction à optimiser, contrainte pour éliminer une variable, points critiques.

## Formulaire

| $AC - B^2$ | $A$ | Nature |
|:----------:|:---:|--------|
| $> 0$ | $> 0$ | minimum local |
| $> 0$ | $< 0$ | maximum local |
| $< 0$ | | point selle |
| $0$ | | inconclusif |

$n$ variables : hessienne définie positive → min ; définie négative → max ; valeurs propres de signes opposés → selle.

## Pièges classiques

!!! piege "Perdre des points critiques"
    $4x(2 - x^2 - y^2) = 0$ : **ou** $x = 0$, **ou** $x^2 + y^2 = 2$. Diviser par $x$ fait perdre des solutions.

!!! piege "Chaque droite ne suffit pas"
    $(x^2 - y)(3x^2 - y)$ a un minimum en $O$ sur chaque droite, mais $O$ n'est pas un minimum (négatif sur $y = 2x^2$).

!!! piege "Local ≠ global"
    $x^2(1 + y)^3 + y^4$ : minimum local en $O$, mais $f(x, -2) \to -\infty$.

## Auto-test

??? question "Points critiques de $2x^3 - 6xy + 3y^2$ ?"
    $(0, 0)$ selle ($\det = -36$), $(1, 1)$ minimum local ($\det = 36$, $A = 12$), $f = -1$.

??? question "Points critiques de $x^4 - 2x^2y^2 + 2y^2$ ?"
    $(0, 0)$ minimum local (test inconclusif, mais $f = x^4 + 2y^2(1 - x^2) \geq 0$ près de 0) ; $(\pm1, \pm1)$ selles.
