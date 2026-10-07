import { useEffect, useRef } from 'react';
import { useSettings } from '@/context/SettingsContext';

const EASE = 'cubic-bezier(.2,.8,.2,1)';

/** Garante que o elemento anime `prop` além das transições que ele já tem. */
function addTransition(el: HTMLElement, prop: string, duration: string) {
  if (el.dataset.fxTransition) return;
  el.dataset.fxTransition = '1';
  const current = getComputedStyle(el).transition;
  const base = current.startsWith('all') ? '' : `${current}, `;
  el.style.transition = `${base}${prop} ${duration} ${EASE}`;
}

/**
 * Efeitos de ponteiro do modo FX: spotlight, parallax (`data-depth`),
 * magnético (`data-mag`), tilt 3D (`data-tilt`) e cursor customizado (`data-cur`).
 * Tudo manipula o DOM direto dentro de um único listener com rAF — sem re-render.
 */
export function FxEffects() {
  const { fx } = useSettings();
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const fine = typeof matchMedia === 'function' && matchMedia('(pointer: fine)').matches;
  const customCursor = fx && fine;
  const touchFx = fx && !fine;

  useEffect(() => {
    if (!fx || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mx = innerWidth / 2;
    let my = innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let tilted: HTMLElement | null = null;

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    if (customCursor) tick();

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px,${my}px)`;

      const spot = document.querySelector<HTMLElement>('[data-spot]');
      if (spot?.parentElement) {
        const r = spot.parentElement.getBoundingClientRect();
        spot.style.transform = `translate(${mx - r.left - 320}px,${my - r.top - 320}px)`;
      }

      if (scrollY < innerHeight * 1.2) {
        const cx = innerWidth / 2;
        const cy = innerHeight / 2;
        document.querySelectorAll<HTMLElement>('[data-depth]').forEach((el) => {
          const d = Number(el.dataset.depth);
          el.style.translate = `${((mx - cx) * d) / 60}px ${((my - cy) * d) / 60}px`;
        });
      }

      document.querySelectorAll<HTMLElement>('[data-mag]').forEach((el) => {
        addTransition(el, 'translate', '.4s');
        const r = el.getBoundingClientRect();
        const x = mx - (r.left + r.width / 2);
        const y = my - (r.top + r.height / 2);
        const near = Math.abs(x) < r.width / 2 + 40 && Math.abs(y) < r.height / 2 + 40;
        el.style.translate = near ? `${x * 0.3}px ${y * 0.35}px` : '';
      });

      const target = (e.target as Element | null)?.closest<HTMLElement>('[data-tilt]') ?? null;
      if (tilted && tilted !== target) tilted.style.transform = '';
      tilted = target;
      if (target) {
        addTransition(target, 'transform', '.5s');
        const r = target.getBoundingClientRect();
        const px = (mx - r.left) / r.width - 0.5;
        const py = (my - r.top) / r.height - 0.5;
        target.style.transform = `perspective(900px) rotateY(${px * 12}deg) rotateX(${-py * 12}deg) scale(1.02)`;
      }
    };

    const onOver = (e: PointerEvent) => {
      if (!ring.current || !label.current) return;
      const el = e.target as Element | null;
      const cur = el?.closest<HTMLElement>('[data-cur]');
      const link = el?.closest('a,button');
      const size = cur ? 92 : link ? 54 : 36;
      Object.assign(ring.current.style, {
        width: `${size}px`,
        height: `${size}px`,
        marginLeft: `${-size / 2}px`,
        marginTop: `${-size / 2}px`,
        background: cur ? 'var(--acc)' : link ? 'color-mix(in oklch,var(--acc) 18%,transparent)' : 'transparent',
      });
      label.current.textContent = (cur?.dataset.cur ?? '').slice(0, 12);
    };

    // --- Touch: brilho que segue o dedo, ondas ao tocar e parallax pelo scroll ---
    const moveGlow = (x: number, y: number, show: boolean) => {
      const g = glow.current;
      if (!g) return;
      g.style.transform = `translate(${x}px,${y}px)`;
      g.style.opacity = show ? '1' : '0';
    };
    const onTouchDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      moveGlow(e.clientX, e.clientY, true);
      const ripple = document.createElement('span');
      ripple.className = 'fx-ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.addEventListener('animationend', () => ripple.remove());
      document.body.append(ripple);
    };
    const onTouchMove = (e: PointerEvent) => e.pointerType !== 'mouse' && moveGlow(e.clientX, e.clientY, true);
    const onTouchUp = (e: PointerEvent) => e.pointerType !== 'mouse' && moveGlow(e.clientX, e.clientY, false);
    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        if (scrollY > innerHeight * 1.5) return;
        document.querySelectorAll<HTMLElement>('[data-depth]').forEach((el) => {
          el.style.translate = `0 ${(-scrollY * Number(el.dataset.depth)) / 30}px`;
        });
      });
    };
    if (touchFx) {
      addEventListener('pointerdown', onTouchDown, { passive: true });
      addEventListener('pointermove', onTouchMove, { passive: true });
      addEventListener('pointerup', onTouchUp, { passive: true });
      addEventListener('pointercancel', onTouchUp, { passive: true });
      addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    return () => {
      removeEventListener('pointerdown', onTouchDown);
      removeEventListener('pointermove', onTouchMove);
      removeEventListener('pointerup', onTouchUp);
      removeEventListener('pointercancel', onTouchUp);
      removeEventListener('scroll', onScroll);
      cancelAnimationFrame(scrollFrame);
      document.querySelectorAll('.fx-ripple').forEach((el) => el.remove());
      removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      cancelAnimationFrame(raf);
      document.querySelectorAll<HTMLElement>('[data-depth],[data-mag]').forEach((el) => (el.style.translate = ''));
      document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => (el.style.transform = ''));
      document.querySelectorAll<HTMLElement>('[data-fx-transition]').forEach((el) => {
        el.style.transition = '';
        delete el.dataset.fxTransition;
      });
    };
  }, [fx, customCursor, touchFx]);

  if (touchFx) {
    return (
      <div
        ref={glow}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[60] -mt-[150px] -ml-[150px] size-[300px] rounded-full opacity-0 transition-opacity duration-500 [background:radial-gradient(circle,color-mix(in_oklch,var(--acc)_38%,transparent),transparent_65%)]"
      />
    );
  }
  if (!customCursor) return null;
  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] -mt-[18px] -ml-[18px] grid size-9 place-items-center overflow-hidden rounded-full border-[1.5px] border-acc font-mono text-[10px] font-bold tracking-[0.08em] whitespace-nowrap text-ink uppercase transition-[width,height,margin,background] duration-350 ease-[cubic-bezier(.2,.8,.2,1)]"
      >
        <span ref={label} />
      </div>
      <div ref={dot} aria-hidden className="pointer-events-none fixed top-0 left-0 z-[10000] -mt-[3px] -ml-[3px] size-1.5 rounded-full bg-acc" />
    </>
  );
}
