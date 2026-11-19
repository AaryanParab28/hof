import sunlit from '../assets/photos/sunlit-cutout.webp';
import nightCrunch from '../assets/photos/night-crunch-cutout.webp';
import goldenStack from '../assets/photos/golden-stack-cutout.webp';
import starPurple from '../assets/deco/star-purple.svg';
import starOrange from '../assets/deco/star-orange.svg';
import sparkle from '../assets/deco/sparkle-yellow.svg';
import splashGreen from '../assets/deco/splash-green.svg';
import cluster from '../assets/deco/sparkle-cluster-purple.svg';
import burstOrange from '../assets/deco/burst-orange.svg';

export type Swatch = 'yellow' | 'purple' | 'orange' | 'green' | 'cream';
export type Heat = 1 | 2 | 3;
export type Diet = 'veg' | 'non-veg';
export type MenuTag = 'Top pick' | 'Team fav' | 'New';

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
  /** Price in whole ₹. Undefined shows a "Price on Zomato" link instead. */
  price?: number;
  diet?: Diet;
  tag?: MenuTag;
}

export interface MenuCategory {
  id: string;
  label: string;
  /** Decorative icon + background shown beside every item in the category. */
  icon: string;
  swatch: Swatch;
  items: readonly MenuItem[];
  /** Offer printed on the category's slide, shown under its list. */
  note?: string;
}

/**
 * Design-sample photo cards from the original mock-up. These are NOT real menu items:
 * the real burgers live in MENU_LISTS. Only used when SHOW_BURGER_PHOTOS is on in Menu.tsx;
 * replace with the real burgers and photos before switching it on.
 */
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

export const HEAT_LABEL: Record<Heat, string> = {
  1: 'Mild',
  2: 'Medium',
  3: 'Hot',
};

/** Transcribed from the Highness menu posted 11 August (all eight slides). */
export const MENU_LISTS: readonly MenuCategory[] = [
  {
    id: 'burgers',
    label: 'Burgers',
    icon: starOrange,
    swatch: 'purple',
    items: [
      {
        name: 'Jalepeno Smash Melt',
        description:
          'Smashed chicken patty, egg patty, cheddar cheese, jalapeños, spicy mayo, caramelised onions, lettuce, herb bun.',
        price: 299,
        diet: 'non-veg',
        tag: 'Top pick',
      },
      {
        name: 'Seoul Fried Boss',
        description: 'Crispy fried chicken, Korean chilli sauce, coleslaw, mayo, lettuce, sesame bun.',
        price: 299,
        diet: 'non-veg',
        tag: 'Top pick',
      },
      {
        name: 'Lebanese Legend',
        description: 'Lebanese patty, hummus, garlic sauce, lettuce, cheddar cheese, herb bun.',
        price: 299,
        diet: 'non-veg',
      },
      {
        name: 'Melted Majesty',
        description: 'Crispy fried chicken, cheddar cheese, blended cheese sauce, coleslaw, brioche bun.',
        price: 299,
        diet: 'non-veg',
      },
      {
        name: 'Truffle Tease',
        description:
          'Crisp fried patty, caramelised forest mushrooms, mozzarella cheese, velvety white truffle aioli, melted smoked mozzarella, brioche bun.',
        price: 369,
        diet: 'veg',
        tag: 'New',
      },
      {
        name: 'Banarasi Aloo Tikki',
        description: 'Crispy aloo tikki, tangy chutneys, onion, tomatoes, brioche bun.',
        price: 229,
        diet: 'veg',
      },
      {
        name: 'Corn Crown',
        description: 'Corn patty, house signature sauce, molten cheese spinach corn, herb bun.',
        price: 259,
        diet: 'veg',
      },
    ],
  },
  {
    id: 'wraps',
    label: 'Wraps',
    icon: starPurple,
    swatch: 'orange',
    items: [
      {
        name: 'Dragon Chicken Roll',
        description:
          'Crispy chicken, dragon sauce, crunchy cabbage, capsicum, onions, spring onions, spicy mayo, soft tortilla wrap.',
        price: 289,
        diet: 'non-veg',
        tag: 'Top pick',
      },
      {
        name: "Sultan's Garlic Chicken Roll",
        description: 'Arabic-spiced chicken, creamy garlic mayo, onion, cucumber, pickles, herbs, soft tortilla wrap.',
        price: 289,
        diet: 'non-veg',
        tag: 'Team fav',
      },
      {
        name: 'Bombay Tawa Chicken Roll',
        description:
          'Tender tawa chicken, Mumbai masala, onions, capsicum, mint chutney, spicy mayo, fresh coriander, soft tortilla wrap.',
        price: 289,
        diet: 'non-veg',
      },
      {
        name: 'Nizam Street King Kathi Roll',
        description:
          'Grilled chicken, egg, Kolkata-style spices, pickled onions, mint chutney, spicy mayo, fresh coriander.',
        price: 289,
        diet: 'non-veg',
      },
      {
        name: 'Mumbai Lava Paneer Roll',
        description:
          'Tandoori paneer, green thecha, onion, capsicum, mint mayo, mozzarella cheese, fresh coriander, soft tortilla wrap.',
        price: 249,
        diet: 'veg',
        tag: 'Top pick',
      },
      {
        name: 'Crunch Dynasty Roll',
        description:
          'Veg Manchurian balls, dragon sauce, onion, capsicum, spring onions, asian sesame sauce, spicy mayo, soft tortilla wrap.',
        price: 229,
        diet: 'veg',
      },
      {
        name: 'Crown Kofta Roll',
        description:
          'Lauki kofta, onion, creamy makhani sauce, mozzarella cheese, fresh coriander, soft tortilla wrap.',
        price: 229,
        diet: 'veg',
      },
      {
        name: 'Arbi Kakori Roll',
        description:
          'Arbi kakori kebabs, pickled onions, cucumber, mint chutney, creamy mayo, fresh coriander, soft tortilla wrap.',
        price: 229,
        diet: 'veg',
      },
      {
        name: 'Royal Garlic Cheese Fries Roll',
        description:
          'Crispy fries, mozzarella cheese, creamy garlic sauce, spinach, herbs, chilli flakes, soft tortilla wrap.',
        price: 229,
        diet: 'veg',
      },
    ],
  },
  {
    id: 'fries',
    label: 'Fries',
    icon: burstOrange,
    swatch: 'yellow',
    note: 'Fries & Sip combo @ ₹279. Dine-in only.',
    items: [
      {
        name: 'Big Bite Loaded Fries',
        description:
          'Crispy golden fries, crispy chicken bites, mozzarella cheese, cheddar cheese sauce, signature sauces, jalapeños, caramelised onions.',
        price: 239,
        diet: 'non-veg',
        tag: 'Top pick',
      },
      {
        name: 'Angry Bird Fries',
        description: 'Crispy golden fries, five signature sauces, melted cheese, jalapeños, chilli flakes.',
        price: 219,
        diet: 'veg',
        tag: 'Top pick',
      },
      {
        name: 'Korean Fries',
        description: 'Crispy golden fries, Korean gochujang sauce, spicy mayo, spring onions, chilli flakes.',
        price: 199,
        diet: 'veg',
      },
      {
        name: 'Nachos Cheese Fries',
        description: 'Crispy golden fries, creamy nacho cheese sauce, jalapeños, herbs.',
        price: 199,
        diet: 'veg',
        tag: 'Team fav',
      },
    ],
  },
  {
    id: 'salads',
    label: 'Salad Bowls',
    icon: splashGreen,
    swatch: 'yellow',
    items: [
      {
        name: 'Creamy Grill Chicken Protein Bowl',
        description:
          'Grilled chicken, hung curd, creamy mayo dressing, lettuce, cucumber, sweet corn, herbs, cracked pepper.',
        price: 369,
        diet: 'non-veg',
      },
      {
        name: 'Sprout Makhana Chaat Bowl',
        description:
          'Sprouted lentils, roasted makhana, cucumber, onion, tomato, coriander, mint chutney, olive oil lemon dressing, chaat masala.',
        price: 349,
        diet: 'veg',
      },
      {
        name: 'Butter Garlic Corn Bowl',
        description: 'Sweet corn, butter garlic seasoning, parsley, cracked pepper, herbs, chilli flakes.',
        price: 349,
        diet: 'veg',
        tag: 'Team fav',
      },
      {
        name: 'Crispy Chickpeas Bombay Bowl',
        description:
          'Crispy masala chickpeas, fresh vegetables, hung curd dressing, Bombay spice blend, coriander, lemon, crunchy garnish.',
        price: 349,
        diet: 'veg',
      },
    ],
  },
  {
    id: 'pookies',
    label: 'Pookies',
    icon: sparkle,
    swatch: 'purple',
    items: [
      {
        name: 'Melt Me Red',
        description: "Soft red velvet cookie with a creamy cheesecake center that's impossible to resist.",
        price: 279,
        diet: 'veg',
      },
      {
        name: 'White Gold',
        description: 'Buttery cookie filled with silky white chocolate and luscious sea salt caramel.',
        price: 279,
        diet: 'veg',
        tag: 'Team fav',
      },
      {
        name: 'Caramel Craze',
        description: 'Buttery cookie with a gooey sea salt caramel center that melts in every bite.',
        price: 269,
        diet: 'veg',
        tag: 'Top pick',
      },
      {
        name: 'Naughty Nutella',
        description: 'Rich, chocolatey cookie overflowing with a molten Nutella filling.',
        price: 269,
        diet: 'veg',
      },
      {
        name: 'Midnight Melt',
        description: 'Intensely chocolatey cookie packed with double chocolate chips for the ultimate cocoa fix.',
        price: 239,
        diet: 'veg',
      },
      {
        name: 'Chunky Monkey',
        description: 'Classic cookie loaded with chunky milk and dark chocolate pieces in every bite.',
        price: 239,
        diet: 'veg',
      },
    ],
  },
  {
    id: 'beverages',
    label: 'Beverages',
    icon: cluster,
    swatch: 'cream',
    items: [
      {
        name: 'Oreo Shake',
        description:
          'Creamy, crunchy and irresistibly delicious, loaded with Oreo goodness and topped with chocolatey indulgence.',
        price: 229,
        tag: 'Top pick',
      },
      {
        name: 'Chocolate Milkshake',
        description: 'Rich, creamy and indulgent, blended with luscious chocolate for the ultimate sweet treat.',
        price: 209,
      },
      {
        name: 'Cold Coffee',
        description: 'Smooth, creamy and refreshingly chilled, with the perfect balance of rich coffee and milk.',
        price: 209,
        tag: 'Top pick',
      },
      {
        name: 'Green Glow Juice',
        description:
          'Refreshing blend of fresh greens and fruits, packed with natural goodness and a vibrant, refreshing flavour.',
        price: 149,
      },
    ],
  },
];

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}
