export const SINGLE = '__single__';

export const keyFor = (productId: string, variantId: string = SINGLE): string =>
  `${productId}:${variantId}`;
