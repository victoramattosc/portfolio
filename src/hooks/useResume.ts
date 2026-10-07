import { useSettings } from '@/context/SettingsContext';
import { RESUME_FILES } from '@/data/profile';

/** Props de download do currículo no idioma atual (pt → Currículo, en → Resume). */
export function useResume() {
  const { lang } = useSettings();
  const href = RESUME_FILES[lang];
  return { href, download: href.slice(1) };
}
