import { describe, expect, test } from 'vitest';
import { MENU_LISTS, formatPrice } from './menu';

const byId = (id: string) => {
  const category = MENU_LISTS.find((c) => c.id === id);
  if (!category) throw new Error(`Missing menu category: ${id}`);
  return category;
};

const prices = (id: string) =>
  byId(id).items.map((i) => [i.name, i.price ?? i.options?.map((o) => `${o.label} ${o.price}`).join(' / ')]);
const diets = (id: string) => byId(id).items.map((i) => i.diet);

const FRIES_OPTIONS = 'Veg 240 / Non-veg 303';
const BOWL_OPTIONS = 'Paneer 303 / Egg 330 / Chicken 330';

describe('menu data matches the printed 2026 A4 menu', () => {
  test('has the printed categories in order, with combos on their own tab', () => {
    expect(MENU_LISTS.map((c) => c.label)).toEqual([
      'Fries',
      'Burgers',
      'Wraps',
      'Combos',
      'Salad Bowls',
      'Beverages',
      'Pookies',
      'Add ons',
    ]);
  });

  test('fries', () => {
    expect(prices('fries')).toEqual([
      ['Big Bite Loaded Fries', 303],
      ['Angry Bird Fries', 222],
      ['Nachos Cheese Fries', 222],
      ['Magic Fries', FRIES_OPTIONS],
      ['Mac Daddy Fries', FRIES_OPTIONS],
      ['Cheesy Margarita Fries', FRIES_OPTIONS],
    ]);
    expect(diets('fries')).toEqual(['non-veg', 'veg', 'veg', undefined, undefined, undefined]);
  });

  test('burgers', () => {
    expect(prices('burgers')).toEqual([
      ['Jalepeno Smash Melt', 321],
      ['The Ghostfather', 321],
      ["Chop N' Cheese", 321],
      ['Tokyo Heatwave', 321],
      ['Smoky Teriyaki Crunch', 321],
      ['Melted Majesty', 321],
      ['Truffle Tease', 402],
      ['Velique Paneer', 330],
      ['Parsi Jalapeño Royal', 240],
      ['Banarasi Aloo Tikki', 240],
    ]);
    expect(diets('burgers')).toEqual([...Array(6).fill('non-veg'), ...Array(4).fill('veg')]);
  });

  test('wraps', () => {
    expect(prices('wraps')).toEqual([
      ['Dragon Chicken Roll', 303],
      ["Sultan's Garlic Chicken Roll", 303],
      ['Crunchzilla Roll', 303],
      ['Caesar Royale Roll', 303],
      ['Bombay Tawa Chicken Roll', 303],
      ['Mumbai Lava Paneer Roll', 240],
      ['Crunch Dynasty Roll', 240],
      ['Falafel Fiesta', 240],
    ]);
    expect(diets('wraps')).toEqual([...Array(5).fill('non-veg'), ...Array(3).fill('veg')]);
  });

  test('combos', () => {
    expect(prices('combos')).toEqual([
      ['The Highness Classic', 699],
      ['The Double Trouble', 1299],
      ['The Truffle Highness', 799],
      ['The Roll Royale', 679],
      ['The Veg Royal', 629],
    ]);
    expect(diets('combos')).toEqual(['non-veg', 'non-veg', 'veg', 'non-veg', 'veg']);
  });

  test('salad bowls', () => {
    expect(prices('salads')).toEqual([
      ['Creamy Grill Protein Bowl', BOWL_OPTIONS],
      ['Crunchy Caesar Bowl', BOWL_OPTIONS],
      ['Ranch Royale Bowl', BOWL_OPTIONS],
      ['Butter Garlic Corn Bowl', 330],
    ]);
  });

  test('beverages', () => {
    expect(prices('beverages')).toEqual([
      ['Oreo Madness', 231],
      ['Midnight Chocolate', 231],
      ['Hazelnut Frost', 231],
      ['Salted Caramel Bliss', 231],
      ['Biscoff Royale', 231],
    ]);
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

  test('add ons', () => {
    expect(prices('add-ons')).toEqual([
      ['Choice of Sauce', 29],
      ['Cheese', 39],
      ['Veg Patty', 99],
      ['Egg', 45],
      ['Grilled Chicken', 109],
      ['Fried Chicken', 109],
      ['Non-veg Patty', 139],
    ]);
    expect(diets('add-ons')).toEqual(['veg', 'veg', 'veg', 'egg', 'non-veg', 'non-veg', 'non-veg']);
  });

  test('stickers sit on the same items as the printed menu', () => {
    const tagged = MENU_LISTS.flatMap((c) => c.items.filter((i) => i.tag).map((i) => [i.name, i.tag]));
    expect(tagged).toEqual([
      ['Big Bite Loaded Fries', 'Top pick'],
      ['Angry Bird Fries', 'Top pick'],
      ['Nachos Cheese Fries', 'Highness fav'],
      ['Magic Fries', 'New drop'],
      ['Mac Daddy Fries', 'New drop'],
      ['Cheesy Margarita Fries', 'New drop'],
      ['The Ghostfather', 'New drop'],
      ["Chop N' Cheese", 'New drop'],
      ['Tokyo Heatwave', 'New drop'],
      ['Melted Majesty', 'Cheesy'],
      ['Truffle Tease', 'Top pick'],
      ['Velique Paneer', 'New drop'],
      ['Parsi Jalapeño Royal', 'New drop'],
      ['Dragon Chicken Roll', 'Top pick'],
      ['Crunchzilla Roll', 'New drop'],
      ['Caesar Royale Roll', 'New drop'],
      ['Mumbai Lava Paneer Roll', 'Top pick'],
      ['Falafel Fiesta', 'New drop'],
      ['Creamy Grill Protein Bowl', 'Highness fav'],
      ['Oreo Madness', 'Top pick'],
      ['Midnight Chocolate', 'New drop'],
      ['Hazelnut Frost', 'New drop'],
      ['Salted Caramel Bliss', 'New drop'],
      ['Biscoff Royale', 'New drop'],
      ['Melt Me Red', 'Highness fav'],
      ['Caramel Craze', 'Top pick'],
    ]);
  });

  test('every item has exactly one way to show a positive whole-rupee price, and names are unique', () => {
    const items = MENU_LISTS.flatMap((c) => c.items);
    items.forEach((i) => {
      const all = i.options ? i.options.map((o) => o.price) : [i.price];
      expect(i.price === undefined || i.options === undefined).toBe(true);
      all.forEach((p) => {
        expect(Number.isInteger(p)).toBe(true);
        expect(p).toBeGreaterThan(0);
      });
    });
    expect(new Set(items.map((i) => i.name)).size).toBe(items.length);
  });

  test('every dish outside add ons has a description', () => {
    MENU_LISTS.filter((c) => c.id !== 'add-ons')
      .flatMap((c) => c.items)
      .forEach((i) => expect(i.description?.length).toBeGreaterThan(10));
  });
});

describe('formatPrice', () => {
  test('formats whole rupees', () => {
    expect(formatPrice(249)).toBe('₹249');
    expect(formatPrice(1299)).toBe('₹1,299');
  });
});
