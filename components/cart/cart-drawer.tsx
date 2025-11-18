"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import api from "@/lib/xior";
import CartItem from "./cart-item";

export default function CartDrawer() {
  const { cart, isCartLoading, clearCart } = useCart();

  const handleCheckout = async () => {
    await api.post("/orders/create");

    window.location.href = "/checkout";
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Cart ({cart?.items?.length || 0})</Button>
      </SheetTrigger>

      <SheetContent className="w-96 p-6">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        {isCartLoading && <p>Loading...</p>}

        <div className="space-y-4 mt-4">
          {cart?.items?.map((item: any) => (
            <CartItem key={item?.product?._id} item={item} />
          ))}
        </div>

        {cart?.items?.length > 0 && (
          <div className="mt-4 flex justify-end">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => clearCart.mutate()}
            >
              Clear Cart
            </Button>
          </div>
        )}

        <div className="mt-6 flex justify-between items-center">
          <p className="font-semibold text-lg">
            Total: ${cart?.total?.toFixed(2)}
          </p>

          <Button disabled={cart?.items?.length === 0} onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
