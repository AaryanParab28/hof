import { useRef, type CSSProperties } from 'react';
import burger from '../../assets/photos/sunlit-cutout.webp';
import stamp from '../../assets/deco/stamp-purple.svg';
import sparkle from '../../assets/deco/sparkle-yellow.svg';
import star from '../../assets/deco/star-orange.svg';
import cluster from '../../assets/deco/sparkle-cluster-purple.svg';
import arrow from '../../assets/deco/arrow-swoop-purple.svg';
import { SITE } from '../../data/site';
import { usePointerParallax } from '../../hooks/usePointerParallax';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './hero.css';

/**
 * Parallax depth in px at the viewport edge. The burger (foreground) and the
 * HIGH/NESS type (background) move in opposite directions to separate the planes.
 */
const DEPTH = {
  burger: 18,
  wordTop: -9,
  wordBottom: -14,
  stamp: -14,
  callout: 8,
} as const;

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

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  usePointerParallax(ref, !reduced);

  return (
    <section className="hero grain" aria-labelledby="hero-heading" ref={ref}>
      <div className="hero__bgtype" aria-hidden="true">
        <div className="disp hero__word hero__word--top" data-depth={DEPTH.wordTop}>
          High
        </div>
        <div className="disp outline outline--purple hero__word hero__word--bottom" data-depth={DEPTH.wordBottom}>
          ness
        </div>
      </div>

      <div className="hero__burger" data-depth={DEPTH.burger}>
        <img
          src={burger}
          width={1300}
          height={834}
          fetchPriority="high"
          alt="The Highness signature crispy chicken burger: wide golden fillet, melted cheddar, green herb mayo, pickled onion and lettuce in a sesame bun"
        />
      </div>

      <img className="hero__float hero__stamp ink" src={stamp} alt="" data-depth={DEPTH.stamp} />
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

      <div className="hero__callout" data-depth={DEPTH.callout} aria-hidden="true">
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
