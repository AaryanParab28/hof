export type HalftoneTone = 'orange' | 'purple' | 'yellow' | 'cream';

interface HalftoneProps {
  tone: HalftoneTone;
  /** Positions the patch; each section owns its placement. */
  className?: string;
}

/** Decorative screen-print dot patch that fades out from its centre. */
export function Halftone({ tone, className }: HalftoneProps) {
  const classes = ['halftone', `halftone--${tone}`, className].filter(Boolean).join(' ');
  return <span className={classes} aria-hidden="true" />;
}
