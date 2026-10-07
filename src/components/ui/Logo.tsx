import { useSettings } from '@/context/SettingsContext';
import logoDark from '@/assets/brand/logo-white.webp';
import logoLight from '@/assets/brand/logo.webp';

/** A logo é branca no tema escuro e preta no claro. `inverted` troca (ex.: sobre fundo de destaque). */
export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  const { theme } = useSettings();
  const light = (theme === 'light') !== inverted;
  return <img src={light ? logoLight : logoDark} alt="" width={240} height={240} className={className} />;
}
