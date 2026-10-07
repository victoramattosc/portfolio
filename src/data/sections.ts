import type { IconType } from 'react-icons';
import { FaBriefcase, FaComments, FaHouse, FaLayerGroup, FaUser } from 'react-icons/fa6';

export const SECTIONS = [
  { key: 'home', id: 'inicio', icon: FaHouse },
  { key: 'about', id: 'sobre', icon: FaUser },
  { key: 'skills', id: 'capacidades', icon: FaLayerGroup },
  { key: 'projects', id: 'projetos', icon: FaBriefcase },
  { key: 'contact', id: 'contato', icon: FaComments },
] as const satisfies readonly { key: string; id: string; icon: IconType }[];

export type SectionKey = (typeof SECTIONS)[number]['key'];
export const SECTION_IDS = SECTIONS.map((s) => s.id);

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = id === 'inicio' ? 0 : el.getBoundingClientRect().top + window.scrollY - 10;
  window.scrollTo({ top, behavior: 'smooth' });
}
