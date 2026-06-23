import { QueryClient } from '@tanstack/react-query';

// The catalog is effectively static for a session, so cache it generously and
// don't refetch when the window regains focus.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
