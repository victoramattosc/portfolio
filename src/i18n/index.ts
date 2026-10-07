import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from './locales/pt.json';
import en from './locales/en.json';
import { readStored } from '@/lib/storage';

export const LANGS = ['pt', 'en'] as const;
export type Lang = (typeof LANGS)[number];

const stored = readStored().lang;
const initial: Lang = stored ?? (navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en');

void i18n.use(initReactI18next).init({
  resources: { pt: { translation: pt }, en: { translation: en } },
  lng: initial,
  fallbackLng: 'pt',
  interpolation: { escapeValue: false },
});

export default i18n;
