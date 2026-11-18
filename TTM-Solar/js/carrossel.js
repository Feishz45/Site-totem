(() => {
  const root = document.getElementById("totem-carousel");
  if (!root) return;

  const AUTOPLAY_MS = 5000; 
  const viewport = root.querySelector(".carousel__viewport");
  const track = root.querySelector(".carousel__track");
  const slides = [...root.querySelectorAll(".carousel__slide")];
  const prevBtn = root.querySelector("[data-carousel-prev]");
  const nextBtn = root.querySelector("[data-carousel-next]");
  const dotsBox = root.querySelector(".carousel__dots");
  const counter = root.querySelector(".carousel__counter");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const total = slides.length;
  const pad = (n) => String(n).padStart(2, "0");
  let index = 0;
  let timer = null;
  let hovering = false;  
  let focusing = false;   
  
  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel__dot";
    dot.setAttribute("aria-label", `Ir para a foto ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsBox.appendChild(dot);
    return dot;
  });

  function goTo(i) {
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;

    slides.forEach((slide, n) => {
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", `${n + 1} de ${total}`);
      slide.setAttribute("aria-hidden", String(n !== index));
    });

    dots.forEach((dot, n) => {
      dot.classList.toggle("is-active", n === index);
      if (n === index) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });

    counter.textContent = `${pad(index + 1)} / ${pad(total)}`;
    start(); 
  }

  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));

  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(index - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1); }
  });

  let startX = null;
  viewport.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") startX = e.clientX;
  });
  viewport.addEventListener("pointerup", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
  });
  viewport.addEventListener("pointercancel", () => { startX = null; });

  const canAutoplay = () =>
    total > 1 && !hovering && !focusing && !document.hidden && !reduceMotion.matches;

  function stop() {
    clearTimeout(timer);
    timer = null;
  }

  function start() {
    stop();
    if (!canAutoplay()) return;
    timer = setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
  }

  root.addEventListener("pointerenter", (e) => {
    if (e.pointerType === "mouse") { hovering = true; stop(); }
  });
  root.addEventListener("pointerleave", (e) => {
    if (e.pointerType === "mouse") { hovering = false; start(); }
  });

  root.addEventListener("focusin", (e) => {
    focusing = e.target.matches(":focus-visible");
    if (focusing) stop();
  });
  root.addEventListener("focusout", () => {
    focusing = false;
    start();
  });

  document.addEventListener("visibilitychange", start);
  reduceMotion.addEventListener("change", start);

  slides.forEach((slide) => {
    const img = slide.querySelector("img");
    if (!img) return;
    const markMissing = () => slide.classList.add("is-missing");
    img.addEventListener("error", markMissing);
    if (img.complete && img.naturalWidth === 0) markMissing();
  });

  goTo(0);
})();