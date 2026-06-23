import { formatMoney } from '../features/configurator/pricing';

interface Props {
  compareAtPrice: number;
  price: number;
  priceSuffix?: string;
  variant: 'card' | 'review';
}

export const Pricing = ({
  compareAtPrice,
  price,
  priceSuffix,
  variant,
}: Props) => {
  const discounted = compareAtPrice > price;
  const suffix = priceSuffix ?? '';
  const activeLabel = price === 0 ? 'FREE' : `${formatMoney(price)}${suffix}`;

  if (variant === 'card') {
    return (
      <div className="tnum flex items-baseline gap-1.5 whitespace-nowrap">
        {discounted && (
          <span className="text-[13px] text-sale line-through">
            {formatMoney(compareAtPrice)}
            {suffix}
          </span>
        )}
        <span className="text-[15px] font-semibold text-ink">
          {activeLabel}
        </span>
      </div>
    );
  }

  return (
    <div className="tnum flex flex-col items-end leading-tight">
      {discounted && (
        <span className="text-[12px] text-muted line-through">
          {formatMoney(compareAtPrice)}
          {suffix}
        </span>
      )}
      <span className="text-[13px] font-bold text-brand">{activeLabel}</span>
    </div>
  );
};
