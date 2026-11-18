import { useEffect, useState } from 'react';
import wordmark from '../../assets/brand/wordmark-ink.svg';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './loader.css';

const MESSAGES = [
  'Heating the fryer…',
  'Dusting the sesame…',
  'Pickling the onions. Patiently.',
  'Whisking the herb mayo…',
  'Okay okay. It’s ready.',
] as const;

const STRIPE_COUNT = 5;
const STEP_MS = 520;
/** Matches the stripe wipe-out transition in loader.css. */
const EXIT_MS = 1400;

/** Five-stripe intro that wipes away once the fryer messages finish (or on skip). */
export function Loader() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const [removed, setRemoved] = useState(false);
  const done = skipped || step >= MESSAGES.length;

  useEffect(() => {
    if (done) return;
    const id = window.setInterval(() => setStep((s) => s + 1), STEP_MS);
    return () => window.clearInterval(id);
  }, [done]);

  useEffect(() => {
    if (!done) return;
    const id = window.setTimeout(() => setRemoved(true), EXIT_MS);
    return () => window.clearTimeout(id);
  }, [done]);

  if (reduced || removed) return null;

  const shown = Math.min(step, MESSAGES.length - 1);
  const progress = shown / (MESSAGES.length - 1);

  return (
    <div className={`loader${done ? ' is-done' : ''}`}>
      <div className="loader__stripes" aria-hidden="true">
        {Array.from({ length: STRIPE_COUNT }, (_, i) => (
          <i key={i} className="loader__stripe" />
        ))}
      </div>
      <div className="loader__content">
        <img className="loader__wordmark" src={wordmark} alt="" />
        <p className="loader__msg" role="status">
          {MESSAGES[shown]}
        </p>
        <div className="loader__bar" aria-hidden="true">
          <b style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
      {!done && (
        <button type="button" className="loader__skip" onClick={() => setSkipped(true)}>
          Skip intro →
        </button>
      )}
    </div>
  );
}
