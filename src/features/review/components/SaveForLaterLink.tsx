import { useEffect } from 'react';
import { useStore } from '../../configurator/store';
import { useUiConfig } from '../../configurator/hooks';

export const SaveForLaterLink = () => {
  const saveForLater = useStore((s) => s.saveForLater);
  const justSaved = useStore((s) => s.justSaved);
  const clearSaved = useStore((s) => s.clearSaved);
  const uiConfig = useUiConfig();

  useEffect(() => {
    if (!justSaved) return;
    const t = setTimeout(clearSaved, 2200);
    return () => clearTimeout(t);
  }, [justSaved, clearSaved]);

  return (
    <button
      type="button"
      onClick={saveForLater}
      className="mx-auto block rounded text-[13px] italic text-ink underline underline-offset-2 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transition-none"
    >
      {justSaved ? 'Saved! ✓' : uiConfig?.saveForLaterLabel}
    </button>
  );
};
