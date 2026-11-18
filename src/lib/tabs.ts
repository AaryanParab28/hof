/**
 * WAI-ARIA tablist keyboard model: which tab index a key press should move focus to,
 * or null if the key isn't a tab-navigation key.
 */
export function nextTabIndex(key: string, current: number, count: number): number | null {
  switch (key) {
    case 'ArrowRight':
      return (current + 1) % count;
    case 'ArrowLeft':
      return (current - 1 + count) % count;
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
    default:
      return null;
  }
}
