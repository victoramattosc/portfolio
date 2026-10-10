import { useEffect, useState } from 'react';

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 1800;
const GAP_MS = 350;

/** Digita cada texto, espera, apaga e passa para o próximo, em loop. */
export function useTypewriter(words: string[]): { word: string; text: string } {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const word = words[i % words.length];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduce) {
      const id = setInterval(() => setI((x) => x + 1), HOLD_MS + 800);
      return () => clearInterval(id);
    }
    let id: ReturnType<typeof setTimeout>;
    if (!deleting) {
      id = n < word.length ? setTimeout(() => setN(n + 1), TYPE_MS) : setTimeout(() => setDeleting(true), HOLD_MS);
    } else if (n > 0) {
      id = setTimeout(() => setN(n - 1), DELETE_MS);
    } else {
      id = setTimeout(() => {
        setDeleting(false);
        setI((x) => x + 1);
      }, GAP_MS);
    }
    return () => clearTimeout(id);
  }, [n, deleting, word, reduce]);

  return { word, text: reduce ? word : word.slice(0, n) };
}
