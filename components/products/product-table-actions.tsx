"use client";

import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { ProductDeleteAlert } from "./product-delete-alert";

export function ProductTableActions({ productId }: { productId: string }) {
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);

  return (
    <div className="space-x-2">
      <Button>
        <Edit />
      </Button>
      <Button variant="destructive" onClick={() => setIsOpenDeleteAlert(true)}>
        <Trash />
      </Button>

      <ProductDeleteAlert
        productId={productId}
        isOpenDeleteAlert={isOpenDeleteAlert}
        setIsOpenDeleteAlert={setIsOpenDeleteAlert}
      />
    </div>
  );
}
