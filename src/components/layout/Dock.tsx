import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBars, FaCheck, FaChevronUp, FaMagnifyingGlass, FaMoon, FaSun } from 'react-icons/fa6';
import { COLORS, useSettings } from '@/context/SettingsContext';
import { LANGS } from '@/i18n';
import { LANGUAGES } from '@/data/languages';
import { swatch } from '@/lib/color';
import { SECTIONS, scrollToSection } from '@/data/sections';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { Logo } from '@/components/ui/Logo';
import { Popover } from '@/components/ui/Popover';

const sectionIds = SECTIONS.map((s) => s.id);
const Divider = () => <span className="h-[22px] w-px bg-line" />;

export function Dock({ onOpenPalette, onOpenMenu }: { onOpenPalette: () => void; onOpenMenu: () => void }) {
  const { t } = useTranslation();
  const { fx, theme, color, lang, toggleFx, toggleTheme, setColor, setLang } = useSettings();
  const wide = useMediaQuery('(min-width: 900px)');
  const active = useActiveSection(sectionIds);
  const bar = useRef<HTMLSpanElement>(null);
  useScrollProgress(bar);

  const label = (key: (typeof SECTIONS)[number]['key']) => t(`nav.tabs.${key}`);

  if (!wide) return <MenuButton onClick={onOpenMenu} />;

  return (
    <nav
      aria-label="Principal"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-50 flex max-w-[calc(100vw-20px)] -translate-x-1/2 items-center gap-1 rounded-2xl border border-line bg-[color-mix(in_oklch,var(--bg2)_82%,transparent)] p-1.5 font-mono text-xs shadow-[0_20px_50px_-20px_rgba(0,0,0,.5)] backdrop-blur-xl"
    >
      <span ref={bar} aria-hidden className="absolute -top-px left-3 h-0.5 w-0 max-w-[calc(100%-24px)] rounded-xs bg-acc" />
      <button type="button" onClick={() => scrollToSection('inicio')} title="Victor Carbelotti" aria-label="Victor Carbelotti" className="px-1.5 py-0.5 leading-[0]">
        <Logo className="block size-[34px]" />
      </button>
      <Divider />

      <div className="flex gap-0.5">
        {SECTIONS.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => scrollToSection(s.id)}
            aria-current={i === active ? 'true' : undefined}
            className={`flex items-center gap-1.5 rounded-[10px] px-3 py-[9px] transition-colors hover:text-fg ${i === active ? 'bg-bg3 text-fg' : 'text-mute'}`}
          >
            <span className="text-acc opacity-80">0{i + 1}</span>
            {label(s.key)}
          </button>
        ))}
      </div>
      <Divider />

      <button
        type="button"
        onClick={toggleFx}
        title="FX"
        aria-pressed={fx}
        className={`flex items-center gap-2 rounded-[10px] px-2.5 py-[7px] font-bold transition-colors ${fx ? 'bg-acc text-ink' : 'text-fg'}`}
      >
        FX
        <span className={`relative h-4 w-7 rounded-full transition-colors ${fx ? 'bg-ink' : 'bg-line'}`}>
          <span className={`absolute top-0.5 left-0.5 size-3 rounded-full transition-[translate,background] duration-300 ${fx ? 'translate-x-3 bg-acc' : 'bg-mute'}`} />
        </span>
      </button>

      <button
        type="button"
        onClick={toggleTheme}
        title={t('settings.theme')}
        aria-label={t('settings.theme')}
        className="grid size-[34px] place-items-center rounded-[10px] text-mute transition-colors hover:bg-bg3 hover:text-fg"
      >
        {theme === 'dark' ? <FaSun /> : <FaMoon />}
      </button>

      <Popover
        title={t('settings.color')}
        width={220}
        trigger={
          <>
            <span className="size-3.5 rounded-full bg-acc shadow-[0_0_0_2px_var(--bg2),0_0_0_3px_var(--line)]" />
            <FaChevronUp className="text-[9px]" />
          </>
        }
      >
        {(close) =>
          COLORS.map((c) => (
            <MenuOption
              key={c}
              selected={c === color}
              onClick={() => {
                setColor(c);
                close();
              }}
              lead={<span className="size-[22px] rounded-full shadow-[0_0_0_2px_var(--bg2)]" style={{ background: swatch(c, theme) }} />}
            >
              <span className="text-[13px]">{t(`settings.colors.${c}`)}</span>
            </MenuOption>
          ))
        }
      </Popover>

      <Popover
        title={t('settings.language')}
        width={210}
        align="right"
        trigger={
          <>
            <img src={LANGUAGES[lang].flag} alt="" width={20} height={14} className="h-3.5 w-5 rounded-[3px] object-cover shadow-[0_0_0_1px_var(--line)]" />
            <FaChevronUp className="text-[9px]" />
          </>
        }
      >
        {(close) =>
          LANGS.map((l) => (
            <MenuOption
              key={l}
              selected={l === lang}
              onClick={() => {
                setLang(l);
                close();
              }}
              lead={<img src={LANGUAGES[l].flag} alt="" width={24} height={17} className="h-[17px] w-6 rounded-[3px] object-cover shadow-[0_0_0_1px_var(--line)]" />}
            >
              <span className="flex flex-col gap-px">
                <span className="text-[13px]">{LANGUAGES[l].name}</span>
                <span className="text-[10.5px] text-mute">{LANGUAGES[l].code}</span>
              </span>
            </MenuOption>
          ))
        }
      </Popover>

      <button
        type="button"
        onClick={onOpenPalette}
        title="⌘K"
        aria-label="Command palette"
        className="flex items-center gap-1.5 rounded-[10px] border border-line px-2.5 py-[9px] text-mute transition-colors hover:border-mute hover:text-fg"
      >
        <FaMagnifyingGlass />
        <span>⌘K</span>
      </button>
    </nav>
  );
}

function MenuOption({
  selected,
  lead,
  onClick,
  children,
}: {
  selected: boolean;
  lead: React.ReactNode;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-[10px] p-2.5 text-left text-fg hover:bg-bg3 ${selected ? 'bg-bg3' : ''}`}
    >
      {lead}
      <span className="flex-1">{children}</span>
      <FaCheck className={`text-[11px] text-acc ${selected ? 'opacity-100' : 'opacity-0'}`} />
    </button>
  );
}

/** Celular/tablet: só um hambúrguer fixo no canto superior esquerdo, que acompanha o scroll. */
function MenuButton({ onClick }: { onClick: () => void }) {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t('settings.menu')}
      className="fixed top-[max(0.75rem,env(safe-area-inset-top))] left-[max(0.75rem,env(safe-area-inset-left))] z-50 grid size-11 place-items-center rounded-full border border-line bg-[color-mix(in_oklch,var(--bg2)_80%,transparent)] text-lg text-fg shadow-[0_10px_30px_-12px_rgba(0,0,0,.5)] backdrop-blur-xl transition-transform active:scale-90"
    >
      <FaBars />
    </button>
  );
}
