const images = import.meta.glob<string>('../assets/projects/*.webp', {
  eager: true,
  import: 'default',
});

const image = (file: string): string | undefined => images[`../assets/projects/${file}.webp`];

export interface Project {
  /** Chave usada em `projects.items.<id>` nos arquivos de tradução. */
  id: string;
  name: string;
  /** Screenshot; quando ausente a UI mostra um placeholder. */
  img?: string;
  /** Screenshot vertical (app mobile) — renderizada dentro de um frame de celular. */
  mobile?: boolean;
  site?: string;
  stack: string[];
}

export const projects: Project[] = [
  { id: 'semFiltro', name: 'Sem Filtro', img: image('semFiltro'), site: 'https://semfiltro.innovatech.dev.br', stack: ['Web', 'Deploy'] },
  { id: 'aqceacha', name: 'AqceAcha', img: image('aqceacha'), mobile: true, stack: ['React Native', 'Expo', 'TypeScript', 'Java', 'Spring Boot', 'JPA', 'MySQL', 'Flyway'] },
  { id: 'cultivi', name: 'Cultivi', img: image('cultivi'), mobile: true, stack: ['Flutter', 'Dart', 'Riverpod', 'Django REST', 'PostgreSQL', 'JWT', 'Google Maps', 'Docker'] },
  { id: 'innovatech', name: 'InnovaTech', img: image('innovatech'), site: 'https://www.innovatech.dev.br', stack: ['Web', 'i18n PT/EN'] },
  { id: 'eventPhotos', name: 'Event Photos', img: image('eventPhotos'), stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind'] },
  { id: 'escritorIA', name: 'Escritor.IA', img: image('escritorIA'), stack: ['Django', 'DRF', 'PostgreSQL + pgvector', 'Groq · LLaMA', 'React', 'TypeScript', 'TipTap', 'Stripe', 'Docker'] },
  { id: 'cityCare', name: 'CityCare', img: image('cityCare'), mobile: true, stack: ['React Native', 'Expo', 'Django REST', 'Channels · WebSocket', 'MySQL', 'JWT', 'Google Maps', 'Docker'] },
  { id: 'movieDB', name: 'MovieDB', img: image('movieDB'), stack: ['React', 'RxDB', 'IndexedDB', 'Django REST', 'Channels · WebSocket', 'Docker'] },
  { id: 'pokedex', name: 'Pokédex Angular', img: image('pokedexAngular'), site: 'https://pokedex-angular-sigma.vercel.app', stack: ['Angular', 'TypeScript', 'REST API'] },
  { id: 'pruChurras', name: 'Pru Churras', img: image('pruChurras'), mobile: true, site: 'https://victoramattosc-pru-churras.vercel.app', stack: ['Ionic'] },
];
