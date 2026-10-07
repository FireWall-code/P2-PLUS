---
title: "Annales — CC1 et CC2 (2023)"
---

# Annales — CC1 et CC2 de 2023

Tests Moodle de l'année 2023-2024 (questionnaires en mode séquentiel : pas de
retour en arrière). Format différent du CE actuel, mais les questions sont du
même type : **compléter du code**, choisir un **prototype**, prévoir l'**état**
d'une structure.

## CC1 — 10 octobre 2023

25 minutes, 10 questions. Listes simples, ht et circulaires.

**Q2 — `scanOrder()`.** Saisir les champs d'une structure `t_order`
(`order_num` : int, `supplier_name` : chaîne, `order_amount` : float).

??? success "Correction"
    La fonction **remplit** la structure : elle la modifie, donc pointeur.

    ```c
    void scanOrder(t_order *p_order);

    void scanOrder(t_order *p_order)
    {
        printf("order number :");
        scanf("%d", &(p_order->order_num));
        printf("supplier name :");
        scanf("%s", p_order->supplier_name);      /* tableau de char : déjà une adresse */
        printf("order amount :");
        scanf("%f", &(p_order->order_amount));
        return;
    }
    ```

    Le piège : `&` devant les champs `int` et `float`, **pas** devant la chaîne.

**Q3.** Mot-clé qui définit un nouveau type composé ?

??? success "Correction"
    **`struct`**. (`typedef` ne fait que donner un **nouveau nom** à un type
    existant ; `#define` est une directive du préprocesseur.)

**Q4.** Avec `char *p_str;` et `char letter = 'X';`, quelle instruction ne
provoque ni erreur ni plantage ?

??? success "Correction"
    **`p_str = &letter;`** — un pointeur sur char reçoit l'adresse d'un char.
    `p_str = *letter` : on ne déréférence pas un char. `&letter = p_str` : une
    adresse n'est pas modifiable. `letter = *p_str` : `p_str` n'est pas
    initialisé → plantage probable.

**Q5 — `deleteList()`.** Supprimer toutes les cellules.

??? success "Correction"
    ```c
    void deleteList(t_std_list *p_list)
    {
        p_cell prev, temp;
        temp = p_list->head;
        prev = temp;
        while (temp != NULL)
        {
            prev = temp;            /* on retient la cellule à libérer */
            temp = temp->next;      /* on avance AVANT de libérer */
            free(prev);
        }
        p_list->head = NULL;        /* la liste redevient vide */
        return;
    }
    ```

**Q6 — `effaceTete()`.** Supprimer la cellule de tête.

??? success "Correction"
    ```c
    void effaceTete(t_std_list *p_list)
    {
        p_cell temp;
        if (p_list->head != NULL)
        {
            temp = p_list->head;
            p_list->head = p_list->head->next;
            free(temp);
        }
        return;
    }
    ```

**Q7.** `myhtlist` est une liste ht **non vide**. Quelles conditions peuvent
être vraies ? (deux réponses)

??? success "Correction"
    - **`head != tail`** : vrai dès qu'il y a au moins 2 cellules.
    - **`head->next == tail`** : vrai s'il y a exactement 2 cellules.
    - ~~`tail->next == head`~~ : ce serait une liste circulaire ; dans une liste
      ht, `tail->next` vaut `NULL`.
    - ~~`head == NULL || tail == NULL`~~ : impossible, la liste n'est pas vide.

**Q8.** Liste `42 → 3 → 0 → -5 → …`. État après :

```c
temp = list.head->next;
list.head = temp->next;
temp = temp->next;
```

??? success "Correction"
    1. `temp` pointe sur **3**.
    2. `list.head` pointe sur la suivante de 3 : **0**.
    3. `temp` avance aussi sur **0**.

    La liste commence donc à `0 → -5 → …`, et `temp` pointe sur 0. Les cellules
    42 et 3 sont **perdues** (plus aucun pointeur dessus, et non libérées : fuite
    mémoire).

**Q9.** Où plante cette fonction ?

```c
43  void addTailHt(t_ht_list *p_list, int val)
44  {
45      p_cell nouv = createCell(val);
46
47      p_list->tail->next = nouv;
48      p_list->tail = nouv;
49
50      return;
51  }
```

??? success "Correction"
    **Ligne 47** : si la liste est **vide**, `p_list->tail` vaut `NULL` et
    `p_list->tail->next` déréférence `NULL`. Il manque le cas « liste vide »
    (`head = tail = nouv`). Version correcte en [TD 2](td-2-listes-avancees.md#exercice-1).

**Q10.** Dans une liste ht, quand `tail` ne doit-il **pas** être modifié ?

??? success "Correction"
    - **Insertion en tête dans une liste non vide** : la dernière reste la même.
    - **Suppression en queue dans une liste vide** : il n'y a rien à faire.

    En revanche `tail` change pour une insertion en queue (toujours) et pour
    une insertion en tête dans une liste vide (la nouvelle est aussi la
    dernière).

**Q11.** Que vaut `temp` à la sortie de la boucle ?

```c
void doSomething(t_circ_list mycirclist)
{
    p_cell temp;
    temp = mycirclist.head;
    while (temp->next != mycirclist.head)
    {
        /* do something with the current cell */
        temp = temp->next;
    }
}
```

??? success "Correction"
    **`temp == mycirclist.tail`** : on s'arrête sur la cellule dont la suivante
    est la première, c'est-à-dire la dernière. Remarque : le corps de la boucle
    n'a **pas** été exécuté pour la dernière cellule (même piège qu'au
    [TD 2, exercice 5](td-2-listes-avancees.md#exercice-5-displaycirclist)).

## CC2 — 24 octobre 2023

40 minutes. Piles, files et premiers parcours d'arbres.

**Q2.** Un nombre = empiler, `#` = dépiler. État de la pile après
`35#691#3##37#4` ?

??? success "Correction"
    | Lu | Pile (fond → sommet) |
    |----|----------------------|
    | 3 5 | 3 5 |
    | # | 3 |
    | 6 9 1 | 3 6 9 1 |
    | # | 3 6 9 |
    | 3 | 3 6 9 3 |
    | # # | 3 6 |
    | 3 7 | 3 6 3 7 |
    | # | 3 6 3 |
    | 4 | 3 6 3 4 |

    Réponse : **3634**.

**Q3.** Compléter `stack()` (= `push`) pour `t_stack_tab` non pleine.

??? success "Correction"
    ```c
    void stack(t_stack_tab *ps, int val)
    {
        int pos = ps->nbElts;
        ps->values[pos] = val;
        ps->nbElts = pos + 1;
        return;
    }
    ```

**Q4.** Complexités de `stack()` et `unstack()` pour une pile en liste ?

??? success "Correction"
    **$O(1)$ et $O(1)$** : on ajoute et on retire en tête.

**Q5.** Structures les plus adaptées pour une pile ?

??? success "Correction"
    La **liste simple** `t_std_list` et le **tableau avec un indice**
    (`values` + `nbElts`). La liste ht et le tableau à deux indices sont faits
    pour les **files**.

**Q6–Q7.** File en tableau `t_queue_tab` (`values[50]`, `first`, `last`).

??? success "Correction"
    - `first == last == 50` → la file est **vide** (50 enfilés, 50 défilés).
    - File pleine : **`last - first == 50`**.

**Q8.** Compléter `displayQueue()` (affiche `Queue [1234]`, ou `Queue []` si vide).

??? success "Correction"
    ```c
    void displayQueue(t_queue_tab queue)
    {
        printf("Queue [");
        if (queue.first != queue.last)
        {
            for (int i = queue.first; i < queue.last - 1; i++)
            {
                printf("%d", queue.values[i]);
            }
            printf("%d", queue.values[queue.last - 1]);
        }
        printf("]\n");
        return;
    }
    ```
    (Version sans buffer circulaire : les indices restent sous 50.)

**Q9.** Bon prototype de `dequeue()` pour une file d'entiers ?

??? success "Correction"
    **`int dequeue(t_queue_tab *);`** — la file est modifiée (pointeur) et on
    récupère la valeur défilée (`int`).

**Q10.** Type de liste le plus adapté pour une file ?

??? success "Correction"
    **`t_ht_list`** : enfiler en queue et défiler en tête, tout en $O(1)$.

**Q11.** Vrai ou faux : on peut implémenter une file avec
`struct { int values[50]; int nbElements; }`.

??? success "Correction"
    **Faux.** Avec un seul indice, on sait où enfiler (à la fin) mais pas où
    défiler sans **décaler** tout le tableau à chaque `dequeue` : ce n'est pas
    l'implémentation d'une file vue en cours, qui exige `first` **et** `last`.

**Q12.** Vrai ou faux : on peut implémenter une file avec une `t_std_list`.

??? success "Correction"
    **Vrai** — c'est possible, juste moins efficace : l'une des deux opérations
    (enfiler en fin) coûte $O(N)$.

**Q13–Q15.** Parcours d'arbres.

=== "Q13 — infixe"

    ```text
                  1
                 /
                2
             /     \
            5       3
             \     / \
              6   7   4
                 / \
               10   8
                     \
                      9
    ```

=== "Q14 — postfixe"

    ```text
                5
              /   \
             3     1
            / \     \
           2   7     8
          / \       /
        10   6     4
              \
               9
    ```

=== "Q15 — préfixe"

    ```text
              20
            /    \
           5      25
          / \    /  \
         3  12  21   28
            / \
           8   13
          /
         6
    ```

??? success "Correction"
    - **Q13 — infixe** : `5 6 2 10 7 8 9 3 4 1`
    - **Q14 — postfixe** : `10 9 6 2 7 3 4 8 1 5`
    - **Q15 — préfixe** : `20 5 3 12 8 6 13 25 21 28`

    Méthode sûre : dessiner un contour autour de l'arbre en partant à gauche de
    la racine ; on note un nœud **en passant à sa gauche** (préfixe), **en
    dessous** (infixe) ou **à sa droite** (postfixe).
