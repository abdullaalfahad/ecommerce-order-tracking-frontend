"use client";

import { useOrders } from "@/hooks/use-orders";
import { OrderItem } from "./order-item";

export function OrdersList() {
  // contains role, userId, etc.

  const { data: orders, isLoading, refetch } = useOrders();

  console.log("Orders:", orders);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      {orders?.map((order: any) => (
        <OrderItem key={order._id} order={order} refetch={refetch} />
      ))}
    </div>
  );
}
