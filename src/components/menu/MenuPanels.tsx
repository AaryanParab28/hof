import { BURGERS, HEAT_LABEL, formatPrice, type Heat, type MenuItem } from '../../data/menu';
import { SITE } from '../../data/site';
import { ExternalLink } from '../ui/ExternalLink';

const MAX_HEAT = 3;

function Price({ price }: { price?: number }) {
  if (price !== undefined) return <span className="menu-price">{formatPrice(price)}</span>;
  return (
    <ExternalLink className="menu-price-link" href={SITE.zomatoUrl}>
      Price on Zomato ↗
    </ExternalLink>
  );
}

function HeatMeter({ heat }: { heat: Heat }) {
  return (
    <span className="menu-heat" role="img" aria-label={`Heat ${heat} of ${MAX_HEAT}: ${HEAT_LABEL[heat]}`}>
      {Array.from({ length: MAX_HEAT }, (_, i) => (
        <i key={i} className={i < heat ? 'is-filled' : undefined} />
      ))}
      <span aria-hidden="true">{HEAT_LABEL[heat]}</span>
    </span>
  );
}

export function BurgerGrid() {
  return (
    <div className="menu-burgers">
      {BURGERS.map((b) => (
        <article key={b.name} className={`menu-burger menu-burger--${b.swatch} reveal`}>
          <span className="menu-burger__badge">{b.badge}</span>
          <img className="menu-burger__img" src={b.image} alt={b.alt} loading="lazy" width={900} height={800} />
          <h3>{b.name}</h3>
          <p>{b.description}</p>
          <div className="menu-burger__row">
            <HeatMeter heat={b.heat} />
            <Price price={b.price} />
          </div>
        </article>
      ))}
    </div>
  );
}

export function ItemList({ items }: { items: readonly MenuItem[] }) {
  return (
    <ul className="menu-list">
      {items.map((item) => (
        <li key={item.name} className="menu-item">
          <span className={`menu-item__icon swatch--${item.swatch}`} aria-hidden="true">
            <img src={item.icon} alt="" />
          </span>
          <div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
          <Price price={item.price} />
        </li>
      ))}
    </ul>
  );
}
