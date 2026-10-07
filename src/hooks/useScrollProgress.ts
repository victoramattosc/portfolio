import { useEffect, type RefObject } from 'react';

/** Atualiza a largura da barra de progresso direto no DOM (sem re-render por scroll). */
export function useScrollProgress(barRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? scrollY / max : 0;
      if (barRef.current) barRef.current.style.width = `calc(${p * 100}% - ${p * 24}px)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    return () => {
      removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [barRef]);
}
