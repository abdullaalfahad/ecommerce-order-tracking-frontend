"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import xior from "xior";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/lib/xior";
import { ImageUpload } from "./image-upload";

export const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  stock: z.coerce.number().min(0, "Stock must be at least 0"),
  category: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export type ProductFormData = z.infer<typeof ProductSchema>;

interface ProductDialogProps {
  initialData?: ProductFormData & { _id: string; images?: string[] };
  triggerButtonText: string;
}

export const ProductDialog: React.FC<ProductDialogProps> = ({
  initialData,
  triggerButtonText,
}) => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    initialData?.images?.[0] || null,
  );
  const [imageUrl, setImageUrl] = useState<string | null>(
    initialData?.images?.[0] || null,
  );
  const [isUploading, setIsUploading] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<any>({
    resolver: zodResolver(ProductSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      images: imageUrl ? [imageUrl] : [],
    },
  });

  const uploadToImageKit = async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      const authResponse = await xior.get("/api/imagekit-auth", {
        headers: { Authorization: `Bearer ${getCookie("accessToken")}` },
      });
      const { token, expire, signature } = authResponse.data;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append(
        "publicKey",
        process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
      );
      formData.append("signature", signature);
      formData.append("expire", expire.toString());
      formData.append("token", token);

      const response = await xior.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        formData,
        {
          headers: { Accept: "application/json" },
        },
      );

      if (response.data.url) return response.data.url;
      throw new Error("Upload failed");
    } catch (err) {
      toast.error("Failed to upload image");
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (data: ProductFormData) => {
    try {
      const payload = {
        ...data,
        images: imageUrl ? [imageUrl] : [], // wrap in array
      };

      ProductSchema.parse(payload); // validate again

      if (initialData) {
        await api.put(`/products/${initialData._id}`, payload);
      } else {
        await api.post("/products", payload);
      }

      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product saved successfully!");
      setOpen(false);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to save product");
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (value === false) {
          form.reset();
          setPreview(null);
          setImageUrl(null);
        }
        setOpen(value);
      }}
    >
      <DialogTrigger asChild>
        <Button>
          {triggerButtonText === "Edit Product" ? <Edit /> : triggerButtonText}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Product description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stock */}
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <ImageUpload
              preview={preview}
              setPreview={setPreview}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              isUploading={isUploading}
              uploadToImageKit={uploadToImageKit}
            />

            <DialogFooter>
              <Button type="submit" disabled={isUploading} className="w-full">
                {initialData ? "Update Product" : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
