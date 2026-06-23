import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SYSTEM_QUERY_KEY, fetchSystem } from '../../api/system';
import { useStore } from './store';

export const useSystemQuery = () => {
  const query = useQuery({
    queryKey: SYSTEM_QUERY_KEY,
    queryFn: fetchSystem,
  });

  const ready = useStore((s) => s.ready);
  const initialize = useStore((s) => s.initialize);

  useEffect(() => {
    if (query.data) initialize(query.data);
  }, [query.data, initialize]);

  return {
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    ready,
  };
};
