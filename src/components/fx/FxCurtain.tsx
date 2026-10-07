import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '@/context/SettingsContext';
import { Logo } from '@/components/ui/Logo';

const DURATION = 2000;

/** Transição exibida toda vez que o modo FX é ligado ou desligado. */
export function FxCurtain() {
  const { t } = useTranslation();
  const { curtain } = useSettings();
  const [playing, setPlaying] = useState(0);

  useEffect(() => {
    if (!curtain.id || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setPlaying(curtain.id);
    const id = setTimeout(() => setPlaying(0), DURATION);
    return () => clearTimeout(id);
  }, [curtain.id]);

  if (!playing) return null;
  const on = curtain.mode === 'on';
  const touch = !matchMedia('(pointer: fine)').matches;
  const run = (name: string, easing: string) => ({ animation: `${name} ${DURATION}ms ${easing} both` });

  return (
    <div
      key={playing}
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[9998] flex flex-col items-center justify-center gap-[18px] overflow-hidden px-4 ${on ? 'bg-acc text-ink' : 'bg-fg text-bg'}`}
      style={run('curtain', 'cubic-bezier(.7,0,.3,1)')}
    >
      <Logo inverted className="block h-auto w-[clamp(120px,18vw,240px)]" />
      <div className="overflow-hidden">
        <div
          className="text-[clamp(40px,9vw,140px)] leading-[0.95] font-extrabold tracking-[-0.045em] whitespace-nowrap"
          style={run('curtain-name', 'cubic-bezier(.16,1,.3,1)')}
        >
          Victor Carbelotti
        </div>
      </div>
      <div className="flex flex-col items-center gap-1.5 font-mono text-[13px] tracking-[0.12em]" style={run('curtain-sub', 'linear')}>
        <span>{t(on ? 'fx.on' : 'fx.off')}</span>
        {touch && <span className="text-[11px] opacity-70">{t('fx.desktopHint')}</span>}
      </div>
    </div>
  );
}
