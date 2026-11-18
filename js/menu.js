
(() => {
  const header = document.getElementById("header");
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav-menu");
  const overlay = document.getElementById("overlay");
  const links = document.querySelectorAll(".nav__link");

  /* ---------- 1) Menu mobile ---------- */
  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    overlay.classList.toggle("is-open", open);
    document.body.classList.toggle("no-scroll", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };

  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

  toggle.addEventListener("click", () => setMenu(!isOpen()));

  // Fecha ao clicar no fundo escuro
  overlay.addEventListener("click", () => setMenu(false));

  // Fecha ao clicar em qualquer link ou no CTA do menu
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => setMenu(false))
  );

  // Fecha com Esc e devolve o foco ao botão
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      setMenu(false);
      toggle.focus();
    }
  });

  window.matchMedia("(min-width: 1025px)").addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });


  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };
  onScroll(); // roda uma vez ao carregar
  window.addEventListener("scroll", onScroll, { passive: true });

  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.getAttribute("href") === `#${id}`;
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  const sections = [...links]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },

    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
})();