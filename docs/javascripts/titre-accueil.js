// Le titre du site dans l'en-tête ramène à la page d'accueil (comme le logo).
(() => {
  function accueil() {
    try {
      const config = JSON.parse(document.getElementById("__config").textContent);
      return new URL(config.base + "/", location.href).href;
    } catch {
      return document.querySelector(".md-header__button.md-logo")?.href || "/";
    }
  }

  function activer() {
    const titre = document.querySelector(".md-header__title");
    if (!titre || titre.dataset.lienAccueil) return;
    titre.dataset.lienAccueil = "1";
    titre.setAttribute("role", "link");
    titre.setAttribute("tabindex", "0");
    titre.setAttribute("title", "Retour à l'accueil");
    const aller = () => { location.href = accueil(); };
    titre.addEventListener("click", aller);
    titre.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); aller(); }
    });
  }

  if (typeof document$ !== "undefined") document$.subscribe(activer);
  else document.addEventListener("DOMContentLoaded", activer);
})();
