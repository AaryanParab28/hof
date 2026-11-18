/** Business details and outbound links. Fill the optional fields when confirmed. */
export interface SiteInfo {
  name: string;
  tagline: string;
  area: string;
  family: readonly [string, string];
  zomatoUrl: string;
  directionsUrl: string;
  hours?: string;
  phone?: string;
  instagram?: string;
}

export const SITE: SiteInfo = {
  name: 'Highness',
  tagline: 'High on Food',
  area: 'Goregaon East, Mumbai',
  family: ['YV Cafe', 'The Liquor Factory'],
  zomatoUrl: 'https://www.zomato.com/mumbai/highness-high-on-food-goregaon-east',
  directionsUrl:
    'https://www.google.com/search?q=highness+high+on+food&rlz=1C5CHFA_enIN1106IN1106&oq=high&gs_lcrp=EgZjaHJvbWUqCQgAECMYJxjjAjIJCAAQIxgnGOMCMg8IARAuGCcYrwEYxwEYjgUyBggCEEUYOTIQCAMQABiDARixAxjJAxiABDINCAQQABiDARixAxiABDIGCAUQRRg9MgYIBhBFGD0yBggHEEUYPNIBCDEzMTBqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8',
};

export const NAV_LINKS = [
  { href: '#menu', label: 'Menu' },
  { href: '#burger', label: 'The Burger' },
  { href: '#story', label: 'Story' },
  { href: '#visit', label: 'Find us' },
] as const;
