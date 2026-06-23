import { http } from '../lib/axios';
import type { Product } from '../features/configurator/configurator.types';

export const productQueryKey = (id: string) => ['product', id] as const;

export const fetchProduct = async (id: string): Promise<Product> => {
  const { data } = await http.get<Product>(`/products/${id}`);
  return data;
};
