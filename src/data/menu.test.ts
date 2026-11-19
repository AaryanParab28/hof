import { describe, expect, test } from 'vitest';
import { MENU_LISTS, formatPrice } from './menu';

const byId = (id: string) => {
  const category = MENU_LISTS.find((c) => c.id === id);
  if (!category) throw new Error(`Missing menu category: ${id}`);
  return category;
};

const prices = (id: string) => byId(id).items.map((i) => [i.name, i.price]);
const diets = (id: string) => byId(id).items.map((i) => i.diet);

describe('menu data matches the printed menu (11 August, all eight slides)', () => {
  test('has the six printed categories, in order', () => {
    expect(MENU_LISTS.map((c) => c.label)).toEqual([
      'Burgers',
      'Wraps',
      'Fries',
      'Salad Bowls',
      'Pookies',
      'Beverages',
    ]);
  });

  test('burgers', () => {
    expect(prices('burgers')).toEqual([
      ['Jalepeno Smash Melt', 299],
      ['Seoul Fried Boss', 299],
      ['Lebanese Legend', 299],
      ['Melted Majesty', 299],
      ['Truffle Tease', 369],
      ['Banarasi Aloo Tikki', 229],
      ['Corn Crown', 259],
    ]);
    expect(diets('burgers')).toEqual(['non-veg', 'non-veg', 'non-veg', 'non-veg', 'veg', 'veg', 'veg']);
  });

  test('wraps', () => {
    expect(prices('wraps')).toEqual([
      ['Dragon Chicken Roll', 289],
      ["Sultan's Garlic Chicken Roll", 289],
      ['Bombay Tawa Chicken Roll', 289],
      ['Nizam Street King Kathi Roll', 289],
      ['Mumbai Lava Paneer Roll', 249],
      ['Crunch Dynasty Roll', 229],
      ['Crown Kofta Roll', 229],
      ['Arbi Kakori Roll', 229],
      ['Royal Garlic Cheese Fries Roll', 229],
    ]);
    expect(diets('wraps')).toEqual(['non-veg', 'non-veg', 'non-veg', 'non-veg', 'veg', 'veg', 'veg', 'veg', 'veg']);
  });

  test('fries, with the dine-in combo', () => {
    expect(prices('fries')).toEqual([
      ['Big Bite Loaded Fries', 239],
      ['Angry Bird Fries', 219],
      ['Korean Fries', 199],
      ['Nachos Cheese Fries', 199],
    ]);
    expect(diets('fries')).toEqual(['non-veg', 'veg', 'veg', 'veg']);
    expect(byId('fries').note).toContain('₹279');
    expect(byId('fries').note).toMatch(/dine-in/i);
  });

  test('salad bowls', () => {
    expect(prices('salads')).toEqual([
      ['Creamy Grill Chicken Protein Bowl', 369],
      ['Sprout Makhana Chaat Bowl', 349],
      ['Butter Garlic Corn Bowl', 349],
      ['Crispy Chickpeas Bombay Bowl', 349],
    ]);
    expect(byId('salads').items[0].diet).toBe('non-veg');
    expect(
      byId('salads')
        .items.slice(1)
        .every((i) => i.diet === 'veg'),
    ).toBe(true);
  });

  test('pookies', () => {
    expect(prices('pookies')).toEqual([
      ['Melt Me Red', 279],
      ['White Gold', 279],
      ['Caramel Craze', 269],
      ['Naughty Nutella', 269],
      ['Midnight Melt', 239],
      ['Chunky Monkey', 239],
    ]);
  });

  test('beverages', () => {
    expect(prices('beverages')).toEqual([
      ['Oreo Shake', 229],
      ['Chocolate Milkshake', 209],
      ['Cold Coffee', 209],
      ['Green Glow Juice', 149],
    ]);
  });

  test('stickers sit on the same items as the printed menu', () => {
    const tagged = MENU_LISTS.flatMap((c) => c.items.filter((i) => i.tag).map((i) => [i.name, i.tag]));
    expect(tagged).toEqual([
      ['Jalepeno Smash Melt', 'Top pick'],
      ['Seoul Fried Boss', 'Top pick'],
      ['Truffle Tease', 'New'],
      ['Dragon Chicken Roll', 'Top pick'],
      ["Sultan's Garlic Chicken Roll", 'Team fav'],
      ['Mumbai Lava Paneer Roll', 'Top pick'],
      ['Big Bite Loaded Fries', 'Top pick'],
      ['Angry Bird Fries', 'Top pick'],
      ['Nachos Cheese Fries', 'Team fav'],
      ['Butter Garlic Corn Bowl', 'Team fav'],
      ['White Gold', 'Team fav'],
      ['Caramel Craze', 'Top pick'],
      ['Oreo Shake', 'Top pick'],
      ['Cold Coffee', 'Top pick'],
    ]);
  });

  test('every item has a description and a positive whole-rupee price, and names are unique', () => {
    const items = MENU_LISTS.flatMap((c) => c.items);
    items.forEach((i) => {
      expect(i.description.length).toBeGreaterThan(10);
      expect(Number.isInteger(i.price)).toBe(true);
      expect(i.price).toBeGreaterThan(0);
    });
    expect(new Set(items.map((i) => i.name)).size).toBe(items.length);
  });
});

describe('formatPrice', () => {
  test('formats whole rupees', () => {
    expect(formatPrice(249)).toBe('₹249');
    expect(formatPrice(1299)).toBe('₹1,299');
  });
});
