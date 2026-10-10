/**
 * Marcador de clique que sai do próprio elemento: o contorno do botão pulsa para fora
 * e riscos curtos irradiam das bordas, como o "toque" de tutoriais e botões de curtir.
 */
const TICKS: { x: number; y: number; angle: number }[] = [
  { x: 0.12, y: 0, angle: -38 },
  { x: 0.3, y: 0, angle: -14 },
  { x: 0.5, y: 0, angle: 0 },
  { x: 0.7, y: 0, angle: 14 },
  { x: 0.88, y: 0, angle: 38 },
  { x: 0, y: 0.3, angle: -72 },
  { x: 1, y: 0.3, angle: 72 },
];

export function clickFx(el: Element) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const r = el.getBoundingClientRect();
  const radius = getComputedStyle(el).borderTopLeftRadius;
  const host = document.createElement('span');
  Object.assign(host.style, {
    position: 'fixed',
    left: `${r.left}px`,
    top: `${r.top}px`,
    width: `${r.width}px`,
    height: `${r.height}px`,
    zIndex: '90',
    pointerEvents: 'none',
  });

  const ring = document.createElement('span');
  Object.assign(ring.style, {
    position: 'absolute',
    inset: '0',
    borderRadius: radius,
    border: '2px solid var(--acc)',
  });
  host.append(ring);
  const anims = [
    ring.animate(
      [
        { inset: '0px', opacity: 0.9 },
        { inset: '-10px', opacity: 0 },
      ],
      { duration: 460, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' },
    ),
  ];

  for (const { x, y, angle } of TICKS) {
    const tick = document.createElement('span');
    Object.assign(tick.style, {
      position: 'absolute',
      left: `${x * r.width - 1}px`,
      top: `${y * r.height - 5}px`,
      width: '2px',
      height: '10px',
      borderRadius: '2px',
      background: 'var(--acc)',
    });
    host.append(tick);
    anims.push(
      tick.animate(
        [
          { transform: `rotate(${angle}deg) translateY(-6px) scaleY(0.3)`, opacity: 1 },
          { transform: `rotate(${angle}deg) translateY(-18px) scaleY(1)`, opacity: 1, offset: 0.45 },
          { transform: `rotate(${angle}deg) translateY(-26px) scaleY(0.2)`, opacity: 0 },
        ],
        { duration: 460, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' },
      ),
    );
  }

  document.body.append(host);
  Promise.all(anims.map((a) => a.finished)).then(() => host.remove());
}
