import { Skeleton } from '../../components/Skeleton';

const LineSkeleton = () => (
  <div className="flex items-center gap-3 py-2.5">
    <Skeleton className="h-10 w-10" rounded="rounded-lg" />
    <Skeleton className="h-4 flex-1" />
    <Skeleton className="h-7 w-20" rounded="rounded-md" />
    <Skeleton className="h-4 w-12" />
  </div>
);

export const ReviewSkeleton = () => (
  <aside aria-label="Loading summary" aria-busy="true">
    <div className="rounded-3xl bg-surface-accent p-5 sm:p-6">
      <div className="md:grid md:grid-cols-2 md:gap-x-8 xl:block">
        <div>
          <Skeleton className="h-3 w-16" />
          <Skeleton className="mt-2 h-6 w-3/4" />
          <Skeleton className="mt-2 h-3 w-full" />
          <div className="mt-4 space-y-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <LineSkeleton key={i} />
            ))}
          </div>
        </div>
        <div className="mt-6 md:mt-0">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16" rounded="rounded-full" />
            <Skeleton className="h-10 flex-1" />
          </div>
          <Skeleton className="mt-4 h-12 w-full" rounded="rounded-xl" />
        </div>
      </div>
    </div>
  </aside>
);
