import type { PersistedSelections, Selections } from './configurator.types';

const STORAGE_KEY = 'wyze.security-builder';
const SCHEMA_VERSION = 1;

export const loadSelections = (): Selections | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PersistedSelections>;
    if (parsed.version !== SCHEMA_VERSION || !parsed.quantities) return null;
    return {
      quantities: parsed.quantities,
      activeVariant: parsed.activeVariant ?? {},
      openStep: parsed.openStep ?? '',
    };
  } catch {
    return null;
  }
};

export const saveSelections = (selections: Selections): boolean => {
  try {
    const payload: PersistedSelections = {
      version: SCHEMA_VERSION,
      ...selections,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
};
