---
title: "Fiche — Compteurs"
---

# Fiche — Les compteurs

!!! abstract "L'essentiel en 30 secondes"
    - Nombre de bascules = nombre de bits de la **valeur max** de la séquence.
    - **Synchrone** : une seule horloge pour toutes les bascules. **Asynchrone** : chaque bascule est cadencée par la précédente, et les $t_p$ s'additionnent.
    - Synthèse : graphe → table présent/suivant → transitions → Karnaugh → logigramme.
    - $D = Q^+$ et $T = Q \oplus Q^+$ (1 quand le bit change).

## Asynchrone

!!! theoreme "Compter ou décompter"
    Bascules en toggle, $CLK_0 = H$.

    | | $CLK_i = \overline{Q_{i-1}}$ | $CLK_i = Q_{i-1}$ |
    |-|:-:|:-:|
    | front ↑ | compteur | décompteur |
    | front ↓ | décompteur | compteur |

!!! methode "Modulo $M$ par RAZ"
    $\overline{CLR} = \text{NAND}$ des $Q_i$ qui valent 1 dans $M$.
    Modulo 5 (`101`) : $\overline{CLR} = \overline{Q_2 Q_0}$. Modulo 10 (`1010`) : $\overline{CLR} = \overline{Q_3 Q_1}$.

!!! piege "Retard cumulé"
    Il faut attendre $N \cdot t_p$ pour que la sortie soit valide, donc
    $T_H > N\,t_p$. Pendant la propagation, on voit des états transitoires (*glitches*).

## Synchrone : la synthèse

!!! methode "Protocole"
    1. Graphe des états.
    2. Nombre de bascules.
    3. Table de transitions de la bascule.
    4. Table présent → suivant, puis entrées de chaque bascule.
    5. Karnaugh (états inutilisés = X).
    6. Logigramme (toutes les horloges ensemble).
    7. Vérifier les états inutilisés (blocage ? cycle parasite ?).

| $Q \to Q^+$ | $J$ | $K$ | $D$ | $T$ |
|:-:|:-:|:-:|:-:|:-:|
| 0 → 0 | 0 | X | 0 | 0 |
| 0 → 1 | 1 | X | 1 | 1 |
| 1 → 0 | X | 1 | 0 | 1 |
| 1 → 1 | X | 0 | 1 | 0 |

!!! methode "Passer des JK à $J = K$"
    Une JK bascule si $J = 1$ quand $Q = 0$, ou si $K = 1$ quand $Q = 1$, donc
    en général $T = J\,\overline{Q} + K\,Q$, à resimplifier avec les X. Dans
    l'annale 2023, cela donnait $T_0 = J_0 + K_0$ et $T_i = J_i \cdot K_i$ ; ces
    relations sont propres à ce sujet. Le plus sûr reste de **refaire la table
    avec $T$**.

## Compteur intégré avec LOAD

!!! methode "Sauts dans une séquence"
    $\overline{LOAD}$ actif sur les états **d'où part un saut**. Les entrées $D_i$
    reçoivent la valeur d'arrivée ; on les exprime en fonction des $Q_i$ en ne
    regardant que les états où l'on charge.

## Pièges

!!! piege "Compter les états au lieu de la valeur max"
    $\{3, 4, 5, 9\}$ : 4 états, mais 9 = `1001`, donc **4 bascules**.

!!! piege "États inutilisés"
    $\{1, 3, 4, 5, 6\}$ avec $J = K$ : l'état 0 reste bloqué en 0.
    $\{1, 3, 4, 6\}$ : cycle parasite 0 → 2 → 5 → 7 → 0. On initialise avec PRE/CLR.

## Auto-test

??? question "Compteur synchrone {0, 1, 2, 3} en JK ?"
    $J_0 = K_0 = 1$, $J_1 = K_1 = Q_0$.

??? question "Horloge à 10 kHz : combien de temps entre deux états ?"
    Une période : $T = 1/F = 0{,}1$ ms.

??? question "Compteur asynchrone 4 bits, $t_p = 8$ ns : fréquence max ?"
    $T_H > 4 \times 8 = 32$ ns, donc $f < 31{,}25$ MHz.

??? question "Transition 1 → 0 : que valent $J$, $K$, $D$, $T$ ?"
    $J = X$, $K = 1$, $D = 0$, $T = 1$.
