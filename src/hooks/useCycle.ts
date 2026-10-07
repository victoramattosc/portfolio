import { useEffect, useState } from 'react';

/** Índice que avança de 0 a `length - 1` a cada `ms`, em loop. */
export function useCycle(length: number, ms: number): number {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % length), ms);
    return () => clearInterval(id);
  }, [length, ms]);
  return i;
}
