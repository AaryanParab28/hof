import { Fragment } from 'react';
import './marquee.css';

export interface MarqueeWord {
  text: string;
  outline?: boolean;
}

interface MarqueeProps {
  words: readonly MarqueeWord[];
  icon: string;
  variant?: 'purple' | 'ink';
}

/**
 * Runs rendered on the track. The track scrolls by exactly -50%, so each half
 * (2 runs) must be wider than the widest viewport; otherwise a gap shows before the
 * loop wraps. 4 runs keeps a single run of ~1400px safe up to ~2800px wide.
 */
const RUN_COUNT = 4;

/** Tilted, endlessly scrolling word band. Decorative, so hidden from assistive tech. */
export function Marquee({ words, icon, variant = 'purple' }: MarqueeProps) {
  const run = (copy: number) => (
    <span className="marquee__run" key={copy}>
      {words.map((w) => (
        <Fragment key={w.text}>
          <span className={w.outline ? 'marquee__word--outline' : undefined}>{w.text}</span>
          <img className="marquee__icon" src={icon} alt="" />
        </Fragment>
      ))}
    </span>
  );

  return (
    <div className={`marquee marquee--${variant}`} aria-hidden="true">
      <div className="marquee__track">{Array.from({ length: RUN_COUNT }, (_, i) => run(i))}</div>
    </div>
  );
}
