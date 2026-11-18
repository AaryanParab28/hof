import { useEffect, useRef, type CSSProperties, type RefObject } from 'react';
import burger from '../../assets/photos/sunlit-cutout.webp';
import stamp from '../../assets/deco/stamp-purple.svg';
import sparkle from '../../assets/deco/sparkle-yellow.svg';
import star from '../../assets/deco/star-orange.svg';
import cluster from '../../assets/deco/sparkle-cluster-purple.svg';
import arrow from '../../assets/deco/arrow-swoop-purple.svg';
import { SITE } from '../../data/site';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './hero.css';

interface Float {
  src: string;
  depth: number;
  style: CSSProperties;
}

const FLOATS: readonly Float[] = [
  { src: sparkle, depth: 22, style: { width: 90, left: '9vw', top: '22vh' } },
  { src: star, depth: -18, style: { width: 74, right: '24vw', bottom: '24vh' } },
  { src: cluster, depth: 14, style: { width: 110, left: '30vw', top: '20vh' } },
];

/** Nudges every `[data-depth]` child toward the mouse; depth is max offset in px. */
function usePointerParallax(rootRef: RefObject<HTMLElement | null>, enabled: boolean): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!enabled || !root) return;

    const layers = Array.from(root.querySelectorAll<HTMLElement>('[data-depth]'));
    let frame = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      frame = 0;
      layers.forEach((el) => {
        const depth = Number(el.dataset.depth);
        el.style.translate = `${x * depth}px ${y * depth}px`;
      });
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX / window.innerWidth - 0.5;
      y = e.clientY / window.innerHeight - 0.5;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [rootRef, enabled]);
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  usePointerParallax(ref, !reduced);

  return (
    <section className="hero" aria-labelledby="hero-heading" ref={ref}>
      <div className="hero__bgtype" aria-hidden="true">
        <div className="disp hero__word hero__word--top">High</div>
        <div className="disp outline outline--purple hero__word hero__word--bottom">ness</div>
      </div>

      <div className="hero__burger" data-depth="6">
        <img
          src={burger}
          width={1300}
          height={834}
          fetchPriority="high"
          alt="The Highness signature crispy chicken burger: wide golden fillet, melted cheddar, green herb mayo, pickled onion and lettuce in a sesame bun"
        />
      </div>

      <img className="hero__float hero__stamp" src={stamp} alt="" data-depth="-14" />
      {FLOATS.map((f) => (
        <img
          key={f.src}
          className="hero__float hero__float--deco"
          src={f.src}
          alt=""
          style={f.style}
          data-depth={f.depth}
        />
      ))}

      <div className="hero__callout" data-depth="10" aria-hidden="true">
        <span className="whisper">
          wider than
          <br />
          the bun. on purpose.
        </span>
        <img src={arrow} alt="" />
      </div>

      <div className="hero__bottom">
        <h1 id="hero-heading">
          Crispy chicken burgers, loaded sides &amp; shakes in Goregaon East.{' '}
          <em>Fried hot, stacked high, eaten messy.</em>
        </h1>
        <div className="hero__right">
          <p className="eyebrow">
            From the team behind {SITE.family[0]} &amp; {SITE.family[1]}
          </p>
          <p className="disp hero__tagline">{SITE.tagline}</p>
        </div>
      </div>

      <div className="hero__cue" aria-hidden="true">
        Scroll
        <i />
      </div>
    </section>
  );
}
