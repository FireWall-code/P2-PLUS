---
title: "Fiche — Intégrales multiples"
---

# Fiche — Intégrales multiples

!!! abstract "L'essentiel en 30 secondes"
    - **Dessiner le domaine.** Toujours.
    - Fubini : bornes de l'intégrale extérieure = **nombres**, bornes de l'intérieure = **fonctions**.
    - Disque, couronne, secteur, $x^2 + y^2$ dans $f$ : **polaires**, et $dx\,dy = r\,dr\,d\theta$.
    - Ne jamais oublier le jacobien.

## Méthodes

!!! methode "Domaine borné"
    1. Dessiner, calculer les intersections des courbes.
    2. Tranches verticales : $a \leq x \leq b$ (nombres), $\varphi_1(x) \leq y \leq \varphi_2(x)$ (courbe du bas, courbe du haut).
    3. Si la courbe du bas ou du haut change, couper le domaine.
    4. Si une primitive bloque, essayer l'autre ordre.

!!! methode "Changement de variables"
    1. Exprimer $x, y$ en fonction de $u, v$.
    2. Jacobien $J = \begin{vmatrix} x_u & x_v \\ y_u & y_v\end{vmatrix}$, on utilise $\lvert J\rvert$.
    3. Transformer **chaque bord** du domaine.

## Formulaire

| Coordonnées | Formules | Élément |
|-------------|----------|---------|
| polaires | $x = r\cos\theta$, $y = r\sin\theta$ | $r\,dr\,d\theta$ |
| cylindriques | $x = r\cos\theta$, $y = r\sin\theta$, $z$ | $r\,dr\,d\theta\,dz$ |
| sphériques | $x = r\sin\varphi\cos\theta$, $y = r\sin\varphi\sin\theta$, $z = r\cos\varphi$ | $r^2\sin\varphi\,dr\,d\varphi\,d\theta$, $\varphi\in[0, \pi]$ |

| Droite | Angle |
|--------|-------|
| $y = x$ ($x > 0$) | $\frac\pi4$ |
| axe $Oy$ ($y > 0$) | $\frac\pi2$ |
| $y = -x$ ($y > 0$) | $\frac{3\pi}{4}$ |
| $y = -x$ ($y < 0$) | $-\frac\pi4$ |

| Résultat utile | Valeur |
|----------------|--------|
| $\int_0^{2\pi}\cos^2\theta\,d\theta$ | $\pi$ |
| $\int_0^{\pi}\sin^2\theta\,d\theta$ | $\frac\pi2$ |
| $\int_{\mathbb{R}}e^{-u^2}du$ | $\sqrt\pi$ |
| volume de la boule | $\frac43\pi R^3$ |

## Pièges classiques

!!! piege "Le $r$ oublié"
    $\iint_{r \leq 1} dx\,dy = \int_0^{2\pi}\int_0^1 r\,dr\,d\theta = \pi$. Sans le $r$, on trouve $2\pi$ : faux.

!!! piege "Degrés différents en polaires"
    $x^3 y + y^3$ : $r^4(\dots) + r^3(\dots)$. Il faut séparer les deux termes avant d'intégrer en $r$.

!!! tip "Symétries"
    Domaine symétrique par rapport à $Oy$ et fonction impaire en $x$ : intégrale nulle. Pense-y avant de calculer.

## Auto-test

??? question "$\iint_{x^2 + y^2 \leq 1}\frac{dx\,dy}{1 + x^2 + y^2}$ ?"
    $2\pi\int_0^1\frac{r}{1 + r^2}dr = \pi\ln 2$.

??? question "$\iiint z$ sur $x^2 + y^2 \leq 1$, $0 \leq z \leq 1 + x^2 + y^2$ ?"
    Cylindriques : $2\pi\int_0^1\frac{(1 + r^2)^2}{2}r\,dr = \frac{7\pi}{6}$.
