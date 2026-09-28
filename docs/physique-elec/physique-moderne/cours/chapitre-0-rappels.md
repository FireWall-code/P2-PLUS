---
title: "Ch. 0 — Rappels de mécanique"
---

# Chapitre 0 — Rappels de mécanique classique

## Unités

| Préfixe | milli | micro | nano | pico | femto |
|---------|:-----:|:-----:|:----:|:----:|:-----:|
| Facteur | $10^{-3}$ | $10^{-6}$ | $10^{-9}$ | $10^{-12}$ | $10^{-15}$ |

$1\ \text{Å} = 10^{-10}$ m, $\quad 1\ \text{eV} = 1{,}6\times10^{-19}$ J, $\quad 1\ \text{MeV} = 10^6$ eV.

!!! methode "Conversions eV ↔ J"
    eV → J : multiplier par $1{,}6\times10^{-19}$. J → eV : diviser.
    Exemple : $35$ MeV $= 35\times10^6 \times 1{,}6\times10^{-19} \approx 5{,}6\times10^{-12}$ J.

## Projection d'un vecteur

Si $\alpha$ est l'angle avec l'axe $Ox$ : $V_x = V\cos\alpha$ et $V_y = V\sin\alpha$.

## Lois de Newton

!!! theoreme "Les trois lois"
    1. **Inertie** : dans un référentiel galiléen, un corps isolé ($\sum\vec F = \vec 0$) est au repos ou en mouvement rectiligne uniforme.
    2. **PFD** : $\sum\vec F_{ext} = m\vec a = \dfrac{d\vec p}{dt}$ avec $\vec p = m\vec v$.
    3. **Action-réaction** : $\vec F_{A/B} = -\vec F_{B/A}$.

## Équations horaires

| Mouvement | $a$ | $v(t)$ | $x(t)$ |
|-----------|-----|--------|--------|
| MRU | 0 | $v_0$ | $v_0 t + x_0$ |
| MRUV | $a_0$ | $a_0 t + v_0$ | $\tfrac12 a_0 t^2 + v_0 t + x_0$ |

Relation indépendante du temps : $v_1^2 - v_0^2 = 2a\,(x_1 - x_0)$.

Chute libre (axe vers le haut) : $y = -\tfrac12 g t^2 + v_0 t + y_0$.

## Choc élastique

!!! definition
    Conservation de la **quantité de mouvement** et de l'**énergie cinétique** :
    $$
    m_1\vec v_{1,i} + m_2\vec v_{2,i} = m_1\vec v_{1,f} + m_2\vec v_{2,f}
    \qquad
    \tfrac12 m_1 v_{1,i}^2 + \tfrac12 m_2 v_{2,i}^2 = \tfrac12 m_1 v_{1,f}^2 + \tfrac12 m_2 v_{2,f}^2
    $$

## Ondes

Une onde transporte de l'énergie sans transporter de matière.
$\lambda = \dfrac{v}{f} = v\,T$ et $f = \dfrac1T$. Pour la lumière dans le vide, $v = c$.

Exemple : son à 340 m/s, audible de 20 Hz à 20 kHz, donc $\lambda$ de 1,7 cm à 17 m.
