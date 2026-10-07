---
title: "Ch. 5 — Complexité des ABR et arbres AVL"
---

# Chapitre 5 — Complexité des ABR et arbres AVL

## Pourquoi équilibrer ?

Un ABR permet une recherche **dichotomique** : à chaque nœud, on élimine un
sous-arbre entier. Insérer ou chercher revient à descendre d'un niveau par
itération : le coût est la **hauteur** de l'arbre.

| Forme de l'arbre à $n$ nœuds | Nombre de niveaux | Recherche |
|------------------------------|-------------------|:---------:|
| **Dégénéré** (une liste) | $n$ | $O(n)$ |
| **Parfait** | $\log_2(n+1)$ | $O(\log_2 n)$ |
| **Complet** | $\lceil \log_2(n+1) \rceil$ | $O(\log_2 n)$ |

$\log_2 n = k$ signifie $2^k = n$ : $\log_2(65\,536) = 16$ et
$\log_2(2^{64}) = 64$. Chercher parmi 65 536 valeurs prend au plus 16 étapes
dans un arbre équilibré, contre 65 536 dans une liste.

!!! theoreme "Encadrement de la hauteur $h$ d'un arbre binaire à $N$ nœuds"
    $$
    \lfloor \log_2 N \rfloor \;\le\; h \;\le\; N - 1
    $$
    Minimum pour un arbre complet (chaque niveau $k$ contient au plus $2^k$
    nœuds), maximum pour un arbre dégénéré.

## Les arbres AVL

!!! definition "Arbre AVL (Adelson-Velsky et Landis, 1962)"
    Un **AVL** est un ABR dans lequel, **pour chaque nœud**, les hauteurs du
    sous-arbre gauche et du sous-arbre droit diffèrent d'**au plus 1**.

!!! definition "Facteur d'équilibre (*balance factor*, BF)"
    $$
    BF(pn) = \text{hauteur}(pn\text{->left}) - \text{hauteur}(pn\text{->right})
    $$

    - $BF > 0$ : le côté **gauche** est plus profond ;
    - $BF < 0$ : le côté **droit** est plus profond ;
    - l'arbre est équilibré (AVL) si **tous** ses nœuds ont $BF \in \{-1, 0, +1\}$.

!!! piege "Calculer le BF de tous les nœuds"
    Le BF se calcule pour **chaque** nœud, pas seulement pour la racine. Rappel
    des hauteurs : sous-arbre vide $= -1$, feuille $= 0$. Une feuille a donc
    $BF = (-1) - (-1) = 0$.

```text
 Exemple :          30  (+2)          hauteurs : 8 → 0, 5 → 1, 10 → 2,
                   /   \                         20 → 3, 50 → 1
             (+2) 20     50 (0)
                 /  \   /  \          BF(5)  = -1 - 0 = -1
           (+2) 10  25 40  60         BF(10) =  1 -(-1) = +2
               /                      BF(20) =  2 - 0 = +2
         (-1) 5                       BF(30) =  3 - 1 = +2
               \
                8 (0)
```

## Les rotations

Une rotation réorganise trois « paquets » de sous-arbres **en conservant la
propriété d'ABR**. C'est le seul outil d'équilibrage.

### Rotation droite sur Q

```text
          Q                       P
        /   \                   /   \
       P     C     ───▶        A     Q
      / \                           / \
     A   B                         B   C

 A < P < B < Q < C : A et C ne bougent pas, B change de parent
```

Le **pivot** est le fils gauche `P`. Le sous-arbre `B` (entre P et Q) devient le
fils **gauche** de Q.

```c
t_node *rightRotation(t_node *root)    /* root pointe sur Q, root->left != NULL */
{
    t_node *pivot = root->left;        /* P */
    root->left = pivot->right;         /* B passe sous Q, à gauche */
    pivot->right = root;               /* Q passe sous P, à droite */
    return pivot;                      /* P est la nouvelle racine du sous-arbre */
}
```

### Rotation gauche sur P (symétrique)

```text
       P                            Q
      / \                         /   \
     A   Q        ───▶           P     C
        / \                     / \
       B   C                   A   B
```

```c
t_node *leftRotation(t_node *root)     /* root pointe sur P, root->right != NULL */
{
    t_node *pivot = root->right;       /* Q */
    root->right = pivot->left;         /* B passe sous P, à droite */
    pivot->left = root;                /* P passe sous Q, à gauche */
    return pivot;
}
```

!!! piege "Raccrocher le résultat"
    Dans le CM, la rotation finit par `root = pivot;` sur une copie locale :
    l'appelant ne voit pas le changement. Il faut **retourner** la nouvelle
    racine et la raccrocher au parent :
    `pn->left = rightRotation(pn->left);` ou
    `p_tree->root = rightRotation(p_tree->root);`.

## Quelle rotation appliquer ?

On regarde le nœud déséquilibré `pn` ($BF = \pm 2$) **et** son enfant du côté
lourd.

| BF de `pn` | BF de l'enfant | Configuration | Opération(s) |
|:----------:|:--------------:|---------------|--------------|
| $-2$ | `pn->right` : $-1$ | droite-droite (en ligne) | **rotation gauche** sur `pn` |
| $-2$ | `pn->right` : $+1$ | droite-gauche (en zigzag) | rotation **droite** sur `pn->right`, puis rotation **gauche** sur `pn` |
| $+2$ | `pn->left` : $+1$ | gauche-gauche (en ligne) | **rotation droite** sur `pn` |
| $+2$ | `pn->left` : $-1$ | gauche-droite (en zigzag) | rotation **gauche** sur `pn->left`, puis rotation **droite** sur `pn` |

!!! methode "Moyen mnémotechnique"
    - **Mêmes signes** (en ligne) → **une** rotation, du côté **opposé** au
      déséquilibre (trop à droite → rotation gauche).
    - **Signes opposés** (zigzag) → **double** rotation : d'abord sur l'enfant
      pour se ramener au cas « en ligne », puis sur `pn`.

### Exemple de double rotation (cas $-2$ / $+1$)

```text
     P (-2)                  P                         R
    / \                     / \                      /   \
   A   Q (+1)    rot. D   A   R        rot. G       P     Q
      / \        sur Q ─▶    / \       sur P ─▶    / \   / \
     R   D                  B   Q                 A   B C   D
    / \                        / \
   B   C                      C   D
```

Après la rotation droite sur Q, on retombe sur le cas « en ligne » ; la
rotation gauche sur P termine.

## Insérer dans un AVL

!!! methode "Insertion AVL = insertion ABR + équilibrage"
    1. Insérer le nouveau nœud comme une feuille (insertion ABR classique).
    2. Remonter vers la racine en recalculant les facteurs d'équilibre, jusqu'à
       trouver (ou non) un nœud à $\pm 2$.
    3. Appliquer la ou les rotations du tableau.

    Si l'arbre était un AVL avant l'insertion, **une seule** correction suffit
    (le premier nœud déséquilibré rencontré en remontant). Si on équilibre un ABR
    quelconque, on continue jusqu'à la racine.

La version récursive fait la remontée toute seule, au retour des appels :

```c
t_node *balance(t_node *pn)
{
    int bf = nodeHeight(pn->left) - nodeHeight(pn->right);
    if (bf == -2)
    {
        if (nodeHeight(pn->right->left) > nodeHeight(pn->right->right))  /* enfant à +1 */
            pn->right = rightRotation(pn->right);
        pn = leftRotation(pn);
    }
    else if (bf == 2)
    {
        if (nodeHeight(pn->left->right) > nodeHeight(pn->left->left))    /* enfant à -1 */
            pn->left = leftRotation(pn->left);
        pn = rightRotation(pn);
    }
    return pn;
}

t_node *insertAVL(t_node *pn, int val)
{
    if (pn == NULL) return createNode(val);
    if (val < pn->value) pn->left  = insertAVL(pn->left, val);
    else                 pn->right = insertAVL(pn->right, val);
    return balance(pn);            /* équilibrage en remontant */
}
/* appel : mytree.root = insertAVL(mytree.root, 42); */
```

Cette version recalcule les hauteurs à chaque fois (simple mais coûteux) ; une
implémentation efficace stocke la hauteur dans chaque nœud.

### Exemple du cours : rééquilibrer un ABR

```text
 Départ :              75                Arrivée :            75
                     /    \                                 /    \
                   59      83                             59      87
                  /  \       \                           /  \    /  \
                42    62      90                       37    62 83   90
               /             /                        /  \
             24             87                      24    42
               \
                37
```

1. Nœud 42 : $BF = +2$, enfant 24 à $-1$ → rotation gauche sur 24, puis
   rotation droite sur 42 : le sous-arbre devient `37 (24, 42)`.
2. Nœud 83 : $BF = -2$, enfant 90 à $+1$ → rotation droite sur 90, puis
   rotation gauche sur 83 : le sous-arbre devient `87 (83, 90)`.
3. Tous les BF sont dans $\{-1, 0, +1\}$ : terminé.
