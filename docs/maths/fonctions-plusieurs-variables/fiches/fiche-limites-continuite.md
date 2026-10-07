---
title: "Fiche — Limites et continuité"
---

# Fiche — Limites et continuité

!!! abstract "L'essentiel en 30 secondes"
    - Remplacement direct d'abord. Seul $\frac00$ demande du travail.
    - **Deux chemins, deux valeurs : pas de limite.** Tous les chemins pareils : ça ne prouve **rien**.
    - Pour prouver : **majoration** ($\frac{x^2}{x^2 + y^2} \leq 1$) ou **polaires** ($x = r\cos\theta$, $y = r\sin\theta$).
    - Continue en $a$ $\iff$ $\lim_a f = f(a)$.

## La méthode

!!! methode "Limite en un point"
    1. **Remplacer.** Nombre : c'est fini. $\frac{c}{0}$ avec $c \neq 0$ : pas de limite finie. $\frac00$ : suite.
    2. **Recentrer** si le point n'est pas $(0, 0)$ : $X = x - a$, $Y = y - b$.
    3. **Deviner avec les degrés** ($p$ en haut, $q$ en bas, étages homogènes) : $p > q$ → limite 0 ; $p = q$ → en général pas de limite.
    4. **Chemins** : $(x, mx)$ couvre déjà $(x, 0)$ et $(x, x)$. S'il reste du $m$, prendre $m = 0$ et $m = 1$ : pas de limite. Puis $(0, y)$, puis la parabole qui égalise le bas ($y = x^2$ pour $x^4 + y^2$, $x = y^2$ pour $x^2 + y^4$).
    5. **Preuve** si tout donne $\ell$ :
        - majoration $\lvert f - \ell\rvert \leq g \to 0$ ;
        - polaires : du $r$ en facteur fois un terme borné en $\theta$ → la limite existe ; plus de $r$ et il reste du $\theta$ → pas de limite (donner deux angles, souvent $0$ et $\frac\pi4$).

!!! methode "Continuité d'une fonction en deux morceaux"
    1. Ailleurs : « quotient de fonctions continues à dénominateur non nul ».
    2. Au point : calculer la limite du morceau du haut.
    3. **Comparer à la valeur imposée.** Égale : continue. Pas de limite, ou limite différente : pas continue.

## Formulaire

| Outil | Formule |
|-------|---------|
| majoration de base | $\frac{x^2}{x^2 + y^2} \leq 1$, $\frac{y^2}{x^2 + y^2} \leq 1$ |
| avec une racine | $\lvert x\rvert \leq \sqrt{x^2 + y^2}$ |
| produit | $2\lvert xy\rvert \leq x^2 + y^2$ |
| trigonométrie | $\lvert\sin\rvert \leq 1$, $\lvert\cos\rvert \leq 1$, $\cos^2\theta + \sin^2\theta = 1$ |
| limite usuelle | $\frac{\sin t}{t} \to 1$ quand $t \to 0$ (poser $t = x^2 + y^2$) |

## Pièges classiques

!!! piege "Toutes les droites donnent 0"
    $\frac{x^2 y}{x^4 + y^2}$ : 0 sur toutes les droites, mais $\frac12$ sur $y = x^2$. Pas de limite.

!!! piege "S'arrêter à « la limite existe »"
    Pour la continuité, il faut encore **comparer à $f(a)$**. $\frac{\sin(x^2 + y^2)}{x^2 + y^2}$ avec $f(0, 0) = 0$ n'est pas continue (limite 1).

!!! piege "Oublier de simplifier"
    Sur $y = mx$, avec des étages de même degré, **tous** les $x$ se simplifient. S'il te reste un $x$ tout seul, il y a une erreur de factorisation.

## Auto-test

??? question "$\lim_{(0,0)}\frac{x^2 + y^2 + 3xy}{x^2 + y^2}$ ?"
    Sur $y = mx$ : $\frac{1 + m^2 + 3m}{1 + m^2}$. $m = 0$ donne 1, $m = 1$ donne $\frac52$ : pas de limite.

??? question "$\lim_{(0,0)}\frac{3x^2 y}{x^2 + y^2}$ ?"
    $\lvert f\rvert \leq 3\lvert y\rvert \to 0$ : la limite vaut 0.

??? question "$\lim_{(1,1)}\frac{\sin(x^2 + y^2)}{x^2 + y^2}$ ?"
    Pas de forme indéterminée : remplacement direct, $\frac{\sin 2}{2} \approx 0{,}455$.
