import { useMemo } from 'react';
import type { Product } from './configurator.types';
import { useStore } from './store';
import {
  activeVariantId,
  computeTotals,
  isProductSelected,
  reviewGroups,
  stepSelectedCount,
} from './selectors';

export const useUiConfig = () => useStore((s) => s.uiConfig);
export const useSteps = () => useStore((s) => s.steps);

export const useStepProducts = (stepId: string): Product[] => {
  const products = useStore((s) => s.products);
  return useMemo(
    () => products.filter((p) => p.stepId === stepId),
    [products, stepId]
  );
};

export const useProduct = (productId: string): Product | undefined =>
  useStore((s) => s.products.find((p) => p.id === productId));

/** Number — re-renders the step header only when the count actually changes. */
export const useStepCount = (stepId: string): number => {
  const products = useStore((s) => s.products);
  return useStore((s) => stepSelectedCount(products, s.quantities, stepId));
};

/** String — re-renders only when this product's active variant changes. */
export const useActiveVariantId = (product: Product): string =>
  useStore((s) => activeVariantId(s.activeVariant, product));

/** Boolean — re-renders only when this product's selected state flips. */
export const useProductSelected = (product: Product): boolean =>
  useStore((s) => isProductSelected(s.quantities, product));

export const useReviewGroups = () => {
  const products = useStore((s) => s.products);
  const categoryOrder = useStore((s) => s.categoryOrder);
  const quantities = useStore((s) => s.quantities);
  return useMemo(
    () => reviewGroups(products, categoryOrder, quantities),
    [products, categoryOrder, quantities]
  );
};

export const useTotals = () => {
  const products = useStore((s) => s.products);
  const quantities = useStore((s) => s.quantities);
  return useMemo(
    () => computeTotals(products, quantities),
    [products, quantities]
  );
};
