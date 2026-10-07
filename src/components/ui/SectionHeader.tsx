import { Reveal } from './Reveal';

interface Props {
  index: string;
  path: string;
  title: string;
  className?: string;
}

export function SectionHeader({ index, path, title, className = '' }: Props) {
  return (
    <Reveal className={`flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5 ${className}`}>
      <h2 className="m-0 text-[clamp(52px,9vw,128px)] leading-[0.9] font-bold tracking-[-0.045em]">{title}</h2>
      <div className="flex gap-3 font-mono text-[13px] text-mute">
        <span className="text-acc">{index}</span>
        <span>{path}</span>
      </div>
    </Reveal>
  );
}
