import { useCallback } from 'react';
import { useStore } from '../features/configurator/store';

export const useQuantity = (qtyKey: string, min = 0) => {
  const qty = useStore((s) => s.quantities[qtyKey] ?? 0);
  const inc = useStore((s) => s.increment);
  const dec = useStore((s) => s.decrement);

  const increment = useCallback(() => inc(qtyKey), [inc, qtyKey]);
  const decrement = useCallback(() => dec(qtyKey, min), [dec, qtyKey, min]);

  return { qty, increment, decrement };
};
