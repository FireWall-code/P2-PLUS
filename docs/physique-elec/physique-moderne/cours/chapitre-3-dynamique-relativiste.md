---
title: "Ch. 3 — Dynamique relativiste"
---

# Chapitre 3 — Dynamique relativiste

## Masse et quantité de mouvement

Avec $\vec p = m\vec v$ et $m$ constante, la quantité de mouvement ne serait pas conservée
d'un référentiel à l'autre sous Lorentz. Il faut redéfinir la masse.

!!! example "Expérience de Bertozzi (1964)"
    Des électrons accélérés entrent dans un champ magnétique $\vec B \perp \vec v$ :
    $qvB = \dfrac{mv^2}{R}$, soit $R = \dfrac{mv}{qB}$. À haute vitesse, la mesure s'écarte
    de la prévision classique : tout se passe comme si la masse augmentait,
    $m = \gamma\,m_0$. La vitesse plafonne à $c$.

!!! definition "Masse et impulsion relativistes"
    $$
    m = \gamma\,m_0 \qquad \vec p = \gamma\,m_0\,\vec v
    $$
    $m_0$ est la **masse au repos**. Pour $v \ll c$ : $\gamma \to 1$ et $\vec p \to m_0\vec v$.

Le PFD devient $\vec F = \dfrac{d\vec p}{dt} = \dfrac{d(\gamma m_0 \vec v)}{dt}$.

## Énergie relativiste

L'énergie cinétique est le travail fourni pour amener la particule du repos à $v$ :
$T = \int \vec F\cdot d\vec l$. Avec $m^2(c^2 - v^2) = m_0^2c^2$, on obtient
$T = \int_{m_0}^m c^2\,dm = (m - m_0)\,c^2$.

!!! theoreme "Énergie totale"
    $$
    E = mc^2 = \gamma\,m_0c^2 = T + m_0c^2
    \qquad
    T = (\gamma - 1)\,m_0c^2
    \qquad
    E_0 = m_0c^2
    $$
    $E = mc^2$ traduit l'**équivalence masse-énergie**.

!!! theoreme "Relation énergie-impulsion"
    $$
    E^2 = p^2c^2 + m_0^2c^4
    $$
    (Il suffit de remplacer $E = \gamma m_0c^2$ et $p = \gamma m_0 v$.) Pour un photon, $m_0 = 0$ et $E = pc$.

## Unités de la physique des particules

- $1\ u = 1{,}66\times10^{-27}$ kg $= 931{,}5$ MeV/$c^2$ (unité de masse atomique) ;
- $m_ec^2 = 0{,}511$ MeV ;
- énergies en eV, keV, MeV, GeV ; impulsions en MeV/$c$ ; masses en MeV/$c^2$.

Exercices : [TD 3](../td/td-3-dynamique.md) · Synthèse : [fiche CE](../fiches/fiche-relativite.md).
