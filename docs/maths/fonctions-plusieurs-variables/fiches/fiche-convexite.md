---
title: "Fiche — Convexité"
---

# Fiche — Convexité

!!! abstract "L'essentiel en 30 secondes"
    - Une variable : convexe $\iff f'' \geq 0$. Courbe sous ses cordes, au-dessus de ses tangentes.
    - Plusieurs variables ($C^2$) : convexe $\iff$ **hessienne SDP** partout ; concave $\iff$ SDN partout.
    - Une hessienne est **symétrique** (Schwarz). Matrice non symétrique : pas une hessienne.
    - Jensen : $f\big(\sum\lambda_i x_i\big) \leq \sum\lambda_i f(x_i)$ si $f$ convexe.

## Méthodes

!!! methode "Nature d'une matrice symétrique $2\times2$ $\begin{pmatrix} a & b \\ b & c\end{pmatrix}$"
    | Conditions | Nature |
    |------------|--------|
    | $a > 0$, $ac - b^2 > 0$ | définie positive |
    | $a < 0$, $ac - b^2 > 0$ | définie négative |
    | $a, c \geq 0$, $ac - b^2 \geq 0$ | SDP |
    | $a, c \leq 0$, $ac - b^2 \geq 0$ | SDN |
    | $ac - b^2 < 0$ | indéfinie |

!!! methode "Matrice $3\times3$"
    - **Définie positive** : $a > 0$, mineur $2\times2$ en haut à gauche $> 0$, $\det > 0$.
    - **Définie négative** : signes alternés $-, +, -$.
    - **SDP / SDN** : il faut **tous** les mineurs principaux (les 3 diagonaux, les 3 déterminants $2\times2$, le $\det$).
    - Deux termes diagonaux de signes opposés : indéfinie tout de suite.

!!! methode "Inégalité par convexité"
    Trouver la fonction convexe/concave cachée ($\ln$, $e^x$, $x\ln x$, $\ln(1 + e^x)$), prouver la convexité par $f''$, appliquer la définition aux bons points et poids, passer à l'exponentielle si besoin.

## Formulaire

| Fonction | Nature |
|----------|--------|
| $x^2$, $e^x$, $\lvert x\rvert$, $x\ln x$ ($x > 0$), $\ln(1 + e^x)$ | convexes |
| $\ln x$, $\sqrt x$ | concaves |
| $ax + b$ | les deux |

| Inégalité classique | D'où elle vient |
|---------------------|-----------------|
| $e^x \geq 1 + x$ | tangente en 0 de $e^x$ |
| $\ln(1 + x) \leq x$ | tangente en 0 de $\ln(1 + x)$ |
| $\frac{a + b + c}{3} \geq \sqrt[3]{abc}$ | $\ln$ concave (Jensen) |

## Pièges classiques

!!! piege "Mineurs « en coin » pour la semi-définie"
    $\begin{pmatrix} 0 & 0 \\ 0 & -1\end{pmatrix}$ : $a = 0$ et $\det = 0$ semblent $\geq 0$, mais $c = -1 < 0$. Pas SDP.

!!! piege "Domaine non convexe"
    On ne parle de fonction convexe que sur un **ensemble convexe**. $\{x + y \neq 0\}$ n'est pas convexe : on étudie chaque demi-plan séparément.

## Auto-test

??? question "$\begin{pmatrix} 2 & 4 \\ 4 & 9\end{pmatrix}$ ?"
    $2 > 0$ et $\det = 2 > 0$ : définie positive, hessienne d'une fonction convexe.

??? question "$f = x^2 + 9y^2 - 6xy + z^2$ est-elle convexe ?"
    Oui : hessienne SDP (et $f = (x - 3y)^2 + z^2$).
