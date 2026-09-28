---
title: "Fiche — Machines à états"
---

# Fiche — Les machines à états

!!! abstract "L'essentiel en 30 secondes"
    - Automate = états + transitions. Un seul état courant à la fois.
    - **Moore** : sorties = f(état). **Mealy** : sorties = f(état, entrées).
    - Méthode : graphe → codage → table présent/futur → entrées des bascules → sorties → logigramme.

## Moore vs Mealy

| | Moore | Mealy |
|-|-------|-------|
| Sortie | dans l'état (`S3 / 1`) | sur la transition (`x=0 / 1`) |
| Timing | synchrone | asynchrone (suit l'entrée) |
| États | souvent + 1 | souvent moins |

!!! methode "Conception (bascules D)"
    1. Diagramme d'états (sorties comprises).
    2. $N$ bascules avec $2^N \geq$ nombre d'états ; codage binaire des états.
    3. Table : état présent × entrées → état futur (et sorties).
    4. $D_i = Q_i^+$, puis Karnaugh (codes inutilisés = X).
    5. Sorties : Karnaugh sur l'état (Moore) ou sur l'état et les entrées (Mealy).
    6. Logigramme.

!!! methode "Détecteur de séquence"
    Un état par **préfixe reconnu** : rien, `0`, `01`, `010`… Pour chaque état
    et chaque bit reçu, on se demande : **quel est le plus long préfixe qui
    termine ce que j'ai reçu ?** C'est ce qui gère les chevauchements.

!!! example "Détecteur de `010`"
    - **Moore** (4 états) : $D_1 = x\,Q_0 + \overline{x}\,Q_1\overline{Q_0}$, $D_0 = \overline{x}$, $Z = Q_1 Q_0$.
    - **Mealy** (3 états) : $D_1 = x\,Q_0$, $D_0 = \overline{x}$, $Z = \overline{x}\,Q_1$.

## Pièges

!!! piege "Oublier le chevauchement"
    Après `010`, recevoir `1` mène à « `01` reconnu », et pas à l'état initial.

!!! piege "Sortie Moore écrite sur les flèches"
    En Moore, la sortie ne dépend pas de l'entrée : elle s'écrit **dans** l'état.

## Auto-test

??? question "5 états : combien de bascules ?"
    3 ($2^3 = 8 \geq 5$), avec 3 codes inutilisés en X.

??? question "Pourquoi la version Mealy du détecteur a-t-elle un état de moins ?"
    La détection se fait sur la transition qui reçoit le dernier `0` : il n'y a
    pas besoin d'un état « `010` reconnu ».

??? question "Dans une machine de Moore, la sortie peut-elle changer entre deux fronts ?"
    Non, elle ne dépend que de l'état, qui ne change qu'au front d'horloge.
