import { memo } from 'react';
import { useStore } from '../../configurator/store';
import { useProduct } from '../../configurator/hooks';
import { keyFor } from '../../configurator/keys';
import { lineTotal } from '../../configurator/pricing';
import { QuantityStepper } from '../../../components/QuantityStepper';
import { Pricing } from '../../../components/Pricing';

interface Props {
  productId: string;
  variantId: string;
}

const ReviewLineItemImpl = ({ productId, variantId }: Props) => {
  const product = useProduct(productId);
  const qty = useStore((s) => s.quantities[keyFor(productId, variantId)] ?? 0);
  if (!product) return null;

  const variant = product.variants?.find((v) => v.id === variantId);
  const label = variant ? `${product.title}, ${variant.label}` : product.title;

  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-surface">
        <img
          src={variant?.thumbnail ?? product.image}
          alt=""
          width={32}
          height={32}
          loading="lazy"
          className="max-h-8 max-w-8 object-contain"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-medium leading-tight text-ink">
          {product.title}
        </p>
        {variant && (
          <p className="text-[12px] leading-tight text-muted">
            {variant.label}
          </p>
        )}
      </div>

      <QuantityStepper
        qtyKey={keyFor(productId, variantId)}
        label={label}
        size="sm"
        disabled={product.required}
        min={product.required ? 1 : 0}
      />

      <div className="w-15 shrink-0 text-right">
        <Pricing
          compareAtPrice={lineTotal(product.compareAtPrice, qty)}
          price={lineTotal(product.price, qty)}
          variant="review"
        />
      </div>
    </div>
  );
};

export const ReviewLineItem = memo(ReviewLineItemImpl);
