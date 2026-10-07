import { useTranslation } from 'react-i18next';
import { FaRegCopy } from 'react-icons/fa6';
import { FiArrowUpRight } from 'react-icons/fi';
import { useCopyEmail } from '@/hooks/useCopyEmail';
import { EMAIL, socials } from '@/data/profile';
import { Reveal } from '@/components/ui/Reveal';

export function Contact() {
  const { t } = useTranslation();
  const { copied, copy } = useCopyEmail();

  return (
    <section id="contato" className="mx-auto max-w-[1320px] px-[clamp(20px,4vw,48px)] pt-[clamp(100px,14vw,180px)] pb-[160px]">
      <Reveal className="mb-5 flex gap-3 font-mono text-[13px] text-mute">
        <span className="text-acc">05</span>
        <span>~/victor/contato.sh</span>
      </Reveal>
      <Reveal as="h2" index={1} className="m-0 text-[clamp(56px,12vw,190px)] leading-[0.88] font-extrabold tracking-[-0.05em]">
        {t('contact.line1')}
        <br />
        <span className="text-acc">{t('contact.line2')}</span>
        <span className="text-mute">.</span>
      </Reveal>
      <Reveal index={2} className="mt-[clamp(24px,3vw,40px)] mb-[clamp(40px,6vw,72px)] flex flex-wrap items-baseline gap-x-5 gap-y-2">
        <span className="text-[clamp(18px,1.8vw,24px)] font-medium">{t('contact.social')}</span>
        <span className="font-mono text-xs tracking-[0.12em] text-mute">{t('contact.service')}</span>
      </Reveal>

      <Reveal
        as="button"
        type="button"
        index={3}
        data-cur={t('contact.copy')}
        onClick={copy}
        className="flex w-full flex-wrap items-center gap-4 border-y border-line py-[clamp(20px,3vw,32px)] text-left transition-colors duration-300 hover:text-acc"
      >
        <span className="text-[clamp(22px,4.4vw,60px)] font-semibold tracking-[-0.03em] [overflow-wrap:anywhere]">{EMAIL}</span>
        <span className="flex items-center gap-1.5 rounded-full bg-acc px-3 py-1.5 font-mono text-xs text-ink">
          <FaRegCopy />
          {copied ? t('contact.copied') : t('contact.copy')}
        </span>
      </Reveal>

      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] p-0">
        {socials.map(({ name, handle, url, icon: Icon }, i) => (
          <Reveal as="li" key={name} index={i}>
            <a
              href={url}
              target={url.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              data-mag=""
              className="flex items-center gap-4 border-b border-line px-1 py-6 transition-colors duration-300 hover:text-acc"
            >
              <span className="grid size-12 flex-none place-items-center rounded-xl border border-line bg-bg2 text-xl text-acc">
                <Icon />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-xl font-semibold">{name}</span>
                <span className="truncate font-mono text-xs text-mute">{handle}</span>
              </span>
              <FiArrowUpRight />
            </a>
          </Reveal>
        ))}
      </ul>

      <footer className="mt-[clamp(56px,8vw,96px)] flex flex-wrap justify-between gap-4 font-mono text-xs text-mute">
        <span>© {new Date().getFullYear()} Victor Carbelotti</span>
        <span>Lençóis Paulista — SP</span>
      </footer>
    </section>
  );
}
