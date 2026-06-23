import type { Category, Product, Variant } from './configurator.types';
import { SINGLE, keyFor } from './keys';
import { lineTotal, sumTotals, type Totals } from './pricing';

type Quantities = Record<string, number>;

const variantIds = (product: Product): string[] =>
  product.variants?.length ? product.variants.map((v) => v.id) : [SINGLE];

export const getQuantity = (
  quantities: Quantities,
  productId: string,
  variantId: string = SINGLE
): number => quantities[keyFor(productId, variantId)] ?? 0;

/** The variant the card's stepper is currently bound to. */
export const activeVariantId = (
  activeVariant: Record<string, string>,
  product: Product
): string => {
  if (!product.variants?.length) return SINGLE;
  return activeVariant[product.id] ?? product.variants[0].id;
};

/** True when ANY variant of the product has quantity > 0. */
export const isProductSelected = (
  quantities: Quantities,
  product: Product
): boolean =>
  variantIds(product).some(
    (vid) => getQuantity(quantities, product.id, vid) > 0
  );

/** Count of DISTINCT products in a step that have any variant qty > 0. */
export const stepSelectedCount = (
  products: Product[],
  quantities: Quantities,
  stepId: string
): number =>
  products
    .filter((p) => p.stepId === stepId)
    .filter((p) => isProductSelected(quantities, p)).length;

export interface ReviewLine {
  key: string;
  product: Product;
  variant?: Variant;
  qty: number;
  linePrice: number;
  lineCompareAt: number;
}

/** Every (product, variant) with qty > 0 becomes its own review line. */
export const reviewLines = (
  products: Product[],
  quantities: Quantities
): ReviewLine[] => {
  const lines: ReviewLine[] = [];
  for (const product of products) {
    const variants = product.variants?.length ? product.variants : [undefined];
    for (const variant of variants) {
      const vid = variant?.id ?? SINGLE;
      const qty = getQuantity(quantities, product.id, vid);
      if (qty <= 0) continue;
      lines.push({
        key: keyFor(product.id, vid),
        product,
        variant,
        qty,
        linePrice: lineTotal(product.price, qty),
        lineCompareAt: lineTotal(product.compareAtPrice, qty),
      });
    }
  }
  return lines;
};

export interface ReviewGroupData {
  category: Category;
  lines: ReviewLine[];
}

export const reviewGroups = (
  products: Product[],
  categoryOrder: Category[],
  quantities: Quantities
): ReviewGroupData[] => {
  const all = reviewLines(products, quantities);
  return categoryOrder
    .map((category) => ({
      category,
      lines: all.filter((l) => l.product.category === category),
    }))
    .filter((g) => g.lines.length > 0);
};

export const computeTotals = (
  products: Product[],
  quantities: Quantities
): Totals => sumTotals(reviewLines(products, quantities));
