import type { CSSProperties, ReactNode } from 'react';

interface MaskedLinesProps {
  lines: readonly ReactNode[];
}

/**
 * Renders each line in its own overflow mask so it can slide up into view.
 * Put it inside an element with the `reveal-lines` class; the reveal observer
 * adds `is-in` to that element and the lines rise in a short stagger.
 * Each line is a block, so it replaces a `<br />` without changing the line breaks.
 */
export function MaskedLines({ lines }: MaskedLinesProps) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="mask-line" style={{ '--i': i } as CSSProperties}>
          <span className="mask-line__inner">{line}</span>
        </span>
      ))}
    </>
  );
}
