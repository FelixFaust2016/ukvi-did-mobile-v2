import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetQuery = <TData>(
  key: string,
  url: string,
  options?: Omit<UseQueryOptions<TData, Error, TData, [string]>, 'queryKey' | 'queryFn'>
) => {
  const fetcher = async (): Promise<TData> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  };

  return useQuery<TData, Error, TData, [string]>({
    queryKey: [key],
    queryFn: fetcher,
    ...options,
  });
};
