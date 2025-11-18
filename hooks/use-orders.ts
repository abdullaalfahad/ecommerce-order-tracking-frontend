import { useQuery } from "@tanstack/react-query";
import api from "@/lib/xior";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.get("/orders");
      return res.data;
    },
  });
};
