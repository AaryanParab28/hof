/** Pure motion math shared by the scroll-driven sections. */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * How far a tall "scroller" section has travelled past the top of the viewport, 0 → 1.
 * @param top    element.getBoundingClientRect().top
 * @param height element.offsetHeight
 * @param viewport window.innerHeight
 */
export function scrollProgress(top: number, height: number, viewport: number): number {
  const travel = height - viewport;
  if (travel <= 0) return 1;
  return clamp(-top / travel, 0, 1);
}

/** Maps progress 0 → 1 onto one of `count` equal steps. */
export function stepIndex(progress: number, count: number): number {
  return Math.min(count - 1, Math.floor(clamp(progress, 0, 1) * count));
}

/** Fraction of total progress each layer spends falling into place. */
const LAYER_SPAN = 0.3;

export interface LayerFrame {
  /** Eased landing amount, 0 = exploded, 1 = landed. */
  t: number;
}

/** Staggered landing amount for layer `index` of `count` at overall progress. */
export function layerFrame(progress: number, index: number, count: number): LayerFrame {
  const start = (index / count) * (1 - LAYER_SPAN);
  return { t: easeInOutCubic(clamp((progress - start) / LAYER_SPAN, 0, 1)) };
}
