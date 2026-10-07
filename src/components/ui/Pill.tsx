import type { ComponentPropsWithoutRef } from 'react';

type Variant = 'solid' | 'outline';

const base =
  'inline-flex items-center gap-2.5 rounded-full text-base transition-[background,color,border-color] duration-300';
const variants: Record<Variant, string> = {
  solid: 'bg-acc px-[26px] py-4 font-semibold text-ink hover:bg-fg hover:text-bg',
  outline: 'border border-line px-6 py-[15px] font-medium text-fg hover:border-fg hover:bg-bg2',
};

type Props = ComponentPropsWithoutRef<'a'> & { variant?: Variant };

/** Link com aparência de botão (CTA). `data-mag` ativa o efeito magnético do modo FX. */
export function PillLink({ variant = 'solid', className = '', ...props }: Props) {
  return <a data-mag="" className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

export function PillButton({
  variant = 'solid',
  className = '',
  ...props
}: ComponentPropsWithoutRef<'button'> & { variant?: Variant }) {
  return <button type="button" data-mag="" className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
