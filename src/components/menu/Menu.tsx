import { useRef, useState, type KeyboardEvent } from 'react';
import { MENU_LISTS } from '../../data/menu';
import { SITE } from '../../data/site';
import { nextTabIndex } from '../../lib/tabs';
import { ExternalLink } from '../ui/ExternalLink';
import { Halftone } from '../ui/Halftone';
import { Marker } from '../ui/Marker';
import { MaskedLines } from '../ui/MaskedLines';
import { BurgerGrid, ItemList } from './MenuPanels';
import './menu.css';

/**
 * Burgers show as a plain list until the real burger photos arrive. Flip to true to bring
 * back the photo cards (after giving BURGERS in data/menu.ts the real burgers and photos).
 */
const SHOW_BURGER_PHOTOS = false;
const BURGERS_ID = 'burgers';
const TABS = MENU_LISTS.map(({ id, label }) => ({ id, label }));

function Wave() {
  return (
    <svg className="menu-wave" viewBox="0 0 1440 46" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 46 V20 Q30 0 60 20 T120 20 T180 20 T240 20 T300 20 T360 20 T420 20 T480 20 T540 20 T600 20 T660 20 T720 20 T780 20 T840 20 T900 20 T960 20 T1020 20 T1080 20 T1140 20 T1200 20 T1260 20 T1320 20 T1380 20 T1440 20 V46 Z" />
    </svg>
  );
}

export function Menu() {
  const [active, setActive] = useState(TABS[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = nextTabIndex(e.key, index, TABS.length);
    if (next === null) return;
    e.preventDefault();
    setActive(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <Wave />
      <section className="menu grain grain--soft" id="menu" aria-labelledby="menu-heading">
        <Halftone tone="orange" className="menu__halftone" />
        <div className="menu__top">
          <h2 className="disp reveal-lines" id="menu-heading">
            <MaskedLines lines={['The', <span className="outline outline--purple">Menu</span>]} />
          </h2>
          <div className="reveal">
            <p className="whisper menu__whisper">
              Short menu. <Marker>No filler.</Marker>
            </p>
            <p className="menu__note">
              Loaded fries, burgers, wraps, combos, salad bowls, gooey Pookies and thick shakes to wash it down. Order
              it all on <ExternalLink href={SITE.zomatoUrl}>Zomato ↗</ExternalLink>.
            </p>
            <p className="menu__halal">We only serve halal meat.</p>
          </div>
        </div>

        <div className="menu__tabs" role="tablist" aria-label="Menu categories">
          {TABS.map((tab, i) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {MENU_LISTS.map((category) => (
          <div
            key={category.id}
            className="menu__panel"
            role="tabpanel"
            id={`panel-${category.id}`}
            aria-labelledby={`tab-${category.id}`}
            hidden={active !== category.id}
          >
            {SHOW_BURGER_PHOTOS && category.id === BURGERS_ID ? <BurgerGrid /> : <ItemList category={category} />}
          </div>
        ))}
      </section>
    </>
  );
}
