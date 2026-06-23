export type Category = 'Cameras' | 'Sensors' | 'Accessories' | 'Plan';

export interface Variant {
  id: string;
  label: string;
  swatch: string;
  thumbnail: string;
}

export interface Product {
  id: string;
  category: Category;
  stepId: string;
  title: string;
  description: string;
  image: string;
  learnMoreUrl: string;
  badge?: string;
  compareAtPrice: number;
  price: number;
  priceSuffix?: string;
  required?: boolean;
  selectable?: boolean;
  variants?: Variant[];
}

export interface Step {
  id: string;
  label: string;
  title: string;
  icon: string;
}

export interface ShippingInfo {
  label: string;
  compareAtPrice: number;
  price: number;
}

export interface GuaranteeInfo {
  title: string;
  body: string;
}

export interface UiConfig {
  mobileHeading: string;
  reviewEyebrow: string;
  reviewHeading: string;
  reviewSubtitle: string;
  shipping: ShippingInfo;
  guarantee: GuaranteeInfo;
  financingFromCents: number;
  checkoutLabel: string;
  saveForLaterLabel: string;
}

export interface Selections {
  quantities: Record<string, number>;
  activeVariant: Record<string, string>;
  openStep: string;
}

export interface SystemResponse {
  steps: Step[];
  categoryOrder: Category[];
  products: Product[];
  uiConfig: UiConfig;
  seed: Selections;
}

export interface PersistedSelections extends Selections {
  version: number;
}
