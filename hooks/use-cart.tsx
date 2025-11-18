"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/xior";

export const useCart = () => {
  const queryClient = useQueryClient();

  const cart = useQuery({
    queryKey: ["cart"],
    queryFn: async () => (await api.get("/cart")).data,
  });

  const addToCart = useMutation({
    mutationFn: async (data: { productId: string; quantity: number }) =>
      (await api.post("/cart/add", data)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const updateItem = useMutation({
    mutationFn: async (data: { productId: string; quantity: number }) =>
      (await api.post("/cart/update", data)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const clearCart = useMutation({
    mutationFn: async () => await api.delete("/cart/clear"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  return {
    cart: cart.data,
    isCartLoading: cart.isLoading,
    addToCart,
    updateItem,
    clearCart,
  };
};
