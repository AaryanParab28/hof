import type { ReactNode } from 'react';

export type MarkerVariant = 'underline' | 'circle';
export type MarkerTone = 'orange' | 'purple' | 'yellow' | 'cream';

interface MarkerProps {
  children: ReactNode;
  variant?: MarkerVariant;
  tone?: MarkerTone;
}

/** Hand-drawn strokes. Deliberately wobbly: they should look like a marker, not a vector tool. */
const STROKES: Record<MarkerVariant, { viewBox: string; d: string }> = {
  underline: {
    viewBox: '0 0 200 20',
    d: 'M4 13 C 38 7, 76 15, 112 10 S 172 6, 196 11',
  },
  circle: {
    viewBox: '0 0 200 80',
    d: 'M118 9 C 66 2, 14 12, 8 38 C 3 62, 58 76, 112 73 C 168 70, 197 55, 193 34 C 189 13, 140 4, 92 8',
  },
};

/**
 * Draws a marker stroke under or around its children when it scrolls into view.
 * The reveal observer adds `is-in`; CSS animates the stroke from 0 to full length.
 */
export function Marker({ children, variant = 'underline', tone = 'orange' }: MarkerProps) {
  const stroke = STROKES[variant];
  return (
    <span className={`marker marker--${variant} marker--${tone}`}>
      {children}
      <svg className="marker__svg" viewBox={stroke.viewBox} aria-hidden="true" focusable="false">
        <path d={stroke.d} pathLength={1} />
      </svg>
    </span>
  );
}
