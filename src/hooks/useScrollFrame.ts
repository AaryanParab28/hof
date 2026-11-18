import { useEffect, useRef } from 'react';

/**
 * Runs `callback` at most once per animation frame whenever the page scrolls or resizes,
 * plus once on mount. The latest callback is always used, so it may close over fresh state.
 */
export function useScrollFrame(callback: () => void): void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        callbackRef.current();
      });
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
}
