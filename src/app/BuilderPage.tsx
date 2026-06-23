import type { ReactNode } from 'react';
import { useSystemQuery } from '../features/configurator/useSystemQuery';
import { Builder } from '../features/builder/Builder';
import { BuilderSkeleton } from '../features/builder/BuilderSkeleton';
import { ReviewPanel } from '../features/review/ReviewPanel';
import { ReviewSkeleton } from '../features/review/ReviewSkeleton';
import { ErrorState } from './ErrorState';

export const BuilderPage = () => {
  const { isLoading, isError, refetch, ready } = useSystemQuery();

  if (isError) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface p-4">
        <ErrorState onRetry={() => refetch()} />
      </div>
    );
  }

  if (isLoading || !ready) {
    return (
      <Shell>
        <BuilderSkeleton />
        <div className="mt-8 xl:mt-0">
          <ReviewSkeleton />
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <Builder />
      <div className="mt-8 xl:mt-0">
        <ReviewPanel />
      </div>
    </Shell>
  );
};
const Shell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-surface">
    <main className="mx-auto max-w-310 px-4 py-6 sm:px-6 sm:py-8 xl:grid xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-6">
      {children}
    </main>
  </div>
);
