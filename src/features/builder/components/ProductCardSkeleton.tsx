import { Skeleton } from '../../../components/Skeleton';

export const ProductCardSkeleton = () => (
  <div className="flex h-full flex-col rounded-card border-2 border-transparent bg-surface p-3.5 shadow-[0_1px_3px_rgba(16,24,40,0.07)] xl:flex-row xl:gap-4">
    <div className="flex h-32 w-full items-center justify-center xl:h-24 xl:w-24 xl:shrink-0">
      <Skeleton className="h-24 w-24" rounded="rounded-xl" />
    </div>
    <div className="flex flex-1 flex-col gap-2">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <div className="mt-2 flex gap-1.5">
        <Skeleton className="h-6 w-14" />
        <Skeleton className="h-6 w-14" />
      </div>
      <div className="mt-3 flex items-center justify-between xl:mt-auto">
        <Skeleton className="h-8 w-24" rounded="rounded-lg" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  </div>
);
