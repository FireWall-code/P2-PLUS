---
title: "Fiche — Arbres binaires"
---

# Fiche — Arbres binaires

!!! abstract "L'essentiel en 30 secondes"
    - `t_node` (`left`, `value`, `right`) et `t_tree` (`root`) : comme `t_cell` / `t_list`.
    - Récursivité : fonction sur `t_node *` (cas de base **`pn == NULL`**) + lanceur sur `t.root`.
    - Hauteur : vide $= -1$, feuille $= 0$, sinon $1 + \max(h_g, h_d)$.
    - Préfixe N-G-D, infixe G-N-D, postfixe G-D-N ; largeur = **file**.
    - ABR : gauche < nœud < droite ; **infixe trié** ; insertion toujours en **feuille**.

## Fonctions types

```c
int countNode(t_node *pn)
{
    if (pn == NULL) return 0;
    return 1 + countNode(pn->left) + countNode(pn->right);
}

int nodeHeight(t_node *pn)
{
    if (pn == NULL) return -1;
    return 1 + max(nodeHeight(pn->left), nodeHeight(pn->right));
}

t_node *seekValue(t_node *pn, int val)        /* arbre quelconque : O(N) */
{
    t_node *res;
    if (pn == NULL || pn->value == val) return pn;
    res = seekValue(pn->left, val);
    if (res == NULL) res = seekValue(pn->right, val);
    return res;
}

t_node *searchBST(t_node *pn, int val)        /* ABR : O(h) */
{
    if (pn == NULL || pn->value == val) return pn;
    if (val < pn->value) return searchBST(pn->left, val);
    return searchBST(pn->right, val);
}
```

## Parcours

```text
             -
           /   \
          +     /
         / \   / \
        3   1 7   x
                 / \
                3   2
```

| Parcours | Règle | Résultat |
|----------|-------|----------|
| Préfixe | **nœud**, gauche, droite | `- + 3 1 / 7 x 3 2` |
| Infixe | gauche, **nœud**, droite | `3 + 1 - 7 / 3 x 2` |
| Postfixe | gauche, droite, **nœud** | `3 1 + 7 3 2 x / -` |
| Largeur | niveau par niveau (file) | `- + / 3 1 7 x 3 2` |

!!! methode "Le contour"
    Faire le tour de l'arbre en partant à gauche de la racine. Noter chaque
    nœud quand on passe **à sa gauche** (préfixe), **sous lui** (infixe) ou **à
    sa droite** (postfixe).

```text
largeur(t)
    si t.root ≠ NULL : enfiler(q, t.root)
    tant que q non vide :
        cur ← défiler(q) ; traiter(cur)
        enfiler les fils non NULL de cur (gauche puis droit)
```

## Catégories

| | Définition |
|---|-----------|
| Strict | 0 ou 2 fils partout |
| Complet | tous les niveaux pleins sauf le dernier, rempli **à gauche** |
| Parfait | tous les niveaux pleins ($2^{h+1} - 1$ nœuds) |
| Dégénéré | au plus 1 fils partout (= une liste) |

## ABR

```c
void insertBST(t_tree *p_tree, int val)
{
    t_node *pn = createNode(val), *temp, *parent = NULL;
    if (p_tree->root == NULL) { p_tree->root = pn; return; }
    temp = p_tree->root;
    while (temp != NULL)
    {
        parent = temp;
        temp = (val < temp->value) ? temp->left : temp->right;
    }
    if (val < parent->value) parent->left = pn;
    else                     parent->right = pn;
}
```

## Pièges

!!! piege "Cas de base « feuille »"
    `if (pn->left == NULL && pn->right == NULL) return 0;` **sans** test
    `pn == NULL` plante sur un nœud à un seul fils (DE 2024).

!!! piege "`t_tree` vs `t_node *`"
    `left` et `right` attendent un `t_node *` : `t.root->left = sousArbre.root;`
    et non `= sousArbre;`.

!!! piege "Hauteur ≠ nombre de niveaux"
    Un arbre à un seul nœud a une hauteur **0** et **1** niveau.

## Auto-test

??? question "Infixe de l'ABR obtenu en insérant 12, 6, 9, 4, 17, 19, 13 ?"
    `4 6 9 12 13 17 19` (toujours trié).

??? question "Quelle structure pour un parcours en largeur ? en profondeur itératif ?"
    Une **file** de `t_node *` ; une **pile** pour la profondeur.

??? question "Hauteur d'un arbre dégénéré à $N$ nœuds ?"
    $N - 1$.
