---
title: "Bonnes pratiques en C"
---

# Bonnes pratiques en langage C (CM 2,5)

Objectif du module : produire un code **correct, documenté et efficace**. Trois
axes : la syntaxe, la modularité (API), la documentation.

## Syntaxe et nommage

| Élément | Convention | Exemples |
|---------|------------|----------|
| Variables | minuscules, nom **significatif** | `int cpt;`, `char carac;`, `t_cell cellule;` (et non `int A;`, `char x;`) |
| Structures | préfixe `s_` | `struct s_dbllist` |
| Types (`typedef`) | préfixe `t_` | `typedef struct s_dbllist t_dbllist;` |
| Pointeurs | préfixe `p_` ou `ptr_` (sauf `char *`) | `t_cell *ptr_c;`, `t_list *p_list;` |
| Fonctions | verbe d'action, un seul style | `createListFromArray`, `CreateListFromArray` ou `create_list_from_array` |

Le style d'indentation se choisit **une fois pour toutes** (l'IDE aide). Le CM
compare deux versions de la même fonction :

=== "Lisible"

    ```c
    void headChainHt(t_ht_list *p_list, int val)
    {
        t_cell *p_nouv;
        p_nouv = createCell(val);
        if (p_list->head == NULL)
        {
            p_list->tail = p_nouv;
        }
        p_nouv->next = p_list->head;
        p_list->head = p_nouv;
        return;
    }
    ```

=== "Illisible"

    ```c
    void HCH(list *L, int x){
    cell *c=CC(x);
    if (!L->h) L->t=c;
    c->n=L->h;L->h=c;}
    ```

## Modularité : fichiers `.h` et `.c`

!!! definition "API et bibliothèque"
    Une **bibliothèque** est une boîte à outils de fonctions (fichiers `.c`, ou
    compilés `.lib`, `.dll`, `.a`, `.so`). Son **mode d'emploi** est le fichier
    d'en-tête `.h` : il ne contient que des déclarations de types et des
    **prototypes**. Un prototype est le mode d'emploi d'une fonction.

- Un `.h` ne se compile pas (pas d'instructions).
- On inclut un `.h` **là où on utilise** ses types ou ses fonctions : « on ne
  peut utiliser que ce qui a déjà été déclaré ». C'est pour ça qu'il faut
  `#include <stdio.h>` pour appeler `printf`.
- On n'inclut **jamais** un fichier `.c`.
- On vérifie que chaque `.c` est bien compilé (dans CLion : `CMakeLists.txt`).

```c title="cell.h"
#ifndef CELL_H          /* directives de garde : évitent les inclusions multiples */
#define CELL_H

struct s_cell
{
    int value;
    struct s_cell *next;
};
typedef struct s_cell t_cell;

t_cell *createCell(int);
void displayCell(t_cell);

#endif
```

```c title="list.h"
#ifndef LIST_H
#define LIST_H
#include "cell.h"       /* s_std_list utilise t_cell, déclaré dans cell.h */

struct s_std_list
{
    t_cell *head;
};
typedef struct s_std_list t_std_list;

void displayStdList(t_std_list);

#endif
```

Intérêts de la modularité : organiser le code logiquement, ne recompiler que ce
qui a changé, se répartir le travail (projet).

## Documentation

On documente **en priorité les `.h`** (c'est ce que lit l'utilisateur de la
bibliothèque). Le format **Doxygen** permet de générer une documentation en
ligne automatiquement :

```c
/**
 * @brief Insère une valeur dans l'arbre binaire de recherche.
 * @param p_tree pointeur sur l'arbre dans lequel insérer
 * @param value  valeur entière à insérer
 * @return rien
 */
void insertBST(t_tree *p_tree, int value);
```

!!! tip "Penser « API »"
    La fonction `main()` ne fait qu'**appeler** d'autres fonctions. Toute la
    logique est dans des fonctions courtes, nommées et documentées.

## IA génératives : ce que dit le module

| Conseillé (avec explications) | Déconseillé | Interdit en projet |
|-------------------------------|-------------|--------------------|
| Faire des fiches, des quiz, reformuler une erreur du compilateur, commenter ou analyser du code, vérifier un algorithme, générer des données de test, aide sur Git | Obtenir des corrigés bruts, produire le code des TP, corriger sans explication | Générer du code que l'on ne comprend pas à 100 %, générer des résultats *ex nihilo* |
