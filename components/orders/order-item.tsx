"use client";

import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthToken } from "@/hooks/use-auth-token";
import { socket } from "@/lib/socket";
import api from "@/lib/xior";

export function OrderItem({
  order,
  refetch,
}: {
  order: any;
  refetch: () => void;
}) {
  const { payload } = useAuthToken();

  // Realtime updates for this single order
  useEffect(() => {
    if (!order?._id) return;

    socket.emit("joinOrderRoom", order._id);

    socket.on("order:statusUpdated", (data) => {
      if (data.orderId === order._id) {
        refetch(); // refresh only if this order was updated
      }
    });

    return () => {
      socket.emit("leaveOrderRoom", order._id);
      socket.off("order:statusUpdated");
    };
  }, [order?._id, refetch]);

  // Admin updates order status
  const handleStatusChange = async (status: string) => {
    try {
      await api.put(`/orders/${order._id}/status`, { status });

      socket.emit("order:updateStatus", {
        orderId: order._id,
        status,
      });

      refetch();
    } catch (err) {
      console.log("Failed to update status:", err);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white">
      <p className="font-semibold text-lg">Order #{order._id}</p>

      {/* Admin can change status */}
      {payload?.role === "admin" ? (
        <div className="mt-2">
          <p className="font-medium mb-1">Status:</p>

          <Select
            defaultValue={order.orderStatus}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="packed">Packed</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : (
        <p className="mt-1">
          <span className="font-medium">Status:</span>{" "}
          <span className="text-blue-600">{order.orderStatus}</span>
        </p>
      )}

      {/* Total amount */}
      <p className="mt-1">
        <span className="font-medium">Total:</span> $
        {order.totalAmount.toFixed(2)}
      </p>

      {/* Last updated */}
      <p className="mt-1 text-sm text-gray-500">
        Updated: {new Date(order.updatedAt).toLocaleString()}
      </p>

      {/* Payment Status */}
      <p className="mt-2">
        <span className="font-medium">Payment Status:</span>{" "}
        {order.paymentStatus}
      </p>
    </div>
  );
}
