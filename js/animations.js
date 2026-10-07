function observeReveals(root = document) {
  const revealItems = root.querySelectorAll(".reveal:not(.is-visible)");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

  revealItems.forEach((item) => {
    const siblings = [...item.parentElement.children].filter((sibling) => sibling.classList.contains("reveal"));
    const stagger = Math.min(siblings.indexOf(item) * 90, 360);
    item.style.setProperty("--reveal-delay", `${stagger}ms`);
    observer.observe(item);
  });
}

window.observeReveals = observeReveals;

document.addEventListener("DOMContentLoaded", () => {
  observeReveals();
  const timeline = document.querySelector(".timeline");
  if (timeline && "IntersectionObserver" in window) {
    const timelineObserver = new IntersectionObserver(([entry], observer) => {
      if (!entry.isIntersecting) return;
      timeline.classList.add("is-visible");
      observer.disconnect();
    }, { threshold: 0.15 });
    timelineObserver.observe(timeline);
  }
});