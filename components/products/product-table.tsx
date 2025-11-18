"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthToken } from "@/hooks/use-auth-token";
import { useProducts } from "@/hooks/use-products";
import AddToCartButton from "../cart/cart-button";
import { ProductTableActions } from "./product-table-actions";
import { ProductDialog } from "./product-upsert-dialog";

export default function ProductTable({ limit = 5 }: { limit?: number }) {
  const [page, setPage] = useState(0);

  const { payload } = useAuthToken();
  const { data, isLoading } = useProducts({ page, limit });

  if (isLoading)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;

  if (!data || data.items.length === 0)
    return (
      <p className="text-center py-10 text-gray-500">No products found.</p>
    );

  const totalPages = Math.ceil(data.total / limit);

  return (
    <div className="space-y-4">
      {payload?.role === "admin" && (
        <div className="flex justify-end">
          <ProductDialog triggerButtonText="Add Product" />
        </div>
      )}

      <div className="overflow-x-auto border rounded-lg">
        <Table className="min-w-[600px]">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-left px-4 py-2">Name</TableHead>
              <TableHead className="px-4 py-2 text-center">Price</TableHead>
              <TableHead className="px-4 py-2 text-center">Stock</TableHead>
              <TableHead className="px-4 py-2 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((p) => (
              <TableRow
                key={p._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="flex items-center gap-3 px-4 py-2">
                  <span>{p.name}</span>
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  ${p.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {p.stock}
                </TableCell>
                <TableCell className="text-center px-4 py-2">
                  {payload?.role === "admin" ? (
                    <ProductTableActions productId={p._id} />
                  ) : (
                    <AddToCartButton productId={p._id} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          disabled={page === 0}
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        >
          Previous
        </Button>

        <p className="text-gray-600">
          Page {page + 1} of {totalPages}
        </p>

        <Button
          variant="outline"
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
