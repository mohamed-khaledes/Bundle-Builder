import { Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useQuantity } from '../hooks/useQuantity';

interface Props {
  qtyKey: string;
  label: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
  min?: number;
}

export const QuantityStepper = ({
  qtyKey,
  label,
  size = 'md',
  disabled = false,
  min = 0,
}: Props) => {
  const { qty, increment, decrement } = useQuantity(qtyKey, min);
  const reduce = useReducedMotion();

  const box = size === 'sm' ? 'h-7 w-7 rounded-md' : 'h-8 w-8 rounded-lg';
  const icon = size === 'sm' ? 14 : 16;
  const numW = size === 'sm' ? 'w-6 text-sm' : 'w-7 text-[15px]';

  const baseBtn =
    'grid place-items-center border border-line text-ink transition-colors ' +
    'hover:border-line-strong hover:bg-black/[0.03] active:scale-95 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 ' +
    'motion-reduce:transition-none motion-reduce:active:scale-100 ' +
    'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent';

  return (
    <div
      className="inline-flex select-none items-center gap-2"
      role="group"
      aria-label={`${label} quantity`}
    >
      <button
        type="button"
        aria-label={`Decrease quantity of ${label}`}
        className={`${box} ${baseBtn}`}
        disabled={disabled || qty <= min}
        onClick={decrement}
      >
        <Minus size={icon} strokeWidth={2.5} />
      </button>

      <span
        className={`tnum relative ${numW} text-center font-semibold tabular-nums`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={qty}
            initial={reduce ? false : { y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 8, opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="block"
          >
            {qty}
          </motion.span>
        </AnimatePresence>
      </span>

      <button
        type="button"
        aria-label={`Increase quantity of ${label}`}
        className={`${box} ${baseBtn}`}
        disabled={disabled}
        onClick={increment}
      >
        <Plus size={icon} strokeWidth={2.5} />
      </button>
    </div>
  );
};
