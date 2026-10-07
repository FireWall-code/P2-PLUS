---
title: "Ch. 5 — Mécanique quantique"
---

# Chapitre 5 — Introduction à la mécanique quantique

## Le paquet d'ondes

Une onde simple $y = A\sin(kx - \omega t)$ n'est pas localisée, et sa vitesse de phase
$v_{\varphi} = \omega/k = c^2/v$ dépasse $c$ pour une particule matérielle. Elle ne peut donc pas
représenter une particule.

**Solution** : on superpose des ondes de nombres d'onde voisins ($k_0 \pm \Delta k$). Leur somme
forme un **paquet d'ondes**, localisé, qui se déplace à la **vitesse de groupe**

$$
v_g = \frac{d\omega}{dk} = v \quad \text{(la vitesse de la particule)}
$$

Plus on veut localiser la particule, plus il faut une large gamme $\Delta k$.

## La fonction d'onde

!!! definition "Fonction d'onde Ψ"
    L'état d'une particule est décrit par $\Psi(x, y, z, t)$, complexe et sans sens
    physique direct. Ce qui a un sens, c'est la **densité de probabilité** :
    $|\Psi(x)|^2\,dx = \Psi^*\Psi\,dx$ est la probabilité de trouver la particule entre $x$ et $x + dx$.

La mécanique quantique est **probabiliste** (on ne parle plus de trajectoire),
la mécanique classique est déterministe.

!!! definition "Conditions sur Ψ"
    - Ψ et sa dérivée sont **continues** ;
    - Ψ s'annule à l'infini ;
    - **normalisation** : $\displaystyle\int_{-\infty}^{+\infty} |\Psi(x)|^2\,dx = 1$ (la particule est forcément quelque part).

## Principe d'incertitude de Heisenberg

!!! theoreme
    $$
    \Delta x\,\Delta p_x \ge \frac{\hbar}{2} \qquad \hbar = \frac{h}{2\pi}
    $$
    On ne peut pas connaître simultanément et exactement la position et l'impulsion
    d'une particule. Ce n'est pas une limite des instruments : c'est une propriété de la nature.

## Opérateurs

Chaque grandeur mesurable (**observable**) est associée à un opérateur.

| Grandeur | Opérateur (1D) |
|----------|----------------|
| Position | $\hat x\,\Psi = x\,\Psi$ |
| Impulsion | $\hat p_x = -i\hbar\,\dfrac{d}{dx}$ |
| Énergie cinétique | $\hat E_c = \dfrac{\hat p^2}{2m} = -\dfrac{\hbar^2}{2m}\dfrac{d^2}{dx^2}$ |
| Énergie totale | $\hat E = i\hbar\,\dfrac{\partial}{\partial t}$ |
| Hamiltonien | $\hat H = \hat E_c + \hat V$ |

!!! definition "Valeur moyenne"
    $$
    \langle A \rangle = \int \Psi^*\,\hat A\,\Psi\,dx \quad \text{(Ψ normalisée)}
    $$

## Équation de Schrödinger

Indépendante du temps (état stationnaire, $V$ indépendant de $t$) :

!!! theoreme
    $$
    \hat H\,\Psi = E\,\Psi
    \quad\Longleftrightarrow\quad
    -\frac{\hbar^2}{2m}\frac{d^2\Psi}{dx^2} + V(x)\,\Psi = E\,\Psi
    $$
    C'est une équation **aux valeurs propres** : seules certaines énergies $E$ donnent une
    solution acceptable, donc **l'énergie est quantifiée** dès que la particule est confinée.

## Potentiel constant V₀ : les 3 cas

On écrit $\Psi'' + \dfrac{2m(E - V_0)}{\hbar^2}\,\Psi = 0$.

| Cas | On pose | Solution |
|-----|---------|----------|
| Particule libre ($V_0 = 0$) | $k = \dfrac{\sqrt{2mE}}{\hbar}$ | $\Psi = A e^{ikx} + B e^{-ikx}$, ou $A\sin kx + B\cos kx$ |
| $E > V_0$ | $k = \dfrac{\sqrt{2m(E - V_0)}}{\hbar}$ | oscillante : $A e^{ikx} + B e^{-ikx}$ |
| $E < V_0$ | $k = \dfrac{\sqrt{2m(V_0 - E)}}{\hbar}$ | exponentielle : $A e^{kx} + B e^{-kx}$ |

Le 3e cas est **interdit en classique** mais possible en quantique : c'est l'**effet tunnel**.

Application complète (puits infini, effet tunnel) : [TD 5](../td/td-5-quantique.md).
