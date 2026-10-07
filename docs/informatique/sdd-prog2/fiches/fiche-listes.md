---
title: "Fiche — Listes chaînées simples"
---

# Fiche — Listes chaînées simples

!!! abstract "L'essentiel en 30 secondes"
    - `t_list` est une **structure** qui contient `t_cell *head` (pas un pointeur).
    - Liste **modifiée** ⇔ **`head` change** → paramètre `t_list *`. Sinon, `t_list` par valeur.
    - Parcours : `while (curr != NULL)` ; recherche : `while (curr != NULL && curr->value != val)` (NULL testé en premier).
    - Suppression : deux pointeurs `prev` / `curr` ; cas en tête à part.
    - Récursif : une fonction pour `t_cell *`, une fonction « lanceur » pour `t_list`.

## Types

```c
typedef struct s_cell { int value; struct s_cell *next; } t_cell;
typedef struct s_list { t_cell *head; } t_list;
```

## Prototypes à connaître

| Fonction | Prototype | Pourquoi ce paramètre |
|----------|-----------|-----------------------|
| créer une cellule | `t_cell *createCell(int val);` | retourne l'adresse allouée |
| liste vide | `t_list createList(void);` | `head = NULL` |
| ajout en tête | `void addCell(t_list *p, int val);` | `head` change |
| afficher | `void displayList(t_list l);` | lecture seule |
| chercher | `int searchList(t_list l, int val);` | lecture seule |
| chercher (adresse) | `t_cell *searchListPtr(t_list l, int val);` | `NULL` si absent |
| compter | `int countItems(t_list l);` | lecture seule |
| supprimer une valeur | `void deleteVal(t_list *p, int val);` | peut être en tête |
| modifier les valeurs | `void swapParity(t_list l);` | `head` ne change pas |
| libérer | `void freeList(t_list *p);` | `head` repasse à `NULL` |

## Les squelettes

=== "Ajout en tête"

    ```c
    t_cell *nouv = createCell(val);
    nouv->next = p_list->head;     /* 1 : d'abord raccrocher */
    p_list->head = nouv;           /* 2 : puis déplacer head */
    ```

=== "Parcours"

    ```c
    t_cell *curr = l.head;
    while (curr != NULL)
    {
        /* traiter curr->value */
        curr = curr->next;
    }
    ```

=== "Suppression"

    ```c
    t_cell *curr = p_list->head, *prev = NULL;
    while (curr != NULL && curr->value != val)
    {
        prev = curr;
        curr = curr->next;
    }
    if (curr == NULL) return;                    /* absent */
    if (prev == NULL) p_list->head = curr->next; /* en tête */
    else              prev->next = curr->next;   /* milieu ou fin */
    free(curr);
    ```

=== "Récursif"

    ```c
    int countCellRec(t_cell *pc)
    {
        if (pc == NULL) return 0;              /* cas de base */
        return 1 + countCellRec(pc->next);     /* appel sur next */
    }
    int countListRec(t_list l) { return countCellRec(l.head); }
    ```

## Pièges

!!! piege "Copie de `t_list` = mêmes cellules"
    Passer la liste par valeur protège `head`, **pas** les cellules : une
    fonction peut modifier `curr->value` et l'appelant le verra.

!!! piege "Libérer trop tôt"
    `free(curr); curr = curr->next;` lit une zone libérée. Toujours avancer (ou
    faire l'appel récursif) **avant** `free`.

!!! piege "Parcourir avec `head` dans le `main`"
    `while (L.head != NULL) L.head = L.head->next;` perd toute la liste. On
    parcourt avec une variable `curr`, ou dans une fonction qui reçoit une copie.

## Complexités

| Opération | Coût |
|-----------|:----:|
| ajout / suppression en tête | $O(1)$ |
| accès au $k$-ième, recherche, ajout en fin, suppression d'une valeur | $O(N)$ |
| version récursive | même temps, $+O(N)$ de mémoire (pile d'appels) |

## Auto-test

??? question "Après `addCell(&l, 1); addCell(&l, 2); addCell(&l, 3);` sur une liste vide, que contient `l` ?"
    `3 → 2 → 1`.

??? question "`void f(t_list l)` peut-elle supprimer la première cellule ?"
    Non : elle modifierait la copie de `head`, l'appelant garderait un `head`
    sur une cellule libérée. Il faut `t_list *`.

??? question "Pourquoi `curr != NULL` doit-il être le premier test du `while` ?"
    Grâce à l'évaluation paresseuse de `&&`, `curr->value` n'est lu que si
    `curr` n'est pas `NULL`. Dans l'autre ordre, on déréférence `NULL` en fin
    de liste.
