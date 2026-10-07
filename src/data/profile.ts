import type { IconType } from 'react-icons';
import type { Lang } from '@/i18n';
import { FaEnvelope, FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa6';

export const EMAIL = 'victorcarbelotti0306@gmail.com';
/** Currículo em português / resume em inglês, conforme o idioma do site. */
export const RESUME_FILES: Record<Lang, string> = {
  pt: '/Curriculo-Victor-Carbelotti.pdf',
  en: '/Resume-Victor-Carbelotti.pdf',
};
export const BIRTH = { year: 2005, month: 6, day: 3 };

export const socials: { name: string; handle: string; url: string; icon: IconType }[] = [
  { name: 'Email', handle: EMAIL, url: `mailto:${EMAIL}`, icon: FaEnvelope },
  { name: 'LinkedIn', handle: 'Victor Carbelotti', url: 'https://www.linkedin.com/in/victor-carbelotti/', icon: FaLinkedin },
  { name: 'Telegram', handle: '@vitaoocarbelotti', url: 'https://web.telegram.org/k/#@vitaoocarbelotti', icon: FaTelegram },
  { name: 'GitHub', handle: '@victoramattosc', url: 'https://github.com/victoramattosc', icon: FaGithub },
];

export const GITHUB_URL = 'https://github.com/victoramattosc';

export function getAge(now = new Date()): number {
  const age = now.getFullYear() - BIRTH.year;
  const birthdayPassed =
    now.getMonth() + 1 > BIRTH.month || (now.getMonth() + 1 === BIRTH.month && now.getDate() >= BIRTH.day);
  return birthdayPassed ? age : age - 1;
}
