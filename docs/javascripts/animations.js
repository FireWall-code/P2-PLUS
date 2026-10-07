// Animations : révélation des blocs au défilement, à chaque chargement de page.
// Sans JavaScript ou avec « réduire les animations », tout reste affiché normalement.
(() => {
  const reduire = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduire || !("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("anim");

  const CIBLES = [
    ".md-typeset .grid.cards > ul > li",
    ".md-typeset .grid > .card",
    ".md-typeset > .admonition",
    ".md-typeset > details",
    ".md-typeset > .md-typeset__scrollwrap",
    ".md-typeset > h2",
    ".agenda-carte",
    ".agenda-tableau",
  ].join(",");

  let observateur = null;

  function nouvelObservateur() {
    observateur?.disconnect();
    observateur = new IntersectionObserver((entrees) => {
      entrees.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observateur.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -40px 0px", threshold: 0.08 });
  }

  // N'ajoute que les nouveaux blocs : ceux déjà suivis gardent leur observation
  function preparer() {
    const hauteur = window.innerHeight;
    document.querySelectorAll(CIBLES).forEach((el) => {
      if (el.classList.contains("reveler")) return;
      // Décalage en cascade entre éléments voisins (cartes d'une même grille…)
      const freres = el.parentElement ? [...el.parentElement.children].filter((c) => c.matches(CIBLES)) : [];
      const rang = Math.max(0, freres.indexOf(el));
      el.style.setProperty("--delai", `${Math.min(rang, 6) * 0.06}s`);
      el.classList.add("reveler");
      // Ce qui est déjà à l'écran apparaît tout de suite (avec la cascade)
      if (el.getBoundingClientRect().top < hauteur) requestAnimationFrame(() => el.classList.add("visible"));
      else observateur.observe(el);
    });
  }

  // L'agenda est rendu après coup : on observe le DOM pour animer ses cartes aussi
  const mutation = new MutationObserver(() => preparer());

  function demarrer() {
    nouvelObservateur();
    preparer();
    mutation.disconnect();
    document.querySelectorAll(".agenda-evaluations, .agenda-matiere, .agenda-tableau")
      .forEach((el) => mutation.observe(el, { childList: true }));
  }

  if (typeof document$ !== "undefined") document$.subscribe(demarrer);
  else document.addEventListener("DOMContentLoaded", demarrer);
})();
