import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaCodeBranch, FaCodeCommit, FaFileCode, FaQuoteLeft } from 'react-icons/fa6';
import { EMAIL, RESUME_URL, getAge } from '@/data/profile';
import { PillLink } from '@/components/ui/Pill';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface EducationItem { date: string; title: string; text: string }
interface ExperienceItem { date: string; title: string; org: string; points: string[] }

const GRID = 'grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))]';
const DATE = 'mb-1.5 font-mono text-xs text-acc';
const ITEM_TITLE = 'text-[clamp(19px,1.7vw,23px)] font-semibold tracking-[-0.01em]';

export function About() {
  const { t } = useTranslation();
  const education = t('about.education', { returnObjects: true }) as EducationItem[];
  const experience = t('about.experience', { returnObjects: true }) as ExperienceItem[];

  return (
    <section id="sobre" className="mx-auto max-w-[1320px] px-[clamp(20px,4vw,48px)] pt-[clamp(80px,12vw,160px)]">
      <SectionHeader index="02" path="~/victor/sobre.md" title={t('about.title')} className="mb-[clamp(40px,6vw,72px)]" />

      <div className={`${GRID} items-start gap-[clamp(32px,5vw,72px)]`}>
        <div className="flex flex-col gap-7">
          <Reveal as="p" index={1} className="m-0 text-[clamp(22px,2.4vw,32px)] leading-[1.3] font-medium tracking-[-0.015em] text-pretty">
            {t('about.intro')}
          </Reveal>
          <Reveal as="blockquote" index={2} className="m-0 flex gap-4 border-t border-line pt-6">
            <FaQuoteLeft className="mt-1 shrink-0 text-[22px] text-acc" />
            <span className="text-[clamp(20px,2vw,26px)] leading-[1.35] font-light text-mute italic">{t('about.quote')}</span>
          </Reveal>
          <Reveal index={3} className="self-start">
            <PillLink href={RESUME_URL} download className="px-6 py-[15px]">
              {t('about.resume')}
              <FaArrowRight />
            </PillLink>
          </Reveal>
        </div>

        <ProfileCard />
      </div>

      <div className={`${GRID} mt-[clamp(64px,9vw,120px)] gap-[clamp(40px,5vw,72px)]`}>
        <div>
          <GitLogLabel icon={FaCodeBranch} label={t('about.gitEducation')} />
          <Timeline>
            {education.map((e, i) => (
              <Reveal key={e.title} index={i} className="relative pl-7">
                <span className="absolute top-1.5 -left-1.5 size-[11px] rounded-full border-2 border-acc bg-bg" />
                <div className={DATE}>{e.date}</div>
                <div className={`${ITEM_TITLE} mb-1.5`}>{e.title}</div>
                <div className="leading-[1.55] text-pretty text-mute">{e.text}</div>
              </Reveal>
            ))}
          </Timeline>
        </div>

        <div>
          <GitLogLabel icon={FaCodeCommit} label={t('about.gitExperience')} />
          <Timeline>
            {experience.map((e, i) => (
              <Reveal key={e.title} index={i} className="relative pl-7">
                <span className="absolute top-[5px] -left-[7px] size-[13px] rounded-full bg-acc shadow-[0_0_0_5px_color-mix(in_oklch,var(--acc)_22%,transparent)]" />
                <div className={DATE}>{e.date}</div>
                <div className={`${ITEM_TITLE} mb-0.5`}>{e.title}</div>
                <div className="mb-3 font-mono text-xs text-mute">{e.org}</div>
                <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                  {e.points.map((p) => (
                    <li key={p} className="grid grid-cols-[14px_minmax(0,1fr)] gap-2 leading-normal text-pretty text-mute">
                      <span className="font-mono text-acc">+</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </Timeline>
        </div>
      </div>
    </section>
  );
}

function ProfileCard() {
  const { t } = useTranslation();
  const key = 'text-acc';
  const str = 'text-acc2';
  const row = 'pl-[2ch] [overflow-wrap:anywhere] sm:whitespace-nowrap';
  return (
    <Reveal
      index={2}
      data-tilt=""
      className="overflow-hidden rounded-2xl border border-line bg-bg2 font-mono text-[clamp(13px,1.15vw,15px)]"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3 text-xs text-mute">
        <span className="flex items-center gap-2">
          <FaFileCode className="text-acc" />
          {t('about.profile.file')}
        </span>
        <span>UTF-8</span>
      </div>
      <div className="overflow-x-auto px-[clamp(16px,2vw,24px)] py-5 leading-8">
        <div className="text-mute">{'{'}</div>
        <div className={row}><span className={key}>"{t('about.profile.born')}"</span>: <span className={str}>"03 jun 2005"</span>,</div>
        <div className={row}><span className={key}>"{t('about.profile.age')}"</span>: <span>{getAge()}</span>,</div>
        <div className={row}><span className={key}>"email"</span>: <span className={str}>"{EMAIL}"</span>,</div>
        <div className={row}><span className={key}>"{t('about.profile.education')}"</span>: <span className={str}>"{t('about.profile.educationValue')}"</span>,</div>
        <div className={row}><span className={key}>"{t('about.profile.city')}"</span>: <span className={str}>"Lençóis Paulista - SP"</span>,</div>
        <div className={row}><span className={key}>"freelancer"</span>: <span className={key}>true</span></div>
        <div className="text-mute">{'}'}</div>
      </div>
    </Reveal>
  );
}

function GitLogLabel({ icon: Icon, label }: { icon: typeof FaCodeBranch; label: string }) {
  return (
    <Reveal className="mb-7 flex items-center gap-3 font-mono text-[13px] text-mute">
      <Icon className="text-acc" />
      git log --{label}
    </Reveal>
  );
}

function Timeline({ children }: { children: React.ReactNode }) {
  return <div className="ml-[5px] flex flex-col gap-9 border-l border-line">{children}</div>;
}
