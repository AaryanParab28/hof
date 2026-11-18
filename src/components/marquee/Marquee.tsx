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
      <div className="marquee__track">{[0, 1].map(run)}</div>
    </div>
  );
}
