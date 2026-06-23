import { useTotals } from '../../configurator/hooks';
import { formatMoney } from '../../configurator/pricing';

export const SavingsCallout = () => {
  const { savings } = useTotals();
  if (savings <= 0) return null;
  return (
    <p className="text-center text-[14px] font-semibold text-save">
      Congrats! You&apos;re saving {formatMoney(savings)} on your security
      bundle!
    </p>
  );
};
