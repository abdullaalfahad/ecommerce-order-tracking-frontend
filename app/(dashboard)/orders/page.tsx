import { OrdersList } from "@/components/orders/orders-list";

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      <OrdersList />
    </div>
  );
}
