---
title: "Ch. 1 — Espace probabilisé"
---

# Chapitre 1 — Espace probabilisé

Le cadre de tout le cours : on décrit une expérience aléatoire par un **univers**
$\Omega$, ses **évènements** (des sous-ensembles de $\Omega$) et une **fonction de
probabilité** $P$ qui leur attribue un nombre entre 0 et 1.

## 1.1 Concepts de base

!!! definition "Expérience aléatoire, univers"
    Une expérience est **aléatoire** si on ne peut pas prévoir son résultat avec
    certitude. Les résultats possibles s'appellent les **éventualités** (ou évènements
    élémentaires). L'ensemble de tous les résultats est l'**univers**, noté $\Omega$
    (toujours non vide).

| Expérience | Univers |
|------------|---------|
| Lancer d'une pièce | $\Omega = \{P, F\}$ |
| Lancer d'un dé | $\Omega = \{1, \dots, 6\}$ |
| Lancer de deux dés | $\Omega = \{1, \dots, 6\}^2$ (couples ordonnés) |
| Durée de vie d'un téléphone (en jours) | $\Omega = \mathbb{N}$ |
| Attente d'un bus qui passe toutes les 12 min | $\Omega = [0, 12]$ |

!!! definition "Évènements"
    - Un **évènement** est un sous-ensemble $E \subset \Omega$.
    - $\Omega$ est l'**évènement certain**, $\emptyset$ l'**évènement impossible**.

Dans ce cours, $\Omega$ est toujours **fini ou dénombrable**, sauf mention contraire.

## 1.2 Rappels sur les ensembles

| Logique | Ensembles | Ce qui se passe |
|---------|-----------|-----------------|
| ET | $E \cap F$ | les deux évènements se réalisent |
| OU | $E \cup F$ | au moins un des deux se réalise |
| NON | $\overline{E}$ | $E$ ne se réalise pas |
| $\Rightarrow$ | $E \subset F$ | chaque fois que $E$ se réalise, $F$ aussi |

!!! theoreme "Propriétés de $\cup$ et $\cap$"
    - **Commutativité** et **associativité** de $\cup$ et $\cap$.
    - **Idempotence** : $E \cup E = E = E \cap E$.
    - **Neutres** : $E \cup \emptyset = E$, $E \cap \Omega = E$.
    - **Absorbants** : $E \cup \Omega = \Omega$, $E \cap \emptyset = \emptyset$.
    - **Distributivité** (dans les deux sens) :

    $$
    (E \cap F) \cup G = (E \cup G) \cap (F \cup G), \qquad
    (E \cup F) \cap G = (E \cap G) \cup (F \cap G)
    $$

!!! theoreme "Lois de De Morgan"
    $$
    \overline{E \cup F} = \overline{E} \cap \overline{F}
    \qquad\text{et}\qquad
    \overline{E \cap F} = \overline{E} \cup \overline{F}
    $$

    La négation d'un « et » est le « ou » des négations, et inversement.

!!! definition "Évènements incompatibles"
    $E$ et $F$ sont **incompatibles** si leur réalisation conjointe est impossible :
    $E \cap F = \emptyset$.

!!! definition "Système complet d'évènements (SCE)"
    $\{A_1, \dots, A_n\}$ est un système complet d'évènements si :

    1. $\displaystyle\bigcup_{i=1}^n A_i = \Omega$ (ils couvrent tous les cas) ;
    2. $A_i \cap A_j = \emptyset$ pour $i \neq j$ (deux à deux incompatibles).

    Exemple : pour une carte tirée dans un jeu de 52, « figure ou As », « entre 7 et 10 »,
    « entre 2 et 6 ». L'exemple le plus simple : $\{A, \overline{A}\}$.

## 1.3 Fonction de probabilité

!!! definition "Fonction de probabilité"
    Une fonction $P : \mathcal{P}(\Omega) \to \mathbb{R}$ est une probabilité si :

    1. $\forall E \subset \Omega,\ 0 \le P(E) \le 1$ ;
    2. $P(\Omega) = 1$ ;
    3. **additivité** : si les $A_i$ sont deux à deux incompatibles,
       $P\left(\bigcup A_i\right) = \sum P(A_i)$.

    $(\Omega, P)$ est alors un **espace probabilisé**.

!!! example "Les deux façons de construire une probabilité"
    - **Probabilité uniforme** ($\Omega$ fini, résultats équiprobables) :
      $P(E) = \dfrac{\operatorname{card}(E)}{\operatorname{card}(\Omega)}$, « cas favorables sur cas possibles ».
      Les calculs deviennent du dénombrement.
    - **Cas général** : il suffit de donner $p(\omega_i) \ge 0$ pour chaque éventualité,
      avec $\sum p(\omega_i) = 1$, puis $P(E) = \sum_{x \in E} p(x)$.

!!! theoreme "Proposition 1.3 — Les règles de calcul"
    - $P(\emptyset) = 0$
    - $P(\overline{E}) = 1 - P(E)$
    - $E \subset F \Rightarrow P(E) \le P(F)$
    - $P(E \cup F) = P(E) + P(F) - P(E \cap F)$

??? note "Idée des démonstrations"
    On découpe en morceaux **disjoints** puis on applique l'additivité :

    - $E \cup \overline{E} = \Omega$ et $E \cap \overline{E} = \emptyset$, donc $P(E) + P(\overline{E}) = 1$.
    - Si $E \subset F$ : $F = E \cup (F \cap \overline{E})$ (disjoints), donc
      $P(F) = P(E) + P(F \cap \overline{E}) \ge P(E)$.
    - $E \cup F = E \cup (F \cap \overline{E})$ et $F = (E \cap F) \cup (F \cap \overline{E})$,
      on soustrait les deux égalités.

!!! theoreme "Formule de Poincaré (crible)"
    $$
    P(E \cup F \cup G) = P(E) + P(F) + P(G)
    - P(E \cap F) - P(E \cap G) - P(F \cap G)
    + P(E \cap F \cap G)
    $$

    En général : on ajoute les probabilités seules, on retire les intersections de 2,
    on rajoute celles de 3, on retire celles de 4, etc. Avec 4 évènements :
    4 termes simples, 6 doubles, 4 triples, 1 quadruple.

!!! methode "Fiche méthode #1 — Calculer $P(E)$ en trois étapes"
    1. **Identifier les évènements élémentaires** qui décrivent complètement l'expérience.
    2. **Écrire $E$** avec ces évènements et les opérations $\cap$, $\cup$, $\overline{\phantom{E}}$.
    3. **Appliquer les propriétés** de $P$ (additivité si incompatibles, Poincaré sinon,
       complémentaire si c'est plus simple).

### Exemple : le duel au poker

Il reste 44 cartes possibles pour la dernière carte. Le joueur 2 gagne si elle est un 2,
un valet ou un trèfle. On découpe en évènements **incompatibles** (les 2 et valets de
trèfle sont déjà comptés dans « trèfle ») :

$$
P(V_2) = P(\text{Deux}) + P(\text{Valet}) + P(\text{Trèfle})
= \frac{2}{44} + \frac{3}{44} + \frac{9}{44} = \frac{14}{44} \approx 0{,}32
$$

## 1.4 Hors programme : univers indénombrables

Pour $\Omega = [0,1]$ ou un carré, on ne peut pas définir une probabilité uniforme sur
**tous** les sous-ensembles (ensembles de Vitali). On restreint alors les évènements à
une **tribu** (en pratique : les intervalles et leurs réunions). C'est la définition de
Kolmogorov : un espace probabilisé est un triplet $(\Omega, \mathcal{F}, P)$.
À retenir seulement comme culture.

## Acquis d'apprentissage

- [ ] Décrire les évènements élémentaires d'une expérience.
- [ ] Écrire un évènement avec $\cap$, $\cup$ et le complémentaire.
- [ ] Reconnaître deux évènements incompatibles.
- [ ] Vérifier qu'une fonction est une probabilité.
- [ ] Calculer une probabilité avec les propriétés de $P$.
- [ ] Utiliser la formule de Poincaré pour trois évènements.
