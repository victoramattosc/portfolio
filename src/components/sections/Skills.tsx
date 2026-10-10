import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaKeyboard } from 'react-icons/fa6';
import { services, skills, type SkillCategory, type SkillLevel } from '@/data/skills';
import { clickFx } from '@/lib/clickFx';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

const PIPS: SkillLevel[] = [1, 2, 3, 4];
const FILTERS: (SkillCategory | 'all')[] = ['all', 'front', 'back', 'data', 'infra'];

export function Skills() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<SkillCategory | 'all'>('all');
  const levels = t('skills.levels', { returnObjects: true }) as string[];
  const visible = filter === 'all' ? skills : skills.filter((s) => s.cat === filter);
  const count = (f: SkillCategory | 'all') => (f === 'all' ? skills.length : skills.filter((s) => s.cat === f).length);

  const tap = (e: React.PointerEvent<HTMLElement>) => clickFx(e.currentTarget);
  const tapKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!e.repeat && (e.key === 'Enter' || e.key === ' ')) clickFx(e.currentTarget);
  };

  return (
    <section id="capacidades" className="mx-auto max-w-[1320px] px-[clamp(20px,4vw,48px)] pt-[clamp(100px,14vw,180px)]">
      <SectionHeader index="03" path="~/victor/stack.json" title={t('skills.title')} />

      <ul className="m-0 list-none p-0">
        {services.map(({ key, icon: Icon }, i) => (
          <Reveal
            as="li"
            key={key}
            index={i}
            className="grid grid-cols-[clamp(32px,5vw,64px)_minmax(0,1fr)_auto] items-center gap-[clamp(12px,3vw,40px)] border-b border-line px-[clamp(8px,1.5vw,20px)] py-[clamp(18px,2.4vw,30px)] transition-[background,color,padding] duration-400 hover:bg-acc hover:pl-[clamp(16px,3vw,44px)] hover:text-ink"
          >
            <span className="font-mono text-[13px] opacity-70">0{i + 1}</span>
            <span className="text-[clamp(30px,5.4vw,72px)] leading-none font-semibold tracking-[-0.035em]">{t(`skills.services.${key}`)}</span>
            <Icon aria-hidden className="text-[clamp(22px,3vw,38px)]" />
          </Reveal>
        ))}
      </ul>

      <div className="mt-[clamp(56px,8vw,96px)]">
        <Reveal className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <div className="flex items-center gap-3 font-mono text-[13px] text-mute">
            <FaKeyboard className="text-acc" />
            {t('skills.hint')}
          </div>
          <div role="group" aria-label={t('skills.filterLabel')} className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={f === filter}
                onClick={() => setFilter(f)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${f === filter ? 'border-acc bg-acc text-ink' : 'border-line text-mute hover:border-mute hover:text-fg'}`}
              >
                {f === 'all' ? t('skills.filters.all') : t(`skills.cats.${f}`)}
                <span className="opacity-60">{count(f)}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3 sm:grid-cols-[repeat(auto-fill,minmax(170px,1fr))] sm:gap-3.5">
          {visible.map((s, i) => (
            <Reveal
              as="button"
              type="button"
              key={s.name}
              index={i % 9}
              data-tilt=""
              onPointerDown={tap}
              onKeyDown={tapKey}
              className="keycap flex flex-col gap-4 rounded-[14px] border border-line bg-bg2 px-4 pt-4 pb-4 text-left sm:gap-[18px] sm:px-5 sm:pt-5 sm:pb-[18px]"
            >
              <span className="flex flex-col gap-1">
                <span className="font-mono text-[11px] text-acc">{t(`skills.cats.${s.cat}`)}</span>
                <span className="text-[21px] leading-[1.05] font-bold tracking-[-0.03em] sm:text-[26px]">{s.name}</span>
              </span>
              <span className="flex flex-col gap-2">
                <span className="flex gap-1" aria-hidden>
                  {PIPS.map((p) => (
                    <span key={p} className={`h-1 flex-1 rounded-xs ${p <= s.level ? 'bg-acc' : 'bg-line'}`} />
                  ))}
                </span>
                <span className="font-mono text-xs text-mute">{levels[s.level - 1]}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
