---
title: "Fiche — Piles et files"
---

# Fiche — Piles et files

!!! abstract "L'essentiel en 30 secondes"
    - **Pile = LIFO** (même extrémité) ; **file = FIFO** (on entre d'un côté, on sort de l'autre).
    - Pile : liste simple **en tête**, ou tableau **en fin** (`nbElts`).
    - File : liste **ht** (enfiler en queue, défiler en tête), ou tableau `first` / `last` + **modulo**.
    - Toutes les opérations en $O(1)$. Une pile/file en liste n'est jamais pleine.
    - « Modifie l'état ? » → pointeur. Le type de retour de `pop` / `dequeue` / `top` = type des éléments.

## Opérations et prototypes

| Pile | File | Modifie ? | Prototype (éléments `int`) |
|------|------|:---------:|----------------------------|
| `isEmptyStack` | `isEmptyQueue` | non | `int isEmptyStack(t_stack);` |
| `push` | `enqueue` | oui | `void push(t_stack *, int);` |
| `pop` | `dequeue` | oui | `int pop(t_stack *);` |
| `top` | `top` | non | `int top(t_stack);` |
| `createStack` | `createQueue` | — | `t_stack createStack(void);` |

## Implémentations

=== "Pile — tableau"

    ```c
    typedef struct s_stacktab { int values[NBMAX]; int nbElts; } t_stacktab;

    void push(t_stacktab *p, int v) { p->values[p->nbElts] = v; p->nbElts++; }  /* nbElts < NBMAX */
    int pop(t_stacktab *p) { p->nbElts--; return p->values[p->nbElts]; }        /* nbElts > 0 */
    ```
    Vide : `nbElts == 0`. Pleine : `nbElts == NBMAX`.

=== "Pile — liste"

    ```c
    typedef t_list t_stacklist;
    /* push = addCell (ajout en tête) */
    int pop(t_stacklist *p)
    {
        t_cell *t = p->head; int v = t->value;
        p->head = t->next; free(t);
        return v;
    }
    ```

=== "File — liste ht"

    ```c
    typedef t_ht_list t_queue;
    /* enqueue = ajout en queue (cas vide : head = tail = nouvelle) */
    int dequeue(t_queue *q)
    {
        t_cell *t = q->head; int v = t->value;
        q->head = t->next;
        if (q->head == NULL) q->tail = NULL;    /* file devenue vide */
        free(t);
        return v;
    }
    ```

=== "File — tableau circulaire"

    ```c
    typedef struct s_queuetab { int values[NBMAX]; int first, last; } t_queuetab;

    void enqueue(t_queuetab *q, int v) { q->values[q->last % NBMAX] = v; q->last++; }
    int dequeue(t_queuetab *q) { int v = q->values[q->first % NBMAX]; q->first++; return v; }
    ```
    Vide : `first == last`. Pleine : `last - first == NBMAX`.

## Qui vérifie « vide » / « plein » ?

- **Stratégie conseillée** : `pop()` exige une pile non vide (`assert`) ;
  l'appelant teste `isEmptyStack()` **avant**.
- **Alternative** : `int pop(t_stack *p, int *p_val)` retourne 1 / 0 (succès)
  et la valeur par pointeur. **Jamais** de « valeur spéciale » ambiguë.

## Applications classiques

| Problème | Structure | Idée |
|----------|-----------|------|
| Parenthèses / crochets | pile | empiler les ouvrants, une fermante doit correspondre au sommet, pile vide à la fin |
| Palindrome | pile | empiler, puis dépiler = lire à l'envers |
| Retour arrière (labyrinthe) | pile | dépiler tant que le sommet n'a pas de voisin libre |
| Afficher une pile sans la perdre | pile temporaire ou récursivité | dépiler, afficher, rempiler |
| Propagation de zone, parcours en largeur | file | traiter un élément, enfiler ses voisins |

## Pièges

!!! piege "File en liste : le mauvais sens"
    Ajouter en tête et retirer en queue oblige à trouver l'**avant-dernière**
    ($O(N)$). Il faut enfiler en **queue** et défiler en **tête**.

!!! piege "File en tableau : `last == NBMAX` ≠ pleine"
    Si `first = last = 50`, la file est **vide**. Pleine ⇔ `last - first == NBMAX`.

!!! piege "Un compteur ne suffit pas pour `(` et `[`"
    `[(])` a le bon nombre de chaque symbole mais est mal imbriqué : il faut une
    pile qui retient l'ordre d'ouverture.

## Auto-test

??? question "Pile, `35#691#3##37#4` (chiffre = push, # = pop) : état final ?"
    `3634` (fond → sommet).

??? question "File tableau : enfiler 4, 8, 7, défiler, enfiler 9, défiler, enfiler 0. Contenu, first, last ?"
    `7 9 0`, `first = 2`, `last = 5`.

??? question "Prototype de `dequeue` pour une file d'entiers en tableau ?"
    `int dequeue(t_queue_tab *);`

??? question "Peut-on faire une file avec `{ int values[50]; int nbElements; }` ?"
    Non (au sens du cours) : un seul indice ne permet pas de défiler au début
    sans décaler tout le tableau. Il faut `first` et `last`.
