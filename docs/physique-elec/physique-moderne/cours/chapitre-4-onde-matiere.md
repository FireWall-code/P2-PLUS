---
title: "Ch. 4 — Onde et matière"
---

# Chapitre 4 — Onde et matière (bases expérimentales de la quantique)

## La lumière, onde électromagnétique

$\nu = \dfrac{c}{\lambda}$ et l'énergie d'un photon vaut $E = h\nu = \dfrac{hc}{\lambda}$,
avec $h = 6{,}63\times10^{-34}$ J·s.

| Domaine | γ | X | UV | Visible | IR |
|---------|---|---|----|---------|----|
| λ | 0,001 – 0,01 nm | 0,01 – 10 nm | 10 – 400 nm | 400 – 800 nm | 800 nm – 1 mm |

!!! definition "Quantification de Planck (1900)"
    Les échanges d'énergie entre matière et rayonnement se font par paquets
    $\Delta E = h\nu$ (le **quantum**). Les oscillateurs ne peuvent avoir que les énergies $E = n\,h\nu$.

## Quatre échecs de la physique classique

### 1. Spectres atomiques discrets

La physique classique prévoit un spectre continu, mais on observe des **raies**. Les
niveaux d'énergie de l'atome sont quantifiés (pour l'hydrogène : $E_n = -\dfrac{13{,}6}{n^2}$ eV).

### 2. Le corps noir

!!! definition "Corps noir"
    Objet idéal qui absorbe tout rayonnement et dont le spectre émis ne dépend que de
    sa température. Modèle : une cavité percée d'un petit trou. Le Soleil ≈ un corps noir à environ 5800 K.

!!! theoreme "Lois du corps noir"
    - **Wien** : $\lambda_{max}\,T = 2{,}898\times10^{-3}$ m·K. Plus c'est chaud, plus le pic se décale vers le bleu.
    - **Stefan** : $I = \varepsilon\,\sigma\,T^4$ (W/m²), avec $\sigma = 5{,}67\times10^{-8}$ W·m⁻²·K⁻⁴ et $\varepsilon = 1$ pour un corps noir. Puissance totale : $P = I \times S$.

La théorie classique (Rayleigh-Jeans) colle aux grandes longueurs d'onde mais diverge
aux courtes : c'est la **catastrophe ultraviolette**. Planck la résout en quantifiant l'énergie.

### 3. L'effet photoélectrique

Une lumière qui frappe un métal peut en arracher des électrons (Hertz 1887, Einstein 1905,
Millikan). On mesure le **potentiel d'arrêt** $V_0$ qui stoppe les électrons les plus rapides :
$E_{c,max} = e\,V_0$.

| Observation | Explication classique | Réalité |
|-------------|-----------------------|---------|
| $V_0$ ne dépend pas de l'intensité | Plus d'intensité → plus d'énergie par électron | ✗ |
| $V_0$ dépend de la fréquence | Non prévu | ✓ |
| Rien sous une fréquence seuil $\nu_0$ | Il suffirait d'augmenter l'intensité | ✗ |
| Émission instantanée (< 1 ns) | Il faudrait un temps d'accumulation | ✗ |

!!! theoreme "Équation d'Einstein"
    La lumière est faite de **photons** d'énergie $h\nu$. Un photon cède toute son énergie à un électron :
    $$
    h\nu = W_0 + E_{c,max} \qquad W_0 = h\nu_0 \qquad e\,V_0 = h\,(\nu - \nu_0)
    $$
    $W_0$ est le **travail d'extraction** du métal. L'intensité lumineuse change le
    **nombre** d'électrons (le courant), pas leur énergie.

### 4. L'effet Compton

Un photon X diffusé par un électron (quasi libre, au repos) ressort avec une longueur
d'onde **plus grande**. On traite la collision comme un choc élastique entre deux particules,
le photon ayant une impulsion $p = \dfrac{h}{\lambda} = \dfrac{h\nu}{c} = \dfrac{E}{c}$.

!!! theoreme "Décalage Compton"
    $$
    \lambda_f - \lambda_i = \frac{h}{m_e c}\,(1 - \cos\theta)
    \qquad \frac{h}{m_ec} \approx 2{,}43\ \text{pm}
    $$
    Le photon perd de l'énergie, mais va toujours à $c$ : c'est sa fréquence qui diminue.

## Dualité onde-corpuscule

- **Onde** : interférences (fentes d'Young), propagation.
- **Particule** : effet photoélectrique, effet Compton (échanges d'énergie).

!!! theoreme "Relation de De Broglie (1923)"
    À toute particule d'impulsion $p$ est associée une onde de longueur d'onde
    $$
    \lambda = \frac{h}{p} = \frac{h}{mv}
    $$
    Les effets ondulatoires ne se voient qu'à l'échelle atomique.

## Le photon

$m_0 = 0$, il se déplace à $c$ et n'est jamais au repos : $E = h\nu = pc$ et $p = \dfrac{h}{\lambda}$.

Exercices : [TD 4](../td/td-4-onde-matiere.md) · Synthèse : [fiche quantique](../fiches/fiche-quantique.md).
