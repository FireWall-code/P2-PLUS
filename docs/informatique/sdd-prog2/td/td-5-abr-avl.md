---
title: "TD 5 — ABR, AVL et autres arbres"
---

# TD 5 — ABR, AVL et autres arbres

Énoncé : `FR_TD5_TI301.docx` (version 2023-2024). Rappels :
[chapitre 4](../cours/chapitre-4-arbres-binaires.md) et
[chapitre 5](../cours/chapitre-5-abr-avl.md).

!!! note "Figures de l'énoncé"
    Plusieurs questions portent sur des arbres dessinés dans l'énoncé (Q8,
    Q11 à Q14, exercice 2). Ici, la méthode est donnée et appliquée à des
    arbres d'exemple ; reporte-la sur les arbres de ta feuille.

## Partie 1 — ABR et AVL

### Exercice 1 — Ordre d'insertion, équilibrage et rotations

**Q1–Q3.** Insérer 12, 6, 9, 4, 17, 19, 13 dans un ABR vide.

??? success "Correction"
    ```text
              12
            /    \
           6      17
          / \    /  \
         4   9  13   19
    ```

    - **Infixe** : `4 6 9 12 13 17 19` → les valeurs sont **triées** (c'est
      toujours le cas pour un ABR).
    - **Largeur** : `12 6 17 4 9 13 19`. Réinsérer dans cet ordre redonne
      **exactement le même arbre** : chaque parent est inséré avant ses enfants,
      donc chaque valeur retrouve le même chemin. C'est une façon de sauvegarder
      un ABR pour le reconstruire à l'identique.

    Cet arbre est **parfait** (hauteur 2 pour 7 nœuds, le minimum possible).

**Q4–Q6.** Insérer 6, 12, 9, 4, 17, 13, 19.

??? success "Correction"
    ```text
           6
          / \
         4   12
            /  \
           9    17
               /  \
              13   19
    ```

    - **Infixe** : `4 6 9 12 13 17 19`, toujours trié.
    - **Largeur** : `6 4 12 9 17 13 19` ; reconstruire redonne ce même arbre.

    **Conclusion** : les **mêmes valeurs** donnent des ABR de **formes
    différentes** selon l'ordre d'insertion. Celui-ci a une hauteur de 3 au
    lieu de 2, et il est déséquilibré à la racine.

**Q7, Q9, Q10.** Facteur d'équilibre, signe, AVL.

??? success "Correction"
    - **Q7** — $BF(n) = h(\text{sous-arbre gauche}) - h(\text{sous-arbre droit})$,
      avec $h(\text{vide}) = -1$ et $h(\text{feuille}) = 0$.
    - **Q9** — $BF > 0$ : le sous-arbre **gauche** est plus profond ;
      $BF < 0$ : le **droit** est plus profond ; $BF = 0$ : même hauteur.
    - **Q10** — Un **AVL** est un ABR dont **tous** les nœuds ont un BF dans
      $\{-1, 0, +1\}$.

**Q8 / Q12.** Reporter les BF sur l'arbre de l'énoncé.

??? success "Méthode, appliquée à l'arbre de la Q4"
    1. Calculer la **hauteur** de chaque nœud, des feuilles vers la racine
       (feuille = 0).
    2. Pour chaque nœud : $BF = h(\text{gauche}) - h(\text{droit})$, en comptant
       $-1$ pour un fils absent.

    ```text
                 6 (-2)           h(4) = 0, h(9) = 0, h(13) = 0, h(19) = 0
                /     \           h(17) = 1, h(12) = 2, h(6) = 3
           (0) 4      12 (-1)
                     /   \        BF(12) = h(9) - h(17) = 0 - 1 = -1
                (0) 9     17 (0)  BF(6)  = h(4) - h(12) = 0 - 2 = -2
                         /  \
                   (0) 13    19 (0)
    ```

    Le nœud 6 est à $-2$ : l'arbre n'est **pas** un AVL.

**Q11, Q13, Q14.** Rotations sur la racine.

??? success "Méthode et exemple"
    **Rotation droite sur un nœud Q** (pivot P = son fils gauche) : P monte,
    Q devient le fils droit de P, et l'**ancien fils droit de P** devient le
    fils **gauche** de Q.

    ```text
            Q                   P
           / \                 / \
          P   C     ───▶      A   Q
         / \                     / \
        A   B                   B   C
    ```

    Ce qu'il faut remarquer :

    - **Q11** — Une rotation droite sur une racine déséquilibrée **à gauche en
      ligne** (BF $+2$, fils gauche à $+1$) donne un arbre équilibré.
    - **Q13** — Si le fils gauche penche à **droite** (BF $+2$ / $-1$, zigzag),
      la rotation droite seule **ne suffit pas** : le déséquilibre passe de
      l'autre côté (on obtient $-2$).
    - **Q14** — Dans ce cas, il faut une **double rotation** : rotation
      **gauche** sur le fils gauche (on se ramène au cas en ligne), **puis**
      rotation **droite** sur la racine. Conclusion : le choix de la rotation
      dépend du BF de la racine **et** de celui de son enfant.

    Exemple zigzag avec 30, 10, 20 :

    ```text
       30 (+2)          rot. droite          10 (-2)        ✗ toujours déséquilibré
       /                sur 30 seule ─▶        \
     10 (-1)                                    30
       \                                        /
        20                                    20

       30 (+2)          rot. gauche     30       rot. droite      20       ✓ AVL
       /                sur 10 ─▶       /        sur 30 ─▶       /  \
     10 (-1)                          20                        10    30
       \                              /
        20                          10
    ```

## Partie 2 — Autres « arbres »

### Exercice 2 — Échauffement

??? success "Ce qu'il faut savoir répondre"
    - **Parcours** : appliquer les trois ordres (préfixe : nœud-gauche-droite,
      infixe : gauche-nœud-droite, postfixe : gauche-droite-nœud) en suivant
      les pointeurs, **même si** un nœud est atteint deux fois : il est alors
      affiché deux fois.
    - **Est-ce un arbre ?** Dans un arbre, chaque nœud (sauf la racine) a **un
      seul parent**, et il n'y a pas de cycle. Si deux pointeurs mènent au
      **même** nœud en mémoire (structure partagée), ce n'est **pas** un arbre
      mais un graphe orienté sans cycle.
    - **Hauteur récursive** : la fonction `nodeHeight` la calcule sans problème
      (elle ne voit pas le partage) ; elle correspond à la plus longue
      descente, mais la notion d'arbre n'est plus respectée.
    - **`treeNodeCount()`** compte un nœud partagé **autant de fois qu'on peut
      l'atteindre** : le résultat dépasse le nombre de nœuds réellement créés en
      mémoire (`malloc`).
    - **Ajouter un fils** à un nœud partagé (le `'8'` de l'énoncé) l'ajoute à
      **tous** les endroits qui pointent sur lui : le compteur augmente de plus
      de 1 alors qu'un seul nœud a été créé. Incompatible avec la définition
      d'un arbre binaire, où chaque nœud a une seule position.

### Exercice 3 — Arbres de Fibonacci

$FT_0$ : un nœud de valeur 0. $FT_1$ : racine 1, deux feuilles 0.
Pour $n \ge 2$ : racine $n$, sous-arbre gauche $FT_{n-1}$, droit $FT_{n-2}$.

??? success "Correction"
    **Q1** —

    ```text
     FT0      FT1          FT2              FT3
      0        1            2                3
              / \          / \             /   \
             0   0        1   0           2     1
                         / \             / \   / \
                        0   0           1   0 0   0
                                       / \
                                      0   0
    ```

    La valeur d'un nœud est la **hauteur** du sous-arbre dont il est la racine :
    $h(FT_n) = 1 + \max(h(FT_{n-1}), h(FT_{n-2})) = 1 + (n - 1) = n$.
    Le nombre de nœuds suit $N_n = 1 + N_{n-1} + N_{n-2}$ : 1, 3, 5, 9, 15, 25…

    **Q2** —

    | $n$ | Strict ? | Complet ? | Parfait ? |
    |:---:|:--------:|:---------:|:---------:|
    | 0 | oui | oui | oui |
    | 1 | oui | oui | oui |
    | 2 | oui | oui | non |
    | 3 | oui | oui | non |
    | 4 | oui | non | non |
    | 5 | oui | non | non |

    - **Strict** pour tout $n$ : chaque nœud interne a exactement deux fils
      ($FT_{n-1}$ et $FT_{n-2}$), et $FT_0$, $FT_1$ le sont.
    - **Complet** jusqu'à $FT_3$ : son avant-dernier niveau (4 nœuds) est plein
      et les 2 nœuds du dernier sont tout à gauche. Dans $FT_4$, le niveau 3 n'a
      que 6 nœuds sur 8 alors qu'il existe un niveau 4 : pas complet.
    - **Parfait** seulement pour $n \le 1$.

    **Q3** — Les sous-arbres sont des `t_tree`, mais les champs `left` et
    `right` attendent des `t_node *` : il faut prendre le champ `.root`.

    ```c
    t_tree FTn(int n)
    {
        t_tree t;
        if (n == 0) return FT0();
        if (n == 1) return FT1();
        t.root = createNode(n);
        t.root->left  = FTn(n - 1).root;    /* t_tree → t_node * */
        t.root->right = FTn(n - 2).root;
        return t;
    }
    ```
