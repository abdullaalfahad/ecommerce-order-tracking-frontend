"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";

export default function CartItem({ item }: { item: any }) {
  const { updateItem } = useCart();

  return (
    <div className="border rounded-lg p-4 flex justify-between items-center">
      <div>
        <p className="font-bold">{item.product.name}</p>
        <p className="text-sm text-gray-500">${item.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <Input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) =>
            updateItem.mutate({
              productId: item.product._id,
              quantity: Number(e.target.value),
            })
          }
          className="w-16"
        />
      </div>
    </div>
  );
}
