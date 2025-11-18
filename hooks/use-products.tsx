import { useQuery } from "@tanstack/react-query";
import api from "@/lib/xior";
import type { ItemsResponse } from "@/types/products";

export const useProducts = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const params = {
    page,
    limit,
  };

  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: async () => {
      const res = await api.get<ItemsResponse>("/products", { params });
      return res.data;
    },
  });
};
