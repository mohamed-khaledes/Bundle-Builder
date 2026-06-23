import { AlertTriangle } from 'lucide-react';
import { Button } from '../components/Button';

interface Props {
  onRetry: () => void;
}

export const ErrorState = ({ onRetry }: Props) => (
  <div
    role="alert"
    className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl bg-surface-accent p-10 text-center"
  >
    <AlertTriangle size={40} className="text-brand" aria-hidden="true" />
    <div>
      <h2 className="font-display text-[20px] font-semibold text-ink">
        We couldn&apos;t load your system
      </h2>
      <p className="mt-1 text-[14px] text-muted">
        Something went wrong reaching the catalog. Please try again.
      </p>
    </div>
    <Button
      variant="primary"
      onClick={onRetry}
      className="px-6 py-2.5 text-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
    >
      Retry
    </Button>
  </div>
);
