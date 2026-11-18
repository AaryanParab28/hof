import { useEffect, useState } from 'react';
import wordmark from '../../assets/brand/wordmark-purple.svg';
import { NAV_LINKS, SITE } from '../../data/site';
import { ExternalLink } from '../ui/ExternalLink';
import './nav.css';

const SCROLLED_AFTER_PX = 40;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLLED_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const classes = ['nav', scrolled && 'is-scrolled', open && 'is-open'].filter(Boolean).join(' ');

  return (
    <header className={classes}>
      <a className="nav__logo" href="#top" aria-label={`${SITE.name} home`}>
        <img src={wordmark} alt="" height={40} />
      </a>
      <nav aria-label="Main">
        <ul id="nav-links" className="nav__links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="nav__right">
        <span className="nav__pill">
          <span className="nav__dot" aria-hidden="true" />
          {SITE.area}
        </span>
        <ExternalLink className="btn btn--purple nav__order" href={SITE.zomatoUrl}>
          Order now
        </ExternalLink>
        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true">{open ? '✕' : '≡'}</span>
        </button>
      </div>
    </header>
  );
}
