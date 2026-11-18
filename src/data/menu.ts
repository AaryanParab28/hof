import sunlit from '../assets/photos/sunlit-cutout.webp';
import nightCrunch from '../assets/photos/night-crunch-cutout.webp';
import goldenStack from '../assets/photos/golden-stack-cutout.webp';
import burst from '../assets/deco/burst-orange.svg';
import starPurple from '../assets/deco/star-purple.svg';
import sparkle from '../assets/deco/sparkle-yellow.svg';
import splashOrange from '../assets/deco/splash-orange.svg';
import splashGreen from '../assets/deco/splash-green.svg';
import cluster from '../assets/deco/sparkle-cluster-purple.svg';

export type Swatch = 'yellow' | 'purple' | 'orange' | 'green' | 'cream';
export type Heat = 1 | 2 | 3;

export interface Burger {
  name: string;
  description: string;
  image: string;
  alt: string;
  badge: string;
  swatch: Exclude<Swatch, 'green' | 'cream'>;
  heat: Heat;
  /** Price in ₹. Leave undefined until confirmed; the card links to Zomato instead. */
  price?: number;
}

export interface MenuItem {
  name: string;
  description: string;
  icon: string;
  swatch: Swatch;
  price?: number;
}

export interface MenuCategory {
  id: string;
  label: string;
  items: readonly MenuItem[];
}

export const BURGERS: readonly Burger[] = [
  {
    name: 'The Sunlit',
    description:
      "Wide crispy fillet that won't fit the bun, cheddar, green herb mayo, pickled onion, leaf lettuce, sesame milk bun.",
    image: sunlit,
    alt: 'The Sunlit burger',
    badge: '★ Signature',
    swatch: 'yellow',
    heat: 1,
  },
  {
    name: 'Night Crunch',
    description:
      'Chilli-glazed fried chicken, crunchy slaw, jalapeños, melted white cheese and spicy mayo on a toasted potato bun.',
    image: nightCrunch,
    alt: 'The Night Crunch burger',
    badge: 'Hot one',
    swatch: 'purple',
    heat: 3,
  },
  {
    name: 'Golden Stack',
    description:
      'Thick buttermilk-fried thigh, cheddar, tomato, pickles, shredded lettuce and peppery mayo on a glossy brioche.',
    image: goldenStack,
    alt: 'The Golden Stack burger',
    badge: 'The classic',
    swatch: 'orange',
    heat: 1,
  },
];

export const HEAT_LABEL: Record<Heat, string> = { 1: 'Mild', 2: 'Medium', 3: 'Hot' };

export const MENU_LISTS: readonly MenuCategory[] = [
  {
    id: 'sides',
    label: 'Sides',
    items: [
      { name: 'Loaded cheese fries', description: 'Crinkle fries, cheese sauce, crispy chicken bits, spring onion.', icon: burst, swatch: 'yellow' },
      { name: 'Peri-peri fries', description: 'Dusted hot, served with garlic dip.', icon: starPurple, swatch: 'orange' },
      { name: 'Crispy chicken strips', description: 'Three or six, with your pick of house sauce.', icon: sparkle, swatch: 'purple' },
      { name: 'Popcorn chicken', description: 'Bite-size, shake-on spice, gone in minutes.', icon: splashOrange, swatch: 'green' },
    ],
  },
  {
    id: 'drinks',
    label: 'Shakes & coolers',
    items: [
      { name: 'Biscoff shake', description: 'Thick enough to need a spoon.', icon: cluster, swatch: 'cream' },
      { name: 'Cold coffee', description: 'Mumbai-style, frothy, sweet, non-negotiable.', icon: starPurple, swatch: 'orange' },
      { name: 'Mint lemon cooler', description: 'Cuts through the crunch. Order two.', icon: sparkle, swatch: 'green' },
      { name: 'Lemon iced tea', description: 'Bright, cold, refillable mood.', icon: splashGreen, swatch: 'yellow' },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    items: [
      { name: 'Brownie sundae', description: 'Warm brownie, cold ice cream, hot fudge.', icon: burst, swatch: 'purple' },
      { name: 'Choco-chip cookie', description: 'Gooey middle, crisp edge. Ask for it warm.', icon: cluster, swatch: 'yellow' },
    ],
  },
];

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}
