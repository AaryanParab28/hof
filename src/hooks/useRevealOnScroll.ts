import { useEffect } from 'react';

const REVEAL_SELECTOR = '.reveal';
const VISIBLE_CLASS = 'is-in';
const STAGGER_S = 0.08;
const STAGGER_GROUP = 4;

/**
 * Fades `.reveal` elements in the first time they enter the viewport.
 * Elements inside a `hidden` tab panel reveal when the panel is shown.
 */
export function useRevealOnScroll(): void {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add(VISIBLE_CLASS));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(VISIBLE_CLASS);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );

    elements.forEach((el, i) => {
      el.style.transitionDelay = `${(i % STAGGER_GROUP) * STAGGER_S}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
