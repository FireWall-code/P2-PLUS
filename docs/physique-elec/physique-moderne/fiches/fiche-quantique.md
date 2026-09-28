---
title: "Fiche — Onde, matière et quantique (ch. 4-5)"
---

# Fiche — Onde, matière et mécanique quantique (chapitres 4 et 5)

!!! abstract "L'essentiel en 30 secondes"
    - Photon : $E = h\nu = \dfrac{hc}{\lambda} = pc$, et $p = \dfrac{h}{\lambda}$.
    - Photoélectrique : $h\nu = W_0 + eV_0$. C'est la **fréquence** qui compte, pas l'intensité.
    - Compton : $\Delta\lambda = \dfrac{h}{m_ec}(1 - \cos\theta)$.
    - De Broglie : $\lambda = h/p$. Heisenberg : $\Delta x\,\Delta p \ge \hbar/2$.
    - Puits infini : $E_n = \dfrac{n^2\pi^2\hbar^2}{2ma^2}$, $\ \psi_n = \sqrt{\tfrac2a}\sin\dfrac{n\pi x}{a}$.

## Constantes et raccourcis

| | |
|-|-|
| $h = 6{,}626\times10^{-34}$ J·s | $\hbar = h/2\pi = 1{,}055\times10^{-34}$ J·s |
| $hc \approx 1242$ eV·nm | $h/(m_ec) \approx 2{,}43$ pm |
| Wien : $\lambda_{max}T = 2{,}898\times10^{-3}$ m·K | Stefan : $\sigma = 5{,}67\times10^{-8}$ W·m⁻²·K⁻⁴ |

## Corps noir

!!! methode
    - Pic d'émission : $T = \dfrac{2{,}898\times10^{-3}}{\lambda_{max}}$ (en **kelvins**).
    - Puissance d'une sphère : $P = \sigma T^4 \times 4\pi R^2$. Bilan net : $\sigma S\,(T^4 - T_{env}^4)$.

## Effet photoélectrique

!!! methode "Enchaînement type"
    1. $E_{photon} = hc/\lambda$ (convertir en eV : ÷ $1{,}6\times10^{-19}$).
    2. $E_{c,max} = E_{photon} - W_0$ (si négatif : pas d'électrons).
    3. $V_0 = E_{c,max}/e$ (en eV, c'est le même nombre, en volts).
    4. $v_{max} = \sqrt{2E_{c,max}/m_e}$ (avec $E_c$ en **joules**).
    - Seuil : $\nu_0 = W_0/h$, $\ \lambda_0 = hc/W_0$.
    - Nombre de photons : $N = \dfrac{P}{h\nu}$ (par unité de surface : $I/h\nu$).

!!! piege
    Augmenter l'intensité augmente le **nombre** d'électrons (le courant), pas leur énergie.
    Sous la fréquence seuil, rien ne sort, quelle que soit l'intensité.

## Effet Compton

- $\theta = 90°$ : $\Delta\lambda = 2{,}43$ pm. $\ \theta = 180°$ : $\Delta\lambda_{max} = 4{,}85$ pm.
- Énergie de l'électron de recul : $T = hc\left(\dfrac{1}{\lambda_i} - \dfrac{1}{\lambda_f}\right)$.

## De Broglie

$\lambda = \dfrac{h}{mv} = \dfrac{h}{\sqrt{2mE_c}}$. Électron de 54 eV : 0,167 nm.
Ballon ou voiture : $\sim 10^{-35}$ m, rien d'observable.

## Mécanique quantique

| Notion | À retenir |
|--------|-----------|
| $\lvert\Psi\rvert^2$ | densité de probabilité de présence |
| Normalisation | $\int \lvert\Psi\rvert^2 dx = 1$ |
| Impulsion | $\hat p = -i\hbar\,d/dx$ |
| Hamiltonien | $\hat H = -\dfrac{\hbar^2}{2m}\dfrac{d^2}{dx^2} + V$ |
| Schrödinger | $\hat H\Psi = E\Psi$ |
| Moyenne | $\langle A\rangle = \int\Psi^*\hat A\Psi\,dx$ |

!!! methode "Puits infini de largeur a"
    1. Dans le puits : $\psi'' + k^2\psi = 0$ avec $k = \sqrt{2mE}/\hbar$.
    2. $\psi(0) = 0$ ⟹ $\psi = B\sin kx$. $\ \psi(a) = 0$ ⟹ $k = n\pi/a$.
    3. Normalisation : $B = \sqrt{2/a}$.
    4. $E_n = \dfrac{\hbar^2k^2}{2m} = n^2\dfrac{\pi^2\hbar^2}{2ma^2}$, $\ \lambda_n = 2a/n$.
    5. $\langle x\rangle = a/2$, $\ \langle p\rangle = 0$.

!!! piege "Effet tunnel"
    Si $E < V_0$, ψ décroît en $e^{-\kappa x}$ mais n'est **pas nulle** dans la barrière :
    la particule peut la franchir. C'est impossible en mécanique classique.

## Auto-test

??? question "λ = 400 nm sur du lithium ($W_0$ = 2,93 eV) : potentiel d'arrêt ?"
    $E = 1242/400 = 3{,}11$ eV, donc $V_0 = 0{,}18$ V.

??? question "Pourquoi le photon diffusé par Compton a-t-il une longueur d'onde plus grande ?"
    Il cède de l'énergie à l'électron. Comme $E = hc/\lambda$, moins d'énergie donne λ plus grande.

??? question "Rapport $E_3/E_1$ dans un puits infini ?"
    $E_n \propto n^2$, donc 9.
