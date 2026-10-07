---
title: "Fiche — Listes avancées"
---

# Fiche — Listes avancées

!!! abstract "L'essentiel en 30 secondes"
    - **ht** : `head` + `tail` → ajout en fin en $O(1)$. Vide ⇔ `head == NULL` (et `tail == NULL`).
    - **Circulaire** (`typedef t_ht_list t_circ_list;`) : la dernière pointe sur la première. Fin ⇔ `temp == tail` (ou `temp->next == head`). Une cellule ⇔ `head == tail`.
    - **Double** : `prec` + `next` ; `temp->prec` remplace `prev`. Insertion = 4 pointeurs, suppression = 2.
    - À chaque fonction : se demander si **`head`** et/ou **`tail`** changent.

## Liste ht — qui bouge ?

| Opération | `head` | `tail` |
|-----------|:------:|:------:|
| ajout en tête, liste vide | ✔ | ✔ |
| ajout en tête, non vide | ✔ | — |
| ajout en queue, liste vide | ✔ | ✔ |
| ajout en queue, non vide | — | ✔ |
| suppression de la première (s'il en reste) | ✔ | — |
| suppression de la dernière (s'il en reste) | — | ✔ (= `prev`) |
| suppression de l'unique cellule | ✔ `NULL` | ✔ `NULL` |

```c
void addTailHt(t_ht_list *p, int val)
{
    t_cell *nc = createCell(val);
    if (p->tail == NULL) { p->head = nc; p->tail = nc; }
    else                 { p->tail->next = nc; p->tail = nc; }
}
```

!!! methode "Insertion triée"
    Parcours `temp` / `prev` tant que `temp != NULL && temp->value < val`.
    Puis trois cas : liste vide ; `temp == head` (insertion en tête) ; sinon
    `prev->next = nc; nc->next = temp;` et si `temp == NULL`, `tail = nc`.

## Liste circulaire

```c
/* ajout en tête */
if (p->head == NULL) { nc->next = nc; p->head = nc; p->tail = nc; }
else { nc->next = p->head; p->head = nc; p->tail->next = nc; }

/* parcours complet (liste non vide) */
temp = l.head;
while (temp != l.tail) { /* traiter */ temp = temp->next; }
/* traiter la dernière (temp == tail) */
```

| Suppression | Actions |
|-------------|---------|
| unique cellule (`head == tail`) | `free`, `head = tail = NULL` |
| en tête | `head = head->next; tail->next = head;` |
| au milieu | `prev->next = curr->next;` |
| en dernier | `prev->next = curr->next; tail = prev;` |

## Liste doublement chaînée

```c
typedef struct s_dcell { struct s_dcell *prec; int value; struct s_dcell *next; } t_dcell;
typedef struct s_dbl_list { t_dcell *head; } t_dbl_list;
```

=== "Ajout en tête"

    ```c
    nd->next = p->head;
    if (p->head != NULL) p->head->prec = nd;
    p->head = nd;
    ```

=== "Suppression (milieu)"

    ```c
    temp->prec->next = temp->next;
    temp->next->prec = temp->prec;
    free(temp);
    ```

=== "Insertion avant `temp` (milieu)"

    ```c
    temp->prec->next = nd;
    nd->prec = temp->prec;
    nd->next = temp;
    temp->prec = nd;          /* en dernier ! */
    ```

## Pièges

!!! piege "`tail->next` sur une liste vide"
    `p->tail->next = …` plante si `tail == NULL`. Toujours traiter le cas vide
    en premier (CC1 2023, DE 2024).

!!! piege "Boucle `while (temp != head)` dans une circulaire"
    Si `temp` part de `head`, la condition est fausse d'entrée : la boucle ne
    tourne jamais. On boucle jusqu'à `tail`, puis on traite la dernière à part.

!!! piege "Double : les extrémités"
    `temp->prec->next` plante en tête (`prec == NULL`), `temp->next->prec`
    plante en fin. Tester avant.

## Auto-test

??? question "Liste ht non vide : `head->next == tail` est-il possible ? `tail->next == head` ?"
    Le premier oui (exactement 2 cellules). Le second non : dans une liste ht,
    `tail->next` vaut `NULL` (ce serait une circulaire).

??? question "Pourquoi `t_circ_list` garde-t-elle `tail` ?"
    Pour mettre à jour `tail->next` lors d'un ajout en tête en $O(1)$, sans
    parcourir toute la liste pour trouver la dernière.

??? question "Taille mémoire d'une cellule simple vs double (int et pointeurs sur 4 octets) ?"
    ≈ 8 octets contre ≈ 12 octets.
