import { useEffect, useRef, type RefObject } from 'react';

/** Start listening a little before the section reaches the viewport. */
const ACTIVE_MARGIN = '25% 0px';

/**
 * Runs `callback` at most once per animation frame on scroll/resize — but only while
 * `targetRef` is on or near screen. Listeners attach when the target approaches the
 * viewport and detach when it leaves; the callback runs once more on every enter/leave,
 * so a fast fling past the section still settles it in its final state.
 * The latest callback is always used, so it may close over fresh state.
 */
export function useScrollFrame(targetRef: RefObject<Element | null>, callback: () => void): void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    let frame = 0;
    let listening = false;

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        callbackRef.current();
      });
    };

    const attach = () => {
      if (listening) return;
      listening = true;
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
    };

    const detach = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) attach();
        else detach();
        schedule();
      },
      { rootMargin: ACTIVE_MARGIN },
    );

    observer.observe(target);
    schedule();

    return () => {
      observer.disconnect();
      detach();
      cancelAnimationFrame(frame);
    };
  }, [targetRef]);
}
