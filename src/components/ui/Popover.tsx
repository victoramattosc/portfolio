import { useEffect, useRef, useState, type ReactNode } from 'react';

interface Props {
  title: string;
  /** Conteúdo do botão que abre o popover. */
  trigger: ReactNode;
  /** Recebe `close` para fechar após uma escolha. */
  children: (close: () => void) => ReactNode;
  align?: 'center' | 'right';
  width: number;
}

export function Popover({ title, trigger, children, align = 'center', width }: Props) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        title={title}
        aria-label={title}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 rounded-[10px] p-2 text-mute transition-colors hover:bg-bg3 hover:text-fg ${open ? 'bg-bg3' : ''}`}
      >
        {trigger}
      </button>
      {open && (
        <div
          className={`pop-card absolute bottom-[calc(100%+14px)] flex flex-col gap-0.5 rounded-[14px] border border-line bg-bg2 p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,.55)] ${align === 'center' ? 'left-1/2 -translate-x-1/2' : '-right-1.5'}`}
          style={{ width }}
        >
          <div className="px-2.5 pt-1.5 pb-2 text-[11px] text-mute">{title}</div>
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}
