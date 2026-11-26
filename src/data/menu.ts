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
export type Diet = 'veg' | 'non-veg' | 'egg';
export type MenuTag = 'Top pick' | 'Highness fav' | 'New drop' | 'Cheesy';

/** One of several printed prices for the same dish, e.g. "Veg ₹240 / Non-veg ₹303". */
export interface PriceOption {
  label: string;
  price: number;
}

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
  /** Add-ons are printed without one. */
  description?: string;
  /** Price in whole ₹. Undefined (with no options) shows a "Price on Zomato" link instead. */
  price?: number;
  /** Used instead of `price` when the menu prints several prices for one dish. */
  options?: readonly PriceOption[];
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

/** Fries that come in both a veg and a non-veg (red-priced) version. */
const VEG_NON_VEG_FRIES: readonly PriceOption[] = [
  { label: 'Veg', price: 240 },
  { label: 'Non-veg', price: 303 },
];

/** Salad bowls with a choice of protein. */
const BOWL_PROTEIN: readonly PriceOption[] = [
  { label: 'Paneer', price: 303 },
  { label: 'Egg', price: 330 },
  { label: 'Chicken', price: 330 },
];

/** Transcribed from the 2026 Highness A4 menu (Fries through Add ons, combos lifted onto their own tab). */
export const MENU_LISTS: readonly MenuCategory[] = [
  {
    id: 'fries',
    label: 'Fries',
    icon: burstOrange,
    swatch: 'yellow',
    items: [
      {
        name: 'Big Bite Loaded Fries',
        description:
          'Crispy golden fries, crispy chicken bites, mozzarella cheese, cheddar cheese sauce, signature sauces, jalapeño cheese ball.',
        price: 303,
        diet: 'non-veg',
        tag: 'Top pick',
      },
      {
        name: 'Angry Bird Fries',
        description: 'Crispy golden fries, five signature sauces, jalapeño cheese ball.',
        price: 222,
        diet: 'veg',
        tag: 'Top pick',
      },
      {
        name: 'Nachos Cheese Fries',
        description: 'Crispy golden fries, creamy nacho cheese sauce, avocado salsa mayo.',
        price: 222,
        diet: 'veg',
        tag: 'Highness fav',
      },
      {
        name: 'Magic Fries',
        description:
          'Crispy fried Maggi loaded with our signature cheesy blend sauce and a spicy hot sauce kick. A magical mix of crunch, cheese and heat!',
        options: VEG_NON_VEG_FRIES,
        tag: 'New drop',
      },
      {
        name: 'Mac Daddy Fries',
        description:
          "Golden crispy fries loaded with rich, creamy mac and cheese, smothered in cheesy goodness. A double-carb, double-cheese attack you won't forget!",
        options: VEG_NON_VEG_FRIES,
        tag: 'New drop',
      },
      {
        name: 'Cheesy Margarita Fries',
        description:
          'Crispy golden fries topped with rich pizza sauce, melted mozzarella and cheddar cheese, baked to bubbly, cheesy perfection.',
        options: VEG_NON_VEG_FRIES,
        tag: 'New drop',
      },
    ],
  },
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
        price: 321,
        diet: 'non-veg',
      },
      {
        name: 'The Ghostfather',
        description:
          'Two fiery Bhut Jolokia chicken smash patties, melted cheddar, egg patty and fresh onions, stacked in a toasted herb bun. Bold, cheesy and dangerously spicy.',
        price: 321,
        diet: 'non-veg',
        tag: 'New drop',
      },
      {
        name: "Chop N' Cheese",
        description:
          'Juicy chopped chicken, melted cheese and a perfectly cooked egg, smothered in rich cheddar sauce and stacked in a toasted burger bun. Messy, cheesy and absolutely irresistible.',
        price: 321,
        diet: 'non-veg',
        tag: 'New drop',
      },
      {
        name: 'Tokyo Heatwave',
        description:
          'Crispy fried chicken patty glazed with our signature Tokyo Smoke BBQ sauce, layered with fiery jalapeño sauce and tucked inside a toasted bun. Sweet, smoky, spicy and seriously addictive.',
        price: 321,
        diet: 'non-veg',
        tag: 'New drop',
      },
      {
        name: 'Smoky Teriyaki Crunch',
        description:
          'Crispy fried chicken coated in fiery peri-peri seasoning, drizzled with smoky garlic and signature teriyaki sauce. A delicious collision of spice, smoke and sweet-savoury goodness.',
        price: 321,
        diet: 'non-veg',
      },
      {
        name: 'Melted Majesty',
        description: 'Crispy fried chicken, cheddar cheese, blended cheese sauce, coleslaw, brioche bun.',
        price: 321,
        diet: 'non-veg',
        tag: 'Cheesy',
      },
      {
        name: 'Truffle Tease',
        description:
          'Crisp fried patty, caramelised forest mushrooms, mozzarella cheese, velvety white truffle aioli, melted smoked mozzarella, brioche bun.',
        price: 402,
        diet: 'veg',
        tag: 'Top pick',
      },
      {
        name: 'Velique Paneer',
        description:
          "Two slabs of juicy malai paneer, fiery bird's eye chilli sauce, zesty lime, caramelised onions and a mozzarella-cheddar melt. Creamy, spicy and royally indulgent.",
        price: 330,
        diet: 'veg',
        tag: 'New drop',
      },
      {
        name: 'Parsi Jalapeño Royal',
        description:
          'A crispy cheese-and-jalapeño potato patty layered with fiery chilli-garlic sauce, creamy cheese sauce and crunchy fried onions, tucked into a buttery brioche bun. A royal twist on comfort food.',
        price: 240,
        diet: 'veg',
        tag: 'New drop',
      },
      {
        name: 'Banarasi Aloo Tikki',
        description: 'Crispy aloo tikki, tangy chutneys, cucumber, tomatoes, brioche bun.',
        price: 240,
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
        price: 303,
        diet: 'non-veg',
        tag: 'Top pick',
      },
      {
        name: "Sultan's Garlic Chicken Roll",
        description: 'Arabic-spiced chicken, creamy garlic mayo, onion, cucumber, pickles, herbs, soft tortilla wrap.',
        price: 303,
        diet: 'non-veg',
      },
      {
        name: 'Crunchzilla Roll',
        description:
          'Crispy fried chicken, creamy cheese sauce, fresh lettuce and fiery signature sauce, wrapped in your choice of bread. Crunchy, cheesy and seriously addictive.',
        price: 303,
        diet: 'non-veg',
        tag: 'New drop',
      },
      {
        name: 'Caesar Royale Roll',
        description:
          'Double-egg-loaded Malabar paratha paired with fresh, creamy Caesar salad. A royal twist on the classic egg roll!',
        price: 303,
        diet: 'non-veg',
        tag: 'New drop',
      },
      {
        name: 'Bombay Tawa Chicken Roll',
        description:
          'Tender tawa chicken, Mumbai masala, onions, capsicum, mint chutney, spicy mayo, fresh coriander, Malabar paratha.',
        price: 303,
        diet: 'non-veg',
      },
      {
        name: 'Mumbai Lava Paneer Roll',
        description:
          'Tandoori paneer, green thecha, onion, capsicum, mint mayo, mozzarella cheese, choice of bread.',
        price: 240,
        diet: 'veg',
        tag: 'Top pick',
      },
      {
        name: 'Crunch Dynasty Roll',
        description:
          'Veg Manchurian balls, dragon sauce, onion, capsicum, spring onions, Asian sesame sauce, spicy mayo, soft tortilla wrap.',
        price: 240,
        diet: 'veg',
      },
      {
        name: 'Falafel Fiesta',
        description:
          'Crispy falafel with fresh cucumber, lettuce and tomatoes, drizzled with creamy tahini and garlic sauce. A fresh Lebanese-style delight.',
        price: 240,
        diet: 'veg',
        tag: 'New drop',
      },
    ],
  },
  {
    id: 'combos',
    label: 'Combos',
    icon: sparkle,
    swatch: 'orange',
    items: [
      {
        name: 'The Highness Classic',
        description: 'Any ₹321 chicken burger + Angry Bird Fries + any milkshake.',
        price: 699,
        diet: 'non-veg',
      },
      {
        name: 'The Double Trouble',
        description: 'Any two ₹321 chicken burgers + Big Bite Loaded Fries + two milkshakes.',
        price: 1299,
        diet: 'non-veg',
      },
      {
        name: 'The Truffle Highness',
        description: 'Truffle Tease Burger + Nachos Cheese Fries + any milkshake.',
        price: 799,
        diet: 'veg',
      },
      {
        name: 'The Roll Royale',
        description: 'Any ₹303 chicken roll + Angry Bird Fries + any milkshake.',
        price: 679,
        diet: 'non-veg',
      },
      {
        name: 'The Veg Royal',
        description: 'Any ₹240 veg burger or veg roll + Angry Bird Fries + any milkshake.',
        price: 629,
        diet: 'veg',
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
        name: 'Creamy Grill Protein Bowl',
        description:
          'Grilled protein, hung curd, creamy mayo dressing, lettuce, cucumber, sweet corn, herbs, cracked pepper.',
        options: BOWL_PROTEIN,
        tag: 'Highness fav',
      },
      {
        name: 'Crunchy Caesar Bowl',
        description:
          'Fresh lettuce and cucumber tossed in our creamy Caesar dressing, finished with crispy golden breadcrumbs and your choice of protein. Fresh, creamy and satisfyingly crunchy.',
        options: BOWL_PROTEIN,
      },
      {
        name: 'Ranch Royale Bowl',
        description:
          'Fresh-cut vegetables and crunchy sprouts tossed in our signature creamy ranch dressing, topped with your choice of protein. A refreshing, wholesome bowl packed with flavour.',
        options: BOWL_PROTEIN,
      },
      {
        name: 'Butter Garlic Corn Bowl',
        description: 'Sweet corn, butter garlic seasoning, parsley, cracked pepper, herbs, chilli flakes.',
        price: 330,
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
        name: 'Oreo Madness',
        description:
          'Thick, creamy milkshake blended with crunchy Oreo cookies for the ultimate chocolatey, cookies-and-cream indulgence. Pure happiness in every sip.',
        price: 231,
        tag: 'Top pick',
      },
      {
        name: 'Midnight Chocolate',
        description:
          'Thick, creamy milkshake blended with rich dark chocolate for an indulgent, deep chocolate hit in every sip.',
        price: 231,
        tag: 'New drop',
      },
      {
        name: 'Hazelnut Frost',
        description:
          'Chilled, creamy coffee blended with rich hazelnut flavour, delivering the perfect balance of nutty sweetness and refreshing coffee goodness.',
        price: 231,
        tag: 'New drop',
      },
      {
        name: 'Salted Caramel Bliss',
        description:
          'Creamy, buttery caramel blended with a hint of sea salt for the perfect balance of sweet, salty and indulgent.',
        price: 231,
        tag: 'New drop',
      },
      {
        name: 'Biscoff Royale',
        description:
          'Thick, creamy milkshake blended with rich Biscoff spread and crunchy caramelised biscuit goodness. Pure indulgence in every sip!',
        price: 231,
        tag: 'New drop',
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
        tag: 'Highness fav',
      },
      {
        name: 'White Gold',
        description: 'Buttery cookie filled with silky white chocolate and luscious sea salt caramel.',
        price: 279,
        diet: 'veg',
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
    id: 'add-ons',
    label: 'Add ons',
    icon: starPurple,
    swatch: 'green',
    items: [
      { name: 'Choice of Sauce', price: 29, diet: 'veg' },
      { name: 'Cheese', price: 39, diet: 'veg' },
      { name: 'Veg Patty', price: 99, diet: 'veg' },
      { name: 'Egg', price: 45, diet: 'egg' },
      { name: 'Grilled Chicken', price: 109, diet: 'non-veg' },
      { name: 'Fried Chicken', price: 109, diet: 'non-veg' },
      { name: 'Non-veg Patty', price: 139, diet: 'non-veg' },
    ],
  },
];

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}
