import l01 from '../assets/layers/01.webp';
import l02 from '../assets/layers/02.webp';
import l03 from '../assets/layers/03.webp';
import l04 from '../assets/layers/04.webp';
import l05 from '../assets/layers/05.webp';
import l06 from '../assets/layers/06.webp';
import l07 from '../assets/layers/07.webp';

/** Source artboard the layer geometry is measured against. */
export const FRAME = { width: 1696, height: 2528 } as const;

export interface BurgerLayer {
  image: string;
  label: string;
  caption: string;
  /** Exploded-view box on the artboard, in px. */
  left: number;
  top: number;
  width: number;
  height: number;
  /** Artboard y the layer settles at once assembled. */
  landedTop: number;
}

/** Bottom-up build order. */
export const LAYERS: readonly BurgerLayer[] = [
  { image: l07, label: 'Bottom bun', left: 422, top: 1963, width: 867, height: 417, landedTop: 1963, caption: 'A soft milk bun, toasted on the flat-top.' },
  { image: l06, label: 'Leaf lettuce', left: 316, top: 1627, width: 1099, height: 333, landedTop: 1772, caption: 'Ruffled leaf lettuce for the fresh crunch.' },
  { image: l05, label: 'Pickled onion', left: 468, top: 1459, width: 775, height: 176, landedTop: 1748, caption: 'Quick-pickled red onion. Sharp, pink, essential.' },
  { image: l04, label: 'Crispy chicken', left: 220, top: 1126, width: 1280, height: 304, landedTop: 1560, caption: 'The fillet. Wider than the bun, on purpose.' },
  { image: l03, label: 'Cheddar', left: 460, top: 898, width: 779, height: 248, landedTop: 1522, caption: 'Cheddar, softened right over the heat.' },
  { image: l02, label: 'Herb mayo', left: 472, top: 630, width: 757, height: 254, landedTop: 1478, caption: 'Green herb mayo, made in-house. Generously.' },
  { image: l01, label: 'Sesame top', left: 420, top: 247, width: 862, height: 363, landedTop: 1196, caption: 'And the lid. Now say it with us: Highness.' },
];

export const ASSEMBLY_INTRO = "This is a Highness crispy chicken burger. Scroll and we'll build it from the bottom up.";
