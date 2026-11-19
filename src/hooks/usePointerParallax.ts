import { useEffect, type RefObject } from 'react';
import { lerp } from '../lib/motion';

/** Only real mice get parallax; touch and pen users keep a still hero. */
const FINE_POINTER = '(hover: hover) and (pointer: fine)';
/** Fraction of the remaining distance covered per frame (higher = snappier). */
const SMOOTHING = 0.09;
const SETTLE_EPSILON = 0.0005;

interface Layer {
  el: HTMLElement;
  depth: number;
}

/**
 * Eases every `[data-depth]` descendant of `rootRef` toward the mouse.
 * `data-depth` is the max offset in px at the viewport edge; negative values move opposite,
 * which is what separates foreground from background.
 * Uses the individual `translate` property so it composes with CSS `transform` animations.
 * The rAF loop only runs while easing and only while the root is on screen.
 */
export function usePointerParallax(rootRef: RefObject<HTMLElement | null>, enabled: boolean): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!enabled || !root || !window.matchMedia(FINE_POINTER).matches) return;

    const layers: Layer[] = Array.from(root.querySelectorAll<HTMLElement>('[data-depth]')).map((el) => ({
      el,
      depth: Number(el.dataset.depth),
    }));

    let frame = 0;
    let inView = true;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    const tick = () => {
      x = lerp(x, targetX, SMOOTHING);
      y = lerp(y, targetY, SMOOTHING);
      layers.forEach(({ el, depth }) => {
        el.style.translate = `${(x * depth).toFixed(2)}px ${(y * depth).toFixed(2)}px`;
      });
      const settled = Math.abs(targetX - x) < SETTLE_EPSILON && Math.abs(targetY - y) < SETTLE_EPSILON;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (!inView || e.pointerType !== 'mouse') return;
      targetX = e.clientX / window.innerWidth - 0.5;
      targetY = e.clientY / window.innerHeight - 0.5;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    observer.observe(root);
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      observer.disconnect();
      cancelAnimationFrame(frame);
      layers.forEach(({ el }) => {
        el.style.translate = '';
      });
    };
  }, [rootRef, enabled]);
}
