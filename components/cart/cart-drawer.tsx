"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import CartItem from "./cart-item";

export default function CartDrawer() {
  const { cart, isCartLoading } = useCart();

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
            <CartItem key={item.product._id} item={item} />
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <p className="font-semibold text-lg">Total: ${cart?.total}</p>
          <Link href="/cart">
            <Button>Checkout</Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
