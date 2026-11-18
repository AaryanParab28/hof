import sparkle from './assets/deco/sparkle-yellow.svg';
import star from './assets/deco/star-orange.svg';
import { Assembly } from './components/assembly/Assembly';
import { CravingMachine } from './components/craving/CravingMachine';
import { Definition } from './components/definition/Definition';
import { Finale, MobileOrder, SiteFooter } from './components/finale/Finale';
import { Hero } from './components/hero/Hero';
import { HouseRules } from './components/house-rules/HouseRules';
import { Loader } from './components/loader/Loader';
import { Marquee, type MarqueeWord } from './components/marquee/Marquee';
import { Menu } from './components/menu/Menu';
import { Nav } from './components/nav/Nav';
import { Story } from './components/story/Story';
import { Visit } from './components/visit/Visit';
import { useRevealOnScroll } from './hooks/useRevealOnScroll';

const HYPE_WORDS: readonly MarqueeWord[] = [
  { text: 'Crispy' },
  { text: 'Saucy', outline: true },
  { text: 'Loaded' },
  { text: 'High on food', outline: true },
  { text: 'Goregaon East' },
];

const PROMISE_WORDS: readonly MarqueeWord[] = [
  { text: 'Fried to order' },
  { text: 'No shortcuts', outline: true },
  { text: 'Extra sauce' },
  { text: 'Always', outline: true },
];

export function App() {
  useRevealOnScroll();

  return (
    <>
      <Loader />
      <Nav />
      <main id="top">
        <Hero />
        <Marquee words={HYPE_WORDS} icon={sparkle} />
        <Definition />
        <Assembly />
        <Marquee words={PROMISE_WORDS} icon={star} variant="ink" />
        <HouseRules />
        <Menu />
        <CravingMachine />
        <Story />
        <Visit />
        <Finale />
      </main>
      <SiteFooter />
      <MobileOrder />
    </>
  );
}
