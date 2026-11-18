import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface ExternalLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> {
  href: string;
  children: ReactNode;
}

/** Link that opens off-site in a new tab, announced to screen readers. */
export function ExternalLink({ children, ...rest }: ExternalLinkProps) {
  return (
    <a {...rest} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
