import type { CSSProperties } from 'react';
import {
  BURGERS,
  HEAT_LABEL,
  formatPrice,
  type Diet,
  type Heat,
  type MenuCategory,
  type MenuItem,
} from '../../data/menu';
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

const DIET_LABEL: Record<Diet, string> = {
  veg: 'Vegetarian',
  'non-veg': 'Non-vegetarian',
  egg: 'Contains egg',
};

/** Single price, or the printed choices ("Paneer ₹303 · Egg ₹330 · …") stacked. */
function ItemPrice({ item }: { item: MenuItem }) {
  if (!item.options?.length) return <Price price={item.price} />;
  return (
    <dl className="menu-price-options">
      {item.options.map((o) => (
        <div key={o.label}>
          <dt>{o.label}</dt>
          <dd className="menu-price">{formatPrice(o.price)}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Indian diet mark: dot in a square (veg), triangle (non-veg), yellow dot (egg, as printed). */
function DietMark({ diet }: { diet: Diet }) {
  return <span className={`diet-mark diet-mark--${diet}`} role="img" aria-label={DIET_LABEL[diet]} />;
}

export function ItemList({ category }: { category: MenuCategory }) {
  return (
    <>
      <ul className="menu-list">
        {category.items.map((item, i) => (
          <li key={item.name} className="menu-item" style={{ '--i': i } as CSSProperties}>
            <span className={`menu-item__icon swatch--${category.swatch}`} aria-hidden="true">
              <img src={category.icon} alt="" />
            </span>
            <div>
              <h3 className="menu-item__name">
                {item.diet && <DietMark diet={item.diet} />}
                <span>{item.name}</span>
                {item.tag && <span className="menu-item__tag">{item.tag}</span>}
              </h3>
              {item.description && <p>{item.description}</p>}
            </div>
            <ItemPrice item={item} />
          </li>
        ))}
      </ul>
      {category.note && <p className="menu-note">{category.note}</p>}
    </>
  );
}
