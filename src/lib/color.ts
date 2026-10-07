import { COLOR_HUES } from '@/context/SettingsContext';
import type { ThemeColor, ThemeMode } from './storage';

/** Cor de amostra de um tema, independente do tema ativo no momento. */
export function swatch(color: ThemeColor, theme: ThemeMode): string {
  return `oklch(${theme === 'dark' ? 0.74 : 0.5} 0.1 ${COLOR_HUES[color]})`;
}
