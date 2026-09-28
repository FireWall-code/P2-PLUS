---
title: "Ch. 2 — Relativité restreinte"
---

# Chapitre 2 — Théorie de la relativité restreinte

## Les postulats d'Einstein (1905)

!!! definition "Postulat I — Principe de relativité"
    Toutes les lois de la physique (mécanique **et** électromagnétisme) sont les mêmes
    dans tous les référentiels inertiels.

!!! definition "Postulat II — Constance de la vitesse de la lumière"
    La vitesse de la lumière dans le vide est la même dans tous les référentiels
    inertiels, quel que soit le mouvement de la source ou de l'observateur.

## Transformation de Lorentz

Un éclair part de l'origine commune à $t = t' = 0$. D'après le postulat II,
$x^2 + y^2 + z^2 = c^2t^2$ dans S **et** $x'^2 + y'^2 + z'^2 = c^2t'^2$ dans S′.
On cherche une transformation linéaire qui respecte ces deux égalités, et on trouve :

!!! theoreme "Transformation de Lorentz"
    $$
    \gamma = \frac{1}{\sqrt{1 - \dfrac{v^2}{c^2}}}
    \qquad
    \begin{cases}
    x' = \gamma\,(x - vt) \\ y' = y,\quad z' = z \\ t' = \gamma\left(t - \dfrac{vx}{c^2}\right)
    \end{cases}
    \qquad
    \begin{cases}
    x = \gamma\,(x' + vt') \\ y = y',\quad z = z' \\ t = \gamma\left(t' + \dfrac{vx'}{c^2}\right)
    \end{cases}
    $$
    Pour $v \ll c$, $\gamma \to 1$ et on retrouve Galilée.

!!! theoreme "Transformation des vitesses"
    $$
    u'_x = \frac{u_x - v}{1 - \dfrac{v\,u_x}{c^2}}
    \qquad
    u'_y = \frac{u_y}{\gamma\left(1 - \dfrac{v\,u_x}{c^2}\right)}
    $$

## Contraction des longueurs

On mesure les deux extrémités d'une tige **au même instant** dans S ($t_1 = t_2$) :
$L_0 = x'_2 - x'_1 = \gamma\,(x_2 - x_1) = \gamma L$.

!!! theoreme
    $$L = \frac{L_0}{\gamma} < L_0$$
    $L_0$ est la **longueur propre**, mesurée dans le référentiel où l'objet est au repos.
    Seules les longueurs **parallèles** au mouvement sont contractées. L'effet est réciproque.

## Dilatation du temps

Deux événements au **même endroit** dans S′ ($\Delta x' = 0$) :
$\Delta t = \gamma\left(\Delta t' + \dfrac{v\,\Delta x'}{c^2}\right) = \gamma\,\Delta t'$.

!!! theoreme
    $$T = \gamma\,T_0 > T_0$$
    $T_0$ est le **temps propre** : la durée mesurée par une horloge présente aux deux
    événements. C'est la durée la plus courte.

## Simultanéité

En classique, le temps est absolu : deux événements simultanés le sont pour tous.
En relativité, deux événements simultanés dans S ($\Delta t = 0$) mais séparés de
$\Delta x$ ne le sont plus dans S′ : $\Delta t' = -\gamma\,\dfrac{v\,\Delta x}{c^2} \neq 0$.

!!! piege "Classique ou relativiste ?"
    $v \le 0{,}1\,c$ : lois de Newton. $\ v > 0{,}1\,c$ : relativité restreinte.

Exercices : [TD 2](../td/td-2-lorentz.md) · Synthèse : [fiche CE](../fiches/fiche-relativite.md).
