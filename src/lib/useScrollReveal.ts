import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document
        .querySelectorAll("[data-reveal], [data-reveal-child]")
        .forEach((el) => el.classList.add("reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    const observe = (root: ParentNode = document) => {
      root
        .querySelectorAll("[data-reveal]:not(.reveal-visible), [data-reveal-child]:not(.reveal-visible)")
        .forEach((el, index) => {
          if (el instanceof HTMLElement && !el.style.getPropertyValue("--reveal-delay")) {
            el.style.setProperty("--reveal-delay", `${Math.min(index * 70, 420)}ms`);
          }
          observer.observe(el);
        });
    };

    observe();

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) observe(node);
        });
      });
    });

    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);
}
