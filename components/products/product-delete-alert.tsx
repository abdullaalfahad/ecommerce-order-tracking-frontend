"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteProduct } from "@/hooks/use-delete-product";

interface ProductDeleteAlertProps {
  productId: string;
  isOpenDeleteAlert: boolean;
  setIsOpenDeleteAlert: (isOpen: boolean) => void;
}

export function ProductDeleteAlert({
  productId,
  isOpenDeleteAlert,
  setIsOpenDeleteAlert,
}: ProductDeleteAlertProps) {
  const deleteProduct = useDeleteProduct();

  const handleDelete = () => {
    deleteProduct.mutate(productId);
  };

  return (
    <AlertDialog open={isOpenDeleteAlert} onOpenChange={setIsOpenDeleteAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this product?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The product will be permanently
            removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteProduct.isPending}
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
