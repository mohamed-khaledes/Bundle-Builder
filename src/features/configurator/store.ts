import { create } from 'zustand';
import type {
  Category,
  Product,
  Step,
  SystemResponse,
  UiConfig,
} from './configurator.types';
import { loadSelections, saveSelections } from './persistence';

interface ConfiguratorStore {
  // ── Catalog (from the API; empty until initialize) ──
  ready: boolean;
  products: Product[];
  steps: Step[];
  categoryOrder: Category[];
  uiConfig: UiConfig | null;

  // ── Selections (the only persisted slice) ──
  quantities: Record<string, number>;
  activeVariant: Record<string, string>;
  openStep: string;
  justSaved: boolean;

  // ── Actions (state only — no derived data lives here) ──
  initialize: (system: SystemResponse) => void;
  setQuantity: (key: string, qty: number) => void;
  increment: (key: string) => void;
  decrement: (key: string, min?: number) => void;
  setActiveVariant: (productId: string, variantId: string) => void;
  setOpenStep: (stepId: string) => void;
  toggleStep: (stepId: string) => void;
  goToNextStep: (currentStepId: string) => void;
  saveForLater: () => void;
  clearSaved: () => void;
}

export const useStore = create<ConfiguratorStore>((set, get) => ({
  ready: false,
  products: [],
  steps: [],
  categoryOrder: [],
  uiConfig: null,

  quantities: {},
  activeVariant: {},
  openStep: '',
  justSaved: false,

  initialize: (system) => {
    if (get().ready) return; // idempotent — survive React 18 StrictMode
    // Saved selections win over the API's seeded defaults; catalog is always
    // from the API.
    const saved = loadSelections();
    set({
      ready: true,
      products: system.products,
      steps: system.steps,
      categoryOrder: system.categoryOrder,
      uiConfig: system.uiConfig,
      quantities: saved?.quantities ?? system.seed.quantities,
      activeVariant: saved?.activeVariant ?? system.seed.activeVariant,
      openStep: saved?.openStep ?? system.seed.openStep,
    });
  },

  setQuantity: (key, qty) =>
    set((s) => ({
      quantities: { ...s.quantities, [key]: Math.max(0, Math.round(qty)) },
    })),

  increment: (key) =>
    set((s) => ({
      quantities: { ...s.quantities, [key]: (s.quantities[key] ?? 0) + 1 },
    })),

  decrement: (key, min = 0) =>
    set((s) => ({
      quantities: {
        ...s.quantities,
        [key]: Math.max(min, (s.quantities[key] ?? 0) - 1),
      },
    })),

  setActiveVariant: (productId, variantId) =>
    set((s) => ({
      activeVariant: { ...s.activeVariant, [productId]: variantId },
    })),

  setOpenStep: (stepId) => set({ openStep: stepId }),

  toggleStep: (stepId) =>
    set((s) => ({ openStep: s.openStep === stepId ? '' : stepId })),

  goToNextStep: (currentStepId) => {
    const { steps } = get();
    const idx = steps.findIndex((s) => s.id === currentStepId);
    const next = steps[idx + 1];
    if (next) set({ openStep: next.id });
  },

  saveForLater: () => {
    const { quantities, activeVariant, openStep } = get();
    if (saveSelections({ quantities, activeVariant, openStep })) {
      set({ justSaved: true });
    }
  },

  clearSaved: () => set({ justSaved: false }),
}));
