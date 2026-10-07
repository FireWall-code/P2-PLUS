---
title: "Ch. 3 — Piles et files"
---

# Chapitre 3 — Piles et files

On définit d'abord pile et file comme des **types abstraits** (des
comportements, sans implémentation), puis on les implémente avec ce qu'on sait
déjà faire : tableaux, listes simples, listes ht.

| | Pile (*stack*) | File (*queue*) |
|---|----------------|----------------|
| Principe | **LIFO** : *Last In, First Out* | **FIFO** : *First In, First Out* |
| Image | pile d'assiettes : on dépose et on retire **au-dessus** | file d'attente : on arrive **à la fin**, on repart **au début** |
| Ajouter | empiler, `push()` | enfiler, `enqueue()` |
| Retirer | dépiler, `pop()` | défiler, `dequeue()` |
| Consulter le prochain | `top()` | `top()` (ou `peek`) |
| Vide ? / créer / afficher | `isEmptyStack()`, `createStack()`, `displayStack()` | `isEmptyQueue()`, `createQueue()`, `displayQueue()` |

!!! piege "Ne pas inverser"
    **Pile = LIFO** (même extrémité pour entrer et sortir).
    **File = FIFO** (on entre d'un côté, on sort de l'autre).

## Du type abstrait au prototype

Pour chaque opération, on remplit le tableau « a besoin de / modifie l'état ? /
valeur attendue ? » ; il donne directement le prototype.

| Opération | A besoin de | Modifie l'état ? | Valeur attendue | Prototype (pile de `int`) |
|-----------|-------------|:----------------:|-----------------|---------------------------|
| `isEmptyStack` | pile | non | vrai / faux | `int isEmptyStack(t_stack);` |
| `displayStack` | pile | non | rien | `void displayStack(t_stack);` |
| `push` | pile, valeur | **oui** | rien | `void push(t_stack *, int);` |
| `pop` | pile | **oui** | valeur dépilée | `int pop(t_stack *);` |
| `top` | pile | non | valeur consultée | `int top(t_stack);` |
| `createStack` | rien | — | pile | `t_stack createStack(void);` |

!!! methode "Lire un prototype"
    - « Modifie l'état » → paramètre **pointeur**.
    - Le **type de retour** de `pop` / `top` / `dequeue` est le type des éléments
      stockés : `int pop(t_stack *)` pour des entiers, `char pop(t_stack *)`
      pour des caractères. Le choix de `int` dans le cours n'a aucune importance
      sur l'algorithme.

## Les piles

On empile et dépile **à la même extrémité**. Deux structures s'y prêtent :

- la **liste chaînée**, en travaillant **au début** (tête) ;
- le **tableau**, en travaillant **à la fin** (dernière case utilisée).

### Pile avec une liste chaînée

```c
typedef t_list t_stacklist;   /* une pile EST une liste simple : on ne stocke que head */
```

| Opération pile | Opération liste | Complexité |
|----------------|-----------------|:----------:|
| pile vide ? | liste vide ? (`head == NULL`) | $O(1)$ |
| pile pleine ? | **jamais** (seule limite : la mémoire) | — |
| `push` | ajout en tête (`addCell`) | $O(1)$ |
| `pop` | retrait en tête + on garde la valeur | $O(1)$ |
| `top` | valeur de la tête | $O(1)$ |

```c
int pop(t_stacklist *p_stack)      /* la pile doit être non vide */
{
    t_cell *temp = p_stack->head;
    int val = temp->value;          /* on garde la valeur... */
    p_stack->head = temp->next;     /* ...on décroche la tête... */
    free(temp);                     /* ...et on libère la cellule */
    return val;
}
```

### Pile avec un tableau

```c
#define NBMAX 50

struct s_stacktab
{
    int values[NBMAX];   /* int ou n'importe quel autre type */
    int nbElts;          /* taille logique = nombre de cases utilisées */
};
typedef struct s_stacktab t_stacktab;
```

```text
 values : [ 8 | 3 | 1 | ? | ? | … | ? ]      nbElts = 3
            0   1   2   3                    push écrit en values[nbElts]   (case 3)
                    ▲                        pop lit     values[nbElts-1] (case 2)
              sommet de pile
```

| Opération | Indice | Condition | Complexité |
|-----------|--------|-----------|:----------:|
| `push` | écrit dans `values[nbElts]` puis `nbElts++` | pile **non pleine** : `nbElts < NBMAX` | $O(1)$ |
| `pop` | lit `values[nbElts - 1]` puis `nbElts--` | pile **non vide** : `nbElts > 0` | $O(1)$ |

```c
int isEmptyStack(t_stacktab s)          /* ne modifie pas : par valeur */
{
    return (s.nbElts == 0);
}

int pop(t_stacktab *p_stack)            /* modifie nbElts : pointeur */
{
    int val, position;
    assert(p_stack->nbElts > 0);        /* exige une pile non vide */
    position = p_stack->nbElts;
    val = p_stack->values[position - 1];
    p_stack->nbElts = position - 1;
    return val;
}
```

Après un `pop`, la valeur est **toujours dans le tableau** : seule la taille
logique a diminué, la case sera simplement réécrite au prochain `push`.

### Pile vide, pile pleine : qui vérifie ?

`pop` sur une pile vide ou `push` sur une pile pleine n'ont pas de sens. Deux
stratégies :

=== "Conseillée : vérifier avant l'appel"

    `pop()` **exige** une pile non vide (`assert` : erreur à l'exécution sinon).
    C'est à l'appelant de vérifier :

    ```c
    if (isEmptyStack(S))
    {
        /* pile vide : agir en conséquence */
    }
    else
    {
        int value = pop(&S);   /* pop() en toute sécurité */
    }
    ```

=== "Alternative : pop() vérifie et le dit"

    Retourner une valeur « spéciale » est un **piège** (impossible de la
    distinguer d'une vraie valeur de la pile). On retourne plutôt un booléen de
    succès, et la valeur par un paramètre pointeur :

    ```c
    int pop(t_stacktab *p_stack, int *p_val)
    {
        if (isEmptyStack(*p_stack))
        {
            return 0;                  /* rien à dépiler */
        }
        p_stack->nbElts = p_stack->nbElts - 1;
        *p_val = p_stack->values[p_stack->nbElts];
        return 1;                      /* une valeur a été récupérée */
    }
    ```

## Les files

On ajoute à une extrémité et on retire à l'autre. Deux structures s'y prêtent :
la **liste ht** et le **tableau avec deux indices**.

### File avec une liste ht

Deux choix possibles :

| Choix | Enfiler | Défiler | Verdict |
|-------|---------|---------|---------|
| 1. ajouter en tête, retirer en queue | $O(1)$ | $O(N)$ : il faut l'**avant-dernière** pour mettre à jour `tail` | à éviter |
| 2. **ajouter en queue, retirer en tête** | $O(1)$ via `tail` | $O(1)$ | **le bon** |

```c
typedef t_ht_list t_queue;
```

- File vide = liste ht vide ; une file en liste n'est **jamais pleine**.
- `enqueue` = ajout en queue de liste ht ; `dequeue` = retrait en tête (en
  remettant `tail` à `NULL` si la file devient vide) ; `top` = valeur de la tête.

### File avec un tableau : le buffer circulaire

```c
#define NBMAX 50

struct s_queuetab
{
    int values[NBMAX];
    int first, last;   /* first : où défiler ; last : où enfiler */
};
typedef struct s_queuetab t_queuetab;
```

- **File vide à la création** : `first = last = 0`.
- **Enfiler** : on écrit dans la case `last`, puis `last++`.
- **Défiler** : on lit la case `first`, puis `first++`.

```text
 enfiler 4, 8, 7 :     [ 4 | 8 | 7 | . | . ]     first = 0, last = 3
 défiler (→ 4) :       [ . | 8 | 7 | . | . ]     first = 1, last = 3
```

!!! definition "Vide et pleine"
    - **Vide** : `first == last` (pas forcément 0 : après 5 enfilements et 5
      défilements, `first = last = 5`).
    - **Pleine** : `last - first == NBMAX` (c'est le **nombre d'éléments**, pas
      `last == NBMAX`).

!!! piege "Le paradoxe de la file vide inutilisable"
    Avec `first = last = 50` et `NBMAX = 50`, la file est **vide**, mais on ne
    peut plus enfiler sans sortir du tableau. Solution : le **buffer
    circulaire**. `first` et `last` augmentent indéfiniment, et on accède aux
    cases **modulo la taille** :

    | | Indice réel |
    |---|---|
    | enfiler | `last % NBMAX` |
    | défiler | `first % NBMAX` |

    `last` compte les éléments enfilés depuis le début, `first` les éléments
    défilés ; `last - first` est donc le nombre d'éléments présents. Les
    conditions vide / pleine restent les mêmes.

```c
void enqueue(t_queuetab *p_q, int val)   /* file non pleine */
{
    p_q->values[p_q->last % NBMAX] = val;
    p_q->last = p_q->last + 1;
}

int dequeue(t_queuetab *p_q)             /* file non vide */
{
    int val = p_q->values[p_q->first % NBMAX];
    p_q->first = p_q->first + 1;
    return val;
}
```

## Tableau ou liste chaînée ?

| Opération / caractéristique | Tableau | Liste simplement chaînée |
|-----------------------------|---------|--------------------------|
| Taille | fixe, limitée | virtuellement illimitée |
| Mémoire | une partie non utilisée | juste le nécessaire |
| Accéder à un élément | $O(1)$ | $O(N)$ |
| Insérer au début | $O(N)$ (décaler) | $O(1)$ |
| Insérer à la fin | $O(1)$ | $O(1)$ avec `tail` |
| Insérer ailleurs (garder trié) | $O(N)$ | $O(N)$ |
| Supprimer au début | $O(N)$ | $O(1)$ |
| Supprimer à la fin | $O(1)$ | $O(N)$ |
| Supprimer ailleurs | $O(N)$ | $O(N)$ |

D'où les bons choix :

| | Avec un tableau | Avec une liste |
|---|-----------------|----------------|
| **Pile** | travailler **à la fin** (`nbElts`) | travailler **en tête** (liste simple) |
| **File** | **deux indices** `first` / `last` + modulo | **liste ht** : enfiler en queue, défiler en tête |

Toutes ces opérations sont en $O(1)$.
