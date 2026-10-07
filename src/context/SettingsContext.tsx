import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGS, type Lang } from '@/i18n';
import { readStored, writeStored, type ThemeColor, type ThemeMode } from '@/lib/storage';

/** Matiz OKLCH de cada cor de tema (espelha os seletores [data-color] em index.css). */
export const COLOR_HUES: Record<ThemeColor, number> = { lavanda: 295, salvia: 165, argila: 45 };
export const COLORS = Object.keys(COLOR_HUES) as ThemeColor[];

interface Settings {
  fx: boolean;
  theme: ThemeMode;
  color: ThemeColor;
  lang: Lang;
  /** Muda a cada vez que o FX é ligado ou desligado; dispara a cortina de transição. */
  curtain: { id: number; mode: 'on' | 'off' };
  toggleFx: () => void;
  toggleTheme: () => void;
  setColor: (color: ThemeColor) => void;
  setLang: (lang: Lang) => void;
}

const SettingsContext = createContext<Settings | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [stored] = useState(readStored);
  const [fx, setFx] = useState(stored.fx ?? false);
  const [theme, setTheme] = useState<ThemeMode>(stored.theme ?? 'dark');
  const [color, setColor] = useState<ThemeColor>(stored.color ?? 'lavanda');
  const [curtain, setCurtain] = useState<Settings['curtain']>({ id: 0, mode: 'off' });
  const lang: Lang = LANGS.includes(i18n.language as Lang) ? (i18n.language as Lang) : 'pt';

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.color = color;
    root.dataset.fx = fx ? 'on' : 'off';
    root.dataset.cursor = matchMedia('(pointer: fine)').matches ? 'custom' : 'native';
    root.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.title = i18n.t('meta.title');
    writeStored({ fx, theme, color, lang });
  }, [fx, theme, color, lang, i18n]);

  const toggleFx = useCallback(() => {
    const next = !fx;
    setFx(next);
    setCurtain((c) => ({ id: c.id + 1, mode: next ? 'on' : 'off' }));
    navigator.vibrate?.(next ? [18, 40, 18] : 14);
  }, [fx]);
  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  const setLang = useCallback((l: Lang) => void i18n.changeLanguage(l), [i18n]);

  const value = useMemo<Settings>(
    () => ({ fx, theme, color, lang, curtain, toggleFx, toggleTheme, setColor, setLang }),
    [fx, theme, color, lang, curtain, toggleFx, toggleTheme, setLang],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): Settings {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings deve ser usado dentro de <SettingsProvider>');
  return ctx;
}
