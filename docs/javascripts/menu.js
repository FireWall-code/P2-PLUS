// Allège le menu de gauche : retire les préfixes répétitifs ("Fiche — ", "TD 2 — "…)
// déjà donnés par la section parente. Le titre complet reste dans l'info-bulle.
(() => {
  const PREFIXES = [/^Fiche(?: CE)?\s*[—–-]\s*/i, /^(TD\s*\d+)\s*[—–-]\s*/i, /^(Ch\.\s*\d+)\s*[—–-]\s*/i];

  function alleger() {
    document.querySelectorAll(".md-sidebar--primary .md-nav__link .md-ellipsis").forEach((el) => {
      if (el.dataset.allege) return;
      const texte = el.textContent.trim();
      let court = texte;
      for (const re of PREFIXES) {
        const m = texte.match(re);
        if (m) {
          // "TD 2 — Lorentz" → "TD 2 · Lorentz" ; "Fiche — Bascules" → "Bascules"
          court = m[1] ? `${m[1]} · ${texte.slice(m[0].length)}` : texte.slice(m[0].length);
          break;
        }
      }
      if (court !== texte) {
        el.textContent = court;
        el.closest(".md-nav__link")?.setAttribute("title", texte);
      }
      el.dataset.allege = "1";
    });
  }

  if (typeof document$ !== "undefined") document$.subscribe(alleger);
  else document.addEventListener("DOMContentLoaded", alleger);
})();
