export const languages = ['en', 'es', 'fr'] as const;
export type Language = (typeof languages)[number];

export const dictionary: Record<Language, Record<string, string>> = {
  en: { welcome: 'Welcome to NovaMart', cta: 'Shop Now' },
  es: { welcome: 'Bienvenido a NovaMart', cta: 'Comprar ahora' },
  fr: { welcome: 'Bienvenue sur NovaMart', cta: 'Acheter maintenant' }
};

export const currencyRates = {
  USD: 1,
  EUR: 0.92,
  INR: 83
} as const;

export type Currency = keyof typeof currencyRates;
