import { useRef, useState } from 'react';
import side from '../../assets/photos/sunlit-side.webp';
import threeQuarter from '../../assets/photos/sunlit-three-quarter.webp';
import front from '../../assets/photos/sunlit-front.webp';
import { useScrollFrame } from '../../hooks/useScrollFrame';
import { scrollProgress, stepIndex } from '../../lib/motion';
import './craving.css';

const SLIDES = [
  { word: 'Crunch', sub: 'That sound when you bite into the edge of the fillet. That one.', image: side, outline: false },
  { word: 'Drip', sub: 'Herb mayo running down your wrist. Lick it. Nobody’s watching.', image: threeQuarter, outline: true },
  { word: 'Melt', sub: 'Cheddar going soft over hot chicken. The slowest, best part.', image: front, outline: false },
] as const;

/** Sticky full-bleed photo stage that swaps word + image as you scroll through it. */
export function CravingMachine() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useScrollFrame(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const progress = scrollProgress(el.getBoundingClientRect().top, el.offsetHeight, window.innerHeight);
    setIndex(stepIndex(progress, SLIDES.length));
  });

  const slide = SLIDES[index];

  return (
    <section className="crave" aria-labelledby="crave-heading">
      <div className="crave__scroller" ref={scrollerRef}>
        <div className="crave__stage">
          <div className="crave__frame" aria-hidden="true">
            {SLIDES.map((s, i) => (
              <img key={s.word} src={s.image} alt="" loading="lazy" className={i === index ? 'is-on' : undefined} />
            ))}
          </div>
          <p className="crave__idx">
            The craving machine · 0{index + 1} / 0{SLIDES.length}
          </p>
          <h2 className="disp crave__word" id="crave-heading">
            <span className={slide.outline ? 'outline outline--yellow' : undefined}>{slide.word}</span>
          </h2>
          <p className="crave__sub">{slide.sub}</p>
        </div>
      </div>
    </section>
  );
}
