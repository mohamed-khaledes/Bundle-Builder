import { useRef } from 'react';
import type { Product } from '../../configurator/configurator.types';
import { useStore } from '../../configurator/store';
import { useActiveVariantId } from '../../configurator/hooks';

interface Props {
  product: Product;
}

export const VariantSelector = ({ product }: Props) => {
  const setActiveVariant = useStore((s) => s.setActiveVariant);
  const active = useActiveVariantId(product);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const variants = product.variants;
  if (!variants?.length) return null;

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = variants.length - 1;
    let next = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
      next = index === last ? 0 : index + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
      next = index === 0 ? last : index - 1;
    else return;
    e.preventDefault();
    setActiveVariant(product.id, variants[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={`${product.title} colour`}
      className="flex flex-wrap gap-1.5"
    >
      {variants.map((v, i) => {
        const isActive = v.id === active;
        return (
          <button
            key={v.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => setActiveVariant(product.id, v.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`flex items-center gap-1.5 rounded-md border px-1 py-1 text-[12px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 motion-reduce:transition-none ${
              isActive
                ? 'border-brand text-ink'
                : 'border-line text-muted hover:border-line-strong'
            }`}
          >
            <span
              aria-hidden="true"
              className="grid h-5 w-5 shrink-0 place-items-center overflow-hidden rounded border border-black/10"
              // style={{ backgroundColor: v.swatch }}
            >
              <img
                src={v.thumbnail}
                alt={v.label}
                title={v.label}
                loading="lazy"
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </span>
            {v.label}
          </button>
        );
      })}
    </div>
  );
};
