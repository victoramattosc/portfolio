import { useEffect, useRef, type ComponentPropsWithoutRef, type ElementType } from 'react';

const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function play(el: HTMLElement) {
  if (el.hasAttribute('data-revealed')) return;
  el.setAttribute('data-revealed', '');
  if (reduceMotion()) return;
  const fx = document.documentElement.dataset.fx === 'on';
  const i = Math.min(Number(el.dataset.reveal ?? 0), 8);
  const frames: Keyframe[] = fx
    ? [
        { opacity: 0, transform: 'translateY(80px) rotate(2deg)', clipPath: 'inset(0 0 100% 0)', filter: 'blur(8px)' },
        { opacity: 1, transform: 'none', clipPath: 'inset(0 0 0% 0)', filter: 'blur(0)' },
      ]
    : [
        { opacity: 0, transform: 'translateY(22px)' },
        { opacity: 1, transform: 'none' },
      ];
  el.animate(frames, {
    duration: fx ? 1100 : 600,
    delay: i * (fx ? 85 : 55),
    easing: 'cubic-bezier(.16,1,.3,1)',
    fill: 'backwards',
  });
}

let observer: IntersectionObserver | undefined;
function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        play(entry.target as HTMLElement);
        observer?.unobserve(entry.target);
      }),
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  return observer;
}

type RevealProps<T extends ElementType> = { as?: T; index?: number } & Omit<ComponentPropsWithoutRef<T>, 'as'>;

/** Faz o elemento aparecer ao entrar na viewport. `index` escalona o atraso entre irmãos. */
export function Reveal<T extends ElementType = 'div'>({ as, index = 0, ...props }: RevealProps<T>) {
  const Tag: ElementType = as ?? 'div';
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return <Tag ref={ref} data-reveal={index} {...props} />;
}
