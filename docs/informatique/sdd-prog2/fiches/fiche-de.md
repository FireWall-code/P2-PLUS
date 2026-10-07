---
title: "Fiche DE — Tout le module"
---

# Fiche DE — Tout le module en une page

DE du **12 décembre 2026** : 1 h 50, sans documents ni calculatrice, 60 % de la
note. Format 2024 : listes ht, piles (parenthésage), arbres (hauteur, ABR, AVL).

!!! abstract "Les 6 réflexes"
    1. **Schéma** avant le code : variables, pointeurs, `NULL`.
    2. **Prototype** : la structure est-elle modifiée ? → pointeur. Que retourne-t-on ?
    3. **Cas limites** : vide, un seul élément, en tête, en fin.
    4. **Ordre des affectations** : raccrocher avant de déplacer, avancer avant de `free`.
    5. **Récursif** : cas de base `NULL`, puis lanceur pour la structure (`.head`, `.root`).
    6. **Justifier** chaque réponse, même courte.

## Choisir un prototype

| Question | Réponse → conséquence |
|----------|-----------------------|
| La fonction modifie-t-elle `head` / `tail` / `root` / `nbElts` / `first` / `last` ? | oui → `t_… *p_…` ; non → par valeur |
| Retourne-t-elle une valeur de la structure ? | type des éléments (`int`, `char`…) |
| Un résultat oui / non ? | `int` (1 / 0) |
| Une position ? | un pointeur (`t_cell *`, `t_node *`), `NULL` si absent |
| Crée-t-elle une structure ? | retourne la structure (`t_list createList(void)`) |

| Fonction | Prototype |
|----------|-----------|
| ajout en tête / en queue | `void addHead(t_ht_list *, int);` |
| recherche | `t_cell *search(t_list, int);` |
| `pop` / `dequeue` | `int pop(t_stack *);` |
| `top` / `isEmpty` | `int top(t_stack);` |
| hauteur, compter | `int nodeHeight(t_node *);` |
| insertion ABR | `void insertBST(t_tree *, int);` |
| rotation | `t_node *rightRotation(t_node *);` |

## Tableau des complexités

| Structure | Ajout | Retrait | Recherche |
|-----------|-------|---------|-----------|
| Liste simple | tête $O(1)$, fin $O(N)$ | tête $O(1)$, fin $O(N)$ | $O(N)$ |
| Liste ht | tête et fin $O(1)$ | tête $O(1)$, fin $O(N)$ | $O(N)$ |
| Tableau | fin $O(1)$, début $O(N)$ | fin $O(1)$, début $O(N)$ | $O(N)$ ; accès indice $O(1)$ |
| Pile / file (bonne implémentation) | $O(1)$ | $O(1)$ | — |
| ABR | $O(h)$ : de $O(\log N)$ à $O(N)$ | non traité | $O(h)$ |
| AVL | $O(\log N)$ | non traité | $O(\log N)$ |

## Les cas limites, structure par structure

| Structure | À ne pas oublier |
|-----------|------------------|
| Liste simple | liste vide ; suppression **en tête** (`prev == NULL`) |
| Liste ht | liste vide (`tail == NULL`) ; mise à jour de `tail` en fin ; `tail = NULL` quand la liste se vide |
| Circulaire | vide ; **une seule cellule** (`head == tail`, pointe sur elle-même) ; `tail->next = head` après un changement de tête |
| Double | `prec == NULL` en tête, `next == NULL` en fin |
| Pile / file | vide avant `pop` / `dequeue` ; pleine avant `push` / `enqueue` (tableau) |
| Arbre | arbre vide ; nœud à **un seul** fils |

## Questions qui tombent

??? question "« Expliquez pourquoi on utilise une liste ht pour les listes circulaires. »"
    L'ajout en tête change la première cellule : la dernière doit pointer sur
    la nouvelle. `tail` y donne accès en $O(1)$ au lieu de parcourir la liste.

??? question "« Donnez la valeur retournée par cette fonction pour… »"
    Lire le code **tel qu'il est** (le DE 2024 contenait une boucle sans `i++`)
    et le signaler. Puis dérouler à la main, en notant l'état de la pile.

??? question "« Quel parcours prouve qu'un arbre est un ABR ? »"
    L'infixe : il doit être trié par ordre croissant.

??? question "« Bornes de la hauteur d'un ABR à N nœuds ? »"
    $\lfloor \log_2 N \rfloor \le h \le N - 1$ (complet / dégénéré).

??? question "« Quelle(s) opération(s) pour équilibrer cet arbre ? »"
    Nommer : « double rotation : gauche sur X puis droite sur Y », justifier
    par les BF (+2 / −1), **dessiner** l'arbre final et vérifier ses BF.

??? question "« Cet arbre peut-il venir de insertBST + équilibrage AVL ? »"
    Non s'il n'est pas AVL : la méthode garantit un AVL après chaque insertion.

## Les fiches détaillées

- [Listes chaînées simples](fiche-listes.md)
- [Listes avancées](fiche-listes-avancees.md)
- [Piles et files](fiche-piles-files.md)
- [Arbres binaires](fiche-arbres.md)
- [ABR équilibrés et AVL](fiche-avl.md)
