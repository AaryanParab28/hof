import { useRef, useState } from 'react';
import { ASSEMBLY_INTRO, FRAME, LAYERS } from '../../data/assembly';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useScrollFrame } from '../../hooks/useScrollFrame';
import { clamp, easeInOutCubic, layerFrame, scrollProgress } from '../../lib/motion';
import { MaskedLines } from '../ui/MaskedLines';
import './assembly.css';

/** Artboard y the exploded layers fan out from, and how far they spread. */
const SPREAD_ORIGIN = 1600;
const SPREAD = 1.12;
/** Max tilt (deg) of a layer while it is still falling. */
const FALL_TILT = 3;
/** After this much progress the finished burger zooms toward the viewer. */
const ZOOM_START = 0.55;
const LANDED_AT = 0.98;

const percentX = (px: number) => `${(px / FRAME.width) * 100}%`;
const percentY = (px: number) => `${(px / FRAME.height) * 100}%`;

/**
 * Scroll-driven, bottom-up build of a crispy chicken burger (2.5D: stacked cut-out layers).
 * Layer transforms are written straight to the DOM each frame; React only re-renders
 * when the landed-layer count changes, which drives the caption and meter.
 */
export function Assembly() {
  const reduced = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [landed, setLanded] = useState(0);

  useScrollFrame(scrollerRef, () => {
    const scroller = scrollerRef.current;
    const stack = stackRef.current;
    if (!scroller || !stack) return;

    const progress = reduced
      ? 1
      : scrollProgress(scroller.getBoundingClientRect().top, scroller.offsetHeight, window.innerHeight);
    const stackHeight = stack.offsetHeight;
    let landedCount = 0;

    LAYERS.forEach((layer, i) => {
      const { t } = layerFrame(progress, i, LAYERS.length);
      const explodedY = SPREAD_ORIGIN + (layer.top - SPREAD_ORIGIN) * SPREAD;
      const y = explodedY + (layer.landedTop - explodedY) * t;
      const shift = ((y - layer.top) / FRAME.height) * stackHeight;
      const tilt = (1 - t) * (i % 2 ? FALL_TILT : -FALL_TILT);

      const el = layerRefs.current[i];
      if (el) el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0) rotate(${tilt.toFixed(3)}deg)`;
      const tag = tagRefs.current[i];
      if (tag) tag.style.opacity = (1 - t).toFixed(2);
      if (t > LANDED_AT) landedCount++;
    });

    const zoom = easeInOutCubic(clamp((progress - ZOOM_START) / (1 - ZOOM_START), 0, 1));
    stack.style.transform = `translateY(${(-zoom * 14).toFixed(3)}%) scale(${(1 + zoom * 0.3).toFixed(4)})`;
    setLanded(landedCount);
  });

  const step = landed ? LAYERS[landed - 1].caption : ASSEMBLY_INTRO;

  return (
    <section className={`assembly${reduced ? ' assembly--static' : ''}`} id="burger" aria-labelledby="assembly-heading">
      <div className="assembly__scroller" ref={scrollerRef}>
        <div className="assembly__stage">
          <div className="assembly__copy">
            <p className="eyebrow assembly__count">
              Layer {landed} / {LAYERS.length}
            </p>
            <h2 className="disp assembly__title reveal-lines" id="assembly-heading">
              <MaskedLines lines={['Seven', 'layers.', <span className="outline outline--yellow">One bite.</span>]} />
            </h2>
            <p key={step} className="assembly__step">
              {step}
            </p>
            <div className="assembly__meter" aria-hidden="true">
              {LAYERS.map((layer, i) => (
                <i key={layer.label} className={i < landed ? 'is-on' : undefined} />
              ))}
            </div>
          </div>

          <div className="assembly__visual">
            <div className="assembly__ring" aria-hidden="true" />
            <div
              className="assembly__stack"
              ref={stackRef}
              role="img"
              aria-label="A Highness crispy chicken burger assembling layer by layer"
            >
              {LAYERS.map((layer, i) => (
                <div
                  key={layer.label}
                  className="assembly__layer"
                  ref={(el) => {
                    layerRefs.current[i] = el;
                  }}
                  style={{
                    left: percentX(layer.left),
                    top: percentY(layer.top),
                    width: percentX(layer.width),
                    height: percentY(layer.height),
                    zIndex: 10 + i,
                  }}
                >
                  <img src={layer.image} alt="" loading="lazy" />
                  <span
                    className="assembly__tag"
                    ref={(el) => {
                      tagRefs.current[i] = el;
                    }}
                  >
                    {layer.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
