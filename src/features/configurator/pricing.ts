// Pure, cents-based money math. No React, no store — trivially testable.

export interface Totals {
  total: number;
  preDiscountTotal: number;
  savings: number;
}

export interface PricedLine {
  linePrice: number;
  lineCompareAt: number;
}

/** "$27.98" — formats integer cents as USD. */
export const formatMoney = (cents: number): string => {
  const sign = cents < 0 ? '-' : '';
  const abs = Math.abs(cents);
  return `${sign}$${(abs / 100).toFixed(2)}`;
};

export const lineTotal = (unitCents: number, qty: number): number =>
  unitCents * qty;

/**
 * total = Σ(price×qty); preDiscountTotal = Σ(compareAt×qty); savings = diff.
 * Operates on already-computed line totals so it stays a pure reduce.
 */
export const sumTotals = (lines: PricedLine[]): Totals => {
  let total = 0;
  let preDiscountTotal = 0;
  for (const l of lines) {
    total += l.linePrice;
    preDiscountTotal += l.lineCompareAt;
  }
  return { total, preDiscountTotal, savings: preDiscountTotal - total };
};
