import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowUpRightFromSquare, FaLock } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import { GITHUB_URL } from '@/data/profile';
import { projects, type Project } from '@/data/projects';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { WindowDots } from '@/components/ui/WindowDots';

const pad = (n: number) => String(n).padStart(2, '0');
const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

export function Projects() {
  const { t } = useTranslation();
  const wide = useMediaQuery('(min-width: 900px)');

  return (
    <section id="projetos" className="mx-auto max-w-[1320px] px-[clamp(20px,4vw,48px)] pt-[clamp(100px,14vw,180px)]">
      <SectionHeader index="04" path="~/victor/projetos/" title={t('projects.title')} className="mb-[clamp(32px,5vw,56px)]" />
      <Reveal index={1} className="mb-5 font-mono text-[13px] text-mute">
        {t('projects.latest')}
      </Reveal>
      {wide ? <ProjectsSplit /> : <ProjectsGrid />}
      <Reveal className="mt-8 flex justify-center">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full border border-line bg-bg2 px-5 py-2.5 font-mono text-[13px] text-fg transition-colors hover:border-acc hover:text-acc"
        >
          <FaGithub className="text-base" />
          {t('projects.more')}
          <FiArrowUpRight />
        </a>
      </Reveal>
    </section>
  );
}

/** Desktop: lista à esquerda, preview fixo à direita. */
function ProjectsSplit() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const current = projects[active];

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-start gap-[clamp(32px,4vw,64px)]">
      <ul className="m-0 flex list-none flex-col border-t border-line p-0">
        {projects.map((p, i) => {
          const on = i === active;
          return (
            <Reveal as="li" key={p.id} index={i}>
              <a
                href={p.site}
                target="_blank"
                rel="noopener noreferrer"
                data-cur={p.site ? t('projects.open') : undefined}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`grid grid-cols-[36px_minmax(0,1fr)_auto_20px] items-center gap-4 border-b border-line py-[18px] pr-1 transition-[padding,color] duration-350 ease-[cubic-bezier(.2,.8,.2,1)] ${on ? 'pl-5 text-acc' : 'pl-1 text-fg'} ${p.site ? '' : 'cursor-default'}`}
              >
                <span className="font-mono text-xs text-mute">{pad(i + 1)}</span>
                <span className="text-[clamp(22px,2.3vw,32px)] leading-[1.1] font-semibold tracking-[-0.025em]">{p.name}</span>
                <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-mute">{t(`projects.items.${p.id}.type`)}</span>
                <FiArrowUpRight className={`transition-opacity ${on && p.site ? 'opacity-100' : 'opacity-0'}`} />
              </a>
            </Reveal>
          );
        })}
      </ul>

      <div className="sticky top-8">
        <div key={current.id} className="preview-swap">
          <Preview project={current} />
        </div>
        <div className="mt-[18px] flex flex-col gap-3.5">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div className="text-[clamp(26px,2.6vw,36px)] font-bold tracking-[-0.03em]">{current.name}</div>
            <div className="font-mono text-[13px] text-mute">
              <span className="text-acc">{pad(active + 1)}</span> / {pad(projects.length)}
            </div>
          </div>
          <p className="m-0 text-base leading-[1.55] text-pretty text-mute">{t(`projects.items.${current.id}.desc`)}</p>
          <StackTags stack={current.stack} />
          <div className="mt-1 flex flex-wrap gap-2.5">
            {current.site ? (
              <a
                href={current.site}
                target="_blank"
                rel="noopener noreferrer"
                data-mag=""
                className="flex items-center gap-2 rounded-full border border-line px-[18px] py-[11px] text-sm font-medium text-fg transition-[background,color,border-color] duration-300 hover:border-acc hover:bg-acc hover:text-ink"
              >
                <FaArrowUpRightFromSquare />
                {t('projects.openSite')}
              </a>
            ) : (
              <span className="flex items-center gap-2 py-[11px] font-mono text-xs text-mute">
                <FaLock />
                {t('projects.noDeploy')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Preview({ project }: { project: Project }) {
  const { t } = useTranslation();
  const href = project.site;
  const Wrapper = href ? 'a' : 'div';
  const link = href ? { href, target: '_blank', rel: 'noopener noreferrer', 'data-cur': t('projects.open') } : {};

  if (project.mobile && project.img) {
    return (
      <Wrapper
        {...link}
        className="relative block aspect-[16/12.4] overflow-hidden rounded-2xl border border-line [background:radial-gradient(circle_at_50%_55%,color-mix(in_oklch,var(--acc)_26%,transparent),transparent_62%),var(--bg2)]"
      >
        <div
          data-tilt=""
          className="absolute top-[5%] bottom-[5%] left-1/2 aspect-[9/19] -translate-x-1/2 rounded-[36px] border border-line bg-[oklch(0.13_0.01_295)] p-[9px] shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)]"
        >
          <div className="relative size-full overflow-hidden rounded-[28px] bg-bg3">
            <img src={project.img} alt={project.name} className="block size-full object-cover object-top" />
            <span className="absolute top-2 left-1/2 h-[18px] w-[32%] -translate-x-1/2 rounded-full bg-[oklch(0.13_0.01_295)]" />
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper
      {...link}
      data-tilt=""
      className="block overflow-hidden rounded-2xl border border-line bg-bg2 text-fg shadow-[0_40px_100px_-40px_color-mix(in_oklch,var(--acc)_45%,transparent)]"
    >
      <div className="flex items-center gap-1.5 border-b border-line px-3.5 py-2.5">
        <WindowDots />
        <span className="ml-2.5 flex-1 truncate rounded-md bg-bg px-2.5 py-[5px] font-mono text-[11.5px] text-mute">
          <FaLock className="mr-1.5 inline text-[10px]" />
          {href ? host(href) : t('projects.noDeployHost')}
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-bg3">
        {project.img ? (
          <img src={project.img} alt={project.name} className="block size-full object-cover object-top" />
        ) : (
          <Placeholder label={`[ screenshot — ${project.name} ]`} />
        )}
      </div>
    </Wrapper>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(135deg,var(--bg3)_0_12px,var(--bg2)_12px_24px)] font-mono text-xs text-mute">
      {label}
    </div>
  );
}

function StackTags({ stack, small = false }: { stack: string[]; small?: boolean }) {
  return (
    <ul className={`m-0 flex list-none flex-wrap p-0 ${small ? 'gap-[5px]' : 'gap-1.5'}`}>
      {stack.map((s) => (
        <li
          key={s}
          className={`border border-line bg-bg3 font-mono ${small ? 'rounded-[5px] px-[7px] py-[3px] text-[10.5px]' : 'rounded-md px-[9px] py-1 text-[11.5px] text-fg'}`}
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

/** Mobile: cards empilhados. */
function ProjectsGrid() {
  const { t } = useTranslation();
  return (
    <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-5 p-0">
      {projects.map((p, i) => {
        const Card = p.site ? 'a' : 'div';
        const link = p.site ? { href: p.site, target: '_blank', rel: 'noopener noreferrer' } : {};
        return (
          <Reveal as="li" key={p.id} index={i % 3}>
            <Card {...link} className="block h-full overflow-hidden rounded-[14px] border border-line bg-bg2 text-fg">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-bg3">
                {p.img && p.mobile ? (
                  <div className="absolute inset-0 [background:radial-gradient(circle_at_50%_60%,color-mix(in_oklch,var(--acc)_26%,transparent),transparent_65%),var(--bg2)]">
                    <div className="absolute top-[7%] bottom-[7%] left-1/2 aspect-[9/19] -translate-x-1/2 rounded-[22px] border border-line bg-[oklch(0.13_0.01_295)] p-[5px]">
                      <img src={p.img} alt={p.name} loading="lazy" className="block size-full rounded-[17px] object-cover object-top" />
                    </div>
                  </div>
                ) : p.img ? (
                  <img src={p.img} alt={p.name} loading="lazy" className="block size-full object-cover object-top" />
                ) : (
                  <Placeholder label="[ screenshot ]" />
                )}
              </div>
              <div className="flex flex-col gap-2.5 px-4 pt-3.5 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-acc">{pad(i + 1)}</span>
                  <span className="flex-1 text-xl font-semibold tracking-[-0.02em]">{p.name}</span>
                  {p.site && <FiArrowUpRight className="text-mute" />}
                </div>
                <p className="m-0 text-sm leading-normal text-mute">{t(`projects.items.${p.id}.desc`)}</p>
                <StackTags stack={p.stack} small />
              </div>
            </Card>
          </Reveal>
        );
      })}
    </ul>
  );
}
