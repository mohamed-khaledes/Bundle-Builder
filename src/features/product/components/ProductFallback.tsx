import { Link } from 'react-router-dom';
import { PackageX } from 'lucide-react';
import { Button } from '../../../components/Button';

interface Props {
  title: string;
  body: string;
  onRetry?: () => void;
}

export const ProductFallback = ({ title, body, onRetry }: Props) => (
  <div
    role="alert"
    className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl bg-surface-accent p-10 text-center"
  >
    <PackageX size={40} className="text-brand" aria-hidden="true" />
    <div>
      <h1 className="font-display text-[20px] font-semibold text-ink">
        {title}
      </h1>
      <p className="mt-1 text-[14px] text-muted">{body}</p>
    </div>
    <div className="flex flex-wrap items-center justify-center gap-3">
      {onRetry && (
        <Button
          variant="primary"
          onClick={onRetry}
          className="px-6 py-2.5 text-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          Retry
        </Button>
      )}
      <Link
        to="/"
        className="rounded-xl border border-brand/30 bg-surface px-6 py-2.5 text-[14px] font-semibold text-brand transition-colors hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transition-none"
      >
        Back to builder
      </Link>
    </div>
  </div>
);
