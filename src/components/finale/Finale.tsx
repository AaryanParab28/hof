import splash from '../../assets/deco/splash-orange.svg';
import star from '../../assets/deco/star-orange.svg';
import sparkle from '../../assets/deco/sparkle-yellow.svg';
import sticker from '../../assets/deco/sticker-green.svg';
import { NAV_LINKS, SITE } from '../../data/site';
import { ExternalLink } from '../ui/ExternalLink';
import { Marker } from '../ui/Marker';
import { MaskedLines } from '../ui/MaskedLines';
import './finale.css';

const FLOATS = [
  { src: splash, className: 'finale__float--splash' },
  { src: star, className: 'finale__float--star' },
  { src: sparkle, className: 'finale__float--sparkle' },
  { src: sticker, className: 'finale__float--sticker' },
] as const;

export function Finale() {
  return (
    <section className="finale" aria-labelledby="finale-heading">
      {FLOATS.map((f) => (
        <img key={f.className} className={`finale__float ink ${f.className}`} src={f.src} alt="" />
      ))}
      <h2 className="disp finale__huge reveal-lines" id="finale-heading">
        <MaskedLines
          lines={[
            <>
              High<span className="outline outline--yellow">ness</span>
            </>,
          ]}
        />
      </h2>
      <p className="finale__tagline">{SITE.tagline}</p>
      <p className="finale__lead reveal">
        Come hungry. Leave a little bit <Marker tone="yellow">high on food</Marker>.
      </p>
      <div className="finale__ctas reveal">
        <ExternalLink className="btn btn--yellow" href={SITE.zomatoUrl}>
          Order now
        </ExternalLink>
        <a className="btn btn--cream" href="#menu">
          See the menu
        </a>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} {SITE.name} · {SITE.area} · From the team behind {SITE.family[0]} &amp;{' '}
        {SITE.family[1]}
      </p>
      <nav aria-label="Footer">
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
          <li>
            <a href="#top">Top ↑</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

/** Sticky order pill shown only on small screens. */
export function MobileOrder() {
  return (
    <ExternalLink className="btn btn--purple mobile-order" href={SITE.zomatoUrl}>
      Order on Zomato
    </ExternalLink>
  );
}
