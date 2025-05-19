import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const usePostMutation = <TData, TVariables>(
  url: string,
  options?: UseMutationOptions<TData, Error, TVariables>
) => {
  const poster = async (data: TVariables): Promise<TData> => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json()
      console.log(error, "errrr");
      
      return Promise.reject(error.msg);
    }
    return res.json();
  };

  return useMutation<TData, Error, TVariables>({
    mutationFn: poster,
    ...options,
  });
};
