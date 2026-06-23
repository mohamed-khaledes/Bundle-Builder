import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { fetchProduct, productQueryKey } from '../../api/products';

export const useProductQuery = (productId: string | undefined) => {
  const query = useQuery({
    queryKey: productQueryKey(productId ?? ''),
    queryFn: () => fetchProduct(productId as string),
    enabled: Boolean(productId),
    retry: (failureCount, error) => {
      // Don't retry a genuine 404 — it's "not found", not a transient error.
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return false;
      }
      return failureCount < 1;
    },
  });

  const notFound =
    axios.isAxiosError(query.error) && query.error.response?.status === 404;

  return {
    product: query.data,
    isLoading: query.isLoading,
    isError: query.isError && !notFound,
    notFound,
    refetch: query.refetch,
  };
};
