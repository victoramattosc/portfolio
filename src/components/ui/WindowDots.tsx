/** Os três pontinhos de uma janela de app; o último usa a cor de destaque. */
export function WindowDots({ size = 10 }: { size?: number }) {
  const dot = { width: size, height: size } as const;
  return (
    <>
      <span className="rounded-full bg-line" style={dot} />
      <span className="rounded-full bg-line" style={dot} />
      <span className="rounded-full bg-acc" style={dot} />
    </>
  );
}
