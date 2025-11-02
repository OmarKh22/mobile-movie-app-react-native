import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';

const fetchData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axios.request<T>({ url, ...config });
  return response.data;
};

interface UseFetchOptions<TData>
  extends Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'> {
  // allow queryKey and URL as input
  queryKey: string | any[];
  url: string;
  config?: AxiosRequestConfig;
}

export const useFetch = <TData>({
  queryKey,
  url,
  config,
  ...options
}: UseFetchOptions<TData>) => {
  return useQuery<TData>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: () => fetchData<TData>(url, config),
    staleTime: 1000 * 60 * 5, // cache 5 mins
    retry: 1,
    ...options,
  });
};
