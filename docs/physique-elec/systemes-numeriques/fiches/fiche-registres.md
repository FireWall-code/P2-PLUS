---
title: "Fiche — Registres"
---

# Fiche — Les registres

!!! abstract "L'essentiel en 30 secondes"
    - Registre de $N$ bits = $N$ bascules D sur **la même horloge**.
    - Décalage à droite : $D_i = Q_{i-1}$. À gauche : $D_i = Q_{i+1}$. Rotation : la sortie série revient sur l'entrée série.
    - Série → parallèle : $N$ fronts. Parallèle → parallèle : 1 front.
    - Choix du mode = un **multiplexeur** devant chaque bascule.

## Architectures

| Entrée | Sortie | Nb de fronts | Usage |
|--------|--------|:------------:|-------|
| série | parallèle | $N$ | réception UART |
| parallèle | série | 1 (chargement) + $N$ | émission UART |
| parallèle | parallèle | 1 | mémorisation |
| série | série | $N$ | retard $\Delta t = n\,T_{CLK}$ |

!!! methode "Registre bidirectionnel"
    $$
    D_i = S\,Q_{i-1} + \overline{S}\,Q_{i+1}
    $$
    Un mux 2→1 par bascule. Extrémités : l'entrée série remplace la voisine manquante.

!!! definition "74HC194 (registre universel)"
    S1S0 : 00 maintien, 01 droite (DSR), 10 gauche (DSL), 11 chargement
    parallèle. $\overline{MR}$ = RAZ active à 0.

!!! definition "Trame UART"
    Repos = 1, **START = 0**, données, (parité), **STOP = 1**. Le front
    descendant du START synchronise le récepteur.

## Instructions AVR

| Instr. | Entre | Sort vers C | Rôle |
|--------|-------|-------------|------|
| `LSL` | 0 à droite | MSB | × 2 |
| `LSR` | 0 à gauche | LSB | ÷ 2 non signé |
| `ASR` | copie du MSB | LSB | ÷ 2 signé |
| `ROL` | C à droite | MSB | rotation 9 bits |
| `ROR` | C à gauche | LSB | rotation 9 bits |

## Pièges

!!! piege "Un seul cran par front"
    Toutes les bascules copient en même temps l'**ancienne** valeur de leur
    voisine. Un bit n'avance que d'une case par front.

!!! piege "ROL / ROR ≠ rotation 8 bits"
    Elles passent par la retenue C : c'est une rotation sur **9 bits**.

## Auto-test

??? question "Combien de fronts pour charger 8 bits en série ?"
    8.

??? question "R18 = `10110110`, que donne `ASR R18` ?"
    `11011011`, avec C = 0.

??? question "Comment obtenir un retard de 3 périodes d'horloge ?"
    Registre à décalage : on prélève la sortie de la 3e bascule.
