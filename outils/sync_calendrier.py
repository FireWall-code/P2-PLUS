#!/usr/bin/env python3
"""Génère docs/data/calendrier.json à partir de l'emploi du temps Efrei (flux iCal).

Utilisation :
    EFREI_ICS_URL="https://..." python outils/sync_calendrier.py
    python outils/sync_calendrier.py --fichier emploi-du-temps.ics

Seules les informations utiles au compte à rebours sont publiées : module,
type d'activité (CTD, TP, CE, DE…), horaires et supports autorisés. Les noms
des enseignants, les salles et les groupes ne sont jamais écrits dans le JSON.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import urllib.request
from datetime import date, datetime, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

RACINE = Path(__file__).resolve().parent.parent
SORTIE = RACINE / "docs" / "data" / "calendrier.json"

RE_EMPLACEMENT = re.compile(r'data-module="([^"]+)"')
RE_TITRE = re.compile(r"^title:\s*(.+)$", re.M)


def ordre_menu(dossier: Path) -> list[str]:
    """Entrées listées dans le fichier .pages d'un dossier (ordre du menu)."""
    pages = dossier / ".pages"
    if not pages.exists():
        return []
    return re.findall(r"^\s*-\s*(?:[^:]+:\s*)?([\w.-]+)\s*$", pages.read_text(encoding="utf-8"), re.M)


def cle_menu(page: Path) -> tuple[int, int, str]:
    categorie, matiere = page.parent.parent, page.parent
    rang = lambda nom, ordre: ordre.index(nom) if nom in ordre else len(ordre)
    return (rang(categorie.name, ordre_menu(RACINE / "docs")),
            rang(matiere.name, ordre_menu(categorie)), str(page))


def modules_du_site() -> dict[str, tuple[str, str]]:
    """Matières suivies : celles dont la page d'accueil contient un emplacement agenda-matiere.

    Renvoie {code EFREI: (titre, chemin de la page)}.
    """
    modules = {}
    for page in sorted((RACINE / "docs").glob("*/*/index.md"), key=cle_menu):
        texte = page.read_text(encoding="utf-8")
        code = RE_EMPLACEMENT.search(texte)
        if code:
            titre = RE_TITRE.search(texte)
            chemin = page.parent.relative_to(RACINE / "docs").as_posix() + "/"
            modules[code.group(1)] = (titre.group(1).strip() if titre else code.group(1), chemin)
    return modules


MODULES = modules_du_site()

# Activités comptées comme des évaluations (compte à rebours)
EVALUATIONS = {"CE", "DE"}

RE_CODE = re.compile(r"Code module:\s*(.+?)-\d{4}[A-Z]")
RE_ACTIVITE = re.compile(r"Activit[ée]\s*:\s*(\S+)")
RE_SUPPORTS = re.compile(r"Support\(s\) autoris[ée]\(s\)\s*:\s*\n?\s*(.+)")


# --------------------------------------------------------------------------- #
# Lecture du flux iCal (sans dépendance externe)
# --------------------------------------------------------------------------- #

def deplier(texte: str) -> list[str]:
    """Recolle les lignes repliées (RFC 5545 : une ligne qui commence par un espace)."""
    lignes: list[str] = []
    for ligne in texte.replace("\r\n", "\n").split("\n"):
        if ligne[:1] in (" ", "\t") and lignes:
            lignes[-1] += ligne[1:]
        else:
            lignes.append(ligne)
    return lignes


def dechapper(valeur: str) -> str:
    return (valeur.replace("\\n", "\n").replace("\\N", "\n")
            .replace("\\,", ",").replace("\\;", ";").replace("\\\\", "\\"))


def lire_date(parametres: str, valeur: str) -> datetime:
    """Convertit DTSTART/DTEND en datetime UTC."""
    if "VALUE=DATE" in parametres and "T" not in valeur:
        j = date(int(valeur[:4]), int(valeur[4:6]), int(valeur[6:8]))
        return datetime(j.year, j.month, j.day, tzinfo=ZoneInfo("Europe/Paris")).astimezone(timezone.utc)
    moment = datetime.strptime(valeur.rstrip("Z"), "%Y%m%dT%H%M%S")
    if valeur.endswith("Z"):
        return moment.replace(tzinfo=timezone.utc)
    tzid = re.search(r"TZID=([^;:]+)", parametres)
    zone = ZoneInfo(tzid.group(1)) if tzid else ZoneInfo("Europe/Paris")
    return moment.replace(tzinfo=zone).astimezone(timezone.utc)


def lire_evenements(texte: str) -> list[dict]:
    evenements, courant = [], None
    for ligne in deplier(texte):
        if ligne == "BEGIN:VEVENT":
            courant = {}
        elif ligne == "END:VEVENT":
            if courant is not None:
                evenements.append(courant)
            courant = None
        elif courant is not None and ":" in ligne:
            cle, valeur = ligne.split(":", 1)
            nom, _, parametres = cle.partition(";")
            if nom in ("DTSTART", "DTEND"):
                courant[nom] = lire_date(parametres, valeur)
            elif nom in ("SUMMARY", "DESCRIPTION", "STATUS"):
                courant[nom] = dechapper(valeur)
    return evenements


# --------------------------------------------------------------------------- #
# Construction du JSON publié
# --------------------------------------------------------------------------- #

def iso(moment: datetime) -> str:
    return moment.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def extraire_seance(ev: dict) -> dict | None:
    description = ev.get("DESCRIPTION", "")
    code = RE_CODE.search(description)
    activite = RE_ACTIVITE.search(description)
    if not code or not activite or "DTSTART" not in ev or ev.get("STATUS") == "CANCELLED":
        return None
    code, activite = code.group(1).strip(), activite.group(1).strip()
    # On garde les matières du site, plus toutes les évaluations (anglais, etc.)
    if code not in MODULES and activite not in EVALUATIONS:
        return None
    seance = {
        "module": code,
        "titre": MODULES.get(code, (ev.get("SUMMARY", code).strip(), ""))[0],
        "type": activite,
        "debut": iso(ev["DTSTART"]),
        "fin": iso(ev.get("DTEND", ev["DTSTART"])),
    }
    supports = RE_SUPPORTS.search(description)
    if activite in EVALUATIONS and supports:
        seance["supports"] = supports.group(1).strip()
    return seance


def construire(seances: list[dict]) -> dict:
    uniques = {(s["module"], s["type"], s["debut"]): s for s in seances}
    return {
        "maj": iso(datetime.now(timezone.utc)),
        "modules": {code: {"titre": t, "page": p} for code, (t, p) in MODULES.items()},
        "seances": sorted(uniques.values(), key=lambda s: (s["debut"], s["module"])),
    }


def ecrire(donnees: dict, sortie: Path = SORTIE) -> None:
    sortie.parent.mkdir(parents=True, exist_ok=True)
    sortie.write_text(json.dumps(donnees, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    nb_eval = sum(s["type"] in EVALUATIONS for s in donnees["seances"])
    print(f"{sortie.relative_to(RACINE)} : {len(donnees['seances'])} séances dont {nb_eval} évaluations")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--fichier", type=Path, help="fichier .ics local (sinon $EFREI_ICS_URL)")
    args = parser.parse_args()

    if args.fichier:
        texte = args.fichier.read_text(encoding="utf-8")
    else:
        url = os.environ.get("EFREI_ICS_URL", "").strip()
        if not url:
            sys.exit("EFREI_ICS_URL non défini (ou utiliser --fichier).")
        requete = urllib.request.Request(url, headers={"User-Agent": "revisions-efrei"})
        with urllib.request.urlopen(requete, timeout=60) as reponse:
            texte = reponse.read().decode("utf-8", errors="replace")

    seances = [s for ev in lire_evenements(texte) if (s := extraire_seance(ev))]
    if not seances:
        sys.exit("Aucune séance reconnue dans le flux : JSON existant conservé.")
    ecrire(construire(seances))


if __name__ == "__main__":
    main()
