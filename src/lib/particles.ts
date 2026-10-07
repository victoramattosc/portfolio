const COLORS = ['var(--acc)', 'var(--acc2)', 'var(--fg)'];

/**
 * Solta faíscas a partir da borda de um elemento: a maioria sai pelo topo
 * (como uma tecla sendo pressionada) e o resto pelas laterais, sempre para fora.
 */
export function burst(el: Element, count = 22) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const r = el.getBoundingClientRect();

  for (let i = 0; i < count; i++) {
    const roll = Math.random();
    // Ponto de origem na borda e ângulo-base (normal da borda). 0 = direita, -90° = cima.
    let x: number, y: number, base: number;
    if (roll < 0.6) {
      x = r.left + Math.random() * r.width;
      y = r.top;
      base = -Math.PI / 2;
    } else if (roll < 0.8) {
      x = r.left;
      y = r.top + Math.random() * r.height * 0.7;
      base = -Math.PI * 0.85;
    } else {
      x = r.right;
      y = r.top + Math.random() * r.height * 0.7;
      base = -Math.PI * 0.15;
    }

    const size = 3 + Math.random() * 5;
    const p = document.createElement('span');
    Object.assign(p.style, {
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${size}px`,
      marginLeft: `${-size / 2}px`,
      marginTop: `${-size / 2}px`,
      borderRadius: Math.random() > 0.45 ? '50%' : '1px',
      background: COLORS[i % COLORS.length],
      pointerEvents: 'none',
      zIndex: '90',
    });

    const angle = base + (Math.random() - 0.5) * 1.1;
    const dist = 30 + Math.random() * 70;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    const spin = (Math.random() - 0.5) * 540;

    document.body.append(p);
    p.animate(
      [
        { transform: 'translate(0,0) rotate(0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px,${dy}px) rotate(${spin / 2}deg) scale(1)`, opacity: 1, offset: 0.55 },
        { transform: `translate(${dx * 1.1}px,${dy + 44}px) rotate(${spin}deg) scale(0)`, opacity: 0 },
      ],
      { duration: 550 + Math.random() * 450, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' },
    ).onfinish = () => p.remove();
  }
}
