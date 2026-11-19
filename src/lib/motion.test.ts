import { describe, expect, test } from 'vitest';
import { clamp, easeInOutCubic, layerFrame, lerp, scrollProgress, stepIndex } from './motion';

describe('lerp', () => {
  test('returns the endpoints at t = 0 and t = 1', () => {
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(10, 20, 1)).toBe(20);
  });
  test('interpolates linearly and works for negative ranges', () => {
    expect(lerp(10, 20, 0.25)).toBe(12.5);
    expect(lerp(0, -1, 0.5)).toBe(-0.5);
  });
});

describe('clamp', () => {
  test('keeps values inside the range', () => {
    expect(clamp(5, 0, 1)).toBe(1);
    expect(clamp(-5, 0, 1)).toBe(0);
    expect(clamp(0.4, 0, 1)).toBe(0.4);
  });
});

describe('easeInOutCubic', () => {
  test('pins the endpoints and midpoint', () => {
    expect(easeInOutCubic(0)).toBe(0);
    expect(easeInOutCubic(1)).toBe(1);
    expect(easeInOutCubic(0.5)).toBeCloseTo(0.5);
  });
});

describe('scrollProgress', () => {
  test('is 0 before the section reaches the top of the viewport', () => {
    expect(scrollProgress(200, 3000, 800)).toBe(0);
  });
  test('is 1 once the section has scrolled fully through', () => {
    expect(scrollProgress(-2200, 3000, 800)).toBe(1);
  });
  test('is linear in between', () => {
    expect(scrollProgress(-1100, 3000, 800)).toBeCloseTo(0.5);
  });
  test('returns 1 when the section is no taller than the viewport', () => {
    expect(scrollProgress(0, 800, 800)).toBe(1);
  });
});

describe('stepIndex', () => {
  test('splits progress into equal steps and never overflows', () => {
    expect(stepIndex(0, 3)).toBe(0);
    expect(stepIndex(0.34, 3)).toBe(1);
    expect(stepIndex(0.99, 3)).toBe(2);
    expect(stepIndex(1, 3)).toBe(2);
  });
});

describe('layerFrame', () => {
  test('first layer starts unlanded and lands by the end', () => {
    expect(layerFrame(0, 0, 7).t).toBe(0);
    expect(layerFrame(1, 0, 7).t).toBe(1);
  });
  test('last layer has not moved while the first is landing', () => {
    expect(layerFrame(0.2, 6, 7).t).toBe(0);
  });
  test('every layer is landed at full progress', () => {
    for (let i = 0; i < 7; i++) expect(layerFrame(1, i, 7).t).toBe(1);
  });
});
