document.addEventListener("DOMContentLoaded", () => {
  const gate = document.querySelector(".gate");
  const enterBtn = document.getElementById("enterBtn");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!enterBtn) return;

  enterBtn.addEventListener("click", () => {
    if (prefersReducedMotion) {
      window.location.href = "main.html";
      return;
    }
    gate.classList.add("gate-leaving");
    setTimeout(() => {
      window.location.href = "main.html";
    }, 420);
  });
});
