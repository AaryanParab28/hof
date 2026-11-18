import { useRef, useState, type KeyboardEvent } from 'react';
import { MENU_LISTS } from '../../data/menu';
import { SITE } from '../../data/site';
import { nextTabIndex } from '../../lib/tabs';
import { ExternalLink } from '../ui/ExternalLink';
import { BurgerGrid, ItemList } from './MenuPanels';
import './menu.css';

const BURGERS_TAB = { id: 'burgers', label: 'Burgers' };
const TABS = [BURGERS_TAB, ...MENU_LISTS.map(({ id, label }) => ({ id, label }))];

function Wave() {
  return (
    <svg className="menu-wave" viewBox="0 0 1440 46" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 46 V20 Q30 0 60 20 T120 20 T180 20 T240 20 T300 20 T360 20 T420 20 T480 20 T540 20 T600 20 T660 20 T720 20 T780 20 T840 20 T900 20 T960 20 T1020 20 T1080 20 T1140 20 T1200 20 T1260 20 T1320 20 T1380 20 T1440 20 V46 Z" />
    </svg>
  );
}

export function Menu() {
  const [active, setActive] = useState(BURGERS_TAB.id);
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
      <section className="menu" id="menu" aria-labelledby="menu-heading">
        <div className="menu__top">
          <h2 className="disp reveal" id="menu-heading">
            The
            <br />
            <span className="outline outline--purple">Menu</span>
          </h2>
          <div className="reveal">
            <p className="whisper menu__whisper">Short menu. No filler.</p>
            <p className="menu__note">
              Three burgers, a few sides worth fighting over, and something cold to wash it down. Live prices and
              the full menu are on{' '}
              <ExternalLink href={SITE.zomatoUrl}>Zomato ↗</ExternalLink>.
            </p>
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

        <div
          role="tabpanel"
          id={`panel-${BURGERS_TAB.id}`}
          aria-labelledby={`tab-${BURGERS_TAB.id}`}
          hidden={active !== BURGERS_TAB.id}
        >
          <BurgerGrid />
        </div>
        {MENU_LISTS.map((category) => (
          <div
            key={category.id}
            role="tabpanel"
            id={`panel-${category.id}`}
            aria-labelledby={`tab-${category.id}`}
            hidden={active !== category.id}
          >
            <ItemList items={category.items} />
          </div>
        ))}
      </section>
    </>
  );
}
