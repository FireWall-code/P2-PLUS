// Simulateur d'exercices de probabilités (SM301P, chapitres 1 à 3).
//
// Emplacement dans une page Markdown :
//   <div id="simulateur-proba"></div>
//
// Chaque générateur renvoie un exercice aux valeurs aléatoires :
//   { titre, enonce, questions: [{ label, type: "num" | "choix", reponse, options? }], indice, correction }
// Les formules sont écrites en LaTeX et rendues par MathJax (classe .arithmatex).

(() => {
  "use strict";

  // ------------------------------------------------------------------
  // Outils
  // ------------------------------------------------------------------
  const T = String.raw;
  const m = (tex) => `<span class="arithmatex">\\(${tex}\\)</span>`;
  const M = (tex) => `<div class="arithmatex">\\[${tex}\\]</div>`;
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = (liste) => liste[Math.floor(Math.random() * liste.length)];
  const melange = (liste) => {
    const l = [...liste];
    for (let i = l.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [l[i], l[j]] = [l[j], l[i]];
    }
    return l;
  };

  function pgcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) [a, b] = [b, a % b];
    return a || 1;
  }

  class Fr {
    constructor(n, d = 1) {
      if (d < 0) { n = -n; d = -d; }
      const g = pgcd(n, d);
      this.n = n / g;
      this.d = d / g;
    }
    static of(x) { return x instanceof Fr ? x : new Fr(x, 1); }
    add(o) { o = Fr.of(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
    sub(o) { o = Fr.of(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
    mul(o) { o = Fr.of(o); return new Fr(this.n * o.n, this.d * o.d); }
    div(o) { o = Fr.of(o); return new Fr(this.n * o.d, this.d * o.n); }
    eq(o) { o = Fr.of(o); return this.n === o.n && this.d === o.d; }
    val() { return this.n / this.d; }
    tex() {
      if (this.d === 1) return String(this.n);
      return `${this.n < 0 ? "-" : ""}\\frac{${Math.abs(this.n)}}{${this.d}}`;
    }
  }
  const UN = new Fr(1);
  const somme = (liste) => liste.reduce((s, x) => s.add(x), new Fr(0));

  // Nombre décimal « à la française » pour LaTeX (0{,}375)
  function nb(x, k = 4) {
    if (!Number.isFinite(x)) return "?";
    if (x !== 0 && Math.abs(x) < 1e-3) {
      const [mant, exp] = x.toExponential(2).split("e");
      return `${String(Number(mant)).replace(".", "{,}")} \\times 10^{${Number(exp)}}`;
    }
    let r = Number(x.toFixed(k));
    if (Object.is(r, -0)) r = 0;
    return String(r).replace(".", "{,}");
  }
  const txt = (x, k = 4) => nb(x, k).replace("{,}", ",");

  function decimalesExactes(f) {
    let d = f.d;
    while (d % 2 === 0) d /= 2;
    while (d % 5 === 0) d /= 5;
    if (d !== 1) return Infinity;
    const s = String(Number(f.val().toFixed(8)));
    return (s.split(".")[1] || "").length;
  }
  // Valeur exacte d'une fraction, suivie de sa valeur décimale
  function vf(f) {
    if (f.d === 1) return String(f.n);
    const k = decimalesExactes(f);
    if (k <= 4) return `${f.tex()} = ${nb(f.val())}`;
    return `${f.tex()} \\approx ${nb(f.val())}`;
  }
  // Donnée de l'énoncé, écrite en décimal (valeurs exactes)
  const d = (f) => nb(Fr.of(f).val(), 6);

  function fact(n) { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }
  function binom(n, k) {
    if (k < 0 || k > n) return 0;
    let r = 1;
    for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
    return Math.round(r);
  }

  // ------------------------------------------------------------------
  // Générateurs — chapitre 1
  // ------------------------------------------------------------------
  const GEN = [];
  const ajout = (chap, id, nom, f) => GEN.push({ chap, id, nom, f });

  ajout(1, "union", "Réunion, intersection, complémentaire", () => {
    let a, b, c;
    do { a = rnd(4, 14); b = rnd(4, 14); c = rnd(1, Math.min(a, b) - 1); } while (a + b - c > 19);
    const PA = new Fr(a, 20), PB = new Fr(b, 20), PAB = new Fr(c, 20);
    const PU = PA.add(PB).sub(PAB), PBb = UN.sub(PB);
    return {
      titre: "Réunion et intersection",
      enonce: `Soient ${m("A")} et ${m("B")} deux évènements tels que
        ${m(T`P(A) = ${d(PA)}`)}, ${m(T`P(\overline{B}) = ${d(PBb)}`)} et ${m(T`P(A \cup B) = ${d(PU)}`)}.`,
      questions: [
        { label: m(T`P(A \cap B)`), reponse: PAB.val() },
        { label: m(T`P(\overline{A} \cap \overline{B})`), reponse: UN.sub(PU).val() },
        { label: m(T`P(A \cap \overline{B})`), reponse: PA.sub(PAB).val() },
      ],
      indice: `Commence par ${m(T`P(B) = 1 - P(\overline{B})`)}. Ensuite :
        ${m(T`P(A \cup B) = P(A) + P(B) - P(A \cap B)`)}, puis De Morgan pour la 2e question.`,
      correction: `
        <p>${m(T`P(B) = 1 - ${d(PBb)} = ${d(PB)}`)}.</p>
        ${M(T`P(A \cap B) = P(A) + P(B) - P(A \cup B) = ${d(PA)} + ${d(PB)} - ${d(PU)} = ${d(PAB)}`)}
        ${M(T`P(\overline{A} \cap \overline{B}) = P(\overline{A \cup B}) = 1 - ${d(PU)} = ${d(UN.sub(PU))}`)}
        ${M(T`P(A \cap \overline{B}) = P(A) - P(A \cap B) = ${d(PA)} - ${d(PAB)} = ${d(PA.sub(PAB))}`)}
        <p>La dernière vient du découpage ${m(T`A = (A \cap B) \cup (A \cap \overline{B})`)} (union disjointe).</p>`,
    };
  });

  ajout(1, "poincare", "Formule de Poincaré (3 ensembles)", () => {
    const ctx = pick([
      { qui: "étudiants", noms: ["théâtre", "musique", "sport"], l: ["T", "M", "S"], verbe: "sont inscrits en" },
      { qui: "clients", noms: ["Netflix", "Spotify", "Deezer"], l: ["N", "S", "D"], verbe: "sont abonnés à" },
      { qui: "étudiants", noms: ["anglais", "espagnol", "chinois"], l: ["A", "E", "C"], verbe: "suivent l'option" },
    ]);
    const abc = rnd(2, 10);
    const ab = rnd(4, 25), ac = rnd(4, 25), bc = rnd(4, 25);
    const oa = rnd(15, 80), ob = rnd(15, 80), oc = rnd(10, 60);
    const aucun = rnd(20, 120);
    const N = abc + ab + ac + bc + oa + ob + oc + aucun;
    const [A, B, C] = ctx.l;
    const cA = oa + ab + ac + abc, cB = ob + ab + bc + abc, cC = oc + ac + bc + abc;
    const cAB = ab + abc, cAC = ac + abc, cBC = bc + abc;
    const union = cA + cB + cC - cAB - cAC - cBC + abc;
    const un = oa + ob + oc;
    return {
      titre: "Trois options (Poincaré)",
      enonce: `Sur ${N} ${ctx.qui} : ${cA} ${ctx.verbe} ${ctx.noms[0]} (${m(A)}), ${cB} en ${ctx.noms[1]} (${m(B)}),
        ${cC} en ${ctx.noms[2]} (${m(C)}) ; ${cAB} dans ${m(T`${A} \cap ${B}`)}, ${cAC} dans ${m(T`${A} \cap ${C}`)},
        ${cBC} dans ${m(T`${B} \cap ${C}`)} et ${abc} dans les trois. On en choisit un au hasard.`,
      questions: [
        { label: "Probabilité qu'il ne soit dans <strong>aucun</strong> des trois", reponse: aucun / N },
        { label: "Probabilité qu'il soit dans <strong>exactement un</strong>", reponse: un / N },
        { label: "Probabilité qu'il soit dans <strong>au moins deux</strong>", reponse: (union - un) / N },
      ],
      indice: `Poincaré donne le nombre dans ${m(T`${A} \cup ${B} \cup ${C}`)}. Pour « seulement ${A} » :
        ${m(T`|${A}| - |${A} \cap ${B}| - |${A} \cap ${C}| + |${A} \cap ${B} \cap ${C}|`)} (on a retiré deux fois le centre).`,
      correction: `
        ${M(T`|${A} \cup ${B} \cup ${C}| = ${cA} + ${cB} + ${cC} - ${cAB} - ${cAC} - ${cBC} + ${abc} = ${union}`)}
        <p>Aucun : ${m(T`\frac{${N} - ${union}}{${N}} = ${vf(new Fr(aucun, N))}`)}.</p>
        <p>Seulement ${A} : ${m(T`${cA} - ${cAB} - ${cAC} + ${abc} = ${oa}`)} ;
           seulement ${B} : ${m(T`${ob}`)} ; seulement ${C} : ${m(T`${oc}`)}.</p>
        <p>Exactement un : ${m(T`\frac{${un}}{${N}} = ${vf(new Fr(un, N))}`)}.</p>
        <p>Au moins deux = dans la réunion mais pas « exactement un » :
           ${m(T`\frac{${union} - ${un}}{${N}} = ${vf(new Fr(union - un, N))}`)}.</p>`,
    };
  });

  ajout(1, "effectifs", "Effectifs → probabilités", () => {
    const N = pick([500, 800, 1000, 1200, 2000]);
    const nL = Math.round(N * rnd(25, 60) / 100);
    const nG = Math.round(N * rnd(8, 20) / 100);
    const nLG = Math.random() < 0.15 ? 0 : rnd(1, Math.floor(Math.min(nL, nG) * 0.7));
    const union = nL + nG - nLG;
    return {
      titre: "Effectifs et probabilités",
      enonce: `Dans une population de ${N} personnes, ${nL} portent des lunettes (${m("L")}),
        ${nG} sont gauchères (${m("G")}) et ${nLG} sont gauchères et portent des lunettes.
        On choisit une personne au hasard.`,
      questions: [
        { label: m(T`P(L \cup G)`), reponse: union / N },
        { label: m(T`P(\overline{L} \cap \overline{G})`), reponse: 1 - union / N },
        { label: m(T`P(G \cap \overline{L})`), reponse: (nG - nLG) / N },
        { label: `${m("L")} et ${m("G")} sont-ils incompatibles ?`, type: "choix", options: ["Oui", "Non"], reponse: nLG === 0 ? "Oui" : "Non" },
      ],
      indice: `Les effectifs ne sont pas des probabilités : divise par ${N}. Un tableau
        ${m(T`L / \overline{L}`)} × ${m(T`G / \overline{G}`)} avec les totaux aide beaucoup.`,
      correction: `
        <table><thead><tr><th></th><th>${m("G")}</th><th>${m(T`\overline{G}`)}</th><th>Total</th></tr></thead><tbody>
        <tr><td>${m("L")}</td><td>${nLG}</td><td>${nL - nLG}</td><td>${nL}</td></tr>
        <tr><td>${m(T`\overline{L}`)}</td><td>${nG - nLG}</td><td>${N - nL - nG + nLG}</td><td>${N - nL}</td></tr>
        <tr><td>Total</td><td>${nG}</td><td>${N - nG}</td><td>${N}</td></tr></tbody></table>
        ${M(T`P(L \cup G) = \frac{${nL} + ${nG} - ${nLG}}{${N}} = ${vf(new Fr(union, N))}`)}
        ${M(T`P(\overline{L} \cap \overline{G}) = 1 - P(L \cup G) = ${vf(new Fr(N - union, N))}`)}
        ${M(T`P(G \cap \overline{L}) = \frac{${nG} - ${nLG}}{${N}} = ${vf(new Fr(nG - nLG, N))}`)}
        <p>${nLG === 0 ? "Aucune personne n'est dans les deux : <strong>incompatibles</strong>."
          : `${m(T`L \cap G`)} contient ${nLG} personnes, donc il n'est pas vide : <strong>compatibles</strong>.`}</p>`,
    };
  });

  ajout(1, "des", "Deux dés (dénombrement)", () => {
    const issues = [];
    for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) issues.push([i, j]);
    const s1 = rnd(3, 11), s2 = rnd(8, 11), k = rnd(2, 5);
    const pool = [
      { label: `la somme vaut ${s1}`, t: ([i, j]) => i + j === s1, expl: `couples ${issues.filter(([i, j]) => i + j === s1).map(([i, j]) => `(${i},${j})`).join(", ")}` },
      { label: `la somme est au moins ${s2}`, t: ([i, j]) => i + j >= s2, expl: `on compte les couples de somme ${s2} à 12` },
      { label: "au moins un des dés donne 6", t: ([i, j]) => i === 6 || j === 6, expl: T`complémentaire : $1 - \frac{25}{36}$, aucun 6 donne $5 \times 5$ couples` },
      { label: "les deux dés donnent le même résultat", t: ([i, j]) => i === j, expl: "les 6 doubles" },
      { label: `le plus grand des deux résultats est au plus ${k}`, t: ([i, j]) => Math.max(i, j) <= k, expl: `les deux dés sont ${T`$\le$`} ${k} : ${k} × ${k} couples` },
      { label: "le produit des deux résultats est pair", t: ([i, j]) => (i * j) % 2 === 0, expl: T`complémentaire : produit impair $\iff$ les deux impairs, $3 \times 3 = 9$ couples` },
    ];
    const choix = melange(pool).slice(0, 3);
    const nbs = choix.map((c) => issues.filter(c.t).length);
    const expl = (e) => e.replace(/\$([^$]+)\$/g, (_, t) => m(t));
    return {
      titre: "Deux dés équilibrés",
      enonce: `On lance deux dés équilibrés à six faces. L'univers est ${m(T`\Omega = \{1, \dots, 6\}^2`)}, muni de la probabilité uniforme.`,
      questions: choix.map((c, i) => ({ label: `Probabilité que ${c.label}`, reponse: nbs[i] / 36 })),
      indice: `${m(T`\operatorname{card}(\Omega) = 36`)} : les couples sont <strong>ordonnés</strong> ((1,2) et (2,1) sont différents).
        Cas favorables sur cas possibles, ou complémentaire pour « au moins ».`,
      correction: choix.map((c, i) => `<p>${c.label} : ${nbs[i]} cas favorables (${expl(c.expl)}),
        donc ${m(T`P = \frac{${nbs[i]}}{36} = ${vf(new Fr(nbs[i], 36))}`)}.</p>`).join(""),
    };
  });

  ajout(1, "aumoins", "« Au moins un » sur n essais", () => {
    const ctx = pick([
      { s: "un archer touche la cible", e: "tir" },
      { s: "une ampoule est défectueuse", e: "ampoule contrôlée" },
      { s: "un appel aboutit", e: "appel" },
      { s: "un ticket est gagnant", e: "ticket acheté" },
    ]);
    const p = pick([5, 10, 15, 20, 25, 30]) / 100;
    const n = rnd(3, 10);
    const seuil = pick([0.9, 0.95, 0.99]);
    let nmin = 1;
    while (1 - (1 - p) ** nmin < seuil) nmin++;
    return {
      titre: "Au moins un succès",
      enonce: `La probabilité qu'${ctx.s} vaut ${m(nb(p))}, indépendamment d'un ${ctx.e} à l'autre. On fait ${n} essais.`,
      questions: [
        { label: "Probabilité qu'aucun essai ne réussisse", reponse: (1 - p) ** n },
        { label: "Probabilité qu'au moins un essai réussisse", reponse: 1 - (1 - p) ** n },
        { label: `Nombre minimal d'essais pour que P(au moins un succès) ${"≥"} ${txt(seuil)}`, reponse: nmin, entier: true },
      ],
      indice: `« Au moins un » : passe par le complémentaire « aucun », qui est une intersection d'évènements indépendants.`,
      correction: `
        ${M(T`P(\text{aucun}) = (1 - ${nb(p)})^{${n}} = ${nb(1 - p)}^{${n}} \approx ${nb((1 - p) ** n)}`)}
        ${M(T`P(\text{au moins un}) = 1 - ${nb(1 - p)}^{${n}} \approx ${nb(1 - (1 - p) ** n)}`)}
        <p>On cherche le plus petit ${m("n")} tel que ${m(T`1 - ${nb(1 - p)}^n \ge ${nb(seuil)}`)}, soit
        ${m(T`n \ge \frac{\ln(${nb(1 - seuil)})}{\ln(${nb(1 - p)})} \approx ${nb(Math.log(1 - seuil) / Math.log(1 - p), 2)}`)}
        (on divise par un logarithme <strong>négatif</strong> : l'inégalité change de sens). Donc ${m(T`n = ${nmin}`)}.</p>`,
    };
  });

  // ------------------------------------------------------------------
  // Générateurs — chapitre 2
  // ------------------------------------------------------------------
  ajout(2, "diagnostic", "Bayes : test de dépistage", () => {
    const prev = pick([0.5, 1, 2, 5, 10]) / 100;
    const se = pick([90, 95, 98, 99]) / 100;
    const fp = pick([1, 2, 5, 10]) / 100;
    const pPos = se * prev + fp * (1 - prev);
    const pMpos = (se * prev) / pPos;
    const pMneg = ((1 - se) * prev) / (1 - pPos);
    return {
      titre: "Un test de dépistage",
      enonce: `Une maladie touche ${txt(prev * 100)} % de la population. Un test est positif chez
        ${txt(se * 100)} % des malades, et donne ${txt(fp * 100)} % de faux positifs chez les non-malades.
        On note ${m("M")} « être malade » et ${m("+")} « test positif ».`,
      questions: [
        { label: m(T`P(+)`), reponse: pPos },
        { label: m(T`P(M \mid +)`), reponse: pMpos },
        { label: m(T`P(M \mid -)`), reponse: pMneg },
      ],
      indice: `Arbre : 1er niveau ${m(T`M / \overline{M}`)}, 2e niveau ${m("+ / -")}. Le dénominateur de Bayes,
        c'est ${m(T`P(+)`)} par la formule des probabilités totales.`,
      correction: `
        <p>Données : ${m(T`P(M) = ${nb(prev)}`)}, ${m(T`P(+ \mid M) = ${nb(se)}`)}, ${m(T`P(+ \mid \overline{M}) = ${nb(fp)}`)}.</p>
        ${M(T`P(+) = P(+ \mid M)P(M) + P(+ \mid \overline{M})P(\overline{M}) = ${nb(se)} \times ${nb(prev)} + ${nb(fp)} \times ${nb(1 - prev)} = ${nb(pPos, 5)}`)}
        ${M(T`P(M \mid +) = \frac{P(+ \mid M)P(M)}{P(+)} = \frac{${nb(se * prev, 5)}}{${nb(pPos, 5)}} \approx ${nb(pMpos)}`)}
        ${M(T`P(M \mid -) = \frac{P(- \mid M)P(M)}{P(-)} = \frac{${nb(1 - se)} \times ${nb(prev)}}{1 - ${nb(pPos, 5)}} \approx ${nb(pMneg, 5)}`)}
        <p>${pMpos < 0.5 ? "Moins d'une chance sur deux d'être malade avec un test positif : la maladie est rare, les faux positifs dominent."
          : "Ici la maladie est assez fréquente pour qu'un test positif soit convaincant."}</p>`,
    };
  });

  ajout(2, "machines", "Probabilités totales : trois machines", () => {
    let p1, p2, p3;
    do { p1 = rnd(3, 12) * 5; p2 = rnd(3, 12) * 5; p3 = 100 - p1 - p2; } while (p3 < 15);
    const pr = [p1, p2, p3].map((x) => new Fr(x, 100));
    const def = [rnd(1, 8), rnd(1, 8), rnd(1, 8)].map((x) => new Fr(x, 100));
    const j = rnd(0, 2);
    const PD = somme(pr.map((p, i) => p.mul(def[i])));
    const inter = pr[j].mul(def[j]);
    return {
      titre: "Trois machines",
      enonce: `Une usine produit ${m("M_1")}, ${m("M_2")}, ${m("M_3")} : respectivement ${p1} %, ${p2} % et ${p3} %
        des pièces. Les taux de pièces défectueuses (${m("D")}) sont ${def.map((x) => `${x.n * (100 / x.d)} %`).join(", ")}.
        On prend une pièce au hasard.`,
      questions: [
        { label: m(T`P(D)`), reponse: PD.val() },
        { label: m(T`P(D \cap M_${j + 1})`), reponse: inter.val() },
        { label: m(T`P(M_${j + 1} \mid D)`), reponse: inter.div(PD).val() },
      ],
      indice: `${m(T`\{M_1, M_2, M_3\}`)} est un système complet d'évènements. Les taux de défaut sont des
        probabilités <strong>conditionnelles</strong> ${m(T`P(D \mid M_i)`)}.`,
      correction: `
        ${M(T`P(D) = \sum_i P(D \mid M_i)P(M_i) = ${pr.map((p, i) => `${d(def[i])} \\times ${d(p)}`).join(" + ")} = ${d(PD)}`)}
        ${M(T`P(D \cap M_${j + 1}) = P(D \mid M_${j + 1})P(M_${j + 1}) = ${d(def[j])} \times ${d(pr[j])} = ${d(inter)}`)}
        ${M(T`P(M_${j + 1} \mid D) = \frac{P(D \cap M_${j + 1})}{P(D)} = \frac{${d(inter)}}{${d(PD)}} = ${vf(inter.div(PD))}`)}`,
    };
  });

  ajout(2, "contingence", "Tableau de contingence et indépendance", () => {
    const ctx = pick([
      { A: "V", An: "a validé le CE", B: "R", Bn: "a fait les exercices de révision", qui: "étudiants" },
      { A: "D", An: "est défectueuse", B: "N", Bn: "a été produite de nuit", qui: "pièces" },
      { A: "C", An: "boit du café", B: "S", Bn: "fait du sport", qui: "salariés" },
    ]);
    let a, b, c, e;
    const indep = Math.random() < 0.4;
    if (indep) {
      const u = rnd(1, 5), v = rnd(1, 5), s = rnd(2, 8), t = rnd(2, 8), k = rnd(2, 4);
      [a, b, c, e] = [u * s * k, u * t * k, v * s * k, v * t * k];
    } else {
      do { [a, b, c, e] = [rnd(5, 45), rnd(5, 45), rnd(5, 45), rnd(5, 45)]; } while (a * e === b * c);
    }
    const N = a + b + c + e;
    const { A, B } = ctx;
    const pAB = new Fr(a, a + c), pBA = new Fr(a, a + b);
    const PAB = new Fr(a, N), PAPB = new Fr(a + b, N).mul(new Fr(a + c, N));
    return {
      titre: "Tableau de contingence",
      enonce: `Sur ${N} ${ctx.qui}, on note ${m(A)} « ${ctx.An} » et ${m(B)} « ${ctx.Bn} ». Effectifs :
        <table><thead><tr><th></th><th>${m(B)}</th><th>${m(T`\overline{${B}}`)}</th></tr></thead><tbody>
        <tr><td>${m(A)}</td><td>${a}</td><td>${b}</td></tr>
        <tr><td>${m(T`\overline{${A}}`)}</td><td>${c}</td><td>${e}</td></tr></tbody></table>`,
      questions: [
        { label: m(T`P(${A} \mid ${B})`), reponse: pAB.val() },
        { label: m(T`P(${B} \mid ${A})`), reponse: pBA.val() },
        { label: `${m(A)} et ${m(B)} sont-ils indépendants ?`, type: "choix", options: ["Oui", "Non"], reponse: indep ? "Oui" : "Non" },
      ],
      indice: `Ajoute la ligne et la colonne des totaux. ${m(T`P(${A} \mid ${B})`)} : on se restreint à la
        <strong>colonne</strong> ${m(B)}. Pour l'indépendance, compare ${m(T`P(${A} \cap ${B})`)} et ${m(T`P(${A})P(${B})`)}.`,
      correction: `
        <p>Totaux : ${m(T`|${A}| = ${a + b}`)}, ${m(T`|${B}| = ${a + c}`)}, ${m(T`N = ${N}`)}.</p>
        ${M(T`P(${A} \mid ${B}) = \frac{|${A} \cap ${B}|}{|${B}|} = \frac{${a}}{${a + c}} = ${vf(pAB)}`)}
        ${M(T`P(${B} \mid ${A}) = \frac{${a}}{${a + b}} = ${vf(pBA)}`)}
        ${M(T`P(${A} \cap ${B}) = ${vf(PAB)} \qquad P(${A})P(${B}) = \frac{${a + b}}{${N}} \times \frac{${a + c}}{${N}} = ${vf(PAPB)}`)}
        <p>${indep ? "Égalité : <strong>indépendants</strong> (les lignes du tableau sont proportionnelles)."
          : "Différents : <strong>pas indépendants</strong>."}</p>`,
    };
  });

  ajout(2, "urne", "Tirages sans remise (arbre)", () => {
    const b = rnd(2, 6), n = rnd(2, 6), N = b + n;
    const p11 = new Fr(b * (b - 1), N * (N - 1));
    const p2 = new Fr(b, N);
    const p1s2 = new Fr(b - 1, N - 1);
    return {
      titre: "Urne, tirages sans remise",
      enonce: `Une urne contient ${b} boules blanches et ${n} boules noires. On tire successivement
        <strong>sans remise</strong> deux boules. ${m("B_i")} : « la ${m("i")}-ème boule est blanche ».`,
      questions: [
        { label: m(T`P(B_1 \cap B_2)`), reponse: p11.val() },
        { label: m(T`P(B_2)`), reponse: p2.val() },
        { label: m(T`P(B_1 \mid B_2)`), reponse: p1s2.val() },
      ],
      indice: `Arbre à deux niveaux. Pour ${m(T`P(B_2)`)} : probabilités totales avec ${m(T`\{B_1, \overline{B_1}\}`)}.
        La dernière est un « retournement » : Bayes.`,
      correction: `
        ${M(T`P(B_1 \cap B_2) = P(B_1)P(B_2 \mid B_1) = \frac{${b}}{${N}} \times \frac{${b - 1}}{${N - 1}} = ${vf(p11)}`)}
        ${M(T`P(B_2) = \frac{${b}}{${N}} \times \frac{${b - 1}}{${N - 1}} + \frac{${n}}{${N}} \times \frac{${b}}{${N - 1}} = ${vf(p2)}`)}
        <p>Résultat remarquable : ${m(T`P(B_2) = P(B_1)`)}, l'ordre ne compte pas sans information.</p>
        ${M(T`P(B_1 \mid B_2) = \frac{P(B_1 \cap B_2)}{P(B_2)} = \frac{${p11.tex()}}{${p2.tex()}} = ${vf(p1s2)}`)}`,
    };
  });

  ajout(2, "independance", "Indépendance de deux évènements", () => {
    let a, b, PAB;
    const indep = Math.random() < 0.5;
    for (;;) {
      a = rnd(2, 8); b = rnd(2, 8);
      PAB = new Fr(a * b, 100);
      if (!indep) PAB = PAB.add(new Fr(pick([-10, -5, 5, 10]), 100));
      const PU = new Fr(a, 10).add(new Fr(b, 10)).sub(PAB);
      if (PAB.val() > 0 && PAB.val() < Math.min(a, b) / 10 && PU.val() <= 1) break;
    }
    const PA = new Fr(a, 10), PB = new Fr(b, 10), PU = PA.add(PB).sub(PAB);
    return {
      titre: "Indépendants ?",
      enonce: `${m(T`P(A) = ${d(PA)}`)}, ${m(T`P(B) = ${d(PB)}`)} et ${m(T`P(A \cup B) = ${d(PU)}`)}.`,
      questions: [
        { label: m(T`P(A \cap B)`), reponse: PAB.val() },
        { label: m(T`P(A \mid B)`), reponse: PAB.div(PB).val() },
        { label: `${m("A")} et ${m("B")} sont-ils indépendants ?`, type: "choix", options: ["Oui", "Non"], reponse: indep ? "Oui" : "Non" },
      ],
      indice: `Formule de la réunion pour ${m(T`P(A \cap B)`)}, puis compare avec ${m(T`P(A)P(B)`)}
        (ou ${m(T`P(A \mid B)`)} avec ${m(T`P(A)`)}).`,
      correction: `
        ${M(T`P(A \cap B) = ${d(PA)} + ${d(PB)} - ${d(PU)} = ${d(PAB)}`)}
        ${M(T`P(A \mid B) = \frac{${d(PAB)}}{${d(PB)}} = ${vf(PAB.div(PB))}`)}
        <p>${m(T`P(A)P(B) = ${d(PA.mul(PB))} ${indep ? "=" : "\\neq"} P(A \cap B)`)} :
          ${indep ? `<strong>indépendants</strong> (et en effet ${m(T`P(A \mid B) = P(A)`)}).`
            : "<strong>pas indépendants</strong>."}</p>`,
    };
  });

  // ------------------------------------------------------------------
  // Générateurs — chapitre 3
  // ------------------------------------------------------------------
  function partition(total, k) {
    // k entiers >= 1 de somme total
    const coupes = melange([...Array(total - 1).keys()].map((i) => i + 1)).slice(0, k - 1).sort((x, y) => x - y);
    const res = [];
    let prec = 0;
    for (const c of coupes) { res.push(c - prec); prec = c; }
    res.push(total - prec);
    return res;
  }
  const loiTable = (xs, ps, nomX = "x", nomP = "P(X = x)") =>
    `<table><tbody><tr><th>${m(nomX)}</th>${xs.map((x) => `<td>${m(x)}</td>`).join("")}</tr>
     <tr><th>${m(nomP)}</th>${ps.map((p) => `<td>${p}</td>`).join("")}</tr></tbody></table>`;

  ajout(3, "loi", "Loi, espérance, variance", () => {
    const k = rnd(4, 5);
    const xs = melange([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6]).slice(0, k).sort((x, y) => x - y);
    const ps = partition(20, k).map((v) => new Fr(v, 20));
    const cache = rnd(0, k - 1);
    const E = somme(xs.map((x, i) => ps[i].mul(x)));
    const E2 = somme(xs.map((x, i) => ps[i].mul(x * x)));
    const V = E2.sub(E.mul(E));
    return {
      titre: "Loi d'une variable discrète",
      enonce: `Une variable aléatoire ${m("X")} a la loi suivante (une case est inconnue) :
        ${loiTable(xs, ps.map((p, i) => (i === cache ? m("p") : m(d(p)))))}`,
      questions: [
        { label: `Valeur de ${m("p")}`, reponse: ps[cache].val() },
        { label: m(T`E(X)`), reponse: E.val() },
        { label: m(T`V(X)`), reponse: V.val() },
      ],
      indice: `La somme des probabilités vaut 1. Ensuite ${m(T`E(X) = \sum x\,P(X = x)`)} et
        ${m(T`V(X) = E(X^2) - E(X)^2`)} avec ${m(T`E(X^2) = \sum x^2 P(X = x)`)} (transfert).`,
      correction: `
        ${M(T`p = 1 - (${ps.filter((_, i) => i !== cache).map(d).join(" + ")}) = ${d(ps[cache])}`)}
        ${M(T`E(X) = ${xs.map((x, i) => `${x < 0 ? `(${x})` : x} \\times ${d(ps[i])}`).join(" + ")} = ${vf(E)}`)}
        ${M(T`E(X^2) = ${xs.map((x, i) => `${x * x} \\times ${d(ps[i])}`).join(" + ")} = ${vf(E2)}`)}
        ${M(T`V(X) = E(X^2) - E(X)^2 = ${nb(E2.val())} - ${nb(E.val())}^2 = ${vf(V)}`)}`,
    };
  });

  ajout(3, "repartition", "Fonction de répartition", () => {
    const n = rnd(4, 5);
    const xs = [...Array(n + 1).keys()];
    const ps = partition(20, n + 1).map((v) => new Fr(v, 20));
    const F = [];
    ps.reduce((s, p, i) => (F[i] = s.add(p)), new Fr(0));
    const k = rnd(1, n), j = rnd(1, n - 1);
    const E = somme(xs.map((x, i) => ps[i].mul(x)));
    return {
      titre: "Lire une fonction de répartition",
      enonce: `On donne la fonction de répartition ${m(T`F(x) = P(X \le x)`)} d'une variable ${m("X")} à valeurs dans ${m(T`\{0, \dots, ${n}\}`)} :
        ${loiTable(xs, F.map((f) => m(d(f))), "x", T`P(X \le x)`)}`,
      questions: [
        { label: m(T`P(X = ${k})`), reponse: ps[k].val() },
        { label: m(T`P(X > ${j})`), reponse: UN.sub(F[j]).val() },
        { label: m(T`E(X)`), reponse: E.val() },
      ],
      indice: `${m(T`P(X = k) = F(k) - F(k - 1)`)} : la hauteur de la marche. Et ${m(T`P(X > j) = 1 - F(j)`)}.`,
      correction: `
        ${M(T`P(X = ${k}) = F(${k}) - F(${k - 1}) = ${d(F[k])} - ${d(F[k - 1])} = ${d(ps[k])}`)}
        ${M(T`P(X > ${j}) = 1 - F(${j}) = 1 - ${d(F[j])} = ${d(UN.sub(F[j]))}`)}
        <p>Loi complète :</p>${loiTable(xs, ps.map((p) => m(d(p))))}
        ${M(T`E(X) = ${xs.map((x, i) => `${x} \\times ${d(ps[i])}`).join(" + ")} = ${vf(E)}`)}`,
    };
  });

  ajout(3, "conjointe", "Loi conjointe, covariance", () => {
    const xs = melange([-1, 0, 1, 2, 3]).slice(0, 3).sort((x, y) => x - y);
    const ys = pick([[0, 1], [1, 2]]);
    const indep = Math.random() < 0.4;
    let cel; // cel[i][j] : P(Y = ys[i], X = xs[j])
    if (indep) {
      const px = partition(10, 3).map((v) => new Fr(v, 10));
      const q = new Fr(pick([1, 2, 3, 4]), 5);
      const py = [q, UN.sub(q)];
      cel = py.map((qy) => px.map((p) => p.mul(qy)));
    } else {
      for (;;) {
        cel = [partition(20, 6)].map((l) => [l.slice(0, 3), l.slice(3)])[0].map((l) => l.map((v) => new Fr(v, 20)));
        const px = xs.map((_, j) => cel[0][j].add(cel[1][j]));
        const py = cel.map((l) => somme(l));
        if (!cel.every((l, i) => l.every((c, j) => c.eq(px[j].mul(py[i]))))) break;
      }
    }
    const px = xs.map((_, j) => cel[0][j].add(cel[1][j]));
    const py = cel.map((l) => somme(l));
    const EX = somme(xs.map((x, j) => px[j].mul(x)));
    const EY = somme(ys.map((y, i) => py[i].mul(y)));
    const EXY = somme(cel.flatMap((l, i) => l.map((c, j) => c.mul(xs[j] * ys[i]))));
    const cov = EXY.sub(EX.mul(EY));
    const j0 = rnd(0, 2);
    let preuve;
    if (indep) {
      preuve = "Chaque case est le produit de ses marges (lignes proportionnelles) : <strong>indépendantes</strong>.";
    } else {
      let bad = null;
      cel.forEach((l, i) => l.forEach((c, j) => { if (!bad && !c.eq(px[j].mul(py[i]))) bad = [i, j]; }));
      const [i, j] = bad;
      preuve = `${m(T`P(X = ${xs[j]}, Y = ${ys[i]}) = ${d(cel[i][j])}`)} mais
        ${m(T`P(X = ${xs[j]})P(Y = ${ys[i]}) = ${d(px[j])} \times ${d(py[i])} = ${d(px[j].mul(py[i]))}`)} :
        <strong>pas indépendantes</strong>${cov.n === 0 ? " (alors que la covariance est nulle !)" : ""}.`;
    }
    return {
      titre: "Couple de variables discrètes",
      enonce: `Loi conjointe du couple ${m("(X, Y)")} :
        <table><thead><tr><th></th>${xs.map((x) => `<th>${m(T`X = ${x}`)}</th>`).join("")}</tr></thead><tbody>
        ${cel.map((l, i) => `<tr><th>${m(T`Y = ${ys[i]}`)}</th>${l.map((c) => `<td>${m(d(c))}</td>`).join("")}</tr>`).join("")}
        </tbody></table>`,
      questions: [
        { label: m(T`P(X = ${xs[j0]})`), reponse: px[j0].val() },
        { label: m(T`E(XY)`), reponse: EXY.val() },
        { label: m(T`\mathrm{Cov}(X, Y)`), reponse: cov.val() },
        { label: `${m("X")} et ${m("Y")} sont-elles indépendantes ?`, type: "choix", options: ["Oui", "Non"], reponse: indep ? "Oui" : "Non" },
      ],
      indice: `Marges = sommes des colonnes (pour ${m("X")}) et des lignes (pour ${m("Y")}).
        ${m(T`E(XY) = \sum x\,y\,P(X = x, Y = y)`)} sur toutes les cases. Attention : ${m(T`\mathrm{Cov} = 0`)} ne prouve pas l'indépendance.`,
      correction: `
        <p>Loi de ${m("X")} : ${xs.map((x, j) => m(T`P(X = ${x}) = ${d(px[j])}`)).join(", ")}.
           Loi de ${m("Y")} : ${ys.map((y, i) => m(T`P(Y = ${y}) = ${d(py[i])}`)).join(", ")}.</p>
        ${M(T`E(X) = ${vf(EX)} \qquad E(Y) = ${vf(EY)}`)}
        ${M(T`E(XY) = ${cel.flatMap((l, i) => l.map((c, j) => [xs[j] * ys[i], c])).filter(([v]) => v !== 0).map(([v, c]) => `${v < 0 ? `(${v})` : v} \\times ${d(c)}`).join(" + ") || "0"} = ${vf(EXY)}`)}
        ${M(T`\mathrm{Cov}(X, Y) = E(XY) - E(X)E(Y) = ${nb(EXY.val())} - ${nb(EX.val())} \times ${nb(EY.val())} = ${vf(cov)}`)}
        <p>${preuve}</p>`,
    };
  });

  ajout(3, "binomiale", "Loi binomiale", () => {
    const ctx = pick([
      { s: "Un étudiant répond au hasard à un QCM de {n} questions à {c} choix (une seule bonne réponse)", x: "le nombre de bonnes réponses", p: null },
      { s: "Un technicien contrôle {n} pièces, chacune défectueuse avec probabilité {p}", x: "le nombre de pièces défectueuses", p: [0.05, 0.1, 0.2] },
      { s: "Une archère tire {n} flèches et touche la cible avec probabilité {p} à chaque tir", x: "le nombre de tirs réussis", p: [0.2, 0.3, 0.4, 0.6, 0.7] },
    ]);
    const n = rnd(5, 12);
    let p, c = 0;
    if (ctx.p) p = pick(ctx.p);
    else { c = pick([2, 4, 5]); p = 1 / c; }
    const k = rnd(1, Math.min(4, n));
    const pk = binom(n, k) * p ** k * (1 - p) ** (n - k);
    const phrase = ctx.s.replace("{n}", n).replace("{c}", c).replace("{p}", txt(p));
    return {
      titre: "Loi binomiale",
      enonce: `${phrase}. Les essais sont indépendants. On note ${m("X")} ${ctx.x}.`,
      questions: [
        { label: m(T`P(X = ${k})`), reponse: pk },
        { label: m(T`P(X \ge 1)`), reponse: 1 - (1 - p) ** n },
        { label: m(T`E(X)`), reponse: n * p },
        { label: m(T`V(X)`), reponse: n * p * (1 - p) },
      ],
      indice: `On compte des succès sur un nombre <strong>fixé</strong> d'essais indépendants :
        ${m(T`X \sim \mathcal{B}(n, p)`)}. Identifie ${m("n")} et ${m("p")}.`,
      correction: `
        <p>${m(T`X \sim \mathcal{B}(${n}, ${c ? `\\frac{1}{${c}}` : nb(p)})`)}.</p>
        ${M(T`P(X = ${k}) = \binom{${n}}{${k}} ${nb(p, 4)}^{${k}} \times ${nb(1 - p, 4)}^{${n - k}} = ${binom(n, k)} \times ${nb(p ** k, 6)} \times ${nb((1 - p) ** (n - k), 6)} \approx ${nb(pk)}`)}
        ${M(T`P(X \ge 1) = 1 - P(X = 0) = 1 - ${nb(1 - p, 4)}^{${n}} \approx ${nb(1 - (1 - p) ** n)}`)}
        ${M(T`E(X) = np = ${nb(n * p)} \qquad V(X) = np(1 - p) = ${nb(n * p * (1 - p))}`)}`,
    };
  });

  ajout(3, "poisson", "Loi de Poisson", () => {
    const deux = Math.random() < 0.4;
    const l1 = pick([0.5, 1, 1.5, 2, 2.5, 3, 4]);
    const l2 = pick([0.5, 1, 1.5, 2]);
    const lam = deux ? l1 + l2 : l1;
    const P = (k) => Math.exp(-lam) * lam ** k / fact(k);
    const ctx = pick([
      ["pannes d'un serveur par mois", "pannes matérielles", "pannes logicielles"],
      ["accidents à un carrefour par an", "accidents de voiture", "accidents de vélo"],
      ["coquilles par page", "coquilles de frappe", "fautes d'orthographe"],
    ]);
    const enonce = deux
      ? `On modélise les ${ctx[1]} par ${m(T`X \sim \mathcal{P}(${nb(l1)})`)} et les ${ctx[2]} par
         ${m(T`Y \sim \mathcal{P}(${nb(l2)})`)}, indépendantes (${ctx[0]}). On pose ${m("Z = X + Y")}.`
      : `Le nombre ${m("Z")} de ${ctx[0]} suit une loi de Poisson ${m(T`\mathcal{P}(${nb(l1)})`)}.`;
    return {
      titre: "Loi de Poisson",
      enonce,
      questions: [
        { label: m(T`E(Z)`), reponse: lam },
        { label: m(T`P(Z = 0)`), reponse: P(0) },
        { label: m(T`P(Z \le 2)`), reponse: P(0) + P(1) + P(2) },
        { label: m(T`P(Z \ge 2)`), reponse: 1 - P(0) - P(1) },
      ],
      indice: `${m(T`P(Z = k) = e^{-\lambda}\frac{\lambda^k}{k!}`)} et ${m(T`E(Z) = \lambda`)}.
        ${deux ? `Une somme de Poisson <strong>indépendantes</strong> est une Poisson : les paramètres s'ajoutent.` : ""}
        « Au moins 2 » : complémentaire.`,
      correction: `
        ${deux ? `<p>${m(T`Z = X + Y \sim \mathcal{P}(${nb(l1)} + ${nb(l2)}) = \mathcal{P}(${nb(lam)})`)}.</p>` : ""}
        ${M(T`E(Z) = \lambda = ${nb(lam)} \qquad P(Z = 0) = e^{-${nb(lam)}} \approx ${nb(P(0))}`)}
        ${M(T`P(Z \le 2) = e^{-${nb(lam)}}\left(1 + ${nb(lam)} + \frac{${nb(lam)}^2}{2}\right) \approx ${nb(P(0) + P(1) + P(2))}`)}
        ${M(T`P(Z \ge 2) = 1 - P(Z = 0) - P(Z = 1) = 1 - e^{-${nb(lam)}}(1 + ${nb(lam)}) \approx ${nb(1 - P(0) - P(1))}`)}`,
    };
  });

  ajout(3, "geometrique", "Loi géométrique / binomiale négative", () => {
    const p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5]);
    const r = pick([1, 1, 2, 3]);
    const j = r + rnd(1, 4);
    const pj = binom(j - 1, r - 1) * p ** r * (1 - p) ** (j - r);
    const ctx = pick([
      { qui: "Un joueur lance des fléchettes", succ: "toucher le centre" },
      { qui: "On lance un dé truqué", succ: "obtenir un 6" },
      { qui: "Un commercial appelle des prospects", succ: "décrocher un rendez-vous" },
    ]);
    const qs = [
      { label: m(T`P(X = ${j})`), reponse: pj },
      { label: m(T`E(X)`), reponse: r / p },
    ];
    if (r === 1) qs.splice(1, 0, { label: m(T`P(X > ${j - 1})`), reponse: (1 - p) ** (j - 1) });
    return {
      titre: r === 1 ? "Loi géométrique" : "Loi binomiale négative",
      enonce: `${ctx.qui} jusqu'à ${ctx.succ} ${r === 1 ? "pour la première fois" : `${r} fois`}.
        Chaque essai réussit avec probabilité ${m(nb(p))}, indépendamment des autres.
        ${m("X")} = nombre d'essais nécessaires${r > 1 ? ` pour obtenir ${r} succès` : ""}.`,
      questions: qs,
      indice: `Ici on fixe le nombre de succès et on compte les <strong>essais</strong> : ${m(T`X \sim \mathcal{BN}(${r}, ${nb(p)})`)}.
        ${r === 1 ? `${m(T`X > k`)} signifie : les ${m("k")} premiers essais échouent.` : `Le ${r}-ème succès arrive exactement au ${m("j")}-ème essai.`}`,
      correction: `
        <p>${m(T`X \sim \mathcal{BN}(${r}, ${nb(p)})`)}${r === 1 ? " (loi géométrique)" : ""}.</p>
        ${M(T`P(X = ${j}) = \binom{${j - 1}}{${r - 1}} ${nb(p)}^{${r}} \times ${nb(1 - p)}^{${j - r}} \approx ${nb(pj)}`)}
        ${r === 1 ? M(T`P(X > ${j - 1}) = ${nb(1 - p)}^{${j - 1}} \approx ${nb((1 - p) ** (j - 1))}`) : ""}
        ${M(T`E(X) = \frac{r}{p} = \frac{${r}}{${nb(p)}} = ${nb(r / p)}`)}`,
    };
  });

  ajout(3, "regles", "Règles de calcul sur E, V, Cov", () => {
    const EX = rnd(-3, 6), EY = rnd(-3, 6);
    const VX = rnd(1, 9), VY = rnd(1, 9);
    const cmax = Math.floor(Math.sqrt(VX * VY));
    const cov = rnd(-cmax, cmax);
    const a = pick([-3, -2, 2, 3, 4]), b = pick([-5, -2, 2, 3, 7]);
    const s = pick([1, -1]);
    const fmt = (x) => (x < 0 ? `(${x})` : String(x));
    const sg = (x) => (x < 0 ? "-" : "+");
    const lin = `${a}X ${sg(b)} ${Math.abs(b)}Y`;
    const aff = `${a}X ${sg(b)} ${Math.abs(b)}`;
    return {
      titre: "Règles de calcul",
      enonce: `${m(T`E(X) = ${EX}`)}, ${m(T`V(X) = ${VX}`)}, ${m(T`E(Y) = ${EY}`)}, ${m(T`V(Y) = ${VY}`)} et ${m(T`\mathrm{Cov}(X, Y) = ${cov}`)}.`,
      questions: [
        { label: m(T`E(${lin})`), reponse: a * EX + b * EY },
        { label: m(T`V(${aff})`), reponse: a * a * VX },
        { label: m(T`V(X ${sg(s)} Y)`), reponse: VX + VY + 2 * s * cov },
        { label: m(T`E(XY)`), reponse: cov + EX * EY },
      ],
      indice: `Linéarité de ${m("E")} ; ${m(T`V(aX + b) = a^2V(X)`)} ; ${m(T`V(X \pm Y) = V(X) + V(Y) \pm 2\mathrm{Cov}(X, Y)`)} ;
        ${m(T`\mathrm{Cov}(X, Y) = E(XY) - E(X)E(Y)`)}.`,
      correction: `
        ${M(T`E(${lin}) = ${a} \times ${fmt(EX)} ${sg(b)} ${Math.abs(b)} \times ${fmt(EY)} = ${a * EX + b * EY}`)}
        ${M(T`V(${aff}) = ${fmt(a)}^2 \times ${VX} = ${a * a * VX}`)}
        <p>La constante ajoutée ne change pas la dispersion.</p>
        ${M(T`V(X ${sg(s)} Y) = ${VX} + ${VY} ${sg(s)} 2 \times ${fmt(cov)} = ${VX + VY + 2 * s * cov}`)}
        ${s < 0 ? "<p>Les variances <strong>s'ajoutent</strong> même pour une différence ; seul le terme de covariance change de signe.</p>" : ""}
        ${M(T`E(XY) = \mathrm{Cov}(X, Y) + E(X)E(Y) = ${cov} + ${fmt(EX)} \times ${fmt(EY)} = ${cov + EX * EY}`)}`,
    };
  });

  // ------------------------------------------------------------------
  // Interface
  // ------------------------------------------------------------------
  const CHAPITRES = { 1: "Ch. 1 — Espace probabilisé", 2: "Ch. 2 — Conditionnement", 3: "Ch. 3 — Variables discrètes" };
  const CLE = "simulateur-proba-score";

  function lireNombre(s) {
    s = String(s).trim().replace(/\s/g, "").replace(/,/g, ".").replace(/−/g, "-");
    if (!s) return NaN;
    let pct = false;
    if (s.endsWith("%")) { pct = true; s = s.slice(0, -1); }
    let v;
    const n = "[-+]?(?:\\d+\\.?\\d*|\\.\\d+)";
    if (new RegExp(`^${n}/${n}$`).test(s)) {
      const [a, b] = s.split("/");
      v = parseFloat(a) / parseFloat(b);
    } else if (new RegExp(`^${n}(?:e[-+]?\\d+)?$`, "i").test(s)) {
      v = parseFloat(s);
    } else return NaN;
    return pct ? v / 100 : v;
  }
  const proche = (u, a) => Math.abs(u - a) <= Math.max(6e-4, 5e-3 * Math.abs(a));

  function typeset(el) {
    const mj = window.MathJax;
    if (mj && mj.typesetPromise) {
      (mj.startup && mj.startup.promise ? mj.startup.promise : Promise.resolve())
        .then(() => mj.typesetPromise([el]))
        .catch(() => {});
    } else {
      setTimeout(() => typeset(el), 300);
    }
  }

  function monter(racine) {
    racine.dataset.monte = "1";
    let score = { ok: 0, total: 0, serie: 0 };
    try { score = JSON.parse(localStorage.getItem(CLE)) || score; } catch { /* stockage indisponible */ }
    const sauver = () => { try { localStorage.setItem(CLE, JSON.stringify(score)); } catch { /* rien */ } };

    let chap = 0; // 0 = tous
    let type = ""; // "" = aléatoire
    let courant = null;
    let num = 0;

    racine.innerHTML = `
      <div class="simu">
        <div class="simu-barre">
          <div class="simu-chips" role="group" aria-label="Chapitre">
            <button type="button" data-chap="0" class="actif">Tout</button>
            ${Object.entries(CHAPITRES).map(([k, v]) => `<button type="button" data-chap="${k}" title="${v}">Ch. ${k}</button>`).join("")}
          </div>
          <label class="simu-type-label">Type
            <select class="simu-type"></select>
          </label>
          <div class="simu-score" aria-live="polite"></div>
        </div>
        <div class="simu-carte"></div>
        <p class="simu-aide">Réponses acceptées : <code>0,375</code>, <code>0.375</code>, <code>3/8</code> ou <code>37,5 %</code>.
          Un arrondi à 3 décimales suffit. <kbd>Entrée</kbd> pour vérifier.</p>
      </div>`;

    const $ = (sel) => racine.querySelector(sel);
    const selType = $(".simu-type");
    const carte = $(".simu-carte");

    function majScore() {
      const pct = score.total ? Math.round((100 * score.ok) / score.total) : 0;
      $(".simu-score").innerHTML = `<span><strong>${score.ok}</strong> / ${score.total} bonnes réponses${score.total ? ` (${pct} %)` : ""}</span>
        <span class="simu-serie" title="Exercices réussis d'affilée">🔥 ${score.serie}</span>
        <button type="button" class="simu-raz" title="Remettre le score à zéro">↺</button>`;
      $(".simu-raz").onclick = () => { score = { ok: 0, total: 0, serie: 0 }; sauver(); majScore(); };
    }

    function majTypes() {
      const dispo = GEN.filter((g) => !chap || g.chap === chap);
      selType.innerHTML = `<option value="">Aléatoire</option>` +
        dispo.map((g) => `<option value="${g.id}">${chap ? "" : `Ch. ${g.chap} · `}${g.nom}</option>`).join("");
      if (!dispo.some((g) => g.id === type)) type = "";
      selType.value = type;
    }

    function nouvel() {
      const dispo = GEN.filter((g) => (!chap || g.chap === chap) && (!type || g.id === type));
      let g = pick(dispo);
      if (dispo.length > 1 && courant && g.id === courant.gen.id) g = pick(dispo.filter((x) => x.id !== courant.gen.id));
      courant = { gen: g, ex: g.f(), note: false };
      racine.exerciceCourant = courant.ex; // utilisé par les tests automatiques
      num++;
      afficher();
    }

    function afficher() {
      const { gen, ex } = courant;
      carte.innerHTML = `
        <div class="simu-entete">
          <span class="simu-tag">Ch. ${gen.chap} · ${gen.nom}</span>
          <span class="simu-num">Exercice ${num}</span>
        </div>
        <h3 class="simu-titre">${ex.titre}</h3>
        <div class="simu-enonce">${ex.enonce}</div>
        <ol class="simu-questions">
          ${ex.questions.map((q, i) => `
            <li data-i="${i}">
              <span class="simu-label">${q.label}</span>
              ${q.type === "choix"
                ? `<span class="simu-choix">${q.options.map((o) => `<label><input type="radio" name="q${num}-${i}" value="${o}"> ${o}</label>`).join("")}</span>`
                : `<input class="simu-input" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" aria-label="Réponse ${i + 1}" placeholder="${q.entier ? "entier" : "réponse"}">`}
              <span class="simu-retour" aria-live="polite"></span>
            </li>`).join("")}
        </ol>
        <div class="simu-actions">
          <button type="button" class="md-button md-button--primary simu-verifier">Vérifier</button>
          <button type="button" class="md-button simu-btn-indice">Indice</button>
          <button type="button" class="md-button simu-btn-correction">Correction</button>
          <button type="button" class="md-button simu-suivant">Nouvel exercice →</button>
        </div>
        <div class="simu-panneau simu-indice" hidden><strong>Indice.</strong> ${ex.indice}</div>
        <div class="simu-panneau simu-correction" hidden><strong>Correction.</strong>${ex.correction}</div>`;

      carte.querySelector(".simu-verifier").onclick = verifier;
      carte.querySelector(".simu-suivant").onclick = nouvel;
      carte.querySelector(".simu-btn-indice").onclick = () => basculer(".simu-indice");
      carte.querySelector(".simu-btn-correction").onclick = () => {
        if (!courant.note) noter(courant.ex.questions.map(() => false));
        basculer(".simu-correction");
      };
      carte.querySelectorAll(".simu-input").forEach((inp) => {
        inp.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); verifier(); } });
      });
      typeset(carte);
      const premier = carte.querySelector(".simu-input");
      if (premier && racine.dataset.focus) premier.focus({ preventScroll: true });
    }

    function basculer(sel) {
      const p = carte.querySelector(sel);
      p.hidden = !p.hidden;
      if (!p.hidden) typeset(p);
    }

    function noter(resultats) {
      if (courant.note) return;
      courant.note = true;
      score.total += resultats.length;
      score.ok += resultats.filter(Boolean).length;
      score.serie = resultats.every(Boolean) ? score.serie + 1 : 0;
      sauver();
      majScore();
    }

    function verifier() {
      racine.dataset.focus = "1";
      const res = courant.ex.questions.map((q, i) => {
        const li = carte.querySelector(`li[data-i="${i}"]`);
        const retour = li.querySelector(".simu-retour");
        let bon, vide = false;
        if (q.type === "choix") {
          const coche = li.querySelector("input:checked");
          vide = !coche;
          bon = !!coche && coche.value === q.reponse;
        } else {
          const brut = li.querySelector(".simu-input").value;
          const u = lireNombre(brut);
          vide = !brut.trim();
          bon = Number.isFinite(u) && (q.entier ? u === q.reponse : proche(u, q.reponse));
          if (!vide && !Number.isFinite(u)) {
            li.className = "simu-faux";
            retour.textContent = "Format non reconnu";
            return false;
          }
        }
        li.className = vide ? "" : bon ? "simu-bon" : "simu-faux";
        retour.textContent = vide ? "—" : bon ? "✓" : "✗";
        return bon;
      });
      noter(res);
      if (res.every(Boolean)) {
        carte.querySelector(".simu-verifier").textContent = "Bravo !";
        carte.querySelector(".simu-suivant").focus({ preventScroll: true });
      }
    }

    racine.querySelectorAll(".simu-chips button").forEach((b) => {
      b.onclick = () => {
        chap = Number(b.dataset.chap);
        racine.querySelectorAll(".simu-chips button").forEach((x) => x.classList.toggle("actif", x === b));
        majTypes();
        nouvel();
      };
    });
    selType.onchange = () => { type = selType.value; nouvel(); };

    majScore();
    majTypes();
    nouvel();
  }

  function init() {
    const racine = document.getElementById("simulateur-proba");
    if (racine && !racine.dataset.monte) monter(racine);
  }

  // Exposé pour les tests automatiques
  window.SimulateurProba = { GEN, lireNombre, proche };

  if (typeof document$ !== "undefined") document$.subscribe(init);
  else document.addEventListener("DOMContentLoaded", init);
})();
