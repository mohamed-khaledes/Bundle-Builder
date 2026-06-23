import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '../../configurator/configurator.types';
import { keyFor } from '../../configurator/keys';
import { useActiveVariantId } from '../../configurator/hooks';
import { Badge } from '../../../components/Badge';
import { Pricing } from '../../../components/Pricing';
import { QuantityStepper } from '../../../components/QuantityStepper';
import { VariantSelector } from '../../builder/components/VariantSelector';

interface Props {
  product: Product;
}

export const ProductDetail = ({ product }: Props) => {
  const variantId = useActiveVariantId(product);
  const qtyKey = keyFor(product.id, variantId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 rounded text-[14px] font-medium text-brand underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        <ArrowLeft size={16} aria-hidden="true" /> Back to builder
      </Link>

      <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:gap-10">
        {/* Image */}
        <div className="relative flex items-center justify-center rounded-3xl bg-surface-accent p-8 sm:p-12">
          {product.badge && <Badge text={product.badge} />}
          <img
            src={product.image}
            alt={product.title}
            width={420}
            height={420}
            className="max-h-90 w-full object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="eyebrow">{product.category}</span>
          <h1 className="mt-1 font-display text-[28px] font-bold leading-tight text-ink sm:text-[32px]">
            {product.title}
          </h1>

          <div className="mt-3">
            <Pricing
              compareAtPrice={product.compareAtPrice}
              price={product.price}
              priceSuffix={product.priceSuffix}
              variant="card"
            />
          </div>

          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            {product.description}
          </p>

          {product.variants?.length ? (
            <div className="mt-6">
              <h2 className="mb-2 text-[13px] font-semibold text-ink">Color</h2>
              <VariantSelector product={product} />
            </div>
          ) : null}

          <div className="mt-6">
            <h2 className="mb-2 text-[13px] font-semibold text-ink">
              Quantity
            </h2>
            {product.selectable === false ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-brand-soft px-3 py-2 text-[13px] font-semibold text-brand">
                <Check size={15} strokeWidth={3} aria-hidden="true" /> Included
                in your system
              </span>
            ) : (
              <QuantityStepper
                qtyKey={qtyKey}
                label={product.title}
                disabled={product.required}
                min={product.required ? 1 : 0}
              />
            )}
          </div>

          <p className="mt-5 text-[13px] text-muted">
            Quantity and colour stay in sync with your builder and review panel.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
