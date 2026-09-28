---
title: "Fiche — Bascules"
---

# Fiche — Les bascules

!!! abstract "L'essentiel en 30 secondes"
    - Combinatoire : sorties = f(entrées). Séquentiel : sorties = f(entrées, **état précédent**), grâce à un rebouclage.
    - Bascule = mémoire de 1 bit. Asynchrone, synchrone sur **niveau**, ou synchrone sur **front**.
    - D : $Q^+ = D$. JK : 00 M, 01 R, 10 S, 11 **T**. RS : 11 **interdit**.
    - $\overline{PRE}$ / $\overline{CLR}$ : actives à 0, asynchrones, **prioritaires**.

## Les tables à connaître

=== "D sur front"

    | Front | $D$ | $Q^+$ | |
    |:-----:|:---:|:-----:|-|
    | non | X | $Q$ | M |
    | ↑ | 0 | 0 | C |
    | ↑ | 1 | 1 | C |

=== "JK sur front"

    | $J$ | $K$ | $Q^+$ | |
    |:---:|:---:|:-----:|-|
    | 0 | 0 | $Q$ | M |
    | 0 | 1 | 0 | R |
    | 1 | 0 | 1 | S |
    | 1 | 1 | $\overline{Q}$ | T |

=== "RS (NOR)"

    | $R$ | $S$ | $Q$ | |
    |:---:|:---:|:---:|-|
    | 0 | 0 | $Q_{t-1}$ | M |
    | 0 | 1 | 1 | S |
    | 1 | 0 | 0 | R |
    | 1 | 1 | ✗ | interdit |

!!! theoreme "Table de transitions JK (pour la synthèse)"
    | $Q \to Q^+$ | $J$ | $K$ |
    |:-----------:|:---:|:---:|
    | 0 → 0 | 0 | X |
    | 0 → 1 | 1 | X |
    | 1 → 0 | X | 1 |
    | 1 → 1 | X | 0 |

    Moyen mnémotechnique : **$J$ = ce qu'on veut quand on part de 0**,
    **$K$ = l'inverse de ce qu'on veut quand on part de 1**.

## Les temps

!!! definition "Les trois temps"
    - $t_{pp}$ (*setup*) : $D$ stable **avant** le front.
    - $t_m$ (*hold*) : $D$ stable **après** le front.
    - $t_p$ (propagation) : délai front → sortie valide.

## Montages classiques

!!! methode "Diviseur de fréquence par 2"
    $D = \overline{Q}$, ou $J = K = 1$ : la sortie bascule à chaque front, donc $f_Q = f_H / 2$.

## Pièges

!!! piege "Front actif"
    Un rond sur l'entrée d'horloge signifie **front descendant**. On lit les
    entrées **juste avant** le front.

!!! piege "D-latch ≠ D flip-flop"
    La latch (sur niveau) est transparente pendant tout le niveau haut. La
    flip-flop (sur front) ne capture qu'au front.

## Auto-test

??? question "Pourquoi $R = S = 1$ est-il interdit sur une RS à NOR ?"
    $Q = \overline{Q} = 0$ : les sorties ne sont plus complémentaires, et le
    retour à $R = S = 0$ donne un état imprévisible.

??? question "Une JK avec $J = 1$, $K = 0$, $Q = 1$. Que vaut $Q$ après le front ?"
    1 (Set : elle y était déjà).

??? question "$\overline{CLR} = 0$ pendant un front montant avec $D = 1$ : que vaut $Q$ ?"
    0. CLR est prioritaire sur l'horloge et sur $D$.

??? question "Qu'est-ce qui limite la fréquence d'horloge d'une bascule ?"
    Le temps de propagation et le temps de pré-positionnement :
    $T_H \gtrsim t_p + t_{pp}$.
