import { AnimatePresence, motion } from 'framer-motion';
import { useTotals, useUiConfig } from '../../configurator/hooks';
import { formatMoney } from '../../configurator/pricing';

export const TotalRow = () => {
  const { total, preDiscountTotal } = useTotals();
  const uiConfig = useUiConfig();

  return (
    <div className="flex flex-col items-end">
      <span className="rounded-md bg-brand px-2.5 py-1 text-[12px] font-semibold text-white">
        As low as {formatMoney(uiConfig?.financingFromCents ?? 0)}/mo
      </span>
      <div className="tnum mt-2 flex items-baseline gap-2">
        {preDiscountTotal > total && (
          <span className="text-[16px] text-muted line-through">
            {formatMoney(preDiscountTotal)}
          </span>
        )}
        <span className="relative inline-block text-[28px] font-bold leading-none text-brand">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={total}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="block"
            >
              {formatMoney(total)}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
    </div>
  );
};
