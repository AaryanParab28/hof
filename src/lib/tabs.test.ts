import { describe, expect, test } from 'vitest';
import { nextTabIndex } from './tabs';

describe('nextTabIndex', () => {
  test('ArrowRight moves forward and wraps to the first tab', () => {
    expect(nextTabIndex('ArrowRight', 0, 4)).toBe(1);
    expect(nextTabIndex('ArrowRight', 3, 4)).toBe(0);
  });

  test('ArrowLeft moves back and wraps to the last tab', () => {
    expect(nextTabIndex('ArrowLeft', 2, 4)).toBe(1);
    expect(nextTabIndex('ArrowLeft', 0, 4)).toBe(3);
  });

  test('Home and End jump to the ends', () => {
    expect(nextTabIndex('Home', 2, 4)).toBe(0);
    expect(nextTabIndex('End', 1, 4)).toBe(3);
  });

  test('returns null for keys the tablist does not handle', () => {
    expect(nextTabIndex('Enter', 1, 4)).toBeNull();
    expect(nextTabIndex('a', 1, 4)).toBeNull();
  });
});
