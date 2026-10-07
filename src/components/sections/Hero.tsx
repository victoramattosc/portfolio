import { useTranslation } from 'react-i18next';
import { FaArrowDown, FaArrowDownLong, FaCode, FaFileArrowDown, FaGamepad, FaPenRuler, FaTerminal, FaWandMagicSparkles } from 'react-icons/fa6';
import eu from '@/assets/brand/eu.webp';
import { useSettings } from '@/context/SettingsContext';
import { projects } from '@/data/projects';
import { useResume } from '@/hooks/useResume';
import { scrollToSection } from '@/data/sections';
import { useCycle } from '@/hooks/useCycle';
import { Logo } from '@/components/ui/Logo';
import { PillButton, PillLink } from '@/components/ui/Pill';
import { WindowDots } from '@/components/ui/WindowDots';

const BIG = 'inline-block text-[17vw] sm:text-[clamp(54px,11vw,184px)] leading-[0.86] font-extrabold tracking-[-0.045em]';
const MONO_ICON_BOX = 'grid place-items-center';

export function Hero() {
  const { t } = useTranslation();
  const { fx, toggleFx } = useSettings();
  const resume = useResume();
  const roles = t('hero.roles', { returnObjects: true }) as string[];
  const role = useCycle(roles.length, 2600);

  return (
    <section
      id="inicio"
      key={fx ? 'fx' : 'plain'}
      className="relative flex min-h-svh flex-col overflow-hidden px-[clamp(20px,4vw,48px)] pt-3 pb-[120px] min-[900px]:pt-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--line)_1px,transparent_1px)] bg-[length:28px_28px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_30%,transparent_80%)]"
      />
      <div
        aria-hidden
        data-spot=""
        className="pointer-events-none absolute top-0 left-0 size-[640px] rounded-full opacity-0 transition-opacity duration-500 [background:radial-gradient(circle,color-mix(in_oklch,var(--acc)_28%,transparent),transparent_62%)] in-data-[fx=on]:opacity-100"
      />

      <header className="hero-in relative z-[2] flex flex-wrap items-center justify-between gap-4 max-[899px]:min-h-11 max-[899px]:justify-end" style={{ '--i': 0 } as React.CSSProperties}>
        <button type="button" onClick={() => scrollToSection('inicio')} data-mag="" className="block leading-[0] max-[899px]:hidden" aria-label="Victor Carbelotti">
          <Logo className="block h-auto w-[clamp(52px,5vw,68px)]" />
        </button>
        <div className="flex items-center gap-2.5 rounded-full border border-line bg-bg2 px-3.5 py-2 font-mono text-xs text-mute">
          <span className="size-2 rounded-full bg-acc shadow-[0_0_0_4px_color-mix(in_oklch,var(--acc)_25%,transparent)]" />
          {t('hero.available')}
        </div>
      </header>

      <div className="relative z-[1] mx-auto flex w-full max-w-[1320px] flex-1 flex-col justify-center pt-[clamp(40px,6vw,64px)] pr-0 pb-[clamp(24px,4vw,40px)] pl-[clamp(8px,3vw,40px)]">
        <div className="hero-in mb-[clamp(8px,1.5vw,18px)] font-mono text-[clamp(13px,1.3vw,16px)] text-mute" style={{ '--i': 1 } as React.CSSProperties}>
          {t('hero.hi')}
        </div>

        <div className="relative">
          <div data-depth="4" className="relative mb-5 ml-auto w-[46%] max-w-[220px] rotate-4 sm:absolute sm:top-[clamp(-40px,-3vw,-10px)] sm:right-0 sm:z-0 sm:mb-0 sm:ml-0 sm:w-[clamp(120px,25vw,330px)] sm:max-w-none">
            <div
              data-tilt=""
              className="hero-in overflow-hidden rounded-[14px] border border-line bg-bg2 shadow-[0_30px_80px_-30px_color-mix(in_oklch,var(--acc)_50%,transparent)]"
              style={{ '--i': 3 } as React.CSSProperties}
            >
              <div className="flex items-center gap-1.5 border-b border-line px-3 py-[9px] font-mono text-[11px] text-mute">
                <WindowDots size={9} />
                <span className="ml-1.5">{t('hero.photoFile')}</span>
              </div>
              <img src={eu} alt="Victor Carbelotti" width={720} height={720} fetchPriority="high" className="block aspect-square w-full object-cover" />
            </div>
          </div>
          <div className="relative z-[1] overflow-hidden pt-[0.04em]">
            <span className={`hero-in hero-big ${BIG}`} style={{ '--i': 2 } as React.CSSProperties}>Victor</span>
          </div>
          <div className="relative z-[1] overflow-hidden pb-[0.06em] pl-[clamp(16px,6vw,110px)]">
            <span
              className={`hero-in hero-big ${BIG} text-bg [paint-order:stroke_fill] [-webkit-text-stroke:3px_var(--fg)]`}
              style={{ '--i': 3 } as React.CSSProperties}
            >
              Carbelotti
            </span>
          </div>
        </div>

        <div
          className="hero-in mt-[clamp(20px,3vw,36px)] flex flex-wrap items-baseline gap-[0.5ch] font-mono text-[clamp(16px,2.2vw,28px)]"
          style={{ '--i': 4 } as React.CSSProperties}
        >
          <span className="text-acc">const</span>
          <span>role</span>
          <span className="text-mute">=</span>
          <span className="inline-grid text-acc2" aria-live="off">
            {roles.map((r, i) => (
              <span key={r} data-on={i === role} aria-hidden={i !== role} className="role col-start-1 row-start-1 whitespace-nowrap">
                "{r}"
              </span>
            ))}
          </span>
          <span className="text-mute">;</span>
        </div>

        <p
          className="hero-in mt-[clamp(16px,2vw,24px)] mb-[clamp(24px,3vw,36px)] max-w-[520px] text-[clamp(17px,1.5vw,20px)] leading-normal text-balance text-mute"
          style={{ '--i': 5 } as React.CSSProperties}
        >
          {t('hero.welcome')}
        </p>

        <div className="hero-in flex flex-wrap items-center gap-3" style={{ '--i': 6 } as React.CSSProperties}>
          <PillButton onClick={() => scrollToSection('projetos')}>
            {t('hero.seeProjects')}
            <FaArrowDown />
          </PillButton>
          <PillLink variant="outline" {...resume}>
            {t('hero.resume')}
            <FaFileArrowDown />
          </PillLink>
          <button
            type="button"
            onClick={toggleFx}
            className="flex items-center gap-2 px-1.5 py-2.5 font-mono text-[13px] text-mute transition-colors hover:text-acc"
          >
            <FaWandMagicSparkles />
            {fx ? t('hero.fxOff') : t('hero.fxOn')}
          </button>
        </div>
      </div>

      <div className="relative z-[2] mx-auto flex w-full max-w-[1320px] flex-wrap items-end justify-between gap-5">
        <div className="hero-in flex items-center gap-2.5 font-mono text-xs text-mute" style={{ '--i': 7 } as React.CSSProperties}>
          <FaArrowDownLong /> scroll
        </div>
        <Terminal projectCount={projects.length} />
      </div>

      <FloatingBadge depth={6} className="hidden sm:block top-[22%] left-[48%] -rotate-12" fd={3.1} fy={-14} fr={8}>
        <span className={`${MONO_ICON_BOX} size-[clamp(40px,4.5vw,58px)] rounded-[14px] border border-line bg-bg2 text-[clamp(16px,1.8vw,22px)] text-acc`}>
          <FaCode />
        </span>
      </FloatingBadge>
      <FloatingBadge depth={-5} className="hidden sm:block top-[60%] left-[58%] rotate-10" fd={3.6} fy={14} fr={-8}>
        <span className={`${MONO_ICON_BOX} size-[clamp(40px,4.5vw,58px)] rounded-full bg-acc text-[clamp(16px,1.8vw,22px)] text-ink`}>
          <FaGamepad />
        </span>
      </FloatingBadge>
      <FloatingBadge depth={8} className="hidden sm:block top-[13%] right-[31%] rotate-8" fd={4.1} fy={-14} fr={8}>
        <span className="rounded-lg border border-dashed border-acc bg-bg px-3 py-2 font-mono text-xs text-acc">&lt;/&gt;</span>
      </FloatingBadge>
      <FloatingBadge depth={-7} className="hidden sm:block top-[44%] left-[4%] -rotate-6" fd={4.6} fy={14} fr={-8}>
        <span className={`${MONO_ICON_BOX} size-[clamp(36px,4vw,50px)] rounded-xl border border-line bg-bg3 text-[clamp(14px,1.6vw,20px)] text-acc2`}>
          <FaPenRuler />
        </span>
      </FloatingBadge>
    </section>
  );
}

function FloatingBadge({
  depth,
  className,
  fd,
  fy,
  fr,
  children,
}: {
  depth: number;
  className: string;
  fd: number;
  fy: number;
  fr: number;
  children: React.ReactNode;
}) {
  return (
    <div aria-hidden data-depth={depth} className={`absolute z-[2] ${className}`}>
      <div className="float" style={{ '--fd': `${fd}s`, '--fy': `${fy}px`, '--fr': `${fr}deg` } as React.CSSProperties}>
        {children}
      </div>
    </div>
  );
}

function Terminal({ projectCount }: { projectCount: number }) {
  const { t } = useTranslation();
  const line = 'hero-line whitespace-nowrap';
  const i = (n: number) => ({ '--i': n }) as React.CSSProperties;
  return (
    <div
      className="hero-in w-[min(100%,380px)] overflow-hidden rounded-xl border border-line bg-[color-mix(in_oklch,var(--bg2)_88%,transparent)] font-mono text-[12.5px] backdrop-blur-sm"
      style={i(2)}
    >
      <div className="flex items-center gap-2 border-b border-line px-3 py-[9px] text-[11px] text-mute">
        <FaTerminal className="text-acc" />
        zsh — victor@portfolio
      </div>
      <div className="flex flex-col gap-1.5 px-4 py-3.5 leading-[1.4]">
        <div className={line} style={i(0)}>
          <span className="text-acc">$</span> npm run build:victor
        </div>
        <div className={`${line} text-mute`} style={i(1)}>
          &gt; {t('hero.terminal.fonts')} ok
        </div>
        <div className={`${line} text-mute`} style={i(2)}>
          &gt; {t('hero.terminal.creativity')} ████████ 100%
        </div>
        <div className={`${line} text-mute`} style={i(3)}>
          &gt; {t('hero.terminal.projects', { count: projectCount })}
        </div>
        <div className={`${line} text-acc2`} style={i(4)}>
          ✓ {t('hero.terminal.done')}
          <span aria-hidden className="caret ml-1.5 inline-block h-3.5 w-[7px] bg-acc align-[-2px]" />
        </div>
      </div>
    </div>
  );
}
