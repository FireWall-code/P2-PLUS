---
title: "Ch. 1 — Relativité galiléenne"
---

# Chapitre 1 — Transformations et principe de relativité galiléens

## Référentiels

!!! definition "Référentiel, événement"
    Un **référentiel** est un repère d'espace muni d'une horloge. Un **événement**
    est repéré par $(x, y, z, t)$.

!!! definition "Référentiel inertiel (galiléen)"
    Référentiel dans lequel le principe d'inertie est vérifié. Tout référentiel en
    translation rectiligne uniforme par rapport à un référentiel galiléen est galiléen.
    Le référentiel terrestre est considéré comme galiléen (on néglige sa rotation).

Loi de la gravitation : $F = G\,\dfrac{m_1 m_2}{d^2}$ avec $G = 6{,}67\times10^{-11}$ N·m²·kg⁻².

## Transformation de Galilée

S′ se déplace à la vitesse constante $v$ selon $x$. Les origines coïncident à $t = t' = 0$.

| S → S′ | S′ → S |
|--------|--------|
| $x' = x - vt$ | $x = x' + vt$ |
| $y' = y$, $z' = z$ | $y = y'$, $z = z'$ |
| $t' = t$ | $t = t'$ |

En dérivant : $v'_x = v_x - v$ (**addition des vitesses**) et $a' = a$.

!!! theoreme "Principe de relativité de Newton"
    Comme $a' = a$, la 2e loi de Newton a la même forme dans tous les référentiels
    inertiels : les lois de la **mécanique** sont invariantes par transformation de Galilée.
    Le temps est **absolu**.

## Les limites de Galilée : l'éther et la lumière

- **L'éther** : au XIXe siècle, on imagine un milieu immobile remplissant l'univers,
  support des ondes lumineuses. La lumière irait à $c$ par rapport à l'éther.
- **Aberration stellaire** (Bradley, 1727) : pour voir une étoile, il faut incliner le
  télescope d'un angle $\alpha$ avec $\tan\alpha = v/c$, où $v = 3\times10^4$ m/s est la
  vitesse orbitale de la Terre. On mesure $2\alpha \approx 41''$ sur 6 mois. C'est
  incompatible avec un éther *entraîné* par la Terre.
- **Michelson-Morley** (1887) : l'interféromètre ne détecte aucune différence de vitesse
  de la lumière selon la direction. On ne met en évidence aucun référentiel absolu.

!!! abstract "Conclusions"
    1. La vitesse de la lumière est **invariante** : les lois de l'électromagnétisme sont correctes.
    2. Galilée est valable en mécanique pour les **faibles vitesses**, mais pas pour l'électromagnétisme.
    3. Un objet est **relativiste** si $v > c/10 = 3\times10^7$ m/s.

Exercices : [TD 1](../td/td-1-galilee.md).
