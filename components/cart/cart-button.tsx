"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

export default function AddToCartButton({ productId }: { productId: string }) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    await addToCart.mutateAsync({ productId, quantity: 1 });
    setLoading(false);
  };

  return (
    <Button disabled={loading} onClick={handleAdd} className="w-[100px]">
      {loading ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
