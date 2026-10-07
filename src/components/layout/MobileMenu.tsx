import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMoon, FaSun, FaWandMagicSparkles, FaXmark } from 'react-icons/fa6';
import { COLORS, useSettings } from '@/context/SettingsContext';
import { LANGUAGES } from '@/data/languages';
import { SECTIONS, scrollToSection } from '@/data/sections';
import { LANGS } from '@/i18n';
import { swatch } from '@/lib/color';
import { Logo } from '@/components/ui/Logo';

const chip = (on: boolean) =>
  `flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm transition-colors ${on ? 'border-acc bg-bg3 text-fg' : 'border-line text-mute'}`;

/** Bottom sheet para telas estreitas: navegação + tema, cor e idioma. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation();
  const { fx, theme, color, lang, toggleFx, toggleTheme, setColor, setLang } = useSettings();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" onClick={onClose} className="fixed inset-0 z-[100] flex items-end bg-[color-mix(in_oklch,var(--bg)_55%,transparent)] backdrop-blur-sm">
      <div
        onClick={(e) => e.stopPropagation()}
        className="sheet-in max-h-[88svh] w-full overflow-y-auto rounded-t-3xl border border-b-0 border-line bg-bg2 px-5 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-[0_-30px_80px_-30px_rgba(0,0,0,.6)]"
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line" />
        <div className="mb-3 flex items-center justify-between font-mono text-xs text-mute">
          <Logo className="block size-11" />
          <button type="button" onClick={onClose} aria-label="Fechar" className="grid size-9 place-items-center rounded-full border border-line">
            <FaXmark />
          </button>
        </div>

        <ul className="m-0 grid list-none gap-1 p-0">
          {SECTIONS.map((s, i) => (
            <li key={s.key}>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  scrollToSection(s.id);
                }}
                className="flex w-full items-center gap-4 rounded-xl px-3 py-3.5 text-left active:bg-bg3"
              >
                <span className="font-mono text-xs text-acc">0{i + 1}</span>
                <span className="flex-1 text-[22px] font-semibold tracking-[-0.02em]">{t(`nav.names.${s.key}`)}</span>
                <s.icon className="text-mute" />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-col gap-4 border-t border-line pt-5">
          <button
            type="button"
            onClick={() => {
              onClose();
              toggleFx();
            }}
            aria-pressed={fx}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors ${fx ? 'border-acc bg-acc text-ink' : 'border-line'}`}
          >
            <FaWandMagicSparkles />
            <span className="flex flex-1 flex-col">
              <span className="font-bold">FX</span>
              <span className={`text-xs ${fx ? 'opacity-80' : 'text-mute'}`}>{t('settings.fxHint')}</span>
            </span>
            <span className={`relative h-5 w-9 rounded-full ${fx ? 'bg-ink' : 'bg-line'}`}>
              <span className={`absolute top-0.5 left-0.5 size-4 rounded-full transition-transform duration-300 ${fx ? 'translate-x-4 bg-acc' : 'bg-mute'}`} />
            </span>
          </button>
          <Group label={t('settings.theme')}>
            <button type="button" onClick={toggleTheme} className={chip(false)}>
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
              {theme === 'dark' ? t('palette.lightTheme') : t('palette.darkTheme')}
            </button>
          </Group>
          <Group label={t('settings.color')}>
            {COLORS.map((c) => (
              <button key={c} type="button" onClick={() => setColor(c)} aria-pressed={c === color} className={chip(c === color)}>
                <span className="size-4 rounded-full" style={{ background: swatch(c, theme) }} />
                {t(`settings.colors.${c}`)}
              </button>
            ))}
          </Group>
          <Group label={t('settings.language')}>
            {LANGS.map((l) => (
              <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={l === lang} className={chip(l === lang)}>
                <img src={LANGUAGES[l].flag} alt="" width={20} height={14} className="h-3.5 w-5 rounded-[3px] object-cover" />
                {LANGUAGES[l].name}
              </button>
            ))}
          </Group>
        </div>
      </div>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 font-mono text-[11px] text-mute">{label}</div>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}
