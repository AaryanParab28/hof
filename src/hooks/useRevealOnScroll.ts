import { useEffect } from 'react';

/** `.reveal` fades a block up; `.reveal-lines` slides masked heading lines; `.marker` draws a stroke. */
const REVEAL_SELECTOR = '.reveal, .reveal-lines, .marker';
const VISIBLE_CLASS = 'is-in';
const STAGGER_S = 0.08;
const STAGGER_GROUP = 4;

/**
 * Adds `is-in` to reveal targets the first time they enter the viewport, then stops
 * watching them. Elements inside a `hidden` tab panel reveal when the panel is shown.
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
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    );

    elements
      .filter((el) => el.classList.contains('reveal'))
      .forEach((el, i) => {
        el.style.transitionDelay = `${(i % STAGGER_GROUP) * STAGGER_S}s`;
      });
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
