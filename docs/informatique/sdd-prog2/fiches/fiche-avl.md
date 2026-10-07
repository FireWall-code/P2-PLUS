---
title: "Fiche — ABR équilibrés et AVL"
---

# Fiche — ABR équilibrés et AVL

!!! abstract "L'essentiel en 30 secondes"
    - Coût d'une recherche / insertion dans un ABR = **hauteur** : $O(N)$ si dégénéré, $O(\log_2 N)$ si équilibré.
    - $BF = h(\text{gauche}) - h(\text{droit})$, calculé pour **chaque** nœud. AVL ⇔ tous les BF $\in \{-1, 0, +1\}$.
    - $+2$ : trop à gauche ; $-2$ : trop à droite.
    - Mêmes signes → **une** rotation (côté opposé). Signes opposés → **double** rotation (enfant puis nœud).
    - Insertion AVL = insertion ABR + équilibrage en remontant.

## Bornes

$$
\lfloor \log_2 N \rfloor \;\le\; h \;\le\; N - 1
\qquad\qquad
\text{parfait de hauteur } h : 2^{h+1} - 1 \text{ nœuds}
$$

## Rotations

```text
 Rotation DROITE sur Q              Rotation GAUCHE sur P
       Q             P                  P               Q
      / \           / \                / \             / \
     P   C   ─▶    A   Q              A   Q    ─▶     P   C
    / \               / \                / \         / \
   A   B             B   C              B   C       A   B
```

```c
t_node *rightRotation(t_node *root)
{
    t_node *pivot = root->left;
    root->left = pivot->right;
    pivot->right = root;
    return pivot;
}

t_node *leftRotation(t_node *root)
{
    t_node *pivot = root->right;
    root->right = pivot->left;
    pivot->left = root;
    return pivot;
}
/* raccrocher : parent->left = rightRotation(parent->left); */
```

## Tableau de décision

| BF(`pn`) | BF(enfant lourd) | Opération |
|:--------:|:----------------:|-----------|
| $-2$ | `right` : $-1$ | rotation **gauche** sur `pn` |
| $-2$ | `right` : $+1$ | rotation **droite** sur `pn->right`, puis **gauche** sur `pn` |
| $+2$ | `left` : $+1$ | rotation **droite** sur `pn` |
| $+2$ | `left` : $-1$ | rotation **gauche** sur `pn->left`, puis **droite** sur `pn` |

!!! methode "Rééquilibrer à la main"
    1. Calculer les hauteurs (feuilles = 0) puis les BF de **tous** les nœuds.
    2. Choisir le nœud déséquilibré **le plus bas**.
    3. Lire le BF de son enfant du côté lourd → tableau.
    4. Dessiner **chaque** rotation séparément : seul le sous-arbre du nœud
       tourné change, le reste ne bouge pas.
    5. Recalculer les BF pour vérifier.

## Exemple type DE

```text
        30 (+2)                               30 (+1)
       /  \                                  /  \
  (+2)20   50                           (+1)20   50
     /  \  / \      10 : +2, 5 : -1          /  \  / \
(+2)10  25 40 60    → gauche sur 5,         8   25 40 60
   /                  droite sur 10       /  \
(-1)5                       ─▶           5    10
     \
      8
```

## Pièges

!!! piege "Une rotation n'est pas un échange gauche / droite"
    Échanger les fils casse l'ordre de l'ABR. Le fils **remonte**, son
    sous-arbre « du milieu » (B) change de parent.

!!! piege "Oublier de retourner / raccrocher le pivot"
    `root = pivot;` sur un paramètre local ne change rien chez l'appelant.

!!! piege "Un ABR qui n'est pas AVL ne peut pas sortir de « insertion + équilibrage »"
    Si l'on équilibre après **chaque** insertion, le résultat final est
    forcément un AVL. Un seul BF à $\pm 2$ suffit à le prouver (DE 2024, Q10).

## Auto-test

??? question "Insérer 1, 2, 3 dans un AVL vide : que se passe-t-il ?"
    Après 3 : BF(1) = −2, BF(2) = −1 → rotation gauche sur 1. Résultat :
    2 à la racine, 1 à gauche, 3 à droite.

??? question "Insérer 30, 10, 20 dans un AVL vide ?"
    BF(30) = +2, BF(10) = −1 → gauche sur 10, puis droite sur 30. Résultat :
    20 (10, 30).

??? question "Insérer 1 à 7 dans l'ordre dans un AVL : hauteur finale ?"
    2 (arbre parfait : 4 à la racine, 2 et 6, puis 1, 3, 5, 7). Dans un ABR
    simple, ce serait 6.
