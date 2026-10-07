import type { Lang } from '@/i18n';

export const LANGUAGES: Record<Lang, { flag: string; name: string; code: string }> = {
  pt: { flag: 'https://flagcdn.com/w40/br.png', name: 'Português', code: 'PT / BR' },
  en: { flag: 'https://flagcdn.com/w40/us.png', name: 'English', code: 'EN / EUA' },
};
