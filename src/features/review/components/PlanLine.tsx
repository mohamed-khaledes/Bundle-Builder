import type { Product } from '../../configurator/configurator.types';
import { lineTotal } from '../../configurator/pricing';
import { Pricing } from '../../../components/Pricing';

interface Props {
  product: Product;
  qty: number;
}

export const PlanLine = ({ product, qty }: Props) => {
  const [first, ...rest] = product.title.split(' ');
  return (
    <div className="flex items-center gap-2.5 py-2.5">
      <img
        src={product.image}
        alt=""
        width={20}
        height={20}
        className="h-5 w-5 shrink-0 object-contain"
      />
      <p className="flex-1 font-display text-[15px] font-semibold leading-tight">
        <span className="text-ink">{first}</span>{' '}
        <span className="text-brand">{rest.join(' ')}</span>
      </p>
      <Pricing
        compareAtPrice={lineTotal(product.compareAtPrice, qty)}
        price={lineTotal(product.price, qty)}
        priceSuffix={product.priceSuffix}
        variant="review"
      />
    </div>
  );
};
