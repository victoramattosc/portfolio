import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronRight, FaGithub, FaLanguage, FaMoon, FaPalette, FaRegCopy, FaSun, FaWandMagicSparkles } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import { COLORS, useSettings } from '@/context/SettingsContext';
import { GITHUB_URL } from '@/data/profile';
import { SECTIONS, scrollToSection } from '@/data/sections';
import { useCopyEmail } from '@/hooks/useCopyEmail';

interface Item {
  label: string;
  icon: IconType;
  group: string;
  run: () => void;
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation();
  const { fx, theme, color, lang, toggleFx, toggleTheme, setColor, setLang } = useSettings();
  const { copy } = useCopyEmail();
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const items = useMemo(() => {
    const goTo = t('palette.goTo');
    const actions = t('palette.actions');
    const all: Item[] = [
      ...SECTIONS.map((s) => ({ label: t(`nav.names.${s.key}`), icon: s.icon, group: goTo, run: () => scrollToSection(s.id) })),
      { label: fx ? t('palette.fxOff') : t('palette.fxOn'), icon: FaWandMagicSparkles, group: actions, run: toggleFx },
      { label: theme === 'dark' ? t('palette.lightTheme') : t('palette.darkTheme'), icon: theme === 'dark' ? FaSun : FaMoon, group: actions, run: toggleTheme },
      ...COLORS.filter((c) => c !== color).map((c) => ({
        label: t('palette.color', { name: t(`settings.colors.${c}`) }),
        icon: FaPalette,
        group: actions,
        run: () => setColor(c),
      })),
      { label: t('palette.switchLang'), icon: FaLanguage, group: actions, run: () => setLang(lang === 'pt' ? 'en' : 'pt') },
      { label: t('palette.copyEmail'), icon: FaRegCopy, group: actions, run: copy },
      { label: 'GitHub', icon: FaGithub, group: 'link', run: () => window.open(GITHUB_URL, '_blank', 'noopener') },
    ];
    const q = query.trim().toLowerCase();
    return q ? all.filter((i) => i.label.toLowerCase().includes(q)) : all;
  }, [t, fx, theme, color, lang, query, toggleFx, toggleTheme, setColor, setLang, copy]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setSel(0);
    input.current?.focus();
  }, [open]);

  if (!open) return null;

  const run = (item?: Item) => {
    if (!item) return;
    onClose();
    item.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === 'Enter') {
      run(items[sel]);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-start justify-center bg-[color-mix(in_oklch,var(--bg)_60%,transparent)] px-3 pt-[min(18vh,140px)] pb-3 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[560px] overflow-hidden rounded-2xl border border-line bg-bg2 font-mono shadow-[0_40px_120px_-30px_rgba(0,0,0,.6)]"
      >
        <div className="flex items-center gap-3 border-b border-line px-[18px] py-4">
          <FaChevronRight className="text-[13px] text-acc" />
          <input
            ref={input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSel(0);
            }}
            onKeyDown={onKeyDown}
            placeholder={t('palette.placeholder')}
            className="flex-1 border-0 bg-transparent text-[15px] text-fg outline-0 focus-visible:outline-none placeholder:text-mute"
          />
          <span className="rounded-md border border-line px-1.5 py-0.5 text-[11px] text-mute">esc</span>
        </div>
        <div className="max-h-[min(52vh,420px)] overflow-y-auto p-2">
          {items.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={() => run(item)}
              onMouseEnter={() => setSel(i)}
              className={`flex w-full items-center gap-3 rounded-[10px] px-3 py-[11px] text-left text-[13.5px] ${i === sel ? 'bg-bg3 text-fg' : 'text-mute'}`}
            >
              <item.icon className="w-[18px] text-center text-acc" />
              <span className="flex-1">{item.label}</span>
              <span className="text-[11px] text-mute">{item.group}</span>
            </button>
          ))}
          {!items.length && <div className="px-3 py-[18px] text-[13px] text-mute">{t('palette.empty')}</div>}
        </div>
        <div className="flex gap-4 border-t border-line px-[18px] py-2.5 text-[11px] text-mute">
          <span>↑↓</span>
          <span>enter</span>
          <span>⌘K / Ctrl K</span>
        </div>
      </div>
    </div>
  );
}
