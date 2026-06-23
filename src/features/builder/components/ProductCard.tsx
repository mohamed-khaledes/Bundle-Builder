import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import type { Product } from '../../configurator/configurator.types';
import { keyFor } from '../../configurator/keys';
import {
  useActiveVariantId,
  useProductSelected,
} from '../../configurator/hooks';
import { Badge } from '../../../components/Badge';
import { Pricing } from '../../../components/Pricing';
import { QuantityStepper } from '../../../components/QuantityStepper';
import { VariantSelector } from './VariantSelector';

interface Props {
  product: Product;
}

const ProductCardImpl = ({ product }: Props) => {
  const variantId = useActiveVariantId(product);
  const selected = useProductSelected(product);
  const qtyKey = keyFor(product.id, variantId);

  return (
    <article
      className={`relative flex h-full flex-col rounded-card border-2 bg-surface p-3.5 transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none xl:flex-row xl:gap-4 ${
        selected
          ? 'border-brand shadow-sm'
          : 'border-transparent shadow-[0_1px_3px_rgba(16,24,40,0.07)]'
      }`}
    >
      {product.badge && <Badge text={product.badge} />}

      {/* Image — explicit box to avoid layout shift */}
      <div className="flex h-32 w-full items-center justify-center xl:h-full xl:w-24 xl:shrink-0">
        <img
          src={product.image}
          alt={product.title}
          width={96}
          height={96}
          loading="lazy"
          decoding="async"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <h3 className="font-display text-[16px] font-semibold leading-tight text-ink">
          {product.title}
        </h3>
        <p className="mt-1 text-[13px] leading-snug text-muted">
          {product.description}{' '}
          <Link
            to={`/product/${product.id}`}
            aria-label={`Learn more about ${product.title}`}
            className="rounded font-medium text-brand underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Learn More
          </Link>
        </p>

        {product.variants?.length ? (
          <div className="my-2">
            <VariantSelector product={product} />
          </div>
        ) : null}

        <div className="mt-3 flex items-center justify-between gap-2 xl:mt-auto">
          {product.selectable === false ? (
            <span className="inline-flex items-center gap-1 rounded-md bg-brand-soft px-1 py-1.5 text-[12px] font-semibold text-brand">
              <Check size={14} strokeWidth={3} aria-hidden="true" /> Included
            </span>
          ) : (
            <QuantityStepper
              qtyKey={qtyKey}
              label={product.title}
              disabled={product.required}
              min={product.required ? 1 : 0}
            />
          )}
          <Pricing
            compareAtPrice={product.compareAtPrice}
            price={product.price}
            priceSuffix={product.priceSuffix}
            variant="card"
          />
        </div>
      </div>
    </article>
  );
};

export const ProductCard = memo(ProductCardImpl);
