import { useEffect, useRef, useState } from 'react';
import { EMAIL } from '@/data/profile';

/** Copia o e-mail para a área de transferência e expõe um estado `copied` temporário. */
export function useCopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = () => {
    void navigator.clipboard?.writeText(EMAIL);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  };
  return { copied, copy };
}
