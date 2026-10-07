import type { Lang } from '@/i18n';

export type ThemeMode = 'dark' | 'light';
export type ThemeColor = 'lavanda' | 'salvia' | 'argila';

export interface StoredSettings {
  fx?: boolean;
  theme?: ThemeMode;
  color?: ThemeColor;
  lang?: Lang;
}

const KEY = 'va-portfolio';

export function readStored(): StoredSettings {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}') as StoredSettings;
  } catch {
    return {};
  }
}

export function writeStored(value: StoredSettings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* storage indisponível (modo privado etc.) */
  }
}
