import { Skeleton } from '../../../components/Skeleton';

export const ProductDetailSkeleton = () => (
  <div aria-busy="true" aria-label="Loading product">
    <Skeleton className="h-5 w-32" />
    <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:gap-10">
      <Skeleton className="h-75 w-full sm:h-95" rounded="rounded-3xl" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-5 w-32" />
        <Skeleton className="mt-2 h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <div className="mt-4 flex gap-1.5">
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-7 w-16" />
        </div>
        <Skeleton className="mt-4 h-9 w-28" rounded="rounded-lg" />
      </div>
    </div>
  </div>
);
