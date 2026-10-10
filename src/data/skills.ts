import type { IconType } from 'react-icons';
import { FaComputer, FaCode, FaLaptopCode, FaDiagramProject, FaPenRuler, FaWifi } from 'react-icons/fa6';

export type SkillCategory = 'front' | 'back' | 'data' | 'infra';
/** 1 = aprendendo … 4 = uso diário (índice em `skills.levels`). */
export type SkillLevel = 1 | 2 | 3 | 4;

export interface Skill {
  name: string;
  cat: SkillCategory;
  level: SkillLevel;
}

export const skills: Skill[] = [
  { name: 'React', cat: 'front', level: 4 },
  { name: 'Angular', cat: 'front', level: 4 },
  { name: 'TypeScript', cat: 'front', level: 4 },
  { name: 'JavaScript', cat: 'front', level: 4 },
  { name: 'HTML · CSS/SCSS', cat: 'front', level: 4 },
  { name: 'Python', cat: 'back', level: 4 },
  { name: 'Django', cat: 'back', level: 4 },
  { name: 'FastAPI', cat: 'back', level: 4 },
  { name: 'REST API', cat: 'back', level: 4 },
  { name: 'SQL', cat: 'data', level: 4 },
  { name: 'PostgreSQL', cat: 'data', level: 3 },
  { name: 'MySQL', cat: 'data', level: 3 },
  { name: 'React Native', cat: 'front', level: 3 },
  { name: 'Flutter', cat: 'front', level: 3 },
  { name: 'Ionic', cat: 'front', level: 3 },
  { name: 'Node.js', cat: 'back', level: 3 },
  { name: 'Java', cat: 'back', level: 3 },
  { name: 'Spring Boot', cat: 'back', level: 3 },
  { name: 'Docker', cat: 'infra', level: 3 },
  { name: 'Supabase', cat: 'data', level: 3 },
  { name: 'RxDB', cat: 'data', level: 3 },
  { name: 'WebSocket', cat: 'back', level: 3 },
  { name: 'Prisma', cat: 'data', level: 3 },
  { name: 'Knex', cat: 'data', level: 3 },
  { name: 'Redis', cat: 'data', level: 3 },
  { name: 'Celery', cat: 'back', level: 3 },
  { name: 'Cron', cat: 'back', level: 3 },
  { name: 'Kubernetes', cat: 'infra', level: 2 },
  { name: 'C#', cat: 'back', level: 2 },
  { name: 'PHP', cat: 'back', level: 2 },
];

export const services: { key: string; icon: IconType }[] = [
  { key: 'frontend', icon: FaLaptopCode },
  { key: 'backend', icon: FaCode },
  { key: 'design', icon: FaPenRuler },
  { key: 'architecture', icon: FaDiagramProject },
  { key: 'hardware', icon: FaComputer },
  { key: 'network', icon: FaWifi },
];
