import { http } from '../lib/axios';
import type { SystemResponse } from '../features/configurator/configurator.types';

export const SYSTEM_QUERY_KEY = ['system'] as const;

export const fetchSystem = async (): Promise<SystemResponse> => {
  const { data } = await http.get<SystemResponse>('/system');
  return data;
};
