import truck from '../../../assets/Vector.png';
import { formatMoney } from '../../configurator/pricing';
import type { ShippingInfo } from '../../configurator/configurator.types';

interface Props {
  shipping: ShippingInfo;
}

export const ShippingRow = ({ shipping }: Props) => {
  const { label, compareAtPrice, price } = shipping;
  return (
    <div className="flex items-center gap-3 border-t border-line py-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface">
        <img src={truck} alt="" width={20} height={20} className="w-5" />
      </div>
      <p className="flex-1 text-[14px] font-medium text-ink">{label}</p>
      <div className="tnum flex items-baseline gap-2">
        {compareAtPrice > price && (
          <span className="text-[12px] text-muted line-through">
            {formatMoney(compareAtPrice)}
          </span>
        )}
        <span className="text-[13px] font-bold text-brand">
          {price === 0 ? 'FREE' : formatMoney(price)}
        </span>
      </div>
    </div>
  );
};
