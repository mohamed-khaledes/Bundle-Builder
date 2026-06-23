import { Skeleton } from '../../components/Skeleton';
import { ProductCardSkeleton } from './components/ProductCardSkeleton';

export const BuilderSkeleton = () => (
  <section aria-label="Loading builder" aria-busy="true">
    <div className="mb-4 flex justify-center md:hidden">
      <Skeleton className="h-7 w-48" />
    </div>

    {/* Expanded step */}
    <div className="rounded-2xl bg-surface-accent p-3.5 sm:p-5">
      <Skeleton className="h-3 w-20" />
      <div className="mt-2 mb-4 flex items-center gap-2.5">
        <Skeleton className="h-5 w-5" rounded="rounded" />
        <Skeleton className="h-5 w-44" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>

    {/* Collapsed steps */}
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="flex items-center gap-2.5 border-t border-line py-5"
      >
        <Skeleton className="h-5 w-5" rounded="rounded" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="ml-auto h-4 w-16" />
      </div>
    ))}
  </section>
);
