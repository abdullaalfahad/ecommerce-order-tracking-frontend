import ProductTable from "@/components/products/product-table";

export default function Products() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Products</h1>

      <ProductTable limit={10} />
    </div>
  );
}
