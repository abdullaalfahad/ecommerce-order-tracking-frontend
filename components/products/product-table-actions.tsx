"use client";

import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { ProductDeleteAlert } from "./product-delete-alert";
import { ProductDialog } from "./product-upsert-dialog";

export function ProductTableActions({ product }: { product: any }) {
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);

  return (
    <div className="space-x-2">
      <ProductDialog initialData={product} triggerButtonText="Edit Product" />
      <Button variant="destructive" onClick={() => setIsOpenDeleteAlert(true)}>
        <Trash />
      </Button>

      <ProductDeleteAlert
        productId={product?._id}
        isOpenDeleteAlert={isOpenDeleteAlert}
        setIsOpenDeleteAlert={setIsOpenDeleteAlert}
      />
    </div>
  );
}
